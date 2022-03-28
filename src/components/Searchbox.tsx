import React, { useCallback } from 'react';
import Input from '../components/Input';
import debounce from 'lodash/debounce';

import { useDispatch } from 'react-redux';
import { fetchTournaments } from '../actions/tournaments';

const Searchbox: React.FC = () => {
  const dispatch = useDispatch();

  const search = (q: string) => {
    dispatch(fetchTournaments(q));
  };

  const debounced = useCallback(debounce(search, 600), []);
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    debounced(value);
  };
  return <Input onChange={handleChange} placeholder="Search tournament ..." />;
};

export default Searchbox;
