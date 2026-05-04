import { Link, LoaderFunctionArgs, useLoaderData } from 'react-router';

import { Button } from '../components/button/Button';
import { Listing } from '../components/DiscountList/Listing';
import { Header, HeaderItem } from '../components/header/Header';
import { Icon } from '../components/icon/Icon';
import { ListEmptyState } from '../components/ListEmptyState';
import { Wrapper } from '../components/wrapper/wrapper';
import { parseListAll } from '../modules/lists/lists';
import { ListSchema } from '../modules/lists/lists.schema';
import { StoreCache } from '../utils/money-clip';

export function Lists() {
  const data = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof createLoader>>
  >;
  const isEmpty = Array.isArray(data) && data.length === 0;

  return (
    <>
      <Header>
        <HeaderItem position="center">
          <h1 className="text-xl font-semibold">Discount Lists</h1>
        </HeaderItem>

        {!isEmpty ? (
          <>
            <HeaderItem position="end">
              <Button asChild block={true} shape="brand">
                <Link className="btn btn-primary" to="lists/new" viewTransition>
                  <Icon iconName="plus" />
                </Link>
              </Button>
            </HeaderItem>
          </>
        ) : null}
      </Header>

      <Wrapper>
        {isEmpty ? <ListEmptyState /> : <Listing data={data} />}
      </Wrapper>
    </>
  );
}

export function createLoader({ listStore }: { listStore: StoreCache }) {
  return async function loader(_: LoaderFunctionArgs) {
    try {
      const lists = await listStore.getAll();

      const parsedLists = parseListAll(Object.values(lists));
      console.log(parsedLists);

      const orderedLists = parsedLists.sort(
        (a: ListSchema, b: ListSchema) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      return orderedLists;
    } catch (_error) {
      throw new Error('Error loading lists');
    }
  };
}
