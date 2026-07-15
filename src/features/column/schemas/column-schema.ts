import { z } from "zod";


export const columnSchema = z.object({

 title:z
 .string()
 .min(2)
 .max(30)

});


export type ColumnInput =
z.infer<typeof columnSchema>;