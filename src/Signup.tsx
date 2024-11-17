import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';
import './App.css';

const Signup = () => {
    const initialState = { username: '', password: '', confirmPassword: '' };
    const [form, setForm] = useState(initialState);
    const { saveUser } = useContext(UserContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: form.username, password: form.password }),
            });

            const data = await response.json();
            if (data.responseBodySuccess) {
                alert(data.responseBodyMessage);
                setForm(initialState);
                //saveUser({ id: data.responseBodyUserId, username: form.username });
            } else {
                alert(data.responseBodyMessage);
            }
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <h2>Sign Up</h2>
            <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="Username" required />
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required />
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default Signup;
