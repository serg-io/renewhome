import {Header} from 'components/header';
import {PageContainer, Button} from 'components/shared';

/**
 * Order confirmation page, shown after checkout
 */
export function Confirmation(): JSX.Element {
  return (
    <>
      <Header backTo="/menu">
        <h1>Order Submitted!</h1>
      </Header>
      <PageContainer>
        <Button to="/">Start Over</Button>
      </PageContainer>
    </>
  );
}
