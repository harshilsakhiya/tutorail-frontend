import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TutorialDetails from "./TutorialDetails";

export default function Tutorial() {
  const [tutorailId, setTutorailId] = useState("");
  const [tutotialData, setTutotialData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    getTutorailData();
  }, []);

  const getTutorailData = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/tutorials")
      .then((res) => {
        if (res.status === 200) {
          setTutotialData(res?.data?.tutorial);
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error(err?.message);
        setLoading(false);
      });
  };

  const removeAll = () => {
    setLoading(true)
    axios
      .delete("http://localhost:5000/api/tutorials")
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          getTutorailData();
    setLoading(false)

        }
      })
      .catch((err) => {
        toast.error(err.mesasge);
      });
  };

  const searchData = () => {
    axios
      .get(`http://localhost:5000/api/tutorials?title=${search}`)
      .then((res) => {
        if (res.status === 200) {
          setTutotialData(res?.data?.tutorial);
          setTutorailId("");
        }
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };

  return (
    <div className="mt-5 px-5">
      <div className="col-4">
        <div className="input-group">
          <input
            type="search"
            className="form-control "
            value={search}
            placeholder="Search bt title"
            aria-label="Search"
            aria-describedby="search-addon"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => searchData()}
          >
            search
          </button>
        </div>
      </div>
      <div className="mt-3 d-flex col-12 ">
        <div className="col-5">
          <h2>Tutorial List</h2>
          {loading ? (
            <h3 className="d-flex justify-content-center mt-4">Loading ... </h3>
          ) : tutotialData?.length ? (
            <div>
              {tutotialData.map((item) => (
                <div
                  className={
                    item?._id === tutorailId
                      ? "bg-primary border  m-0 p-1 text-white"
                      : " border  m-0 p-1 "
                  }
                  key={item?._id}
                >
                  <p onClick={() => setTutorailId(item._id)}>{item.title}</p>
                </div>
              ))}

              <button
                type="button"
                className="btn btn-danger mt-3"
                onClick={() => removeAll()}
                disabled={loading}
              >
                Remove All
              </button>
            </div>
          ) : (
            <h3 className="d-flex justify-content-center mt-4">
              No Data Found
            </h3>
          )}
        </div>
        {tutorailId && <TutorialDetails id={tutorailId} />}
      </div>
    </div>
  );
}
