import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Container } from '@material-ui/core';
import { Create as UpdateIcon, Delete as DeleteIcon } from '@material-ui/icons';
import Header from "../../components/Header";

import api from "../../api/index";

// Redux
import { getBooks } from "../../redux/actions/books";
import {useSelector } from "react-redux"
import { useDispatch } from "react-redux"


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  let { books, row } = useSelector((state) => ({...state}));
  const dispatch = useDispatch();
  let selectedRow  = row;

   // Dialog Open
   const handleClickOpen = (row) => {
     dispatch({
      type: "ROW",
      payload: {
        row: row
      }
    });
    setOpen(true);
};

  // Dialog Open
  const handleClose = () => {
    setOpen(false);
    dispatch({
      type: "ROW",
      payload: {
        row: null
      }
    });
};

  const handleDeletePackage = (book) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await api
          .deleteBook(book.id);
        if (!response) reject();
        resolve();
        dispatch({
          type: "BOOK_DELETED",
          payload: {
              book: book
          }
        });
      } catch (err) {
        console.log(err)
        reject(err);
      }
    });
  };

  useEffect(() => {
    getBooks(dispatch);
   }, []);

  return (
    <div>
    <Header />
    <Container>
    <TableContainer component={Paper} style={{marginTop: 50}}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Full Name</TableCell>
                        <TableCell align="right">Author</TableCell>
                        <TableCell align="right">Year</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right">Update</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books && books.map((row, key) => (
                        <TableRow key={key.id} >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">
                              {row.author}
                              </TableCell>
                            <TableCell align="right">
                              {row.year}
                              </TableCell>
                            <TableCell align="right">
                              {/* {row.to} */}
                              </TableCell>
                            <TableCell align="right">
                              </TableCell>
                            <TableCell align="right">
                              </TableCell>
                            <TableCell align="right"> <Button variant="contained" color="primary" size="small" className={classes.button} 
                            onClick={() => handleClickOpen(row)} 
                            startIcon={<UpdateIcon />}>Update</Button></TableCell>
                            <TableCell align="right"><Button variant="contained" color="secondary" size="small" className={classes.button} 
                            onClick={() => handleDeletePackage(row)}
                             startIcon={<DeleteIcon />}>Delete</Button></TableCell>
                        </TableRow>
                    ))}                    
                    <UpdateDialog open={selectedRow ? true: false} handleClose={handleClose} row={selectedRow}/>
                </TableBody>
            </Table>
        </TableContainer>
        </Container>
    </div>
  );
}

const UpdateDialog = ({ open, handleClose, row }) => {
  const [name, setName] = useState();
  const [author, setAuthor] = useState();
  const [year, setYear] = useState();
  const dispatch = useDispatch();

  const handleUpdateBook = (book) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await api
          .updateBook(book.id, book);
        if (!response) reject();
        resolve();
        dispatch({
          type: "BOOK_UPDATED",
          payload: {
              book: book
          }
        });
        handleClose();
      } catch (err) {
        console.log(err)
        reject(err);
      }
    });
  };

  const handleSaveBook = (book) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await api
          .saveBook(book.id, book);
        if (!response) reject();
        resolve();
        dispatch({
          type: "BOOK_SAVE",
          payload: {
              book: book
          }
        });
        handleClose();
      } catch (err) {
        console.log(err)
        reject(err);
      }
    });
  };

  useEffect(() => {
    if (row) { setName(row.name); setAuthor(row.author); setYear(row.year) }
}, [row]);
  return (
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Edit Book</DialogTitle>
    <DialogContent>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="name"
                    name="name"
                    label="Full name"
                    fullWidth
                    defaultValue={row ? row.name: ""}
                    autoComplete="given-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="author"
                    name="author"
                    label="Author"
                    fullWidth
                    defaultValue={row ? row.author : ""}
                    autoComplete="given-name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="year"
                    name="year"
                    label="Year"
                    fullWidth
                    defaultValue={row ? row.year : ""}
                    autoComplete="given-name"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
            </Grid>
        </Grid>
    </DialogContent>

    <DialogActions>
        <Button onClick={handleClose} color="secondary">
            Cancel
    </Button>
        <Button
         onClick={() => handleUpdateBook({
           ...row,
           year: year,
           name: name,
           author: author
          })}
         color="primary">
            Update
    </Button>
    <Button
         onClick={() => handleSaveBook({
           ...row,
           year: year,
           name: name,
           author: author
          })}
         color="primary">
            Save
    </Button>
    </DialogActions>
</Dialog>
  );
};