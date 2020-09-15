export const CANCEL_BOOKING = {
  query: `
  mutation CancelBooking($id: ID!){
    cancelBooking(bookingId: $id){
      _id
      title
    }
  }
  `
}