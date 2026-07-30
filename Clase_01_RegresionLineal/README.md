# Regresión lineal por Mínimos Cuadrados Ordinarios

**Unidad 1 del temario** · **Notas de Clase: caps. 1 y 2**

Estimación del modelo lineal clásico sobre la **función de costos de la industria
eléctrica** de Nerlove (1963), que es la aplicación canónica del capítulo 2 de las notas.

La forma funcional se deriva de una Cobb-Douglas y del problema dual de minimización de costos,
por lo que resulta lineal en logaritmos. Puntos de interés: interpretación de los coeficientes
como elasticidades, la medida de rendimientos a escala como `1/β₂`, y la restricción de
homogeneidad de grado uno en los precios de los factores, `β₃ + β₄ + β₅ = 1`, contrastable con
una prueba F.

## Cuadernos

| Cuaderno | Unidad | Contenido |
|---|:--:|---|
| `Regresion_Lineal.ipynb` | 1.b, 1.c | MCO sobre la función de costos: estimación, bondad de ajuste, inferencia |
| `MCG_Heterocedasticidad.ipynb` | **1.e** | Mínimos Cuadrados Generalizados |

### `MCG_Heterocedasticidad.ipynb`

Los mismos datos de Nerlove presentan heterocedasticidad ligada al tamaño de la empresa
—Breusch-Pagan y White la rechazan de manera contundente, y la varianza del grupo de
empresas más pequeñas es **34 veces** la del grupo más preciso—. El propio Nerlove la
corrigió agrupando las 145 empresas en cinco grupos de 29 ordenados por producto, que es
el MCG factible que el cuaderno reproduce.

Lo que muestra, y que suele confundirse:

| | Corrige el punto estimado | Corrige la inferencia | Requiere modelar $\Omega$ |
|---|:--:|:--:|:--:|
| MCO | — | — | no |
| MCO + errores robustos | no | **sí** | no |
| MCG factible | **sí** (eficiencia) | **sí** | sí |

El error estándar robusto es casi el **doble** del clásico (0.033 contra 0.018): la
inferencia de MCO era inválida. Y MCG mueve además el punto estimado, llevando las
economías de escala de 1.39 a 1.25 — lo que sugiere que la forma Cobb-Douglas no ajusta
igual en todo el rango de tamaños, que es justo la crítica que llevó a Christensen y
Greene (1976) a la forma translogarítmica.

## Datos

`nerlove63.dta` — 145 empresas eléctricas de Estados Unidos, 1955.

## Referencias

Nerlove (1963); Christensen y Greene (1976); White (1980). Los artículos están en la carpeta.

---
Parte del curso de Econometría I, Facultad de Ciencias, UNAM.
Ver el [README principal](../README.md) para la correspondencia completa entre temario, notas y código.
