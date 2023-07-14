import { Card, Typography, TextField, Button, Checkbox, Stack, FormControlLabel, Link } from '@mui/material';
import './css/Signup.css'

const SignIn = () => {
    return (
        <Stack>
            <Stack
                direction={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                pt={15}
            >
                <Typography variant='h4' color={'#112D4E'}>
                    Welcome Back. Sign In Below
                </Typography>

            </Stack>
            <Stack 
                direction={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                pt={3}
            >
                <Card variant="outlined" className='card-Signup'>
                    <TextField variant='outlined' label='Email' />
                    <TextField variant='outlined' label='Password' type='Password' />
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} >
                        <FormControlLabel control={<Checkbox size="medium" />} label="Remember me" />
                        <Link href="#" color="inherit" fontSize={18} underline='none'><i>Forget Password?</i></Link>
                    </Stack>
                    <Button variant='contained' size='large'>LogIn</Button>
                </Card>
            </Stack>
        </Stack>
    )
}

export default SignIn;