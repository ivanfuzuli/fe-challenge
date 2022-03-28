import { AnyAction } from 'redux';
import { produce } from 'immer';
import {
  FULFILLED_CREATE_TOURNAMENT,
  FULFILLED_FETCH_TOURNAMENTS,
  FULFILLED_UPDATE_TOURNAMENT,
  PENDING_REQUEST,
  FAILED_REQUEST,
  FULFILLED_DELETE_TOURNAMENT
} from '../actions/tournaments';

export enum statusEnum {
  Loading,
  Success,
  Failed
}

export type Item = {
  id: string;
  name: string;
  organizer: string;
  game: string;
  participants: {
    current: number;
    max: number;
  };
  startDate: string;
};

const initialState = {
  status: statusEnum.Loading,
  byId: {} as { [key: string]: Item },
  allIds: [] as string[]
};

const reducer = produce((draft, action: AnyAction) => {
  switch (action.type) {
    case PENDING_REQUEST: {
      draft.status = statusEnum.Loading;
      break;
    }

    case FAILED_REQUEST: {
      draft.status = statusEnum.Failed;
      break;
    }

    case FULFILLED_FETCH_TOURNAMENTS: {
      const payload = action.payload;
      const allIds = payload.map((item: Item) => item.id);

      const byId = payload.reduce((obj: { [key: string]: {} }, item: Item) => {
        obj[item.id] = item;
        return obj;
      }, {});

      draft.byId = byId;
      draft.allIds = allIds;

      draft.status = statusEnum.Success;
      break;
    }

    case FULFILLED_CREATE_TOURNAMENT: {
      const payload = action.payload;
      const { id } = payload;
      draft.byId[id] = payload;
      draft.allIds.push(id);

      break;
    }

    case FULFILLED_UPDATE_TOURNAMENT: {
      const payload = action.payload;
      const { id, name } = payload;
      draft.byId[id].name = name;

      break;
    }

    case FULFILLED_DELETE_TOURNAMENT: {
      const id = action.payload;
      draft.allIds = draft.allIds.filter(item => item !== id);
      break;
    }
  }
  return draft;
}, initialState);

export default reducer;
