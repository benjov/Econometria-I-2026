# `docs/` — Laboratorio interactivo

Sitio estático con seis simuladores para proyectar en clase. Se publica con **GitHub Pages**
directamente desde esta carpeta; no hay paso de compilación ni dependencias que instalar.

**URL una vez activado:** <https://benjov.github.io/Econometria-I-2026/>

---

## Cómo activarlo (una sola vez)

1. En GitHub: **Settings → Pages**.
2. En *Build and deployment*, **Source: Deploy from a branch**.
3. **Branch:** `main` · **Folder:** `/docs`. Guardar.
4. Al cabo de uno o dos minutos el sitio queda en línea. Cada `push` a `main` lo actualiza solo.

No hace falta configurar nada más. El archivo `.nojekyll` evita que GitHub intente procesar el
sitio con Jekyll, que no se usa aquí.

---

## Qué hay

```
docs/
├── index.html              portada y lanzador de los simuladores
├── .nojekyll               desactiva el procesamiento con Jekyll
├── assets/
│   ├── estilo.css          hoja de estilo única, con los dos temas
│   └── lab.js              biblioteca compartida (ver abajo)
└── sim/
    ├── mco.html            ¿qué minimiza MCO?                     unidad 1.b, 1.c · cap. 2
    ├── colisionador.html   confusor, mediador y colisionador      unidad 1.a · cap. 1 §1.9
    ├── instrumentos.html   instrumentos débiles                   unidad 1.d · cap. 3
    ├── efectos-fijos.html  transformación intragrupos             unidad 2.e · cap. 5
    ├── did.html            tendencias paralelas y DiD             unidad 3.e · cap. 9
    └── logit-probit.html   MPL, Logit y Probit                    unidad 3.b · cap. 7
```

---

## Decisiones de diseño

**Todo se calcula de verdad.** No hay cifras preescritas ni curvas dibujadas a mano. `lab.js`
implementa MCO (con errores clásicos, robustos HC1 y agrupados), 2SLS, la F de la primera etapa,
los cuatro estimadores de panel con el parámetro θ, y Logit y Probit por máxima verosimilitud
resuelta con mínimos cuadrados reponderados — que es el Newton-Raphson del capítulo 6 escrito
como una sucesión de regresiones.

**Aleatoriedad con semilla explícita.** Todos los simuladores tienen un control de semilla. Es la
misma disciplina de `Clase_15/05_Reproducibilidad`: sin semilla fija, lo que se proyecta en clase
no se puede volver a obtener en casa.

**Sin dependencias externas.** No hay CDN, ni fuentes remotas, ni bibliotecas de graficado. Una
vez cargada, la página funciona sin conexión — lo que importa cuando la red del aula falla a
media clase. El graficado es `<canvas>` propio, en `lab.js`.

**Sin MathJax, a propósito.** La notación se escribe con Unicode (`β̂₁`, `x̄`, `Λ`, `Φ`, `∂P/∂x`).
Cargar un motor de fórmulas por unos cuantos símbolos añadiría un megabyte y un parpadeo antes de
que la página quede legible. Si en el futuro hiciera falta matemática desplegada, ahí sí
convendría MathJax.

**La misma paleta que las Notas de Clase.** Azul `#2a78d6`, naranja `#eb6834` y violeta `#4a3aa7`,
validados para daltonismo, con **doble codificación**: cada serie lleva además su propio patrón de
trazo, de modo que las figuras se distinguen impresas en blanco y negro. Los ejes no llevan marco
superior ni derecho, y se prefiere el rótulo directo sobre la curva a la caja de leyenda. Son los
mismos criterios de `Notas-Clase/figuras_notas.py`, para que no haya salto visual entre el PDF y
el sitio.

**Tema claro y oscuro.** Se respeta la preferencia del sistema y se puede alternar con `T`; la
elección se guarda en `localStorage`. Los lienzos leen los colores de las variables CSS, así que
el cambio de tema los repinta sin duplicar valores.

---

## Atajos de teclado

| Tecla | Efecto |
|---|---|
| `P` | Modo proyección: oculta el texto explicativo y agranda la tipografía |
| `+` `−` | Escala de la tipografía · `0` la devuelve al original |
| `T` | Tema claro u oscuro |
| `R` | Reiniciar los controles a sus valores iniciales |
| `Espacio` | Volver a simular (en el de instrumentos débiles) |
| `Tab`, `←` `→` | Enfocar un control y moverlo sin usar el ratón |
| `?` | Recordatorio de atajos |

---

## Cómo agregar un simulador

