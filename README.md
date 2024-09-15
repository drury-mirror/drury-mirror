# Drury Mirror

The official independent student newspaper at Drury University.

## Development setup

### Requirements

* Install [Docker](https://www.docker.com/products/docker-desktop/)
* Install [Node.js](https://nodejs.org/en)

### Environment variables

* Create a file in the `backend` directory called `.env` with the following text:

```dotenv
DATABASE_URL=mysql://root:development@localhost:3307/drury_mirror
AUTH_SECRET=4f59iht93iSJ1WIYrWlJ4bIbiiJX5/pQtdLTWqilA+4=
```

### Package installation

* Run `npm install`

### Database setup

* Make sure that Docker is running on your computer
* Run `npm run database`
* Run `npm run database:setup`

## Starting the servers

* Run `npm run database` (make sure that Docker is running on your computer)
* Run `npm run backend`
* Visit [http://localhost:3000](http://localhost:3000) in a browser.

### Editing the database

* Run `npm run database:edit`
* Visit [http://localhost:5555](http://localhost:5555) in a browser.
