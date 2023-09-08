import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';
import { toastOptions } from './helpers/helpers';
import { Layout } from './Layout';
import { GlobalStyle } from './GlobalStyle';
import { Section } from './Section/Section';
import { AddContactForm } from './AddContactForm/AddContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './Contacts/Contacts';
import { NoContactsText } from './App.styled';

const getSavedContacts = () => {
  const savedContacts = JSON.parse(localStorage.getItem('contacts'));

  return savedContacts && savedContacts.length ? savedContacts : [];
};

export const App = () => {
  const [contacts, setContacts] = useState(getSavedContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onAddContact = (name, number) => {
    const isIncludesName = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    const isIncludesNumber = contacts.find(
      contact => contact.number === number
    );

    if (isIncludesName || isIncludesNumber) {
      const warningText = `${
        isIncludesName ? name : `Number ${number}`
      } is already in contacts`;

      toast.remove();
      toast.error(warningText);

      return null;
    }

    setContacts(prevState => [
      ...prevState,
      {
        id: nanoid(),
        name,
        number,
      },
    ]);

    toast.remove();
    toast.success(`${name} added to contacts`);
  };

  const onDeleteContact = (contactDeleteId, contactDeleteName) => {
    setContacts(prevState =>
      prevState.filter(({ id }) => id !== contactDeleteId)
    );

    toast.remove();
    toast.success(`${contactDeleteName} deleted from contacts`);
  };

  const onFilterContacts = findName => {
    setFilter(findName);
  };

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Layout>
      <Section title="Phonebook">
        <AddContactForm onAddContact={onAddContact} />
      </Section>

      <Section title="Contacts">
        {contacts.length > 0 ? (
          <>
            <Filter onFilterContacts={onFilterContacts} />
            <ContactList
              contacts={visibleContacts}
              onDelete={onDeleteContact}
            />
            {!visibleContacts.length && (
              <NoContactsText>
                No contacts found for the entered name
              </NoContactsText>
            )}
          </>
        ) : (
          <NoContactsText>No contacts</NoContactsText>
        )}
      </Section>

      <Toaster position="top-right" toastOptions={toastOptions} />

      <GlobalStyle />
    </Layout>
  );
};
