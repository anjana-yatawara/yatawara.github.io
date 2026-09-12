---
title: "15. Regression with time: autocorrelation and forecasting"
subtitle: "MATH 4210, Chapter 15"
---

(ch15)=
# 15. Regression with time: autocorrelation and forecasting

:::{div}
:class: lang-toggle
[Español](./es.md)
:::

In 1949 an international airline started keeping a simple monthly tally: how many
passengers flew that month, counted in thousands. Twelve years of those counts, from
January 1949 through December 1960, became one of the most studied datasets in statistics.
The airline's problem was concrete. To decide how many aircraft to buy, how many crews to
hire, and how to schedule maintenance, the planners needed to forecast demand a year or two
ahead. A good forecast saved money; a bad one grounded planes or stranded passengers.

@fig-ch15-series plots the 144 monthly counts in order. Three features jump out. The series
climbs steadily: air travel roughly tripled over the twelve years. It also cycles every year,
with a tall summer peak (people fly on vacation) and a winter dip. And the swings get wider
as the series rises: the gap between the summer peak and the winter trough was small in 1949
and large in 1960. A single straight line will not describe this, but a regression with a
trend term and a set of monthly indicators just might.

```{figure} figures/fig_ch15_series.png
:name: fig-ch15-series
:alt: A line plot of monthly international airline passengers in thousands from 1949 to 1960. The series rises from about 100 to over 600, repeats a yearly cycle with a summer peak and winter trough, and the size of the yearly swing grows from roughly 30 in 1949 to over 150 by 1960.
The monthly airline series: a rising trend, a repeating yearly cycle with summer peaks, and seasonal swings that grow wider as the overall level climbs.
```

Time-ordered data like this break a promise the earlier chapters relied on. Every inference
you have done so far assumed the errors were uncorrelated: one observation's luck told you
nothing about the next. When observations come in time order, that assumption usually fails.
A month that runs above the trend tends to be followed by another above the trend, because
whatever pushed demand up (a booming economy, a new route) does not vanish overnight. This
chapter shows what that correlation does to your standard errors, how to detect it, one
classic way to remove it, and how to judge a forecast honestly by testing it on the future
instead of the past.

:::{admonition} This lesson at a glance
:class: important
- **What we are doing:** Regression on time-ordered data: a trend-plus-seasonal model on the log airline series, diagnosing autocorrelation with the Durbin-Watson test, removing it with Cochrane-Orcutt, and judging a forecast out-of-time.
- **Why we are doing it:** Time-ordered observations violate the uncorrelated-errors assumption every earlier inference relied on, and positive autocorrelation makes ordinary least-squares standard errors too small.
- **Main objective:** Fit and interpret a trend-and-season model on the log scale, detect and correct first-order autocorrelation, and evaluate a forecast by testing it on the future.
- **What changed from the last chapters:** Every earlier chapter assumed uncorrelated errors; here that assumption fails because data arrive in time order. Durbin-Watson (met as a diagnostic in @ch09) and the log scale (@ch10-log-interpretation) return, and the prediction interval of @ch03-prediction-interval is shown to be badly miscalibrated.
:::

:::{admonition} Learning objectives
:class: tip
By the end of this chapter you will be able to:
- **Fit** a regression with a linear trend and seasonal (month) indicator variables on a log scale, and **interpret** its trend and seasonal coefficients.
- **Explain** why time-ordered data usually violate the uncorrelated-errors assumption, and **show**, for positive autocorrelation, that ordinary least squares reports standard errors that are too small.
- **Diagnose** autocorrelation with a residual-versus-time plot, a lag plot, and the Durbin-Watson test.
- **Derive** the relationship between the Durbin-Watson statistic and the lag-one residual autocorrelation.
- **Apply** the Cochrane-Orcutt idea to remove first-order autocorrelation, and **derive** why quasi-differencing works.
- **Evaluate** a forecast with an out-of-time train/test split, computing test-set error and prediction-interval coverage.
- **Explain** why honest prediction intervals for time series need methods beyond ordinary regression.
:::

(ch15-trend-season)=
## 15.1 A model for trend and seasonality

### Intuition

We start where the workflow always starts: with the picture and the question. @fig-ch15-series
shows three ingredients, and a regression can carry one term for each. The steady climb is a
**trend**, which we model with a straight line in the time index $t = 1, 2, \dots, 144$. The
yearly cycle is **seasonality**, which we model with eleven indicator (dummy) variables for the
months February through December, each measuring how that month sits relative to a January
baseline. The growing swings are the reason we do not model the raw counts directly.

Look again at the raw series: in 1949 the summer peak stands maybe 30 above the winter
trough, but by 1960 that same seasonal gap is over 150. The seasonal effect is not a fixed
number of passengers; it is a fixed *percentage* of the current level. When an effect is
multiplicative like that, taking logarithms turns it additive and, as a bonus, evens out the
variance. @fig-ch15-raw-vs-log shows the payoff: on the log scale the seasonal swings are
about the same width every year. Working on the log scale is the transformation idea from
@ch10-log-interpretation, and it is what lets a single set of month effects fit the whole
twelve years.

```{figure} figures/fig_ch15_raw_vs_log.png
:name: fig-ch15-raw-vs-log
:alt: Two side-by-side line plots of the airline series. The left panel, on the raw scale, shows seasonal swings that grow wider over time. The right panel, on the log scale, shows seasonal swings of roughly constant width across all years.
On the raw scale (left) the yearly swings widen as the level rises; on the log scale (right) they hold a nearly constant width. Logs turn a multiplicative seasonal pattern into an additive one and stabilize the variance.
```

### Formula

Let $Y_t$ be the passenger count in month $t$ and work with $\log Y_t$. The model carries one
term for each feature of @fig-ch15-series: a linear trend, a fixed offset for each month, and an
error.

:::{admonition} Definition 15.1: Trend-plus-season model
:class: note definition
For a monthly series $Y_t$ observed at $t = 1, \dots, n$, the **trend-plus-season model** on the
log scale is

$$
\log Y_t = \beta_0 + \beta_1 t + \sum_{m=2}^{12} \gamma_m D_{mt} + \varepsilon_t ,
\qquad t = 1, \dots, n ,
$$

a linear trend $\beta_0 + \beta_1 t$ in the time index plus a seasonal offset $\gamma_m$ for each
month $m = 2, \dots, 12$ (with $D_{mt}$ the month-$m$ indicator and January the baseline) plus an
error $\varepsilon_t$.
:::

The pieces, term by term:

- $t$ is the time index, $1$ for January 1949 up to $n = 144$ for December 1960.
- $\beta_0$ is the intercept: the log level of a January at time $t = 0$ (a baseline anchor).
- $\beta_1$ is the trend slope: the change in $\log Y$ per month. Because $Y$ is logged, $\beta_1$ is an approximate proportional growth rate per month (from @ch10-log-interpretation).
- $D_{mt}$ is the month-$m$ indicator: it equals $1$ when month $t$ is calendar month $m$, and $0$ otherwise. There are eleven of them, for February ($m=2$) through December ($m=12$).
- $\gamma_m$ is the seasonal coefficient for month $m$: how far month $m$ sits above or below January on the log scale, holding the trend fixed. January is the reference month, coded by all eleven indicators being zero, exactly the dummy-coding scheme of @ch11-dummy-coding.
- $\varepsilon_t$ is the error in month $t$.

In words: the log passenger count is a straight-line trend plus a fixed offset for each month
of the year plus a disturbance. For now we fit this by ordinary least squares, treating the
$\varepsilon_t$ as if they satisfied the usual assumptions. Section 15.2 checks whether they do.

### R

We read the tidy monthly file, build a time index and a log response, and make `month` a
factor so `lm` expands it into indicator variables automatically.

```r
air <- read.csv("data/airpassengers.csv")
air$t <- seq_len(nrow(air))
air$logpass <- log(air$passengers)
air$month <- factor(air$month)
dim(air)
head(air, 3)
```
```text
[1] 144   5
  year month passengers t  logpass
1 1949     1        112 1 4.718499
2 1949     2        118 2 4.770685
3 1949     3        132 3 4.882802
```

:::{admonition} Example 15.1: Fitting the trend-plus-season model
:class: note
**Question.** What are the trend and seasonal coefficients, and how well does this model fit
the log series?

**Intuition.** Regress $\log Y$ on the time index and the eleven month indicators. Read the
trend slope as a monthly growth rate and each month coefficient as a seasonal offset relative
to January.

**Formula.** $\log Y_t = \beta_0 + \beta_1 t + \sum_{m=2}^{12}\gamma_m D_{mt} + \varepsilon_t$,
fitted by least squares.

**Computation.**

```r
fit <- lm(logpass ~ t + month, data = air)
round(coef(fit), 4)
c(R2 = summary(fit)$r.squared, resid_se = summary(fit)$sigma)
```
```text
(Intercept)           t      month2      month3      month4      month5
     4.7268      0.0101     -0.0221      0.1082      0.0769      0.0745
     month6      month7      month8      month9     month10     month11
     0.1967      0.3006      0.2913      0.1467      0.0085     -0.1352
    month12
    -0.0213
        R2   resid_se
0.98346816 0.05930356
```

```python
import numpy as np
import pandas as pd
import statsmodels.formula.api as smf

air = pd.read_csv("data/airpassengers.csv")
air["t"] = np.arange(1, len(air) + 1)
air["logpass"] = np.log(air["passengers"])
fit = smf.ols("logpass ~ t + C(month)", data=air).fit()
print(round(fit.params["t"], 4))
print(round(fit.rsquared, 4), round(np.sqrt(fit.scale), 5))
```
```text
0.0101
0.9835 0.0593
```

**Interpretation.** The model explains $98.3\%$ of the variation in $\log Y$, with a residual
standard deviation of about $0.059$ on the log scale. The trend slope estimate is $b_1 \approx
0.0101$ per month. The seasonal coefficients rank the months: July ($\hat\gamma_7 = 0.3006$) and
August ($0.2913$) sit highest, November ($-0.1352$) lowest, all relative to January. Because
these are log offsets, July's $0.30$ means July traffic runs about $e^{0.30} - 1 \approx 35\%$
above a January at the same point in the trend, while November runs about $e^{-0.135} - 1
\approx 13\%$ below it. The seasonal story matches the summer-vacation picture in the raw plot.
:::

Eleven coefficients are hard to picture from a table, so @fig-ch15-seasonal-bars draws them
as bars. Each bar is one month's offset from January, and the shape tells the whole seasonal
story at a glance: a summer hump peaking in July and August, a soft dip in late fall.

