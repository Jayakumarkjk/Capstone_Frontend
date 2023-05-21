import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    folderName: "",
    version: "",
  });
  useEffect(() => {
    const getAllData = async () => {
      const res = await axios.get(
        `https://capstone-backend-4nxt.onrender.com/api/v1/users/single/${id}`
      );
      setInput(res.data);
    };
    getAllData();
  }, [id]);



  const handleEditData = async (e) => {
    e.preventDefault();
    await axios.put(`https://capstone-backend-4nxt.onrender.com/api/v1/users/${id}`, input);
    navigate("/home");
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 ">
            <div style={{ backgroundColor: "blue" }}>
              <h1 className="text-white text-center mt-2">Update</h1>
            </div>
          </div>
          <div className="col-md-12">
            <form onSubmit={handleEditData}>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Folder Name
                </label>
                <input
                  type="text"
                  name="folderName"
                  value={input.folderName}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Version
                </label>
                <input
                  name="version"
                  value={input.version}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  type="text"
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              

              <button type="submit" class="btn btn-primary">
                update
              </button>
            </form>
          </div>
        </div>
        <button onClick={() => navigate("/home")} className="btn btn-info mt-2">
          Go To Home
        </button>
      </div>
    </>
  );
};

export default Edit;