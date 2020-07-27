import React, { useState, useContext, useEffect } from 'react'
import './events.css'
import Modal from './../components/Modal/Modal';
import Backdrop from './../components/Backdrop/Backdrop';
import AuthContext from './../context/auth-context';
export default function Event(props) {
  const [creating, setCreating] = useState(false);
  const [events, setEvents] = useState([]);
  const startCreateEvent = () => {
    setCreating(true);
  }
  const { token, userId } = useContext(AuthContext);
  const titleRef = React.createRef();
  const descriptionRef = React.createRef();
  const priceRef = React.createRef();
  const dateRef = React.createRef();

  const fetchEvent = () => {
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
        const { events } = resData.data;
        setEvents(events);
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    const eventFetched = setTimeout(fetchEvent());
    return () => {
      clearTimeout(eventFetched);
    }
  }, [events])

  const onCancel = () => {
    setCreating(false);
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
        mutation{
          createEvent(eventInput: {
            title: "${title}",
            description: "${description}",
            price:${price},
            date: "${date}"
          }){
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
        console.log(resData.data);
        setEvents([...events, resData.data]);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const handleSubmit = () => { }

  return (
    <React.Fragment>
      {creating && <Backdrop />}
      {creating && (
        <Modal title="Add Event" canCancel canConfirm onCancel={onCancel} onConfirm={onConfirm}>
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
      {token && (<div className="event-control">
        <p>Share your own Event!</p>
        <button className="btn" onClick={startCreateEvent}>Create Event</button>
      </div>)}
      <ul className="event__list">
        {events.map(event => (
          <li className="event__list-item" key={event._id}>{event.title}</li>
        ))}
      </ul>
    </React.Fragment>
  )
}