```{figure} figures/fig_ch15_seasonal_bars.png
:name: fig-ch15-seasonal-bars
:alt: A bar chart of the eleven monthly seasonal offsets from the fitted model, with January fixed at zero as the baseline. Bars rise through spring to a summer peak at July (about 0.30) and August (about 0.29), then fall to a low at November (about minus 0.14). Bars above January are blue, bars below are orange.
The seasonal coefficients as bars, each measured against a January baseline. The summer peak and the November low that the numbers rank are far easier to see as a shape than as a column of decimals.
```

The trend slope deserves its own reading, because logs make it a growth rate.

:::{admonition} Example 15.2: The trend as a growth rate
:class: note
**Question.** How fast is air travel growing, in percent per month and per year?

**Intuition.** On the log scale a slope is an approximate proportional change. Exponentiating
turns it into an exact multiplicative factor; subtracting one and scaling by 100 gives a
percentage.

**Formula.** Monthly growth $= (e^{\beta_1} - 1)\times 100\%$; annual growth
$= (e^{12\beta_1} - 1)\times 100\%$.

**Computation.**

```r
monthly_growth <- (exp(coef(fit)["t"]) - 1) * 100
annual_growth <- (exp(12 * coef(fit)["t"]) - 1) * 100
round(c(monthly_pct = monthly_growth, annual_pct = annual_growth), 3)
```
```text
monthly_pct.t  annual_pct.t
        1.012        12.843
```

```python
monthly_growth = (np.exp(fit.params["t"]) - 1) * 100
annual_growth = (np.exp(12 * fit.params["t"]) - 1) * 100
print(round(monthly_growth, 3), round(annual_growth, 3))
```
```text
1.012 12.843
```

**Interpretation.** The fitted trend says passenger traffic grew about $1.0\%$ per month, which
compounds to roughly $12.8\%$ per year over 1949 to 1960. That single number, read straight off
the slope, is the kind of summary a planning department wants. Whether you should trust its
standard error is the question of the next section.
:::

@fig-ch15-fitted lays the fitted values over the observed log series. The straight trend plus
twelve monthly offsets reproduces the sawtooth shape closely, which is why $R^2$ is so high.

```{figure} figures/fig_ch15_fitted.png
:name: fig-ch15-fitted
:alt: A line plot on the log scale showing observed log passengers and the fitted values from the trend-plus-month model, from 1949 to 1960. The fitted line tracks the observed sawtooth pattern closely, capturing both the upward trend and the repeating seasonal shape.
The trend-plus-month model on the log scale. A single straight trend and eleven seasonal offsets follow the observed sawtooth closely, which is why the model explains 98 percent of the variation.
```

::::{admonition} Try it 15.1
:class: important
The August coefficient estimate is $\hat\gamma_8 = 0.2913$. Convert it to an approximate percentage
difference from January, and say in one sentence what it means for the airline.

:::{admonition} Solution
:class: dropdown
$e^{0.2913} - 1 = 0.338$, so August traffic runs about $34\%$ above a January at the same
point in the trend. For the airline it means late-summer demand is roughly a third higher than
the winter baseline, so August needs substantially more capacity than January of the same year.
:::
::::

(ch15-autocorrelation)=
## 15.2 Why time breaks ordinary least squares

### Intuition

We can now fit the line; the obvious next question is whether we should trust its standard
errors. Recall the residual plot habit from Chapter 2: after any fit, look at the residuals.
For time data, plot them in time order. @fig-ch15-resid-time does exactly that for the
trend-plus-season model, and the picture is not the random band you want. The residuals move
in long runs: a stretch of months above zero, then a stretch below, then above again. A month
that overshoots the model is usually followed by another that overshoots. That is
**autocorrelation** (Definition 15.2): the errors are correlated with their own recent past.

:::{admonition} Definition 15.2: Autocorrelation
:class: note definition
**Autocorrelation** is correlation of the regression errors with their own past values. The
errors show *positive* autocorrelation when consecutive errors tend to share sign, so a month
above the model is typically followed by another above it.
:::

```{figure} figures/fig_ch15_resid_time.png
:name: fig-ch15-resid-time
:alt: A plot of the trend-plus-month model residuals against time from 1949 to 1960, drawn as stems from a zero line and colored by sign. The residuals form long runs of the same color, several years of mostly positive residuals followed by stretches of mostly negative ones, rather than alternating randomly.
The model residuals in time order form long runs of the same sign instead of scattering randomly around zero. That clustering is the visual signature of positive autocorrelation.
```

Autocorrelation matters because it breaks the "uncorrelated errors" assumption that every
standard error formula in this book was built on. Under the Gauss-Markov conditions of
@ch02-gauss-markov-slr, distinct errors were uncorrelated. When they are not, least squares
still lands on an unbiased estimate of the slope, but its reported standard error is wrong. For
the positive autocorrelation you almost always see in time series, it is wrong in the dangerous
direction: too small. The software prints a tight confidence interval and a tiny
p-value, and you believe the trend is pinned down far more precisely than the data support.

### Formula

The simplest and most common model for correlated errors is the **first-order autoregressive
model**, written AR(1).

:::{admonition} Definition 15.3: First-order autoregressive (AR(1)) error model
:class: note definition
The **first-order autoregressive error model**, written AR(1), specifies

$$
\varepsilon_t = \rho\, \varepsilon_{t-1} + u_t, \qquad u_t \overset{\text{iid}}{\sim} N(0, \sigma_u^2),
\qquad |\rho| < 1 ,
$$

so each error is a fraction $\rho$ of the previous error plus an independent **innovation** $u_t$.
The **autocorrelation parameter** $\rho$ is the correlation between consecutive errors, and
$|\rho| < 1$ keeps the process stable.
:::

Reading the pieces:

- $\varepsilon_t$ is the regression error in month $t$, the thing we assumed was uncorrelated but is not.
- $\rho$ is the **autocorrelation parameter**: the correlation between an error and the one just before it. Positive $\rho$ means consecutive errors tend to share sign.
- $u_t$ is the **innovation**: the genuinely new, unpredictable shock in month $t$, and these *are* independent with constant variance.
- $|\rho| < 1$ keeps the process stable so the errors do not blow up.

In words: this month's error is a fraction $\rho$ of last month's error plus a fresh
independent shock. @fig-ch15-autocorr-intuition contrasts independent errors with AR(1) errors
of the same variance. The independent series has no memory; the AR(1) series wanders in runs,
exactly like the residuals in @fig-ch15-resid-time.

```{figure} figures/fig_ch15_autocorr_intuition.png
:name: fig-ch15-autocorr-intuition
:alt: Two side-by-side time plots of simulated error series with the same variance. The left panel, independent errors, jitters rapidly around zero with no memory. The right panel, AR(1) errors with rho equal to 0.8, wanders in long smooth runs above and below zero.
Independent errors (left) and positively autocorrelated AR(1) errors (right) with the same variance. The AR(1) series drifts in long runs, which is why autocorrelated residuals cluster by sign.
```

### Derivation

Why does positive autocorrelation make the reported standard error too small? The cleanest
place to see the mechanism is the simplest estimator, the sample mean, where the algebra is
short and the lesson transfers directly to the regression slope.

:::{admonition} Theorem 15.4: Positive autocorrelation inflates the variance of the mean
:class: important theorem
Let $Y_t = \mu + \varepsilon_t$ for $t = 1, \dots, n$, where each error has mean zero and variance
$\sigma^2$ and $\operatorname{Corr}\{\varepsilon_t, \varepsilon_{t+k}\} = \rho^{\,k}$. Then the
sample mean has variance

$$
\operatorname{Var}\{\bar Y\}
= \frac{\sigma^2}{n}\left(1 + 2\sum_{k=1}^{n-1}\Big(1 - \frac{k}{n}\Big)\rho^{\,k}\right).
$$

When $\rho > 0$ every term in the sum is positive, so $\operatorname{Var}\{\bar Y\} > \sigma^2/n$:
the true variance exceeds the $\sigma^2/n$ the ordinary formula estimates, and the same holds for
the regression slope.
:::

**Proof.** Suppose
$Y_t = \mu + \varepsilon_t$ for $t = 1, \dots, n$, where each error has mean zero and variance
$\sigma^2$, and neighboring errors have correlation
$\operatorname{Corr}\{\varepsilon_t, \varepsilon_{t+k}\} = \rho^{\,k}$, the AR(1) pattern. The
estimator of $\mu$ is $\bar Y$. Its true variance is

$$
\operatorname{Var}\{\bar Y\}
= \frac{1}{n^2}\operatorname{Var}\!\Big\{\sum_{t=1}^n \varepsilon_t\Big\}
= \frac{1}{n^2}\Big(\sum_{t=1}^n \operatorname{Var}\{\varepsilon_t\}
+ 2\sum_{s<t}\operatorname{Cov}\{\varepsilon_s, \varepsilon_t\}\Big).
$$

The first sum is $n\sigma^2$. Every covariance is
$\operatorname{Cov}\{\varepsilon_s,\varepsilon_t\} = \sigma^2 \rho^{\,|t-s|}$, so collecting
terms by their lag $k = t - s$ gives

$$
\operatorname{Var}\{\bar Y\}
= \frac{\sigma^2}{n}\left(1 + 2\sum_{k=1}^{n-1}\Big(1 - \frac{k}{n}\Big)\rho^{\,k}\right).
$$

In words: the true variance of the mean is the familiar $\sigma^2/n$ multiplied by a bracket
that depends on the autocorrelation. When the errors are uncorrelated ($\rho = 0$) the bracket
is $1$ and we recover $\sigma^2/n$. When $\rho > 0$ every term in the sum is positive, so the
bracket exceeds $1$ and the true variance is *larger* than $\sigma^2/n$. But $\sigma^2/n$ is
exactly what the ordinary formula estimates, because it ignores the covariances. So ordinary
least squares divides by too little and reports a variance, and a standard error, that are too
small. The same cancellation of covariances inflates the true variance of the regression slope
$b_1$; only the bookkeeping is longer. $\blacksquare$

:::{admonition} Key idea
:class: tip keyidea
Autocorrelation does not bias the least-squares estimates; it corrupts their stated precision.
With positive autocorrelation the reported standard errors come out too small, so confidence
intervals look tighter and p-values smaller than the data justify. The point estimate is fine;
the error bars lie.
:::

How badly does this bite in practice? A simulation makes it concrete, and it is worth running
yourself, in the spirit of the "check a formula by simulating it" habit.

