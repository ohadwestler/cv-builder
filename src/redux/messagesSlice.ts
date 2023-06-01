import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";

interface Message {
  message: string;
  timestamp: string;
  photoURL?: string;
  displayName?: string;
  role: "system" | "assistant" | "user";
}

interface AddMessagePayload {
  message: Message;
  shouldAddImmediately: boolean;
}

interface MessagesState {
  messages: Message[];
  codeBlocks: string[];
  loading: boolean;
}

const initialState: MessagesState = {
  messages: [
    {
      message:
        "Based on your CV details, I have some questions that would help me to provide you the best CV possible...",
      timestamp: "",
      photoURL: "",
      displayName: "CVGenius",
      role: "assistant",
    },
  ],
  codeBlocks: [],
  loading: false,
};
let cvDetails = ""
export const addMessage = createAsyncThunk(
  "messages/addMessage",
  async (payload: AddMessagePayload, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { personalDetails } = state.form;

    if (payload.message.role === "user") {
      // If the message is from the user, add it to the state immediately
      dispatch(addImmediateMessage(payload.message));
    }

    const { messages } = state.messages;
    const allMessagesAndPrompts = messages.map((message) => {
      return {
        role: message.role,
        content: message.message,
      };
    });

    
    const nonEmptyFields = Object.fromEntries(
      Object.entries(personalDetails).filter(([_, value]) => value !== "")
    );
    for (const [key, value] of Object.entries(nonEmptyFields)) {
      cvDetails += `${key}: ${value}\n`;
    }
    cvDetails !== "" &&
      allMessagesAndPrompts.unshift({
        content: `Here are the user's CV details: ${cvDetails}`,
        role: "system",
      });

    const doneMessage =
      "I have generated your CV.\nwhen you are ready to see your CV just click the done button below.";
      allMessagesAndPrompts.push(
        {content : payload.message.message, role: payload.message.role}
      );
    if (allMessagesAndPrompts.length <= 8) {
      const response = await axios.post("/api/openai", allMessagesAndPrompts, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const codeBlockRegex = /```(?:json)?\n([\s\S]*?)```/g;
      let match;
      let codeBlocks = [];

      while ((match = codeBlockRegex.exec(response.data)) !== null) {
        codeBlocks.push(match[1].trim());
      }

      if (codeBlocks.length) {
        await axios.post("/api/cv", { codeBlocks });
        return { message: doneMessage, codeBlocks };
      }

      return { message: response.data, codeBlocks: [] };
    }
    return { message: doneMessage, codeBlocks: [] };
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addImmediateMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addMessage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addMessage.fulfilled, (state, action) => {
      state.loading = false;
      state.messages.push({
        message: action.payload.message,
        timestamp: "",
        photoURL: "",
        displayName: "CVGenius",
        role: "assistant"
      });
      state.codeBlocks = action.payload.codeBlocks;
    });
    builder.addCase(addMessage.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { addImmediateMessage } = messagesSlice.actions;

export default messagesSlice.reducer;