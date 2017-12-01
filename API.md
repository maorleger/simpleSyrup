# A place to document the current API endpoints and their usage

## /events

### Example parameters accepted:

```
{ "event":
  { "name": "my great event"
  , "description": "my description"
  , "start_date": "2017-11-24"
  , "num_days": 3
  , "lat": 34.321
  , "lnd": 34.321
  , "participants_attributes":
    [ { "id": 3 // participant ID to update. Omit to insert new participant
      , "user_id": 1
      , "status": "accepted" // you can send either the string or integer that it maps to
      },
      { "id": 2
      , "_destroy": true // this is how you'd delete a participant, but you have to also include the ID field
      }
    ]
  }
}
```

### GET

```
curl http://localhost:3000/api/v1/events
```

### POST

```
curl -X POST -H "Content-Type: application/json" -d $EVENT_PARAMS  http://localhost:3000/api/v1/events
```

### PUT

```
curl -X PUT -H "Content-Type: application/json" -d $EVENT_PARAMS  http://localhost:3000/api/v1/events/$EVENT_ID
```

## /graphql - still needs updating

```
curl -H 'content-type: application/json' -d 
'{ "query":
    "{ event(id: 1) {
      id
      , name
      , description
      , lat
      , lng
      , participants {
          id
          , status
          , user {
            id
            , first_name
            , last_name
          }
        }
      }
     }"
     , "variables":null
     , "operationName":null
} https://simplesyrup-rails.herokuapp.com/api/v1/graphql '
```


## /users

### Example parameters accepted:

```
{ "user":
  { "first_name": "Fred"
  , "last_name": "George"
  , "email": "some_email@example.com"
  }
}
```

### GET

```
curl http://localhost:3000/api/v1/users
curl http://localhost:3000/api/v1/users/1
```

### POST

```
curl -X POST -H "Content-Type: application/json" -d $USER_PARAMS  http://localhost:3000/api/v1/users
```

### PUT

```
curl -X PUT -H "Content-Type: application/json" -d $USER_PARAMS  http://localhost:3000/api/v1/users/$USER_ID
```

### DELETE

```
curl -X DELETE http://localhost:3000/api/v1/users/$USER_ID
```
