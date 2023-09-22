# FullStack Task Application

## Client (Frontend)

## Server (Backend)


### Secrets
To generate a secret token and refresh to add in the .env file you can open the terminal and run the below commands

```
node
```
```
require('crypto').randomBytes(64).toString('hex')
```

#### TODO
- Login Limiter (express-rate-limit)
- Forget Password
- Remember Me
