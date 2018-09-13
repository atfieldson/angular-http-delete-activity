# AngularJS PUT & DELETE

Take the code from lecture (this repository) and complete the client side portion of the DELETE.

## Setup

1. Start mongo if not already running with `mongod`
2. `npm install`
3. `npm start`
4. View [http://localhost:5000/](http://localhost:5000/)

> NOTE: Everything should work correctly at this point. Try adding a few repairs before converting to AngularJS.

### Checklist

- [x] Read through the README.md
- [x] Source in AngularJS and add the `ng-app` directive
- [x] Create a controller directive and in the client.js
- [x] Create a model for the inputs
- [x] Add `ng-submit` for the form
- [x] POST to the server with $http
- [x] Check Mongo to see if it worked
- [x] GET request to the server
- [x] `ng-repeat` over the response.data

- [x] PUT server side
- [x] Button and `ng-click` for client put
- [x] DELETE server side
- [ ] Button and `ng-click` for client delete
- [ ] Use `ng-class` to format the completed repairs differently from the non-completed ones

## Stretch Goals

- Display the cost as a formatted dollar amount (e.g. $29.99). AngularJS has an easy way to do this!
- Add the sum of the total cost below the table.
- Add the ability to sort the table by car, miles or cost. This can be accomplished either on the client *or* server.
- Need more practice? Try converting color blocks to AngularJS.