import { MdPerson } from "react-icons/md";

const Fullname = ({ handleInputChange, formData }) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend text-sm">Full Name</legend>
      <label className="input">
        <MdPerson size={25} />
        <input
          type="text"
          name="fullname"
          placeholder="e.g. Juan Dela Cruz"
          title="Only letters, spaces, apostrophes or hyphens allowed"
          onChange={handleInputChange}
          value={formData.fullname}
        />
      </label>
    </fieldset>
  );
};

export default Fullname;
