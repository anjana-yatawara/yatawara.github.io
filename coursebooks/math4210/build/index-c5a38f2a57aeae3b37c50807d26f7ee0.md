---
title: "2. Simple linear regression"
subtitle: "MATH 4210, Chapter 2"
---

(ch02)=
# 2. Simple linear regression

:::{div}
:class: lang-toggle
[Leer en espanol](./es.md)
:::

The Toluca Company builds refrigeration equipment and the replacement parts that keep it
running. One part had long been produced in batches, or lots, of whatever size seemed
convenient at the time. When the company started a cost-cutting review, its engineers wanted
to settle a basic question: what lot size is cheapest to produce? Every production run carries
a fixed setup cost that does not care about lot size, plus machining and assembly work that
grows with the number of parts. To find the sweet spot, the engineers first needed one
ingredient: how do the labor hours a run consumes depend on the size of the lot?

They pulled records from 25 recent runs made under stable conditions over a six-month period.
Each record is a pair: the lot size (units produced) and the work hours the run took. The lot
sizes are all multiples of ten, a scheduling convenience, and they range from 20 to 120 units.
The scatter of these 25 points is the starting picture of the whole chapter.

```{figure} figures/fig_ch02_toluca_scatter.png
:name: fig-ch02-toluca-scatter
:alt: Scatterplot of the 25 Toluca production runs, work hours on the vertical axis against lot size on the horizontal axis, with an upward-sloping straight line fitted through the cloud of points. Work hours climb from roughly 110 at a lot size of 20 to over 500 at a lot size of 120, and the points scatter fairly evenly on both sides of the line.
The 25 Toluca runs with the least-squares line drawn through them. Bigger lots take more hours, the trend looks straight, and the scatter around the line is roughly the same width all across, which is exactly the situation this chapter models.
```

Two things stand out in @fig-ch02-toluca-scatter. Bigger lots take more hours, and the cloud of points is close enough to
a straight line that a line is a reasonable summary. But which line? An engineer could lay a
ruler on the plot and draw one by eye, and a second engineer would draw a slightly different
one. This chapter replaces the ruler with a rule: a precise, defensible recipe for the single
best line, an honest account of how much to trust it, and the assumptions that make the whole
enterprise valid. By the end you will be able to fit that line, read its slope in the units of
the problem (hours per unit of lot size), say how uncertain the slope is, and prove that under
stated conditions no competing method does better.

:::{admonition} This lesson at a glance
:class: important
- **What we are doing:** Fitting the single best straight line to the Toluca lot-size versus work-hours data by least squares, and proving the properties that make it trustworthy.
- **Why we are doing it:** A line drawn by eye is arbitrary; we need a precise, defensible recipe for the one best line and an honest account of how much to trust its slope.
- **Main objective:** State the simple linear regression model, derive and compute the least-squares estimates $b_0$ and $b_1$, and prove why they are the best linear unbiased estimators.
- **What changed from the last chapters:** Chapter 1 argued that regression is a way of thinking; from here it becomes a computable method. This is the first full pass around the ASK-EXPLORE-FIT-CHECK-USE workflow (@ch02-workflow) that this chapter names.
:::

:::{admonition} Learning objectives
:class: tip
By the end of this chapter you will be able to:
- **State** the simple linear regression model and its assumptions, and explain the job each assumption does.
- **Derive** the least-squares estimators $b_0$ and $b_1$ two ways: by calculus and by an algebraic identity.
- **Compute** $b_0$, $b_1$, fitted values, and residuals by hand on a small dataset and with software on the full one.
- **Prove** the algebraic properties of residuals and use them to check a fitted model.
- **Explain** why the error variance is estimated with the divisor $n-2$, deriving $E\{\mathrm{MSE}\} = \sigma^2$, and compute $\mathrm{MSE}$ and $s$.
- **Derive** the means and variances of $b_0$ and $b_1$, and prove the Gauss-Markov result that $b_1$ is the best linear unbiased estimator.
- **Show** that maximum likelihood under normal errors reproduces the least-squares estimates.
:::

(ch02-workflow)=
## The modeling workflow

Every chapter of this book is one pass through the same five-stage loop. Naming the stages now
gives you a map to carry through the whole course, and every later chapter opens by saying which
stage it serves.

- **ASK.** Fix the question and the data that can answer it. Here: how do work hours depend on lot size, and what can 25 production runs tell us?
- **EXPLORE.** Plot and summarize before fitting anything. The scatter in @fig-ch02-toluca-scatter is this stage; it is what tells us a straight line is even worth trying.
- **FIT.** Estimate the model. Most of this chapter lives here, turning the ruler-and-eye line into the single least-squares line.
- **CHECK.** Ask whether the fitted model can be trusted, using the residuals and the assumptions behind them. We begin this in Section 2.3 and devote all of Chapter 9 to it.
- **USE.** Interpret the estimates, predict, and decide. Reading the slope in hours per unit of lot size is the first taste; inference and prediction fill Chapter 3.

```{figure} figures/fig_ch02_workflow_loop.png
:name: fig-ch02-workflow-loop
:alt: A ring of five rounded boxes joined by clockwise arrows: ASK (question and data), EXPLORE (plot and summarize), FIT (estimate the model), CHECK (trust the fit?), and USE (interpret and predict). A dashed arrow curves from CHECK back to FIT, labeled a failed check sends you back.
The five stages as one loop. You move clockwise from ASK to USE, and a failed CHECK does not end the work: the dashed arrow sends you back to FIT or EXPLORE with a better model.
```

As @fig-ch02-workflow-loop shows, the stages form a loop, not a one-way street: a failed CHECK
sends you back to EXPLORE or FIT with a better model. Simple linear regression is the smallest
complete trip around this loop, which is why the course starts here.

(ch02-slr-model)=
## 2.1 The simple linear regression model

### Intuition

Regression starts from a plain idea: one thing tends to move with another, and we want to pin
that relationship down in numbers. Here we describe how a response $Y$ (Toluca work hours)
depends on a single predictor $X$ (lot size). No sane model claims the hours are an exact
function of lot size: two runs of the
same size took different amounts of time, because of tool wear, the crew on shift, the weather,
and a hundred small things nobody recorded. So we split each observation into two pieces: a
systematic part that lot size explains, and a random part that it does not.

The systematic part is a straight line. On average, a run of size $X$ takes some baseline
amount of time plus a fixed number of extra hours per additional unit. The random part is a
disturbance that pushes the actual hours above or below that average. We assume the disturbance
has no built-in tendency to be positive or negative, has the same typical size regardless of
lot size, and does not coordinate from one run to the next.

### Formula

The **simple linear regression model** (Definition 2.1) for observations $i = 1, \dots, n$ is

$$
Y_i = \beta_0 + \beta_1 X_i + \varepsilon_i .
$$

:::{admonition} Definition 2.1: Simple linear regression model
:class: note definition
For cases $i = 1, \dots, n$, the response, predictor, and error are related by
$Y_i = \beta_0 + \beta_1 X_i + \varepsilon_i$, where $\beta_0$ (intercept) and $\beta_1$ (slope)
are unknown constants, each $X_i$ is a known constant, and the errors satisfy
$E\{\varepsilon_i\} = 0$, $\operatorname{Var}\{\varepsilon_i\} = \sigma^2$, and
$\operatorname{Cov}\{\varepsilon_i, \varepsilon_j\} = 0$ for $i \neq j$.
:::

- $Y_i$ is the observed response in the $i$-th case (work hours for run $i$).
- $X_i$ is the predictor in the $i$-th case (lot size for run $i$), treated as a known, fixed constant. Some books call this the independent variable or the explanatory variable; this book says predictor throughout.
- $\beta_0$ is the intercept parameter: the mean response when $X = 0$.
- $\beta_1$ is the slope parameter: the change in the mean response for a one-unit increase in $X$.
- $\varepsilon_i$ is the random error in the $i$-th case, the amount by which $Y_i$ departs from its mean.

The parameters $\beta_0$ and $\beta_1$ are fixed numbers we do not know and want to estimate.
The model puts four conditions on the errors:

$$
E\{\varepsilon_i\} = 0, \qquad \operatorname{Var}\{\varepsilon_i\} = \sigma^2, \qquad
\operatorname{Cov}\{\varepsilon_i, \varepsilon_j\} = 0 \ (i \neq j).
$$

In words: each error averages to zero (the line is right on average), every error has the same
variance $\sigma^2$ (constant spread, called homoscedasticity), and distinct errors are
uncorrelated (one run's luck says nothing about another's). Notice what is not yet assumed: no
particular shape for the error distribution. Normality enters only in @ch02-mle, and only when
we want to build intervals and tests.

Because $X_i$ is a fixed constant and $\beta_0 + \beta_1 X_i$ is therefore also constant, the
error conditions transfer directly to the responses:

$$
E\{Y_i\} = \beta_0 + \beta_1 X_i, \qquad \operatorname{Var}\{Y_i\} = \sigma^2 .
$$

The quantity $E\{Y_i\}$ is the **mean response** at level $X_i$. The function
$E\{Y\} = \beta_0 + \beta_1 X$ that gives the mean response at any $X$ is the **regression
function** (Definition 2.2). It is a line, and estimating it is the whole game.

:::{admonition} Definition 2.2: Regression function
:class: note definition
The regression function is the mean response as a function of the predictor,
$E\{Y\} = \beta_0 + \beta_1 X$. In simple linear regression it is a straight line, and estimating
it is the goal of the whole chapter.
:::

@fig-ch02-slr-model is the
mental picture to carry through the chapter: a straight mean line, with a distribution of
possible $Y$ values stacked at each $X$, every stack the same width.

```{figure} figures/fig_ch02_slr_model.png
:name: fig-ch02-slr-model
:alt: A rising straight line labeled the mean line E of Y equals beta-zero plus beta-one X, with three identical bell-shaped curves drawn sideways at three lot sizes. Each bell is centered on the line and has the same width, showing that the response varies around the line by the same amount at every lot size.
The model in one picture: the mean of Y sits exactly on the line, and at every X the response scatters around that mean by the same amount. The bells are drawn identical on purpose, that is the constant-variance assumption.
```

:::{admonition} A note on symbols
:class: note
Throughout the book, Greek letters ($\beta_0, \beta_1, \sigma^2$) are unknown population
parameters, and Roman letters ($b_0, b_1, s^2$) are the estimates we compute from data. A hat
means an estimate or a prediction, so $\hat\beta_0$ and $b_0$ are two names for the same thing,
and $\hat{Y}_i$ is the estimated mean response. We write the normal distribution as
$N(\mu, \sigma^2)$, with the variance in the second slot.
:::

::::{admonition} Try it 2.1
:class: important
A classmate says "the model assumes $Y$ is a straight-line function of $X$." Correct the
statement so it is accurate, and name the assumption that the classmate dropped.

:::{admonition} Solution
:class: dropdown
The model does not say $Y$ is a straight-line function of $X$; it says the **mean** of $Y$ is a
straight-line function of $X$, that is $E\{Y_i\} = \beta_0 + \beta_1 X_i$. Any individual $Y_i$
sits off the line by the random error $\varepsilon_i$. The dropped piece is the error term and
its conditions, especially constant variance $\operatorname{Var}\{\varepsilon_i\} = \sigma^2$:
the points scatter around the line by the same amount at every $X$.
:::
::::

(ch02-least-squares)=
## 2.2 Least squares from first principles

### Intuition

We have a cloud of points and want the one line that fits best. "Best" needs a definition.
Least squares defines it by penalizing misses: for a candidate line, measure the vertical gap
from each point to the line, square the gaps so that overshooting and undershooting both count
as errors and large misses hurt disproportionately, and add them up. The best line is the one
that makes this total, the sum of squared errors, as small as possible. @fig-ch02-why-min-sse
shows the idea with three candidate lines through the Toluca data.

```{figure} figures/fig_ch02_why_min_sse.png
:name: fig-ch02-why-min-sse
:alt: The Toluca scatterplot with three candidate lines: a solid least-squares line through the middle of the cloud, a dashed too-shallow line that sits above the low points and below the high points, and a dotted too-steep line that does the reverse. A legend reports each line's SSE, with the least-squares line's value the smallest at about 54,825.
Three candidate lines and their sums of squared errors. The too-shallow and too-steep lines leave large vertical gaps and large SSE; the least-squares line threads the cloud and has the smallest SSE of any line.
```

