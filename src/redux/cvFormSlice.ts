import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";

export type PersonalDetails = {
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
};

export type FormData = {
  personalDetails: PersonalDetails;
  professionalBackground: string;
  highestEducation: string;
  certifications: string;
  achievements: string;
  languages: string;
  interests: string;
};

const initialState: FormData = {
  personalDetails: {
    firstName: "",
    lastName: "",
    email: "",
    linkedin: "",
  },
  professionalBackground: "",
  highestEducation: "",
  certifications: "",
  achievements: "",
  languages: "",
  interests: "",
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ field: keyof PersonalDetails; value: string }>
    ) => {
      return produce(state, (draftState) => {
        draftState.personalDetails[action.payload.field] = action.payload.value;
      });
    },
  },
});
  
  export const { updateField } = formSlice.actions;
  
  export default formSlice.reducer;