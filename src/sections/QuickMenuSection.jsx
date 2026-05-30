import { Link } from "react-router-dom";
import SectionBox from "../components/common/SectionBox.jsx";
import SectionTitle from "../components/ui/SectionTitle.jsx";

function QuickMenuSection() {
  const menus = [
    {
      title: "다운로드",
      description: "최신 설치파일을 확인합니다.",
      path: "/download",
    },
    {
      title: "공지사항",
      description: "운영 공지와 업데이트 내역을 확인합니다.",
      path: "/notice",
    },
    {
      title: "FAQ",
      description: "자주 묻는 질문을 확인합니다.",
      path: "/faq",
    },
    {
      title: "사용설명서",
      description: "초기 설정과 사용 방법을 확인합니다.",
      path: "/manual",
    },
    {
      title: "문의하기",
      description: "버그 신고와 사용 문의를 접수합니다.",
      path: "/contact",
    },
  ];

  return (
    <SectionBox id="quick-menu">
      <SectionTitle
        label="Quick Menu"
        title="필요한 메뉴로 바로 이동하세요"
        description="카센더 다운로드, 공지사항, 사용설명서, 문의 채널을 빠르게 확인할 수 있습니다."
      />

      <div className="quickMenuGrid">
        {menus.map((menu) => (
          <Link to={menu.path} className="quickMenuCard" key={menu.title}>
            <h3>{menu.title}</h3>
            <p>{menu.description}</p>
          </Link>
        ))}
      </div>
    </SectionBox>
  );
}

export default QuickMenuSection;