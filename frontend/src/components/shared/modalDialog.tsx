import React, {useEffect, useState} from 'react';
import {
  useDialogState,
  Dialog as BaseDialog,
  DialogDisclosure,
  DialogBackdrop,
} from 'reakit/Dialog';
import styled, {css} from 'styled-components';
import {WithComponentProps} from 'types';

/**
 * The backdrop which shows behind the dialog when it is open
 */
const StyledDialogBackdrop = styled(DialogBackdrop)<{blur: string}>`
  ${({theme, blur}) => css`
    background-color: ${blur === 'yes' ? theme.color.primary : `rgba(0, 0, 0, 0.5)`};
    backdrop-filter: ${blur === 'yes' ? 'blur(5px)' : 'none'};
    height: 100%;
    overflow: auto;
    padding: 100px 15px 32px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 3;
  `}
`;

/**
 * The dialog container itself
 */
const StyledDialog = styled(BaseDialog)`
  ${({theme}) => css`
    background-color: ${theme.color.contentBackground};
    border-radius: 5px;
    box-shadow: ${theme.standard.boxShadow};
    color: ${theme.text.color};
    margin: 0 auto;
    max-width: 425px;
    padding: 25px 24px;

    @media (min-width: 321px) {
      padding: 25px 32px;
    }

    &:focus {
      outline: none;
    }
  `}
`;

/**
 * Layout wrapper surrounding close button
 */
const CloseButtonWrapper = styled.div`
  margin: 0 auto;
  position: relative;
  text-align: right;
`;

/**
 * Dialog close button
 */
const CloseButton = styled.button`
  appearance: none;
  border: none;
  background: none;
  position: absolute;
  height: 16px;
  padding: 0;
  width: 16px;
  cursor: pointer;
  top: -8px;
  right: -16px;
  svg {
    pointer-events: none;
    width: 16px;
    height: 16px;
  }
`;

/**
 * Generic styled modal dialog component, built from the reakit dialog
 * The `disclosure` prop takes a `JSX.Element` to display a custom disclosure,
 * and component children are passed in as the dialog contents.
 */
export function ModalDialog({
  disclosure,
  label,
  isAlert,
  isVisible,
  returnFocusRef,
  closeButton,
  alignToTop,
  blur = 'no',
  onDismiss = () => {},
  ...props
}: WithComponentProps<
  typeof StyledDialog,
  {
    disclosure: JSX.Element;
    label?: string;
    isAlert?: boolean;
    isVisible?: boolean;
    returnFocusRef?: React.RefObject<HTMLElement>;
    closeButton?: boolean;
    onDismiss?: () => void;
    alignToTop?: boolean;
    blur?: string;
  }
>): JSX.Element {
  const dialog = useDialogState();
  const [seen, setSeen] = useState(false);
  const {children} = props;

  useEffect(() => {
    if (!seen && isVisible) {
      setSeen(!seen);
      dialog.toggle();
    }
  }, [dialog, isVisible, seen]);

  return (
    <>
      {disclosure && (
        <DialogDisclosure {...dialog} {...disclosure.props}>
          {disclosureProps => React.cloneElement(disclosure, disclosureProps)}
        </DialogDisclosure>
      )}
      <StyledDialogBackdrop
        {...dialog}
        {...{blur}}
        style={alignToTop ? {paddingTop: '20px'} : undefined}
      >
        <StyledDialog
          {...dialog}
          aria-label={label}
          role={isAlert && 'alertdialog'}
          tabIndex={0}
          {...props}
          // Listen for clicks bubbling from elements marked as close buttons:
          onClick={(event: any) =>
            event.target.dataset.dialogDismiss && (onDismiss(), dialog.hide())
          }
          unstable_finalFocusRef={!disclosure ? returnFocusRef : undefined}
        >
          {closeButton ? (
            <CloseButtonWrapper>
              <CloseButton data-dialog-dismiss>X</CloseButton>
            </CloseButtonWrapper>
          ) : null}
          {children}
        </StyledDialog>
      </StyledDialogBackdrop>
    </>
  );
}
