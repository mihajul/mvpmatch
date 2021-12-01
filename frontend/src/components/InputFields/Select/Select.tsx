import React from 'react';
import { pick } from 'lodash';
import { Select as MUISelect, FormHelperText, InputLabel } from '@material-ui/core';

import * as S from './Select.styled';
import { SelectProps } from './Select.types';

const Select = (props: SelectProps) => {
  const selectProps = pick(props, ['onChange', 'onBlur', 'value', 'label', 'inputProps', 'input']);

  return (
    <S.Container variant={props.variant}>
      <InputLabel shrink={props.shrinkLabel}>{props.label}</InputLabel>
      <MUISelect {...selectProps} native inputProps={selectProps.inputProps}>
        {props.children}
      </MUISelect>
      {props.helperText && (
        <FormHelperText variant="filled" error={props.error}>
          {props.helperText}
        </FormHelperText>
      )}
    </S.Container>
  );
};

Select.defaultProps = {
  variant: 'outlined',
};

export default Select;
