import { useContext } from 'react';
import { UserContext } from './UserContext.tsx';
import { VotePolicyProps } from './interface/policy.ts';



function VotePolicy({ policy, voter }: VotePolicyProps) {
    const { user } = useContext(UserContext);
    const handleVote = async () => {
        if (user.id) {
            try {
                console.log(user.id);
                const response = await fetch(`http://localhost:3000/policies/vote/${policy.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        requestBodyPolicy: policy,
                        requestBodyVoter: voter
                    }),
                });
                const data = await response.json();
                if (data.responseBodySuccess) {
                    alert('Vote cast successfully!');
                    window.location.reload();
                }
                else {
                    alert(data.responseBodyMessage);
                    window.location.reload();
                }
            } catch (error) {
                console.error('Error voting:', error);
            }
        }
    };

    return (
        <> {
            user.id !== '' ?
                <div>
                    <button className="votebutton" onClick={handleVote}>Vote</button>
                </div> :
                <div>

                </div>
        }</>

    );
}

export default VotePolicy;
