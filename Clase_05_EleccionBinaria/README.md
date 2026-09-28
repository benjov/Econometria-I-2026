# Modelos de elección binaria: probit

**Unidad 3 del temario** · **Notas de Clase: cap. 7**

Estimación de la participación laboral de mujeres casadas con los datos de Mroz.

El cuaderno estima un **probit** y se concentra en la diferencia entre los coeficientes y los
**efectos marginales**: el cambio discreto en la probabilidad para las variables dicotómicas
(`wc`, `hc`), evaluado en la media; las probabilidades predichas según el número de hijos
pequeños; y el efecto marginal promedio que reporta `get_margeff`.

El modelo de probabilidad lineal y el logit —y la comparación entre los tres, incluida la
equivalencia práctica entre logit y probit una vez ajustada la escala— se piden en el ejercicio
de aplicación del cap. 7 de las notas.

## Cuaderno

`Modelos_Eleccion_Binaria.ipynb`

## Datos

`Mroz.csv` — 753 mujeres casadas, Panel Study of Income Dynamics, 1975.

## Referencias

Mroz (1987).

---
Parte del curso de Econometría I, Facultad de Ciencias, UNAM.
Ver el [README principal](../README.md) para la correspondencia completa entre temario, notas y código.
