import { Stack , Typography} from "@mui/material";
import logo from '../assets/1.png'
import './css/Landing.css'

const Landing = () => {
    return(
        <>
        <div className="card">
            <Stack
                direction={"row"}
                justifyContent={"space-around"}
                spacing={0}
                color={'#112D4E'}
                className="box"
                // mr={8}
                // pr={10}
            >
                <Stack
                    alignItems={"flex-start"}
                    width={'50%'}
                >
                    <Typography variant="overline" fontSize={30} fontWeight={200} fontFamily={'Segoe UI'}>ENHANCE YOUR CARRER</Typography>
                    <Typography variant="h3" mb={4} fontSize={50} fontWeight={800} fontFamily={'Segoe UI'} width={'50%'}>Boost your skillset with our online courses</Typography>
                    <Typography variant="subtitle1" fontSize={20} fontFamily={'Segoe UI'}>Courses start at ₹449. Get your new-student offer before it expires.</Typography>
                </Stack>
                <Stack justifyContent={"flex-start"} alignItems={"center"}>
                    <img src={logo} alt="Image" width={"100%"}/>
                </Stack>
            </Stack>
        </div>
        </>
    )
}


export default Landing;