import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { API_URL } from '../constants/settings';
import axios from 'axios';
import moment from 'moment/moment';

const plans = [
    { plan: 'Basic', licenses: 5, start: '2025-01-01', end: '2026-01-01', status: 'Active' },
    { plan: 'Pro', licenses: 10, start: '2024-06-01', end: '2025-06-01', status: 'Expired' },
];

export default function SubscriptionPlansTable() {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const url = `${API_URL}/accounts/subscriptions/current/`;
            const response = await axios.get(url, { withCredentials: true, });
            const data = response.data
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Paper sx={{ mb: 4, p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>My Subscriptions</Typography>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Plan</TableCell>
                            <TableCell>License Count</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.license_count}</TableCell>
                                <TableCell>{moment(row.created_at).format("DD/MM/YYYY")}</TableCell>
                                <TableCell>
                                    {moment(row.created_at).add(row.duration_days, 'days').format("DD/MM/YYYY")}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
