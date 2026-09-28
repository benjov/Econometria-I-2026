# Modelos de datos panel

**Unidad 2 del temario** · **Notas de Clase: cap. 5**

Estimación por regresión pool, efectos fijos y efectos aleatorios en dos paneles: uno de
**salarios** (Vella y Verbeek, 1998; 545 hombres, 1980-1987) y las **funciones de inversión de
Grunfeld** (10 empresas, 1935-1954), estas últimas verificadas contra el cuadro 2.1 de Baltagi.

Puntos de interés: las variables invariantes en el tiempo que la transformación intragrupos
aniquila —el cuaderno lo muestra con el error que devuelve `linearmodels`—, los efectos fijos de
individuo y de año, los errores estándar agrupados, y la prueba de Hausman programada a mano (sin
la constante en el contraste y con aviso cuando la diferencia de varianzas no es definida
positiva). La equivalencia con variables dicotómicas, las pruebas $F$ y de Breusch-Pagan, la
regresión de Mundlak y el parámetro θ se piden en el ejercicio de aplicación del cap. 5.

## Cuaderno

`Panel_Data_Grunfeld_Investment.ipynb`

## Datos

`wage_panel.csv` — panel de salarios.
Los datos de Grunfeld se cargan desde `statsmodels`, sin archivo local.

## Referencias

Vella y Verbeek (1998); Grunfeld y Griliches (1960); Baltagi, *Econometric Analysis of Panel
Data*; Mundlak (1978).

---
Parte del curso de Econometría I, Facultad de Ciencias, UNAM.
Ver el [README principal](../README.md) para la correspondencia completa entre temario, notas y código.
