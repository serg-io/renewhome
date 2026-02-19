import styled, {css} from 'styled-components';
import {Sandwich, WithChildren} from 'types';

/**
 * Orientation options for displaying `SandwichCard`
 */
type Orientation = 'vertical' | 'horizontal';

/**
 * Styled card wrapper
 */
export const StyledCard = styled.div<{orientation?: Orientation}>`
  ${({theme, orientation}) => css`
    box-shadow: ${theme.standard.boxShadow};
    border-radius: ${theme.standard.borderRadius};
    overflow: hidden;
    background-color: ${theme.color.contentBackground};
    display: flex;
    flex: ${orientation === 'horizontal' ? 'unset' : 'auto'};
    flex-direction: ${orientation === 'horizontal' ? 'row' : 'column'};
  `}
`;

/**
 * Image container
 */
const ImageContainer = styled.div<{url: string; orientation?: Orientation}>`
  ${({url, orientation}) => css`
    background-image: url(${url}), url('/broken.gif');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    flex: none;
    ${orientation === 'horizontal'
      ? css`
          width: 20%;
        `
      : css`
          width: 100%;
          padding-top: 75%;
        `}
  `}
`;

/**
 * Container wrapping the sandwich name and description
 */
const ContentContainer = styled.div<{flex?: string}>`
  padding: 10px;
  display: flex;
  flex-direction: column;
  flex: ${({flex}) => flex || 'none'};
`;

const StyledDescription = styled.p`
  flex: auto;
`;

/**
 * Horizontal or vertical sandwich detail card, with image and description
 */
export function SandwichCard({
  sandwich,
  orientation,
  children,
}: WithChildren<{sandwich: Sandwich; orientation?: Orientation}>): JSX.Element {
  const fullImageUrl = `${sandwich.image_url}`;
  return (
    <StyledCard className="sandwichCard" orientation={orientation}>
      <ImageContainer url={fullImageUrl} orientation={orientation} />
      <ContentContainer flex="auto">
        <h4>{sandwich.name}</h4>
        <StyledDescription>{sandwich.description}</StyledDescription>
      </ContentContainer>
      <ContentContainer>{children}</ContentContainer>
    </StyledCard>
  );
}
