import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/userActions";

const Profile = () => {
  const dispatch = useDispatch();
const navigate = useNavigate();
 const { user, isAuthenticated, loading, error } = useSelector((state) => state.user);
 console.log("PROFILE STATE", {user, isAuthenticated, loading, error});
 if (loading) {
  return <h2>Loading...</h2>;
}

if (!loading && !isAuthenticated && !user) {
  return <Navigate to="/login" />;
}

console.log("isAuthenticated:", isAuthenticated);
console.log("user:", user);
 const logoutHandler = async () => {
  await dispatch(logout());
  navigate("/login");
};
return (
    <div className="container">
      <h2>My Profile</h2>

      <div>
        <p><strong>Name:</strong> {user?.name}</p>

        <p><strong>Email:</strong> {user?.email}</p>

        <p><strong>Phone:</strong> {user?.phoneNumber}</p>
        
      </div>

      <button>Edit Profile</button>
      <button>Change Password</button>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};

export default Profile;