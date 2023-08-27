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
