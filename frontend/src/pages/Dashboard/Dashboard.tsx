import { DataGrid, GridAlignment, GridRenderCellParams } from '@mui/x-data-grid';
import { useHistory } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';
import { IconButton } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import DefaultPage from '../../layouts/DefaultLayout/DefaultLayout';
import MainTitle from '../../components/MainTitle/MainTitle';
import { ROUTES } from '../routes';
import Button from '../../components/Button/Button';
import { Roles } from '../../types/user';
import { Product } from '../../types/product';
import * as S from './Dashboard.styled';
import {
  useCurrentSessionQuery,
  useDeleteProductMutation,
  useGetCurrentUserQuery,
  useGetProductsQuery,
  useLogoutAllMutation,
  useResetMutation,
} from '../../api';

const Dashboard = () => {
  const { data: currentUser } = useGetCurrentUserQuery();
  const { data: currentSessionData } = useCurrentSessionQuery();
  const { data: products } = useGetProductsQuery(currentUser?.role === Roles.Seller ? currentUser.id : undefined);
  const [deleteProduct] = useDeleteProductMutation();
  const [resetDeposit] = useResetMutation();
  const [logoutAll] = useLogoutAllMutation();

  const history = useHistory();
  const confirm = useConfirm();

  const handleDelete = async (id: string) => {
    await confirm({ description: 'This action is permanent!' });
    deleteProduct(id);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 300 },
    {
      field: 'productName',
      headerName: 'Name',
      width: 300,
    },
    {
      field: 'amountAvailable',
      headerName: 'Amount',
      type: 'number',
    },
    {
      field: 'cost',
      headerName: 'Cost',
      type: 'number',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      align: 'center' as GridAlignment,
      headerAlign: 'center' as GridAlignment,
      flex: 1,
      renderCell: (params: GridRenderCellParams<Product>) => (
        <>
          {currentUser?.role === Roles.Seller && (
            <>
              <IconButton aria-label="delete" onClick={() => handleDelete(params.id as string)}>
                <DeleteIcon />
              </IconButton>
              <IconButton aria-label="edit" onClick={() => history.push(`${ROUTES.EDIT_PRODUCT}/${params.id}`)}>
                <EditIcon />
              </IconButton>
            </>
          )}
          {currentUser?.role === Roles.Buyer && (
            <IconButton color="primary" aria-label="add to shopping cart">
              <AddShoppingCartIcon onClick={() => history.push(`${ROUTES.BUY}/${params.id}`)} />
            </IconButton>
          )}
        </>
      ),
    },
  ];

  return (
    <DefaultPage>
      <MainTitle>Welcome {currentUser?.username}</MainTitle>
      <S.CardWrapper>
        {currentSessionData?.sessions !== undefined && currentSessionData?.sessions > 1 && (
          <>
            <S.SessionWarning>There is already an active session using your account</S.SessionWarning>
            <Button onClick={() => logoutAll()}>Logout other sessions</Button>
          </>
        )}

        <S.GridContainer>
          <DataGrid rows={products ?? []} columns={columns} disableSelectionOnClick />
        </S.GridContainer>
        <S.ButtonsContainer>
          {currentUser?.role === Roles.Seller && (
            <Button onClick={() => history.push(ROUTES.ADD_PRODUCT)}>Add Product</Button>
          )}
          {currentUser?.role === Roles.Buyer && (
            <>
              <Button onClick={() => history.push(ROUTES.DEPOSIT)}>Deposit coins</Button>
              <Button onClick={() => resetDeposit()}>Reset</Button>
              <S.Deposit>Current Deposit: {currentUser?.deposit} cents</S.Deposit>
            </>
          )}
        </S.ButtonsContainer>
      </S.CardWrapper>
    </DefaultPage>
  );
};
export default Dashboard;
