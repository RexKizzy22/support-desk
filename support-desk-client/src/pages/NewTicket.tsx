import { FormEvent, useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/useStore";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { createTicket, reset } from "../state/slices/ticketSlice";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";

const NewTicket = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { isError, isSuccess, isLoading, message } = useAppSelector(
    (state) => state.ticket
  );

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate("/tickets");
    }

    dispatch(reset());
  }, [isError, isSuccess, message]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createTicket({ product, description }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Create new ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input
            id="name"
            type="text"
            className="form-control"
            value={name}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input
            id="email"
            type="email"
            className="form-control"
            value={email}
            disabled
          />
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="iPhone">iPhone</option>
              <option value="Macbook Pro">Macbook Pro</option>
              <option value="iMac">iMac</option>
              <option value="iPad">iPad</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <textarea
              id="description"
              name="description"
              value={description}
              placeholder="Description"
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewTicket;
