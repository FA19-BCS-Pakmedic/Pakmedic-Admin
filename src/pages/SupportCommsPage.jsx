import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async';
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
  TextField,
} from '@mui/material';

import { style } from '@mui/system';


// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import Loading from '../components/loading/Loading';
import Error from '../components/error/Error';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

import {useApi} from '../hooks/useApi';

import {
  getCommunities, createCommunity
} from '../utils/api';


import classes from '../styles/CommunityModal.module.css';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'tags', label: 'Tags', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'totalMembers', label: 'Total Members', alignRight: false },
  { id: '' },
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
  console.log(stabilizedThis)
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}






const SupportCommsPage = () => {

  const {
    data,
    isLoading,
    error,
    refetch: fetchData
  } = useApi();

  const [communities, setCommunities] = useState([]);

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [query, setQuery] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedCommunity, setSelectedCommunity] = useState(null);


  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');


  const handleInputChange = (event) => {
    setCurrentTag(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      addKeyword();
    } else if (event.key === 'Backspace' && currentTag === '') {
      removeLastKeyword();
    }
  };

  const addKeyword = () => {
    if (currentTag.trim() !== '') {
      setTags((prevKeywords) => [...prevKeywords, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeKeyword = (keyword) => {
    setTags((prevKeywords) => prevKeywords.filter((kw) => kw !== keyword));
  };

  const removeLastKeyword = () => {
    setTags((prevKeywords) => prevKeywords.slice(0, -1));
  };


  const openCommunityModal = () => {
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
            width: '600px',
          }}
        >
          <Box sx={style} className={classes.modalContainer}>
          <Typography id="modal-modal-title" variant="h2" component="h2">
              Community
            </Typography>


            <Container sx={{ mt: 2 }}>
              <Typography variant="h6">Community Name</Typography>
              {/* <Typography variant="p">{selectedRequest?.requestType}</Typography> */}
              <TextField 
                id="outlined-basic"
                label="Enter community name"
                variant="outlined"
                fullWidth
                // value={selectedRequest?.requestType}
                // onChange={(e) => {
                //   setSelectedRequest({
                //     ...selectedRequest,
                //     requestType: e.target.value,
                //   });
                // }}
              />
            </Container>


            <Container sx={{ mt: 2 }}>
              {/* input to add multiple tags */}
              <Typography variant="h6">Tags</Typography>
              <TextField
                id="outlined-basic"
                label="Enter tags separated by spaces"
                variant="outlined"
                fullWidth
                // value={selectedRequest?.requestType}
                // onChange={(e) => {
                //   setSelectedRequest({
                //     ...selectedRequest,
                //     requestType: e.target.value,
                //   });
                // }}
              />
            </Container>

            <Container sx={{ mt: 2 }}>
              {/* input to add multiple tags */}
              <Typography variant="h6">Description</Typography>
              <TextField
                id="outlined-basic"
                label="Enter description of community"
                variant="outlined"
                fullWidth
                value={currentTag}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}

                // value={selectedRequest?.requestType}
                // onChange={(e) => {
                //   setSelectedRequest({
                //     ...selectedRequest,
                //     requestType: e.target.value,
                //   });
                // }}
              />

<div>
        {tags.map((tag, index) => (
          <div key={index} className="keyword-capsule">
            {tag}
            <span className="remove-button" onClick={() => removeKeyword(tag)}>
              &times;
            </span>
          </div>
        ))}
      </div>
            </Container>

          </Box>

          </Container>
      </Modal>
    )
  }



  useEffect(() => {
    fetchData(
      () => {
        return getCommunities(query)
      }
    );
  }, [query])

    useEffect(() => {
      if(data) {
        setCommunities(data.data.data);
      }
    }, [data]);

    useEffect(() => {
        console.log(filterName);
    }, [filterName])

    const onBlur = () => {

      if(filterName) {
        const query = `name=${filterName}`;
        setQuery(query);
      }else {
        setQuery(null);
      }

    }

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    // const handleSelectAllClick = (event) => {
    //   if (event.target.checked) {
    //     const newSelecteds = communitites.map((n) => n.name);
    //     setSelected(newSelecteds);
    //     return;
    //   }
    //   setSelected([]);
    // };
  
    // const handleClick = (event, name) => {
    //   const selectedIndex = selected.indexOf(name);
    //   let newSelected = [];
    //   if (selectedIndex === -1) {
    //     newSelected = newSelected.concat(selected, name);
    //   } else if (selectedIndex === 0) {
    //     newSelected = newSelected.concat(selected.slice(1));
    //   } else if (selectedIndex === selected.length - 1) {
    //     newSelected = newSelected.concat(selected.slice(0, -1));
    //   } else if (selectedIndex > 0) {
    //     newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    //   }
      // setSelected(newSelected);
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

  const getTags = (tags) => {
    let tagString = '';
    tags.forEach((tag, index) => {
      if (index === tags.length - 1) {
        tagString += tag;
      } else {
        tagString += `${tag}, `;
      }
    });
    return tagString;
  }


  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };


  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - communities?.length) : 0;

  const filteredResults = applySortFilter(communities, getComparator(order, orderBy), filterName);

  const isNotFound = !communities?.length && !!filterName;

    if(isLoading) return <Loading message="Loading Communities..."/>

    if(error) return <Error message="Error loading communities" />

  return (
    <>

      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        {openCommunityModal()}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setIsModalOpen(true)}> 
            New User
          </Button>
        </Stack>

        <Card>
          <UserListToolbar 
              filterName={filterName} onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={communities.length}
                  // numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  // onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                {filteredResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id: id, name, tags, description, totalMember } = row;
                    // const selectedUser = selected.indexOf(name) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox">
                        <TableCell padding="checkbox">
                          {/* <Checkbox onChange={(event) => handleClick(event, name)} /> */}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          {/* <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatarUrl} />
                          </Stack> */}
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                        </TableCell>

                        <TableCell align="left">{getTags(tags)}</TableCell>

                        <TableCell align="left">{description.slice(0, 30)}...</TableCell>

                        <TableCell align="left">{totalMember}</TableCell>

                        {/* <TableCell align="left">
                          <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                        </TableCell> */}

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
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
            count={communities?.length}
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
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  )
}

export default SupportCommsPage