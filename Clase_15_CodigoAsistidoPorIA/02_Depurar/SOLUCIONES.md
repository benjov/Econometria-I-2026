# Soluciones — actividades de depuración

> **No abrir antes de intentar cada actividad.** El valor del ejercicio está en
> localizar el error sin la respuesta a la vista.

Un rasgo común a los cuatro casos: **ninguno produce un mensaje de error.** Los
cuatro corren, imprimen una tabla de regresión de aspecto normal y entregan un número
equivocado. Esa es la clase de error que importa cuando se escribe código con ayuda
de un asistente, porque el asistente tampoco los detecta: lo que falla no es la
sintaxis sino la correspondencia entre el código y el modelo econométrico.

---

## BUG 01 — Colinealidad perfecta

**Qué estaba mal.** El modelo incluye `univ_si`, `univ_no` y la constante. Pero
`univ_si + univ_no = 1` para toda observación, y la constante es exactamente ese
vector de unos: una columna de la matriz de regresores es combinación lineal exacta
de las otras dos. `X'X` es singular y `beta` no está identificada — hay infinitas
combinaciones de los tres coeficientes que producen el mismo ajuste.

**Por qué no falla.** `statsmodels` calcula `beta` con la **pseudoinversa de
Moore-Penrose**, no con la inversa. Ante una matriz singular no lanza excepción:
devuelve una de las infinitas soluciones, la de norma mínima. Los errores estándar y
los valores p que reporta son aritméticamente consistentes con esa solución
arbitraria, y por eso se ven razonables.

**La señal en la propia salida.** El número de condición: `2.833e+16`. En una matriz
bien condicionada es del orden de 10 a 10³. Un valor cercano a 10¹⁶ —el recíproco de
la precisión de punto flotante— indica singularidad numérica. Es el único indicio que
el cuaderno imprime.

**La corrección.** Omitir una categoría, que pasa a ser la base de comparación:

```python
datos["univ"] = (datos["wc"] == "yes").astype(int)
regresores = sm.add_constant(datos[["univ", "age"]])
```

Resultado correcto:

| | coef |
|---|---:|
| const | 0.7141 |
| univ | 0.1493 |
| age | −0.0044 |

Número de condición: **236.9**. Ahora sí es interpretable: tener educación superior
se asocia con 14.9 puntos porcentuales más de probabilidad de participar, **respecto
de no tenerla**. La lectura ingenua del cuaderno («ambas categorías suben la
participación») era imposible precisamente porque no había base contra la cual subir.

**La pregunta que el cuaderno deja planteada** —¿cuál es la base?— no tiene respuesta
en el modelo mal especificado. Ahí está el error.

---

## BUG 02 — La muestra cambia al agregar un control

**Qué estaba mal.** Nada en el código, y ahí está la trampa. `statsmodels` elimina
los renglones con faltantes en cualquiera de las variables del modelo (`missing='drop'`
por omisión) y **no lo anuncia**. El modelo sin control usa 111 países; el modelo con
control usa 102. Comparar sus coeficientes mezcla dos cosas: el efecto de condicionar
y el efecto de cambiar la población.

**El procedimiento correcto.** Estimar los dos modelos sobre la muestra común:

```python
comun = datos.dropna(subset=["logpgp95", "avexpr", "loghjypl"])
a = smf.ols("logpgp95 ~ avexpr", data=datos).fit()   # muestra grande
b = smf.ols("logpgp95 ~ avexpr", data=comun).fit()   # muestra común, sin control
c = smf.ols("logpgp95 ~ avexpr + loghjypl", data=comun).fit()
```

Descomposición del cambio en `beta_avexpr`:

| Paso | β | N | Cambio |
|---|---:|---:|---:|
| A · sin control, muestra grande | 0.5319 | 111 | — |
| B · sin control, muestra común | 0.5245 | 102 | −0.0074 *(efecto muestra)* |
| C · con control, muestra común | 0.1856 | 102 | −0.3389 *(efecto control)* |

**El resultado, que conviene subrayar.** El cambio de muestra explica −0.007 de una
caída total de −0.346: prácticamente nada. **El sospechoso queda exonerado.** La
caída del coeficiente es real y viene del control, no del cambio de población.

Esto no vuelve inútil el diagnóstico: lo vuelve necesario. Antes de correrlo no se
podía saber, y la conclusión «el control se come el efecto» era una afirmación sin
respaldo. Después de correrlo es una afirmación verificada. Un diagnóstico que
descarta una explicación alternativa vale exactamente lo mismo que uno que la
confirma.

**Lo que queda pendiente, y es harina de otro costal.** Que el coeficiente caiga al
controlar por producto por trabajador no dice todavía si el control es legítimo.
`loghjypl` es plausiblemente un **mediador** del efecto de las instituciones sobre el
ingreso, no un confusor: si las instituciones operan *a través* de la productividad,
controlar por ella cierra el canal de interés y sesga el efecto total hacia cero.
Esta es la discusión de la sección de DAG del capítulo 1 y de las rutas traseras. El
diagnóstico estadístico no la resuelve; la resuelve el argumento causal.

---

## BUG 03 — Signos invertidos

