import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom';

/**
 * Outermost logo wrapper, allowing the component to flex based on its parent
 * without disturing the fixed layout of the child logo block
 */
const Wrapper = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
`;

/**
 * Logo and tagline block container
 */
const StyledLogo = styled.div`
  ${({theme}) => css`
    text-align: center;
    padding: 10px 0;
    color: ${theme.text.contrastColor};
    display: inline-block;
  `}
`;

/**
 * Hoagie Haven branded wordmark
 */
const StyledLogoTitle = styled.h3`
  ${({theme}) => css`
    font-family: 'Brush Script MT';
    font-size: 48px;
    margin: 0;
    background: ${theme.color.contentBackground};
    color: ${theme.color.tertiary};
  `}
`;

/**
 * Branded logo and tagline, as a block
 */
export function Logo(): JSX.Element {
  return (
    <Wrapper>
      <StyledLogo>
        <Link to="/">
          <StyledLogoTitle>Hoagie Haven</StyledLogoTitle>
        </Link>
        <h4>Where hoagies come to hoagie!</h4>
      </StyledLogo>
    </Wrapper>
  );
}