1. Copiar `sim/mco.html` como plantilla. La estructura es: encabezado, uno o dos
   `.lienzo-caja` con su `<canvas>`, las glosas explicativas y el `<aside class="panel">` con los
   controles.
2. Los controles se escriben **en el HTML**, no se generan desde JavaScript, para que la página
   se lea como documento. `data-dec` fija los decimales de la lectura y `data-suf` el sufijo.
3. En el script: crear las gráficas con `new Lab.Grafica(canvas, {...})`, escribir una función
   `dibujar()` y cerrar con

   ```js
   Lab.iniciar(dibujar).then(() => Lab.enlazar(dibujar));
   ```

   `Lab.enlazar` conecta todos los controles del panel, actualiza sus lecturas y registra los
   valores iniciales para que `R` funcione.
4. Añadir la página al arreglo `PAGINAS` de `lab.js` — de ahí sale la barra de navegación de
   todas las páginas — y una tarjeta en `index.html`.

### Lo esencial de `lab.js`

```js
Lab.rng(semilla)                    // {u(), n(), reiniciar()} — uniforme y normal
Lab.mco(X, y, {robusto, grupo})     // {b, ee, V, e, src, r2, sigma, t}
Lab.dosEtapas(y, X, Z)              // 2SLS
Lab.fPrimeraEtapa(x, Zexc, Wexo)    // F del instrumento excluido
Lab.panel(y, x, gid)                // {pool, within, fd, re, entre, theta, ...}
Lab.indiceBinario(X, y, 'logit')    // {b, logL, p, ame, mem, ...}
Lab.Phi, Lab.phi, Lab.Lambda, Lab.mills
Lab.media, Lab.desv, Lab.correlacion, Lab.cuantil
Lab.fmt(v, dec), Lab.fmtSigno(v, dec)   // usan el signo menos tipográfico «−»
Lab.color('azul'), Lab.alfa(hex, a), Lab.TRAZO

const g = new Lab.Grafica(canvas, { razon, minAlto, maxAlto });
g.marco({ xlim, ylim, xlabel, ylabel, titulo, xticks, desnudo });
g.recortado(fn)                     // recorta al área de datos
g.linea(pts, o)  g.puntos(pts, o)  g.marcas(pts, o)  g.area(pts, o)  g.banda(pts, o)
g.hlinea(v, o)   g.vlinea(v, o)    g.rect(x0,y0,x1,y1,o)  g.histograma(vals, o)
g.rotulo(x, y, texto, o)  g.leyenda(entradas, {esquina})  g.flecha(...)
g.aDatos(px, py)                    // pantalla → datos, para arrastrar puntos
```

---

## Verificación

El núcleo numérico está contrastado contra valores conocidos y contra la teoría:

| Comprobación | Resultado |
|---|---|
| MCO frente a un caso calculado a mano | coeficientes, SRC, R² y errores estándar exactos |
| 2SLS con `Z = X` | idéntico a MCO, a 1e-9 |
| 2SLS con endogeneidad (β = 1) | MCO 1.3455 · 2SLS 1.0088 |
| Cobertura del IC al 95 % con instrumento fuerte | 0.951 |
| Sesgo asintótico de MCO, ρ/(π²+1) | teoría 0.300 · simulación 0.300 |
| Confusor, mediador y colisionador | los tres coinciden con la fórmula de la regresión particionada |
| Intragrupos y primeras diferencias con *M* = 2 | idénticos, a 1e-9 |
| θ → 0 y θ → 1 | efectos aleatorios reproduce pool e intragrupos respectivamente |
| Logit y Probit por IRLS | recuperan los parámetros; los AME coinciden entre enlaces a 4 decimales |

Un detalle que conviene no olvidar: la razón entre los coeficientes de Logit y Probit sale
alrededor de **1.7**, no exactamente 1.6. El 1.6 es una regla práctica de ajuste sobre un rango,
no una identidad; la propia página lo dice. Lo que sí coincide con precisión son los efectos
marginales, y ése es el argumento para reportarlos en lugar de los coeficientes crudos.

Para revisar los cambios en local:

```bash
cd docs && python3 -m http.server 8000
# abrir http://localhost:8000
```

**Conviene abrir siempre las páginas antes de darlas por buenas.** Tres defectos de esta primera
versión —el rótulo del eje vertical rozando los números de la escala, «ATT verdadero» encima del
último intervalo del estudio de eventos y «probabilidad > 1» cruzando la recta del modelo
lineal— sólo se veían una vez compuesta la página, no en el código.
