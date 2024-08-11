import { memo, useState } from "react";
import Pagination from "./Pagination";
import { useFetchFlashCardsQuery } from "../../store/flashCardApi";
import Container from "./Container";

type Card = {
  id: number;
  question: string;
  answer: string;
  inDashBoard: boolean;
};

type gridParam = {
  inDashBoard: boolean;
};

const FlashCard = memo(({ question, answer }: Card) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="sm:w-[80vw] w-[95vw] h-[80vh] text-sm sm:text-lg border-black relative cursor-pointer text-white"
      onClick={() => setFlipped(!flipped)}
      style={{ perspective: "1000px" }} // Perspective for 3D effect
    >
      <div
        className={`w-full h-full rounded-lg transition-transform duration-700 transform ${
          flipped ? "rotate-y-180" : ""
        }`}
        style={{
          transformStyle: "preserve-3d", // Preserve 3D space
          position: "relative",
        }}
      >
        <div
          className="absolute w-full h-full bg-zinc-900 flex items-center justify-center "
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <div>
            <h1 className="font-semibold capitalize">question:</h1>
            {question}
          </div>
        </div>
        <div
          className="absolute w-full h-full bg-zinc-900 flex items-center justify-center transform rotate-y-180 "
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <div>
            <h1 className="font-semibold capitalize">answer:</h1>
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
});

const FlashCardGrid = memo(({ inDashBoard }: gridParam) => {
  const dataArray = [
    { id: 1, question: "What is the capital of France?", answer: "Paris" },
    { id: 2, question: "What is 2 + 2?", answer: "4" },
    {
      id: 3,
      question: "Who wrote 'To Kill a Mockingbird'?",
      answer: "Harper Lee",
    },
    {
      id: 4,
      question: "What is the largest planet in our solar system?",
      answer: "Jupiter",
    },
    { id: 5, question: "What is the chemical symbol for gold?", answer: "Au" },
    { id: 6, question: "In which year did the Titanic sink?", answer: "1912" },
    {
      id: 7,
      question: "What is the hardest natural substance on Earth?",
      answer: "Diamond",
    },
    {
      id: 8,
      question: "Who painted the Mona Lisa?",
      answer: "Leonardo da Vinci",
    },
    { id: 9, question: "What is the smallest prime number?", answer: "2" },
    {
      id: 10,
      question: "What is the main ingredient in guacamole?",
      answer: "Avocado",
    },
    {
      id: 11,
      question: "Who is known as the father of modern physics?",
      answer: "Albert Einstein",
    },
    { id: 12, question: "What is the currency of Japan?", answer: "Yen" },
    {
      id: 13,
      question: "What is the largest ocean on Earth?",
      answer: "Pacific Ocean",
    },
    { id: 14, question: "Who wrote '1984'?", answer: "George Orwell" },
    {
      id: 15,
      question: "What is the boiling point of water in Celsius?",
      answer: "100°C",
    },
    {
      id: 16,
      question: "Which planet is known as the Red Planet?",
      answer: "Mars",
    },
    {
      id: 17,
      question: "What is the chemical symbol for water?",
      answer: "H2O",
    },
    { id: 18, question: "What is the capital of Canada?", answer: "Ottawa" },
    {
      id: 19,
      question: "Who is the author of 'Harry Potter'?",
      answer: "J.K. Rowling",
    },
    {
      id: 20,
      question: "What is the largest desert in the world?",
      answer: "Sahara",
    },
  ];

  const { data: { flashCards = [] } = {}, isLoading } =
    useFetchFlashCardsQuery();

  return (
    <Container LoadingConditions={[isLoading]}>
      <div className="p-4 space-y-4 mx-auto flex flex-col items-center">
        {dataArray.map((card) => (
          <FlashCard key={card.id} inDashBoard={inDashBoard} {...card} />
        ))}
        <Pagination />
      </div>
    </Container>
  );
});

export default FlashCardGrid;
