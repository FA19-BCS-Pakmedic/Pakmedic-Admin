import React from 'react'
import {
    Button,
    CircularProgress,
    Modal,
    Typography,
} from '@mui/material';


import classes from '../../styles/ConfirmationModal.module.css';

const ConfirmationModal = ({isOpen, setIsOpen, onClickConfirm, isBtnLoading}) => {
  return (
    // generate a confirmation modal

    <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <div className={classes.modalContainer}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Are you sure?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                This action cannot be undone.
            </Typography>
            <div className={classes.controls}>
                <Button variant="contained" onClick={() => setIsOpen(false)}>Cancel</Button>

                <Button variant="contained" onClick={onClickConfirm}>
                    {
                        isBtnLoading && <CircularProgress size={20} color="inherit" sx={{mr: 1}}/>
                    }
                    Confirm</Button>
            </div>
        </div>
    </Modal>


  )
}

export default ConfirmationModal