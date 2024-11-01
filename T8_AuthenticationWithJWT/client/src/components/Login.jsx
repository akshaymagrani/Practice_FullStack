import axios from 'axios';
import { useState } from 'react';

export default function Login({ toggle }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/login", { email, password });
            const token = response.data.token;
            localStorage.setItem('token', token); // Store token for later requests
            console.log('Login successful');
            setMessage(response.data.message);
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Error Login: ', error);
            setMessage("Login failed. Please check your email or password.");
        }
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="abc@gmail.com"
                    onChange={(e) => setEmail(e.target.value)} />
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Submit</button>
                <button type="button" onClick={toggle}>Go to Sign Up</button>
            </form>
            <p>{message}</p>
        </>
    );
}
