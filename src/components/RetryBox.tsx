import React from 'react';
import Flex from '../components/Flex';

import { useDispatch } from 'react-redux';
import { fetchTournaments } from '../actions/tournaments';
import Button from './Button';

const RetryBox: React.FC = () => {
  const dispatch = useDispatch();
  const retry = () => {
    dispatch(fetchTournaments());
  };
  return (
    <Flex width="100%" justifyContent="center">
      <Flex
        flexWrap="no-wrap"
        gap="20px"
        alignItems="center"
        flexDirection="column"
      >
        <div>Someting went wrong.</div>
        <Button onClick={retry}>Retry</Button>
      </Flex>
    </Flex>
  );
};

export default RetryBox;
