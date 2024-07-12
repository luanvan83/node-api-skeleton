### Simple boilerplate including

- Express
- TypeDI for Dependancy Injection
- TypeORM
- TypeORM Custom repository pattern
- Winston json log
- routing-controllers
- Run with Docker

### TODO
- Add routing-controllers-openapi to generate the OpenAPI spec

#### Local development

```
docker-compose build
docker-compose up -d
```

- API url http://demo.local/

- Monitor logs of the containers
```
docker-compose logs -f
OR
docker-compose logs -f nodejs
```

- Run test
```
docker-compose exec -it nodejs npm run test
```