/* ============================================================================
   Econometría I — Facultad de Ciencias, UNAM
   Biblioteca compartida del laboratorio interactivo.

   Contiene: aleatoriedad reproducible con semilla, álgebra lineal, los
   estimadores (MCO, MCO robusto, 2SLS), utilidades de distribución y una capa
   de graficado sobre <canvas> que sigue las mismas convenciones que las
   figuras de las Notas de Clase.

   Sin dependencias externas: el sitio se sirve como archivos estáticos desde
   GitHub Pages y debe funcionar sin conexión una vez cargado.
   ========================================================================= */

/* global window, document */

const Lab = (() => {
  'use strict';

  /* =========================================================================
     1. Aleatoriedad reproducible
     -------------------------------------------------------------------------
     Generador con semilla explícita (mulberry32). Es la misma disciplina que
     enseña `Clase_15/05_Reproducibilidad`: sin semilla fija, dos ejecuciones
     del mismo simulador dan cifras distintas y la clase no puede replicar en
     su casa lo que vio proyectado.
     ====================================================================== */

  function rng(semilla = 20261) {
    let s = semilla >>> 0;
    let reserva = null;

    /** Uniforme en (0, 1). */
    function u() {
      s = (s + 0x6D2B79F5) >>> 0;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }

    /** Normal estándar por el método polar de Marsaglia. */
    function n() {
      if (reserva !== null) { const v = reserva; reserva = null; return v; }
      let a, b, r;
      do { a = 2 * u() - 1; b = 2 * u() - 1; r = a * a + b * b; }
      while (r >= 1 || r === 0);
      const f = Math.sqrt(-2 * Math.log(r) / r);
      reserva = b * f;
      return a * f;
    }

    function reiniciar(nueva) { s = (nueva === undefined ? semilla : nueva) >>> 0; reserva = null; }

    return { u, n, reiniciar };
  }

  /* =========================================================================
     2. Álgebra lineal
     ====================================================================== */

  /** Inversa por Gauss-Jordan con pivoteo parcial. Devuelve null si es singular. */
  function inv(A) {
    const n = A.length;
    const M = A.map((fila, i) => fila.slice().concat(
      Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
    ));
    for (let c = 0; c < n; c++) {
      let piv = c;
      for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[piv][c])) piv = r;
      if (Math.abs(M[piv][c]) < 1e-12) return null;
      [M[c], M[piv]] = [M[piv], M[c]];
      const d = M[c][c];
      for (let j = 0; j < 2 * n; j++) M[c][j] /= d;
      for (let r = 0; r < n; r++) {
        if (r === c) continue;
        const f = M[r][c];
        if (f === 0) continue;
        for (let j = 0; j < 2 * n; j++) M[r][j] -= f * M[c][j];
      }
    }
    return M.map((fila) => fila.slice(n));
  }

  /** A'B para A (N×p) y B (N×q). */
  function tmul(A, B) {
    const N = A.length, p = A[0].length, q = B[0].length;
    const R = Array.from({ length: p }, () => new Array(q).fill(0));
    for (let i = 0; i < N; i++) {
      const a = A[i], b = B[i];
      for (let r = 0; r < p; r++) {
        const ar = a[r];
        if (ar === 0) continue;
        for (let c = 0; c < q; c++) R[r][c] += ar * b[c];
      }
    }
    return R;
  }

  /** A'y para A (N×p) y y (N). */
  function tvec(A, y) {
    const N = A.length, p = A[0].length;
    const r = new Array(p).fill(0);
    for (let i = 0; i < N; i++) {
      const a = A[i], yi = y[i];
      for (let j = 0; j < p; j++) r[j] += a[j] * yi;
    }
    return r;
  }

  /** Producto matriz (p×q) por vector (q). */
  function mv(M, v) {
    return M.map((fila) => fila.reduce((s, x, j) => s + x * v[j], 0));
  }

  /* =========================================================================
     3. Estimadores
     ====================================================================== */

  /**
   * Mínimos Cuadrados Ordinarios.
   * @param X matriz N×K, con la constante incluida explícitamente si se quiere.
   * @param y vector N.
   * @param opc.robusto  errores estándar HC1 (White con corrección de muestra finita).
   * @param opc.grupo    vector de identificadores para errores agrupados.
   */
  function mco(X, y, opc = {}) {
    const N = X.length, K = X[0].length;
    const XtXi = inv(tmul(X, X));
    if (!XtXi) return null;
    const b = mv(XtXi, tvec(X, y));

    const ajustado = X.map((f) => f.reduce((s, x, j) => s + x * b[j], 0));
    const e = y.map((yi, i) => yi - ajustado[i]);
    const src = e.reduce((s, r) => s + r * r, 0);
    const ybar = y.reduce((s, v) => s + v, 0) / N;
    const stc = y.reduce((s, v) => s + (v - ybar) * (v - ybar), 0);
    const gl = Math.max(N - K, 1);

    // Matriz de varianzas
    let V;
    if (opc.grupo) {
      // Agrupada: suma de (X_g' e_g)(X_g' e_g)' sobre conglomerados
      const grupos = new Map();
      opc.grupo.forEach((g, i) => {
        if (!grupos.has(g)) grupos.set(g, []);
        grupos.get(g).push(i);
      });
      const G = grupos.size;
      const meat = Array.from({ length: K }, () => new Array(K).fill(0));
      grupos.forEach((idx) => {
        const sg = new Array(K).fill(0);
        idx.forEach((i) => { for (let j = 0; j < K; j++) sg[j] += X[i][j] * e[i]; });
        for (let r = 0; r < K; r++) for (let c = 0; c < K; c++) meat[r][c] += sg[r] * sg[c];
      });
      const c = (G / Math.max(G - 1, 1)) * ((N - 1) / gl);
      V = escalarMat(sandwich(XtXi, meat), c);
    } else if (opc.robusto) {
      const meat = Array.from({ length: K }, () => new Array(K).fill(0));
      for (let i = 0; i < N; i++) {
        const e2 = e[i] * e[i];
        for (let r = 0; r < K; r++) for (let c = 0; c < K; c++) meat[r][c] += X[i][r] * X[i][c] * e2;
      }
      V = escalarMat(sandwich(XtXi, meat), N / gl);
    } else {
      V = escalarMat(XtXi, src / gl);
    }

    const ee = V.map((fila, i) => Math.sqrt(Math.max(fila[i], 0)));
    return {
      b, ee, V, e, ajustado, src, stc, N, K, gl,
      r2: stc > 0 ? 1 - src / stc : 0,
      sigma: Math.sqrt(src / gl),
      t: b.map((v, i) => (ee[i] > 0 ? v / ee[i] : 0))
    };
  }

  function sandwich(A, M) {
    // A M A'  (A simétrica en nuestro uso, pero se calcula el producto completo)
    const K = A.length;
    const AM = Array.from({ length: K }, () => new Array(K).fill(0));
    for (let r = 0; r < K; r++) for (let c = 0; c < K; c++) {
      let s = 0;
      for (let k = 0; k < K; k++) s += A[r][k] * M[k][c];
      AM[r][c] = s;
    }
    const R = Array.from({ length: K }, () => new Array(K).fill(0));
    for (let r = 0; r < K; r++) for (let c = 0; c < K; c++) {
      let s = 0;
      for (let k = 0; k < K; k++) s += AM[r][k] * A[c][k];
      R[r][c] = s;
    }
    return R;
  }

  function escalarMat(M, c) { return M.map((f) => f.map((v) => v * c)); }

  /**
   * Mínimos Cuadrados en Dos Etapas.
   * @param y vector N
   * @param X regresores (N×K), incluye los endógenos
   * @param Z instrumentos (N×L), incluye los exógenos de X;  L >= K
   */
  function dosEtapas(y, X, Z) {
    const N = X.length, K = X[0].length;
    const ZtZi = inv(tmul(Z, Z));
    if (!ZtZi) return null;
    const ZtX = tmul(Z, X);
    const Zty = tvec(Z, y);

    // Proyección: X̂ = Z (Z'Z)^-1 Z'X
    const PtX = mv(ZtZi, Zty);                       // (Z'Z)^-1 Z'y
    const A = multiplicar(transponer(ZtX), mv2(ZtZi, ZtX));   // X'Z (Z'Z)^-1 Z'X
    const Ai = inv(A);
    if (!Ai) return null;
    const rhs = mv(transponer(ZtX), PtX);            // X'Z (Z'Z)^-1 Z'y
    const b = mv(Ai, rhs);

    const e = y.map((yi, i) => yi - X[i].reduce((s, x, j) => s + x * b[j], 0));
    const src = e.reduce((s, r) => s + r * r, 0);
    const gl = Math.max(N - K, 1);
    const V = escalarMat(Ai, src / gl);
    const ee = V.map((f, i) => Math.sqrt(Math.max(f[i], 0)));
    return { b, ee, V, e, src, N, K, gl, sigma: Math.sqrt(src / gl), t: b.map((v, i) => (ee[i] > 0 ? v / ee[i] : 0)) };
  }

  function transponer(M) {
    return M[0].map((_, j) => M.map((f) => f[j]));
  }
  function multiplicar(A, B) {
    const p = A.length, q = B[0].length, m = B.length;
    const R = Array.from({ length: p }, () => new Array(q).fill(0));
    for (let r = 0; r < p; r++) for (let k = 0; k < m; k++) {
      const a = A[r][k];
      if (a === 0) continue;
      for (let c = 0; c < q; c++) R[r][c] += a * B[k][c];
    }
    return R;
  }
  function mv2(M, B) { return multiplicar(M, B); }

  /**
   * Estimadores de datos panel para un solo regresor, con panel balanceado.
   * Devuelve los cuatro miembros de la familia del cap. 5 de las Notas —
   * regresión pool, intragrupos, primeras diferencias y efectos aleatorios —
   * junto con el parámetro θ que los indexa: θ = 0 es pool y θ = 1 es
   * intragrupos.
   *
   * @param y  variable dependiente
   * @param x  regresor
   * @param gid identificador de grupo de cada observación
   */
  function panel(y, x, gid) {
    const N = y.length;
    const grupos = new Map();
    gid.forEach((g, i) => {
      if (!grupos.has(g)) grupos.set(g, []);
      grupos.get(g).push(i);
    });
    const n = grupos.size;
    const M = N / n;

    // Regresión agrupada (pool): ignora por completo la estructura de panel
    const pool = mco(x.map((v) => [1, v]), y);

    // Medias por grupo
    const ybar = new Map(), xbar = new Map();
    grupos.forEach((idx, g) => {
      ybar.set(g, media(idx.map((i) => y[i])));
      xbar.set(g, media(idx.map((i) => x[i])));
    });

    // Transformación intragrupos. La constante desaparece porque Qι = 0.
    const xw = [], yw = [];
    for (let i = 0; i < N; i++) {
      xw.push(x[i] - xbar.get(gid[i]));
      yw.push(y[i] - ybar.get(gid[i]));
    }
    const sxx = xw.reduce((s, v) => s + v * v, 0);
    const within = sxx > 0 ? xw.reduce((s, v, i) => s + v * yw[i], 0) / sxx : NaN;
    const srcW = yw.reduce((s, v, i) => { const e = v - within * xw[i]; return s + e * e; }, 0);
    // Grados de libertad: nM − n − K, con la corrección por los n interceptos
    const s2e = srcW / Math.max(N - n - 1, 1);

    // Regresión entre grupos (between)
    const claves = Array.from(grupos.keys());
    const entre = mco(claves.map((g) => [1, xbar.get(g)]), claves.map((g) => ybar.get(g)));
    const s2b = entre ? entre.src / Math.max(n - 2, 1) : NaN;

    // Primeras diferencias
    const xd = [], yd = [];
    grupos.forEach((idx) => {
      for (let k = 1; k < idx.length; k++) {
        xd.push(x[idx[k]] - x[idx[k - 1]]);
        yd.push(y[idx[k]] - y[idx[k - 1]]);
      }
    });
    const dxx = xd.reduce((s, v) => s + v * v, 0);
    const fd = dxx > 0 ? xd.reduce((s, v, i) => s + v * yd[i], 0) / dxx : NaN;

    // Efectos aleatorios por cuasi-transformación
    // El residuo de la regresión entre grupos estima σ²_α + σ²_ν/M
    const s2a = Math.max(s2b - s2e / M, 0);
    const theta = 1 - Math.sqrt(s2e / (M * s2a + s2e));
    const Xre = [], yre = [];
    for (let i = 0; i < N; i++) {
      Xre.push([1 - theta, x[i] - theta * xbar.get(gid[i])]);
      yre.push(y[i] - theta * ybar.get(gid[i]));
    }
    const re = mco(Xre, yre);

    return {
      pool: pool ? pool.b[1] : NaN,
      within, fd,
      re: re ? re.b[1] : NaN,
      entre: entre ? entre.b[1] : NaN,
      theta, s2e, s2a, n, N, M,
      xbar, ybar, xw, yw
    };
  }

  /**
   * Modelo de índice binario (Logit o Probit) por máxima verosimilitud,
   * resuelto con mínimos cuadrados reponderados iterativamente — que es el
   * método de Newton-Raphson del cap. 6 escrito como una sucesión de MCO.
   *
   * Devuelve además los efectos marginales promedio (AME) y en la media (MEM),
   * cuya distinción es la lección de `Clase_15/04_Verificar_resultados`.
   */
  function indiceBinario(X, y, enlace = 'logit') {
    const N = X.length, K = X[0].length;
    let b = new Array(K).fill(0);
    let logL = -Infinity;

    const F = enlace === 'probit' ? Phi : Lambda;
    const f = enlace === 'probit' ? phi : lambdaDens;

    for (let it = 0; it < 60; it++) {
      const Xw = [], zw = [];
      let malCondicionado = false;
      for (let i = 0; i < N; i++) {
        const idx = X[i].reduce((s, x, j) => s + x * b[j], 0);
        const p = Math.min(Math.max(F(idx), 1e-9), 1 - 1e-9);
        const d = Math.max(f(idx), 1e-9);          // dμ/dη
        // Forma unificada del GLM: peso W = d² / [p(1−p)], respuesta de
        // trabajo z = η + (y − p)/d. Con el enlace logit, d = p(1−p) y ambas
        // se reducen a las expresiones familiares del Logit.
        const w = (d * d) / (p * (1 - p));
        if (!Number.isFinite(w) || w <= 0) { malCondicionado = true; break; }
        const raiz = Math.sqrt(w);
        const z = idx + (y[i] - p) / d;
        zw.push(raiz * z);
        Xw.push(X[i].map((v) => raiz * v));
      }
      if (malCondicionado) break;
      const paso = mco(Xw, zw);
      if (!paso) break;
      const nuevo = paso.b;

      // Log-verosimilitud, para cortar cuando deja de mejorar
      let ll = 0;
      for (let i = 0; i < N; i++) {
        const idx = X[i].reduce((s, x, j) => s + x * nuevo[j], 0);
        const p = Math.min(Math.max(F(idx), 1e-12), 1 - 1e-12);
        ll += y[i] ? Math.log(p) : Math.log(1 - p);
      }
      const cambio = nuevo.reduce((s, v, j) => s + Math.abs(v - b[j]), 0);
      b = nuevo;
      const mejora = ll - logL;
      logL = ll;
      if (cambio < 1e-9 || Math.abs(mejora) < 1e-11) break;
    }

    // Efectos marginales
    const idxs = X.map((f2) => f2.reduce((s, x, j) => s + x * b[j], 0));
    const medias = X[0].map((_, j) => media(X.map((f2) => f2[j])));
    const idxMedia = medias.reduce((s, x, j) => s + x * b[j], 0);
    const densProm = media(idxs.map((v) => f(v)));
    const densMedia = f(idxMedia);

    return {
      b, logL, enlace, indices: idxs,
      p: idxs.map((v) => F(v)),
      ame: b.map((v) => v * densProm),      // efecto marginal promedio
      mem: b.map((v) => v * densMedia),     // efecto marginal en la media
      densProm, densMedia
    };
  }

  /**
   * Estadística F de la primera etapa para el instrumento excluido (caso de un
   * solo endógeno). Es la regla de Staiger y Stock: F < 10 indica instrumento
   * débil. Ver cap. 3 de las Notas.
   */
  function fPrimeraEtapa(x, Zexc, Wexo) {
    const N = x.length;
    const Xr = Wexo;                               // sólo exógenos
    const Xc = Wexo.map((f, i) => f.concat(Zexc[i])); // exógenos + instrumentos
    const r = mco(Xr, x), c = mco(Xc, x);
    if (!r || !c) return NaN;
    const q = Zexc[0].length;
    const gl = N - Xc[0].length;
    if (gl <= 0 || c.src <= 0) return NaN;
    return ((r.src - c.src) / q) / (c.src / gl);
  }

  /* =========================================================================
     4. Distribuciones y descriptivos
     ====================================================================== */

  /**
   * Complemento de la función error (aproximación de Chebyshev, Numerical
   * Recipes). Error relativo del orden de 1e-7, más que suficiente para las
   * probabilidades y coberturas que se muestran aquí a tres o cuatro
   * decimales; no pretende la precisión de `scipy.stats.norm`.
   */
  function erfc(x) {
    const z = Math.abs(x);
    const t = 2 / (2 + z);
    const ty = 4 * t - 2;
    const cof = [
      -1.3026537197817094, 6.4196979235649026e-1, 1.9476473204185836e-2,
      -9.561514786808631e-3, -9.46595344482036e-4, 3.66839497852761e-4,
      4.2523324806907e-5, -2.0278578112534e-5, -1.624290004647e-6,
      1.303655835580e-6, 1.5626441722e-8, -8.5238095915e-8,
      6.529054439e-9, 5.059343495e-9, -9.91364156e-10,
      -2.27365122e-10, 9.6467911e-11, 2.394038e-11,
      -6.886027e-12, -1.61748e-12, 3.9260e-13, 1.749e-13,
      -3.35e-14, -2.34e-14, 6.5e-15
    ];
    let d = 0, dd = 0;
    for (let j = cof.length - 1; j > 0; j--) { const tmp = d; d = ty * d - dd + cof[j]; dd = tmp; }
    const ans = t * Math.exp(-z * z + 0.5 * (cof[0] + ty * d) - dd);
    return x >= 0 ? ans : 2 - ans;
  }

  /** Φ(z): función de distribución normal estándar acumulada. */
  const Phi = (z) => 0.5 * erfc(-z / Math.SQRT2);

  /** φ(z): densidad normal estándar. */
  const phi = (z) => Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);

  /** Λ(z): función de distribución logística acumulada. */
  const Lambda = (z) => 1 / (1 + Math.exp(-z));

  /** λ(z) = Λ(z)(1 − Λ(z)): densidad logística. */
  const lambdaDens = (z) => { const L = Lambda(z); return L * (1 - L); };

  /** Razón inversa de Mills, φ(a)/(1 − Φ(a)). Cap. 8 de las Notas. */
  const mills = (a) => phi(a) / Math.max(1 - Phi(a), 1e-12);

  const media = (v) => v.reduce((s, x) => s + x, 0) / v.length;

  function desv(v) {
    const m = media(v);
    return Math.sqrt(v.reduce((s, x) => s + (x - m) * (x - m), 0) / Math.max(v.length - 1, 1));
  }

  function correlacion(a, b) {
    const ma = media(a), mb = media(b);
    let sab = 0, sa = 0, sb = 0;
    for (let i = 0; i < a.length; i++) {
      const da = a[i] - ma, db = b[i] - mb;
      sab += da * db; sa += da * da; sb += db * db;
    }
    return sa > 0 && sb > 0 ? sab / Math.sqrt(sa * sb) : 0;
  }

  /** Cuantil por interpolación lineal sobre un arreglo YA ordenado. */
  function cuantil(orden, p) {
    if (!orden.length) return NaN;
    const h = (orden.length - 1) * p;
    const lo = Math.floor(h), hi = Math.ceil(h);
    return orden[lo] + (h - lo) * (orden[hi] - orden[lo]);
  }

  /* =========================================================================
     5. Formato
     ====================================================================== */

  function fmt(v, dec = 3) {
    if (v === null || v === undefined || Number.isNaN(v)) return '—';
    if (!Number.isFinite(v)) return v > 0 ? '∞' : '−∞';
    const s = Math.abs(v) < Math.pow(10, -dec) / 2 ? (0).toFixed(dec) : v.toFixed(dec);
    return s.replace('-', '−');   // signo menos tipográfico
  }

  const fmtSigno = (v, dec = 3) => (v > 0 ? '+' : '') + fmt(v, dec);

  /* =========================================================================
     6. Colores del tema
     -------------------------------------------------------------------------
     Se leen de las variables CSS para que el cambio de tema claro/oscuro
     repinte los lienzos con la paleta correcta sin duplicar los valores.
     ====================================================================== */

  let cacheColor = {};

  function color(nombre) {
    if (cacheColor[nombre]) return cacheColor[nombre];
    const v = getComputedStyle(document.documentElement)
      .getPropertyValue('--' + nombre).trim() || '#000';
    cacheColor[nombre] = v;
    return v;
  }

  function limpiarColores() { cacheColor = {}; }

  /** Color con transparencia. Acepta #rgb y #rrggbb. */
  function alfa(hex, a) {
    let h = hex.replace('#', '');
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    const n = parseInt(h, 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  }

  /* Patrones de trazo — doble codificación, para que las figuras sigan siendo
     legibles impresas en blanco y negro (mismo criterio que las Notas). */
  const TRAZO = {
    solido:    [],
    guion:     [11, 6],
    puntoRaya: [11, 5, 2.5, 5],
    punteado:  [2.5, 5]
  };

  /* =========================================================================
     7. Graficado sobre <canvas>
     ====================================================================== */

  function ticksBonitos(lo, hi, objetivo = 6) {
    const span = hi - lo;
    if (!(span > 0)) return [lo];
    const crudo = span / objetivo;
    const mag = Math.pow(10, Math.floor(Math.log10(crudo)));
    const norm = crudo / mag;
    const paso = (norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10) * mag;
    const inicio = Math.ceil(lo / paso - 1e-9) * paso;
    const salida = [];
    for (let v = inicio; v <= hi + paso * 1e-9; v += paso) {
      salida.push(Math.abs(v) < paso * 1e-9 ? 0 : v);
    }
    return salida;
  }

  function decimalesDe(ticks) {
    if (ticks.length < 2) return 1;
    const paso = Math.abs(ticks[1] - ticks[0]);
    if (paso === 0) return 1;
    return Math.max(0, Math.min(4, Math.ceil(-Math.log10(paso) + 0.2)));
  }

  class Grafica {
    constructor(lienzo, opc = {}) {
      this.cv = lienzo;
      this.ctx = lienzo.getContext('2d');
      this.opc = Object.assign({ razon: 0.6, minAlto: 220, maxAlto: 560 }, opc);
      this.dpr = 1;
      this.w = 0; this.h = 0;
      this.m = { i: 56, d: 16, s: 18, f: 46 };   // izquierda, derecha, superior, inferior
      this._ajustar();
    }

    _ajustar() {
      const anchoCSS = this.cv.parentElement.clientWidth
        - parseFloat(getComputedStyle(this.cv.parentElement).paddingLeft || 0)
        - parseFloat(getComputedStyle(this.cv.parentElement).paddingRight || 0);
      const w = Math.max(240, Math.round(anchoCSS));
      const h = Math.round(Math.min(this.opc.maxAlto, Math.max(this.opc.minAlto, w * this.opc.razon)));
      this.dpr = window.devicePixelRatio || 1;
      this.cv.style.height = h + 'px';
      this.cv.width = Math.round(w * this.dpr);
      this.cv.height = Math.round(h * this.dpr);
      this.w = w; this.h = h;
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      this.fs = Math.max(11, Math.min(19, w / 52));
    }

    /**
     * Prepara el marco: limpia, fija escalas y dibuja ejes y rejilla.
     * Con `cfg.desnudo` se omiten ejes, rejilla y rótulos, y todo el lienzo
     * queda disponible como área de dibujo — es lo que usan los DAG.
     */
    marco(cfg) {
      this._ajustar();
      const c = this.ctx;
      const { xlim, ylim } = cfg;
      this.xlim = xlim; this.ylim = ylim;

      if (cfg.desnudo) {
        const m = cfg.margen !== undefined ? cfg.margen : 8;
        this.m = { i: m, d: m, s: m, f: m };
        this.caja = { x0: m, y0: m, x1: this.w - m, y1: this.h - m };
        c.clearRect(0, 0, this.w, this.h);
        return this;
      }

      const tx = cfg.xticks || ticksBonitos(xlim[0], xlim[1], cfg.nxticks || 6);
      const ty = cfg.yticks || ticksBonitos(ylim[0], ylim[1], cfg.nyticks || 5);
      const dx = cfg.xdec !== undefined ? cfg.xdec : decimalesDe(tx);
      const dy = cfg.ydec !== undefined ? cfg.ydec : decimalesDe(ty);
      const etqX = cfg.xetq || tx.map((v) => fmt(v, dx));
      const etqY = cfg.yetq || ty.map((v) => fmt(v, dy));

      // Margen izquierdo según el ancho real de las etiquetas
      c.font = `${this.fs}px ${getComputedStyle(document.body).fontFamily}`;
      const anchoY = Math.max(...etqY.map((s) => c.measureText(s).width));
      // El rótulo rotado del eje ocupa una banda de ancho `fs`; se le deja
      // holgura suficiente para que no roce los números de la escala.
      this.m.i = Math.ceil(anchoY) + 14 + (cfg.ylabel ? this.fs + 16 : 0);
      this.m.f = this.fs + 16 + (cfg.xlabel ? this.fs + 8 : 0);
      this.m.s = cfg.titulo ? this.fs + 18 : 14;
      this.m.d = cfg.margenDerecho !== undefined ? cfg.margenDerecho : 16;

      c.clearRect(0, 0, this.w, this.h);

      const gx0 = this.m.i, gy0 = this.m.s;
      const gx1 = this.w - this.m.d, gy1 = this.h - this.m.f;
      this.caja = { x0: gx0, y0: gy0, x1: gx1, y1: gy1 };

      const borde = color('borde');
      const tintaSuave = color('tinta-suave');
      const tintaMedia = color('tinta-media');

      // Rejilla horizontal (discreta; no compite con los datos)
      if (cfg.rejilla !== false) {
        c.save();
        c.strokeStyle = borde;
        c.lineWidth = 1;
        ty.forEach((v) => {
          if (v < ylim[0] || v > ylim[1]) return;
          const y = Math.round(this.y(v)) + 0.5;
          c.beginPath(); c.moveTo(gx0, y); c.lineTo(gx1, y); c.stroke();
        });
        c.restore();
      }

      // Ejes: sólo izquierdo e inferior, como en las figuras de las Notas
      c.save();
      c.strokeStyle = color('borde-firme');
      c.lineWidth = 1.2;
      c.beginPath();
      c.moveTo(gx0 + .5, gy0); c.lineTo(gx0 + .5, gy1 + .5); c.lineTo(gx1, gy1 + .5);
      c.stroke();
      c.restore();

      // Rótulos de los ejes
      c.save();
      c.fillStyle = tintaSuave;
      c.font = `${this.fs}px ${getComputedStyle(document.body).fontFamily}`;
      c.textAlign = 'center'; c.textBaseline = 'top';
      tx.forEach((v, i) => {
        if (v < xlim[0] - 1e-9 || v > xlim[1] + 1e-9) return;
        c.fillText(etqX[i], this.x(v), gy1 + 8);
      });
      c.textAlign = 'right'; c.textBaseline = 'middle';
      ty.forEach((v, i) => {
        if (v < ylim[0] - 1e-9 || v > ylim[1] + 1e-9) return;
        c.fillText(etqY[i], gx0 - 9, this.y(v));
      });

      c.fillStyle = tintaMedia;
      if (cfg.xlabel) {
        c.textAlign = 'center'; c.textBaseline = 'bottom';
        c.fillText(cfg.xlabel, (gx0 + gx1) / 2, this.h - 3);
      }
      if (cfg.ylabel) {
        c.save();
        c.translate(this.fs + 2, (gy0 + gy1) / 2);
        c.rotate(-Math.PI / 2);
        c.textAlign = 'center'; c.textBaseline = 'top';
        c.fillText(cfg.ylabel, 0, 0);
        c.restore();
      }
      if (cfg.titulo) {
        c.fillStyle = color('tinta');
        c.font = `600 ${this.fs * 1.06}px ${getComputedStyle(document.body).fontFamily}`;
        c.textAlign = 'left'; c.textBaseline = 'bottom';
        c.fillText(cfg.titulo, gx0, gy0 - 8);
      }
      c.restore();
      return this;
    }

    x(v) {
      const { x0, x1 } = this.caja;
      return x0 + (v - this.xlim[0]) / (this.xlim[1] - this.xlim[0]) * (x1 - x0);
    }
    y(v) {
      const { y0, y1 } = this.caja;
      return y1 - (v - this.ylim[0]) / (this.ylim[1] - this.ylim[0]) * (y1 - y0);
    }

    /** Recorta al área de datos mientras corre `fn`. */
    recortado(fn) {
      const c = this.ctx;
      c.save();
      c.beginPath();
      c.rect(this.caja.x0, this.caja.y0, this.caja.x1 - this.caja.x0, this.caja.y1 - this.caja.y0);
      c.clip();
      fn();
      c.restore();
      return this;
    }

    linea(pts, o = {}) {
      if (pts.length < 2) return this;
      const c = this.ctx;
      c.save();
      c.strokeStyle = o.color || color('azul');
      c.lineWidth = o.grosor || 2.4;
      c.setLineDash(o.trazo || TRAZO.solido);
      c.lineJoin = 'round'; c.lineCap = 'round';
      if (o.alfa !== undefined) c.globalAlpha = o.alfa;
      c.beginPath();
      pts.forEach((p, i) => (i ? c.lineTo(this.x(p[0]), this.y(p[1])) : c.moveTo(this.x(p[0]), this.y(p[1]))));
      c.stroke();
      c.restore();
      return this;
    }

    puntos(pts, o = {}) {
      const c = this.ctx;
      c.save();
      const r = o.r || 3.6;
      c.fillStyle = o.color || color('azul');
      c.strokeStyle = o.borde || color('fondo-caja');
      c.lineWidth = o.grosorBorde !== undefined ? o.grosorBorde : 1.1;
      if (o.alfa !== undefined) c.globalAlpha = o.alfa;
      pts.forEach((p) => {
        c.beginPath();
        c.arc(this.x(p[0]), this.y(p[1]), r, 0, Math.PI * 2);
        c.fill();
        if (c.lineWidth > 0) c.stroke();
      });
      c.restore();
      return this;
    }

    /** Marcador en cruz o aspa, para distinguir series sin depender del color. */
    marcas(pts, o = {}) {
      const c = this.ctx;
      c.save();
      const r = o.r || 5;
      c.strokeStyle = o.color || color('naranja');
      c.lineWidth = o.grosor || 2;
      c.lineCap = 'round';
      pts.forEach((p) => {
        const X = this.x(p[0]), Y = this.y(p[1]);
        c.beginPath();
        if (o.forma === 'aspa') {
          c.moveTo(X - r, Y - r); c.lineTo(X + r, Y + r);
          c.moveTo(X + r, Y - r); c.lineTo(X - r, Y + r);
        } else {
          c.moveTo(X - r, Y); c.lineTo(X + r, Y);
          c.moveTo(X, Y - r); c.lineTo(X, Y + r);
        }
        c.stroke();
      });
      c.restore();
      return this;
    }

    area(pts, o = {}) {
      if (pts.length < 2) return this;
      const c = this.ctx;
      c.save();
      c.fillStyle = o.color || alfa(color('azul'), .15);
      const base = o.base !== undefined ? o.base : this.ylim[0];
      c.beginPath();
      c.moveTo(this.x(pts[0][0]), this.y(base));
      pts.forEach((p) => c.lineTo(this.x(p[0]), this.y(p[1])));
      c.lineTo(this.x(pts[pts.length - 1][0]), this.y(base));
      c.closePath();
      c.fill();
      c.restore();
      return this;
    }

    banda(pts, o = {}) {
      // pts: [[x, lo, hi], ...]
      if (pts.length < 2) return this;
      const c = this.ctx;
      c.save();
      c.fillStyle = o.color || alfa(color('azul'), .16);
      c.beginPath();
      pts.forEach((p, i) => (i ? c.lineTo(this.x(p[0]), this.y(p[2])) : c.moveTo(this.x(p[0]), this.y(p[2]))));
      for (let i = pts.length - 1; i >= 0; i--) c.lineTo(this.x(pts[i][0]), this.y(pts[i][1]));
      c.closePath();
      c.fill();
      c.restore();
      return this;
    }

    vlinea(v, o = {}) {
      const c = this.ctx;
      c.save();
      c.strokeStyle = o.color || color('tinta-suave');
      c.lineWidth = o.grosor || 1.6;
      c.setLineDash(o.trazo || TRAZO.guion);
      const X = Math.round(this.x(v)) + .5;
      c.beginPath(); c.moveTo(X, this.caja.y0); c.lineTo(X, this.caja.y1); c.stroke();
      c.restore();
      return this;
    }

    hlinea(v, o = {}) {
      const c = this.ctx;
      c.save();
      c.strokeStyle = o.color || color('tinta-suave');
      c.lineWidth = o.grosor || 1.6;
      c.setLineDash(o.trazo || TRAZO.guion);
      const Y = Math.round(this.y(v)) + .5;
      c.beginPath(); c.moveTo(this.caja.x0, Y); c.lineTo(this.caja.x1, Y); c.stroke();
      c.restore();
      return this;
    }

    /** Rectángulo en coordenadas de datos. */
    rect(x0, y0, x1, y1, o = {}) {
      const c = this.ctx;
      c.save();
      const X = this.x(x0), Y = this.y(y1), W = this.x(x1) - X, H = this.y(y0) - Y;
      if (o.relleno) { c.fillStyle = o.relleno; c.fillRect(X, Y, W, H); }
      if (o.color) {
        c.strokeStyle = o.color;
        c.lineWidth = o.grosor || 1.5;
        c.setLineDash(o.trazo || TRAZO.solido);
        c.strokeRect(X + .5, Y + .5, W, H);
      }
      c.restore();
      return this;
    }

    /** Histograma de frecuencia relativa sobre el rango indicado. */
    histograma(valores, o = {}) {
      const nb = o.bins || 40;
      const [lo, hi] = o.rango || this.xlim;
      const cuentas = new Array(nb).fill(0);
      let dentro = 0;
      valores.forEach((v) => {
        const k = Math.floor((v - lo) / (hi - lo) * nb);
        if (k >= 0 && k < nb) { cuentas[k]++; dentro++; }
      });
      if (!dentro) return this;
      const anchoBin = (hi - lo) / nb;
      const c = this.ctx;
      c.save();
      c.fillStyle = o.color || alfa(color('azul'), .55);
      cuentas.forEach((n, k) => {
        if (!n) return;
        const dens = n / valores.length / anchoBin;
        const x0 = this.x(lo + k * anchoBin);
        const x1 = this.x(lo + (k + 1) * anchoBin);
        const y0 = this.y(0), y1 = this.y(dens);
        c.fillRect(x0, y1, Math.max(x1 - x0 - .5, .5), y0 - y1);
      });
      c.restore();
      return this;
    }

    /** Máximo de densidad de un histograma, para fijar el eje vertical. */
    static picoHistograma(valores, bins, rango) {
      const [lo, hi] = rango;
      const cuentas = new Array(bins).fill(0);
      valores.forEach((v) => {
        const k = Math.floor((v - lo) / (hi - lo) * bins);
        if (k >= 0 && k < bins) cuentas[k]++;
      });
      const ancho = (hi - lo) / bins;
      return Math.max(...cuentas) / valores.length / ancho;
    }

    /**
     * Rótulo directo sobre la curva. Se prefiere a las cajas de leyenda cuando
     * el espacio lo permite, siguiendo el criterio de las Notas.
     */
    rotulo(x, y, texto, o = {}) {
      const c = this.ctx;
      c.save();
      c.font = `${o.peso || 600} ${(o.tam || 1) * this.fs}px ${getComputedStyle(document.body).fontFamily}`;
      c.fillStyle = o.color || color('tinta');
      c.textAlign = o.align || 'left';
      c.textBaseline = o.base || 'middle';
      const X = o.px ? x : this.x(x);
      const Y = o.py ? y : this.y(y);
      const lineas = String(texto).split('\n');
      const alto = this.fs * 1.28;
      if (o.fondo !== false) {
        const anchoMax = Math.max(...lineas.map((l) => c.measureText(l).width));
        let bx = X;
        if (c.textAlign === 'center') bx -= anchoMax / 2;
        else if (c.textAlign === 'right') bx -= anchoMax;
        let by = Y - alto * lineas.length / 2;
        if (c.textBaseline === 'top') by = Y;
        else if (c.textBaseline === 'bottom') by = Y - alto * lineas.length;
        c.fillStyle = alfa(color('fondo-caja') === '#ffffff' ? '#ffffff' : color('fondo-caja'), .82);
        c.fillRect(bx - 4, by - 2, anchoMax + 8, alto * lineas.length + 4);
        c.fillStyle = o.color || color('tinta');
      }
      lineas.forEach((l, i) => {
        const dy = (i - (lineas.length - 1) / 2) * alto;
        c.fillText(l, X, Y + (c.textBaseline === 'middle' ? dy : i * alto));
      });
      c.restore();
      return this;
    }

    /** Leyenda compacta con muestra de trazo, para cuando no cabe el rótulo directo. */
    leyenda(entradas, o = {}) {
      const c = this.ctx;
      c.save();
      c.font = `${this.fs * .95}px ${getComputedStyle(document.body).fontFamily}`;
      const alto = this.fs * 1.5;
      const anchoMuestra = 26;
      const anchos = entradas.map((e) => c.measureText(e.texto).width + anchoMuestra + 10);
      const w = Math.max(...anchos) + 14;
      const h = entradas.length * alto + 10;
      let x = o.x !== undefined ? o.x : this.caja.x1 - w - 8;
      let y = o.y !== undefined ? o.y : this.caja.y0 + 8;
      if (o.esquina === 'ii') { x = this.caja.x0 + 8; y = this.caja.y1 - h - 8; }
      if (o.esquina === 'si') { x = this.caja.x0 + 8; y = this.caja.y0 + 8; }
      if (o.esquina === 'id') { x = this.caja.x1 - w - 8; y = this.caja.y1 - h - 8; }

      c.fillStyle = alfa(color('fondo-caja'), .9);
      c.strokeStyle = color('borde');
      c.lineWidth = 1;
      c.beginPath();
      if (c.roundRect) c.roundRect(x, y, w, h, 7); else c.rect(x, y, w, h);
      c.fill(); c.stroke();

      entradas.forEach((e, i) => {
        const cy = y + 5 + alto * i + alto / 2;
        c.save();
        c.strokeStyle = e.color;
        c.lineWidth = e.grosor || 2.6;
        c.setLineDash(e.trazo || TRAZO.solido);
        c.lineCap = 'round';
        c.beginPath();
        c.moveTo(x + 9, cy); c.lineTo(x + 9 + anchoMuestra, cy);
        c.stroke();
        c.restore();
        c.fillStyle = color('tinta-media');
        c.textAlign = 'left'; c.textBaseline = 'middle';
        c.fillText(e.texto, x + 9 + anchoMuestra + 9, cy);
      });
      c.restore();
      return this;
    }

    /** Flecha anotadora de (x0,y0) a (x1,y1) en coordenadas de datos. */
    flecha(x0, y0, x1, y1, o = {}) {
      const c = this.ctx;
      const X0 = this.x(x0), Y0 = this.y(y0), X1 = this.x(x1), Y1 = this.y(y1);
      c.save();
      c.strokeStyle = o.color || color('tinta-media');
      c.fillStyle = o.color || color('tinta-media');
      c.lineWidth = o.grosor || 1.8;
      c.setLineDash(o.trazo || TRAZO.solido);
      c.beginPath(); c.moveTo(X0, Y0); c.lineTo(X1, Y1); c.stroke();
      const ang = Math.atan2(Y1 - Y0, X1 - X0);
      const L = o.punta || 8;
      c.setLineDash([]);
      c.beginPath();
      c.moveTo(X1, Y1);
      c.lineTo(X1 - L * Math.cos(ang - .4), Y1 - L * Math.sin(ang - .4));
      c.lineTo(X1 - L * Math.cos(ang + .4), Y1 - L * Math.sin(ang + .4));
      c.closePath(); c.fill();
      if (o.doble) {
        c.beginPath();
        c.moveTo(X0, Y0);
        c.lineTo(X0 + L * Math.cos(ang - .4), Y0 + L * Math.sin(ang - .4));
        c.lineTo(X0 + L * Math.cos(ang + .4), Y0 + L * Math.sin(ang + .4));
        c.closePath(); c.fill();
      }
      c.restore();
      return this;
    }

    /** Convierte coordenadas de pantalla a coordenadas de datos (para arrastrar). */
    aDatos(px, py) {
      const r = this.cv.getBoundingClientRect();
      const X = px - r.left, Y = py - r.top;
      const { x0, x1, y0, y1 } = this.caja;
      return [
        this.xlim[0] + (X - x0) / (x1 - x0) * (this.xlim[1] - this.xlim[0]),
        this.ylim[0] + (y1 - Y) / (y1 - y0) * (this.ylim[1] - this.ylim[0])
      ];
    }
  }

  /* =========================================================================
     8. Controles
     -------------------------------------------------------------------------
     Los controles se escriben en el HTML de cada página (para que se lean como
     documento) y aquí sólo se enlazan. `data-dec` fija los decimales de la
     lectura y `data-suf` el sufijo.
     ====================================================================== */

  const _cache = new Map();
  function el(id) {
    if (!_cache.has(id)) _cache.set(id, document.getElementById(id));
    return _cache.get(id);
  }

  /** Valor de un control: número si es rango, booleano si es casilla. */
  function val(id) {
    const e = el(id);
    if (!e) return undefined;
    if (e.type === 'checkbox') return e.checked;
    return parseFloat(e.value);
  }

  /** Opción marcada de un grupo de radios. */
  function grupo(nombre) {
    const e = document.querySelector(`input[name="${nombre}"]:checked`);
    return e ? e.value : null;
  }

  /** Escribe una lectura de resultado. */
  function mostrar(id, texto, clase) {
    const e = el(id);
    if (!e) return;
    e.textContent = texto;
    if (clase !== undefined) e.className = 'v ' + clase;
  }

  function actualizarLectura(inp) {
    const cont = inp.closest('.control');
    if (!cont) return;
    const salida = cont.querySelector('.val');
    if (!salida) return;
    const dec = inp.dataset.dec !== undefined ? +inp.dataset.dec : 2;
    const suf = inp.dataset.suf || '';
    const pre = inp.dataset.pre || '';
    salida.textContent = pre + fmt(parseFloat(inp.value), dec) + suf;
  }

  /**
   * Enlaza todos los controles del documento a `cb`, que se llama en cada
   * cambio y una vez al inicio. Guarda los valores iniciales para poder
   * reiniciar con la tecla R.
   */
  function enlazar(cb) {
    const entradas = Array.from(document.querySelectorAll('.panel input'));
    const iniciales = entradas.map((e) => (e.type === 'checkbox' || e.type === 'radio' ? e.checked : e.value));

    const disparar = () => { try { cb(); } catch (err) { console.error(err); } };

    entradas.forEach((e) => {
      if (e.type === 'range') {
        actualizarLectura(e);
        e.addEventListener('input', () => { actualizarLectura(e); disparar(); });
      } else {
        e.addEventListener('change', disparar);
      }
    });

    window.addEventListener('lab:reiniciar', () => {
      entradas.forEach((e, i) => {
        if (e.type === 'checkbox' || e.type === 'radio') e.checked = iniciales[i];
        else { e.value = iniciales[i]; actualizarLectura(e); }
      });
      disparar();
    });

    disparar();
    return disparar;
  }

  /* =========================================================================
     9. Armazón de la página: barra, teclado, tema, modo proyección
     ====================================================================== */

  const PAGINAS = [
    { href: 'mco.html',            titulo: 'MCO',              corto: 'MCO' },
    { href: 'colisionador.html',   titulo: 'DAG y sesgos',     corto: 'DAG' },
    { href: 'instrumentos.html',   titulo: 'Instrumentos',     corto: 'VI' },
    { href: 'efectos-fijos.html',  titulo: 'Efectos fijos',    corto: 'Panel' },
    { href: 'did.html',            titulo: 'Dif. en dif.',     corto: 'DiD' },
    { href: 'logit-probit.html',   titulo: 'Logit y probit',   corto: 'Logit' }
  ];

  function construirBarra() {
    const actual = location.pathname.split('/').pop() || 'index.html';
    const enSim = location.pathname.includes('/sim/');
    const raiz = enSim ? '../' : '';

    const barra = document.createElement('header');
    barra.className = 'barra';
    const nav = PAGINAS.map((p) => {
      const href = (enSim ? '' : 'sim/') + p.href;
      const act = p.href === actual ? ' aria-current="page"' : '';
      return `<a href="${href}"${act}>${p.corto}</a>`;
    }).join('');

    barra.innerHTML = `
      <div class="barra-int">
        <a class="marca" href="${raiz}index.html">Econometría I <span>· Laboratorio</span></a>
        <nav>
          ${nav}
          <button class="boton-icono" id="btn-tema" title="Alternar tema claro/oscuro (T)" aria-label="Alternar tema">◐</button>
          <button class="boton-icono" id="btn-proy" title="Modo proyección (P)" aria-label="Modo proyección">⛶</button>
          <button class="boton-icono" id="btn-ayuda" title="Atajos de teclado (?)" aria-label="Atajos de teclado">?</button>
        </nav>
      </div>`;
    document.body.insertBefore(barra, document.body.firstChild);

    const ayuda = document.createElement('div');
    ayuda.id = 'ayuda-teclas';
    ayuda.innerHTML = `
      <div class="caja">
        <h3>Atajos para la clase</h3>
        <dl>
          <dt><kbd>Tab</kbd></dt><dd>Pasar de un control al siguiente</dd>
          <dt><kbd>←</kbd> <kbd>→</kbd></dt><dd>Mover el control enfocado</dd>
          <dt><kbd>R</kbd></dt><dd>Reiniciar los valores</dd>
          <dt><kbd>Espacio</kbd></dt><dd>Volver a simular, donde aplique</dd>
          <dt><kbd>P</kbd></dt><dd>Modo proyección: oculta el texto y agranda</dd>
          <dt><kbd>T</kbd></dt><dd>Tema claro u oscuro</dd>
          <dt><kbd>+</kbd> <kbd>−</kbd></dt><dd>Escala de la tipografía</dd>
          <dt><kbd>0</kbd></dt><dd>Escala original</dd>
          <dt><kbd>Esc</kbd></dt><dd>Cerrar esta ayuda</dd>
        </dl>
      </div>`;
    document.body.appendChild(ayuda);
    ayuda.addEventListener('click', (ev) => { if (ev.target === ayuda) ayuda.removeAttribute('data-abierto'); });

    document.getElementById('btn-tema').addEventListener('click', alternarTema);
    document.getElementById('btn-proy').addEventListener('click', alternarProyeccion);
    document.getElementById('btn-ayuda').addEventListener('click', () => {
      ayuda.toggleAttribute('data-abierto');
    });
  }

  function temaActual() {
    const fijado = document.documentElement.dataset.tema;
    if (fijado) return fijado;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oscuro' : 'claro';
  }

  function alternarTema() {
    const nuevo = temaActual() === 'oscuro' ? 'claro' : 'oscuro';
    document.documentElement.dataset.tema = nuevo;
    try { localStorage.setItem('econ-tema', nuevo); } catch (e) { /* modo privado */ }
    limpiarColores();
    window.dispatchEvent(new Event('lab:repintar'));
  }

  function alternarProyeccion() {
    document.body.toggleAttribute('data-proyeccion');
    window.dispatchEvent(new Event('lab:repintar'));
  }

  let escala = 1;
  function ajustarEscala(d) {
    escala = Math.max(0.8, Math.min(1.8, d === 0 ? 1 : escala + d));
    document.documentElement.style.setProperty('--escala', escala.toFixed(2));
    window.dispatchEvent(new Event('lab:repintar'));
  }

  function teclado() {
    document.addEventListener('keydown', (ev) => {
      if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
      const t = ev.target;
      const editando = t && (t.tagName === 'INPUT' && t.type !== 'range' || t.tagName === 'TEXTAREA');
      if (editando) return;

      const k = ev.key;
      if (k === '?') { document.getElementById('ayuda-teclas').toggleAttribute('data-abierto'); ev.preventDefault(); }
      else if (k === 'Escape') { document.getElementById('ayuda-teclas').removeAttribute('data-abierto'); }
      else if (k === 'r' || k === 'R') { window.dispatchEvent(new Event('lab:reiniciar')); ev.preventDefault(); }
      else if (k === 'p' || k === 'P') { alternarProyeccion(); ev.preventDefault(); }
      else if (k === 't' || k === 'T') { alternarTema(); ev.preventDefault(); }
      else if (k === '+' || k === '=') { ajustarEscala(.08); ev.preventDefault(); }
      else if (k === '-' || k === '_') { ajustarEscala(-.08); ev.preventDefault(); }
      else if (k === '0') { ajustarEscala(0); ev.preventDefault(); }
      else if (k === ' ' && t.tagName !== 'BUTTON') { window.dispatchEvent(new Event('lab:correr')); ev.preventDefault(); }
    });
  }

  /** Arranca el armazón. Devuelve una promesa que resuelve cuando el DOM está listo. */
  function iniciar(dibujar) {
    try {
      const g = localStorage.getItem('econ-tema');
      if (g) document.documentElement.dataset.tema = g;
    } catch (e) { /* modo privado */ }

    const arranque = () => {
      construirBarra();
      teclado();
      limpiarColores();

      let pendiente = null;
      const repintar = () => {
        if (pendiente) cancelAnimationFrame(pendiente);
        pendiente = requestAnimationFrame(() => { pendiente = null; limpiarColores(); dibujar && dibujar(); });
      };
      window.addEventListener('resize', repintar);
      window.addEventListener('lab:repintar', repintar);
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        limpiarColores(); repintar();
      });
      return repintar;
    };

    if (document.readyState === 'loading') {
      return new Promise((res) => document.addEventListener('DOMContentLoaded', () => res(arranque())));
    }
    return Promise.resolve(arranque());
  }

  /* ===================================================================== */

  return {
    rng, inv, tmul, tvec, mv, transponer, multiplicar,
    mco, dosEtapas, fPrimeraEtapa, indiceBinario, panel,
    Phi, phi, Lambda, lambdaDens, mills, erfc,
    media, desv, correlacion, cuantil,
    fmt, fmtSigno, color, alfa, limpiarColores, TRAZO,
    Grafica, ticksBonitos,
    val, grupo, mostrar, enlazar, el,
    iniciar, alternarTema, alternarProyeccion
  };
})();

if (typeof module !== 'undefined' && module.exports) module.exports = Lab;
