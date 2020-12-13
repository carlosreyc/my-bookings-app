import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormSelect from "../controls/Select";
import FormDatePicker from "../controls/DatePicker";
import { makeStyles } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import Alert from "@material-ui/lab/Alert";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    height: "100%",
    padding: "0px",
  },
  fullWidth: {
    width: "100%",
  },
  form: {
    width: "250px",
    margin: "auto",
  },
  textCenter: {
    textAlign: "center",
  },
}));

const schema = yup.object().shape({
  userId: yup.string().required(),
  reservation: yup.date().required(),
  eventId: yup.number().required(),
});

const BookingAddForm = React.memo((props) => {
  const { onSubmitBooking, errorMessage, users, events } = props;
  const classes = useStyles();
  const formMethods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      reservation: null,
    },
  });
  const { handleSubmit, errors } = formMethods;
  return (
    <Grid container justify="center" className={classes.grid}>
      <FormProvider {...formMethods}>
        <form className={classes.form}>
          <Grid container alignItems="center" justify="center" spacing={2}>
            <Grid item xs={12}>
              {errorMessage && <Alert severity="error"> {errorMessage} </Alert>}
            </Grid>
            <Grid item xs={12}>
              <FormSelect
                name="userId"
                label="User"
                options={users}
                required={true}
                errorobj={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <FormSelect
                options={events}
                name="eventId"
                label="Event"
                required={true}
                errorobj={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <FormDatePicker name="reservation" label="Reservation" />
            </Grid>
            <Grid item xs={12}>
              <Button
                className={classes.fullWidth}
                variant="contained"
                color="primary"
                onClick={handleSubmit(onSubmitBooking)}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Grid>
  );
});

export default BookingAddForm;
