import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix';
import { Section } from './Section/Section.styled';
import MyForm from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import { EmptyEl } from './ContactList/ContactList.styled';
import Filter from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidUpdate(prevState) {
    console.log('prevState', prevState);
    if (
      prevState.filter !== this.state.filter ||
      prevState.contacts !== this.state.contacts
    ) {
      localStorage.setItem('phonebook-filter', JSON.stringify(this.state.filter));
      localStorage.setItem('phonebook-contact', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const savedContact = localStorage.getItem('phonebook-contact');
    const savedFilter = localStorage.getItem('phonebook-filter')
    if (savedContact !== null) {
      this.setState({ contacts: JSON.parse(savedContact) });    
    }
    if (savedFilter !== null) {
      this.setState({ filter: JSON.parse(savedFilter) });
    }
  }

  addContact = data => {
    const identicalContactName = this.state.contacts.some(
      ({ name }) => data.name === name
    );
    if (identicalContactName) {
      return Report.warning(
        'WARNING',
        `${data.name} is already in contacts`,
        'ok'
      );
    }
 
    const contact = {
      ...data,
      id: nanoid(),
    };
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value.trim() });
  };

  clearFilter = () => {
    this.setState({
      filter: '',
    })

  }

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
  
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <Section>
        <h2>Phonebook</h2>
        <MyForm onSubmit={this.addContact} />
        <Filter value={filter} onChange={this.changeFilter} onReset={this.clearFilter} />
        {visibleContacts.length ? (
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        ) : (
          <EmptyEl>Not found</EmptyEl>
        )}
      </Section>
    );
  }
}