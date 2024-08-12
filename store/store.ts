import { configureStore } from "@reduxjs/toolkit";
import { flashCardApi } from "./flashCardApi";

export const store = configureStore({
  reducer: {
    [flashCardApi.reducerPath]: flashCardApi.reducer,
  },

  //   using the middleware we can add custom middlewares even error handlers also
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(flashCardApi.middleware),
});
