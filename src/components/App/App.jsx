import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import Filter from '../Filter/Filter';
import Contacts from '../Contacts/Contacts';
import css from '../App/App.module.css';

class App extends Component {
  state = {
    contacts: this.props.defaultContacts || [],
    filter: '',
  };

  static propTypes = {
    defaultContacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
      })
    ),
  };

  handleFilterInput = e => {
    const filter = e.target.value.trim();
    this.setState(pValue => ({ ...pValue, filter }));
  };
  handleRemove = e => {
    const { id } = e.target;
    if (id)
      this.setState(pValue => ({
        ...pValue,
        contacts: pValue.contacts.id(e => e.id !== id),
      }));
  };
  handleSubmit = value => {
    const { contacts } = this.state;
    if (contacts.find(e => e.name === value.name)) {
      alert('Already in the list');
      return;
    }
    const newElement = { ...value, id: nanoid() };
    this.setState(pv => ({
      ...pv,
      contacts: [...pv.contacts, newElement],
    }));
  };

  render() {
    return (
      <div className={css.wrapper}>
        <Contacts handleSubmit={this.handleSubmit} />
        <Filter
          {...this.state}
          handleChange={this.handleFilterInput}
          handleDelete={this.handleRemove}
        />
      </div>
    );
  }
}

export default App;
