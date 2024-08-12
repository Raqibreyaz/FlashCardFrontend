import { memo, MutableRefObject, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateFlashCardMutation,
  useUpdateFlashCardsMutation,
} from "../../store/flashCardApi";
import { showMessage } from "../components/Message.ts";
import Container from "./Container";

interface FormValues {
  question: string;
  answer: string;
}

interface providedParams {
  id?: number;
  question?: string;
  answer?: string;
  formRef?: MutableRefObject<null>;
}

const QuestionAnswerForm = memo(
  ({ id, formRef, answer, question }: providedParams) => {
    const {
      register,
      handleSubmit,
      formState: { errors, isDirty, isSubmitting },
      reset,
    } = useForm<FormValues>({
      defaultValues: {
        question: question ?? "",
        answer: answer ?? "",
      },
    });

    const [
      CreateFlashCard,
      {
        isLoading: isCreating,
        isSuccess: isSuccessfullyCreated,
        isError: isErrorWhileCreating,
      },
    ] = useCreateFlashCardMutation();

    const [
      UpdateFlashCard,
      {
        isLoading: isUpdating,
        isSuccess: isSuccessfullyUpdated,
        isError: isErrorWhileUpdating,
      },
    ] = useUpdateFlashCardsMutation();

    //   will create or update flashcard
    const onSubmit = useCallback((data: FormValues) => {
      if (id !== undefined) {
        UpdateFlashCard({ id, data });
      } else {
        CreateFlashCard(data);
      }
    }, [id]);

    useEffect(() => {
      if (isSuccessfullyCreated) {
        showMessage({
          type: "success",
          message: "flashcard created successfully",
        });
        reset()
      }
      if (isErrorWhileCreating) {
        showMessage({
          type: "error",
          message: "Something Went Wrong While Creating the FlashCard",
        });
      }
    }, [isSuccessfullyCreated, isErrorWhileCreating]);

    useEffect(() => {
      if (isSuccessfullyUpdated) {
        showMessage({
          type: "success",
          message: "flashcard updated successfully",
        });
        reset()
      }

      if (isErrorWhileUpdating) {
        showMessage({
          type: "error",
          message: "Something Went Wrong While Updating FlashCard",
        });
      }
    }, [isSuccessfullyUpdated, isErrorWhileUpdating]);

    useEffect(() => {
      if (question && answer) {
        reset({
          question,
          answer,
        });
      }
    }, [question, answer]);

    return (
      <Container LoadingConditions={[isCreating, isUpdating]}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto p-4 my-10 bg-white shadow-md rounded-lg"
          ref={formRef}
        >
          <h1 className="text-center font-semibold text-xl">
            Add New Question
          </h1>
          <div className="mb-4">
            <label
              htmlFor="question"
              className="block text-gray-700 font-medium mb-2"
            >
              Question
            </label>
            <input
              type="text"
              id="question"
              {...register("question", { required: "Question is required" })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your question"
            />
            {errors.question && (
              <p className="text-red-500 text-sm mt-1">
                {errors.question.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="answer"
              className="block text-gray-700 font-medium mb-2"
            >
              Answer
            </label>
            <textarea
              id="answer"
              {...register("answer", { required: "Answer is required" })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your answer"
            ></textarea>
            {errors.answer && (
              <p className="text-red-500 text-sm mt-1">
                {errors.answer.message}
              </p>
            )}
          </div>

          {isDirty &&
            !isSubmitting &&
            Object.keys(errors ?? {}).length === 0 && (
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            )}
        </form>
      </Container>
    );
  }
);

export default QuestionAnswerForm;
