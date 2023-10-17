import Card from '@components/common/Card';
import { useGetMyStudyGroupList } from '@hooks/queries/useGetStudy';

const PendingApprovalList = () => {
  const { data: studies } = useGetMyStudyGroupList('requested');

  return (
    <>
      <div className="mb-4 mt-10 flex flex-wrap gap-x-[33px]">
        {studies.pages.flatMap((page) =>
          page.results.map(
            ({ uuid, head_image, name, start_date, end_date }) => (
              <Card
                key={uuid}
                path={`/study/detail/${uuid}`}
                size="small"
                img={head_image}
                startDate={start_date}
                endDate={end_date}
                studyName={name}
              />
            ),
          ),
        )}
      </div>
    </>
  );
};

export default PendingApprovalList;
