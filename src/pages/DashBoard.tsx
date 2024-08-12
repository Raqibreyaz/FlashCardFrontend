import { useRef, useState } from "react";
import FlashCardGrid from "../components/FlashCardGrid";
import QuestionAnswerForm from "../components/CreateFlashCardForm";

const DashBoard = () => {
  const formRef = useRef(null);

  type Card = {
    id: number;
    question: string;
    answer: string;
  };

  const [editingCardData, setEditingCardData] = useState<Card | {}>({});

  return (
    <div>
      <QuestionAnswerForm formRef={formRef} {...editingCardData} />
      <FlashCardGrid
        inDashBoard={true}
        formRef={formRef}
        setEditingCardData={setEditingCardData}
      />
    </div>
  );
};

export default DashBoard;
