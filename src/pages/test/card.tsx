import Card from '@components/common/Card';
import PageLayout from '@components/common/PageLayout';

const CardTest = () => {
  return (
    <PageLayout>
      <div className="mt-20  flex flex-col gap-4 bg-slate-400 p-10">
        <div className="mt-4  flex gap-4 bg-slate-400 p-4">
          <Card
            path="/"
            size="big"
            isCanApply={true}
            img="https://github.com/crescenders/crescendo-frontend/assets/87893624/d458744c-54b6-4018-9de5-ba354e6da407"
            title="제목제목제목"
            studyName="스터디명"
            writer="Lami"
            participant={3}
            personnel={5}
            tag="#리액트#노드"
            startDate="2023.06.03"
          />
          <Card
            path="/"
            size="big"
            isCanApply={true}
            img="https://github.com/crescenders/crescendo-frontend/assets/87893624/d458744c-54b6-4018-9de5-ba354e6da407"
            title="제목제목제목"
            studyName="스터디명"
            writer="Lami"
            participant={3}
            personnel={5}
            tag="#리액트#노드"
            startDate="2023.06.04"
          />
          <Card
            path="/"
            size="big"
            isCanApply={true}
            img="https://github.com/crescenders/crescendo-frontend/assets/87893624/d458744c-54b6-4018-9de5-ba354e6da407"
            title="제목제목제목"
            studyName="스터디명"
            writer="Lami"
            participant={3}
            personnel={5}
            tag="#리액트#노드"
            startDate="2023.06.13"
          />
          <Card
            path="/"
            size="big"
            isCanApply={false}
            img="https://github.com/crescenders/crescendo-frontend/assets/87893624/d458744c-54b6-4018-9de5-ba354e6da407"
            title="제목제목제목"
            studyName="스터디명"
            writer="Lami"
            participant={3}
            personnel={5}
            tag="#리액트#노드"
            startDate="2023.06.02"
          />
        </div>
        <div className="mt-4  flex gap-4 bg-slate-400 p-4">
          <Card
            path="/"
            size="medium"
            img="https://github.com/crescenders/crescendo-frontend/assets/87893624/d458744c-54b6-4018-9de5-ba354e6da407"
            title="제목제목제목"
            studyName="스터디명"
            startDate="2023.06.02"
            endDate="2023.07.02"
            isApprove={false}
          />
          <Card
            path="/"
            size="medium"
            img="https://github.com/crescenders/crescendo-frontend/assets/87893624/d458744c-54b6-4018-9de5-ba354e6da407"
            title="제목제목제목"
            studyName="스터디명"
            startDate="2023.06.02"
            endDate="2023.07.02"
            isApprove={true}
          />
          <Card
            path="/"
            size="small"
            img="https://github.com/crescenders/crescendo-frontend/assets/87893624/d458744c-54b6-4018-9de5-ba354e6da407"
            title="제목제목제목"
            studyName="스터디명"
            startDate="2023.06.02"
            endDate="2023.07.02"
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default CardTest;
