import React, { memo, useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../../context";
import { IUser } from "../../types/types";
import style from "./header.module.scss";
import avatarPlaceholder from "../../assets/img/avatar_placeholder.svg";

const unlogged = () => {
  return (
    <div>
      <Link to={"/login"} className={style["signin-button"]}>
        Sign In
      </Link>
      <Link to={"/sign-up"} className={style["signup-button"]}>
        Sign Up
      </Link>
    </div>
  );
};

const logged = (loggedUser: IUser, setUser: (user: IUser | null) => void) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 25,
      }}
    >
      <Link className={style["create-button"]} to={"/new-article"}>
        Create article
      </Link>
      <Link to={"/profile"}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span className={style.username}>
            {loggedUser && loggedUser.username}
          </span>
          <img
            width={46}
            height={46}
            src={
              loggedUser !== null && loggedUser.image
                ? loggedUser.image
                : avatarPlaceholder
            }
          ></img>
        </div>
      </Link>
      <Link
        onClick={() => {
          setUser(null);
        }}
        className={style["logout-button"]}
        to={"/"}
      >
        Log Out
      </Link>
    </div>
  );
};

const Header = memo(() => {
  const { user, setUser } = useContext(Context);
  return (
    <header className={style.header}>
      <Link to={"/"} className={style.title}>
        Realworld Blog
      </Link>
      {user !== null ? logged(user, setUser) : unlogged()}
    </header>
  );
});

Header.displayName = "Header";

export default Header;
