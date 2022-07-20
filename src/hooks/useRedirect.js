import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post(`/dj-rest-auth/token/refresh/`);
        if (userAuthStatus === "loggedIn") {
          history.push("/");
        }
      } catch (error) {
        if (userAuthStatus === "loggedOut") {
          history.push("/");
        }
      }
    };
    handleMount();
  }, [history, userAuthStatus]);
};
