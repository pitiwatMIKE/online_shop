import React, { useEffect } from "react";
import axios from "axios";
export default function App() {
  
  useEffect(() => {
    (async () => {
      const reposne = await axios.get("/server");
      console.log(reposne.data);
    })();
  }, []);

  return (
    <>
      <h1> App </h1>
    </>
  );
}
