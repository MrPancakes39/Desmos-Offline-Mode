import { z } from "zod";

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

const CURRENT_FILE_VERSION = "1.0";

const ShallowGraphStateSchema = z.object({
  version: z.number(),
  randomSeed: z.string().optional(),
  graph: z.object({
    viewport: z.object({}),
  }),
  expressions: z.object({
    list: z.array(
      z.object({
        id: z.string(),
        type: z.enum(["expression", "image", "table", "text", "folder"]),
      })
    ),
  }),
});
// type ShallowGraphState = z.infer<typeof ShallowGraphStateSchema>;

const DesmosLegacyFileFormatSchema = z.object({
  title: z.string(),
  state: ShallowGraphStateSchema,
});
// type DesmosLegacyFileFormat = z.infer<typeof DesmosLegacyFileFormatSchema>;

const DesmosFileFormatSchema = z.object({
  version: z.string().regex(/^\d{1,2}.\d{1,2}$/), // XX.YY e.g. "1.0"
  title: z.string(),
  state: ShallowGraphStateSchema,
  thumb: z.string().base64(),
  created: z.string().datetime(),
  modified: z.string().datetime(),
});
export type DesmosFileFormat = z.infer<typeof DesmosFileFormatSchema>;

type DesmosFileResult =
  | {
      is_invalid_file: true;
    }
  | {
      is_invalid_file: false;
      desmos_file: DesmosFileFormat;
    };

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
