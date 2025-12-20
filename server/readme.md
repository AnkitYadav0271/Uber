API Endpoint: POST /users/register

This endpoint is used to register a new user in the system. It validates input, hashes the password, stores the user in MongoDB, and returns a JWT token for authentication.

📍 Endpoint

POST /users/register

📝 Request Body

The request body must be JSON and include the following fields:

{
  "firstName": "Ankit",
  "lastName": "Yadav",
  "email": "ankit@example.com",
  "password": "PlainTextPassword"
}

Field Requirements

firstName: Required, minimum 3 characters.

lastName: Optional.

email: Required, unique, minimum 5 characters.

password: Required, will be hashed before saving.

🔄 Flow of Data

Controller (registerUser)

Validates request using express-validator.

Calls userModel.hashPassword(password) to hash the password.

Passes data to registerUserService.

Service (registerUserService)

Checks required fields.

Calls userModel.create() to insert the user into MongoDB.

Returns the created user document.

Model (userModel)

Defines schema with fullName, email, password, etc.

Provides static method hashPassword and instance method generateAuthToken.

Controller (continued)

Calls user.generateAuthToken() to create a JWT.

Responds with JSON containing the user and token.

Global Error Handler

Any errors are caught and wrapped in AppError.

Returns structured error JSON.

✅ Successful Response

{
  "user": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0",
    "email": "ankit@example.com",
    "fullName": {
      "firstName": "Ankit",
      "lastName": "Yadav"
    }
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

❌ Error Responses

Validation Error

{
  "error": [
    {
      "msg": "first name should be more than 3 chars",
      "param": "firstName",
      "location": "body"
    }
  ]
}

Duplicate Email Error

{
  "code": 400,
  "message": "E11000 duplicate key error collection: users index: email_1 dup key",
  "context": {
    "step": "registerUser",
    "detail": {
      "email": "ankit@example.com",
      "firstName": "Ankit"
    }
  }
}

Missing Field Error

{
  "code": 404,
  "message": "SOME_FIELD_MISSING",
  "context": "REGISTER_USER"
}

🔐 Notes

Passwords are hashed using bcrypt before saving.

JWT tokens are signed with process.env.JWT_SECRET.

The globalErrorHandler ensures consistent error responses.

📌 Example Usage (cURL)

curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Ankit",
    "lastName": "Yadav",
    "email": "ankit@example.com",
    "password": "mypassword"
  }'