:::{admonition} Example 15.3: How much does OLS understate the slope's standard error?
:class: note
**Question.** With strongly autocorrelated errors, how far off is the standard error that
ordinary least squares reports for a slope?

**Intuition.** Generate many time series with a known trend and AR(1) errors ($\rho = 0.8$).
For each, fit the trend by least squares and record both the slope estimate and the standard
error the software reports. The spread of the slope estimates across the simulations is the
*true* standard error; compare it to the average *reported* one.

**Formula.** True $\operatorname{sd}\{b_1\}$ = standard deviation of the simulated $b_1$ values;
reported SE = the usual $\sqrt{\mathrm{MSE}/S_{tt}}$ from each fit, where $S_{tt} = \sum_t (t - \bar t)^2$ is the sum of squared deviations of the time predictor.

**Computation.**

```r
set.seed(4210)
n <- 100
x <- 1:n
rho <- 0.8
reps <- 2000
keep <- matrix(NA, reps, 2)
for (r in 1:reps) {
  u <- rnorm(n)
  eps <- numeric(n)
  eps[1] <- u[1]
  for (i in 2:n) eps[i] <- rho * eps[i - 1] + u[i]
  y <- 2 + 0.5 * x + eps
  m <- lm(y ~ x)
  keep[r, ] <- c(coef(m)[2], summary(m)$coefficients[2, 2])
}
true_sd <- sd(keep[, 1])
mean_reported_se <- mean(keep[, 2])
round(c(true_sd_of_b1 = true_sd,
        mean_OLS_reported_se = mean_reported_se,
        ratio = mean_reported_se / true_sd), 4)
```
```text
       true_sd_of_b1 mean_OLS_reported_se                ratio
              0.0163               0.0052               0.3209
```

```python
rng = np.random.default_rng(4210)
n = 100
x = np.arange(1, n + 1)
rho = 0.8
reps = 2000
b1 = np.empty(reps)
se = np.empty(reps)
for r in range(reps):
    u = rng.standard_normal(n)
    eps = np.empty(n)
    eps[0] = u[0]
    for i in range(1, n):
        eps[i] = rho * eps[i - 1] + u[i]
    y = 2 + 0.5 * x + eps
    m = smf.ols("y ~ x", data=pd.DataFrame({"x": x, "y": y})).fit()
    b1[r] = m.params["x"]
    se[r] = m.bse["x"]
print(round(b1.std(ddof=1), 4), round(se.mean(), 4),
      round(se.mean() / b1.std(ddof=1), 4))
```
```text
0.0157 0.0052 0.3326
```

**Interpretation.** The slope estimates actually vary with a standard deviation near $0.016$,
but least squares reports an average standard error of only about $0.005$, roughly a third of
the truth. A confidence interval built from the reported SE is about three times too narrow, so
a nominal $95\%$ interval covers the true slope far less than $95\%$ of the time, and t tests
reject a true null far more than $5\%$ of the time. @fig-ch15-se-simulation shows the gap: the
histogram of slope estimates is wide, the reported standard error is a sliver. This is the
practical danger of ignoring autocorrelation, and it is why the trend's tiny p-value in the
airline model cannot be taken at face value.
:::

```{figure} figures/fig_ch15_se_simulation.png
:name: fig-ch15-se-simulation
:alt: A histogram of 2000 simulated slope estimates centered on the true slope of 0.5, with a wide double-headed arrow marking the true spread of about plus or minus 0.016 and a much shorter arrow marking the mean OLS-reported standard error of about plus or minus 0.005.
Two thousand slope estimates under AR(1) errors. Their actual spread (wide arrow) is about three times the standard error ordinary least squares reports (short arrow), so the usual confidence interval is far too narrow.
```

:::{admonition} Durable skill: Check the assumption your inference depends on
:class: tip
A number is only as trustworthy as the assumption behind it. Least squares gives an honest
point estimate under very weak conditions, but its standard errors, confidence intervals, and
p-values all lean on the errors being uncorrelated. Time order is the most common way that
lean fails, and it fails quietly: the software prints a confident interval either way. Before
you report a standard error on data collected over time, space, or any other ordering, ask
what would happen to that number if neighboring observations were correlated, and check. The
habit of naming the load-bearing assumption and testing it, rather than trusting the default
output, is what separates an analyst from a button-presser.
:::

::::{admonition} Try it 15.2
:class: important
The derivation gave $\operatorname{Var}\{\bar Y\} = \frac{\sigma^2}{n}\big(1 + 2\sum_{k=1}^{n-1}
(1 - k/n)\rho^k\big)$. For a long series the bracket approaches $(1 + \rho)/(1 - \rho)$. Take
$\rho = 0.5$. (a) Evaluate the bracket. (b) By what factor is the true standard error of $\bar Y$
larger than the $\sigma/\sqrt{n}$ that ordinary least squares reports? (c) Say in one sentence
what that does to a nominal $95\%$ confidence interval.

:::{admonition} Solution
:class: dropdown
(a) The bracket is $(1 + 0.5)/(1 - 0.5) = 3$. (b) The true variance is $3\sigma^2/n$, so the
true standard error is $\sqrt{3}\,\sigma/\sqrt{n} \approx 1.73$ times the $\sigma/\sqrt{n}$ that
ordinary least squares reports. (c) The ordinary interval is about $1.73$ times too narrow, so a
nominal $95\%$ interval covers the true mean far less than $95\%$ of the time: the reported
precision is overstated, exactly the danger Example 15.3 measured by simulation.
:::
::::

The simulation below puts that whole argument under your finger: it holds the data and the shocks
fixed and lets you turn the autocorrelation up, so you can watch the reported standard error stay
put while the true one runs away from it.

```{iframe} ../sims/ch15-autocorrelation.html
:class: sim sim-m
:width: 100%
Slide the autocorrelation rho and watch the residuals fall into long runs, the Durbin-Watson statistic drop from 2 toward 0, and the standard error that least squares reports drift further and further below the true spread of the slope.
```

(ch15-durbin-watson)=
## 15.3 Detecting autocorrelation: the Durbin-Watson test

### Intuition

The residual plot warns you; a test quantifies the warning. Two pictures point the same way.
A **lag plot** (Definition 15.5) graphs each residual $e_t$ against the previous residual
$e_{t-1}$; positive autocorrelation shows up as an upward tilt, because a positive residual tends
to sit next to another positive one. @fig-ch15-lag-plot is that plot for the airline model, and
the tilt is unmistakable.

:::{admonition} Definition 15.5: Lag plot
:class: note definition
A **lag plot** of residuals is a scatterplot of each residual $e_t$ against its predecessor
$e_{t-1}$. An upward tilt signals positive autocorrelation, a downward tilt negative, and a round
cloud none.
:::

The **Durbin-Watson test** turns that tilt into a single number and a p-value.
You met this test as one item in the diagnostic toolkit of @ch09, where it flagged
ordering in savings residuals; here is the time-ordered data it was built for, and this is
where we finally derive why its scale runs the way it does.

```{figure} figures/fig_ch15_lag_plot.png
:name: fig-ch15-lag-plot
:alt: A scatterplot of each model residual against the previous residual, with a fitted line of positive slope about 0.79 through the origin. The points cluster along the upward line, showing that a residual and its predecessor tend to have the same sign.
Each residual against the one before it. The clear upward tilt (slope near 0.79) means a residual is usually followed by another of the same sign, the definition of positive autocorrelation.
```

### Formula

The **Durbin-Watson statistic** measures how much consecutive residuals differ.

:::{admonition} Definition 15.6: Durbin-Watson statistic
:class: note definition
The **Durbin-Watson statistic** for regression residuals $e_t$ is

$$
D = \frac{\sum_{t=2}^{n} (e_t - e_{t-1})^2}{\sum_{t=1}^{n} e_t^2} ,
$$

the sum of squared changes between neighboring residuals divided by the residual sum of squares.
It runs from $0$ (strong positive autocorrelation) through $2$ (none) to $4$ (strong negative).
:::

- $e_t$ is the residual in month $t$ from the fitted regression.
- The numerator adds up squared *changes* between neighboring residuals; the denominator is the usual residual sum of squares.

The statistic runs from $0$ to $4$. When neighboring residuals are nearly equal (strong
positive autocorrelation) the numerator is small and $D$ is near $0$. When residuals alternate
sign (negative autocorrelation) the changes are large and $D$ is near $4$. When residuals are
uncorrelated, $D$ sits near $2$. @fig-ch15-dw-scale is the number line to keep in mind.

```{figure} figures/fig_ch15_dw_scale.png
:name: fig-ch15-dw-scale
:alt: A horizontal number line from 0 to 4 shaded into three zones: near 0 labeled positive autocorrelation, near 2 labeled none or ideal, near 4 labeled negative autocorrelation. A red marker sits at 0.43, deep in the positive-autocorrelation zone, labeled airpassengers model DW equals 0.43.
The Durbin-Watson statistic runs from 0 to 4: near 0 is strong positive autocorrelation, near 2 is none, near 4 is negative. The airline model lands at 0.43, deep in the positive zone.
```

### Derivation

The scale is not arbitrary. Chapter 9 stated the shortcut $D \approx 2(1 - \hat\rho)$ in its
summary and used it to read the savings statistic; now that autocorrelation is the whole story,
it is worth seeing where that identity comes from. The Durbin-Watson statistic is, up to a
small-sample correction, just a rescaling of the lag-one residual autocorrelation, which
explains why $2$ is the neutral value.

:::{admonition} Theorem 15.7: Durbin-Watson statistic and lag-one autocorrelation
:class: important theorem
For residuals from a regression on a reasonably long series,

$$
D \approx 2(1 - r_1), \qquad
r_1 = \frac{\sum_{t=2}^{n} e_t e_{t-1}}{\sum_{t=1}^{n} e_t^2} ,
$$

where $r_1$ is the lag-one residual autocorrelation. Hence $D \approx 2$ when $r_1 = 0$, $D \to 0$
as $r_1 \to 1$, and $D \to 4$ as $r_1 \to -1$.
:::

**Proof.** Expand the square in the numerator:

$$
\sum_{t=2}^{n} (e_t - e_{t-1})^2
= \sum_{t=2}^{n} e_t^2 + \sum_{t=2}^{n} e_{t-1}^2 - 2\sum_{t=2}^{n} e_t e_{t-1} .
$$

For a reasonably long series the first two sums are each very close to the full residual sum of
squares $\sum_{t=1}^n e_t^2$, because they each drop only one term (the last or the first). Write
$r_1 = \big(\sum_{t=2}^n e_t e_{t-1}\big)\big/\big(\sum_{t=1}^n e_t^2\big)$ for the lag-one
residual autocorrelation. Dividing the expansion by $\sum e_t^2$,

