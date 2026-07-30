# Introducción a Python

**Unidad 4 (transversal) del temario** · **Notas de Clase: —**

Fundamentos del lenguaje, previos al material econométrico. Se divide en dos lecciones:

- `Lección_01/` — primer programa, datos en Python, mostrar texto y cálculos, variables.
- `Lección_02/` — uso de funciones, paquetes internos (`math`, `random`, `statistics`),
  paquetes de terceros (`pandas`, `matplotlib`) e instalación de dependencias.

## Cuaderno

`Lesson_1.ipynb` a `Lesson_4.ipynb` en cada lección.

## Datos

`car_data.csv` — datos de automóviles usados en la lección 3 de `Lección_02`.
`helper_functions.py` — módulo auxiliar de la lección 1.

## Referencias

learnpython.org

## Nota: estos cuadernos no pasan «Restart & Run All», y está bien

Las lecciones contienen **código roto a propósito** —por ejemplo
`print("Hello, Benjamin!)`, con la comilla sin cerrar— acompañado de celdas de texto que
explican qué es un `SyntaxError` y piden al alumno corregirlo. Varias sugieren además
consultar a un asistente de IA con el prompt *«What is wrong with this code, and how do I
fix it?»*.

Es decir: **son la única excepción legítima a la regla de reproducibilidad** que el resto del
repositorio exige (ver
[`Clase_15/05_Reproducibilidad`](../Clase_15_CodigoAsistidoPorIA/05_Reproducibilidad/)). Un
cuaderno que falla aquí no tiene un defecto; está haciendo su trabajo.

Conviene señalar la continuidad: esas celdas ya son, en germen, el inciso 4.c del temario
—usar IA generativa para depurar código—. La diferencia con
[`Clase_15/02_Depurar`](../Clase_15_CodigoAsistidoPorIA/02_Depurar/) es que aquí el error
**detiene la ejecución y se ve**, mientras que allá el código corre sin protestar y entrega un
número equivocado. Ese salto es justamente lo que separa aprender el lenguaje de hacer
econometría con él.

---

Parte del curso de Econometría I, Facultad de Ciencias, UNAM.
Ver el [README principal](../README.md) para la correspondencia completa entre temario, notas y código.
