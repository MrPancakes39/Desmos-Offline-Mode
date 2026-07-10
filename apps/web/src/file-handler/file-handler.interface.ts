import type { DesmosFileFormat } from "./parser/file.schema";

type OpenFileResult =
  | {
      error: null;
      file: DesmosFileFormat;
    }
  | {
      error: string;
      file: null;
    };

export interface FileHandler {
  openFile: () => Promise<OpenFileResult>;
  saveFile: (fileContent: DesmosFileFormat, filename: string) => void;
  printFile: () => void;
}

export type { DesmosFileFormat };
