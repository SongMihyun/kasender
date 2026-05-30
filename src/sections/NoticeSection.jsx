import SectionBox from "../components/common/SectionBox.jsx";
import SectionTitle from "../components/ui/SectionTitle.jsx";
import Card from "../components/ui/Card.jsx";
import { notices } from "../data/notices.js";

function NoticeSection() {
  return (
    <SectionBox id="notice">
      <SectionTitle
        label="Notice"
        title="공지사항"
        description="베타 운영 및 업데이트 관련 주요 공지입니다."
      />

      <div className="cardGrid">
        {notices.map((notice) => (
          <Card key={notice.title}>
            <h3>{notice.title}</h3>
            <p>{notice.description}</p>
          </Card>
        ))}
      </div>
    </SectionBox>
  );
}

export default NoticeSection;