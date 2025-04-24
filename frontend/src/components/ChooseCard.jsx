const ChooseCard = ({ Icons, title, description }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-sm place-items-center ml-5">
      <div className="card-body place-items-center text-center">
        {Icons && <Icons size={50} />}
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ChooseCard;
