import React, { useState, useEffect } from "react";
import { useTopic } from "@src/core/hook";
import "./index.scss";

function Home() {
  const [code, useCode] = useState<number>(0);
  const { getTopics } = useTopic();

  useEffect(() => {
    getTopics({});
  }, [getTopics]);

  return (
    <h1 className="home-title">
      Home{code}{" "}
      <button
        onClick={() => {
          useCode(code + 1);
        }}
      >
        +
      </button>
    </h1>
  );
}

export default Home;
