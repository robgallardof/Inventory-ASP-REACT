# DovaPack

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)



## Plugins

Nugets utilizados.

| Nuget  | Versions |
| ------ | ------ |
Microsoft.EntityFrameworkCore.SqlServer.NetTopologySuite| 6.0.10  
Microsoft.EntityFrameworkCore                           |6.0.10  
Microsoft.EntityFrameworkCore.SqlServer                 |6.0.10  
AutoMapper.Extensions.Microsoft.DependencyInjection     |12.0.0  
Newtonsoft.Json                                         |13.0.1  
NetTopologySuite                                        |2.5.0   
Microsoft.OpenApi                                       |1.4.3   
Swashbuckle.AspNetCore.Swagger                          |6.4.0   
Swashbuckle.AspNetCore.SwaggerGen                       |6.4.0   
Microsoft.AspNetCore.Identity.EntityFrameworkCore       |6.0.10  
Azure.Storage.Blobs                                     |12.14.1 
AutoMapper                                              |12.0.0  
Microsoft.AspNetCore.Authentication.JwtBearer           |6.0.10  
Microsoft.EntityFrameworkCore.Tools                     |6.0.10  
Swashbuckle.AspNetCore.SwaggerUI                        |6.4.0   


## Configuración Web Api en el entorno de Visual Studio

Configurar el archivo appsettings.Delopment.json estableciento las rutas del FrontEnd proveniente de React, y 
la cadena de conexión de SQL Server.
![alt text](https://i.imgur.com/qCAQrWm.png)

Ejecutamos el comando Update-Database para crear la Base de datos y las tablas.
![alt text](https://i.imgur.com/ipKBVnz.png)

```sh
update-database
```
Y posteriormente procederemos a correr nuestra Web Api, de preferencia con IIEXPRESS

## Configuración React 

Configurar el archivo .env.development estableciento la ruta del backend.
![alt text](https://i.imgur.com/w3hIX81.png)



## Primeros Pasos

- Registrarse.
 ![alt text](https://i.imgur.com/i9GYq62.png)
- Una vez registrado tendrás que desloguearte y ejecutar el siguiente Query en la Base de Datos, deberás modificar el email por el tuyo asignado:
```sh
-- Asignación de rango administrador al usuario.
DECLARE @Email		AS NVARCHAR(50) = 'contact@robertogallardo.mx', -- Remplazar correo por tú registrado.
		@ClaimType	AS NVARCHAR(50) = 'role',
		@ClaimValue AS NVARCHAR(50) = 'admin';

INSERT INTO [AspNetUserClaims](UserId,ClaimType,ClaimValue)
SELECT id,@ClaimType,@ClaimValue FROM [AspNetUsers] AS users WHERE users.UserName = @Email

```
- Nos volvemos a Loguear y ya tendríamos acceso en modo Administrador.

## Funcionamiento
Creación y edición de categorías.
 ![alt text](https://i.imgur.com/kZqqZ6J.png)
 ![alt text](https://i.imgur.com/CvlAPlY.png)

Creación y edición de Proveedores.
 ![alt text](https://i.imgur.com/V5h5ugP.png)
 ![alt text](https://i.imgur.com/WaQZNLp.png)
 
 Creación y edición de Almacenes.
 ![alt text](https://i.imgur.com/GqxwIaB.png)
 ![alt text](https://i.imgur.com/HFwr9fX.png)

 Creación y visualización de paquetes.
 ![alt text](https://i.imgur.com/ERWm3JT.png)
 ![alt text](https://i.imgur.com/SdBiwnF.png)

 Filtro de Paquetes.
 ![alt text](https://i.imgur.com/ctSHER3.png)



> La edición de Paquetes aún está pendiente.




