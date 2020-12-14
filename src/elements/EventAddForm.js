import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormInput from "../controls/Input";
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
  name: yup.string().required(),
  description: yup.string().required(),
});

const EventAddForm = React.memo((props) => {
  const { onSubmitEvent, errorMessage } = props;
  const classes = useStyles();
  const formMethods = useForm({
    resolver: yupResolver(schema),
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
              <FormInput
                name="name"
                label="Name"
                required={true}
                errorobj={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                name="description"
                label="Description"
                required={true}
                errorobj={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                className={classes.fullWidth}
                variant="contained"
                color="primary"
                onClick={handleSubmit(onSubmitEvent)}
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

export default EventAddForm;
