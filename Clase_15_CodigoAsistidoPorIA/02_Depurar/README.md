# Depurar código — errores que no producen un mensaje de error

**Unidad 4.c** · Acompaña a `Clase_02`, `Clase_04` y `Clase_05` · Notas: caps. 2, 5 y 7

Cuatro cuadernos. Cada uno corre sin fallar, imprime una tabla de regresión de aspecto
normal y entrega un número equivocado.

Ésa es la elección de diseño de la actividad. Un error de sintaxis lo resuelve
cualquier asistente de IA en un intento, y no hay nada que aprender ahí. Los errores
que importan en trabajo empírico son los que **no** interrumpen la ejecución: el
código hace algo distinto de lo que su autor cree, la biblioteca no tiene motivo para
quejarse, y el resultado se reporta.

## Los cuatro casos

| Cuaderno | Qué pasa | Datos |
|---|---|---|
| `Bug_01_Colinealidad.ipynb` | Dummies para todas las categorías más la constante. `X'X` es singular y `beta` no está identificada; statsmodels devuelve una solución arbitraria vía pseudoinversa | Mroz, `Clase_05` |
| `Bug_02_Muestra_Cambiante.ipynb` | El coeficiente cae a un tercio al agregar un control, pero las dos regresiones usan muestras distintas: los faltantes se eliminaron sin aviso | Acemoglu et al., `Clase_02` |
| `Bug_03_Signos_Invertidos.ipynb` | `pd.factorize` codifica en orden de aparición: `'yes'` recibe el 0 y el logit modela `P(no participa)`. **Todos** los coeficientes salen negados | Mroz, `Clase_05` |
| `Bug_04_Panel_Desalineado.ipynb` | `groupby().mean()` en vez de `.transform('mean')`: pandas alinea por índice y sobreviven 266 de 4,360 observaciones, mal emparejadas | Panel de salarios, `Clase_04` |

## Cómo trabajar cada uno

1. **Ejecútalo y lee la salida completa.** Cada cuaderno termina con una pregunta o una
   comprobación que apunta al problema sin resolverlo, y con una celda vacía para tu
   corrección.
2. **Formula tu hipótesis** de qué está mal, antes de consultar a nadie.
3. **Pídele a un asistente de IA que diagnostique.** Dale el cuaderno completo.
4. **Verifica su respuesta** con evidencia del propio cuaderno —un número que imprima,
   un objeto que puedas inspeccionar— y no por lo convincente que suene. En dos de los
   cuatro casos el diagnóstico correcto exige mirar un objeto que el cuaderno no imprime
   todavía; tendrás que agregar la línea.
5. **Corrige, y comprueba que la corrección cambia el número.** Una corrección que no
   mueve nada no era el problema.
6. **Sólo entonces**, `SOLUCIONES.md`.

## Por qué estos cuatro

Están elegidos para que cada uno se defienda con una herramienta distinta:

- **BUG 01** se detecta con un **diagnóstico numérico** (el número de condición).
- **BUG 02** se detecta **comparando metadatos** que uno normalmente no mira (`N`).
- **BUG 03** sólo se detecta con **conocimiento económico previo**: saber qué signo
  espera la teoría. No hay diagnóstico estadístico que lo señale.
- **BUG 04** se detecta con una **identidad matemática** que el objeto debe cumplir
  (media intragrupo igual a cero).

Ninguno de los cuatro se detecta leyendo el código con cuidado, que es lo que la
mayoría intenta primero.

## Registro de la actividad

Para cada bug, entregar:

| Campo | |
|---|---|
| Síntoma | Qué número se ve mal y por qué se sospecha |
| Diagnóstico | La línea culpable y el mecanismo |
| Evidencia | El número o el objeto que confirma el diagnóstico |
| Corrección | El cambio, y el número corregido |
| ¿Lo detectó el asistente? | Sí / No / Parcialmente, con lo que dijo |

La última columna es la que interesa para la discusión en clase.

---
Parte del curso de Econometría I, Facultad de Ciencias, UNAM.
Ver el [README de la carpeta](../README.md) para el orden de las actividades.
