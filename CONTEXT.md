# Desmos Offline Mode Context

This document defines the project vocabulary used by architecture docs, ADRs, issues, and future implementation work.

## Product Terms

### DSOM

Desmos Offline Mode. The application code owned by this repository.

DSOM is responsible for the offline-oriented user experience, file handling, resource management commands, and the local runtime that serves the app. DSOM is not the owner of Desmos calculator code.

### Lite

The server-only release surface for DSOM.

Lite is launched by `desmos serve`. It starts a local HTTP server that serves DSOM web files and an installed Desmos resource pack. Lite does not provide desktop-native file dialogs, menus, or updater UI.

### Desktop

The full desktop release surface for DSOM.

Desktop is launched by `desmos desktop`. It wraps the same DSOM web app/runtime path as Lite and adds desktop-native behavior such as windows, file dialogs, application menus, and future update UI.

### Local Runtime

The local process that serves DSOM to a browser or desktop window.

The local runtime is intentionally small. Its baseline responsibility is static file serving, runtime configuration, and mapping the active Desmos resource pack to `/desmos/`.

### DSOM Web App

The browser application in `src/`.

The web app owns the user interface and calculator integration. It expects Desmos globals to be available before DSOM app initialization runs.

## Desmos Resource Terms

### Desmos Resource Pack

A user-installed local cache of Desmos calculator assets.

A resource pack contains files downloaded from `desmos.com`, transformed as needed by a DSOM fetch adapter, and stored on the user's machine. Future DSOM releases should not bundle these assets in the release artifact.

### Active Pack

The Desmos resource pack currently exposed by the local runtime at `/desmos/`.

The app should load only one active pack at a time.

### Last Known Good Pack

The most recent resource pack that DSOM successfully loaded.

Updates must not automatically delete the last known good pack. If a new pack fails, users should be able to roll back.

### Initial Setup

The first resource installation on a machine where no usable resource pack exists.

Initial setup may fail if the current Desmos website version is unsupported. In that case DSOM should stop with a clear explanation instead of launching a broken app.

### Desmos Commit

The upstream Desmos website commit identifier discovered from the downloaded Desmos page.

The Desmos commit is separate from the DSOM application version. Multiple Desmos commits may be compatible with the same fetch adapter.

### Fetch Adapter

DSOM code that knows how to download, validate, and patch one Desmos asset layout.

Fetch adapters are versioned by the Desmos asset layout they understand, not necessarily by a single Desmos commit. A fetch adapter may support multiple Desmos commits.

### Resource Catalog

DSOM metadata that maps known Desmos commits and asset layouts to compatible fetch adapters.

The resource catalog may be bundled with DSOM and updated separately later. It must not include Desmos calculator assets.

### Untested Adapter Use

Installing resources for an upstream Desmos commit that has not been explicitly tested with the selected fetch adapter.

Untested adapter use should require an explicit advanced flag such as `--allow-untested-adapter`.

## Versioning Terms

### DSOM Version

The version of DSOM application code, CLI code, and desktop shell code.

Lite and Desktop should stay aligned on the same DSOM version while the project is small.

### Pack Schema Version

The version of the local resource-pack metadata format.

Pack schema versioning is independent from DSOM versioning and Desmos commit versioning.

## Command Terms

### `desmos serve`

Starts the Lite local runtime.

The command serves files only. It should not silently download or mutate Desmos resources.

### `desmos desktop`

Starts the Desktop app.

Desktop should reuse the same resource loading contract as `desmos serve` wherever possible.

### `desmos resources`

Command group for installing, updating, listing, reinstalling, rolling back, and reporting Desmos resource packs.

Resource commands may download files from Desmos and write to the user's resource cache.
