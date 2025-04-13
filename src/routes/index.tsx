import { createFileRoute } from '@tanstack/react-router';

import MainPage from '@/pages/main';
import { topProductsQuery, bestSellersQuery, mainPostQuery, blogQuery, productsQuery } from '@/queries.ts';

export const Route = createFileRoute('/')({
  component: MainPage,
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(topProductsQuery());
    context.queryClient.prefetchQuery(mainPostQuery());
    context.queryClient.prefetchQuery(bestSellersQuery());
    context.queryClient.prefetchInfiniteQuery(blogQuery());
    context.queryClient.prefetchInfiniteQuery(productsQuery());
  }
});
