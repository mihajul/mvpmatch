import { InputBaseComponentProps } from '@material-ui/core';
import { SelectInputProps } from '@material-ui/core/Select/SelectInput';

export type SelectProps = {
  label?: string | JSX.Element;
  shrinkLabel?: boolean;
  helperText?: string;
  error?: boolean;
  onChange?: SelectInputProps['onChange'];
  onBlur?: SelectInputProps['onBlur'];
  children: React.ReactNode;
  variant?: SelectInputProps['variant'];
  inputProps?: InputBaseComponentProps;
  input?: React.ReactElement;
};
