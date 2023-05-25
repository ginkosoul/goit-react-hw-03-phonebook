export function Filter({ filter, contacts, handleChange, handleDelete }) {
  let filteredContacts = null;
  if (filter && filter.trim() && contacts.length > 0) {
    const normFilter = filter.toLowerCase();
    filteredContacts = contacts.filter(e =>
      e.name.toLowerCase().includes(normFilter)
    );
  } else filteredContacts = contacts;
  return (
    <div>
      <input type="text" onChange={handleChange} />
      <ul>
        {filteredContacts
          ? filteredContacts.map(e => (
              <li key={e.id}>
                {`${e.name}: ${e.phone}`}
                <button id={e.id} onClick={handleDelete}>
                  Delete
                </button>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
