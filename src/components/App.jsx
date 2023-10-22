import { useCallback, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix';
import { Section } from './Section/Section.styled';
import MyForm from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import { EmptyEl } from './ContactList/ContactList.styled';
import Filter from './Filter/Filter';

const STORAGE_FILTER = 'phonebook-filter';
const STORAGE_CONTACTS = 'phonebook-contact';

const DEFAULT_CONTACTS = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState([]);
  const [visibleContacts, setVisibleContacts] = useState([]);

  const getFilteredContacts = useCallback(
    searchValue => {
      if (!searchValue) {
        setVisibleContacts(contacts);

        return;
      }

      const parsedValue = searchValue.toLowerCase();

      const result = contacts.filter(contact =>
        contact.name.toLowerCase().includes(parsedValue)
      );

      setVisibleContacts(result);
    },
    [setVisibleContacts, contacts]
  );

  useEffect(() => {
    const savedFilter = localStorage.getItem(STORAGE_FILTER) || '';
    const savedContact = localStorage.getItem(STORAGE_CONTACTS);
    let parsedData = savedContact ? JSON.parse(savedContact) : DEFAULT_CONTACTS;

    if (!parsedData.length) {
      parsedData = DEFAULT_CONTACTS;
    }

    if (savedFilter) {
      setFilter(savedFilter);
    }

    setContacts(parsedData);
    setVisibleContacts(parsedData);
  }, []);

  useEffect(() => {
    getFilteredContacts(filter);

    localStorage.setItem(STORAGE_FILTER, filter);
  }, [filter, contacts, getFilteredContacts]);

  const addContact = data => {
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

    const newData = [...contacts, newContact];
    setContacts(newData);
    setVisibleContacts(newData);
    localStorage.setItem(STORAGE_CONTACTS, JSON.stringify(newData));
  };

  const deleteContact = contactId => {
    const filteredContacts = contacts.filter(
      contact => contact.id !== contactId
    );

    localStorage.setItem(STORAGE_CONTACTS, JSON.stringify(filteredContacts));
    setContacts(filteredContacts);
  };

  const changeFilter = e => {
    const value = e.currentTarget.value.trim();

    setFilter(value);
  };

  const clearFilter = () => {
    setFilter('');
    setVisibleContacts(contacts);
  };

  return (
    <Section>
      <h2>Phonebook</h2>
      <MyForm onSubmit={addContact} />
      <Filter value={filter} onChange={changeFilter} onReset={clearFilter} />
      {visibleContacts.length ? (
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      ) : (
        <EmptyEl>Not found</EmptyEl>
      )}
    </Section>
  );
};