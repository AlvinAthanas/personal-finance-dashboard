import {Box, Button, Container, TextField} from "@mui/material";
import React, {useState} from "react";
import { useSnackbar } from "../contexts/SnackbarAlertContext";
import postData from "../utils/AxioPost.ts";
import {BASE_URL} from "../utils/BaseUrl.ts";
import {useToken} from "../contexts/TokenContext.tsx";
import {useAuthentication} from "../contexts/AuthContext.tsx";

const Login: React.FC = () => {
    const { showSnackbar } = useSnackbar();
    const { token, setBearerToken, setToken } = useToken();
    const { setAuthenticated } = useAuthentication();
    interface loginInfo{
        email: string;
        password: string;
    }
    const [loginInfo, setLoginInfo] = useState<loginInfo>({
        email:"",
        password:""
    })

    const onEmailInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLoginInfo({...loginInfo, email: e.target.value})
    }

    const onPasswordInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLoginInfo({...loginInfo, password: e.target.value})
    }


    const onSubmit = async () => {
        const payload = {
            email: loginInfo.email,
            password: loginInfo.password,
            attempt:"login"
        }
        const response = await postData(`${BASE_URL}/authenticate`, payload, token, null, setAuthenticated, setToken, setBearerToken);

        if (!response.status) {
            showSnackbar("Login failed: Wrong username or password!", "error");
        }

        setLoginInfo({
            email:"",
            password:""
        })

    }


    return <Box>
        <Container maxWidth={"md"}
                   sx={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh"}}>
            <Box sx={{display: "flex", flexDirection: "column", gap: 1}}>
                <TextField placeholder={"email"} id={"email"} onChange={e=>onEmailInput(e)}>email</TextField>
                <TextField type={"password"} placeholder={"password"} id={"password"} onChange={e=>onPasswordInput(e)}>password</TextField>
                <Button onClick={onSubmit}>Login</Button>
            </Box>
        </Container>
    </Box>
}

export default Login;