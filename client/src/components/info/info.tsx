import { Star } from "@material-ui/icons";
import "./info.css";
import moment from "moment";

export default function Info({ pin }): JSX.Element {
  return (
    <>
      (<label>Location</label>
      <h4>{pin.title}</h4>
      <label>Movie</label>
      <p>{pin.description}</p>
      <label>Rating</label>
      <div className="stars">
        {Array(pin.rating).fill(<Star className="star" />)}
      </div>
      <label>Information</label>
      <span className="username">
        Created by <b>{pin.username}</b>
      </span>
      <span className="date">{moment(pin.createdAt).fromNow()}</span>)
    </>
  );
}
