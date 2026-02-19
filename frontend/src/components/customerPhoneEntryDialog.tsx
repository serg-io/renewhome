import {WithChildren} from 'types';
import styled from 'styled-components';
import {Button, ModalDialog, TextField} from 'components/shared';
import {useSubmitOrder} from 'hooks/orderActions';
import {ActionType, useGlobalDispatch} from 'store';
import {ChangeEvent} from 'react';

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
 * Customer phone entry dialog
 * Component children are displayed as the disclosure.
 */
export function CustomerPhoneEntryDialog({children}: WithChildren) {
  const submitOrder = useSubmitOrder();
  const dispatch = useGlobalDispatch();

  /** Handle when the field is changed */
  function handlePhoneChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch({type: ActionType.UPDATE_ORDER_PHONE_NUMBER, payload: e.target.value});
  }

  /** Handle when the form is submitted */
  function handleSubmit() {
    submitOrder();
  }

  return (
    <ModalDialog label="Enter Phone Number" disclosure={<div>{children}</div>}>
      <h4>Optionally supply your phone number</h4>
      <StyledTextField
        id="customer_phone"
        pattern="[0-9]*"
        label="Phone number"
        onChange={handlePhoneChange}
      />
      <StyledSubmitButton onClick={handleSubmit} to="/confirmation">
        Submit Order
      </StyledSubmitButton>
    </ModalDialog>
  );
}
