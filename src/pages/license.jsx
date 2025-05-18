import { Box, Grid, Paper } from "@mui/material";
import DataTable from "../components/DataTable";

const resellerData = [
    { name: 'Eve', location: 'Hyderabad', distributors: 2, status: 'Active' },
    { name: 'Mallory', location: 'Delhi', distributors: 1, status: 'Inactive' },
    { name: 'Trent', location: 'Mumbai', distributors: 3, status: 'Active' },
    { name: 'Oscar', location: 'Chennai', distributors: 2, status: 'Active' },
];

function License() {
    return (
        <Box sx={{ p: 3, bgcolor: '#f6f6fd', minHeight: '100vh' }}>
            <Grid container sx={{ width: '100%' }}>
                <Grid size={12}>
                    <DataTable
                        columns={[
                            { field: 'name', headerName: 'Name', flex: 1 },
                            { field: 'location', headerName: 'Location', flex: 1 },
                            { field: 'distributors', headerName: 'Distributors', flex: 1 },
                            { field: 'status', headerName: 'Status', flex: 1 },
                        ]}
                        rows={resellerData}
                        title='Licenses'
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default License