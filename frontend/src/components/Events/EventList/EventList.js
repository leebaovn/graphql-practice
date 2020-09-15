import React from 'react'
import './eventlist.css';
import EventItem from './EventItem/EventItem';

const EventList = ({ events, onViewDetail, authUserId }) => {
  return (<ul className="event__list">
    {events.map(event => {
      return (
        <EventItem
          eventId={event._id}
          title={event.title}
          key={event._id}
          userId={authUserId}
          creatorId={event.creator._id}
          price={event.price}
          date={event.date}
          onDetail={onViewDetail}
        />)
    })}
  </ul>)
}


export default EventList
