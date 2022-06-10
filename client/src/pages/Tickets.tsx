import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import { getTickets, reset } from "../state/slices/ticketSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import TicketItem from "../components/TicketItem";
import BackButton from "../components/BackButton";

const Tickets = () => {
  const dispatch = useAppDispatch();
  const { tickets, isLoading, isSuccess, isError, message } = useAppSelector(
    (state) => state.ticket
  );
  const {
    user: { token },
  } = useAppSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [isSuccess]);

  useEffect(() => {
    dispatch(getTickets(token));

    if (isError) {
      toast.error(message);
    }
  }, [getTickets, token]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url="/" />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-header">
          <div className="ticket">
            <div>Date</div>
            <div>Product</div>
            <div>Status</div>
            <div></div>
          </div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  );
};

export default Tickets;
