type StudyList = {
  id: number;
  title: string;
  studyName: string;
  writer: string;
  tags: string[];
  img: string;
  participant: number;
  personnel: number;
  startDate: string;
  endDate: string;
  isCanApply: boolean;
};

type StudyDetail = {
  uuid: string;
  name: string;
  user_limit: number;
  start_date: string;
  end_date: string;
  posts: {
    id: number;
    created_at: string;
    updated_at: string;
    uuid: string;
    head_image: string;
    title: string;
    content: string;
    deadline: string;
    study_group: string;
    author: string;
  };
  categories: string[];
  tags: string[];
  studygroup_members: string[];
};

type Study = {
  head_image?: string;
  leaders: [
    {
      username: string;
      _links: string;
    },
  ];
  post_title: string;
  study_name: string;
  until_deadline: number;
  is_closed: boolean;
  tags: string[];
  categories: string[];
  current_member_count: number;
  member_limit: number;
};
