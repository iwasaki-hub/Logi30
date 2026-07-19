import { useState } from "react";
import api from "../api/api";
import { useEffect } from "react";

const HomePage = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get("/");

        setMessage(data.message);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <h1>{message}</h1>
    </main>
  );
};

export default HomePage;
