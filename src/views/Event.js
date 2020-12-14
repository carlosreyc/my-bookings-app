import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import MenuBar from "../components/MenuBar";
import EventDataGrid from "../elements/EventDataGrid";
import { events } from "../api/endpoints";
import Axios from "axios";
import Title from "../elements/Title";
import EventAddForm from "../elements/EventAddForm";
import TableFilter from "../elements/TableFilter";
import { LoaderDispatchContext } from "../components/Loader";

const Event = () => {
  const [eventsData, setEventsData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const handleClose = () => {
    setAddModalOpen(false);
  };
  const dispatch = useContext(LoaderDispatchContext);

  const handlePageChange = (params) => {
    setPage(params.page);
  };

  useEffect(() => {
    const getEvents = async () => {
      const result = await Axios(events);

      setEventsData(result.data);
    };

    getEvents();
  }, []);

  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      const newRows = await Axios({
        baseURL: events,
        method: "GET",
        params: {
          page,
          limit: 10,
          sortBy: "createdAt",
          order: "desc",
          name: filter,
        },
      });

      if (!active) {
        return;
      }

      setEventsData(newRows.data);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [page, filter]);

  const handleDeleteEvent = async (id) => {
    handleClose();
    try {
      dispatch({ type: "LOADING" });
      await Axios({
        baseURL: `${events}/${id}`,
        method: "DELETE",
      });
      dispatch({ type: "LOADING_OFF" });
      const newStateEvents = [...eventsData].filter((item) => id !== item.id);
      setEventsData(newStateEvents);
    } catch (error) {
      dispatch({ type: "LOADING_OFF" });
    }
  };

  const handleSubmitEvent = async (data) => {
    setErrorMessage(null);

    try {
      dispatch({ type: "LOADING" });
      const newEvent = await Axios({
        baseURL: events,
        method: "POST",
        data,
      });
      dispatch({ type: "LOADING_OFF" });
      setEventsData([newEvent.data, ...eventsData]);
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
          mainText="Events"
          ctxText="Fill out the form to create an Event"
          open={addModalOpen}
          setOpen={setAddModalOpen}
        >
          <EventAddForm
            errorMessage={errorMessage}
            onSubmitEvent={handleSubmitEvent}
          />
        </Title>
        <Grid item xs={12}>
          <TableFilter handleFilter={setFilter} />
        </Grid>
        <EventDataGrid
          data={eventsData}
          loading={loading}
          handlePageChange={handlePageChange}
          handleDeleteEvent={handleDeleteEvent}
        />
      </Grid>
    </MenuBar>
  );
};

export default Event;
