import SectionBox from "../components/common/SectionBox.jsx";
import SectionTitle from "../components/ui/SectionTitle.jsx";
import { manuals } from "../data/manuals.js";

function ManualSection() {
  return (
    <SectionBox id="manual">
      <SectionTitle
        label="Manual"
        title="초기 사용설명서"
        description="카센더를 처음 실행할 때 필요한 기본 절차입니다."
      />

      <ol className="manualList">
        {manuals.map((manual) => (
          <li key={manual}>{manual}</li>
        ))}
      </ol>
    </SectionBox>
  );
}

export default ManualSection;