**Qué estaba mal.** Una sola línea:

```python
codigos, categorias = pd.factorize(datos["lfp"])
```

`pd.factorize` asigna los códigos **en orden de aparición**, no en orden alfabético ni
lógico. El primer renglón del archivo de Mroz tiene `lfp = 'yes'`, de modo que
`'yes'` recibe el código **0** y `'no'` el código **1**. La variable dependiente
construida así vale 1 cuando la mujer **no** participa: el logit está modelando
`P(no participa)`.

**Consecuencia exacta.** Como el modelo binario es simétrico, invertir la variable
dependiente **niega todos los coeficientes** (incluida la constante) y deja intactos
los errores estándar, los estadísticos z en valor absoluto, los valores p y la
log-verosimilitud. No hay una sola cifra de diagnóstico que se vea mal. Por eso el
cuaderno imprime `Convergencia: True` y una tabla impecable.

**Comprobación numérica** (logit sobre `age` y `k5`):

| | mal (factorize) | bien |
|---|---:|---:|
| Intercept | −3.0858 | 3.0858 |
| age | 0.0585 | −0.0585 |
| k5 | 1.3204 | −1.3204 |

Idénticos y con signo opuesto, lo que confirma el diagnóstico.

**La corrección.** Codificar explícitamente, nombrando la categoría que es el 1:

```python
datos["participa"] = (datos["lfp"] == "yes").astype(int)
```

La regla general: **nunca dejar que el orden del archivo decida la codificación de una
variable categórica.** `factorize` es útil para etiquetar identificadores sin
significado (estados, empresas); es peligroso para variables cuyo signo interpretamos.
El mismo cuidado aplica a `astype('category').cat.codes` y a `LabelEncoder`.

**La lección de método.** El único control de calidad que atrapa este error es
**saber qué signo espera la teoría antes de estimar**. El cuaderno lo hace explícito con
su cuadro de signos esperados; conviene escribirlo así en el trabajo propio. Ningún
asistente de IA, ninguna prueba de software y ningún diagnóstico estadístico iban a
señalar nada, porque desde el punto de vista del código no hay nada roto.

---

## BUG 04 — Transformación intragrupos desalineada

**Qué estaba mal.**

```python
media_por_individuo = panel.groupby("nr")[variable].mean()   # índice: nr
centradas[variable + "_c"] = panel[variable] - media_por_individuo
```

`groupby(...).mean()` devuelve una Serie **indexada por el identificador de
individuo** (`nr`: 13, 17, 18, …, 12548), mientras `panel[variable]` está indexada por
la posición del renglón (0, 1, 2, …, 4359). Al restar dos Series, pandas **alinea por
índice**, no por posición: el resultado sólo tiene valor donde ambos índices coinciden
por casualidad —donde existe un `nr` que además es un número de renglón válido— y
`NaN` en el resto.

De 4,360 observaciones sobreviven **266**, y esas 266 están emparejadas con la media
de un individuo que no es el suyo. No es que se pierda información: es que la que
queda está mal.

**La corrección.** `transform` devuelve el resultado con la forma del DataFrame
original, repitiendo la media de cada grupo en todos sus renglones:

```python
centradas[variable + "_c"] = panel[variable] - panel.groupby("nr")[variable].transform("mean")
```

**Comparación de resultados:**

| | mal | bien |
|---|---:|---:|
| N efectivo | 266 | 4,360 |
| `exper_c` | 0.1142 | 0.1168 |
| `expersq_c` | −0.0076 | −0.0043 |
| `union_c` | **0.2467** | **0.0821** |
| `married_c` | **0.2302** | **0.0453** |
| máx. desviación de cero | **1.857174** | 2.8 × 10⁻¹⁶ |

El efecto sindical queda **tres veces más grande** de lo que es, y la prima por
matrimonio **cinco veces**. Son las magnitudes que uno reportaría, y ninguna alarma
se habría encendido.

**La prueba que lo delata.** Una variable centrada por grupo tiene, por
construcción, media cero **dentro de cada grupo**. La versión correcta da 2.8 × 10⁻¹⁶
—cero, hasta la precisión de punto flotante—; la versión mala da 1.86. Esta
comprobación no requiere conocer la respuesta: se deriva de la definición de la
transformación.

**La lección de método, que es la más importante de las cuatro.** La pregunta de
verificación no es *«¿corrió?»* sino *«¿tiene la propiedad matemática que debía
tener?»*. Casi todo objeto econométrico trae consigo una identidad comprobable:

| Objeto | Propiedad que debe cumplirse |
|---|---|
| Variable centrada por grupo | media cero dentro de cada grupo |
| Residuales de MCO con constante | suma cero y ortogonales a cada regresor |
| Probabilidades ajustadas de un logit | dentro de (0, 1) |
| Matriz de proyección | idempotente, `P = P'= PP` |
| Pesos de control sintético | no negativos y suman uno |
| Descomposición sesgo-varianza | error de prueba = sesgo² + varianza + σ² |

Programar la comprobación **cuesta dos líneas y atrapa errores que ninguna
herramienta señala.** Esa es la práctica que la unidad 4 busca instalar.
