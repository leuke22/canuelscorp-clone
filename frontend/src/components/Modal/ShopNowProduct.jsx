import React from "react";
import { useNavigate } from "react-router-dom";

const ShopNowProduct = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Login Required</h3>
        <p className="mb-6">Please login first to order products.</p>
        <div className="flex justify-end gap-2">
          <button
            className="btn btn-outline"
            onClick={() => {
              onClose();
              navigate("/signup");
            }}
          >
            Sign Up
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              onClose();
              navigate("/login");
            }}
          >
            Login
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default ShopNowProduct;
