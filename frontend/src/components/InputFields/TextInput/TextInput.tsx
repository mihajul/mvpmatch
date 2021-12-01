import { TextFieldProps } from '@material-ui/core';
import React from 'react';

import { TextFieldWithStyles } from './TextInput.styles';

function TextInput(props: TextFieldProps) {
  return <TextFieldWithStyles {...props} />;
}

TextInput.defaultProps = {
  variant: 'outlined',
  margin: 'normal',
};

export default TextInput;
