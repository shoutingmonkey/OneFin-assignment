import React from "react";
import _ from "lodash";
import "./Header.css";

function Header(props) {
  const { setMoviesInput, handleLogout } = props;

  return (
    <div className="header">
      <div className="header__center">
        <input
          type="text"
          placeholder="Search for movies"
          onChange={_.debounce((e) => setMoviesInput(e.target.value), 250)}
        />
      </div>
      <div className="header__right">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Header;
