import React, { createContext, useReducer } from "react";
import starships from "./reducers/starships";
import starshipsInitialState from "./intialstates/starshipsInitialState";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const [starshipsState, starshipsDispatch] = useReducer(
    starships,
    starshipsInitialState
  );

  return (
    <GlobalContext.Provider
      value={{
        starshipsState,
        starshipsDispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
