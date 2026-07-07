# Desmos Offline Mode Architecture

## Purpose

Desmos Offline Mode (DSOM) provides an offline-oriented wrapper around Desmos calculator resources.

The long-term architecture separates DSOM-owned application code from user-installed Desmos resources. Future releases should ship DSOM code, fetch adapters, and compatibility metadata, but should not bundle Desmos calculator JavaScript, CSS, fonts, or locale data.

## Release Surfaces

DSOM has two intended release surfaces:

```text
                         DSOM release
                              |
              +---------------+---------------+
              |                               |
              v                               v
      desmos-offline-lite             desmos-offline-desktop
      `desmos serve`                  `desmos desktop`
              |                               |
              +---------------+---------------+
                              |
                              v
                    shared DSOM web app
                              |
                              v
                 user-installed resource pack
```

### Lite

Lite is a small server binary for regular users who want a simple local app without a desktop shell.

`desmos serve` starts a local HTTP server. Its job is to serve DSOM web files, expose runtime config, and map the active Desmos resource pack to `/desmos/`.

Lite does not provide desktop-native file dialogs, app menus, or updater UI.

### Desktop

Desktop is the full app shell.

`desmos desktop` should reuse the same web app and resource-loading path as Lite. The desktop shell adds native windows, file dialogs, menus, and future updater UI. Keeping Desktop on the same local runtime contract reduces the number of resource-loading paths that need to be tested.

## Runtime Shape

The local runtime is intentionally small:

```text
Browser or Electron window
          |
          | http://127.0.0.1:<port>/
          v
+----------------------------------+
| Local Runtime                    |
|                                  |
| GET /                            | -> DSOM web app
| GET /assets/...                  | -> DSOM built files
| GET /desmos/...                  | -> active resource pack
| GET /__dsom/config.json          | -> runtime config
+----------------------------------+
          |
          v
User resource cache
```

The server should not automatically fetch Desmos resources during normal app startup. If resources are missing, `desmos serve` should fail with a clear message telling the user to run `desmos resources install`. Desktop should show equivalent first-run UI.

## Resource Loading

The current `index.html` hard-codes Desmos resource tags. The target architecture should move that into a DSOM bootstrap module:

```text
index.html
  |
  v
src/bootstrap.ts
  |
  +-- read /__dsom/config.json
  +-- load <assetBaseUrl>/calculator.css
  +-- load <assetBaseUrl>/loading.css
  +-- load <assetBaseUrl>/preload_desmos.js
  +-- load <assetBaseUrl>/locales.js
  +-- load <assetBaseUrl>/calculator_api.js
  |
  v
import("./main")
```

Desmos assets should be loaded as script and stylesheet tags, not as ESM imports. DSOM currently expects Desmos globals such as `window.Desmos` to exist before app initialization.

The runtime config should describe the active pack:

```json
{
  "desmosAssetBaseUrl": "/desmos/",
  "desmosCommit": "571d15cdbfbf67bc598b671db5138a88a3dd8c00",
  "resourcePackId": "desmos-571d15c-dsom-1"
}
```

Resource pack CSS should prefer relative paths such as `./fonts/font.woff2`. Relative paths make packs portable across local HTTP, desktop protocols, tests, and future preview paths.

## Resource Installation

Resource installation is explicit:

```text
desmos resources install
        |
        v
fetch current Desmos page
        |
        v
discover Desmos commit and asset layout
        |
        v
select compatible fetch adapter
        |
        v
download assets into a new pack directory
        |
        v
validate pack
        |
        v
mark pack active and last-known-good
```

Future DSOM releases should ship fetch adapters and a resource catalog, not Desmos calculator assets.

## Resource Cache

The resource cache should preserve multiple packs:

```text
<user-data-dir>/desmos-offline/
  resources/
    packs/
      571d15cdbfbf67bc598b671db5138a88a3dd8c00/
        pack.json
        calculator.css
        loading.css
        preload_desmos.js
        locales.js
        calculator_api.js
        fonts/
      <another-desmos-commit>/
        pack.json
        ...
    active-pack.json
    last-known-good.json
```

`active-pack.json` points to the pack the runtime should serve.

`last-known-good.json` points to the most recent pack that DSOM successfully loaded. Resource updates must not delete this pack automatically.

## Fetch Adapters And Compatibility

Fetch adapters should model upstream asset layouts:

```text
resources/
  adapters/
    calculator-desktop-layout-v1.ts
    calculator-desktop-layout-v2.ts
  compatibility.json
```

`compatibility.json` maps known Desmos commits to adapters and records tested coverage:

```json
{
  "packSchemaVersion": 1,
  "adapters": {
    "calculator-desktop-layout-v1": {
      "testedCommits": [
        "571d15cdbfbf67bc598b671db5138a88a3dd8c00"
      ]
    }
  }
}
```

A single adapter may work for many Desmos commits. Unknown commits may be attempted only through an explicit advanced path such as `--allow-untested-adapter`, and only if validation passes.

An advanced user may also be allowed to select a specific adapter, for example `--adapter calculator-desktop-layout-v1 --allow-untested-adapter`. This should be treated as a risky recovery path, not as the default install experience.

## Update And Rollback

There are three update domains:

```text
App update
  New DSOM binary or desktop release

Resource catalog update
  New DSOM compatibility metadata and fetch adapters
  No Desmos calculator assets

Resource pack update
  New user-installed Desmos assets in local cache
```

Resource updates should be additive. Installing a new pack should not remove the last known good pack.

If a new pack fails after an existing install, DSOM should continue to offer rollback to the last known good pack.

If initial setup fails and no pack exists, DSOM should stop and explain that the current Desmos version is unsupported or could not be installed safely.

The desktop app updater itself is future work. The architecture only requires that app updates, resource catalog updates, and resource pack updates remain separate concepts.

## Command Surface

The target command surface is:

```text
desmos serve
desmos desktop

desmos resources install
desmos resources update
desmos resources list
desmos resources rollback
desmos resources reinstall
desmos resources report
```

`desmos serve` should not silently run `desmos resources install`.

`desmos desktop` may guide users through first-run resource installation, but the resource operation should still be explicit and visible.

`desmos resources report` should help users describe a broken pack, including the DSOM version, Desmos commit, selected adapter, active pack, last known good pack, and validation failure. It does not need to upload automatically in the first implementation.

## Packaging

The primary distribution path is GitHub Releases:

```text
GitHub Releases
  desmos-offline-lite-linux-x64
  desmos-offline-lite-macos-arm64
  desmos-offline-lite-windows-x64.exe
  desktop installers later
```

An npm package may be added later for advanced users and developers, but it is not the primary target for regular users.

## Current Implementation Notes

The current codebase is a Vite/TypeScript web app. It already has a `FileHandler` abstraction with `WebFileHandler` implemented and `DesktopFileHandler` stubbed, which is a natural boundary for future desktop-native behavior.

The current `fetch_desmos_res/fetch_desmos.mjs` script downloads and patches Desmos assets into `public/desmos/`. Future work should turn this into explicit resource-manager behavior that writes to the user resource cache instead of bundling resources in the app build.
