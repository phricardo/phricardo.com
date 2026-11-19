---
name: git-session-author
description: Preserve the active Git session identity when creating or rewriting commits. Use before commit, amend, squash, rebase, cherry-pick, or any operation that can create commits.
---

# Git Session Author

Before creating or rewriting a commit:

1. Read the repository-resolved `git config user.name` and `git config user.email`. If either value is missing, stop and ask the user to configure the Git session identity.
2. Treat that configured name and email as the only authorized author and committer identity. Do not override them with `--author`, environment variables, or agent-owned identities.
3. Do not add `Co-Authored-By`, `Signed-off-by`, assistant attribution, or names or email addresses belonging to Claude, Codex, another model, or an agent. If a different human identity is required, the user must first change the Git session configuration.
4. Do not change the user's existing cryptographic commit-signing configuration. An agent must never claim authorship or contribution through a signature, trailer, or commit message.
5. After a history rewrite, verify every reachable rewritten commit uses only the configured identity for both author and committer and contains no agent-attribution trailers.

This skill controls attribution only. It does not grant permission to create commits, rewrite history, or push changes.
