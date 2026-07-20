---
title: "1. La regresión como una forma de pensar (en espanol)"
subtitle: "MATH 4210, Capítulo 1"
---

(ch01-es)=
# 1. La regresión como una forma de pensar

:::{div}
:class: lang-toggle
[English](./index.md)
:::

Tres personas observan tres tablas de números, y cada una de ellas tiene que decidir algo.

Una ingeniera de producción de la Toluca Company tiene registros de 25 corridas de fabricación: el
tamaño de cada lote y las horas de trabajo que tomó. Debe recomendar un tamaño de lote que mantenga
bajos los costos, y para hacerlo necesita saber cómo crecen las horas con el tamaño del lote. Un solo
número lo resolvería: ¿cuántas horas adicionales cuesta una unidad más en el lote? La @fig-ch01-toluca-es
son sus datos.

```{figure} ../ch02/figures/fig_ch02_toluca_scatter.png
:name: fig-ch01-toluca-es
:alt: Diagrama de dispersión de 25 corridas de producción de Toluca, con las horas de trabajo en el eje vertical frente al tamaño del lote en el eje horizontal, y una recta de pendiente positiva que atraviesa la nube. Las horas de trabajo suben desde unas 110 con un tamaño de lote de 20 hasta más de 500 con un tamaño de lote de 120.
Veinticinco corridas de producción en la Toluca Company. Los lotes más grandes toman más horas, y la tendencia parece recta, pero ¿cuál es la recta correcta y cuánto puedes confiar en su pendiente? El Capítulo 2 responde ambas cosas.
```

En la noche del 27 de enero de 1986, una tabla muy distinta estaba frente a los ingenieros que
decidían si lanzar el transbordador espacial Challenger a la mañana siguiente. De 23 vuelos anteriores
tenían la temperatura de lanzamiento y el número de anillos de sello (O-rings), de seis, que mostraron
daño por calor. El pronóstico para el lanzamiento era de unos 31 grados Fahrenheit, más frío que
cualquier vuelo registrado. ¿Podían decir cuál sería el riesgo de daño a una temperatura a la que nunca
habían volado? La @fig-ch01-orings-es es aquello a partir de lo cual tenían que razonar.

```{figure} ../ch13/figures/fig_ch13_orings_temp.png
:name: fig-ch01-orings-es
:alt: Diagrama de dispersión de la fracción de seis anillos dañados frente a la temperatura de lanzamiento en grados Fahrenheit para 23 vuelos del transbordador. Los vuelos más fríos, cerca de 53 grados, muestran el mayor daño; los vuelos cálidos por encima de 70 grados en su mayoría no muestran ninguno. Una línea roja discontinua marca el lanzamiento a 31 grados, muy a la izquierda de toda observación.
Los 23 vuelos previos al Challenger. El daño fue peor en los lanzamientos más fríos, y el lanzamiento en discusión (línea discontinua, 31 grados) quedaba muy por debajo de cualquier vuelo realizado. Juzgar ese riesgo significa extender un patrón más allá del último dato. El Capítulo 13 lo aborda.
```

Un decano de una universidad de Estados Unidos tiene una tercera tabla: para 397 profesores, su rango,
disciplina, años de experiencia, sexo y salario. La tabla se construyó para responder una pregunta
concreta. Los hombres en los datos ganan, en promedio, unos catorce mil dólares al año más que las
mujeres. ¿Es esa brecha evidencia de un pago desigual, o solo refleja que los dos grupos difieren en
rango y experiencia? Un promedio crudo no puede distinguirlo. La @fig-ch01-salary-es muestra cómo sube
el salario con el rango por sí solo, que es una de las cosas que hay que tener en cuenta antes de que
la brecha por sexo signifique algo.

```{figure} ../ch11/figures/fig_ch11_salary_rank.png
:name: fig-ch01-salary-es
:alt: Un diagrama de caja con puntos dispersos del salario académico en miles de dólares para tres rangos del profesorado, Asistente, Asociado y Titular. Los salarios suben desde unos 80 mil para los profesores Asistentes hasta una amplia dispersión centrada cerca de 127 mil para los profesores Titulares, con rombos rojos que marcan las medias de cada grupo.
El salario de nueve meses sube abruptamente con el rango. Antes de que una brecha salarial cruda entre hombres y mujeres pueda significar algo, un modelo tiene que mantener fijos el rango, la disciplina y la experiencia. El Capítulo 11 construye ese modelo.
```

Un costo, una catástrofe y una cuestión de justicia. En la superficie no tienen nada en común. Pero
cada uno es la misma clase de problema: alguien quiere saber cómo una cantidad depende de otras, para
poder describirla, predecirla o actuar sobre ella. Eso es lo que hace la **regresión** (Definición 1.1),
y es el tema de este libro. Este primer capítulo es un mapa. Dice qué es la regresión y para qué sirve,
de dónde vino la palabra, cómo creció la idea a lo largo de dos siglos, dónde se ubica en la ciencia de
datos y el aprendizaje automático modernos, y qué te enseñará cada uno de los quince capítulos
siguientes. Aquí casi no hay matemáticas y nada que memorizar. La meta es darte la vista del terreno
antes de que empieces a recorrerlo.

:::{admonition} Esta lección de un vistazo
:class: important
- **Qué estamos haciendo:** Conocer la regresión como una sola idea a través de tres problemas reales, un costo de producción, un lanzamiento de transbordador y una brecha salarial, y trazar el mapa de lo que cubrirá el semestre.
- **Por qué lo hacemos:** Antes de cualquier técnica, necesitas saber para qué sirve la regresión y tener claros sus tres usos: describir una relación, predecir un caso nuevo y razonar sobre la causa.
- **Objetivo principal:** Decir qué es la regresión, nombrar sus tres usos e identificar las partes de un modelo estadístico (parte sistemática, parte aleatoria, parámetros, estimaciones).
- **Dónde empezamos:** Con casi nada de matemáticas, solo preguntas. La recta de costos de Toluca (@ch02-es), el lanzamiento del Challenger (@ch13-es) y la brecha salarial del profesorado (@ch11-es) son los hilos que el resto del libro retoma.
:::

:::{admonition} Objetivos de aprendizaje
:class: tip
Al terminar este capítulo podrás:
- **Explicar** qué es la regresión y distinguir sus tres usos: describir una relación, predecir un resultado nuevo y razonar sobre la causa.
- **Describir** de dónde vino la palabra "regresión" en los datos de estatura de Galton, y qué significa la "regresión a la media".
- **Identificar** las partes de un modelo estadístico: la parte sistemática, la parte aleatoria, los parámetros y sus estimaciones.
- **Distinguir** la asociación de la causa, y los datos observacionales de los experimentales, y decir por qué importa la diferencia.
- **Ubicar** la regresión dentro de los campos más amplios de la estadística, el aprendizaje automático y la ciencia de datos, y explicar por qué juzgar un modelo es hoy una habilidad más escasa que ajustarlo.
- **Recorrer** el semestre nombrando la pregunta que responde cada capítulo.
- **Configurar** R y Python y usar este libro para aprender por tu cuenta.
:::

(ch01-what-es)=
## 1.1 Qué hace la regresión

Las tres historias iniciales parecen no tener relación, pero cada una hace la misma pregunta, y una
sola herramienta responde las tres. La regresión estudia cómo una cantidad, la **respuesta**, cambia
con una o más de otras, los **predictores** (Definición 1.2). Escribe la respuesta $Y$ y un predictor
$X$. La regresión ajusta una regla que dice qué valor de $Y$ esperar en cada valor de $X$. Lo hace sin
fingir que el mundo es ordenado: dos lotes del mismo tamaño tomaron horas distintas, y dos vuelos a la
misma temperatura tuvieron daños distintos. La regla describe el comportamiento promedio y trata con
honestidad la dispersión restante.

:::{admonition} Definición 1.1: Regresión
:class: note definition
La **regresión** es un método para estudiar cómo una respuesta $Y$ cambia con uno o más predictores $X$.
Ajusta una regla para el valor esperado de $Y$ en cada configuración de $X$ y trata la dispersión
restante como ruido aleatorio, en lugar de suponer que la relación es exacta.
:::

:::{admonition} Definición 1.2: Respuesta y predictor
:class: note definition
La **respuesta** $Y$ es la variable que una regresión intenta explicar o predecir (también llamada
variable dependiente o de resultado). Un **predictor** $X$ es una variable que se usa para explicar o
predecir la respuesta (también llamada variable independiente o explicativa).
:::

La gente recurre a esa regla por tres razones distintas, y tenerlas claras es el primer hábito que este
curso quiere construir.

**Descripción.** A veces solo quieres resumir una relación que ya tienes delante. ¿Cuánto suben las
horas de trabajo, en promedio, por cada unidad extra de tamaño de lote? La respuesta es una pendiente,
un solo número interpretable, y reportarlo es descripción. No estás prediciendo nada nuevo ni afirmando
que el tamaño del lote cause las horas en algún sentido profundo; estás comprimiendo una nube de puntos
en una oración que un gerente puede usar.

**Predicción.** A veces quieres un número para un caso que aún no has visto. La corrida de la próxima
semana es de 100 unidades: ¿cuántas horas debemos presupuestar? Una predicción introduce un nuevo $X$
en la regla ajustada y lee el $Y$ esperado, idealmente con un margen de error adjunto. Una buena
predicción no requiere que entiendas *por qué* $X$ y $Y$ se mueven juntas, solo que el patrón que
se mantuvo en los datos siga manteniéndose. Esta es la meta que domina el aprendizaje automático
moderno.

**Razonamiento causal.** A veces quieres saber qué pasaría si *cambiaras* algo. ¿Pagar a las mujeres el
mismo salario inicial cerraría la brecha? ¿Un lanzamiento más cálido habría salvado el transbordador?
Estas son preguntas causales, y son las más difíciles de las tres, porque una regresión ajustada a
datos observados mide asociación, no causa. A veces puedes razonar sobre la causa con regresión, pero
solo con supuestos adicionales e, idealmente, el tipo de datos correcto. Confundir un ajuste predictivo
con una afirmación causal es el error más común y más costoso en la estadística aplicada, y este libro
regresa a la advertencia una y otra vez.

:::{admonition} Idea clave
:class: tip keyidea
La regresión tiene tres usos, listados aquí en orden creciente de cuánto le exigen a los datos:
descripción (resumir una relación que ya tienes), predicción (adivinar un resultado no observado) y
razonamiento causal (decir qué haría una intervención). La misma recta ajustada puede servir a los tres,
pero la confianza a la que tienes derecho se encoge a medida que bajas por la lista.
:::

La misma recta ajustada puede servir a las tres metas, pero la confianza a la que tienes derecho difiere
enormemente. La @fig-ch01-three-uses-es pone las tres una al lado de la otra: una recta, tres preguntas,
y un medidor de confianza que baja a medida que las preguntas se vuelven más audaces.

```{figure} figures/fig_ch01_three_uses.png
:name: fig-ch01-three-uses-es
:alt: Tres copias del mismo diagrama de dispersión y recta ajustada. La primera, etiquetada Descripción, marca la pendiente con un pequeño triángulo. La segunda, etiquetada Predicción, deja caer una línea discontinua desde un nuevo valor de X hasta la recta ajustada y muestra un punto con una barra de error. La tercera, etiquetada Razonamiento causal, dibuja una flecha curva a lo largo de la recta preguntando qué haría cambiar X. Una banda de color debajo va de verde a la izquierda a rojo a la derecha, etiquetada confianza a la que tienes derecho, alta a la izquierda y baja a la derecha.
La misma recta ajustada hace los tres trabajos, pero no ganan la misma confianza. La descripción solo lee una pendiente de los datos que tienes; la predicción introduce un nuevo X; el razonamiento causal pregunta qué haría una intervención, y necesita lo más de los datos. La confianza se encoge de izquierda a derecha.
```

Para hacer concretos los tres usos, aquí están los tres conjuntos de datos iniciales reducidos a tres
números reales.

