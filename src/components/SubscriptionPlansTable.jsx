import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const plans = [
    { plan: 'Basic', licenses: 5, start: '2025-01-01', end: '2026-01-01', status: 'Active' },
    { plan: 'Pro', licenses: 10, start: '2024-06-01', end: '2025-06-01', status: 'Expired' },
];

export default function SubscriptionPlansTable() {
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
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {plans.map((row, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{row.plan}</TableCell>
                                <TableCell>{row.licenses}</TableCell>
                                <TableCell>{row.start}</TableCell>
                                <TableCell>{row.end}</TableCell>
                                <TableCell>{row.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
