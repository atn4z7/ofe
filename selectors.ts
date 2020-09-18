import { State } from "./types";

const Selectors = {
  users: (state: State) => state.users,
  userData: (state: State) => state.users.list,
  isFetchingUsers: (state: State) => state.users.isFetching,
  postsData: (state: State) => state.posts.list,
  isFetchingPosts: (state: State) => state.posts.isFetching,
};

export default Selectors;
