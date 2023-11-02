type Submission = {
  id: number;
  author: User;
  title: string;
  created_at: string;
  updated_at: string;
};

type SubmissionList = TResponse & {
  results: Submission[];
};
