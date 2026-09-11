LANDING LOCALIZADOR PARA MASCOTAS — IMPORTADORA EL REBAJÓN

1. Sube TODO el contenido de esta carpeta a tu repositorio de GitHub.
2. Publica el repositorio en Vercel.
3. La landing ya trae configurados:
   - WhatsApp: 314 763 6825
   - Supabase URL: https://girfmsczqxynfgrhhhxn.supabase.co
   - Supabase Publishable Key proporcionada por el propietario
   - Tabla: pedidos
4. El formulario guarda: teléfono, ciudad, barrio, dirección, producto,
   cantidad, precio_unitario, total y observaciones. El nombre se guarda
   dentro de observaciones para ser compatible con una tabla que no tenga
   columna nombre.

IMPORTANTE:
- La clave incluida es la clave pública/publishable. Nunca pongas una
  service_role o secret key en esta landing.
- Si tu tabla ya existe, NO necesitas ejecutar supabase.sql si ya tiene
  una política INSERT para anon. Si no permite insertar desde la web,
  revisa la política RLS o ejecuta el SQL incluido.
- Las afirmaciones comerciales deben corresponder a las especificaciones
  reales del producto/proveedor. La landing usa textos de venta prudentes
  y evita prometer precisión absoluta.
