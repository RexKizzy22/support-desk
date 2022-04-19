import { Navigate, Outlet } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

const PrivatePage = () => {
    const { isLoggedIn, checkingStatus } = useAuthStatus();

    if (checkingStatus) {
        <Spinner />
    }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivatePage;
