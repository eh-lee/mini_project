import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwt } from "../../api/jwt";
import { __getDetail } from "./detailSlice";
// 작성  /api/posts/{postId}/comments
// 수정  /api/posts/{postId}/comments/{commentId}
// 수정 /api/posts/{postId}/comments/{commentId}

//추가
export const __addComment = createAsyncThunk(
  "addComment",
  async (payload, thunkAPI) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/posts/${payload.postId}/comments`,
        payload,
        {
          headers: {
            Authorization: `${jwt}`,
          },
        }
      );
      thunkAPI.dispatch(__getDetail(payload.postId));
      return thunkAPI.fulfillWithValue(true);
    } catch (error) {
      const errorMag = error.response.data.msg;
      alert(`${errorMag}`);
    }
  }
);
//삭제
export const __deleteComment = createAsyncThunk(
  "deleteComment",
  async (payload, thunkAPI) => {
    try {
      // console.log(payload);
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/posts/${payload.postId}/comments/${payload.commentId}`,
        {
          headers: {
            Authorization: `${jwt}`,
          },
        }
      );
      thunkAPI.dispatch(__getDetail(payload.postId));
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      const errorMag = error.response.data.msg;
      // console.log(error);
      alert(`${errorMag}`);
      return thunkAPI.rejectWithValue(false);
    }
  }
);

//수정
export const __editComment = createAsyncThunk(
  "editComment",
  async (payload, thunkAPI) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/api/posts/${payload.postId}/comments/${payload.commentId}`,
        {
          content: payload.content,
        },
        {
          headers: {
            Authorization: `${jwt}`,
          },
        }
      );
      thunkAPI.dispatch(__getDetail(payload.postId));
      // return true;
      return thunkAPI.fulfillWithValue(true);
    } catch (error) {
      const errorMag = error.response.data.msg;
      // console.log(error);
      alert(`${errorMag}`);
      return thunkAPI.rejectWithValue(false);
    }
  }
);

const initialState = {
  comment: [],
  isLoading: false,
  isCommentAdd: false,
  isCommentDelete: false,
  isCommentEdit: false,
  error: null,
};

// Comment    comment

export const commentSlice = createSlice({
  name: "Comment",
  initialState,
  reducers: {},
  extraReducers: {
    // 추가
    [__addComment.pending]: (state) => {
      state.isCommentAdd = false;
      state.isLoading = false;
      state.error = null;
    },
    [__addComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isCommentAdd = action.payload;
    },
    [__addComment.rejected]: (state, action) => {
      state.isCommentAdd = action.payload;
      state.isLoading = false;
    },
    // 삭제
    [__deleteComment.pending]: (state) => {
      state.isCommentDelete = false;
      state.isLoading = false;
      state.error = null;
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isCommentDelete = action.payload;
    },
    [__deleteComment.rejected]: (state, action) => {
      state.isCommentDelete = action.payload;
      state.isLoading = false;
    },
    // 수정
    [__editComment.pending]: (state) => {
      state.isCommentEdit = false;
      state.isLoading = false;
      state.error = null;
    },
    [__editComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isCommentEdit = action.payload;
    },
    [__editComment.rejected]: (state, action) => {
      state.isCommentEdit = action.payload;
      state.isLoading = false;
    },
  },
});

export const {} = commentSlice.actions;
export default commentSlice.reducer;
