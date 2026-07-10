import type { DesmosFileFormat, FileHandler } from "../file-handler.interface";

export class DesktopFileHandler implements FileHandler {
  async openFile() {
    return { error: "Not implemented", file: null };
  }

  saveFile(_fileContent: DesmosFileFormat, _filename: string): void {
    throw new Error("Not implemented");
  }

  printFile(): void {
    throw new Error("Not implemented");
  }
}
