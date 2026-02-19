import styled from 'styled-components';

/**
 * Component to wrap a form field to ensure uniform layout within a form
 */
export const FormLineWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 15px 5px;

  & > * {
    flex: 1;
    display: block;
  }

  & > :nth-child(n + 2) {
    margin-left: 15px;
  }

  .stateField {
    flex: 0 33%;
  }
`;
