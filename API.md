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
curl http://localhost:3000/events
```

### POST

```
curl -X POST -H "Content-Type: application/json" -d $EVENT_PARAMS'  http://localhost:3000/events
```

### PUT

```
curl -X PUT -H "Content-Type: application/json" -d $EVENT_PARAMS'  http://localhost:3000/events/$EVENT_ID
```

## /graphql - still needs updating

```
curl 'https://simplesyrup-rails.herokuapp.com/graphql' -H 'content-type: application/json' -d 
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
}'
```
