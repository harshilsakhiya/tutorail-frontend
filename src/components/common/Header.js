import React from "react";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="bg-black p-3 ">
        <div className="d-flex justify-item-center">
          <h3 className="text-white" onClick={() => navigate("/")}>bezCoder</h3>
          <h3 className="text-secondary mx-3 " onClick={() => navigate("/")}>
            Tutorials
          </h3>
          <h3 className="text-secondary mx-3" onClick={() => navigate("/add")}>
            Add
          </h3>
        </div>
      </div>
    </div>
  );
}