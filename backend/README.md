# Routes de l'API

## POST `/api/signup`

_Inscription_

Reçoit:

    {
        "email": "blabla@bla.bla",
        "password": "coucou"
    }

## POST `/api/signin`

_Connexion_

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

_Profil d'une personne_

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
        },
        cars: [
            {
                model: "Alpha Romeo",
                placeQuantity: 3,
            },
            {
                model: "Fiat Multipla",
                placeQuantity: 20,
            }
        ]
    }

## GET `/api/profile`

_Profil de la personne connectée_

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
        },
        cars: [
            {
                model: "Alpha Romeo",
                placeQuantity: 3,
            },
            {
                model: "Fiat Multipla",
                placeQuantity: 20,
            }
        ]
    }

## POST `/api/profile`

_Modification du profil du compte connecté_

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

_Tous les voyages_

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

## POST `/api/car`

_Ajout d'un véhicule_

Reçoit:

    {
        model: "Alpha Romeo",
        placeQuantity: 2,
        matriculation: "FAR 92 ZM",
        color: "rouge",
    }

# /backend/.env

```PORT=3000
SQL_USER=root
SQL_PASS=
SQL_URL=127.0.0.1
SQL_DB=mnm
SQL_PORT=3306
ORIGIN=http://localhost:4200
SQL_DIALECT=mysql
JWT_SECRET=mnsvroomvroom
```
