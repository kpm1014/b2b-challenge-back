# b2b-challenge-back
 
Detalles a tener en cuenta:
* node v16.16.0
* npm v8.11.0
* plataforma: Windows 10

En este repositorio se ha desarrollado el backend de la prueba técnica de Bit2Bit.

El proyecto consiste en crear un foro de preguntas y respuestas, con voto de aceptación por parte del usuario que pregunta hacia una respuesta correcta perteneciente (probablemente) a otro usuario.

## Requisitos previos
Es necesario realizar dos configuraciones previas para proceder a levatar el proyecto.

1. Disponer de MySQL Server: Esto es necesario para poder realizar la creación de las tablas en la base de datos.
* Deberá configurar el archivo $\texttt{.env}$ en la raíz del repositorio, si este no se encuentra es posible realizar una copia del archivo $\texttt{.env.example}$ que se encontrará también en la raíz del repositorio.
* Las variables de entorno deberán configurarse con los datos de acceso a alguna instancia en donde se tenga permisos de lectura/escritura. De preferencia una instancia local.

2. En la carpeta $\texttt{config}$, ubicada en la raíz, se encontrará un archivo $\texttt{config.json}$. Con fines prácticos, este se rellenará con los mismos valores que los empleados en el archivo $\texttt{.env}$ en sus etiquetas correspondientes.
* Este archivo define la configuración para la generación de la base de datos, de las tablas y relaciones que se emplean en este proyecto.

## Pasos para la ejecución en entorno local
* Clonar el repositorio desde la rama $\textit{main}$ en su workspace.
* Ejecutar los siguientes comandos en consola: 
>$\texttt{npm install}$

>$\texttt{npx sequelize init}$

>$\texttt{npm run migrate}$

>$\texttt{npm run dev}$


Si haz definido un puerto distinto al del ejemplo en tu archivo .env , puedes emplear la aplicación por separado empleando Postman haciendo uso de la dirección $\texttt{localhost:{{port}} }$ como ruta raíz.

Por defecto emplea el puerto 3000, o el puerto 8080 en caso no se haya definido ninguno.

Puedes encontrar el conjunto de plantillas para las pruebas en postman en el siguiente enlace:

https://www.getpostman.com/collections/3b7a30995ff61d81c858


## Estructura de archivos
La estructura de archivos es la siguiente:

        ├───config/
        │   └───config.json
        ├───migrations/
        │   ├───20221202015449-create-post.js
        │   ├───20221202015511-create-user.js
        │   ├───20221202015530-create-comment.js
        │   └───20221202015548-add-associations.js
        ├───models/
        │   └───index.js
        ├───src/
        │   ├───comment/
        │   │   ├───comment.entity.js
        │   │   ├───comment.repository.js
        │   │   ├───comment.router.js
        │   │   └───comment.use-cases.js
        │   ├───infra/
        │   │   ├───db/
        │   │   │   └───sequelize.js
        │   │   └───http/
        │   │       ├───ajv.js
        │   │       └───express.js
        │   ├───post/
        │   │   ├───post.entity.js
        │   │   ├───post.repository.js
        │   │   ├───post.router.js
        │   │   └───post.use-cases.js
        │   └───user/
        │       ├───user.entity.js
        │       ├───user.repository.js
        │       ├───user.router.js
        │       └───user.use-cases.js
        ├───.env
        ├───index.js
        ├───LICENSE
        ├───package-lock.json
        ├───package.json
        └───README.md


