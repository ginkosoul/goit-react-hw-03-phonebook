import PropTypes from 'prop-types';
import css from '../ContactList/ContactList.module.css';
// import { nanoid } from 'nanoid';

export default function ContactList({ filteredContacts, handleDelete }) {
  return filteredContacts ? (
    <ul className={css.list}>
      {filteredContacts.map(e => (
        <li className={css.item} key={e.id}>
          {`${e.name}: ${e.phone}`}
          <button className={css.btn} id={e.id} onClick={handleDelete}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  ) : null;
}

ContactList.propTypes = {
  filteredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ),
  handleDelete: PropTypes.func,
};

// function filterContacts(filter, contacts) {
//   const start = new Date();
//   let filteredContacts = null;
//   if (filter && filter.trim() && contacts.length > 0) {
//     const normFilter = filter.toLowerCase();
//     filteredContacts = contacts.filter(e =>
//       e.toLowerCase().includes(normFilter)
//     );
//   } else filteredContacts = contacts;
//   const end = new Date();
//   console.log(
//     'filter with check called time: ',
//     end - start,
//     'for ',
//     `"${filter}"`
//   );
// }
// function filterContactsAnother(filter, contacts) {
//   const start = new Date();
//   let filteredContacts = null;
//   const normFilter = filter.toLowerCase();
//   filteredContacts = contacts.filter(e => e.toLowerCase().includes(normFilter));
//   const end = new Date();
//   console.log('filter called time: ', end - start, 'for ', `"${filter}"`);
// }
// const start = new Date();
// const testArray = [];
// for (let i = 0; i < 10000; i++) {
//   testArray.push(nanoid(i));
// }
// const end = new Date();
// console.log('Generate Array(10000) with nanoid() time: ', end - start);
// filterContacts('', testArray);
// filterContactsAnother('', testArray);
// filterContacts('a', testArray);
// filterContactsAnother('a', testArray);
// filterContacts('', testArray);
// filterContactsAnother('', testArray);
