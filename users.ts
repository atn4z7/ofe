import Actions from "./actions";
import { ActionObject as Action, UserState } from "./types";

const initialState: UserState = {
  list: [],
  error: null,
  isFetching: false,
};

const users = (state: UserState = initialState, action: Action) => {
  switch (action.type) {
    case Actions.users.fetchUsers.success.toString():
      return {
        ...state,
        list: action.payload,
        error: null,
        isFetching: false,
      };
    case Actions.users.fetchUsers.error.toString():
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };
    case Actions.users.fetchUsers.running.toString():
      return {
        ...state,
        isFetching: true,
      };
    default:
      return state;
  }
};

export default users;
