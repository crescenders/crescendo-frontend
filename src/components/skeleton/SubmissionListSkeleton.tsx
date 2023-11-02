const SubmissionListSkeleton = () => {
  const array = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="flex flex-col gap-8">
      {array.map((_, i) => (
        <div
          key={i}
          className="flex h-[130px] w-[544px] flex-col justify-between rounded-2xl bg-[#F3F4F8] p-6"
        >
          <div className="h-[16px] w-[180px] animate-skeleton-gradient rounded-sm" />
          <div className="flex w-full items-end justify-end gap-1">
            <div className="h-[12px] w-[120px] animate-skeleton-gradient rounded-sm" />
            <div className="h-[16px] w-[60px] animate-skeleton-gradient rounded-sm" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubmissionListSkeleton;
