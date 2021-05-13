import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VoteButton from './VoteButton';



function VoteScreen() {
  const [candidates, setCandidates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCandidates = async () => {
    try {
      setError();
      setCandidates();
      setLoading(true);
      const response = await axios.get(
        'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/candidates'
      );
      response.data.sort((a, b) => ( b.voteCount - a.voteCount ));
      setCandidates(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!candidates) return null;
  return (
    <>
      <ul>
        {candidates.map((person, index) => (
          <li key={person.id}>
            <rank> {index+1}위</rank>
            {person.name}[{person.voteCount}표]         
            <VoteButton vote_id={person.id} fetch={fetchCandidates}>투표</VoteButton>
          </li>
        ))}
      </ul>
      </>
  );
}

export default VoteScreen;