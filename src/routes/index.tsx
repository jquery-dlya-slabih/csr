import { createFileRoute } from '@tanstack/react-router';

import { topProductsQuery, bestSellersQuery, mainPostQuery, blogQuery, productsQuery } from '@/data/main.ts';
import MainPage from '@/pages/main';

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
