import { TFile, TFolder, TAbstractFile, normalizePath } from "../stubs/obsidian";

/**
 * A minimal in-memory stand-in for the slice of Obsidian's Vault/FileManager
 * that TaskStore uses. Files and folders live in plain Maps/Sets keyed by
 * normalized path. Async methods resolve on a microtask, so awaiting them
 * yields the event loop — enough to exercise the store's write queue under
 * concurrent calls.
 */
export class FakeVault {
  files = new Map<string, string>();
  binaries = new Map<string, ArrayBuffer>();
  folders = new Set<string>();

  private makeTFile(path: string): TFile {
    const file = new TFile();
    file.path = path;
    file.name = path.split("/").pop() || path;
    return file;
  }

  private makeTFolder(path: string): TFolder {
    const folder = new TFolder();
    folder.path = path;
    folder.name = path.split("/").pop() || path;
    return folder;
  }

  async read(file: TAbstractFile): Promise<string> {
    return this.files.get(normalizePath(file.path)) ?? "";
  }

  async modify(file: TAbstractFile, content: string): Promise<void> {
    this.files.set(normalizePath(file.path), content);
  }

  async create(path: string, content: string): Promise<TFile> {
    const p = normalizePath(path);
    if (this.files.has(p) || this.folders.has(p)) {
      throw new Error("File already exists.");
    }
    this.files.set(p, content);
    return this.makeTFile(p);
  }

  async createBinary(path: string, data: ArrayBuffer): Promise<TFile> {
    const p = normalizePath(path);
    if (this.binaries.has(p)) {
      throw new Error("File already exists.");
    }
    this.binaries.set(p, data);
    return this.makeTFile(p);
  }

  async createFolder(path: string): Promise<void> {
    const p = normalizePath(path);
    if (this.folders.has(p)) {
      throw new Error("Folder already exists.");
    }
    this.folders.add(p);
  }

  getAbstractFileByPath(path: string): TAbstractFile | null {
    const p = normalizePath(path);
    if (this.files.has(p) || this.binaries.has(p)) {
      return this.makeTFile(p);
    }
    if (this.folders.has(p)) {
      return this.makeTFolder(p);
    }
    return null;
  }

  getFiles(): TFile[] {
    return [...this.files.keys(), ...this.binaries.keys()].map((p) => this.makeTFile(p));
  }

  async rename(file: TAbstractFile, newPath: string): Promise<void> {
    const from = normalizePath(file.path);
    const to = normalizePath(newPath);
    if (this.files.has(from)) {
      this.files.set(to, this.files.get(from) as string);
      this.files.delete(from);
    }
    if (this.binaries.has(from)) {
      this.binaries.set(to, this.binaries.get(from) as ArrayBuffer);
      this.binaries.delete(from);
    }
  }
}

class FakeFileManager {
  constructor(private vault: FakeVault) {}

  async trashFile(file: TAbstractFile): Promise<void> {
    const p = normalizePath(file.path);
    this.vault.files.delete(p);
    this.vault.binaries.delete(p);
    this.vault.folders.delete(p);
  }
}

export interface FakeApp {
  vault: FakeVault;
  fileManager: FakeFileManager;
}

export function createFakeApp(): { app: FakeApp; vault: FakeVault } {
  const vault = new FakeVault();
  const fileManager = new FakeFileManager(vault);
  return { app: { vault, fileManager }, vault };
}
