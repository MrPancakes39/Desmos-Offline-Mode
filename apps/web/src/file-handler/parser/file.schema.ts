import * as z from "zod";

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

export const DesmosLegacyFileFormatSchema = z.object({
  title: z.string(),
  state: ShallowGraphStateSchema,
});

export const DesmosFileFormatSchema = z.object({
  version: z.string().regex(/^\d{1,2}.\d{1,2}$/), // XX.YY e.g. "1.0"
  title: z.string(),
  state: ShallowGraphStateSchema,
  thumb: z.string().base64(),
  created: z.string().datetime(),
  modified: z.string().datetime(),
});

export type DesmosFileFormat = z.infer<typeof DesmosFileFormatSchema>;
