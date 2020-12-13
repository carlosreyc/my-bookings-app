import React from 'react';
import app from '../firebase';
import { useForm, FormProvider } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormInput from '../controls/Input'
import { makeStyles } from '@material-ui/core';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    grid: {
        width: '100%',
        height: '100%',
        padding: '0px'
    },
    marginAutoButton: {
        margin: '1rem auto 0'
    },
    form: {
        width: '250px',
        margin: 'auto'
    }
}))

const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
});

const Signup = ({ history }) => {
    const classes = useStyles()
    const formMethods = useForm({
        resolver: yupResolver(schema)
    })
    const { handleSubmit, errors } = formMethods;
    const onSubmit = async (data) => {
        console.log(data);
        const { email, password, username } = data;
        try {
            const userCredential = await app.auth().createUserWithEmailAndPassword(email, password)
            if (userCredential) {
                await userCredential.user.updateProfile({
                    displayName: username
                })
            };
            history.push('/booking')
        } catch (error) {
            alert(error)
        }
    }
    return (
        <>
            <Grid container justify="center" className={classes.grid}>

                <FormProvider {...formMethods} >
                    <form className={classes.form}>
                        <Grid container alignItems="center" justify="center" spacing={2}
                        >
                            <Grid item xs={12}>
                                <FormInput name="username" label="Username" required={true} errorobj={errors} />
                            </Grid>
                            <Grid item xs={12}>
                                <FormInput name="email" label="Email" required={true} errorobj={errors} />
                            </Grid>
                            <Grid item xs={12}>
                                <FormInput name="password" label="Password" required={true} errorobj={errors} />
                            </Grid>
                            <Button
                                className={classes.marginAutoButton}
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit(onSubmit)}
                            >
                                Submit
                            </Button>

                        </Grid>
                    </form>
                </FormProvider>
            </Grid>
        </>
    )
}

export default withRouter(Signup);