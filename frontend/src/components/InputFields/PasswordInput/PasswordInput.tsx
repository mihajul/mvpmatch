import React, { MouseEvent } from 'react';
import { InputAdornment, TextFieldProps } from '@material-ui/core';

import TextInput from '../TextInput/TextInput';
import { ToggleShowHideLink } from './PasswordInput.styled';

function PasswordInput(props: TextFieldProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showLink, setShowLink] = React.useState(false);
  const [value, setValue] = React.useState('');
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: MouseEvent) => event.preventDefault();
  const handlePasswordChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (props.onChange) {
      props.onChange(event);
    }
    setShowLink(event.target.value.length > 0);
  };

  const adornment = (
    <InputAdornment position="end">
      {showLink ? (
        <ToggleShowHideLink onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
          {showPassword ? 'HIDE' : 'SHOW'}
        </ToggleShowHideLink>
      ) : (
        <span></span>
      )}
    </InputAdornment>
  );

  const inputProps = {
    endAdornment: adornment,
  };
  return (
    <TextInput
      {...props}
      type={showPassword ? 'text' : 'password'}
      InputProps={inputProps}
      value={value}
      onChange={handlePasswordChangeEvent}
    />
  );
}

export default PasswordInput;
