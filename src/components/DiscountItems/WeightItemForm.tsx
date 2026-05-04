import { useRef } from 'react';

import { ItemWeightSchema } from '../../modules/items/items.schema';
import { useResetForm } from '../hooks/userResetForm';
import { DiscountItemForm } from './DiscountItemForm';

export function WeightItemForm({
  item,
  id,
}: {
  item?: ItemWeightSchema;
  id?: string;
}) {
  const form = useRef<HTMLFormElement>(null);
  useResetForm(form);
  return (
    <DiscountItemForm
      type="weight"
      quantityLabel="Grams"
      quantityField="quantity"
      priceLabel="Price x KG"
      priceField="basePrice"
      id={id}
      nameDefaultValue={item?.name}
      discountDefaultValue={item?.discount}
      priceDefaultValue={item?.basePrice}
      quantityDefaultValue={item?.quantity ?? null}
    />
  );
}
