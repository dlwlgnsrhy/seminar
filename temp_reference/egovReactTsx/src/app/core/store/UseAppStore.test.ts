import { renderHook, act } from '@testing-library/react';
import { useAppStore } from './UseAppStore';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Global State (Zustand) Verification', () => {
    // Reset store before each test if necessary (though simple stores reset naturally if recreated, zustand is global)
    // For precise testing, we might need to reset state, but for this smoke test:

    beforeEach(() => {
        act(() => {
            useAppStore.setState({ theme: 'light', isLoading: false });
        });
    });

    it('should have initial state', () => {
        const { result } = renderHook(() => useAppStore());
        expect(result.current.theme).toBe('light');
        expect(result.current.isLoading).toBe(false);
    });

    it('should toggle theme', () => {
        const { result } = renderHook(() => useAppStore());

        act(() => {
            result.current.toggleTheme();
        });

        expect(result.current.theme).toBe('dark');

        act(() => {
            result.current.toggleTheme();
        });

        expect(result.current.theme).toBe('light');
    });

    it('should set loading state', () => {
        const { result } = renderHook(() => useAppStore());

        act(() => {
            result.current.setLoading(true);
        });

        expect(result.current.isLoading).toBe(true);
    });
});
