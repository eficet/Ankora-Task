# Ankora Backend Task Application

## Description

This RestFul API is built using NestJs with a MongoDb, its a User application that preforms CRUD operation & Seeds data to the database.

## Instructions

1. Clone the repository from  `https://github.com/eficet/Ankora-Task.git`.
2. To install the application dependencies execute the folowing command :

```bash
$ npm install
```

3. You have two options for the database, in the configuration file `.env` there are two connection strings provided:
   - On the cloud : Using MongoDb Atlas the app will connect to the existing database on the cloud.
   - Locally : You have to install mongoDb in your local machine and make sure that the mongoDb service is running so the the database will be created automatically.
     Note: By default the app is connected to the cloud DB, to change it to the local you have to change `MongooseModule.forRoot(process.env.DATABASE_CONNECTION_LOCAL)` in bothe the `app.module.ts` and `seeder.module.ts`.
4. To test the Application you can use Postman, In the documentaion you will see a detailed explanation of the routes and what they do.
5. There are to ways to launch the script that combines the seed data and save the new users to the database:
   - Send GET request to this rout `http://localhost:3000/seed`
   - Execute the following command in the application terminal which will run it as micro app (service) seperated from our Application:

```bash
$ npm run seed
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Documentation

This App allows you to preform CRUD operations for User and search for users by different criterias.

### Documents

| Variable     | Type                      |
| ------------ | ------------------------- |
| \_id         | Unique id for the user    |
| firstname    | String                    |
| lastName     | String                    |
| email        | String                    |
| phoneNumbers | Array of PhoneNumber type |

### Routes

#### User Routes:

1. Route URL: `http://localhost:3000/users`
   On this route you can preform GET and POST request:
   - GET all users and filter them using query ( search through firsName & lastName), email and phoneNumber.
   - and add new (POST) user.
     POST example:

```
{
  "firstName": "fayiz",
  "lastName": "sa",
  "email":"maill5",
  "phoneNumbers":[{
    "phoneType":"PRIMARY",
    "value":"1122323"
  }]
}
```

2. Route URL: `http://localhost:3000/users/{id}`
   On this route you preform GET and PUT request, so you can update and get the user bi its id.

#### Seeder Routes:

1. Route URL: `http://localhost:3000/seed`
   On this route you can prefrorm GET request which will combine the seed data and save the new users to the database.

### Sincerely

- Developer - Fayiz Hamad
