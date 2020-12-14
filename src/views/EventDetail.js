import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { events } from "../api/endpoints";
import MenuBar from "../components/MenuBar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
const EventDetail = () => {
  let { id } = useParams();
  const [data, setData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    const getEventData = async () => {
      try {
        const res = await Axios({
          baseURL: `${events}/${id}`,
          method: "GET",
        });

        setData(res.data);
      } catch (error) {
        setNotFound(true);
      }
    };

    getEventData();
  }, [id]);
  const eventNotFound = notFound ? (
    <Typography variant="h5" gutterBottom>
      Event with Id: {id} is not available. Try another one.
    </Typography>
  ) : (
    <>
      {data && (
        <Grid container direction="column">
          <Typography variant="h5" gutterBottom>
            Details of event - No. {data.id}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Name: {data.name}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Description: {data.description}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Creation date: {moment(data.createdAt).format("DD/MM/YYYY")}
          </Typography>
        </Grid>
      )}
    </>
  );
  return <MenuBar>{eventNotFound}</MenuBar>;
};

export default EventDetail;