### Formula

Write a candidate line with intercept $b_0$ and slope $b_1$. Its **sum of squared errors**
(Definition 2.3) is

$$
Q(b_0, b_1) = \sum_{i=1}^{n} \left( Y_i - b_0 - b_1 X_i \right)^2 .
$$

- $Y_i - b_0 - b_1 X_i$ is the vertical gap from the point $(X_i, Y_i)$ to the candidate line.
- $Q$ is a function of the two numbers $b_0, b_1$ we get to choose; the data are fixed.

:::{admonition} Definition 2.3: Least-squares criterion
:class: note definition
For a candidate line with intercept $b_0$ and slope $b_1$, the sum of squared errors is
$Q(b_0, b_1) = \sum_{i=1}^{n} (Y_i - b_0 - b_1 X_i)^2$. The **least-squares estimates** are the
values of $b_0$ and $b_1$ that minimize $Q$.
:::

The least-squares estimates $b_0$ and $b_1$ are the values that minimize $Q$. To write them
compactly, define the three basic sums of squares and cross-products around the means:

$$
S_{xx} = \sum_{i=1}^{n} (X_i - \bar{X})^2, \qquad
S_{xy} = \sum_{i=1}^{n} (X_i - \bar{X})(Y_i - \bar{Y}), \qquad
S_{yy} = \sum_{i=1}^{n} (Y_i - \bar{Y})^2,
$$

where $\bar{X}$ and $\bar{Y}$ are the sample means of the predictor and response. The next two
derivations establish the minimizers, stated here first.

:::{admonition} Theorem 2.4: Least-squares estimates
:class: important theorem
Under the simple linear regression model, if the $X_i$ are not all equal, the sum of squares
$Q(b_0, b_1)$ has a unique minimizer, the least-squares estimates
$$
b_1 = \frac{S_{xy}}{S_{xx}}, \qquad b_0 = \bar{Y} - b_1 \bar{X} .
$$
:::

### Derivation by calculus

**Proof (by calculus).** $Q(b_0, b_1)$ is a sum of squares, so it
is smooth and bounded below by zero. At a minimum, both partial derivatives vanish. Differentiate:

$$
\frac{\partial Q}{\partial b_0} = \sum_{i=1}^{n} 2\left(Y_i - b_0 - b_1 X_i\right)(-1), \qquad
\frac{\partial Q}{\partial b_1} = \sum_{i=1}^{n} 2\left(Y_i - b_0 - b_1 X_i\right)(-X_i).
$$

Setting each to zero and dividing by $-2$ gives the **normal equations**:

$$
\sum_{i=1}^n \left(Y_i - b_0 - b_1 X_i\right) = 0, \qquad
\sum_{i=1}^n X_i\left(Y_i - b_0 - b_1 X_i\right) = 0 .
$$

Expand the sums. The first equation becomes $\sum Y_i = n b_0 + b_1 \sum X_i$, and dividing by
$n$ gives $\bar{Y} = b_0 + b_1 \bar{X}$, so

$$
b_0 = \bar{Y} - b_1 \bar{X}.
$$

Substitute this into the second normal equation $\sum X_i Y_i = b_0 \sum X_i + b_1 \sum X_i^2$.
Replacing $b_0$ and collecting the $b_1$ terms,

$$
\sum X_i Y_i - \bar{Y}\sum X_i = b_1\left(\sum X_i^2 - \bar{X}\sum X_i\right).
$$

The left side equals $\sum X_i Y_i - n \bar{X}\bar{Y} = \sum (X_i - \bar X)(Y_i - \bar Y) = S_{xy}$,
and the right side's bracket equals $\sum X_i^2 - n\bar{X}^2 = \sum (X_i - \bar X)^2 = S_{xx}$.
Therefore

$$
b_1 = \frac{S_{xy}}{S_{xx}} .
$$

This is the only stationary point, and it is a minimum by the second-derivatives test for a
function of two variables (the same test you would use in calculus for one variable, extended to
two). The three second partial derivatives of $Q$ are constants:
$Q_{b_0 b_0} = 2n$, $Q_{b_1 b_1} = 2\sum X_i^2$, and $Q_{b_0 b_1} = 2\sum X_i$. Form the test
quantity $D = Q_{b_0 b_0}\,Q_{b_1 b_1} - (Q_{b_0 b_1})^2 = 4\big(n\sum X_i^2 - (\sum X_i)^2\big)
= 4n\,S_{xx}$. Since $D > 0$ whenever the $X_i$ are not all equal, and $Q_{b_0 b_0} = 2n > 0$, the
stationary point is a local minimum. Because $Q$ is a sum of squares (so it is bounded below by
zero) and this is its only stationary point, that local minimum is also the global minimum.
(Chapter 7 revisits this same fact in matrix form, once you have the tools of Chapter 6.) $\blacksquare$

### Derivation by an algebraic identity

The calculus argument finds the minimizer but leaves the geometry a little hidden. Here is a
second proof that uses no derivatives and shows directly that no line beats the least-squares
line. It rests on two facts we will prove in @ch02-residuals: writing the fitted values as
$\hat{Y}_i = b_0 + b_1 X_i$ and the residuals as $e_i = Y_i - \hat{Y}_i$, the residuals satisfy
$\sum e_i = 0$ and $\sum X_i e_i = 0$.

**Proof (by an algebraic identity).** Take any competing line with
intercept $a$ and slope $c$. Split the gap from each point to that line by routing it through
the least-squares fitted value:

$$
Y_i - a - c X_i = \underbrace{(Y_i - \hat{Y}_i)}_{e_i} + \underbrace{(\hat{Y}_i - a - c X_i)}_{g_i},
\qquad g_i = (b_0 - a) + (b_1 - c) X_i .
$$

Square and sum. The sum of squared errors for the competing line is

$$
\sum \left(Y_i - a - c X_i\right)^2 = \sum e_i^2 + \sum g_i^2 + 2 \sum e_i g_i .
$$

The cross term vanishes:

$$
\sum e_i g_i = (b_0 - a)\sum e_i + (b_1 - c)\sum X_i e_i = (b_0 - a)\cdot 0 + (b_1 - c)\cdot 0 = 0 .
$$

So for every competing line,

$$
\sum \left(Y_i - a - c X_i\right)^2 = \underbrace{\sum e_i^2}_{\text{SSE of the LS line}} + \sum g_i^2 \; \ge \; \sum e_i^2 ,
$$

with equality only when $\sum g_i^2 = 0$, that is when $g_i = 0$ for all $i$, which (since the
$X_i$ are not all equal) forces $a = b_0$ and $c = b_1$. The least-squares line is the unique
minimizer. $\blacksquare$

The two normal equations have a clean picture. Each one is a line in the $(b_0, b_1)$ plane,
and the least-squares estimates sit where they cross, at the bottom of the SSE bowl.
@fig-ch02-sse-surface shows the bowl and @fig-ch02-sse-contour shows it from above.

```{figure} figures/fig_ch02_sse_surface.png
:name: fig-ch02-sse-surface
:alt: A three-dimensional surface plot of SSE as a function of the intercept b0 and slope b1, shaped like a smooth bowl or valley. A red dot marks the single lowest point of the bowl, labeled as the minimum at b0 about 62.4 and b1 about 3.57.
Because SSE is a convex (bowl-shaped) function of the intercept and slope, it has exactly one lowest point, and that point is the least-squares solution. There are no other valleys to get stuck in.
```

```{figure} figures/fig_ch02_sse_contour.png
:name: fig-ch02-sse-contour
:alt: A contour map of SSE over the intercept b0 (horizontal) and slope b1 (vertical), showing nested elliptical contours. Two straight lines, a dashed one for the first normal equation and a dotted one for the second, cross at a red star marking the minimum at intercept about 62.4 and slope about 3.57.
The same SSE surface seen from directly above. Each normal equation is a straight line in the (b0, b1) plane; the two lines intersect at the star, the least-squares estimates, sitting at the center of the innermost contour.
```

:::{admonition} Key idea
:class: tip keyidea
Because $Q$ is a sum of squares, it is a convex bowl with exactly one lowest point. Least squares
therefore always has a single, unambiguous answer: there are no rival valleys to get trapped in,
and the two normal equations pin down that one point.
:::

### R

Fitting the model in R uses `lm`, which reads a formula `response ~ predictor`. First read the
data and look at it.

```r
toluca <- read.csv("data/toluca.csv")
dim(toluca)
head(toluca, 3)
```
```text
[1] 25  2
  lotsize hours
1      80   399
2      30   121
3      50   221
```

:::{admonition} Example 2.1: The Toluca least-squares line
:class: note
**Question.** What straight line best predicts work hours from lot size, and how many hours does
the model expect for a lot of 65 units?

**Intuition.** Fit the line that minimizes the total squared vertical gap, then read off its
intercept and slope, and plug in $X = 65$.

**Formula.** $b_1 = S_{xy}/S_{xx}$, $b_0 = \bar{Y} - b_1\bar{X}$, and the point estimate of the
mean response at $X = 65$ is $\hat{Y} = b_0 + b_1(65)$.

**Computation.**

```r
fit <- lm(hours ~ lotsize, data = toluca)
coef(fit)
predict(fit, newdata = data.frame(lotsize = 65))
```
```text
(Intercept)     lotsize
  62.365859    3.570202
      1
  294.429
```

The same numbers come straight out of the sums $S_{xx}$ and $S_{xy}$, confirming the formulas:

```r
x <- toluca$lotsize
y <- toluca$hours
Sxx <- sum((x - mean(x))^2)
Sxy <- sum((x - mean(x)) * (y - mean(y)))
b1 <- Sxy / Sxx
b0 <- mean(y) - b1 * mean(x)
round(c(Sxx = Sxx, Sxy = Sxy, b0 = b0, b1 = b1), 4)
```
```text
       Sxx        Sxy         b0         b1
19800.0000 70690.0000    62.3659     3.5702
```

Now in Python, with `statsmodels`' formula interface reading the same CSV.

```python
import numpy as np
import pandas as pd
import statsmodels.formula.api as smf

toluca = pd.read_csv("data/toluca.csv")
fit = smf.ols("hours ~ lotsize", data=toluca).fit()
print(fit.params)
print(fit.predict(pd.DataFrame({"lotsize": [65]})))
```
```text
Intercept    62.365859
lotsize       3.570202
dtype: float64
0    294.42899
dtype: float64
```

```python
x = toluca["lotsize"]
y = toluca["hours"]
Sxx = np.sum((x - x.mean()) ** 2)
Sxy = np.sum((x - x.mean()) * (y - y.mean()))
b1 = Sxy / Sxx
b0 = y.mean() - b1 * x.mean()
print(round(Sxx, 4), round(Sxy, 4), round(b0, 4), round(b1, 4))
```
```text
19800.0 70690.0 62.3659 3.5702
```

**Interpretation.** The fitted line is $\hat{Y} = 62.37 + 3.5702\,X$. The slope says that each
extra unit in a lot adds about $3.57$ work hours on average, over the observed range of lot
sizes (20 to 120). The intercept $62.37$ is the model's mean hours at a lot size of zero; since
no lot is anywhere near zero units, treat it as a mathematical anchor for the line, not a
physically meaningful "hours to make nothing." For a lot of 65 units the model expects about
$294$ work hours.
:::

Being able to reproduce `lm` from the raw sums $S_{xx}$ and $S_{xy}$ matters: it means you can
compute a regression anywhere, check software output, and, later, extend the idea when there is
no `lm` button for the model you need.

:::{admonition} Durable skill: Turn a vague goal into an optimization
:class: tip
"Fit the best line" is not yet a math problem; "choose $b_0, b_1$ to minimize
$\sum (Y_i - b_0 - b_1 X_i)^2$" is. The move that made regression tractable, naming a precise
loss and minimizing it, is the same move behind most of modern statistics and machine learning.
When you meet a new method, ask first: what quantity is it minimizing, and why that one? To
practice, take any "find the best" task you meet this term and write down the objective function
before you touch software.
:::

