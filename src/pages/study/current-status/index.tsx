import PageLayout from '@components/common/PageLayout';
import MenuBar from '@components/common/MenuBar';
import Link from 'next/link';
import Card from '@components/common/Card';
import tw from 'tailwind-styled-components';

const CurrentStatus = () => {
  const DUMMY_DATA_IN_PROGRESS = [
    {
      id: 1,
      studyName: '진행 중 예시1',
      startDate: '2023.06.02',
      endDate: '2023.07.02',
      img: 'https://github.com/crescenders/crescendo-frontend/assets/87893624/d458744c-54b6-4018-9de5-ba354e6da407',
    },
    {
      id: 2,
      studyName: '진행 중 예시2',
      startDate: '2023.06.05',
      endDate: '2023.07.05',
      img: 'https://github.com/crescenders/crescendo-frontend/assets/87893624/777979ee-45f3-4f00-88c3-cb32119249fe',
    },
    {
      id: 3,
      studyName: '진행 중 예시3',
      startDate: '2023.06.10',
      endDate: '2023.07.10',
      img: 'https://github.com/crescenders/crescendo-frontend/assets/87893624/396933ec-8d20-4faf-9412-f18e06332558',
    },
  ];

  const DUMMY_DATA_PENDING = [
    {
      id: 1,
      studyName: '승인 대기 중 예시1',
      startDate: '2023.06.02',
      endDate: '2023.07.02',
      img: 'https://github.com/crescenders/crescendo-frontend/assets/87893624/d458744c-54b6-4018-9de5-ba354e6da407',
    },
    {
      id: 2,
      studyName: '승인 대기 중 예시2',
      startDate: '2023.06.05',
      endDate: '2023.07.05',
      img: 'https://github.com/crescenders/crescendo-frontend/assets/87893624/777979ee-45f3-4f00-88c3-cb32119249fe',
    },
  ];

  return (
    <PageLayout>
      <div className="mt-[110px] flex  w-full flex-col items-center px-[46px]">
        <MenuBar
          focusedPosition="left"
          leftText="스터디 현황"
          rightText="신청한 스터디"
          path={'/study/apply'}
        />
        <div className="mt-[74px] w-full ">
          <div>
            <div className="flex w-full items-end justify-between">
              <Title>진행 중인 스터디</Title>
              <Link href={'/study/manage'}>
                <span className="text-12 font-normal">
                  내가 만든 스터디 관리
                </span>
              </Link>
            </div>
            <CardsWrapper>
              {DUMMY_DATA_IN_PROGRESS.map(
                ({ id, img, studyName, startDate, endDate }) => (
                  <Card
                    key={id}
                    path={`/study/detail/${id}`}
                    size="small"
                    img={img}
                    studyName={studyName}
                    startDate={startDate}
                    endDate={endDate}
                  />
                ),
              )}
            </CardsWrapper>
          </div>

          <div className="mt-[46px]">
            <Title>승인 대기 중 스터디</Title>
            <CardsWrapper>
              {DUMMY_DATA_PENDING.map(
                ({ id, img, studyName, startDate, endDate }) => (
                  <Card
                    key={id}
                    path={`/study/detail/${id}`}
                    size="small"
                    img={img}
                    studyName={studyName}
                    startDate={startDate}
                    endDate={endDate}
                  />
                ),
              )}
            </CardsWrapper>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CurrentStatus;

const Title = tw.h2`
  text-24
  font-bold
`;

const CardsWrapper = tw.div`
  mt-[41px]
  flex
  flex-wrap
  gap-[33px]
`;
