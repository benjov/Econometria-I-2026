# Variables instrumentales y 2SLS

**Unidad 1 del temario** · **Notas de Clase: cap. 3**

Réplica de Acemoglu, Johnson y Robinson (2001): ¿causan las instituciones el desarrollo
económico? Se instrumenta la calidad institucional actual con la **mortalidad de los colonos
europeos** del siglo XIX.

Puntos de interés: comparación entre MCO y 2SLS (el coeficiente de 2SLS resulta *mayor*, lo que
plantea la discusión sobre sesgo por variables omitidas frente a atenuación por error de
medición), el estadístico F de la primera etapa, y el examen crítico de la restricción de
exclusión.

El cuaderno cierra con el bloque de **pruebas de especificación y diagnóstico** del cap. 3 de
las notas, todas calculadas primero paso a paso y luego contrastadas contra la implementación de
`linearmodels`:

| Sección | Contenido |
|---|---|
| 7 | F de los **instrumentos excluidos** frente al F global; regla de Staiger-Stock |
| 8 | Por qué el **error estándar** de la segunda etapa hecha a mano está mal, y la fórmula de emparedado |
| 9 | Prueba de endogeneidad de **Durbin-Wu-Hausman** y el enfoque de función de control |
| 10 | Prueba de sobreidentificación de **Sargan** y J de **Hansen**, con dos casos de conclusión opuesta |
| 11 | El **estimador de Wald** como cociente forma reducida / primera etapa, y su lectura de LATE |
| 12 | Conjunto de confianza de **Anderson-Rubin**, robusto a instrumentos débiles |
| 13 | Siete ejercicios |

Requiere `linearmodels` (`pip install linearmodels`).

## Cuaderno

`Regresion Lineal y Variables Instrumentales.ipynb`

## Datos

`maketable1.dta` a `maketable8.dta` — tablas del artículo original.
El cuaderno usa 1, 2 y 4; las demás quedan disponibles para los ejercicios del cap. 3.

## Referencias

Acemoglu, Johnson y Robinson (2001), en la carpeta.

---
Parte del curso de Econometría I, Facultad de Ciencias, UNAM.
Ver el [README principal](../README.md) para la correspondencia completa entre temario, notas y código.
