const StudyListSkeleton = () => {
  const array = Array.from({ length: 12 }, (_, i) => i);

  return (
    <>
      {array.map((_, i) => (
        <li
          key={i}
          className="flex h-[237px] w-[210px] list-none flex-col gap-y-5 rounded-[7px] bg-white shadow-header"
        >
          <div className="flex justify-center">
            <div className="mt-5 h-[100px] w-[180px] animate-skeleton-gradient rounded-md" />
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="ml-3 h-4 w-[120px] animate-skeleton-gradient rounded-sm" />
            <div className="ml-3 h-3 w-14 animate-skeleton-gradient rounded-sm" />
            <div className="ml-3 h-3 w-20 animate-skeleton-gradient rounded-sm" />
          </div>
          <div className="flex items-center justify-between px-3">
            <div className="h-3 w-10 animate-skeleton-gradient rounded-sm" />
            <div className="h-3 w-9 animate-skeleton-gradient rounded-sm" />
          </div>
        </li>
      ))}
    </>
  );
};

export default StudyListSkeleton;
