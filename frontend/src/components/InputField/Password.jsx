import { RiLockPasswordFill } from "react-icons/ri";
import { VscEyeClosed, VscEye } from "react-icons/vsc";

const Password = ({ handleInputChange, formData, show, setShow, isResetPass = false }) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend text-sm">{ isResetPass ? "New Password" : "Password"}</legend>
      <label className="input w-full">
        <RiLockPasswordFill size={25} />
        <input
          type={show ? "text" : "password"}
          name="password"
          placeholder="●●●●●●●●●"
          onChange={handleInputChange}
          value={formData.password}
        />
        <button type="button" onClick={() => setShow((s) => !s)}>
          {show ? <VscEye size={20} /> : <VscEyeClosed size={20} />}
        </button>
      </label>
    </fieldset>
  );
};

export default Password;
