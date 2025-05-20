import React from 'react';
import { Box, Grid, Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider, TextField } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import PeopleIcon from '@mui/icons-material/People';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { BarChart } from '@mui/x-charts/BarChart';
import { DISTRIBUTOR_COLUMNS, RESELLER_COLUMNS } from '../constants/columns';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';

export default function Home({ data }) {
    const navigate = useNavigate();

    const countBoxes = [
        { label: 'Total Distributors', value: data?.total_distributors, icon: <PeopleIcon color="primary" /> },
        { label: 'Total Resellers', value: data?.total_users, icon: <PeopleIcon color="success" /> },
        { label: 'Total Licenses', value: data?.total_licenses, icon: <VpnKeyIcon color="warning" /> },
        { label: 'Active Licenses', value: data?.active_licenses, icon: <VpnKeyIcon color="info" /> },
    ];

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
                            <Button size="small" onClick={() => navigate('/networks?tab=0')}>View All</Button>
                        </Box>
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        {
                                            DISTRIBUTOR_COLUMNS.map((column) => (
                                                <TableCell key={column.field} sx={{ fontWeight: 600, color: '#000' }}>
                                                    {column.headerName}
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        {data?.recent_distributors?.map((row) => (
                                            DISTRIBUTOR_COLUMNS.map((column) => (
                                                <TableCell key={column.field}>
                                                    <CellData column={column} row={row} />
                                                </TableCell>
                                            ))
                                        ))}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={2} sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Resellers</Typography>
                            <Button size="small" onClick={() => navigate('/networks?tab=1')}>View All</Button>
                        </Box>
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        {
                                            RESELLER_COLUMNS.map((column) => (
                                                !column?.hide && <TableCell key={column.field} sx={{ fontWeight: 600, color: '#000' }}>
                                                    {column.headerName}
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        {data?.recent_users?.map((row) => (
                                            RESELLER_COLUMNS.map((column) => (
                                                !column?.hide &&
                                                <TableCell key={column.field}>
                                                    <CellData column={column} row={row} />
                                                </TableCell>
                                            ))
                                        ))}
                                    </TableRow>
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
                                        data: data?.monthly_stats?.unsold ?? [],
                                        label: 'Purchased License',
                                        // itemStyle: (params) => ({ fill: purchasedColors[params.dataIndex] })
                                    },
                                    {
                                        data: data?.monthly_stats?.sold ?? [],
                                        label: 'Sold License',
                                        // itemStyle: (params) => ({ fill: soldColors[params.dataIndex] })
                                    }
                                ]}
                                height={250}
                                sx={{ bgcolor: 'transparent' }}
                            />

                        </Box>

                        <Divider sx={{ mb: 2 }} />
                        {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                            <TextField size="small" placeholder="Search License" sx={{ flex: 1, bgcolor: 'white' }} />
                            <Button variant="contained">Add New License</Button>
                        </Box> */}
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 600, color: '#000' }}>License</TableCell>
                                        <TableCell sx={{ fontWeight: 600, color: '#000' }}>Subscription</TableCell>
                                        <TableCell sx={{ fontWeight: 600, color: '#000' }}>Purchased Date</TableCell>
                                        <TableCell sx={{ fontWeight: 600, color: '#000' }}>Sold Date</TableCell>
                                        <TableCell sx={{ fontWeight: 600, color: '#000' }}>Sold To</TableCell>
                                        <TableCell sx={{ fontWeight: 600, color: '#000' }}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data?.recent_purchased_licenses?.map((row, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell>{row?.code}</TableCell>
                                            <TableCell>{row?.subscription?.name}</TableCell>
                                            <TableCell>{row?.purchased_by?.created_at ?? '-'}</TableCell>
                                            <TableCell>{row?.purchased_at ?? '-'}</TableCell>
                                            <TableCell>{row?.purchased_by?.name ?? '-'}</TableCell>
                                            <TableCell sx={{ textTransform: 'capitalize' }}><span className={row?.status === 'available' ? 'active' : 'inactive'}>{row?.status}</span></TableCell>
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


function CellData({ column, row }) {
    switch (column.type) {
        case 'boolean': {
            const lable = row[column.field] ? 'active' : 'inactive'
            return <Box component='span' className={lable} sx={{ textTransform: 'capitalize' }}>{lable}</Box>;
        }
        case 'number':
            return <Box component='span'>{Number(row[column.field])}</Box>;

        case 'date':
            return <Box component='span'>{moment(row[column.field]).format('DD/MM/YYYY')}</Box>;

        default:
            return <Box component='span'>{row[column.field]}</Box>;
    }
}