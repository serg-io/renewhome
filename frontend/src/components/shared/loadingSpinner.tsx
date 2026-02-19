import React from 'react';
import styled, {css} from 'styled-components';
import useTimeout from 'hooks/useTimeout';

/**
 * Styled, animated spinner outer container
 */
const StyledLoader = styled.div`
  ${({theme}) => css`
    position: relative;
    margin: 40px auto;
    width: 100px;

    &:before {
      content: '';
      display: block;
      padding-top: 100%;
    }

    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes dash {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35px;
      }
      100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124px;
      }
    }

    @keyframes color {
      100%,
      0%,
      40%,
      66%,
      80%,
      90% {
        stroke: ${theme.color.grey};
        stroke-opacity: 0.7;
      }
    }
  `}
`;

/**
 * SVG container wrapping the circle
 */
const StyledSvg = styled.svg`
  animation: rotate 1.5s linear infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

/**
 * Styled circle that makes up the spinner
 */
const StyledCircle = styled.circle`
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
  stroke-linecap: round;
`;

/**
 * Loading spinner component
 */
export function LoadingSpinner(): JSX.Element {
  useTimeout(() => {}, 15 * 1000);

  return (
    <StyledLoader>
      <StyledSvg viewBox="25 25 50 50">
        <StyledCircle cx="50" cy="50" r="20" fill="none" strokeWidth="5" strokeMiterlimit="10" />
      </StyledSvg>
    </StyledLoader>
  );
}
