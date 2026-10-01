# Sistemas de ecuaciones simultáneas

**Unidad 2 del temario** · **Notas de Clase: cap. 4**

Estimación de un sistema de oferta y demanda de trabajo de mujeres casadas con los datos de
Mroz (1987). Se comparan 2SLS ecuación por ecuación, 3SLS y GMM eficiente del sistema completo; la
estimación por MCO, para ver el sesgo de simultaneidad, queda como ejercicio (cap. 4 de las notas).

Puntos de interés: identificación de cada ecuación (condiciones de orden y de rango), la
necesidad de escribir `1 +` en las fórmulas de `linearmodels` para incluir la constante, y
la disyuntiva del 3SLS —más eficiente, pero un error de especificación en una sola ecuación
contamina los estimadores de todas—.

## Cuadernos

| Cuaderno | Unidad | Contenido |
|---|:--:|---|
| `Estimating Simultaneous Models.ipynb` | 2.a, 2.b, 2.d | Sistemas por variables instrumentales: 2SLS, 3SLS y GMM eficiente |
| `SUR_Grunfeld.ipynb` | **2.c** | Sistemas aparentemente no relacionados |

### `Estimating Simultaneous Models.ipynb`

Las ecuaciones de horas y salarios de Mroz (1987), **verificadas contra Wooldridge** (ej. 16.5 y
16.6). Tras estimarlas por 2SLS y 3SLS, el cuaderno sigue el orden de la sección de variables
instrumentales del cap. 4:

| Sección | Contenido | Resultado |
|---|---|---|
| Identificación | Condición de orden, $F$ de instrumentos excluidos, Sargan por ecuación | $F$ = 9.48 (horas) y **4.53** (salarios: instrumentos débiles) |
| Correlación entre ecuaciones | $\hat\Sigma$ con residuales de 2SLS, prueba LM, **diagrama de dispersión** | correlación −0.90, que es lo que aprovecha el 3SLS |
| 2SLS y 3SLS a mano | Matrices apiladas por individuo y el estimador GMM con dos $\hat{\mathbf{W}}$ | coinciden con `linearmodels` a 1e-9 |
| GMM eficiente | `IVSystemGMM` robusto y prueba $J$ de Hansen del sistema | $J$ = 5.82, gl 3, p = 0.12; GMM con $W$ «unadjusted» = 3SLS |
| Comparación | Elasticidad de la oferta de trabajo con IC y cociente de errores estándar (**figura**) | 1.26 / 1.37 / 1.61; el 3SLS reduce los once ee |
| Simulación | 2SLS frente a 3SLS cuando una ecuación está mal especificada (**figura**) | el 3SLS de la ecuación *correcta* se desplaza de 1.00 a 0.90 |

Seis ejercicios, entre ellos la estimación por MCO para ver el sesgo de simultaneidad y una
prueba de Hausman entre 2SLS y 3SLS. **Precisión sobre `IV3SLS`:** implementa el 3SLS clásico
(MCG sobre los regresores proyectados), que coincide con el GMM de las notas sólo cuando todas
las ecuaciones comparten instrumentos, como en este ejemplo. El ejercicio 3 muestra un caso en
que no.

### `SUR_Grunfeld.ipynb`

Réplica de **Zellner (1962)** con los datos de inversión de **Grunfeld (1958)**: las
funciones de inversión de General Motors y Westinghouse. Dos ecuaciones que no comparten
un solo regresor y que, sin embargo, no son independientes, porque los choques
macroeconómicos afectan a ambas empresas el mismo año.

El cuaderno programa el estimador SUR desde cero —MCG sobre el sistema apilado con
$\Omega = \Sigma \otimes I_T$— y sigue el orden que el capítulo 4 propone:

1. MCO ecuación por ecuación, **verificado contra los valores publicados** para GM
   (−149.78, 0.1193, 0.3714).
2. Estimación de $\Sigma$ y **prueba de diagonalidad** de Breusch-Pagan: LM = 0.50,
   p = 0.48. La correlación es de sólo 0.16, así que se **anticipa** que las ganancias
   serán pequeñas.
3. SUR. Los coeficientes casi no se mueven y los errores estándar caen alrededor del
   **8 %** —equivalente a haber recolectado un 19 % más de observaciones—, tal como se
   había predicho.
4. **Comprobación del teorema de equivalencia:** con regresores idénticos en ambas
   ecuaciones, SUR reproduce a MCO. La diferencia máxima resulta de 4 × 10⁻¹², lo que
   verifica que el estimador está bien programado.

**Una advertencia sobre los datos.** Circulan varias versiones incompatibles de los datos
de Grunfeld, por errores de transcripción arrastrados durante décadas; Kleiber y Zeileis
(2010) documentaron el problema. Que la ecuación de GM replique exactamente no garantiza
que las demás lo hagan, y el ejercicio 5 del cuaderno pide comprobarlo:
**verificar una ecuación no es verificar el archivo.**

## Datos

`Estimating Simultaneous Models.ipynb` carga los conjuntos incluidos en `linearmodels`.
`SUR_Grunfeld.ipynb` usa los datos de Grunfeld incluidos en `statsmodels`. En ninguno de
los dos casos hay archivo local que descargar.

## Referencias

Mroz (1987), en la carpeta. Zellner (1962); Grunfeld (1958); Breusch y Pagan (1980);
Kleiber y Zeileis (2010).

---
Parte del curso de Econometría I, Facultad de Ciencias, UNAM.
Ver el [README principal](../README.md) para la correspondencia completa entre temario, notas y código.
