import { Link } from "react-router-dom";

const TicketItem = ({ ticket }: { ticket: any }) => {
  return (
    <>
      <div className="ticket">
        <div>{new Date(ticket.createdAt).toLocaleString("en-UK")}</div>
        <div>{ticket.product}</div>
        <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      </div>
      <Link
        to={`/ticket/${ticket._id}`}
        className="btn btn-sm btn-reverse"
      >View</Link>
    </>
  );
};

export default TicketItem;
