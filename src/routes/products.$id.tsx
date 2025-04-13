import { createFileRoute } from '@tanstack/react-router';

import ProductPage from '@/pages/product';
import { productQuery } from '@/queries.ts';

export const Route = createFileRoute('/products/$id')({
  component: ProductPage,
  loader: ({ params, context }) => {
    context.queryClient.prefetchQuery(productQuery(params.id));
  }
});
