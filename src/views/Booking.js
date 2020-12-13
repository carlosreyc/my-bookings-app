import React from 'react'
import app from '../firebase';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
const Booking = () => {

    return (
        <Grid>
            <h1>Bookings</h1>
            <Button
                variant="contained"
                color="primary"
                onClick={() => app.auth().signOut()}
            >Sign out</Button>
        </Grid>
    )
}

export default Booking;