import { useState, Dispatch, SetStateAction } from 'react';
import { Star } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import "./info.css";
import moment from "moment";
import { pin } from "../../interfaces";
import { makeStyles } from "@material-ui/core/styles";
import { deletePin } from "../../services/ApiService";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "red",
  },
}));

interface props {
  pin: pin,
  pins: pin[],
  setPins: Dispatch<SetStateAction<pin[]>>
}


export default function Info({pin, pins, setPins}: props) {
  const classes = useStyles();

  const removePin = async (pin: pin) => {
    await deletePin(pin);
    setPins(pins.filter((element: pin) => element._id !== pin._id))
  };

  return (
    <>
      <label>Location</label>
      <div className="location">
        <h4>{pin.title}</h4>
        <a href={pin.image} target="_blank">
          <img src={pin.image} />
        </a>
      </div>
      <label>Movie</label>
      <div className="movieDetails">
        <p>{pin.description}</p>
        <a className="clip" href={pin.video} target="_blank">
          🎥
        </a>
      </div>
      <label>Rating</label>
      <div className="stars">
        {Array(+pin.rating).fill(<Star className="star" />)}
      </div>
      <div className="createdBy">
        <span>
          Created by <b>{pin.username}</b> {moment(pin.createdAt).fromNow()}
        </span>
        <Button
          onClick={() => removePin(pin)}
          className={classes.root}
          variant="outlined"
        >
          Delete
        </Button>
      </div>
    </>
  );
}
