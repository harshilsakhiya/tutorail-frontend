import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function TutorialDetails({ id }) {
  const navigate = useNavigate();
  const [tutotialData, setTutotialData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/tutorials/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setTutotialData(res?.data?.tutorial[0]);
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  }, [id]);

  return (
    <div>
      {loading ? (
        <h3 className="d-flex justify-content-center mt-4">Loading ... </h3>
      ) : (
        <div className="ms-5">
          <h2>Tutorial </h2>
          <div>
            <div className="d-flex">
              <h5>Title:</h5>
              <span className="ms-2">{tutotialData.title}</span>
            </div>
            <div className="d-flex">
              <h3>Description:</h3>
              <span className="ms-2">{tutotialData.description}</span>
            </div>
            <div className="d-flex">
              <h3>Status:</h3>
              <span className="ms-2">{tutotialData.status}</span>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-warning mt-3"
            onClick={() => navigate(`/add/${id}`)}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
