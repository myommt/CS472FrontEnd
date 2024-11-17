import { useContext } from 'react';
import { UserContext } from './UserContext';

const Logout = () => {
    const { logout } = useContext(UserContext);

    return (
        <button className="logout-button" onClick={logout}> Log Out </button>
    );
};

export default Logout;
