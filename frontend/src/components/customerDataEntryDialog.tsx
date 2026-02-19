import {WithChildren} from 'types';
import styled from 'styled-components';
import {Button, ModalDialog, TextField} from 'components/shared';
import {useSubmitOrder} from 'hooks/orderActions';

/**
 * Styled order button
 */
const StyledSubmitButton = styled(Button)`
  width: 100%;
  margin-top: 16px;
`;

/**
 * Styled text field
 */
const StyledTextField = styled(TextField)`
  width: 100%;
  margin-bottom: 4px;
`;

/**
 * Customer data entry dialog.
 * Component children are displayed as the disclosure.
 */
export function CustomerDataEntryDialog({children}: WithChildren) {
  const submitOrder = useSubmitOrder();

  /** Handle when the form is submitted */
  function handleSubmit() {
    submitOrder();
  }

  return (
    <ModalDialog label="Enter your information" disclosure={<div>{children}</div>}>
      <h4>Please enter your information (optional)</h4>
      <StyledTextField id="customer_first_name" label="First Name" onChange={undefined} />
      <StyledTextField id="customer_last_name" label="Last Name" onChange={undefined} />
      <StyledTextField id="customer_email" label="Email" onChange={undefined} />
      <StyledSubmitButton onClick={handleSubmit} to="/confirmation">
        Submit Order
      </StyledSubmitButton>
    </ModalDialog>
  );
}
