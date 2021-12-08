import { Box } from '@mui/system';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const scrollButton = (Yposition) => {
    if ( Yposition < document.body.scrollHeight/2) {
        return (
        <button onClick={() => window.scroll(0,document.body.scrollHeight )}>
            <Box
                position="fixed"
                bottom="80px"
                left="20px"
                zIndex={3}
                style={{width:"30px", height:"30px", marginLeft: "auto"}}
            >
                <KeyboardArrowDownIcon color="primary" sx={{fontSize: 100}} />
            </Box>
        </button>
        )
    }
    else return (
        <button onClick={() => window.scroll(0,0 )}>
            <Box
                position="fixed"
                bottom="80px"
                left="20px"
                zIndex={3}
                style={{width:"30px", height:"30px", marginLeft: "auto"}}
            >
                <KeyboardArrowUpIcon color="primary" sx={{fontSize: 100}} />
            </Box>
        </button>
        )
}