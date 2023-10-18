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

type MyStudyList = {
  next: string;
  previous: string;
  results: [
    {
      uuid: string;
      head_image: string;
      name: string;
      categories: string[];
      start_date: string;
      end_date: string;
      created_at: string;
      deadline: string;
      until_deadline: number;
      is_closed: boolean;
      current_member_count: number;
    },
  ];
};
