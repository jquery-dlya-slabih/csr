import { createFileRoute } from '@tanstack/react-router';

import PostPage from '@/pages/post';

export const Route = createFileRoute('/posts/$id')({
  component: PostPage
});
