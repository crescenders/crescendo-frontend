const AssignmentListSkeleton = () => {
  const array = Array.from({ length: 5 }, (_, i) => i);

  return (
    <ul className="flex flex-col items-center gap-y-5">
      {array.map((_, i) => (
        <li
          key={i}
          className="h-[236px] w-full max-w-[544px] rounded-[20px] bg-white p-7 shadow-studyCard"
        >
          <div className="mb-[52px] flex items-center justify-between">
            <div className="h-5 w-[200px] animate-skeleton-gradient1 rounded-sm " />
            <div className="h-4 w-[73px] animate-skeleton-gradient1 rounded-sm" />
          </div>
          <div className="flex flex-col gap-y-3">
            <div className="h-4 w-full animate-skeleton-gradient1 rounded-sm px-5" />
            <div className="h-4 w-full animate-skeleton-gradient1 rounded-sm px-5" />
            <div className="h-4 w-1/5 animate-skeleton-gradient1 rounded-sm px-5" />
          </div>
          <div className="mt-5 flex items-end justify-end">
            <div className="h-4 w-[100px] animate-skeleton-gradient1 rounded-sm" />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AssignmentListSkeleton;