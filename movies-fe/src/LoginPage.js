import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";

export default function LoginPage() {

    const USERNAME_MIN_LENGTH = 4;
    const PASSWORD_MIN_LENGTH = 4;

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();

        if(isLogin) {
            fetch("http://localhost:8080", {
                method: "GET",
                headers: {
                    "Authorization": `Basic ${btoa(`${username}:${password}`)}`
                }
            }).then(res => {
                if(res.status == 200) {
                    localStorage.setItem("username", username);
                    localStorage.setItem("password", password);
                    navigate("/");
                }
                else if (res.status == 401) {
                    alert("Wrong username or password");
                }
                else {
                    console.log("Error with login");
                }
            }).catch(err => {
                console.log(err);
            });
        }

        else {
            fetch("http://localhost:8080/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            }).then(res => {
                if(res.status == 409) {
                    alert("User with this username already exists");
                }
                else if(res.status == 200) {
                    localStorage.setItem("username", username);
                    localStorage.setItem("password", password);
                    navigate("/");
                    console.log("success, redirecting");
                }
                else {
                    console.log("Error with signup");
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }

    const handlePasswordChange = (event) => {
        setIsPasswordValid(event.target.value?.length >= PASSWORD_MIN_LENGTH);
        setPassword(event.target.value);
    }

    const handleUsernameChange = (event) => {
        setIsUsernameValid(event.target.value?.length >= USERNAME_MIN_LENGTH);
        setUsername(event.target.value);
    }

    const handleLoginSwitch = (event) => {
        event.preventDefault();
        setIsLogin(!isLogin);
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <>
            <div className={styles.loginPage}>
                <div className={styles.form}>
                    <form className={styles.loginForm} onSubmit={e => handleSubmit(e)}>
                        <h2>{isLogin ? "Log into your existing account" : "Create new account"}</h2>
                        <input type="text" required placeholder="Username" autocomplete="off" onChange={e => handleUsernameChange(e)} value={username} />
                        <input type={showPassword ? "text" : "password"} required placeholder="Password" autocomplete="off" onChange={e => handlePasswordChange(e)} value={password} />
                        <i className={showPassword ? "fa fa-eye" : "fas fa-eye-slash"} onClick={toggleShowPassword} />
                        {username.length > 0 && !isUsernameValid && <p>Username should be at least {USERNAME_MIN_LENGTH} characters long</p>}
                        {password.length > 0 && !isPasswordValid && <p>Password should be at least {PASSWORD_MIN_LENGTH} characters long</p>}
                        <button disabled={!username.length > 0 || !isPasswordValid} type="submit">{isLogin ? "LOG IN" : "SIGN IN"}</button>
                        <button onClick={e => handleLoginSwitch(e)}>{isLogin ? "Switch to Sign In" : "Switch to Log In"}</button>
                    </form>
                </div>
            </div>
        </>
    );
}