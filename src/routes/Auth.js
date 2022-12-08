import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import React, { useState } from "react";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

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
      console.log(error);
    }
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
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
}
