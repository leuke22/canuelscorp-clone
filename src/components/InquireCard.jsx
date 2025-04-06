import { formFields } from "../constants/index.js";
import TextField from "./TextField.jsx";
import SubmitButton from "./Buttons/SubmitButton.jsx";

const InquireCard = () => {
  return (
    <div className="h-full w-full flex justify-center items-center lg:mt-10">
      <div className="text-white bg-white/10 rounded-xl px-5 py-8 mb-16 lg:mb-0 w-full max-w-[360px] max-h-[550px]">
        {formFields.map((components) => (
          <TextField
            name={components.name}
            type={components.type}
            label={components.label}
            isRequired={components.required}
          />
        ))}
        <label className="flex flex-col gap-1.5 mb-3 w-xs">
          <div className="font-semibold">Your Message*</div>
          <textarea
            className="bg-white text-base text-black rounded-md px-3 py-2 max-h-[105px]"
            name="inquireMessage"
            placeholder="Enter your message"
          ></textarea>
        </label>
        <SubmitButton />
        <br />
        <p className="inline-block">Fields with * are required.</p>
      </div>
    </div>
  );
};

export default InquireCard;
