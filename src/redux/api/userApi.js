import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base URL from the environment variable
const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://latrice-webapp-backend.vercel.app/api/v1/';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // Optionally add authentication headers if needed
      const token = getState().auth.token; // Assuming auth slice stores token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Endpoint to get user's favorites
    getMyFavourites: builder.query({
      query: () => ({
        url: 'user/myFavourites',
        method: 'GET',
      }),
    }),
    // Endpoint to add an item to favorites (example for mutation)
    addToFavourites: builder.mutation({
      query: (itemId) => ({
        url: 'user/myFavourites',
        method: 'POST',
        body: { itemId }, // Assuming the API expects an itemId in the body
      }),
    }),
    // Endpoint to remove an item from favorites (example for mutation)
    removeFromFavourites: builder.mutation({
      query: (itemId) => ({
        url: `user/myFavourites/${itemId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetMyFavouritesQuery,
  useAddToFavouritesMutation,
  useRemoveFromFavouritesMutation,
} = userApi;