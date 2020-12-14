import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import moment from "moment";
const useStyles = makeStyles({
  root: {
    minWidth: 100,
  },
  title: {
    fontSize: 14,
  },
});

const BookingCard = (props) => {
  const [open, setOpen] = useState(false);
  const {
    bookingId,
    createdAt,
    reservation,
    eventId,
    handleDeleteBooking,
  } = props;
  const date = new Date(createdAt);
  const reservationDate = moment.unix(reservation).format("DD/MM/YYYY");
  const classes = useStyles();

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleAcceptDelete = useCallback(() => {
    setOpen(false);
    handleDeleteBooking(bookingId);
  }, [bookingId, handleDeleteBooking]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            <Link
              component={RouterLink}
              to={{
                pathname: `/events/${eventId}`,
              }}
            >
              Event {eventId}
            </Link>
          </Typography>
          <Typography className={classes.title} gutterBottom>
            Date Reserved: {reservationDate}
          </Typography>

          <Typography color="textSecondary" gutterBottom component="p">
            Created at: {date.toLocaleDateString()}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton color="secondary" onClick={handleOpen}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Booking</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to remove this booking?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleAcceptDelete} color="secondary">
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

BookingCard.propTypes = {
  bookingId: PropTypes.string,
  createdAt: PropTypes.string,
  eventId: PropTypes.number,
  reservation: PropTypes.number,
  handleDeleteBooking: PropTypes.func.isRequired,
};

export default React.memo(BookingCard);