$$
D = \frac{\sum_{t=2}^{n} e_t^2 + \sum_{t=2}^{n} e_{t-1}^2 - 2\sum_{t=2}^{n} e_t e_{t-1}}
{\sum_{t=1}^{n} e_t^2}
\;\approx\; 1 + 1 - 2 r_1 = 2(1 - r_1) .
$$

In words: the Durbin-Watson statistic is about $2$ minus twice the lag-one autocorrelation. If
$r_1 = 0$ then $D \approx 2$; if $r_1 \to 1$ then $D \to 0$; if $r_1 \to -1$ then $D \to 4$.
This is why a value near $2$ signals no autocorrelation. $\blacksquare$

Deciding whether an observed $D$ is far enough from $2$ to be surprising is slightly awkward.
The null distribution of $D$ depends on the predictor values, so Durbin and Watson published a
pair of bounds, $d_L$ and $d_U$, that bracket the true critical value. Software sidesteps the
tables by computing the p-value directly. Both appear below.

### R and Python

:::{admonition} Example 15.4: Durbin-Watson on the airline model
:class: note
**Question.** Is the autocorrelation in the airline residuals real, or could it be chance?

**Intuition.** Compute $D$ from the residuals, confirm it against $2(1 - r_1)$, and read the
p-value from a formal test.

**Formula.** $D = \sum (e_t - e_{t-1})^2 / \sum e_t^2$ and $D \approx 2(1 - r_1)$.

**Computation.**

```r
e <- residuals(fit)
DW <- sum(diff(e)^2) / sum(e^2)
round(DW, 4)
```
```text
[1] 0.4252
```

```python
from statsmodels.stats.stattools import durbin_watson
e = fit.resid.to_numpy()
DW = durbin_watson(e)
print(round(DW, 4))
```
```text
0.4252
```

The formal test in R, from the `lmtest` package, attaches a p-value:

```r
library(lmtest)
dwtest(fit)
```
```text
	Durbin-Watson test

data:  fit
DW = 0.42518, p-value < 2.2e-16
alternative hypothesis: true autocorrelation is greater than 0
```

The statistic agrees with the shortcut $2(1 - r_1)$:

```r
r1 <- sum(e[-1] * e[-length(e)]) / sum(e^2)
round(c(lag1_autocorr = r1, two_times_1_minus_r1 = 2 * (1 - r1)), 4)
```
```text
       lag1_autocorr two_times_1_minus_r1
              0.7788               0.4423
```

```python
r1 = np.sum(e[1:] * e[:-1]) / np.sum(e**2)
print(round(r1, 4), round(2 * (1 - r1), 4))
```
```text
0.7788 0.4423
```

**Interpretation.** The Durbin-Watson statistic is $D = 0.43$, far below the neutral value of
$2$ and deep in the positive-autocorrelation zone, with a p-value below $2\times 10^{-16}$: the
autocorrelation is not chance. The lag-one residual autocorrelation is $r_1 = 0.78$, and the
shortcut $2(1 - r_1) = 0.44$ matches $D$ up to the small-sample correction. The conclusion is
firm: the errors in the airline model are strongly positively autocorrelated, so the tidy
standard errors and p-values from Example 15.1 are not trustworthy. We need either a different
model for the errors or a different way to judge the fit. The next two sections take each road.
:::

::::{admonition} Try it 15.3
:class: important
A colleague fits a regression to 60 quarters of sales data and reports a Durbin-Watson
statistic of $D = 1.98$. Without any table, what lag-one autocorrelation does that imply, and
what should the colleague conclude about the independence assumption?

:::{admonition} Solution
:class: dropdown
From $D \approx 2(1 - r_1)$, solve $r_1 \approx 1 - D/2 = 1 - 0.99 = 0.01$. The lag-one
autocorrelation is essentially zero, so $D = 1.98$ is right next to the neutral value of $2$.
There is no evidence of first-order autocorrelation, and the usual standard errors are
defensible on that count. (A formal test would return a large p-value.)
:::
::::

A p-value below $2\times 10^{-16}$ is easy to read past. The simulation below makes it concrete by
building the comparison the test is making: hundreds of series whose errors really are
uncorrelated, so you can see for yourself how far $0.43$ sits from anything chance produces.

```{iframe} ../sims/ch15-durbin-watson.html
:class: sim sim-m
:width: 100%
Simulate the Durbin-Watson statistic under honestly uncorrelated errors and watch the pile gather around 2. The airline model's 0.43, marked in amber, never gets company.
```

(ch15-cochrane-orcutt)=
## 15.4 A remedy: the Cochrane-Orcutt procedure

### Intuition

If the errors follow an AR(1) pattern, we can transform them away. The trick is
**quasi-differencing**: instead of the raw series, regress each observation minus $\rho$ times
the previous observation. That combination cancels the correlated part of the error and leaves
the fresh, independent innovations behind. Because the transformed model has uncorrelated
errors, ordinary least squares on it is valid again. The one snag is that $\rho$ is unknown, so
we estimate it from the residuals and iterate. That loop is the **Cochrane-Orcutt procedure**.

:::{admonition} Definition 15.8: Quasi-differencing
:class: note definition
**Quasi-differencing** replaces each observation by itself minus $\rho$ times its predecessor,
$Y_t - \rho Y_{t-1}$, and does the same to every predictor. With the correct $\rho$ this cancels
the correlated part of an AR(1) error and leaves the independent innovations $u_t$.
:::

:::{admonition} Definition 15.9: Cochrane-Orcutt procedure
:class: note definition
The **Cochrane-Orcutt procedure** removes AR(1) autocorrelation iteratively: fit by least
squares, estimate $\rho$ from the residuals, quasi-difference the response and predictors, refit,
and repeat until $\hat\rho$ stabilizes.
:::

### Formula

Start from the regression with AR(1) errors, written compactly with $\mathbf{x}_t$ for the row
of predictors (the $1$, the trend $t$, and the month indicators) in month $t$:

$$
Y_t = \mathbf{x}_t' \boldsymbol\beta + \varepsilon_t, \qquad
\varepsilon_t = \rho\,\varepsilon_{t-1} + u_t .
$$

Lag the whole regression one step, multiply by $\rho$, and subtract:

