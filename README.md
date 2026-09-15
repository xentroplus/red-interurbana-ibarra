# Red Interurbana TS Ibarra · v1.4.2

Versión correctiva de actualización PWA.

## Cambios
- Corrige la versión visible del encabezado a v1.4.2.
- Cambia el Service Worker para evitar que un `index.html` antiguo quede retenido.
- Fuerza comprobación del nuevo Service Worker sin usar caché HTTP.
- Recarga automáticamente una vez cuando toma control la nueva versión.
- Unifica la caché de cartografía offline en `red-ts-map-tiles-v142`.
- Mantiene la corrección del Asistente de Red para consultar el KMZ ya procesado.
