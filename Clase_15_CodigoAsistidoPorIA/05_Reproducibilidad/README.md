# Reproducibilidad y uso responsable

**Unidad 4.d** · Transversal a todo el curso · Notas: cap. 9

## `Semilla_Y_Reproducibilidad.ipynb`

Abrir `Semilla_Y_Reproducibilidad.ipynb` y ejecutar todas las celdas.

Bootstrap del DiD de Card y Krueger, con y sin semilla fija. Sin semilla, dos corridas
del mismo código sobre los mismos datos entregan intervalos de confianza distintos
—el límite inferior se mueve alrededor de 0.12—; con semilla son idénticas.

El problema no es el tamaño de la diferencia: es que **nadie puede verificar el número
reportado**, incluido su autor tres meses después.

El cuaderno insiste en un punto que suele pasarse por alto: usar
`np.random.default_rng(semilla)` y no `np.random.seed()`. El segundo modifica un estado
global, de modo que el resultado depende del **orden en que se ejecutaron las celdas**
del cuaderno. Es la causa más común de un cuaderno que no se reproduce *aunque tenga
semilla*.

## `lista_de_verificacion.md`

La lista que hay que recorrer **antes de cada entrega**, organizada en siete bloques:
que el cuaderno corra de cero, que el ambiente esté declarado, que los datos sean los
que se cree, que el estimador sea el que se quería, que exista al menos una
verificación independiente, que signos y magnitudes tengan sentido, y que el uso de IA
esté documentado.

Cada punto de la lista corresponde a un error concreto que las actividades de esta
carpeta reproducen. No es burocracia: es el registro de lo que efectivamente sale mal.

Incluye el cuadro de **identidades comprobables** —media intragrupo cero, residuales
ortogonales, probabilidades en (0,1), matriz de proyección idempotente, pesos de
control sintético no negativos que suman uno— que permite verificar un resultado
cuando no hay un número publicado contra el cual contrastarlo, que es el caso habitual
en un trabajo original.

## Sobre las referencias inventadas

Un punto de la lista merece énfasis aparte, porque es el error con peores
consecuencias académicas: **los modelos generativos producen referencias inexistentes
con formato impecable.** Autores que existen, revista que existe, título verosímil, año
plausible — y el artículo no existe. No hay forma de detectarlo leyendo la cita.

Toda referencia se abre y se verifica contra la fuente. Sin excepción.

---
Parte del curso de Econometría I, Facultad de Ciencias, UNAM.
Ver el [README de la carpeta](../README.md) para el orden de las actividades.
