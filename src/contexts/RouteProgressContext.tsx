import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigation } from 'react-router-dom';
import NProgress from 'nprogress';

export function useRouteProgress() {
    const location = useLocation();
    const navigation = useNavigation();
    const [isMounted, setIsMounted] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Start progress on navigation start
        if (navigation.state === 'loading') {
            NProgress.start();
            setIsMounted(false);
        }

        // Cleanup on unmount
        return () => {
            clearTimeout(timerRef.current as NodeJS.Timeout);
            NProgress.done();
        };
    }, [navigation.state]);

    useEffect(() => {
        // When location changes but we're not loading (initial load)
        if (!navigation.state) {
            NProgress.start();
            setIsMounted(false);
        }
    }, [location.pathname]);

    useEffect(() => {
        // Component-mounted callback (call this when your main content loads)
        const handleMountComplete = () => {
            setIsMounted(true);
            NProgress.done();
        };

        // Fallback timeout in case mounting never completes
        timerRef.current = setTimeout(() => {
            handleMountComplete();
        }, 3000); // 3s maximum loading time

        return () => clearTimeout(timerRef.current as ReturnType<typeof setTimeout>);
    }, [location.pathname]);

    return { isMounted };
}