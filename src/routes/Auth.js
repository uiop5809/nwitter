import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { authService } from "fbase";
import React, { useState } from "react";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { type, value } = e.target;
    if (type === "email") {
      setEmail(value);
    } else if (type === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      if (newAccount) {
        const data = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(data);
      } else {
        const data = await signInWithEmailAndPassword(auth, email, password);
        console.log(data);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (e) => {
    const { name } = e.target;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
      console.log(provider);
    } else if (name === "github") {
      provider = new GithubAuthProvider();
      console.log(provider);
    }
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={handleChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Login"} />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Login" : "Create Account"}
      </span>
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
    </div>
  );
}
