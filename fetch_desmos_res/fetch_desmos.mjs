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

const LTR_LANGS = /** @type const */ ([
  "en",
  "es",
  "et",
  "ru",
  "da",
  "de",
  "pt-BR",
  "pt-PT",
  "ca",
  "fr",
  "fr-CA",
  "it",
  "is",
  "nl",
  "no",
  "sv-SE",
  "hu",
  "cs",
  "pl",
  "id",
  "vi",
  "el",
  "uk",
  "ka",
  "th",
  "tr",
  "zh-CN",
  "zh-TW",
  "ko",
  "ja",
]);
const RTL_LANGS = /** @type const */ (["ar", "hy-AM", "hi", "tr", "xx-XX"]);
const SUPPORTED_LANGS = /** @type const */ ([...LTR_LANGS, ...RTL_LANGS]);

async function main() {
  const TESTED_COMMIT = "0c95925b9251cc673a8296309ee501597aff130f";
  const USE_3D_API = false;

  const PARENT_DIR = path.dirname(path.dirname(process.argv[1]));
  const JS_FILENAME = USE_3D_API ? "calculator_3d.js" : "calculator.js";

  // Get HTML Page
  logger.info("[1/7] Getting HTML Page");
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

  // Gets the class of the html element
  const html_class = JSON.stringify(
    (() => {
      const html_class = /<html.+?class=["'](.+?)["'].*?>/.exec(html)?.[1];
      if (html_class === undefined || html_class === "dcg-calculator-api-container") return "";
      return html_class;
    })()
  );

  // Ensure directories exists
  await Promise.all([`${PARENT_DIR}/public/desmos/fonts`].map((dir) => fs.ensureDir(dir)));

  // Create Preload Script
  {
    logger.info("[2/7] Creating Preload Script");
    fs.writeFileSync(
      `${PARENT_DIR}/public/desmos/preload_desmos.js`,
      `// catches errors within iframe and promotes them to qunit during tests
try {
  if (window !== window.top) {
    window.onerror = window.top.onerror;
    window.addEventListener("unhandledrejection", function (e) {
      throw e.reason;
    });
  }
} catch (ex) {}

// config and commit
if (typeof Desmos === "undefined") window.Desmos = {};
Desmos.config = {};
Desmos.commit = "${website_commit}";

// Make sure console.log is defined
if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function () {};

// Make sure we don't use pushstate on file protocol
if (window.location.protocol === "file:") {
  window.history.pushState = function () {};
  window.history.replaceState = function () {};
}

// Sometimes desmos changes the class of the html element
document.documentElement.classList.add(${html_class});`
    );
  }

  // Fetch the calculator CSS and JS
  {
    logger.info("[3/7] Getting Calculator API");
    const api_files = html.match(/\/assets\/build\/calculator_desktop.*?\.(?:js|css)/g);
    if (api_files.length != 2) {
      throw Error("Couldn't get API files.");
    }
    await Promise.all(
      api_files.map(async (file) => {
        const ext = path.extname(file);
        await getFile(URL + file, `Couldn't get ${ext} of desmos.`, `${PARENT_DIR}/public/desmos/calculator${ext}`);
      })
    );

    if (USE_3D_API) {
      const response = await fetch(URL + "/3d");
      if (!response.ok) {
        throw Error("Couldn't get html page of desmos 3d.");
      }
      const html = await response.text();
      const api_3d_js = html.match(/\/assets\/build\/calculator_3d.*?\.js/g);
      if (api_3d_js.length != 1) {
        throw Error("Couldn't find 3D API file endpoint.");
      }
      await getFile(
        URL + api_3d_js[0],
        `Couldn't get 3d api of desmos.`,
        `${PARENT_DIR}/public/desmos/calculator_3d.js`
      );
    }
  }

  // Fetch desmos font files
  {
    logger.info("[4/7] Downloading Desmos Fonts");
    let css = fs.readFileSync(`${PARENT_DIR}/public/desmos/calculator.css`, { encoding: "utf-8" });
    const fontMatches = css.match(/\/assets\/font\/.+?woff2/g);
    await Promise.all(
      fontMatches.map(async (endpoint) => {
        const font_fname = path.basename(endpoint);
        await getFile(
          URL + endpoint,
          `Couldn't get ${font_fname} of desmos.`,
          `${PARENT_DIR}/public/desmos/fonts/${font_fname}`
        );
        css = css.replace(endpoint, `/desmos/fonts/${font_fname}`);
      })
    );
    fs.writeFileSync(`${PARENT_DIR}/public/desmos/calculator.css`, css, { encoding: "utf-8" });
  }

  // Move internal css to loading.css file
  {
    logger.info("[5/7] Extracting additional assets");
    const loading = /<style type='text\/css'>(.+)<\/style>/gs.exec(html);
    if (loading === null) {
      throw Error("Expected to have loading as internal css.");
    }
    fs.writeFileSync(`${PARENT_DIR}/public/desmos/loading.css`, loading[1].trim(), { encoding: "utf-8" });
  }

  // Fetch desmos lang files
  {
    let locales = {};
    logger.info("[6/7] Downloading Desmos Language Files");
    for (let lang of SUPPORTED_LANGS) {
      if (lang === "en" || lang === "xx-XX") continue;
      const endpoint = `${URL}/api/v1/calculator/language/${lang}.ftl`;
      logger.log(`Fetching lang: ${endpoint}`);
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw Error(`Couldn't get lang ${lang} of desmos.`);
      }
      const lang_file = JSON.parse(await response.text());
      locales = { ...locales, ...lang_file };
    }
    fs.writeFileSync(
      `${PARENT_DIR}/public/desmos/locales.js`,
      `"undefined" == typeof Desmos && (Desmos = {}), Desmos.locales = ${JSON.stringify(locales)};`
    );
    logger.success("Fetched all language files.");
  }

  // Fix calculator api file
  {
    logger.info("[7/7] Fixing files");
    let js = fs.readFileSync(`${PARENT_DIR}/public/desmos/${JS_FILENAME}`, { encoding: "utf-8" });

    // Removing bugsnag
    const old_bugsnag = js.match(/Bugsnag JavaScript.*?.default=.*?,/g)[0];
    const at_export = old_bugsnag.indexOf(".default=");
    // const bugsnag_function_name = old_bugsnag.slice(at_export, -1);
    const new_bugsnag =
      old_bugsnag.slice(0, at_export) + `={start:()=>({leaveBreadcrumb:function(){},notify:function(){}})},`;
    js = js.replace(old_bugsnag, new_bugsnag);

    // Creates a copy of end of file
    let endIndex = -11000;
    let new_end_js = js.slice(endIndex); // Calculator 3D's loader is in last 11000 instead of 2000.

    const old_load_search =
      /}async function (.+?)\(\){.+?(calcConstructor.+?),.+?(product.+?),.+?(var.+;.+?;typeof Desmos=="undefined"&&\(Desmos={}\));/g.exec(
        new_end_js
      );
    if (old_load_search == null) throw Error("Expected load Desmos to exist.");

    const [old_load, func_name, calc_constructor_option, product_option, line_load] = old_load_search;
    const productType = product_option.split(":")[1].slice(1, -1);
    const [isCalc3D, isCalc] = [productType === "graphing-3d", productType === "graphing"];
    if (!isCalc3D && !isCalc) throw Error("Unknown Desmos Calculator Constructor");

    const calc_constructor = calc_constructor_option.split(":")[1];
    const new_promise_load = isCalc3D
      ? `new Promise(res=>{function CC_3D(...r){return new ${calc_constructor}(...r)};CC_3D.prototype=${calc_constructor}.prototype;Desmos.Graphing3DCalculator=CC_3D;res();})`
      : "new Promise(res=>{Desmos.Graphing3DCalculator=function(){throw new Error('Graphing 3D API is Disabled.')}res();})";
    const new_line_load = line_load.replace(`${func_name}()`, new_promise_load);
    new_end_js = new_end_js.replace(line_load, new_line_load);

    // Removes window.Calc assignment
    const old_calc = new_end_js.match(/,window.Calc=.*?}\)/g)[0];
    const new_calc = ";})";
    new_end_js = new_end_js.replace(old_calc, new_calc);

    // Removes hiding of loader
    const old_loader = new_end_js.match(/\.dcg-loading-div-container.+?\.style\.display="none"/g)[0];
    const new_loader = old_loader.slice(0, old_loader.indexOf(")") + 1);
    new_end_js = new_end_js.replace(old_loader, new_loader);

    // Final Replacement
    js = js.slice(0, endIndex) + new_end_js;

    logger.debug("\nBeautifying js for debugging...");
    fs.writeFileSync(`${PARENT_DIR}/public/desmos/calculator_api.js`, jsb.js_beautify(js), { encoding: "utf-8" });
  }
}

main();