Small datasets are worth computing by hand once, so the formulas stop being black boxes. The
file `toluca_mini.csv` is a six-row slice of the Toluca data, small enough to do on paper.
@fig-ch02-hand-compute shows its points and their deviations from the means, the raw material
of $S_{xx}$ and $S_{xy}$.

```{figure} figures/fig_ch02_hand_compute.png
:name: fig-ch02-hand-compute
:alt: A scatterplot of six points from the hand-computation dataset with a vertical dashed line at the mean lot size and a horizontal dashed line at the mean work hours, dividing the plane into quadrants. For each point, short horizontal and vertical segments show its deviations from the two means; points in the upper-right and lower-left quadrants (positive cross-products) are green, and are the majority.
The six hand-computation points with the mean cross drawn in. A point's horizontal deviation times its vertical deviation is its contribution to Sxy; most points sit in the two quadrants where that product is positive, so Sxy and the slope come out positive.
```

:::{admonition} Example 2.2: Computing the estimates by hand
:class: note
**Question.** On the six-run mini dataset, find $b_0$ and $b_1$ from the deviation sums.

**Intuition.** With only six rows you can compute $\bar{X}$, $\bar{Y}$, then each deviation and
cross-product, then $S_{xx}$ and $S_{xy}$, and finally the two estimates.

**Formula.** $b_1 = S_{xy}/S_{xx}$ and $b_0 = \bar{Y} - b_1\bar{X}$, exactly as before.

**Computation.**

```r
mini <- read.csv("data/toluca_mini.csv")
xm <- mini$lotsize
ym <- mini$hours
Sxx_m <- sum((xm - mean(xm))^2)
Sxy_m <- sum((xm - mean(xm)) * (ym - mean(ym)))
b1_m <- Sxy_m / Sxx_m
b0_m <- mean(ym) - b1_m * mean(xm)
round(c(xbar = mean(xm), ybar = mean(ym),
        Sxx = Sxx_m, Sxy = Sxy_m, b0 = b0_m, b1 = b1_m), 4)
```
```text
     xbar      ybar       Sxx       Sxy        b0        b1
  81.6667  332.6667 1883.3333 7893.3333   -9.6106    4.1912
```

```python
mini = pd.read_csv("data/toluca_mini.csv")
xm = mini["lotsize"]
ym = mini["hours"]
Sxx_m = np.sum((xm - xm.mean()) ** 2)
Sxy_m = np.sum((xm - xm.mean()) * (ym - ym.mean()))
b1_m = Sxy_m / Sxx_m
b0_m = ym.mean() - b1_m * xm.mean()
print(round(xm.mean(), 4), round(ym.mean(), 4),
      round(Sxx_m, 4), round(Sxy_m, 4),
      round(b0_m, 4), round(b1_m, 4))
```
```text
81.6667 332.6667 1883.3333 7893.3333 -9.6106 4.1912
```

**Interpretation.** By hand the six-run fit is $\hat{Y} = -9.61 + 4.19\,X$. The slope $4.19$ is
in the same ballpark as the full data's $3.57$, but not equal, and the intercept swings
negative: six points pin a line far less firmly than 25, a first hint of the sampling
variability that the rest of the chapter quantifies. The lesson is not that the small answer is
wrong, it is that a slope estimate always comes with uncertainty, and less data means more of it.
:::

::::{admonition} Try it 2.2
:class: important
Using the printed sums in Example 2.2 ($S_{xx} = 1883.33$, $S_{xy} = 7893.33$,
$\bar{X} = 81.67$, $\bar{Y} = 332.67$), reproduce $b_1$ and $b_0$ with a calculator, then
predict the work hours for a lot of 100 units.

:::{admonition} Solution
:class: dropdown
$b_1 = S_{xy}/S_{xx} = 7893.33 / 1883.33 = 4.1912$. Then
$b_0 = \bar{Y} - b_1\bar{X} = 332.67 - 4.1912(81.67) = -9.61$. The prediction at $X = 100$ is
$\hat{Y} = -9.61 + 4.1912(100) = 409.5$ hours. (The full 25-run model would predict
$62.37 + 3.5702(100) = 419.4$ hours; the two disagree because six points estimate the line
loosely.)
:::
::::

(ch02-residuals)=
## 2.3 Fitted values and the properties of residuals

### Intuition

Once the line is fixed, every observed point splits into two parts. The **fitted value**
$\hat{Y}_i$ (Definition 2.5) is where the line says the point should be; the **residual**
$e_i = Y_i - \hat{Y}_i$ is how far the actual point lands from it. Residuals are the model's leftovers, the part of $Y$
that lot size did not explain. @fig-ch02-residual-segments draws them as the vertical sticks
connecting each point to the line. They are not just scenery: least squares forces the residuals
to satisfy exact algebraic identities, and those identities are both a proof tool and a
practical way to catch a mistake in a fit.

```{figure} figures/fig_ch02_residual_segments.png
:name: fig-ch02-residual-segments
:alt: The Toluca scatterplot with the fitted line and a vertical segment from every point to the line. Points above the line, with positive residuals, are drawn as orange circles with orange segments; points below the line, with negative residuals, are drawn as purple squares with purple segments. Above and below the line the segments look balanced in total length.
Each residual is the signed vertical distance from a point to the fitted line: positive (orange, above) or negative (purple, below). Least squares balances them so the signed residuals sum to exactly zero.
```

### Formula

The **fitted values** and **residuals** are

$$
\hat{Y}_i = b_0 + b_1 X_i, \qquad e_i = Y_i - \hat{Y}_i .
$$

- $\hat{Y}_i$ is the estimated mean response at $X_i$, the height of the fitted line there.
- $e_i$ is the residual, the vertical gap from the observed $Y_i$ down to the line.

:::{admonition} Definition 2.5: Fitted values and residuals
:class: note definition
The fitted value at $X_i$ is $\hat{Y}_i = b_0 + b_1 X_i$, the height of the least-squares line
there. The residual is $e_i = Y_i - \hat{Y}_i$, the signed vertical gap from the observed point
to that line.
:::

Do not confuse $e_i$ with the model error $\varepsilon_i = Y_i - (\beta_0 + \beta_1 X_i)$. The
error is the gap to the true, unknown line; the residual is the gap to our estimated line. We
never see $\varepsilon_i$, but we can always compute $e_i$, and it is our best stand-in.
@fig-ch02-error-vs-residual puts the two gaps side by side so the difference is impossible to
miss.

```{figure} figures/fig_ch02_error_vs_residual.png
:name: fig-ch02-error-vs-residual
:alt: Two side-by-side scatterplots of the same seven points. Left panel: a dashed true line labeled unknown, with orange vertical segments from each point to that line, marked as the errors epsilon i that are never observed. Right panel: a solid fitted line labeled computed, with red vertical segments from each point to that line, marked as the residuals e i that are always computable.
The one distinction to keep straight: the error is the gap to the true line we can never see (left), and the residual is the gap to the fitted line we compute from the data (right). Same points, two different lines, two different gaps.
```

### Derivation (properties of residuals)

:::{admonition} Theorem 2.6: Algebraic properties of the residuals
:class: important theorem
For the least-squares fit of a model with an intercept, the residuals satisfy
$$
\sum_{i=1}^{n} e_i = 0, \qquad \sum_{i=1}^{n} X_i e_i = 0, \qquad
\sum_{i=1}^{n} \hat{Y}_i e_i = 0, \qquad \sum_{i=1}^{n} \hat{Y}_i = \sum_{i=1}^{n} Y_i,
$$
and the fitted line passes through the point of means $(\bar{X}, \bar{Y})$.
:::

**Proof.** All of these follow from the two normal equations of
@ch02-least-squares.

1. **The residuals sum to zero.** The first normal equation is exactly
   $\sum (Y_i - b_0 - b_1 X_i) = \sum e_i = 0$.

2. **The predictor is orthogonal to the residuals.** The second normal equation is exactly
   $\sum X_i (Y_i - b_0 - b_1 X_i) = \sum X_i e_i = 0$.

3. **The fitted values are orthogonal to the residuals.** Using properties 1 and 2,
   $\sum \hat{Y}_i e_i = \sum (b_0 + b_1 X_i) e_i = b_0 \sum e_i + b_1 \sum X_i e_i = 0$.

4. **The fitted values reproduce the total of $Y$.** From property 1,
   $\sum e_i = \sum (Y_i - \hat{Y}_i) = 0$, so $\sum \hat{Y}_i = \sum Y_i$, and dividing by $n$,
   the mean fitted value equals $\bar{Y}$.

5. **The line passes through the center of the data.** Setting $X = \bar{X}$ in the fitted line
   and using $b_0 = \bar{Y} - b_1 \bar{X}$ gives $\hat{Y} = b_0 + b_1 \bar{X} = \bar{Y}$. So
   $(\bar{X}, \bar{Y})$ is always on the least-squares line. $\blacksquare$

Property 1 is why the vertical sticks in @fig-ch02-residual-segments balance out. Properties 1
and 2 were the ingredients that made the cross term vanish in the algebraic proof of
@ch02-least-squares, so the identities repay the loan we took there.

### R and Python

:::{admonition} Example 2.3: Checking the residual identities
:class: note
**Question.** Do the Toluca residuals really satisfy $\sum e_i = 0$, $\sum X_i e_i = 0$,
$\sum \hat{Y}_i e_i = 0$, and $\sum \hat{Y}_i = \sum Y_i$?

**Intuition.** Compute the residuals and fitted values from the fitted model and evaluate the
four sums. They should be zero (up to floating-point dust) and matching.

**Formula.** The four identities of the derivation above.

**Computation.**

```r
e <- residuals(fit)
yhat <- fitted(fit)
round(c(sum_e = sum(e),
        sum_x_times_e = sum(x * e),
        sum_yhat_times_e = sum(yhat * e)), 8)
round(c(sum_y = sum(y), sum_yhat = sum(yhat)), 4)
```
```text
           sum_e    sum_x_times_e sum_yhat_times_e
               0                0                0
   sum_y sum_yhat
    7807     7807
```

```python
e = fit.resid
yhat = fit.fittedvalues
print(round(np.sum(e), 8),
      round(np.sum(x * e), 8),
      round(np.sum(yhat * e), 8))
print(round(np.sum(y), 4), round(np.sum(yhat), 4))
```
```text
-0.0 -0.0 -0.0
7807 7807.0
```

**Interpretation.** All three orthogonality sums are zero (the `-0.0` in Python is floating-point
for exactly zero), and the fitted values total $7807$, the same as the observed hours. The
identities hold, as they must for any correct least-squares fit. If you ever compute a fit by
hand and $\sum e_i$ is not zero, you have made an arithmetic error, no diagnostics needed.
:::

A plot of the residuals against the predictor is the first picture to draw after any fit. If the
model's constant-variance and straight-line assumptions hold, the residuals should hover around
zero with no trend and no fanning, as in @fig-ch02-residual-plot. A curve would signal that the
relationship is not straight; a widening funnel would signal nonconstant variance. Chapter 9
builds a full diagnostic toolkit on this one habit.

```{figure} figures/fig_ch02_residual_plot.png
:name: fig-ch02-residual-plot
:alt: A scatterplot of the Toluca residuals on the vertical axis against lot size on the horizontal axis, with a dashed horizontal reference line at zero. The points scatter above and below zero with no clear trend and roughly even width across all lot sizes.
The Toluca residuals plotted against lot size. They sit in a flat, patternless band around zero with no funnel shape, which is the picture that supports the straight-line and constant-variance assumptions.
```

::::{admonition} Try it 2.3
:class: important
A colleague reports a fitted line for which the residuals sum to $14$, not zero, and insists the
fit is least squares. Without seeing the data, what can you conclude?

:::{admonition} Solution
:class: dropdown
The fit cannot be the least-squares fit of a model that includes an intercept. Property 1 says
$\sum e_i = 0$ exactly for the least-squares line, as a consequence of the first normal equation.
A nonzero residual sum means either the intercept was forced to some fixed value (a no-intercept
or constrained fit), or the coefficients are simply not the least-squares ones, or there is an
arithmetic error. In every case the reported line is not the ordinary least-squares fit.
:::
::::

