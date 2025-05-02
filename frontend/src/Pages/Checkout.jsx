import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/checkout`
      );
      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <button onClick={handleSubmit}>Payment</button>
    </div>
  );
};

export default Checkout;
