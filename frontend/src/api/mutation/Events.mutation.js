export const CREATE_EVENT = {
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
  `
}

export const BOOK_EVENT = {
  query: `
  mutation BookEvent($id: ID!){
    bookEvent(eventId: $id){
      _id
      createdAt
      updatedAt
    }
  }
  `
}