# Tarea-examen · noviembre de 2026

Sustituye al examen presencial, como se acordó en la consulta al grupo. Cubre todo el curso hasta ahora
(Notas de Clase, caps. 1 a 7): mitad teoría y mitad práctica.

## Fechas

| | Fecha |
|---|---|
| Publicación | martes 17 de noviembre de 2026, al terminar la clase de repaso |
| **Entrega** | **domingo 22 de noviembre de 2026, 23:59 h** |
| Pedir la versión equivalente | a más tardar el domingo 22 de noviembre |
| Entrega de la versión equivalente | domingo 6 de diciembre de 2026, 23:59 h |

Quien no presentó el primer parcial, o quien obtenga aquí una calificación mayor, tendrá esta tarea-examen como
sustituto de esa calificación.

## Cómo entregar

Envíe **un solo correo dirigido a los tres profesores**:

- `benjov@ciencias.unam.mx`
- `jesicatapia@gmail.com`
- `omarxalpha@gmail.com`

| | |
|---|---|
| Asunto | `Tarea-examen Econometría I – Apellido Nombre` |
| Archivo | el cuaderno **ejecutado**, con el nombre `TE_Apellido_Nombre_Cuenta.ipynb` |
| Opcional | un PDF con las derivaciones hechas a mano, si no las escribió en el cuaderno |

Antes de enviar, compruebe que el cuaderno corre completo con *Restart & Run All* y con **su** número de cuenta.

**Si no puede entregar el 22**, por el paro, por trabajo o por otra razón, escriba a los mismos tres correos a más
tardar ese día. Recibirá una versión equivalente, con otros datos, para entregar el 6 de diciembre.

## Contenido

| Parte | Contenido | Puntos |
|---|---|:--:|
| T1 | Variable omitida y DAG | 10 |
| T2 | Instrumento débil y casi exógeno | 10 |
| T3 | SUR con regresores comunes; intragrupos y primeras diferencias; θ de efectos aleatorios | 10 |
| T4 | Poisson por máxima verosimilitud; logit multinomial e IIA; probit ordenado | 10 |
| T5 | Auditoría de una respuesta escrita por un asistente de IA | 10 |
| P1 | Economías de escala y MCG con Nerlove (1963) | 10 |
| P2 | Variables instrumentales con datos simulados | 10 |
| P3 | Premio salarial sindical con datos panel (NLSY) | 10 |
| P4 | Escuela, casa o trabajo: logit multinomial con Keane y Wolpin (1997) | 10 |
| P5 | Número de hijos con un modelo Poisson (FERTIL2) | 10 |
| | Bitácora de uso de IA | obligatoria (−5 si falta) |

Cada pregunta práctica vale 10 puntos: **predicción** antes de correr (2, se califica el razonamiento, no el
acierto), **resultado** (4), **lectura** (2) y **verificación** independiente (2).

## Cómo trabajarla

1. Abra [`Tarea_Examen.ipynb`](Tarea_Examen.ipynb) en Jupyter, dentro de su copia del repositorio, o en Colab:
   <https://colab.research.google.com/github/benjov/Econometria-I-2026/blob/main/Tarea_Examen/Tarea_Examen.ipynb>.
   En Colab, corra primero `!pip install linearmodels`.
2. Escriba su **número de cuenta** en la primera celda de código y corra todo (*Restart & Run All*). Sus parámetros
   teóricos y sus muestras de datos dependen de su cuenta: sus cifras son sólo suyas.
3. Responda en las celdas marcadas **Respuesta**. Las derivaciones pueden ir en LaTeX dentro de la celda o a mano,
   en el PDF adjunto; indique en la celda dónde está cada una.

Los datos se leen de las carpetas del propio repositorio (`Clase_01`, `Clase_04`, `Clase_06` y `Clase_08`); si el
cuaderno corre fuera de él, se descargan de GitHub.

## Uso de inteligencia artificial

Está permitido. La tarea está diseñada para que, aun usándola, usted aprenda: los datos son personales, cada
pregunta práctica exige una **predicción** antes de correr y una **verificación** después, la pregunta T5 consiste
en auditar una respuesta de IA con errores, y al final hay una bitácora obligatoria. Usar IA no resta puntos;
omitir la bitácora, sí.

## Material de apoyo

- **Clase de repaso** (17 de noviembre): <https://benjov.github.io/Econometria-I-2026/repaso.html>, con
  simuladores, fórmulas clave y preguntas de autoevaluación.
- Notas de Clase, caps. 1 a 7, en [`Notas/`](../Notas).
- Los cuadernos de `Clase_01` a `Clase_08`, que contienen todas las técnicas que pide la tarea.
