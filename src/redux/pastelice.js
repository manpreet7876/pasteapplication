import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: (() => {
    try {
      const storedPastes = localStorage.getItem("pastes");
      return storedPastes ? JSON.parse(storedPastes) : [];
    } catch (error) {
      console.error("Error parsing pastes from localStorage:", error);
      return []; // Default to an empty array if parsing fails
    }
  })(),
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const isDuplicate = state.pastes.some(
        (paste) => paste.title === action.payload.title
      );

      if (isDuplicate) {
        toast.error("Paste with the same title already exists");
        return;
      }

      state.pastes.push(action.payload);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste created");
    },

    updateToPaste: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);
      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated");
      } else {
        toast.error("Paste not found for updating");
      }
    },

    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All pastes have been reset");
    },

    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((item) => item._id === pasteId);
      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste deleted");
      } else {
        toast.error("Paste not found for deletion");
      }
    },
  },
});

export const {
  addToPastes,
  updateToPaste,
  resetAllPastes,
  removeFromPastes,
} = pasteSlice.actions;

export default pasteSlice.reducer;
