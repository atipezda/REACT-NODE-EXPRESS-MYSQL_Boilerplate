# Plakaty 2.0

This is a boilerplate to build a full stack web application using React, Node.js, Express and Webpack. It is also configured with webpack-dev-server, eslint, prettier and babel.

## Build on create-react-app and express.js + MySQL

frontend:

- React
- React router
- webpack
- babel

backend:

- node.js
- express.js
- Mysql

### Development mode

to start use:

```bash
  docker run -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=example123 -d mysql
```

add user to MySQL

```sql
 CREATE USER 'node'@'%' IDENTIFIED WITH mysql_native_password BY 'example123';
```
