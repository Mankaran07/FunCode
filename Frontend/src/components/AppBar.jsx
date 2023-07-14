import { Button , Divider , Typography , Stack} from "@mui/material";
import {useNavigate} from 'react-router-dom'
import './css/AppBar.css'

const AppBar = () => {
    const navigate = useNavigate();
    return (
        <Stack 
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"baseline"}
            className="nav-bar"
        >
            <Stack>
                <div onClick={() => {navigate('/')}} style={{cursor:"pointer"}}><Typography variant="h3" to="/" color={'#112D4E'}><strong><i>FunCode</i></strong></Typography></div>
            </Stack>
            <Stack 
                direction={"row"} 
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
            >
                <Button variant="outlined" size="large" onClick={() => {navigate('/signin')}}>LogIn</Button>


                <Button variant="contained" size="large" onClick={() => {navigate('/signup')}}>SignUp</Button>
            </Stack>
        </Stack>
    )

}


export default AppBar;