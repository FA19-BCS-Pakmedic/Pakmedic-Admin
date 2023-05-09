import { Helmet } from 'react-helmet-async';
import React, { useEffect, useState } from 'react';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';

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
  Modal,
  Box,
  Grid,
  TextareaAutosize,
} from '@mui/material';
import { style } from '@mui/system';

// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';

// styles
import classes from '../styles/ComplaintModal.module.css';

import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

import COMPLAINTS from '../_mock/complaint';

const TABLE_HEAD = [
  { id: 'complainee', label: 'Complainee Name', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'complainant', label: 'Complainant', alignRight: false },
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
];

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
    return filter(array, (_user) => _user.complaineeName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const ComplaintsPage = () => {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('complaineeName');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const handleOpenMenu = (event, row) => {
    setSelectedComplaint(row);
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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = COMPLAINTS.map((n) => n.complaineeName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // const handleClick = (event, complaineeName) => {
  //   const selectedIndex = selected.indexOf(complaineeName);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, complaineeName);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
  //   }
  //   setSelected(newSelected);
  // };

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - COMPLAINTS.length) : 0;

  const filteredComplaints = applySortFilter(COMPLAINTS, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredComplaints.length && !!filterName;

  const openModal = () => {
    console.log(selectedComplaint);

    return (
      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <Container
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'fit-content',
          }}
        >
          <Box sx={style} className={classes.modalContainer}>
            <Typography id="modal-modal-title" variant="h2" component="h2">
              Complaint
            </Typography>
            <Typography variant="secondary" color="GrayText" sx={{ mt: 1 }}>
              {`Ticket#${selectedComplaint?.ticketNumber}`}
            </Typography>

            <Container>
              <div className={classes.statusContainer}>
                <Typography variant="h6">Title</Typography>
                <Label
                  style={{
                    backgroundColor: `
                    ${
                      selectedComplaint?.status === 'On Hold'
                        ? '#F86D6D'
                        : selectedComplaint?.status === 'Resolved'
                        ? '#6DD17F'
                        : '#F8B76D'
                    }
                    `,
                    color: '#fff',
                  }}
                >
                  {selectedComplaint?.status}
                </Label>
              </div>
              <Typography variant="p">{selectedComplaint?.title}</Typography>
            </Container>

            <Container sx={{ mt: 2 }}>
              <Typography variant="h6">Description</Typography>
              <Typography variant="p">{selectedComplaint?.description}</Typography>
            </Container>

            <Container sx={{ mt: 2 }}>
              <Typography variant="h6">Complainee</Typography>
              <div className={classes.complaineeInfoContainer}>
                <Avatar sx={{ width: 100, height: 100 }} src="/assets/images/avatars/avatar_1.jpg" />
                <div className={classes.complaineeInfo}>
                  <Typography variant="p">{selectedComplaint?.complaineeName}</Typography>
                  <Typography variant="p">test@gmail.com</Typography>
                </div>
              </div>
            </Container>

            {/* Add a review section */}
            <Container sx={{ mt: 2 }}>
              <Typography variant="h4">Add your review</Typography>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Add your review here"
                className={classes.reviewInput}
              />
            </Container>

            {/* Controls */}
            <Container sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Button
                    variant="contained"
                    style={{ background: '#F86D6D' }}
                    onClick={() => setIsModalOpen(false)}
                    className={classes.control}
                  >
                    Set on hold
                  </Button>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Button
                    variant="contained"
                    style={{ background: '#6DD17F' }}
                    onClick={() => setIsModalOpen(false)}
                    className={classes.control}
                  >
                    Resolve
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Container>
      </Modal>
    );
  };

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      {openModal()}

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Complaint
          </Typography>
          {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button> */}
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
                  rowCount={COMPLAINTS.length}
                  onRequestSort={handleRequestSort}
                  //   onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredComplaints.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, complaineeName, role, status, complainantName, title } = row;
                    const selectedUser = selected.indexOf(complaineeName) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          {/* <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, complaineeName)} /> */}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {/* <Avatar alt={complaineeName} src={avatarUrl} /> */}
                            <Typography variant="subtitle2" noWrap>
                              {complaineeName}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{role}</TableCell>

                        <TableCell align="left">{complainantName}</TableCell>

                        <TableCell align="left">{title}</TableCell>

                        <TableCell align="left">
                          <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
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
            count={COMPLAINTS.length}
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
        <MenuItem
          onClick={() => {
            setIsModalOpen(true);
            handleCloseMenu();
          }}
        >
          <Iconify icon={'eva:eye-fill'} sx={{ mr: 2 }} />
          View Details
        </MenuItem>

        {/* <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem> */}
      </Popover>
    </>
  );
};

export default ComplaintsPage;
