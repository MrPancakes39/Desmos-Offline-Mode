# Issue tracker: GitHub

Issues and PRDs for this repo live as GitHub issues. Use the `gh` CLI for all operations.

PRs as a request surface: no.

When a skill says "publish to the issue tracker", create a GitHub issue.

When a skill says "fetch the relevant ticket", run `gh issue view <number> --comments`.

Use the standard `gh issue create/view/list/comment/edit/close` commands. Infer the repo from `git remote -v`.
