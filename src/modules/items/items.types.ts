import { ListSchema } from '../lists/lists.schema';
import { ItemSchema } from './items.schema';

export interface ListDetailsLoader {
  list: ListSchema;
  items: ItemSchema[];
  item?: ItemSchema;
}
