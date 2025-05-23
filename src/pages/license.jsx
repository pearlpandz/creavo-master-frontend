import { Box, Grid, Paper } from "@mui/material";
import DataTable from "../components/DataTable";
import { LICENSE_COLUMNS } from "../constants/columns";
import { useEffect, useState } from "react";
import axios from '../utils/axios-interceptor'

function License() {
    const [data, setData] = useState([]);
    const userDetails = localStorage.getItem('userDetails');
    const userId = userDetails ? JSON.parse(userDetails).id : null;

    const fetchData = async (userId) => {
        try {
            const url = `/accounts/licenses/master-distributor/${userId}/`;
            const response = await axios.get(url);
            const data = response.data
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        if (userId) {
            fetchData(userId);
        }
    }, [userId]);

    return (
        <Box sx={{ p: 3, bgcolor: '#f6f6fd', minHeight: '100vh' }}>
            <Grid container sx={{ width: '100%' }}>
                <Grid size={12}>
                    <DataTable
                        columns={LICENSE_COLUMNS}
                        rows={data}
                        title='Licenses'
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default License