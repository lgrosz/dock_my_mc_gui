# Building
```
npm build
```

This builds the react app

# Running

```
cd server
npm start
```

This will run the express server serving the built react app.

# Development

To start the development react app:
```
npm start
```

To start the server:

```
cd server
npm start
```

*Note* that the server will not serve the development version of the react app.
That is already running elsewhere. There's a proxy in the react-apps package
json that helps it make requests to the development server.

