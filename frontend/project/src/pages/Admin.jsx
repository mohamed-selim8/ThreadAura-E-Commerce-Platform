import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import AdminLog from "./AdminLog";
import AdminDashboard from "./AdminDashboard";
function Admin() {
  // redirect
  const nav = useNavigate();

  //   token and save it in localhost if exist
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : "",
  );
  const [adminInfo, setInfo] = useState({ email: "", password: "" });

  const handelAdmin = async (e) => {
    e.preventDefault();

    try {
      // request
      const url = "http://localhost:3000/users/admin";
      const { data } = await axios.post(url, adminInfo);

      console.log(data, "admin login");

      //   change to new value
      if (data?.token) {
        setToken(data.token);
        toast.success(data.msg);
      }
    } catch (error) {
      toast.error("not authorized");
      //   redirect
      nav("/login");
      console.error(error.response?.data || error.message);
    }
  };

  //   save token in localstorage
  useEffect(() => {
    const saveToken = localStorage.setItem("token", token);
    console.log(adminInfo);
    return saveToken;
  }, [adminInfo, token]);

  return token === "" ? (
    <div className=" min-h-screen items-center justify-center w-full">
      <AdminLog propInfo={{ handelAdmin, adminInfo, setInfo }} />
    </div>
  ) : (
    <div>
      <AdminDashboard />
    </div>
  );
}

export default Admin;
