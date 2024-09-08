import PropTypes from 'prop-types';

const ItemList = ({ items, onEdit, onDelete }) => {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <a href={`/item/${item.id}`}><strong>{item.title}</strong></a>: {item.description}
          <button onClick={() => onEdit(item)}>Edit</button>
          <button onClick={() => onDelete(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

ItemList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default ItemList;
