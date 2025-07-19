import { MdEmail } from "react-icons/md";

const Email = ({ handleInputChange, formData }) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend text-sm">Your Email</legend>
      <label className="input w-full">
        <MdEmail size={25} />
        <input
          type="email"
          name="email"
          placeholder="e.g. username@email.com"
          title="Only letters, numbers or dash"
          onChange={handleInputChange}
          value={formData.email}
        />
      </label>
    </fieldset>
  );
};

export default Email;
