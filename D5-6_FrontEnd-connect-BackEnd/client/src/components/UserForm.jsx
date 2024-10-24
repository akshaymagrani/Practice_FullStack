import { useState } from "react";
import axios from 'axios';

export default function UserForm({ onUserAdded }) { // Accept onUserAdded as a prop
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/user', { name, email, age });
            console.log('User added:', response.data);
            onUserAdded(); // Call the function to notify that a user was added
            setName(''); // Clear the input fields
            setEmail('');
            setAge('');
        } catch (error) {
            console.error('Error adding user', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="userName"
                    value={name}
                    placeholder="name"
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="number"
                    name="age"
                    value={age}
                    placeholder="age"
                    onChange={(e) => setAge(e.target.value)}
                />
                <button type="submit">Add User</button>
            </form>
        </>
    );
}
