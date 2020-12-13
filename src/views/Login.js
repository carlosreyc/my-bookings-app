import React, { useContext } from 'react'
import app, { signInWithGoogle } from '../firebase';
import { useForm, FormProvider } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormInput from '../controls/Input'
import { makeStyles } from '@material-ui/core';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Redirect, withRouter } from 'react-router-dom';
import { AuthContext } from '../components/Auth';

const useStyles = makeStyles((theme) => ({
    grid: {
        width: '100%',
        height: '100%',
        padding: '0px'
    },
    marginAutoButton: {
        width: '100%',
    },
    form: {
        width: '250px',
        margin: 'auto'
    },
    googleButton: {
        width: '100%',
        marginTop: '0'
    },
    textCenter: {
        textAlign: 'center'
    }

}))

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
});

const Login = ({ history }) => {
    const classes = useStyles()
    const formMethods = useForm({
        resolver: yupResolver(schema)
    })
    const { handleSubmit, errors } = formMethods;
    const onSubmit = async (data) => {
        console.log(data);
        const { email, password } = data;
        try {
            await app.auth().signInWithEmailAndPassword(email, password)
            history.push('/booking')
        } catch (error) {
            alert(error)
        }
    }

    const { user } = useContext(AuthContext);
    if (user) {
        console.log(user.updateProfile);
        return <Redirect to="/booking" />
    }
    return (
        <>
            <Grid container justify="center" className={classes.grid}>

                <FormProvider {...formMethods} >
                    <form className={classes.form}>
                        <Grid container alignItems="center" justify="center" spacing={2}
                        >
                            <Grid item xs={12}>
                                <FormInput name="email" label="Email" required={true} errorobj={errors} />
                            </Grid>
                            <Grid item xs={12}>
                                <FormInput name="password" label="Password" required={true} errorobj={errors} />
                            </Grid>
                            <Grid item xs={12}>

                                <Button
                                    className={classes.marginAutoButton}
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    Submit
                            </Button>
                                <p className={classes.textCenter}>
                                    or
                            </p>
                                <Button
                                    className={classes.marginAutoButton}
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
        </>
    )
}

export default withRouter(Login);