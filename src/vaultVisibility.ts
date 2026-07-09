import { App, Notice } from "obsidian";

const IGNORE_FILTERS_KEY = "userIgnoreFilters";

/**
 * Keeps the Graphite data folder out of the way by adding it to Obsidian's
 * "Excluded files" list. That excludes it from search, graph, backlinks, and the
 * quick switcher, and dims it in the file explorer — without touching the data on
 * disk. This relies on the semi-internal vault config API; when unavailable it
 * degrades to a one-time notice telling the user how to add the exclusion manually.
 */
export class DataFolderVisibility {
  private lastFilterPath: string | null = null;
  private warnedFilterFailure = false;

  constructor(private app: App) {}

  /** Reconcile the excluded-files entry to the given folder path and hidden state. */
  apply(folderPath: string, hidden: boolean): void {
    this.applyExcludedFilter(folderPath, hidden);
  }

  /** No transient UI state to tear down; excluded-files entries are left as-is. */
  destroy(): void {}

  private applyExcludedFilter(folderPath: string, hidden: boolean): void {
    const vault = this.app.vault as unknown as {
      getConfig?(key: string): unknown;
      setConfig?(key: string, value: unknown): void;
    };

    if (typeof vault.getConfig !== "function" || typeof vault.setConfig !== "function") {
      this.warnFilterFallback(folderPath, hidden);
      return;
    }

    try {
      const current = vault.getConfig(IGNORE_FILTERS_KEY);
      const original: string[] = Array.isArray(current) ? (current as string[]) : [];
      let next = [...original];

      // Drop a stale entry from a previous apply (e.g. the folder was renamed).
      if (this.lastFilterPath && this.lastFilterPath !== folderPath) {
        next = next.filter((filter) => filter !== this.lastFilterPath);
      }

      if (hidden && folderPath) {
        if (!next.includes(folderPath)) {
          next.push(folderPath);
        }
        this.lastFilterPath = folderPath;
      } else {
        next = next.filter((filter) => filter !== folderPath);
        this.lastFilterPath = null;
      }

      if (!arraysEqual(original, next)) {
        vault.setConfig(IGNORE_FILTERS_KEY, next);

        const applied = vault.getConfig(IGNORE_FILTERS_KEY);
        const appliedList: string[] = Array.isArray(applied) ? (applied as string[]) : [];
        const wantsEntry = hidden && Boolean(folderPath);
        if (wantsEntry && !appliedList.includes(folderPath)) {
          this.warnFilterFallback(folderPath, hidden);
        }
      }
    } catch (error) {
      console.warn("[graphite] Could not update Obsidian excluded files list.", error);
      this.warnFilterFallback(folderPath, hidden);
    }
  }

  private warnFilterFallback(folderPath: string, hidden: boolean): void {
    if (!hidden || this.warnedFilterFailure) {
      return;
    }

    this.warnedFilterFailure = true;
    new Notice(
      `Graphite could not add "${folderPath}" to Obsidian's excluded files. To keep it ` +
        `out of search and dimmed in the file explorer, add it in ` +
        `Settings → Files and links → Excluded files.`,
      10000
    );
  }
}

function arraysEqual(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}
