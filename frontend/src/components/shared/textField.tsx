import React, {ChangeEvent, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styled, {css} from 'styled-components';
import {WithComponentProps} from 'types';

/**
 * Wrapper
 */
const StyledLabel = styled.label`
  display: inline-block;
  position: relative;
  vertical-align: top;
`;

/**
 * Input element
 */
const StyledInput = styled.input`
  ${({theme}) => css`
    appearance: none;
    background-color: transparent;
    border: ${theme.standard.border};
    border-color: ${theme.color.grey}
    color: ${theme.text.color};
    display: block;
    font-size: 16px;
    padding: 25px 15px 8px;
    height: 55px;
    border-radius: 2px;
    width: 100%;

    &:focus,
    &.hasError {
      border: 2px solid ${theme.text.color};
      outline: none;
      padding-left: 14px;
    }

    &.hasError:not(:focus) {
      border: solid 2px ${theme.color.error};
    }
  `}
`;

/**
 * Form field label
 */
const StyledLabelText = styled.span`
  ${({theme}) => css`
    color: ${theme.text.color};
    font-size: 16px;
    left: 15px;
    pointer-events: none;
    position: absolute;
    top: 17px;
    transition: all 250ms;

    ${StyledInput}:focus ~ &,
    ${StyledInput}.filled ~ & {
      font-size: 12px;
      top: 8px;
    }
  `}
`;

/**
 * Error text style within the field
 */
const StyledErrorText = styled.span`
  ${({theme}) => css`
    color: ${theme.color.error};
    display: block;
    font-size: 12px;
    font-weight: 600;
    padding: 5px 15px;
  `}
`;

/**
 * Generic text form field
 */
export function TextField({
  id,
  type,
  value: initialValue,
  error,
  ...props
}: WithComponentProps<'input', {error?: string; label?: string}>): JSX.Element {
  const [value, setValue] = useState(initialValue);
  useEffect(() => setValue(initialValue), [initialValue]);

  function handleValueChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    if (props.onChange) props.onChange(event);
  }

  return (
    <StyledLabel className={props.className} htmlFor={id}>
      <StyledInput
        className={cx({filled: !!value, hasError: error}, props.className)}
        {...{id, type, value, ...props}}
        onChange={handleValueChange}
        aria-labelledby={`${id}-label`}
        aria-describedby={`${id}-error`}
        aria-disabled={props.disabled}
        aria-required={props.required}
        aria-invalid={!!error}
      />
      <StyledLabelText id={`${id}-label`}>{props.label}</StyledLabelText>
      {error && (
        <StyledErrorText id={`${id}-error`} role="alert">
          {error}
        </StyledErrorText>
      )}
    </StyledLabel>
  );
}

TextField.propTypes = {
  onChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['email', 'number', 'password', 'tel', 'text']),
  error: PropTypes.string,
};

TextField.defaultProps = {
  onChange: () => {},
  type: 'text',
  value: '',
};
