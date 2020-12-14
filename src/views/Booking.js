import React, { useContext, useEffect, useState, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import MenuBar from "../components/MenuBar";
import BookingCard from "../elements/BookingCard";
import { booking, events, users } from "../api/endpoints";
import Axios from "axios";
import { makeStyles } from "@material-ui/core";
import BookingAddForm from "../elements/BookingAddForm";
import moment from "moment";
import { LoaderDispatchContext } from "../components/Loader";
import Title from "../elements/Title";

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
  const [bookings, setBookings] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleClose = useCallback(() => {
    setAddModalOpen(false);
  }, []);

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
        <Title
          mainText="Bookings"
          ctxText="Please fill out this form to make your reservation come true."
          open={addModalOpen}
          setOpen={setAddModalOpen}
        >
          <BookingAddForm
            events={eventsData}
            users={usersData}
            errorMessage={errorMessage}
            onSubmitBooking={onSubmitBooking}
          />
        </Title>

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
