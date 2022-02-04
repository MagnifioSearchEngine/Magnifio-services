import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Helmet } from "react-helmet";

export default function App() {

  // const fetchData = async () => {
  //   axios.get('http://52.90.163.49:443/retrieve')
  //       .then(res => {
  //         console.log(res.data);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       })
  // }

  // useEffect(() => {
  //   fetchData();
  // }, [])

    return (
      <div className="homepage-container">
        <Helmet>
          <title>Magnif.io | Home</title>
        </Helmet>
        <Navbar />
      </div>
    );
  }