(ch02-sigma)=
## 2.4 Estimating the error variance

### Intuition

The slope and intercept describe the line, but the model has a third unknown: $\sigma^2$, the
variance of the errors, which controls how tightly the points hug the line. A small $\sigma^2$
means predictions can be sharp; a large one means even a perfect line leaves big uncertainty.
We cannot see the errors $\varepsilon_i$, but the residuals $e_i$ are their visible stand-ins,
so we estimate $\sigma^2$ from the spread of the residuals. @fig-ch02-sigma-intuition shows what
that spread looks like as a band around the fitted line.

```{figure} figures/fig_ch02_sigma_intuition.png
:name: fig-ch02-sigma-intuition
:alt: The Toluca scatterplot with the fitted line and two shaded bands around it, a darker inner band at plus or minus one estimated standard deviation s and a lighter outer band at plus or minus two s. Most points fall inside the inner band and nearly all inside the outer band. An inset histogram in the corner shows the residuals spread symmetrically around zero.
The estimated error spread s = 48.8 hours drawn as bands around the fitted line. About two-thirds of the runs fall within one s of the line and almost all within two s; s summarizes the width of the residual histogram in the inset.
```

### Formula

The **error sum of squares** (Definition 2.7) and the estimator of $\sigma^2$ are

$$
\mathrm{SSE} = \sum_{i=1}^{n} e_i^2 = \sum_{i=1}^{n} (Y_i - \hat{Y}_i)^2, \qquad
s^2 = \mathrm{MSE} = \frac{\mathrm{SSE}}{n-2}, \qquad s = \sqrt{\mathrm{MSE}} .
$$

- $\mathrm{SSE}$ is the total squared residual, the leftover variation the line did not explain.
- $\mathrm{MSE}$ (mean square error), also written $s^2$, is $\mathrm{SSE}$ divided by its degrees
  of freedom $n-2$; it estimates $\sigma^2$.
- $s$ is the estimated standard deviation of the errors, in the units of $Y$ (hours).

:::{admonition} Definition 2.7: Error sum of squares and mean square error
:class: note definition
The **error sum of squares** is $\mathrm{SSE} = \sum_{i=1}^{n} e_i^2$. The **mean square error**
$s^2 = \mathrm{MSE} = \mathrm{SSE}/(n-2)$ estimates the error variance $\sigma^2$, and
$s = \sqrt{\mathrm{MSE}}$ estimates the error standard deviation, in the units of $Y$.
:::

The divisor is $n-2$, not $n$ or $n-1$. Two degrees of freedom are spent estimating the two
coefficients $b_0$ and $b_1$ that define the line the residuals are measured from. The next
derivation shows that this exact divisor, and no other, makes $\mathrm{MSE}$ correct on average.

### Derivation (why the divisor is $n-2$)

:::{admonition} Theorem 2.8: Unbiasedness of the mean square error
:class: important theorem
Under the simple linear regression model, $E\{\mathrm{SSE}\} = (n-2)\sigma^2$, so that
$E\{\mathrm{MSE}\} = \sigma^2$. The divisor $n-2$ is exactly what makes $\mathrm{MSE}$ an unbiased
estimator of the error variance.
:::

**Proof.** We show $E\{\mathrm{SSE}\} = (n-2)\sigma^2$, so
that dividing by $n-2$ gives an estimator that is right on average. Start from a tidy identity
for SSE. Since $\hat{Y}_i = \bar{Y} + b_1(X_i - \bar{X})$ (using $b_0 = \bar{Y} - b_1 \bar X$),

$$
e_i = Y_i - \hat{Y}_i = (Y_i - \bar{Y}) - b_1 (X_i - \bar{X}),
$$

so, expanding the square and using $S_{xy} = b_1 S_{xx}$,

$$
\mathrm{SSE} = \sum e_i^2 = S_{yy} - 2 b_1 S_{xy} + b_1^2 S_{xx}
= S_{yy} - 2 b_1 (b_1 S_{xx}) + b_1^2 S_{xx} = S_{yy} - b_1^2 S_{xx}.
$$

Take expectations of the two pieces. For any random variable, $E\{W^2\} = \operatorname{Var}\{W\} + (E\{W\})^2$.

*The slope piece.* We show in @ch02-gauss-markov-slr that $E\{b_1\} = \beta_1$ and
$\operatorname{Var}\{b_1\} = \sigma^2 / S_{xx}$. Hence

$$
E\{b_1^2 S_{xx}\} = S_{xx}\left(\operatorname{Var}\{b_1\} + (E\{b_1\})^2\right)
= S_{xx}\left(\frac{\sigma^2}{S_{xx}} + \beta_1^2\right) = \sigma^2 + \beta_1^2 S_{xx}.
$$

*The total piece.* Write $S_{yy} = \sum Y_i^2 - n\bar{Y}^2$. Each $Y_i$ has mean
$\mu_i = \beta_0 + \beta_1 X_i$ and variance $\sigma^2$, so $E\{Y_i^2\} = \sigma^2 + \mu_i^2$ and
$E\{\sum Y_i^2\} = n\sigma^2 + \sum \mu_i^2$. The sample mean $\bar{Y}$ has mean
$\bar{\mu} = \beta_0 + \beta_1 \bar{X}$ and variance $\sigma^2/n$, so
$E\{n\bar{Y}^2\} = n(\sigma^2/n + \bar{\mu}^2) = \sigma^2 + n\bar{\mu}^2$. Subtracting,

$$
E\{S_{yy}\} = n\sigma^2 + \sum \mu_i^2 - \sigma^2 - n\bar{\mu}^2
= (n-1)\sigma^2 + \left(\sum \mu_i^2 - n\bar{\mu}^2\right).
$$

The final bracket is $\sum (\mu_i - \bar{\mu})^2 = \sum \big(\beta_1 (X_i - \bar{X})\big)^2 = \beta_1^2 S_{xx}$.
So $E\{S_{yy}\} = (n-1)\sigma^2 + \beta_1^2 S_{xx}$.

*Combine.* Subtracting the slope piece from the total piece,

$$
E\{\mathrm{SSE}\} = E\{S_{yy}\} - E\{b_1^2 S_{xx}\}
= \big[(n-1)\sigma^2 + \beta_1^2 S_{xx}\big] - \big[\sigma^2 + \beta_1^2 S_{xx}\big] = (n-2)\sigma^2 .
$$

Therefore $E\{\mathrm{MSE}\} = E\{\mathrm{SSE}\}/(n-2) = \sigma^2$: the divisor $n-2$ is exactly
what makes $\mathrm{MSE}$ an unbiased estimator of $\sigma^2$. $\blacksquare$

### R and Python

:::{admonition} Example 2.4: The estimated error spread for Toluca
:class: note
**Question.** How much do work hours vary around the fitted line, in hours?

**Intuition.** Sum the squared residuals to get SSE, divide by $n-2 = 23$ to get MSE, and take
the square root for $s$, the typical size of a residual in hours.

**Formula.** $\mathrm{SSE} = \sum e_i^2$, $\mathrm{MSE} = \mathrm{SSE}/(n-2)$, $s = \sqrt{\mathrm{MSE}}$.

**Computation.**

```r
n <- nrow(toluca)
SSE <- sum(e^2)
MSE <- SSE / (n - 2)
s <- sqrt(MSE)
round(c(n = n, SSE = SSE, MSE = MSE, s = s), 2)
```
```text
       n      SSE      MSE        s
   25.00 54825.46  2383.72    48.82
```

```python
n = len(toluca)
SSE = np.sum(e ** 2)
MSE = SSE / (n - 2)
s = np.sqrt(MSE)
print(n, round(SSE, 2), round(MSE, 2), round(s, 2))
```
```text
25 54825.46 2383.72 48.82
```

**Interpretation.** The error sum of squares is $\mathrm{SSE} = 54{,}825$, giving
$\mathrm{MSE} = 2384$ and $s = 48.8$ hours. So even knowing a run's lot size, the model's
prediction of its hours is typically off by around 49 hours. Compared with a mean of about 312
hours, that is substantial run-to-run variability, and it is the raw material for every standard
error in the next section.
:::

::::{admonition} Try it 2.4
:class: important
Suppose a careless analyst divides SSE by $n = 25$ instead of $n - 2 = 23$. What value of $s^2$
would they report, and would it be too large or too small as an estimate of $\sigma^2$?

:::{admonition} Solution
:class: dropdown
They would report $54{,}825 / 25 = 2193$, smaller than the correct $\mathrm{MSE} = 2384$.
Dividing by too large a number makes the estimate too small, so on average it understates
$\sigma^2$: this is a biased (low) estimate. That value $2193$ is exactly the maximum-likelihood
estimate of $\sigma^2$ from @ch02-mle, which is why the book uses $n-2$ for inference instead.
:::
::::

(ch02-gauss-markov-slr)=
## 2.5 Sampling behavior and the Gauss-Markov theorem

### Intuition

The estimates $b_0$ and $b_1$ are computed from a particular sample of 25 runs. A different 25
runs, made under the same conditions, would give slightly different estimates. So $b_0$ and
$b_1$ are themselves random: they have distributions, called sampling distributions, across the
repeated samples we could have drawn. @fig-ch02-sampling-lines makes this concrete by simulating
60 fresh samples at the Toluca lot sizes and fitting each: the fitted lines scatter around the
true mean line, and they fan out most where $X$ is far from $\bar{X}$.

```{figure} figures/fig_ch02_sampling_lines.png
:name: fig-ch02-sampling-lines
:alt: The plotting region shows sixty faint blue fitted lines, each from a different simulated sample using the same lot sizes, forming a bundle that is narrow near the middle lot size and fans out toward both ends. A bold red line, the true mean line, runs through the center of the bundle. A vertical dotted line marks the mean lot size where the bundle is tightest.
Sixty samples, sixty fitted lines. They cluster around the true mean line (red) with no systematic offset, and the bundle pinches in at the mean lot size and widens at the extremes, which is exactly what the variance formulas predict.
```

Two questions organize this section. Are $b_0$ and $b_1$ correct on average (unbiased)? And how
much do they vary from sample to sample (their variances)? The Gauss-Markov theorem then
delivers a strong payoff: among all the sensible estimators one might invent, least squares has
the smallest variance.

### Formula

Both estimators are unbiased, and their variances are

$$
E\{b_1\} = \beta_1, \quad \operatorname{Var}\{b_1\} = \frac{\sigma^2}{S_{xx}}; \qquad
E\{b_0\} = \beta_0, \quad \operatorname{Var}\{b_0\} = \sigma^2\left(\frac{1}{n} + \frac{\bar{X}^2}{S_{xx}}\right).
$$

:::{admonition} Theorem 2.9: Means and variances of the least-squares estimators
:class: important theorem
Under the simple linear regression model, $b_0$ and $b_1$ are unbiased, with
$$
E\{b_1\} = \beta_1, \quad \operatorname{Var}\{b_1\} = \frac{\sigma^2}{S_{xx}}; \qquad
E\{b_0\} = \beta_0, \quad \operatorname{Var}\{b_0\} = \sigma^2\left(\frac{1}{n} + \frac{\bar{X}^2}{S_{xx}}\right).
$$
:::

- $\operatorname{Var}\{b_1\} = \sigma^2/S_{xx}$ shrinks when the errors are small ($\sigma^2$ low)
  or the predictor is spread wide ($S_{xx}$ large). Spreading your $X$ values out buys precision.
- $\operatorname{Var}\{b_0\}$ carries an extra $\bar{X}^2/S_{xx}$ term because the intercept lives
  far off at $X = 0$, and tilting the line pivots it there.

@fig-ch02-xspread-precision makes the first fact visible. When the lot sizes are bunched together,
a little noise tips the slope wildly; when they are spread wide, the same noise barely moves it.

