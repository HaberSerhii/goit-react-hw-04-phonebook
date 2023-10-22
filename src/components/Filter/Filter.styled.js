import { styled } from 'styled-components';

export const FilterSection = styled.div`
  width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

export const FilterInput = styled.input`
  width: 300px;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid black;
  background-color: transparent;
  font-size: medium;
`;

export const FilterClearButton = styled.button`
  width: 100px;
  padding: 15px 10px;
  background-color: transparent;
  border: 1px solid black;
  border-radius: 5px;
`;
