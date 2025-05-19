import React, { useState } from 'react';
import { Paper, Box, Typography, Checkbox, FormControlLabel, IconButton, Button, Divider, TextField, Grid, Card } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const availablePlans = [
    { id: 1, name: 'Gold', price: 100, discount: 10 },
    { id: 2, name: 'Platinum', price: 200, discount: 20 },
    { id: 3, name: 'Diamond', price: 500, discount: 50 },
];

export default function SubscriptionCheckout() {
    const [selected, setSelected] = useState({});

    const handleCheck = (id) => {
        setSelected((prev) => ({ ...prev, [id]: prev[id] ? { ...prev[id], checked: !prev[id].checked } : { checked: true, qty: 1 } }));
    };
    const handleQty = (id, delta) => {
        setSelected((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                qty: Math.max(1, (prev[id]?.qty || 1) + delta),
                checked: true,
            },
        }));
    };

    const summary = Object.entries(selected)
        .filter(([id, v]) => v.checked)
        .map(([id, v]) => {
            const plan = availablePlans.find((p) => p.id === Number(id));
            const price = plan.price * v.qty;
            const discount = plan.discount * v.qty;
            return { ...plan, qty: v.qty, price, discount, final: price - discount };
        });
    const total = summary.reduce((acc, s) => acc + s.final, 0);

    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Subscribe to New Plans</Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
                {availablePlans.map((plan) => (
                    <Grid size={{ xs: 12 }} key={plan.id}>
                        <Card sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', boxShadow: 2, borderRadius: 2, p: 2 }}>
                            {/* Left: Plan Info */}
                            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Checkbox checked={!!selected[plan.id]?.checked} onChange={() => handleCheck(plan.id)} sx={{ pl: 0 }} />
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{plan.name}</Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                        {/* Example description, replace with real data if available */}
                                        {plan.description || 'Best for small teams and individuals.'}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                        <Typography sx={{ fontWeight: 600, fontSize: 18 }}>₹{plan.price}</Typography>
                                        <Typography sx={{ textDecoration: 'line-through', color: 'text.disabled', fontSize: 14 }}>₹{plan.price + plan.discount}</Typography>
                                        <Typography sx={{ color: 'success.main', fontWeight: 500, fontSize: 14 }}>{Math.round((plan.discount / (plan.price + plan.discount)) * 100)}% off</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            {/* Right: Quantity Controls */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: 120, gap: 1 }}>
                                <Box sx={{
                                    display: 'flex', alignItems: 'center',
                                    bgcolor: (theme) => theme.palette.mode === 'dark' ? '#666' : '#f5eee7',
                                    borderRadius: 2, px: 1, py: 0.5
                                }}>
                                    <IconButton size="small" onClick={() => handleQty(plan.id, -1)} disabled={!selected[plan.id]?.checked || selected[plan.id]?.qty <= 1}>
                                        <RemoveIcon />
                                    </IconButton>
                                    <Typography sx={{ mx: 2, minWidth: 24, textAlign: 'center', fontWeight: 600 }}>{selected[plan.id]?.qty || 1}</Typography>
                                    <IconButton size="small" onClick={() => handleQty(plan.id, 1)} disabled={!selected[plan.id]?.checked}>
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2, alignItems: 'flex-end' }}>
                {summary.map((s) => (
                    <Typography key={s.id}>{s.name} x {s.qty}: ₹{s.price} - ₹{s.discount} = <b>₹{s.final}</b></Typography>
                ))}
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, textAlign: 'right' }}>Total: ₹{total}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" color="primary" disabled={summary.length === 0}>Checkout</Button>
            </Box>
        </Paper>
    );
}
