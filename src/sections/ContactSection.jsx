import SectionBox from "../components/common/SectionBox.jsx";
import SectionTitle from "../components/ui/SectionTitle.jsx";
import Button from "../components/ui/Button.jsx";

function ContactSection() {
  const openContact = () => {
    window.open("https://open.kakao.com/", "_blank");
  };

  return (
    <SectionBox id="contact">
      <SectionTitle
        label="Contact"
        title="문의하기"
        description="버그 신고, 기능 요청, 사용 문의는 카카오 오픈채팅을 통해 접수합니다."
      />

      <div className="contactBox">
        <p>초기 베타 운영 중에는 빠른 피드백 수집을 위해 카카오 오픈채팅을 문의 채널로 사용합니다.</p>
        <Button onClick={openContact}>카카오 오픈채팅 열기</Button>
      </div>
    </SectionBox>
  );
}

export default ContactSection;