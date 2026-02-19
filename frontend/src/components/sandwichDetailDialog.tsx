import {Sandwich, WithChildren} from 'types';
import styled, {css} from 'styled-components';
import {Button, ModalDialog} from 'components/shared';
import {useUpdateOrder} from 'hooks/orderActions';

/**
 * Disclosure wrapper
 */
const StyledDisclosureWrapper = styled.div`
  ${({theme}) => css`
    cursor: pointer;
    display: flex;
    & > .sandwichCard:hover {
      background-color: ${theme.color.grey};
    }
  `}
`;

/**
 * Styled order button
 */
const StyledOrderButton = styled(Button)`
  width: 100%;
`;

/**
 * Sandwich detail dialog, showing a modal with the title and description for a given sandwich.
 * Component children are displayed as the disclosure.
 */
export function SandwichDetailDialog({sandwich, children}: WithChildren<{sandwich: Sandwich}>) {
  const update = useUpdateOrder();
  return (
    <ModalDialog
      label="Sandwich Detail"
      disclosure={<StyledDisclosureWrapper>{children}</StyledDisclosureWrapper>}
    >
      <h4>{sandwich.name}</h4>
      <p>{sandwich.description}</p>
      <StyledOrderButton onClick={() => update(sandwich.id, 1)}>Add to order</StyledOrderButton>
    </ModalDialog>
  );
}
