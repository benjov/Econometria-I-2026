# Verificar resultados

**Unidad 4.d** · Acompaña a `Clase_11`, `Clase_04` y `Clase_05` · Notas: caps. 5, 7 y 9

La regla de trabajo del curso: **un resultado que no se puede contrastar contra algo no
se reporta.**

## `Replicar_Card_Krueger.ipynb` — la plantilla de verificación

Abrir `Replicar_Card_Krueger.ipynb` y ejecutar todas las celdas.

Estima el DiD de Card y Krueger (1994) por dos vías independientes y lo contrasta
contra el número publicado:

- por medias y por regresión: **coinciden a 1e-13** (equivalencia algebraica del cap. 9);
- estimado **2.75** contra **2.76** publicado en el cuadro 3 del artículo.

Los tres controles que el cuaderno aplica son los que se piden en cualquier trabajo del
curso: dos implementaciones que deban coincidir, un número externo, y errores estándar
al nivel de agrupamiento correcto.

**Un hallazgo que suele enseñarse al revés:** agrupar por establecimiento **reduce** el
error estándar de la interacción (de 1.73 a 1.34), aunque **aumenta** el de `tratado`
(de 1.22 a 1.48). Se repite que «agrupar agranda los errores estándar», y eso es cierto
sólo para regresores que varían *entre* conglomerados. La interacción del DiD es un
contraste temporal *dentro* de la tienda: la correlación positiva se cancela al
diferenciar. La dirección hay que verificarla, no suponerla.

## `Errores_Que_No_Fallan.ipynb` — el catálogo

Abrir `Errores_Que_No_Fallan.ipynb` y ejecutar todas las celdas.

Cuatro casos en los que **el código es correcto** y el error está en qué se reporta o
en cómo se lee. Son peores que los bugs de `02_Depurar`, porque no hay nada que
depurar:

| Caso | Error | Magnitud en estos datos |
|---|---|---|
| 1 | Errores estándar sin agrupar en un panel | ee hasta **2.13 veces** demasiado pequeños |
| 2 | Efectos marginales en la media en vez de promediados | **10.1 %** de sobreestimación |
| 3 | Comparar `R²` entre modelos con distinta dependiente | comparación sin sentido |
| 4 | Leer un coeficiente log-lineal como porcentaje exacto | **1.7 puntos** porcentuales |

Dos detalles del resultado que vale la pena discutir en clase:

- En el caso 1, **ninguna conclusión se invierte** con estos datos: los efectos son
  fuertes y sobreviven. Conviene decirlo así y no exagerar. Pero el margen queda
  medido: cualquier variable con un estadístico t de MCO entre 2 y 4.2 habría dejado de
  ser significativa.
- En el caso 2, el error es **idéntico (10.07 %) en las tres variables**, y no es
  casualidad: en un modelo de índice único el factor de escala es común a todos los
  regresores. La confusión no altera las comparaciones relativas, sólo las magnitudes
  absolutas.

Un asistente de IA reproduce los cuatro sin dificultad, porque su código no tiene
ningún defecto. La defensa no es técnica.

---
Parte del curso de Econometría I, Facultad de Ciencias, UNAM.
Ver el [README de la carpeta](../README.md) para el orden de las actividades.
