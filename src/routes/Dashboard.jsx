import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Outlet />
    </>
  );
};

export default Dashboard;