```{figure} figures/fig_ch02_xspread_precision.png
:name: fig-ch02-xspread-precision
:alt: Two side-by-side plots, each showing forty faint blue fitted lines from repeated samples plus a bold red true line, with green tick marks along the bottom showing where the lot sizes sit. Left panel, bunched lot sizes near the center, small Sxx of 407: the blue lines fan out into a wide wobbly bundle, standard error of the slope 2.23. Right panel, lot sizes spread from 20 to 120, large Sxx of 10185: the blue lines cluster tightly around the true line, standard error of the slope 0.45.
Why spreading X out buys precision. Both panels use the same true line and the same error size; only the spread of the lot sizes differs. Wide spread (right) makes Sxx large, and since the slope variance is sigma squared over Sxx, the slope is pinned down far more tightly.
```

Replacing the unknown $\sigma^2$ by its estimate $\mathrm{MSE}$ gives the **estimated variances**
$s^2\{b_1\} = \mathrm{MSE}/S_{xx}$ and $s^2\{b_0\} = \mathrm{MSE}\big(1/n + \bar{X}^2/S_{xx}\big)$,
whose square roots are the standard errors $s\{b_1\}$ and $s\{b_0\}$ that software prints.

### Derivation (unbiasedness and variances)

**Proof (mean and variance of $b_1$).** The key is to write $b_1$
as a weighted sum of the responses. Since $\sum (X_i - \bar{X}) \bar{Y} = 0$,

$$
b_1 = \frac{S_{xy}}{S_{xx}} = \frac{\sum (X_i - \bar{X})(Y_i - \bar{Y})}{S_{xx}}
= \sum_{i=1}^n k_i Y_i, \qquad k_i = \frac{X_i - \bar{X}}{S_{xx}} .
$$

The weights $k_i$ depend only on the fixed $X$ values and satisfy three facts, each a one-line
computation:

$$
\sum k_i = \frac{\sum (X_i - \bar X)}{S_{xx}} = 0, \qquad
\sum k_i X_i = \frac{\sum (X_i - \bar X)X_i}{S_{xx}} = \frac{S_{xx}}{S_{xx}} = 1, \qquad
\sum k_i^2 = \frac{\sum (X_i - \bar X)^2}{S_{xx}^2} = \frac{1}{S_{xx}} .
$$

*Unbiasedness.* Using $E\{Y_i\} = \beta_0 + \beta_1 X_i$,

$$
E\{b_1\} = \sum k_i E\{Y_i\} = \beta_0 \sum k_i + \beta_1 \sum k_i X_i = \beta_0 (0) + \beta_1 (1) = \beta_1 .
$$

*Variance.* The $Y_i$ are uncorrelated with common variance $\sigma^2$, so variances of a
weighted sum add with squared weights:

$$
\operatorname{Var}\{b_1\} = \sum k_i^2 \operatorname{Var}\{Y_i\} = \sigma^2 \sum k_i^2 = \frac{\sigma^2}{S_{xx}} . \qquad \blacksquare
$$

**Proof (mean and variance of $b_0$).** Write $b_0 = \bar{Y} - b_1 \bar{X} = \sum m_i Y_i$ with
$m_i = \tfrac{1}{n} - \bar{X} k_i$. Then $\sum m_i = 1$ and $\sum m_i X_i = \bar X - \bar X = 0$,
so $E\{b_0\} = \beta_0 \sum m_i + \beta_1 \sum m_i X_i = \beta_0$. For the variance, using
$\sum k_i = 0$ and $\sum k_i^2 = 1/S_{xx}$,

$$
\operatorname{Var}\{b_0\} = \sigma^2 \sum m_i^2 = \sigma^2 \sum \left(\frac{1}{n} - \bar{X} k_i\right)^2
= \sigma^2 \left(\frac{1}{n} - \frac{2\bar X}{n}\sum k_i + \bar{X}^2 \sum k_i^2\right)
= \sigma^2 \left(\frac{1}{n} + \frac{\bar{X}^2}{S_{xx}}\right). \qquad \blacksquare
$$

### Derivation (Gauss-Markov: $b_1$ is BLUE)

:::{admonition} Theorem 2.10: Gauss-Markov theorem (simple linear regression)
:class: important theorem
Under the simple linear regression model (linear mean, constant variance, uncorrelated errors,
with no normality assumed), among all estimators of $\beta_1$ that are linear in the $Y_i$ and
unbiased, the least-squares estimator $b_1$ has the smallest variance; the same holds for $b_0$.
We say $b_0$ and $b_1$ are the **best linear unbiased estimators (BLUE)**.
:::

**Proof.** Consider any linear estimator $\hat\beta_1^{\ast} = \sum c_i Y_i$ with fixed
weights $c_i$. Its expectation is $\sum c_i(\beta_0 + \beta_1 X_i) = \beta_0 \sum c_i + \beta_1 \sum c_i X_i$.
For this to equal $\beta_1$ for *every* possible $\beta_0$ and $\beta_1$, the weights must satisfy

$$
\sum c_i = 0 \qquad \text{and} \qquad \sum c_i X_i = 1 .
$$

Write $c_i = k_i + d_i$, splitting each weight into the least-squares weight $k_i$ and a
deviation $d_i$. Because both $c_i$ and $k_i$ satisfy the two unbiasedness constraints, the
deviations satisfy $\sum d_i = 0$ and $\sum d_i X_i = 0$. Now the cross term drops out:

$$
\sum k_i d_i = \sum \frac{X_i - \bar X}{S_{xx}} d_i = \frac{1}{S_{xx}}\left(\sum X_i d_i - \bar X \sum d_i\right) = \frac{1}{S_{xx}}(0 - 0) = 0 .
$$

Therefore

$$
\operatorname{Var}\{\hat\beta_1^{\ast}\} = \sigma^2 \sum c_i^2 = \sigma^2 \sum (k_i + d_i)^2
= \sigma^2 \sum k_i^2 + \sigma^2 \sum d_i^2 = \operatorname{Var}\{b_1\} + \sigma^2 \sum d_i^2 .
$$

Since $\sigma^2 \sum d_i^2 \ge 0$, every linear unbiased competitor has variance at least that of
$b_1$, with equality only when all $d_i = 0$, that is when the competitor *is* $b_1$. The
least-squares slope is BLUE. The same argument with weights $m_i$ shows $b_0$ is BLUE. $\blacksquare$

:::{admonition} Key idea
:class: tip keyidea
The Gauss-Markov theorem buys optimality cheaply. It uses only that the errors have mean zero, a
common variance, and no correlation; it never assumes a normal distribution. So before any
distributional model is in play, least squares is already the best you can do among linear
unbiased estimators.
:::

### R and Python

:::{admonition} Example 2.5: Standard errors of the Toluca coefficients
:class: note
**Question.** How precisely are the intercept and slope pinned down by these 25 runs?

**Intuition.** Plug $\mathrm{MSE}$, $S_{xx}$, $n$, and $\bar{X}$ into the estimated-variance
formulas and take square roots to get standard errors, in the coefficients' own units.

**Formula.** $s\{b_1\} = \sqrt{\mathrm{MSE}/S_{xx}}$ and
$s\{b_0\} = \sqrt{\mathrm{MSE}\,(1/n + \bar{X}^2/S_{xx})}$.

**Computation.**

```r
var_b1 <- MSE / Sxx
var_b0 <- MSE * (1 / n + mean(x)^2 / Sxx)
round(c(se_b0 = sqrt(var_b0), se_b1 = sqrt(var_b1)), 4)
```
```text
  se_b0   se_b1
26.1774  0.3470
```

```python
var_b1 = MSE / Sxx
var_b0 = MSE * (1 / n + x.mean() ** 2 / Sxx)
print(round(np.sqrt(var_b0), 4), round(np.sqrt(var_b1), 4))
```
```text
26.1774 0.347
```

These are the same standard errors the built-in summary prints, alongside much more we will
decode in Chapter 3.

```r
summary(fit)
```
```text
Call:
lm(formula = hours ~ lotsize, data = toluca)

Residuals:
    Min      1Q  Median      3Q     Max
-83.876 -34.088  -5.982  38.826 103.528

Coefficients:
            Estimate Std. Error t value Pr(>|t|)
(Intercept)   62.366     26.177   2.382   0.0259 *
lotsize        3.570      0.347  10.290 4.45e-10 ***
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 48.82 on 23 degrees of freedom
Multiple R-squared:  0.8215,	Adjusted R-squared:  0.8138
F-statistic: 105.9 on 1 and 23 DF,  p-value: 4.449e-10
```

```python
print(fit.summary())
```
```text
                 coef    std err          t      P>|t|      [0.025      0.975]
------------------------------------------------------------------------------
Intercept     62.3659     26.177      2.382      0.026       8.214     116.518
lotsize        3.5702      0.347     10.290      0.000       2.852       4.288
==============================================================================
```

**Interpretation.** The slope's standard error is $s\{b_1\} = 0.347$ hours per unit: the estimate
$3.57$ is known to well within an hour-per-unit, which is why the summary flags it as clearly
nonzero. The intercept's standard error is $26.18$, much larger, which is nothing surprising:
the intercept sits far from the data at $X = 0$, so it is estimated loosely. Both match the hand
computation exactly and match `summary` and `fit.summary()`.
:::

The variance formulas are not just algebra; they describe the fanning bundle of lines in
@fig-ch02-sampling-lines. We can confirm both the unbiasedness and the slope-variance formula by
simulation, drawing 5000 samples from the estimated model and refitting each.
@fig-ch02-b1-sampling-hist shows the histogram of the 5000 slope estimates.

```{figure} figures/fig_ch02_b1_sampling_hist.png
:name: fig-ch02-b1-sampling-hist
:alt: A histogram of 5000 simulated slope estimates, roughly bell-shaped and centered near 3.57. An overlaid normal curve with standard deviation 0.347 matches the histogram closely. A dashed red vertical line marks the true slope 3.5702 and a dotted green line marks the mean of the estimates, and the two lines nearly coincide.
Five thousand simulated slope estimates. Their average lands on the true slope (the dashed and dotted lines nearly coincide), confirming unbiasedness, and their spread matches the theoretical sigma over root Sxx curve, confirming the variance formula.
```

```r
set.seed(4210)
beta0 <- 62.366; beta1 <- 3.5702; sigma <- 48.82
xfix <- toluca$lotsize
Sxx_fix <- sum((xfix - mean(xfix))^2)
b1_sim <- replicate(5000, {
  ysim <- beta0 + beta1 * xfix + rnorm(length(xfix), 0, sigma)
  coef(lm(ysim ~ xfix))[["xfix"]]
})
round(c(mean_of_b1_hats = mean(b1_sim),
        true_beta1 = beta1,
        sd_of_b1_hats = sd(b1_sim),
        formula_se = sqrt(sigma^2 / Sxx_fix)), 4)
```
```text
mean_of_b1_hats      true_beta1   sd_of_b1_hats      formula_se
         3.5699          3.5702          0.3479          0.3469
```

```python
rng = np.random.default_rng(4210)
beta0, beta1, sigma = 62.366, 3.5702, 48.82
xfix = toluca["lotsize"].to_numpy()
Sxx_fix = np.sum((xfix - xfix.mean()) ** 2)
b1_hats = np.empty(5000)
for i in range(5000):
    ysim = beta0 + beta1 * xfix + rng.normal(0, sigma, size=xfix.size)
    b1_hats[i] = np.polyfit(xfix, ysim, 1)[0]
print(round(b1_hats.mean(), 4), beta1,
      round(b1_hats.std(ddof=1), 4),
      round(np.sqrt(sigma ** 2 / Sxx_fix), 4))
```
```text
3.5675 3.5702 0.352 0.3469
```

The average of the 5000 slope estimates sits right on $\beta_1 = 3.5702$ (unbiasedness), and
their simulated standard deviation, $0.348$ in R and $0.352$ in Python, matches the formula
value $\sigma/\sqrt{S_{xx}} = 0.347$. The two languages differ only in the last digit because
they use different random number generators; the agreement with theory is the point.

:::{admonition} Durable skill: Check a formula by simulating it
:class: tip
When a derivation hands you a formula for a mean or a variance, you can test it without more
algebra: generate many datasets from a known model, compute the estimate on each, and compare
the pile of estimates to what the formula predicted. If the simulated average and spread match,
your derivation and your code probably agree. This habit, letting a random experiment audit a
theoretical claim, transfers to every quantitative field and is exactly how you will sanity-check
your own analyses long after this course.
:::

