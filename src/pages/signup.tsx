import React, { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Copyright from '../components/Copyright';
import { useAuth } from '../contexts/AuthContext';

interface UserCreds {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignupPage = () => {
    const [userInfo, setUserInfo] = useState<UserCreds>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { signup } = useAuth();

    const handleChange = (key: string, value: string) => {
        const updatedUser = { ...userInfo, [key]: value };
        setUserInfo(updatedUser);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (
            !userInfo ||
            !userInfo.firstName ||
            !userInfo.lastName ||
            !userInfo.email ||
            !userInfo.password ||
            !userInfo.confirmPassword
        ) {
            return setError('Please make sure all the fields are completed.');
        }

        if (userInfo.password !== userInfo.confirmPassword) {
            return setError('Passwords do not match');
        }

        if (error !== '') setError('');

        try {
            setError('');
            setLoading(true);
            signup(userInfo.email, userInfo.password);
        } catch {
            setError('Failed to create an account. Try again later');
        }

        setLoading(false);
    };

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign up
                </Typography>
                <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                autoFocus
                                id='firstName'
                                label='First Name'
                                name='firstName'
                                autoComplete='given-name'
                                onChange={(e) => handleChange('firstName', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id='lastName'
                                label='Last Name'
                                name='lastName'
                                autoComplete='family-name'
                                onChange={(e) => handleChange('lastName', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id='email'
                                label='Email Address'
                                name='email'
                                autoComplete='email'
                                onChange={(e) => handleChange('email', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id='password'
                                label='Password'
                                name='password'
                                autoComplete='new-password'
                                type='password'
                                onChange={(e) => handleChange('password', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id='password-confirm'
                                label='Confirm password'
                                name='password-confirm'
                                autoComplete='new-password'
                                type='password'
                                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value='acceptTnC' color='primary' />}
                                label='I have read and understand the T and C.'
                            />
                        </Grid> */}
                    </Grid>
                    <Button
                        fullWidth
                        type='submit'
                        disabled={loading}
                        variant='contained'
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Link href='#' variant='body2'>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
};

export default SignupPage;
