import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import { type RenderOptions, render } from '@testing-library/react';
import { FC, PropsWithChildren, ReactElement, StrictMode } from 'react';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: unknown;
}

function renderWithProviders(ui: ReactElement, extendedRenderOptions: ExtendedRenderOptions = {}) {
  const { preloadedState = {}, ...renderOptions } = extendedRenderOptions;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000
      }
    }
  });

  const Wrapper: FC<PropsWithChildren> = ({ children }) => {
    const rootRoute = createRootRoute({ component: () => children });
    const router = createRouter({ routeTree: rootRoute });

    return (
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={preloadedState}>
            <RouterProvider router={router} />
          </HydrationBoundary>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </StrictMode>
    );
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export default renderWithProviders;
