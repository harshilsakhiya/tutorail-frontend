import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Create() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [inputValue, setInputValue] = useState({});
  const [errors, setErrors] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/tutorials/${id}`)
        .then((res) => {
          if (res.status === 200) {
            setInputValue({
              title: res?.data?.tutorial[0].title,
              description: res?.data?.tutorial[0].description,
            });
            setStatus(res?.data?.tutorial[0].status);
          }
        })
        .catch((err) => {
          toast.error(err?.message);
        });
    }
    return;
  }, [id]);

  const handleOnChnage = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    if (e.target.name.trim()) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};
    if (inputValue && !inputValue.description) {
      formIsValid = false;
      errors["description"] = "*Please enter description!";
    }

    if (inputValue && !inputValue.title) {
      formIsValid = false;
      errors["title"] = "*Please enter title!";
    }
    setErrors(errors);
    return formIsValid;
  };

  const tutorailCreate = () => {
    setLoading(true);
    const body = {
      title: inputValue.title,
      description: inputValue.description,
      status: "pending",
    };
    if (validateForm()) {
      axios
        .post(`http://localhost:5000/api/tutorials`, body)
        .then((res) => {
          if (res.status === 200) {
            toast.success("tutorail create succesfully");
            navigate("/");
            setLoading(false);
          }
        })
        .catch((err) => {
          toast.error(err?.message);
        });
    }
  };

  const updateTuiorail = () => {
    setLoading(true);

    const body = {
      title: inputValue.title,
      description: inputValue.description,
      status: status,
    };
    if (validateForm()) {
      axios
        .put(`http://localhost:5000/api/tutorials/${id}`, body)
        .then((res) => {
          if (res.status === 200) {
            toast.success("tutorail update succesfully");
            navigate("/");
            setLoading(false);
          }
        })
        .catch((err) => {
          toast.error(err?.message);
        });
    }
  };

  const tutorialDelete = () => {
    setLoading(true);

    axios
      .delete(`http://localhost:5000/api/tutorials/${id}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success("tutorail all delete succesfully");
          navigate("/");
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };
  return (
    <div>
      <div className="mt-5 w-100 d-flex justify-content-center align-items-center ">
        <div className="col-5">
          <div className="mb-3">
            <label>Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Enter Title"
              value={inputValue.title}
              onChange={(e) => handleOnChnage(e)}
            />
            <span className="text-danger"> {errors["title"]}</span>
          </div>
          <div className="mb-3">
            <label>Description</label>
            <input
              type="text"
              name="description"
              className="form-control"
              value={inputValue.description}
              placeholder="Enter Description"
              onChange={(e) => handleOnChnage(e)}
            />
            <span className="text-danger"> {errors["description"]}</span>
          </div>
          {id && (
            <div>
              <div className="d-flex">
                <h5>Status:</h5>
                <span className="ms-2">{status}</span>
              </div>
              <div className="d-flex">
                <button
                  className="btn btn-primary text-center m-2"
                  onClick={() =>
                    setStatus(
                      status.toLocaleLowerCase() === "pending"
                        ? "Publish"
                        : "pending"
                    )
                  }
                >
                  {status.toLocaleLowerCase() === "pending"
                    ? "Publish"
                    : "UnPublish"}
                </button>
                <button
                  className="btn btn-danger text-center m-2"
                  onClick={() => tutorialDelete()}
                  disabled={loading}
                >
                  Delete
                </button>
                <button
                  disabled={loading}
                  className="btn btn-success text-center m-2"
                  onClick={() => updateTuiorail()}
                >
                  {loading ? "loading" : "Update"}
                </button>
              </div>
            </div>
          )}
          {!id && (
            <div>
              <button
                disabled={loading}
                className="btn btn-success text-center"
                onClick={() => tutorailCreate()}
              >
                {loading ? "loading" : "Submit"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
