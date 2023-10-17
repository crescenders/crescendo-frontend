type StudyList = {
  next: string;
  previous: string;
  results: [
    Study & {
      uuid: string;
      leaders: Leaders[];
    },
  ];
};

type MyStudyList = {
  next: string;
  previous: string;
  results: [
    {
      uuid: string;
      name: string;
      start_date: string;
      end_date: string;
      created_at: string;
      deadline: string;
      until_deadline: number;
      is_closed: boolean;
      current_member_count: number;
      categories: string[];
    },
  ];
};

type StudyDetail = Study & {
  created_at: string;
  updated_at: string;
  post_content: string;
  start_date: string;
  end_date: string;
  deadline: string;
};

type CreateStudy = Study & {
  uuid: string;
};

type Leaders = {
  uuid: string;
  username: string;
  email: string;
};

type Study = {
  head_image: string;
  leaders: Leaders[];
  post_title: string;
  study_name: string;
  until_deadline: number;
  is_closed: boolean;
  tags: string[];
  categories: string[];
  current_member_count: number;
  member_limit: number;
};
