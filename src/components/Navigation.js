import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">my profile</Link>
      </li>
    </ul>
  </nav>
);