:::{admonition} Ejemplo 1.1: Tres preguntas, tres números
:class: note
**Pregunta.** ¿En qué único número gira cada uno de los tres problemas iniciales?

**Intuición.** La pregunta de Toluca es una pendiente (horas por unidad). La pregunta salarial parte de
una brecha cruda (dólares). La pregunta del Challenger parte de los hechos simples del registro: cuántos
vuelos y qué tan frío fue el más frío.

**Fórmula.** Para Toluca, la pendiente $b_1$ de la recta de mínimos cuadrados (la recta que mejor se
ajusta, que el Capítulo 2 define con precisión) de las horas sobre el tamaño del lote. Para el salario,
la diferencia en el salario medio entre los dos grupos. Para los anillos, el conteo de vuelos y la
temperatura mínima de lanzamiento.

**Cálculo.**

```r
toluca <- read.csv("data/toluca.csv")
salaries <- read.csv("data/salaries.csv")
orings <- read.csv("data/orings.csv")

toluca_slope <- coef(lm(hours ~ lotsize, data = toluca))[["lotsize"]]
salary_gap <- mean(salaries$salary[salaries$sex == "Male"]) -
              mean(salaries$salary[salaries$sex == "Female"])
c(toluca_slope = round(toluca_slope, 2),
  salary_gap   = round(salary_gap, 0),
  orings_flights = nrow(orings),
  orings_coldest = min(orings$temp))
```
```text
  toluca_slope     salary_gap orings_flights orings_coldest
          3.57       14088.00          23.00          53.00
```

```python
import numpy as np
import pandas as pd
import statsmodels.formula.api as smf

toluca = pd.read_csv("data/toluca.csv")
salaries = pd.read_csv("data/salaries.csv")
orings = pd.read_csv("data/orings.csv")

toluca_slope = smf.ols("hours ~ lotsize", data=toluca).fit().params["lotsize"]
salary_gap = (salaries.loc[salaries.sex == "Male", "salary"].mean()
              - salaries.loc[salaries.sex == "Female", "salary"].mean())
print(round(toluca_slope, 2), round(salary_gap), len(orings), orings.temp.min())
```
```text
3.57 14088 23 53
```

**Interpretación.** Cada unidad extra en un lote de Toluca cuesta unas $3.57$ horas de trabajo en
promedio (descripción). Los hombres en los datos salariales ganan unos $\$14{,}088$ más al año que las
mujeres, antes de tener en cuenta cualquier otra cosa (una brecha cruda, todavía no un hallazgo). Y todo
vuelo del transbordador registrado se lanzó a $53$ grados o más cálido, así que la decisión a $31$ grados
quedaba muy fuera de toda experiencia (el hecho que hace peligrosa la predicción). Tres números, tres
clases de pregunta. El resto del libro trata de ganarse el derecho a enunciar cada uno con confianza.
:::

::::{admonition} Inténtalo 1.1
:class: important
Clasifica cada pregunta como descripción, predicción o razonamiento causal.

1. "En promedio, ¿cuántos dólares más en ventas gana una tienda por cada dólar extra gastado en anuncios de televisión?"
2. "Si abrimos un estudio en una ciudad con 60,000 jóvenes, ¿cuánto venderá?"
3. "Si este paciente pierde 10 libras, ¿bajará su presión arterial?"

:::{admonition} Solución
:class: dropdown
1. **Descripción.** Pide la pendiente que resume una relación ya presente en los datos.
2. **Predicción.** Introduce un nuevo valor de predictor en una regla ajustada para adivinar un resultado no observado.
3. **Razonamiento causal.** Pregunta qué cambiaría si interviniéramos sobre el peso del paciente, lo cual
es una afirmación sobre la causa, no solo asociación, y necesita más que un ajuste de regresión para
sostenerse.
:::
::::

Describir y predecir suenan como tareas distintas, pero salen de la misma recta, así que al mover los
datos mueves ambas a la vez. La pendiente de la ingeniera y su presupuesto de horas están en el
widget de abajo; arrastra una corrida y observa cuál de las dos es frágil.

```{iframe} ../../sims/ch01-what-regression-does.html?lang=es
:class: sim sim-m
:width: 100%
Las 25 corridas de Toluca, con la recta de mínimos cuadrados reajustándose mientras arrastras cualquier punto. Los valores muestran la pendiente $b_1$, el intercepto $b_0$, las horas predichas $\hat{Y}$ para un lote de 100 unidades y para uno de 200, y la SCE.
```

