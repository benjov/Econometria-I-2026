# Datos truncados y censurados: Tobit y regresión truncada

**Unidad 3 del temario** · **Notas de Clase: cap. 8**

Dos aplicaciones:

1. **Censura: gasto de los hogares en gas LP** (ENIGH 2016), con 39 % de ceros. Tobit con
   `tobit.py` frente a MCO sobre toda la muestra, que atenúa todos los efectos.
2. **Truncamiento: horas trabajadas de mujeres casadas** (Mroz, 1987). El mismo problema tratado
   como censura (Tobit, 753 mujeres; reproduce el ejemplo 17.2 de Wooldridge) y como
   truncamiento (regresión truncada por máxima verosimilitud, sólo las 428 que trabajan). MCO
   sobre la muestra truncada atenúa los efectos, y la discrepancia entre la regresión truncada y
   el Tobit muestra por qué la restricción de coeficientes comunes del Tobit puede no ser
   defendible: la motivación del modelo de dos partes.

Las tres esperanzas del Tobit con sus efectos marginales, y la distinción entre censura
verdadera y solución de esquina, se piden en el ejercicio de aplicación del cap. 8.

## Cuaderno

`Datos_Censurados.ipynb`

## Datos

`Gas_LP.dta` — consumo de gas LP en hogares.
`tobit.py` — implementación del estimador por máxima verosimilitud.
Los datos de Mroz se cargan desde `linearmodels`.

## Referencias

Tobin (1958); Mroz (1987); Wooldridge (2010), cap. 17.

---
Parte del curso de Econometría I, Facultad de Ciencias, UNAM.
Ver el [README principal](../README.md) para la correspondencia completa entre temario, notas y código.
