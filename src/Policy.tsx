
import { Policy } from './interface/policy.ts';


export const getPolicies = async (): Promise<Policy[]> => {

    try {
        const raw_response = await fetch('http://localhost:3000/policies');
        const response: { responseBodyStatus: number, responseBodySuccess: boolean, responseBodyPolicy?: Policy[], responseBodyMessage: string; } = await raw_response.json();
        const data: Policy[] = response.responseBodyPolicy as Policy[];
        return data;
    }
    catch (error) {
        console.error('Error fetching policies:', error);
        return [];
    };
};

export const getPoliciesByYear = async (year: number): Promise<Policy[]> => {
    try {
        const raw_response = await fetch(`http://localhost:3000/policies/year/${year}`);
        const response: { responseBodyStatus: number, responseBodySuccess: boolean, responseBodyPolicy?: Policy[], responseBodyMessage: string; } = await raw_response.json();
        const data: Policy[] = response.responseBodyPolicy as Policy[];
        return data;
    }
    catch (error) {
        console.error('Error fetching policies:', error);
        return [];
    };
};