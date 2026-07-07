# ADR 0002: User-Installed Desmos Resource Packs

## Status

Accepted.

## Context

DSOM depends on Desmos calculator assets. The current v1.0.0-era approach bundles downloaded Desmos resources into the app output.

Future releases should minimize redistribution of third-party Desmos code. DSOM should ship project-owned code and tooling, while users explicitly install Desmos resources into their own local cache.

## Decision

Future DSOM release artifacts should not bundle Desmos calculator JavaScript, CSS, fonts, or locale files.

DSOM will provide a `desmos resources` command group that downloads Desmos resources into a user-owned resource cache.

The local runtime will serve the active resource pack at `/desmos/`.

Normal app startup must not silently download Desmos resources. Missing resources should produce a clear first-run message:

```text
Desmos resources are not installed.

Run:
  desmos resources install
```

Desktop may present this as first-run UI, but the operation should still be visible and explicit.

## Consequences

Release artifacts contain DSOM code, fetch adapters, and compatibility metadata, but not Desmos calculator assets.

Offline use requires initial resource installation while the user has network access.

Initial setup can fail when Desmos changes in a way DSOM cannot safely fetch or patch yet.

The resource manager becomes a first-class subsystem rather than a build-only script.

## Alternatives Considered

### Bundle Desmos resources in every release

Rejected for future releases because it increases third-party redistribution risk.

### Download resources silently on app startup

Rejected because it makes offline startup unpredictable and hides a meaningful network/write operation from users.

### Always load Desmos from the network

Rejected because it does not satisfy the offline-oriented product goal.
