# Modelos de duración

**Unidad 3.d del temario** · **Notas de Clase: capítulo 10**

Cuaderno: [`Modelos_De_Duracion.ipynb`](Modelos_De_Duracion.ipynb)

Los modelos de duración analizan el tiempo que transcurre hasta que ocurre un evento.
Lo que los distingue de una regresión ordinaria es la **censura**: al cerrar el periodo de
observación algunos episodios siguen en curso, y sabemos que duraron *al menos* tanto,
pero no cuánto. Descartar esas observaciones sesga el resultado hacia abajo; tratarlas
como completas también.

## Estructura

El cuaderno está organizado en dos partes, y el orden es deliberado.

### Parte 1 — Validar la implementación contra un resultado publicado

Datos de **Freireich *et al.* (1963)**: ensayo clínico aleatorizado sobre remisión de
leucemia, 21 pacientes tratados con 6-mercaptopurina y 21 con placebo, con 57 % de censura
en el grupo tratado. Es el conjunto de datos canónico del análisis de supervivencia y se
reproduce en Kleinbaum y Klein, que está en la bibliografía del curso.

Se programan **Kaplan-Meier** y la **prueba de rangos logarítmicos** desde cero, y se
contrastan contra los valores publicados:

| | Cuaderno | Publicado |
|---|---:|---:|
| Mediana 6-MP | 23 semanas | 23 semanas |
| Mediana placebo | 8 semanas | 8 semanas |
| Log-rank $\chi^2$ | 16.793 | 16.79 |

### Parte 2 — Aplicar a una pregunta económica

**¿Cuánto tarda un trabajador en afiliarse a un sindicato?** Con el panel de salarios de
la NLSY que ya está en el repositorio (Vella y Verbeek, 1998): 408 hombres que en 1980 no
estaban afiliados, de los cuales 143 se afilian antes de 1987 y el **65 % queda censurado**.

Se estiman tres modelos y se comparan:

- **Weibull por máxima verosimilitud**, programando la log-verosimilitud con censura
  directamente, con errores estándar por hessiano numérico. Da $\alpha = 1.004$: no se
  rechaza riesgo constante.
- **Cox** por verosimilitud parcial. Cada año adicional de escolaridad reduce cerca de 9 %
  la tasa de afiliación; ser afroamericano la aumenta 83 %.
- **Tiempo discreto con enlace cloglog**, que es lo que corresponde a duraciones medidas
  en años enteros.

## Los dos puntos que el cuaderno busca dejar claros

**1. La censura es información, no un defecto.** Las dos estrategias ingenuas dan 2.5 y
5.5 años; Kaplan-Meier muestra que a los siete años el 64 % sigue sin afiliarse, de modo
que **la mediana ni siquiera está identificada**. Es una respuesta menos cómoda y es la
correcta.

**2. Tres estimadores con supuestos distintos coinciden.** Cox, cloglog y Weibull llegan a
los mismos coeficientes hasta la segunda o tercera cifra. No es casualidad: el modelo de
tiempo discreto con enlace cloglog es el que resulta de agrupar un proceso de riesgos
proporcionales. La coincidencia es una **predicción teórica que se comprueba**, y sirve de
verificación cruzada en el sentido de la unidad 4.

## Advertencia sobre la dependencia de la duración

No rechazar $\alpha = 1$ **no** demuestra que el riesgo individual sea constante. Si
conviven trabajadores con propensiones distintas, los de riesgo alto se afilian primero y
el riesgo agregado decrece aunque el de cada individuo sea constante — la heterogeneidad
no observada del capítulo 10. Con siete periodos y 65 % de censura no hay manera de
separar ambas cosas.

## Datos

Ninguno propio: el cuaderno usa `../Clase_04_DatosPanel/wage_panel.csv` y los datos de
Freireich, que van escritos en el propio cuaderno por ser 42 observaciones.

## Referencias

- Freireich, E. J. *et al.* (1963), *Blood* 21(6): 699-716.
- Vella, F. y M. Verbeek (1998), *Journal of Applied Econometrics* 13(2): 163-183.
- Cox, D. R. (1972), *JRSS B* 34(2): 187-220.
- Kaplan, E. L. y P. Meier (1958), *JASA* 53(282): 457-481.
- Kiefer, N. M. (1988), *Journal of Economic Literature* 26(2): 646-679.

---
Parte del curso de Econometría I, Facultad de Ciencias, UNAM.
Ver el [README principal](../README.md) para la correspondencia completa entre temario, notas y código.
