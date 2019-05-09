
# Setup postgres, pgAdmin and Prisma GraphQL server on Docker

1. Run docker stack deploy prisma-pg --compose-file docker-compose.yml


## pgAdmin (optional)
1. Go to localhost, login with username: example@mail.com password: password
2. Create new db connection
   1. name: graphql-pg (general)
   2. host name / address: hoosee.local (machine name)
   3. port: 5432
   4. database: postgres
   5. username: postgres
   6. password: password

## GraphQL playground

localhost:4466

## Generate schema from Prisma GraphQL server

yarn get-schema
will generate a file: /src/generated/prisma.graphql

## deploy data model and migrate db

prisma deploy

## Start node application

yarn start