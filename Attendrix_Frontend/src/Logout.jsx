import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();

    navigate("/", {
      replace: true,
      state: { msg: "You are logged out!" }
    });
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;