::::{admonition} Try it 2.5
:class: important
For the Toluca fit, $S_{xx} = 19{,}800$ and $\mathrm{MSE} = 2384$. Use the variance formula to
compute $s^2\{b_1\}$ by hand, then explain in one sentence why spreading the lot sizes out more
(increasing $S_{xx}$) would shrink $s^2\{b_1\}$.

:::{admonition} Solution
:class: dropdown
$s^2\{b_1\} = \mathrm{MSE}/S_{xx} = 2384/19{,}800 = 0.1204$, so $s\{b_1\} = \sqrt{0.1204} = 0.347$,
matching Example 2.5. Because $S_{xx}$ sits in the denominator of
$\operatorname{Var}\{b_1\} = \sigma^2/S_{xx}$, a larger $S_{xx}$ divides $\sigma^2$ into a smaller
number: doubling $S_{xx}$ would cut $s^2\{b_1\}$ exactly in half. Spreading the predictor values
farther apart pins the slope down more tightly, for the same error variance $\sigma^2$.
:::
::::

(ch02-mle)=
## 2.6 Maximum likelihood under normal errors

### Intuition

So far we chose least squares because squared error is a reasonable penalty, and Gauss-Markov
rewarded that choice with the best-linear-unbiased property, all without assuming any shape for
the error distribution. Now suppose we add one assumption: the errors are normally distributed.
A different principle, maximum likelihood, asks which parameter values make the data we actually
observed most probable. Remarkably, under normal errors that principle points at the very same
line. @fig-ch02-mle-likelihood shows the two criteria, sum of squared errors and negative
log-likelihood, bottoming out at exactly the same slope.

```{figure} figures/fig_ch02_mle_likelihood.png
:name: fig-ch02-mle-likelihood
:alt: A plot with the slope b1 on the horizontal axis and two curves sharing a common minimizer. A solid blue U-shaped curve is the SSE, read on the left axis; a dashed orange U-shaped curve is the negative log-likelihood, read on the right axis. A vertical red dotted line at slope about 3.57 passes through the bottom of both curves, labeled as the shared minimizer.
Least squares and maximum likelihood are the same optimization dressed differently. The SSE curve and the negative log-likelihood curve reach their minimum at the identical slope, so choosing the maximum-likelihood line is choosing the least-squares line.
```

### Formula

The **normal error regression model** (Definition 2.11) keeps everything from @ch02-slr-model and
adds a shape:

$$
Y_i = \beta_0 + \beta_1 X_i + \varepsilon_i, \qquad \varepsilon_i \overset{\text{iid}}{\sim} N(0, \sigma^2) .
$$

:::{admonition} Definition 2.11: Normal error regression model
:class: note definition
The normal error regression model is the simple linear regression model with the added
assumption that the errors are independent and normally distributed:
$Y_i = \beta_0 + \beta_1 X_i + \varepsilon_i$ with
$\varepsilon_i \overset{\text{iid}}{\sim} N(0, \sigma^2)$.
:::

Under normality the uncorrelated errors are now fully independent. The **likelihood** is the
joint density of the observed $Y_i$ read as a function of the parameters:

$$
L(\beta_0, \beta_1, \sigma^2) = \prod_{i=1}^n \frac{1}{\sqrt{2\pi\sigma^2}}\exp\!\left(-\frac{(Y_i - \beta_0 - \beta_1 X_i)^2}{2\sigma^2}\right) .
$$

- $L$ is large for parameter values that make the observed data look typical, small for values
  that make it look freakish.
- Maximum likelihood estimates are the $\beta_0, \beta_1, \sigma^2$ that maximize $L$.

### Derivation (maximum likelihood equals least squares)

:::{admonition} Theorem 2.12: Maximum likelihood under normal errors
:class: important theorem
Under the normal error regression model, the maximum-likelihood estimates of the coefficients
equal the least-squares estimates, $\hat\beta_0^{\text{MLE}} = b_0$ and
$\hat\beta_1^{\text{MLE}} = b_1$, while the maximum-likelihood estimate of the variance is
$\hat\sigma^2_{\text{MLE}} = \mathrm{SSE}/n$ (biased low).
:::

**Proof.** Maximizing $L$ is easier through its logarithm, which is maximized
at the same place because $\log$ is increasing:

$$
\ln L = -\frac{n}{2}\ln(2\pi) - \frac{n}{2}\ln \sigma^2 - \frac{1}{2\sigma^2}\sum_{i=1}^n (Y_i - \beta_0 - \beta_1 X_i)^2 .
$$

*Coefficients.* Fix any $\sigma^2 > 0$. The first two terms do not involve $\beta_0$ or
$\beta_1$, and the last term has $-1/(2\sigma^2) < 0$ multiplying
$\sum (Y_i - \beta_0 - \beta_1 X_i)^2$. Maximizing $\ln L$ over $\beta_0, \beta_1$ therefore means
*minimizing* that sum of squares, which is exactly the least-squares criterion $Q$ from
@ch02-least-squares. So the maximum-likelihood estimates of the coefficients are the
least-squares estimates:

$$
\hat\beta_0^{\text{MLE}} = b_0, \qquad \hat\beta_1^{\text{MLE}} = b_1 .
$$

*Variance.* Substitute $b_0, b_1$ so the sum of squares becomes $\mathrm{SSE}$, then differentiate
$\ln L$ with respect to $\sigma^2$ and set it to zero:

$$
\frac{\partial \ln L}{\partial \sigma^2} = -\frac{n}{2\sigma^2} + \frac{\mathrm{SSE}}{2\sigma^4} = 0
\quad\Longrightarrow\quad \hat\sigma^2_{\text{MLE}} = \frac{\mathrm{SSE}}{n} .
$$

The maximum-likelihood variance estimate divides by $n$, not $n-2$. From @ch02-sigma we know the
$n$ divisor is biased low, understating $\sigma^2$, because it ignores the two degrees of freedom
spent on $b_0$ and $b_1$. That is why the book, and all the inference in Chapter 3, uses the
unbiased $\mathrm{MSE} = \mathrm{SSE}/(n-2)$ rather than the maximum-likelihood
$\hat\sigma^2_{\text{MLE}}$. $\blacksquare$

:::{admonition} Key idea
:class: tip keyidea
Least squares and maximum likelihood are the same line seen through two lenses. Squared-error
loss and the normal log-likelihood are optimized at the identical coefficients, so a choice made
for algebraic convenience turns out to be the most-probable-data choice once the errors are
normal.
:::

### R and Python

:::{admonition} Example 2.6: The two variance estimates for Toluca
:class: note
**Question.** How far apart are the unbiased $\mathrm{MSE}$ and the maximum-likelihood
$\hat\sigma^2_{\text{MLE}}$ for these data?

**Intuition.** Both use the same $\mathrm{SSE}$; they differ only in the divisor, $n-2 = 23$
versus $n = 25$.

**Formula.** $\mathrm{MSE} = \mathrm{SSE}/(n-2)$ and $\hat\sigma^2_{\text{MLE}} = \mathrm{SSE}/n$.

**Computation.**

```r
sigma2_mle <- SSE / n
round(c(MSE_divisor_n_minus_2 = MSE, MLE_divisor_n = sigma2_mle), 2)
```
```text
MSE_divisor_n_minus_2         MLE_divisor_n
              2383.72               2193.02
```

```python
sigma2_mle = SSE / n
print(round(MSE, 2), round(sigma2_mle, 2))
```
```text
2383.72 2193.02
```

**Interpretation.** The two estimates are $2384$ (unbiased) and $2193$ (maximum likelihood). The
maximum-likelihood value is about 8% smaller, the size of the $n$ versus $n-2$ correction at
$n = 25$. For a large sample the gap would be negligible; for a small one it matters, and the
course uses the unbiased $\mathrm{MSE}$ so that the standard errors and intervals in Chapter 3
are honest.
:::

::::{admonition} Try it 2.6
:class: important
Explain in one or two sentences why maximizing the normal likelihood forces you to minimize the
sum of squared errors, pointing to the specific piece of $\ln L$ that carries the coefficients.

:::{admonition} Solution
:class: dropdown
In $\ln L$ the only term containing $\beta_0$ and $\beta_1$ is
$-\frac{1}{2\sigma^2}\sum (Y_i - \beta_0 - \beta_1 X_i)^2$. Its coefficient $-1/(2\sigma^2)$ is
negative, so making $\ln L$ as large as possible means making the sum of squares as small as
possible. Maximizing the likelihood in the coefficients is minimizing SSE, the least-squares
problem.
:::
::::

## 2.7 Chapter summary

This chapter built a simple linear regression from the ground up and proved the properties that
make it trustworthy. Starting from the model $Y_i = \beta_0 + \beta_1 X_i + \varepsilon_i$ and its
three error assumptions, we defined the least-squares criterion and derived the estimators two
independent ways, by calculus through the normal equations and by an algebraic identity that shows
no other line has a smaller SSE. The residuals obey exact identities that double as a correctness
check; the error variance is estimated by $\mathrm{MSE} = \mathrm{SSE}/(n-2)$, whose $n-2$ divisor
is exactly what makes it unbiased. Treating $b_0$ and $b_1$ as random over repeated samples gave
their means and variances, the Gauss-Markov theorem showed they are best among linear unbiased
estimators with no normality needed, and maximum likelihood under normal errors reproduced the
very same line.

**Key results at a glance**

| Result | Statement or formula | Valid when |
|---|---|---|
| Least-squares estimates (Theorem 2.4) | $b_1 = S_{xy}/S_{xx}$, $\ b_0 = \bar{Y} - b_1\bar{X}$ | the $X_i$ are not all equal |
| Residual identities (Theorem 2.6) | $\sum e_i = 0$, $\ \sum X_i e_i = 0$, $\ \sum \hat{Y}_i e_i = 0$, $\ \sum \hat{Y}_i = \sum Y_i$ | any least-squares fit with an intercept |
| Error variance estimate | $s^2 = \mathrm{MSE} = \mathrm{SSE}/(n-2)$, with $\mathrm{SSE} = S_{yy} - b_1^2 S_{xx}$ | SLR model |
| Unbiasedness of MSE (Theorem 2.8) | $E\{\mathrm{SSE}\} = (n-2)\sigma^2$, so $E\{\mathrm{MSE}\} = \sigma^2$ | mean-zero, constant-variance, uncorrelated errors |
| Means and variances (Theorem 2.9) | $E\{b_1\}=\beta_1,\ \operatorname{Var}\{b_1\}=\sigma^2/S_{xx}$; $\ E\{b_0\}=\beta_0,\ \operatorname{Var}\{b_0\}=\sigma^2(1/n+\bar{X}^2/S_{xx})$ | SLR model |
| Gauss-Markov theorem (Theorem 2.10) | $b_0, b_1$ are BLUE (minimum variance among linear unbiased estimators) | SLR model, no normality needed |
| Maximum likelihood (Theorem 2.12) | MLE coefficients $= b_0, b_1$; $\ \hat\sigma^2_{\text{MLE}} = \mathrm{SSE}/n$ | normal error model |

For the Toluca data these give $b_0 = 62.37$, $b_1 = 3.5702$, $\mathrm{SSE} = 54{,}825$,
$\mathrm{MSE} = 2384$, $s = 48.82$, $s\{b_1\} = 0.347$, $s\{b_0\} = 26.18$, and
$\hat\sigma^2_{\text{MLE}} = 2193$.

**Key terms**

**Simple linear regression model**, **regression function**, **mean response**, **random error**,
**least-squares criterion**, **least-squares estimates**, **normal equations**, **fitted value**,
**residual**, **error sum of squares (SSE)**, **mean square error (MSE)**, **homoscedasticity**,
**unbiased estimator**, **Gauss-Markov theorem**, **best linear unbiased estimator (BLUE)**,
**normal error regression model**, **maximum likelihood**.

**You should now be able to**

- [ ] State the simple linear regression model and explain the job each error assumption does.
- [ ] Derive the least-squares estimators two ways, by calculus and by the algebraic identity.
- [ ] Compute $b_0$, $b_1$, fitted values, and residuals by hand and with software.
- [ ] Prove the residual identities and use them as a built-in check on a fit.
- [ ] Explain the $n-2$ divisor by deriving $E\{\mathrm{MSE}\} = \sigma^2$, and compute $\mathrm{MSE}$ and $s$.
- [ ] Derive the means and variances of $b_0$ and $b_1$ and prove that $b_1$ is the best linear unbiased estimator.
- [ ] Show that maximum likelihood under normal errors reproduces the least-squares estimates.

