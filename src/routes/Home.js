import { dbService } from "fbase.js";
import {
  query,
  addDoc,
  collection,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";

export default function Home({ userObj }) {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const nweetArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "nweets"), {
        text: nweet,
        createdAt: Date.now(),
        createrId: userObj.uid,
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
            <h4> {nweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
