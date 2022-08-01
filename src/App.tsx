import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Header from "./components/header";
import pages from "./pages";
import Context from "./context";
import { IUser } from "./types/types";
import { useLocalStorage } from "./hooks/useLocalStorage";

const { Provider } = Context;
const { SignIn, ArticlesPage, ArticlePage, SignUp } = pages;

function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const [savedUser, saveUser] = useLocalStorage("user", user);

  useEffect(() => {
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  useEffect(() => {
    console.log(savedUser, saveUser);
    saveUser(user);
  }, [user]);

  return (
    <Provider
      value={{
        user: user || savedUser,
        setUser,
      }}
    >
      <div>
        <Router>
          <Header />
          <Switch>
            <Route
              path={"/"}
              render={() => {
                return <ArticlesPage />;
              }}
              exact
            />
            <Route
              path={"/articles"}
              render={() => {
                return <ArticlesPage />;
              }}
              exact
            />
            <Route
              path={"/articles/:slug"}
              render={({ match }) => {
                const { slug } = match.params;
                return <ArticlePage slug={slug} />;
              }}
            />
            <Route
              path={"/login"}
              render={() => {
                return <SignIn />;
              }}
            />
            <Route
              path={"/sign-up"}
              render={() => {
                return <SignUp />;
              }}
            />
            <Redirect to={"/"} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
