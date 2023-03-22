import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwt } from "../../api/jwt";

//조회
export const __getDetail = createAsyncThunk(
  "getDetail",
  async (postId, thunkAPI) => {
    // console.log(postId);
    console.log(postId);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/posts/${postId}`,
        {
          headers: {
            Authorization: `${jwt}`,
          },
        }
        // `${process.env.REACT_APP_SERVER_KEY}/detail/${postId}`
      );
      // console.log(response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//삭제
export const __deleteDetail = createAsyncThunk(
  "deleteDetail",
  async (postId, thunkAPI) => {
    try {
      // console.log(postId);
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/posts/${postId}`,
        {
          headers: {
            Authorization: `${jwt}`,
          },
        }
      );
      thunkAPI.dispatch(__getDetail(postId));
      return thunkAPI.fulfillWithValue(true);
    } catch (error) {
      const errorMag = error.response.data.msg;
      // console.log(error);
      alert(`${errorMag}`);
      return thunkAPI.rejectWithValue(false);
    }
  }
);

//수정
export const __editDetail = createAsyncThunk(
  "editComment",
  async (payload, thunkAPI) => {
    console.log(payload);
    console.log(payload.postId);
    console.log(payload.title);
    try {
      await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/api/posts/${payload.postId}`,
        {
          title: payload.title,
          content: payload.content,
          classNumber: payload.classNumber,
          specialty: payload.specialty,
        },
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
      return thunkAPI.rejectWithValue(false);
    }
  }
);

// Detail    detail

const initialState = {
  detail: [],
  isLoading: false,
  isDelete: false,
  // isEdit: false,
  error: null,
};

export const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {},
  extraReducers: {
    // 조회
    [__getDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [__getDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.detail = action.payload;
    },
    [__getDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //삭제
    [__deleteDetail.pending]: (state) => {
      state.isDelete = false;
      state.isLoading = false;
      state.error = null;
    },
    [__deleteDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isDelete = action.payload;
      // console.log(action.payload);
    },
    [__deleteDetail.rejected]: (state, action) => {
      state.isDelete = action.payload;
      state.isLoading = false;
      // state.error = true;
    },
    // 수정
    [__editDetail.pending]: (state) => {
      state.isEdit = false;
      state.isLoading = false;
      state.error = null;
    },
    [__editDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isEdit = action.payload;
      // console.log(action.payload);
    },
    [__editDetail.rejected]: (state, action) => {
      state.isEdit = action.payload;
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {} = detailSlice.actions;
export default detailSlice.reducer;
