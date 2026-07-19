---
title: "10. Remedial measures and transformations"
subtitle: "MATH 4210, Chapter 10"
---

(ch10)=
# 10. Remedial measures and transformations

:::{div}
:class: lang-toggle
[Leer en espanol](./es.md)
:::

A biologist lines up the brain and body weights of 62 land mammals, from a 3-gram
mouse to a five-ton African elephant, and plots one against the other. The picture is
almost useless. Sixty of the points are crushed into the bottom-left corner, the
elephant and a few whales float off alone in the top right, and any straight line you
draw is dragged around by the giants. @fig-ch10-mammals-raw is that plot. The spread of
the points also grows with body size, so the tidy constant-variance assumption from
Chapter 2 is nowhere in sight.

```{figure} figures/fig_ch10_mammals_raw.png
:name: fig-ch10-mammals-raw
:alt: Scatterplot of brain weight in grams against body weight in kilograms for 62 mammals. Almost all points are compressed into the lower-left corner near the origin, while the African elephant sits far out to the right and high up, alone. The vertical spread of points widens as body weight increases.
On the raw scale the mammal data are hopeless: most species pile up near zero while a few giants stretch the axes, and the vertical scatter grows with body size. No straight line summarizes this well.
```

Nothing is wrong with the data. What is wrong is the scale. Take the logarithm of both
axes and the same 62 points snap into a clean, straight, evenly scattered band, shown
in @fig-ch10-mammals-loglog. The relationship was always simple; it was simple in
percentage terms, not in raw grams and kilograms, and the log scale is where percentages
live. This is the central move of the chapter. When the diagnostics of Chapter 9 fire,
you rarely need to abandon regression. More often you need to fit it to a transformed
version of the problem, or weight the observations, or replace the loss function, so
that the model's assumptions become true.

```{figure} figures/fig_ch10_mammals_loglog.png
:name: fig-ch10-mammals-loglog
:alt: Scatterplot of log brain weight against log body weight for the same 62 mammals, with a fitted straight line of slope about 0.75. The points now spread evenly along the line across the whole range, with roughly constant vertical scatter.
The same data on the log-log scale: a straight line, even scatter, and one clear slope near 0.75. Taking logs of both variables turned a hopeless plot into a textbook regression.
```

Chapter 9 taught you to detect trouble: curved residual plots, funnel shapes, heavy
tails, one island or one country bending the whole fit. This chapter is the toolbox of
fixes. You will read log coefficients as percentages, pick a transformation with the
Box-Cox likelihood, weight observations that carry unequal noise, and resist a stubborn
outlier with robust regression. At the end you will meet a dataset that no transformation
can save, and learn to recognize when the honest fix is a different model entirely.

:::{admonition} This lesson at a glance
:class: important
- **What we are doing:** Repairing broken fits: transforming $Y$ or $X$, reading log coefficients as percentages, choosing a transformation with Box-Cox, weighting observations by their known precision, and resisting outliers with robust regression.
- **Why we are doing it:** When Chapter 9's diagnostics fire you rarely abandon regression; more often you refit a transformed or reweighted version of the problem so the model's assumptions become true.
- **Main objective:** Choose a remedy from the diagnostic pattern, interpret log coefficients on the exact and approximate percent scale, derive Box-Cox and weighted least squares, and recognize when a different model is the honest fix.
- **What changed from the last chapters:** Chapter 9 detected trouble (@ch09-cooks-distance); this chapter is the toolbox of fixes, living at the CHECK-FIT seam of @ch02-workflow. It ends where transformation fails (the Galapagos counts), handing that thread to the count model of @ch14-poisson-model.
:::

:::{admonition} Learning objectives
:class: tip
By the end of this chapter you will be able to:
- **Choose** a remedy (transform $Y$, transform $X$, weight, or change the model) from the diagnostic pattern you see.
- **Interpret** log-transformed coefficients on both the exact and the approximate percent-change scale, and **derive** both readings.
- **Derive** the Box-Cox transformation as a profile likelihood and **use** it to pick a response transformation with a confidence interval for the power $\lambda$.
- **Derive** weighted least squares from the Gauss-Markov argument with unequal variances, and **compute** it when the weights are known.
- **Explain** and **demonstrate** Huber robust regression, and state honestly what it protects against and what it does not.
- **Decide** when a transformation is a patch and a different model is the right fix.
:::

(ch10-remedies)=
## 10.1 A menu of remedies

Before any single technique, it helps to see the whole menu and the logic that picks
among its items. Chapter 9 ended by naming problems, from curved residual plots and
funnel-shaped scatter to the high-leverage cases of @ch09-cooks-distance. Each named
problem has a matching family of fixes.

If the residual plot **curves**, the mean function is wrong: a straight line is being
asked to trace a bend. The fix is to bend the model back straight, either by
transforming the predictor $X$ (leaving the error alone) or by transforming the response
$Y$. If the residual plot **fans out**, the variance is not constant: the model assumes
one $\sigma^2$ but the data carry more noise in some places than others. The fix is
either a variance-stabilizing transformation of $Y$ or weighted least squares, which
tells the fit to trust the low-noise points more. If the residuals have **heavy tails or
a lone outlier**, one or two points are dominating the squared-error loss. The fix is a
loss that grows more slowly than the square, which is robust regression. And if the
response is a **count, a proportion, or a strictly positive amount with structural
skew**, the normal-errors model may be the wrong frame altogether, and the fix is a
different model, which is where Chapters 13 and 14 go.

The whole logic fits on one page. @fig-ch10-remedy-flowchart lays it out as a decision
chart: start at the residual plot, read the pattern, and follow the arrow to the fix. Keep
it beside you for the rest of the chapter, which walks the four columns from left to right.

```{figure} figures/fig_ch10_remedy_flowchart.png
:name: fig-ch10-remedy-flowchart
:alt: A decision flowchart. A top box reads "Look at the residual plot. What pattern do you see?" Four arrows lead down to four columns. Column one, a curve or bend, means the mean is wrong and calls for transforming X or Y (sections 10.2, 10.3). Column two, a funnel that fans out, means the variance is not constant and calls for transforming Y or weighting (sections 10.3, 10.4). Column three, one huge residual, means one point owns the loss and calls for robust regression (section 10.6). Column four, a count or bounded response, means the wrong distribution and calls for changing the model (Chapters 13 and 14).
The remedy map for the whole chapter: the shape in the residual plot points to the fix. Read the pattern first, then pick the tool, and follow the section numbers to the details.
```

Transformations of the predictor and the response do different jobs, and it is worth
keeping them apart. Transforming $X$ changes the shape of the mean curve without touching
the errors, so it is the tool for a curved relationship whose scatter is already even.
Transforming $Y$ changes both the shape and the spread at once, so it is the tool when a
curve and a funnel appear together, exactly as in the mammal data. A rough guide, drawn
in @fig-ch10-ladder, is the "ladder of powers": if a plot bends one way, step down the
ladder from $Y$ toward $\sqrt{Y}$, $\log Y$, $1/Y$; if it bends the other way, step up
toward $Y^2$. The Box-Cox method in @ch10-box-cox turns this guessing into an estimate.

```{figure} figures/fig_ch10_ladder.png
:name: fig-ch10-ladder
:alt: Three curves on one set of axes illustrating the ladder of powers. A curve bending upward is labeled as calling for log, square-root, or reciprocal of Y; a curve bending downward is labeled as calling for Y squared or a transform of X; a curve that rises then flattens is labeled as calling for log of X.
The ladder of powers as a decision aid: the direction a curve bends points to the transformation that straightens it. Bends upward call for pulling the response down the ladder; bends that flatten call for compressing the predictor.
```

The rest of the chapter takes these remedies one at a time. Throughout, keep the Chapter
2 model in view: $Y_i = \beta_0 + \beta_1 X_i + \varepsilon_i$ with errors that should
average to zero, share one variance $\sigma^2$, and be uncorrelated. Every remedy here is
an effort to make one of those three conditions true after a diagnostic showed it was
false.

:::{admonition} Key idea
:class: tip keyidea
The residual plot chooses the remedy. A curve says the mean is wrong (transform $X$ or $Y$);
a funnel says the variance is wrong (transform $Y$ or weight); a lone large residual says a
point is dominating the loss (robust regression); a count or bounded response says the whole
normal model is wrong (change the model). Read the pattern first, then pick the fix.
:::

(ch10-log-interpretation)=
## 10.2 The log transformation and reading its coefficients

The log transformation earns its own section because it is the most common remedy and
the one most often misread. We can now fit the mammal line; the harder question is what
its slope of $0.75$ actually means, because a coefficient on a logged variable is not a
change in grams per kilogram. It is a percentage.

### Intuition

Logarithms turn multiplication into addition, so they turn "grows by a percentage" into
"grows by a constant." A quantity that doubles every time some driver doubles looks
curved on ordinary axes and straight on log axes. Brain weight relates to body weight
that way: across species, a body ten times heavier tends to carry a brain a fixed
*multiple* larger, not a fixed number of grams larger. That is why the raw plot curved
and the log-log plot is straight. The price of the straight line is that the slope now
speaks in percents, and you have to translate.

### Formula

Two log models cover almost every case. The **log-log model** logs both sides,

$$
\log Y_i = \beta_0 + \beta_1 \log X_i + \varepsilon_i ,
$$

and the **log-linear model** logs only the response,

$$
\log Y_i = \beta_0 + \beta_1 X_i + \varepsilon_i .
$$

Here $\log$ is the natural logarithm (base $e$) throughout this book. The slope means
something different in each model, and each meaning carries a name (Definition 10.1,
Definition 10.2).

:::{admonition} Definition 10.1: Elasticity
:class: note definition
In the **log-log model** $\log Y_i = \beta_0 + \beta_1 \log X_i + \varepsilon_i$, the slope
$\beta_1$ is the **elasticity** of $Y$ with respect to $X$: the approximate percent change in
$Y$ per one-percent change in $X$.
:::

:::{admonition} Definition 10.2: Semi-elasticity
:class: note definition
In the **log-linear model** $\log Y_i = \beta_0 + \beta_1 X_i + \varepsilon_i$, the slope
$\beta_1$ is a **semi-elasticity**: the approximate percent change in $Y$ per one-*unit*
change in $X$.
:::

In words: on the log-log scale the slope answers "if $X$ rises 1%, about how many percent
does $Y$ rise," and on the log-linear scale it answers "if $X$ rises by one of its own
units, about how many percent does $Y$ rise." Both readings have an exact form and an
approximate form, and the next derivation produces both.

### Derivation (exact and approximate percent readings)

:::{admonition} Theorem 10.3: Log-log elasticity
:class: important theorem
Under the log-log model, whose mean relation is $Y = e^{\beta_0} X^{\beta_1}$, multiplying
$X$ by a factor $c > 0$ multiplies the mean of $Y$ by $c^{\beta_1}$ exactly. For a one-percent
rise in $X$ ($c = 1.01$) the percent change in $Y$ is $100\,(1.01^{\beta_1} - 1)$ exactly,
and approximately $\beta_1$ percent when $\beta_1$ is small.
:::

**Proof.** Undo the log on the response. The log-log model says
$\log Y = \beta_0 + \beta_1 \log X$ for the mean, so exponentiating,

$$
Y = e^{\beta_0} X^{\beta_1} .
$$

In words: the mean of $Y$ is a constant times a power of $X$. Now multiply $X$ by a
factor $c$ (for a 1% increase, $c = 1.01$; for a doubling, $c = 2$). The new mean divided
by the old is

$$
\frac{e^{\beta_0}(cX)^{\beta_1}}{e^{\beta_0} X^{\beta_1}} = c^{\beta_1} .
$$

