import { Star } from '@material-ui/icons';
import './info.css';
import moment from 'moment';

type Pin = { pin: {
  _id: string,
  username: string,
  title: string,
  description: string,
  rating: number,
  latitude: number,
  longitude: number,
  createdAt: string,
  updatedAt: string,
  __v: number
}
}

export default function Info({pin}: Pin) {
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