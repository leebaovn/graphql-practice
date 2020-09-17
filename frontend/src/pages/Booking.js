import React, { useEffect, useContext, useState } from 'react';
import AuthContext from './../context/auth-context';
import Spinner from './../components/Spinner/Spinner';
import BookingList from './../components/Bookings/BookingList/BookingList';
import axiosClient from './../api/axiosClient';
import { GET_BOOKING } from './../api/query/booking.query';
import { CANCEL_BOOKING } from './../api/mutation/booking.mutation';

export default function Booking() {
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    fetchBooking();
  }, []);

  const handleCancelBooking = (bookingId) => {
    setIsLoading(true);
    axiosClient
      .post('/', {
        ...CANCEL_BOOKING,
        variables: {
          id: bookingId,
        },
      })
      .then((resData) => {
        const bookingFilter = bookings.filter((booking) => {
          return booking._id !== bookingId;
        });
        setBookings(bookingFilter);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchBooking = () => {
    setIsLoading(true);
    axiosClient
      .post('/', GET_BOOKING)
      .then((resData) => {
        setBookings(resData.data.bookings);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  return (
    <React.Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <BookingList bookings={bookings} onCancel={handleCancelBooking} />
      )}
    </React.Fragment>
  );
}
