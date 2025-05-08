import { FaUser } from "react-icons/fa";

const Username = ({ handleInputChange, formData }) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend text-sm">Username</legend>
      <label className="input w-full">
        <FaUser size={20} />
        <input
          type="input"
          name="username"
          required
          placeholder="e.g. username123"
          onChange={handleInputChange}
          value={formData.username}
        />
      </label>
    </fieldset>
  );
};

export default Username;
