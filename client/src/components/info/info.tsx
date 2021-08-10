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

export default function Info(pin: pin) {
  const classes = useStyles();

  const removePin = async (pin: pin) => {
    await deletePin(pin);
  };

  return (
    <>
      {/* <div className="wrapper" style={{backgroundImage: `url(${pin.image})`}}> */}

      <label>Location</label>
      <div className="location">
        <h4>{pin.title}</h4>
        <a href={pin.image} target="_blank">
          <img src={pin.image} />
        </a>
      </div>
      <label>Movie</label>
      <p>{pin.description}</p>
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
