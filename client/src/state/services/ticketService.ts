import axios from "axios";

const URL = "http://localhost:4005/api/tickets";

// Create new ticket
const createTicket = async (data: any, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(URL, data, config);
  return response.data;
};

// Get all tickets created by current user
const getTickets = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(URL, config);
  return response.data;
};

// Get a ticket created by current user
const getTicket = async (ticketId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${URL}/${ticketId}`, config);
  return response.data;
};

// Close a ticket created by current user whose status is open
const closeTicket = async (ticketId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${URL}/${ticketId}`,
    { status: "closed" },
    config
  );
  return response.data;
};

const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  closeTicket,
};

export default ticketService;
