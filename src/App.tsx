import React, { Suspense, lazy, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { setTheme, IThemeName } from "./core/theme";
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));

function App() {
  const [currentTheme, setCurrentTheme] = useState<IThemeName>("theme01");
  return (
    <div>
      <select
        value={currentTheme}
        onChange={(e) => {
          const value = e.target.value as IThemeName;
          setCurrentTheme(value);
          setTheme(value);
        }}
      >
        <option value="theme01">theme01</option>
        <option value="theme02">theme02</option>
        <option value="theme03">theme03</option>
      </select>
      <h1>App</h1>
      <ul>
        <li>
          <Link to="/home">home</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
      </ul>
      <Suspense fallback={<div>loading</div>}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
