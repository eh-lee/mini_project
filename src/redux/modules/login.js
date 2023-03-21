import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis } from "../../shared/axios";
import { cookies } from "../../shared/cookie";
import { atom } from "recoil";

const initialState = [
    {
    },
]

//===recoil token state atom 추가===
// export const tokenState = atom({
//     key: "tokenState",
//     default: null,
// })
//================================

export const __signUp = createAsyncThunk(
    "signUp",
    async (newUser, thunk) => {
        try {
            await apis.post("/api/signup", newUser);
            alert(`${newUser.nickname} 님 회원가입에 성공하였습니다.`);
            return thunk.fulfillWithValue(newUser);
        } catch (e) {
            const errorMsg = e.response.data.msg;
            console.log(errorMsg);
            alert(`${errorMsg}`);
            return thunk.rejectWithValue(e);
        }
    }
)

export const __login = createAsyncThunk(
    "logIn",
    async (thisUser, thunk) => {
        try {
            const response = await apis.post("api/login", thisUser);
            cookies.set("token", response.headers.authorization, { path: "/" });
            return thunk.fulfillWithValue(thisUser)
        } catch (e) {
            console.log(e);
            const errorMsg = e.response.data.msg;
            console.log(errorMsg);
            alert(`${errorMsg}`);
            return thunk.rejectWithValue(e)
        }
    }
)


const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
})

export default loginSlice.reducer;