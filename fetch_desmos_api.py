#!/bin/env python3

import re
import requests
from os import path, mkdir
import sys

TESTED_COMMIT = "235cc4d4e155375d9a041befd1761ad30c550d00"
DEBUG_MODE = False

if len(sys.argv) > 1:
    if sys.argv[1] == "-d" or sys.argv[1] == "--debug":
        DEBUG_MODE = True
        import jsbeautifier as jsb


def main():
    # Get HTML Page
    print("[1/4] Getting HTML Page")
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
    for dir in ["./app", "./app/desmos"]:
        if not path.exists(dir):
            mkdir(dir)
        if not path.isdir(dir):
            raise Exception(f"{dir} is not a directory.")

    print("[2/4] Getting Calculator API")
    # Fetch the calculator CSS and JS
    for ext in ["css", "js"]:
        search = re.search(
            f"\/assets\/build\/calculator_desktop.*?\.{ext}", html)
        if search is None:
            raise Exception("Couldn't get URL of stylesheet file.")
        response = requests.get(URL + search.group())
        if not response.ok:
            raise Exception(f"Couldn't get {ext} of desmos.")
        open(f"./app/desmos/calculator.{ext}", "wb").write(response.content)

    print("[3/4] Extracting additional assets")
    # Extract the loading CSS
    loading = re.search("<style type='text/css'>.+</style>", html, re.S)
    if loading is None:
        raise Exception("Couldn't get loading css of desmos.")
    open("./app/desmos/loading.css", "w").write(loading.group()[24:-9])

    print("[4/4] Fixing files")
    """
    In this commit the enitre file is wrapped in a function:
    starts with "(function () {\n" (len: 15)
    ends with   "}());\n"          (len: 6)
    """
    js = open("./app/desmos/calculator.js").read()[15:-6]

    # Removing bugsnag
    old_bugsnag = re.search("define\('bugsnag'.*?}\);\ndefine", js).group()
    new_bugsnag = "define('bugsnag',[\"exports\"],function(e){e.setBeforeSendCB=e.leaveBreadcrumb=e.notify=e.init=function(){}});\ndefine"
    js = js.replace(old_bugsnag, new_bugsnag)

    # Removes loading of calculator and prints it
    old_load = re.search(
        "define\(['\"]toplevel/calculator_desktop.*?}\);", js).group()
    new_load = 'define("toplevel/calculator_desktop",[],function(){})'
    js = js.replace(old_load, new_load)
    open("./app/desmos/calculator.js", "w").write(js)

    if DEBUG_MODE:
        print("\nDesmos default load function:")
        print(jsb.beautify(old_load))
        print("\nBeautifying calculator.js for debug...")
        open("./app/desmos/calc_debug.js", "w").write(
            jsb.beautify(js)
        )


if __name__ == "__main__":
    main()
