import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import { IAuth } from '../Interfaces/IAuth';

interface UserState {
  userInfo: IAuth | null;
}

const initialUserState: UserState = {
  userInfo: JSON.parse(localStorage.getItem('userInfo') || 'null'),
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUserInfo(state, action: PayloadAction<Partial<IAuth>>) {
      if (state.userInfo) {
        state.userInfo = { ...state.userInfo, ...action.payload };
      } else {
        state.userInfo = action.payload as IAuth;
      }
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    },
    clearUserInfo(state) {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
