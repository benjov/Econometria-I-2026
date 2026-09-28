# Selección de muestra: el modelo de Heckman

**Unidad 3 del temario** · **Notas de Clase: cap. 8**

Estimación de una ecuación de salarios cuando el salario sólo se observa para quienes
trabajan.

El cuaderno estima el modelo en dos etapas con `heckman.py`, lo **verifica contra el manual de
Stata** (que usa estos mismos datos) y lo compara con MCO sobre la muestra de quienes trabajan.
Puntos de interés: la restricción de exclusión (estado civil e hijos entran en la ecuación de
selección, no en la de salarios); la prueba de `ρ = 0`, que es la prueba *z* del coeficiente de
la razón inversa de Mills; el sentido del sesgo de MCO; y un error instructivo —intercambiar las
dos ecuaciones al llamar a `Heckman` corre sin aviso y da ρ > 1—. Repetir la estimación sin
restricción de exclusión, para ver la colinealidad, es parte del ejercicio del cap. 8.

## Cuaderno

`Heckman_Regression.ipynb`

## Datos

`womenwk.dta` — datos de ejemplo del manual de Stata: 2,000 mujeres, 1,343 con salario observado.
Son **simulados** (incluyen las columnas de errores `u` y `v`), lo que permite comprobar la
estimación. La aplicación con datos reales de Mroz (1987) queda para el ejercicio del cap. 8.
`heckman.py` — implementación del estimador en dos etapas.

## Referencias

Heckman (1979).

---
Parte del curso de Econometría I, Facultad de Ciencias, UNAM.
Ver el [README principal](../README.md) para la correspondencia completa entre temario, notas y código.
