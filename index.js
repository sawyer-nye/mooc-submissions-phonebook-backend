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

const generateId = () => {
  return Math.floor(Math.random() * Math.floor(500000));
}

app.get('/api/persons', (request, response) => {
  // Send persons array as json object
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  // Retrieve person with given id, then send json response
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);

  if (person) response.json(person);
  else response.status(404).end();
});

app.get('/info', (request, response) => {
  const numPersons = persons.length;
  const currentTime = new Date();
  
  response.send(`
    <p>Phonebook has info for ${numPersons} people</p>
    <p>${currentTime}</p>
  `);
});

app.post('/api/persons/', (request, response) => {
  console.log(request.body);
  const body = request.body;
  
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});