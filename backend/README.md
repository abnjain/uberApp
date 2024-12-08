# User API Documentation

## User Registration

### Endpoint: `/users/register`

#### Method: POST

This endpoint is used to register a new user in the system. It requires the user to provide their first name, last name, email, and password.

#### Request Body

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


## User Login

### Endpoint: `/users/login`

#### Method: POST

This endpoint is used to authenticate a user and provide a JWT token for subsequent requests.

#### Request Body

The request body should be in JSON format and include the following fields:

- `email`: A valid email address.
- `password`: A string with a minimum length of 6 characters.

Example request body:

json
{
"email": "john.doe@example.com",
"password": "securePassword123"
}


#### Responses

- **200 OK**: 
  - **Description**: User successfully authenticated.
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

- **401 Unauthorized**: 
  - **Description**: Authentication failed due to incorrect email or password.
  - **Body**: Returns a JSON object with an error message.
  - **Example**:
    ```json
    {
      "message": "Invalid email or password."
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

- Ensure that the email and password provided are correct.
- The endpoint returns a JWT token upon successful authentication, which can be used for authentication in subsequent requests.

## User Profile

### Endpoint: `/users/profile`

#### Method: GET

This endpoint is used to retrieve the profile of the authenticated user.

#### Headers

- `Authorization`: Bearer token obtained from login.

#### Responses

- **200 OK**: 
  - **Description**: Successfully retrieved user profile.
  - **Body**: Returns a JSON object containing user details.
  - **Example**:
    ```json
    {
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com"
    }
    ```

- **401 Unauthorized**: 
  - **Description**: Authentication failed due to missing or invalid token.
  - **Body**: Returns a JSON object with an error message.
  - **Example**:
    ```json
    {
      "message": "Authentication required."
    }
    ```

### Notes

- The user must be authenticated to access this endpoint.

## User Logout

### Endpoint: `/users/logout`

#### Method: GET

This endpoint is used to log out the authenticated user by invalidating/blacklisting their token.

#### Headers

- `Authorization`: Bearer token obtained from login.

#### Responses

- **200 OK**: 
  - **Description**: Successfully logged out.
  - **Body**: Returns a JSON object with a success message.
  - **Example**:
    ```json
    {
      "message": "Logged Out"
    }
    ```

- **401 Unauthorized**: 
  - **Description**: Authentication failed due to missing or invalid token.
  - **Body**: Returns a JSON object with an error message.
  - **Example**:
    ```json
    {
      "message": "Authentication required."
    }
    ```

### Notes

- The user must be authenticated to access this endpoint.
- The token is added to a blacklist to prevent further use.

# Captain API Documentation

## Captain Registration

### Endpoint: `/captains/register`

#### Method: POST

This endpoint is used to register a new captain in the system. It requires the captain to provide their first name, last name, email, password, and vehicle details.

#### Request Body

The request body should be in JSON format and include the following fields:

- `fullName`: An object containing:
  - `firstName`: A string with a minimum length of 2 characters.
  - `lastName`: A string with a minimum length of 2 characters.
- `email`: A valid email address.
- `password`: A string with a minimum length of 6 characters.
- `vehicle`: An object containing:
  - `color`: A string with a minimum length of 3 characters.
  - `plate`: A string with a minimum length of 3 characters.
  - `capacity`: A number with a minimum value of 1.
  - `vehicleType`: A string that must be one of the following: "car", "motorcycle", "auto".

Example request body:
{
"fullName": {
"firstName": "Jane",
"lastName": "Doe"
},
"email": "jane.doe@example.com",
"password": "securePassword123",
"vehicle": {
"color": "Red",
"plate": "XYZ123",
"capacity": 4,
"vehicleType": "car"
}
}
This documentation provides a clear overview of how to use the /captains/register endpoint, including the required data format and possible responses.
#### Responses

- **201 Created**: 
  - **Description**: Captain successfully registered.
  - **Body**: Returns a JSON object containing the authentication token and captain details.
  - **Example**:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "captain": {
        "fullName": {
          "firstName": "Jane",
          "lastName": "Doe"
        },
        "email": "jane.doe@example.com",
        "vehicle": {
          "color": "Red",
          "plate": "XYZ123",
          "capacity": 4,
          "vehicleType": "car"
        }
      }
    }
    ```

- **400 Bad Request**: 
  - **Description**: Validation error due to invalid input data or if the captain already exists.
  - **Body**: Returns a JSON object with an array of error messages or a message indicating the captain already exists.
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
          "msg": "Color must be at least 3 characters long",
          "param": "vehicle.color",
          "location": "body"
        }
      ]
    }
    ```

    Or

    ```json
    {
      "message": "Captain Already Exist"
    }
    ```

### Notes

- Ensure that the email provided is unique and not already registered in the system.
- Passwords are hashed before being stored in the database for security purposes.
- The endpoint returns a JWT token upon successful registration, which can be used for authentication in subsequent requests.
