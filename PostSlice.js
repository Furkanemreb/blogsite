import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [  
  ],
};

export const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    deletePost:(state,action) => {
        state.posts = state.posts.filter((item) => item.id !== action.payload)
    },
    updatePost:(state,action) => {
      state.posts = state.posts.map((item) => {
        if(item.id === action.payload.id){
          return {...item, ...action.payload}
        }
        return item;
      });

    }
  },
});

export const { addPost, deletePost, updatePost } = PostSlice.actions;

export default PostSlice.reducer;
