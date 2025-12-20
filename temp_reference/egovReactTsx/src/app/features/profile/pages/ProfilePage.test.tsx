import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import ProfilePage from './ProfilePage';

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

describe('ProfilePage', () => {
  test('renders profile name', async () => {
    render(
      <TestWrapper>
        <ProfilePage />
      </TestWrapper>,
    );
    expect(await screen.findByText(/홍길동/i)).toBeInTheDocument();
  });
});
