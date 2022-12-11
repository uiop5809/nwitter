import { dbService } from "fbase.js";
import { addDoc, getDocs, collection } from "firebase/firestore";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  const getNweets = async () => {
    const dbNweets = await getDocs(collection(dbService, "nweets"));
    dbNweets.forEach((document) => {
      const nweetObject = {
        ...document.data(),
        id: document.id,
      };
      setNweets((prev) => [nweetObject, ...prev]);
    });
  };

  useEffect(() => {
    getNweets();
  }, []);

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
      <div>
        {nweets.map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.nweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
