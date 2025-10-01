import React, { createContext, useContext, useState, type ReactNode } from 'react';
import SnackbarAlert from '../Reusables/SnackbarAlert';

interface SnackbarContextType {
    showSnackbar: (
        message: string,
        severity?: 'success' | 'info' | 'warning' | 'error',
        duration?: number
    ) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('info');
    const [autoHideDuration, setAutoHideDuration] = useState(3000);
    const [isClient, setIsClient] = useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    const showSnackbar = (
        msg: string,
        sev: 'success' | 'info' | 'warning' | 'error' = 'info',
        duration = 3000
    ) => {
        setMessage(msg);
        setSeverity(sev);
        setAutoHideDuration(duration);
        setSnackbarOpen(true);
    };

    const handleClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            {isClient && (
                <SnackbarAlert
                    message={message}
                    severity={severity}
                    open={snackbarOpen}
                    onClose={handleClose}
                    autoHideDuration={autoHideDuration}
                />
            )}
        </SnackbarContext.Provider>
    );
};
