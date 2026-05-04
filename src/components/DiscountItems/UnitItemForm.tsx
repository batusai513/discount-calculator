import { useRef } from 'react';

import { ItemUnitSchema } from '../../modules/items/items.schema';
import { useResetForm } from '../hooks/userResetForm';
import { DiscountItemForm } from './DiscountItemForm';

export function UnitItemForm({
  item,
  id,
}: {
  item?: ItemUnitSchema;
  id?: string;
}) {
  const form = useRef<HTMLFormElement>(null);
  useResetForm(form);
  return (
    <DiscountItemForm
      type="unit"
      quantityLabel="Units"
      quantityField="quantity"
      priceLabel="Price"
      priceField="unitaryPrice"
      id={id}
      nameDefaultValue={item?.name}
      discountDefaultValue={item?.discount}
      priceDefaultValue={item?.unitaryPrice}
      quantityDefaultValue={item?.quantity ?? 1}
    />
  );
}
