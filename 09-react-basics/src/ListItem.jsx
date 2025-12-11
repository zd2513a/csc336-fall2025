import ItemLabel from "./ItemLabel";

function ListItem({ text, important }) {
  const className = important
    ? "list-item list-item--important"
    : "list-item";

  return (
    <div className={className}>
      <div className="list-item-main">
        {important && <span className="list-item-star"></span>}
        <span>{text}</span>
      </div>
      <div>
        <span className="item-label">item</span>
        <span className="item-label">
          {important ? "important" : "normal"}
        </span>
      </div>
    </div>
  );
}

export default ListItem;