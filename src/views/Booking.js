import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import MenuBar from "../components/MenuBar";
import Typography from "@material-ui/core/Typography";
import BookingCard from "../elements/BookingCard";
import { booking, events, users } from "../api/endpoints";
import Axios from "axios";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import BookingAddForm from "../elements/BookingAddForm";
import moment from "moment";
import { LoaderDispatchContext } from "../components/Loader";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: "10px",
  },
  addButton: {
    marginLeft: "auto",
  },
  cardContainers: {
    marginTop: "8px",
  },
}));

const Booking = () => {
  const classes = useStyles();
  const dispatch = useContext(LoaderDispatchContext);
  const [open, setOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getBookings = async () => {
      const result = await Axios(booking);

      setBookings(result.data);
    };

    const getUsers = async () => {
      const result = await Axios(users);

      setUsersData(result.data);
    };

    const getEvents = async () => {
      const result = await Axios(events);

      setEventsData(result.data);
    };

    getBookings();
    getUsers();
    getEvents();
  }, []);

  const handleDeleteBooking = async (id) => {
    try {
      dispatch({ type: "LOADING" });
      await Axios({
        baseURL: `${booking}/${id}`,
        method: "DELETE",
      });
      dispatch({ type: "LOADING_OFF" });
      const newStateBookings = [...bookings].filter((item) => id !== item.id);
      setBookings(newStateBookings);
    } catch (error) {
      dispatch({ type: "LOADING_OFF" });
    }
  };

  const onSubmitBooking = async (data) => {
    setErrorMessage(null);
    const dateUnixTime = moment(data.reservation).unix();
    const mappedData = {
      ...data,
      reservation: dateUnixTime,
    };
    try {
      dispatch({ type: "LOADING" });
      const newBooking = await Axios({
        baseURL: booking,
        method: "POST",
        data: mappedData,
      });
      dispatch({ type: "LOADING_OFF" });
      setBookings([...bookings, newBooking.data]);
      handleClose();
    } catch (error) {
      dispatch({ type: "LOADING_OFF" });
      setErrorMessage(error.message);
    }
  };
  return (
    <MenuBar>
      <Grid container>
        <Grid item xs={10} lg={11}>
          <Typography variant="h4" className={classes.title}>
            Bookings{" "}
          </Typography>
        </Grid>
        <Grid item xs={2} lg={1}>
          <Fab color="primary" onClick={handleClickOpen}>
            <AddIcon />
          </Fab>
        </Grid>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="form-dialog-title">Add Booking</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill out this form to make your reservation come true.
            </DialogContentText>
            <BookingAddForm
              events={eventsData}
              users={usersData}
              errorMessage={errorMessage}
              onSubmitBooking={onSubmitBooking}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Grid container spacing={2} className={classes.cardContainers}>
          {bookings &&
            bookings.map((item) => (
              <Grid item xs={12} lg={2}>
                <BookingCard
                  key={item.id}
                  bookingId={item.id}
                  createdAt={item.createdAt}
                  reservation={item.reservation}
                  eventId={item.eventId}
                  handleDeleteBooking={handleDeleteBooking}
                />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </MenuBar>
  );
};

export default Booking;
