import './App.css'
import {Box, CssBaseline} from "@mui/material";
import {useAuthentication} from "./contexts/AuthContext.tsx";
import {StyledDrawer} from "./utils/styles.tsx";

function App() {
  const {isAuthenticated} = useAuthentication();

  return (
    <Box>
      <CssBaseline/>
      {isAuthenticated && (<StyledDrawer>

      </StyledDrawer>)}

    </Box>
  )
}

export function AppWrapper(){
  return <App/>;
}