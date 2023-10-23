type LoaderProps = {
  isFull?: boolean;
};

const Loader = ({ isFull }: LoaderProps) => {
  return (
    <div
      className={`${
        isFull && 'fixed left-0 top-0 z-[999]'
      } flex h-full w-full items-center justify-center gap-x-2`}
    >
      <div className="h-3 w-3 animate-bounce1 rounded-full bg-brand" />
      <div className="h-3 w-3 animate-bounce2 rounded-full bg-brand" />
      <div className="h-3 w-3 animate-bounce3 rounded-full bg-brand" />
    </div>
  );
};

export default Loader;
