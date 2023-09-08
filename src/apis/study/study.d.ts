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

type StudyDetail = TStudy & {
  created_at: string;
  updated_at: string;
  post_content: string;
  start_date: string;
  end_date: string;
  deadline: string;
  _links: TLink[];
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
