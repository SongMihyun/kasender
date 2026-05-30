import SectionBox from "../components/common/SectionBox.jsx";
import SectionTitle from "../components/ui/SectionTitle.jsx";
import { faqs } from "../data/faqs.js";

function FaqSection() {
  return (
    <SectionBox id="faq">
      <SectionTitle
        label="FAQ"
        title="자주 묻는 질문"
        description="초기 사용자가 자주 확인해야 하는 내용을 정리했습니다."
      />

      <div className="faqList">
        {faqs.map((faq) => (
          <div className="faqItem" key={faq.question}>
            <strong>Q. {faq.question}</strong>
            <p>A. {faq.answer}</p>
          </div>
        ))}
      </div>
    </SectionBox>
  );
}

export default FaqSection;