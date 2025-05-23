import { Box } from '@mui/material'
import NetworkManagement from '../components/NetworkManagement'

function Network() {
    return (
        <Box sx={{ p: 3, bgcolor: '#f6f6fd', minHeight: '100vh', height: '100%' }}>
            <NetworkManagement />
        </Box>
    )
}

export default Network