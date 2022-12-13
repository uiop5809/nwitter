import { dbService } from "fbase.js";
import {
  query,
  addDoc,
  collection,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import Nweet from "./../components/Nweet";

export default function Home({ userObj }) {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [photo, setphoto] = useState();

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
  const handleOnFileChange = (e) => {
    const { files } = e.target;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      setphoto(finishedEvent.currentTarget.result);
    };
    reader.readAsDataURL(theFile);
  };
  const handleOnClearPhotoClick = () => setphoto(null);

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
        <input type="file" accept="image/*" onChange={handleOnFileChange} />
        <input type="submit" value="작성" />
        {photo && (
          <>
            <img src={photo} width="50px" height="50px" />
            <button onClick={handleOnClearPhotoClick}>Clear</button>
          </>
        )}
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.createrId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
}
