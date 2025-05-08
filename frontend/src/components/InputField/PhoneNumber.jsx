import { FaPhone } from "react-icons/fa";

const PhoneNumber = ({ handleInputChange, formData }) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend text-sm">Phone Number</legend>
      <label className="input w-full">
        <FaPhone size={20} />
        <input
          type="tel"
          name="phone"
          required
          placeholder="e.g. +639171234567 or 09171234567"
          pattern="^(\+63|0)9\d{9}$"
          title="Must start with +63 or 09, followed by 9 digits (e.g. +639171234567 or 09171234567)"
          onChange={handleInputChange}
          value={formData.phone}
        />
      </label>
    </fieldset>
  );
};

export default PhoneNumber;
