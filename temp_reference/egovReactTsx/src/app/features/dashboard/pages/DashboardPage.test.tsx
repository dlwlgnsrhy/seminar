import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import DashboardPage from './DashboardPage';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
    },
  });

function TestWrapper({ children }: { children: React.ReactNode }) {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
}

describe('DashboardPage', () => {
  test('renders Dashboard heading', async () => {
    render(
      <TestWrapper>
        <DashboardPage />
      </TestWrapper>,
    );
    expect(await screen.findByText(/Dashboard/i)).toBeInTheDocument();
  });
});
