/*
 *  File-Downloader
 *  Salman Hasan <salmannhassan39@gmail.com>
 *  adapted from p5.js source code 
 */
class FileDownloader {
    constructor() {this._isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);}
    _checkFileExtension(filename, extension) {if (!extension || extension === true || extension === 'true') {extension = '';}if (!filename) {filename = 'untitled';}let ext = '';if (filename && filename.includes('.')) {ext = filename.split('.').pop();}if (extension) {if (ext !== extension) {ext = extension;filename = `${filename}.${ext}`;}}return [filename, ext];}
    downloadFile(data, fName, extension) {const fx = this._checkFileExtension(fName, extension);const filename = fx[0];const link = (data instanceof Blob) ? URL.createObjectURL(data) : (typeof data === "string") ? data : "";const a = document.createElement("a");a.href = link;a.download = filename;a.onclick = e => {document.body.removeChild(e.target);e.stopPropagation();};a.style.display = "none";document.body.appendChild(a);if (this._isSafari) {let aText = 'Hello, Safari user! To download this file...\n';aText += '1. Go to File --> Save As.\n';aText += '2. Choose "Page Source" as the Format.\n';aText += `3. Name it with this extension: ."${fx[1]}"`;alert(aText);}a.click();};
    writeFile(dataToDownload, filename, extension) {let type = "application/octet-stream";if (this._isSafari) {type = "text/plain";}const blob = new Blob(dataToDownload, {type});this.downloadFile(blob, filename, extension);}
    saveStrings(list, filename, extension, isCRLF) {const ext = extension || "txt";const pWriter = new FileDownloader.PrintWriter(filename, ext);for (let i = 0; i < list.length; i++) {isCRLF ? pWriter.write(list[i] + '\r\n') : pWriter.write(list[i] + '\n');}pWriter.close();pWriter.clear();};
    saveJSON(json, filename, opt) {let stringify;if (opt) {stringify = JSON.stringify(json);} else {stringify = JSON.stringify(json, undefined, 2);}this.saveStrings(stringify.split('\n'), filename, "json");};
    saveImage(base64img, filename, extension) {const ext = extension || "jpeg";this.downloadFile(base64img, filename, ext);}
}
FileDownloader.PrintWriter = class {
    constructor(filename, extension) {this.name = filename;this.ext = extension;this.content = "";}
    write(data) {this.content += data;};
    print(data) {this.content += `${data}\n`;};
    clear() {this.content = '';};
    close() {const arr = [];arr.push(this.content);new FileDownloader().writeFile(arr, this.name, this.ext);this.clear();};
}

// lodash.isplainobject
define("lodash/_freeGlobal",[],function(){var freeGlobal=typeof global=="object"&&global&&global.Object===Object&&global;return freeGlobal});define("lodash/_root",["lodash/_freeGlobal"],function(freeGlobal){var freeSelf=typeof self=="object"&&self&&self.Object===Object&&self;var root=freeGlobal||freeSelf||Function("return this")();return root});define("lodash/_Symbol",["lodash/_root"],function(root){var Symbol=root.Symbol;return Symbol});define("lodash/_getRawTag",["lodash/_Symbol"],function(Symbol){var undefined;var objectProto=Object.prototype;var hasOwnProperty=objectProto.hasOwnProperty;var nativeObjectToString=objectProto.toString;var symToStringTag=Symbol?Symbol.toStringTag:undefined;function getRawTag(value){var isOwn=hasOwnProperty.call(value,symToStringTag),tag=value[symToStringTag];try{value[symToStringTag]=undefined;var unmasked=!0}catch(e){}
var result=nativeObjectToString.call(value);if(unmasked){if(isOwn){value[symToStringTag]=tag}else{delete value[symToStringTag]}}
return result}
return getRawTag});define("lodash/_objectToString",[],function(){var objectProto=Object.prototype;var nativeObjectToString=objectProto.toString;function objectToString(value){return nativeObjectToString.call(value)}
return objectToString});define("lodash/_baseGetTag",["lodash/_Symbol","lodash/_getRawTag","lodash/_objectToString",],function(Symbol,getRawTag,objectToString){var undefined;var nullTag="[object Null]",undefinedTag="[object Undefined]";var symToStringTag=Symbol?Symbol.toStringTag:undefined;function baseGetTag(value){if(value==null){return value===undefined?undefinedTag:nullTag}
return symToStringTag&&symToStringTag in Object(value)?getRawTag(value):objectToString(value)}
return baseGetTag});define("lodash/_overArg",[],function(){function overArg(func,transform){return function(arg){return func(transform(arg))}}
return overArg});define("lodash/_getPrototype",["lodash/_overArg"],function(overArg){var getPrototype=overArg(Object.getPrototypeOf,Object);return getPrototype});define("lodash/isObjectLike",[],function(){function isObjectLike(value){return value!=null&&typeof value=="object"}
return isObjectLike});define("lodash/isPlainObject",["lodash/_baseGetTag","lodash/_getPrototype","lodash/isObjectLike",],function(baseGetTag,getPrototype,isObjectLike){var objectTag="[object Object]";var funcProto=Function.prototype,objectProto=Object.prototype;var funcToString=funcProto.toString;var hasOwnProperty=objectProto.hasOwnProperty;var objectCtorString=funcToString.call(Object);function isPlainObject(value){if(!isObjectLike(value)||baseGetTag(value)!=objectTag){return!1}
var proto=getPrototype(value);if(proto===null){return!0}
var Ctor=hasOwnProperty.call(proto,"constructor")&&proto.constructor;return(typeof Ctor=="function"&&Ctor instanceof Ctor&&funcToString.call(Ctor)==objectCtorString)}
return isPlainObject});define("lodash",["underscore","lodash/isPlainObject"],function(_,isPlainObject){_.isPlainObject=isPlainObject;return _})