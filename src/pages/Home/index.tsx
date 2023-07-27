import React, { useState } from "react";

function About() {
  const [code, useCode] = useState<number>(0);
  return (
    <h1 className="home">
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

export default About;
