const StatusStudySkeleton = () => {
  const array = Array.from({ length: 4 }, (_, i) => i);

  return (
    <ul className="flex flex-wrap items-center gap-8">
      {array.map((_, i) => (
        <li
          key={i}
          className="flex h-[148px] w-[168px] list-none flex-col rounded-[7px] bg-white shadow-header"
        >
          <div className="h-[98px] w-full animate-skeleton-gradient1 rounded-t-[7px]" />
          <div className="ml-2 mt-2 h-2.5 w-[70px] animate-skeleton-gradient1 rounded-sm" />
          <div className="ml-2 mt-3 h-2.5 w-[120px] animate-skeleton-gradient1 rounded-sm" />
        </li>
      ))}
    </ul>
  );
};

export default StatusStudySkeleton;
