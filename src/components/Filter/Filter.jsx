import { FilterClearButton, FilterInput, FilterSection } from "./Filter.styled";

const Filter = ({ value, onChange, onReset }) => {
  return (
    <FilterSection>
      <h2>Contacts</h2>
        <FilterInput
          placeholder="Find contact"
          type="text"
          name="filter"
          value={value}
          onChange={onChange}
      />
      <FilterClearButton onClick={onReset}>Clear</FilterClearButton>
    </FilterSection>
  );
};

export default Filter;