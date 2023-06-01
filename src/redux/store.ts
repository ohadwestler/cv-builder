// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './messagesSlice';
import formReducer from './cvFormSlice'
import cvReducer from './cvsHistorySlice'

const store = configureStore({
  reducer: {
    messages: messagesReducer,
    form: formReducer,
    cvs: cvReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
