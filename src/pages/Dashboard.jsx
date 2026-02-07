import React from "react";
import Navbar from "../components/dashboardComponents/Navbar";

const Dashboard = () => {
  return (
    <div className="bg-purple-600  min-h-screen w-full text-white">
      <div className="bg-red-600 h-100 w-full">
        <Navbar />
      </div>
    </div>
  );
};

export default Dashboard;
