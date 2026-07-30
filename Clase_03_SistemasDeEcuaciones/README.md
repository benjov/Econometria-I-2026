# Sistemas de ecuaciones simultáneas

**Unidad 2 del temario** · **Notas de Clase: cap. 4**

Estimación de un sistema de oferta y demanda de trabajo de mujeres casadas con los datos de
Mroz (1987). Se comparan MCO, 2SLS ecuación por ecuación y 3SLS del sistema completo.

Puntos de interés: identificación de cada ecuación (condiciones de orden y de rango), el sesgo de
simultaneidad que se aprecia al comparar MCO con las estimaciones por variables instrumentales, y
la disyuntiva del 3SLS —más eficiente, pero un error de especificación en una sola ecuación
contamina los estimadores de todas—.

## Cuadernos

| Cuaderno | Unidad | Contenido |
|---|:--:|---|
| `Estimating Simultaneous Models.ipynb` | 2.a, 2.b, 2.d | Sistemas por MCO y por variables instrumentales |
| `SUR_Grunfeld.ipynb` | **2.c** | Sistemas aparentemente no relacionados |

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
