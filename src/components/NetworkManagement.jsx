import { Paper, Tabs, Tab } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { Distributor } from './Distributor';
import { Reseller } from './Reseller';

export default function NetworkManagement() {
    const [searchParams, setSearchParams] = useSearchParams();
    const tab = Number(searchParams?.get('tab')) || 0;

    const handleTabChange = (event, newValue) => {
        setSearchParams({ tab: newValue });
    }

    return (
        <Paper sx={{ p: 2 }}>
            <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 2 }}>
                <Tab label="Distributors" />
                <Tab label="Resellers" />
            </Tabs>
            {tab === 0 && <Distributor />}
            {tab === 1 && <Reseller />}
        </Paper>
    );
}
