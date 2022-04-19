import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import Input from "../components/Form/Input";
import { useAppSelector, useAppDispatch } from "../hooks/useStore";
import { register, reset } from "../state/auth/authSlice";
import Spinner from "../components/Spinner";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isSuccess, isError, message } = useAppSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    } 
    // Redirect when logged in
    if (isSuccess || user) {
      navigate("/");
    } 

    dispatch(reset());

  }, [isError, isSuccess, user, message]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords did not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  } 

  return (
    <>
      <section className="header">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <Input type="text" title="name" onChange={onChange} value={name} />
          <Input type="text" title="email" onChange={onChange} value={email} />
          <Input
            type="text"
            title="password"
            onChange={onChange}
            value={password}
          />
          <Input
            type="text"
            title="confirmPassword"
            onChange={onChange}
            value={confirmPassword}
          />
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
