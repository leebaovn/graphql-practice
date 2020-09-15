import React, { useContext } from 'react';
import './eventitem.css';
import AuthContext from './../../../../context/auth-context';
import Button from '../../../Button';
const EventItem = (props) => {
  const { token } = useContext(AuthContext);
  return (
    <li
      className="event__list-item"
      key={props.eventId}
    >
      <div>
        <h1>{props.title}</h1>
        <h3>{props.price}VND - {new Date(props.date).toLocaleDateString()}</h3>
      </div>
      <div>

        {token? props.userId === props.creatorId ?
          (<p>You're the owner of this event.</p>) :
            (<Button onClick={()=>props.onDetail(props.eventId)}>View Details</Button>): null}

      </div>
    </li>
  )
}


export default EventItem;