import { Formik, Form, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import { IoMdPersonAdd } from 'react-icons/io';
import PropTypes from 'prop-types';
import {
  ContactInput,
  ContactLabel,
  Error,
  NameInputIcon,
  NumberInputIcon,
  SubmitButton,
  WrapperInput,
} from './AddContactForm.styled';

const contactSchema = object({
  name: string()
    .required('This field is required!')
    .matches(
      "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]?[- ']*)*$",
      `Name may contain only letters, apostrophe, dash and spaces.
      For example Adrian, Jacob Mercer Charles de Batz de Castelmore d'Artagnan`
    )
    .min(
      2,
      'The name is short! Please enter a name with at least 2 characters.'
    )
    .trim(),
  number: string()
    .required('This field is required!')
    .matches(
      /^(\+?\d+)?\s*(\(\d+\))?[\s-]*([\d-]*)$/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +.'
    )
    .min(
      5,
      'The number is short! Please enter a number with at least 5 characters.'
    )
    .max(
      18,
      'The number is long! Please enter a number with at more 18 characters.'
    ),
});

export const AddContactForm = ({ onAddContact }) => {
  const onSubmit = ({ name, number }, { resetForm }) => {
    const isIncludesName = onAddContact(name, number);

    if (isIncludesName === null) {
      return;
    }

    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      onSubmit={onSubmit}
      validationSchema={contactSchema}
    >
      <Form>
        <ContactLabel>
          Name
          <WrapperInput>
            <ContactInput
              type="text"
              name="name"
              placeholder="First name Last name"
            />
            <NameInputIcon size={18} />
          </WrapperInput>
          <ErrorMessage name="name" component={Error} />
        </ContactLabel>

        <ContactLabel>
          Number
          <WrapperInput>
            <ContactInput type="tel" name="number" placeholder="000-00-00" />
            <NumberInputIcon />
          </WrapperInput>
          <ErrorMessage name="number" component={Error} />
        </ContactLabel>

        <SubmitButton type="submit">
          <IoMdPersonAdd size={20} />
          Add contact
        </SubmitButton>
      </Form>
    </Formik>
  );
};

AddContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
