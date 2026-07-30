# Código asistido por Inteligencia Artificial

**Unidad 4 del temario** · **4.5 de las 17.5 semanas del curso** ·
*Actividad transversal: no se imparte como bloque*

---

## Cómo se usa esta carpeta

La unidad 4 son 4.5 semanas —cerca de una cuarta parte del curso— pero **no se imparte
seguida**. No tiene sentido dedicar un mes a hablar de herramientas sin problemas
econométricos sobre los que aplicarlas, y tampoco tenerla al final, cuando el proyecto
ya está entregado.

Cada subcarpeta es una actividad que **se hace la semana en que se cubre el tema
econométrico correspondiente**, sobre los datos de ese tema. La actividad de depuración
en panel se hace cuando se está viendo panel; la de verificación cuando se está viendo
diferencia en diferencias.

A diferencia del resto del repositorio, este material **no tiene respaldo en las Notas
de Clase**: no es teoría econométrica, es práctica de trabajo. Las notas se citan
constantemente, pero el contenido es propio de esta carpeta.

## Calendario transversal sugerido

| Semana aprox. | Se cubre en clase | Actividad | Unidad |
|:--:|---|---|:--:|
| 1 | Presentación del curso, `Clase_00` | `00_Flujo_de_trabajo` | 4.a |
| 2–3 | Regresión lineal, `Clase_01` | `01_Escribir_con_especificacion` | 4.c |
| 4–5 | Variables instrumentales, `Clase_02` | `03_Explicar_y_optimizar` *(explicar)* | 4.c |
| 6–7 | Datos panel, `Clase_04` | `02_Depurar` *(bugs 02 y 04)* | 4.c |
| 6–7 | Datos panel, `Clase_04` | `03_Explicar_y_optimizar` *(optimizar)* | 4.c |
| 6–7 | Datos panel, `Clase_04` | `07_Datos_y_visualizacion` | 4.b |
| 9–10 | Elección binaria, `Clase_05` | `02_Depurar` *(bugs 01 y 03)* | 4.c |
| 9–10 | Elección binaria, `Clase_05` | `04_Verificar_resultados` *(catálogo)* | 4.d |
| 12–13 | Diferencia en diferencias, `Clase_11` | `04_Verificar_resultados` *(réplica)* | 4.d |
| 12–13 | Diferencia en diferencias, `Clase_11` | `05_Reproducibilidad` | 4.d |
| 14 en adelante | — | `06_Proyecto_final` | 4.e |

Las semanas son orientativas y se ajustan al avance real del curso.

## Las actividades

| Carpeta | Qué se hace | Datos que usa |
|---|---|---|
| [`00_Flujo_de_trabajo/`](00_Flujo_de_trabajo/) | Dejar el ambiente en un estado conocido y saber leerlo | — |
| [`01_Escribir_con_especificacion/`](01_Escribir_con_especificacion/) | De la ficha de especificación al código. Réplica de Nerlove (1963) | `Clase_01` |
| [`02_Depurar/`](02_Depurar/) | Cuatro errores que **corren sin fallar** y dan un número equivocado | `Clase_02`, `04`, `05` |
| [`03_Explicar_y_optimizar/`](03_Explicar_y_optimizar/) | Explicar 2SLS matricial; medir antes de optimizar | `Clase_02`, `04` |
| [`04_Verificar_resultados/`](04_Verificar_resultados/) | Réplica de Card y Krueger (1994) y catálogo de errores que no fallan | `Clase_11`, `04`, `05` |
| [`05_Reproducibilidad/`](05_Reproducibilidad/) | Semillas, ambiente declarado y la lista de verificación de entrega | `Clase_11` |
| [`06_Proyecto_final/`](06_Proyecto_final/) | Guía, rúbrica y plantilla de repositorio | — |
| [`07_Datos_y_visualizacion/`](07_Datos_y_visualizacion/) | Del archivo crudo al cuadro y la figura que se entregan | `Clase_04` |

## Requisitos

```bash
pip install -r requirements.txt
```

Después, abrir `00_Flujo_de_trabajo/Verificar_Ambiente.ipynb` y ejecutar todas sus celdas:
comprueba versiones y que los datos del curso estén en su lugar.

Todos los cuadernos se abren **desde su propia carpeta** y leen los datos con rutas
relativas al repositorio (`../../Clase_04_DatosPanel/wage_panel.csv`), de modo que basta
con haber clonado el repositorio completo.

No requieren `linearmodels` ni `scikit-learn`: bastan `numpy`, `pandas`, `statsmodels`,
`scipy` y `matplotlib`.

Los cuadernos vienen **con sus salidas ya ejecutadas**, para poder leerlos sin correrlos.
Los de `02_Depurar` terminan con una celda vacía donde va la corrección del alumno.

---

## El hilo conductor

Las ocho actividades sostienen una sola tesis, que conviene enunciar de una vez:

> **Un asistente de IA es un buen programador y no es economista.** Escribe código
> correcto con facilidad. No sabe qué signo espera la teoría, ni a qué nivel se agrupan
> los errores estándar en este diseño, ni si el control que le pedimos es un confusor o
> un mediador. Esas decisiones son el contenido del curso, y son las que deciden si el
> número que sale sirve para algo.

De ahí la elección de diseño del material: **ningún error de estas actividades produce
un mensaje de error**. Los de sintaxis no valen la pena — se resuelven en un intento y
no enseñan nada. Los ocho casos aquí reunidos corren, imprimen tablas de aspecto normal
y entregan cifras equivocadas:

- Un modelo con colinealidad perfecta del que `statsmodels` devuelve coeficientes
  arbitrarios sin protestar, porque usa la pseudoinversa.
- Un logit con **todos** los signos invertidos porque `pd.factorize` codifica en orden
  de aparición.
- Una transformación intragrupos que destruye el **94 %** de la muestra y triplica el
  efecto sindical estimado.
- Errores estándar **2.13 veces** demasiado pequeños por no agrupar en un panel.

Y de ahí también la pregunta que organiza la evaluación de todo el material:

> La verificación no es **«¿corrió?»** sino **«¿tiene la propiedad matemática que debía
> tener?»** — y saber cuál es esa propiedad es trabajo del economista.

Casi todo objeto econométrico trae una identidad comprobable en dos líneas de código:
una variable centrada por grupo tiene media cero dentro de cada grupo; los residuales
de MCO con constante suman cero; las probabilidades ajustadas de un logit caen en
(0,1); una matriz de proyección es idempotente; los pesos de un control sintético son
no negativos y suman uno. El cuadro completo está en
[`05_Reproducibilidad/lista_de_verificacion.md`](05_Reproducibilidad/lista_de_verificacion.md).

### Dos resultados que salieron al revés de lo esperado

Vale registrarlos, porque son buen material de discusión y porque muestran que las
actividades se construyeron corriendo el código y no razonándolo:

- **Agrupar errores estándar no siempre los agranda.** En el DiD de Card y Krueger,
  agrupar por establecimiento reduce el error estándar de la interacción (1.73 → 1.34) y
  aumenta el de `tratado` (1.22 → 1.48). La dirección depende de si el regresor varía
  dentro o entre conglomerados.
- **Un diagnóstico que exonera al sospechoso vale lo mismo que uno que lo condena.** En
  el BUG 02, el cambio de muestra parecía explicar la caída del coeficiente; medido,
  explica −0.007 de −0.346. La caída es real y viene del control. Antes de medir no se
  podía saber.

---
Parte del curso de Econometría I, Facultad de Ciencias, UNAM.
Ver el [README principal](../README.md) para la correspondencia entre temario, notas y código.
