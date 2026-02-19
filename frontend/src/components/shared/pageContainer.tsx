import styled, {css} from 'styled-components';

/**
 * Layout component to wrap page contents
 */
export const PageContainer = styled.div`
  ${({theme}) => css`
    width: 100%;
    padding: 0 20px;
    align-items: center;
    gap: 16px;
    display: flex;
    flex: auto;
    flex-direction: column;
  `}
`;
