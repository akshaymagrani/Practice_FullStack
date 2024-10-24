import { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = ({ userAdded }) => { // Accept userAdded as a prop
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const response = await axios.get('http://localhost:5000/api/user');
        console.log(response.data);
        setUsers(response.data);
    };

    useEffect(() => {
        fetchUsers(); // Fetch users when the component mounts or when userAdded changes
    }, [userAdded]); // Re-fetch users when userAdded changes

    return (
        <ul>
            {Array.isArray(users) && users.length > 0 ? (
                users.map(user => (
                    <li key={user._id}>{user.name} - {user.email} - {user.age}</li>
                ))
            ) : (
                <li>No users found</li>
            )}
        </ul>
    );
};

export default UserList;
