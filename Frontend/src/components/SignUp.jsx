import './css/SignUp.css'
import { Card, Typography, TextField, Button , Snackbar, Stack } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useState , forwardRef } from 'react';

const SignUp = () => {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [open , setOpen] = useState(false);
    const [error , setError] = useState(false);
    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
        setError(false);
    };
    const validate = () => {
        fetch("http://localhost:3000/admin/signup" , {
            method: "POST",
            body: JSON.stringify({
                username: email,
                password: password
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then((res) => {
            if(res.ok) return res.json();
            throw new Error('Something went wrong');
        })
        .then((data) => {
            localStorage.setItem("token" , data.token);
            setEmail('');
            setPassword('');
            setOpen(true);
        })
        .catch(() => {
            setEmail('');
            setPassword('');
            setError(true);
        })
    }
    return (
        <>
        <Stack>
            <Stack
                direction={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                pt={15}
                >
                <Typography variant='h4' color={'#112D4E'}>
                    Welcome to <strong>FunCode</strong>. Sign Up Below
                </Typography>

            </Stack>
            <Stack
                direction={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                pt={3}
            >
                <Card variant="outlined" className='card-Signup'>
                    <TextField 
                        variant='outlined' 
                        onChange= {e => setEmail(e.target.value)}
                        value={email}
                        label='Email' />
                    <TextField 
                        variant='outlined' 
                        onChange= {e => setPassword(e.target.value)}
                        value={password}
                        label='Password' 
                        type='Password' />
                    <Button 
                        variant='contained' 
                        size='large'
                        onClick= {validate}
                        >SignUp</Button>
                </Card>
            </Stack>
        </Stack>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert variant="filled" onClose={handleClose} severity="success" sx={{ width: '200%' , fontSize: 20 }}>
            SignUp Success!!!
        </Alert>
        </Snackbar>
        <Snackbar open={error} autoHideDuration={4000} onClose={handleClose}>
            <Alert variant="filled" onClose={handleClose} severity="error" sx={{ width: '200%' , fontSize: 20 }}>
                User Already Exist!!!
            </Alert>
        </Snackbar>
        </>
    )
}

export default SignUp;