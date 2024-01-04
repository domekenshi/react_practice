import { createSlice } from "@reduxjs/toolkit";
import { PostsData } from "../DummyData";

export const postSlice = createSlice({
  name: "posts",
  initialState: { value: PostsData },
  reducers: {
    addPost: (state, action) => {
      state.value.push(action.payload);
    },

    deletePost: (state, action) => {
      state.value = state.value.filter((post) => post.id !== action.payload.id);
    },

    editPost: (state, action) => {
      console.log(state.value);
      state.value = state.value.find((post) => post.id === action.payload.id);
      state.value.isEditing = true;
    },
    savePost: (state, action) => {
      state.value = state.value.find((post) => post.id === action.payload.id);
      state.value.isEditing = false;
    },
  },
});

export const { addPost, deletePost, editPost, savePost } = postSlice.actions;
export default postSlice.reducer;
