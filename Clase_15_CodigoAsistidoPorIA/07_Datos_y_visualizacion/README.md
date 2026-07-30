# Manipulación, limpieza y visualización de datos

**Unidad 4.b** · Acompaña a `Clase_04_DatosPanel` · Notas: cap. 5

Un solo cuaderno, [`Datos_Y_Visualizacion.ipynb`](Datos_Y_Visualizacion.ipynb), que recorre
el camino completo **del archivo crudo al cuadro y la figura que se entregan**, sobre el
panel de salarios de la NLSY.

No es un catálogo de funciones de `pandas`. Es el flujo de trabajo real, con las
decisiones que hay que tomar y que casi nunca se ven en el resultado final:

1. **Conocer los datos antes de tocarlos** — tipos, faltantes, duplicados, si el panel
   está balanceado. No se supone: se comprueba.
2. **Variables derivadas y escala** — por qué `exp(media)` no es `media(exp)`, y cuál de
   las dos se está reportando.
3. **Reestructurar** entre formato largo y ancho sin perder observaciones.
4. **Agregar** — la distinción entre `.mean()`, `.transform()` y `.agg()`, que es donde
   nace el [BUG 04](../02_Depurar/Bug_04_Panel_Desalineado.ipynb).
5. **Del modelo al cuadro** — construir una tabla de regresión publicable con varias
   especificaciones y errores estándar agrupados.
6. **La figura** — con las tres reglas del curso y la razón de cada una.
7. **Guardar de forma reproducible** — cuadros y figuras que se generan con código y nunca
   se editan a mano.

## La tesis

> Las decisiones de limpieza y de presentación **son decisiones econométricas**, no
> cosméticas. Cómo se define la muestra, qué se hace con los faltantes, qué escala lleva
> un eje y qué se pone al lado de qué: todo eso cambia lo que el lector concluye. Un
> asistente de IA las toma por omisión y no las declara.

## Las tres reglas de la figura

1. **Un solo eje vertical por panel.** Con dos escalas se puede hacer que dos series
   cualesquiera parezcan moverse juntas o en contra, sólo eligiendo los rangos: la
   conclusión la fija quien dibuja, no los datos. El ejercicio 2 pide construir las dos
   versiones engañosas con los mismos datos, para verlo.
2. **La incertidumbre se muestra.** Barras sin intervalos de confianza sugieren una
   precisión que no existe. Es la forma más común de exagerar un resultado sin decir una
   sola mentira.
3. **El color identifica, no decora.** Paleta validada para daltonismo —cerca del 8 % de
   los hombres tiene alguna deficiencia de visión del color— y marcadores que distinguen
   las series aunque se imprima en blanco y negro.

## Salidas

El cuaderno escribe en `resultados/`, que **no se versiona**: se regenera al ejecutarlo.

---
Parte del curso de Econometría I, Facultad de Ciencias, UNAM.
Ver el [README de la carpeta](../README.md) para el calendario de actividades.
