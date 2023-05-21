import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Upload = () => {
  const [users, setUsers] = useState([]);
  const [render, setRender] = useState(false);
  const [inputs, setInputs] = useState({
    folderName: "",
    version: "",
  });
  const [profile, setProfile] = useState();
  useEffect(() => {
    const getAllUsers = async () => {
      const getAllData = await axios.get("https://capstone-backend-4nxt.onrender.com/api/v1/users");
      setUsers(getAllData.data);
    };
    getAllUsers();
  }, [render]);

  const formdata = new FormData();
  formdata.append("folderName", inputs.folderName);
  formdata.append("version", inputs.version);
  formdata.append("profile", profile);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://capstone-backend-4nxt.onrender.com/api/v1/users", formdata);
      setRender(true);
      setInputs({
        folderName: "",
        version: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  
  

  const handelDelete = async (id) => {
    await axios.delete(`https://capstone-backend-4nxt.onrender.com/api/v1/users/${id}`);
    const newUsers = users.filter((item) => {
      return item._id !== id;
    });
    setUsers(newUsers);
  };



  return (
    <div className="container">
      
      <div className="row"  >
        </div>
        <div className="col-md-6">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Folder Name
              </label>
              <input
                type="text"
                value={inputs.folderName}
                onChange={(e) =>
                  setInputs({ ...inputs, [e.target.name]: e.target.value })
                }
                name="folderName"
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
                type="text"
                value={inputs.version}
                onChange={(e) =>
                  setInputs({ ...inputs, [e.target.name]: e.target.value })
                }
                name="version"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Profile
              </label>
              <input
                type="file"
                onChange={(e) => setProfile(e.target.files[0])}
                name="profile"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>

            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Folder Name</th>
                <th scope="col">Version</th>
                <th scope="col">Profile</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => {
                  return (
                    <tr>
                      <td>{user.folderName}</td>
                      <td>{user.version}</td>
                      <td>
                        <img
                          className="img img-fluid"
                          src={`https://capstone-backend-4nxt.onrender.com/${user.profile}`}
                          alt="users"
                        />
                      </td>

                      <td>
                          <Link to={`/edit/${user._id}`}>
                            <button className="btn btn-primary">Edit</button>
                          </Link>
                        </td>
                        <td>
                          <button
                            onClick={() => handelDelete(user._id)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                       
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default Upload;
