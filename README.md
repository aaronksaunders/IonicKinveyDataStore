IonicFramework Example for Querying Data w/Kinvey
===========

For this sample to work, you must create an account in Kinvey and update the constants declared in the `app.js` file.

You will also need to create a collection name `Devices` and add `first_col` and `second_col` and columns in the collection.

And finally you will need to have created a user object so you can log in to your application.

```JavaScript
// app.js edit this code 
app.constant("KINVEY", {
    "APPINFO": {
        "appKey" : "YOUR APP ID",
        "appSecret" : "YOUR APP SECRET VALUE"
    }
});
```

Format of the JSON Data for the `Devices` collection in Kinvey

```JavaScript
  {
    "_id": "54c7ee47e80f3f8026009156",
    "first_col": "ipad",
    "second_col": "tablet",
    "_acl": {
      "creator": "kid_-JeiCLZM5"
    },
    "_kmd": {
      "lmt": "2015-02-15T17:04:56.335Z",
      "ect": "2015-01-27T20:00:07.394Z"
    }
  },
```

###Screenshots
------------
Login Screen
![Login Screen](https://raw.githubusercontent.com/aaronksaunders/IonicKinveyDatastore/master/screenshots/Login.png)


List View w/Results and User Object Displayed
![Manage Data With HTTP Verbs](https://raw.githubusercontent.com/aaronksaunders/IonicKinveyDatastore/master/screenshots/List.png)
