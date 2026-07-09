# Changelog

All notable changes to Graphite are documented here.

---

## 0.1.1

Compliance and hardening pass ahead of community-directory submission.

- **Data-folder hiding now uses Obsidian's Excluded Files.** The folder is kept out
  of search, graph, and the quick switcher and dimmed in the file explorer, instead
  of being removed via injected CSS. Files are untouched on disk.
- **Removed the default Quick Add hotkey.** The *Quick Add Task* command is still
  available — assign your own shortcut under Settings → Hotkeys if you want one.
- Resolve theme colors and hide the data folder through the active window/document,
  for correct behavior in pop-out windows.
- Use Obsidian's styling APIs instead of direct style assignment, and drop unneeded
  `!important` and CSS the linter flags on older Obsidian versions.
- Release assets now ship with build-provenance attestations.

---

## 0.1.0

Initial Graphite release.

Graphite is a Todoist-inspired task manager for Obsidian that stores tasks as plain
Markdown files inside your vault. This first release establishes the full feature
set: Inbox, Today, Upcoming, Projects, Filters & Labels, Activity, Completed, and
Search views; full task CRUD with projects, priorities, due dates, deadlines,
labels, and attachments; sub-tasks; recurring tasks; and Daily Notes integration.
