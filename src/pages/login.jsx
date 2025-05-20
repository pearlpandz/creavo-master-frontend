import React, { useEffect, useState } from 'react'
import { Box, Grid, Paper, Typography, TextField, Button, IconButton, InputAdornment, Divider } from '@mui/material'
import { Visibility, VisibilityOff, Google, Facebook, Apple } from '@mui/icons-material'
import MasonryImageList from '../components/ImageGallery'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../constants/settings'
import axios from 'axios'
import { getCookie } from '../utils'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleTogglePassword = () => setShowPassword((show) => !show)

    const handleSubmit = async (e) => {
        e.preventDefault()
        // Handle login logic here
        console.log('Email:', email)
        console.log('Password:', password)

        try {
            const url = `${API_URL}/accounts/auth/master-distributor/`;
            const res = await axios.post(url, { email, password }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (res.status === 200) {
                localStorage.setItem('userDetails', JSON.stringify(res.data.user))
                navigate('/')
            } else {
                console.error('Login failed:', res.data)
            }
        } catch (error) {
            console.error('Login error:', error)
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const token = getCookie('access_token')
        console.log('Token:', token)
        if (token) {
            navigate('/')
        }
    }, [navigate])



    return (
        <Grid container sx={{ width: '100vw', }}>
            {/* Left Image Section */}
            <Grid size={7} sx={{ display: { xs: 'none', md: 'block' }, height: '100vh', overflow: 'hidden' }}>
                <MasonryImageList />
            </Grid>
            {/* Right Login Form Section */}
            <Grid size={5} sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', backkgroundColor: 'red', maxWidth: '480px' }}>
                    <Typography component="h1" variant="h4" sx={{ fontWeight: 700, mb: 2, textTransform: 'uppercase', letterSpacing: 3 }}>
                        Creavo
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <IconButton color="primary" size="large">
                            <Google />
                        </IconButton>
                        <IconButton color="primary" size="large">
                            <Facebook />
                        </IconButton>
                    </Box>
                    <Divider sx={{ width: '100%', mb: 2 }}>or</Divider>
                    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="tel"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleTogglePassword} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                            <Button size="small" onClick={() => navigate('/forget-password')}>Forgot password?</Button>
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>
                        {/* <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                            <Typography variant="body2">Don't have an account?</Typography>
                            <Button size="small" onClick={() => navigate('/signup')}>Sign Up</Button>
                        </Box> */}
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Login
