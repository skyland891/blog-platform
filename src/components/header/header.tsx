import React, { memo } from "react";
import { Link } from "react-router-dom";
import style from "./header.module.scss";

const Header = memo(() => {
  return (
    <header className={style.header}>
      <Link to={"/"} className={style.title}>
        Realworld Blog
      </Link>
      <div>
        <Link to={"/login"} className={style["signin-button"]}>
          Sign In
        </Link>
        <Link to={"/sign-up"} className={style["signup-button"]}>
          Sign Up
        </Link>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
