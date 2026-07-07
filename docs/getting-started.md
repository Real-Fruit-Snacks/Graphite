# Getting started

## Install Slate

**From Community plugins:**

1. Open Obsidian Settings → Community plugins.
2. Click **Browse** and search for `Slate`.
3. Install and enable the plugin.

**Manual installation:**

1. Download `manifest.json`, `main.js`, and `styles.css` from a [GitHub release](https://github.com/Real-Fruit-Snacks/obsidian-slate-tasks/releases).
2. Create `.obsidian/plugins/slate/` inside your vault.
3. Copy the three files into that folder.
4. Reload Obsidian.
5. Go to Settings → Community plugins → enable **Slate**.

---

## Open Slate

Run `Slate: Open` from the command palette, or click the Slate icon in the sidebar ribbon.

---

## Create your first task

1. Click **+ Add task** at the top of any view.
2. Type a task title.
3. Optionally set a project, due date, priority, or labels from the composer.
4. Press Enter or click **Add task**.

You can also run `Slate: Add task` from the command palette to capture a task without opening the full board first.

**Quick-add shortcuts in the title field:**

| Type | Effect |
|---|---|
| `#label` | Adds a label to the task |
| `//project` | Assigns the task to a project |

Example: `Write report #work //Client Work` — creates a task titled "Write report" with label `work` in project `Client Work`.

---

## Understand the views

| View | Shows |
|---|---|
| **Inbox** | Tasks with no project |
| **Today** | Tasks due today + overdue tasks |
| **Upcoming** | Future tasks grouped by date |
| **Projects** | All projects or a single project |
| **Filters & Labels** | Browse by priority, date, or label |
| **Activity** | Completed task stats and history |
| **Completed** | Done tasks grouped by completion date |

---

## Where are my tasks stored?

Slate stores tasks as Markdown files inside your vault. The default location is `_slate_files/`. You can change this in Settings.

See [Markdown storage](markdown-storage.md) for details.
