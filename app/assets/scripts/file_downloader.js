/*
 *  File-Downloader
 *
 *  Salman Hasan <salmannhassan39@gmail.com>
 * 
 *  adapted from p5.js source code 
 */

class FileDownloader {
    constructor() {
        this._isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    }

    _checkFileExtension(filename, extension) {
        if (!extension || extension === true || extension === 'true') {
            extension = '';
        }
        if (!filename) {
            filename = 'untitled';
        }
        let ext = '';
        // make sure the file will have a name, see if filename needs extension
        if (filename && filename.includes('.')) {
            ext = filename.split('.').pop();
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

    downloadFile(data, fName, extension) {
        const fx = this._checkFileExtension(fName, extension);
        const filename = fx[0];

        const link =
            (data instanceof Blob) ? URL.createObjectURL(data) :
            (typeof data === "string") ? data :
            "";

        const a = document.createElement("a");
        a.href = link;
        a.download = filename;

        // Firefox requires the link to be added to the DOM before click()
        a.onclick = e => {
            document.body.removeChild(e.target); // destroyClickedElement
            e.stopPropagation();
        };

        a.style.display = "none";
        document.body.appendChild(a);

        // Safari will open this file in the same page as a confusing Blob.
        if (this._isSafari) {
            let aText = 'Hello, Safari user! To download this file...\n';
            aText += '1. Go to File --> Save As.\n';
            aText += '2. Choose "Page Source" as the Format.\n';
            aText += `3. Name it with this extension: ."${fx[1]}"`;
            alert(aText);
        }
        a.click();
    };

    writeFile(dataToDownload, filename, extension) {
        let type = "application/octet-stream";
        if (this._isSafari) {
            type = "text/plain";
        }
        const blob = new Blob(dataToDownload, {
            type
        });
        this.downloadFile(blob, filename, extension);
    }

    saveStrings(list, filename, extension, isCRLF) {
        const ext = extension || "txt";
        const pWriter = new FileDownloader.PrintWriter(filename, ext);
        for (let i = 0; i < list.length; i++) {
            isCRLF ? pWriter.write(list[i] + '\r\n') : pWriter.write(list[i] + '\n');
        }
        pWriter.close();
        pWriter.clear();
    };

    saveJSON(json, filename, opt) {
        let stringify;
        if (opt) {
            stringify = JSON.stringify(json);
        } else {
            stringify = JSON.stringify(json, undefined, 2);
        }
        this.saveStrings(stringify.split('\n'), filename, "json");
    };

    saveImage(base64img, filename, extension) {
        const ext = extension || "jpeg";
        this.downloadFile(base64img, filename, ext);
    }
}

FileDownloader.PrintWriter = class {
    constructor(filename, extension) {
        this.name = filename;
        this.ext = extension;
        this.content = "";
    }
    write(data) {
        this.content += data;
    };
    print(data) {
        this.content += `${data}\n`;
    };
    clear() {
        this.content = '';
    };
    close() {
        // convert String to Array for the writeFile Blob
        const arr = [];
        arr.push(this.content);
        new FileDownloader().writeFile(arr, this.name, this.ext);
        this.clear();
    };
}