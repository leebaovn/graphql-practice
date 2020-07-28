import React, { useState, useContext, useEffect } from 'react'
import './events.css'
import Modal from './../components/Modal/Modal';
import Backdrop from './../components/Backdrop/Backdrop';
import AuthContext from './../context/auth-context';
import EventList from './../components/Events/EventList/EventList';
import Spinner from './../components/Spinner/Spinner';

export default function Event(props) {
  const [creating, setCreating] = useState(false);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const startCreateEvent = () => {
    setCreating(true);
  }
  const { token, userId } = useContext(AuthContext);

  const titleRef = React.createRef();
  const descriptionRef = React.createRef();
  const priceRef = React.createRef();
  const dateRef = React.createRef();

  const [isActive, setIsActive] = useState(true);



  const showDetail = (id) => {
    const selected = events.find(e => e._id === id);
    setSelectedEvent(selected);
  }

  const fetchEvent = () => {
    setIsLoading(true);
    const requestBody = {
      query: `
        query{
          events{
            _id
            title
            description
            date
            price
            creator{
              _id
              email
            }
          }
        }
    `}

    fetch('http://localhost:3003/graphql', {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': "application/json",
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        if (isActive) {
          setEvents(resData.data.events);
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (isActive) {
          setIsLoading(false);
        }
      })
  }

  useEffect(() => {
    fetchEvent();
    return () => {
      setIsActive(false);
    }
  }, [])

  const onCancel = () => {
    setCreating(false);
    setSelectedEvent(null);
  }

  const onConfirm = (e) => {
    setCreating(false);
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const price = +priceRef.current.value;
    const date = dateRef.current.value;

    if (title.trim().length === 0 ||
      description.trim().length === 0 ||
      price <= 0 ||
      date.trim().length === 0) {
      return;
    }
    const event = {
      title,
      description,
      price,
      date
    }
    e.preventDefault();

    const requestBody = {
      query: `
        mutation CreateEvent($title: String!, $des: String!, $price:Float!, $date: String! ){
          createEvent(eventInput: {
            title: $title,
            description: $des,
            price:$price,
            date: $date
          }){
            _id
            title
            description
            date
            price
          }
        }
    `,
      variable: {
        title: title,
        des: description,
        price: price,
        date: date
      }
    }

    fetch('http://localhost:3003/graphql', {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': "application/json",
        "Authorization": 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        setEvents(pre => {
          const { _id, title, description, price, date } = resData.data.createEvent;
          const updatedEvent = [...pre];
          updatedEvent.push({
            _id,
            title,
            description,
            date,
            price,
            creator: {
              _id: userId,
            }
          })
          return updatedEvent;
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  const handleSubmit = () => { }

  const handleBookEvent = () => {
    const requestBody = {
      query: `
        mutation BookEvent($id: ID!){
          bookEvent(eventId: $id){
            _id
            createdAt
            updatedAt
          }
        }
    `,
      variables: {
        id: selectedEvent._id
      }
    }

    fetch('http://localhost:3003/graphql', {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': "application/json",
        "Authorization": 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        setSelectedEvent(null);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <React.Fragment>
      {creating || selectedEvent && <Backdrop />}
      {creating && (
        <Modal
          title="Add Event"
          canCancel
          canConfirm
          onCancel={onCancel}
          onConfirm={onConfirm}
          confirmText="Confirm"
        >
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <input type='text' id='title' ref={titleRef} />
            </div>
            <div className="form-control">
              <label htmlFor="description">Description</label>
              <input type='text' id='description' ref={descriptionRef} />
            </div>
            <div className="form-control">
              <label htmlFor="price">Price</label>
              <input type='number' id='price' ref={priceRef} />
            </div>
            <div className="form-control">
              <label htmlFor="date">Date</label>
              <input type='datetime-local' id='date' ref={dateRef} />
            </div>
          </form>
        </Modal>)}
      {selectedEvent && (
        <Modal
          title="Booking"
          canCancel
          canConfirm
          onCancel={onCancel}
          onConfirm={handleBookEvent}
          confirmText="Book"
        >
          <h1>{selectedEvent.title}</h1>
          <h4>{selectedEvent.price}VND - {new Date(selectedEvent.date).toLocaleDateString()}</h4>
          <p>{selectedEvent.description}</p>
        </Modal>)

      }
      {token && (<div className="event-control">
        <p>Share your own Event!</p>
        <button className="btn" onClick={startCreateEvent}>Create Event</button>
      </div>)}
      {isLoading ? <Spinner /> : (<EventList events={events} authUserId={userId} onViewDetail={showDetail} />)}
    </React.Fragment>
  )
}
