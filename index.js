const express = require('express');
const bodyParser = require('body-parser');
const app = express();

/* Takes JSON data of a request, transforms to object, then attaches to body property of
 * request object before route handler is called. */
app.use(bodyParser.json());

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
]

app.get('/api/persons', (request, response) => {
  // Send persons array as json object
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  // Needs implement
});

app.get('/info', (request, response) => {
  const numPersons = persons.length;
  const currentTime = new Date();
  
  response.send(`
    <p>Phonebook has info for ${numPersons} people</p>
    <p>${currentTime}</p>
  `);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});