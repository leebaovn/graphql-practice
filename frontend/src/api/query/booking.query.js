export const GET_BOOKING = {
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
  `
}