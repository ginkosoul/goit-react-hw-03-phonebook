import { Component } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';

// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', phone: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', phone: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', phone: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', phone: '227-91-26' },
    ],
    filter: '',
  };

  handleFilterInput(e) {
    console.log(e.target);
    const filter = e.target.value.trim();
    if (filter) this.setState(pValue => ({ ...pValue, filter }));
  }
  handleRemove(e) {
    console.log(e.target);
    const filter = e.target.id;
    if (filter)
      this.setState(pValue => ({
        ...pValue,
        contacts: pValue.contacts.filter(e => e.id !== filter),
      }));
  }
  handleSubmit(value) {
    const newElement = { ...value, id: nanoid() };
    this.setState(pv => ({
      ...pv,
      contacts: [...pv.contacts, newElement],
    }));
  }

  phoneRegExp =
    /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
  nameRegExp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

  SignupSchema = Yup.object().shape({
    name: Yup.string()
      .matches(
        this.nameRegExp,
        'Name may contain only letters, apostrophe, dash and spaces.'
      )
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    phone: Yup.string()
      .matches(
        this.phoneRegExp,
        'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
      )
      .required('Required'),
  });

  render() {
    return (
      <div>
        <Formik
          initialValues={{
            name: '',
            phone: '',
          }}
          validationSchema={this.SignupSchema}
          onSubmit={this.handleSubmit.bind(this)}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name="name" />
              {errors.name && touched.name ? <div>{errors.name}</div> : null}
              <Field name="phone" />
              {errors.phone && touched.phone ? <div>{errors.phone}</div> : null}
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
        <Filter
          {...this.state}
          handleChange={this.handleFilterInput.bind(this)}
          handleDelete={this.handleRemove.bind(this)}
        />
      </div>
    );
  }
}

export default App;
