import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import Input from "../components/Form/Input";
import Spinner from "../components/Spinner";
import { useAppSelector, useAppDispatch } from "../hooks/useStore";
import { login, reset } from "../state/auth/authSlice";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isSuccess, isError, message } = useAppSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const { email, password } = formData;

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

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="header">
        <h1>
          <FaUser /> Login
        </h1>
        <p>Please login to get support</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <Input 
            type="text" 
            title="email" 
            onChange={onChange} 
            value={email} 
          />

          <Input
            type="text"
            title="password"
            onChange={onChange}
            value={password}
          />
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
