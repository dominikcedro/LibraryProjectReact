import React, {useEffect, useState} from 'react';
import {Formik, Form} from 'formik';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {loginUser} from '../api/api';
import {isLoggedIn as checkIsLoggedIn} from '../api/auth';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from "react-i18next";  // Import useNavigate


const theme = createTheme();

const LoginForm = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();  // Get the navigate function
    const {t, i18n} = useTranslation('global'); // Use useTranslation hook

    useEffect(() => {
        setIsLoggedIn(checkIsLoggedIn());
    }, []);

    const handleSubmit = async (values: { username: string; password: string }) => {
        console.log('Submitting form...');
        try {
            const response = await loginUser(values.username, values.password);
            console.log('Response received:', response);
            if (response && response.token) {
                localStorage.setItem('jwtToken', response.token);
                console.log('JWT received and stored:', response.token);
                window.alert('Login successful!');
                window.dispatchEvent(new Event('storage'));
                navigate('/');  // Navigate to the home page
            } else {
                console.log('Login failed: no token in response');
                window.alert('Login failed!');
            }
        } catch (error) {
            console.error('Error logging in', error);
            window.alert('Login failed!');
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: '#6ecf6e'}}>
                        <LockOutlinedIcon sx={{color: 'black'}}/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Formik
                        initialValues={{username: '', password: ''}}
                        onSubmit={handleSubmit}
                    >
                        {({getFieldProps}) => (
                            <Form>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="username"
                                    autoFocus
                                    {...getFieldProps('username')}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    {...getFieldProps('password')}
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary"/>}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    sx={{mt: 3, mb: 2}}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Box display="flex" justifyContent="center">
                                            <Link href="#" variant="body2" onClick={() => navigate('/register')}>
                                                {t('login.no_account')}
                                            </Link>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>


                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default LoginForm;