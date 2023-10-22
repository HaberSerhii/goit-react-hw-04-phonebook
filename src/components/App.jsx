import { useEffect,useState } from 'react';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix';
import { Section } from './Section/Section.styled';
import MyForm from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import { EmptyEl } from './ContactList/ContactList.styled';
import Filter from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');
  const [visibleContacts, setVisibleContacts] = useState([]);

  useEffect(() => {
    const savedContact = localStorage.getItem('phonebook-contact');
    const savedFilter = localStorage.getItem('phonebook-filter')
    if (savedContact !== null) {
      setContacts(JSON.parse(savedContact));
    }
    if (savedFilter !== null) {
      setFilter(JSON.parse(savedFilter));
    }
  }, []);

  useEffect(() => {
    getVisibleContacts();
    localStorage.setItem('phonebook-filter', JSON.stringify(filter));
  }, [filter]);

  useEffect(() => {
    setVisibleContacts(contacts);
      localStorage.setItem('phonebook-contact', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (data) => {
    const identicalContactName = contacts.some(
      ({ name }) => data.name === name
    );
    if (identicalContactName) {
      return Report.warning(
        'WARNING',
        `${data.name} is already in contacts`,
        'ok'
      );
    }
 
    const newContact = {
      ...data,
      id: nanoid(),
    };
    setContacts([...contacts, newContact]);
  };

  const deleteContact = (contactId) => {
    const filteredContacts = contacts.filter(contact => contact.id !== contactId)
    setContacts(filteredContacts, () => {
      localStorage.setItem('phonebook-contact', JSON.stringify(contacts));
    })
  };

  const changeFilter = (e) => {
    setFilter(e.currentTarget.value.trim());
  };

  const clearFilter = () => {
    setFilter('');
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Section>
      <h2>Phonebook</h2>
      <MyForm onSubmit={addContact} />
      <Filter value={filter} onChange={changeFilter} onReset={clearFilter} />
      {getVisibleContacts.length ? (
        <ContactList
          contacts={contacts}
          onDeleteContact={deleteContact}
        />
      ) : (
        <EmptyEl>Not found</EmptyEl>
      )}
    </Section>
  );
};