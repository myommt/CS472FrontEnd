import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';
import { User } from './interface/user';

const Signin = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const { saveUser } = useContext(UserContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/users/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: form.username, password: form.password }),
            });
            const data = await response.json();
            if (data.responseBodySuccess) {
                const signinUser = data.responseBodyData as User;
                saveUser(signinUser);
                window.location.reload();
            } else {
                alert(data.responseBodyMessage);
            }
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    return (
        <form onSubmit={handleSignin}>
            <h2>Sign In</h2>
            <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="Username" required />
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required />
            <button type="submit">Sign In</button>
        </form>
    );
};

export default Signin;
