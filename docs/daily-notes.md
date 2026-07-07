# Daily Notes

Slate can show completed tasks for the active daily note date.

By default, the integration is non-invasive: Slate can show the list in its own panel or in a code block you add manually. If you enable auto-insert in settings, Slate can append that code block to daily notes that do not already have it.

---

## How to use it

### Slate panel

If a Slate panel is already open, opening a daily note switches that panel to the matching Daily Note view automatically.

You can also run **Slate: Show Completed Tasks for Active Daily Note** from the command palette. Slate opens its task panel and shows tasks completed on that daily note date.

### Markdown code block

Add this block to a daily note to show completed tasks directly inside the note:

````markdown
```slate-completed
```
````

By default, Slate detects the date from the note path/name. You can also pass an explicit date:

````markdown
```slate-completed
date: 2026-07-05
```
````

The code block is read-only. It renders completed tasks from Slate task data, but it does not write task content into the note.

You can insert the block from the command palette with **Slate: Insert Completed Tasks Block in Active Daily Note**.

### Auto-insert

Settings → Slate → Daily Notes includes **Auto-add completed tasks block**.

When enabled, opening a daily note appends this block to the end of the note if it is not already present:

````markdown
```slate-completed
```
````

Slate only inserts the block wrapper. The completed-task list still renders dynamically from Slate task data.

---

## Date matching

By default, Slate looks for daily notes named like:

```text
YYYY-MM-DD.md
```

You can change the date format in Settings → Slate → Daily Notes.

Supported numeric tokens:

- `YYYY`
- `YY`
- `MM`
- `M`
- `DD`
- `D`

Example:

```text
YYYY/MM/YYYY-MM-DD
```

Slate also falls back to detecting an ISO date like `2026-07-05` from the note name.

---

## Recurring tasks

Recurring task completions are included when the task has a completed occurrence for that date.

---

## Notes

The integration currently uses the configurable date format in Slate settings plus an ISO-date fallback. Auto-insert is optional and disabled by default.
