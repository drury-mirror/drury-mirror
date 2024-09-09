# Drury Mirror

The official independent student newspaper at Drury University.

## Development Setup

### Docker

* Install Docker Desktop [here](https://www.docker.com/products/docker-desktop/).
* If you are using Visual Studio Code, you can install the Docker
  extension [here](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker).

### Environment variables

* Create a file in the root directory called `.env` with the following text:

```dotenv
DATABASE_URL=mysql://root:root@localhost:3307/drury_mirror
AUTH_SECRET=4f59iht93iSJ1WIYrWlJ4bIbiiJX5/pQtdLTWqilA+4=
```

### Running the development server

* Run the following commands in a terminal:
  * `docker compose up`
  * `npm install`
  * `prisma generate`
  * `prisma db push`
  * `npm run dev`
* Visit [http://localhost:3000](http://localhost:3000) in a browser.

### Editing the database

* Run `prisma studio`
* Visit [http://localhost:5555](http://localhost:5555) in a browser.