So multiplying $X$ by $c$ multiplies $Y$ by $c^{\beta_1}$, exactly. The **exact** percent
change in $Y$ for a 1% rise in $X$ is $100\,(1.01^{\beta_1} - 1)$. For the **approximate**
reading, use $c^{\beta_1} = e^{\beta_1 \log c} \approx 1 + \beta_1 \log c$ when $\log c$ is
small; with $c = 1.01$, $\log c \approx 0.01$, giving a percent change of about
$100 \cdot \beta_1 \cdot 0.01 = \beta_1$ percent. That is the elasticity headline: on the
log-log scale, $\beta_1$ is roughly the percent change in $Y$ per percent change in $X$.
$\blacksquare$

:::{admonition} Theorem 10.4: Log-linear semi-elasticity
:class: important theorem
Under the log-linear model, whose mean relation is $Y = e^{\beta_0} e^{\beta_1 X}$, raising
$X$ by one unit multiplies the mean of $Y$ by $e^{\beta_1}$ exactly, an exact percent change
of $100\,(e^{\beta_1} - 1)$, and approximately $100\,\beta_1$ percent when $\beta_1$ is small.
:::

**Proof (log-linear semi-elasticity).** In the log-linear model the mean satisfies
$\log Y = \beta_0 + \beta_1 X$, so $Y = e^{\beta_0} e^{\beta_1 X}$. Raise $X$ by one unit:

$$
\frac{e^{\beta_0} e^{\beta_1 (X+1)}}{e^{\beta_0} e^{\beta_1 X}} = e^{\beta_1} .
$$

So each one-unit step in $X$ multiplies $Y$ by $e^{\beta_1}$, exactly, giving an
**exact** percent change of $100\,(e^{\beta_1} - 1)$. Since $e^{\beta_1} \approx 1 + \beta_1$
for small $\beta_1$, the **approximate** percent change is $100\,\beta_1$ percent per unit.
$\blacksquare$

The gap between exact and approximate widens as the coefficient grows, drawn in
@fig-ch10-log-percent. For a coefficient near $\pm 0.1$ the two agree to a rounding
error, which is why the "percent per unit" shortcut is safe for small effects and
misleading for large ones. This same $e^{\beta}$ machinery returns twice later: as the
odds ratio in logistic regression (@ch13-odds-ratio) and as the percent growth per month
in the logged airline series (@ch15-forecasting).

```{figure} figures/fig_ch10_log_percent.png
:name: fig-ch10-log-percent
:alt: Two curves of percent change in Y against a coefficient b ranging from negative 0.6 to 0.6. The exact curve, 100 times the quantity e to the b minus 1, and the straight approximate line, 100 times b, nearly coincide near zero and separate as the absolute value of b grows, with a shaded gap between them.
The exact percent reading and the linear approximation agree near zero and drift apart in the tails. Below about 0.1 in magnitude the shortcut is fine; past that, use the exact factor.
```

### R

The mammal fit is a log-log model, so its slope is an elasticity.

```r
mammals <- read.csv("data/mammals.csv")
dim(mammals)
head(mammals, 3)
```
```text
[1] 62  3
          species  body brain
1      Arctic fox 3.385  44.5
2      Owl monkey 0.480  15.5
3 Mountain beaver 1.350   8.1
```

:::{admonition} Example 10.1: Reading the mammal elasticity
:class: note
**Question.** Across mammal species, if body weight is 10% larger, how much larger is
brain weight, and how much larger if body weight doubles?

**Intuition.** Fit $\log(\text{brain})$ on $\log(\text{body})$, take the slope as an
elasticity, and translate it with both the exact factor and the approximate percent.

**Formula.** Multiplying body weight by $c$ multiplies brain weight by $c^{\beta_1}$
(exact); the approximate rise for a 1% body increase is $\beta_1$ percent.

**Computation.**

```r
fit_ll <- lm(log(brain) ~ log(body), data = mammals)
coef(fit_ll)
summary(fit_ll)$r.squared
```
```text
(Intercept)   log(body)
  2.1347887   0.7516859
[1] 0.9207837
```

```r
b1 <- coef(fit_ll)[["log(body)"]]
round(c(exact_factor_per_double = 2^b1,
        exact_pct_per_10pct     = (1.10^b1 - 1) * 100,
        approx_pct_per_10pct    = b1 * 10), 3)
```
```text
exact_factor_per_double     exact_pct_per_10pct    approx_pct_per_10pct
                  1.684                   7.427                   7.517
```

Now in Python, reading the same CSV.

```python
import numpy as np
import pandas as pd
import statsmodels.formula.api as smf

mammals = pd.read_csv("data/mammals.csv")
fit_ll = smf.ols("np.log(brain) ~ np.log(body)", data=mammals).fit()
print(fit_ll.params)
print(round(fit_ll.rsquared, 4))
```
```text
Intercept       2.134789
np.log(body)    0.751686
dtype: float64
0.9208
```

```python
b1 = fit_ll.params["np.log(body)"]
print(round(2 ** b1, 3),
      round((1.10 ** b1 - 1) * 100, 3),
      round(b1 * 10, 3))
```
```text
1.684 7.427 7.517
```

**Interpretation.** The elasticity is $b_1 = 0.752$, and the log-log fit explains about
92% of the variation in log brain weight. A 10% heavier body goes with a $7.43$% heavier
brain by the exact factor $1.10^{0.752}$, and the quick "$\beta_1$ percent per percent"
shortcut says $7.52$%; the two agree to a tenth of a percent. A doubling of body weight
multiplies brain weight by $2^{0.752} = 1.68$, so brain size grows, but less than
proportionally. An elasticity below one is the famous result that bigger animals have
bigger brains in absolute terms yet smaller brains relative to their bodies.
:::

::::{admonition} Try it 10.1
:class: important
A wage model gives $\widehat{\log(\text{wage})} = 2.1 + 0.06\,(\text{years of schooling})$. Give
both the exact and the approximate percent change in wage for one more year of schooling,
and say which reading you would report and why.

:::{admonition} Solution
:class: dropdown
This is a log-linear model, so one more year multiplies wage by $e^{0.06}$. The exact
percent change is $100\,(e^{0.06} - 1) = 6.18$%. The approximate reading is
$100 \times 0.06 = 6$%. Because the coefficient is small, the two are within two-tenths of
a percent, so reporting "about a 6% raise per year of schooling" is fine; if you want the
precise figure, use $6.18$%.
:::
::::

:::{admonition} Durable skill: Report a number in the units your audience thinks in
:class: tip
A slope of $0.752$ on a log-log plot means nothing to a biologist, a manager, or a
journalist. "A 10% heavier body carries a 7% heavier brain" means everything. The habit of
translating a raw coefficient into the percent, the dollar, or the doubling that your
listener already cares about is what separates an analyst who computes from one who
communicates. Practice it by never leaving a logged coefficient on the page without its
percent translation beside it.
:::

(ch10-box-cox)=
## 10.3 Box-Cox: letting the data choose the power

Guessing a transformation from the ladder of powers works, but it feels arbitrary, and
two analysts can disagree. Box and Cox proposed a principled fix: put the candidate powers
into one family indexed by a number $\lambda$, then let maximum likelihood pick the
$\lambda$ that makes the normal model fit best. We can now motivate the method with a
dataset that curves and fans at once: the classic `cars` data, where a car's stopping
distance is measured against its speed.

### Intuition

The powers $\sqrt{Y}$, $\log Y$, $Y$, and $Y^2$ are all special cases of raising $Y$ to a
power. If you write the transformation as one smooth function of a power parameter
$\lambda$, then choosing a transformation becomes choosing a number, and choosing a number
is something likelihood does well. Box-Cox writes down the likelihood of the data as a
function of $\lambda$, with the regression coefficients and error variance profiled out,
and reports the $\lambda$ that maximizes it, plus a confidence interval so you know how
sharply the data pin it down.

### Formula

:::{admonition} Definition 10.5: Box-Cox family
:class: note definition
For a positive response $Y > 0$, the **Box-Cox family** of transformations indexed by the
power parameter $\lambda$ is

$$
Y^{(\lambda)} =
\begin{cases}
\dfrac{Y^{\lambda} - 1}{\lambda}, & \lambda \neq 0, \\[2mm]
\log Y, & \lambda = 0.
\end{cases}
$$
:::

- $\lambda$ is the power parameter to be estimated; $\lambda = 1$ is essentially no
  transformation, $\lambda = 0.5$ is the square root, $\lambda = 0$ is the log, $\lambda = -1$
  is the reciprocal.
- The "$-1$" and division by $\lambda$ make the family continuous at $\lambda = 0$, where it
  becomes $\log Y$, so the ladder has no gap.

In words: one dial $\lambda$ slides smoothly through all the rungs of the ladder of
powers, and the log sits exactly at the $\lambda = 0$ notch.

### Derivation (Box-Cox as a profile likelihood)

:::{admonition} Theorem 10.6: Box-Cox profile log-likelihood
:class: important theorem
Suppose that for the correct power $\lambda$ the transformed response follows the normal
linear model $Y_i^{(\lambda)} = \mathbf{x}_i'\boldsymbol{\beta} + \varepsilon_i$ with
$\varepsilon_i \overset{\text{iid}}{\sim} N(0, \sigma^2)$. Profiling $\boldsymbol{\beta}$ and
$\sigma^2$ out of the likelihood of the *original* data $Y_i$ leaves the profile
log-likelihood

$$
\ell_p(\lambda) = -\frac{n}{2}\log\!\left(\frac{\mathrm{RSS}(\lambda)}{n}\right)
+ (\lambda - 1)\sum_{i=1}^n \log Y_i ,
$$

where $\mathrm{RSS}(\lambda)$ is the residual sum of squares from the least-squares fit of
$Y^{(\lambda)}$ on $\mathbf{X}$. The Box-Cox estimate is
$\hat\lambda = \arg\max_\lambda \ell_p(\lambda)$, and a $100(1-\alpha)$% confidence interval
is $\{\lambda : \ell_p(\lambda) \ge \ell_p(\hat\lambda) - \tfrac{1}{2}\chi^2_{1,\,1-\alpha}\}$.
:::

**Proof.** Assume that for the correct power the transformed response follows the
normal linear model,

$$
Y_i^{(\lambda)} = \mathbf{x}_i' \boldsymbol{\beta} + \varepsilon_i, \qquad
\varepsilon_i \overset{\text{iid}}{\sim} N(0, \sigma^2),
$$

where $\mathbf{x}_i'$ is the $i$-th row of the design matrix $\mathbf{X}$ from
@ch07-ls-matrix. In words: once $Y$ is raised to the right power, the result obeys the
ordinary normal regression model. The parameters are $\lambda$, $\boldsymbol{\beta}$, and
$\sigma^2$. The subtle point is that the likelihood must be written for the *original* data
$Y_i$, not for the transformed $Y_i^{(\lambda)}$, because we are comparing different values
of $\lambda$ and each puts $Y^{(\lambda)}$ on a different scale. Changing variables from
$Y_i^{(\lambda)}$ to $Y_i$ brings in the Jacobian, the derivative factor that any change of
variables introduces, here $\mathrm{d}Y_i^{(\lambda)}/\mathrm{d}Y_i = Y_i^{\lambda - 1}$.
The log-likelihood of the observed $Y_i$ is therefore

