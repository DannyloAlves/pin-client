import { styled } from "@linaria/react";
import Image from "../components/image";
import { useState } from "react";
import { useNavigate } from "react-router";
import apiRequest from "../utils/apiRequest";
import useAuthStore from "../utils/authStore";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AuthContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    padding: 32px;
    border-radius: 32px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

    h1{
        font-weight: 400;
    };
`;

const AuthForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;

    button{
        background-color: #e50829;
        padding: 16px;
        border: none;
        border-radius: 32px;
        color: white;
        font-weight: bold;
        cursor: pointer;
    };

    p{
        font-size: 14px;
        text-align: center;
        cursor: pointer;
    };

    span{
        font-size: 14px;
        color: #e50829;
        text-align: center;
        cursor: pointer;
    };
`;

const FormGroup = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;

    label{
        font-size: 14px;
    };

    input{
        padding: 16px;
        border: 2px solid #e0e0e0;
        border-radius: 16px;
    };
`;

export default function AuthPage() {
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const { setCurrentUser } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const data = Object.fromEntries(formData);

        try {
            const res = await apiRequest.post(
                `/users/auth/${isRegister ? "register" : "login"}`,
                data
            );

            setCurrentUser(res.data);

            navigate("/");
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <Container>
            <AuthContainer>
                <Image src="/general/logo.png" w={36} h={36} alt="" />
                <h1>{isRegister ? "Create an account" : "Login to your account"}</h1>
                {isRegister ? (
                    <AuthForm key="registerForm" onSubmit={handleSubmit}>
                        <FormGroup>
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" id="username" placeholder="Username" required />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="displayName">Name</label>
                            <input type="text" name="displayName" id="displayName" placeholder="Name" required />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" placeholder="Email" required />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" placeholder="Password" required />
                        </FormGroup>
                        <button type="submit">Register</button>
                        <p onClick={() => setIsRegister(false)}>
                            Do you have an account? <b>Login</b>
                        </p>
                        {error && <span>{error}</span>}
                    </AuthForm>
                ) : (
                    <AuthForm key="loginForm" onSubmit={handleSubmit}>
                        <FormGroup>
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" placeholder="Email" required />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" placeholder="Password" required />
                        </FormGroup>
                        <button type="submit">Login</button>
                        <p onClick={() => setIsRegister(true)}>
                            Don&apos;t have an account? <b>Register</b>
                        </p>
                        {error && <span>{error}</span>}
                    </AuthForm>
                )}
            </AuthContainer>
        </Container>
    );
};