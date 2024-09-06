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
DATABASE_URL=mysql://root:root@database:3306/drury_mirror
AUTH_SECRET=
```

### Running the development server

* In the terminal, run `docker compose up`.
* Visit [http://localhost:3000](http://localhost:3000) in a browser.
