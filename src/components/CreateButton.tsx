import React from 'react';
import Button from '../components/Button';
import { useDispatch } from 'react-redux';
import { createTournament } from '../actions/tournaments';

const CreateButton: React.FC = () => {
  const dispatch = useDispatch();
  const create = (name: string) => {
    dispatch(createTournament(name));
  };

  const openDialog = () => {
    const name = prompt('Tournament name:');
    if (name) {
      create(name);
    }
  };
  return <Button onClick={openDialog}>Create Tournament</Button>;
};

export default CreateButton;
