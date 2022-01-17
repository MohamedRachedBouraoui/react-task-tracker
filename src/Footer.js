const Footer = ({ totalItems }) => {
  
  const getLabel = () => {
    const itemOrItems = totalItems === 1 ? "item" : "items";

    return totalItems === 0
      ? "Add some items"
      : `${totalItems} List ${itemOrItems}`;
  };
  return (
    <footer>
      <p>{getLabel()}</p>
    </footer>
  );
};

export default Footer;
