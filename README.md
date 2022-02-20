# web-notes
web-notes is a simple web based notes application

## Dependencies
To use web-notes you will need the following programs
- Postgresql
- Any openid provider
- Node.js

## Installation
First download the code<br>

```git clone https://github.com/An-Owlbear/web-notes```

web-notes uses environment variables for database connection details and other values.
These values can also be provided using a `.env.local` file, in the format shown below.

```
DB_URL=localhost
DB_USER=web-notes
DB_PASSWORD=web-notes
DB_PORT=5432
DB_NAME=web-notes
DB_DATABASE=web-notes
ISSUER_URL=http://localhost:8080/auth/realms/testing
CLIENT_ID=web-notes
CLIENT_SECRET=18EUHXBMBLhqbjKmmCV6kfKQuPAeDJD7
APP_URL=http://localhost:3000
APP_SECRET=ATxGW0kzTag4MfIf2nGOXZQnvkoo+eX0L0g4NYhCjXY=
```

Next build the application by running the command

```npm run build```

The application can be run using the command

``npm run start``