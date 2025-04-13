import { createFileRoute } from '@tanstack/react-router';

import PostPage from '@/pages/post';
import { postQuery } from '@/queries.ts';

export const Route = createFileRoute('/posts/$id')({
  component: PostPage,
  loader: ({ params, context }) => {
    context.queryClient.prefetchQuery(postQuery(params.id));
  }
});
