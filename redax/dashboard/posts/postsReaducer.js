import { createSlice } from "@reduxjs/toolkit";

// const commentState = {
//   postId: null,
//   name: null,
//   id: null,
//   email: null,
//   body: null
// };

const initialState = {
  posts: [],
  comments: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, { payload }) => ({
      ...state,
      posts: payload,
    }),
    addCommits: (state, { payload }) => ({
      ...state,
      comments: payload,
    }),

    addCommitsPost: (state, { payload }) => {
      // const existingPost = state.find((post) => post.id === payload[0].postId);
      // if (existingPost) {
      //   existingPost.comments = payload;
      // }
    },
  },
});
