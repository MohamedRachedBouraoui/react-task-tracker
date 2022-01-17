import ItemList from "./ItemList";

const Content = ({ items, handleCheck, handleDelete }) => {
  return (
    <>
      {items.length === 0 ? (
        <p style={{ marginTop: "2rem" }}>Your list is empty</p>
      ) : (
        <ItemList
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

export default Content;
