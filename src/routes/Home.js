import { dbService } from "fbase.js";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";

export default function Home() {
  const [nweet, setNweet] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "nweets"), {
        nweet,
        createdAt: Date.now(),
      });
      setNweet("");
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnChange = (e) => {
    const { value } = e.target;
    setNweet(value);
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          value={nweet}
          onChange={handleOnChange}
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
    </div>
  );
}
