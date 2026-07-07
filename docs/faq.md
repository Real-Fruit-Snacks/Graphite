# FAQ

## Is Slate a Todoist integration?

No. Slate is a Todoist-**inspired** task manager. It does not connect to Todoist, does not sync with Todoist, and does not require a Todoist account.

---

## Where are my tasks stored?

Inside your Obsidian vault, in the Slate data folder (`_slate_files/` by default). See [Markdown storage](markdown-storage.md).

---

## Can I edit task files directly?

Yes. Task files are plain Markdown. Slate reads and writes them using the Obsidian Vault API. If you edit the files directly, Slate will reload them automatically.

Be careful not to break the metadata format. Unknown fields are preserved but malformed lines may be ignored.

---

## Does Slate work with Obsidian Sync?

Yes. Because task data is plain Markdown in your vault, any file-based sync method works — including Obsidian Sync, iCloud, Dropbox, or git. Slate itself does not handle sync.

---

## Will Slate task files appear in Obsidian search?

Yes, because they are real vault files. If you do not want them to appear in search or the graph, add the data folder to Obsidian's excluded files list.

---

## Can I use Slate alongside other task plugins?

Slate only reads and writes files in its configured data folder. It does not scan your entire vault. It should coexist with other plugins as long as they do not use the same file paths.

---

## Does Slate work on mobile?

Yes. Slate is designed to work on both desktop and mobile. See [Mobile](mobile.md).

---

## Does Slate track productivity or send analytics?

No. The Activity view is calculated locally from completed tasks in your configured Slate data folder. Slate does not send analytics or telemetry.

---

## What happens to sub-tasks if I delete a parent task?

Currently, sub-tasks are not automatically deleted when the parent task is deleted. They become orphaned tasks without a parent. This behavior will be improved in a future version.

---

## Can I import tasks from Todoist or another app?

Not yet. Vault-wide import and external app import are planned improvements, not current features.

---

## Can I have tasks without a project?

Yes. Tasks with no project assigned appear in **Inbox**. This is the intended behavior.

---

## Does Slate support natural language date input?

Not yet. Dates are set using a date picker. Natural language parsing (`tomorrow`, `next Friday`) is a planned improvement.
