import React from 'react';
import Button from '../components/Button';
import { useDispatch } from 'react-redux';
import { updateTournament } from '../actions/tournaments';

type Props = {
  id: string;
  name: string;
};

const UpdateButton: React.FC<Props> = ({ id, name }) => {
  const dispatch = useDispatch();
  const update = (newName: string) => {
    dispatch(updateTournament(id, newName));
  };

  const openDialog = () => {
    const result = prompt('Tournament name:', name);
    if (result) {
      update(result);
    }
  };
  return <Button onClick={openDialog}>Update</Button>;
};

export default UpdateButton;
