import React from 'react';
import { Container } from './Container/Container';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitHandler = data => {
    const updatedContacts = [data, ...this.state.contacts];
    this.setState({ contacts: updatedContacts });
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = number => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.number !== number),
    }));
  };

  render() {
    return (
      <Container>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.formSubmitHandler}></ContactForm>
        </Section>
        <Section title="Contacts">
          <Filter
            value={this.state.filter}
            onChange={this.changeFilter}
          ></Filter>
          <ContactsList
            contacts={this.getVisibleContacts()}
            onDelete={this.deleteContact}
          ></ContactsList>
        </Section>
      </Container>
    );
  }
}
