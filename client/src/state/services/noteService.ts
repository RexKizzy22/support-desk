import axios from "axios";

const URL = "http://localhost:4005/api/tickets";

// Create new note
const createNote = async (
  noteText: string,
  ticketId: string,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${URL}/${ticketId}/notes`,
    { text: noteText },
    config
  );
  return response.data;
};

// Get all notes for a ticket
const getNotes = async (ticketId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${URL}/${ticketId}/notes`, config);
  return response.data;
};

const noteService = {
  createNote,
  getNotes,
};

export default noteService;
