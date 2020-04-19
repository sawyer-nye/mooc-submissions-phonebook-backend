const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

/* Takes JSON data of a request, transforms to a javascript object, 
 * then attaches to body property of request object before route handler is called. */
app.use(bodyParser.json());

/*
// Allow for cross origin resource sharing; requests may come from all origins
app.use(cors());
*/

// Define a custom token which shows data sent in POST requests
morgan.token('body', (request, response) => {
  return JSON.stringify(request.body);
});

// Use custom string format for morgan middleware
app.use(morgan(':method :url :status - :response-time[3] ms :body'))

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

const personExists = (name) => {
  return persons.some(person => (person.name.toLowerCase() === name.toLowerCase()))
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
  const body = request.body;
  
  if (!body.name || !body.number || personExists(body.name)) {
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});