---
title: "4. Correlation"
subtitle: "MATH 4210, Chapter 4"
---

(ch04)=
# 4. Correlation

:::{admonition} Espanol
:class: tip
Esta leccion esta disponible en espanol: [Leer en espanol](./es.md)
:::

Why do some countries save a large share of their income while others save almost
nothing? In the 1960s economists studying the life-cycle theory of saving collected
a small cross-country table to look for an answer. For 50 countries they recorded the
aggregate personal savings rate, averaged over 1960 to 1970. Alongside it they noted a
few features of each economy: the fraction of the population under 15, the fraction over
75, per-capita income, and how fast that income was growing. The life-cycle idea predicts
that people save during their working years and draw the savings down when young or
old, so a country with many dependents, young or old, should save less.

@fig-ch04-savings-scatter shows the first slice of that table: the savings rate against
the share of the population under 15. The cloud slopes downward. Countries with more
children do tend to save less, just as the theory says. But how strong is that
tendency? "Slopes downward" is a picture, not a number, and a picture cannot go into a
report or a comparison. We want a single number that measures how tightly two
quantities move together, one that does not depend on whether savings is in percent or
income in dollars, and one we can attach a margin of error to.

```{figure} figures/fig_ch04_savings_scatter.png
:name: fig-ch04-savings-scatter
:alt: Scatterplot of aggregate savings rate against the percent of population under 15 for 50 countries, with a downward-sloping least-squares line. Countries with a low share under 15 (around 25 percent) mostly save 10 to 17 percent, while countries with a high share (around 45 percent) scatter widely from near 0 to about 18 percent. The line falls from about 13 percent savings down to about 7 percent across the range.
The savings rate falls as the share of young dependents rises, but the scatter is wide: the downward drift is real and the spread around it is large. A correlation of -0.46 puts one number on both facts at once.
```

That number is the **correlation coefficient** (defined formally in Definition 4.1), and
this chapter is about reading it honestly. In Chapters 2 and 3 we built an entire line and tested every part of it, from
the slope to the prediction interval; correlation asks a smaller and more symmetric
question, how tightly two quantities move together, and Section 4.2 will show it is that
same fit seen through a single number. Correlation is the workhorse summary of a
straight-line relationship: it compresses a whole scatterplot into one value between -1
and +1. It is also one of the
most abused numbers in all of statistics, blamed for causal claims it never made,
inflated by outliers, hidden by curves, and shrunk by a badly chosen sample. By the end
you will be able to compute it, test it, interval it, and, just as important, say when
it is lying to you.

:::{admonition} This lesson at a glance
:class: important
- **What we are doing:** Measuring straight-line association with the correlation coefficient on the cross-country savings data, testing and interval-ing it, and learning the traps that make it lie.
- **Why we are doing it:** A slope carries the units of the problem and cannot be compared across variable pairs; we want one dimensionless number between $-1$ and $+1$ for how tightly two quantities move together.
- **Main objective:** Compute, test, and interval the Pearson (and Spearman) correlation, connect $r$ to the slope $b_1$ and to $R^2$, and diagnose nonlinearity, outliers, restriction of range, and ecological correlation.
- **What changed from the last chapters:** Chapters 2 and 3 modeled $Y$ on $X$ asymmetrically with a fitted line; here the relationship is symmetric and unit-free. Correlation is an EXPLORE-stage tool (@ch02-workflow) that comes before fitting, built on the same least-squares line (@ch02-least-squares).
:::

:::{admonition} Learning objectives
:class: tip
By the end of this chapter you will be able to:
- **Compute** the Pearson correlation $r$ by hand and with software, and read it as a standardized covariance that is free of units.
- **Derive** the exact algebraic identity linking $r$ to the regression slope $b_1$, and show that $r^2$ equals the coefficient of determination $R^2$.
- **Test** the hypothesis $\rho = 0$ with the $t$ test, and **build** a confidence interval for $\rho$ using Fisher's $z$ transformation, checking the transformation by simulation.
- **State** the bivariate normal model and explain what $\rho$ means inside it, including the population regression line it hides.
- **Compute** the Spearman rank correlation and **decide** when ranks are safer than raw values.
- **Diagnose** the classic correlation traps: nonlinearity, outliers, restriction of range, and ecological correlation.
- **Explain** regression to the mean and why a correlation, however strong, is not evidence of causation.
:::

(ch04-correlation)=
## 4.1 The correlation coefficient

### Intuition

Here is the goal in one plain sentence: take a whole scatterplot and boil it down to a
single number that says how tightly the two things move together, and make that number
come out the same no matter what units you measured them in. That number is the
correlation, and this section builds it from parts you already have.

The regression slope from Chapter 2 already measures how $Y$ moves with $X$, but it
carries the units of the problem: for the savings data the slope is in percent of
savings per percentage point of young population. Change savings to a fraction instead
of a percent and the slope changes too. That makes slopes hard to compare across
different pairs of variables. Correlation fixes the units problem by measuring
association on a pure, dimensionless scale.

The trick is standardizing. Before comparing how two variables move, put both on the
same footing: subtract each variable's mean and divide by its standard deviation, so
each becomes a set of z-scores with no units. A country that is one standard deviation
above the mean in young population and half a standard deviation below the mean in
savings contributes a product of $(+1)(-0.5) = -0.5$ to the tally. Add those products
up and average them, and you have measured whether above-average $X$ tends to come with
above-average $Y$ (positive), below-average $Y$ (negative), or neither (near zero). The
average of the standardized products always lands between -1 and +1. That average is
the correlation.

@fig-ch04-quadrants makes this bookkeeping visible on the savings data. Split the plot at
the two means into four quadrants. A country in the upper-right or lower-left sits on the
same side of both means, so its product is positive. A country in the other two quadrants
sits on opposite sides, so its product is negative. Because more youth tends to come with
less saving, most points fall into the two negative quadrants, and the average of all the
products comes out negative. That negative average is the correlation.

```{figure} figures/fig_ch04_quadrants.png
:name: fig-ch04-quadrants
:alt: Scatterplot of the 50 countries with both variables converted to standard units, so the two means meet at the origin and split the plot into four quadrants. The upper-right and lower-left quadrants, where a point sits on the same side of both means and the product is positive, are marked with a plus and hold blue circles. The upper-left and lower-right quadrants, where the product is negative, are lightly shaded and marked with a minus and hold orange triangles. Most countries are orange triangles in the two negative quadrants, so the average product is negative.
Correlation is just the average of these signed products. On the savings data the points crowd into the two negative quadrants (orange), so the average is negative and r equals minus 0.46.
```

### Formula

Recall the deviation sums from @ch02-least-squares:
$S_{xx} = \sum (X_i - \bar X)^2$, $S_{yy} = \sum (Y_i - \bar Y)^2$, and the cross-product
$S_{xy} = \sum (X_i - \bar X)(Y_i - \bar Y)$. Standardizing the covariance by the two
standard deviations gives the correlation.

:::{admonition} Definition 4.1: Sample covariance and Pearson correlation coefficient
:class: note definition
The **sample covariance** is $s_{xy} = S_{xy}/(n-1)$, the average product of paired
deviations from the two means. The **Pearson correlation coefficient** rescales it by both
sample standard deviations,

$$
s_{xy} = \frac{S_{xy}}{n-1}, \qquad
r = \frac{s_{xy}}{s_x\, s_y} = \frac{S_{xy}}{\sqrt{S_{xx}\, S_{yy}}} ,
$$

a unitless number in $[-1, 1]$, where $s_x = \sqrt{S_{xx}/(n-1)}$ and
$s_y = \sqrt{S_{yy}/(n-1)}$ are the sample standard deviations.
:::

- $s_{xy}$ is the covariance: the average product of paired deviations, positive when $X$ and $Y$ tend to sit on the same side of their means.
- $s_x = \sqrt{S_{xx}/(n-1)}$ and $s_y = \sqrt{S_{yy}/(n-1)}$ are the sample standard deviations of $X$ and $Y$.
- $r$ is the covariance rescaled by the two standard deviations, which cancels all units and pins the value into $[-1, 1]$.

In words: $r$ is the covariance of $X$ and $Y$ measured in standard-deviation units of
each, so it says how many standard deviations $Y$ moves, on average, per standard
deviation of $X$, capped at one. The $(n-1)$ factors in $s_{xy}$, $s_x$, and $s_y$
cancel in the ratio, which is why the second form of $r$ uses the raw deviation sums
with no divisor at all.

### Derivation (why $r$ lives in $[-1, 1]$)

:::{admonition} Theorem 4.2: Bounds of the correlation coefficient
:class: important theorem
For any paired data $(X_i, Y_i)$ with $S_{xx} > 0$ and $S_{yy} > 0$,

$$
-1 \le r \le 1 ,
$$

with $r = \pm 1$ if and only if the points fall exactly on a straight line (slope positive
for $r = +1$, negative for $r = -1$).
:::

**Proof.** Standardize both variables. Write
$u_i = (X_i - \bar X)/s_x$ and $v_i = (Y_i - \bar Y)/s_y$. By construction
$\sum u_i^2 = (n-1)$ and $\sum v_i^2 = (n-1)$ (the squared deviations of $X$ sum to
$S_{xx}$, and dividing each by $s_x^2 = S_{xx}/(n-1)$ leaves $n-1$; same for $Y$), and
the correlation is
$r = \frac{1}{n-1}\sum u_i v_i$. Now use the fact that a sum of squares is never
negative. For either choice of sign,

$$
0 \le \sum_{i=1}^n (u_i \mp v_i)^2 = \sum u_i^2 + \sum v_i^2 \mp 2\sum u_i v_i
= (n-1) + (n-1) \mp 2(n-1) r .
$$

Divide by $2(n-1) > 0$. The plus-sign choice gives $0 \le 1 + r$, so $r \ge -1$; the
minus-sign choice gives $0 \le 1 - r$, so $r \le 1$. Therefore $-1 \le r \le 1$.
Equality holds only when the squared sum is exactly zero, that is when $v_i = \pm u_i$
for every $i$: the standardized points fall on a perfect line, so $r = \pm 1$ means an
exact straight-line relationship and nothing less. $\blacksquare$

### R

Reading a correlation is easier once you see a whole table of them. The `cor` function
applied to several columns returns the **correlation matrix**, every pairwise
correlation at once.

:::{admonition} Definition 4.3: Correlation matrix
:class: note definition
The **correlation matrix** of several variables is the square, symmetric table whose
$(j, k)$ entry is the Pearson correlation between variable $j$ and variable $k$. Every
diagonal entry is $1$, since each variable correlates perfectly with itself.
:::

```r
savings <- read.csv("data/savings.csv")
round(cor(savings[, c("sr", "pop15", "pop75", "dpi", "ddpi")]), 3)
```
```text
          sr  pop15  pop75    dpi   ddpi
sr     1.000 -0.456  0.317  0.220  0.305
pop15 -0.456  1.000 -0.908 -0.756 -0.048
pop75  0.317 -0.908  1.000  0.787  0.025
dpi    0.220 -0.756  0.787  1.000 -0.129
ddpi   0.305 -0.048  0.025 -0.129  1.000
```