**Qué observar.** La pendiente es la descripción y $\hat{Y}$ es la predicción, y una sola corrida
arrastrada mueve ambas a la vez. **Prueba esto.** Arrastra hacia arriba la corrida del lote de $120$
y compara cuánto se mueve $\hat{Y}$ en $100$ frente a $\hat{Y}$ en $200$, un tamaño que nadie produjo
nunca: la predicción dentro de los datos apenas se inmuta mientras la que está más allá del borde se
sacude con fuerza.
Volver a la [Sección 1.1](#ch01-what-es).

(ch01-galton-es)=
## 1.2 La palabra "regresión": las estaturas de Galton

La palabra "regresión" es más antigua que el método moderno y viene de un lugar sorprendente: un estudio
de la estatura humana. En la década de 1880, Francis Galton recopiló las estaturas de 934 hijos adultos
y sus padres, 205 familias en total, y se preguntó si los padres altos tienen hijos altos. Sí los tienen,
pero Galton notó algo más extraño, y la rareza le dio su nombre al campo.

Para cada hijo, Galton calculó una **estatura media de los padres**, un promedio ponderado de las
estaturas de los dos padres. Luego graficó la estatura del hijo frente a la estatura media de los padres.
La @fig-ch01-galton-scatter-es muestra ese gráfico con dos rectas dibujadas encima. La recta roja
discontinua es $y = x$: donde caerían los hijos si cada uno igualara exactamente a sus padres. La recta
azul es la recta real de mejor ajuste a través de los datos.

```{figure} figures/fig_ch01_galton_scatter.png
:name: fig-ch01-galton-scatter-es
:alt: Diagrama de dispersión de la estatura del hijo frente a la estatura media de los padres para 934 hijos, con dos rectas. Una recta roja discontinua marca y igual a x (los hijos igualando a los padres), y una recta azul de mínimos cuadrados que es claramente menos inclinada, cruzando la línea discontinua cerca del centro y quedando por debajo de ella a la derecha y por encima a la izquierda.
Los 934 hijos de Galton. La recta de mínimos cuadrados (azul) es mucho menos inclinada que la recta de estaturas iguales (roja discontinua): los padres altos tienen hijos que son altos pero más cerca del promedio, y los padres bajos tienen hijos que son bajos pero más cerca del promedio. Galton llamó a este tirón hacia el centro "regresión".
```

La recta azul es claramente más plana que $y = x$. Léela desde la derecha: los hijos de padres muy altos
son más altos que el promedio, pero no tan altos como sus padres. Léela desde la izquierda: los hijos de
padres muy bajos son más bajos que el promedio, pero no tan bajos. En ambas direcciones las estaturas de
los hijos son atraídas hacia el promedio general. Galton llamó a este tirón "regresión hacia la
mediocridad", queriendo decir el centro, y el nombre se quedó con todo el método aunque el método ahora
no tiene nada que ver con las estaturas. La @fig-ch01-regression-to-mean-es hace imposible no ver el
tirón promediando a los hijos dentro de bandas estrechas de estatura de los padres.

```{figure} figures/fig_ch01_regression_to_mean.png
:name: fig-ch01-regression-to-mean-es
:alt: Un gráfico de la estatura media del hijo por cada intervalo de estatura media de los padres frente al centro del intervalo, con la recta de estaturas iguales y igual a x discontinua en rojo por encima de los puntos y la recta de mínimos cuadrados en azul a través de ellos. Flechas en los extremos muestran los intervalos de padres altos jalados hacia abajo hacia la media y los intervalos de padres bajos jalados hacia arriba.
La estatura media del hijo en cada banda de estatura de los padres cae sobre la recta azul poco inclinada, por debajo de la recta roja de estaturas iguales a la derecha y por encima a la izquierda. Todo grupo extremo de padres produce un grupo menos extremo de hijos. Eso es regresión a la media.
```

Podemos ponerle un número al tirón. Ajustar la recta de mínimos cuadrados de la estatura del hijo sobre
la estatura media de los padres da la pendiente y el intercepto de abajo.

:::{admonition} Ejemplo 1.2: La recta de regresión de Galton
:class: note
**Pregunta.** ¿Cuánto más alto, en promedio, es un hijo por cada pulgada extra de estatura media de los
padres, y qué dice esa pendiente sobre la regresión a la media?

**Intuición.** Ajusta la recta que mejor predice la estatura del hijo a partir de la estatura media de
los padres y lee su pendiente. Una pendiente de $1$ significaría que los hijos igualan exactamente las
desviaciones de sus padres respecto del promedio; una pendiente por debajo de $1$ significa que las
desviaciones se encogen de una generación a la siguiente.

**Fórmula.** La recta ajustada $\widehat{\text{child}} = b_0 + b_1 \cdot \text{midparent}$, donde $b_1$
es la pendiente y $b_0$ el intercepto. (El Capítulo 2 muestra de dónde salen estos números; aquí solo
los leemos.)

**Cálculo.**

```r
galton <- read.csv("data/galton_heights.csv")
fit <- lm(childHeight ~ midparentHeight, data = galton)
coef(fit)
```
```text
    (Intercept) midparentHeight
     22.6362405       0.6373609
```

```python
galton = pd.read_csv("data/galton_heights.csv")
fit = smf.ols("childHeight ~ midparentHeight", data=galton).fit()
print(fit.params)
```
```text
Intercept          22.636241
midparentHeight     0.637361
dtype: float64
```

**Interpretación.** La pendiente es de aproximadamente $0.64$. Cada pulgada extra de estatura media de
los padres va con solo unos dos tercios de pulgada de estatura extra del hijo, en promedio. La pendiente
está muy por debajo de $1$, y eso es la regresión a la media en un solo número: las estaturas de los
hijos son un eco atenuado de las de sus padres. El intercepto $22.6$ no tiene significado por sí solo
aquí (nadie tiene una estatura media de los padres cercana a cero); es solo el número que fija la recta
a la altura correcta.
:::

Dos advertencias que este pequeño ejemplo ya enseña. Primera, la "regresión a la media" es un hecho sobre
promedios, no sobre ninguna familia en particular: muchos padres altos tienen hijos más altos que ellos
mismos; el hijo *promedio* de padres altos es más bajo que los padres. Segunda, el efecto es fácil de
malinterpretar como algo causal o misterioso, y no es ninguna de las dos cosas. Ocurre siempre que dos
mediciones están correlacionadas de forma menos que perfecta, por una razón puramente estadística. El
siguiente Inténtalo muestra la trampa en un escenario moderno.

:::{admonition} Idea clave
:class: tip keyidea
La **regresión a la media** es un hecho sobre promedios, no un destino. Escoge casos por ser extremos en
una medición con ruido (los padres más altos, los mejores novatos), y su segunda medición será en
promedio menos extrema, porque parte del primer extremo fue suerte que no se repite. Parece causal o
misterioso y no es ninguno de los dos, y engaña a la gente siempre que lo olvida.
:::

::::{admonition} Inténtalo 1.2
:class: important
Una revista deportiva nota que los novatos que batearon más jonrones en su primera temporada tienden a
batear menos en la segunda, y publica un artículo sobre el "bajón del segundo año", culpando a la presión
y a la complacencia. Da una explicación más simple que no necesite psicología alguna.

:::{admonition} Solución
:class: dropdown
Los totales de jonrones dependen en parte de la habilidad y en parte de la suerte (salud, enfrentamientos
favorables, unas cuantas pelotas que apenas pasaron la barda). Los novatos con los totales más altos
probablemente fueron a la vez hábiles y afortunados. La habilidad se traslada al segundo año; la suerte
no. Así que sus totales de la segunda temporada regresan hacia la media, igual que los hijos de los padres
más altos. El "bajón" es en su mayoría regresión a la media, el mismo efecto que vio Galton, disfrazado
de una historia sobre el carácter. Verías la imagen espejo, un "repunte del segundo año", si en cambio
siguieras a los *peores* novatos.
:::
::::

Leer ese jalón en un diagrama estático cuesta trabajo. Es más fácil sentirlo eligiendo tú mismo una
estatura de los padres y observando cuánta de su ventaja conserva el hijo.

```{iframe} ../../sims/ch01-regression-to-mean.html?lang=es
:class: sim sim-m
:width: 100%
La recta de mínimos cuadrados de Galton frente a la recta de estaturas iguales $y = x$, con un deslizador para la estatura media de los padres. Los valores muestran cuánto están los padres sobre el promedio, el hijo predicho $\hat{Y}$, y cuánto queda ese hijo sobre el promedio.
```

**Qué observar.** El hijo predicho siempre cae entre la estatura de sus padres y el promedio
general, tanto del lado alto como del lado bajo. **Prueba esto.** Desliza de $75$ pulgadas hasta
$65$ y observa que la fracción conservada se mantiene en $0.637$ todo el camino: el mismo $b_1$ que
encoge la ventaja de una familia alta levanta el déficit de una familia baja.
Volver a la [Sección 1.2](#ch01-galton-es).

Los datos de Galton vuelven en @ch04-es, donde la pendiente poco inclinada se convierte en una correlación
y estudiamos los usos y abusos de la correlación por completo.

(ch01-anatomy-es)=
## 1.3 La anatomía de un modelo estadístico

Toda regresión en este libro se construye a partir de las mismas dos piezas, y nombrarlas ahora hará que
todo el curso sea más fácil de seguir. Mira de nuevo cualquiera de los diagramas de dispersión hasta
ahora. Los puntos no caen sobre una sola curva; se dispersan alrededor de una. Un **modelo estadístico**
toma eso en serio (Definición 1.3) al dividir la respuesta en una parte que una regla puede explicar y
una parte que no puede.

$$
Y \;=\; \underbrace{f(X)}_{\text{parte sistemática}} \;+\; \underbrace{\varepsilon}_{\text{parte aleatoria}} .
$$

En palabras: cada respuesta observada es la suma de una señal, $f(X)$, el valor promedio de $Y$ que el
predictor explica, y un término de ruido $\varepsilon$, todo lo demás que empuja a la observación fuera
de ese promedio. La @fig-ch01-anatomy-es dibuja la división para un solo conjunto de datos.

:::{admonition} Definición 1.3: Modelo estadístico
:class: note definition
Un **modelo estadístico** divide cada respuesta en una parte sistemática y una parte aleatoria,
$Y = f(X) + \varepsilon$. La parte sistemática $f(X)$ es la respuesta media que los predictores explican
(la señal); la parte aleatoria $\varepsilon$ es la variación que no explican (el ruido).
:::

```{figure} figures/fig_ch01_anatomy.png
:name: fig-ch01-anatomy-es
:alt: Un diagrama de dispersión de puntos verdes que suben con X, una recta azul a través de su centro etiquetada la parte sistemática f de X, y un segmento vertical naranja desde la recta hasta un punto etiquetado el error aleatorio épsilon. Un pie de figura dice respuesta igual a señal más ruido.
Un modelo divide cada observación en dos partes: la señal sistemática f(X) que el predictor explica (recta azul), y el ruido aleatorio épsilon que no explica (un error dibujado en naranja). La regresión es el oficio de estimar la señal sin dejarse engañar por el ruido.
```

La parte sistemática es lo que estimamos. En la mayor parte de este libro $f(X)$ es una línea recta,
$f(X) = \beta_0 + \beta_1 X$, y el modelo se convierte en el modelo de regresión lineal simple
$Y = \beta_0 + \beta_1 X + \varepsilon$ que @ch02-slr-model-es construye con cuidado. En palabras: la
respuesta promedio sube (o baja) una cantidad fija $\beta_1$ por cada paso de una unidad en $X$, y
$\beta_0$ es donde empieza la recta. Las letras griegas $\beta_0$ y $\beta_1$ son **parámetros**
(Definición 1.4): números fijos que describen la relación verdadera en toda la población, que nunca
llegamos a ver directamente. A partir de una muestra de datos calculamos **estimaciones** de ellos,
escritas $b_0$ y $b_1$, que son nuestras mejores conjeturas. Es como la diferencia entre la verdadera
estatura promedio de cada adulto vivo, un número fijo que nadie podría medir jamás, y la estatura
promedio de las cien personas que efectivamente encuestaste, un número que puedes calcular y que está
cerca de la verdad pero no es exactamente ella. La distinción entre un parámetro (la verdad que queremos)
y una estimación (el número que podemos calcular) atraviesa cada capítulo, y confundirlos causa una
infinidad de enredos.

:::{admonition} Definición 1.4: Parámetro y estimación
:class: note definition
Un **parámetro** es un número fijo pero desconocido que describe la relación verdadera en toda la
población, como la pendiente $\beta_1$. Una **estimación** es un número calculado a partir de una muestra
como mejor conjetura de un parámetro, como la pendiente de mínimos cuadrados $b_1$.
:::

La parte aleatoria $\varepsilon$ no es un error ni una falla del modelo. Es la admisión honesta de que
el tamaño del lote no determina las horas exactamente, de que la temperatura no determina el daño a los
anillos exactamente, de que el mundo tiene variación que los predictores no capturan. Un buen modelo no
finge que el ruido no existe; estima la señal *y* describe el tamaño del ruido, para que las predicciones
vengan con barras de error y las afirmaciones con márgenes.

La división suena abstracta hasta que la aplicas a una sola fila de datos reales. Toma una corrida de
Toluca y sepárala en las dos piezas que la ecuación promete.

:::{admonition} Ejemplo 1.3: Señal más ruido en una corrida de producción
:class: note
**Pregunta.** La ecuación de la anatomía dice que toda observación es una señal más un ruido. Para una
corrida real de Toluca, ¿qué número es la señal y qué número es el ruido?

**Intuición.** Ajusta la recta, luego lee su altura en el tamaño de lote de esa corrida: esa altura es
las horas promedio que el modelo explica, la señal. Lo que queda, la brecha de la recta hacia arriba
hasta las horas reales, es el ruido. Los dos deben sumar de vuelta las horas que observaste.

**Fórmula.** Para una corrida con tamaño de lote $x$ y horas observadas $y$, la señal ajustada es
$\hat{y} = b_0 + b_1 x$ y el sobrante es $e = y - \hat{y}$, de modo que $y = \hat{y} + e$. La cantidad
$e$ es el **residuo**, el sustituto visible del error no observado $\varepsilon$ (el Capítulo 2 hace
exacta esa distinción; las preguntas frecuentes al final de este capítulo la adelantan).

**Cálculo.**

```r
toluca <- read.csv("data/toluca.csv")
fit <- lm(hours ~ lotsize, data = toluca)
b <- coef(fit)

run <- toluca[1, ]                       # the first production run
signal <- b[["(Intercept)"]] + b[["lotsize"]] * run$lotsize
noise  <- run$hours - signal
data.frame(lotsize = run$lotsize, observed = run$hours,
           signal = round(signal, 1), noise = round(noise, 1))
```
```text
  lotsize observed signal noise
1      80      399    348    51
```

```python
toluca = pd.read_csv("data/toluca.csv")
fit = smf.ols("hours ~ lotsize", data=toluca).fit()
b0, b1 = fit.params["Intercept"], fit.params["lotsize"]

run = toluca.iloc[0]                      # the first production run
signal = b0 + b1 * run["lotsize"]
noise = run["hours"] - signal
print(pd.DataFrame({"lotsize": [run["lotsize"]], "observed": [run["hours"]],
                    "signal": [round(signal, 1)], "noise": [round(noise, 1)]}))
```
```text
   lotsize  observed  signal  noise
0       80       399   348.0   51.0
```

**Interpretación.** La primera corrida hizo un lote de $80$ unidades y tomó $399$ horas. La recta
ajustada pone la corrida promedio de ese tamaño en unas $348$ horas, y esa es la señal, la parte que el
tamaño del lote explica. Esta corrida en particular tomó unas $51$ horas más de lo que el modelo espera,
y ese es el ruido. Esas $51$ horas no son un error de la aritmética; son variación real, la cuadrilla,
las máquinas, el día, que el tamaño del lote por sí solo no captura. Suma las dos de vuelta,
$348 + 51 = 399$, y recuperas la observación exactamente. Eso es $Y = f(X) + \varepsilon$ escrito para
una sola línea de un conjunto de datos real.
:::

:::{admonition} Una nota sobre la notación
:class: note
Este libro sigue la notación de la literatura de regresión aplicada, presentada en la tabla de la
[página de bienvenida](../index.md). Dos convenciones difieren de un curso de estadística introductoria
como MATH 2200 de CSUB. Escribimos la distribución normal como $N(\mu, \sigma^2)$, con la **varianza** en
el segundo lugar, no la desviación estándar. Y usamos letras romanas simples $b_0, b_1$ para las
estimaciones con tanta frecuencia como las versiones con sombrero $\hat\beta_0, \hat\beta_1$; ambas
significan lo mismo. Todavía no necesitas la tabla completa. El Capítulo 2 introduce cada símbolo a
medida que se necesita.
:::

:::{admonition} Habilidad duradera: Separa la señal del ruido
:class: tip
El hábito de preguntar "¿qué parte de esta variación es sistemática y cuál es solo ruido?" sobrevive a
este curso y a esta materia. Un mes de ventas fuertes, un buen trimestre para un fondo, una baja en los
síntomas de un paciente: cada uno es en parte señal y en parte ruido, y actuar como si todo fuera señal
es como la gente persigue casualidades. Cuando te encuentres con cualquier número que varíe, practica
dividirlo en tu cabeza en la parte que podrías predecir y la parte que no, y trata a las dos de forma
distinta. La regresión es la versión formal de un hábito que vale la pena tener en todas partes.
:::

El lugar más limpio para ver separarse las dos partes es un mecanismo sin misterio alguno. Lanza una
moneda justa veinte veces: la señal está fija en diez caras y todo lo demás en pantalla es la parte
aleatoria.

```{iframe} ../../sims/ch01-coin-tosses.html?lang=es
:class: sim sim-m
:width: 100%
Veinte lanzamientos de una moneda justa, repetidos en tantas rondas como quieras. La parte sistemática está fija en diez caras, marcada en ámbar, y el histograma reúne el conteo de cada ronda.
```

**Qué observar.** El conteo casi nunca cae en exactamente diez, y aun así el montón que forma es
perfectamente ordenado. **Prueba esto.** Corre 1000 rondas y observa que la media se asienta cerca
de $10$ mientras la dispersión se mantiene cerca de $2.24$: el ruido nunca desaparece, solo se
vuelve descriptible, y por eso un modelo lleva un $\varepsilon$ en vez de fingir que la dispersión
no existe.
Volver a la [Sección 1.3](#ch01-anatomy-es).

(ch01-causation-es)=
## 1.4 La asociación no es causa

La Sección 1.1 llamó al razonamiento causal el más difícil de los tres usos. Esta sección dice por qué.
Una recta de regresión a través de datos observados mide **asociación** (Definición 1.5): te dice que
$Y$ tiende a ser más alto cuando $X$ es más alto. No te dice, por sí sola, que cambiar $X$ cambiaría $Y$.
Esa brecha entre asociación y causa es la idea más importante de este capítulo, y una de las pocas que
una carrera entera con datos seguirá poniéndote a prueba.

:::{admonition} Definición 1.5: Asociación y causa
:class: note definition
Dos variables están en **asociación** cuando tienden a moverse juntas. Hay **causa** cuando intervenir
para cambiar una efectivamente cambia la otra. Una regresión ajustada a datos observados mide asociación,
que no tiene por qué ser causa.
:::

:::{admonition} Idea clave
:class: tip keyidea
La asociación no es causa. Una recta ajustada solo reporta que $Y$ y $X$ se mueven juntas en los datos
que tienes; no puede decirte que cambiar $X$ cambiaría $Y$. Leer un ajuste predictivo como una afirmación
causal es el error más común y más caro de la estadística aplicada, y ningún pulido del modelo lo arregla.
:::

La ilustración clásica no necesita ecuaciones. A lo largo del verano, las ventas de helado y los
ahogamientos suben y bajan juntos; su correlación es fuerte y real. Ninguna persona sensata concluye que
el helado causa los ahogamientos, o que prohibir el helado salvaría a los nadadores. Una tercera variable,
el clima caluroso, impulsa a ambos: el calor manda a la gente a comprar helado y, por separado, la manda
al agua donde unos cuantos se ahogan. La @fig-ch01-confounder-es dibuja la situación. El impulsor oculto
se llama una **variable de confusión** o **variable oculta** (Definición 1.6), y siempre que hay una
presente, la asociación entre $X$ y $Y$ puede ser grande mientras el efecto causal de $X$ sobre $Y$ es
cero.

:::{admonition} Definición 1.6: Variable de confusión (variable oculta)
:class: note definition
Una **variable de confusión**, también llamada **variable oculta**, es una variable que influye tanto en
el predictor como en la respuesta, creando entre ellos una asociación que no tiene por qué ser causal.
:::

```{figure} figures/fig_ch01_confounder.png
:name: fig-ch01-confounder-es
:alt: Un diagrama con una caja "clima caluroso (variable oculta Z)" arriba, flechas hacia abajo a dos cajas, "ventas de helado X" a la izquierda y "ahogamientos Y" a la derecha, y una flecha discontinua de doble punta entre X e Y etiquetada correlación fuerte pero sin flecha causal.
El clima caluroso (Z) causa tanto las ventas de helado (X) como los ahogamientos (Y), así que X e Y están fuertemente correlacionados aunque ninguno cause al otro. Una variable de confusión puede fabricar una asociación de la nada causal.
```

Esto es exactamente por qué el ejemplo salarial es difícil. Los hombres y las mujeres en los datos
difieren no solo en el sexo, sino en la mezcla de rangos, disciplinas y años de servicio, y todos esos
afectan el salario. El rango es una variable oculta para la brecha salarial cruda por sexo. Un análisis
responsable tiene que mantener fijas las variables de confusión antes de que la brecha restante pueda
leerse como algo sobre el sexo, e incluso entonces la lectura requiere cuidado. @ch11-es hace este
trabajo; @ch16-es hace del razonamiento sobre efectos directos e indirectos su tema entero.

Dos cosas te ayudan a combatir la confusión, y la diferencia entre ellas organiza buena parte de la
estadística.

Los **datos observacionales** (Definición 1.7) se recolectan observando el mundo tal como es. Galton no
asignó estaturas a los padres; los ingenieros de Toluca no fijaron los tamaños de lote para estudiarlos;
nadie eligió el sexo de los profesores. En los datos observacionales el predictor y las variables de
confusión vienen enredados juntos, y ninguna cantidad de ajuste ingenioso los desenreda por completo.
Puedes ajustar por las variables de confusión que pensaste medir, pero nunca por las que no.

Los **datos experimentales** se recolectan interviniendo. Si puedes *asignar aleatoriamente* el valor de
$X$, digamos lanzando una moneda para decidir el tratamiento de cada unidad, entonces en promedio los
grupos de tratamiento coinciden en cada variable de confusión, medida o no, porque la aleatorización los
equilibra. Por eso un experimento aleatorizado puede sostener una afirmación causal que los datos
observacionales no pueden. La @fig-ch01-obs-vs-exp-es muestra el único cambio estructural que marca la
diferencia. La mayoría de los datos que encontrarás después de este curso son observacionales, que es
precisamente por qué la distinción entre asociación y causa merece el machaque que recibe aquí.

```{figure} figures/fig_ch01_obs_vs_exp.png
:name: fig-ch01-obs-vs-exp-es
:alt: Dos diagramas uno al lado del otro. A la izquierda, etiquetado Observacional, una variable de confusión Z tiene flechas que apuntan hacia abajo tanto al predictor X como a la respuesta Y, y una flecha discontinua de doble punta entre X e Y está etiquetada enredado, ¿es X o Z? A la derecha, etiquetado Experimental, la flecha de Z a X está atenuada y tachada con una X roja etiquetada el lanzamiento de moneda corta esto, mientras una flecha sólida va de X a Y etiquetada limpio, solo X puede impulsar Y.
Los datos observacionales y experimentales difieren en una flecha. Cuando observas el mundo (izquierda), una variable de confusión Z alimenta tanto a X como a Y, así que su vínculo está enredado. Cuando asignas X al azar (derecha), el lanzamiento de moneda corta la flecha de Z hacia X, así que cualquier vínculo X-Y restante es causal.
```

:::{admonition} Definición 1.7: Datos observacionales y experimentales
:class: note definition
Los **datos observacionales** se recolectan observando el mundo sin intervenir, así que los predictores
y las variables de confusión vienen enredados juntos. Los **datos experimentales** se recolectan
interviniendo, en especial asignando aleatoriamente el valor del predictor, de modo que los grupos se
equilibran en promedio en todas las variables de confusión.
:::

Una disciplina más te protege tanto de la confusión como de la simple mala lectura: mira los datos antes
de confiar en un resumen de ellos. La @fig-ch01-anscombe-es muestra cuatro pequeños conjuntos de datos
construidos por el estadístico Frank Anscombe. Los cuatro tienen la misma media de $X$, la misma media
de $Y$, la misma correlación y la *misma* recta de regresión ajustada. En el papel son idénticos.
Graficados, no podrían ser más diferentes.

```{figure} figures/fig_ch01_anscombe.png
:name: fig-ch01-anscombe-es
:alt: Cuatro diagramas de dispersión en una cuadrícula de dos por dos, cada uno con la misma recta ajustada. El panel uno es una recta genuina con ruido, el panel dos es una curva suave, el panel tres es una recta ajustada con un valor atípico alto, y el panel cuatro tiene todos los puntos en un valor de x más un único punto muy a la derecha que fija la pendiente.
El cuarteto de Anscombe: cuatro conjuntos de datos con medias, varianzas, correlación y recta ajustada idénticas, y sin embargo cuatro formas distintas. Solo uno es una relación genuina de línea recta. Los números resumen no pueden distinguirlos, pero un gráfico de dos segundos sí.
```

:::{admonition} Ejemplo 1.4: El cuarteto de Anscombe
:class: note
**Pregunta.** ¿Cuatro conjuntos de datos pueden de verdad compartir todos los resúmenes estándar y aun
así tener formas completamente distintas?

**Intuición.** Calcula la media de $X$, la varianza de $X$, la media de $Y$, la correlación y la recta
ajustada para cada uno de los cuatro conjuntos, y comprueba si coinciden.

**Fórmula.** Para cada conjunto, las medias muestrales, la varianza muestral de $X$, la correlación $r$
y la recta de mínimos cuadrados $\hat{y} = b_0 + b_1 x$.

**Cálculo.**

```r
anscombe <- read.csv("data/anscombe.csv")
stats <- sapply(1:4, function(k) {
  x <- anscombe[[paste0("x", k)]]
  y <- anscombe[[paste0("y", k)]]
  f <- lm(y ~ x)
  c(mean_x = mean(x), var_x = var(x), mean_y = mean(y),
    cor_xy = cor(x, y), b0 = coef(f)[[1]], b1 = coef(f)[[2]])
})
colnames(stats) <- paste0("set", 1:4)
round(stats, 2)
```
```text
        set1  set2  set3  set4
mean_x  9.00  9.00  9.00  9.00
var_x  11.00 11.00 11.00 11.00
mean_y  7.50  7.50  7.50  7.50
cor_xy  0.82  0.82  0.82  0.82
b0      3.00  3.00  3.00  3.00
b1      0.50  0.50  0.50  0.50
```

```python
anscombe = pd.read_csv("data/anscombe.csv")
rows = {}
for k in range(1, 5):
    x = anscombe[f"x{k}"]; y = anscombe[f"y{k}"]
    f = smf.ols(f"y{k} ~ x{k}", data=anscombe).fit()
    rows[f"set{k}"] = [x.mean(), x.var(), y.mean(),
                       x.corr(y), f.params.iloc[0], f.params.iloc[1]]
tab = pd.DataFrame(rows, index=["mean_x", "var_x", "mean_y",
                                "cor_xy", "b0", "b1"])
print(tab.round(2))
```
```text
         set1   set2   set3   set4
mean_x   9.00   9.00   9.00   9.00
var_x   11.00  11.00  11.00  11.00
mean_y   7.50   7.50   7.50   7.50
cor_xy   0.82   0.82   0.82   0.82
b0       3.00   3.00   3.00   3.00
b1       0.50   0.50   0.50   0.50
```

**Interpretación.** Cada columna es idéntica: mismas medias, misma varianza, misma correlación de $0.82$,
misma recta ajustada $\hat{y} = 3.0 + 0.5x$. Sin embargo, la @fig-ch01-anscombe-es muestra una recta
honesta, una curva limpia que una recta no tiene por qué resumir, una recta descarrilada por un solo
valor atípico, y una donde un único punto lejano fija toda la pendiente. Los números son ciegos a todo
esto. Graficar no es decoración opcional; es una comprobación de seguridad que corres cada vez.
:::

::::{admonition} Inténtalo 1.3
:class: important
Un titular de noticias dice: "Los estudiantes que poseen más libros obtienen mejores puntajes en las
pruebas de lectura. Compre libros a su hijo para subir sus puntajes." Nombra una variable de confusión
plausible y explica cómo podría producir la asociación sin que comprar libros cause puntajes más altos.

:::{admonition} Solución
:class: dropdown
El ingreso familiar y la educación de los padres son variables de confusión plausibles. Los hogares más
ricos y con más educación tienden a poseer más libros *y* a apoyar la lectura de una docena de otras
maneras (tiempo de lectura en voz alta, espacio tranquilo de estudio, vocabulario en la mesa). Esos
hogares producirían lectores con mejores puntajes aunque el acto específico de comprar más libros no
hiciera nada. El conteo de libros es en parte un marcador del entorno del hogar, así que la asociación
es real mientras el consejo causal puede no valer nada. Solo un experimento (dar libros al azar a algunas
familias) o un ajuste cuidadoso por las variables de confusión podría separar los dos.
:::
::::

(ch01-history-es)=
## 1.5 Una breve historia, de Gauss al aprendizaje estadístico

La regresión no llegó de una sola vez. Creció a lo largo de dos siglos a medida que la gente seguía
necesitando extraer una señal de mediciones con ruido, y las herramientas que usamos hoy son la respuesta
acumulada. La @fig-ch01-timeline-es marca los hitos.

```{figure} figures/fig_ch01_timeline.png
:name: fig-ch01-timeline-es
:alt: Una línea de tiempo horizontal con siete eventos etiquetados: 1805 Legendre y Gauss mínimos cuadrados, 1886 Galton acuña regresión, 1896 Pearson correlación, 1925 Fisher ANOVA y verosimilitud y diseño de experimentos, 1972 Nelder y Wedderburn modelos lineales generalizados, 2010 el aprendizaje estadístico y el aprendizaje automático se vuelven de uso común, y 2023 la era de los LLM.
Dos siglos de regresión en siete pasos, desde los mínimos cuadrados para las órbitas planetarias hasta modelos que cualquiera puede ajustar ahora con una oración de código.
```

**Mínimos cuadrados (alrededor de 1805).** El método en el corazón de este libro se inventó para rastrear
el cielo. Adrien-Marie Legendre publicó la receta de mínimos cuadrados en 1805, y Carl Friedrich Gauss,
quien reclamó un uso anterior y aportó la teoría de probabilidad, la aplicó para predecir la órbita del
planeta enano Ceres a partir de un puñado de lecturas telescópicas con ruido. El problema era el mismo
que enfrenta la ingeniera de Toluca: muchas mediciones imperfectas, una recta subyacente, encontrar la
recta que mejor se ajusta. @ch02-es deriva su respuesta desde cero.

**La correlación y la palabra "regresión" (1886 a 1896).** Galton, estudiando la herencia, nos dio la
regresión a la media y las primeras rectas de regresión. Su colega más joven Karl Pearson convirtió las
ideas de Galton en el coeficiente de correlación, la medida estandarizada de asociación que cubre
@ch04-es, y construyó buena parte de la maquinaria de la estadística moderna a su alrededor.

**Fisher y el marco de la inferencia (décadas de 1920 y 1930).** Ronald Fisher, trabajando en experimentos
agrícolas, le dio a la regresión su columna inferencial: el análisis de varianza que divide la variación
en piezas con nombre (@ch03-es), la máxima verosimilitud como principio general para la estimación
(@ch02-es, @ch13-es), y la teoría de los experimentos aleatorizados que fundamenta el razonamiento causal
de la Sección 1.4. Buena parte de lo que un estadístico entiende por "significancia" se remonta a Fisher.

**Modelos lineales generalizados (1972).** Durante mucho tiempo la regresión significó una línea recta con
ruido normal de varianza constante. Pero muchas respuestas no son así: resultados de sí o no, conteos,
tasas. En 1972, John Nelder y Robert Wedderburn mostraron que la regresión lineal, la regresión logística
para datos binarios, la regresión de Poisson para conteos y varias otras son todas casos especiales de un
solo marco, el modelo lineal generalizado. @ch13-es y @ch14-es construyen dos de estos y @ch14-glm-es
muestra la idea unificadora.

**Aprendizaje estadístico y aprendizaje automático (de la década de 1990 a hoy).** A medida que las
computadoras se abarataron, la misma idea central, ajustar una regla que predice $Y$ a partir de $X$ y
comprobarla con honestidad en datos nuevos, se expandió hacia un campo obsesionado con la predicción:
validación cruzada, regularización, árboles y redes neuronales. La regresión es el cimiento sobre el que
se construye este campo, y las ideas de sobreajuste y validación que lo dominan aparecen en este curso en
@ch12-es. El capítulo más reciente de la historia es el que estás viviendo, y merece su propia sección.

(ch01-today-es)=
## 1.6 Dónde se ubica la regresión hoy

Sería fácil pensar que la regresión es una reliquia pintoresca al lado de la inteligencia artificial
moderna. Lo contrario es cierto: la regresión es en gran parte de lo que está hecha la IA moderna. La
@fig-ch01-ml-nesting-es muestra cómo se anidan las piezas.

```{figure} figures/fig_ch01_ml_nesting.png
:name: fig-ch01-ml-nesting-es
:alt: Cuatro cajas redondeadas anidadas. La más externa es el aprendizaje estadístico y la ciencia de datos, dentro de ella el aprendizaje supervisado, dentro de ese los modelos lineales generalizados, y en el centro la regresión lineal, etiquetada como mínimos cuadrados, el método que este curso enseña desde los cimientos.
La regresión lineal se ubica en el centro de un conjunto de campos anidados. Los modelos lineales generalizados la extienden a otras clases de respuesta; el aprendizaje automático supervisado la extiende a señales flexibles; y sigue siendo el último paso dentro de una red neuronal. Domina el centro y el resto tiene un lugar al que adherirse.
```

El aprendizaje automático supervisado, la rama de la IA que aprende a predecir una salida a partir de
entradas, es regresión con la señal $f(X)$ a la que se le permite ser mucho más flexible que una línea
recta. Una red neuronal dedica la mayor parte de su esfuerzo a transformar entradas crudas en
características útiles, pero su paso final es casi siempre una regresión lineal ordinaria o una regresión
logística sobre esas características: el mismo $b_0 + b_1 x_1 + \dots$ que ajustarás a mano en @ch02-es,
sentado dentro de la máquina. Los modelos grandes de lenguaje, los sistemas detrás de los asistentes de
IA modernos, se entrenan con una forma de este mismo juego de predicción jugado miles de millones de
veces. El vocabulario cambia ("funciones de pérdida", "descenso de gradiente", "incrustaciones"), pero
los mínimos cuadrados y la máxima verosimilitud, las dos ideas sobre las que se construye @ch02-es, están
por debajo.

Esto tiene una consecuencia aguda para lo que vale la pena aprender, y es la tesis de este curso. Ajustar
un modelo solía ser la parte difícil. Requería tablas, aritmética cuidadosa y una computadora central.
Ahora cualquiera puede ajustar una regresión, un bosque aleatorio o una red neuronal en una línea de
código, y un asistente de IA escribirá esa línea a pedido e incluso interpretará la salida por ti. La
habilidad escasa ya no es *ajustar* un modelo. Es *juzgarlo*: saber si el modelo es apropiado, si sus
supuestos se cumplen, si los datos pueden sostener la afirmación que se hace, si una variable de confusión
está oculta, si la predicción de aspecto seguro es en realidad una extrapolación fuera del borde de toda
experiencia, como lo fue la decisión del Challenger. Una máquina te dará una respuesta en segundos.
Decidir si confiar en ella es trabajo humano, y es el trabajo que este libro entrena.

:::{admonition} Habilidad duradera: Juzga un modelo que no ajustaste
:class: tip
Cada vez más, tu trabajo será evaluar un análisis que produjo otra persona, o alguna máquina. Las
preguntas son siempre las mismas, y puedes hacérselas a cualquier modelo, en cualquier campo, sin rehacer
el cálculo. ¿Cuál es la respuesta y cuáles son los predictores? ¿Son datos observacionales o
experimentales? ¿Qué tendría que ser cierto para que la conclusión se sostenga, y lo es? ¿Está la
predicción dentro del rango de los datos o más allá de su borde? ¿Se comprobó el modelo con datos con los
que no se ajustó? Cada tarea de este curso incluye un problema de "audita este análisis" exactamente por
esta razón. Ser la persona en la sala que puede decir con precisión por qué un resultado vistoso no
debería creerse es una forma duradera, y cada vez más rara, de experiencia.
:::

(ch01-tour-es)=
## 1.7 Un recorrido por el semestre

Aquí está el camino por delante. El libro enseña un proceso repetible, el flujo de trabajo de modelado
que @ch02-es nombra por completo (@ch02-workflow-es): **PREGUNTAR** una pregunta y obtener los datos,
**EXPLORAR** con gráficos y resúmenes, **AJUSTAR** un modelo, **COMPROBAR** si se puede confiar en él, y
**USARLO** para interpretar, predecir o decidir. Cada capítulo es un viaje alrededor de ese ciclo sobre
un conjunto de datos real. La @fig-ch01-workflow-es dibuja el ciclo para que puedas sostener el libro
entero en una imagen.

```{figure} figures/fig_ch01_workflow.png
:name: fig-ch01-workflow-es
:alt: Cinco cajas etiquetadas en una fila conectadas por flechas. PREGUNTAR, obtener los datos; EXPLORAR, gráficos y resúmenes; AJUSTAR, estimar el modelo; COMPROBAR, ¿podemos confiar en él?; USAR, interpretar, predecir, decidir. Una flecha curva roja discontinua regresa de COMPROBAR a EXPLORAR, etiquetada si la comprobación falla, vuelve atrás e inténtalo de nuevo.
El único flujo de trabajo que repite todo el curso: PREGUNTAR, EXPLORAR, AJUSTAR, COMPROBAR, USAR. La flecha discontinua es la parte honesta: cuando un modelo falla su comprobación, vuelves atrás e intentas de nuevo en lugar de empujar hacia adelante un modelo malo. Cada capítulo es un viaje alrededor de este ciclo.
```

Lo que sigue es la única pregunta que responde cada capítulo.

**Parte I: La regresión desde los cimientos.**

- **@ch02-es, Regresión lineal simple.** ¿Cuál es la única mejor recta a través de una nube de puntos, y
  podemos probar que ninguna otra recta la supera? Ajustarás la recta de Toluca a mano y probarás su
  optimalidad (@ch02-least-squares-es).
- **@ch03-es, Inferencia para la regresión lineal simple.** Presupuestaste unas $419$ horas para la
  corrida de 100 unidades de la próxima semana, pero ¿qué tan lejos podrías quedar? El capítulo separa un
  intervalo estrecho para la corrida *promedio* de un intervalo mucho más ancho para una *sola corrida
  nueva* (@ch03-prediction-interval-es), la distinción en la @fig-ch01-toluca-es que la mayoría de la
  gente entiende mal.
- **@ch04-es, Correlación.** ¿Cómo pones un número honesto a la fuerza de una relación, y cómo te miente
  ese número cuando los datos se curvan, cuando se cuela un valor atípico, o cuando la muestra es estrecha?
  Las estaturas de Galton y el vínculo correlación-pendiente vuelven aquí (@ch04-r-and-slope-es).
- **@ch05-es, Inferencia por aleatorización y bootstrap.** Con solo 13 pateadores, ¿una pendiente que ves
  es real o una casualidad de una muestra diminuta? Cuando los supuestos usuales son inestables, dejas que
  la computadora baraje y remuestree los datos para averiguarlo (@ch05-permutation-slope-es,
  @ch05-bootstrap-es).

**Parte II: El modelo lineal en forma matricial.**

- **@ch06-es, Álgebra matricial para la regresión.** ¿Cómo escribes una regresión con veinte predictores
  sin ahogarte en veinte ecuaciones? El álgebra matricial empaca todo el conjunto de datos en dos símbolos.
  No se supone álgebra lineal previa; el capítulo la construye desde nada.
- **@ch07-es, El modelo lineal general.** ¿Por qué funcionan los mínimos cuadrados para cualquier número
  de predictores a la vez, y cuál es la geometría elegante (una proyección) que se esconde debajo?
- **@ch08-es, Regresión múltiple en la práctica.** Cuando dos predictores se solapan, ¿qué significa
  siquiera un solo coeficiente? Aprenderás la lectura cuidadosa de "manteniendo los otros fijos" y la
  verás en una imagen con gráficos de variable añadida.

**Parte III: Construir y comprobar modelos.**

- **@ch09-es, Diagnóstico de modelos.** Un modelo puede explicar la mayor parte de la variación y aun así
  predecir un número negativo de especies. ¿Cómo atrapas un modelo que está mal en todas las formas que
  importan, y encuentras el único punto de alto apalancamiento que dirige en silencio todo el ajuste
  (@ch09-es)?
- **@ch10-es, Medidas correctivas y transformaciones.** Los pesos del cerebro y del cuerpo de 62 mamíferos
  se ven imposibles en un gráfico hasta que tomas logaritmos y el desorden se acomoda en una recta limpia.
  ¿Cuándo el problema es tu modelo, y cuándo es solo tu escala (@ch10-log-interpretation-es)?
- **@ch11-es, Predictores categóricos e interacciones.** De vuelta a la brecha salarial: una vez que
  mantienes fijos el rango, la disciplina y la experiencia, ¿cuánto queda de los $\$14{,}088$ crudos, y
  cómo pones siquiera una categoría como el rango en una regresión (@ch11-dummy-coding-es,
  @ch11-interactions-es)?
- **@ch12-es, Multicolinealidad, selección y validación.** Con trece medidas corporales enredadas
  prediciendo la grasa corporal, ¿cuáles conservas? ¿Y por qué un modelo elegido para ajustar tus datos
  siempre se verá mejor en esos datos de lo que merece (@ch12-cross-validation-es, @ch12-shrinkage-es)?

**Parte IV: Regresión para otras clases de respuesta.**

- **@ch13-es, Regresión logística.** De vuelta al transbordador: ¿cómo pones un número al riesgo de falla
  de los anillos a $31$ grados cuando el resultado no es una cantidad sino un sí o no
  (@ch13-logistic-model-es, @ch13-odds-ratio-es)?
- **@ch14-es, Regresión de Poisson y la idea del MLG.** Los conteos de especies no pueden ser negativos ni
  fraccionarios, y su dispersión crece con su tamaño. ¿Qué modelo respeta eso, y cómo son la regresión
  lineal, logística y de Poisson todas una sola idea (@ch14-poisson-model-es, @ch14-glm-es)?

**Parte V: Temas especiales (estudio autónomo guiado).**

- **@ch15-es, Regresión con el tiempo.** Doce años de pasajeros mensuales de aerolínea tienden al alza y
  ciclan cada verano. ¿Cómo pronosticas el año siguiente con honestidad, y por qué los errores ordenados
  en el tiempo rompen las fórmulas estándar (@ch15-forecasting-es)?
- **@ch16-es, Análisis de trayectorias y una mirada hacia adelante.** ¿Una ocupación gana prestigio porque
  paga bien o porque requiere estudios? El análisis de trayectorias usa cadenas de regresiones para dividir
  un efecto en rutas directas e indirectas (@ch16-path-diagrams-es), y el capítulo cierra recorriendo el
  flujo de trabajo completo una última vez.

::::{admonition} Inténtalo 1.4
:class: important
Para cada situación, nombra el único capítulo que abrirías primero.

1. Tu modelo ajustado tiene un $R^2$ hermoso, pero un colega dice que una ciudad está impulsando todo el resultado.
2. Tu resultado es si un préstamo entró en incumplimiento, codificado 0 o 1, y una línea recta da predicciones
   por debajo de 0 y por encima de 1.
3. Quieres reportar qué tan incierto es tu valor predicho para una observación completamente nueva.

:::{admonition} Solución
:class: dropdown
1. **@ch09-es (Diagnóstico de modelos)**, que cubre los puntos de alto apalancamiento y la influencia, las
herramientas para encontrar un solo punto que domina un ajuste.
2. **@ch13-es (Regresión logística)**, construida específicamente para resultados binarios 0/1 donde una
línea recta se porta mal.
3. **@ch03-es (Inferencia para la regresión lineal simple)**, que construye el intervalo de predicción para
una observación nueva.
:::
::::

(ch01-selfstudy-es)=
## 1.8 Cómo enseñarte a ti mismo con este libro

Este libro está escrito para que un estudiante que falta a clase pueda aprender un capítulo solo y aun así
hacer la tarea. Unos cuantos hábitos hacen que eso funcione.

**Lee en el orden en que está escrito el capítulo.** Cada sección de concepto va primero la intuición,
luego la fórmula, luego el mismo cálculo en R y en Python. La intuición es lo que hace que la fórmula se
fije, así que no te saltes a los símbolos. Lee la viñeta inicial antes que nada; es la verdadera pregunta
que el capítulo existe para responder.

**Corre el código tú mismo, en ambos lenguajes si puedes.** Cada ejemplo trabajado lee un CSV real de la
carpeta `data/` del libro y muestra salida real. Escríbelo, córrelo y cambia algo para ver qué pasa. R es
el lenguaje principal de este curso, pero Python aparece a su lado en cada ejemplo porque probablemente lo
usarás después de graduarte, y ver la misma idea dos veces la cementa.

**Haz cada Inténtalo a medida que llegas a él.** Cada uno es una tarea corta con una solución completa
oculta en un desplegable justo debajo. Inténtalo con honestidad antes de abrir la solución; el pequeño
esfuerzo es donde está el aprendizaje. Fíjate también en las cajas de **Habilidad duradera**: cada una
nombra un hábito que vale más que cualquier fórmula individual.

**Trabaja los problemas de práctica en orden.** Vienen en bandas. La Banda A comprueba que entendiste las
ideas; la Banda B (en capítulos posteriores) te pide derivar y probar; la Banda C te pide analizar datos
reales en R o Python. Las respuestas a los problemas impares están en el Apéndice H, así que puedes
calificarte. La promesa del libro es simple: un lector que hace cada Inténtalo y cada problema impar puede
resolver los problemas pares y los exámenes.

**Espera releer.** No tienes que entender algo la primera vez que lo ves. Relee la intuición, corre el
código, duérmete pensando en ello y regresa. La comprensión suele llegar en la segunda o tercera pasada.
Eso es normal, y no es señal de que estés atrasado.

Antes del primer ejemplo trabajado del Capítulo 2 necesitarás R y Python instalados y funcionando. Las
instrucciones completas de instalación, la lista de paquetes y una referencia función por función para
cada capítulo están en [Apéndice C (R)](../appendix/r-reference.md) y
[Apéndice D (Python)](../appendix/python-reference.md). Una ficha de datos para cada conjunto de datos del
libro, incluidos los que conociste en este capítulo, está en [Apéndice E](../appendix/datasets.md).

## 1.9 Resumen del capítulo

Ya tienes el mapa. La regresión estudia cómo una respuesta depende de uno o más predictores, y sirve a
tres metas distintas: describir una relación, predecir un resultado nuevo y razonar sobre la causa, en
orden creciente de dificultad. Viste de dónde vino la palabra en las estaturas de Galton y qué significa
la regresión a la media, tanto como una pendiente ajustada por debajo de uno como una trampa que disfraza
la estadística simple de una historia. Aprendiste la anatomía compartida por todo modelo del libro, una
señal sistemática más ruido aleatorio, y la diferencia entre un parámetro y su estimación. Viste por qué
la asociación no es causa, cómo una variable de confusión fabrica un vínculo falso, y cómo los datos
observacionales y experimentales difieren en lo que pueden probar. Ubicaste la regresión en su historia,
desde las órbitas de Gauss hasta la inferencia de Fisher, al modelo lineal generalizado, al aprendizaje
automático moderno, y viste por qué, ahora que cualquier modelo se puede ajustar en una línea, la
habilidad escasa es juzgar modelos en lugar de ajustarlos. Y tienes un recorrido por los quince capítulos
por delante.

**Resultados clave de un vistazo.**

| Resultado | Enunciado o fórmula | Válido cuando |
|---|---|---|
| Modelo estadístico (Definición 1.3) | $Y = f(X) + \varepsilon$: la respuesta es igual a la señal sistemática más el ruido aleatorio | todo modelo del libro |
| Regresión lineal simple | $f(X) = \beta_0 + \beta_1 X$; la media de $Y$ es una línea recta en $X$ | se toma la señal como una recta |
| Parámetro frente a estimación (Definición 1.4) | $\beta_0, \beta_1$ son la verdad desconocida; $b_0, b_1$ se calculan de los datos | siempre |
| Tres usos de la regresión | descripción (una pendiente), predicción (un $Y$ nuevo), razonamiento causal (una intervención) | la confianza decrece a lo largo de los tres |
| Regresión a la media | la recta de Galton $\widehat{\text{child}} = 22.6 + 0.64 \cdot \text{midparent}$; pendiente por debajo de 1 | dos mediciones correlacionadas de forma imperfecta |
| La asociación no es causa (Definición 1.5) | que $X$ e $Y$ se muevan juntos no tiene por qué significar que cambiar $X$ cambie $Y$ | cualquier dato observacional |
| Observacional frente a experimental (Definición 1.7) | la asignación aleatoria equilibra las variables de confusión en promedio | las afirmaciones causales necesitan un experimento o supuestos fuertes |

**Términos clave.** **regresión**, **respuesta**, **predictor**, **descripción**, **predicción**,
**razonamiento causal**, **regresión a la media**, **modelo estadístico**, **parte sistemática (señal)**,
**parte aleatoria (error)**, **parámetro**, **estimación**, **asociación**, **causa**, **variable de
confusión (variable oculta)**, **datos observacionales**, **datos experimentales**, **extrapolación**,
**modelo lineal generalizado**, **aprendizaje automático supervisado**, **flujo de trabajo de modelado**.

**Ahora deberías poder:**

- [ ] Decir qué es la regresión y distinguir sus tres usos: describir una relación, predecir un resultado nuevo y razonar sobre la causa.
- [ ] Explicar de dónde vino la palabra "regresión" en las estaturas de Galton y qué significa la regresión a la media, como una pendiente por debajo de uno y como una trampa.
- [ ] Nombrar las partes de un modelo estadístico: la señal sistemática, el ruido aleatorio, los parámetros y sus estimaciones.
- [ ] Distinguir la asociación de la causa, y los datos observacionales de los experimentales, y decir por qué importa la diferencia.
- [ ] Ubicar la regresión dentro de la estadística, el aprendizaje automático y la ciencia de datos, y explicar por qué juzgar un modelo importa ahora más que ajustarlo.
- [ ] Nombrar la pregunta que responde cada capítulo del semestre.
- [ ] Configurar R y Python y usar este libro para aprender por tu cuenta.

**Dónde encaja esto.** Este capítulo es la etapa PREGUNTAR de todo el curso: enmarca las preguntas y la
forma de pensar, y adelanta el flujo de trabajo que @ch02-workflow-es nombrará por completo. Todo de aquí
en adelante agrega herramientas. @ch02-es convierte la idea suelta de una "mejor recta" en una receta
precisa y demostrable sobre los datos de Toluca (@ch02-least-squares-es), y la maquinaria solo crece desde
ahí. No necesitarás haber memorizado nada de este capítulo, pero si la diferencia entre descripción y
predicción, entre asociación y causa, y entre un parámetro y una estimación te queda clara, el resto del
libro se sentirá menos como una pila de fórmulas y más como una sola idea, extendida con cuidado.

## 1.10 Preguntas frecuentes

**P1. ¿Es "regresión" lo mismo que "recta de mejor ajuste"?** Para la mayor parte de este libro, sí: la
parte sistemática es una línea recta y la regresión encuentra la mejor. Pero la palabra es más amplia. La
regresión logística (@ch13-es) y la regresión de Poisson (@ch14-es) ajustan reglas curvas para respuestas
no continuas, y en el aprendizaje automático la señal ajustada puede ser muy flexible. Lo que las une a
todas es la forma $Y = f(X) + \varepsilon$: estimar una parte sistemática, describir el ruido.

**P2. Si la regresión solo muestra asociación, ¿por qué se usa para discutir sobre causas todo el tiempo?**
Porque con los datos correctos (idealmente un experimento aleatorizado) o los supuestos correctos
(ajustando por las variables de confusión que puedes medir y defendiendo que has capturado las
importantes), una asociación puede sostener una afirmación causal cuidadosa. El punto de la Sección 1.4 no
es que la regresión nunca pueda hablar de la causa; es que lo hace solo con trabajo extra y honestidad
extra, nunca de forma automática. @ch11-es y @ch16-es muestran cómo se ve ese trabajo.

**P3. ¿Por qué enseñar esto cuando una IA puede ajustar cualquier modelo en una línea?** Precisamente
porque puede. Cuando ajustar es gratis, el valor se traslada al juicio: elegir el modelo correcto,
comprobar sus supuestos, detectar la variable de confusión, atrapar la extrapolación y saber cuándo la
salida segura está equivocada. Esas son las habilidades que este curso califica, y son las habilidades que
te hacen útil al lado de una máquina en lugar de reemplazable por una.

**P4. ¿De verdad necesito tanto R como Python?** R es obligatorio (es el lenguaje principal del curso y un
requisito del catálogo), y cada ejemplo está en R. Python corre junto a él porque es lo que usa buena
parte de la industria, y ver el análisis idéntico en dos lenguajes hace que el concepto, y no la sintaxis,
sea lo que recuerdas. Si vas apretado de tiempo, sigue R de cerca y trata a Python como un extra, pero sí
instala ambos.

**P5. No he tomado álgebra lineal. ¿Aún puedo hacer este curso?** Sí. El Capítulo 6 construye cada pieza de
álgebra matricial que usa el libro, desde la definición de una matriz hacia arriba, atada en cada paso a un
uso de regresión. Los capítulos 2 al 5 no usan matrices en absoluto. Si has tomado álgebra lineal, el
Capítulo 6 se leerá como un repaso; si no, está escrito para enseñarte.

**P6. ¿Cuál es la diferencia entre el error $\varepsilon$ y el residuo?** El error $\varepsilon$ es la
brecha entre una observación y la recta *verdadera*, que nunca vemos porque nunca conocemos los parámetros
verdaderos. El residuo es la brecha entre una observación y nuestra recta *ajustada*, que sí podemos
calcular. Los residuos son nuestras estimaciones visibles de los errores invisibles, y el Capítulo 2 hace
precisa la distinción. Importa porque usamos los residuos para estimar el tamaño del ruido.

**P7. ¿Es la regresión a la media lo mismo que "las cosas siempre se emparejan"?** No, y este es un enredo
común. La regresión a la media trata de que *a los extremos les siguen valores menos extremos*, porque los
extremos suelen ser en parte habilidad y en parte suerte, y la suerte no se repite. No dice que la próxima
medición de una persona alta será promedio, ni que a un buen equipo le toca una derrota. Es un enunciado
sobre el promedio de un grupo seleccionado por ser extremo, nada más.

## 1.11 Problemas de práctica

:::{note}
El libro ordena los problemas de práctica en tres bandas: (A) conceptos, (B) teoría (derivaciones y
pruebas) y (C) análisis de datos en R o Python. Este capítulo inicial es un mapa panorámico sin
derivaciones propias, así que lleva solo problemas de Banda A y Banda C; la Banda B empieza en el Capítulo
2, donde aparecen las primeras pruebas, y crece desde ahí. Las respuestas impares aparecen en el Apéndice
H; las soluciones completas están en los materiales del instructor.
:::

1. (A) En tus propias palabras, ¿qué hace la regresión? Responde en dos oraciones, usando las palabras "respuesta" y "predictor".
2. (A) Nombra los tres usos de la regresión discutidos en la Sección 1.1, y da un ejemplo de una línea de cada uno que no esté en el capítulo.
3. (A) Para cada pregunta, di si es descripción, predicción o razonamiento causal: (a) "¿Cuánto sube la presión arterial promedio por año de edad en esta clínica?" (b) "Si subimos el precio un dólar, ¿cuántas unidades menos venderemos?" (c) "¿Qué ventas debemos esperar el próximo trimestre dado nuestro presupuesto de anuncios?"
4. (A) Explica la diferencia entre un parámetro ($\beta_1$) y una estimación ($b_1$) en una o dos oraciones. ¿Por qué nunca podemos conocer $\beta_1$ exactamente?
5. (A) Escribe la anatomía general de un modelo estadístico, $Y = f(X) + \varepsilon$, y explica en palabras simples qué representa cada una de las dos piezas.
6. (A) Un compañero dice que el término de error $\varepsilon$ significa que el modelo cometió un error y que un mejor modelo lo eliminaría. Corrige el malentendido.
7. (A) Explica la "regresión a la media" en tus propias palabras, y da un ejemplo cotidiano distinto de las estaturas o los deportes.
8. (A) La pendiente ajustada de Galton del hijo sobre la estatura media de los padres es de aproximadamente $0.64$. ¿Qué habría significado una pendiente de exactamente $1$? ¿Qué habría significado una pendiente de $0$?
9. (A) ¿Por qué una diferencia cruda en el salario promedio entre dos grupos no es, por sí sola, evidencia de un pago desigual? Nombra una variable de confusión y explica su función.
10. (A) Define "variable de confusión" y dibuja (en palabras o en un boceto) el diagrama del helado y los ahogamientos, etiquetando las flechas causales.
11. (A) Explica la diferencia entre datos observacionales y experimentales, y por qué la asignación aleatoria ayuda a establecer la causa.
12. (A) Los cuatro conjuntos de datos de Anscombe comparten la misma media, varianza, correlación y recta ajustada. ¿Cuál es la única lección que Anscombe quería que sacaras de esto, y qué acción de una palabra recomienda antes de confiar en cualquier resumen?
13. (A) Da un ejemplo de una correlación fuerte entre dos variables que estés seguro de que no es causal, y nombra la variable oculta probable.
14. (A) En una oración cada uno, enuncia para qué se inventó originalmente el método de mínimos cuadrados (hacia 1805) y quién le dio a la "regresión" su nombre.
15. (A) El capítulo afirma que la regresión es "el núcleo sobre el que se construye el aprendizaje automático moderno". Explica qué tiene que ver el paso final de una red neuronal con la regresión de este curso.
16. (A) Enuncia la tesis del curso sobre la era de la IA en tus propias palabras: ¿qué habilidad se ha vuelto escasa, y por qué?
17. (A) Te entregan una predicción de aspecto seguro de un asistente de IA. Enumera cuatro preguntas que harías antes de confiar en ella (apóyate en la caja "Juzga un modelo que no ajustaste").
18. (A) ¿Por qué el ejemplo del Challenger ilustra el peligro de la extrapolación? ¿Qué tenía de especial el lanzamiento a $31$ grados respecto de los datos?
19. (A) Nombra las cinco etapas del flujo de trabajo de modelado en orden, y da una descripción de una frase de cada una.
20. (A) Para cada pregunta de capítulo de abajo, nombra el capítulo (2 al 16) que la responde: (a) cuáles de trece medidas corporales enredadas conservar; (b) si una pendiente de solo trece pateadores es real; (c) cómo pronosticar la demanda mensual de aerolínea del próximo año.
21. (A) Explica la diferencia entre el intervalo de confianza para una respuesta media y el intervalo de predicción para una observación nueva, usando la @fig-ch01-toluca-es como referencia. ¿Cuál es más ancho, y por qué?
22. (A) Un titular dice "las personas que beben vino tinto viven más, así que bebe vino tinto". Identifica la afirmación causal, nombra una variable de confusión plausible, y di qué tipo de estudio se necesitaría para sostener el consejo.
23. (A) ¿Por qué este libro muestra cada ejemplo tanto en R como en Python? Da dos razones distintas de la Sección 1.8.
24. (A) Explica el "bajón del segundo año" (Inténtalo 1.2) como regresión a la media, y predice qué verías si en cambio siguieras a los *peores* novatos en su segundo año.
25. (C) Lee `galton_heights.csv` en R o Python. Ajusta la recta que predice `childHeight` a partir de `midparentHeight`, reporta la pendiente y confirma que está por debajo de 1. En una oración, conecta el número con la regresión a la media.
26. (C) Usando `galton_heights.csv`, predice la estatura del hijo para una estatura media de los padres de 66 pulgadas y de 72 pulgadas. Confirma que la predicción más alta está más cerca de la estatura media general del hijo (unas $66.7$ pulgadas) que 72, ilustrando el tirón hacia el centro.
27. (C) Lee `anscombe.csv` y reproduce la tabla resumen del Ejemplo 1.4 para los cuatro pares x-y (medias, varianza de x, correlación y recta ajustada). Luego haz los cuatro diagramas de dispersión. ¿Cuál de los cuatro es una relación genuina de línea recta, y cuál tiene su pendiente fijada por un solo punto?
28. (C) Lee `orings.csv`. Reporta el número de vuelos, la temperatura de lanzamiento más fría en los datos y el número total de incidentes de daño. Explica por qué predecir el riesgo de daño a $31$ grados es una extrapolación, refiriéndote a la temperatura más fría que encontraste.

## 1.12 Práctica de examen

Los problemas de arriba comprueban que puedes recordar y aplicar las ideas. Los exámenes piden algo más
difícil: explicar tu razonamiento en oraciones completas, juzgar una afirmación que hizo otra persona, y
leer salida de software real en contexto. Las cinco preguntas de aquí están escritas en ese estilo de
examen. Cada una quiere prosa, no una palabra o un número aislado. Intenta una respuesta escrita completa
antes de abrir la respuesta modelo, y compara no solo la conclusión sino el razonamiento. Un evaluador da
la calificación completa por el razonamiento.

**PE 1.1. Una recta, tres pedidos.** Una analista de marketing ajusta una sola recta de mínimos cuadrados
de las ventas mensuales (en miles de dólares) sobre el gasto mensual en publicidad (también en miles).
Luego usa esa única recta para tres pedidos. Le dice al equipo de finanzas que cada mil dólares extra de
publicidad va con unos cuatro mil dólares más en ventas. Pronostica las ventas del próximo mes a partir
del presupuesto ya aprobado para el próximo mes. Y le aconseja al director general que subir el presupuesto
de anuncios en diez mil dólares subirá las ventas en unos cuarenta mil dólares. Explica por qué la misma
recta ajustada puede servir a los tres pedidos, y sin embargo la confianza a la que la analista tiene
derecho no es la misma para cada uno. Ordena los tres pedidos de más a menos confiable y defiende el orden.

:::{admonition} Respuesta modelo
:class: dropdown
Los tres pedidos leen de la misma regla ajustada, $\hat{Y} = b_0 + b_1 X$: el primero reporta su pendiente,
el segundo introduce un nuevo valor de $X$ en ella, y el tercero pregunta qué haría mover $X$. Una recta
puede responder los tres porque la descripción, la predicción y el razonamiento causal son tres preguntas
que puedes hacerle a un solo ajuste, no tres ajustes distintos.

La confianza difiere porque cada pedido le exige más a los datos que el anterior. Reportar la pendiente es
**descripción**: solo resume el patrón que ya está en los datos, así que es el más confiable de los tres.
Pronosticar las ventas del próximo mes es **predicción**: supone que el mismo patrón sigue manteniéndose
para un mes nuevo, y es seguro solo si el presupuesto del próximo mes cae dentro del rango de presupuestos
con los que se ajustó la recta, en lugar de ser una extrapolación más allá de ellos. Aconsejar al director
general que más gasto causará más ventas es **razonamiento causal**, y es el menos confiable, porque la
recta mide asociación, no causa. Si alguna tercera variable, digamos la temporada, impulsa juntos el gasto
en anuncios y las ventas, entonces subir el presupuesto no tiene por qué subir las ventas en absoluto,
aunque la recta se incline hacia arriba. Así que el orden, de más a menos confiable, es descripción, luego
predicción, luego razonamiento causal.

Una respuesta débil nombra los tres usos pero no conecta la confianza decreciente con el supuesto extra que
agrega cada uno: la estabilidad del patrón (y quedarse dentro del rango de los datos) para la predicción, y
la ausencia de una variable de confusión para la afirmación causal.
:::

**PE 1.2. Una afirmación sobre la regresión a la media.** Un estudiante escribe: "La regresión a la media
prueba que los extremos desaparecen con el tiempo. Así que un padre muy alto debería esperar un hijo de
estatura cerca del promedio, y un equipo que acaba de ganar el campeonato le toca una temporada perdedora
el año siguiente." Evalúa la afirmación. Enuncia con precisión qué afirma y qué no afirma la regresión a la
media, y corrige los dos errores específicos.

:::{admonition} Respuesta modelo
:class: dropdown
La afirmación parte de una observación verdadera, que los casos seleccionados por ser extremos en una
medición tienden a ser menos extremos en una segunda, pero saca de ella dos conclusiones equivocadas.

El primer error es el tamaño del tirón. La regresión a la media no arrastra la segunda medición todo el
camino de vuelta al promedio; predice un valor que es menos extremo que el primero pero por lo general aún
del mismo lado del promedio. La pendiente ajustada de Galton de aproximadamente $0.64$ dice que se predice
que el hijo de un padre muy alto será alto, solo unos dos tercios de lo lejos por encima del promedio que
su padre, no promedio. Esperar "cerca del promedio" confunde una pendiente por debajo de uno con una
pendiente de cero.

El segundo error es tratar un enunciado sobre grupos como un hecho sobre casos individuales y sobre el
futuro. La regresión a la media describe el promedio de un grupo seleccionado por ser extremo, y funciona
porque un valor extremo suele ser en parte habilidad y en parte suerte, y la suerte no se repite. La
habilidad sí se traslada. Se espera que un equipo campeón se mantenga por encima del promedio el año
siguiente, solo que menos extremo, así que no le "toca" una temporada perdedora; creer que a un buen equipo
el mundo le debe un mal año es la falacia del jugador, no la regresión a la media.

Una respuesta débil nombra correctamente la regresión a la media pero no capta que el valor predicho se
queda del lado extremo del promedio (una pendiente por debajo de uno, no cero), y no separa la suerte que
no se repite de la habilidad que sí.
:::

**PE 1.3. Interpretar una recta ajustada en contexto.** Los datos de Galton sobre $934$ hijos se usan para
ajustar la estatura del hijo (pulgadas) sobre la estatura media de los padres (pulgadas). Aquí está la
salida de R, luego los coeficientes de Python, luego las estaturas predichas del hijo en tres estaturas
medias de los padres. La estatura media del hijo en los datos es de $66.75$ pulgadas.

```text
Coefficients:
                Estimate Std. Error t value Pr(>|t|)
(Intercept)     22.63624    4.26511   5.307 1.39e-07 ***
midparentHeight  0.63736    0.06161  10.345  < 2e-16 ***
---
Residual standard error: 3.392 on 932 degrees of freedom
Multiple R-squared:  0.103,	Adjusted R-squared:  0.102
```

```text
Intercept          22.636241
midparentHeight     0.637361

predicted child height at midparent = 64, 68, 72:
   63.42734   65.97678   68.52623
```

**(a)** Interpreta la pendiente $0.637$ en las unidades de este problema. **(b)** Explica por qué *no*
deberías leer el intercepto $22.64$ como "se predice que un hijo cuyos padres promedian cero pulgadas mide
$22.64$ pulgadas". **(c)** Usando los tres valores predichos y la estatura media del hijo de $66.75$
pulgadas, explica cómo las predicciones en estaturas medias de los padres de $64$ y $72$ pulgadas ilustran
la regresión a la media. **(d)** Un compañero dice que el bajo $R^2$ de $0.103$ significa que la regresión
está mal y debería descartarse. Responde.

:::{admonition} Respuesta modelo
:class: dropdown
**(a)** Cada pulgada adicional de estatura media de los padres va con unas $0.637$ de pulgada más de
estatura del hijo, en promedio. La relación es positiva pero poco inclinada: los padres más altos sí tienen
hijos más altos, pero el aumento está muy por debajo de una pulgada por pulgada de los padres.

**(b)** Una estatura media de los padres de cero no está cerca de los datos, que se ubican alrededor de $64$
a $72$ pulgadas, así que el intercepto no es una predicción real para nadie. Es solo el número que fija la
recta a la altura correcta sobre el rango que efectivamente se observó. Leerlo como una predicción en cero
es extrapolar mucho más allá de todo dato, donde la relación de línea recta nunca se comprobó.

**(c)** Una estatura media de los padres de $64$ pulgadas está por debajo del padre promedio, y el modelo
predice un hijo de $63.43$ pulgadas, que está por debajo de la estatura media del hijo de $66.75$ pero más
cerca de ella que $64$. Una estatura media de los padres de $72$ pulgadas está muy por encima del promedio,
y el modelo predice $68.53$ pulgadas, por encima de la estatura media del hijo pero más cerca de ella que
$72$. En ambas direcciones el hijo predicho es jalado hacia el centro respecto de los padres. Ese tirón,
producido por una pendiente por debajo de uno, es exactamente la regresión a la media.

**(d)** Un $R^2$ bajo no significa que el modelo esté mal. Significa que la estatura media de los padres
explica solo un $10$ por ciento de la variación en la estatura del hijo, lo cual es honesto: la estatura
tiene muchas causas más allá del promedio de los padres, así que la mayor parte de la dispersión queda sin
explicar. La pendiente sigue siendo real y muy significativa (su valor $t$ es mayor que diez). Si conviene
conservar el modelo depende de la pregunta. Para describir cómo la estatura del hijo sigue a la de los
padres está bien; para predecir la estatura de un hijo con precisión es débil, y el gran error estándar
residual de $3.39$ pulgadas lo dice.

Una respuesta débil lee el intercepto como una predicción literal, o trata el $R^2$ bajo como prueba de que
el ajuste está roto, y pasa por alto que el $R^2$ mide la variación explicada, no la corrección.
:::

**PE 1.4. La brecha salarial: qué cambiaría si.** Los datos del decano muestran que los hombres ganan unos
$\$14{,}088$ más al año que las mujeres, en promedio. Un miembro del consejo lee esta brecha cruda como
prueba de que la universidad paga de menos a las mujeres. Para cada cambio de abajo, di qué le haría a la
fuerza de una lectura *causal* de la brecha, y por qué. **(a)** La analista reajusta manteniendo fijos el
rango, la disciplina y los años de servicio, y la brecha se encoge a una cantidad pequeña. **(b)** Incluso
después de ese ajuste, alguna variable que nadie midió (digamos, ofertas de trabajo externas específicas
del campo) todavía difiere entre los dos grupos. **(c)** Imagina, hipotéticamente, que el sexo se hubiera
podido asignar aleatoriamente al profesorado. Cierra con una oración sobre por qué los datos salariales
observacionales rara vez pueden resolver por sí solos la pregunta causal.

:::{admonition} Respuesta modelo
:class: dropdown
**(a)** El rango, la disciplina y los años de servicio afectan todos el salario y pueden estar distribuidos
de forma distinta entre los grupos, así que son variables de confusión para la brecha cruda. Mantenerlos
fijos elimina la parte de los $\$14{,}088$ que en realidad era una diferencia de rango o de experiencia. Si
la brecha se encoge a una cantidad pequeña, la mayor parte de la diferencia cruda era confusión, y la
brecha restante más pequeña es una estimación mejor, aunque todavía imperfecta, de cualquier efecto
verdadero de pago desigual.

**(b)** Cualquier variable de confusión que no puedas medir sigue enredada en la comparación, porque solo
puedes ajustar por las variables que tienes. Así que incluso la brecha ajustada puede estar sesgada en
cualquier dirección por la diferencia no medida en ofertas externas, y sigue sin ser prueba de un pago
insuficiente. El ajuste refuerza el caso solo para las variables de confusión que efectivamente atrapaste.

**(c)** La asignación aleatoria equilibraría cada variable de confusión, medida o no, entre los grupos en
promedio, así que una brecha que quedara después de la aleatorización podría leerse como causal. Pero el
sexo no se puede asignar con un lanzamiento de moneda, que es precisamente por qué esta pregunta causal es
difícil y por qué ninguna cantidad de ajuste sustituye por completo a un experimento.

Como los datos salariales observacionales siempre dejan sin controlar alguna variable de confusión no
medida, pueden establecer que los grupos difieren en el pago, una asociación, pero rara vez que un trato
desigual causó la diferencia por sí solo.

Una respuesta débil trata la brecha ajustada como prueba total o refutación total de la discriminación, y
pasa por alto que las variables de confusión no medidas sobreviven al ajuste y que solo la aleatorización
las equilibra todas.
:::

**PE 1.5. El lanzamiento del Challenger: leer una figura.** Consulta la @fig-ch01-orings-es, los $23$
vuelos del transbordador anteriores al Challenger. Todo vuelo registrado se lanzó a $53$ grados Fahrenheit
o más cálido, y el lanzamiento en discusión se pronosticó a unos $31$ grados. **(a)** Usando la figura,
explica en contexto por qué pronosticar el daño de los anillos a $31$ grados es una extrapolación, y por
qué eso hace poco confiable la predicción incluso cuando una curva ajustada reporta un número de aspecto
seguro. **(b)** ¿Qué cambiaría sobre la confiabilidad de la predicción a $31$ grados si el vuelo anterior
más frío hubiera sido a $30$ grados en lugar de $53$? **(c)** Un gerente dice: "La recta ajustada ya da una
estimación de daño a $31$ grados, así que hemos tenido en cuenta el frío." Evalúa esa afirmación.

:::{admonition} Respuesta modelo
:class: dropdown
**(a)** En la figura cada punto está a $53$ grados o más cálido, así que $31$ grados queda muy a la
izquierda de todos los datos. La relación entre la temperatura y el daño solo se observó alguna vez sobre
el rango cálido, y la forma de cualquier curva por debajo de $53$ grados es un supuesto que los datos no
pueden comprobar. Un modelo aún devolverá un número a $31$ grados, y su intervalo puede incluso verse
estrecho, pero esa estrechez refleja solo la incertidumbre de la recta ajustada sobre el rango observado,
no la incertidumbre real y mucho mayor sobre una temperatura que ningún vuelo vio jamás. Eso es lo que hace
poco confiable una predicción extrapolada.

**(b)** Si un vuelo se hubiera lanzado cerca de $30$ grados, entonces $31$ grados caería *dentro* del rango
observado, haciendo de la predicción una interpolación en lugar de una extrapolación. Los datos hablarían
entonces directamente de cómo se comportan los anillos en el frío, y la predicción a $31$ grados sería
mucho más confiable, porque el patrón se habría probado cerca de esa temperatura en lugar de suponerse.

**(c)** Ajustar una recta no "tiene en cuenta" una temperatura que nunca se observó. La recta solo resume
los vuelos a $53$ grados y más cálidos, así que leerla a $31$ grados extiende ese resumen más allá del
borde de toda experiencia. Tener una ecuación en la cual introducir el número da una falsa sensación de
seguridad; el frío no se tuvo en cuenta, se supuso inexistente.

Una respuesta débil dice que la predicción es meramente incierta sin identificar que $31$ grados queda
fuera del rango de los datos, o cree que una vez que existe una ecuación cualquier valor de entrada es
seguro de introducir.
:::

## Juego del capítulo

:::{admonition} Juega el juego del Capítulo 1
:class: tip
Juega el juego del Capítulo 1 en tu teléfono o computadora portátil: 10 rondas rápidas, sin preparación.
[Abrir el juego](../games/ch01.html). Ejercita las ideas de trabajo de este capítulo: clasificar una
pregunta como descripción, predicción o razonamiento causal; leer la pendiente por debajo de uno de Galton
como regresión a la media; emparejar las partes de $Y = f(X) + \varepsilon$; ajustar y diagnosticar los
datos reales de Anscombe; ordenar el flujo de trabajo PREGUNTAR, EXPLORAR, AJUSTAR, COMPROBAR, USAR; y
detectar la variable de confusión y la extrapolación, con la razón mostrada después de cada respuesta.
:::

:::{admonition} Chapter summary (in English)
:class: dropdown
This chapter is a panoramic map of **regression**, the tool that studies how a **response** $Y$ depends on
one or more **predictors** $X$. It opens with three real problems: estimating work hours from lot size at
the Toluca Company, deciding whether to launch the space shuttle Challenger from O-ring damage and
temperature, and weighing a salary gap of about $\$14{,}088$ between men and women. All three are the same
kind of question.

Regression serves three goals of rising difficulty: **describe** a relationship through a slope,
**predict** a new value, and **reason about cause**, the hardest, because a fit measures association, not
cause. The word "regression" comes from Francis Galton, who noticed that the children of very tall parents
are tall but less so than their parents: **regression to the mean**. The fitted slope of child height on
mid-parent height is about $0.64$, clearly below $1$.

Every model in the book shares the same anatomy, $Y = f(X) + \varepsilon$: a systematic part (the signal
that $X$ explains) plus a random part (the noise). We distinguish a **parameter** $\beta_1$, the unknown
truth, from its **estimate** $b_1$, what we compute. **Association is not causation**: a **confounder**
such as hot weather can create a strong correlation between ice-cream sales and drownings with no causal
link. **Experimental** data with random assignment can support a causal claim; **observational** data
cannot. Anscombe's quartet is a reminder that you must always plot the data.

A short history runs from the least squares of Gauss and Legendre (around 1805) to Fisher, to the
generalized linear model (1972), and to today's machine learning. The course thesis: now that any model
can be fit in one line of code, the scarce skill is **judging** models, not fitting them. The chapter
closes with a tour of the fifteen chapters ahead and advice for teaching yourself.
:::
