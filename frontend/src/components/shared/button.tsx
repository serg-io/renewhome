import {Link} from 'react-router-dom';
import styled, {css} from 'styled-components';
import {WithComponentProps} from 'types';
import {Button as rButton} from 'reakit/Button';

/**
 * Styled button
 */
const StyledButton = styled(rButton)`
  ${({theme, ...props}) => css`
    font-size: 14px;
    color: ${theme.color.buttonColor};
    font-weight: 500;
    background-color: ${theme.color.buttonBackground};
    border-radius: ${theme.standard.borderRadius};
    border: none;
    padding: 12px 20px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.5);
    }
    ${props.disabled
      ? css`
          opacity: 0.5;
          cursor: default;
        `
      : null}
  `}
`;

/**
 * General button component
 */
export function Button({to, ...props}: WithComponentProps<'button', {to?: string}>): JSX.Element {
  return (
    <>
      {!props.disabled && to ? (
        <Link to={to}>
          <StyledButton {...{...props}} />
        </Link>
      ) : (
        <StyledButton {...{...props}} />
      )}
    </>
  );
}
