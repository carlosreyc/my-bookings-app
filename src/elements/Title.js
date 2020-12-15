import React, { useCallback } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: "10px",
  },
}));

const Title = ({ children, ...props }) => {
  const { mainText, ctxText, open, setOpen } = props;
  const classes = useStyles();

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  return (
    <>
      <Grid item xs={10} lg={11}>
        <Typography variant="h4" className={classes.title}>
          {mainText}
        </Typography>
      </Grid>
      <Grid item xs={2} lg={1}>
        <Fab color="primary" onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add {mainText}</DialogTitle>
        <DialogContent>
          <DialogContentText>{ctxText}</DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.memo(Title);
