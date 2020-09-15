export const GET_EVENTS = {
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
  `
};