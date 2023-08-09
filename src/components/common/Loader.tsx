const Loader = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center gap-x-2">
      <div className="h-3 w-3 animate-bounce1 rounded-full bg-brand" />
      <div className="h-3 w-3 animate-bounce2 rounded-full bg-brand" />
      <div className="h-3 w-3 animate-bounce3 rounded-full bg-brand" />
    </div>
  );
};

export default Loader;
