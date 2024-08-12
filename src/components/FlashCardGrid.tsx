import {
  memo,
  MutableRefObject,
  useCallback,
  useEffect,
  useState,
} from "react";
import Pagination from "./Pagination";
import {
  useDeleteFlashCardMutation,
  useFetchFlashCardsQuery,
} from "../../store/flashCardApi";
import Container from "./Container";
import { TiEdit } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { showMessage } from "./Message";

type Card = {
  pageIndex: number;
  question: string;
  answer: string;
};

type gridParam = {
  inDashBoard?: boolean;
  formRef?: MutableRefObject<HTMLFormElement | null>;
  setEditingCardData?: React.Dispatch<React.SetStateAction<{} | Card>>;
};

const FlashCard = memo(({ question, answer, pageIndex }: Card) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="sm:w-[80vw] w-[90vw] border h-[80vh] bg-gray-200 text-sm sm:text-lg border-gray-400 relative rounded-md cursor-pointer text-black"
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
          className="absolute w-full h-full flex items-center text-center justify-center "
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <div>
            <h1 className="font-semibold capitalize">
              question: {pageIndex + 1}
            </h1>
            {question}
          </div>
        </div>
        <div
          className="absolute w-full h-full flex items-center justify-center transform rotate-y-180 "
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

const FlashCardGrid = memo(
  ({ inDashBoard, formRef, setEditingCardData }: gridParam) => {
    const [
      DeleteFlashCard,
      { isLoading: isDeleting, isSuccess: isSuccessDeleting },
    ] = useDeleteFlashCardMutation();

    const { data: { flashCards = [] } = {}, isLoading } =
      useFetchFlashCardsQuery();

    const [pageIndex, setPageIndex] = useState(0);

    // will fill the form and scroll up to the form
    const handleEditFlashCard = useCallback(() => {
      if (formRef && formRef.current && setEditingCardData) {
        formRef.current.scrollIntoView({ behavior: "smooth" });
        setEditingCardData(flashCards[pageIndex]);
      }
    }, [flashCards, pageIndex, formRef]);

    // will show a confirmation message and then delete the flashcard
    const handleDeleteFlashCard = useCallback(() => {
      showMessage({
        type: "warning",
        message: "do you really want to delete this flashcard",
      }).then((isConfirmed) => {
        if (isConfirmed) {
          DeleteFlashCard(flashCards[pageIndex].id);
        }
      });
    }, [flashCards, pageIndex]);

    // will show message when flash card deleted
    useEffect(() => {
      if (isSuccessDeleting) {
        showMessage({
          type: "success",
          message: "flashcard deleted successfully",
        });

        if (flashCards[pageIndex - 1]) setPageIndex(pageIndex - 1);
        else if (flashCards[pageIndex + 1]) setPageIndex(pageIndex + 1);
        else setPageIndex(0);
      }
    }, [isSuccessDeleting]);

    return (
      <Container LoadingConditions={[isLoading, isDeleting]}>
        {flashCards.length > 0 && flashCards[pageIndex] && (
          <div className="p-4 pt-2 space-y-4 mx-auto flex flex-col items-center">
            <div className="flex w-full justify-center">
              <FlashCard
                key={flashCards[pageIndex].id}
                {...flashCards[pageIndex]}
                pageIndex={pageIndex}
              />
              <div className={inDashBoard ? "flex flex-col max-sm:gap-y-5 gap-y-2" : "hidden"}>
                <button type="button" onClick={handleEditFlashCard}>
                  <TiEdit className="max-sm:size-5 size-8  text-yellow-500" />
                </button>
                <button type="button" onClick={handleDeleteFlashCard}>
                  <MdDelete className="max-sm:size-5 size-8 text-red-500" />
                </button>
              </div>
            </div>

            <Pagination
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
              noOfPages={flashCards.length - 1}
            />
          </div>
        )}
      </Container>
    );
  }
);

export default FlashCardGrid;
