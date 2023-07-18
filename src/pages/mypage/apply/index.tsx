import Card from '@components/common/Card';
import MenuBar from '@components/common/MenuBar';
import PageLayout from '@components/common/PageLayout';

const Apply = () => {
  const DUMMY_DATA = [
    {
      id: 1,
      studyName: '승인 예시1',
      startDate: '2023.06.02',
      endDate: '2023.07.02',
      img: 'https://github.com/crescenders/crescendo-frontend/assets/87893624/d458744c-54b6-4018-9de5-ba354e6da407',
      isApprove: true,
    },
    {
      id: 2,
      studyName: '승인 예시2',
      startDate: '2023.06.05',
      endDate: '2023.07.05',
      img: 'https://github.com/crescenders/crescendo-frontend/assets/87893624/777979ee-45f3-4f00-88c3-cb32119249fe',
      isApprove: true,
    },
    {
      id: 3,
      studyName: '거절 예시1',
      startDate: '2023.06.10',
      endDate: '2023.07.10',
      img: 'https://github.com/crescenders/crescendo-frontend/assets/87893624/396933ec-8d20-4faf-9412-f18e06332558',
      isApprove: false,
    },
    {
      id: 4,
      studyName: '거절 예시2',
      startDate: '2023.06.10',
      endDate: '2023.07.10',
      img: 'https://github.com/crescenders/crescendo-frontend/assets/87893624/396933ec-8d20-4faf-9412-f18e06332558',
      isApprove: false,
    },
    {
      id: 5,
      studyName: '승인 예시3',
      startDate: '2023.06.10',
      endDate: '2023.07.10',
      img: 'https://github.com/crescenders/crescendo-frontend/assets/87893624/396933ec-8d20-4faf-9412-f18e06332558',
      isApprove: true,
    },
    {
      id: 6,
      studyName: '거절 예시3',
      startDate: '2023.06.10',
      endDate: '2023.07.10',
      img: 'https://github.com/crescenders/crescendo-frontend/assets/87893624/396933ec-8d20-4faf-9412-f18e06332558',
      isApprove: false,
    },
    {
      id: 7,
      studyName: '승인 예시4',
      startDate: '2023.06.10',
      endDate: '2023.07.10',
      img: 'https://github.com/crescenders/crescendo-frontend/assets/87893624/396933ec-8d20-4faf-9412-f18e06332558',
      isApprove: true,
    },
    {
      id: 8,
      studyName: '승인 예시5',
      startDate: '2023.06.10',
      endDate: '2023.07.10',
      img: 'https://github.com/crescenders/crescendo-frontend/assets/87893624/396933ec-8d20-4faf-9412-f18e06332558',
      isApprove: true,
    },
    {
      id: 9,
      studyName: '승인 예시6',
      startDate: '2023.06.10',
      endDate: '2023.07.10',
      img: 'https://github.com/crescenders/crescendo-frontend/assets/87893624/396933ec-8d20-4faf-9412-f18e06332558',
      isApprove: true,
    },
    {
      id: 10,
      studyName: '거절 예시4',
      startDate: '2023.06.10',
      endDate: '2023.07.10',
      img: 'https://github.com/crescenders/crescendo-frontend/assets/87893624/396933ec-8d20-4faf-9412-f18e06332558',
      isApprove: false,
    },
    {
      id: 11,
      studyName: '승인 예시7',
      startDate: '2023.06.10',
      endDate: '2023.07.10',
      img: 'https://github.com/crescenders/crescendo-frontend/assets/87893624/396933ec-8d20-4faf-9412-f18e06332558',
      isApprove: true,
    },
    {
      id: 12,
      studyName: '승인 예시8',
      startDate: '2023.06.10',
      endDate: '2023.07.10',
      img: 'https://github.com/crescenders/crescendo-frontend/assets/87893624/396933ec-8d20-4faf-9412-f18e06332558',
      isApprove: true,
    },
  ];

  return (
    <PageLayout>
      <div className="mt-[110px] flex  w-full flex-col items-center px-[46px]">
        <MenuBar
          focusedPosition="right"
          leftText="스터디 현황"
          rightText="신청한 스터디"
          path={'/study/current-status'}
        />
      </div>
      <div className="my-[57px] flex flex-wrap justify-center gap-[40px] px-[78px]">
        {DUMMY_DATA.map(
          ({ id, img, studyName, startDate, endDate, isApprove }) => (
            <Card
              key={id}
              path="/"
              size="medium"
              img={img}
              studyName={studyName}
              startDate={startDate}
              endDate={endDate}
              isApprove={isApprove}
            />
          ),
        )}
      </div>
    </PageLayout>
  );
};

export default Apply;
