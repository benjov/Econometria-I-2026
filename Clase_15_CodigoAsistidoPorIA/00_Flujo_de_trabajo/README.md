# Flujo de trabajo en Python

**Unidad 4.a y 4.b** · Se hace **una vez, al inicio del semestre** · Acompaña a `Clase_00`

Antes de la primera actividad hay que dejar el ambiente en un estado conocido. No es
un trámite: la mitad de los problemas que aparecen en un curso de este tipo son
diferencias de ambiente que nadie registró.

## Actividad

Abrir `Verificar_Ambiente.ipynb` y ejecutar todas las celdas.

El cuaderno informa la versión de Python y de cada biblioteca, y comprueba que los
archivos de datos del curso estén donde deben. Devuelve un código de salida distinto
de cero si falta algo.

**La actividad no consiste en que el cuaderno salga todo en verde, sino en saber leerlo.** Anota, para
tu propia máquina:

1. Qué intérprete de Python estás usando (la ruta que imprime). Si tienes varios
   instalados —lo habitual en macOS— importa saber cuál.
2. Qué versión de `pandas` y de `numpy` tienes. Guárdalas: cuando un resultado no se
   reproduzca, es el primer lugar donde hay que mirar.
3. Si falta alguna biblioteca opcional, instálala sólo cuando la clase la pida.

## Buenas prácticas que se dan por establecidas desde aquí

- **Rutas relativas, siempre.** Los cuadernos de esta carpeta usan
  `../../Clase_04_DatosPanel/wage_panel.csv`, no una ruta absoluta con tu nombre de
  usuario. Es lo que permite que el cuaderno corra en otra máquina.
- **Clonar el repositorio completo**, no descargar archivos sueltos desde la interfaz
  web de GitHub: los datos quedan junto a cada cuaderno y las rutas relativas
  funcionan sin ajustes.
- **Un ambiente declarado.** `requirements.txt` está en la raíz de esta carpeta.
  Para el proyecto final, ver la plantilla en `06_Proyecto_final/plantilla/`, donde las
  versiones van fijadas con `==` y no con `>=`.
- **Reiniciar el kernel y correr todo** antes de dar un cuaderno por terminado.

## Sobre `pip install` dentro de un cuaderno

Se ve mucho y conviene entender qué hace. `!pip install X` en una celda instala en el
intérprete que el kernel esté usando, que no siempre es el que uno cree. Si hace falta
hacerlo desde el cuaderno, la forma robusta es:

```python
import sys
!{sys.executable} -m pip install X
```

Así se instala en el intérprete del kernel activo y no en otro.

---
Parte del curso de Econometría I, Facultad de Ciencias, UNAM.
Ver el [README de la carpeta](../README.md) para el orden de las actividades.
