# Econometría I — Facultad de Ciencias, UNAM

Material de código del curso de **Econometría I**, semestre **2027-I** (agosto–diciembre 2026).

**Profesores:** Benjamín Oliva (benjov@ciencias.unam.mx) · Jésica Tapia (jesicatapia@gmail.com)

Este repositorio contiene los cuadernos de Jupyter con las aplicaciones empíricas del curso y los
conjuntos de datos necesarios para reproducirlas. La exposición teórica está en las **Notas de
Clase**, y cada cuaderno corresponde a una sección concreta de esas notas.

> **Este material sirve a más de una materia.** Las Notas de Clase son un documento único que
> cubre **Econometría I y Econometría II**, con enfoques distintos: la primera se concentra en la
> estimación e interpretación de parámetros, y la segunda extiende el instrumental hacia el
> análisis de datos y el aprendizaje estadístico. El repositorio aloja el corpus completo.
>
> El cuadro de la sección siguiente marca con **`[I]`** las carpetas que corresponden al temario
> de Econometría I y con **`[+]`** las que son material adicional, fuera de ese temario.

### Documentos del curso

| Documento | Ubicación |
|---|---|
| **Notas de Clase** (teoría, demostraciones y ejercicios; Econometría I y II) | [`Notas/Notas-Econometria-FE-UNAM.pdf`](Notas/Notas-Econometria-FE-UNAM.pdf) |
| **Temario oficial de Econometría I** (objetivos, unidades, evaluación) | [`Notas/Programa_Econometria_I.pdf`](Notas/Programa_Econometria_I.pdf) |
| *Edición anterior de las notas* (Econometría II, febrero 2025; superada) | [`Notas/Notas-Econometría-II-FE-UNAM.pdf`](Notas/Notas-Econometría-II-FE-UNAM.pdf) |

