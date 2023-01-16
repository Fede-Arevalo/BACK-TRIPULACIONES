# 💻 MongoDB-Mongoose Project 
Este proyecto consiste en el desarrollo del backend de una Red Social, combinando los conocimientos adquiridos en las tecnologías node + express, además de MongoDB/mongoose.

## 🚧 Desarrollo de API REST capaz de lo siguiente: 
- Registro de usuarios usando Bcrypt.
- Login de usuarios + token + middleware.
- CRUD de endpoints:
  - Usuarios.
  - Posts.
  - Comentarios.
- Dar/quitar Like a un post.
- Dar/quitar Like a un comentario.
- Paginación de Posts para que se carguen de a 10 por página.
- Comprobación de "autoría" a la hora de actualizar o eliminar posts y comentarios.
- Implementación de Multar para subir imágenes a la hora de crear usuario, posts y comentarios.
- Backend disponible en producción con Railway.

## 🦾 Tecnologías usadas.
- MongoDB
- Mongoose
- Express
- Nodemon (Dev Dependency)
- Bcrypt
- JWT
- Multer
- Dotenv
- Railway
- Postman
- VsCode
- Git / GitHub

# 📋 Requerimientos previos

1 - Para iniciar el proyecto primero haz un clon:

> git clone https://github.com/Fede-Arevalo/MongoDB-Mongoose.git

2 - Una vez clonado el proyecto, debe instalar los módulos necesarios con npm:
> npm install

3 - Debe cambiar el nombre del archivo ".env.example" a ".env"
> Luego edite el campo de "PORT" con su puerto local preferido y el campo de "JWT_SECRET" con su palabra secreta. 
Para agregar la ruta en "MONGO_URI" previamente deberá crear una base de datos en "MongoDB Atlas".

4 - Cree una carpeta "uploads" para guardar las imágenes con Multer.

5 - Para utilizar los endpoints de manera "local" en POSTMAN debe importar la colección desde el siguiente enlace.
> https://api.postman.com/collections/24080948-9ae004b8-dbee-4937-a76d-369789603865?access_key=PMAT-01GJ3X1K290Z89RZXP91FSCAQY

6 - En POSTMAN deberá actualizar el TOKEN que devuelve al hacer LOGIN, para utilizar los endpoints que requieren autenticación. 
> HEADERS => KEY = Authorization, VALLUE = "TOKEN" o en "Enviroments" > "Mongoose Enviroment" > "TOKEN" > "CURRENT VALUE"

7 - El proyecto está listo para comenzar!
> npm start

# 📷 Preview 

## 👤 Registro de usuario
![image](https://user-images.githubusercontent.com/105200893/202576750-9ec8d84b-28c1-4a43-81fd-24c8f1963a63.png)

## 💻✅ Login de usuario
![image](https://user-images.githubusercontent.com/105200893/202576847-b2809161-5647-412a-89f9-5166c32ca473.png)

## ⚠️ Edición del TOKEN según usuario logeado 
![image](https://user-images.githubusercontent.com/105200893/202577205-641ce7eb-e078-4e74-ba92-fac0da472b79.png)
