import { useEffect, useState } from "react";
import { useAppSelector } from "./useStore";

const useAuthStatus = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);

    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {        
        if (!!user) {
            setIsLoggedIn(true);            
        } else {
            setIsLoggedIn(false);
        }

        setCheckingStatus(false);
    }, [user]);

  return { isLoggedIn, checkingStatus };
};

export default useAuthStatus;
