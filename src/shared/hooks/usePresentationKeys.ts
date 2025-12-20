import { useEffect, useCallback } from 'react'

/**
 * Hook to enable fluid keyboard navigation for a presentation.
 * Supports ArrowUp, ArrowDown, Space, PageUp, PageDown.
 */
export function usePresentationKeys() {
    const scrollToRelative = useCallback((direction: 'next' | 'prev') => {
        const container = document.querySelector('.snap-container')
        if (!container) return

        const sections = Array.from(container.querySelectorAll('.snap-section'))
        const currentScroll = container.scrollTop

        // Find the current active section index based on scroll position
        const currentIndex = sections.findIndex((section) => {
            const el = section as HTMLElement
            // Using a small buffer for precision
            return el.offsetTop >= currentScroll - 10 && el.offsetTop <= currentScroll + 10
        })

        let targetIndex = currentIndex
        if (direction === 'next') {
            targetIndex = Math.min(currentIndex + 1, sections.length - 1)
            if (currentIndex === -1) {
                // If not centered, find the first section below current scroll
                targetIndex = sections.findIndex(s => (s as HTMLElement).offsetTop > currentScroll + 10)
            }
        } else {
            targetIndex = Math.max(currentIndex - 1, 0)
            if (currentIndex === -1) {
                // If not centered, find the first section above current scroll
                for (let i = sections.length - 1; i >= 0; i--) {
                    if ((sections[i] as HTMLElement).offsetTop < currentScroll - 10) {
                        targetIndex = i
                        break
                    }
                }
            }
        }

        if (targetIndex !== -1) {
            const targetSection = sections[targetIndex] as HTMLElement
            container.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            })
        }
    }, [])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent unintended scrolling/actions when typing in an input
            if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
                return
            }

            switch (e.key) {
                case 'ArrowDown':
                case ' ':
                case 'PageDown':
                    e.preventDefault()
                    scrollToRelative('next')
                    break
                case 'ArrowUp':
                case 'PageUp':
                    e.preventDefault()
                    scrollToRelative('prev')
                    break
                default:
                    break
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [scrollToRelative])
}