**Where this fits.** This chapter is the first full trip around the workflow of @ch02-workflow.
It carried the Toluca question through ASK and EXPLORE, settled into FIT, and took first steps
into CHECK (the residual identities and the residual plot) and USE (reading the slope in hours
per unit). Chapter 1 argued that regression is a way of thinking about how one
quantity moves with another; this chapter turned that idea into a specific, computable line and
proved the properties that make it trustworthy. Everything here is point estimation: single best
guesses for $\beta_0$, $\beta_1$, and $\sigma^2$. What we have not yet done is quantify
uncertainty with intervals and tests. That is Chapter 3, which takes the sampling distributions
sketched here, adds the normal error assumption in full, and builds $t$ intervals for the slope
and intercept, the ANOVA decomposition (@ch03-anova-table), the $F$ test (@ch03-f-test), and the
difference between a confidence interval for a mean response and a prediction interval for a new
run (@ch03-prediction-interval). The exact Toluca fit set here ($b_1 = 3.5702$, $\mathrm{MSE} = 2384$)
carries forward unchanged, now with inference attached. It travels further still: Chapter 5 reruns
the same slope through a permutation test (@ch05-permutation-slope) and checks its p-value against
Chapter 3's, and in Chapter 7 the same estimators reappear in matrix form (@ch07-ls-matrix), where
the two-line normal equations become a single equation
$\mathbf{X}'\mathbf{X}\mathbf{b} = \mathbf{X}'\mathbf{Y}$ and the Gauss-Markov proof
(@ch07-gauss-markov) generalizes to any number of predictors at once.

## 2.8 Frequently asked questions

**Q1. Why square the residuals instead of taking absolute values?** Both are reasonable losses.
Squaring makes the objective smooth and differentiable, so calculus gives a clean closed-form
solution (the normal equations), and it is exactly the loss for which the Gauss-Markov and
normal-likelihood results hold. Absolute-value loss gives "least absolute deviations" regression,
which is more resistant to outliers but has no simple formula and needs iterative solving. The
course starts with squared error because it is where the theory is cleanest.

**Q2. Is the intercept $b_0 = 62.37$ really "hours to produce zero units"?** No, not
meaningfully. A lot size of zero is far outside the data (the smallest run was 20 units), so the
intercept is an extrapolation. Read it as the number that anchors the line's height, computed so
the line passes through $(\bar{X}, \bar{Y})$, not as a physical setup time. Interpreting an
intercept literally only makes sense when $X = 0$ is inside or near the observed range.

**Q3. What is the difference between an error $\varepsilon_i$ and a residual $e_i$?** The error
$\varepsilon_i = Y_i - (\beta_0 + \beta_1 X_i)$ is the gap to the true, unknown line, and we can
never observe it. The residual $e_i = Y_i - \hat{Y}_i$ is the gap to our estimated line, and we
compute it directly. Residuals are our visible estimates of the invisible errors, which is why
we estimate $\sigma^2$ from them.

**Q4. Why divide SSE by $n-2$ and not $n-1$ like an ordinary sample variance?** A sample
variance divides by $n-1$ because it estimates one quantity, the mean, from the data. Regression
estimates two, the intercept and slope, before measuring residuals, so it spends two degrees of
freedom, leaving $n-2$. The derivation in @ch02-sigma shows $E\{\mathrm{SSE}\} = (n-2)\sigma^2$
exactly, so $n-2$ is the divisor that makes $\mathrm{MSE}$ unbiased.

**Q5. Do I need the errors to be normal for least squares to work?** No. The least-squares
estimates, their unbiasedness, their variance formulas, and the Gauss-Markov optimality all hold
with no assumption about the error distribution's shape, only mean zero, constant variance, and
uncorrelated errors. Normality is an extra assumption, added in @ch02-mle and used in Chapter 3
to build exact $t$ and $F$ intervals and tests.

**Q6. Why does the bundle of fitted lines in @fig-ch02-sampling-lines pinch in the middle?** Every
least-squares line passes through $(\bar{X}, \bar{Y})$ (residual property 5), so near $\bar{X}$
the lines can only wobble a little. Away from $\bar{X}$, a small change in the slope pivots the
line a large vertical distance, so the lines fan out. The variance of a fitted value grows with
distance from $\bar{X}$, which Chapter 3 turns into the curved shape of a confidence band.

**Q7. R prints `4.45e-10` and Python prints `4.45e-10` for the slope's p-value, but we did not
assume normality. Where did that come from?** Those p-values and the standard errors' t-values
do use the normal error model, and we will justify them properly in Chapter 3. This chapter
shows the standard errors themselves, which come from the variance formulas and need no
normality; the significance stars and p-values are a preview of the inference to come.

## 2.9 Practice problems

:::{note}
Unless a problem says otherwise, use the `toluca.csv` dataset and the fitted model
$\hat{Y} = 62.37 + 3.5702\,X$ with $S_{xx} = 19{,}800$, $\mathrm{MSE} = 2384$, and $n = 25$.
Problems are marked (A) concepts, (B) theory, or (C) data analysis. Odd-numbered answers appear
in Appendix H; full solutions are in the instructor materials.
:::

1. (A) State the simple linear regression model and list its three assumptions on the errors, saying in one phrase what each assumption guarantees.
2. (A) Explain the difference between the regression function $E\{Y\} = \beta_0 + \beta_1 X$ and a fitted line $\hat{Y} = b_0 + b_1 X$. Which involves parameters and which involves estimates?
3. (A) In the Toluca fit, interpret the slope $3.5702$ in the units of the problem. Why is it unsafe to use the line to predict hours for a lot of 500 units?
4. (A) Give a one-sentence interpretation of $s = 48.82$ hours for a manager who has never taken statistics.
5. (A) Why is the least-squares intercept for the Toluca data not a meaningful "setup time"? What would have to be true of the data for an intercept to be interpretable?
6. (A) Without computing, state the values of $\sum e_i$ and $\sum X_i e_i$ for any least-squares fit with an intercept, and say which normal equation gives each.
7. (A) A fitted line has $\sum e_i = 0$ but $\sum X_i e_i = 120$. Can it be a least-squares fit? Explain.
8. (A) Explain why spreading the predictor values farther apart (increasing $S_{xx}$) makes the slope estimate more precise, referring to its variance formula.
9. (B) Starting from $Q(b_0, b_1) = \sum (Y_i - b_0 - b_1 X_i)^2$, derive both normal equations by differentiation, and solve them for $b_0$ and $b_1$ (Theorem 2.4).
10. (B) Prove the algebraic identity $\sum (Y_i - a - cX_i)^2 = \mathrm{SSE} + \sum g_i^2$ for an arbitrary line $(a, c)$, identifying $g_i$ and showing the cross term is zero. Conclude that least squares is the unique minimizer.
11. (B) Show that the least-squares line passes through $(\bar{X}, \bar{Y})$, and that $\sum \hat{Y}_i = \sum Y_i$ (Theorem 2.6).
12. (B) Writing $b_1 = \sum k_i Y_i$ with $k_i = (X_i - \bar{X})/S_{xx}$, prove $\sum k_i = 0$, $\sum k_i X_i = 1$, and $\sum k_i^2 = 1/S_{xx}$, then use them to show $E\{b_1\} = \beta_1$ and $\operatorname{Var}\{b_1\} = \sigma^2/S_{xx}$.
13. (B) Derive $\operatorname{Var}\{b_0\} = \sigma^2(1/n + \bar{X}^2/S_{xx})$ by writing $b_0 = \sum m_i Y_i$ with $m_i = 1/n - \bar{X}k_i$.
14. (B) Prove the Gauss-Markov theorem for the slope (Theorem 2.10): any linear unbiased estimator $\sum c_i Y_i$ of $\beta_1$ has variance at least $\sigma^2/S_{xx}$, with equality only for $b_1$.
15. (B) Derive $E\{\mathrm{SSE}\} = (n-2)\sigma^2$ (Theorem 2.8) using $\mathrm{SSE} = S_{yy} - b_1^2 S_{xx}$ and the facts $E\{b_1\} = \beta_1$, $\operatorname{Var}\{b_1\} = \sigma^2/S_{xx}$.
16. (B) Write down the log-likelihood for the normal error model and show that maximizing it over $\beta_0, \beta_1$ is equivalent to least squares (Theorem 2.12). Then derive $\hat\sigma^2_{\text{MLE}} = \mathrm{SSE}/n$.
17. (B) Show that $\hat\sigma^2_{\text{MLE}} = \mathrm{SSE}/n$ is biased for $\sigma^2$, and compute the exact bias in terms of $\sigma^2$ and $n$.
18. (B) Prove the decomposition $\mathrm{SSE} = S_{yy} - b_1^2 S_{xx}$ starting from $e_i = (Y_i - \bar{Y}) - b_1(X_i - \bar{X})$.
19. (B) A student proposes estimating the slope by the ratio of means $\bar{Y}/\bar{X}$ (a line through the origin). Show this is generally biased for $\beta_1$, and explain which model assumption it implicitly, and wrongly, imposes.
20. (C) Read `toluca.csv` in R or Python, fit the model, and reproduce $b_0$, $b_1$, and $s$. Confirm $b_1 = S_{xy}/S_{xx}$ from the raw sums.
21. (C) Compute the residuals in software and verify numerically that $\sum e_i = 0$, $\sum X_i e_i = 0$, and $\sum \hat{Y}_i = \sum Y_i$. Report the three sums.
22. (C) Using `toluca_mini.csv`, compute $b_0$ and $b_1$ by hand (show the deviation table), then reproduce them in software. Explain why they differ from the full-data estimates.
23. (C) Predict the mean work hours for lot sizes 40, 80, and 120 using the fitted line, and mark which of these are interpolation and which (if any) are extrapolation.
24. (C) Fit the model, extract $\mathrm{MSE}$ two ways (from `summary` / `fit.summary()` and by hand as $\mathrm{SSE}/(n-2)$), and confirm they match. Then compute $\hat\sigma^2_{\text{MLE}} = \mathrm{SSE}/n$ and report the percentage difference.
25. (C) Write a short simulation (seed `4210`) that draws 2000 samples from the fitted model at the Toluca lot sizes, refits each, and reports the mean and standard deviation of the 2000 intercept estimates $b_0$. Compare the standard deviation to the formula $s\{b_0\}$.
26. (C) Make the residuals-versus-lot-size plot in R or Python. Describe what a violation of the constant-variance assumption would look like in this plot, and say whether the Toluca residuals show it.
27. (C) Reverse the roles: regress `lotsize` on `hours`. Show that the new slope is not the reciprocal of the original slope, and explain why regressing $Y$ on $X$ and $X$ on $Y$ give different lines.
28. (B) An analyst has only the summary numbers $\bar{X} = 70$, $\bar{Y} = 312.28$, $S_{xx} = 19{,}800$, and $S_{xy} = 70{,}690$, with the raw data lost. Can they recover $b_0$ and $b_1$? Can they recover $\mathrm{MSE}$? Explain what is and is not reconstructable from these four numbers.

## 2.10 Exam practice

The problems below are written in the style of this course's exams: each asks you to
*explain* in full sentences, not just to produce a number. On the real exam a bare answer earns
little credit, and correct reasoning with a small slip earns most of it, so practice writing the
reasoning out. Work each one on paper before opening its model answer. Where output is shown, it
is genuine software output from `toluca.csv`.

**EP 2.1. Explain why the line describes the mean, not the response.** A first-time reader says
"the model claims work hours are a straight-line function of lot size." Explain why that is not
what the simple linear regression model claims, and state precisely which quantity the straight
line does describe. Then explain what job the constant-variance assumption
$\operatorname{Var}\{\varepsilon_i\} = \sigma^2$ does that the mean-line equation alone does not.

