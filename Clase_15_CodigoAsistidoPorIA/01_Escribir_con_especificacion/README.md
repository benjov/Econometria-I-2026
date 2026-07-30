# Escribir código a partir de una especificación

**Unidad 4.c** · Acompaña a `Clase_01_RegresionLineal` · Notas: cap. 2

## La tesis de la actividad

Casi todo el trabajo intelectual de escribir código econométrico está en **especificar
qué se quiere**, no en teclear. Una vez que la especificación está completa, producir
el código es mecánico y un asistente de IA lo hace bien. Cuando la especificación está
incompleta, el asistente **elige por nosotros y no avisa que eligió**.

Por eso la actividad no empieza pidiendo código: empieza pidiendo una ficha.

## Archivos

| Archivo | |
|---|---|
| `ficha_especificacion.md` | El insumo: la especificación completa del ejercicio de Nerlove, con el procedimiento paso a paso |
| `Escribir_Con_Especificacion.ipynb` | La implementación verificada contra Nerlove (1963). **No abrir antes de intentar la actividad** |

## Procedimiento

1. Lee `ficha_especificacion.md` y escribe tú el esqueleto del código.
2. Pásale la ficha a un asistente y pídele la implementación.
3. Compara los **números** contra `Escribir_Con_Especificacion.ipynb`, no el estilo del código.
4. Clasifica cada diferencia: estilo / decisión no especificada / error.
5. **Anota qué le faltó a la ficha.** Ése es el hallazgo, no el código.

## Verificación

Abrir `Escribir_Con_Especificacion.ipynb` y ejecutar todas las celdas.

Debe reportar `beta_output = 0.7204` contra `0.721` publicado, y `N = 145`.

## Lo que la actividad busca que se vea

Dos cosas que la ficha no anticipa y que ningún asistente habría señalado, porque en
ambas el código es correcto:

- La suma de los coeficientes de precios es **0.64**, y aun así la prueba F **no
  rechaza** la homogeneidad de grado uno (p = 0.45). «Lejos de 1» no es
  «estadísticamente distinto de 1».
- El coeficiente del precio del capital es **negativo** (−0.22), lo cual es
  económicamente inadmisible. Está así en el artículo original, que lo atribuye a error
  de medición. **Replicar un resultado publicado no lo vuelve defendible.**

---
Parte del curso de Econometría I, Facultad de Ciencias, UNAM.
Ver el [README de la carpeta](../README.md) para el orden de las actividades.
