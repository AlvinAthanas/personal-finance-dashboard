import {Box} from "@mui/material";
import {useAuthentication} from "../contexts/AuthContext.tsx";
import LandingPage from "../components/Home/LandingPage.tsx";
import Dashboard from "../components/Home/Dashboard.tsx";

function Home(){
    const { isAuthenticated } = useAuthentication();
    return (
        <>
            {isAuthenticated ?
                <Box className="gradient-box-container">
                    <Dashboard />
                </Box>
                :
                <Box className="gradient-box-container">
                    <LandingPage />
                </Box>
            }

        </>
    )
}

export default Home