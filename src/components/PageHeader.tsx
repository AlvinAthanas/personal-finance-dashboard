import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";

interface PageHeaderProps {
    title?: string;
    buttonText?: string;
    onButtonClick?: () => void;
}

export default function PageHeader({
                                       title,
                                       buttonText,
                                       onButtonClick
                                   }:PageHeaderProps) {
    return (
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} sx={{marginTop: 8}}>
            <Typography  sx={{typography: {xs:'h6', sm: 'h4'}}}>
                {title}
            </Typography>
            <Button variant={'contained'} onClick={onButtonClick}>
                {buttonText}
            </Button>
        </Box>
    )
}