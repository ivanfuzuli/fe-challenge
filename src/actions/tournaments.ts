import { Dispatch } from 'redux';
import { API_TOURNAMENTS_URL } from '../constants/api';

export const PENDING_REQUEST = 'App::pendingRequest';
export const FAILED_REQUEST = 'App::failedRequest';

export const FULFILLED_FETCH_TOURNAMENTS = 'App::fulfilledFetchTournaments';
export const FULFILLED_CREATE_TOURNAMENT = 'App::fulfilledCreateTournament';
export const FULFILLED_DELETE_TOURNAMENT = 'App::fulfilledDeleteTournament';
export const FULFILLED_UPDATE_TOURNAMENT = 'App::fulfilledUpdateTournament';

export const fetchTournaments = (q?: string) => async (dispatch: Dispatch) => {
  let query = API_TOURNAMENTS_URL;
  if (q) {
    query = `${query}?q=${q}`;
  }

  dispatch({ type: PENDING_REQUEST });
  try {
    const response = await fetch(query);
    const json = await response.json();
    dispatch({
      type: FULFILLED_FETCH_TOURNAMENTS,
      payload: json
    });
  } catch {
    dispatch({
      type: FAILED_REQUEST
    });
  }
};

export const createTournament = (payload: string) => async (
  dispatch: Dispatch
) => {
  const req = {
    name: payload
  };

  try {
    const response = await fetch(API_TOURNAMENTS_URL, {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(req)
    });
    const json = await response.json();
    dispatch({
      type: FULFILLED_CREATE_TOURNAMENT,
      payload: json
    });
  } catch {
    dispatch({
      type: FAILED_REQUEST
    });
  }
};

export const updateTournament = (id: string, payload: string) => async (
  dispatch: Dispatch
) => {
  dispatch({
    type: FULFILLED_UPDATE_TOURNAMENT,
    payload: {
      id,
      name: payload
    }
  });

  const req = {
    name: payload
  };

  const apiUrl = `${API_TOURNAMENTS_URL}/${id}`;
  try {
    await fetch(apiUrl, {
      method: 'PATCH',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(req)
    });
  } catch {
    dispatch({
      type: FAILED_REQUEST
    });
  }
};

export const deleteTournament = (id: string) => async (dispatch: Dispatch) => {
  dispatch({
    type: FULFILLED_DELETE_TOURNAMENT,
    payload: id
  });

  const apiUrl = `${API_TOURNAMENTS_URL}/${id}`;
  await fetch(apiUrl, {
    method: 'DELETE',
    headers: new Headers({ 'content-type': 'application/json' })
  });
};
