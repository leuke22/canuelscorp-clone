const ItemInfo = ({ icon: Icon, text }) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <Icon size={20} />
      <p>{text}</p>
    </div>
  );
};

export default ItemInfo;
