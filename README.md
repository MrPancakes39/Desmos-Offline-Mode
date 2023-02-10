# Desmos | Offline Mode

Desmos is a well known Graphing Calculator available for the web and mobile, but no desktop port exist.

Desmos Offline Mode is a desktop port of Desmos Web Version, with the added feature of working offline.

## Update

This is not a dead project. I am just a little busy because of University.

## Branches

`web-app`: Desmos Offline Mode as a web app.  
`docker`: A docker container for the web app.  
`main`: The desktop app based of web app.
 
# Build Instructions:

```console
$ git clone https://github.com/MrPancakes39/Desmos-Offline-Mode.git 
$ cd Desmos-Offline-Mode
$ yarn # or npm install
```
For Windows:  
```console
$ yarn run package-win # or npm run package-win
```
For Linux:  
```console
$ # arch: x64 or arm64 
$ yarn run package-linux-arch # or npm run package-linux-arch
```

# Differences from Web Version

See [differences.md](./differences.md)

## Licenses

![GPL-v3](https://www.gnu.org/graphics/gplv3-127x51.png)

All source codes (except `desmos/` directory) are licensed under [GPL-3.0](https://opensource.org/licenses/GPL-3.0)
