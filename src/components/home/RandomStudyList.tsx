import Card from '@components/common/Card';
import { useGetRandomStudyGroupList } from '@hooks/queries/useGetStudy';
import tw from 'tailwind-styled-components';

const RandomStudyList = () => {
  const { data } = useGetRandomStudyGroupList();

  return (
    <StudyListContainer>
      {data?.results.map(
        ({
          uuid,
          head_image,
          leaders,
          post_title,
          study_name,
          is_closed,
          tags,
          current_member_count,
          member_limit,
          until_deadline,
        }) => (
          <Card
            path={`/study/detail/${uuid}`}
            key={uuid}
            size="big"
            title={post_title}
            studyName={study_name}
            writer={leaders[0] && leaders[0].username}
            tags={tags}
            isClosed={is_closed}
            img={head_image}
            participant={current_member_count}
            personnel={member_limit}
            deadline={until_deadline}
          />
        ),
      )}
    </StudyListContainer>
  );
};

export default RandomStudyList;

const StudyListContainer = tw.div`
  flex
  w-full
  flex-wrap
  items-center
  justify-center
  gap-12
  pb-8
`;
