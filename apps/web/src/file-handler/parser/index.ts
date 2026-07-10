import { DesmosFileFormatSchema, DesmosLegacyFileFormatSchema, type DesmosFileFormat } from "./file.schema";

type DesmosFileResult =
  | {
      is_invalid_file: true;
    }
  | {
      is_invalid_file: false;
      desmos_file: DesmosFileFormat;
    };

const CURRENT_FILE_VERSION = "1.0";

export function parseDesmosFile(content: string): DesmosFileResult {
  let jsonContent: unknown = null;
  try {
    jsonContent = JSON.parse(content);
  } catch {
    return {
      is_invalid_file: true,
    };
  }

  const desmosFile = DesmosFileFormatSchema.safeParse(jsonContent);
  if (desmosFile.success) {
    return {
      is_invalid_file: false,
      desmos_file: desmosFile.data,
    };
  }

  //   Convert legacy file format
  const desmosLegacyFile = DesmosLegacyFileFormatSchema.safeParse(jsonContent);
  if (desmosLegacyFile.success) {
    return {
      is_invalid_file: false,
      desmos_file: {
        version: CURRENT_FILE_VERSION,
        title: desmosLegacyFile.data.title,
        state: desmosLegacyFile.data.state,
        thumb: "",
        created: new Date().toISOString(),
        modified: "",
      },
    };
  }

  return {
    is_invalid_file: true,
  };
}
