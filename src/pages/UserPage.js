import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERS from '../_mock/user';
import { useApi } from '../hooks/useApi';
import { baseUrl, getAllUsers, updateUser } from '../utils/api';
import Loading from '../components/loading/Loading';
import Error from '../components/error/Error';
import ConfirmationModal from '../components/confirmation-modal/ConfirmationModal';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'gender', label: 'Gender', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 || _user.status.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [USERS, setUSERS] = useState([]);

  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState("");

  const [selectedUser, setSelectedUser] = useState("");

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);


  const {
    data: users,
    error,
    isLoading,
    refetch: fetchData
  } = useApi();

  const fetch = () => {
    fetchData(
      () => {
        return getAllUsers()
      }
    );
  }

  useEffect(() => {
    fetch();
  }, []);


  useEffect(() => {
    console.log(users);
    if(users && users.status === 'success'){
      setUSERS(users.data.users);
    }
  }, [users]);

  const handleOpenMenu = (event, user) => {
    setSelectedUser(user);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  
  const handleStatusChange = async() => {
    setIsBtnLoading(true);
    try {
      await updateUser(selectedUser._id, { status: selectedStatus, role: selectedUser.role });

      fetch();
    }catch(err) {
      console.log(err);
    }finally {
      setIsBtnLoading(false);
      setIsConfirmOpen(false);
    }
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERS.length) : 0;

  const filteredUsers = applySortFilter(USERS, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;


  useEffect(() => {
    console.log(selectedStatus, selectedUser)
  }, [selectedStatus, selectedUser])

  const onMenuItemClicked = (status) => {
    setOpen(null);
    setSelectedStatus(status);
    setIsConfirmOpen(true);
  }

  if(isLoading) return <Loading message="Loading Users..."/>

  if(error) return <Error message="Error loading users" />

  return (
    <> 
      <ConfirmationModal
        isOpen={isConfirmOpen}
        setIsOpen={setIsConfirmOpen}
        onClickConfirm={handleStatusChange}
        isBtnLoading={isBtnLoading}
      />
      {/* <Helmet
        
      >
        <title> User | Minimal UI </title>
        
      </Helmet> */}

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERS.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id, name, role, status, gender, avatar, isVerified } = row;

                    console.log(row);

                    return (
                      <TableRow hover key={_id} tabIndex={-1} role="checkbox" >
                        <TableCell padding="checkbox" />

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={`${baseUrl}files/${avatar}`} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{gender}</TableCell>

                        <TableCell align="left">{role}</TableCell>

                        <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>

                        <TableCell align="left">
                          <Label style={{
                                  backgroundColor: `
                                  ${
                                    status === "Banned"
                                      ? '#F86D6D'
                                      : status === "Warned"
                                      ? '#F8B76D'
                                      : '#6DD17F'
                                  }
                                  `,
                    color: '#fff',
                  }}>{sentenceCase(status)}</Label>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e, row)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERS.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={() => {onMenuItemClicked("Warned")}} sx={{color: '#F8B76D'}}>
          <Iconify icon={'eva:alert-triangle-fill'} sx={{ mr: 2 }} />
          Warn user
        </MenuItem>

{selectedUser.status === "Banned" ? <MenuItem sx={{ color: 'success.main' }} onClick={() => {onMenuItemClicked("Active")}}>
          <Iconify icon={'eva:checkmark-circle-fill'} sx={{ mr: 2 }} /> 
          Unban user
        </MenuItem> :
      
        <MenuItem sx={{ color: 'error.main' }} onClick={() => {onMenuItemClicked("Banned")}}>
          <Iconify icon={'eva:close-circle-fill'} sx={{ mr: 2 }} />
          Ban user
        </MenuItem>}
      </Popover>
    </>
  );
}
