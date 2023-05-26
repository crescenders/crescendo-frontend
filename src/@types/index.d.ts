type Modal = {
  isOpen: boolean;
  handleClose: () => void;
  handleClick?: () => void;
  children?: React.ReactNode;
};
