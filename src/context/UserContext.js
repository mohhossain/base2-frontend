import React, { createContext, useState, useEffect } from "react";
// import { Router, Route, Switch } from "react-router-dom";
import axios from "axios";

export const UserContext = createContext({});

const useFetchUser = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  //   const token = localStorage.getItem("token");
  console.log(token);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:3000/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(data.user);
        setUser(data.user);
      } catch (error) {
        console.error(error);
      }
    };
    {
      token && fetchUser();
    }
  }, []);

  return [user, setUser];
};

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useFetchUser();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// export { UserContext, UserContextProvider };
