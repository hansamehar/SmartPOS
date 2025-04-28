import React, { useEffect, useState } from "react";
import "../styles/Common.css";
import Menu from "../components/Menu";
import AddUser from "../components/AddUser";
import { deleteUserAPI, getUserAPI } from "../services/allAPI";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [responseFromAdd, setResponsefromAdd] = useState([]);
    

  const getUsers = async () => {
    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (token && user.role == "admin") {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };  
      try {
        const result = await getUserAPI(reqHeader);
        if (result.status == 200) {
          setUsers(result.data);
        } else {
          alert(result.response.data);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("admin access only");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

    const deleteUsers = async (id) => {
      try {
        const result = await deleteUserAPI(id);
        if (result.status == 200) {
          alert("user deleted");
          getUsers();
        } else {
          alert(result.response.data);
        }
      } catch (e) {
        console.log(e);
      }
    };

  return (
    <>
      <Menu />
      <div className="maindiv">
        <AddUser setResponsefromAdd={ setResponsefromAdd} />

        <h4 className="my-3">Users :</h4>
        <div className="table-responsive">
          <table className="table table-bordered ">
            <thead>
              <tr>
                <td className="fw-bolder">ID</td>
                <td className="fw-bolder">username</td>
                <td className="fw-bolder">Email</td>
                <td className="fw-bolder">Role</td>
                <td className="fw-bolder">Actions</td>
              </tr>
            </thead>
            <tbody>
              {users?.length > 0 ? (
                users.map((user, index) => (
                  <tr className="align-middle" key={user?._id}>
                    <td>{index + 1}</td>
                    <td>{user?.username}</td>
                    <td>{user?.email}</td>
                    <td>{user?.role}</td>
                    <td>
                      <button
                        onClick={() => deleteUsers(user?._id)}
                        className="btn"
                        style={{ color: "#c474bc " }}
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <div className="text-danger  fs-5 text-center">No users</div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Users;
