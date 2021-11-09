# Proyecto API GraphQL con Apollo Server Express 3 + MongoDB + Subscriptions

En este proyecto, tenemos un sistema de votaciones en tiempo real donde trabajaremos con una API
desarrollada en NodeJS Express con Typescript hacendo uso de:
* Apollo Server Express 3
* MongoDB
* Subscriptions
* y más

## Instrucciones de uso

### 1.- Descargar / Clonar el repositorio
Desde la URL del repositorio clonamos el repositorio o descargamos el fichero zip
### 2.- Instalar dependencias del proyecto
Ejecutamos el comando de instalar
```npm install ```
### 3.- Importamos la Base de datos de ejemplo
Para trabajar con una cantidad de datos para que su uso ya se vea con datos completos de un sistema propio de votaciones, estando en el directorio raíz del proyecto, ejecutamos el comando para importar la base de datos completa. Es importante que tengamos el servidor de MongoDB iniciado, ya que si no lo está, no se podrá poner en marcha.
Partiendo de esta referencia:
```
mongorestore -d <database_name> <directory_backup>
```
Partiendo de esta referencia:
```
mongorestore -d breaking-bad-voting db_backup
```
Si todo va bien, debemos de tener dos colecciones, **characters** y **votes**

### 4.- Poner en marcha el servidor
Ejecutamos
```
npm start
```