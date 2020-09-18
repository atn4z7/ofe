import Actions from "./actions";
import { ActionObject as Action, PostState } from "./types";

const initialState: PostState = {
  list: [],
  error: null,
  isFetching: false,
};

const posts = (state: PostState = initialState, action: Action) => {
  switch (action.type) {
    case Actions.posts.fetchPosts.success.toString():
      return {
        ...state,
        list: action.payload,
        error: null,
        isFetching: false,
      };
    case Actions.posts.fetchPosts.running.toString():
      return {
        ...state,
        isFetching: true,
      };
    case Actions.posts.fetchPosts.error.toString():
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default posts;