The diagonal is all ones (every variable correlates perfectly with itself), and the
matrix is symmetric. The savings rate `sr` correlates $-0.456$ with the young-population
share and $+0.317$ with the old-population share, exactly the two signs the life-cycle
theory predicts. Notice also the $-0.908$ between `pop15` and `pop75`: countries with
many children have few elderly and the reverse, so those two predictors carry almost the
same information. That near-duplication will matter when the savings data returns for
multiple regression in Chapter 8 and for diagnostics in Chapter 9.

:::{admonition} Example 4.1: The savings-and-youth correlation
:class: note
**Question.** How strongly does a country's savings rate move with its share of young
dependents, on a scale that does not care about units?

**Intuition.** Compute the standardized cross-product average. We do it two ways: once
from the raw deviation sums, and once with the built-in `cor`, to confirm the formula.

**Formula.** $r = S_{xy} / \sqrt{S_{xx} S_{yy}}$.

**Computation.**

```r
x <- savings$pop15
y <- savings$sr
Sxx <- sum((x - mean(x))^2)
Syy <- sum((y - mean(y))^2)
Sxy <- sum((x - mean(x)) * (y - mean(y)))
r_manual <- Sxy / sqrt(Sxx * Syy)
round(c(r_manual = r_manual, r_cor = cor(x, y)), 4)
```
```text
r_manual    r_cor 
 -0.4555  -0.4555 
```

```python
import numpy as np
import pandas as pd
import statsmodels.formula.api as smf
from scipy import stats

savings = pd.read_csv("data/savings.csv")
x = savings["pop15"]
y = savings["sr"]
Sxx = np.sum((x - x.mean()) ** 2)
Syy = np.sum((y - y.mean()) ** 2)
Sxy = np.sum((x - x.mean()) * (y - y.mean()))
r_manual = Sxy / np.sqrt(Sxx * Syy)
print(round(r_manual, 4), round(x.corr(y), 4))
```
```text
-0.4555 -0.4555
```

**Interpretation.** The correlation is $r = -0.46$. The minus sign says the two move in
opposite directions: countries with more young dependents save less. The size, just
under a half, says the tendency is moderate, clearly present but far from a tight line,
which matches the wide scatter in @fig-ch04-savings-scatter. Because $r$ is unitless, a
reader in any country with any currency reads the same $-0.46$.
:::

To calibrate your eye, @fig-ch04-correlation-strength shows six clouds with correlations
from strongly negative to nearly perfect. A correlation of $\pm 0.3$ still looks like a
formless blob to most people; you need to reach $0.7$ or so before the linear trend
jumps out. The savings correlation of $-0.46$ sits between the second and third panels.

```{figure} figures/fig_ch04_correlation_strength.png
:name: fig-ch04-correlation-strength
:alt: Six scatterplots arranged in two rows, each a cloud of about 120 points, labeled with its correlation. From top left the correlations are about minus 0.9 (a tight downward band), minus 0.4 (a loose downward blob), 0.0 (a round shapeless cloud), 0.3 (a barely tilted blob), 0.7 (a clear upward band), and 0.95 (a very tight upward line).
Six correlations for the eye to memorize. Weak correlations near plus or minus 0.3 look almost round; a clear linear band does not appear until the correlation reaches roughly 0.7.
```

:::{admonition} Durable skill: Standardize before you compare
:class: tip
Correlation works by putting two different variables on one dimensionless scale. That
same move, converting to standard-deviation units before comparing, lets you compare
quantities that arrive in incompatible units: test scores and reaction times, dollars
and years, millimeters and votes. Whenever two measurements refuse to be compared
because their units differ, ask whether standardizing (subtract the mean, divide by the
standard deviation) makes them speak the same language. It usually does.
:::

(ch04-r-and-slope)=
## 4.2 Correlation and the regression slope

### Intuition

Correlation and the regression slope from Chapter 2 are measuring the same
relationship, so they cannot be independent numbers. The slope $b_1$ answers "how many
units of $Y$ per unit of $X$," carrying units; the correlation $r$ answers "how many
standard deviations of $Y$ per standard deviation of $X$," carrying none. Convert one to
the other by putting in or taking out the units, which means multiplying or dividing by
the ratio of the two standard deviations. This section makes that exact, because the tie
between $r$ and $b_1$ explains a fact you will meet again and again: the correlation
squared is the fraction of variance the regression explains.

### Formula

The slope and the correlation are linked by

$$
b_1 = r\,\frac{s_y}{s_x}, \qquad r = b_1\,\frac{s_x}{s_y}, \qquad r^2 = R^2 = \frac{\mathrm{SSR}}{\mathrm{SSTO}} .
$$

- $b_1 = S_{xy}/S_{xx}$ is the least-squares slope of $Y$ on $X$ from @ch02-least-squares.
- $s_x, s_y$ are the sample standard deviations, so $s_y/s_x$ is the unit-conversion factor between the two scales.
- $R^2 = \mathrm{SSR}/\mathrm{SSTO}$ is the coefficient of determination from @ch03-r2, the share of the total variation in $Y$ that the fitted line accounts for.

In words: the slope is the correlation scaled up by how much more spread $Y$ has than
$X$, and squaring the correlation gives exactly the proportion of $Y$'s variance that
the regression explains.

### Derivation (the exact link between $r$, $b_1$, and $R^2$)

:::{admonition} Theorem 4.4: Correlation, slope, and the coefficient of determination
:class: important theorem
In the simple linear regression of $Y$ on $X$, the least-squares slope, the correlation,
and the coefficient of determination are tied by

$$
b_1 = r\,\frac{s_y}{s_x}, \qquad r = b_1\,\frac{s_x}{s_y}, \qquad r^2 = R^2 = \frac{\mathrm{SSR}}{\mathrm{SSTO}} .
$$

The slope and the correlation always share the sign of $S_{xy}$.
:::

**Proof.** Start from the two definitions and factor. Since
$s_y/s_x = \sqrt{S_{yy}/S_{xx}}$ (the $(n-1)$ factors cancel),

$$
b_1 = \frac{S_{xy}}{S_{xx}}
= \underbrace{\frac{S_{xy}}{\sqrt{S_{xx} S_{yy}}}}_{r}\cdot \frac{\sqrt{S_{xx} S_{yy}}}{S_{xx}}
= r\,\sqrt{\frac{S_{yy}}{S_{xx}}} = r\,\frac{s_y}{s_x} .
$$

Solving for $r$ gives $r = b_1\, s_x/s_y$. Both estimates share the sign of $S_{xy}$, so
a positive slope always comes with a positive correlation and never disagrees in sign.

Now the connection to $R^2$. From the fitted line of @ch02-least-squares the
regression sum of squares is $\mathrm{SSR} = \sum(\hat Y_i - \bar Y)^2 = b_1^2 S_{xx}$,
and because $b_1 S_{xx} = S_{xy}$ this is
$\mathrm{SSR} = b_1 S_{xy}$. Divide by $\mathrm{SSTO} = S_{yy}$:

$$
R^2 = \frac{\mathrm{SSR}}{\mathrm{SSTO}} = \frac{b_1 S_{xy}}{S_{yy}}
= \frac{S_{xy}}{S_{xx}}\cdot\frac{S_{xy}}{S_{yy}} = \frac{S_{xy}^2}{S_{xx} S_{yy}} = r^2 .
$$

So the coefficient of determination is nothing more than the correlation squared, in
simple linear regression. $\blacksquare$

One more consequence is worth stating, because it explains a puzzle from Chapter 2. If
you regress $X$ on $Y$ instead of $Y$ on $X$, the slope is $b_1' = S_{xy}/S_{yy}$.
Multiply the two slopes:

$$
b_1 \cdot b_1' = \frac{S_{xy}}{S_{xx}}\cdot\frac{S_{xy}}{S_{yy}} = r^2 .
$$

The two regression slopes are reciprocals only when $r^2 = 1$, that is only when the fit
is perfect. Otherwise regressing $Y$ on $X$ and $X$ on $Y$ give genuinely different
lines, and their slopes multiply to $r^2$. Correlation is the one symmetric summary that
does not care which variable you call the response.

:::{admonition} Key idea
:class: tip keyidea
The correlation $r$, the slope $b_1$, and the coefficient of determination $R^2$ are not
three separate facts about a scatterplot. They are one least-squares fit seen from three
angles: $r$ measures it in standard units, $b_1$ puts the units back, and $R^2 = r^2$
reports the share of variance it explains. Compute any one and you have the other two.
:::

:::{admonition} Example 4.2: Reading the slope off the correlation
:class: note
**Question.** For the savings data, does the slope of `sr` on `pop15` really equal
$r\,(s_y/s_x)$, and does $r^2$ equal the $R^2$ that `lm` reports?

**Intuition.** Fit the line, pull out $b_1$ and $R^2$, and rebuild them from $r$ and the
two standard deviations.

**Formula.** $b_1 = r\,s_y/s_x$ and $R^2 = r^2$.

**Computation.**

```r
fit <- lm(sr ~ pop15, data = savings)
b1 <- coef(fit)[["pop15"]]
sx <- sd(x)
sy <- sd(y)
r <- cor(x, y)
round(c(b1 = b1, r = r, b1_from_r = r * sy / sx,
        r_from_b1 = b1 * sx / sy,
        r2 = r^2, R2 = summary(fit)$r.squared), 4)
```
```text
       b1         r b1_from_r r_from_b1        r2        R2 
  -0.2230   -0.4555   -0.2230   -0.4555    0.2075    0.2075 
```

```python
fit = smf.ols("sr ~ pop15", data=savings).fit()
b1 = fit.params["pop15"]
sx, sy = x.std(), y.std()
r = x.corr(y)
print(round(b1, 4), round(r, 4),
      round(r * sy / sx, 4), round(b1 * sx / sy, 4),
      round(r ** 2, 4), round(fit.rsquared, 4))
```
```text
-0.223 -0.4555 -0.223 -0.4555 0.2075 0.2075
```

**Interpretation.** The rebuilt slope $r\,(s_y/s_x) = -0.2230$ matches `lm` exactly, and
$r^2 = 0.2075$ is the $R^2$ printed by the summary. So the correlation of $-0.46$ means
the line explains about 21 percent of the country-to-country variation in savings rates.
The other 79 percent is everything the youth share does not capture. Keep this identity
in mind: in Chapter 12 you will watch $R^2$ climb as predictors pile up
(@ch12-criteria), and knowing it is a squared correlation is the antidote to reading a
high $R^2$ as proof of a good model.
:::

(ch04-rho-inference)=
## 4.3 Inference for the correlation

### Intuition

The $-0.46$ is a sample correlation, computed from 50 countries that happened to be in
the table. Behind it sits a population correlation $\rho$ (the Greek letter rho), the
value we would get from every country that could exist under the same conditions. We
have the same two questions as always: could the true $\rho$ be zero, with our $-0.46$
just sampling noise, and what range of $\rho$ values is consistent with the data? The
first is a hypothesis test, the second a confidence interval. The test turns out to be
one you already know in disguise, and the interval needs one clever change of variable.

