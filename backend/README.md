# Routes de l'API

## POST `/api/signup`

Reçoit:

    {
        "email": "blabla@bla.bla",
        "password": "coucou"
    }

## POST `/api/signin`

Reçoit:

    {
        "email": "blabla@bla.bla",
        "password": "coucou"
    }

Renvoie:

    {
        id: 15,
        token: "1246EZJOFHEZF$548$dede",
        pass: true
    }

## GET `/api/profile/:id`

Renvoie:

    user: {
        userName: "Roro",
        lastName: "ROger",
        firstName: "Lopoz",
        phoneNumber: "0645781265",
        email: "roger@email.cc",
        photo: '/machin.jpg",
        searchingZone: 300,
        address: {
            number: "12 bis",
            lineA: "rue des lilas",
            lineB: "",
            zipCode: "57000",
            city: "Metz",
        }
    }

## POST `/api/profile`

Reçoit:

    user: {
        userName: "Roro",
        lastName: "ROger",
        firstName: "Lopoz",
        phoneNumber: "0645781265",
        email: "roger@email.cc",
        photo: '/machin.jpg",
        searchingZone: 300,
        number: "12 bis",
        lineA: "rue des lilas",
        lineB: "",
        zipCode: "57000",
        city: "Metz",
    }

## GET `/api/travels`

Renvoie:

    travels: [
        {
            latStart: 49.75,
            longStart: 9.28,
            dateStart: "2022-08-31T15:53:29.000Z",
            latArrival: 24.58955,
            longArrival: 14.2666,
            smoker: true,
            airconditionning: false,
            user: {
                userName: "Roger",
            },
            car: {
                model: "Alpha Romeo",
                placeQuantity: 3,
            }
        }
    ]

# /backend/.env

PORT=3000
SQL_USER=root
SQL_PASS=
SQL_URL=127.0.0.1
SQL_DB=mnm
SQL_PORT=3306
ORIGIN=http://localhost:4200
SQL_DIALECT=mysql
JWT_SECRET=mnsvroomvroom
