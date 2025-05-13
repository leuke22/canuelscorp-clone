import { useState, useEffect } from "react";
import { useUserAuth } from "../../fetch/useUserAuth";

const UpdateUserModal = ({ isOpen, onClose, user }) => {
  const { updateUser, isLoading, isUpdateError } = useUserAuth();
  const [error, setError] = useState("");

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
        profileImg: user.profileImg || "",
      });
      setError("");
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

  const handleSubmit = async () => {
    await updateUser(
      formData.fullname,
      formData.username,
      formData.email,
      formData.phone,
      formData.currentPassword,
      formData.newPassword,
      formData.confirmPassword,
      formData.address,
      formData.profileImg && formData.profileImg.startsWith("data:")
        ? formData.profileImg
        : undefined
    );

    if (!isUpdateError) {
      onClose();
    } else {
      setError("Failed to update profile");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-11/12 max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
        <h3 className="font-bold text-xl mb-4">Update Profile</h3>

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

        <div className="flex flex-col items-center mb-6">
          <div className="avatar mb-4">
            <div className="w-24 rounded-full">
              <img
                src={
                  formData.profileImg ||
                  "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                }
                alt="User avatar"
              />
            </div>
          </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="form-control">
            <label className="label font-medium">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Full Name"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold mb-2">Address Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label font-medium">Street</label>
              <input
                type="text"
                name="street"
                value={formData.address.street}
                onChange={handleAddressChange}
                placeholder="Street Address"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label font-medium">City</label>
              <input
                type="text"
                name="city"
                value={formData.address.city}
                onChange={handleAddressChange}
                placeholder="City"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label font-medium">Province</label>
              <input
                type="text"
                name="province"
                value={formData.address.province}
                onChange={handleAddressChange}
                placeholder="Province"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label font-medium">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={formData.address.postalCode}
                onChange={handleAddressChange}
                placeholder="Postal Code"
                className="input input-bordered w-full"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold mb-2">Change Password</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control md:col-span-2">
              <label className="label font-medium">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Current Password"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label font-medium">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="New Password"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label font-medium">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm New Password"
                className="input input-bordered w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            className="btn btn-ghost"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserModal;
