import {Header} from 'components/header';
import {PageContainer, LoadingSpinner, Button} from 'components/shared';
import {SandwichCard} from 'components/sandwichCard';
import {useIsAnyLoading} from 'hooks/loading';
import {useFetchSandwiches, useGetSandwiches} from 'hooks/sandwichActions';
import styled, {css} from 'styled-components';
import {SandwichDetailDialog} from 'components/sandwichDetailDialog';
import {useUpdateOrder} from 'hooks/orderActions';

/**
 * CSS grid of sandwich options
 */
const SandwichGrid = styled.div`
  ${({theme}) => css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 1fr;
    gap: 10px;
  `}
`;

/**
 * Order button
 */
const StyledOrderButton = styled(Button)`
  width: 100%;
`;

/**
 * A modified PageContainer with flex:none
 */
const NoFlexPageContainer = styled(PageContainer)`
  flex: none;
`;

/**
 * Snadwich menu page, containing a grid of available sandwiches
 */
export function Menu() {
  useFetchSandwiches();
  const sandwiches = useGetSandwiches();
  const loading = useIsAnyLoading();
  const update = useUpdateOrder();

  return (
    <>
      <Header backTo="/">
        <h1>Menu</h1>
      </Header>
      {loading ? (
        <PageContainer>
          <LoadingSpinner></LoadingSpinner>
        </PageContainer>
      ) : (
        <NoFlexPageContainer>
          <SandwichGrid>
            {sandwiches.map(s => (
              <SandwichDetailDialog sandwich={s} key={s.id}>
                <SandwichCard sandwich={s}>
                  <StyledOrderButton onClick={() => update(s.id, 1)}>
                    Add to order
                  </StyledOrderButton>
                </SandwichCard>
              </SandwichDetailDialog>
            ))}
          </SandwichGrid>
        </NoFlexPageContainer>
      )}
    </>
  );
}
