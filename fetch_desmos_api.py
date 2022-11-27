#!/bin/env python3

import re
import requests


def main():
    # Get HTML Page
    print("[1/4] Getting HTML Page")
    URL = "https://www.desmos.com"
    response = requests.get(URL + "/calculator")
    if not response.ok:
        raise Exception("Couldn't get html page of desmos.")
    html = response.content.decode()

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
    # Removing bugsnag
    js = open("./app/desmos/calculator.js").read()
    old_bugsnag = re.search("define\('bugsnag'.*?}\);\ndefine", js).group()
    new_bugsnag = "define('bugsnag',[\"exports\"],function(e){e.setBeforeSendCB=e.leaveBreadcrumb=e.notify=e.init=function(){}});\ndefine"
    open("./app/desmos/calculator.js", "w"
         ).write(js.replace(old_bugsnag, new_bugsnag))


if __name__ == "__main__":
    main()
