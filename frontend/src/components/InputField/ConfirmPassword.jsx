import { RiLockPasswordFill } from "react-icons/ri";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
const ConfirmPassword = ({ handleInputChange, formData, show, setShow, isResetPass = false }) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend text-sm">{ isResetPass ? "Confirm New Password" : "Confirm Password"}</legend>
      <label className="input w-full">
        <RiLockPasswordFill size={25} />
        <input
          type={show ? "text" : "password"}
          name="confirmPassword"
          required
          placeholder="●●●●●●●●●"
          onChange={handleInputChange}
          value={formData.confirmPassword}
        />
        <button type="button" onClick={() => setShow((s) => !s)}>
          {show ? <VscEye size={20} /> : <VscEyeClosed size={20} />}
        </button>
      </label>
    </fieldset>
  );
};

export default ConfirmPassword;
