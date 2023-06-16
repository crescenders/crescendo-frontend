type Modal = {
  isOpen: boolean;
  handleClose: () => void;
  handleClick?: () => void;
  children?: React.ReactNode;
};

type TResponse = {
  count: number;
  next_page: number | null;
  previous_page: number | null;
};
