const TextField = ({ name, type, label, isRequired }) => {
  return (
    <label className="flex flex-col gap-1.5 mb-3 w-xs">
      <div className="font-semibold">{name}</div>
      <input
        className="bg-white text-base text-black p-1.5 rounded-md px-3 py-2"
        type={type}
        placeholder={label}
        required={isRequired}
      />
    </label>
  );
};

export default TextField;
