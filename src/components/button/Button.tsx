import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import { type ComponentPropsWithoutRef, type Ref } from 'react';
import { twMerge } from 'tailwind-merge';

export type ButtonProps = {
  asChild?: boolean;
  block?: boolean;
  variant?: 'primary' | 'secondary' | 'link' | 'none';
  shape?: 'rounded' | 'rounded-sm' | 'square' | 'brand' | 'none';
  ref?: Ref<HTMLButtonElement>;
} & ComponentPropsWithoutRef<'button'>;

export function Button({
  children,
  className,
  block = true,
  shape = 'none',
  variant = 'primary',
  asChild,
  ref,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      ref={ref}
      className={twMerge(
        clsx(
          buttonClasses,
          {
            'w-full': block,
            'aspect-square rounded-xl p-2 rounded-tr-none': shape === 'brand',
            'aspect-square rounded-lg p-2': shape === 'square',
            'rounded-full': shape === 'rounded-sm' || shape === 'rounded',
            [primaryButtonClasses]: variant === 'primary',
            [secondaryButtonClasses]: variant === 'secondary',
          },
          variant === 'none' ? noneButtonClasses : '',
          variant === 'link' ? linkButtonClasses : '',
          className
        )
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

const buttonClasses = clsx(
  'justify-center align-middle py-1 px-3 font-bold shadow-md focus:outline-hidden focus:ring-3 inline-flex items-center active:ring-2'
);

const primaryButtonClasses = clsx(
  'bg-primary text-white hover:bg-primary-700 focus:ring-primary-400/75 active:bg-primary-800 active:ring-primary-900/75'
);

const linkButtonClasses = clsx(
  'bg-none shadow-none hover:text-primary-700 focus:text-primary-400 active:text-primary-800'
);

const noneButtonClasses = clsx(
  'bg-none shadow-none hover:text-primary-700 focus:text-primary-400 active:text-primary-800'
);

const secondaryButtonClasses = clsx(
  'bg-gray-light text-white hover:bg-primary-700 focus:ring-primary-400/75 active:bg-primary-800 active:ring-primary-900/75'
);
