type TResponse = {
  count: number;
  next_page: number | null;
  previous_page: number | null;
};

type TDate = Date | null;

type TLink = {
  rel: string;
  href: string;
};

type TLeaders = {
  username: string;
  _links: TLink[];
};

type TStudy = {
  head_image: string;
  leaders: TLeaders[];
  post_title: string;
  study_name: string;
  until_deadline: number;
  is_closed: boolean;
  tags: string[];
  categories: string[];
  current_member_count: number;
  member_limit: number;
};
