import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Policy, Voter } from './interface/policy.ts';
import { getPoliciesByYear } from './Policy.tsx';
import VotePolicy from './VotePolicy.tsx';
import { UserContext } from './UserContext.tsx';

export const PolicyContext = createContext<{
    policies: Policy[];
    fetchPolicies: Function;
}>({
    policies: [],
    fetchPolicies: () => { }
});

const initialState: Policy[] = [];

export function Policies({ children, year }: { children: ReactNode; year: number; }) {
    const [policies, setPolicies] = useState<Policy[]>(initialState);
    const { user } = useContext(UserContext);
    const fetchPolicies = async (year: number) => {
        const data: Policy[] = await getPoliciesByYear(year);
        setPolicies(data);
    };

    useEffect(() => {
        fetchPolicies(year);
    }, [year]);

    return (
        <PolicyContext.Provider value={{ policies, fetchPolicies }}>
            <div>
                <h1>Policies for {year}</h1>
                <ul> {Array.isArray(policies) && policies.length > 0 ?
                    (policies.map(policy => {
                        const voter: Voter = { voterid: user.id };
                        return (<li key={policy.id}>
                            <h2>{policy.title}</h2>
                            <p>{policy.description}</p>
                            <p><strong>Owner:</strong> {policy.owner}</p>
                            <p><strong>Date:</strong> {new Date(policy.date).toLocaleDateString()}</p>
                            <p><strong>Category:</strong> {policy.category}</p>
                            <p><strong>Votes:</strong> {policy.votes}</p>
                            <VotePolicy policy={policy} voter={voter} /> </li>
                        );
                    })) : (<li>No policies available for {year}.</li>)}
                </ul>
            </div>
            {children}
        </PolicyContext.Provider>
    );
}
