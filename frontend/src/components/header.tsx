import {Button, Logo} from './shared';
import styled, {css} from 'styled-components';
import {WithChildren} from 'types';
import {useOrder} from 'hooks/orderActions';

/**
 * Wrapper
 */
const StyledHeader = styled.div`
  ${({theme}) => css`
    color: ${theme.text.contrastColor};
    background-color: ${theme.color.primary};
    text-align: center;
    width: 100%;
    padding: 5px;
    display: flex;
    flex-direction: row;

    @media (width < 700px) {
      #back-label {
        display: none;
      }
    }
  `}
`;

/**
 * Internal flex layout container
 */
const StyledFlexContainer = styled.div<{justify?: 'start' | 'end' | 'center'}>`
  ${props => css`
    display: flex;
    flex: 1 0;
    align-items: center;
    justify-content: ${props.justify || 'start'};
    padding: 20px;
  `}
`;

/**
 * Page title, visible just below the header
 */
const StyledTitle = styled.div`
  text-align: center;
  padding: 10px 0;
`;

/**
 * Masthead header visible at the top of most pages
 */
export function Header({backTo, ...props}: WithChildren<{backTo?: string}>): JSX.Element {
  const order = useOrder(true);

  return (
    <>
      <StyledHeader>
        <StyledFlexContainer>
          {backTo ? (
            <Button to={backTo}>
              &lt; <span id="back-label">Back</span>
            </Button>
          ) : null}
        </StyledFlexContainer>
        <Logo />
        <StyledFlexContainer justify="end">
          <Button disabled={!order?.items.length} to={'/cart'}>
            Cart
            {order?.items.filter(i => i.quantity > 0)
              ? ` (${order.items.filter(i => i.quantity > 0).length})`
              : null}
          </Button>
        </StyledFlexContainer>
      </StyledHeader>
      <StyledTitle>{props.children}</StyledTitle>
    </>
  );
}
