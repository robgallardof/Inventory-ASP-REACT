-- Asignación de rango administrador al usuario.
DECLARE @Email		AS NVARCHAR(50) = 'contact@robertogallardo.mx', -- Remplazar correo por el registrado.
		@ClaimType	AS NVARCHAR(50) = 'role',
		@ClaimValue AS NVARCHAR(50) = 'admin';

INSERT INTO [AspNetUserClaims](UserId,ClaimType,ClaimValue)
SELECT id,@ClaimType,@ClaimValue FROM [AspNetUsers] AS users WHERE users.UserName = @Email
