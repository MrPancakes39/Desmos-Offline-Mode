#!/bin/env python3

# libs for getting desmos files
import requests
from zipfile import ZipFile
# libs for working with files
import os
import sys
import shutil
import re
# lib for parsing html
from bs4 import BeautifulSoup

# creates extension's URL
PRODVERSION = "69.0.3497.100"
EXTENSIONID = "ppkkplnhefiifjmgokbhhjebbddhiipf"
CRX_URL = f"https://clients2.google.com/service/update2/crx?response=redirect&acceptformat=crx2,crx3&prodversion={PRODVERSION}&x=id%3D{EXTENSIONID}%26uc"


def get_files():
    # fetch the extension
    print("[1/4] Getting Desmos files")
    res = requests.get(CRX_URL)
    if res:
        # save it to a zip file
        print("[2/4] Saving response")
        with open("./desmos.zip", "wb") as f:
            f.write(res.content)

    # extracts the desmos api files
    print("[3/4] Extracting files")
    with ZipFile("./desmos.zip", "r") as zip:
        for file in zip.namelist():
            if file.startswith("www/"):
                zip.extract(file, ".")

    # deletes temporary extension file
    print("[4/4] Delete tmp files")
    if os.path.isfile("./desmos.zip"):
        os.remove("./desmos.zip")


def parse_files():
    # checks to see if commit of the html file is the expected
    print("[1/4] Checking API")
    COMMIT = "7be343827dcbd820390c9a4bb22e39e58c3a7a70"
    content = open("./www/index.html").read()
    if(content.find(f"Desmos.commit = '{COMMIT}';") == -1):
        index = content.find("Desmos.commit")
        line = content[index:].split(";")[0]
        # searches line for commit and removes the quotes
        actual_commit = re.search(r"('.+')", line).group(0)[1:-1]
        print(
            f"Error: Expected repo commit '{COMMIT}' got '{actual_commit}'.", file=sys.stderr)
    else:
        # renames all the files into normal names
        print("[2/4] Moving files")
        path = "./www/assets/build/"
        file_list = os.listdir(path)
        rename_list = [
            [f"{j[0]}-{j[1]}", f"{j[0]}.{j[1].split('.')[1]}"] for j in [i.split("-") for i in file_list]]
        for f in rename_list:
            os.rename(path+f[0], path+f[1])
        # move all the files to desmos directory
        file_list = [i[1] for i in rename_list]
        for f in file_list:
            shutil.move(
                f"./www/assets/build/{f}", f"./assets/desmos/{f}")
        # saves the css and js in index.html to seperate files
        print("[3/4] Generating files")
        soup = BeautifulSoup(content, "html.parser")
        open("./assets/desmos/loading.css",
             "w").write(soup.head.style.contents[0])
        open("./assets/desmos/loading.js",
             "w").write(soup.head.script.contents[0])
        # removes analytics post event
        print("[4/4] Fixing files")
        path = "./assets/desmos/calculator_practice.js"
        content = open(path).read()
        open(path, "w").write(content.replace(
            ',r.ajax({url:"/data-events",type:"POST",contentType:"application/json",data:JSON.stringify({events:e})}).always(function(){d=!1,s()})', ''))


def cleanup_workspace():
    if os.path.isdir("./www"):
        print("Found www/ removing")
        shutil.rmtree("./www")
    if os.path.isdir("./assets/desmos/"):
        print("Found assets/desmos/ emptying")
        shutil.rmtree("./assets/desmos/")
        os.mkdir("./assets/desmos/")


def main():
    print("Step 0:")
    cleanup_workspace()
    print("Step 1:")
    get_files()
    print("Step 2:")
    parse_files()
    # remove temp directory
    if os.path.isdir("./www"):
        shutil.rmtree("./www")


if __name__ == "__main__":
    main()
