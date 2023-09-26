const StudyDetailSkeleton = () => {
  return (
    <div className="w-full px-[200px]">
      <div className="mt-[50px] flex flex-col items-center gap-y-4">
        <div className="h-[20px] w-2/5 animate-skeleton-gradient1 self-start rounded-sm" />
        <div className="h-[20px] w-2/6 animate-skeleton-gradient1 self-start rounded-sm" />
        <div className="h-[20px] w-1/4 animate-skeleton-gradient1 self-start rounded-sm" />
        <div className="h-[250px] w-full animate-skeleton-gradient1 self-center rounded-md" />
      </div>
      <div className="flex items-center justify-between w-full mt-10 gap-x-12">
        <div className="flex flex-col w-full gap-y-4">
          <div className="h-[20px] w-2/3 animate-skeleton-gradient1 rounded-sm" />
          <div className="h-[20px] w-1/2 animate-skeleton-gradient1 rounded-sm" />
        </div>
        <div className="flex flex-col w-full gap-y-4">
          <div className="h-[20px] w-full animate-skeleton-gradient1 rounded-sm" />
          <div className="h-[20px] w-3/4 animate-skeleton-gradient1 rounded-sm" />
        </div>
      </div>
      <div className="mt-20 h-[20px] w-[130px] animate-skeleton-gradient1 rounded-sm" />
      <div className="flex flex-col mt-8 gap-y-3">
        <div className="h-[20px] w-full animate-skeleton-gradient1 rounded-sm" />
        <div className="h-[20px] w-5/6 animate-skeleton-gradient1 rounded-sm" />
        <div className="h-[20px] w-11/12 animate-skeleton-gradient1 rounded-sm" />
        <div className="h-[20px] w-5/6 animate-skeleton-gradient1 rounded-sm" />
        <div className="h-[20px] w-full animate-skeleton-gradient1 rounded-sm" />
      </div>
    </div>
  );
};

export default StudyDetailSkeleton;
