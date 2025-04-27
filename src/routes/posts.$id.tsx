import { createFileRoute } from '@tanstack/react-router';

import { postQuery } from '@/data/post.ts';
import PostPage from '@/pages/post';

export const Route = createFileRoute('/posts/$id')({
  component: PostPage,
  loader: ({ params, context }) => {
    context.queryClient.prefetchQuery(postQuery(params.id));
  }
});
