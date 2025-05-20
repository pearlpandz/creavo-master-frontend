import React, { useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const initialFormData = {
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        password: '',
}

export default function CreateModal({ open, onClose, onSubmit, label }) {
    const [showPassword, setShowPassword] = React.useState(false);
    const formRef = React.useRef(null);
    const [formData, setFormData] = React.useState({ ...initialFormData });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(formData);
    };

    useEffect(() => {
        if (open) {
            setFormData({ ...initialFormData });
        }
    }, [open])

    return (
        <Modal
            open={open}
            onClose={(_, reason) => {
                if (reason !== 'backdropClick') onClose();
            }}
            aria-labelledby="create-modal"
            closeAfterTransition
            disableEscapeKeyDown
        >
            <Box sx={style} component="form" ref={formRef} onSubmit={handleSubmit}>
                <IconButton onClick={onClose} sx={{ position: 'absolute', top: 30, right: 12 }}>
                    <CloseIcon />
                </IconButton>
                <Typography id="create-modal" variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                    {label}
                </Typography>
                <TextField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Mobile Number"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    inputProps={{ pattern: '[0-9]{10,}' }}
                />
                <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    type="email"
                />
                <TextField
                    label="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword((v) => !v)} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                    Create
                </Button>
            </Box>
        </Modal>
    );
}
