import React, { useEffect } from 'react';
import Container from './components/Container';
import H4 from './components/H4';
import Flex from './components/Flex';

import Searchbox from './components/Searchbox';
import CreateButton from './components/CreateButton';
import List from './components/List';

import { useDispatch } from 'react-redux';
import { fetchTournaments } from './actions/tournaments';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTournaments());
  }, [dispatch]);

  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      <Flex marginBottom={'30px'}>
        <Searchbox />
        <CreateButton />
      </Flex>
      <Flex>
        <List />
      </Flex>
    </Container>
  );
};

export default App;
