import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext.tsx';
import { Policy } from './interface/policy.ts';
import './App.css';

const categories = [
    "General",
    "Food",
    "Library",
    "Meditation",
    "Education",
    "Visa & Travel",
    "Students Lounge"
];

function AddPolicy() {
    const { user } = useContext(UserContext);

    const [policy, setPolicy] = useState<Policy>({
        id: 0,
        title: '',
        description: '',
        owner: user.username,
        date: new Date().toISOString(),
        category: '',
        votes: 0,
        voters: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPolicy((prevPolicy) => ({
            ...prevPolicy,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user.id) {
            try {
                const response = await fetch('http://localhost:3000/policies', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(policy),
                });
                const data = await response.json();
                console.log('Policy added:', data);

                // Clear the form
                setPolicy({
                    id: 0,
                    title: '',
                    description: '',
                    owner: user.username,
                    date: new Date().toISOString(),
                    category: '',
                    votes: 0,
                    voters: [],
                });
                window.location.reload();
            } catch (error) {
                console.error('Error adding policy:', error);
            }
        } else {
            console.log('User must be signed in to add a policy');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" value={policy.title} onChange={handleChange} placeholder="Title" required />
            <textarea name="description" value={policy.description} onChange={handleChange} placeholder="Description" required />
            <select name="category" value={policy.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
            <button type="submit">Add Policy</button>
        </form>
    );
}

export default AddPolicy;
