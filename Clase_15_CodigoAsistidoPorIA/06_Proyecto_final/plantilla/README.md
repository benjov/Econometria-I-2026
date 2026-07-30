# [Título del proyecto]

**Econometría I — Facultad de Ciencias, UNAM · Semestre 2027-I**

**Equipo:** [nombre 1], [nombre 2], [nombre 3]

---

## Pregunta empírica

> [Una pregunta, no un tema. Debe poder contestarse con los datos que se listan
> abajo. Ejemplo: «¿Reduce la asistencia a preescolar la probabilidad de repetir
> primer año de primaria?», no «educación temprana en México».]

## Datos

| | |
|---|---|
| Fuente | [encuesta, institución, artículo; con liga] |
| Archivo | `datos/[archivo]` |
| Unidad de observación | [individuo / empresa / municipio-año] |
| N | [número] |
| Periodo | [años] |

| Variable | Significado | Unidades |
|---|---|---|
| | | |

Si los datos no se pueden versionar por tamaño o licencia, `codigo/descargar_datos.py`
debe obtenerlos y el README debe decir cómo.

## Modelo y estimador

> [La ecuación. Qué estimador y por qué. A qué nivel se agrupan los errores estándar
> y por qué a ése. Si el modelo es no lineal, qué efecto marginal se reporta —AME o
> MEM— y por qué.]

## Estrategia de identificación

> [El supuesto que hace creíble la interpretación causal, enunciado de manera que se
> pueda discutir. Qué lo pondría en duda. Qué evidencia se ofrece a su favor.
>
> Si el trabajo es descriptivo, decirlo aquí explícitamente y evitar lenguaje causal
> en el resto del documento. Un trabajo descriptivo honesto vale más que uno causal
> sin identificación.]

## Resultados principales

> [Dos o tres afirmaciones empíricas, cada una con su magnitud, sus unidades y su
> margen de error. No una tabla de regresión sin traducir.]

## Verificación

> [Cuál de las tres se hizo, y su resultado:
>  - contraste contra un número publicado: [cuál, qué tan cerca quedó]
>  - dos implementaciones independientes que coinciden: [cuáles, a qué tolerancia]
>  - identidad matemática comprobada: [cuál, qué valor dio]
>
> Este apartado es obligatorio.]

## Cómo reproducir

```bash
git clone [url]
cd [carpeta]
pip install -r requirements.txt
```

Después, ejecutar en este orden:

1. `codigo/[cuaderno_1].ipynb` — [qué hace, qué produce]
2. `codigo/[cuaderno_2].ipynb` — [qué hace, qué produce]

Los cuadros y figuras se escriben en `resultados/`.

**Semilla aleatoria:** [número]. **Tiempo de ejecución:** [aproximado].

## Declaración del uso de inteligencia artificial

> [En qué se usó: escribir código, depurar, redactar, buscar referencias, ninguna.
>
> Confirmación de que toda referencia bibliográfica fue verificada contra la fuente
> real, y que ningún resultado numérico proviene de un modelo generativo.]

Lista de verificación de `05_Reproducibilidad/lista_de_verificacion.md`: **recorrida y
adjunta**.

## Referencias

> [Sólo las que se consultaron de verdad. Cada una verificada contra la fuente.]
