import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from "../services/ticketService";

type Status = "new" | "open" | "closed";

interface Ticket {
  _id?: string;
  product: string;
  description: string;
  status: Status;
  createdAt?: string;
}

interface TicketState {
  tickets: Ticket[];
  ticket: Ticket;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: TicketState = {
  tickets: [],
  ticket: { product: "", description: "", status: "new" },
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

// Create new ticket
export const createTicket = createAsyncThunk<any, any, { state: any }>(
  "ticket/create",
  async (ticket: Ticket, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user.token;
      return await ticketService.createTicket(ticket, token);
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

// Get all tickets
export const getTickets = createAsyncThunk<any, any, { state: any }>(
  "tickets/all",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user.token;
      return await ticketService.getTickets(token);
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

// Get a ticket
export const getTicket = createAsyncThunk<any, any, { state: any }>(
  "tickets/get",
  async (ticketId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user.token;
      return await ticketService.getTicket(ticketId, token);
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

// Get a ticket
export const closeTicket = createAsyncThunk<any, any, { state: any }>(
  "tickets/close",
  async (ticketId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user.token;
      return await ticketService.closeTicket(ticketId, token);
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

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    reset: (_) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.ticket = action.payload;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.tickets = action.payload;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.ticket = action.payload;
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.tickets.map((ticket) =>
          ticket._id === action.payload.id ? (ticket.status = "closed") : ticket
        );
      });
  },
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
