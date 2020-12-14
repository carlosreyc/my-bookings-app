import React, { useState, useCallback } from "react";
import { DataGrid } from "@material-ui/data-grid";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import moment from "moment";

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
  dataGrid: { display: "flex", height: 650, marginTop: "16px", width: "100%" },
}));

const EventDataGrid = (props) => {
  const { handleDeleteEvent, handlePageChange, data, loading } = props;
  const classes = useStyles();
  const [idToDelete, setIdToDelete] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback((id) => {
    setIdToDelete(id);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const sendToDeleteAndClose = useCallback(() => {
    handleDeleteEvent(idToDelete);
    setIdToDelete(null);
    setOpen(false);
  }, [handleDeleteEvent, idToDelete]);
  return (
    <div className={classes.dataGrid}>
      <DataGrid
        rows={data}
        disableClickEventBubbling
        columns={[
          {
            field: "id",
            headerName: "Id",
            type: "number",
            width: 80,
            sortDirection: "desc",
          },
          {
            field: "name",
            headerName: "Name",
            type: "string",
            width: 400,
            renderCell: (params) => (
              <>
                <Link
                  style={{ cursor: "pointer" }}
                  component={RouterLink}
                  to={{
                    pathname: `/events/${params.getValue("id")}`,
                  }}
                >
                  {params.getValue("name")}
                </Link>
              </>
            ),
          },
          {
            field: "description",
            headerName: "Description",
            type: "string",
            width: 400,
          },
          {
            field: "createdAt",
            headerName: "Created At",
            renderCell: (params) => (
              <span>
                {moment(params.getValue("createdAt")).format("DD/MM/YYYY")}
              </span>
            ),
            width: 200,
          },
          {
            field: "actions",
            headerName: "Actions",
            renderCell: (params) => (
              <IconButton
                color="secondary"
                onClick={() => handleClickOpen(params.getValue("id"))}
              >
                <DeleteIcon />
              </IconButton>
            ),
          },
        ]}
        pagination
        pageSize={10}
        rowCount={50}
        paginationMode="server"
        onPageChange={handlePageChange}
        loading={loading}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Delete Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to delete this event? {idToDelete}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={sendToDeleteAndClose} color="secondary">
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EventDataGrid;
