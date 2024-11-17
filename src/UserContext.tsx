import { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from './interface/user';
import Signup from './Signup';
import Signin from './SignIn';
import Logout from './Logout';
import AddPolicy from './AddPolicy';

export const UserContext = createContext<{
    user: User;
    saveUser: (user: User) => void;
    logout: () => void;
}>({
    user: { id: '', username: '' },
    saveUser: () => { },
    logout: () => { },
});

const initialState: User = { id: '', username: '' };

export function UserProvider({ children }: { children: ReactNode; }) {
    const [user, setUser] = useState<User>(initialState);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        } else {
            setUser(initialState);
        }
    }, []);


    const saveUser = (user: User) => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const logout = () => {
        setUser(initialState);
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, saveUser, logout }}>
            {children}
            {user.id === '' ? (
                <div className="auth-container">
                    <Signup />
                    <Signin />
                </div>
            ) : (
                <div className="auth-container">
                    <p>Welcome {user.username}!</p><Logout />
                    <AddPolicy />
                </div>
            )}
        </UserContext.Provider>
    );
}
