# Proyecto final

**Unidad 4.e** · Equipos de 2 a 3 personas · **40 % de la calificación** ·
Entrega tentativa: **4 de diciembre de 2026**

El proyecto es donde se juntan las dos mitades del curso: una pregunta econométrica
que exige elegir un estimador y defender una identificación, y un producto de código
que otra persona debe poder ejecutar y verificar.

## Qué se entrega

Un **repositorio** —no un archivo suelto— con esta estructura, que está lista para
copiar en `plantilla/`:

```
proyecto-nombre-del-equipo/
├── README.md            qué se pregunta, qué datos, cómo reproducirlo
├── requirements.txt      versiones EXACTAS (con ==, no >=)
├── .gitignore
├── datos/                los datos, o el código que los descarga
├── codigo/               cuadernos y módulos
└── resultados/           cuadros y figuras que el código genera
```

Para empezar:

```bash
cp -r 06_Proyecto_final/plantilla ~/proyecto-mi-equipo
cd ~/proyecto-mi-equipo && git init
```

## Requisitos de contenido

1. **Una pregunta empírica**, no un tema. «¿Afecta la escolaridad materna la
   probabilidad de asistencia escolar de los hijos?» es una pregunta; «educación en
   México» no lo es.
2. **Una ficha de especificación** como la de `01_Escribir_con_especificacion`:
   datos, unidad de observación, modelo, estimador, errores estándar y qué se reporta.
   Se entrega junto con el trabajo. Escribirla antes de programar es el punto.
3. **Una estrategia de identificación defendida explícitamente.** Qué supuesto hace
   creíble la interpretación causal, y qué lo pondría en duda. Si el trabajo es
   descriptivo, decirlo y no usar lenguaje causal.
4. **Al menos una verificación independiente** de las tres que se enseñaron en
   `04_Verificar_resultados`: contraste con un número publicado, dos implementaciones
   que deban coincidir, o una identidad matemática comprobada. Decir en el texto cuál
   se hizo.
5. **La lista de verificación de `05_Reproducibilidad` recorrida.** Se entrega marcada.
6. **Declaración del uso de IA**: en qué se usó, y la confirmación de que toda
   referencia bibliográfica fue verificada contra la fuente real.

## Cómo se evalúa

| Componente | Peso | Qué se mira |
|---|:--:|---|
| Pregunta e identificación | 30 % | La pregunta es contestable; el supuesto de identificación está enunciado y discutido, no dado por hecho |
| Ejecución econométrica | 25 % | El estimador corresponde al problema; errores estándar al nivel correcto; efectos marginales bien definidos e interpretados |
| Verificación | 20 % | Existe y está documentada. Un trabajo sin verificación no aprueba este rubro, por bueno que sea el resto |
| Reproducibilidad | 15 % | El repositorio se clona y corre de principio a fin en otra máquina, sin ajustes |
| Comunicación | 10 % | De la tabla de regresión a la afirmación empírica, con su margen de error y sus supuestos declarados |

**El rubro de verificación es el que distingue a este curso.** Un resultado correcto
sin verificación vale menos que un resultado modesto que se comprobó y se acotó,
porque el primero no da manera de saber que es correcto.

## Sobre el uso de IA en el proyecto

Está permitido y se espera. Las condiciones son tres:

1. **Se declara.** En qué se usó: escribir código, depurar, redactar, buscar
   referencias.
2. **Cada integrante puede explicar cada línea** del código que entrega. Es la
   pregunta que se hará en la presentación, y se hará sobre una línea concreta elegida
   al azar. Si no se puede explicar, no se entrega.
3. **Ningún número sale de un modelo generativo.** Los números salen de correr código
   sobre datos. Ninguna referencia se cita sin haberla abierto.

Lo que no está permitido es entregar como propio un trabajo cuyo razonamiento
econométrico —la elección del estimador, la defensa de la identificación, la
interpretación— no sea del equipo. Ahí está el contenido del curso; el código es el
vehículo.

## Ideas de punto de partida

Extensiones de los cuadernos existentes, ordenadas de menor a mayor dificultad:

| Idea | Base | Notas |
|---|---|---|
| Modelo de duración con Kaplan-Meier y Cox | `Clase_13` está sin desarrollar | cap. 10 |
| SUR sobre los datos de Grunfeld | `Clase_04` tiene los datos | cap. 4 §4.4 |
| MCG con heterocedasticidad conocida | ningún cuaderno lo cubre | cap. 4 §4.3 |
| Estudio de eventos con adopción escalonada | extiende `Clase_11` | cap. 9 |
| Control sintético con inferencia por permutación | extiende `Clase_12` | cap. 9 |
| Tobit frente al modelo de dos partes | extiende `Clase_10` | cap. 8 |

Los tres primeros son **huecos reales del repositorio**: un proyecto bueno sobre
cualquiera de ellos puede incorporarse al material del curso.

---
Parte del curso de Econometría I, Facultad de Ciencias, UNAM.
Ver el [README de la carpeta](../README.md) para el orden de las actividades.
