# Datos truncados y censurados: el modelo Tobit

**Unidad 3 del temario** · **Notas de Clase: cap. 8**

Estimación de una ecuación de consumo de gas LP con una proporción considerable de ceros.

Puntos de interés: la distinción entre **censura verdadera y solución de esquina**, las tres
esperanzas del modelo (latente, truncada y observada) con su efecto marginal correspondiente, por
qué fallan las dos estrategias ingenuas de MCO —usar toda la muestra o descartar los ceros—, y el
modelo de dos partes como alternativa cuando la restricción de coeficientes comunes del Tobit no
es defendible.

## Cuaderno

`Datos_Censurados.ipynb`

## Datos

`Gas_LP.dta` — consumo de gas LP en hogares.
`tobit.py` — implementación del estimador por máxima verosimilitud.

## Referencias

Tobin (1958); Wooldridge (2010), cap. 17.

---
Parte del curso de Econometría I, Facultad de Ciencias, UNAM.
Ver el [README principal](../README.md) para la correspondencia completa entre temario, notas y código.
