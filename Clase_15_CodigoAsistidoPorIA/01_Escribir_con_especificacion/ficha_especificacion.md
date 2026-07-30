# Ficha de especificación

Este es el insumo de la actividad. **No es un *prompt*** en el sentido de una frase
ingeniosa que se le dice al modelo: es la especificación econométrica del trabajo, y
tendría que escribirse igual si el código lo fuera a programar una persona.

La tesis de la actividad es que **casi todo el trabajo intelectual está en llenar esta
ficha**. Una vez llena, generar el código es mecánico —lo puede hacer un asistente, y
lo hará bien—. Si la ficha está incompleta, ningún asistente lo va a suplir: va a
elegir por nosotros y no va a decir que eligió.

---

## Ficha del ejercicio: función de costos de Nerlove (1963)

### 1. Pregunta empírica

¿Presenta la industria de generación eléctrica economías de escala? Es decir: ¿el
costo total crece menos que proporcionalmente respecto del producto?

### 2. Datos

| | |
|---|---|
| Archivo | `../../Clase_01_RegresionLineal/nerlove63.dta` |
| Formato | Stata (`.dta`); se lee con `pandas.read_stata` |
| Unidad de observación | Empresa de generación eléctrica, Estados Unidos, 1955 |
| N esperado | 145 |

| Variable | Significado | Unidades |
|---|---|---|
| `totcost` | Costo total | millones de dólares |
| `output` | Producto | miles de millones de kWh |
| `plabor` | Precio del trabajo | índice |
| `pfuel` | Precio del combustible | índice |
| `pkap` | Precio del capital | índice |

### 3. Modelo

Función de costos Cobb-Douglas, estimada en logaritmos:

```
ln(totcost) = b0 + b1·ln(output) + b2·ln(plabor) + b3·ln(pfuel) + b4·ln(pkap) + e
```

- **Estimador:** MCO.
- **Linealidad:** el modelo es lineal en los parámetros, no en las variables. Esta
  distinción está en el capítulo 1 de las notas y es la razón por la que MCO aplica.
- **Errores estándar:** los clásicos. Son datos de corte transversal sin estructura de
  agrupamiento conocida. *(Si la especificación no dijera esto, el asistente elegiría
  por omisión y no lo mencionaría.)*

### 4. Qué se debe reportar

1. Cuadro de coeficientes con errores estándar, estadísticos t y valores p.
2. `N` y `R²`.
3. La **elasticidad costo-producto** `b1` y la medida de economías de escala `1/b1`,
   con su interpretación.
4. La **prueba de homogeneidad de grado uno en los precios**: bajo la teoría, la
   función de costos debe ser homogénea de grado 1 en los precios de los insumos, de
   modo que `b2 + b3 + b4 = 1`. Reportar el estadístico F y su valor p.
5. Una **verificación explícita** contra el resultado publicado: `b1 = 0.721` y
   `N = 145` según Nerlove (1963), reproducido en Greene (2012, cap. 10).

### 5. Qué NO hay que hacer

- No transformar variables que la especificación no pide transformar.
- No eliminar observaciones. Si aparecen faltantes, reportarlos, no descartarlos en
  silencio (ver el BUG 02 de `02_Depurar`).
- No agregar controles «que suelen mejorar el ajuste». El modelo es el que está arriba.

---

## Procedimiento de la actividad

1. **Escribe el código tú primero**, o al menos su esqueleto: qué se lee, qué se
   transforma, qué se estima, qué se imprime.
2. **Pásale esta ficha a un asistente de IA** y pídele la implementación.
3. **Compara** lo que produjo con `Escribir_Con_Especificacion.ipynb`, que está verificada. No
   compares el estilo del código: compara los **números**.
4. **Anota las diferencias** y clasifícalas:
   - ¿Diferencias de estilo, sin efecto en el resultado?
   - ¿Decisiones que el asistente tomó y la ficha no especificaba?
   - ¿Errores que cambian un número?
5. **Registra qué le faltó a la ficha.** Si el asistente tuvo que elegir algo, la
   especificación estaba incompleta. Ése es el hallazgo de la actividad, no el código.

## Lo que hay que observar en el resultado

Cuando la actividad esté terminada, la solución de referencia habrá mostrado dos
cosas incómodas que la ficha no anticipa:

- **La suma de los coeficientes de precios es 0.64, no 1**, y sin embargo la prueba F
  **no rechaza** la restricción de homogeneidad (p = 0.45). «Lejos de 1» y
  «estadísticamente distinto de 1» no son lo mismo. Los errores estándar de esos
  coeficientes son grandes.
- **El coeficiente del precio del capital sale negativo** (−0.22), lo cual es
  económicamente inadmisible: un insumo más caro no puede abaratar el costo total. No
  es un error de programación — está en el artículo original, que lo atribuye a error
  de medición en `pkap`.

Ninguna de las dos cosas la iba a señalar un asistente, porque el código es correcto.
**Replicar un resultado publicado no lo vuelve económicamente defendible**, y detectar
eso es trabajo del economista.

---

## Ejercicio de extensión

Escribe la ficha completa para uno de estos ejercicios, y luego genera el código a
partir de ella:

1. **Elección binaria** (`Clase_05`, cap. 7): logit de participación laboral con los
   datos de Mroz, reportando efectos marginales. *Cuidado: la ficha debe decir si son
   promediados o en la media, y por qué — ver el CASO 2 de `04_Verificar_resultados`.*
2. **Datos panel** (`Clase_04`, cap. 5): efectos fijos sobre el panel de salarios.
   *La ficha debe especificar el nivel de agrupamiento de los errores estándar.*
3. **Variables instrumentales** (`Clase_02`, cap. 3): 2SLS de instituciones sobre
   ingreso. *La ficha debe indicar la muestra base y qué diagnóstico de instrumento
   débil se reporta.*

En los tres casos, la parte difícil es la nota en cursivas.
