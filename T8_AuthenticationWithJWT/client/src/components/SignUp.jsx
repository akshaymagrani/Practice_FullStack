import axios from 'axios';
import { useState } from 'react';

export default function SignUp({ toggle }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/signup", { email, password });
            console.log('Signup:', response.data);
            setMessage(response.data.message || "Signup successful!");
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Error Signup:', error);
            setMessage(error.response?.data?.error || "Signup failed. Try a different email.");
        }
    }

    return (
        <>
            <h1>Sign Up</h1>
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
                <button type="button" onClick={toggle}>Go to Login</button>
            </form>
            <p>{message}</p>
        </>
    );
}