$$
\underbrace{Y_t - \rho\, Y_{t-1}}_{Y_t^{\ast}}
= \underbrace{(\mathbf{x}_t - \rho\,\mathbf{x}_{t-1})'}_{\mathbf{x}_t^{\ast\prime}} \boldsymbol\beta
+ \underbrace{(\varepsilon_t - \rho\,\varepsilon_{t-1})}_{u_t} .
$$

- $Y_t^{\ast} = Y_t - \rho Y_{t-1}$ is the **quasi-differenced response**.
- $\mathbf{x}_t^{\ast} = \mathbf{x}_t - \rho\,\mathbf{x}_{t-1}$ is the quasi-differenced predictor row.
- $u_t$ is the innovation, and by the AR(1) definition it is independent across $t$ with constant variance.

The transformed model $Y_t^{\ast} = \mathbf{x}_t^{\ast\prime}\boldsymbol\beta + u_t$ has exactly
the same coefficients $\boldsymbol\beta$ as the original, but now satisfies the ordinary
least-squares assumptions, so fitting it gives trustworthy standard errors.

### Derivation

:::{admonition} Theorem 15.10: Quasi-differencing removes AR(1) autocorrelation
:class: important theorem
Under the model $Y_t = \mathbf{x}_t' \boldsymbol\beta + \varepsilon_t$ with AR(1) errors
$\varepsilon_t = \rho\,\varepsilon_{t-1} + u_t$, the quasi-differenced model

$$
Y_t - \rho\, Y_{t-1} = (\mathbf{x}_t - \rho\,\mathbf{x}_{t-1})'\boldsymbol\beta + u_t
$$

has the same coefficients $\boldsymbol\beta$ and errors $u_t$ that are independent with constant
variance, so ordinary least squares applied to it yields trustworthy standard errors.
:::

**Proof.** The AR(1) definition says the error is
its own lag scaled by $\rho$ plus an independent shock, $\varepsilon_t = \rho\varepsilon_{t-1} +
u_t$, which rearranges to $u_t = \varepsilon_t - \rho\varepsilon_{t-1}$. Take the original
regression $Y_t = \mathbf{x}_t'\boldsymbol\beta + \varepsilon_t$ and the same relation one step
back, $Y_{t-1} = \mathbf{x}_{t-1}'\boldsymbol\beta + \varepsilon_{t-1}$. Multiply the lagged
equation by $\rho$ and subtract it from the current one. On the left, $Y_t - \rho Y_{t-1}$; on
the right, $(\mathbf{x}_t - \rho\mathbf{x}_{t-1})'\boldsymbol\beta$ plus $\varepsilon_t - \rho
\varepsilon_{t-1}$, and that last piece is exactly $u_t$. So the quasi-differenced series obeys a
regression with the same $\boldsymbol\beta$ and with the independent, constant-variance errors
$u_t$. Ordinary least squares is back on solid ground, which is the whole point of the
transform.

The obstacle is that $\rho$ is unknown. The Cochrane-Orcutt procedure estimates it and the
coefficients together, by iterating:

1. Fit the original model by ordinary least squares and keep the residuals $e_t$.
2. Estimate $\rho$ by regressing $e_t$ on $e_{t-1}$ through the origin: $\hat\rho = \sum_{t=2}^n e_t e_{t-1} / \sum_{t=2}^n e_{t-1}^2$.
3. Quasi-difference $Y$ and every predictor using $\hat\rho$, and refit by least squares to get new $\boldsymbol\beta$.
4. Recompute residuals from the original-scale fit, re-estimate $\rho$, and repeat until $\hat\rho$ stops changing.

Each pass reduces the leftover autocorrelation; in practice a couple of iterations suffice.
$\blacksquare$

@fig-ch15-co-flow lays the four steps out as a loop. Read it top to bottom, then follow the
orange arrow back up whenever the estimated $\rho$ is still moving: fit, estimate, transform,
refit, check, and stop once $\hat\rho$ settles.

```{figure} figures/fig_ch15_co_flow.png
:name: fig-ch15-co-flow
:alt: A flowchart of the Cochrane-Orcutt procedure. Four boxes run down the left in order: fit by ordinary least squares and keep residuals, estimate rho by regressing each residual on its lag, quasi-difference the response and every predictor with the estimated rho, and refit by least squares and recompute residuals. An arrow leads to a decision diamond asking whether rho-hat is stable. A no branch loops back up to the estimate-rho step; a yes branch leads to a final box, report the corrected fit.
The Cochrane-Orcutt procedure as a loop. Each pass estimates the autocorrelation, quasi-differences with it, and refits; the loop repeats until the estimated rho stops changing, then reports the corrected standard errors.
```

### R and Python

:::{admonition} Example 15.5: One Cochrane-Orcutt step on the airline model
:class: note
**Question.** Does quasi-differencing remove the autocorrelation from the airline model?

**Intuition.** Estimate $\rho$ from the residuals, quasi-difference the response and the design
matrix, refit, and re-check the Durbin-Watson statistic on the new residuals.

**Formula.** $\hat\rho = \sum e_t e_{t-1} / \sum e_{t-1}^2$; then fit
$Y_t^{\ast} = \mathbf{x}_t^{\ast\prime}\boldsymbol\beta + u_t$.

**Computation.**

```r
n <- nrow(air)
rho_hat <- sum(e[-1] * e[-n]) / sum(e[-n]^2)
round(rho_hat, 4)
```
```text
[1] 0.7918
```

```r
X <- model.matrix(fit)
ystar <- air$logpass[-1] - rho_hat * air$logpass[-n]
Xstar <- X[-1, ] - rho_hat * X[-n, ]
co <- lm(ystar ~ Xstar - 1)
e_co <- residuals(co)
DW_co <- sum(diff(e_co)^2) / sum(e_co^2)
round(c(DW_before = DW, DW_after = DW_co), 4)
```
```text
DW_before  DW_after
   0.4252    2.1891
```

```python
N = len(air)
rho_hat = np.sum(e[1:] * e[:-1]) / np.sum(e[:-1] ** 2)
X = fit.model.exog
y = air["logpass"].to_numpy()
Xstar = X[1:] - rho_hat * X[:-1]
ystar = y[1:] - rho_hat * y[:-1]
bco = np.linalg.lstsq(Xstar, ystar, rcond=None)[0]
e_co = ystar - Xstar @ bco
DW_co = np.sum(np.diff(e_co) ** 2) / np.sum(e_co**2)
print(round(rho_hat, 4), round(DW_co, 4))
```
```text
0.7918 2.1891
```

**Interpretation.** The estimated autocorrelation is $\hat\rho = 0.79$, matching the lag plot's
tilt. After one round of quasi-differencing the Durbin-Watson statistic climbs from $0.43$ to
$2.19$, right next to the neutral value of $2$: the first-order autocorrelation is essentially
gone. @fig-ch15-co-lag shows the same result as before-and-after lag plots, the tilt flattening
to a round cloud. The standard errors from the transformed fit account for the correlation and
are the ones to report. Cochrane-Orcutt fixes the *inference* about the trend and seasonal
coefficients. It does not, by itself, make the model forecast the future well, which is the
harder problem we turn to next.
:::

```{figure} figures/fig_ch15_co_lag.png
:name: fig-ch15-co-lag
:alt: Two side-by-side lag plots of residuals. The left panel, before Cochrane-Orcutt, shows an upward tilt with lag-one slope about 0.79. The right panel, after one quasi-differencing step, shows a round cloud with lag-one slope near zero.
Residual lag plots before (left) and after (right) one Cochrane-Orcutt step. Quasi-differencing flattens the upward tilt to a round cloud, so the transformed errors look uncorrelated.
```

::::{admonition} Try it 15.4
:class: important
Quasi-differencing with $\rho = 1$ would compute $Y_t - Y_{t-1}$, the ordinary first difference.
Using the AR(1) error model, explain why choosing $\rho$ near the estimated $0.79$ is preferable
to automatically differencing with $\rho = 1$ whenever residuals look autocorrelated.

:::{admonition} Solution
:class: dropdown
The transform that turns the AR(1) errors into independent innovations is $\varepsilon_t - \rho
\varepsilon_{t-1} = u_t$ with the *actual* $\rho$. Using $\rho = 1$ when the true value is $0.79$
over-differences: it subtracts too much of the previous error, and the transformed errors
$\varepsilon_t - \varepsilon_{t-1}$ are themselves autocorrelated (now negatively), so the cure
introduces a new problem. Matching $\rho$ to the estimated autocorrelation removes just the
correlated part and leaves clean innovations. First differencing is the right move only when
$\rho$ is genuinely close to $1$.
:::
::::

Try it 15.4 asks you to argue that $\rho = 1$ is too much. The simulation below lets you check the
argument on the real airline model by choosing the $\rho$ yourself and reading off the
autocorrelation that survives.

```{iframe} ../sims/ch15-cochrane-orcutt.html
:class: sim sim-m
:width: 100%
Quasi-difference the airline model with a rho of your choosing. Near 0.71 the residual runs break up and the Durbin-Watson statistic settles beside 2; push toward 1 and the residuals begin to zigzag instead.
```

(ch15-forecasting)=
## 15.5 Forecasting honestly: test on the future

### Intuition

A model that fits the past beautifully can still forecast the future badly. The only honest way
to judge a forecast is to hide part of the future from the model, forecast it, and compare. For
time data that means an **out-of-time split** (Definition 15.11): train on the earlier years,
test on the later ones. This is the validation mindset of Chapter 12 with one strict rule added
by the clock. You may never train on data that came after your test period, because at forecast
time that data did not exist. Splitting at random, the way you would for cross-sectional data,
would let the model peek at the future and flatter itself.

:::{admonition} Definition 15.11: Out-of-time split
:class: note definition
An **out-of-time split** divides time-ordered data by the calendar: the model is trained on the
earlier observations and tested on the later ones, so the evaluation mimics real forecasting. The
model may never train on data from after the test period.
:::

We train the trend-plus-season model on 1949 through 1957 and forecast 1958 through 1960, three
years it has never seen. @fig-ch15-train-test shows the result, and it is a useful humbling.

```{figure} figures/fig_ch15_train_test.png
:name: fig-ch15-train-test
:alt: A plot of the airline series with a dashed line separating the 1949 to 1957 training period from the 1958 to 1960 test period. Fitted values hug the data in the training period. In the test period the forecast line runs visibly above the actual counts, and a shaded 95 percent prediction band covers only a few of the actual points.
The model trained on 1949 to 1957 and forecasting 1958 to 1960. In the test years the forecast drifts above what actually happened, and the shaded naive prediction band misses most of the real months.
```

### Formula

Two honest scorecards summarize test-set performance. The **root mean squared error** and the
**mean absolute percentage error** on the held-out months are

$$
\mathrm{RMSE} = \sqrt{\frac{1}{n_{\text{test}}}\sum_{t \in \text{test}} (Y_t - \hat Y_t)^2},
\qquad
\mathrm{MAPE} = \frac{100\%}{n_{\text{test}}}\sum_{t \in \text{test}}\frac{|Y_t - \hat Y_t|}{Y_t} .
$$

- $Y_t$ is the actual passenger count in a test month; $\hat Y_t$ is the model's forecast, back-transformed from the log scale by exponentiating.
- RMSE is in passengers (thousands); MAPE is a unit-free percentage that is easy to explain.

In words: RMSE is the typical size of a forecast miss in passengers, and MAPE is the average
miss as a percent of the actual count.

Because the model is fitted on the log scale, we exponentiate the log forecast to get a count
forecast before scoring. We also carry the ordinary regression prediction interval from
@ch03-prediction-interval, back-transformed the same way, and check how often it actually covers
the truth.

### R and Python

:::{admonition} Example 15.6: Out-of-time evaluation of the airline forecast
:class: note
**Question.** How accurate is the trend-plus-season forecast on three years it has never seen,
and does its $95\%$ prediction interval keep its promise?

**Intuition.** Fit on 1949 to 1957, forecast 1958 to 1960, back-transform, and compare forecasts
to actuals with RMSE and MAPE. Then count how many of the 36 test months fall inside the
back-transformed $95\%$ prediction interval.

**Formula.** RMSE and MAPE as above; nominal coverage $0.95$ versus the observed fraction
covered.

**Computation.**

```r
train <- subset(air, year <= 1957)
test  <- subset(air, year >= 1958)
c(train_n = nrow(train), test_n = nrow(test))
fit_tr <- lm(logpass ~ t + month, data = train)
```
```text
train_n  test_n
    108      36
```

```r
pred_log <- predict(fit_tr, newdata = test, interval = "prediction", level = 0.95)
pred_pass <- exp(pred_log[, "fit"])
actual <- test$passengers
rmse <- sqrt(mean((actual - pred_pass)^2))
mape <- mean(abs(actual - pred_pass) / actual) * 100
insample <- exp(fitted(fit_tr))
rmse_in <- sqrt(mean((train$passengers - insample)^2))
round(c(RMSE_test = rmse, MAPE_test_pct = mape, RMSE_train = rmse_in), 2)
```
```text
    RMSE_test MAPE_test_pct    RMSE_train
        63.34         14.23          9.20
```

```python
train = air[air["year"] <= 1957]
test = air[air["year"] >= 1958]
print(len(train), len(test))
fit_tr = smf.ols("logpass ~ t + C(month)", data=train).fit()
pred = fit_tr.get_prediction(test).summary_frame(alpha=0.05)
pred_pass = np.exp(pred["mean"].to_numpy())
actual = test["passengers"].to_numpy()
rmse = np.sqrt(np.mean((actual - pred_pass) ** 2))
mape = np.mean(np.abs(actual - pred_pass) / actual) * 100
insample = np.exp(fit_tr.fittedvalues.to_numpy())
rmse_in = np.sqrt(np.mean((train["passengers"].to_numpy() - insample) ** 2))
print(round(rmse, 2), round(mape, 2), round(rmse_in, 2))
```
```text
108 36
63.34 14.23 9.2
```

Now the prediction-interval coverage:

```r
lo <- exp(pred_log[, "lwr"])
hi <- exp(pred_log[, "upr"])
covered <- (actual >= lo) & (actual <= hi)
round(c(nominal = 0.95, actual_coverage = mean(covered),
        n_covered = sum(covered), n_total = length(covered)), 3)
```
```text
        nominal actual_coverage       n_covered         n_total
          0.950           0.194           7.000          36.000
```

```python
lo = np.exp(pred["obs_ci_lower"].to_numpy())
hi = np.exp(pred["obs_ci_upper"].to_numpy())
covered = (actual >= lo) & (actual <= hi)
print(round(covered.mean(), 3), int(covered.sum()), len(covered))
```
```text
0.194 7 36
```

**Interpretation.** In-sample the model looks superb: a training RMSE of about $9$ thousand
passengers. On the future it is far worse, with a test RMSE of $63$ and a mean absolute
percentage error of $14\%$. The forecast systematically overshoots because it extrapolates the
1949 to 1957 growth rate into years when growth slowed, and the errors, being autocorrelated,
all drift the same way at once instead of cancelling. Worse, the $95\%$ prediction interval
covers only $7$ of $36$ test months, an actual coverage of $19\%$. The interval that promised to
be wrong one time in twenty was wrong four times in five. The gap between the confident
in-sample fit and the poor out-of-time performance is the entire lesson of this section.
:::

:::{admonition} Key idea
:class: tip keyidea
In-sample fit and out-of-time forecast accuracy are different things. The airline model explains
$98\%$ of the past yet misses the future by $14\%$, and its $95\%$ prediction interval covers one
test month in five. A high $R^2$ certifies description, never forecasting; only held-out months
can do that.
:::

Why does the prediction interval fail so badly? The interval from @ch03-prediction-interval was
derived under independent, constant-variance, normal errors, and it accounts for only two
sources of uncertainty: the spread of a single new error and the uncertainty in the fitted mean.
For a forecast several years out, neither piece is the real story. The errors are strongly
autocorrelated, so a run of bad months compounds instead of averaging out. The trend is
extrapolated far beyond the data, so any error in the estimated slope grows with the horizon.
And genuine forecast uncertainty should widen the further ahead you look, while the ordinary
regression interval barely widens at all. An interval that ignores all of this is bound to be
too narrow, which is exactly what the $19\%$ coverage shows.

:::{admonition} Why real forecast intervals need time-series methods
:class: warning
Getting an honest prediction interval for a forecast is genuinely harder than anything ordinary
regression offers, and it is beyond this course. Proper methods (autoregressive integrated
moving-average models, exponential smoothing, and state-space or structural time-series models)
build the error correlation into the model itself, so their forecast intervals widen with the
horizon and reflect the accumulating uncertainty. Regression with a trend and seasonal dummies
is a fine tool for description and for short-horizon point forecasts, and Cochrane-Orcutt
repairs its inference about the coefficients. But when a decision hinges on a calibrated
forecast interval, reach for a real time-series model, or at least report the out-of-time test
error rather than the in-sample interval. The most honest single number you can give a planner
here is the $14\%$ test MAPE, not the $95\%$ label on an interval that covers $19\%$.
:::

:::{admonition} Durable skill: Test on the future, never on the past
:class: tip
The fastest way to fool yourself with any predictive model is to score it on the same data you
fit it on. In-sample error is optimistic by construction, and for time data the fix is strict:
split by time, train on the earlier part, and test on the later part, because that is the only
split that mimics the real task of forecasting something that has not happened yet. This rule
outlives regression. It is the same discipline behind a backtest of a trading strategy, a
validation of a demand forecast, or an evaluation of any model that will be used to predict the
future. Whenever someone shows you a model that "predicts" a time series, ask the one question
that matters: was it tested on data from after the training period?
:::

::::{admonition} Try it 15.5
:class: important
The training RMSE was about $9$ and the test RMSE about $63$, a sevenfold jump. Give one reason
this gap is expected for this particular forecast, and name one thing you could report to a
decision-maker that would be more honest than the model's in-sample $95\%$ prediction interval.

:::{admonition} Solution
:class: dropdown
The gap is expected because the model extrapolates the trend into years it never saw, and the
autocorrelated errors push the forecasts the same direction for months at a time instead of
cancelling, so held-out error is much larger than the error on the fitted years. A more honest
report would be the out-of-time test error itself, the $14\%$ test MAPE or the test RMSE of
$63$, or the observed prediction-interval coverage of $19\%$, any of which tells the
decision-maker how the forecast actually performs on unseen months rather than how tightly it
fits the past.
:::
::::

The 1957 split is one choice among many, and the simulation below lets you move it. Watching the
same model score well on the months it saw and badly on the months it did not, over and over at
different splits, is the fastest way to make the lesson stick.

```{iframe} ../sims/ch15-forecast-split.html
:class: sim sim-m
:width: 100%
Move the training cutoff and compare the two error tiles: the model scores about 9 on the months it trained on and about 63 on the months it forecast. The 95 percent prediction band covers 19 percent of them.
```

## 15.6 Chapter summary

You can now handle regression on time-ordered data from end to end. You fit a trend-plus-season
model on the log scale (Definition 15.1), reading the trend as a growth rate and each month
coefficient as a seasonal offset, reusing the log transform of @ch10-log-interpretation and the
dummy coding of @ch11-dummy-coding. You can explain why time order usually correlates the errors,
and you proved, for the sample mean, that positive autocorrelation makes the ordinary variance
formula too small (Theorem 15.4), so least squares reports standard errors you cannot trust. You
diagnose autocorrelation three ways, the residual-versus-time plot, the lag plot, and the
Durbin-Watson test, and you derived why $D \approx 2(1 - r_1)$ makes $2$ the neutral value
(Theorem 15.7). You apply the Cochrane-Orcutt procedure and know why quasi-differencing restores
independent errors (Theorem 15.10). And you evaluate a forecast honestly with an out-of-time
split, computing test error and prediction-interval coverage, and you can say plainly why
calibrated forecast intervals need time-series methods this course does not cover.

**Key results at a glance.**

| Result | Statement or formula | Valid when |
|---|---|---|
| Trend-plus-season model (Def 15.1) | $\log Y_t = \beta_0 + \beta_1 t + \sum_{m=2}^{12}\gamma_m D_{mt} + \varepsilon_t$ | trend and seasonality are multiplicative; logs make them additive and stabilize variance |
| Growth from the log slope | monthly $(e^{\beta_1}-1)\times 100\%$; annual $(e^{12\beta_1}-1)\times 100\%$ | response modeled on the log scale |
| AR(1) error model (Def 15.3) | $\varepsilon_t = \rho\varepsilon_{t-1} + u_t$, $|\rho|<1$ | errors persist from one period to the next |
| Variance of the mean under AR(1) (Thm 15.4) | $\operatorname{Var}\{\bar Y\}=\frac{\sigma^2}{n}\big(1 + 2\sum_{k}(1-\tfrac{k}{n})\rho^k\big)$ | AR(1) errors; exceeds $\sigma^2/n$ when $\rho>0$, so OLS SEs are too small |
| Durbin-Watson statistic (Def 15.6) | $D = \sum_{t\ge 2}(e_t - e_{t-1})^2 / \sum_t e_t^2$ | any fitted regression; $0$ positive, $2$ none, $4$ negative |
| Durbin-Watson identity (Thm 15.7) | $D \approx 2(1 - r_1)$ | reasonably long series of residuals |
| Quasi-differencing removes AR(1) (Thm 15.10) | $Y_t - \rho Y_{t-1} = (\mathbf{x}_t - \rho\mathbf{x}_{t-1})'\boldsymbol\beta + u_t$ | AR(1) errors, with $\rho$ known or estimated |
| Out-of-time forecast score | RMSE and MAPE on held-out later months | train/test split respects time order |
| Prediction-interval coverage | fraction of test months inside the $95\%$ interval | interval is honest only if coverage $\approx 0.95$ |

Airline figures: $R^2 = 0.983$, $\hat\rho = 0.79$, $D$ moves from $0.43$ to $2.19$ after one
Cochrane-Orcutt step, test RMSE $63$ / MAPE $14\%$, and prediction-interval coverage $0.19$ (7 of
36).

**Key terms.** **time-ordered data**, **trend**, **seasonality**, **trend-plus-season model**,
**autocorrelation**, **first-order autoregressive (AR(1)) error model**, **autocorrelation
parameter**, **innovation**, **Durbin-Watson statistic**, **Durbin-Watson test**, **lag plot**,
**Cochrane-Orcutt procedure**, **quasi-differencing**, **out-of-time split**, **mean absolute
percentage error (MAPE)**, **prediction-interval coverage**.

**You should now be able to.**

- [ ] Fit and interpret a trend-plus-season model on the log scale, reading the trend as a growth rate and each month coefficient as a seasonal offset.
- [ ] Explain why time order correlates the errors, and show that positive autocorrelation makes ordinary least-squares standard errors too small.
- [ ] Diagnose autocorrelation with a residual-versus-time plot, a lag plot, and the Durbin-Watson test.
- [ ] Derive $D \approx 2(1 - r_1)$ and use it to read the Durbin-Watson scale.
- [ ] Apply the Cochrane-Orcutt procedure and explain why quasi-differencing restores independent errors.
- [ ] Evaluate a forecast with an out-of-time split, computing test RMSE, MAPE, and prediction-interval coverage.
- [ ] Explain why calibrated forecast intervals need time-series methods beyond ordinary regression.

**Where this fits.** This chapter serves the CHECK and USE stages of the modeling workflow
introduced in @ch02-workflow. We ASK a forecasting question and EXPLORE the series, FIT a trend
and seasonal model, then spend most of the chapter on CHECK: the uncorrelated-errors assumption
that every earlier inference relied on fails on time data, so we diagnose the failure with the
Durbin-Watson test and repair the inference with Cochrane-Orcutt. The USE stage, forecasting,
comes with a warning the earlier chapters could make cleanly but this one cannot: the prediction
interval of @ch03-prediction-interval, honest under independent errors, is badly miscalibrated
here. That is the seam where an applied regression course hands off to a time-series course:
the out-of-time split and the honest-forecast discipline you built here are the entry habits
any such course assumes. Chapter 16 (@ch16) closes the book by stepping back from any single
model to ask what a chain of regressions can and cannot say about cause, and by walking the
whole workflow one last time.

## 15.7 Frequently asked questions

**Q1. Why log the passengers instead of modeling the counts directly?** Because the seasonal
swings and the error spread both grow with the level of the series, which is a multiplicative
pattern. Taking logs turns the multiplicative seasonal effect into an additive one, so a single
set of month coefficients fits all twelve years, and it stabilizes the variance so the
constant-variance assumption is closer to true. This is the same reasoning as
@ch10-log-interpretation, applied to a series that grows over time.

**Q2. If least squares is still unbiased under autocorrelation, why care?** Unbiased means the
estimate is right on average, but a single analysis gives you one estimate, and you need to know
how far it might be off. That is the standard error's job, and autocorrelation makes the
reported standard error wrong, usually far too small. You end up with a point estimate that is
fine and a confidence interval that lies about its own reliability.

**Q3. My Durbin-Watson statistic is $2.6$. Is that a problem?** It is on the negative-
autocorrelation side, since $D > 2$ means $r_1 < 0$. From $D \approx 2(1 - r_1)$, a $D$ of $2.6$
implies $r_1 \approx -0.3$. Mild negative autocorrelation is less common than positive but does
occur, often from over-differencing or from a variable measured as a change. Whether it is
"a problem" depends on the p-value and on how much you rely on the standard errors.

**Q4. Does Cochrane-Orcutt change the trend estimate or just the standard errors?** Both, a
little. The quasi-differenced fit is a generalized least-squares estimate, which weights the
data differently from ordinary least squares, so the coefficients shift somewhat. The larger and
more important change is to the standard errors, which now account for the correlation and are
the ones you should report.

**Q5. Why not just use the ordinary prediction interval and admit it is approximate?** Because
it is not approximately right, it is badly wrong: on the airline test set it covered $19\%$ of
months instead of $95\%$. An interval that far off does not communicate uncertainty, it
misstates it. If you cannot produce a calibrated interval, report the out-of-time test error
instead, which is honest about how the forecast actually performs.

**Q6. Could I add more predictors instead of modeling the error correlation?** Sometimes.
Autocorrelated residuals can be a symptom of a missing predictor, an omitted trend curvature or
a skipped seasonal term, and adding the right predictor can remove the pattern at its source.
That is usually the better fix when you can find the missing structure. Cochrane-Orcutt is for
the residual correlation that remains after you have modeled the structure you can.

**Q7. Is a high $R^2$ like $0.983$ evidence the forecast will be good?** No. That $R^2$ measures
fit to the past, and this chapter's whole point is that in-sample fit and out-of-time forecast
accuracy are different things. The same model with $R^2 = 0.983$ missed the future by $14\%$ and
its interval covered one test month in five. Judge a forecast on held-out data, never on $R^2$.

## 15.8 Practice problems

:::{note}
Unless a problem says otherwise, use `airpassengers.csv` and the trend-plus-season model
$\log Y_t = \beta_0 + \beta_1 t + \sum_{m=2}^{12}\gamma_m D_{mt} + \varepsilon_t$, fitted by
ordinary least squares, with the values found in this chapter: $b_1 = 0.0101$, $R^2 = 0.983$,
$D = 0.43$, $r_1 = 0.78$, $\hat\rho = 0.79$. Problems are marked (A) concepts, (B) theory, or
(C) data analysis. Odd-numbered answers appear in Appendix H; full solutions are in the
instructor materials.
:::

1. (A) In one sentence each, name the three features of the airline series in @fig-ch15-series and say which term in the trend-plus-season model captures each.
2. (A) Explain why the errors in a regression on monthly data are likely to be correlated, and give a concrete reason two neighboring months would share the sign of their error.
3. (A) The trend slope estimate is $b_1 = 0.0101$ on the log scale. Interpret it as a monthly percentage growth rate, and explain why exponentiating is needed.
4. (A) A Durbin-Watson statistic equals $0.43$. Without a table, state what it implies about the lag-one autocorrelation and about the reliability of the ordinary standard errors.
5. (A) Explain, to someone who has not taken this course, why splitting time-series data at random for a train/test evaluation is cheating, and what the correct split is.
6. (A) The naive $95\%$ prediction interval covered $19\%$ of the test months. State plainly what "95% coverage" is supposed to mean and why $19\%$ is a failure, not just a small miss.
7. (A) Give a wrong reading of the July coefficient $\hat\gamma_7 = 0.3006$ that a careless student might state, then correct it. (Hint: the coefficient is on the log scale, relative to January.)
8. (A) Why does positive autocorrelation, rather than negative, make ordinary least squares overconfident? Point to the sign of the covariance terms in the variance of the mean.
9. (B) Starting from $D = \sum_{t=2}^n (e_t - e_{t-1})^2 / \sum_{t=1}^n e_t^2$, derive the approximation $D \approx 2(1 - r_1)$ (Theorem 15.7), stating the step where the two truncated sums are replaced by the full residual sum of squares and why it is reasonable for large $n$.
10. (B) For $Y_t = \mu + \varepsilon_t$ with $\operatorname{Var}\{\varepsilon_t\} = \sigma^2$ and $\operatorname{Cov}\{\varepsilon_s, \varepsilon_t\} = \sigma^2 \rho^{|t-s|}$, derive $\operatorname{Var}\{\bar Y\} = \frac{\sigma^2}{n}\big(1 + 2\sum_{k=1}^{n-1}(1 - k/n)\rho^k\big)$ (Theorem 15.4), and conclude it exceeds $\sigma^2/n$ when $\rho > 0$.
11. (B) Using the AR(1) error model $\varepsilon_t = \rho\varepsilon_{t-1} + u_t$, derive the quasi-differencing transform (Theorem 15.10) and show that the transformed error $\varepsilon_t - \rho\varepsilon_{t-1}$ equals the independent innovation $u_t$.
12. (B) Show that $\operatorname{Var}\{\varepsilon_t\} = \sigma_u^2/(1 - \rho^2)$ for a stationary AR(1) process, starting from $\varepsilon_t = \rho\varepsilon_{t-1} + u_t$ and using $\operatorname{Var}\{\varepsilon_t\} = \operatorname{Var}\{\varepsilon_{t-1}\}$.
13. (B) In the AR(1) model, show that the correlation between errors $k$ steps apart is $\rho^k$, so the autocorrelation decays geometrically with the lag. (Use $\operatorname{Cov}\{\varepsilon_t, \varepsilon_{t-k}\} = \rho\,\operatorname{Cov}\{\varepsilon_{t-1}, \varepsilon_{t-k}\}$.)
14. (B) The Cochrane-Orcutt transform loses the first observation, since $Y_1^{\ast}$ has no predecessor. Explain why, and describe how the Prais-Winsten variant recovers it by rescaling the first row by $\sqrt{1 - \rho^2}$ (a one-paragraph argument, no full derivation needed).
15. (B) A student claims that because $b_1$ is unbiased under autocorrelation, the confidence interval $b_1 \pm t^{\ast} s\{b_1\}$ is still valid. Identify the error in the claim and state precisely which quantity in the interval is wrong.
16. (B) Show that if the true errors are uncorrelated ($\rho = 0$), the Cochrane-Orcutt first step estimates $\hat\rho \approx 0$ and the quasi-differenced fit reduces to ordinary least squares, so the procedure does no harm when there is no autocorrelation.
17. (C) Read `airpassengers.csv`, build `t` and `logpass`, fit the trend-plus-season model, and reproduce the trend slope, $R^2$, and residual standard error reported in Example 15.1.
18. (C) Compute the Durbin-Watson statistic from the residuals by hand (via $\sum (e_t - e_{t-1})^2 / \sum e_t^2$) and confirm it against `lmtest::dwtest` in R or `durbin_watson` in Python. Report both.
19. (C) Make the residual-versus-time plot and the lag plot for the fitted model. Describe what each shows and how they agree about the sign of the autocorrelation.
20. (C) Estimate $\rho$ from the residuals, quasi-difference the response and design matrix, refit, and report the Durbin-Watson statistic before and after. Confirm it moves from about $0.43$ toward $2$.
21. (C) Fit the model without logs (`passengers ~ t + month`) and compare its residual-versus-time plot and Durbin-Watson statistic to the log model's. Does dropping the log make the autocorrelation better or worse, and does the residual spread look constant?
22. (C) Split the data by time (train on 1949 to 1957, test on 1958 to 1960), fit on the training years, forecast the test years, back-transform, and reproduce the test RMSE and MAPE from Example 15.6.
23. (C) For the same split, compute the naive $95\%$ prediction-interval coverage on the test set and confirm it is far below $0.95$. Then compute the in-sample coverage on the training set and comment on the difference.
24. (C) Refit the trend-plus-season model dropping the seasonal dummies (trend only, `logpass ~ t`). Report the drop in $R^2$ and the new Durbin-Watson statistic, and explain how the unmodeled seasonal pattern shows up in the residuals of the trend-only fit.
25. (C) Add a squared trend term (`logpass ~ t + I(t^2) + month`) and report whether the curvature term is needed and whether it reduces the residual autocorrelation. Interpret what a negative coefficient on $t^2$ would mean for the growth rate.
26. (C) Using the training fit, forecast December 1958, 1959, and 1960 (months $120$, $132$, $144$), back-transform, and compare each to the actual value. Describe how the forecast error grows with the horizon.
27. (C) Repeat the out-of-time evaluation with an earlier split (train 1949 to 1955, test 1956 to 1960). Report the test MAPE and compare it to the 1958 split's $14\%$. Explain why a shorter training window can change the forecast error.
28. (C) Run the simulation of Example 15.3 for $\rho = 0$, $\rho = 0.4$, and $\rho = 0.8$, and report the ratio of the mean reported SE to the true standard deviation of $b_1$ for each. Describe how the ratio changes as $\rho$ grows and what that means for confidence intervals.
29. (A) The ordinary regression prediction interval from @ch03-prediction-interval covered only $19\%$ of the airline test months. Give the three reasons this interval is structurally too narrow for a forecast several years ahead, and name one family of methods that builds the error correlation into the model so its forecast interval widens with the horizon.

## 15.9 Exam practice

These five questions are written in the style of the course exams: each one hands you output or
a claim and asks you to explain, in full sentences with units, what it means. A correct number
with no reasoning earns little credit here. Work each one before opening the model answer.

**EP 15.1 (interpret this output in context).** The trend-plus-season model was fitted to all
144 months of `airpassengers.csv`, and the software reported the following.

```text
Coefficients (partial):
            Estimate  Std. Error  t value  Pr(>|t|)
t          0.0100688   0.0001193   84.40    < 2e-16 ***

Durbin-Watson test:  DW = 0.4252,  p-value < 2.2e-16
alternative hypothesis: true autocorrelation is greater than 0
```

Interpret the trend coefficient as a yearly growth rate (use $e^{12 \times 0.0101} \approx
1.128$), and then explain, given the Durbin-Watson result, whether you would report the printed
standard error of $0.00012$ and the tiny p-value on the trend at face value. State the direction
in which those numbers are wrong and why.

:::{admonition} Model answer
:class: dropdown
On the log scale the trend of $0.0101$ per month compounds over twelve months to $e^{12(0.0101)}
= e^{0.1208} \approx 1.128$, so passenger traffic grew about $12.8\%$ per year across 1949 to
1960. The Durbin-Watson statistic of $0.43$ sits far below the neutral value of $2$, with a
p-value below $2 \times 10^{-16}$, so the residuals are strongly positively autocorrelated: a
month above the fitted line is typically followed by another above it. That matters because
every standard-error formula in the model assumes uncorrelated errors, and positive
autocorrelation violates it. Under positive autocorrelation ordinary least squares treats
correlated months as if each carried independent information, so it divides by too much and
reports a standard error that is too small, which in turn makes the t statistic too large and
the p-value too tiny. The point estimate of the trend, $0.0101$, is still unbiased and worth
reporting, but the printed $0.00012$ standard error and the microscopic p-value overstate the
precision and should not be taken at face value; honest inference needs a correction such as
Cochrane-Orcutt first.

A weak answer converts the growth rate but then trusts the small p-value, or says the standard
error is "too large," missing that positive autocorrelation shrinks the reported standard error
rather than inflating it.
:::

**EP 15.2 (a student claims X, evaluate).** A student writes: "This model has $R^2 = 0.983$, so
it explains almost all the variation in the series. That means it will forecast next year's
monthly passenger counts to within about $2\%$." Using the out-of-time evaluation from this
chapter, evaluate the student's reasoning and state what the correct expectation is.

:::{admonition} Model answer
:class: dropdown
The student has confused in-sample fit with out-of-time forecast accuracy, which is the central
error this chapter warns against. The $R^2 = 0.983$ measures only how well the fitted line
describes the 1949 to 1960 months the model was trained on; it says nothing directly about
months the model has never seen. When the model is trained on 1949 to 1957 and asked to forecast
the held-out 1958 to 1960 months, its test mean absolute percentage error is about $14\%$, not
$2\%$, and its test RMSE of $63$ thousand passengers dwarfs the training RMSE of about $9$. The
forecast degrades out of sample because the model extrapolates the early growth rate into years
when growth slowed, and because the autocorrelated errors all drift the same way at once instead
of cancelling. So the correct expectation is that the model describes the past very well but
forecasts the near future to only about $14\%$ accuracy, and the only honest way to know that is
to test it on held-out later months, never to read it off $R^2$.

A weak answer simply says "high $R^2$ is good" or disputes the $0.983$ figure, without naming the
in-sample versus out-of-time distinction or citing the roughly $14\%$ test error as the honest
number.
:::

**EP 15.3 (interpret this output in context).** One Cochrane-Orcutt step was run on the airline
model, producing the output below.

```text
rho_hat (lag-one autocorrelation of residuals):  0.7918
Durbin-Watson before quasi-differencing:  0.4252
Durbin-Watson after  quasi-differencing:  2.1891
```

Explain what this procedure did to the model, what problem the "after" statistic shows it fixed,
and name one thing this step does not fix. Write in full sentences.

:::{admonition} Model answer
:class: dropdown
The procedure estimated the first-order autocorrelation of the residuals as $\hat\rho = 0.79$,
then quasi-differenced the response and every predictor by replacing each value with itself minus
$0.79$ times its predecessor, and refitted. Quasi-differencing with the correct $\rho$ cancels
the correlated part of an AR(1) error and leaves the independent innovations behind, so the
transformed model satisfies the uncorrelated-errors assumption that the original violated. The
Durbin-Watson statistic confirms this worked: it moved from $0.43$, deep in the
positive-autocorrelation zone, to $2.19$, essentially the neutral value of $2$, so the
first-order autocorrelation is gone and the standard errors from the transformed fit are now
trustworthy. What Cochrane-Orcutt does not fix is the forecasting problem: it repairs the
inference about the trend and seasonal coefficients, but it does not make the model extrapolate
the future any better, so the out-of-time test error and the miscalibrated prediction interval
remain exactly as poor as before. Correcting the standard errors and forecasting well are
separate goals.

A weak answer reads "$2.19$ is close to $2$" without explaining that quasi-differencing removed
the AR(1) correlation, or claims the step also improves the forecast, which it does not.
:::

**EP 15.4 (what would change if).** Suppose you had fitted the model to the raw passenger counts
instead of their logs, `passengers ~ t + month`. The two fits compare as follows.

```text
                    R^2     residual SE        DW      corr(|residual|, fitted)
raw counts        0.9559     26.33 pass       0.4502            +0.137
log counts        0.9835      0.0593 (log)    0.4252            -0.041
```

Explain what would change, and what would not, if you used the raw-count fit. Address both the
behavior of the residual spread and whether the autocorrelation problem is cured, and say why the
log scale is preferred here.

:::{admonition} Model answer
:class: dropdown
Two things change and one thing does not. First, the residual spread stops being constant: on the
raw scale the size of the residuals grows with the fitted level, shown by the positive
correlation of $+0.137$ between the absolute residuals and the fitted values, so the errors fan
out as passenger traffic climbs and the constant-variance assumption fails. The log fit removes
that fanning, with a near-zero correlation of $-0.04$, because logging turns the multiplicative
seasonal swings into additive ones and stabilizes the variance. Second, a single set of month
coefficients no longer describes every year equally well on the raw scale, since the seasonal
gap in passengers is small early and large late; that is the same multiplicative pattern the log
handles. What does not change is the autocorrelation: the raw-count Durbin-Watson statistic is
$0.45$, essentially as bad as the log model's $0.43$, so switching off the log does nothing to
cure the positive autocorrelation, which comes from time order rather than from the scale. The
log scale is preferred because it fixes the nonconstant variance and lets one seasonal pattern
fit all twelve years, while the autocorrelation must still be handled separately by
Cochrane-Orcutt or a time-series model.

A weak answer claims the log "fixes the autocorrelation" (it does not, both statistics are near
$0.45$) or ignores the growing residual spread that the log is actually there to cure.
:::

**EP 15.5 (explain why).** On the 1958 to 1960 test set, the model's nominal $95\%$ prediction
interval covered only $7$ of the $36$ test months, an actual coverage of $19\%$.

```text
nominal coverage:  0.95
actual coverage:   0.194   (7 of 36 test months inside the 95% interval)
```

State what "$95\%$ coverage" is supposed to mean, explain why $19\%$ is a structural failure
rather than a small miss, give the three reasons the ordinary regression interval is too narrow
for a forecast several years ahead, and name one family of methods built to fix it.

:::{admonition} Model answer
:class: dropdown
A $95\%$ prediction interval is a promise that, over many forecasts, about $95$ of every $100$
future observations will fall inside their intervals, so it should be wrong roughly one time in
twenty. Covering only $19\%$ of the test months means the interval was wrong about four times in
five, so it is not a slightly optimistic interval but one that misstates the uncertainty by a
wide margin; the promised one-in-twenty failure rate became a four-in-five failure rate. The
ordinary regression interval is structurally too narrow here for three reasons. First, the errors
are strongly positively autocorrelated, so a run of bad months compounds in the same direction
instead of averaging out, and the interval, derived under independent errors, never accounts for
that. Second, the trend is extrapolated years beyond the training data, so any error in the
estimated slope grows with the forecast horizon, yet the ordinary interval barely widens as it
reaches further ahead. Third, genuine forecast uncertainty should widen the further out you look,
while the regression prediction interval stays almost the same width across the whole test
period. Methods built to fix this are the time-series family, such as autoregressive integrated
moving-average (ARIMA) models, exponential smoothing, and state-space or structural models, which
build the error correlation into the model so their forecast intervals widen with the horizon.

A weak answer treats $19\%$ as merely "a bit low," or lists only one reason (usually the
autocorrelation) without the extrapolated-slope and horizon-widening reasons, or names no proper
time-series remedy.
:::

## Chapter game

:::{admonition} Play the Chapter 15 game
:class: tip
[Play the Chapter 15 game on your phone or laptop](../games/ch15.html): 10 quick rounds, no
setup. It drills this chapter's core moves on the real airline series: reading the log trend as
a growth rate, spotting the seasonal peak, diagnosing autocorrelation with the Durbin-Watson
statistic, ordering the Cochrane-Orcutt fix, and judging a forecast out-of-time, with a short
reason shown after every answer.
:::

:::{admonition} Resumen del capítulo (en español)
:class: dropdown
Este capítulo trata la **regresión con datos ordenados en el tiempo (time-ordered data)**,
usando la serie clásica de pasajeros aéreos mensuales de 1949 a 1960. La serie muestra tres
rasgos: una **tendencia (trend)** creciente, una **estacionalidad (seasonality)** anual con pico
en verano, y oscilaciones que crecen con el nivel. Modelamos $\log Y_t = \beta_0 + \beta_1 t +
\sum_{m=2}^{12}\gamma_m D_{mt} + \varepsilon_t$: una tendencia lineal en el tiempo más once
variables indicadoras de mes, en escala logarítmica para volver aditiva la estacionalidad y
estabilizar la varianza. El modelo explica el $98.3\%$ de la variación; la pendiente estimada
$b_1 = 0.0101$ implica un crecimiento de $1.0\%$ mensual, cerca de $12.8\%$ anual.

El problema central es la **autocorrelación (autocorrelation)**: en datos temporales los errores
están correlacionados con su pasado reciente, lo que viola el supuesto de errores no
correlacionados. Con el **modelo autorregresivo de primer orden (AR(1))** $\varepsilon_t =
\rho\varepsilon_{t-1} + u_t$, demostramos que la autocorrelación positiva hace que la varianza
verdadera del estimador supere a la fórmula ordinaria, de modo que mínimos cuadrados reporta
errores estándar demasiado pequeños. Una simulación muestra que el error estándar reportado es
apenas un tercio del real.

Para detectar la autocorrelación usamos el gráfico de residuos contra el tiempo, el gráfico de
rezago, y la **prueba de Durbin-Watson (Durbin-Watson test)**, con estadístico $D = \sum
(e_t - e_{t-1})^2 / \sum e_t^2$. Derivamos que $D \approx 2(1 - r_1)$, así que $2$ indica
ausencia de autocorrelación. Para la serie aérea $D = 0.43$ (autocorrelación positiva fuerte,
$r_1 = 0.78$). El **procedimiento de Cochrane-Orcutt (Cochrane-Orcutt procedure)** transforma el
modelo por cuasi-diferenciación $Y_t - \rho Y_{t-1}$, dejando errores independientes; tras una
iteración $D$ sube de $0.43$ a $2.19$.

Finalmente evaluamos el pronóstico de forma honesta con una **división temporal (out-of-time
split)**: entrenar en 1949 a 1957, probar en 1958 a 1960. El RMSE en prueba ($63$) supera con
creces al de entrenamiento ($9$), con un MAPE de $14\%$, y el intervalo de predicción del $95\%$
solo cubre el $19\%$ de los meses. Por eso los intervalos de pronóstico calibrados requieren
métodos de series de tiempo más allá de este curso.
:::
