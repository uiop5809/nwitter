import React, { useState } from "react";

export default function Home() {
  const [nweet, setNweet] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };
  const handleOnChange = (e) => {
    const { value } = e.target;
    setNweet(value);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          value={nweet}
          onChange={handleOnChange}
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" onSubmit={handleOnSubmit} />
      </form>
    </div>
  );
}