### Formula

To test $H_0: \rho = 0$ against $H_a: \rho \ne 0$, use

$$
t^{\ast} = \frac{r\sqrt{n-2}}{\sqrt{1 - r^2}}, \qquad t^{\ast} \sim t_{n-2} \ \text{under } H_0 .
$$

For a confidence interval we first change scale, using **Fisher's $z$** transformation.

:::{admonition} Definition 4.5: Fisher's z transformation
:class: note definition
The **Fisher $z$ transformation** of a sample correlation $r$ is the inverse hyperbolic
tangent

$$
z = \operatorname{arctanh}(r) = \tfrac12 \ln\!\frac{1+r}{1-r} ,
$$

which stretches the crowded ends of the $[-1, 1]$ scale out toward $\pm\infty$.
:::

@fig-ch04-fisher-transform shows what the transform does. Near the middle of the scale it
barely changes $r$ at all: a step from $0.45$ to $0.50$ moves $z$ by only $0.06$. But as
$r$ nears the walls at $\pm 1$ the curve turns almost vertical, so the same $0.05$ step
from $0.90$ to $0.95$ moves $z$ by $0.36$, more than five times as far. The transform gives the
crowded values near the ceiling room to spread out, which is exactly what turns their
lopsided pile into a symmetric bell.

```{figure} figures/fig_ch04_fisher_transform.png
:name: fig-ch04-fisher-transform
:alt: A curve of z equals arctanh of r plotted against r from minus 1 to 1. Through the middle the curve nearly overlaps the dotted identity line, so z is close to r. As r approaches plus or minus 1 the curve bends sharply upward and downward toward plus and minus infinity. A green marker shows a 0.05 step in r near the middle (0.45 to 0.50) producing only a 0.06 change in z; an orange marker shows the same 0.05 step near the wall (0.90 to 0.95) producing a 0.36 change in z.
Fisher's z leaves the middle of the correlation scale almost untouched but stretches the ends: the same 0.05 step in r that barely moves z in the middle becomes a large jump near the wall at 1. That stretching un-crowds the pile of correlations near the ceiling.
```

On this scale the sampling distribution of $z$ is approximately normal with a spread that
no longer depends on the unknown $\rho$,
$z \approx N(\operatorname{arctanh}(\rho),\ 1/(n-3))$; the next derivation shows why, and
Theorem 4.7 states it precisely.

- $t^{\ast}$ is the test statistic; under the null of no correlation it follows a $t$ distribution with $n-2$ degrees of freedom.
- $\operatorname{arctanh}$ is the inverse hyperbolic tangent; it stretches the crowded ends of the $[-1,1]$ scale out toward $\pm\infty$.
- The transformed statistic $z$ is approximately normal with a variance, $1/(n-3)$, that no longer depends on the unknown $\rho$.

In words: the correlation test is a $t$ test with $n-2$ degrees of freedom, and to build
an interval we move to a scale where the sampling distribution is normal with a known
spread, make the interval there, and transform back.

### Derivation (the correlation $t$ test is the slope $t$ test)

:::{admonition} Theorem 4.6: The correlation t test
:class: important theorem
Under the simple linear regression model with normal errors, to test $H_0: \rho = 0$
against $H_a: \rho \ne 0$ the statistic

$$
t^{\ast} = \frac{r\sqrt{n-2}}{\sqrt{1 - r^2}}
$$

follows a $t$ distribution with $n-2$ degrees of freedom under $H_0$. It equals the slope
statistic $b_1/s\{b_1\}$ exactly, so testing $\rho = 0$ and testing $\beta_1 = 0$ are the
same test.
:::

**Proof.** From @ch03-f-test the slope
is tested with $t = b_1 / s\{b_1\}$, where $s\{b_1\} = \sqrt{\mathrm{MSE}/S_{xx}}$ and
$\mathrm{MSE} = \mathrm{SSE}/(n-2)$. Two facts from @ch04-r-and-slope do the work. First,
$\mathrm{SSE} = \mathrm{SSTO} - \mathrm{SSR} = S_{yy}(1 - r^2)$, since $\mathrm{SSR} = r^2 S_{yy}$.
Second, $b_1\sqrt{S_{xx}} = r\,(s_y/s_x)\sqrt{S_{xx}} = r\sqrt{S_{yy}}$. Substitute:

$$
t = \frac{b_1}{\sqrt{\mathrm{MSE}/S_{xx}}}
= \frac{b_1 \sqrt{S_{xx}}}{\sqrt{\mathrm{SSE}/(n-2)}}
= \frac{r\sqrt{S_{yy}}}{\sqrt{S_{yy}(1-r^2)/(n-2)}}
= \frac{r\sqrt{n-2}}{\sqrt{1-r^2}} = t^{\ast} .
$$

The $S_{yy}$ cancels, and the slope $t$ statistic and the correlation $t$ statistic are
the identical number. Testing "is the slope zero" and "is the correlation zero" are the
same test, as they must be, since $b_1$ and $r$ share a sign and vanish together.
$\blacksquare$

### Derivation sketch (Fisher's $z$ transformation)

The $t$ test handles $\rho = 0$, but a confidence interval for a nonzero $\rho$ is
harder, for two reasons. When $\rho$ is far from zero the sampling distribution of $r$ is
skewed, because $r$ is trapped below the ceiling at $1$ (or above the floor at $-1$) and
piles up against it. And the variance of $r$ depends on $\rho$ itself, so we cannot even
write down a fixed standard error. Fisher's idea was to find a transformation $g(r)$ that
cures both problems at once.

:::{admonition} Theorem 4.7: Sampling distribution of Fisher's z
:class: important theorem
For a sample of size $n$ from a bivariate normal population with correlation $\rho$, the
Fisher transform $z = \operatorname{arctanh}(r)$ is approximately normal,

$$
z \approx N\!\left(\operatorname{arctanh}(\rho),\ \frac{1}{n-3}\right),
$$

with a variance that no longer depends on $\rho$. A $100(1-\alpha)\%$ confidence interval
for $\rho$ is $\tanh\!\big(z \pm z_{1-\alpha/2}/\sqrt{n-3}\big)$.
:::

**Proof (sketch).** For a sample from a bivariate normal
population, large-sample theory gives $r$ an approximate mean $\rho$ and variance

$$
\operatorname{Var}(r) \approx \frac{(1-\rho^2)^2}{n} .
$$

