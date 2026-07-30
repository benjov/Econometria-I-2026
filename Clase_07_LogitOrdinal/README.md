# Logit y probit ordinal

**Unidad 3 del temario** · **Notas de Clase: caps. 7 y 11**

Clasificación de videojuegos para PC a partir de sus etiquetas de Steam, con un modelo de
respuesta ordenada sobre categorías de ingreso.

Es el cuaderno que enlaza la econometría con el aprendizaje estadístico: incluye separación entre
conjuntos de entrenamiento y prueba, matriz de confusión y reducción de dimensionalidad. Por eso
corresponde tanto al capítulo 7 (el modelo) como al 11 (la evaluación predictiva).

Puntos de interés: los umbrales y por qué el vector de regresores no lleva término constante, y
que el signo del efecto marginal sobre las **categorías intermedias es ambiguo**.

## Cuaderno

`Estimacion_OrdinalLogit.ipynb`

## Datos

`Datos.csv` — videojuegos con sus etiquetas e ingresos.
El archivo `OLM_01_model.pkl` lo genera el propio cuaderno y no se versiona.

## Referencias

Greene (2012), cap. 18.

---
Parte del curso de Econometría I, Facultad de Ciencias, UNAM.
Ver el [README principal](../README.md) para la correspondencia completa entre temario, notas y código.
