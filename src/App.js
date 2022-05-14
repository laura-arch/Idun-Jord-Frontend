import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Nav from "./components/Nav.js";
import Home from "./components/Home.js";
import Plant from "./components/Plant.js";
import CreatePlant from "./components/Create.js";
import UpdatePlant from "./components/Update.js";

function App() {
  return (
    <div
      style={{
        min_height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "lightgreen",
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Nav />}>
            <Route index element={<Home />} />
            <Route path="/:plantName" element={<Plant />} />
            <Route path="/new" element={<CreatePlant />} />
            <Route path="/:plantName/update" element={<UpdatePlant />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
