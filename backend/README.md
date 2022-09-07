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
        ],
        myBookings: [
            {
                "cityStart": 'Metz'
                "latStart": 25.222,
                "longStart": 30.4512,
                "dateStart": "2022-08-30T15:53:29.000Z",
                "latArrival": 10.2564,
                "longArrival": 9.855,
                "cityArrival": "MNS"
                "smoker": false,
                "airconditionning": false,
                "driver": {
                    "id": 5,
                    "userName": "Simone"
                },
                passengers: [
                    {
                        "id": 1,
                        "userName": "Marcel"
                    },
                    {
                        "id": 4,
                        "userName": "Josiane"
                    }
                ]
            },
            {
                "cityStart": 'Metz'
                "latStart": 25.222,
                "longStart": 30.4512,
                "dateStart": "2022-08-30T15:53:29.000Z",
                "latArrival": 10.2564,
                "longArrival": 9.855,
                "cityArrival": 'IFA'
                "smoker": false,
                "airconditionning": false,
                "driver": {
                    "id": 5,
                    "userName": "Simone"
                },
                "passengers": [
                    {
                        "id": 1,
                        "userName": "Marcel"
                    },
                    {
                        "id": 4,
                        "userName": "Josiane"
                    }
                ]
            }
        ],
        myTravels: [
            {
                "cityStart": 'Metz',
                "latStart": 25.222,
                "longStart": 30.4512,
                "dateStart": "2022-08-30T15:53:29.000Z",
                "latArrival": 10.2564,
                "longArrival": 9.855,
                "cityArrival": 'IFA',
                "smoker": false,
                "airconditionning": false,
                "driver": {
                    "id": 1,
                    "userName": "Marcel"
                },
                passengers: [
                    {
                        "id": 8,
                        "userName": "Anne-Sophie"
                    }
                ]
            }
        ]
    }

## POST `/api/profile`

_Modification du profil du compte connecté_

Reçoit:

    {
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
            id: 69,
            cityStart: 'Metz',
            latStart: 49.75,
            longStart: 9.28,
            dateStart: "2022-08-31T15:53:29.000Z",
            latArrival: 24.58955,
            longArrival: 14.2666,
            cityArrival: Lyon
            smoker: true,
            airconditionning: false,
            user: {
                id: 20,
                userName: "Roger",
            },
            car: {
                model: "Alpha Romeo",
                placeQuantity: 3,
            },
            passengers: [
                {
                    id: 1,
                    userName: "Roro"
                }
            ]
        }
    ]

## POST `/api/travel`

_Ajoute un voyage_

Reçoit:

    {
        "latStart" : 7.222,
        "longStart" : 69.69,
        "cityStart": "Metz",
        "dateStart" : "2022-08-30 15:53:29",
        "latArrival" : 42.12,
        "longArrival" : 45.25,
        "cityArrival": "MNS",
        "smoker" : false,
        "airconditionning" : true,
        "carId":1
    }

## GET `/api/travel/:id`

_Le voyage correspondant à l'id_

Renvoie:

    travel: {
        id: 69,
        cityStart: "Metz",
        latStart: 49.75,
        longStart: 9.28,
        dateStart: "2022-08-31T15:53:29.000Z",
        latArrival: 24.58955,
        longArrival: 14.2666,
        cityArrival: "MNS",
        smoker: true,
        airconditionning: false,
        user: {
            id: 20,
            userName: "Roger",
        },
        car: {
            model: "Alpha Romeo",
            placeQuantity: 3,
        },
        passengers: [
            {
                id: 1,
                userName: "Roro"
            }
        ],
        isAlreadyBooked: true
    }

## DELETE `/api/travel/:id`

_Supprime le voyage correspondant à l'id_

## POST `/api/car`

_Ajout d'un véhicule_

Reçoit:

    {
        model: "Alpha Romeo",
        placeQuantity: 2,
        matriculation: "FAR 92 ZM",
        color: "rouge",
    }

## DELETE `/api/car/:id`

_Supprime un véhicule_

## POST `/api/book/:id`

_L'utilisateur connecté réserver une place sur le trajet correspondant à l'id_

Reçoit:

    {
        "comment": "J'ai 5 chiens"
    }

## DELETE `/api/book/:id`

_L'utilisateur connecté annule sa réservation sur le trajet correspondant à l'id_

## POST `/api/message`

_Envoie d'un message à un utilisateur correspondant à l'id envoyée_

    {
        "id": 3
        "message": "Salut"
    }

## GET `/api/messages`

_Récupère les messages de l'utilisateur connecté_

    "messages": [
        {
            "id": 4,
            "message": "Serait-il possible de faire un détour par la Russie ?",
            "senderName": "Mamy",
            "senderId": 2,
            "isNew": true,
            "date": "2022-08-29T13:54:47.000Z"
        },
        {
            "id": 5,
            "message": "possible de décaler le trajet de 20 min ?",
            "senderName": "Mamy",
            "senderId": 2,
            "isNew": true,
            "date": "2022-08-29T13:54:47.000Z"
        },
        {
            "id": 6,
            "message": "Ma voiture a pas le controle technique",
            "senderName": "Soph",
            "senderId": 3,
            "isNew": true,
            "date": "2022-08-29T13:54:47.000Z"
        }
    ]

## GET `/api/message/:id`

_Récupère le message correspondant à l'id donné_

    {
        "id": 6,
        "message": "Ma voiture a pas le controle technique",
        "senderName": "Soph",
        "senderId": 3,
        "isNew": true,
        "date": "2022-08-29T13:54:47.000Z"
    }

## POST `/api/notif`

_Création d'une notification_

    {
        "message": "T'es notifié monsieur"
    }

## GET `/api/notifs`

_Récupère les notifications de l'utilisateur connecté_

    {
    "notifs": [
        {
            "id": 1,
            "message": "Tu as une réservation",
            "date": "2022-09-02T12:22:12.000Z",
            "isNew": true
        },
        {
            "id": 2,
            "message": "T'es notifié",
            "date": "2022-09-02T12:22:13.000Z",
            "isNew": false
        }
    }

## GET `/api/notif/:id`

_Récupère la notification correspondant à l'id donné_

    {
        "id": 2,
        "message": "T'es notifié"
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
