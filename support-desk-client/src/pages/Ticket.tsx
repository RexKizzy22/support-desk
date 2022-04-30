import { FormEvent, useEffect, useState } from "react";
import Modal, { Styles } from "react-modal";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import { getTicket, closeTicket } from "../state/slices/ticketSlice";
import {
  getNotes,
  reset as notesReset,
  Note,
  createNote,
} from "../state/slices/noteSlice";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import NoteItem from "../components/NoteItem";

const CustomStyles: Styles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50",
    transform: "translate(-50, -50)",
    position: "relative",
  },
};

Modal.setAppElement("#root");

const Ticket = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // State
  const { isError, message, isLoading, ticket } = useAppSelector(
    (state) => state.ticket
  );  
  const { notes, isLoading: notesIsLoading } = useAppSelector(
    (state) => state.note
  );
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  // Side Effect
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
    dispatch(notesReset());
  }, [isError, message, ticketId]);

  const onTicketClosed = () => {
    dispatch(closeTicket(ticketId));
    toast.success("Ticket Closed");
    navigate("/tickets");
  };

  const onNoteSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createNote({ noteText, ticketId }));
    closeModal();
  };

  // open/close modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Data Submitted: 
          {new Date(ticket.createdAt as string).toLocaleString("en-UK")}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of the issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
        <button className="btn" onClick={openModal}>
          Add Note
        </button>
      </header>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={CustomStyles}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <button className="btn btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="nameText"
              id="nameText"
              className="form-control"
              placeholder="Note Text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {ticket.status !== "closed" && (
        <button onClick={onTicketClosed} className="btn btn-block btn-danger">
          Close Ticket
        </button>
      )}

      {notes.map((note: Note) => (
        <NoteItem key={note._id} note={note} />
      ))}
    </div>
  );
};

export default Ticket;
