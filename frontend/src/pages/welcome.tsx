import {Button, Logo, PageContainer} from 'components/shared';
import React from 'react';
import styled from 'styled-components';
import {WithComponentProps} from 'types';

/**
 * Special page container for the welcome page
 */
const StyledPageContainer = styled(PageContainer)`
  justify-content: center;
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    background-image: url('/static/2.jpeg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    z-index: -1;
    opacity: 0.2;
  }
`;

/**
 * Giant start button
 */
const StartButton = styled(Button)`
  font-size: 40px;
  padding: 20px 40px;
`;

/**
 * Welcome page component
 */
export function Welcome({...props}: WithComponentProps<'div'>): JSX.Element {
  return (
    <>
      <StyledPageContainer>
        <Logo />
        <StartButton to="menu">Start an Order!</StartButton>
      </StyledPageContainer>
    </>
  );
}
