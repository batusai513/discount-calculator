import { useRef } from 'react';
import { Form } from 'react-router-dom';

import { Button } from '../button/Button';
import { Label, TextInput } from '../forms/Forms';
import { useResetForm } from '../hooks/userResetForm';

interface DiscountItemFromProps {
  id?: string;
  type: string;
  quantityLabel: string;
  quantityField: string;
  quantityDefaultValue: number | null;
  priceLabel: string;
  priceField: string;
  priceDefaultValue?: number;
  nameDefaultValue?: string;
  discountDefaultValue?: number;
}

export function DiscountItemForm({
  id,
  type,
  quantityLabel,
  quantityField,
  priceLabel,
  priceField,
  priceDefaultValue,
  nameDefaultValue,
  discountDefaultValue,
  quantityDefaultValue,
}: DiscountItemFromProps) {
  const form = useRef<HTMLFormElement>(null);
  useResetForm(form);
  console.log(
    priceDefaultValue,
    nameDefaultValue,
    discountDefaultValue,
    quantityDefaultValue
  );

  const formName = `${type}ItemForm`;

  return (
    <Form key={id} id={formName} method="post" ref={form}>
      <input type="hidden" name="type" value={type} />
      <div className="grid grid-cols-4 gap-3 mb-2">
        <div className="col-span-3">
          <Label htmlFor="name">Name</Label>
          <TextInput
            key={id}
            defaultValue={nameDefaultValue}
            id="name"
            name="name"
            max="100"
            type="text"
          />
        </div>{' '}
        <div className="">
          <Label htmlFor="name">{quantityLabel}</Label>
          <TextInput
            id={quantityField}
            name={quantityField}
            placeholder={quantityDefaultValue?.toString() || ''}
            type="number"
            min="0"
            max="10000"
            defaultValue={quantityDefaultValue || ''}
            required
          />
        </div>
      </div>{' '}
      <div className="grid grid-cols-5 gap-3 col-span-4">
        <div className="col-span-3">
          <Label htmlFor="unitaryPrice">{priceLabel}</Label>
          <TextInput
            type="number"
            id={priceField}
            name={priceField}
            max="1000000000000"
            step="0.001"
            defaultValue={priceDefaultValue || ''}
            required
            placeholder="0.00"
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="discount">Discount %</Label>
          <TextInput
            type="number"
            id="discount"
            name="discount"
            min="0"
            max="100"
            defaultValue={discountDefaultValue || 0}
            required
          />
        </div>
      </div>
      <Button
        block={true}
        variant="primary"
        shape="rounded"
        type="submit"
        form={formName}
        className="mt-4"
      >
        Save
      </Button>
    </Form>
  );
}
