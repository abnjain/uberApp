# User Registration Endpoint Documentation

## Endpoint: `/users/register`

### Method: POST

This endpoint is used to register a new user in the system. It requires the user to provide their first name, last name, email, and password.

### Request Body

The request body should be in JSON format and include the following fields:

- `fullName`: An object containing:
  - `firstName`: A string with a minimum length of 2 characters.
  - `lastName`: A string with a minimum length of 2 characters.
- `email`: A valid email address.
- `password`: A string with a minimum length of 6 characters.

Example request body:
json
{
"fullName": {
"firstName": "John",
"lastName": "Doe"
},
"email": "john.doe@example.com",
"password": "securePassword123"
}

This update includes an example of the response for both successful registration and validation errors.


### Responses

- **201 Created**: 
  - **Description**: User successfully registered.
  - **Body**: Returns a JSON object containing the authentication token and user details.
  - **Example**:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "fullName": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```

- **400 Bad Request**: 
  - **Description**: Validation error due to invalid input data.
  - **Body**: Returns a JSON object with an array of error messages.
  - **Example**:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "Password must be at least 6 characters long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

- `user`: An object containing:
  - `fullName`: A string with a minimum length of 2 characters.
    - `firstName`: A string with a minimum length of 2 characters.
    - `lastName`: A string with a minimum length of 2 characters.
  - `email`: A valid email address.
  - `password`: A string with a minimum length of 6 characters.
- `token`: JWT Token

### Notes

- Ensure that the email provided is unique and not already registered in the system.
- Passwords are hashed before being stored in the database for security purposes.
- The endpoint returns a JWT token upon successful registration, which can be used for authentication in subsequent requests.