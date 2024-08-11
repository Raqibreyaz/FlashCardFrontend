import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type flashCardData = {
  id: number;
  question: string;
  answer: string;
};

interface receivedData {
  success: boolean;
  message: string;
  flashCards?: flashCardData[];
}

// Define a service using a base URL and expected endpoints
export const flashCardApi = createApi({
  reducerPath: "flashCard",
  tagTypes: ["flashCards"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/flashcards/",
  }),
  endpoints: (builder) => ({
    fetchFlashCards: builder.query<receivedData, void>({
      query: () => ({
        url: `fetch-flashcards`,
        method: "GET",
      }),
      providesTags: ["flashCards"],
    }),

    createFlashCard: builder.mutation<
      receivedData,
      { question: string; answer: string }
    >({
      query: (data) => ({
        url: `create-flashcard`,
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["flashCards"],
    }),

    updateFlashCards: builder.mutation<
      receivedData,
      { id: string; data: { question?: string; answer?: string } }
    >({
      query: ({ id, data }) => ({
        url: `update-flashcard/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["flashCards"],
    }),

    deleteFlashCard: builder.mutation<receivedData, string>({
      query: (id) => ({
        url: `delete-flashcard/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["flashCards"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useFetchFlashCardsQuery,
  useUpdateFlashCardsMutation,
  useCreateFlashCardMutation,
  useDeleteFlashCardMutation,
} = flashCardApi;
