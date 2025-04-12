import { createFileRoute } from '@tanstack/react-router';

import ProductPage from '@/pages/product';

export const Route = createFileRoute('/products/$id')({
  component: ProductPage
});
