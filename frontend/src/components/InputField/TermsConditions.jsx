const TermsConditions = () => {
  return (
    <fieldset className="fieldset flex flex-row gap-2 items-center mt-4">
      <input type="checkbox" className="checkbox" />
      <p className="text-[13px]">
        I accept the{" "}
        <a href="#" className="text-blue-600 font-semibold">
          Terms and Conditions
        </a>
      </p>
    </fieldset>
  );
};

export default TermsConditions;
