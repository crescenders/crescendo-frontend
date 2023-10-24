type Assignment = {
  id: number;
  author: {
    uuid: string;
    email: string;
    username: string;
    created_at: string;
    updated_at: string;
  };
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

type AssignmentList = TResponse & {
  results: Assignment[];
};

type PostAssgnment = {
  title: string;
  content: string;
};
