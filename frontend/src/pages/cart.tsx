import {Header} from 'components/header';
import {PageContainer, FormLineWrapper, TextField, Button} from 'components/shared';
import {SandwichCard} from 'components/sandwichCard';
import {CustomerPhoneEntryDialog} from 'components/customerPhoneEntryDialog';
import {useOrder, useUpdateOrder} from 'hooks/orderActions';
import styled from 'styled-components';
import {OrderItem, Sandwich} from 'types';
import {useState, ChangeEvent} from 'react';

/**
 * Order items list
 */
const SandwichList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: auto;
  align-items: stretch;
`;

/**
 * Row actions, within each order item
 */
const StyledRowActions = styled.div`
  height: 100%;
  align-items: center;
  justify-content: end;
  display: flex;
  gap: 8px;

  @media (width < 700px) {
    flex-direction: column;
  }
`;

/**
 * Styled cart actions dispalyed at the top of the cart
 */
const StyledCartActions = styled.div`
  flex-direction: row;
  gap: 16px;
  display: flex;
`;

/**
 * Cart Page component
 */
export function Cart(): JSX.Element {
  const order = useOrder(true);
  const update = useUpdateOrder();

  const orderItems = order?.items.filter(i => !!i.sandwich) || [];

  return (
    <>
      <Header backTo="/menu">
        <h1>Cart</h1>
      </Header>
      <PageContainer>
        {orderItems.length ? (
          <>
            <StyledCartActions>
              <Button to="/menu">Keep Shopping</Button>
              {/* the customer phone entry dialog handles submitting the order */}
              <CustomerPhoneEntryDialog>
                <Button>Checkout</Button>
              </CustomerPhoneEntryDialog>
            </StyledCartActions>
            <SandwichList>
              {orderItems.map((i, idx) => (
                <SandwichCard
                  sandwich={i.sandwich as Sandwich}
                  orientation="horizontal"
                  key={(i.sandwich as Sandwich).id + idx}
                >
                  <StyledRowActions>
                    <QuantityInput orderItem={i} />
                    <Button onClick={() => update(i.sandwich_id, 0)}>Remove</Button>
                  </StyledRowActions>
                </SandwichCard>
              ))}
            </SandwichList>
          </>
        ) : (
          <>
            <p>Your cart is empty</p>
            <Button to="/menu">Back to Menu</Button>
          </>
        )}
      </PageContainer>
    </>
  );
}

const QtyFormLineWrapper = styled(FormLineWrapper)`
  width: 50px;
`;

/**
 * Component displaying an order item update quantity field and save button
 */
function QuantityInput({orderItem}: {orderItem: OrderItem}): JSX.Element {
  const [pendingQty, setPendingQty] = useState<number | null>(orderItem.quantity);
  const update = useUpdateOrder();

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setPendingQty(e.target.value ? parseInt(e.target.value) : null);
  }

  return (
    <>
      <QtyFormLineWrapper>
        <TextField
          id={orderItem.id.toString()}
          value={orderItem.quantity}
          pattern="[0-9]*"
          label="Qty"
          onChange={handleOnChange}
        />
      </QtyFormLineWrapper>
      {orderItem.quantity !== pendingQty ? (
        <Button
          disabled={pendingQty !== 0 && !pendingQty}
          onClick={() => {
            if (pendingQty) update(orderItem.sandwich_id, pendingQty);
          }}
        >
          Save
        </Button>
      ) : null}
    </>
  );
}
