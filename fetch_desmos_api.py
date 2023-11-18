#!/bin/env python3

import re
import requests
from os import path, mkdir
import sys

TESTED_COMMIT = "f124c4cc0ae79e6c75885c99777cd14c5a5acb08"
DEBUG_MODE = False

if len(sys.argv) > 1:
    if sys.argv[1] == "-d" or sys.argv[1] == "--debug":
        DEBUG_MODE = True
        import jsbeautifier as jsb


def main():
    # Get HTML Page
    print("[1/5] Getting HTML Page")
    URL = "https://www.desmos.com"
    response = requests.get(URL + "/calculator")
    if not response.ok:
        raise Exception("Couldn't get html page of desmos.")
    html = response.content.decode()

    # Tests which commit we are using
    website_commit = [line.strip().split(" ").pop()[1:-2]
                      for line in html.splitlines()
                      if line.strip().startswith("Desmos.commit")][0]
    if website_commit != TESTED_COMMIT:
        print(
            f"WARN: The app was tested and built on COMMIT '{TESTED_COMMIT}' but the website has a newer COMMIT '{website_commit}'.")

    # Checks if directories don't exist and creates them
    for dir in ["./src", "./src/desmos", "./public/assets", "./public/assets/font"]:
        if not path.exists(dir):
            mkdir(dir)
        if not path.isdir(dir):
            raise Exception(f"{dir} is not a directory.")

    print("[2/5] Getting Calculator API")
    # Fetch the calculator CSS and JS
    for ext in ["css", "js"]:
        search = re.search(
            f"\/assets\/build\/calculator_desktop.*?\.{ext}", html)
        if search is None:
            raise Exception("Couldn't get URL of stylesheet file.")
        response = requests.get(URL + search.group())
        if not response.ok:
            raise Exception(f"Couldn't get {ext} of desmos.")
        open(f"./src/desmos/calculator.{ext}", "wb").write(response.content)

    print("[3/5] Downloading Desmos Fonts")
    css = open("./src/desmos/calculator.css", "r").read()
    for endpoint in re.findall("\/assets\/font\/.+?woff2", css):
        font_fname = path.basename(endpoint)
        response = requests.get(URL + endpoint)
        if not response.ok:
            raise Exception(f"Couldn't get {font_fname} of desmos.")
        open(f"./public/assets/font/{font_fname}", "wb").write(response.content)

    print("[4/5] Extracting additional assets")
    # Extract the loading CSS
    loading = re.search("<style type='text/css'>.+</style>", html, re.S)
    if loading is None:
        raise Exception("Couldn't get loading css of desmos.")
    open("./src/desmos/loading.css", "w").write(loading.group()[24:-9])

    print("[5/5] Fixing files")
    js = open("./src/desmos/calculator.js").read()

    # Removing bugsnag
    old_bugsnag = re.search("\.Bugsnag={.*?\.default=.*?,", js).group()
    at_export = old_bugsnag.find("default=") + len("default=")
    bugsnag_function_name = old_bugsnag[at_export:-1]
    new_bugsnag = old_bugsnag + f"{bugsnag_function_name}=function(){{}},"
    js = js.replace(old_bugsnag, new_bugsnag)

    # Creates a copy of end of file
    end_of_js = js[-2000:]
    new_end_js = end_of_js

    # Removes loading of calculator and prints it
    old_load_search = re.search('(var.+);.+typeof Desmos=="undefined"&&\(Desmos={}\);',end_of_js)
    old_load = old_load_search.group()
    old_var = old_load_search.groups()[0]
    new_var = f"{old_var.split('=')[0]}=new Promise(res=>res())"
    new_load = old_load.replace(old_var, new_var)
    new_end_js = new_end_js.replace(old_load, new_load)

    # Removes window.Calc assignment
    old_calc = re.search(',window.Calc=.*?}\)', end_of_js).group()
    new_calc = ";})"
    new_end_js = new_end_js.replace(old_calc, new_calc)

    # Final Replacement
    js = js.replace(end_of_js, new_end_js)

    open("./src/desmos/calculator.js", "w").write(js)

    if DEBUG_MODE:
        print("\nBeautifying calculator.js for debug...")
        open("./src/desmos/calc_debug.js", "w").write(
            jsb.beautify(js)
        )


if __name__ == "__main__":
    main()
