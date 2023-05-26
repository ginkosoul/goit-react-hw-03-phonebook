import PropTypes from 'prop-types';
import css from '../Filter/Filter.module.css';

export default function Filter({
  filter,
  contacts,
  handleChange,
  handleDelete,
}) {
  let filteredContacts = null;
  if (filter && filter.trim() && contacts.length > 0) {
    const normFilter = filter.toLowerCase();
    filteredContacts = contacts.filter(e =>
      e.name.toLowerCase().includes(normFilter)
    );
  } else filteredContacts = contacts;

  return (
    <div className={css.wrapper}>
      <input className={css.input} type="text" onChange={handleChange} />
      <ul className={css.list}>
        {filteredContacts
          ? filteredContacts.map(e => (
              <li className={css.item} key={e.id}>
                {`${e.name}: ${e.phone}`}
                <button className={css.btn} id={e.id} onClick={handleDelete}>
                  Delete
                </button>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ),
  handleChange: PropTypes.func,
  handleDelete: PropTypes.func,
};
