import React from 'react';
import Button from '../components/Button';
import { useDispatch } from 'react-redux';
import { deleteTournament } from '../actions/tournaments';
type Props = {
  id: string;
};

const DeleteButton: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const remove = () => {
    dispatch(deleteTournament(id));
  };

  const openDialog = () => {
    const response = window.confirm(
      'Do you really want to remove this tournament?'
    );
    if (response) {
      remove();
    }
  };
  return <Button onClick={openDialog}>Delete</Button>;
};

export default DeleteButton;