$$
\ell(\lambda, \boldsymbol{\beta}, \sigma^2)
= -\frac{n}{2}\log(2\pi\sigma^2)
- \frac{1}{2\sigma^2}\sum_{i=1}^n \left(Y_i^{(\lambda)} - \mathbf{x}_i'\boldsymbol{\beta}\right)^2
+ (\lambda - 1)\sum_{i=1}^n \log Y_i ,
$$

In words: this is the usual normal log-likelihood for the transformed response, plus one
extra term that corrects for stretching the $Y$ scale (the sum of the log-Jacobians). Now
**profile out**
$\boldsymbol{\beta}$ and $\sigma^2$: for any fixed $\lambda$, the values that maximize
$\ell$ are exactly the least-squares fit of $Y^{(\lambda)}$ on $\mathbf{X}$, giving
residual sum of squares $\mathrm{RSS}(\lambda)$ and
$\hat\sigma^2(\lambda) = \mathrm{RSS}(\lambda)/n$ (the same argument as the normal
maximum-likelihood estimate of the variance in Chapter 2). Substituting these back and
dropping constants leaves the **profile
log-likelihood**, a function of $\lambda$ alone:

$$
\ell_p(\lambda) = -\frac{n}{2}\log\!\left(\frac{\mathrm{RSS}(\lambda)}{n}\right)
+ (\lambda - 1)\sum_{i=1}^n \log Y_i .
$$

In words: for each $\lambda$, fit the transformed response by ordinary least squares, read
off its residual sum of squares, penalize by the Jacobian term, and the best $\lambda$ is
the one that maximizes the result. The maximizer $\hat\lambda$ is the Box-Cox estimate. A
$100(1-\alpha)$% confidence interval is the set of $\lambda$ with
$\ell_p(\lambda) \ge \ell_p(\hat\lambda) - \tfrac{1}{2}\chi^2_{1,\,1-\alpha}$, the usual
likelihood-ratio interval. $\blacksquare$

:::{admonition} Key idea
:class: tip keyidea
The Jacobian term $(\lambda - 1)\sum \log Y_i$ is what makes different powers comparable.
Without it you could shrink $\mathrm{RSS}(\lambda)$ toward zero just by choosing a power that
squashes $Y$ toward a constant, and the "best" transformation would always be the most
extreme one. The log-Jacobian penalizes that cheat exactly enough.
:::

### R

R's `MASS::boxcox` computes $\ell_p(\lambda)$ over a grid and draws it. The plot in
@fig-ch10-boxcox-profile is the profile log-likelihood for the `cars` model, with its peak
and 95% interval marked.

```r
cars <- read.csv("data/cars.csv")
fit_lin <- lm(dist ~ speed, data = cars)
coef(fit_lin)
```
```text
(Intercept)       speed
 -17.579095    3.932409
```

The straight-line fit is not obviously wrong, but its residuals fan out as the fitted
distance grows, the funnel shown in @fig-ch10-cars-funnel. That widening scatter is the
signal that the response needs a transformation, and Box-Cox will say which one.

```{figure} figures/fig_ch10_cars_funnel.png
:name: fig-ch10-cars-funnel
:alt: Scatterplot of residuals against fitted values for the linear model of stopping distance on speed. The points scatter close to zero at low fitted values and spread out much more widely at high fitted values, forming a funnel that opens to the right, with two light guide lines tracing the widening band.
The residuals from the raw linear fit of stopping distance on speed fan out as the fit grows: small scatter for slow cars, large scatter for fast ones. This funnel is the nonconstant-variance warning that motivates transforming the response.
```

```{figure} figures/fig_ch10_boxcox_profile.png
:name: fig-ch10-boxcox-profile
:alt: A curve of the Box-Cox profile log-likelihood against lambda from negative 0.5 to 1.5, peaking near lambda 0.43. A dashed horizontal line marks the 95 percent likelihood cutoff, and dotted vertical lines mark the estimate 0.43 and the confidence interval from 0.23 to 0.66, which contains 0.5.
The Box-Cox profile for the cars data peaks at lambda about 0.43, and the 95 percent interval runs from 0.23 to 0.66. Because 0.5 sits comfortably inside, the square-root transformation is a clean, interpretable choice.
```

:::{admonition} Example 10.2: Choosing a transformation for stopping distance
:class: note
**Question.** What power transformation of stopping distance makes a straight-line model
in speed fit best, and does the simple square root fall within reach of the data?

**Intuition.** Maximize the profile log-likelihood over $\lambda$, read off $\hat\lambda$
and its 95% interval, and check whether the round number $0.5$ is inside.

**Formula.** $\hat\lambda = \arg\max_\lambda \ell_p(\lambda)$, with interval
$\{\lambda : \ell_p(\lambda) \ge \ell_p(\hat\lambda) - \tfrac12 \chi^2_{1,0.95}\}$ and
$\chi^2_{1,0.95} = 3.841$.

**Computation.**

```r
library(MASS)
bc <- boxcox(fit_lin, lambda = seq(-0.5, 1.5, by = 0.01), plotit = FALSE)
lambda_hat <- bc$x[which.max(bc$y)]
ci <- range(bc$x[bc$y > max(bc$y) - 0.5 * qchisq(0.95, 1)])
round(c(lambda_hat = lambda_hat, ci_low = ci[1], ci_high = ci[2]), 3)
```
```text
lambda_hat     ci_low    ci_high
      0.43       0.23       0.66
```

```r
fit_sqrt <- lm(sqrt(dist) ~ speed, data = cars)
coef(fit_sqrt)
round(c(R2_linear = summary(fit_lin)$r.squared,
        R2_sqrt   = summary(fit_sqrt)$r.squared), 4)
```
```text
(Intercept)       speed
  1.2770502   0.3224125
R2_linear   R2_sqrt
   0.6511    0.7094
```

In Python there is no built-in Box-Cox for a fitted model, so we compute the profile
log-likelihood straight from the derivation, which doubles as a check on the formula.

```python
cars = pd.read_csv("data/cars.csv")
fit_lin = smf.ols("dist ~ speed", data=cars).fit()

def boxcox_loglik(lam, y, X):
    """Profile log-likelihood of the Box-Cox parameter lambda."""
    n = len(y)
    if abs(lam) < 1e-8:
        z = np.log(y)
    else:
        z = (y ** lam - 1) / lam
    resid = z - X @ np.linalg.lstsq(X, z, rcond=None)[0]
    rss = resid @ resid
    return -n / 2 * np.log(rss / n) + (lam - 1) * np.sum(np.log(y))

y = cars["dist"].to_numpy()
X = np.column_stack([np.ones(len(cars)), cars["speed"].to_numpy()])
lams = np.arange(-0.5, 1.5 + 1e-9, 0.01)
ll = np.array([boxcox_loglik(l, y, X) for l in lams])
lambda_hat = lams[np.argmax(ll)]
cutoff = ll.max() - 0.5 * 3.841459   # chi-square(0.95, 1)
inside = lams[ll > cutoff]
print(round(lambda_hat, 3), round(inside.min(), 3), round(inside.max(), 3))
```
```text
0.43 0.23 0.66
```

```python
fit_sqrt = smf.ols("np.sqrt(dist) ~ speed", data=cars).fit()
print(fit_sqrt.params)
print(round(fit_lin.rsquared, 4), round(fit_sqrt.rsquared, 4))
```
```text
Intercept    1.277050
speed        0.322413
dtype: float64
0.6511 0.7094
```

**Interpretation.** The data favor $\hat\lambda = 0.43$, with a 95% interval from $0.23$ to
$0.66$. That interval contains $0.5$, so the square root is a defensible, round-number
choice, and the hand-rolled Python profile agrees with R's `boxcox` to the grid step.
Fitting $\sqrt{\text{dist}}$ on speed raises $R^2$ from $0.65$ to $0.71$ and, more
importantly, flattens the residual funnel, as @fig-ch10-boxcox-after shows. There is a
physics reason to like it: kinetic energy grows with the square of speed, so a model
linear in speed for the *square root* of distance is close to the mechanics. Box-Cox
pointed at a transformation that also makes scientific sense, which is the best kind of
agreement.
:::

```{figure} figures/fig_ch10_boxcox_after.png
:name: fig-ch10-boxcox-after
:alt: Scatterplot of residuals against fitted values for the model of square-root stopping distance on speed. The points scatter in a flat, even band around the zero line with no funnel shape.
After the square-root transform the residual funnel from the raw fit is gone: the scatter is now an even band around zero. The transformation stabilized the variance and straightened the mean at once.
```

::::{admonition} Try it 10.2
:class: important
Box-Cox on a different dataset returns $\hat\lambda = 0.05$ with a 95% interval of
$[-0.15, 0.28]$. Which transformation would you use, and how would you justify it to a
reader who dislikes fractional powers?

:::{admonition} Solution
:class: dropdown
The interval contains $0$, so the log transformation ($\lambda = 0$) is fully supported and
is far easier to interpret than a raw power near $0.05$. Report the log: its coefficients
read as percentages (@ch10-log-interpretation), the data do not distinguish $\lambda = 0.05$
from $\lambda = 0$ at 95% confidence, and a transformation you can explain beats a
marginally better-fitting one you cannot.
:::
::::

(ch10-wls)=
## 10.4 Weighted least squares

Transformations attack a curved mean or a variance that grows with the mean. Sometimes,
though, the variance is unequal for a reason that has nothing to do with the mean: some
observations are simply measured more precisely than others. Averaging ten readings gives
a more reliable point than a single reading; a well-calibrated instrument beats a rough
one. When you *know* the relative precision of each point, you should not throw that
knowledge away by treating every point equally. Weighted least squares is how you use it.

### Intuition

Ordinary least squares gives every observation the same vote. If one point carries ten
times the variance of another, that is like letting a noisy witness testify as loudly as a
careful one. Weighted least squares turns down the volume on the noisy points and turns it
up on the precise ones, in exact inverse proportion to their variances.
@fig-ch10-wls-concept shows the idea: low-noise points are drawn large because they count
more.

```{figure} figures/fig_ch10_wls_concept.png
:name: fig-ch10-wls-concept
:alt: Scatterplot of simulated data whose vertical scatter widens from left to right, with a rising true mean line drawn through it. Each point is sized in inverse proportion to its variance, so the tightly scattered points on the left are large and the widely scattered points on the right are small.
Weighted least squares gives each point influence in inverse proportion to its variance. The precise, low-noise points (drawn large) pull harder on the line than the noisy ones (drawn small).
```

### Formula

Keep the linear model but let the error variances differ:

$$
Y_i = \mathbf{x}_i'\boldsymbol{\beta} + \varepsilon_i, \qquad
E\{\varepsilon_i\} = 0, \qquad
\operatorname{Var}\{\varepsilon_i\} = \frac{\sigma^2}{w_i}, \qquad
\operatorname{Cov}\{\varepsilon_i,\varepsilon_j\} = 0 \ (i\neq j) .
$$

Here $w_i$ is known up to the common constant $\sigma^2$.

:::{admonition} Definition 10.7: Weight and weighted least squares estimator
:class: note definition
In the model $\operatorname{Var}\{\varepsilon_i\} = \sigma^2/w_i$, the **weight** $w_i > 0$ of
observation $i$ is inversely proportional to its error variance, so a large $w_i$ marks a
precise observation. The **weighted least squares estimator** minimizes the weighted sum of
squares $Q_w(\boldsymbol{\beta}) = \sum_{i=1}^n w_i (Y_i - \mathbf{x}_i'\boldsymbol{\beta})^2$
and equals

$$
\mathbf{b}_W = (\mathbf{X}'\mathbf{W}\mathbf{X})^{-1}\mathbf{X}'\mathbf{W}\mathbf{Y},
\qquad \mathbf{W} = \operatorname{diag}(w_1,\dots,w_n) .
$$
:::

In words: penalize each squared residual by its weight, so precise points contribute more to
the total the fit is trying to shrink.

### Derivation (WLS from Gauss-Markov)

:::{admonition} Theorem 10.8: Gauss-Markov for weighted least squares
:class: important theorem
Under the model $\mathbf{Y} = \mathbf{X}\boldsymbol{\beta} + \boldsymbol{\varepsilon}$ with
$E\{\boldsymbol{\varepsilon}\} = \mathbf{0}$ and
$\operatorname{Var}\{\boldsymbol{\varepsilon}\} = \sigma^2 \mathbf{W}^{-1}$ for a known
positive diagonal weight matrix $\mathbf{W}$, the weighted least squares estimator
$\mathbf{b}_W = (\mathbf{X}'\mathbf{W}\mathbf{X})^{-1}\mathbf{X}'\mathbf{W}\mathbf{Y}$ is the
best linear unbiased estimator of $\boldsymbol{\beta}$, with variance
$\operatorname{Var}\{\mathbf{b}_W\} = \sigma^2 (\mathbf{X}'\mathbf{W}\mathbf{X})^{-1}$.
:::

**Proof.** The trick is to transform the unequal-variance model into an equal-variance
one and then quote the Gauss-Markov result we already proved. Multiply the $i$-th
observation through by $\sqrt{w_i}$. Collecting these into matrices with
$\mathbf{W}^{1/2} = \operatorname{diag}(\sqrt{w_1},\dots,\sqrt{w_n})$, define

$$
\mathbf{Y}^{\ast} = \mathbf{W}^{1/2}\mathbf{Y}, \qquad
\mathbf{X}^{\ast} = \mathbf{W}^{1/2}\mathbf{X}, \qquad
\boldsymbol{\varepsilon}^{\ast} = \mathbf{W}^{1/2}\boldsymbol{\varepsilon} .
$$

The transformed model is $\mathbf{Y}^{\ast} = \mathbf{X}^{\ast}\boldsymbol{\beta} + \boldsymbol{\varepsilon}^{\ast}$,
and its errors are now homoscedastic:

$$
\operatorname{Var}\{\boldsymbol{\varepsilon}^{\ast}\}
= \mathbf{W}^{1/2}\operatorname{Var}\{\boldsymbol{\varepsilon}\}\mathbf{W}^{1/2}
= \mathbf{W}^{1/2}\left(\sigma^2 \mathbf{W}^{-1}\right)\mathbf{W}^{1/2}
= \sigma^2 \mathbf{I} .
$$

The starred model satisfies every ordinary least squares assumption, so by the matrix
Gauss-Markov theorem (@ch07-gauss-markov) the best linear unbiased estimator is ordinary
least squares on the starred data:

$$
\mathbf{b}_W = (\mathbf{X}^{\ast\prime}\mathbf{X}^{\ast})^{-1}\mathbf{X}^{\ast\prime}\mathbf{Y}^{\ast}
= (\mathbf{X}'\mathbf{W}^{1/2}\mathbf{W}^{1/2}\mathbf{X})^{-1}\mathbf{X}'\mathbf{W}^{1/2}\mathbf{W}^{1/2}\mathbf{Y}
= (\mathbf{X}'\mathbf{W}\mathbf{X})^{-1}\mathbf{X}'\mathbf{W}\mathbf{Y} .
$$

This is the WLS estimator, and because it is OLS on a model that truly has constant
variance, it inherits every good property: it is unbiased and it is BLUE, with
$\operatorname{Var}\{\mathbf{b}_W\} = \sigma^2 (\mathbf{X}'\mathbf{W}\mathbf{X})^{-1}$. Plain
OLS on the original data is still unbiased here, but it is no longer best: it wastes the
precision information in the weights. $\blacksquare$

The derivation also tells you how to *compute* WLS with nothing but an OLS routine: form
$\sqrt{w_i}\,Y_i$ and $\sqrt{w_i}\,\mathbf{x}_i$ and regress. We use that as a check below.

### R

The `strongx` data are a physics experiment: at ten beam energies, a scattering
cross-section was measured, and each measurement comes with its own known standard
deviation `sd`. Known standard deviations are the textbook case for WLS, with weights
$w_i = 1/\text{sd}_i^2$.

```r
strongx <- read.csv("data/strongx.csv")
strongx[, c("energy", "crossx", "sd")]
```
```text
   energy crossx sd
1   0.345    367 17
2   0.287    311  9
3   0.251    295  9
4   0.225    268  7
5   0.207    253  7
6   0.186    239  6
7   0.161    220  6
8   0.132    213  6
9   0.084    193  5
10  0.060    192  5
```

:::{admonition} Example 10.3: Weighting the physics measurements
:class: note
**Question.** How do the fitted line and its standard errors change when the known
measurement precisions are used as weights instead of ignored?

**Intuition.** Set $w_i = 1/\text{sd}_i^2$, fit both OLS and WLS, and compare the slopes and
their standard errors. The most precise points (smallest `sd`) should pull hardest under
WLS.

**Formula.** $\mathbf{b}_W = (\mathbf{X}'\mathbf{W}\mathbf{X})^{-1}\mathbf{X}'\mathbf{W}\mathbf{Y}$
with $w_i = 1/\text{sd}_i^2$.

**Computation.**

```r
w <- 1 / strongx$sd^2
fit_ols <- lm(crossx ~ energy, data = strongx)
fit_wls <- lm(crossx ~ energy, data = strongx, weights = w)
round(rbind(OLS = coef(fit_ols), WLS = coef(fit_wls)), 3)
```
```text
    (Intercept)  energy
OLS     135.000 619.712
WLS     148.473 530.835
```

```r
round(rbind(OLS = summary(fit_ols)$coef[, "Std. Error"],
            WLS = summary(fit_wls)$coef[, "Std. Error"]), 4)
```
```text
    (Intercept)  energy
OLS     10.0753 47.6831
WLS      8.0786 47.5500
```

The derivation promised that WLS is just OLS on the $\sqrt{w}$-scaled data. Confirm it by
building the scaled variables and regressing with no intercept (the intercept becomes the
$\sqrt{w}$ column):

```r
sw       <- sqrt(w)
y_star   <- strongx$crossx * sw     # sqrt(w) * Y
int_star <- sw                      # sqrt(w) * 1 (the intercept column)
x_star   <- strongx$energy * sw     # sqrt(w) * X
fit_trans <- lm(y_star ~ 0 + int_star + x_star)
round(coef(fit_trans), 3)
```
```text
int_star   x_star
 148.473  530.835
```

Now Python, using `smf.wls` and then the same by-hand check.

```python
strongx = pd.read_csv("data/strongx.csv")
w = 1 / strongx["sd"] ** 2
fit_ols = smf.ols("crossx ~ energy", data=strongx).fit()
fit_wls = smf.wls("crossx ~ energy", data=strongx, weights=w).fit()
print(np.round(fit_ols.params.values, 3))
print(np.round(fit_wls.params.values, 3))
```
```text
[135.    619.712]
[148.473 530.835]
```

```python
print(np.round(fit_ols.bse.values, 4))
print(np.round(fit_wls.bse.values, 4))
```
```text
[10.0753 47.6831]
[ 8.0786 47.55  ]
```

```python
sw = np.sqrt(w).to_numpy()
y_star = strongx["crossx"].to_numpy() * sw
X_star = np.column_stack([sw, strongx["energy"].to_numpy() * sw])
b_star = np.linalg.lstsq(X_star, y_star, rcond=None)[0]
print(np.round(b_star, 3))
```
```text
[148.473 530.835]
```

**Interpretation.** Weighting moves the slope from $619.7$ to $530.8$ and the intercept
from $135.0$ to $148.5$, because the precise low-energy points (with `sd` of 5 or 6) now
outvote the noisy high-energy ones (with `sd` up to 17). The intercept's standard error
drops from $10.08$ to $8.08$, a real gain in precision bought for free by using information
we already had. The by-hand $\sqrt{w}$-scaled regression reproduces the WLS coefficients
$148.473$ and $530.835$ to every digit in both languages, exactly as the derivation
promised. @fig-ch10-wls-strongx draws both lines through the measured points and their
error bars.
:::

```{figure} figures/fig_ch10_wls_strongx.png
:name: fig-ch10-wls-strongx
:alt: Scatterplot of scattering cross-section against inverse beam energy for ten physics measurements, each drawn with a vertical error bar equal to its known standard deviation. A dashed OLS line and a solid WLS line both rise through the points; the WLS line has a gentler slope and passes closer to the small-error-bar points.
The strongx measurements with their known error bars, fit two ways. WLS (solid) leans toward the precise, small-error-bar points, while OLS (dashed) treats every point equally and is pulled by the noisier ones.
```

:::{admonition} Durable skill: Weight evidence by its precision
:class: tip
The WLS idea reaches far past regression. When you combine several estimates of the same
quantity, whether lab measurements, survey estimates from different sample sizes, or model
predictions of different reliability, the right way to pool them is to weight each by the
inverse of its variance. That single principle is the engine behind meta-analysis, sensor
fusion, and portfolio construction. Learn it here as "trust the precise points more," and
you will recognize it everywhere careful people combine noisy information.
:::

When the variances are *not* known, you estimate the weights, usually by modeling how the
spread grows (for example, regressing the absolute residuals on a predictor and using the
fitted values to build weights). That two-step method, iterated, is common and effective,
and it recycles the variance-modeling instinct that Chapter 14 reuses to handle
overdispersion in count models. The strongx case is cleaner because physics handed us the
variances directly.

::::{admonition} Try it 10.3
:class: important
An analyst has replicate-averaged data: row $i$ is the mean of $n_i$ independent readings,
so its variance is $\sigma^2/n_i$. What weights should the WLS fit use, and which rows get
the most influence?

:::{admonition} Solution
:class: dropdown
The variance of row $i$ is $\sigma^2/n_i$, matching the WLS form $\sigma^2/w_i$ with
$w_i = n_i$. So weight each averaged row by the number of readings behind it. Rows built
from more replicates are more precise and correctly receive proportionally more influence
on the fit.
:::
::::

(ch10-transform-limits)=
## 10.5 When a transformation is not enough: the Galapagos counts

Every remedy so far assumed the underlying model was sound and only its scale or its
weighting was off. Sometimes that assumption is wrong, and a transformation only hides the
problem. The Galapagos species data from Chapter 9 are a case in point, and following them
here shows you how to tell a fixable scale problem from a model that needs replacing.

Recall the setup from @ch09-cooks-distance: for 30 Galapagos islands, the number of plant
species is regressed on geographic predictors (area, elevation, and distances), and one
island, Isabela, has an enormous leverage value because it dwarfs the others in area. The raw fit
has a residual funnel, because islands with more species also scatter more widely, the
signature of count data. A natural remedy is a variance-stabilizing transformation. For
counts, the square root is the classic choice, since a Poisson count with mean $\mu$ has
variance $\mu$, and $\sqrt{\text{count}}$ has roughly constant variance.

```r
gala <- read.csv("data/gala.csv")
fit_g_lin  <- lm(Species ~ Area + Elevation + Nearest + Scruz + Adjacent,
                 data = gala)
fit_g_sqrt <- lm(sqrt(Species) ~ Area + Elevation + Nearest + Scruz + Adjacent,
                 data = gala)
round(c(R2_linear = summary(fit_g_lin)$r.squared,
        R2_sqrt   = summary(fit_g_sqrt)$r.squared), 4)
```
```text
R2_linear   R2_sqrt
   0.7658    0.7827
```

The square root helps a little, and @fig-ch10-gala-transform shows the funnel easing. But
look closer and the cracks show. Isabela still has a leverage value of $0.97$ on the
transformed fit, essentially unchanged, because transforming $Y$ does nothing about an $X$
that is far from the others.

```r
h <- hatvalues(fit_g_sqrt)
names(h) <- gala$island
round(sort(h, decreasing = TRUE)[1:3], 3)
```
```text
   Isabela Fernandina     Darwin
     0.969      0.950      0.466
```

```{figure} figures/fig_ch10_gala_transform.png
:name: fig-ch10-gala-transform
:alt: Two side-by-side residual-versus-fitted plots for the Galapagos data. The left panel, for raw species counts, shows a strong funnel widening to the right with Isabela marked as a red diamond far from the others. The right panel, for square-root species, shows a narrower band but Isabela still sits apart as an influential point.
Transforming the response eases the funnel (right panel versus left) but leaves Isabela's influence intact, because a square root of the response cannot fix a predictor value that is extreme. The transformation treated a symptom, not the cause.
```

:::{admonition} Example 10.4: The back-transformation trap
:class: note
**Question.** If we predict Isabela's species count from the square-root model and square
the prediction to get back to counts, do we recover its actual count?

**Intuition.** Predict on the transformed scale, then undo the transform by squaring, and
compare to the true count. Watch for a systematic gap.

**Formula.** Predict $\widehat{\sqrt{Y}}$, then report $(\widehat{\sqrt{Y}})^2$ as the
count, and compare to the observed `Species`.

**Computation.**

```r
new_isabela <- gala[gala$island == "Isabela",
                    c("Area", "Elevation", "Nearest", "Scruz", "Adjacent")]
pred_sqrt <- unname(predict(fit_g_sqrt, newdata = new_isabela))
round(c(fitted_sqrt            = pred_sqrt,
        back_transformed_count = pred_sqrt^2,
        actual_count           = gala$Species[gala$island == "Isabela"]), 2)
```
```text
           fitted_sqrt back_transformed_count           actual_count
                 19.82                 392.67                 347.00
```

```python
gala = pd.read_csv("data/gala.csv")
form = "Species ~ Area + Elevation + Nearest + Scruz + Adjacent"
fit_g_lin = smf.ols(form, data=gala).fit()
fit_g_sqrt = smf.ols("np.sqrt(Species) ~ Area + Elevation + Nearest + Scruz + Adjacent",
                     data=gala).fit()
print(round(fit_g_lin.rsquared, 4), round(fit_g_sqrt.rsquared, 4))
new_isabela = gala.loc[gala["island"] == "Isabela",
                       ["Area", "Elevation", "Nearest", "Scruz", "Adjacent"]]
pred_sqrt = fit_g_sqrt.predict(new_isabela).iloc[0]
actual = gala.loc[gala["island"] == "Isabela", "Species"].iloc[0]
print(round(pred_sqrt, 2), round(pred_sqrt ** 2, 2), actual)
```
```text
0.7658 0.7827
19.82 392.67 347
```

**Interpretation.** Squaring the fitted $19.82$ gives $392.67$ species, overshooting the
actual $347$ by 46. Squaring a prediction does not give the prediction on the original
scale, because the mean of a square is not the square of the mean. This **back-transformation
bias** (Definition 10.9) is a general nuisance of transformed-response models: the fit is
honest on the transformed scale but biased when you undo the transform, and correcting it
needs an extra variance term. The square root treated the funnel but created a new problem at
the point you most want to predict.
:::

:::{admonition} Definition 10.9: Back-transformation bias
:class: note definition
**Back-transformation bias** is the systematic error introduced when a prediction made on a
transformed response scale is mapped back to the original scale by inverting the transform,
because the mean of a nonlinear function is not that function of the mean:
$E\{g(Y)\} \neq g(E\{Y\})$ in general.
:::

@fig-ch10-backtransform-bias shows why the gap opens, using the squaring curve that undoes a
square-root fit. Take two predictions equal distances above and below the average. Squaring
bends the curve upward, so the high one climbs more than the low one drops. Their average
(on the straight chord) lands above the square of the average (on the curve), and that
vertical gap is the bias. Any curved back-transform, including the log, does the same thing.

```{figure} figures/fig_ch10_backtransform_bias.png
:name: fig-ch10-backtransform-bias
:alt: A plot of the upward-bending squaring curve, y equals x squared, mapping predictions on the square-root scale to the count scale. Two blue points sit on the curve at equal distances left and right of the average prediction. A dashed straight chord joins them. At the average, a green dot on the curve marks the square of the average, and a red dot on the chord above it marks the average of the two squares. The vertical distance between them is labeled bias.
Because the back-transform curve bends upward, averaging along the chord lands above the curve. The square of the average (green) sits below the honest average of the squares (red), and that gap is the back-transformation bias.
```

Step back and count the warning signs. The response is a count. Several islands have very
few species (six islands have fewer than ten). The variance grows with the mean by
construction. Back-transformed predictions are biased, and a plain linear fit to the counts
predicts a negative number of species for the smallest islands, which is impossible. Every one of these says the same thing: the
normal, constant-variance linear model is the wrong frame, and no power of $Y$ will make it
right. The honest fix is not to transform the data until they fit the model, but to change
the model to one built for counts. That model is Poisson regression, and @ch14-poisson-model
returns to these exact islands and fits them properly, recalling both Isabela's high-leverage
status from Chapter 9 and this failed transformation. For now, the lesson is diagnostic: learn to
tell a scale problem, which a transformation fixes, from a distributional problem, which it
cannot.

:::{admonition} Key idea
:class: tip keyidea
A transformation fixes a scale problem: the model is right but $Y$ sits on the wrong axis. It
cannot fix a distributional problem, where the response is a count or a proportion whose
variance and range are set by its distribution. When back-transformed predictions are biased
and a linear fit predicts impossible values, stop transforming and change the model.
:::

::::{admonition} Try it 10.4
:class: important
Name two features of a response variable that should make you reach for a different model
(Chapters 13 or 14) rather than a transformation, and say why a transformation cannot fully
fix each.

:::{admonition} Solution
:class: dropdown
First, a binary or count response bounded at zero: no power transform keeps predictions
inside the allowed range (a back-transformed count can go negative), and the variance is
tied to the mean by the distribution, not by scale. Second, a response with many values at
a boundary (many zeros, or proportions piling at 0 or 1): the distribution is not a smooth
normal on any scale, so stabilizing the variance still leaves the wrong likelihood. Both
call for a model whose error distribution matches the data, which is the generalized linear
model idea of Chapter 14.
:::
::::

(ch10-huber)=
## 10.6 A first look at robust regression

The last remedy addresses a different failure: not a curved mean or unequal variance, but a
handful of points with outsized residuals that drag the fit toward themselves. Least
squares is exquisitely sensitive to such points because it squares residuals, so a single
large one can dominate the entire sum. Robust regression replaces the square with a loss
that grows more gently, so no one point can take over.

@fig-ch10-huber-lines shows the payoff on a simple cloud with one point knocked far off. The
least-squares line tilts up to chase the stray point; the Huber line shrugs it off and stays
with the crowd. That is the entire promise of robust regression in one picture, and the rest
of the section explains how the capped loss delivers it.

```{figure} figures/fig_ch10_huber_lines.png
:name: fig-ch10-huber-lines
:alt: A scatterplot of a clean rising linear cloud of blue points plus one red point placed far above the trend at the middle of the x range. A dashed orange OLS line is tilted upward, pulled toward the red outlier, while a solid green Huber line passes through the blue cloud and is barely affected. The blue points are drawn larger than the downweighted outlier.
One vertical outlier, two fits. Ordinary least squares (dashed) is dragged toward the stray point, while the Huber fit (solid) keeps to the bulk of the data. The capped Huber loss limits how hard any single point can pull.
```

### Intuition

Picture the sum of squared residuals as a tug of war in which each point pulls with a force
proportional to its residual. A point twice as far off pulls four times as hard, because of
the square. Huber's idea is to cap that escalation: inside a normal range, keep the squared
loss and its efficiency, but once a residual is large enough to look like an outlier, let
its pull grow only linearly, not quadratically. @fig-ch10-huber-psi draws the resulting
weight each point receives.

```{figure} figures/fig_ch10_huber_psi.png
:name: fig-ch10-huber-psi
:alt: A plot of the weight given to a point against its standardized residual u from negative 6 to 6. The OLS line is flat at weight 1 everywhere. The Huber curve is flat at 1 for u between negative c and positive c, where c is about 1.345, then decays like c over the absolute value of u outside that band.
The Huber weight function keeps full weight 1 for residuals inside a central band and then tapers off like 1 over the residual size beyond it. OLS, by contrast, gives every point full weight no matter how extreme.
```

### Formula

M-estimation, where the M signals a maximum-likelihood-style objective, replaces the
least-squares objective with

$$
\min_{\boldsymbol{\beta}} \; \sum_{i=1}^n \rho_c\!\left(\frac{Y_i - \mathbf{x}_i'\boldsymbol{\beta}}{s}\right),
$$

where $\rho_c$ is the Huber loss.

:::{admonition} Definition 10.10: Huber loss
:class: note definition
For a tuning constant $c > 0$, the **Huber loss** of a standardized residual $u$ is

$$
\rho_c(u) =
\begin{cases}
\tfrac{1}{2}u^2, & |u| \le c, \\[1mm]
c\,|u| - \tfrac{1}{2}c^2, & |u| > c,
\end{cases}
$$

which is quadratic for small residuals and grows only linearly once $|u|$ exceeds $c$.
:::

- $u = (Y_i - \mathbf{x}_i'\boldsymbol{\beta})/s$ is the residual standardized by a resistant
  scale estimate $s$.
- $c$ is a tuning constant; $c = 1.345$ gives about 95% of the efficiency of OLS when the
  errors really are normal, while bounding the influence of outliers.

In words: penalize ordinary residuals by the familiar square, but penalize far-out
residuals only linearly, so an outlier is expensive rather than catastrophic.

### Derivation (IRLS and the honest limitation)

:::{admonition} Theorem 10.11: Huber estimating equations
:class: important theorem
The Huber M-estimator solves the estimating equations
$\sum_i w(u_i)\,(Y_i - \mathbf{x}_i'\boldsymbol{\beta})\,\mathbf{x}_i = \mathbf{0}$ with weight
$w(u) = \min(1, c/|u|)$. These are the weighted least squares normal equations with
residual-dependent weights, so the estimator is computed by iteratively reweighted least
squares: fit by WLS, recompute the weights from the new residuals, and repeat until the
coefficients converge.
:::

**Proof.** Differentiate the objective and set it to zero. With
$\psi_c = \rho_c'$, the estimating equations are $\sum_i \psi_c(u_i)\,\mathbf{x}_i = \mathbf{0}$.
Write $\psi_c(u) = w(u)\,u$ with the **weight**

$$
w(u) = \frac{\psi_c(u)}{u} = \min\!\left(1, \frac{c}{|u|}\right) .
$$

Then the estimating equations become
$\sum_i w(u_i)\,(Y_i - \mathbf{x}_i'\boldsymbol{\beta})\,\mathbf{x}_i = \mathbf{0}$, which are
exactly the weighted least squares normal equations from @ch10-wls with weights $w(u_i)$.
The catch is that the weights depend on the residuals, which depend on the fit. So we
iterate: start from the OLS fit, compute residuals and hence weights, solve the WLS problem,
recompute residuals and weights, and repeat until the coefficients stop moving. This is
**iteratively reweighted least squares** (IRLS). A residual inside the band ($|u| \le c$)
keeps weight $1$; a wild residual gets weight $c/|u|$, shrinking as it grows. $\blacksquare$

The derivation exposes the method's honest boundary. The weight $w(u)$ depends only on the
*residual*, so Huber regression protects against outliers in the response direction, points
with a large vertical miss. It does nothing about a point whose *predictor* values are
extreme, a high-leverage point, unless that point also happens to have a large residual. A
high-leverage point often pulls the line onto itself and so keeps a small residual, sailing
through with full weight. Guarding against that needs a bounded-influence or MM-estimator,
which we do not develop here. The savings data make the limitation concrete.

### R

Fit the Chapter 8 savings model both ways, ordinary and Huber, on the 50 countries.

:::{admonition} Example 10.5: Huber sees Zambia but not Libya
:class: note
**Question.** Does Huber regression tame the influential countries that troubled the OLS
fit of the savings data, and does it treat every influential country the same way?

**Intuition.** Fit OLS and Huber, compare the coefficients, then look at which countries
Huber actually downweights and cross-check that against their leverage values from Chapter 9.

**Formula.** IRLS with Huber weights $w(u) = \min(1, c/|u|)$, $c = 1.345$.

**Computation.**

```r
savings <- read.csv("data/savings.csv")
fit_ols_s <- lm(sr ~ pop15 + pop75 + dpi + ddpi, data = savings)
fit_hub   <- rlm(sr ~ pop15 + pop75 + dpi + ddpi, data = savings)
round(rbind(OLS = coef(fit_ols_s), Huber = coef(fit_hub)), 4)
```
```text
      (Intercept)   pop15   pop75    dpi   ddpi
OLS       28.5661 -0.4612 -1.6915 -3e-04 0.4097
Huber     28.9447 -0.4735 -1.6554 -4e-04 0.3850
```

```r
w_hub <- fit_hub$w
names(w_hub) <- savings$country
round(sort(w_hub)[1:4], 3)
```
```text
     Zambia       Chile Philippines        Peru
      0.472       0.585       0.689       0.709
```

```r
h_s <- hatvalues(fit_ols_s)
names(h_s) <- savings$country
data.frame(leverage_value = round(h_s[c("Libya", "Zambia")], 3),
           huber_weight   = round(w_hub[c("Libya", "Zambia")], 3))
```
```text
       leverage_value huber_weight
Libya           0.531        1.000
Zambia          0.064        0.472
```

In Python, `smf.rlm` with a Huber norm does the same.

```python
savings = pd.read_csv("data/savings.csv")
form_s = "sr ~ pop15 + pop75 + dpi + ddpi"
fit_ols_s = smf.ols(form_s, data=savings).fit()
fit_hub = smf.rlm(form_s, data=savings).fit()   # default M-estimator is Huber
compare = pd.DataFrame({"OLS": fit_ols_s.params, "Huber": fit_hub.params})
print(compare.round(4))
```
```text
               OLS    Huber
Intercept  28.5661  28.9444
pop15      -0.4612  -0.4735
pop75      -1.6915  -1.6553
dpi        -0.0003  -0.0004
ddpi        0.4097   0.3850
```

```python
w_hub = pd.Series(fit_hub.weights.values, index=savings["country"])
print(w_hub.sort_values().head(4).round(3))
```
```text
country
Zambia         0.472
Chile          0.585
Philippines    0.689
Peru           0.709
dtype: float64
```

```python
h_s = pd.Series(fit_ols_s.get_influence().hat_matrix_diag, index=savings["country"])
out = pd.DataFrame({"leverage_value": h_s[["Libya", "Zambia"]].round(3),
                    "huber_weight": w_hub[["Libya", "Zambia"]].round(3)})
print(out)
```
```text
         leverage_value  huber_weight
country                              
Libya             0.531         1.000
Zambia            0.064         0.472
```

**Interpretation.** The Huber coefficients barely move from OLS (the intercept goes from
$28.57$ to about $28.9$, the `pop15` slope from $-0.461$ to $-0.474$), which is itself
reassuring: the bulk of the data agree with the Huber fit, so OLS was not badly distorted.
The revealing part is the weights. Zambia, which has a large savings-rate residual, is
downweighted hard to $0.47$. Libya, the country with the highest leverage value at $0.53$
(recall it was an influence star in @ch09-cooks-distance), keeps a full weight of $1.00$:
Huber never notices it, because Libya's high-leverage position lets it sit near the line
with a small residual. @fig-ch10-huber-savings plots weight against the leverage value and
makes the blind spot visible.
Huber regression is a fine, quick guard against vertical outliers, and an honest analyst
states plainly that it is not a guard against high-leverage points.
:::

```{figure} figures/fig_ch10_huber_savings.png
:name: fig-ch10-huber-savings
:alt: Scatterplot of Huber weight against the leverage value for the 50 savings countries. Most points sit at weight 1 across a range of leverage values. Zambia is highlighted at a low leverage value but low weight near 0.47, Chile similarly low-weight, while Libya is highlighted at the far right with the highest leverage value yet a full weight of 1.
Huber weight against the leverage value for the savings countries. Huber downweights the large-residual points (Zambia, Chile) but leaves the highest-leverage point, Libya, at full weight, exactly the blind spot the derivation predicts.
```

::::{admonition} Try it 10.5
:class: important
A colleague says "I ran robust regression, so outliers can no longer affect my
conclusions." Give the one-sentence correction, and name the kind of unusual point that can
still distort a Huber fit.

:::{admonition} Solution
:class: dropdown
Huber M-estimation resists points with large *residuals* (vertical outliers) but not
high-leverage points (those with extreme predictor values), which can pull the line onto
themselves and keep a small residual. A high-leverage point like Libya can still distort a
Huber fit; you need leverage statistics (Chapter 9) or a bounded-influence estimator to catch it.
:::
::::

## 10.7 Chapter summary

You can now respond to a failed diagnostic instead of just naming it. You read a menu of
remedies and match each to the pattern that calls for it: transform the predictor for a curved
mean with even scatter, transform the response for a curve and a funnel together, weight for
known unequal precision, use a slower-growing loss for vertical outliers, and change the model
when the response is a count or a proportion. You interpret log coefficients as percentages on
both the exact and the approximate scale, choose a power with the Box-Cox profile likelihood
and its confidence interval for $\lambda$, derive weighted least squares from the Gauss-Markov
argument and compute it from known weights, and read Huber regression as iteratively reweighted
least squares while stating its honest limitation. And you can recognize, as with the Galapagos
counts, when no transformation will do and a different model is the right answer.

**Key results at a glance**

| Result | Statement or formula | Valid when |
|---|---|---|
| Log-log elasticity (Theorem 10.3) | $X \to cX$ multiplies $Y$ by $c^{\beta_1}$; a 1% rise in $X$ gives $\approx \beta_1\%$ in $Y$ | log-log model, mean $Y = e^{\beta_0}X^{\beta_1}$ |
| Log-linear semi-elasticity (Theorem 10.4) | one unit of $X$ multiplies $Y$ by $e^{\beta_1}$; exact percent $100(e^{\beta_1}-1)$ | log-linear model, mean $Y = e^{\beta_0}e^{\beta_1 X}$ |
| Box-Cox family (Definition 10.5) | $Y^{(\lambda)} = (Y^\lambda - 1)/\lambda$, $\log Y$ at $\lambda=0$ | positive response $Y > 0$ |
| Box-Cox profile log-likelihood (Theorem 10.6) | $\ell_p(\lambda) = -\tfrac{n}{2}\log(\mathrm{RSS}(\lambda)/n) + (\lambda-1)\sum \log Y_i$ | transformed $Y$ obeys the normal linear model |
| Weighted least squares (Definition 10.7, Theorem 10.8) | $\mathbf{b}_W = (\mathbf{X}'\mathbf{W}\mathbf{X})^{-1}\mathbf{X}'\mathbf{W}\mathbf{Y}$ is BLUE, $\operatorname{Var} = \sigma^2(\mathbf{X}'\mathbf{W}\mathbf{X})^{-1}$ | $\operatorname{Var}\{\varepsilon_i\} = \sigma^2/w_i$, weights $w_i$ known |
| Huber loss (Definition 10.10) | quadratic for $|u|\le c$, linear beyond; $c = 1.345$ | vertical outliers, errors near-normal in the middle |
| Huber estimating equations (Theorem 10.11) | $\sum_i w(u_i)(Y_i - \mathbf{x}_i'\boldsymbol{\beta})\mathbf{x}_i = \mathbf{0}$, $w(u) = \min(1, c/|u|)$, solved by IRLS | resists large residuals, not high-leverage points |

**Key terms.** **Remedial measure**, **log-log model**, **log-linear model**, **elasticity**,
**semi-elasticity**, **Box-Cox family**, **profile likelihood**, **Jacobian term**, **weighted
least squares**, **weight**, **whitening**, **back-transformation bias**, **robust regression**,
**M-estimation**, **Huber loss**, **iteratively reweighted least squares**.

**You should now be able to**

- [ ] Choose a remedy (transform $X$, transform $Y$, weight, or change the model) from the diagnostic pattern you see.
- [ ] Interpret a log-transformed coefficient on both the exact and the approximate percent scale, and derive both readings.
- [ ] Derive the Box-Cox profile log-likelihood, including the Jacobian term, and use it to pick a response transformation with a confidence interval for $\lambda$.
- [ ] Derive weighted least squares from the Gauss-Markov argument and compute it from known weights.
- [ ] Explain and demonstrate Huber robust regression, and state what it protects against and what it does not.
- [ ] Decide when a transformation is a patch and a different model is the honest fix.

**Where this fits.** In the workflow spine of @ch02-workflow, this chapter lives at the seam
between CHECK and FIT. Chapter 9 (CHECK) told you an assumption was broken; the remedies
here send you back to FIT with a better-specified model, a transformed scale, or a weighting
scheme, after which you CHECK again and only then USE the result. That loop, diagnose then
remedy then re-diagnose, is the working core of applied regression, and it rarely ends after
one pass. The threads continue: the log-interpretation machinery of @ch10-log-interpretation
returns as odds ratios in @ch13-odds-ratio and as monthly growth in @ch15-forecasting, the
variance-modeling instinct of @ch10-wls returns as overdispersion in @ch14-glm, and the
Galapagos islands that defeated every transformation here get their honest resolution in
@ch14-poisson-model.

## 10.8 Frequently asked questions

**Q1. Should I transform $X$, transform $Y$, or both?** Look at the residual plot. A curved
mean with even scatter is a predictor problem: transform $X$ and leave the errors alone. A
curve together with a funnel is a response problem: transform $Y$, which fixes both at once.
When only the variance fans out but the mean is straight, prefer weighting or a
variance-stabilizing transform of $Y$. The mammal data needed both variables logged because
the relationship was multiplicative in both.

**Q2. When is the "percent per unit" shortcut safe?** When the coefficient is small in
magnitude, roughly under $0.1$. Then the exact factor $e^{\beta}$ and the approximation
$1 + \beta$ agree to a fraction of a percent (@fig-ch10-log-percent). For a coefficient like
$0.5$ or larger, report the exact percent $100(e^{\beta}-1)$, since the shortcut can be off
by several points.

**Q3. Box-Cox gave $\hat\lambda = 0.43$. Why did we use $\lambda = 0.5$ instead?** Because
$0.5$ is inside the 95% confidence interval $[0.23, 0.66]$, so the data do not
distinguish it from the maximum, and the square root is far easier to interpret and to
justify than a raw power of $0.43$. Round to a nearby interpretable value whenever the
interval allows it.

**Q4. My response has zeros or negatives. Can I still use Box-Cox or a log?** Not directly:
both need $Y > 0$. Common fixes are a small shift ($\log(Y + a)$) or, better, a model built
for the data type, since zeros in a count or a proportion usually signal that a generalized
linear model (Chapters 13 and 14) is the right tool, not a shifted transform.

**Q5. If OLS is unbiased even under unequal variances, why bother with WLS?** OLS stays
unbiased but stops being efficient: it no longer has the smallest variance, and its reported
standard errors are wrong because they assume one common $\sigma^2$. WLS restores both the
efficiency and the honest standard errors by using the known precision of each point, as the
strongx intercept's tighter standard error showed.

**Q6. Does robust regression replace diagnostics?** No. It guards against vertical outliers
automatically, but it is blind to high-leverage points (the Libya lesson), and its standard
errors are approximate. Use it as one tool alongside the Chapter 9 diagnostics, and always
investigate *why* a point is unusual before deciding to downweight it. A downweighted point
is sometimes the most interesting observation in the data.

**Q7. How do I get a prediction on the original scale from a transformed model?** Undo the
transform, but know that naively back-transforming the fitted value is biased, as squaring
Isabela's prediction overshot by 46 species. The mean of a nonlinear function is not that
function of the mean. For the log model there is a standard smearing correction; for careful
prediction intervals, transform the interval endpoints rather than the point estimate.

## 10.9 Practice problems

:::{note}
Datasets: `mammals.csv`, `cars.csv`, `strongx.csv`, `gala.csv`, `savings.csv`, all in
`data/`. Problems are marked (A) concepts, (B) theory, or (C) data analysis. Odd-numbered
answers appear in Appendix H; full solutions are in the instructor materials.
:::

1. (A) For each diagnostic pattern, name the remedy this chapter recommends: (i) a curved residual plot with even scatter; (ii) a curve and a funnel together; (iii) a single point with a huge residual; (iv) a count response with many small values.
2. (A) Explain the difference between transforming a predictor and transforming the response in terms of what each does to the mean function and to the error variance.
3. (A) A log-log model has slope $\beta_1 = 1.3$. State in words what a 1% increase in $X$ does to $Y$, and whether $Y$ grows more or less than proportionally.
4. (A) Distinguish an elasticity from a semi-elasticity, and say which log model produces each.
5. (A) In the Box-Cox family, what transformation does each of $\lambda = 1, 0.5, 0, -1$ correspond to? Why is the family written with the "$-1$" and the division by $\lambda$?
6. (A) Explain in one or two sentences why the Box-Cox profile log-likelihood includes the Jacobian term $(\lambda-1)\sum \log Y_i$, and what goes wrong without it.
7. (A) State the weighted least squares criterion in words, and explain why a point with small variance should get a large weight.
8. (A) Why does ordinary least squares remain unbiased under unequal error variances but stop being the best linear unbiased estimator?
9. (A) Describe the difference between a vertical outlier and a high-leverage point, and say which one Huber regression protects against.
10. (A) Give two features of a response variable that should push you toward a different model rather than a transformation, and name the chapter that supplies that model.
11. (B) Starting from the log-log mean relation $Y = e^{\beta_0} X^{\beta_1}$, derive that multiplying $X$ by $c$ multiplies $Y$ by $c^{\beta_1}$ exactly (Theorem 10.3), and derive the approximate "$\beta_1$ percent per percent" reading.
12. (B) For the log-linear model, derive the exact factor $e^{\beta_1}$ per unit of $X$ and its approximation $1 + \beta_1$, and find the coefficient value at which the approximation understates the true percent change by exactly one percentage point.
13. (B) Derive the Box-Cox profile log-likelihood $\ell_p(\lambda)$ (Theorem 10.6) from the full log-likelihood, showing how $\boldsymbol{\beta}$ and $\sigma^2$ are profiled out and where the Jacobian term comes from.
14. (B) Show that the Box-Cox family is continuous at $\lambda = 0$, that is, $\lim_{\lambda \to 0}(Y^\lambda - 1)/\lambda = \log Y$.
15. (B) Derive the weighted least squares estimator $\mathbf{b}_W = (\mathbf{X}'\mathbf{W}\mathbf{X})^{-1}\mathbf{X}'\mathbf{W}\mathbf{Y}$ (Theorem 10.8) by transforming the model with $\mathbf{W}^{1/2}$ and applying the Gauss-Markov theorem. State the variance of $\mathbf{b}_W$.
16. (B) Show that WLS minimizes $Q_w(\boldsymbol{\beta}) = \sum w_i (Y_i - \mathbf{x}_i'\boldsymbol{\beta})^2$ by differentiating and obtaining the weighted normal equations $\mathbf{X}'\mathbf{W}\mathbf{X}\,\mathbf{b}_W = \mathbf{X}'\mathbf{W}\mathbf{Y}$.
17. (B) For simple linear regression through weighted least squares, derive the closed form $b_{W,1} = \sum w_i (X_i - \bar{X}_w)(Y_i - \bar{Y}_w) / \sum w_i (X_i - \bar{X}_w)^2$, where $\bar{X}_w$ and $\bar{Y}_w$ are the weighted means. Define the weighted means.
18. (B) Starting from the Huber loss $\rho_c$ (Definition 10.10), compute $\psi_c = \rho_c'$ and show that the estimating equations can be written as weighted normal equations with weight $w(u) = \min(1, c/|u|)$ (Theorem 10.11).
19. (B) Explain, using the weight $w(u) = \min(1, c/|u|)$, why a high-leverage point with a small residual is not downweighted by Huber regression. Contrast with a low-leverage point that has a large residual.
20. (B) Suppose row $i$ of a dataset is the average of $n_i$ independent readings each of variance $\tau^2$. Show that the correct WLS weight is $w_i = n_i$, and identify the common constant $\sigma^2$ in the model $\operatorname{Var}\{\varepsilon_i\} = \sigma^2/w_i$.
21. (C) Fit the mammal log-log model in R or Python, report $b_0$, $b_1$, and $R^2$, and translate the slope into the exact percent change in brain weight for a 25% increase in body weight.
22. (C) Using `cars.csv`, reproduce the Box-Cox estimate $\hat\lambda$ and its 95% interval, then fit both `dist ~ speed` and `sqrt(dist) ~ speed` and compare their residual-versus-fitted plots. Which model better satisfies constant variance?
23. (C) Using `strongx.csv`, fit OLS and WLS with weights $1/\text{sd}^2$, report both slopes and both intercept standard errors, and confirm the WLS coefficients by regressing the $\sqrt{w}$-scaled variables with no intercept.
24. (C) On `strongx.csv`, add a quadratic term (`crossx ~ energy + I(energy^2)`) to the WLS fit and compare it to the linear WLS fit. Does the curvature term improve the fit, and what does that say about the linear model?
25. (C) Using `gala.csv`, fit `Species` and `sqrt(Species)` on the five geographic predictors, compare $R^2$ and the residual plots, and report Isabela's leverage value in both fits. Explain why the transformation does not reduce Isabela's leverage value.
26. (C) Predict the species count for Fernandina from the square-root gala model, back-transform by squaring, and compare to its actual count. Comment on the direction of the back-transformation bias.
27. (C) Using `savings.csv`, fit OLS and Huber regression of `sr` on the four predictors, list the four countries with the smallest Huber weights, and cross-tabulate each against its leverage value. Identify a high-leverage country that Huber does not downweight.
28. (C) Simulate heteroscedastic data (seed 4210): 40 points with $\operatorname{Var}\{\varepsilon_i\}$ proportional to $X_i^2$, fit OLS and WLS with weights $1/X_i^2$, and compare the two slope estimates and their standard errors across 500 replications. Which is more precise, and does either show bias?

(ch10-exam-practice)=
## 10.10 Exam practice

These five questions are written in the style of the course exams: each asks you to
explain, evaluate, or interpret in full sentences, not just to produce a number. Where a
question shows software output, the numbers were produced on the course machine (R 4.6.0)
reading the same CSV files from `data/` you used all term; Python with `statsmodels` gives
the same values. Read the output, then answer in complete sentences with units. Try each
question before opening its model answer.

**EP 10.1 (evaluate a claim).** A classmate fits a log-linear model of Galapagos plant
species on island elevation and reads the slope as a percent effect.

```r
gala <- read.csv("data/gala.csv")
fit <- lm(log(Species) ~ Elevation, data = gala)
round(coef(fit), 6)
```
```text
(Intercept)   Elevation
   2.591399    0.002490
```

The classmate writes: "The coefficient $0.00249$ means about $0.25\%$ more species per
meter of elevation, so an island $100$ meters higher has about $25\%$ more species."
Explain what the coefficient means on the percent scale, then evaluate both readings: the
per-meter one and the $100$-meter one. Which is sound, which is not, and what is the correct
figure for a $100$-meter difference?

:::{admonition} Model answer
:class: dropdown
In this log-linear model the slope is a semi-elasticity: the approximate percent change in
species per one-unit (one-meter) change in elevation. The exact factor for one meter is
$e^{0.00249}$, an exact percent change of $100\,(e^{0.00249}-1) = 0.249\%$, and the
approximation $100 \times 0.00249 = 0.249\%$ agrees to three decimals. So the per-meter
reading is sound, because the coefficient is tiny and the exact and approximate readings
coincide.

The $100$-meter claim is where the classmate slips. A $100$-meter rise is not a small
change, and you cannot get its effect by multiplying the per-meter percent by $100$, because
percent changes compound rather than add. The correct exact figure raises $X$ by $100$ units,
which multiplies species by $e^{100 \times 0.00249} = e^{0.249} = 1.283$, an increase of
$100\,(e^{0.249}-1) = 28.3\%$, not $25\%$. The classmate's $25\%$ is the linear
approximation $100 \times 100 \times 0.00249 = 24.9\%$, which understates the true effect by
about $3.4$ percentage points. The gap is exactly the exact-versus-approximate spread of
@fig-ch10-log-percent: harmless for a one-meter step, real once the change is large enough
that the exponent $100\beta_1$ is no longer near zero.

A weak answer stops at "about $0.25\%$ per meter" and repeats it as $25\%$ over $100$ meters,
missing that a large change needs the exact factor $e^{100\beta_1}$ and that percent effects
compound.
:::

**EP 10.2 (interpret output in context).** Box-Cox run on the raw mammal regression of brain
weight on body weight returns the output below.

```r
mammals <- read.csv("data/mammals.csv")
library(MASS)
bc <- boxcox(lm(brain ~ body, data = mammals),
             lambda = seq(-0.5, 0.5, by = 0.01), plotit = FALSE)
lambda_hat <- bc$x[which.max(bc$y)]
ci <- range(bc$x[bc$y > max(bc$y) - 0.5 * qchisq(0.95, 1)])
round(c(lambda_hat = lambda_hat, ci_low = ci[1], ci_high = ci[2]), 3)
```
```text
lambda_hat     ci_low    ci_high
      0.07      -0.03       0.18
```

Interpret $\hat\lambda$ and its interval in context. Which transformation of the response
does the output recommend, and why? The chapter's opening logged **both** brain and body
weight; does this Box-Cox result, which transforms only the response, justify that whole
log-log move? Explain what Box-Cox does and does not tell you here.

:::{admonition} Model answer
:class: dropdown
The estimate is $\hat\lambda = 0.07$ with a 95% confidence interval $[-0.03, 0.18]$. Because
that interval contains $0$, the log transformation ($\lambda = 0$) is fully supported by the
data, and the log is far easier to read and to justify than a raw power near $0.07$. So the
output recommends modeling $\log(\text{brain})$: report the log.

The important qualification is that Box-Cox chooses only the **response** transformation. It
searches over powers of $Y$ to make the errors of a fixed linear model in $X$ look normal and
constant-variance; it says nothing about the predictor. Body weight is itself extremely
right-skewed, running from a few grams to several tons, so even after logging brain weight a
plot of $\log(\text{brain})$ against raw body weight still curves and lets a handful of
giants stretch the horizontal axis and carry extreme leverage values. Logging body weight as
well is what straightens the mean and evens out those leverage values, which is why the
chapter fit the log-log model.

So this result justifies logging $Y$ and is consistent with the log-log fit, but the decision
to log $X$ is a separate one, driven by the predictor's skew and the shape of the scatter,
not by this profile likelihood. A weak answer reads "$\lambda$ near $0$, so use the log" and
stops, treating Box-Cox as if it had endorsed logging both variables, when it can only speak
to the response.
:::

**EP 10.3 (what would change if).** A student fits weighted least squares to the `strongx`
physics data with weights $w_i = 1/\text{sd}_i^2$, then multiplies every weight by $10$ and
refits, expecting the line to "trust the precise points ten times more" and shift.

```r
strongx <- read.csv("data/strongx.csv")
w <- 1 / strongx$sd^2
fit1 <- lm(crossx ~ energy, data = strongx, weights = w)
fit2 <- lm(crossx ~ energy, data = strongx, weights = 10 * w)
rbind(w = coef(fit1), tenw = coef(fit2))
c(se_energy_w = summary(fit1)$coef["energy", "Std. Error"],
  se_energy_10w = summary(fit2)$coef["energy", "Std. Error"])
```
```text
     (Intercept)   energy
w       148.4732 530.8354
tenw    148.4732 530.8354
  se_energy_w se_energy_10w
        47.55         47.55
```

The slope, the intercept, and the slope's standard error are identical to the last digit
shown. Explain why multiplying every weight by the same constant changes nothing you would
report, referring to the WLS model $\operatorname{Var}\{\varepsilon_i\} = \sigma^2/w_i$.
What single quantity does change, and why is it not a result?

:::{admonition} Model answer
:class: dropdown
In weighted least squares only the **relative** weights matter. The model states
$\operatorname{Var}\{\varepsilon_i\} = \sigma^2/w_i$, so each $w_i$ is known only up to the
common unknown constant $\sigma^2$. Multiplying every weight by $10$ is the same as dividing
$\sigma^2$ by $10$: it describes the identical set of relative precisions, so it is the same
model. In the estimator $\mathbf{b}_W = (\mathbf{X}'\mathbf{W}\mathbf{X})^{-1}\mathbf{X}'\mathbf{W}\mathbf{Y}$,
replacing $\mathbf{W}$ by $10\mathbf{W}$ puts a factor of $10$ in both the inverse and the
right-hand side, and the two cancel exactly, so $\mathbf{b}_W$ is unchanged.

The standard error is unchanged for the same reason. From $\operatorname{Var}\{\mathbf{b}_W\}
= \sigma^2(\mathbf{X}'\mathbf{W}\mathbf{X})^{-1}$, scaling $\mathbf{W}$ by $10$ scales
$(\mathbf{X}'\mathbf{W}\mathbf{X})^{-1}$ by $1/10$, while the estimated
$\hat\sigma^2 = \text{(weighted RSS)}/(n-p)$ scales by $10$; the two factors cancel and the
reported standard error, $t$ statistic, and interval all stay put.

The one quantity that moves is the residual standard error, the estimate of $\sigma$ itself,
which changes by a factor of $\sqrt{10}$. That is not a result you report, because $\sigma$
in this model is defined only relative to the arbitrary scale of the weights; it is a
nuisance parameter, not a scientific quantity. Everything a reader cares about, the
coefficients and their uncertainty, is invariant. A weak answer says "the coefficients do not
change" without explaining that weights enter only as relative precisions ($\sigma^2/w_i$ is
identified only up to scale), or wrongly expects the standard errors to shift.
:::

**EP 10.4 (interpret output in context).** The output below shows the fitted values from the
plain linear regression of Galapagos plant species on the five geographic predictors, for the
five islands with the smallest fitted values.

```r
gala <- read.csv("data/gala.csv")
fit_lin <- lm(Species ~ Area + Elevation + Nearest + Scruz + Adjacent, data = gala)
pred <- predict(fit_lin)
head(data.frame(island = gala$island, actual = gala$Species,
                fitted = round(pred, 1))[order(pred), ], 5)
```
```text
      island actual fitted
   Coamano      2  -36.4
    Darwin     10   -9.0
 Bartolome     31   -7.3
  Gardner1     58   -4.0
  Genovesa     40   -0.5
```

Interpret this output in the context of choosing a remedy. What is impossible about these
predictions, why does it happen, and what does it tell you about whether any transformation
of the response could rescue the linear normal model? Name the honest fix and the chapter
that supplies it.

:::{admonition} Model answer
:class: dropdown
Five islands are given **negative** fitted species counts, from Coamano at $-36.4$ down to
Genovesa at $-0.5$. That is impossible: a species count cannot be less than zero. Notice that
several of these islands actually hold dozens of species (Gardner1 has $58$, Genovesa $40$),
so the model is not just rounding small numbers below zero; its straight-line mean function
genuinely extends past zero for islands whose predictor combination sits at the low end,
because the normal linear model puts no floor under its mean.

This is not a scale problem, and no transformation of $Y$ repairs it. A variance-stabilizing
transform such as the square root or the log can flatten the residual funnel, but the deeper
trouble is distributional: the response is a bounded count whose variance is tied to its mean
by the Poisson distribution, and no power of $Y$ turns a normal, unbounded, constant-variance
model into one that respects the zero floor and the mean-variance link. When a linear fit
predicts impossible values, that is the signal to change the model, not the scale.

The honest fix is Poisson regression, which models the log of the mean count and therefore
can never predict a negative count; it is developed in @ch14-poisson-model, which returns to
these exact islands. A weak answer notices the negative numbers but proposes patching them,
"take a square root" or "truncate at zero," missing that the failure is distributional rather
than a matter of scale.
:::

**EP 10.5 (evaluate a claim).** An analyst refits the savings model with Huber robust
regression and tells a colleague: "The robust regression fit automatically downweights every unusual
country, so I no longer need the Chapter 9 diagnostics." The output lists the four
highest-leverage countries with their Huber weights; for contrast, Zambia has a leverage
value of $0.064$ and Huber weight $0.472$.

```r
savings <- read.csv("data/savings.csv")
fit_ols <- lm(sr ~ pop15 + pop75 + dpi + ddpi, data = savings)
fit_hub <- MASS::rlm(sr ~ pop15 + pop75 + dpi + ddpi, data = savings)
h <- hatvalues(fit_ols); wt <- fit_hub$w
data.frame(country = savings$country, leverage_value = round(h, 3),
           huber_weight = round(wt, 3))[order(-h)[1:4], ]
```
```text
       country leverage_value huber_weight
         Libya          0.531        1.000
 United States          0.334        1.000
         Japan          0.223        0.879
       Ireland          0.212        1.000
```

Evaluate the analyst's claim using these numbers. Which country is the clearest
counterexample, what general limitation of Huber regression does it expose, and what should
the analyst still do?

:::{admonition} Model answer
:class: dropdown
The claim is false. Huber weights depend only on the size of a point's **residual**, through
$w(u) = \min(1, c/|u|)$, and not at all on its leverage value. The three highest-leverage countries,
Libya ($0.531$), the United States ($0.334$), and Ireland ($0.212$), all keep full weight
$1.000$, and even Japan, next in line, is barely touched at $0.879$. Huber leaves the
high-leverage points essentially alone, because a high-leverage point tends to pull the
fitted line onto itself and so carries a small residual that the weight function never
flags.

Libya is the clearest counterexample: it has the highest leverage value in the data yet
weight $1.00$, the very influential case that distorted the fit in @ch09-cooks-distance. Meanwhile
Zambia, a low-leverage country ($0.064$) with a large vertical residual, is downweighted hard
to $0.472$, which is exactly what Huber is built to do. So Huber guards against vertical
outliers but is blind to high-leverage points, and it cannot stand in for the leverage values
and Cook's distances of Chapter 9.

The analyst should still compute the Chapter 9 leverage values and Cook's distances, look at
why Libya is extreme before trusting any fit, and, if high-leverage influence is a real
concern, reach for a bounded-influence or MM-estimator rather than plain Huber. A weak answer
agrees that "robust regression handles the outliers" or simply restates that Huber is
resistant, without noticing that the highest-leverage countries keep weight $1$ and that a
residual-based weight cannot see leverage values at all.
:::

## Chapter game

:::{admonition} Play the Chapter 10 game
:class: tip
Play the Chapter 10 game on your phone or laptop: 10 quick rounds, no setup.
[Open the game](../games/ch10.html). It drills the chapter's core moves: matching a remedy to
the residual pattern, reading a log-log slope as a percent, ordering the Box-Cox recipe,
fitting a line to the real `strongx` measurements, spotting the vertical outlier Huber
downweights, and seeing why no transformation saves the Galapagos counts, with a one-paragraph
reason after every round.
:::

:::{admonition} Resumen del capítulo (en español)
:class: dropdown
Cuando los diagnósticos del Capítulo 9 fallan, rara vez hay que abandonar la regresión:
casi siempre basta con **corregir la escala, ponderar las observaciones o cambiar la
función de pérdida** para que los supuestos del modelo se cumplan. Este capítulo reúne esas
medidas correctivas.

La **transformación logarítmica (log transformation)** es la más común. En el modelo
log-log, la pendiente es una **elasticidad (elasticity)**: multiplicar $X$ por un factor $c$
multiplica $Y$ por $c^{\beta_1}$, de forma exacta, y una subida del 1% en $X$ eleva $Y$ en
aproximadamente $\beta_1$ por ciento. Para los mamíferos, la elasticidad del peso del cerebro
respecto al del cuerpo es $0.752$: un cuerpo 10% más pesado tiene un cerebro $7.43$% más
pesado. Derivamos las lecturas exacta y aproximada del porcentaje.

El método de **Box-Cox (Box-Cox)** deja que los datos elijan la potencia $\lambda$ de la
transformación, maximizando una **verosimilitud perfilada (profile likelihood)** que incluye
un término jacobiano. Para los datos `cars`, $\hat\lambda = 0.43$ con intervalo de confianza
$[0.23, 0.66]$, que contiene $0.5$, así que la raíz cuadrada es una elección limpia.

Los **mínimos cuadrados ponderados (weighted least squares)** tratan varianzas desiguales
conocidas: se pondera cada punto por $w_i = 1/\text{sd}_i^2$. Derivamos el estimador
$\mathbf{b}_W = (\mathbf{X}'\mathbf{W}\mathbf{X})^{-1}\mathbf{X}'\mathbf{W}\mathbf{Y}$
transformando el modelo con $\mathbf{W}^{1/2}$ y aplicando Gauss-Markov. En los datos de
física `strongx`, ponderar reduce el error estándar del intercepto de $10.08$ a $8.08$.

La **regresión robusta (robust regression)** de Huber reemplaza el cuadrado por una pérdida
que crece más despacio, resolviéndose por mínimos cuadrados reponderados iterativamente. En
los datos `savings`, Huber reduce el peso de Zambia (residuo grande) a $0.47$ pero deja a
Libia (un punto muy influyente) con peso $1.00$: protege contra valores atípicos verticales,
no contra puntos de alto apalancamiento. Finalmente, los conteos de especies de Galápagos muestran que
ninguna transformación arregla un problema de distribución; el Capítulo 14 los resuelve con
regresión de Poisson.
:::
