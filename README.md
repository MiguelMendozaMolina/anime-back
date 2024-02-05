# Backend de Votación de Personajes

Este proyecto es el backend para la aplicación de votación de personajes, implementando funcionalidades clave para manejar la lógica de negocio, almacenamiento de datos y comunicación con el frontend. Utiliza tecnologías modernas como MongoDB Atlas, Next.js y TypeScript para ofrecer una solución robusta y escalable.

## Tecnologías Utilizadas

- **Next.js**: Utilizado para la creación de API routes que facilitan las operaciones CRUD y la lógica de votación.
- **MongoDB Atlas**: Base de datos NoSQL en la nube que almacena información de personajes y votos. Se utiliza la capa gratuita para el almacenamiento de datos.
- **TypeScript**: Lenguaje de programación tipado que mejora la confiabilidad y mantenibilidad del código.
- **Mongoose**: Librería de ODM (Object Data Modeling) para MongoDB y Node.js, facilitando la interacción con la base de datos.

## Características

- **API RESTful**: Endpoints para gestionar personajes, votos, y obtener estadísticas como el personaje más votado, entre otros.
- **Gestión de Personajes**: Permite agregar votaciones y buscar personajes.
- **Votación**: Los usuarios pueden votar "me gusta" o "no me gusta" por los personajes.
- **Estadísticas**: Calcula y devuelve el personaje más me gusta, el con mas no me gusta, y el último votado.

## Estructura del Proyecto
```
anime-api
│
└───src
    │
    │
    ├───characters
    │   │   character-vote.interface.ts
    │   │   characters-vote.schema.ts
    │   │   characters.controller.ts
    │   │   characters.module.ts
    │   │   characters.service.ts
    │
    ├───pokemon
    │   │   pokemon.module.ts
    │   │   pokemon.service.ts
    │   │   pokemon.service.spec.ts
    │
    ├───rick-and-morty
    │   │   rick-and-morty.module.ts
    │   │   rick-and-morty.service.spec.ts
    │   │   rick-and-morty.service.ts
    │
    └───superheroes
    │   │   superheroes.module.ts
    │   │   superheroes.service.spec.ts
    │   │   superheroes.service.ts
    │
    │   app.controller.spec.ts
    │   app.controller.ts
    ├───app.module.ts
    │   app.service.ts
    │   main.ts

```
## Cómo Empezar

### Para ejecutar este proyecto localmente, sigue estos pasos:

1. **Clona el repositorio:**

```bash
git clone https://github.com/MiguelMendozaMolina/anime-back
```

2. **Instala las dependencias:**

```bash
cd anime-back
npm install
```

3. **Agrega tu archivo .env al proyecto con los secretos**
- Recuerda crear un archivo .env en el cual deberas agregar los valores de los secretos 
  para el proyecto de anime-back

3. **Ejecuta el servidor de desarrollo:**

```bash
npm run start:dev
```

## Configurar MongoDB Atlas para Aceptar Solicitudes Desde Cualquier IP

Para permitir que tu base de datos MongoDB Atlas reciba solicitudes desde cualquier dirección IP, debes seguir los siguientes pasos para modificar tu lista de direcciones IP permitidas en la configuración de seguridad de red.

## Pasos para Configurar el Acceso Desde Cualquier IP

1. **Inicia Sesión en MongoDB Atlas**
   - Visita [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) y accede con tu cuenta.

2. **Selecciona tu Proyecto**
   - Una vez que hayas iniciado sesión, estarás en la página de inicio de Atlas. Aquí, selecciona el proyecto que contiene el clúster al que deseas permitir el acceso desde cualquier IP.

3. **Accede a la Configuración de Seguridad**
   - En el panel izquierdo, busca la sección "Security" (Seguridad) y selecciona "Network Access" (Acceso de red).

4. **Añade una Nueva Regla de Dirección IP**
   - En la página de "Network Access", verás un botón que dice "Add IP Address" (Añadir dirección IP). Haz clic en él.

5. **Configura el Acceso Desde Cualquier IP**
   - En la ventana emergente, para permitir el acceso desde cualquier IP, introduce `0.0.0.0/0`. Esta es una representación CIDR que engloba a todas las direcciones IP posibles.

6. **Confirma y Guarda**
   - Después de ingresar `0.0.0.0/0`, puedes darle un nombre descriptivo a la regla si lo deseas, y luego haz clic en "Confirm" (Confirmar) para guardar la nueva configuración.

7. **Espera a que se Apliquen los Cambios**
   - Puede tomar unos minutos para que la nueva regla de acceso de red se aplique completamente. Una vez hecho esto, tu clúster de MongoDB Atlas estará accesible desde cualquier dirección IP.

8.**En caso contrario se debera agregar la IP**
   - En caso de que esta configuracion no resulte exitosa se deberar agregar a IP de la maquina en que se ejecute siguiendo los pasos anteriormente mencionados

   - Se deja esta configuracion para fines de pruebas , pero en caso de ser un proyecto en produccion por seguridad es conveniente la configuracion por medio de la direccion IP 



## Datos Importantes 
Para poder ejecutar el proyecto es necesario contar con la version 
V18.17.0 de Node.js la cual puedes descargar desde el siguiente link 
https://nodejs.org/download/release/v18.17.0/

Para poder utilizar distintos entornos de Node.js se recomienda el uso de NVM 
https://desarrolloweb.com/home/nvm

Es muy importante poder crear un archivo .env en la raiz del proyecto para almacenar las variables de entorno , se adjunta un video para entender de mejor manera su aplicacion https://www.youtube.com/watch?v=WsAPow3rv1w
