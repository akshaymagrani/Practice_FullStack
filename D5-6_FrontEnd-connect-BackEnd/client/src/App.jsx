import { useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import './App.css';

function App() {
  const [userAdded, setUserAdded] = useState(false);

  const handleUserAdded = () => {
    setUserAdded(prev => !prev); // Toggle state to force re-render
  };

  return (
    <>
      <UserForm onUserAdded={handleUserAdded} />
      <hr />
      <UserList userAdded={userAdded} /> {/* Pass the userAdded state */}
    </>
  );
}

export default App;
