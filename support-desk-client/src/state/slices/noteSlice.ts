import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "../services/noteService";

export interface Note {
    _id: string,
    user?: string,
    ticket?: string,
    text?: string,
    isStaff?: boolean,
    staffId: string,
    createdAt?: string,
    updatedAt?: string
}

interface NoteState {
    notes: Note[],
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: string
}

const initialState: NoteState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createNote = createAsyncThunk<any, any, { state: any }>(
  "note/create",
  async ({ noteText, ticketId}, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user.token;
      return await noteService.createNote(noteText, ticketId, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return rejectWithValue(message);
    }
  }
);

// Get all notes
export const getNotes = createAsyncThunk<any, any, { state: any }>(
  "notes/all",
  async (ticketId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user.token;
      return await noteService.getNotes(ticketId, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return rejectWithValue(message);
    }
  }
);

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    reset: (_) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.notes.push(action.payload);
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
