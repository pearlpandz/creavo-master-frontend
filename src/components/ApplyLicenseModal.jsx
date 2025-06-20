import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

export default function ApplyLicenseModal({ open, onClose, onApply, viewOnly = false, licenseKeyValue = '' }) {
    const [licenseKey, setLicenseKey] = useState(licenseKeyValue || '');
    const [error, setError] = useState('');

    useEffect(() => {
        setLicenseKey(licenseKeyValue || '');
        setError('');
    }, [open, licenseKeyValue]);

    const handleApply = () => {
        if (!licenseKey.trim()) {
            setError('License key is required');
            return;
        }
        setError('');
        if (onApply) onApply(licenseKey);
    };

    const handleCancel = () => {
        setLicenseKey(licenseKeyValue || '');
        setError('');
        if (onClose) onClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleCancel}
            aria-labelledby="apply-license-modal"
            closeAfterTransition
        >
            <Box sx={{ ...style, width: 600 }}>
                <IconButton onClick={handleCancel} sx={{ position: 'absolute', top: 16, right: 12 }}>
                    <CloseIcon />
                </IconButton>
                <Typography id="apply-license-modal" variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                    {viewOnly ? 'View License Key' : 'Apply License Key'}
                </Typography>
                <TextField
                    label="License Key"
                    value={licenseKey}
                    onChange={e => setLicenseKey(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                    error={!!error}
                    helperText={error}
                    disabled={viewOnly}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                    <Button variant="outlined" onClick={handleCancel}>Close</Button>
                    {!viewOnly && <Button variant="contained" onClick={handleApply}>Apply License</Button>}
                </Box>
            </Box>
        </Modal>
    );
}