Si alguno de los dos no estuviera disponible en el repositorio, la versión vigente está siempre en
la [carpeta compartida del curso](https://drive.google.com/drive/folders/1dhWf9xWX3Q_XpEDNyhI2rnwQ5ljbyQC5?usp=sharing).

---

## Cómo usar este repositorio

1. **Clona o descarga** el repositorio completo. Los datos viven junto a cada cuaderno, de modo
   que las rutas relativas funcionan sin ajustes.
2. **Abre el cuaderno** de la clase correspondiente con Jupyter, Visual Studio Code o Google
   Colab. Si usas Colab, sube también el archivo de datos de esa carpeta.
3. **Lee primero** la sección de las notas que se indica en el cuadro de abajo: los cuadernos
   suponen que la teoría ya se discutió y no la repiten.

### Requisitos

```bash
pip install numpy pandas matplotlib seaborn statsmodels linearmodels scikit-learn
```

Algunos cuadernos usan módulos auxiliares incluidos en su propia carpeta (`heckman.py`,
`tobit.py`, `helper_functions.py`): no hay que instalarlos, basta con ejecutar el cuaderno desde
esa carpeta.

---

## Correspondencia entre temario, notas y código

El temario oficial está en `Notas/Programa_Econometria_I.pdf`. La numeración de las carpetas sigue
el orden de exposición de las Notas de Clase.

### Material preparatorio — Introducción a Python

| Carpeta | Contenido |
|---|---|
| `Clase_00_IntroduccionPython/` `[I]` | Fundamentos del lenguaje: primer programa, tipos de datos, variables, funciones, paquetes propios y de terceros, instalación de dependencias. Corresponde a los incisos 4.a y 4.b del temario, pero se cubre al inicio del semestre. |

### Unidad 1 — Estimación del Modelo Lineal Clásico *(5 semanas)*

| Carpeta | Notas | Aplicación |
|---|---|---|
| `Clase_01_RegresionLineal/` `[I]` | caps. 1, 2 y 4 | Función de costos de la industria eléctrica, Nerlove (1963); MCG con heterocedasticidad |
| `Clase_02_VariablesInstrumentales/` `[I]` | cap. 3 | Orígenes coloniales del desarrollo, Acemoglu, Johnson y Robinson (2001) |

### Unidad 2 — Estimación de Sistemas de Ecuaciones *(3 semanas)*

| Carpeta | Notas | Aplicación |
|---|---|---|
| `Clase_03_SistemasDeEcuaciones/` `[I]` | cap. 4 | Oferta y demanda de trabajo de mujeres casadas, Mroz (1987); SUR con los datos de Grunfeld (1958) |
| `Clase_04_DatosPanel/` `[I]` | cap. 5 | Inversión de Grunfeld y panel de salarios |

### Unidad 3 — Modelos No Lineales y temas selectos *(5 semanas)*

| Carpeta | Notas | Aplicación |
|---|---|---|
| `Clase_05_EleccionBinaria/` `[I]` | cap. 7 | Participación laboral femenina, Mroz |
| `Clase_06_LogitMultinomial/` `[I]` | cap. 7 | Decisiones ocupacionales, Keane y Wolpin (1997) |
| `Clase_07_LogitOrdinal/` `[I]` | caps. 7 y 11 | Clasificación de videojuegos a partir de etiquetas de Steam |
| `Clase_08_ModelosDeConteo/` `[I]` | cap. 7 | Fecundidad en Botsuana (FERTIL2) |
| `Clase_09_SeleccionDeMuestra/` `[I]` | cap. 8 | Modelo de Heckman: salarios de mujeres |
| `Clase_10_TruncamientoYCensura/` `[I]` | cap. 8 | Modelo Tobit: consumo de gas LP |
| `Clase_11_DiferenciaEnDiferencias/` `[I]` | cap. 9 | Salario mínimo y empleo, Card y Krueger (1994) |
| `Clase_12_ControlSintetico/` `[I]` | cap. 9 | Proposición 99 de California, Abadie et al. (2010) |
| `Clase_13_ModelosDeDuracion/` `[I]` | cap. 10 | Kaplan-Meier, Weibull y Cox: remisión de leucemia (Freireich et al., 1963) y afiliación sindical (NLSY) |

**Máxima verosimilitud** (cap. 6 de las notas, unidad 3.a del temario) no tiene carpeta propia: se
aplica de forma transversal en los cuadernos de elección binaria, multinomial, ordinal, de conteo,
Tobit y Heckman. El ejercicio 8 del capítulo 6 de las notas pide programar la verosimilitud del
probit desde cero, y es un buen punto de partida si se quisiera un cuaderno dedicado.

### Unidad 4 — Código asistido por IA y aplicaciones en Python *(4.5 semanas)*

| Carpeta | Temario | Estado |
|---|---|---|
| `Clase_00_IntroduccionPython/` `[I]` | 4.a, 4.b | Fundamentos del lenguaje *(ver arriba: se cubre al inicio del semestre)* |
| `Clase_15_CodigoAsistidoPorIA/` `[I]` | 4.b, 4.c, 4.d, 4.e | Ocho actividades transversales, en cuadernos ejecutados |

Esta unidad **no se imparte como bloque**: son 4.5 semanas que se reparten a lo largo del
semestre, haciendo cada actividad la semana en que se cubre el tema econométrico correspondiente
y sobre los datos de ese tema. El calendario sugerido está en el
[README de la carpeta](Clase_15_CodigoAsistidoPorIA/README.md).

| Actividad | Se hace junto con | Temario |
|---|---|:--:|
| `00_Flujo_de_trabajo` | `Clase_00` | 4.a |
| `01_Escribir_con_especificacion` | `Clase_01` | 4.c |
| `02_Depurar` | `Clase_04` y `Clase_05` | 4.c |
| `03_Explicar_y_optimizar` | `Clase_02` y `Clase_04` | 4.c |
| `04_Verificar_resultados` | `Clase_11` y `Clase_05` | 4.d |
| `05_Reproducibilidad` | `Clase_11` | 4.d |
| `06_Proyecto_final` | últimas semanas | 4.e |
| `07_Datos_y_visualizacion` | `Clase_04` | 4.b |

### Material adicional, fuera del temario de Econometría I

| Carpeta | Notas | Contenido |
|---|---|---|
| `Clase_14_AprendizajeEstadistico/` `[+]` | cap. 11 | Regresión restringida, componentes principales, agrupamiento, árboles y redes neuronales |

El capítulo 11 de las notas **no forma parte del temario de Econometría I**: la unidad 4 de ese
temario trata del flujo de trabajo en Python y del uso de IA generativa para escribir código, no de
métodos de aprendizaje automático. Este material corresponde al enfoque de Econometría II.

---

## Verificación de cobertura contra el temario

Contrastando el temario oficial (`Notas/Programa_Econometria_I.pdf`) inciso por inciso:

| Unidad | Inciso | Tema | Notas | Código | Estado |
|:--:|:--:|---|---|---|---|
| 1 | a | Gráficos acíclicos dirigidos (DAG) | cap. 1 §1.9 | — | Sólo teoría, no requiere cuaderno |
| 1 | b | MLC, supuestos, propiedades y teoremas | caps. 1 y 2 | `Clase_01` | Cubierto |
| 1 | c | Propiedades y métodos de estimación de MCO | cap. 2 | `Clase_01` | Cubierto |
| 1 | d | Método de Variables Instrumentales | cap. 3 | `Clase_02` | Cubierto |
| 1 | e | Mínimos Cuadrados Generalizados (MCG) | cap. 4 §4.3 | `Clase_01` | Cubierto |
| 2 | a | Sistemas de ecuaciones por MCO | cap. 4 §4.2 | `Clase_03` | Cubierto |
| 2 | b | Propiedades de los estimadores | cap. 4 | `Clase_03` | Cubierto |
| 2 | c | Sistemas Aparentemente No Relacionados (SUR) | cap. 4 §4.4 | `Clase_03` | Cubierto |
| 2 | d | Sistemas de ecuaciones por Variables Instrumentales | cap. 4 §4.6 | `Clase_03` | Cubierto |
| 2 | e | Modelos de Datos Panel | cap. 5 | `Clase_04` | Cubierto |
| 3 | a | Introducción a Máxima Verosimilitud | cap. 6 | transversal | Aplicado en varios cuadernos |
| 3 | b | Modelos de Elección Discreta | cap. 7 | `Clase_05`/`06`/`07` | Cubierto |
| 3 | c | Modelos con censura y truncamiento | cap. 8 | `Clase_09`/`10` | Cubierto |
| 3 | d | Modelos de Conteo y de Duración | caps. 7 y 10 | `Clase_08` y `Clase_13` | Cubierto |
| 3 | e | Efectos de tratamiento (DiD) | cap. 9 | `Clase_11` | Cubierto |
| 3 | f | Control sintético | cap. 9 | `Clase_12` | Cubierto |
| 4 | a | Flujo de trabajo en Python, ambientes, documentación | — | `Clase_00`, `Clase_15/00` | Cubierto |
| 4 | b | pandas, numpy, matplotlib, seaborn | — | `Clase_00`, `Clase_15/07` | Cubierto |
| 4 | c | IA generativa para escribir, depurar y explicar código | — | `Clase_15/01`, `02`, `03` | Cubierto |
| 4 | d | Uso responsable de IA: verificación, reproducibilidad | — | `Clase_15/04`, `05` | Cubierto |
| 4 | e | Proyectos aplicados: repositorios, notebooks reproducibles | — | `Clase_15/06` | Cubierto |

**Resumen: los 21 incisos del temario están cubiertos.** De ellos, 19 tienen cuaderno propio,
1 es sólo teoría (1.a, los DAG) y 1 se trabaja de forma transversal en seis cuadernos distintos
(3.a, máxima verosimilitud).

## Verificación contra resultados publicados

Los cuadernos que replican un artículo contrastan su resultado contra el número publicado, y lo
dejan impreso en la salida. Es la práctica que la unidad 4 busca instalar:

| Cuaderno | Réplica de | Publicado | Obtenido |
|---|---|---:|---:|
| `Clase_01/MCG_Heterocedasticidad` | Nerlove (1963) | 0.721 | 0.7204 |
| `Clase_02` · `Clase_15/03` | Acemoglu et al. (2001), cuadro 4 | 0.94 | 0.9443 |
| `Clase_03/SUR_Grunfeld` | Zellner (1962), ecuación de GM | −149.78 | −149.7825 |
| `Clase_11` · `Clase_15/04` | Card y Krueger (1994), cuadro 3 | 2.76 | 2.75 |
| `Clase_13/Modelos_De_Duracion` | Freireich et al. (1963), log-rank | 16.79 | 16.793 |

## Material adicional pendiente

- **`Clase_14_AprendizajeEstadistico/`** — acompañaría al capítulo 11 de las notas. **No es parte
  del temario de Econometría I**: corresponde al enfoque de Econometría II.

---

## Otros recursos del curso

- **Videos de las clases:**
  <https://www.youtube.com/playlist?list=PLlCKfRj1U6SxFNrR7vLe_xMefqbdM1XTB>
- **Material complementario** (bibliografía, artículos, notas):
  <https://drive.google.com/drive/folders/1dhWf9xWX3Q_XpEDNyhI2rnwQ5ljbyQC5?usp=sharing>
- **Pizarras de la clase:**
  <https://cideo365-my.sharepoint.com/:o:/g/personal/benjamin_oliva_cide_edu/IgCe7ZqyIFkST4MDqrtd5qBKAa_Tc63EIS2S1ahGn1ggXio?e=OhTbPj>
- **Introducción a Python:** <https://learnpython.org/>

## Evaluación

| Componente | Peso | Fecha tentativa |
|---|---|---|
| Examen parcial | 30 % | 2 de octubre de 2026 |
| Proyecto final en equipo (2 a 3 personas) | 40 % | 4 de diciembre de 2026 |
| Ejercicios a lo largo del semestre | 30 % | — |

Las fechas definitivas se acuerdan en clase. Las Notas de Clase incluyen ejercicios al final de
cada capítulo.

## Bibliografía principal

- **Wooldridge, J. M. (2010)** *Econometric Analysis of Cross Section and Panel Data*, 2a ed.
  MIT Press. **[texto del curso]**
- Greene, W. H. (2012) *Econometric Analysis*, 7a ed. Prentice Hall.
- Cameron, A. C. y Trivedi, P. K. (2005) *Microeconometrics: Methods and Applications*.
  Cambridge University Press.
- Cunningham, S. (2021) *Causal Inference: The Mixtape*. Yale University Press.
- Huntington-Klein, N. (2022) *The Effect: An Introduction to Research Design and Causality*.
  CRC Press.
- James, G., Witten, D., Hastie, T. y Tibshirani, R. (2013) *An Introduction to Statistical
  Learning*. Springer.

La lista completa, con los artículos discutidos en cada capítulo, está en la bibliografía de las
Notas de Clase.
