import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { StrictMode } from 'react';
import type { FC, PropsWithChildren, ReactElement } from 'react';

import { routeTree } from '@/routeTree.gen';

const queryClient = new QueryClient();

function renderWithProviders(ui: ReactElement, renderOptions?: RenderOptions) {
  const Wrapper: FC<PropsWithChildren> = ({ children }) => {
    routeTree.options.component = () => children;
    const router = createRouter({ routeTree, context: { queryClient } });

    return (
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </StrictMode>
    );
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export default renderWithProviders;
