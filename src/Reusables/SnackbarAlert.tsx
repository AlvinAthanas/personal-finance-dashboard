import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {type AlertProps } from '@mui/material/Alert';

interface SnackbarProps {
    message: string;
    severity?: 'success' | 'info' | 'warning' | 'error';
    autoHideDuration?: number;
    position?: {
        vertical: 'top' | 'bottom';
        horizontal: 'left' | 'center' | 'right';
    };
    open: boolean;
    onClose: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarAlert: React.FC<SnackbarProps> = ({
                                                    message,
                                                    severity = 'info',
                                                    autoHideDuration = 3000,
                                                    position = { vertical: 'top', horizontal: 'right' },
                                                    open,
                                                    onClose,
                                                }) => {
    return (
        <Snackbar
            anchorOrigin={position}
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
        >
            <Alert onClose={onClose} severity={severity} sx={{ color: "white !important" }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SnackbarAlert;
