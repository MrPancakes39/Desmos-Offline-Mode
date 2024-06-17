import { parseDesmosFile, type FileHandler, type DesmosFileFormat } from "./DesmosFileFormat";
import { createElt } from "#utils";

export class WebFileHandler implements FileHandler {
  browserPrint: () => void;
  fileDownloader: FileDownloader;

  constructor() {
    this.browserPrint = window.print;
    this.fileDownloader = new FileDownloader();
  }

  printFile(): void {
    this.browserPrint();
  }

  async openFile() {
    try {
      // Get file
      const selectedFile = await new Promise<File>((resolve) => {
        const input = createElt<HTMLInputElement>(
          `<input type="file" accept=".desmos,application/x-desmos" style="display: none">`
        );
        input.addEventListener(
          "change",
          () => {
            const file = input.files?.[0];
            if (file === undefined) {
              throw new Error("No file selected");
            }
            resolve(file);
          },
          { once: true }
        );
        input.addEventListener("click", (e) => {
          document.body.removeChild(input);
          e.stopPropagation();
        });
        document.body.appendChild(input);
        input.click();
      });

      // Read file
      const fileContent = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          if (typeof reader.result !== "string") {
            throw new Error("Could not read file");
          }
          resolve(reader.result);
        });
        reader.addEventListener("error", () => {
          throw new Error("Could not read file");
        });
        reader.readAsText(selectedFile);
      });

      // Parse file
      const result = parseDesmosFile(fileContent);
      if (result.is_invalid_file) {
        return { error: "Invalid desmos file", file: null };
      }
      return { error: null, file: result.desmos_file };
    } catch (e) {
      const errMessage = typeof e === "string" ? e : e instanceof Error ? e.message : "Unknown error";
      if (e === "Unknown error") {
        console.error(e);
      }
      return { error: errMessage, file: null };
    }
  }

  saveFile(fileContent: DesmosFileFormat, filename: string): void {
    this.fileDownloader.saveJSON(fileContent, filename, "desmos");
  }
}

// =======================================================================================================================

/*
 *  File-Downloader
 *
 *  adapted from p5.js source code
 */

type Booleanish = boolean | "true" | "false";
type any_string = string & NonNullable<unknown>;

class FileDownloader {
  _isSafari: boolean;

  constructor() {
    this._isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }

  _checkFileExtension(filename?: string, extension?: any_string | Booleanish): [string, string] {
    if (!extension || extension === true || extension === "true") {
      extension = "";
    }
    if (!filename) {
      filename = "untitled";
    }
    let ext = "";
    // make sure the file will have a name, see if filename needs extension
    if (filename.includes(".")) {
      ext = filename.split(".").pop()!;
    }
    // append extension if it doesn't exist
    if (extension) {
      if (ext !== extension) {
        ext = extension;
        filename = `${filename}.${ext}`;
      }
    }
    return [filename, ext];
  }

  downloadFile(data: string | Blob, fName: string, extension: string) {
    const fx = this._checkFileExtension(fName, extension);
    const filename = fx[0];

    const link = data instanceof Blob ? URL.createObjectURL(data) : typeof data === "string" ? data : "";

    const a = document.createElement("a");
    a.href = link;
    a.download = filename;

    // Firefox requires the link to be added to the DOM before click()
    a.onclick = (e) => {
      document.body.removeChild(a); // destroyClickedElement
      e.stopPropagation();
    };

    a.style.display = "none";
    document.body.appendChild(a);

    // Safari will open this file in the same page as a confusing Blob.
    if (this._isSafari) {
      let aText = "Hello, Safari user! To download this file...\n";
      aText += "1. Go to File --> Save As.\n";
      aText += '2. Choose "Page Source" as the Format.\n';
      aText += `3. Name it with this extension: ."${fx[1]}"`;
      alert(aText);
    }
    a.click();
  }

  writeFile(dataToDownload: BlobPart[], filename: string, extension: string) {
    let type = "application/octet-stream";
    if (this._isSafari) {
      type = "text/plain";
    }
    const blob = new Blob(dataToDownload, {
      type,
    });
    this.downloadFile(blob, filename, extension);
  }

  saveStrings(list: string[], filename: string, extension: string, isCRLF?: boolean) {
    const ext = extension || "txt";
    const pWriter = new PrintWriter(filename, ext);

    for (const line of list) {
      isCRLF ? pWriter.write(line + "\r\n") : pWriter.write(line + "\n");
    }
    pWriter.close();
    pWriter.clear();
  }

  saveJSON(json: Record<string, unknown>, filename: string, extension = "json", opt?: boolean) {
    let stringify;
    if (opt) {
      stringify = JSON.stringify(json);
    } else {
      stringify = JSON.stringify(json, undefined, 2);
    }
    this.saveStrings(stringify.split("\n"), filename, extension);
  }

  saveImage(base64img: string, filename: string, extension: string) {
    const ext = extension || "jpeg";
    this.downloadFile(base64img, filename, ext);
  }
}

class PrintWriter {
  name: string;
  ext: string;
  content: string;

  constructor(filename: string, extension: string) {
    this.name = filename;
    this.ext = extension;
    this.content = "";
  }
  write(data: string) {
    this.content += data;
  }
  print(data: string) {
    this.content += `${data}\n`;
  }
  clear() {
    this.content = "";
  }
  close() {
    // convert String to Array for the writeFile Blob
    const arr = [];
    arr.push(this.content);
    new FileDownloader().writeFile(arr, this.name, this.ext);
    this.clear();
  }
}

// =======================================================================================================================
