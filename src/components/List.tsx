import React, { useMemo } from 'react';
import Flex from '../components/Flex';
import Box from '../components/Box';
import Text from '../components/Text';

import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

import DeleteButton from '../components/DeleteButton';
import UpdateButton from './UpdateButton';
import { statusEnum, Item } from '../reducers/tournaments';
import RetryBox from './RetryBox';
import H6 from './H6';

const List: React.FC = () => {
  const byId = useSelector((state: RootState) => state.tournaments.byId);
  const allIds = useSelector((state: RootState) => state.tournaments.allIds);
  const status = useSelector((state: RootState) => state.tournaments.status);

  const items = useMemo(() => {
    return allIds
      .map(id => {
        return byId[id];
      })
      .sort((a: Item, b: Item) => {
        return (
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
      });
  }, [allIds, byId]);

  if (status === statusEnum.Loading) {
    return (
      <Flex justifyContent="center" width="100%">
        Loading Tournaments ...
      </Flex>
    );
  }

  if (status === statusEnum.Failed) {
    return <RetryBox />;
  }

  if (items.length < 1) {
    return (
      <Flex justifyContent="center" width="100%">
        No tournaments found.
      </Flex>
    );
  }
  return (
    <>
      {items.map(item => {
        const startDate = new Date(item.startDate).toLocaleDateString('en-GB');
        const startTime = new Date(item.startDate).toLocaleTimeString('en-GB');
        return (
          <Box key={item.id}>
            <H6>{item.name}</H6>
            <Text>Organizer: {item.organizer}</Text>
            <Text>Game: {item.game}</Text>
            <Text>
              Participiants:{' '}
              {`${item.participants.current}/${item.participants.max}`}
            </Text>
            <Text>
              Start: {startDate}, {startTime}
            </Text>
            <Flex justifyContent="flex-start" gap="8px">
              <UpdateButton id={item.id} name={item.name} />
              <DeleteButton id={item.id} />
            </Flex>
          </Box>
        );
      })}
    </>
  );
};

export default List;
