# ADR 0003: Resource Pack Versioning And Rollback

## Status

Accepted.

## Context

Desmos may change its deployed calculator assets independently of DSOM releases.

DSOM needs to know whether a Desmos version can be fetched and patched safely. It also needs a recovery path when a newly installed resource pack does not work.

The desired behavior is similar to update systems that can fall back to a previous working version.

## Decision

DSOM will version three things separately:

- DSOM app version.
- Desmos commit.
- Resource pack schema version.

Fetch adapters will be written for upstream Desmos asset layouts, not for individual commits. A single adapter may support many Desmos commits.

Compatibility metadata will map tested Desmos commits to compatible adapters.

Resource updates must preserve the last known good pack. Installing a new pack should not automatically remove the previous working pack.

DSOM should support rollback commands and UI:

```text
desmos resources list
desmos resources rollback
desmos resources reinstall
desmos resources report
```

Untested upstream commits may be attempted only through an explicit advanced option such as:

```text
--allow-untested-adapter
```

Advanced users may also be allowed to select an older adapter explicitly, but only behind the same kind of risk-signaling flag.

## Consequences

Users with an existing working install should not be broken by a failed resource update.

Initial setup may still fail if there is no compatible adapter and no previous pack to roll back to.

The resource cache must retain metadata about active and last-known-good packs.

The project needs validation checks that decide whether a newly installed pack is safe to activate.

Issue reporting can start as a diagnostic report command rather than an automatic upload flow.

## Alternatives Considered

### One fetch script per Desmos commit

Rejected because the same asset layout may work across multiple Desmos commits. Commit-specific scripts would create unnecessary duplication.

### Always force the newest Desmos resources

Rejected because upstream changes can break DSOM patching. The last known good pack must remain available.

### Keep only one local resource pack

Rejected because it removes rollback and makes failed updates destructive.
