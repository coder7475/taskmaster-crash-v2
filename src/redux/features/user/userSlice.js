import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../../utils/firebase.config";

const initialState = {
  name: "",
  email: "",
  isLoading: true,
  isError: false,
  error: "",
};
// created a async thunk middleware for redux 
export const createUser = createAsyncThunk(
  "userSlice/createUser",
  async ({ email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);

    console.log(data);

    return {
      email: data.email,
      name: data.name
    };
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.email = "";
      state.error = "";
    });
    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.email = payload.email;
      state.name = payload.name;
      state.error = "";
    });
    builder.addCase(createUser.rejected,(state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.email = "";
      state.name = "";
      state.error = action.error.message;
    } )
  }
});

export default userSlice.reducer;