:::{admonition} Model answer
:class: dropdown
The model equation is $Y_i = \beta_0 + \beta_1 X_i + \varepsilon_i$, so each observed hours value
is a straight-line piece *plus* a random error. What lies exactly on the line is therefore not
$Y_i$ itself but its mean, $E\{Y_i\} = \beta_0 + \beta_1 X_i$. Any single run sits above or below
the line by its error $\varepsilon_i$, which is exactly why two lots of the same size took
different amounts of time. The mean-line equation fixes only where the center of the response
sits at each lot size; it says nothing about how tightly the runs cluster around that center. The
constant-variance assumption supplies that missing piece: it says the runs scatter by the same
amount $\sigma^2$ at every lot size, so the band around the line keeps a constant width. Without
it the line could be right on average yet much more trustworthy at some lot sizes than at others,
and every standard error later in the chapter would need a different formula.

A weak answer says "$Y$ is linear in $X$" and forgets the error term, or names the constant-variance
assumption without saying that its job is to hold the width of the scatter equal across all $X$.
:::

**EP 2.2. A student claims least squares cannot be beaten.** A student writes: "The Gauss-Markov
theorem proves that $b_1$ has the smallest variance of any estimator of $\beta_1$, so it is
impossible to estimate the slope more precisely than least squares does." Evaluate this claim.
Where it overreaches, state exactly what the theorem does and does not promise.

:::{admonition} Model answer
:class: dropdown
The claim overreaches. Gauss-Markov says $b_1$ is best only inside a specific class: estimators
that are *linear* in the responses $Y_i$ and *unbiased* for $\beta_1$. Among that class its
variance $\sigma^2/S_{xx}$ is the smallest, and that is the whole of the promise. The theorem does
not say $b_1$ beats every conceivable estimator. A biased estimator, such as a shrinkage
(ridge) slope, can have a smaller variance and even a smaller mean squared error than $b_1$, buying
that at the price of a little bias; nonlinear estimators sit outside the theorem's scope entirely.
The result also rests on its hypotheses of mean-zero, constant-variance, uncorrelated errors. If
the errors have unequal variances or are correlated, ordinary least squares need not be best, and
a weighted or generalized least-squares estimator can do better. So the precise reading is: no
linear unbiased estimator beats $b_1$ under the stated error conditions. That is a real and useful
optimality, not the universal one the student stated.

A weak answer accepts "smallest variance of any estimator" without restricting to linear and
unbiased estimators, or forgets that the constant-variance and uncorrelated-error hypotheses are
what the guarantee depends on.
:::

**EP 2.3. Interpret the reverse regression in context.** An analyst reverses the chapter's fit
and regresses lot size on work hours, reusing `toluca.csv`. The genuine R and Python output is
below.

```text
Coefficients:
            Estimate Std. Error t value Pr(>|t|)
(Intercept) -1.85825    7.41053  -0.251    0.804
hours        0.23011    0.02236  10.290 4.45e-10 ***
---
Residual standard error: 12.4 on 23 degrees of freedom
Multiple R-squared:  0.8215,	Adjusted R-squared:  0.8138
```

```text
                 coef    std err          t      P>|t|      [0.025      0.975]
------------------------------------------------------------------------------
Intercept     -1.8583      7.411     -0.251      0.804     -17.188      13.472
hours          0.2301      0.022     10.290      0.000       0.184       0.276
```

**(a)** Interpret the reverse slope $0.2301$ in the units of this problem. **(b)** The forward fit
(hours on lot size) had slope $3.5702$, whose reciprocal is $1/3.5702 = 0.280$. Explain why the
reverse slope $0.2301$ is *not* that reciprocal. **(c)** Both directions report the same
$R^2 = 0.8215$. Explain why that agreement is expected, and say what the product of the two slopes
equals.

:::{admonition} Model answer
:class: dropdown
**(a)** The reverse slope says that two runs differing by one work hour differ, on average, by
about $0.23$ units of lot size, in units of lot-size units per hour, over the observed range. It
is a description of how lot size tracks hours, not a causal or physical rate.

**(b)** Regressing $Y$ on $X$ minimizes the *vertical* gaps (errors in hours), while regressing
$X$ on $Y$ minimizes the *horizontal* gaps (errors in lot size). These are different
minimizations answering different questions, so their slopes are not reciprocals. Algebraically
the forward slope is $S_{xy}/S_{xx} = 3.5702$ and the reverse slope is $S_{xy}/S_{yy} = 0.2301$.
The reciprocal $0.280$ would be the reverse slope only if the fit were perfect ($R^2 = 1$). Because
the fit is imperfect here, the reverse slope $0.2301$ comes out smaller than $0.280$.

**(c)** $R^2$ is the squared correlation between the two variables, a symmetric quantity that does
not care which variable is called the response, so both directions must report the same value
$0.8215$. The product of the two slopes is
$\frac{S_{xy}}{S_{xx}}\cdot\frac{S_{xy}}{S_{yy}} = \frac{S_{xy}^2}{S_{xx}S_{yy}} = R^2 = 0.8215$,
which also shows why they are reciprocals ($\text{product} = 1$) only when $R^2 = 1$.

A weak answer reads the reverse slope as "3.57 backwards" and expects the reciprocal, or cannot
say why the two slopes multiply to $R^2$ rather than to $1$.
:::

**EP 2.4. What would change if the lot sizes were bunched?** The engineers happened to record lot
sizes spread from 20 to 120 units, giving $S_{xx} = 19{,}800$. Suppose instead every run had been
scheduled between 60 and 80 units, so the same 25 runs carried a much smaller $S_{xx}$, about
$3{,}000$, with the true line and $\sigma^2$ unchanged. Explain the direction of the change, and
the reason, for (a) the slope's standard error, (b) the spread of the bundle of plausible fitted
lines, and (c) your ability to interpret the intercept $b_0$. Then say what would *not* change.

:::{admonition} Model answer
:class: dropdown
**(a)** The slope standard error $s\{b_1\} = \sqrt{\mathrm{MSE}/S_{xx}}$ would grow. Dropping
$S_{xx}$ from $19{,}800$ to about $3{,}000$ shrinks the denominator by a factor of roughly $6.6$,
so the variance $\sigma^2/S_{xx}$ rises by that factor and the standard error by its square root,
about $2.6$ times. Same data effort, a far noisier slope, because bunched predictors give the
line little horizontal purchase.

**(b)** The bundle of fitted lines from repeated samples would fan out much more. When the $X$
values sit close together, a small amount of error tips a line steeply, so the slope is pinned
down loosely, exactly the narrow-spread panel in @fig-ch02-xspread-precision.

**(c)** Interpreting $b_0$ as anything physical would be even less defensible. The intercept is
the fitted height at $X = 0$, and with lot sizes now confined to 60 to 80, zero is farther outside
the data than before, so the intercept is a more extreme extrapolation. Its own standard error,
which carries the term $\bar{X}^2/S_{xx}$, would also balloon as $S_{xx}$ falls.

What would not change: the estimators stay unbiased, since $E\{b_1\} = \beta_1$ regardless of the
predictor spread, and $\sigma^2$ and the true line are the same. On average the slope is still
correct; it is just much less precise.

A weak answer says precision "gets worse" without tying it to $S_{xx}$ in the denominator, or
wrongly claims the estimates become biased when the predictors are bunched.
:::

**EP 2.5. Two errors in a hand-fit argument.** A classmate fits a line by hand, reports residuals
that sum to exactly zero, and concludes: "Since $\sum e_i = 0$, my fit must be the least-squares
line, and I can now estimate $\sigma^2$ by dividing SSE by $n$." Identify the two separate errors
in this reasoning, and give the correct statement in each case.

:::{admonition} Model answer
:class: dropdown
**First error: $\sum e_i = 0$ does not prove a least-squares fit.** The condition is necessary but
not sufficient. The first normal equation forces $\sum e_i = 0$ for the least-squares line with an
intercept, so every least-squares fit has it; but so does any other line drawn through the point
of means $(\bar{X}, \bar{Y})$, including one with the wrong slope and a compensating intercept. The
identity that actually singles out least squares is the *second* normal equation,
$\sum X_i e_i = 0$. To confirm the fit is least squares the classmate must check that the residuals
are orthogonal to the predictor as well, not merely that they balance to zero.

**Second error: dividing SSE by $n$ is biased.** Two degrees of freedom were spent estimating
$b_0$ and $b_1$ before the residuals were measured, so $E\{\mathrm{SSE}\} = (n-2)\sigma^2$, and
only $\mathrm{MSE} = \mathrm{SSE}/(n-2)$ is unbiased for $\sigma^2$. Dividing by $n$ (the
maximum-likelihood divisor) understates $\sigma^2$, most noticeably when $n$ is small. The correct
estimator is $s^2 = \mathrm{SSE}/(n-2)$.

A weak answer treats $\sum e_i = 0$ as proof of least squares while ignoring $\sum X_i e_i = 0$, or
defends the divisor $n$ without recognizing that it is biased low.
:::

## Chapter game

:::{admonition} Play the Chapter 2 game
:class: tip
Play the Chapter 2 game on your phone or laptop: 10 quick rounds, no setup.
[Open the Chapter 2 game](../games/ch02.html)

It drills the core moves of this chapter: order the ASK-EXPLORE-FIT-CHECK-USE workflow, drag a
line to least-squares on real Toluca runs, read the slope as a mean and not a response, spot the
worst residual, and separate the unbiased $\mathrm{MSE}$ from the biased maximum-likelihood
variance. Every round ends with the reason and the section to reread.
:::

:::{admonition} Resumen del capítulo (en español)
:class: dropdown
Este capítulo presenta la **regresión lineal simple (simple linear regression)**, el modelo
$Y_i = \beta_0 + \beta_1 X_i + \varepsilon_i$, usando los datos de la Toluca Company: horas de
trabajo frente al tamaño del lote de producción en 25 corridas. El modelo separa cada
observación en una parte sistemática, la recta media $E\{Y\} = \beta_0 + \beta_1 X$, y un
**error (error)** aleatorio con media cero, varianza constante $\sigma^2$ y sin correlación
entre observaciones. Ninguna suposición sobre la forma de la distribución se necesita todavía.

El método de **mínimos cuadrados (least squares)** elige la recta que minimiza la suma de los
cuadrados de las distancias verticales, $Q = \sum (Y_i - b_0 - b_1 X_i)^2$. Derivamos los
estimadores de dos maneras: por cálculo, obteniendo las **ecuaciones normales (normal
equations)** y las soluciones $b_1 = S_{xy}/S_{xx}$ y $b_0 = \bar{Y} - b_1\bar{X}$; y por una
identidad algebraica que demuestra que ninguna otra recta tiene una SSE menor. Para la Toluca,
$b_0 = 62.37$ y $b_1 = 3.5702$: cada unidad adicional en el lote agrega unas $3.57$ horas.

Los **residuos (residuals)** $e_i = Y_i - \hat{Y}_i$ cumplen identidades exactas: suman cero, son
ortogonales al predictor y a los valores ajustados, y la recta pasa por $(\bar{X}, \bar{Y})$.
La varianza del error $\sigma^2$ se estima con $\mathrm{MSE} = \mathrm{SSE}/(n-2)$; el divisor
$n-2$ hace que el estimador sea **insesgado (unbiased)**, lo cual demostramos probando que
$E\{\mathrm{SSE}\} = (n-2)\sigma^2$. Para la Toluca, $\mathrm{SSE} = 54{,}825$,
$\mathrm{MSE} = 2384$ y $s = 48.8$ horas.

Finalmente estudiamos el comportamiento muestral de los estimadores: $b_0$ y $b_1$ son
insesgados, con varianzas $\sigma^2/S_{xx}$ y $\sigma^2(1/n + \bar{X}^2/S_{xx})$. El **teorema de
Gauss-Markov (Gauss-Markov theorem)** demuestra que $b_1$ es el mejor estimador lineal insesgado
(de mínima varianza). Bajo errores normales, la **máxima verosimilitud (maximum likelihood)**
produce exactamente los mismos estimadores de mínimos cuadrados, con
$\hat\sigma^2_{\text{MLE}} = \mathrm{SSE}/n$. El Capítulo 3 usará estas distribuciones muestrales
para construir intervalos de confianza y pruebas de hipótesis.
:::
