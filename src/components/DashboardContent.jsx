import React from 'react';
import { Box, Grid, Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider, TextField } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import PeopleIcon from '@mui/icons-material/People';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { BarChart } from '@mui/x-charts/BarChart';

const countBoxes = [
    { label: 'Total Distributors', value: 28, icon: <PeopleIcon color="primary" /> },
    { label: 'Total Resellers', value: 100, icon: <PeopleIcon color="success" /> },
    { label: 'Total Licenses', value: 28, icon: <VpnKeyIcon color="warning" /> },
    { label: 'Active Licenses', value: 8, icon: <VpnKeyIcon color="info" /> },
];

const tableData = [
    { name: 'John', location: 'Hyderabad', resellers: 12, status: 'Active' },
    { name: 'John', location: 'Hyderabad', resellers: 12, status: 'Active' },
    { name: 'John', location: 'Hyderabad', resellers: 12, status: 'Active' },
    { name: 'John', location: 'Hyderabad', resellers: 12, status: 'Active' },
    { name: 'John', location: 'Hyderabad', resellers: 12, status: 'Active' },
];

const licenseData = [
    { id: 'ID-2024-001', date: '01-04-2024', status: 'Active' },
    { id: 'ID-2024-001', date: '01-04-2024', status: 'Active' },
    { id: 'ID-2024-001', date: '01-04-2024', status: 'Active' },
    { id: 'ID-2024-001', date: '01-04-2024', status: 'Active' },
];

const purchasedData = [60, 80, 140, 120, 90, 100, 5, 15, 30, 55, 110, 8];
const soldData = [40, 60, 120, 100, 70, 80, 3, 10, 20, 40, 90, 5];
const purchasedColors = purchasedData.map(val => {
    if (val > 100) return '#e11d48'; // red
    if (val > 50) return '#f59e42'; // orange
    if (val > 25) return '#facc15'; // yellow
    if (val > 10) return '#22d3ee'; // cyan
    return '#6366f1'; // default blue
});
const soldColors = soldData.map(val => {
    if (val > 100) return '#059669'; // green
    if (val > 50) return '#06b6d4'; // teal
    if (val > 25) return '#818cf8'; // indigo
    if (val > 10) return '#f472b6'; // pink
    return '#a3a3a3'; // gray
});

export default function Home() {
    return (
        <Box sx={{ p: 3, bgcolor: '#f6f6fd', minHeight: '100vh' }}>
            {/* Count Boxes */}
            <Grid container spacing={2} mb={2}>
                {countBoxes.map(box => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={box.label}>
                        <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                            {box.icon}
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">{box.label}</Typography>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>{box.value}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            {/* Distributors & Resellers Tables */}
            <Grid container spacing={2} mb={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={2} sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Distributors</Typography>
                            <Button size="small">View All</Button>
                        </Box>
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Location</TableCell>
                                        <TableCell>Resellers</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableData.map((row, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.location}</TableCell>
                                            <TableCell>{row.resellers}</TableCell>
                                            <TableCell><Box sx={{ bgcolor: '#b9fbc0', color: '#1b5e20', px: 1.5, borderRadius: 1, fontSize: 12, display: 'inline-block' }}>{row.status}</Box></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={2} sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Resellers</Typography>
                            <Button size="small">View All</Button>
                        </Box>
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Location</TableCell>
                                        <TableCell>Resellers</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableData.map((row, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.location}</TableCell>
                                            <TableCell>{row.resellers}</TableCell>
                                            <TableCell><Box sx={{ bgcolor: '#b9fbc0', color: '#1b5e20', px: 1.5, borderRadius: 1, fontSize: 12, display: 'inline-block' }}>{row.status}</Box></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
            {/* License Overview Graph & Table */}
            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>License Overview</Typography>

                        <Box sx={{ height: 250, width: '100%', mb: 2 }}>
                            <BarChart
                                xAxis={[{ data: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Augest', 'September', 'October', 'November', 'December'] }]}
                                series={[
                                    {
                                        data: purchasedData,
                                        label: 'Purchased License',
                                        // itemStyle: (params) => ({ fill: purchasedColors[params.dataIndex] })
                                    },
                                    {
                                        data: soldData,
                                        label: 'Sold License',
                                        // itemStyle: (params) => ({ fill: soldColors[params.dataIndex] })
                                    }
                                ]}
                                height={250}
                                sx={{ bgcolor: 'transparent' }}
                            />

                        </Box>

                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                            <TextField size="small" placeholder="Search License" sx={{ flex: 1, bgcolor: 'white' }} />
                            <Button variant="contained">Add New License</Button>
                        </Box>
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>License ID</TableCell>
                                        <TableCell>Purchase Date</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {licenseData.map((row, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.date}</TableCell>
                                            <TableCell><Box sx={{ bgcolor: '#b9fbc0', color: '#1b5e20', px: 1.5, borderRadius: 1, fontSize: 12, display: 'inline-block' }}>{row.status}</Box></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
