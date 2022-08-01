import React from "react";
import { IUser } from "./types/types";

interface IContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

const Context = React.createContext<IContext>({
  user: null,
  setUser: () => {},
});

export default Context;
