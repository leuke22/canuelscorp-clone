import React, { useState, useEffect } from "react";

const UpdateUserModal = ({ isOpen, onClose, user, onUpdateUser }) => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      province: "",
      postalCode: "",
    },
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    profileImg: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && isOpen) {
      setFormData({
        fullname: user.fullname || "",
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        address: {
          street: user.address?.street || "",
          city: user.address?.city || "",
          province: user.address?.province || "",
          postalCode: user.address?.postalCode || "",
        },
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        profileImg: "",
      });
    }
  }, [user, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));

    if (error) setError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profileImg: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!formData.fullname.trim()) return "Full name is required";
    if (!formData.username.trim()) return "Username is required";
    if (!formData.email.trim()) return "Email is required";

    if (formData.newPassword && !formData.currentPassword) {
      return "Current password is required to set new password";
    }

    if (formData.newPassword && formData.newPassword.length < 6) {
      return "Password must be at least 6 characters";
    }

    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      return "Passwords do not match";
    }

    return "";
  };

  const handleSubmit = () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    const updateData = {
      fullname: formData.fullname,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
    };

    if (formData.profileImg && formData.profileImg.startsWith("data:")) {
      updateData.profileImg = formData.profileImg;
    }

    if (formData.currentPassword) {
      updateData.currentPassword = formData.currentPassword;
      updateData.newPassword = formData.newPassword;
    }
    
    const result = onUpdateUser(updateData);

    setTimeout(() => {
      setIsLoading(false);
      if (result.success) {
        onClose();
      } else {
        setError("Failed to update profile");
      }
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box w-11/12 max-w-3xl">
        <h3 className="font-bold text-lg mb-4">Update Profile</h3>

        {error && (
          <div className="alert alert-error mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <div className="flex justify-center mb-6">
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img
                src={
                  formData.profileImg ||
                  user.profileImg ||
                  "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                }
                alt="User avatar"
              />
            </div>
          </div>
        </div>

        <div className="text-center mb-4">
          <label className="btn btn-sm btn-outline">
            Change Image
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>

        <div className="form-control mb-2">
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Full Name"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control mb-2">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control mb-2">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control mb-2">
          <label className="label">
            <span className="label-text">Phone</span>
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="input input-bordered w-full"
          />
        </div>

        <div className="divider">Address Information</div>

        <div className="form-control mb-2">
          <label className="label">
            <span className="label-text">Street</span>
          </label>
          <input
            type="text"
            name="street"
            value={formData.address.street}
            onChange={handleAddressChange}
            placeholder="Street Address"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control mb-2">
          <label className="label">
            <span className="label-text">City</span>
          </label>
          <input
            type="text"
            name="city"
            value={formData.address.city}
            onChange={handleAddressChange}
            placeholder="City"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control mb-2">
          <label className="label">
            <span className="label-text">Province</span>
          </label>
          <input
            type="text"
            name="province"
            value={formData.address.province}
            onChange={handleAddressChange}
            placeholder="Province"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Postal Code</span>
          </label>
          <input
            type="text"
            name="postalCode"
            value={formData.address.postalCode}
            onChange={handleAddressChange}
            placeholder="Postal Code"
            className="input input-bordered w-full"
          />
        </div>

        <div className="divider">Change Password</div>

        <div className="form-control mb-2">
          <label className="label">
            <span className="label-text">Current Password</span>
          </label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="Current Password"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control mb-2">
          <label className="label">
            <span className="label-text">New Password</span>
          </label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="New Password"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Confirm New Password</span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm New Password"
            className="input input-bordered w-full"
          />
        </div>

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            className={`btn btn-primary ${isLoading ? "loading" : ""}`}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default UpdateUserModal;
