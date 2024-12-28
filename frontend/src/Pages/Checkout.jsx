import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const result = await axios.post(
        "http://localhost:8000/api/payment/checkout"
      );
      console.log(result.data.session.url);
      window.location.href = result.data.session.url;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={handleSubmit}>Payment</button>
    </div>
  );
};

export default Checkout;
