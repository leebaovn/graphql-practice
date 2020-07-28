import React, { useEffect, useContext, useState } from 'react'
import AuthContext from './../context/auth-context';
import Spinner from './../components/Spinner/Spinner';
import BookingList from './../components/Bookings/BookingList/BookingList';


export default function Booking() {
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const { token } = useContext(AuthContext);
  useEffect(() => {
    fetchBooking();
  }, [])

  const handleCancelBooking = (bookingId) => {
    setIsLoading(true);
    const requestBody = {
      query: `
      mutation CancelBooking($id: ID!){
        cancelBooking(bookingId: $id){
          _id
          title
        }
      }
       `,
      variables: {
        id: bookingId
      }
    }

    fetch('http://localhost:3003/graphql', {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': "application/json",
        'Authorization': "Bearer " + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        const bookingFilter = bookings.filter(booking => { return booking._id !== bookingId });
        setBookings(bookingFilter);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);

      })
  }

  const fetchBooking = () => {
    setIsLoading(true);
    const requestBody = {
      query: `
        query{
          bookings{
            _id
            event{
              _id
              title
              date
            }
            user{
              _id
              email
            }
            createdAt
          }
        }
    `}

    fetch('http://localhost:3003/graphql', {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': "application/json",
        'Authorization': "Bearer " + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        setBookings(resData.data.bookings);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      })
  }
  return (
    <React.Fragment>
      {isLoading ?
        <Spinner /> : (
          <BookingList bookings={bookings} onCancel={handleCancelBooking} />
        )}
    </React.Fragment>
  )
}
