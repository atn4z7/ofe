export type Action = (
  payload?: any
) => ActionObject & {
  toString: () => string;
};

export type ActionObject = {
  type: string;
  payload?: any;
};

export type Routine = {
  trigger: Action;
  running: Action;
  success: Action;
  error: Action;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  website: string;
};

export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type UserState = {
  list: User[];
  error?: any;
  isFetching: boolean;
};

export type PostState = {
  list: Post[];
  error?: any;
  isFetching: boolean;
};

export type State = {
  users: UserState;
  posts: PostState;
};
