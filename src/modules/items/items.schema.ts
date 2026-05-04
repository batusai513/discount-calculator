import {
  number,
  object,
  string,
  optional,
  InferOutput,
  array,
  union,
  literal,
  fallback,
  pipe,
  unknown,
  transform,
} from 'valibot';

const stringToNumberSchema = pipe(unknown(), transform(Number));

const sharedItemSchema = object({
  name: optional(string()),
  discount: fallback(stringToNumberSchema, 0),
  quantity: fallback(stringToNumberSchema, 1),
});

export const itemUnitParamSchema = object({
  ...sharedItemSchema.entries,
  type: literal('unit'),
  unitaryPrice: stringToNumberSchema,
});

export const itemWeightParamSchema = object({
  ...sharedItemSchema.entries,
  type: literal('weight'),
  basePrice: stringToNumberSchema,
});

export const itemParamSchema = union([
  itemUnitParamSchema,
  itemWeightParamSchema,
]);

const sharedCalculatedItemSchema = object({
  id: string(),
  priceBeforeDiscount: number(),
  salesPrice: number(),
  saving: number(),
});

export const itemUnitSchema = object({
  ...itemUnitParamSchema.entries,
  ...sharedCalculatedItemSchema.entries,
});

export const itemWeightSchema = object({
  ...itemWeightParamSchema.entries,
  ...sharedCalculatedItemSchema.entries,
});

export const itemSchema = union([itemUnitSchema, itemWeightSchema]);
export const itemsSchema = array(itemSchema);

export const fallbackArrayItemsSchema = fallback(itemsSchema, []);

export type ItemUnitParamSchema = InferOutput<typeof itemUnitParamSchema>;
export type ItemWeightParamSchema = InferOutput<typeof itemWeightParamSchema>;
export type ItemParamSchema = InferOutput<typeof itemParamSchema>;
export type ItemUnitSchema = InferOutput<typeof itemUnitSchema>;
export type ItemWeightSchema = InferOutput<typeof itemWeightSchema>;
export type ItemSchema = InferOutput<typeof itemSchema>;
export type ItemsSchema = InferOutput<typeof itemsSchema>;
