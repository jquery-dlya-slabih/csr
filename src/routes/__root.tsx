import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { lazy } from 'react';

import Footer from '@/components/footer';
import Topline from '@/components/topline';

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: () => (
    <>
      <Topline />
      <div className="relative flex flex-col items-center">
        <div className="flex max-w-[1200px] flex-col">
          <Outlet />
        </div>
      </div>
      <Footer />
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: lazy(() => import('@/pages/notFound'))
});
