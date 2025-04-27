import { createFileRoute } from '@tanstack/react-router';

import { productQuery } from '@/data/product.ts';
import ProductPage from '@/pages/product';

export const Route = createFileRoute('/products/$id')({
  component: ProductPage,
  loader: ({ params, context }) => {
    context.queryClient.prefetchQuery(productQuery(params.id));
  }
});
