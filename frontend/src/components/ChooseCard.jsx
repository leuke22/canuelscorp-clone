const ChooseCard = ({ items }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-sm place-items-center ml-5">
      <div className="card-body place-items-center text-center">
        <img className="w-30" src={items.images} alt={items.title} />
        <h2 className="card-title">{items.title}</h2>
        <p>{items.description}</p>
      </div>
    </div>
  );
};

export default ChooseCard;
