export const CREATE_USER = {
  query: `
  mutation CreateUser($email: String!, $password: String!){
    createUser(userInput: {
      email:$email,
      password:$password
    }){
      _id
      email
    }
  }
  `
}