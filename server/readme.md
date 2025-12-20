

```markdown
# API Endpoint: `POST /users/register`

This endpoint registers a new user, validates input, hashes the password with bcrypt, stores the user in MongoDB, and returns a JWT token for authentication.

## 📍 Endpoint Details

```
POST /users/register
```

## 🔑 Authentication
- **Required**: No (public endpoint)
- **Rate Limit**: 5 requests per minute per IP

## 📝 Request Body

**Content-Type**: `application/json`

```json
{
  "firstName": "Ankit",
  "lastName": "Yadav",
  "email": "ankit@example.com",
  "password": "PlainTextPassword"
}
```

### Field Requirements

| Field | Type | Required | Description | Constraints |
|-------|------|----------|-------------|-------------|
| `firstName` | string | ✅ Yes | User's first name | Min 3 characters |
| `lastName` | string | ❌ No | User's last name | - |
| `email` | string | ✅ Yes | User's email address | Unique, min 5 chars, valid format |
| `password` | string | ✅ Yes | User's password | Will be hashed with bcrypt |

## 🔄 Data Flow

```
Controller → Validation → Service → Model → MongoDB → JWT → Response
                  ↓
           express-validator
                  ↓
           bcrypt.hash() → userModel.create()
                  ↓
           user.generateAuthToken()
```

## ✅ Success Response

**Status**: `201 Created`

```json
{
  "success": true,
  "user": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0",
    "email": "ankit@example.com",
    "fullName": {
      "firstName": "Ankit",
      "lastName": "Yadav"
    },
    "createdAt": "2025-12-20T14:24:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## ❌ Error Responses

### Validation Error
**Status**: `400 Bad Request`

```json
{
  "error": [
    {
      "msg": "first name should be more than 3 chars",
      "param": "firstName",
      "location": "body"
    }
  ]
}
```

### Duplicate Email Error
**Status**: `400 Bad Request`

```json
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
```

### Missing Field Error
**Status**: `404 Not Found`

```json
{
  "code": 404,
  "message": "SOME_FIELD_MISSING",
  "context": "REGISTER_USER"
}
```

## 🧪 Example Usage

### cURL
```bash
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Ankit",
    "lastName": "Yadav",
    "email": "ankit@example.com",
    "password": "mypassword123"
  }'
```

### JavaScript (Fetch)
```javascript
fetch('http://localhost:4000/users/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstName: 'Ankit',
    lastName: 'Yadav',
    email: 'ankit@example.com',
    password: 'mypassword123'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

## 🔐 Security Notes

- ✅ Passwords hashed with **bcrypt** before storage
- ✅ JWT signed with `process.env.JWT_SECRET`
- ✅ Email uniqueness enforced at MongoDB index level
- ✅ Input validation with **express-validator**
- ✅ Global error handler prevents stack trace leaks

## 📋 Response Headers

```
Content-Type: application/json
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 4
```

## 🚀 Quick Test

```bash
npm run test:register
# or
curl -X POST http://localhost:4000/users/register -H "Content-Type: application/json" -d '{"firstName":"Test","email":"test@example.com","password":"test123"}'
```
```