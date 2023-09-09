import PropTypes from 'prop-types';
import {
  FilterLabel,
  FilterInput,
  SearchIcon,
  WrapperInput,
} from './Filter.styled';

export const Filter = ({ onFilterContacts }) => {
  return (
    <>
      <FilterLabel>
        Find contact by name or number
        <WrapperInput>
          <FilterInput
            type="text"
            placeholder="Name or number"
            onChange={evt => onFilterContacts(evt.target.value)}
          />
          <SearchIcon />
        </WrapperInput>
      </FilterLabel>
    </>
  );
};

Filter.propTypes = {
  onFilterContacts: PropTypes.func.isRequired,
};
