import React, { useReducer } from "react";

export const LoaderStateContext = React.createContext();
export const LoaderDispatchContext = React.createContext();

function loaderReducer(state, action) {
  switch (action.type) {
    case "LOADING": {
      return { ...state, isLoading: true };
    }
    case "LOADING_OFF": {
      return { ...state, isLoading: false };
    }
    default: {
      throw new Error("Invalid action type");
    }
  }
}

export const LoaderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(loaderReducer, { isLoading: false });
  console.log(dispatch);
  return (
    <LoaderStateContext.Provider value={state}>
      <LoaderDispatchContext.Provider value={dispatch}>
        {children}
      </LoaderDispatchContext.Provider>
    </LoaderStateContext.Provider>
  );
};
