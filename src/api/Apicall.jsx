import React from "react";
import axios from "axios";

const Apicall = () => {
  const API = "5a07ad3e";
  async function apiCall() {
    const response = await axios.get(
      `http://www.omdbapi.com/?t=batman&apikey=${API}`,
    );
    console.log(response.data);
  }
  return (
    <div>
      <h1>Apicall</h1>
      <button onClick={apiCall}>Call API</button>
    </div>
  );
};

export default Apicall;
