import { CircularProgressProps } from '@material-ui/core';

import * as S from './Loading.styled';

const Loading = (props: CircularProgressProps) => <S.Progress {...props} />;

export default Loading;
