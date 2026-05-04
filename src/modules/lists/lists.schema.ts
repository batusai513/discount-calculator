import {
  InferOutput,
  array,
  fallback,
  literal,
  object,
  pipe,
  record,
  string,
  transform,
  union,
  unknown,
} from 'valibot';

const currencies = union([literal('USD'), literal('EUR'), literal('GBP')]);
const stringToNumberSchema = pipe(unknown(), transform(Number));

export const listSchema = object({
  id: string(),
  name: string(),
  store: string(),
  currency: currencies,
  createdAt: string(),
  total: fallback(stringToNumberSchema, 0),
});
export const listStoreSchema = record(string(), listSchema);
export const listsSchema = array(listSchema);

export type ListSchema = InferOutput<typeof listSchema>;
