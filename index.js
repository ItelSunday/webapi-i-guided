// The line below is the same as import React from 'react';
const express = require('express');

const db = require('./data/db.js'); //importing db.js

const server = express();

server.use(express.json()); // *** add this POST and PUT work;


//GET Endpoint
server.get('/', (req, res) => { //response sent to client
    res.send('Hello Web XVII');
});

// write a GET /now endpoint that returns current date and time as a string 
server.get('/now', (req, res) => {
    const now = new Date().toISOString();
    res.send(now);
  });
//I'd like you to handle the server

//the R in CRUD
server.get('/hubs', (req, res) => {
db.hubs
.find()
.then(hubs => {
// 200-299 success
// 300-399 redirect
// 400-499 client error
// 500-599 server error

res.status(200).json(hubs);
}).catch(error => {
//handle it
res.status(500).json({ message: 'error retrieving hubs'});
    });
});


//the C in CRUD
server.post('/hubs', (req, res) => {
//read the data for the hub
const hubInfo = req.body;
console.log('hub information', hubInfo); //

//add the hub to our db
db.hubs
    .add(hubInfo)
    .then(hub => {
    res.status(201).json(hub);
})
.catch(error => {
//let the client know what happened
    res.status(500).json({ message: 'error creating the hub'});
  });
});

server.delete('/hubs/:id', (req, res) => {
   const id = req.params.id;
 

db.hubs
    .remove(id)
    .then(deleted => {
        res.status(204).end();
    })
    .catch(error => {
        res.status(500).json({ message: 'error deleting the hub'});
    })
});
server.put('/hubs/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    db.hubs
      .update(id, changes)
      .then(updated => {
        if (updated) {
          res.status(200).json(updated);
        } else {
          res.status(404).json({ message: 'hub not found' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'error updating the hub' });
      });
  });
  
  server.listen(4000, () => {
    console.log('\n** API up and running on port 4k **');
  });
  


// Step 1: Run 'Yarn' (downloads the dependancies)
// Step 2: 'Yarn add express' (Installs the dependancy)
// Step 3: 'add index.js' into the same directory as your package.json - save (Required to run the server!)
// Step 4: yarn server into the terminal (Starts up your server)
// Step 5: Go to https://localhost:4000 in your browser.