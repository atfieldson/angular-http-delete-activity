# jQuery to AngularJS Conversion

In this activity you'll be taking code from earlier this week and converting it to AngularJS. You should only need to modify client side code for base mode. `app.use(bodyParser.json());` has already been added to the server.

## Setup

1. Start mongo if not already running with `mongod`
2. `npm install`
3. `npm start`
4. View [http://localhost:5000/]

> NOTE: Everything should work correctly at this point. Try adding a few repairs before converting to AngularJS.

## Base Mode

Replace jQuery code withing the `client.js` with AngularJS. You will need to modify the `index.html` as well. Take **small steps**, test and **commit** at each step along the way. Work with your nieghbor to resolve any errors and ask questions when you get stuck.

### AngularJS Form

To use an HTML Form in AngularJS, you will need to use `ng-submit`.

```HTML
<form ng-submit="submit()">
  Enter text and hit enter:
  <input type="text" ng-model="text" name="text" />
  <input type="submit" id="submit" value="Submit" />
</form>
```

### Checklist

TODO: ADD YOUR CHECKLIST HERE

- [ ] task 1
- [ ] task 2
...

## Stretch Goals

- Display the cost as a formatted dollar amount (e.g. $29.99). AngularJS has an easy way to do this!
- Add the sum of the total cost below the table.
- Add the ability to sort the table by car, miles or cost. This can be accomplished either on the client *or* server.
- Need more practice? Try converting color blocks to AngularJS.