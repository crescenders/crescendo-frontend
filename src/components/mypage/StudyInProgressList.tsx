import Card from '@components/common/Card';
import { useGetMyStudyGroupList } from '@hooks/queries/useGetStudy';

const StudyInProgressList = () => {
  const { data: studies } = useGetMyStudyGroupList('current');

  return (
    <>
      {studies.pages.flatMap((page) =>
        page.results.length > 0 ? (
          <div className="mt-10 flex flex-wrap gap-x-[33px]">
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
        ) : (
          <div className="py-20" />
        ),
      )}
    </>
  );
};

export default StudyInProgressList;