We want a function $g$ so that $g(r)$ has a variance free of $\rho$. The delta method
(a first-order Taylor expansion, $g(r) \approx g(\rho) + g'(\rho)(r - \rho)$) says

$$
\operatorname{Var}\big(g(r)\big) \approx \big(g'(\rho)\big)^2 \operatorname{Var}(r)
= \big(g'(\rho)\big)^2 \frac{(1-\rho^2)^2}{n} .
$$

To kill the $\rho$ dependence, demand $g'(\rho) = 1/(1-\rho^2)$. Integrating that
derivative gives

$$
g(\rho) = \int \frac{d\rho}{1-\rho^2} = \tfrac12 \ln\frac{1+\rho}{1-\rho} = \operatorname{arctanh}(\rho),
$$

and with this choice $\operatorname{Var}(g(r)) \approx 1/n$, constant at last. Fisher's
finer analysis replaces the $n$ by $n-3$ for a better small-sample match and shows the
distribution of $z = \operatorname{arctanh}(r)$ is close to normal, not skewed. So
$z \approx N(\operatorname{arctanh}(\rho),\, 1/(n-3))$. $\blacksquare$

Two honesty notes. The exact sampling distribution of $r$ under bivariate normality is
known in closed form but is a messy special function; the normal approximation to $z$ is
what everyone actually uses, and the next simulation shows why it is safe. And the whole
argument assumes the data really are bivariate normal. When that is in doubt, the
bootstrap of Chapter 5 (@ch05-bootstrap) gives a confidence interval for $\rho$ that
leans on no distributional assumption at all.

To build a 95 percent interval: compute $z = \operatorname{arctanh}(r)$, form
$z \pm 1.96/\sqrt{n-3}$, and transform both ends back with $\tanh$.

:::{admonition} Example 4.3: Testing and bounding the savings correlation
:class: note
**Question.** Is the savings-youth correlation significantly different from zero, and
what is a 95 percent confidence interval for the population value $\rho$?

**Intuition.** Run the $t$ test through the built-in correlation test, then build the
interval by hand on the Fisher $z$ scale and transform back.

**Formula.** $t^{\ast} = r\sqrt{n-2}/\sqrt{1-r^2}$; interval
$\tanh\!\big(\operatorname{arctanh}(r) \pm 1.96/\sqrt{n-3}\big)$.

**Computation.**

```r
cor.test(savings$pop15, savings$sr)
```
```text
	Pearson's product-moment correlation

data:  savings$pop15 and savings$sr
t = -3.5453, df = 48, p-value = 0.0008866
alternative hypothesis: true correlation is not equal to 0
95 percent confidence interval:
 -0.6513020 -0.2029202
sample estimates:
       cor 
-0.4555381 
```

```r
n <- nrow(savings)
z <- atanh(r)
se_z <- 1 / sqrt(n - 3)
ci <- tanh(z + c(-1, 1) * qnorm(0.975) * se_z)
round(c(z = z, se_z = se_z, lower = ci[1], upper = ci[2]), 4)
```
```text
      z    se_z   lower   upper 
-0.4917  0.1459 -0.6513 -0.2029 
```

```python
res = stats.pearsonr(savings["pop15"], savings["sr"])
print(round(res.statistic, 4), round(res.pvalue, 7))
print(round(fit.tvalues["pop15"], 4), round(fit.pvalues["pop15"], 7))
```
```text
-0.4555 0.0008866
-3.5453 0.0008866
```

```python
n = len(savings)
z = np.arctanh(r)
se_z = 1 / np.sqrt(n - 3)
ci = np.tanh(z + np.array([-1, 1]) * stats.norm.ppf(0.975) * se_z)
print(round(z, 4), round(se_z, 4), round(ci[0], 4), round(ci[1], 4))
```
```text
-0.4917 0.1459 -0.6513 -0.2029
```

**Interpretation.** The test statistic is $t^{\ast} = -3.55$ on $48$ degrees of freedom,
with $p = 0.00089$: a correlation this far from zero would be very unlucky if the true
$\rho$ were zero, so we reject $H_0$. The Python block confirms the promise of the last
derivation: the correlation's $t$ statistic and $p$-value ($-3.5453$, $0.0008866$) are
byte-for-byte the slope's $t$ statistic and $p$-value from the fitted regression. The
hand-built Fisher interval $(-0.65, -0.20)$ matches `cor.test` to four decimals. The
plausible values of $\rho$ run from a moderate $-0.20$ to a strong $-0.65$, all
negative: whatever the exact strength, more youth goes with less saving.
:::

### The transformation, checked by simulation

The Fisher argument leaned on two claims: that $r$ is skewed while $z$ is nearly normal,
and that the standard deviation of $z$ is about $1/\sqrt{n-3}$. Both are checkable
without any more algebra. Draw many samples from a bivariate normal with a known $\rho$,
compute $r$ each time, and look at the pile of results.

```r
set.seed(4210)
simulate_r <- function(n, rho, reps = 10000) {
  replicate(reps, {
    z1 <- rnorm(n)
    z2 <- rnorm(n)
    xa <- z1
    ya <- rho * z1 + sqrt(1 - rho^2) * z2
    cor(xa, ya)
  })
}
rs <- simulate_r(n = 20, rho = 0.7)
zs <- atanh(rs)
round(c(mean_r = mean(rs), sd_r = sd(rs),
        mean_z = mean(zs), sd_z = sd(zs),
        theory_sd_z = 1 / sqrt(20 - 3)), 4)
```
```text
     mean_r        sd_r      mean_z        sd_z theory_sd_z 
     0.6919      0.1250      0.8906      0.2412      0.2425 
```

```python
rng = np.random.default_rng(4210)
def simulate_r(n, rho, reps=10000):
    out = np.empty(reps)
    for i in range(reps):
        z1 = rng.standard_normal(n)
        z2 = rng.standard_normal(n)
        xa = z1
        ya = rho * z1 + np.sqrt(1 - rho ** 2) * z2
        out[i] = np.corrcoef(xa, ya)[0, 1]
    return out

rs = simulate_r(20, 0.7)
zs = np.arctanh(rs)
print(round(rs.mean(), 4), round(rs.std(ddof=1), 4),
      round(zs.mean(), 4), round(zs.std(ddof=1), 4),
      round(1 / np.sqrt(20 - 3), 4))
```
```text
0.6893 0.1254 0.8852 0.2405 0.2425
```

The simulated standard deviation of $z$ is $0.2412$ (R) and $0.2405$ (Python), both a hair
under the theoretical $1/\sqrt{17} = 0.2425$, confirming the variance formula. The mean
of $z$ lands near $\operatorname{arctanh}(0.7) = 0.867$, close to the simulated $0.89$.
@fig-ch04-fisher-z-sim tells the visual half of the story: the raw correlations bunch up
and skew toward the ceiling at $1$, while the transformed values sit under a symmetric
normal curve. That skew is exactly why we never build the interval on the raw $r$ scale.

```{figure} figures/fig_ch04_fisher_z_sim.png
:name: fig-ch04-fisher-z-sim
:alt: Two histograms side by side from 10000 simulated samples of size 20 with true correlation 0.7. The left histogram of the sample correlation r is clearly skewed, with a long tail toward smaller values and a sharp pile-up near 0.9, and a dashed line marks the true rho of 0.7. The right histogram of z equals arctanh of r is symmetric and closely follows an overlaid normal curve centered near 0.87.
Ten thousand sample correlations at true rho 0.7 and n 20. Raw r (left) is skewed and crowds the ceiling at 1; the Fisher-transformed z (right) is nearly normal with the predicted spread, which is why confidence intervals are built on the z scale.
```

::::{admonition} Try it 4.1
:class: important
A study of $n = 28$ people reports a correlation of $r = 0.50$ between hours of sleep and
a memory score. Test $H_0: \rho = 0$ with the $t$ statistic, and build a 95 percent
confidence interval for $\rho$ using Fisher's $z$. Is zero inside the interval? Does that
agree with the test?

:::{admonition} Solution
:class: dropdown
Test: $t^{\ast} = r\sqrt{n-2}/\sqrt{1-r^2} = 0.50\sqrt{26}/\sqrt{1-0.25} = 0.50(5.099)/0.866 = 2.944$
on $26$ degrees of freedom, which gives a two-sided $p$ of about $0.0067$, so reject
$H_0$. Interval: $z = \operatorname{arctanh}(0.50) = 0.5493$, standard error
$1/\sqrt{25} = 0.20$, so $z \pm 1.96(0.20) = (0.1573, 0.9413)$. Transform back with
$\tanh$: $(\tanh 0.1573,\ \tanh 0.9413) = (0.156, 0.735)$. Zero is not in the interval,
which agrees with rejecting $H_0$: the two procedures tell the same story because both
run on the same standardized evidence.
:::
::::

(ch04-bivariate-normal)=
## 4.4 The bivariate normal model

### Intuition

So far we have pictured one variable as a set of dials we fix in advance, with only the
other left to vary, the regression setup of Chapter 2. Correlation has a second, more
even-handed home, where both measurements are random and arrive together as a pair, like a
random person's height and weight measured at the same moment. In that picture the two
variables are drawn together from a single joint distribution. The cleanest such
distribution is the **bivariate normal**, whose contour lines are ellipses. When the
correlation is zero the ellipse is a circle; as the correlation grows the circle
stretches and tilts toward the 45-degree line, becoming a thin cigar as it approaches
$\pm 1$. @fig-ch04-bvn-contours shows the progression.

```{figure} figures/fig_ch04_bvn_contours.png
:name: fig-ch04-bvn-contours
:alt: Three contour plots of bivariate normal densities with standard normal margins. At rho 0 the contours are concentric circles. At rho 0.6 they are ellipses tilted along the rising diagonal. At rho 0.9 they are long thin ellipses hugging the 45-degree line.
The bivariate normal at three correlations. The parameter rho controls how far the circular contours stretch and tilt into ellipses; at rho near 1 the two variables are nearly a straight line.
```

### Formula

:::{admonition} Definition 4.8: The bivariate normal distribution
:class: note definition
Two variables $X, Y$ are **bivariate normal** if their joint density is

$$
f(x, y) = \frac{1}{2\pi\sigma_X\sigma_Y\sqrt{1-\rho^2}}\exp\!\left(-\frac{1}{2(1-\rho^2)}\left[\frac{(x-\mu_X)^2}{\sigma_X^2} - \frac{2\rho(x-\mu_X)(y-\mu_Y)}{\sigma_X\sigma_Y} + \frac{(y-\mu_Y)^2}{\sigma_Y^2}\right]\right),
$$

with means $\mu_X, \mu_Y$, standard deviations $\sigma_X, \sigma_Y$, and correlation
$\rho$; setting $\rho = 0$ makes the density factor into two independent normals.
:::

In words: the formula is scarier than the idea. The density piles up highest at the
center point $(\mu_X, \mu_Y)$ and falls off in oval rings around it, and the single
number $\rho$ decides how much those rings tilt and stretch away from circles. Read the
pieces one at a time.

- $\mu_X, \mu_Y$ are the two means and $\sigma_X, \sigma_Y$ the two standard deviations.
- $\rho$ is the population correlation; it is the only parameter that ties $X$ and $Y$ together, and $\rho = 0$ makes the density factor into two separate normals.
- The bracketed quadratic form is what draws the elliptical contours; its cross term carries the $\rho$.

The single most useful fact about this model is what it says about $Y$ once you know $X$.
The **conditional distribution** of $Y$ given $X = x$ is again normal, with

$$
E\{Y \mid X = x\} = \mu_Y + \rho\,\frac{\sigma_Y}{\sigma_X}(x - \mu_X), \qquad
\operatorname{Var}\{Y \mid X = x\} = \sigma_Y^2(1 - \rho^2).
$$

In words: inside a bivariate normal, the regression of $Y$ on $X$ is exactly linear, with
population slope $\rho\,\sigma_Y/\sigma_X$, and the leftover variance is the original
variance shrunk by the factor $1 - \rho^2$.

### Derivation (the hidden regression line)

:::{admonition} Theorem 4.9: Conditional distribution in the bivariate normal
:class: important theorem
If $(X, Y)$ is bivariate normal, then the conditional distribution of $Y$ given $X = x$ is
again normal, with

$$
E\{Y \mid X = x\} = \mu_Y + \rho\,\frac{\sigma_Y}{\sigma_X}(x - \mu_X), \qquad
\operatorname{Var}\{Y \mid X = x\} = \sigma_Y^2(1 - \rho^2).
$$

The conditional mean is exactly linear in $x$, with population slope
$\rho\,\sigma_Y/\sigma_X$, and conditioning on $X$ removes the fraction $\rho^2$ of $Y$'s
variance.
:::

**Proof.** The joint density factors as
$f(x,y) = f_X(x)\, f(y \mid x)$, where $f_X$ is the $N(\mu_X, \sigma_X^2)$ marginal. Divide
the full density by that marginal. The terms that depend only on $x$ cancel, and after
completing the square in $y$ inside the exponent, what remains is a normal density in $y$
with mean $\mu_Y + \rho(\sigma_Y/\sigma_X)(x-\mu_X)$ and variance $\sigma_Y^2(1-\rho^2)$.
The completing-the-square step is the same algebra used for the univariate normal; the
cross term $-2\rho(x-\mu_X)(y-\mu_Y)/(\sigma_X\sigma_Y)$ is what pushes the center of the
conditional distribution off $\mu_Y$ by an amount proportional to $(x - \mu_X)$.
$\blacksquare$

Compare the population slope $\rho\,\sigma_Y/\sigma_X$ with the sample slope
$b_1 = r\,s_y/s_x$ from @ch04-r-and-slope: they are the same formula, one with population
quantities and one with their sample estimates. The regression line of Chapter 2 is the
sample version of the bivariate normal's conditional mean. And the variance identity
$\operatorname{Var}\{Y \mid X\} = \sigma_Y^2(1 - \rho^2)$ is the population twin of
$R^2 = r^2$: knowing $X$ removes the fraction $\rho^2$ of $Y$'s variance, leaving
$1 - \rho^2$. When $\rho = 0.7$, knowing $X$ explains $0.49$ of the variance and leaves
just over half.

:::{admonition} Key idea
:class: tip keyidea
The regression line of Chapter 2 is the sample copy of a population truth. Inside a
bivariate normal the conditional mean $\mu_Y + \rho(\sigma_Y/\sigma_X)(x - \mu_X)$ is an
exact straight line, and the sample slope $b_1 = r\,s_y/s_x$ just replaces each population
quantity by its estimate. Fitting a line is estimating that hidden conditional mean.
:::

::::{admonition} Try it 4.2
:class: important
In a bivariate normal with $\rho = 0.8$, what fraction of the variance in $Y$ remains
after you condition on $X$? If instead you saw a report claiming that knowing $X$
"removes 80 percent of the uncertainty in $Y$," what mistake has the writer made?

:::{admonition} Solution
:class: dropdown
The remaining fraction is $1 - \rho^2 = 1 - 0.64 = 0.36$, so conditioning on $X$ removes
$64$ percent of the variance, not $80$ percent. The writer confused the correlation
$\rho = 0.8$ with the fraction of variance explained, which is $\rho^2 = 0.64$.
Correlation and "share of variance" are different scales; the second is the square of the
first, and squaring a number below one always makes it smaller.
:::
::::

(ch04-spearman)=
## 4.5 Spearman rank correlation

### Intuition

Pearson's $r$ measures straight-line association, and it trusts every value at face
value, so a single wild point can swing it hard. Often you care about a gentler question:
as $X$ goes up, does $Y$ tend to go up, whether or not the increase is along a straight
line? That is a question about order, not distance, and it has its own coefficient.
**Spearman's rank correlation** (Definition 4.10) replaces each value by its rank
(smallest is 1, next is 2, and so on) and then computes the ordinary Pearson correlation
of those ranks. Because
ranks ignore how far apart the values are and see only their order, Spearman is
unbothered by a lone outlier and by curves that are monotone but not straight.

@fig-ch04-spearman-monotone shows the curve case. On the left is a relationship that
always rises but bends, so Pearson reads only $0.91$, penalizing the bend. Replace each
value by its rank, and the same points snap onto a perfect diagonal: rank 1 in $X$ pairs
with rank 1 in $Y$, rank 2 with rank 2, all the way up. Because the order is perfect, even
though the spacing is not, Spearman is exactly $1$. Ranks straighten any monotone curve.

```{figure} figures/fig_ch04_spearman_monotone.png
:name: fig-ch04-spearman-monotone
:alt: Two panels. The left panel plots Y against X for 40 points that rise slowly then steeply, a smooth upward-bending curve; its title reports Pearson r equals 0.91. The right panel plots the rank of Y against the rank of X for the same 40 points; they fall exactly on a dashed diagonal line, and the title reports Spearman equals 1.00.
The same monotone-but-curved data seen two ways. Pearson reads only 0.91 because the raw cloud bends, but the ranks fall on a perfect line, so Spearman is exactly 1. Spearman rewards order and ignores spacing.
```

### Formula

:::{admonition} Definition 4.10: Spearman rank correlation
:class: note definition
The **Spearman rank correlation** $r_S$ is the Pearson correlation computed on the ranks
of the two variables,

$$
r_S = \text{Pearson correlation of } \operatorname{rank}(X_i) \text{ and } \operatorname{rank}(Y_i) .
$$

It lies in $[-1, 1]$, equals $+1$ for any strictly increasing relationship (not only a
straight line) and $-1$ for any strictly decreasing one.
:::

- $\operatorname{rank}(X_i)$ is the position of $X_i$ in the sorted list of the $X$ values, and likewise for $Y$.
- $r_S$ lies in $[-1, 1]$ just like Pearson's $r$, equals $+1$ for any strictly increasing relationship (not only a straight line) and $-1$ for any strictly decreasing one.

In words: Spearman is Pearson applied to the rankings, so it measures whether the two
variables rise and fall together in order, and it does not care about the exact spacing
of the values.

### R and Python

The savings data has a natural test case. The growth rate of income, `ddpi`, correlates
with the savings rate, but one country, Libya, had an enormous income growth rate over
the period and only a middling savings rate. That single point drags the Pearson
correlation down. Spearman, seeing Libya merely as "the highest-growth country" rather
than as a point far off to the right, is less disturbed.

:::{admonition} Example 4.4: Growth and saving, with and without ranks
:class: note
**Question.** How strongly does the savings rate move with income growth, and does the
answer change when we switch from Pearson to Spearman?

**Intuition.** Compute both coefficients on the same pair, then find the country
responsible for the gap.

**Formula.** Pearson $r$ on the raw values; $r_S$ on the ranks.

**Computation.**

```r
pear <- cor(savings$ddpi, savings$sr)
spear <- cor(savings$ddpi, savings$sr, method = "spearman")
round(c(pearson = pear, spearman = spear), 4)
savings[which.max(savings$ddpi), c("country", "ddpi", "sr")]
```
```text
 pearson spearman 
  0.3048   0.4082 
   country  ddpi   sr
49   Libya 16.71 8.89
```

```python
pear = savings["ddpi"].corr(savings["sr"])
spear = stats.spearmanr(savings["ddpi"], savings["sr"]).statistic
print(round(pear, 4), round(spear, 4))
print(savings.loc[savings["ddpi"].idxmax(), ["country", "ddpi", "sr"]])
```
```text
0.3048 0.4082
country    Libya
ddpi       16.71
sr          8.89
Name: 48, dtype: object
```

**Interpretation.** Pearson reports $0.30$, Spearman $0.41$. The gap is Libya, whose
growth rate of $16.7$ percent is more than double any other country's while its savings
rate of $8.9$ is unremarkable. As a raw value that point sits far to the right and pulls
the Pearson line toward it, weakening the fit; as a rank it is just "number one in
growth," so Spearman keeps more of the pattern in the other 49 countries.
@fig-ch04-spearman shows the point and the two numbers. Libya returns as a formal
diagnostic case in Chapter 9, where its outsized influence on a fitted model gets a name
and a measurement.
:::

```{figure} figures/fig_ch04_spearman.png
:name: fig-ch04-spearman
:alt: Scatterplot of savings rate against income growth rate for 50 countries. Most countries cluster with growth rates from 0 to 8 percent and savings rates from 0 to 18 percent. One red diamond, labeled Libya, sits far to the right at a growth rate near 17 percent with a savings rate near 9 percent. A text box reports Pearson r equals 0.30 and Spearman equals 0.41.
Libya's extreme income growth makes it an outlier that pulls the Pearson correlation down to 0.30; Spearman, which reads only ranks, reports the stronger 0.41 seen in the bulk of the countries.
```

Neither number is "right." They answer different questions. Pearson asks about
straight-line strength and counts Libya's distance; Spearman asks about monotone order
and does not. When they disagree, that disagreement is information: it says an outlier or
a curve is present, and you should look at the plot before quoting either one.

(ch04-traps)=
## 4.6 Four ways a correlation lies

A single number that compresses a scatterplot must throw information away, and sometimes
it throws away the part that mattered. The founding demonstration is Anscombe's quartet:
four datasets, built by the statistician Frank Anscombe in 1973, that share the same
means, the same standard deviations, the same correlation of $0.816$, and the same fitted
line, yet look nothing alike.

```r
anscombe <- read.csv("data/anscombe.csv")
stats_row <- function(i) {
  xi <- anscombe[[paste0("x", i)]]
  yi <- anscombe[[paste0("y", i)]]
  f <- lm(yi ~ xi)
  c(set = i, mean_x = mean(xi), mean_y = mean(yi),
    r = cor(xi, yi), b0 = coef(f)[[1]], b1 = coef(f)[[2]])
}
round(t(sapply(1:4, stats_row)), 3)
```
```text
     set mean_x mean_y     r    b0  b1
[1,]   1      9  7.501 0.816 3.000 0.5
[2,]   2      9  7.501 0.816 3.001 0.5
[3,]   3      9  7.500 0.816 3.002 0.5
[4,]   4      9  7.501 0.817 3.002 0.5
```

```python
anscombe = pd.read_csv("data/anscombe.csv")
for i in range(1, 5):
    xi = anscombe[f"x{i}"]
    yi = anscombe[f"y{i}"]
    f = smf.ols(f"y{i} ~ x{i}", data=anscombe).fit()
    print(i, round(xi.mean(), 2), round(yi.mean(), 3),
          round(xi.corr(yi), 3), round(f.params.iloc[0], 3),
          round(f.params.iloc[1], 3))
```
```text
1 9.0 7.501 0.816 3.0 0.5
2 9.0 7.501 0.816 3.001 0.5
3 9.0 7.5 0.816 3.002 0.5
4 9.0 7.501 0.817 3.002 0.5
```

The four rows are identical to three decimals. @fig-ch04-anscombe plots them, and only
the plot reveals the truth. Set I is a genuine linear scatter, the honest case. Set II is
a smooth curve, where a straight-line correlation is the wrong summary entirely. Set III
is a perfect line with one outlier that tilts the fit and lowers $r$ from $1$ to $0.82$.
Set IV is the most alarming: ten points stacked at a single $x$ value carry no
information about slope at all, and one lone point far to the right invents the entire
correlation. Delete that one point and $r$ is undefined. The lesson Anscombe drew, and
the first habit of any honest analyst, is to plot the data before trusting the number.

```{figure} figures/fig_ch04_anscombe.png
:name: fig-ch04-anscombe
:alt: A two-by-two grid of scatterplots, Anscombe's quartet, each with the same fitted line y equals 3 plus 0.5 x and the same r of 0.82. Panel I is a loose upward-sloping band of points. Panel II is a smooth concave-down curve. Panel III is a tight rising line with one point far above it. Panel IV has ten points stacked in a vertical column at x equals 8 plus one isolated point at x equals 19.
Anscombe's quartet: four datasets with identical means, correlations of 0.82, and fitted lines, but four different shapes. Only panel I is well summarized by a correlation; the number is misleading for the curve, the outlier, and the single leverage point.
```

The quartet is a museum piece, built to make the point. The same four failures show up in
real data, so here they are one at a time, with the mechanism named.

**Nonlinearity.** Correlation measures straight-line association only. A relationship can
be perfectly predictable and yet have a Pearson correlation near zero, as in a symmetric
U-shape where $Y$ falls and then rises: the downhill and uphill halves cancel. A small
$r$ never means "no relationship." It means "no straight-line relationship," and the only
way to tell the difference is to look. Anscombe's set II is this trap; the fix is a
scatterplot and, if a curve appears, the transformations of Chapter 10.

**Outliers.** Because $r$ squares distances, one point far from the crowd can dominate the
sum, either manufacturing a correlation (set IV) or destroying one (set III). The Libya
example in @fig-ch04-spearman is the mild, real-data version. The defenses are to plot the
data, to check whether one or two points are driving the result by recomputing without
them, and to report Spearman alongside Pearson when they disagree.

**Restriction of range.** Correlation depends on the spread of $X$. Squeeze that spread
and the correlation shrinks toward zero, even though the underlying relationship has not
changed at all. The Galton height data shows this cleanly.

```r
galton <- read.csv("data/galton_heights.csv")
band <- galton[galton$midparentHeight >= 69 & galton$midparentHeight <= 71, ]
round(c(full_r = cor(galton$midparentHeight, galton$childHeight),
        full_n = nrow(galton),
        band_r = cor(band$midparentHeight, band$childHeight),
        band_n = nrow(band),
        sd_full = sd(galton$midparentHeight),
        sd_band = sd(band$midparentHeight)), 3)
```
```text
 full_r  full_n  band_r  band_n sd_full sd_band 
  0.321 934.000   0.143 393.000   1.802   0.527 
```

Across all 934 children the correlation between midparent height and child height is
$0.32$. Keep only families whose midparent height is between 69 and 71 inches, cutting the
standard deviation of the parent heights from $1.80$ to $0.53$, and the correlation falls
by more than half to $0.14$, as @fig-ch04-restriction-range shows. Nothing about heredity
changed; we just stopped looking at short and tall parents. This is why a correlation
computed inside a narrow group, admitted students, hired employees, surviving patients,
routinely understates the association in the full population. Whenever you read a weak
correlation, ask what range of $X$ it was computed over.

```{figure} figures/fig_ch04_restriction_range.png
:name: fig-ch04-restriction-range
:alt: Scatterplot of child height against midparent height for 934 Galton children, lightly jittered. A vertical yellow band highlights parent heights from 69 to 71 inches. Points outside the band are gray, points inside are blue. A text label reports the full-data correlation as 0.32 and the correlation within the yellow band as 0.14.
Restricting midparent height to the narrow yellow band cuts its spread by two-thirds and halves the correlation, from 0.32 to 0.14, even though the relationship itself is unchanged. Correlation depends on the range of X you sample.
```

**Ecological correlation.** A correlation computed on group averages is not the
correlation for individuals, and it is usually larger, because averaging cancels the
within-group scatter. Group the Galton children by family and correlate the family-average
child height with the midparent height.

```r
fam <- aggregate(cbind(midparentHeight, childHeight) ~ family,
                 data = galton, FUN = mean)
round(c(individual_r = cor(galton$midparentHeight, galton$childHeight),
        family_r = cor(fam$midparentHeight, fam$childHeight),
        n_families = nrow(fam)), 3)
```
```text
individual_r     family_r   n_families 
       0.321        0.399      205.000 
```

The individual-level correlation is $0.32$; the family-average correlation is $0.40$, as
@fig-ch04-ecological shows. Averaging smooths away the sibling-to-sibling differences and
leaves a tighter picture, so the aggregate number overstates how well one child's height
can be predicted from the parents. Inferring individual behavior from group averages is
the **ecological fallacy**, and it has led to real errors: a correlation across countries,
states, or precincts can be strong while the same correlation across the people inside
them is weak or even reversed. The unit you correlate is part of the claim.

```{figure} figures/fig_ch04_ecological.png
:name: fig-ch04-ecological
:alt: Scatterplot of child height against midparent height. Gray points are the 934 individual children, forming a wide cloud with correlation 0.32. Orange points are the 205 family averages, forming a tighter cloud with correlation 0.40 running through the middle of the gray one.
The 205 family averages (orange) correlate more strongly (0.40) than the 934 individual children (gray, 0.32), because averaging removes the within-family scatter. A correlation on group means is not the correlation for individuals.
```

:::{admonition} Durable skill: Ask what generated the number before you trust it
:class: tip
Every one of these traps is invisible in the single value of $r$ and obvious in a
scatterplot or a question about how the data were collected. Before you quote a
correlation, ask four things: Did I plot it? Could one or two points be driving it? Over
what range of $X$ was it measured? Are these individuals or group averages? These
questions transfer to every statistic you will ever read, not just correlation. A number
without its provenance is a rumor.
:::

## 4.7 Regression to the mean, and why correlation is not causation

There is a fifth confusion that deserves its own section, because it fooled the inventor
of regression himself and still fills the news. When Francis Galton plotted children's
heights against their parents' in the 1880s, he found that tall parents had children who
were taller than average but not as tall as the parents, and short parents had children
who were shorter than average but not as short. He first suspected some biological force
pulling the population toward mediocrity. There is no such force. The pull toward the
average is a mathematical certainty whenever the correlation is less than perfect, and it
has a name: **regression to the mean**.

:::{admonition} Definition 4.11: Regression to the mean
:class: note definition
**Regression to the mean** is the tendency of cases selected as extreme on one imperfectly
correlated measurement to be less extreme on a second. In standard units the predicted
value is $r$ times the predictor's $z$-score, so whenever $|r| < 1$ the prediction is
pulled toward the mean.
:::

The identity from @ch04-r-and-slope makes it exact. In standard units, where both
variables are z-scores, the standard deviations are both $1$, so the regression slope is
$b_1 = r\,(s_y/s_x) = r$. A parent who is $2$ standard deviations above the mean has
children predicted at only $r \times 2$ standard deviations above the mean. For the Galton
data $r = 0.32$, so the children of very tall parents are predicted just $0.32 \times 2 =
0.64$ standard deviations up, well short of their parents.

:::{admonition} Example 4.5: The Galton heights and the pull toward average
:class: note
**Question.** By how much do children's heights regress toward the mean, and what is the
standardized slope?

**Intuition.** Fit child height on midparent height, and compare the raw slope with the
correlation, which is the slope in standard units.

**Formula.** Standardized slope $= r$; raw slope $= r\,s_{\text{child}}/s_{\text{parent}}$.

**Computation.**

```r
galton <- read.csv("data/galton_heights.csv")
r_g <- cor(galton$midparentHeight, galton$childHeight)
fit_g <- lm(childHeight ~ midparentHeight, data = galton)
round(c(r = r_g,
        slope = coef(fit_g)[["midparentHeight"]],
        sd_parent = sd(galton$midparentHeight),
        sd_child = sd(galton$childHeight)), 3)
```
```text
        r     slope sd_parent  sd_child 
    0.321     0.637     1.802     3.579 
```

```python
galton = pd.read_csv("data/galton_heights.csv")
r_g = galton["midparentHeight"].corr(galton["childHeight"])
fit_g = smf.ols("childHeight ~ midparentHeight", data=galton).fit()
print(round(r_g, 3), round(fit_g.params["midparentHeight"], 3),
      round(galton["midparentHeight"].std(), 3),
      round(galton["childHeight"].std(), 3))
```
```text
0.321 0.637 1.802 3.579
```

**Interpretation.** The correlation is $r = 0.32$, so in standard units a child is
predicted only $0.32$ of the way out from the mean that the parents were. The raw slope
$0.637$ says a one-inch rise in midparent height predicts about two-thirds of an inch in
the child, and it equals $r\,s_{\text{child}}/s_{\text{parent}} = 0.321(3.579/1.802)$.
@fig-ch04-regression-to-mean draws the shallow fitted line against the steeper 45-degree
line of "equal heights": the gap between them is the regression effect.
:::

```{figure} figures/fig_ch04_regression_to_mean.png
:name: fig-ch04-regression-to-mean
:alt: Scatterplot of child height against midparent height, both in standard units, for 934 Galton children. A dashed red 45-degree line marks equal standard scores. A solid green least-squares line with the much shallower slope of 0.32 runs through the cloud. The green line sits well below the red line on the right side and above it on the left, showing predictions pulled toward the mean at both extremes.
In standard units the fitted slope is exactly r equals 0.32, far shallower than the dashed equal-height line of slope 1. Tall parents' children are predicted only a third of the way out toward tall; short parents' children only a third of the way toward short. That gap is regression to the mean.
```

Regression to the mean is not a special fact about heredity. It happens any time two
measurements are imperfectly correlated, which is almost always. The student who scores
highest on the midterm tends to score lower (still good, just less extreme) on the final.
The rookie athlete featured on a magazine cover after a spectacular season tends to do
worse the next year, the so-called cover jinx, with no jinx involved. A clinic enrolls
patients with the highest blood pressure, treats them, and sees their pressure fall on
average, partly because the most extreme readings were extreme partly by luck and drift
back on their own. In every case the naive reading blames a cause, the pressure of fame, a
miracle drug, when the imperfect correlation between two measurements already predicts the
drift. Whenever you select cases because they were extreme and then measure them again,
expect regression to the mean, and do not hand the credit or the blame to a story.

:::{admonition} Key idea
:class: tip keyidea
Regression to the mean is arithmetic, not biology. Any time two measurements are less than
perfectly correlated, the extreme cases on the first will, on average, be less extreme on
the second, with no cause behind the drift. Blaming a story, a jinx, a treatment, a loss
of nerve, for a pattern that a correlation below one already guarantees is one of the most
common mistakes in reading data.
:::

This is the deepest form of the oldest warning in statistics: **correlation is not
causation.** A correlation between $X$ and $Y$ is consistent with $X$ causing $Y$, with
$Y$ causing $X$, with some third variable driving both, and with pure coincidence. The
savings correlation of $-0.46$ does not prove that having children makes a country thrifty
or spendthrift; income, culture, and history sit behind both. Correlation earns its keep
as a description and a first clue, not as a verdict. Sorting genuine causes from
lookalikes needs either a designed experiment or the careful causal reasoning that Chapter
16 takes up (@ch16-path-diagrams), and it is the single hardest thing this book asks you
to keep straight.

:::{admonition} A wrong reading, corrected
:class: warning
**Wrong:** "Cities with more police have more crime, so police cause crime."
**Right:** Both police numbers and crime track city size and its problems; the third
variable drives both. The positive correlation is real and the causal reading is
backwards. Before turning a correlation into a cause, name the third variables that could
produce it on their own, and ask whether the data can rule them out. Usually observational
data cannot, and honesty requires saying so.
:::

::::{admonition} Try it 4.3
:class: important
A newspaper reports that mutual funds in the top 10 percent of returns one year tend to
place near the middle of the pack the next year, and concludes that "success breeds
complacency." Give a simpler explanation that needs no story about complacency, and name
the phenomenon.

:::{admonition} Solution
:class: dropdown
Fund returns from one year to the next are imperfectly correlated (a lot of one year's
return is luck). Selecting the funds that were most extreme this year, the top 10 percent,
and measuring them again next year, you should expect them to drift back toward the
average purely by regression to the mean, no change in behavior required. The
"complacency" story is unnecessary. The phenomenon is regression to the mean, the same
effect behind Galton's heights and the magazine cover jinx.
:::
::::

## 4.8 Chapter summary

You can now describe a straight-line relationship with a single, unitless number and say
how much to trust it. You met the Pearson correlation as a standardized covariance, proved
it lives in $[-1, 1]$, tied it to the regression slope and to $R^2$, tested and
interval-ed the population value $\rho$, placed it inside the bivariate normal model,
softened it into Spearman's rank version, and learned the five ways it misleads:
nonlinearity, outliers, restriction of range, ecological aggregation, and the leap to
causation.

**Key results at a glance**

| Result | Statement or formula | Valid when |
|---|---|---|
| Pearson correlation (Def 4.1) | $r = S_{xy}/\sqrt{S_{xx} S_{yy}}$ | any paired numeric data |
| Bounds of $r$ (Thm 4.2) | $-1 \le r \le 1$; $r = \pm 1$ iff an exact line | always |
| Correlation, slope, $R^2$ (Thm 4.4) | $b_1 = r\, s_y/s_x$, $\ r^2 = R^2$ | simple linear regression |
| Correlation $t$ test (Thm 4.6) | $t^{\ast} = r\sqrt{n-2}/\sqrt{1-r^2} \sim t_{n-2}$ | $H_0:\rho = 0$, normal errors |
| Fisher $z$ distribution (Thm 4.7) | $z = \operatorname{arctanh}(r) \approx N(\operatorname{arctanh}\rho,\ \tfrac{1}{n-3})$ | bivariate normal, large $n$ |
| Bivariate normal conditional (Thm 4.9) | $E\{Y \mid x\} = \mu_Y + \rho\frac{\sigma_Y}{\sigma_X}(x-\mu_X)$, $\operatorname{Var} = \sigma_Y^2(1-\rho^2)$ | $(X, Y)$ bivariate normal |
| Spearman correlation (Def 4.10) | Pearson of the ranks | monotone order; ordinal data or outliers |

**Key terms.** **Correlation coefficient**, **sample covariance**, **correlation matrix**,
**coefficient of determination**, **Fisher's $z$ transformation**, **bivariate normal
distribution**, **conditional distribution**, **Spearman rank correlation**, **restriction
of range**, **ecological correlation** (and the **ecological fallacy**), **regression to
the mean**.

**You should now be able to**

- [ ] Compute the Pearson correlation $r$ by hand and with software, and read it as a unit-free standardized covariance.
- [ ] Derive the identity $b_1 = r\,s_y/s_x$ and show that $r^2 = R^2$.
- [ ] Test $\rho = 0$ with the $t$ statistic and build a confidence interval for $\rho$ with Fisher's $z$, checking it by simulation.
- [ ] State the bivariate normal model and read its population regression line and $1 - \rho^2$ leftover variance.
- [ ] Compute Spearman's rank correlation and decide when ranks are safer than raw values.
- [ ] Diagnose nonlinearity, outliers, restriction of range, and ecological correlation.
- [ ] Explain regression to the mean and why a strong correlation is still not evidence of causation.

**Where this fits.** In the modeling workflow of @ch02-workflow, correlation serves the
EXPLORE stage: before fitting anything, you look at how each pair of variables moves
together, and the correlation matrix is the numeric companion to the scatterplot. It
reaches into USE as well, through the inference for $\rho$ and the warnings that keep you
from turning a described association into a claimed cause. It builds directly on the
least-squares line of @ch02-least-squares and the ANOVA decomposition of
@ch03-anova-table, since $r$, $b_1$, and $R^2$ are three views of one fit. Its tools get
used again soon: the $r$-versus-$b_1$ identity of @ch04-r-and-slope returns in Chapter 12
as a check on an inflating $R^2$ (@ch12-criteria); the same savings data becomes a second
worked multiple regression in Chapter 8, where the strong `pop15`-`pop75` correlation you
saw in the matrix turns into a real collinearity problem; Libya's outsized pull becomes a
named influence diagnostic in Chapter 9 (@ch09-cooks-distance); and the "correlation is
not causation" thread is picked back up in Chapter 16 with the tools to reason carefully
about it (@ch16-path-diagrams).

## 4.9 Frequently asked questions

**Q1. Is a correlation of 0.5 twice as strong as 0.25?** Not in the sense that matters
most. If "strength" means share of variance explained, then $r = 0.5$ gives $r^2 = 0.25$
and $r = 0.25$ gives $r^2 = 0.0625$, so the first explains four times as much variance,
not twice. Correlation and variance-explained are different scales; always be clear which
one you mean.

**Q2. What is a "big" correlation?** It depends entirely on the field. In a tightly
controlled physics experiment $r = 0.95$ might be disappointing; in social science, where
outcomes have many causes, $r = 0.3$ can be a real and useful finding. There is no
universal threshold. Report the number, the interval, and the plot, and let the reader
judge against the norms of the subject.

**Q3. Correlation is symmetric but regression is not. Why?** Correlation asks whether two
variables move together and does not distinguish a response from a predictor, so
$r(X, Y) = r(Y, X)$. Regression singles out one variable as the response and minimizes
vertical distances to it, so swapping the roles changes which distances you minimize and
gives a different line. Their slopes multiply to $r^2$, meeting only when the fit is
perfect.

**Q4. If $r = 0$, are $X$ and $Y$ independent?** No. Zero correlation means no
straight-line association, but a strong curved relationship (a U-shape, a circle) can have
$r = 0$ while $X$ and $Y$ are anything but independent. Independence implies zero
correlation; the reverse holds only inside special models like the bivariate normal, where
$\rho = 0$ does force independence because the density factors.

**Q5. Which should I report, Pearson or Spearman?** Report Pearson when you care about
straight-line strength and the data are roughly linear with no wild outliers. Reach for
Spearman when the relationship is monotone but curved, when outliers are pulling Pearson
around, or when the variables are ordinal ranks to begin with. If the two disagree a lot,
that gap is a signal to plot the data and find out why, not to quietly pick the bigger
number.

**Q6. Why does the confidence interval for $\rho$ come out lopsided around $r$?** Because
the interval is built symmetrically on the Fisher $z$ scale and then bent back through
$\tanh$, which is nonlinear near the ends. For the savings data $r = -0.46$ sits at the
center of the symmetric $z$ interval, but after transforming back the bounds $(-0.65,
-0.20)$ are not equidistant from $-0.46$. That asymmetry is a feature: it respects the
hard walls at $\pm 1$ that a symmetric interval on the raw scale would ignore.

**Q7. Does a significant correlation mean the relationship is strong?** No. Significance
and strength are different things. With a large enough sample, a tiny correlation of
$0.05$ can be statistically significant, meaning "probably not exactly zero," while
explaining a quarter of one percent of the variance. Always read the size of $r$ and its
interval, not just the $p$-value; a small $p$ says the effect is real, not that it is big.

## 4.10 Practice problems

:::{note}
Unless a problem says otherwise, use `savings.csv` (n = 50) with the reference values
$r(\text{sr}, \text{pop15}) = -0.4555$, $b_1 = -0.223$, $R^2 = 0.2075$, and the 95 percent
Fisher interval $(-0.65, -0.20)$. Problems are marked (A) concepts, (B) theory, or (C)
data analysis. Odd-numbered answers appear in Appendix H; full solutions are in the
instructor materials.
:::

1. (A) In one sentence each, say what the sign and the size of a correlation tell you, and why $r$ has no units.
2. (A) A report gives $r = 0.8$ between two variables and calls it "80 percent agreement." Explain what is wrong and give the correct interpretation of $0.8$.
3. (A) The savings correlation between `sr` and `pop15` is $-0.46$. Interpret both the sign and the magnitude for a reader who has never seen a correlation.
4. (A) Explain why a correlation of exactly $0$ does not mean $X$ and $Y$ are unrelated. Sketch or describe a relationship with $r = 0$ that is nonetheless perfectly predictable.
5. (A) Give the four-question checklist you would run before trusting any reported correlation, and say which trap each question guards against.
6. (A) A weak correlation of $0.1$ is found between SAT score and college GPA, computed only among admitted students at a selective school. Name the trap and predict whether the full-population correlation is larger or smaller.
7. (A) Explain regression to the mean in your own words, and give an everyday example that is not heights or test scores.
8. (A) Why are the two regression slopes (of $Y$ on $X$ and of $X$ on $Y$) generally different, and when are they reciprocals of each other?
9. (B) Prove that $-1 \le r \le 1$ (Theorem 4.2) using the fact that $\sum(u_i \pm v_i)^2 \ge 0$ for the standardized values $u_i, v_i$. State the condition for equality and what it means geometrically.
10. (B) Derive the identity $b_1 = r\,s_y/s_x$ from the definitions $b_1 = S_{xy}/S_{xx}$ and $r = S_{xy}/\sqrt{S_{xx} S_{yy}}$.
11. (B) Show that $R^2 = r^2$ in simple linear regression (Theorem 4.4), starting from $\mathrm{SSR} = b_1^2 S_{xx}$ and $\mathrm{SSTO} = S_{yy}$.
12. (B) Prove that the two regression slopes satisfy $b_1 \cdot b_1' = r^2$, where $b_1'$ is the slope of $X$ on $Y$. Explain why this forces $|r| \le \sqrt{|b_1 b_1'|}$ to be an equality, not an inequality.
13. (B) Derive the correlation $t$ statistic $t^{\ast} = r\sqrt{n-2}/\sqrt{1-r^2}$ (Theorem 4.6) from the slope $t$ statistic $b_1/s\{b_1\}$, using $\mathrm{SSE} = S_{yy}(1 - r^2)$.
14. (B) Explain the delta-method argument behind Theorem 4.7: starting from $\operatorname{Var}(r) \approx (1-\rho^2)^2/n$, show that $g(\rho) = \operatorname{arctanh}(\rho)$ makes $\operatorname{Var}(g(r))$ approximately constant, and carry out the integral $\int d\rho/(1-\rho^2)$.
15. (B) In the bivariate normal, use the conditional-mean result (Theorem 4.9) to show that the population regression slope of $Y$ on $X$ is $\rho\,\sigma_Y/\sigma_X$, and that the fraction of $Y$'s variance left after conditioning on $X$ is $1 - \rho^2$.
16. (B) Show that if every $Y_i = a + b X_i$ exactly (a perfect line, $b \ne 0$), then $r = \operatorname{sign}(b)$. Which of the bound-derivation's equality conditions does this meet?
17. (B) A sample has $r = 0.6$ with $n = 19$. Compute the 95 percent Fisher confidence interval for $\rho$ by hand, showing the $z$, the standard error, and the back-transformation.
18. (B) Prove that Spearman's rank correlation equals $+1$ for any strictly increasing relationship $Y = h(X)$, not only a linear one, by considering what the ranks of $X$ and $Y$ look like.
19. (C) Load `savings.csv` and reproduce the full correlation matrix of `sr`, `pop15`, `pop75`, `dpi`, `ddpi`. Identify the strongest positive and strongest negative correlations and explain each in words.
20. (C) For `sr` and `pop75`, compute $r$, run the $t$ test, and build the Fisher 95 percent interval in R or Python. State whether the correlation is significant and interpret the interval.
21. (C) Confirm on the savings data that $b_1 = r\,s_y/s_x$ and $R^2 = r^2$ for the regression of `sr` on `dpi`. Report all four numbers.
22. (C) Compute both Pearson and Spearman correlations between `dpi` and `sr`. They differ; make the scatterplot and explain which countries drive the gap.
23. (C) Using `anscombe.csv`, reproduce the table showing all four sets share the same mean, correlation, and fitted line, then plot all four and describe how each departs (or not) from a straight line.
24. (C) Using `galton_heights.csv`, demonstrate restriction of range: compute the correlation on all children, then on the subset with midparent height between 68 and 70 inches, and report how much the correlation and the standard deviation of the parent height each shrink.
25. (C) Using `galton_heights.csv`, fit `childHeight ~ midparentHeight`, report the standardized slope, and explain the number as regression to the mean. Predict the height of a child whose midparent height is 3 standard deviations above the mean, in standard units.
26. (C) Simulate the sampling distribution of $r$ for $n = 15$ and $\rho = 0.6$ with 5000 draws (seed 4210), and check that the standard deviation of $\operatorname{arctanh}(r)$ is close to $1/\sqrt{n-3}$. Report both numbers.
27. (C) Aggregate `galton_heights.csv` by family and compare the individual-level and family-average correlations between midparent and child height. Explain the direction of the difference as an ecological effect.
28. (C) Take any pair from the savings data with a moderate correlation and delete the single most extreme point. Recompute $r$ and report how much it moved, then say whether that point qualifies as influential.

(ch04-exam-practice)=
## 4.11 Exam practice

These five questions are written in the style of the course exams. Every one asks you to
explain your reasoning in full sentences, not just to report a number, because that is how
the exams are graded: a bare value earns little credit, and clear reasoning with a small
slip earns most of it. Work each one on paper before you open the model answer. Where a
question shows software output, it is genuine output from the book's datasets.

### EP 4.1 Interpret the output in context

For the 50 countries in `savings.csv`, the savings rate `sr` is correlated with the share
of the population over 75, `pop75`. Here is the `cor.test` output.

```text
	Pearson's product-moment correlation

data:  savings$sr and savings$pop75
t = 2.3118, df = 48, p-value = 0.02513
alternative hypothesis: true correlation is not equal to 0
95 percent confidence interval:
 0.04186153 0.54670273
sample estimates:
      cor 
0.3165211 
```

Report the sample correlation and interpret its sign and size in the context of the two
variables. Say whether the correlation is significantly different from zero at the 5
percent level and how you read that from the output. Interpret the confidence interval,
explain in one sentence why it is not symmetric about the sample correlation, and say
whether the result shows that having more elderly people makes a country save more.

:::{admonition} Model answer
:class: dropdown
The sample correlation is $r = 0.317$, positive and moderate-to-weak. The positive sign
says the two move in the same direction: countries with a larger share of people over 75
tend to have higher savings rates, which is the pattern the life-cycle theory predicts for
the elderly. The size, about a third, is weak enough that the cloud would still look
fairly shapeless in a scatterplot; it is far from a tight line. The correlation is
significantly different from zero at the 5 percent level, because the $p$-value $0.025$ is
below $0.05$, and equivalently because the 95 percent confidence interval $(0.042, 0.547)$
does not contain zero. That interval is the set of population values $\rho$ consistent with
the data, and it is wide: the true correlation could be almost nothing ($0.04$) or
moderately strong ($0.55$), so the evidence is real but far from precise. The interval is
not symmetric about $r = 0.317$ because it is built symmetrically on the Fisher $z$ scale
and then bent back through $\tanh$, which is nonlinear and respects the hard wall at
$\rho = 1$. Finally, the result does not show that elderly people cause higher saving: this
is observational data, and income, culture, and especially the youth share (which
correlates $-0.908$ with `pop75`) sit behind both variables. A weak answer stops at
"positive and significant" without noting that the interval nearly touches zero, or reads
the correlation as proof of a cause.
:::

### EP 4.2 A student's claim

A classmate runs the correlation between the savings rate `sr` and the income growth rate
`ddpi` and gets the following.

```text
r = 0.3048   r^2 = 0.0929   t = 2.2171   p = 0.031385
```

She writes: "The correlation between income growth and saving is statistically significant
($p = 0.03$), so income growth is a strong driver of national saving." Evaluate her claim,
correcting every error you find.

:::{admonition} Model answer
:class: dropdown
Her sentence packs two distinct mistakes. The first is confusing significance with
strength. The small $p$-value tells us only that the population correlation is probably not
exactly zero; it says nothing about how large the association is. Here the correlation is
$r = 0.30$, and squaring it gives $r^2 = 0.09$, so income growth accounts for only about 9
percent of the country-to-country variation in savings rates, leaving 91 percent
unexplained. That is a weak relationship, not a strong one, however small the $p$-value.
With 50 countries even a modest correlation clears the significance bar. The second mistake
is the word "driver," which asserts causation from an observational correlation. A positive
correlation between growth and saving is equally consistent with saving fueling growth,
with a third factor such as overall economic development lifting both, or with coincidence.
The honest reading is that savings rates and income growth are weakly and positively
associated across these countries, an association unlikely to be pure sampling noise, and
that the data alone cannot tell us which way the causal arrow points or whether one exists.
A weak answer corrects only one of the two errors, typically catching the causation slip
but still accepting "strong," or the reverse.
:::

### EP 4.3 What would change if

Across all 934 children in `galton_heights.csv`, the correlation between midparent height
and child height is as follows.

```text
full_r = 0.321   full_n = 934   full_sd(midparent) = 1.802
```

Suppose you recomputed this correlation using only the families whose midparent height is
between 69.5 and 70.5 inches. Predict whether the correlation would rise, fall, or stay the
same, explain the mechanism, and say whether the underlying parent-child relationship has
changed.

:::{admonition} Model answer
:class: dropdown
The correlation would fall, and the underlying relationship would not change at all. This
is restriction of range. A correlation depends on how much the predictor varies: narrowing
the midparent heights to a one-inch band cuts their spread sharply, from a standard
deviation of $1.80$ down to about $0.30$, so the parent height now explains a much smaller
slice of the variation in child height even though each extra inch of parent height still
predicts the same fraction of an inch of child height. Recomputing on the band gives
$r = 0.109$ with only $221$ children, down from $0.321$ on the full data, roughly a third
of the original. The heredity itself is untouched: the regression slope, the biology, and
the scatter of children around the line are all the same. We simply stopped looking at
short and tall parents, and a relationship measured over a narrow slice of $X$ looks weaker
than the same relationship measured over the full range. This is exactly why a correlation
computed inside a selected group, such as admitted students or hired employees,
understates the association in the full population. A weak answer predicts the correlation
would rise, or concludes that the parent-child relationship itself weakened rather than
that only the sampled range of $X$ shrank.
:::

### EP 4.4 Explain why

For income growth `ddpi` against the savings rate `sr`, the two correlation coefficients
disagree, and one country stands out.

```text
pearson  = 0.3048   spearman = 0.4082
country    ddpi    sr
Libya     16.71   8.89
```

Explain why the Pearson and Spearman correlations differ here, using Libya to make the
mechanism concrete. Then say which of the two numbers is "correct" and what their
disagreement should prompt you to do.

:::{admonition} Model answer
:class: dropdown
Pearson and Spearman disagree because they read Libya very differently. Pearson works from
the raw values and effectively squares distances, so a point far from the crowd carries
outsized weight. Libya's income growth of $16.7$ percent is more than double any other
country's, which places it far to the right, while its savings rate of $8.9$ is
unremarkable. That combination, extreme in $X$ but ordinary in $Y$, pulls the
least-squares line toward the flat and drags the Pearson correlation down to $0.30$.
Spearman first replaces every value by its rank, so Libya becomes merely "rank 50 in
growth," one step beyond the next country; its enormous raw distance is compressed to a
single rank gap. Freed of that one leverage point, Spearman reports the stronger monotone
pattern, $0.41$, that holds among the other 49 countries. Neither number is the "correct"
one, because they answer different questions: Pearson measures straight-line strength and
counts Libya's distance, while Spearman measures monotone order and does not. Their
disagreement is itself information. It signals that an outlier or a curve is present, and
the right response is to plot the data and look at Libya before quoting either coefficient.
A weak answer declares one number simply right, or blames the gap on the sample size or
rounding instead of Libya's position as a high-leverage outlier in the growth variable.
:::

### EP 4.5 A student's claim about regression to the mean

The regression of child height on midparent height in `galton_heights.csv` gives the
following.

```text
r = 0.321   slope = 0.637   sd(midparent) = 1.802   sd(child) = 3.579
```

A student reasons: "Children of tall parents are on average shorter than their parents, so
tall families are reverting toward the average, and over enough generations everyone's
height will converge to the mean." Evaluate the reasoning, using the standardized slope,
and say what will actually happen to the spread of heights across generations.

:::{admonition} Model answer
:class: dropdown
The student has rediscovered Galton's own mistake. In standard units the slope equals the
correlation, $r = 0.321$, so a child is predicted only about a third of the way out from
the mean that the parents stood. That pull toward the average is real, but it is
arithmetic, not a biological force. It follows automatically whenever two measurements are
less than perfectly correlated: because part of a tall parent's height is transmissible and
part is chance, the children inherit only the transmissible part on average and so land
closer to the middle. Crucially, regression to the mean is symmetric and does not shrink
the population. Children of average parents include some very tall and some very short ones,
and extreme children are born to non-extreme parents just as often, which refills both
tails. The standard deviation of the children, $3.579$ inches, is not collapsing toward
zero; the height distribution stays about as spread out generation after generation. So the
"convergence to a single height" conclusion is wrong: there is no drift toward uniformity,
only a stable spread in which extreme cases on one side tend to be less extreme on the
other. The reasoning also quietly reads a cause into a correlation, which the data cannot
support. A weak answer accepts the idea of a reverting force or predicts the spread of
heights will shrink over time, missing that regression to the mean is a two-way
consequence of an imperfect correlation and leaves the population variance intact.
:::

## Chapter game

:::{admonition} Play the Chapter 4 game
:class: tip
Play the Chapter 4 game on your phone or laptop: 10 quick rounds, no setup.
[Open the game](../games/ch04.html). It drills the working skills of this chapter:
reading the sign and size of $r$ on the savings data, fitting a least-squares line by
eye and tying its slope to the correlation, ordering the Fisher $z$ steps for a
confidence interval, reading $1 - \rho^2$ inside the bivariate normal, telling Pearson
from Spearman, and spotting the outliers and traps that make a correlation lie.
:::

:::{admonition} Resumen del capítulo (en español)
:class: dropdown
Este capítulo trata la **correlación (correlation)**, el número entre $-1$ y $+1$ que
resume qué tan fuerte es la relación lineal entre dos variables. Usamos los datos de
ahorro de 50 países (`savings`): la tasa de ahorro `sr` frente a la proporción de
población joven `pop15`. El **coeficiente de Pearson (Pearson correlation)**
$r = S_{xy}/\sqrt{S_{xx} S_{yy}}$ es la covarianza estandarizada, sin unidades, y aquí
vale $-0.46$: más jóvenes, menos ahorro. Demostramos que $-1 \le r \le 1$ usando que una
suma de cuadrados nunca es negativa.

La correlación y la pendiente de regresión están ligadas exactamente: $b_1 = r\,s_y/s_x$
y $r^2 = R^2$, el **coeficiente de determinación**. Para `sr` frente a `pop15`,
$b_1 = -0.223$ y $R^2 = 0.2075$: la recta explica el 21 por ciento de la variación.

Para inferir sobre $\rho$, la prueba $t^{\ast} = r\sqrt{n-2}/\sqrt{1-r^2}$ resulta
idéntica a la prueba de la pendiente. El intervalo de confianza usa la **transformación
$z$ de Fisher**, $z = \operatorname{arctanh}(r) \approx N(\operatorname{arctanh}\rho,
1/(n-3))$, que estabiliza la varianza; una simulación lo confirma. Para el ahorro, el
intervalo del 95 por ciento para $\rho$ es $(-0.65, -0.20)$.

El **modelo normal bivariado** es el hogar natural de la correlación: sus contornos son
elipses y su media condicional $E\{Y\mid x\} = \mu_Y + \rho(\sigma_Y/\sigma_X)(x-\mu_X)$
es la recta de regresión poblacional. La **correlación de rangos de Spearman** aplica
Pearson a los rangos y resiste valores atípicos, como Libia en los datos de ahorro.

Finalmente vemos cómo miente la correlación: la no linealidad, los valores atípicos, la
**restricción del rango**, la **correlación ecológica**, y el salto a la causalidad. La
**regresión a la media**, ilustrada con las alturas de Galton, explica por qué los casos
extremos tienden a moderarse sin causa especial alguna. La correlación describe; no
demuestra causa.
:::
