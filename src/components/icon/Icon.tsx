import clsx from 'clsx';
import { type ComponentPropsWithoutRef, type Ref } from 'react';

import styles from './icon.module.css';

export type IconNames =
  | 'bin'
  | 'check'
  | 'chevron-right'
  | 'chevron-left'
  | 'edit'
  | 'plus'
  | 'store'
  | 'units'
  | 'weigth';

export type IconProps = ComponentPropsWithoutRef<'svg'> & {
  iconName: IconNames;
  ref?: Ref<SVGSVGElement>;
};

export function Icon({ iconName, className, ref, ...props }: IconProps) {
  return (
    <svg ref={ref} className={clsx(styles.icon, className)} {...props}>
      <use href={`/sprite.svg#icon-${iconName}`} />
    </svg>
  );
}
