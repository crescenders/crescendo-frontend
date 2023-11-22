const MyStudyListSkeleton = () => {
  const array = Array.from({ length: 8 }, (_, i) => i);

  return (
    <>
      {array.map((_, i) => (
        <div
          key={i}
          className="flex h-[171px] w-[445px] flex-col justify-between rounded-[20px] bg-white p-5 shadow-studyCard"
        >
          <div className="flex w-[100%] justify-between">
            <div className="w-60 animate-skeleton-gradient rounded-sm" />
            <div className="mr-2 flex items-center gap-x-0.5">
              <div className="h-[17px] w-[30px] animate-skeleton-gradient rounded-sm" />
            </div>
          </div>
          <div className="mt-[11px] flex gap-x-2">
            <div className="h-[17px] w-14 animate-skeleton-gradient rounded-sm" />
            <div className="h-[17px] w-14 animate-skeleton-gradient rounded-sm" />
            <div className="h-[17px] w-14 animate-skeleton-gradient rounded-sm" />
          </div>
          <div className="mt-11 flex items-center justify-between">
            <div className="flex flex-col justify-between gap-y-1">
              <div className="h-[12px] w-40 animate-skeleton-gradient rounded-sm" />
              <div className="h-[12px] w-36 animate-skeleton-gradient rounded-sm" />
            </div>
            <div className="h-[35px] w-[35px] animate-skeleton-gradient rounded-full" />
          </div>
        </div>
      ))}
    </>
  );
};

export default MyStudyListSkeleton;
