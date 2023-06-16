type User = {
  uuid: string;
  updated_at: string;
  email: string;
  created_at: string;
  username: string;
};

type TUser = TResponse & {
  results: User[];
};
