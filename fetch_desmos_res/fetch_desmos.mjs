#!/bin/env node

import fetch from "node-fetch";
import fs from "fs-extra";
import path from "path";
import logger from "node-color-log";
import jsb from "js-beautify";

import { pipeline } from "node:stream";
import { promisify } from "node:util";
const streamPipeline = promisify(pipeline);

async function getFile(url, errMsg, filePath) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(errMsg);
  return streamPipeline(response.body, fs.createWriteStream(filePath));
}

async function main() {
  const TESTED_COMMIT = "dac33e6e2fdbe291d8f19518dcc8af83691065a1";
  let DEBUG_MODE = false;

  // Check if in debug mode enabled
  if (process.argv.length > 2) {
    const arg = process.argv[2];
    DEBUG_MODE = arg === "-d" || arg === "--debug";
  }
  const PARENT_DIR = path.dirname(path.dirname(process.argv[1]));

  // Get HTML Page
  logger.info("[1/5] Getting HTML Page");
  const URL = "https://www.desmos.com";
  const response = await fetch(URL + "/calculator");
  if (!response.ok) {
    throw Error("Couldn't get html page of desmos.");
  }
  const html = await response.text();

  // Tests which commit we are using
  const website_commit = html
    .split("\n")
    .filter((line) => line.trim().startsWith("Desmos.commit"))[0]
    .trim()
    .split(" ")
    .pop()
    .slice(1, -2);
  if (website_commit != TESTED_COMMIT) {
    logger.warn(
      `\nWARN: The app was tested and built on COMMIT '${TESTED_COMMIT}' but the website has a newer COMMIT '${website_commit}'.`
    );
  }

  // Ensure directories exists
  await Promise.all([`${PARENT_DIR}/src/desmos`, `${PARENT_DIR}/public/assets/font`].map((dir) => fs.ensureDir(dir)));

  // Fetch the calculator CSS and JS
  {
    logger.info("[2/5] Getting Calculator API");
    const api_files = html.match(/\/assets\/build\/calculator_desktop.*?\.(?:js|css)/g);
    if (api_files.length != 2) {
      throw Error("Couldn't get API files.");
    }
    await Promise.all(
      api_files.map(async (file) => {
        const ext = path.extname(file);
        await getFile(URL + file, `Couldn't get ${ext} of desmos.`, `${PARENT_DIR}/src/desmos/calculator${ext}`);
      })
    );
  }

  // Fetch desmos font files
  {
    logger.info("[3/5] Downloading Desmos Fonts");
    const css = fs.readFileSync(`${PARENT_DIR}/src/desmos/calculator.css`, { encoding: "utf-8" });
    await Promise.all(
      css.match(/\/assets\/font\/.+?woff2/g).map(async (endpoint) => {
        const font_fname = path.basename(endpoint);
        await getFile(
          URL + endpoint,
          `Couldn't get ${font_fname} of desmos.`,
          `${PARENT_DIR}/public/assets/font/${font_fname}`
        );
      })
    );
  }

  // Move internal css to loading.css file
  {
    logger.info("[4/5] Extracting additional assets");
    const loading = /<style type='text\/css'>(.+)<\/style>/gs.exec(html);
    if (loading === null) {
      throw Error("Expected to have loading as internal css.");
    }
    fs.writeFileSync(`${PARENT_DIR}/src/desmos/loading.css`, loading[1].trim(), { encoding: "utf-8" });
  }

  // Fix calculator.js file
  {
    logger.info("[5/5] Fixing files");
    let js = fs.readFileSync(`${PARENT_DIR}/src/desmos/calculator.js`, { encoding: "utf-8" });

    // Removing bugsnag
    const old_bugsnag = js.match(/\.Bugsnag={.*?\.default=.*?,/g)[0];
    const at_export = old_bugsnag.indexOf("default=") + "default=".length;
    const bugsnag_function_name = old_bugsnag.slice(at_export, -1);
    const new_bugsnag = old_bugsnag + `${bugsnag_function_name}=function(){},`;
    js = js.replace(old_bugsnag, new_bugsnag);

    // Creates a copy of end of file
    const end_of_js = js.slice(-2000);
    let new_end_js = end_of_js;

    // Removes loading of calculator and prints it
    const old_load_search = /(var.+);.+typeof Desmos=="undefined"&&\(Desmos={}\);/g.exec(end_of_js);
    if (old_load_search == null) throw Error("Expected load Desmos to exist.");
    // console.log(old_load_search[0]);
    const old_load = old_load_search[0];
    const old_var = old_load_search[1];
    const new_var = `${old_var.split("=")[0]}=new Promise(res=>res())`;
    const new_load = old_load.replace(old_var, new_var);
    new_end_js = new_end_js.replace(old_load, new_load);

    // Removes window.Calc assignment
    const old_calc = end_of_js.match(/,window.Calc=.*?}\)/g)[0];
    const new_calc = ";})";
    new_end_js = new_end_js.replace(old_calc, new_calc);

    // Final Replacement
    js = js.replace(end_of_js, new_end_js);

    fs.writeFileSync(`${PARENT_DIR}/src/desmos/calculator.js`, js, { encoding: "utf-8" });

    if (DEBUG_MODE) {
      logger.debug("\nBeautifying calculator.js for debug...");
      fs.writeFileSync(`${PARENT_DIR}/src/desmos/calc_debug.js`, jsb.js_beautify(js), { encoding: "utf-8" });
    }
  }
}

main();
