import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/common/Layout";
import Tutorial from "../components/Tutorial/Tutorial";
import Create from "../components/Tutorial/Create";

export default function index() {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Tutorial />} />
          <Route path="/add" element={<Create />} />
          <Route path="/add/:id" element={<Create />} />


        </Route>
      </Routes>
    </div>
  );
}
