import { Star } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import "./info.css";
import moment from "moment";
import { pin } from "../../interfaces";
import { makeStyles } from '@material-ui/core/styles';
import { deletePin } from '../../services/ApiService';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "red"
  },
}));

export default function Info(pin: pin) {
  const classes = useStyles()

  const removePin = async (pin: pin) => {
    await deletePin(pin)
  }

  return (
    <>
      <label>Location</label>
      <h4>{pin.title}</h4>
      <label>Movie</label>
      <p>{pin.description}</p>
      <label>Rating</label>
      <div className="stars">
        {Array(+pin.rating).fill(<Star className="star" />)}
      </div>
      <label>Information</label>
      <span className="username">
        Created by <b>{pin.username}</b>
      </span>
      <span className="date">{moment(pin.createdAt).fromNow()}</span>
      <Button onClick={() => removePin(pin)} className={classes.root} variant="outlined" color="primary">
        Delete Pin
      </Button>
    </>
  );
}
