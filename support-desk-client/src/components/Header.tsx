import { FaSignOutAlt, FaSignInAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../state/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/">Support desk</Link>
        </div>
        <ul>
          {user ? (
            <li>
              <button onClick={onLogout} className="btn">
                <FaSignOutAlt /> Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/register">
                  <FaUser /> Register
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <FaSignInAlt /> Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </>
  );
};

export default Header;
