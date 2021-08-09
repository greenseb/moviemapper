import { Star } from '@material-ui/icons';
import './info.css';
import moment from 'moment';

interface props {
  _id: string,
  username: string,
  title: string,
  description: string,
  rating: number,
  latitude: number,
  longitude: number,
  createdAt: Date,
  updatedAt: Date
}

export default function Info(pin: props) {
  return (
    <>
      <label>Location</label>
      <h4>{pin.title}</h4>
      <label>Movie</label>
      <p>{pin.description}</p>
      <label>Rating</label>
      <div className='stars'>
        {Array(pin.rating).fill(<Star className='star' />)}
      </div>
      <label>Information</label>
      <span className='username'>Created by <b>{pin.username}</b></span>
      <span className='date'>{moment(pin.createdAt).fromNow()}</span>
    </>
  )
}