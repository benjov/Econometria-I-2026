# Aprendizaje estadístico

**Material adicional — fuera del temario de Econometría I** · **Notas de Clase: cap. 11**

> **Carpeta pendiente de desarrollar.**

Este tema **no forma parte del temario de Econometría I**. La unidad 4 de ese temario trata del
flujo de trabajo en Python y del uso de inteligencia artificial generativa para escribir código
(ver `Clase_15_CodigoAsistidoPorIA`), no de métodos de aprendizaje automático. El capítulo 11 de
las notas corresponde al enfoque de **Econometría II**, y se conserva aquí porque el repositorio
aloja el corpus completo que sirve a ambos cursos.

El capítulo 11 es el más extenso del documento y **no tiene cuadernos** que lo acompañen.

Lo que debería contener, siguiendo los ejercicios del capítulo 11:

1. **Sesgo y varianza:** simulación con polinomios de grado creciente que reproduzca el error de
   entrenamiento decreciente frente al error de prueba en forma de U.
2. **Ridge y Lasso:** estandarización de los regresores, elección de `λ` por validación cruzada,
   trayectorias de los coeficientes, y verificación de que el Lasso produce ceros exactos y Ridge
   no.
3. **Componentes principales** y agrupamiento por K-medias y jerárquico.
4. **Árboles, bosques aleatorios y boosting**, con medidas de importancia de variables.
5. **Red neuronal** con una capa oculta, comparada contra un logit sobre el mismo problema de
   clasificación, discutiendo la disyuntiva entre capacidad predictiva e interpretabilidad.

**Herramientas:** `scikit-learn`. El cuaderno de `Clase_07_LogitOrdinal` ya contiene un ejemplo de
separación entrenamiento/prueba y matriz de confusión que puede servir de punto de partida.

---
Material del corpus de Econometría, Facultad de Ciencias, UNAM.
Ver el [README principal](../README.md) para la correspondencia completa entre temario, notas y código.
