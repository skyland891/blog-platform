import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Header from "./components/header";
import pages from "./pages";
import ArticlePage from "./pages/article-page";
import SignUp from "./pages/sign-up";

const { SignIn, ArticlesPage } = pages;

function App() {
  const [isLogged] = useState(false);

  return (
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
              return <SignIn isLogged={isLogged} />;
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
  );
}

export default App;
