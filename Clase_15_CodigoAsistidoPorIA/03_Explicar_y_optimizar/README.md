# Explicar y optimizar código

**Unidad 4.c** · Acompaña a `Clase_02` y `Clase_04` · Notas: caps. 3 y 5

Dos actividades sobre código que **no tiene errores**. En `02_Depurar` el problema era
localizar una falla; aquí el problema es entender y decidir.

## `Explicar_Codigo.ipynb` — explicar

Una implementación matricial de 2SLS en seis líneas sin comentarios, correcta, que
replica a Acemoglu, Johnson y Robinson (2001): coeficiente 2SLS de 0.94 con N = 64.

Abrir `Explicar_Codigo.ipynb` y ejecutar todas las celdas.

La tarea es explicarla línea por línea y **validar la explicación contra el álgebra
del capítulo 3**, no contra la intuición ni contra lo convincente que suene la
respuesta del asistente. El cuaderno comprueba tres propiedades de la matriz de
proyección `P` (simetría, idempotencia, `PZ = Z`) y hay que poder decir de dónde salen.

El riesgo específico de esta actividad: **un asistente explica muy bien código
correcto**, y eso produce una sensación de comprensión que no siempre corresponde a
comprensión. La prueba es poder reescribir el fragmento sin cambiar lo que calcula.

## `Optimizar_Codigo.ipynb` — optimizar

Tres implementaciones de la transformación intragrupos. Las tres dan el mismo
resultado; la más lenta tarda **144 veces** más que la vectorizada.

Abrir `Optimizar_Codigo.ipynb` y ejecutar todas las celdas.

El cuaderno verifica primero que las tres coincidan y sólo después mide tiempos, que es
el orden correcto: **una optimización que cambia el resultado no es una optimización.**

La conclusión de la actividad va contra la intuición: para estos datos **no valía la
pena optimizar**. Cuarenta milisegundos no los nota nadie, y el tiempo del alumno que
lee el cuaderno vale más que el del procesador. La razón real para preferir
`transform` no es la velocidad — es que es la variante que menos ocasión da de
equivocarse, como muestra el BUG 04 de `02_Depurar`, donde la alternativa «obvia»
destruye el 94 % de la muestra en silencio.

**Optimizar sin medir no es ingeniería, es superstición.** Y medir a veces dice que no
había nada que hacer.

---
Parte del curso de Econometría I, Facultad de Ciencias, UNAM.
Ver el [README de la carpeta](../README.md) para el orden de las actividades.
