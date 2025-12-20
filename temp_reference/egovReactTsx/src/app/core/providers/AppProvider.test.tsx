import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { AppProvider } from '../../AppProvider'; // Adjust import path
import { describe, it, expect } from 'vitest';

// Dummy component using useQuery
const QueryTestComponent = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['test-query'],
        queryFn: () => Promise.resolve('Query Works!'),
    });

    if (isLoading) return <div>Loading...</div>;
    return <div>{data}</div>;
};

describe('AppProvider Integration', () => {
    it('provides QueryClient to children', async () => {
        render(
            <AppProvider>
                <QueryTestComponent />
            </AppProvider>
        );

        // Initial loading state
        expect(screen.getByText('Loading...')).toBeInTheDocument();

        // Resolved state
        await waitFor(() => {
            expect(screen.getByText('Query Works!')).toBeInTheDocument();
        });
    });
});
