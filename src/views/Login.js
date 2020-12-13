import React, { useContext, useState } from "react";
import app, { signInWithGoogle } from "../firebase";
import { useForm, FormProvider } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormInput from "../controls/Input";
import { makeStyles } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Redirect, withRouter } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import MenuBar from "../components/MenuBar";
import Alert from "@material-ui/lab/Alert";

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
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

const Login = ({ history }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const classes = useStyles();
  const formMethods = useForm({
    resolver: yupResolver(schema),
  });
  const { handleSubmit, errors } = formMethods;
  const onSubmit = async (data) => {
    setErrorMessage(null);
    const { email, password } = data;
    try {
      await app.auth().signInWithEmailAndPassword(email, password);
      history.push("/booking");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  const { user } = useContext(AuthContext);
  if (user) {
    return <Redirect to="/booking" />;
  }
  return (
    <MenuBar>
      <Grid container justify="center" className={classes.grid}>
        <FormProvider {...formMethods}>
          <form className={classes.form}>
            <Grid container alignItems="center" justify="center" spacing={2}>
              <Grid item xs={12}>
                {errorMessage && (
                  <Alert severity="error"> {errorMessage} </Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <FormInput
                  name="email"
                  label="Email"
                  required={true}
                  errorobj={errors}
                />
              </Grid>
              <Grid item xs={12}>
                <FormInput
                  name="password"
                  label="Password"
                  type="password"
                  required={true}
                  errorobj={errors}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  className={classes.fullWidth}
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit(onSubmit)}
                >
                  Log in
                </Button>
                <p className={classes.textCenter}>or</p>
                <Button
                  className={classes.fullWidth}
                  variant="contained"
                  color="secondary"
                  type="button"
                  onClick={signInWithGoogle}
                >
                  Sign in With Google
                </Button>
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </Grid>
    </MenuBar>
  );
};

export default withRouter(Login);
