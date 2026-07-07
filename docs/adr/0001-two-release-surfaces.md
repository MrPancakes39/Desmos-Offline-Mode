# ADR 0001: Two Release Surfaces

## Status

Accepted.

## Context

DSOM needs to serve two user groups:

- Users who want a small local app that runs through a browser.
- Users who want a full desktop application with native behavior.

The project is also inspired by T3 Code's split between a server/web surface and a desktop shell around the same product experience.

## Decision

DSOM will have two release surfaces:

- `desmos-offline-lite`, launched by `desmos serve`.
- `desmos-offline-desktop`, launched by `desmos desktop`.

Lite starts a local HTTP server that serves files only.

Desktop should reuse the same app and resource-loading path as Lite, then add desktop-native capabilities around it.

## Consequences

The shared web app becomes the main product surface.

Desktop-specific capabilities should be added behind clear boundaries, such as file handling and shell integration, instead of forking the calculator app.

The project can ship a useful small binary before the full desktop app is finished.

Testing should prioritize the shared runtime path because both release surfaces depend on it.

## Alternatives Considered

### Desktop only

Rejected because it delays the smaller server-only use case and makes the first release surface heavier than necessary.

### Browser/server only

Rejected because desktop-native file handling, menus, and updater UI are expected parts of the long-term product.

### Separate desktop and lite implementations

Rejected because two independent loading paths would increase breakage risk around Desmos resources.
