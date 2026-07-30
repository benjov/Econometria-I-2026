# Lista de verificación antes de entregar

Unidad 4.d del temario. Aplica a los ejercicios del semestre y al proyecto final.

Recorrer esta lista antes de cada entrega. No es burocracia: cada punto corresponde a
un error que efectivamente ocurre y que las actividades de esta carpeta reproducen.

---

## 1. El cuaderno corre

- [ ] **Reiniciar el kernel y ejecutar todo de principio a fin.** Un cuaderno que
      depende del orden en que se ejecutaron las celdas no es reproducible, aunque en
      pantalla se vea bien. En Jupyter: *Kernel → Restart & Run All*.
- [ ] Ninguna celda depende de una variable que se definió y luego se borró de una
      celda que ya no existe.
- [ ] Las rutas de datos son **relativas** (`../Clase_04_DatosPanel/wage_panel.csv`),
      nunca absolutas (`/Users/mi-nombre/Escritorio/...`).
- [ ] Los datos que el cuaderno necesita están en el repositorio, o el cuaderno los
      descarga con código.

## 2. El ambiente está declarado

- [ ] `requirements.txt` incluye las bibliotecas usadas, con versión.
- [ ] La versión de Python está anotada.
- [ ] Si hay aleatoriedad, la **semilla está fija y declarada en el texto**, no sólo en
      el código. Usar `np.random.default_rng(semilla)`, no `np.random.seed()`
      (ver `Semilla_Y_Reproducibilidad.ipynb`).

## 3. Los datos son los que se cree

- [ ] `N` reportado coincide con el `N` que el modelo usó de verdad. `statsmodels`
      elimina faltantes **sin avisar** (BUG 02).
- [ ] Los faltantes están contados y reportados, no descartados en silencio.
- [ ] Las variables categóricas están codificadas **explícitamente**, nombrando la
      categoría que vale 1. Nunca con `pd.factorize`, `cat.codes` ni `LabelEncoder`
      sobre una variable cuyo signo se va a interpretar (BUG 03).
- [ ] Al comparar dos modelos, ambos se estimaron sobre **la misma muestra**.

## 4. El estimador es el que se quería

- [ ] Ninguna variable dummy está incluida junto con todas sus categorías y la
      constante. Revisar el **número de condición** de la matriz de regresores: si es
      del orden de 10¹⁶, hay colinealidad perfecta (BUG 01).
- [ ] Los errores estándar están al **nivel de agrupamiento** correcto, que es el
      nivel al que se asignó el tratamiento o al que se repite la observación.
- [ ] Los efectos marginales de un modelo no lineal están **promediados (AME)** si es
      eso lo que se reporta, y el texto dice cuál de los dos es (CASO 2).
- [ ] Los coeficientes de un modelo con dependiente en logaritmos se interpretan con
      `exp(b) − 1` cuando el regresor es discreto (CASO 4).
- [ ] No se comparan `R²` entre modelos con **distinta variable dependiente** (CASO 3).

## 5. Hay al menos una verificación independiente

Al menos **una** de éstas, y decir en el texto cuál se hizo:

- [ ] El resultado se contrasta contra un **número publicado** (artículo original).
- [ ] El mismo objeto se calcula por **dos vías independientes** que deben coincidir
      (por ejemplo: DiD por medias y por regresión).
- [ ] Se comprueba una **identidad matemática** que el objeto debe cumplir:

| Objeto | Propiedad comprobable |
|---|---|
| Variable centrada por grupo | media cero dentro de cada grupo |
| Residuales de MCO con constante | suman cero; ortogonales a los regresores |
| Probabilidades ajustadas de logit/probit | dentro de (0, 1) |
| Matriz de proyección | simétrica e idempotente |
| Pesos de control sintético | no negativos y suman uno |
| Descomposición sesgo-varianza | error de prueba = sesgo² + varianza + σ² |

## 6. Los signos y las magnitudes tienen sentido

- [ ] **Antes de estimar** se anotó qué signo espera la teoría para cada coeficiente
      de interés. Los signos estimados se comparan contra esa lista.
- [ ] Las magnitudes son plausibles en las unidades de los datos. Una elasticidad de
      47 o una probabilidad de 1.3 son señales de error, no hallazgos.
- [ ] Si un resultado contradice la literatura, el trabajo lo dice explícitamente y
      ofrece una explicación, en lugar de presentarlo sin comentario.

## 7. El uso de IA está documentado

- [ ] El trabajo declara **en qué se usó** un asistente de IA: escribir código,
      depurar, redactar, buscar referencias.
- [ ] **Toda cita bibliográfica fue verificada contra la fuente real.** Los modelos
      generativos producen referencias inexistentes con formato impecable: autores
      reales, revista real, título verosímil, año plausible, y el artículo no existe.
      Hay que abrir cada una.
- [ ] Ningún resultado numérico proviene de un modelo generativo. Los números salen de
      correr código sobre datos.
- [ ] El alumno **puede explicar cada línea** del código que entrega. Si no puede
      explicarla, no la entrega.

---

## El criterio de fondo

La pregunta de verificación no es **«¿corrió?»** sino **«¿tiene la propiedad que
debía tener?»**.

Las cuatro actividades de `02_Depurar` corren sin un solo mensaje de error y las
cuatro entregan números equivocados. Los cuatro casos de
`04_Verificar_resultados/Errores_Que_No_Fallan.ipynb` son código correcto, con el error
en lo que se reporta. Ninguno de los ocho lo señala una herramienta.

**La responsabilidad del resultado es de quien lo firma.** Un asistente de IA es un
buen programador y no es economista: no sabe qué signo espera la teoría, ni a qué
nivel se agrupan los errores estándar en este diseño, ni si el control que le pedimos
es un confusor o un mediador. Eso es lo que se estudia en el resto del curso, y es lo
que esta unidad pide poner a trabajar.
