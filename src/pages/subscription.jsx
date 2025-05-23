import { Box } from '@mui/material'
import SubscriptionPlansTable from '../components/SubscriptionPlansTable'
import SubscriptionCheckout from '../components/SubscriptionCheckout'

export default function Subscription() {
    return (
        <Box sx={{ p: 3, bgcolor: '#f6f6fd', minHeight: '100vh' }}>
            <SubscriptionPlansTable />
            <SubscriptionCheckout />
        </Box>
    )
}