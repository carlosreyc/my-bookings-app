import React from "react";
import { useParams } from "react-router-dom";
import MenuBar from "../components/MenuBar";

const EventDetail = () => {
  let { id } = useParams();
  return (
    <MenuBar>
      <h1>EventDetails of id: {id}</h1>
    </MenuBar>
  );
};

export default EventDetail;
