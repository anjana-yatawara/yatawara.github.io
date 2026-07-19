---
title: "13. Logistic regression"
subtitle: "MATH 4210, Chapter 13"
---

(ch13)=
# 13. Logistic regression

On the evening of January 27, 1986, engineers at Morton Thiokol and NASA argued on a
conference call about whether to launch the space shuttle Challenger the next morning. The
forecast for Cape Canaveral was cold, near freezing, colder than any previous launch. The
concern was the rubber O-rings that sealed the joints of the solid rocket boosters. In the
cold the rubber stiffens, and a stiff O-ring might not seal in time to hold back the burning
gas. The engineers had data from 23 earlier flights: for each one, the temperature at launch
and the number of O-rings, out of six, that showed heat damage afterward.

@fig-ch13-orings-temp shows that data. Damage happened on both warm and cool flights, but
the coldest launches carried the worst incidents, and the launch under discussion would be
far colder than anything on the record. That is the hard part. Every flight that had ever
flown did so at 53 degrees Fahrenheit or warmer. The predicted launch temperature was about
31 degrees, off the left edge of all experience. To say anything about the risk at 31
degrees, you have to extend a pattern past the last data point, which is exactly the move a
statistician is trained to distrust.

```{figure} figures/fig_ch13_orings_temp.png
:name: fig-ch13-orings-temp
:alt: A scatterplot of the fraction of six O-rings damaged on the vertical axis against launch temperature in degrees Fahrenheit on the horizontal axis, for 23 shuttle flights. Points sit between 53 and 81 degrees; the coolest flights near 53 degrees show the highest damage fractions, and warm flights above 70 degrees mostly show no damage. A red dashed line marks the 31 degree launch temperature far to the left of every observation, inside a shaded band that is colder than any recorded flight.
The 23 flights before Challenger. Damage was worst at the coolest launches, and the 31 degree launch decision (dashed line) sat far below every temperature the program had ever flown, so judging its risk means extrapolating.
```

The response here is not a number like work hours or savings rate. It is closer to a
yes-or-no: did an O-ring fail or not. Straight-line regression, the tool of the last eleven
chapters, is built for a continuous response and breaks in specific ways when the outcome is
binary. This chapter builds the right tool. You will learn the logistic regression model,
the odds and log-odds that make it linear, how to fit it by maximum likelihood when no
formula gives the estimates, how to read its coefficients as odds ratios without the usual
mistakes, how to test them, and how to judge how well the model separates the two outcomes.
By the end you will be able to put a number on the risk the Challenger engineers were
arguing about, and to say honestly how much to trust it.

:::{admonition} This lesson at a glance
:class: important
- **What we are doing:** Building logistic regression for a yes-or-no response: the model, odds and log-odds, fitting by maximum likelihood, reading coefficients as odds ratios, testing them, and judging the fit with a classification table and ROC curve, on the Challenger O-ring data.
- **Why we are doing it:** The response is now binary (did an O-ring fail), and the straight-line model of the last eleven chapters breaks in three specific ways when the outcome is 0 or 1.
- **Main objective:** State the logistic model, fit it by maximum likelihood, interpret a coefficient as an odds ratio without the usual mistakes, and evaluate the fit with deviance, classification, and an ROC curve.
- **What changed from the last chapters:** Chapters 2 through 12 assumed a continuous, constant-variance, normal response; this chapter keeps the linear predictor but wraps it in a link for a binary outcome, reusing dummy coding (@ch11-dummy-coding), the general linear test in deviance form (@ch08-general-linear-test), and the validation mindset (@ch12-cross-validation).
:::

:::{admonition} Learning objectives
:class: tip
By the end of this chapter you will be able to:
- **Explain** why ordinary least squares is the wrong model for a binary response, naming the three specific failures.
- **State** the logistic regression model and connect probability, odds, and log-odds.
- **Derive** the score equations for logistic regression and describe how iteratively reweighted least squares (IRLS) solves them.
- **Interpret** a logistic coefficient as an odds ratio, and correct the common misreadings of it.
- **Test** coefficients with the Wald test and the likelihood-ratio test, and explain when they disagree.
- **Compute** the deviance and use it to compare nested models.
- **Evaluate** a fitted model with a classification table and an ROC curve, and diagnose data problems before trusting either.
:::

(ch13-logistic-model)=
## 13.1 Why a straight line fails, and what to use instead

### Intuition

Start with what goes wrong. Suppose you code the response as $Y = 1$ for a positive outcome
(an O-ring damaged, a diabetes test positive) and $Y = 0$ otherwise, and you fit the ordinary
line $Y = \beta_0 + \beta_1 X + \varepsilon$. Three things break.

First, the fitted line is unbounded. A line keeps rising as $X$ grows, so it eventually
predicts probabilities above 1 and, going the other way, below 0. @fig-ch13-why-not-ols shows
the least-squares line through the diabetes data sliding straight out of the $[0, 1]$ range
where a probability has to live.

Second, the spread is not constant. A $0/1$ response has variance $\pi(1 - \pi)$, where $\pi$
is the probability that $Y = 1$. That variance is largest near $\pi = 0.5$ and shrinks toward
zero as $\pi$ approaches 0 or 1, the upside-down parabola in @fig-ch13-binvar. A coin near
50-50 is the hardest to call, so its outcome is the most variable; a coin that almost always
lands heads is nearly a sure thing, so it barely varies. The spread is fixed by the mean. So
the constant-variance assumption behind least squares (@ch02-slr-model) is false by
construction, and the weighting that would fix it changes with the mean, an idea we met in
weighted least squares (@ch10-wls).

Third, the errors cannot be normal. If $Y$ is only ever 0 or 1, then for a given $X$ the
"error" takes just two values, so the normal error model that justified our $t$ and $F$
inference simply does not apply.

```{figure} figures/fig_ch13_why_not_ols.png
:name: fig-ch13-why-not-ols
:alt: A scatterplot of diabetes test result, coded 0 or 1 and jittered vertically, against plasma glucose. A red dashed straight line rises through the cloud and passes below 0 at low glucose and above 1 at high glucose. A blue S-shaped logistic curve rises from near 0 to near 1 but stays inside the 0-to-1 band the whole way. Two thin gray horizontal lines mark 0 and 1.
The least-squares line (red dashed) leaves the range a probability must stay in, dropping below 0 and climbing above 1. The logistic curve (blue) bends to fit inside the band.
```

```{figure} figures/fig_ch13_binvar.png
:name: fig-ch13-binvar
:alt: A curve of the variance of a zero-one response on the vertical axis against the probability pi of a positive outcome on the horizontal axis. The curve is an upside-down parabola equal to pi times one minus pi, rising from zero at pi equals 0 to a peak of 0.25 at pi equals 0.5 and falling back to zero at pi equals 1. The peak is marked with a red dot and labeled largest spread, and both ends are labeled almost no spread.
The variance of a yes-or-no outcome is not a free constant: it equals $\pi(1-\pi)$, peaking at $\pi = 0.5$ and vanishing at both ends. Because the spread is welded to the mean, the constant-variance assumption of least squares cannot hold for a binary response.
```

The fix is to model the probability $\pi$ directly and to bend the line so it can never leave
$[0, 1]$. The bend is the S-shaped logistic curve in the figure.

### From probability to odds to log-odds

The bridge is the **odds** (Definition 13.1).

:::{admonition} Definition 13.1: Odds
:class: note definition
The **odds** of an event with probability $\pi$ is $\text{odds} = \pi/(1 - \pi)$, the
probability the event happens divided by the probability it does not. Odds range from $0$
(the event never happens) to $\infty$ (it is certain).
:::

A probability of $0.5$ is odds of 1 (even money). A probability of $0.75$ is
odds of 3 (three to one). As $\pi$ climbs toward 1 the odds shoots off to infinity, and as
$\pi$ falls toward 0 the odds falls toward 0 but never goes negative. @fig-ch13-odds-prob
draws this mapping. Odds stretch the bounded $[0, 1]$ probability scale onto the half-line
$[0, \infty)$.

```{figure} figures/fig_ch13_odds_prob.png
:name: fig-ch13-odds-prob
:alt: A curve showing odds on the vertical axis as a function of probability on the horizontal axis. The curve starts near the origin, passes through the point where probability is one half and odds is one, and then rises ever more steeply, heading toward infinity as probability approaches one. Dotted guide lines mark probabilities of 0.1, 0.5, 0.75, and 0.9 with their odds of about 0.11, 1, 3, and 9.
Odds as a function of probability. Equal steps in probability are not equal steps in odds: from 0.5 to 0.75 the odds triples, but from 0.75 to 0.9 it triples again, so the odds scale expands as you approach certainty.
```

Taking one more step, the **log-odds** or **logit** (Definition 13.2) is the natural
logarithm of the odds:

$$
\operatorname{logit}(\pi) = \log\!\left(\frac{\pi}{1 - \pi}\right) .
$$

:::{admonition} Definition 13.2: Log-odds (logit)
:class: note definition
The **log-odds** or **logit** of a probability $\pi$ is $\operatorname{logit}(\pi) =
\log[\pi/(1 - \pi)]$, the natural log of the odds. It maps the bounded range $(0, 1)$ onto
the whole real line $(-\infty, \infty)$.
:::

In words: the logit is the log of the odds. The logarithm sends $[0, \infty)$ onto the whole
real line $(-\infty, \infty)$, the same range a linear predictor $\beta_0 + \beta_1 X$ can
take. That is the whole trick. We cannot set a probability equal to a line, because one is
bounded and the other is not, but we can set the logit of the probability equal to a line.

:::{admonition} Key idea
:class: tip keyidea
A probability lives in $[0, 1]$ and a straight line does not, so the two can never be equal.
The logit removes the walls: it stretches the bounded probability scale onto the whole real
line, and there a linear model can reach it. Every generalized linear model works this same
way, by transforming the mean until a line can fit.
:::

### The logistic regression model

The **logistic regression model** (Definition 13.3) for a binary response says the log-odds
is linear in the predictors:

$$
\operatorname{logit}(\pi_i) = \log\!\left(\frac{\pi_i}{1 - \pi_i}\right)
= \beta_0 + \beta_1 X_{i1} + \dots + \beta_{p-1} X_{i,p-1} ,
$$

where $\pi_i = P(Y_i = 1 \mid X_i)$ is the probability that case $i$ has a positive outcome,
the $\beta$'s are the regression parameters (with $p$ of them counting the intercept), and
$X_{i1}, \dots, X_{i,p-1}$ are the predictors for case $i$. Writing $\eta_i = \beta_0 +
\beta_1 X_{i1} + \dots$ for the **linear predictor**, we solve the logit equation for $\pi_i$
to get the model on the probability scale:

$$
\pi_i = \frac{1}{1 + e^{-\eta_i}} = \frac{e^{\eta_i}}{1 + e^{\eta_i}} .
$$

:::{admonition} Definition 13.3: Logistic regression model
:class: note definition
The **logistic regression model** for a binary response $Y_i$ with success probability
$\pi_i = P(Y_i = 1 \mid X_i)$ makes the log-odds a linear function of the predictors,
$\operatorname{logit}(\pi_i) = \beta_0 + \beta_1 X_{i1} + \dots + \beta_{p-1} X_{i,p-1} =
\eta_i$, equivalently $\pi_i = 1/(1 + e^{-\eta_i})$. The quantity $\eta_i$ is the linear
predictor and the logit is the link function.
:::

In words: the probability is the linear predictor passed through the logistic function
$1/(1 + e^{-\eta})$, the S-curve of @fig-ch13-sigmoid. The function is squashed to lie
strictly between 0 and 1, so no matter what the coefficients are, the predicted probability
is always a legal probability.

```{figure} figures/fig_ch13_sigmoid.png
:name: fig-ch13-sigmoid
:alt: Two side-by-side panels. The left panel shows probability pi on the vertical axis as an S-shaped logistic function of the linear predictor eta on the horizontal axis, rising from near 0 at eta of minus 6 through 0.5 at eta of 0 to near 1 at eta of 6. The right panel shows the log-odds of pi as a straight diagonal line against eta, confirming that the logit of the probability equals the linear predictor.
Left: the logistic function turns any linear predictor into a probability between 0 and 1. Right: on the log-odds scale the same relationship is a straight line, which is why logistic regression is a linear model in disguise.
```

The two links in the term **generalized linear model** are visible here. There is a random
part, $Y_i$ being 0 or 1 with probability $\pi_i$, and a systematic part, the linear
predictor $\eta_i$, joined by the **link function** logit that maps the mean onto the linear
scale. Ordinary regression is the same picture with the identity link and a normal response;
Chapter 14 makes the family explicit and adds the Poisson member (@ch14-glm).

### R and Python

For the O-ring data the response is grouped: each flight contributes six O-rings, of which
$Y_i$ were damaged. That is a binomial count, and logistic regression handles it with the
same machinery, modeling the probability $\pi_i$ that a single O-ring is damaged at
temperature $X_i$. In R you pass the two-column response `cbind(successes, failures)` to
`glm` with `family = binomial`; in Python you give statsmodels the two counts on the left of
the formula.

:::{admonition} Example 13.1: The O-ring model
:class: note
**Question.** How does the probability that an O-ring is damaged depend on launch
temperature, and what does the model say at 31 degrees?

**Intuition.** Fit the logistic model with temperature as the single predictor, then read the
fitted probability at the launch temperature and at a couple of reference points.

**Formula.** $\operatorname{logit}(\pi_i) = \beta_0 + \beta_1 X_i$, with $X_i$ the launch
temperature; the fitted probability at temperature $x$ is $\hat\pi(x) = 1/(1 + e^{-(b_0 +
b_1 x)})$.

**Computation.**

```r
orings <- read.csv("data/orings.csv")
dim(orings)
head(orings, 3)
```
```text
[1] 23  2
  temp damage
1   53      5
2   57      1
3   58      1
```

```r
fit <- glm(cbind(damage, 6 - damage) ~ temp, family = binomial, data = orings)
summary(fit)
```
```text
Call:
glm(formula = cbind(damage, 6 - damage) ~ temp, family = binomial,
    data = orings)

Coefficients:
            Estimate Std. Error z value Pr(>|z|)
(Intercept) 11.66299    3.29626   3.538 0.000403 ***
temp        -0.21623    0.05318  -4.066 4.78e-05 ***
---
(Dispersion parameter for binomial family taken to be 1)

    Null deviance: 38.898  on 22  degrees of freedom
Residual deviance: 16.912  on 21  degrees of freedom
AIC: 33.675

Number of Fisher Scoring iterations: 6
```

```r
newtemps <- data.frame(temp = c(31, 53, 65))
round(predict(fit, newdata = newtemps, type = "response"), 4)
```
```text
     1      2      3
0.9930 0.5505 0.0838
```

Now the same fit in Python with statsmodels.

```python
import numpy as np
import pandas as pd
import statsmodels.formula.api as smf
import statsmodels.api as sm

orings = pd.read_csv("data/orings.csv")
orings = orings.assign(notdamaged=6 - orings["damage"])
fit = smf.glm("damage + notdamaged ~ temp",
              data=orings, family=sm.families.Binomial()).fit()
print(fit.summary())
```
```text
                 coef    std err          z      P>|z|      [0.025      0.975]
------------------------------------------------------------------------------
Intercept     11.6630      3.296      3.538      0.000       5.202      18.124
temp          -0.2162      0.053     -4.066      0.000      -0.320      -0.112
==============================================================================
```

```python
newtemps = pd.DataFrame({"temp": [31, 53, 65]})
print(fit.predict(newtemps).round(4))
```
```text
0    0.9930
1    0.5505
2    0.0838
```

**Interpretation.** The fitted log-odds is $11.66 - 0.2162\,X$. The negative slope means
colder launches carry higher damage odds. At 65 degrees the model puts the probability of
damage to a given O-ring at about $0.08$; at 53 degrees, the coldest flight on record, about
$0.55$; and at the 31-degree launch temperature, about $0.99$. @fig-ch13-orings-fit draws the
fitted curve down into that cold region. The number $0.99$ is an extrapolation well past the
data, so read it with care. But its message is not subtle: the model that fits the 23
flights implies near-certain O-ring distress at 31 degrees.
:::

```{figure} figures/fig_ch13_orings_fit.png
:name: fig-ch13-orings-fit
:alt: The O-ring damage fraction plotted against temperature with a fitted logistic curve overlaid in blue. The curve is high, near 1, at cold temperatures on the left, falls through about 0.55 at 53 degrees, and flattens toward 0 at warm temperatures on the right. A red point at 31 degrees sits near a probability of 0.99, inside a shaded band colder than any observed flight, labeled 31 F: p equals 0.99.
The fitted logistic curve extended to the launch temperature. At 31 degrees (red point, shaded extrapolation region) the model predicts about a 0.99 probability of damage to any given O-ring.
```

::::{admonition} Try it 13.1
:class: important
A classmate says "the model predicts the O-rings will be damaged 99 percent of the time at 31
degrees, so we should have expected exactly $0.99 \times 6 \approx 6$ damaged rings." Two
things are slightly off in that sentence. Fix them.

:::{admonition} Solution
:class: dropdown
First, $0.99$ is the model's probability that a *single* O-ring is damaged, so the expected
count out of six is $6 \times 0.99 \approx 5.9$, which rounds to 6, but the phrase "99 percent
of the time" belongs to one ring, not the flight. Second, and more important, $0.99$ is an
extrapolation to a temperature 22 degrees below any flight in the data, so it carries far more
uncertainty than the tidy number suggests. The honest reading is "the model implies very high
damage probability at 31 degrees, outside the range where we can check it," not "exactly 0.99."
:::
::::

(ch13-mle)=
## 13.2 Fitting by maximum likelihood

### Intuition

In simple regression we had formulas: $b_1 = S_{xy}/S_{xx}$ and $b_0 = \bar Y - b_1 \bar X$.
Logistic regression has no such closed form. The reason is the S-curve: the probability
$\pi_i$ is a nonlinear function of the coefficients, so setting derivatives to zero gives
equations you cannot solve with algebra. Instead we choose the coefficients that make the
observed data most probable, the principle of **maximum likelihood** we first met for the
normal model in Chapter 2, and we find them by climbing the likelihood hill numerically.

### The likelihood and log-likelihood

Let case $i$ have $m_i$ trials and $Y_i$ successes (for a plain binary response $m_i = 1$ and
$Y_i \in \{0, 1\}$; for the O-rings $m_i = 6$). Given the probabilities $\pi_i$, the successes
are independent binomial counts, so the **likelihood**, the probability of the observed data
as a function of the coefficients, is

$$
L(\beta) = \prod_{i=1}^{n} \binom{m_i}{Y_i}\, \pi_i^{\,Y_i}\,(1 - \pi_i)^{\,m_i - Y_i} ,
$$

where each $\pi_i = 1/(1 + e^{-\eta_i})$ depends on $\beta$ through the linear predictor
$\eta_i = X_i'\beta$. In words: the likelihood multiplies together, across all cases, the
binomial chance of seeing exactly the successes we observed, so larger values point to
coefficients the data favor. Taking logs turns the product into a sum, the **log-likelihood**:

$$
\ell(\beta) = \sum_{i=1}^{n}\Big[\, Y_i \log \pi_i + (m_i - Y_i)\log(1 - \pi_i) \,\Big] + C ,
$$

where $C$ collects the binomial coefficients $\log\binom{m_i}{Y_i}$, which do not involve
$\beta$ and so do not affect where the maximum sits. In words: the log-likelihood rewards
coefficients that put high probability on the successes we saw and high non-probability on
the failures we saw.

### The score equations

:::{admonition} Theorem 13.4: Score equations for logistic regression
:class: important theorem
Under the logistic regression model, the maximum-likelihood estimate $\hat\beta$ satisfies the
**score equations**
$$
\mathbf{X}'(\mathbf{Y} - \boldsymbol{\mu}) = \mathbf{0}, \qquad \mu_i = m_i \pi_i ,
$$
equivalently $\sum_{i=1}^n (Y_i - m_i \pi_i) X_{ij} = 0$ for each coefficient
$j = 0, 1, \dots, p-1$. Because $\boldsymbol{\mu}$ bends through the logistic link, these
equations are nonlinear in $\beta$ and have no closed-form solution.
:::

**Proof.** We want the $\beta$ that maximizes $\ell$, so we
differentiate and set the result to zero. Two facts about the logistic link make the algebra
collapse. First, from $\pi_i = e^{\eta_i}/(1 + e^{\eta_i})$,

$$
\log \pi_i = \eta_i - \log(1 + e^{\eta_i}), \qquad \log(1 - \pi_i) = -\log(1 + e^{\eta_i}).
$$

Substituting these into $\ell$ and collecting terms,

$$
\ell(\beta) = \sum_{i=1}^n \Big[\, Y_i \eta_i - m_i \log(1 + e^{\eta_i}) \,\Big] + C .
$$

Second, differentiate $\log(1 + e^{\eta_i})$ with respect to $\eta_i$ to get exactly $\pi_i$.
Using the chain rule with $\partial \eta_i / \partial \beta_j = X_{ij}$ (the $j$-th predictor
value for case $i$, with $X_{i0} = 1$ for the intercept),

$$
\frac{\partial \ell}{\partial \beta_j}
= \sum_{i=1}^n \big(Y_i - m_i \pi_i\big) X_{ij}, \qquad j = 0, 1, \dots, p-1 .
$$

Setting all $p$ partial derivatives to zero gives the **score equations**. Stacking them with
the design matrix $\mathbf{X}$ (rows $X_i'$), the fitted mean vector $\boldsymbol{\mu}$ with
entries $\mu_i = m_i \pi_i$, and the response vector $\mathbf{Y}$,

$$
\mathbf{X}'(\mathbf{Y} - \boldsymbol{\mu}) = \mathbf{0} .
$$

In words: at the maximum-likelihood estimate, each predictor is orthogonal to the residuals
$Y_i - \mu_i$, exactly the condition the least-squares normal equations
$\mathbf{X}'(\mathbf{Y} - \mathbf{X}\mathbf{b}) = \mathbf{0}$ imposed in @ch07-ls-matrix. The
difference is that $\boldsymbol{\mu}$ here bends through the logistic link, so the equations
are nonlinear in $\beta$ and cannot be solved in closed form. $\blacksquare$

### Newton-Raphson and IRLS

:::{admonition} Theorem 13.5: Iteratively reweighted least squares
:class: important theorem
The Newton-Raphson step for the logistic score equations is a weighted least squares fit,
$$
\beta^{(t+1)} = (\mathbf{X}'\mathbf{W}\mathbf{X})^{-1}\mathbf{X}'\mathbf{W}\mathbf{z} ,
$$
with weight matrix $\mathbf{W} = \operatorname{diag}(m_i \pi_i(1 - \pi_i))$ and working
response $z_i = \eta_i + (Y_i - \mu_i)/w_i$, both evaluated at $\beta^{(t)}$. Because
$\mathbf{W}$ and $\mathbf{z}$ change each pass, the fit is repeated to convergence; this is
**iteratively reweighted least squares (IRLS)**.
:::

**Proof.** To solve
$\mathbf{X}'(\mathbf{Y} - \boldsymbol{\mu}) = \mathbf{0}$ we use Newton's method, which needs
the matrix of second derivatives. Differentiating the score once more, and using
$\partial \pi_i / \partial \eta_i = \pi_i(1 - \pi_i)$,

$$
\frac{\partial^2 \ell}{\partial \beta_j \partial \beta_k}
= -\sum_{i=1}^n m_i \pi_i (1 - \pi_i)\, X_{ij} X_{ik} ,
$$

so the Hessian is $-\mathbf{X}'\mathbf{W}\mathbf{X}$ with the diagonal weight matrix
$\mathbf{W} = \operatorname{diag}\!\big(m_i \pi_i (1 - \pi_i)\big)$. Each weight $w_i = m_i
\pi_i(1 - \pi_i)$ is the variance of $Y_i$, largest for cases near $\pi_i = 0.5$ and small
for cases the model is already sure about. A Newton step from a current guess $\beta^{(t)}$ is

$$
\beta^{(t+1)} = \beta^{(t)} + (\mathbf{X}'\mathbf{W}\mathbf{X})^{-1}\mathbf{X}'(\mathbf{Y} - \boldsymbol{\mu}) ,
$$

with $\mathbf{W}$, $\boldsymbol{\mu}$ evaluated at $\beta^{(t)}$. Now the tidy part. Define the
**working response** $z_i = \eta_i + (Y_i - \mu_i)/w_i$. Then

$$
\mathbf{X}'\mathbf{W}\mathbf{z}
= \mathbf{X}'\mathbf{W}\boldsymbol{\eta} + \mathbf{X}'(\mathbf{Y} - \boldsymbol{\mu})
= \mathbf{X}'\mathbf{W}\mathbf{X}\beta^{(t)} + \mathbf{X}'(\mathbf{Y} - \boldsymbol{\mu}) ,
$$

using $\boldsymbol{\eta} = \mathbf{X}\beta^{(t)}$. Multiplying the Newton step by
$\mathbf{X}'\mathbf{W}\mathbf{X}$ shows it is equivalent to

$$
\beta^{(t+1)} = (\mathbf{X}'\mathbf{W}\mathbf{X})^{-1}\mathbf{X}'\mathbf{W}\mathbf{z} .
$$

That is the formula for a **weighted least squares** fit of the working response $\mathbf{z}$
on $\mathbf{X}$ with weights $w_i$ (@ch10-wls). Because $\mathbf{W}$ and $\mathbf{z}$ change
each time $\beta$ updates, we recompute and refit, which is why the method is called
**iteratively reweighted least squares (IRLS)**. Starting from any reasonable guess, the
iterates climb the concave log-likelihood to its single maximum. $\blacksquare$

### R and Python

The centerpiece is worth doing by hand once, so IRLS stops being a black box inside `glm`.

:::{admonition} Example 13.2: IRLS by hand on the O-ring data
:class: note
**Question.** Starting from coefficients of zero, do the IRLS updates converge to the
`glm` estimates $b_0 = 11.663$ and $b_1 = -0.2162$?

**Intuition.** Each step forms the weights $w_i = m_i \pi_i(1 - \pi_i)$ and working response
$z_i$ at the current coefficients, then solves one weighted least squares problem for the
next coefficients. Repeat until the numbers stop moving.

**Formula.** $\beta^{(t+1)} = (\mathbf{X}'\mathbf{W}\mathbf{X})^{-1}\mathbf{X}'\mathbf{W}
\mathbf{z}$, with $w_i = m_i \pi_i(1 - \pi_i)$ and $z_i = \eta_i + (Y_i - m_i\pi_i)/w_i$.

**Computation.**

```r
X <- cbind(1, orings$temp)     # design matrix, intercept then temp
y <- orings$damage             # damaged O-rings (successes) out of m = 6
m <- 6
beta <- c(0, 0)                # start at all-zero coefficients
for (it in 1:6) {
  eta <- as.vector(X %*% beta)
  pi  <- 1 / (1 + exp(-eta))
  w   <- m * pi * (1 - pi)             # IRLS weights
  z   <- eta + (y - m * pi) / w        # working response
  beta <- solve(t(X) %*% (w * X), t(X) %*% (w * z))
  beta <- as.vector(beta)
  cat(sprintf("iter %d:  b0 = %9.5f   b1 = %9.5f\n", it, beta[1], beta[2]))
}
```
```text
iter 1:  b0 =   2.85714   b1 =  -0.06524
iter 2:  b0 =   6.96681   b1 =  -0.13563
iter 3:  b0 =  10.11986   b1 =  -0.18936
iter 4:  b0 =  11.45043   b1 =  -0.21250
iter 5:  b0 =  11.65831   b1 =  -0.21615
iter 6:  b0 =  11.66299   b1 =  -0.21623
```

```python
X = np.column_stack([np.ones(len(orings)), orings["temp"].to_numpy()])
y = orings["damage"].to_numpy().astype(float)   # successes out of m = 6
m = 6.0
beta = np.array([0.0, 0.0])                      # start at all-zero coefficients
for it in range(1, 7):
    eta = X @ beta
    pi = 1 / (1 + np.exp(-eta))
    w = m * pi * (1 - pi)                         # IRLS weights
    z = eta + (y - m * pi) / w                    # working response
    beta = np.linalg.solve(X.T @ (w[:, None] * X), X.T @ (w * z))
    print(f"iter {it}:  b0 = {beta[0]:9.5f}   b1 = {beta[1]:9.5f}")
```
```text
iter 1:  b0 =   2.85714   b1 =  -0.06524
iter 2:  b0 =   6.96681   b1 =  -0.13563
iter 3:  b0 =  10.11986   b1 =  -0.18936
iter 4:  b0 =  11.45043   b1 =  -0.21250
iter 5:  b0 =  11.65831   b1 =  -0.21615
iter 6:  b0 =  11.66299   b1 =  -0.21623
```

**Interpretation.** By the sixth pass both coefficients match `glm` to five decimals, and
`glm` itself reported "6 Fisher Scoring iterations," the same count. @fig-ch13-irls shows the
deviance falling to its floor and the slope settling onto its final value within a handful of
steps. The hand code is doing exactly what the built-in function does: repeated weighted least
squares.
:::

```{figure} figures/fig_ch13_irls.png
:name: fig-ch13-irls
:alt: Two panels tracking IRLS iterations 0 through 6 on the O-ring fit. The left panel shows the binomial deviance dropping steeply from about 153 at iteration 0 to about 17 and flattening by iteration 4. The right panel shows the temperature coefficient rising from 0 and settling at about minus 0.216 by iteration 5, marked as the maximum-likelihood slope.
IRLS converges fast. The deviance (left) collapses to its minimum and the temperature coefficient (right) reaches its maximum-likelihood value within about five steps, because the log-likelihood is concave with a single peak.
```

::::{admonition} Try it 13.2
:class: important
In the score equation $\sum_i (Y_i - m_i \pi_i) X_{ij} = 0$, take $j = 0$ so that $X_{i0} = 1$
for every case. What does the resulting equation say about the fitted probabilities, and how
is it the logistic echo of the least-squares fact $\sum e_i = 0$?

:::{admonition} Solution
:class: dropdown
With $X_{i0} = 1$ the intercept score equation is $\sum_i (Y_i - m_i \hat\pi_i) = 0$, that is
$\sum_i Y_i = \sum_i m_i \hat\pi_i$. The total number of observed successes equals the total
predicted by the model. For a plain binary response ($m_i = 1$) this says the average fitted
probability equals the observed proportion of ones. It is the direct analog of the
least-squares identity $\sum e_i = 0$ from @ch02-least-squares: including an intercept forces the
residuals $Y_i - \hat\mu_i$ to sum to zero.
:::
::::

:::{admonition} Durable skill: when there is no formula, iterate
:class: tip
Least squares handed us a formula, but most models past this course do not have one:
logistic regression, Poisson regression, mixed models, and the objectives inside neural
networks are all fit by starting at a guess and improving it step by step. The pattern you
just coded, linearize the problem, solve the easy version, relinearize, repeat, is the engine
under a huge amount of modern statistics and machine learning. When you meet a new method,
ask what it is optimizing and what one step of improvement looks like; you will understand it
far faster than by memorizing its output.
:::

(ch13-odds-ratio)=
## 13.3 Reading coefficients as odds ratios

### Intuition

A slope in ordinary regression is easy to say out loud: one more unit of $X$ adds $b_1$ to the
predicted response. The logistic slope is not that, and saying it that way is the single most
common mistake in applied logistic regression. The coefficient lives on the log-odds scale, so
before interpreting it we have to undo the log.

Here is the wrong reading first, because you will hear it constantly. For the diabetes model
below, the glucose coefficient is about $0.04$. The tempting sentence is "each extra unit of
glucose raises the probability of a positive test by $0.04$." That is wrong twice over. The
coefficient is not a change in probability at all, and the effect on probability is not even
constant: it depends on where you start on the S-curve, tiny out in the flat tails and largest
in the steep middle. What is constant is the effect on the *odds*. @fig-ch13-prob-vs-odds-step
makes the split visible: one fixed step along the curve gives three different probability jumps
but always the same odds multiplier.

### Formula

Exponentiate the coefficient. Because $\log(\text{odds}) = \beta_0 + \beta_1 X$, raising $X$
by one unit changes the log-odds by $\beta_1$, so it multiplies the odds by $e^{\beta_1}$:

$$
\frac{\text{odds}(X + 1)}{\text{odds}(X)}
= \frac{e^{\beta_0 + \beta_1(X+1)}}{e^{\beta_0 + \beta_1 X}} = e^{\beta_1} .
$$

The quantity $e^{\beta_1}$ is the **odds ratio** (Definition 13.6) for a one-unit increase in
$X$. In words: a one-unit rise in $X$ multiplies the odds of a positive outcome by
$e^{\beta_1}$, whatever the starting odds were. An odds ratio of 1 means no effect; above 1
the odds go up, below 1 they go down. This is the same "logs make it multiplicative" logic as
the log-transformed response in @ch10-log-interpretation, moved onto the odds scale. For a
step of $c$ units the odds ratio is $e^{c\beta_1}$, which is how you report an effect per 10
units or per decade of age.

:::{admonition} Definition 13.6: Odds ratio
:class: note definition
The **odds ratio** for a one-unit increase in a predictor $X_j$ is $e^{\beta_j}$: raising
$X_j$ by one unit multiplies the odds of a positive outcome by $e^{\beta_j}$, whatever the
starting odds. For a step of $c$ units it is $e^{c\beta_j}$. An odds ratio of $1$ means no
effect, above $1$ raises the odds, below $1$ lowers them.
:::

:::{admonition} Key idea
:class: tip keyidea
A logistic coefficient has one honest one-line reading: exponentiate it for an odds ratio, the
constant factor by which the odds multiply per unit of the predictor. The effect on the
probability is not constant; it depends on where you sit on the S-curve, small in the flat
tails and largest in the steep middle. Say "odds", not "chance", and you avoid the most common
error in applied logistic regression.
:::

```{figure} figures/fig_ch13_prob_vs_odds_step.png
:name: fig-ch13-prob-vs-odds-step
:alt: An S-shaped logistic curve of probability against the linear predictor. Three one-unit steps are drawn along it, one in the left flat tail, one through the steep middle, and one in the right flat tail. Each step's vertical probability jump is marked with a red bar and labeled: about 0.07 in the left tail, about 0.24 in the middle, and about 0.03 in the right tail. A text box notes that the same one-unit step always multiplies the odds by e to the first power, about 2.72, even though the probability jump changes.
The same one-unit step multiplies the odds by the same fixed factor everywhere (here about 2.72), yet the jump in probability is large in the steep middle and small in the flat tails. That is why the odds ratio is a single honest number but "the change in probability" is not.
```

### R and Python

:::{admonition} Example 13.3: Odds ratios for temperature and glucose
:class: note
**Question.** By what factor do the odds of O-ring damage change per degree of cooling, and by
what factor do the odds of a positive diabetes test change per 10 units of glucose?

**Intuition.** Exponentiate the fitted coefficients (times the step size) to move from the
log-odds scale to an odds ratio.

**Formula.** Odds ratio for a step of $c$ in $X$ is $e^{c\,b_1}$.

**Computation.**

```r
exp(coef(fit))                        # odds ratio for a 1 F increase
exp(-10 * coef(fit)["temp"])          # odds ratio for a 10 F drop
```
```text
 (Intercept)         temp
1.161909e+05 8.055471e-01
    temp
8.691423
```

```python
print(np.exp(fit.params).round(4))               # odds ratio for a 1 F increase
print(np.exp(-10 * fit.params["temp"]).round(4)) # odds ratio for a 10 F drop
```
```text
Intercept    116190.8870
temp              0.8055
dtype: float64
8.6914
```

Now the diabetes screening data. The `pima` file records 768 women, with `test` equal to 1
for a positive diabetes test. First read it and look for trouble, then fit glucose alone.

```r
pima <- read.csv("data/pima.csv")
c(n = nrow(pima), positives = sum(pima$test), rate = mean(pima$test))
sapply(pima[c("glucose", "diastolic", "triceps", "insulin", "bmi")],
       function(v) sum(v == 0))
```
```text
          n   positives        rate
768.0000000 268.0000000   0.3489583
  glucose diastolic   triceps   insulin       bmi
        5        35       227       374        11
```

Those zeros are impossible for a living person and are disguised missing values; we return to
them in @ch13-fit. For now set the two we will use to `NA` and fit.

```r
pima$glucose[pima$glucose == 0] <- NA
pima$bmi[pima$bmi == 0] <- NA
gfit <- glm(test ~ glucose, family = binomial, data = pima)
summary(gfit)$coefficients
```
```text
               Estimate  Std. Error   z value     Pr(>|z|)
(Intercept) -5.71508764 0.438100187 -13.04516 6.771345e-39
glucose      0.04063362 0.003382078  12.01439 2.985479e-33
```

```r
exp(10 * coef(gfit)["glucose"])       # odds ratio for +10 glucose units
round(predict(gfit, newdata = data.frame(glucose = c(100, 140)),
              type = "response"), 4)
```
```text
 glucose
1.501307
     1      2
0.1609 0.4934
```

```python
pima = pd.read_csv("data/pima.csv")
pima.loc[pima["glucose"] == 0, "glucose"] = np.nan
pima.loc[pima["bmi"] == 0, "bmi"] = np.nan
gfit = smf.glm("test ~ glucose", data=pima,
               family=sm.families.Binomial()).fit()
print(gfit.summary().tables[1])
```
```text
==============================================================================
                 coef    std err          z      P>|z|      [0.025      0.975]
------------------------------------------------------------------------------
Intercept     -5.7151      0.438    -13.045      0.000      -6.574      -4.856
glucose        0.0406      0.003     12.014      0.000       0.034       0.047
==============================================================================
```

```python
print(np.exp(10 * gfit.params["glucose"]).round(4))   # odds ratio, +10 glucose
print(gfit.predict(pd.DataFrame({"glucose": [100, 140]})).round(4))
```
```text
1.5013
0    0.1609
1    0.4934
```

**Interpretation.** For the O-rings, $e^{b_1} = 0.806$: each extra degree multiplies the odds
of damage by $0.806$, a roughly 19 percent drop in the odds per degree of warming. Cooling by
10 degrees multiplies the odds by $e^{-10 b_1} = 8.69$, nearly ninefold. For glucose, the odds
of a positive test multiply by $e^{10 b_1} = 1.50$ for every 10 units, a 50 percent rise in
the odds. Notice what the odds ratio is not: the probability itself moves differently
depending on where you start. At glucose 100 the model gives probability $0.16$, and at 140 it
gives $0.49$, a jump of $0.33$; the same 40-unit step lower down the curve would move the
probability far less. The odds ratio is constant; the probability change is not.
:::

@fig-ch13-pima-glucose shows the single-predictor fit. The probability climbs smoothly with
glucose, steeply through the middle of the range and flattening at both ends, the S-curve
doing its job.

```{figure} figures/fig_ch13_pima_glucose.png
:name: fig-ch13-pima-glucose
:alt: A scatterplot of diabetes test result, jittered near 0 and 1, against plasma glucose, with a blue logistic curve rising from about 0.05 at low glucose to about 0.85 at high glucose. Most points near test equals 1 sit at higher glucose, and most points near test equals 0 sit at lower glucose, though the two clouds overlap heavily in the middle.
The single-predictor logistic fit to the Pima data. The probability of a positive test rises with glucose, but the heavy overlap of the two outcome bands warns that glucose alone will not cleanly separate positives from negatives.
```

::::{admonition} Try it 13.3
:class: important
A news article reports "each additional point of glucose is associated with a 4 percent higher
chance of diabetes." Using the fitted glucose coefficient $0.0406$, say what number the writer
took the 4 percent from, and rewrite the sentence so it is correct.

:::{admonition} Solution
:class: dropdown
The writer computed $e^{0.0406} = 1.0414$ and read the $0.0414$ as "4 percent higher chance."
That exponentiated coefficient is the odds ratio, not a change in probability, so "chance"
(which readers hear as probability) is the wrong word. A correct version: "each additional
point of glucose multiplies the *odds* of a positive test by about $1.04$, a 4 percent
increase in the odds." How much the probability itself moves depends on the starting glucose
level.
:::
::::

:::{admonition} Durable skill: interpret on the scale the model actually uses
:class: tip
Every model reports its coefficients on some scale, and the number is only meaningful once you
know which one. Logistic coefficients are log-odds; exponentiate for odds ratios. A
log-transformed response gives percent changes (@ch10-log-interpretation). A standardized
coefficient is in standard-deviation units. Before you say a coefficient out loud, ask "on
what scale does this live, and what does a one-unit step mean there." Getting the scale right
is the difference between an accurate sentence and a confident wrong one, and editors,
clinicians, and juries have all been misled by the confident wrong one.
:::

## 13.4 Testing coefficients: Wald and likelihood-ratio

### Intuition

The first section fit the model; the obvious next question is which predictors are pulling
their weight. There are two standard tests, and they answer the same question by different
routes. The **Wald test** asks how many standard errors a coefficient sits from zero, using
the fitted model alone. The **likelihood-ratio test** asks how much the fit gets worse when
you delete the predictor and refit, comparing two nested models the way the general linear
test compared them for ordinary regression (@ch08-general-linear-test).

### Formula

For the Wald test of $H_0: \beta_j = 0$, the statistic is

$$
z_j = \frac{b_j}{s\{b_j\}}, \qquad z_j \overset{\text{approx}}{\sim} N(0, 1) \text{ under } H_0 ,
$$

In words: the Wald statistic counts how many standard errors the estimate $b_j$ sits from
zero, and under the null that distance follows a standard normal curve. Here $s\{b_j\}$ is the
standard error printed by the fit. You can compare $z_j^2$ to a chi-square with one degree of
freedom instead, which gives the same test. The Wald confidence interval for $\beta_j$ is
$b_j \pm z^* s\{b_j\}$, and exponentiating its endpoints gives a confidence interval for the
odds ratio. These standard errors and the normal reference are large-sample approximations,
exact only as $n \to \infty$. With a small sample or a near-perfect predictor they can mislead.

The likelihood-ratio test uses the **deviance** (Definition 13.7). For a fitted model with
maximized log-likelihood $\ell(\hat\beta)$, the deviance is

$$
D = 2\big[\ell_{\text{sat}} - \ell(\hat\beta)\big]
= 2\sum_{i=1}^n\left[ Y_i \log\frac{Y_i}{\hat\mu_i} + (m_i - Y_i)\log\frac{m_i - Y_i}{m_i - \hat\mu_i}\right] ,
$$

where $\ell_{\text{sat}}$ is the log-likelihood of the **saturated model** that fits every
observation perfectly ($\hat\mu_i = Y_i$), and $\hat\mu_i = m_i \hat\pi_i$ are the fitted
counts.

:::{admonition} Definition 13.7: Deviance
:class: note definition
The **deviance** of a fitted model with maximized log-likelihood $\ell(\hat\beta)$ is
$D = 2[\ell_{\text{sat}} - \ell(\hat\beta)]$, twice the log-likelihood gap to the **saturated
model** that fits every observation exactly ($\hat\mu_i = Y_i$). It measures lack of fit,
smaller being better, and is the logistic stand-in for the residual sum of squares.
:::

In words: the deviance measures how far the fitted model sits from a perfect fit,
smaller being better; it is the logistic stand-in for the residual sum of squares. To compare
a **full** model to a nested **reduced** model that drops $q$ predictors, the
likelihood-ratio statistic is the increase in deviance,

$$
G^2 = D_{\text{reduced}} - D_{\text{full}}
= 2\big[\ell(\hat\beta_{\text{full}}) - \ell(\hat\beta_{\text{reduced}})\big]
\overset{\text{approx}}{\sim} \chi^2_q \text{ under } H_0 ,
$$

with $q$ the number of coefficients set to zero. The special case comparing the full model to
the intercept-only model uses the **null deviance** as $D_{\text{reduced}}$ and tests whether
any predictor matters at all.

### R and Python

:::{admonition} Example 13.4: A multiple logistic model for diabetes
:class: note
**Question.** With glucose, BMI, age, diabetes pedigree, and number of pregnancies in the
model, which predictors matter, and do the Wald and likelihood-ratio tests agree?

**Intuition.** Fit the five-predictor model, read the Wald tests and odds-ratio intervals off
the summary, then run likelihood-ratio tests by deleting one predictor at a time and by
comparing the whole model to the null.

**Formula.** Wald $z_j = b_j/s\{b_j\}$; likelihood-ratio $G^2 = D_{\text{reduced}} -
D_{\text{full}} \sim \chi^2_q$.

**Computation.**

```r
mfit <- glm(test ~ glucose + bmi + age + diabetes + pregnant,
            family = binomial, data = pima)
summary(mfit)
```
```text
Coefficients:
             Estimate Std. Error z value Pr(>|z|)
(Intercept) -9.322789   0.737279 -12.645  < 2e-16 ***
glucose      0.035941   0.003555  10.110  < 2e-16 ***
bmi          0.087529   0.014722   5.945 2.76e-09 ***
age          0.011366   0.009315   1.220 0.222405
diabetes     0.920583   0.300832   3.060 0.002212 **
pregnant     0.115058   0.032341   3.558 0.000374 ***
---
    Null deviance: 974.75  on 751  degrees of freedom
Residual deviance: 703.24  on 746  degrees of freedom
AIC: 715.24
```

```r
round(exp(cbind(OR = coef(mfit), confint.default(mfit))), 4)
```
```text
                OR  2.5 % 97.5 %
(Intercept) 0.0001 0.0000 0.0004
glucose     1.0366 1.0294 1.0438
bmi         1.0915 1.0604 1.1234
age         1.0114 0.9931 1.0301
diabetes    2.5108 1.3923 4.5276
pregnant    1.1219 1.0530 1.1954
```

```r
drop1(mfit, test = "LRT")
```
```text
Single term deletions

Model:
test ~ glucose + bmi + age + diabetes + pregnant
         Df Deviance    AIC     LRT  Pr(>Chi)
<none>        703.24 715.24
glucose   1   833.20 843.20 129.957 < 2.2e-16 ***
bmi       1   742.05 752.05  38.804 4.685e-10 ***
age       1   704.72 714.72   1.476 0.2243419
diabetes  1   712.90 722.90   9.658 0.0018857 **
pregnant  1   716.30 726.30  13.055 0.0003024 ***
```

```r
G2 <- mfit$null.deviance - mfit$deviance
df <- mfit$df.null - mfit$df.residual
c(G2 = G2, df = df, p_value = pchisq(G2, df, lower.tail = FALSE))
```
```text
          G2           df      p_value
2.715053e+02 5.000000e+00 1.329409e-56
```

```python
mfit = smf.glm("test ~ glucose + bmi + age + diabetes + pregnant",
               data=pima, family=sm.families.Binomial()).fit()
print(mfit.summary())
```
```text
                 coef    std err          z      P>|z|      [0.025      0.975]
------------------------------------------------------------------------------
Intercept     -9.3228      0.737    -12.645      0.000     -10.768      -7.878
glucose        0.0359      0.004     10.110      0.000       0.029       0.043
bmi            0.0875      0.015      5.945      0.000       0.059       0.116
age            0.0114      0.009      1.220      0.222      -0.007       0.030
diabetes       0.9206      0.301      3.060      0.002       0.331       1.510
pregnant       0.1151      0.032      3.558      0.000       0.052       0.178
==============================================================================
```

```python
pima_cc = pima.dropna(subset=["glucose", "bmi"])   # same 752 rows mfit used
reduced = smf.glm("test ~ glucose + age + diabetes + pregnant",
                  data=pima_cc, family=sm.families.Binomial()).fit()
G2_bmi = reduced.deviance - mfit.deviance
from scipy import stats
print({"LRT_drop_bmi": round(G2_bmi, 3), "p_value": float(stats.chi2.sf(G2_bmi, 1))})
```
```text
{'LRT_drop_bmi': 38.804, 'p_value': 4.685177726292527e-10}
```

**Interpretation.** Glucose, BMI, the diabetes pedigree score, and number of pregnancies all
test clearly nonzero by both the Wald column and the likelihood-ratio drops; age does not
(Wald $p = 0.22$, likelihood-ratio $p = 0.22$). The two tests agree closely here, as they
usually do. The odds ratios read cleanly: holding the others fixed, each extra BMI point
multiplies the odds of a positive test by about $1.09$, and a one-unit higher diabetes
pedigree score multiplies them by about $2.51$, with a 95 percent interval from $1.39$ to
$4.53$ that clears 1. The whole-model likelihood-ratio test against the null is
$G^2 = 271.5$ on 5 degrees of freedom, overwhelmingly significant: the predictors together
carry real information about the test result.
:::

@fig-ch13-odds-ratios plots the odds ratios and their intervals on a log scale, each rescaled
to an interpretable step. An interval that clears the vertical line at 1 flags a predictor
distinguishable from no effect; age's interval straddles it.

```{figure} figures/fig_ch13_odds_ratios.png
:name: fig-ch13-odds-ratios
:alt: A horizontal forest plot of odds ratios with 95 percent confidence intervals on a logarithmic axis, one row per predictor: glucose per 10 units, BMI per 5 units, diabetes pedigree per 1 unit, pregnant per 1, and age per 10 years. A red dashed vertical line marks an odds ratio of 1. All intervals sit clearly to the right of 1 except age, whose interval crosses the line.
Odds ratios per interpretable step for the Pima model, with Wald 95 percent intervals on a log scale. Every predictor's interval clears the no-effect line at 1 except age, matching its non-significant test.
```

The Wald and likelihood-ratio tests usually agree, but not always. The likelihood-ratio test
is generally the more reliable of the two, because it uses the actual shape of the
log-likelihood rather than a single quadratic approximation at the estimate. In the awkward
case of a very large coefficient (a predictor that nearly separates the two outcomes), the
Wald standard error can inflate and pull its $z$ toward zero, hiding a strong effect. The
likelihood-ratio test does not suffer that failure. When the two disagree, trust the
likelihood-ratio test. @fig-ch13-wald-vs-lrt shows the reason in one picture: the Wald test
replaces the true log-likelihood with a symmetric parabola matched at the peak, and when the
true curve is lopsided the parabola drifts away from it, so the two tests measure different
drops down to the null.

:::{admonition} Key idea
:class: tip keyidea
The Wald test reads the log-likelihood through a single quadratic approximation at the
estimate; the likelihood-ratio test uses its actual shape by refitting. They usually agree,
but when a predictor nearly separates the two outcomes the Wald standard error inflates and
can hide a real effect. When the two disagree, trust the likelihood-ratio test.
:::

```{figure} figures/fig_ch13_wald_vs_lrt.png
:name: fig-ch13-wald-vs-lrt
:alt: A plot of a log-likelihood as a function of a single coefficient beta. The true log-likelihood is a solid blue curve that is skewed, rising steeply on the left and falling gently on the right, with its peak at the estimate near beta equals 2.2. A dashed orange parabola, the Wald approximation, is matched to the blue curve at the peak but is symmetric, so it sits above the blue curve on the left. A red dotted vertical line marks the null at beta equals zero, where the blue curve and the orange parabola reach clearly different heights, showing the two tests disagree.
The Wald test judges a coefficient by a symmetric parabola fitted at the peak of the log-likelihood, while the likelihood-ratio test uses the true curve. When the curve is skewed, the two part company away from the peak and can reach the null at different heights, which is why they can disagree and why the likelihood-ratio test is the one to trust.
```

::::{admonition} Try it 13.4
:class: important
The null deviance is $974.75$ and the residual deviance is $703.24$. Without software, compute
the whole-model likelihood-ratio statistic and its degrees of freedom, and say in one sentence
what the test concludes.

:::{admonition} Solution
:class: dropdown
$G^2 = D_{\text{null}} - D_{\text{model}} = 974.75 - 703.24 = 271.51$, on $5$ degrees of
freedom (the five slopes set to zero under the null). Compared to a $\chi^2_5$ distribution
this is enormous ($\chi^2_5$ has mean 5), so we reject the null that all slopes are zero: the
predictors together explain a large, significant share of the variation in the diabetes test.
:::
::::

(ch13-fit)=
## 13.5 How good is the fit? Classification, ROC, and data checks

### Intuition

A model can have significant coefficients and still classify poorly, so the last step is to
ask how well the fitted probabilities actually separate the two outcomes. We keep this light:
a classification table, an ROC curve, and, first, a look at whether the data deserve trust at
all.

### Data first: the disguised zeros

Recall the impossible zeros from @ch13-odds-ratio. @fig-ch13-pima-zeros counts them.
Serum insulin is zero for 374 of 768 women and skinfold thickness for 227; a living person has
neither. These are missing values recorded as zeros, and a model that swallows them whole will
estimate, for instance, a nonsense insulin slope driven by a spike of fake zeros. This is why
we set glucose and BMI zeros to `NA` before fitting and why we left insulin and triceps out of
the model entirely. The lesson generalizes: look at your predictors before you trust any
coefficient, because the software will fit whatever you feed it.

```{figure} figures/fig_ch13_pima_zeros.png
:name: fig-ch13-pima-zeros
:alt: A bar chart counting impossible zero values in five Pima predictors. Insulin has the tallest bar at 374, triceps skinfold next at 227, diastolic blood pressure 35, BMI 11, and glucose 5. The counts are labeled on top of each bar.
Disguised missing data in the Pima predictors. Insulin and triceps are zero for hundreds of women, which is physiologically impossible, so those zeros are missing values in disguise and must be handled before modeling.
```

### Classification table and ROC

To turn probabilities into yes-or-no predictions, pick a threshold (0.5 is the default) and
predict positive when $\hat\pi_i$ exceeds it. Cross-tabulating predictions against truth gives
a classification table, from which **sensitivity** (the fraction of true positives caught) and
**specificity** (the fraction of true negatives correctly cleared) follow (Definition 13.8).
Because one threshold is an arbitrary choice, the **ROC curve** sweeps every threshold at
once, plotting sensitivity against one-minus-specificity; the **area under the curve (AUC)**
summarizes the whole sweep as the probability that the model scores a random positive above a
random negative (Definition 13.9).

:::{admonition} Definition 13.8: Sensitivity and specificity
:class: note definition
At a chosen probability threshold, **sensitivity** is the fraction of true positives the
classifier flags, $\text{TP}/(\text{TP} + \text{FN})$, and **specificity** is the fraction of
true negatives it clears, $\text{TN}/(\text{TN} + \text{FP})$.
:::

:::{admonition} Definition 13.9: ROC curve and AUC
:class: note definition
The **ROC curve** plots sensitivity against one-minus-specificity across all thresholds. The
**area under the curve (AUC)** summarizes it as the probability that the model gives a random
positive a higher predicted probability than a random negative; $0.5$ is chance and $1$ is
perfect ranking.
:::

:::{admonition} Example 13.5: Classifying the Pima cases
:class: note
**Question.** At the 0.5 threshold, how accurate is the five-predictor model, and what is its
AUC?

**Intuition.** Turn the fitted probabilities into 0/1 predictions at 0.5, tabulate against the
truth for accuracy, sensitivity, and specificity, then compute the AUC across all thresholds.

**Formula.** Sensitivity $= \frac{\text{true positives}}{\text{actual positives}}$, specificity
$= \frac{\text{true negatives}}{\text{actual negatives}}$; AUC $= P(\hat\pi \text{ for a random
positive} > \hat\pi \text{ for a random negative})$.

**Computation.**

```r
phat <- predict(mfit, type = "response")
actual <- mfit$model$test
predicted <- ifelse(phat > 0.5, 1, 0)
table(predicted, actual)
c(accuracy = mean(predicted == actual),
  sensitivity = sum(predicted == 1 & actual == 1) / sum(actual == 1),
  specificity = sum(predicted == 0 & actual == 0) / sum(actual == 0))
```
```text
         actual
predicted   0   1
        0 431 114
        1  57 150
   accuracy sensitivity specificity
  0.7726064   0.5681818   0.8831967
```

```r
pos <- phat[actual == 1]
neg <- phat[actual == 0]
auc <- mean(outer(pos, neg, function(a, b) (a > b) + 0.5 * (a == b)))
round(auc, 4)
```
```text
[1] 0.8433
```

```python
phat = mfit.predict()
actual = mfit.model.endog
predicted = (phat > 0.5).astype(int)
print(pd.crosstab(pd.Series(predicted, name="predicted"),
                  pd.Series(actual.astype(int), name="actual")))
print({"accuracy": round(np.mean(predicted == actual), 4),
       "sensitivity": round(np.sum((predicted == 1) & (actual == 1)) /
                            np.sum(actual == 1), 4),
       "specificity": round(np.sum((predicted == 0) & (actual == 0)) /
                            np.sum(actual == 0), 4)})
```
```text
actual       0    1
predicted
0          431  114
1           57  150
{'accuracy': 0.7726, 'sensitivity': 0.5682, 'specificity': 0.8832}
```

```python
pos = phat[actual == 1]
neg = phat[actual == 0]
auc = np.mean((pos[:, None] > neg[None, :]) + 0.5 * (pos[:, None] == neg[None, :]))
print(round(float(auc), 4))
```
```text
0.8433
```

**Interpretation.** At 0.5 the model is right 77 percent of the time, but that headline hides a
split: it clears 88 percent of the true negatives (specificity) yet catches only 57 percent of
the true positives (sensitivity), missing 114 of 264 women who tested positive. For a screening
tool that trade-off may be wrong, and lowering the threshold would catch more positives at the
cost of more false alarms. The AUC of $0.84$ says that a random positive case gets a higher
predicted probability than a random negative one about 84 percent of the time, decent
separation but far from perfect. @fig-ch13-roc traces the full threshold sweep.
:::

```{figure} figures/fig_ch13_roc.png
:name: fig-ch13-roc
:alt: An ROC curve for the Pima model, plotting true-positive rate against false-positive rate. The blue curve bows well above the diagonal dotted chance line, reaching toward the top-left corner, with an area under the curve labeled 0.843. A red point marks the operating point at the 0.5 threshold, at a false-positive rate near 0.12 and a true-positive rate near 0.57.
The ROC curve sweeps every classification threshold. The curve bows above the diagonal (chance), with AUC 0.84; the red point is the default 0.5 threshold, showing its high specificity but modest sensitivity.
```

::::{admonition} Try it 13.5
:class: important
These accuracy, sensitivity, and AUC numbers were computed on the same 752 women used to fit
the model. Why are they likely optimistic, and what from Chapter 12 would give an honest
estimate?

:::{admonition} Solution
:class: dropdown
The model was tuned to these exact cases, so it fits their quirks as well as their signal, and
in-sample accuracy and AUC therefore overstate how it will do on new patients. An honest
estimate holds out data the model never saw: a train/test split or, better, $k$-fold
cross-validation (@ch12-cross-validation), fitting on one part and measuring accuracy and AUC
on the untouched part. The gap between in-sample and out-of-sample performance is the
optimism, and it grows with the number of predictors.
:::
::::

:::{admonition} Durable skill: never trust one accuracy number
:class: tip
A single accuracy figure hides almost everything that matters. If 90 percent of cases are
negative, a model that predicts "negative" for everyone scores 90 percent while catching zero
positives. Always look at sensitivity and specificity separately, consider the cost of each
kind of error for the decision at hand, and judge the model across thresholds with an ROC
curve rather than at one arbitrary cutoff. Whenever someone shows you a classifier's accuracy,
ask "accuracy at what threshold, and what does it miss," before you believe it.
:::

## 13.6 Chapter summary

This chapter built a regression model for a binary or binomial response. Ordinary least
squares fails for a yes-or-no outcome in three ways (unbounded fits, non-constant variance,
non-normal errors), and logistic regression fixes all three by making the log-odds linear.
Because the S-curve makes the likelihood equations nonlinear, there is no closed-form estimate:
maximum likelihood finds the coefficients, and IRLS computes them by repeated weighted least
squares. Each coefficient reads as an odds ratio, tested by the Wald and likelihood-ratio
tests, and the fitted probabilities are judged by deviance, a classification table, and an ROC
curve, after the data are checked for disguised missing values.

**Key results at a glance**

| Result | Statement or formula | Valid when |
|---|---|---|
| Odds (Def 13.1) | $\text{odds} = \pi/(1-\pi)$ | any probability $\pi \in (0,1)$ |
| Logit (Def 13.2) | $\operatorname{logit}(\pi) = \log[\pi/(1-\pi)]$ | $0 < \pi < 1$ |
| Logistic model (Def 13.3) | $\operatorname{logit}(\pi_i) = \eta_i$, $\pi_i = 1/(1 + e^{-\eta_i})$ | binary or binomial response, independent cases |
| Score equations (Thm 13.4) | $\mathbf{X}'(\mathbf{Y} - \boldsymbol{\mu}) = \mathbf{0}$, $\mu_i = m_i \pi_i$ | at the maximum-likelihood estimate |
| IRLS (Thm 13.5) | $\beta^{(t+1)} = (\mathbf{X}'\mathbf{W}\mathbf{X})^{-1}\mathbf{X}'\mathbf{W}\mathbf{z}$ | each Newton step; log-likelihood is concave |
| Odds ratio (Def 13.6) | $e^{\beta_j}$ (or $e^{c\beta_j}$ per $c$ units) | log-odds linear in $X_j$ |
| Deviance (Def 13.7) | $D = 2[\ell_{\text{sat}} - \ell(\hat\beta)]$ | fitted model vs saturated model |
| Wald statistic | $z_j = b_j / s\{b_j\} \sim N(0,1)$ | large sample |
| Likelihood-ratio | $G^2 = D_{\text{red}} - D_{\text{full}} \sim \chi^2_q$ | nested models, large sample |
| Sensitivity, specificity (Def 13.8) | $\text{TP}/(\text{TP}+\text{FN})$, $\text{TN}/(\text{TN}+\text{FP})$ | a chosen threshold |
| AUC (Def 13.9) | $P(\hat\pi_{\text{pos}} > \hat\pi_{\text{neg}})$ | ranking quality, all thresholds |

**Key terms**

**logistic regression**, **odds**, **log-odds (logit)**, **linear predictor**,
**link function**, **maximum likelihood**, **likelihood**, **log-likelihood**,
**score equations**, **iteratively reweighted least squares (IRLS)**, **working response**,
**odds ratio**, **Wald test**, **likelihood-ratio test**, **deviance**, **saturated model**,
**classification table**, **sensitivity**, **specificity**, **ROC curve**,
**area under the curve (AUC)**.

**You should now be able to**

- [ ] Explain why ordinary least squares is the wrong model for a binary response, naming its three failures.
- [ ] State the logistic regression model and move among probability, odds, and log-odds.
- [ ] Derive the score equations (Theorem 13.4) and describe how IRLS (Theorem 13.5) solves them.
- [ ] Interpret a logistic coefficient as an odds ratio and correct the common misreadings.
- [ ] Test coefficients with the Wald and likelihood-ratio tests, and explain when they disagree.
- [ ] Compute the deviance and use it to compare nested models.
- [ ] Evaluate a fitted model with a classification table and an ROC curve, after diagnosing data problems.

**Where this fits.** In the workflow of @ch02-workflow this chapter is mostly FIT and USE for a
new kind of response: we ASK a yes-or-no question, EXPLORE with the same plots (now of
proportions), FIT by maximum likelihood instead of least squares, CHECK with deviance and the
disguised-zero audit, and USE the fitted probabilities to interpret odds ratios and to
classify. The machinery carries the earlier chapters with it: the score equations echo the
normal equations of @ch07-ls-matrix, IRLS is weighted least squares (@ch10-wls) run in a loop,
the likelihood-ratio test is the general linear test (@ch08-general-linear-test) in
deviance form, categorical predictors enter through the dummy coding of @ch11-dummy-coding, and
honest evaluation needs the validation mindset of @ch12-cross-validation. Chapter 14 takes the
last step, keeping the maximum-likelihood and deviance machinery but swapping the binomial
family for the Poisson to model counts, and names the generalized linear model family that
holds linear, logistic, and Poisson regression together (@ch14-glm).

## 13.7 Frequently asked questions

**Q1. Why maximum likelihood instead of least squares here?** Least squares minimizes squared
error, which is the right criterion when the response is continuous with constant-variance
normal noise. A binary response has neither, so squared error is no longer the natural loss.
Maximum likelihood asks which coefficients make the observed 0/1 pattern most probable under
the logistic model, which is the principled choice for this response, and for the normal model
it happens to reproduce least squares anyway (Chapter 2).

**Q2. Is an odds ratio the same as a relative risk?** No, and confusing them is a common error.
Relative risk is a ratio of probabilities; the odds ratio is a ratio of odds. When the outcome
is rare (small $\pi$) the two are close, because odds $\approx$ probability there, but for a
common outcome they diverge, and the odds ratio is always the more extreme number. Report an
odds ratio as an odds ratio.

**Q3. What does a negative coefficient mean?** It means the predictor lowers the log-odds, so
its odds ratio $e^{\beta_j}$ is below 1 and the probability of a positive outcome falls as the
predictor rises. The O-ring temperature coefficient is negative: warmer launches have lower
damage odds.

**Q4. Why is the deviance the logistic version of the residual sum of squares?** Both measure
how far the fitted model sits from the data. In ordinary regression, twice the negative
log-likelihood gap between your model and a perfect fit is exactly the residual sum of squares
(up to a constant); for logistic regression that same gap is the deviance. Smaller deviance is
a better fit, and differences in deviance between nested models follow a chi-square
distribution, just as differences in the sum of squares gave $F$ statistics before.

**Q5. Can I use $R^2$ for a logistic model?** Not the ordinary one, because there is no
residual sum of squares to divide. Several "pseudo-$R^2$" measures exist (McFadden's,
Cox-Snell, Nagelkerke), each built from log-likelihoods, and software reports them, but they do
not have the clean "fraction of variance explained" meaning of the linear $R^2$. For judging a
logistic model, deviance, the likelihood-ratio test, and the AUC are more informative.

**Q6. My predicted probability at an extreme $X$ is 0.999. Should I believe it?** Treat it the
way you would any extrapolation. If the extreme $X$ is inside the range of your data, the
probability is as trustworthy as the fit. If it is outside, as with the O-rings at 31 degrees,
the S-curve is being asked to keep bending where you have no evidence about its shape, and the
tidy number hides real uncertainty. Report it, but say plainly that it is an extrapolation.

**Q7. Why did `glm` drop 16 observations from the diabetes model?** Because we set the impossible
zeros in glucose (5 of them) and BMI (11) to `NA`, and `glm` uses only complete cases by
default. Those 16 women are missing a predictor the model needs. Dropping them is defensible
here, but for a serious analysis you would consider whether the missingness is related to the
outcome, which can bias the fit, and possibly impute rather than delete.

## 13.8 Practice problems

:::{note}
Unless a problem says otherwise, use `orings.csv` with the fitted model
$\operatorname{logit}(\hat\pi) = 11.663 - 0.2162\,\text{temp}$, or the `pima.csv` five-predictor
model from Example 13.4 (deviance $703.24$, null deviance $974.75$, $n = 752$ after cleaning).
Problems are marked (A) concepts, (B) theory, or (C) data analysis. Odd-numbered answers appear
in Appendix H; full solutions are in the instructor materials.
:::

1. (A) In one sentence each, name the three ways ordinary least squares fails for a binary response.
2. (A) Convert these probabilities to odds: $0.2$, $0.5$, $0.8$. Then convert these odds to probabilities: $0.25$, $1$, $4$.
3. (A) The O-ring temperature coefficient is $-0.2162$. State its odds ratio for a one-degree increase and say in words what that number means.
4. (A) Explain the difference between the error $Y_i - \pi_i$ that logistic regression works with and the fitted probability $\hat\pi_i$. Which is observed?
5. (A) A student writes "the glucose odds ratio is $1.04$, so a positive test is 4 percent more likely per unit." Identify the misconception and correct it.
6. (A) Why does logistic regression have no closed-form formula for its coefficients, unlike simple linear regression?
7. (A) The AUC of a model is $0.5$. What does that say about the model's ability to rank cases?
8. (A) Give the sensitivity and specificity from the Pima classification table in Example 13.5, and say which kind of error a diabetes screening test should most want to avoid.
9. (A) The diabetes-pedigree odds ratio is $2.51$ with 95 percent interval $(1.39, 4.53)$. Is its effect distinguishable from no effect? How can you tell from the interval?
10. (A) Explain why the age coefficient can be non-significant in the multiple model even though older women are, marginally, more likely to test positive.
11. (B) Starting from $\ell(\beta) = \sum_i [Y_i \log \pi_i + (m_i - Y_i)\log(1 - \pi_i)]$ and $\pi_i = 1/(1 + e^{-\eta_i})$, show that $\ell = \sum_i [Y_i \eta_i - m_i \log(1 + e^{\eta_i})] + C$.
12. (B) Differentiate the log-likelihood in Problem 11 to derive the score equations $\sum_i (Y_i - m_i \pi_i) X_{ij} = 0$ (Theorem 13.4), stating where you use $\partial \pi_i / \partial \eta_i = \pi_i(1 - \pi_i)$.
13. (B) Show that the second derivative of the log-likelihood is $-\sum_i m_i \pi_i(1 - \pi_i) X_{ij} X_{ik}$, and conclude that the Hessian is $-\mathbf{X}'\mathbf{W}\mathbf{X}$ with $\mathbf{W} = \operatorname{diag}(m_i \pi_i(1 - \pi_i))$. Explain why this makes $\ell$ concave.
14. (B) Derive the IRLS update $\beta^{(t+1)} = (\mathbf{X}'\mathbf{W}\mathbf{X})^{-1}\mathbf{X}'\mathbf{W}\mathbf{z}$ (Theorem 13.5) from the Newton step, identifying the working response $z_i$.
15. (B) Using the intercept score equation, prove that a logistic model with an intercept has $\sum_i Y_i = \sum_i m_i \hat\pi_i$. Interpret this for a plain binary response.
16. (B) Derive the odds ratio $e^{c\beta_1}$ for a $c$-unit increase in a predictor, starting from $\operatorname{logit}(\pi) = \beta_0 + \beta_1 X$.
17. (B) Show that for a rare outcome (small $\pi$) the odds ratio and the relative risk are approximately equal, by expanding both for small probabilities.
18. (B) Write the deviance for a binary ($m_i = 1$) logistic model and explain why each term is zero exactly when $\hat\pi_i$ equals the observed $Y_i$, so the saturated model has deviance 0.
19. (B) Explain, in terms of the shape of the log-likelihood, why the likelihood-ratio test can disagree with the Wald test when a coefficient is very large, and which test to trust.
20. (B) The logistic function is $\pi(\eta) = 1/(1 + e^{-\eta})$. Show that $\pi'(\eta) = \pi(\eta)(1 - \pi(\eta))$, and explain why this makes the probability change per unit of $\eta$ largest at $\eta = 0$.
21. (C) Fit the O-ring model in R or Python and reproduce $b_0 = 11.663$ and $b_1 = -0.2162$. Predict the damage probability at 50 and 75 degrees and interpret both.
22. (C) Refit the O-ring model treating each flight as a single binary "any damage" outcome (`damage > 0`) instead of the count of six. Compare the temperature coefficient to the grouped fit and comment on what changed.
23. (C) On the Pima data, fit `test ~ glucose` and `test ~ glucose + bmi`. Report the glucose odds ratio in each and explain why it changes when BMI is added.
24. (C) Reproduce the five-predictor Pima classification table at the 0.5 threshold, then recompute sensitivity and specificity at thresholds 0.3 and 0.7. Describe the trade-off as the threshold moves.
25. (C) Bin `age` into a factor with levels "under 30", "30 to 45", and "over 45", add it to `test ~ glucose + bmi` as a categorical predictor (as in @ch11-dummy-coding), and interpret the odds ratios of its levels relative to the reference.
26. (C) Compute the whole-model likelihood-ratio statistic for `test ~ glucose + bmi + age + diabetes + pregnant` from its null and residual deviances, and confirm your number against `drop1` or a manual null-model comparison.
27. (C) Carry out a rough validation: split the Pima data 70/30 (seed 4210), fit the five-predictor model on the training part, and compute the AUC on the held-out part. Compare it to the in-sample AUC of $0.84$ and explain any gap using @ch12-cross-validation.
28. (C) Draw the fitted probability curve for `test ~ glucose` and add the observed positive rate within glucose deciles as points. Does the curve track the binned rates? What would a poor fit look like here?

## 13.9 Exam practice

These five questions are written in the style of the course exams. Every one asks you to
explain your reasoning in full sentences, not to report a bare number: on the real exam a
correct number with no supporting words earns little credit, and clear reasoning with a small
arithmetic slip earns most of it. Where a question shows software output, it was produced on
the course machine (R 4.6.0) from the same CSV files in `data/` that you used all term; Python
with `statsmodels` gives the same numbers. Work each one before opening its model answer.

**EP 13.1 (interpret output in context).** A clinic fits a logistic model for a positive
diabetes test on the cleaned `pima` data (impossible zeros in `glucose` and `bmi` set to `NA`
and dropped), using plasma glucose, body mass index, and number of pregnancies.

```r
pima <- read.csv("data/pima.csv")
pima$glucose[pima$glucose == 0] <- NA
pima$bmi[pima$bmi == 0] <- NA
fit <- glm(test ~ glucose + bmi + pregnant, family = binomial, data = pima)
summary(fit)
```
```text
Coefficients:
             Estimate Std. Error z value Pr(>|z|)
(Intercept) -8.780034   0.684606 -12.825  < 2e-16 ***
glucose      0.037079   0.003459  10.720  < 2e-16 ***
bmi          0.089899   0.014598   6.158 7.35e-10 ***
pregnant     0.131273   0.027299   4.809 1.52e-06 ***
---
    Null deviance: 974.75  on 751  degrees of freedom
Residual deviance: 714.58  on 748  degrees of freedom
```

Interpret the `pregnant` coefficient as an odds ratio in words a clinician could use. Then, for
a woman with `glucose = 150`, `bmi = 30`, and `pregnant = 4`, the reported linear predictor is
$\hat\eta = 0.004$; compute her estimated probability of a positive test, show the arithmetic,
and say in one sentence why that probability is not four times the odds-ratio story.

:::{admonition} Model answer
:class: dropdown
The `pregnant` coefficient is $0.1313$ on the log-odds scale, so its odds ratio is
$e^{0.1313} = 1.14$. In words a clinician could use: holding plasma glucose and body mass index
fixed, each additional pregnancy multiplies the odds of a positive diabetes test by about
$1.14$, a roughly 14 percent rise in the odds per birth. The word odds matters, because the
coefficient does not add a fixed amount to the probability. For the specific woman, the model
passes her linear predictor through the logistic function,
$$
\hat\pi = \frac{e^{\hat\eta}}{1 + e^{\hat\eta}} = \frac{e^{0.004}}{1 + e^{0.004}}
= \frac{1.004}{2.004} = 0.50 ,
$$
so her estimated probability of a positive test is about $0.50$, even odds. That single number
comes from all three predictors together through the S-curve, not from multiplying the
pregnancy odds ratio by anything: the odds ratio $1.14$ describes how her odds would change if
she had one more pregnancy with glucose and BMI held fixed, while $0.50$ is where she actually
sits on the curve given all of her values.

A weak answer reports $e^{0.1313} = 1.14$ but calls it a "14 percent higher chance" of a
positive test, confusing the constant odds multiplier with a change in probability.
:::

**EP 13.2 (a student claims something; evaluate it).** Looking at the fit in EP 13.1, a student
writes: "The BMI coefficient is $0.0899$, and its odds ratio is $e^{0.0899} = 1.094$, so a woman
with a BMI of 45 is about 9 percent more likely to test positive than a woman with a BMI of 44."
Evaluate the claim. Say precisely what is right, what is wrong, and give the corrected sentence.

:::{admonition} Model answer
:class: dropdown
The arithmetic is right and one word is wrong, and that word changes the meaning. The number
$e^{0.0899} = 1.094$ is correct, and it is the odds ratio for a one-unit increase in BMI holding
glucose and pregnancies fixed. What is wrong is "9 percent more likely to test positive," because
"likely" is read as probability, and the coefficient acts on the odds, not the probability. The
effect on the probability is not a fixed 9 percent: it depends on where the woman sits on the
S-curve, largest in the steep middle near probability $0.5$ and tiny out in the flat tails, so
going from BMI 44 to 45 moves the probability by different amounts for different women. The
constant quantity is the odds multiplier. A corrected sentence: "raising BMI by one unit, with
glucose and pregnancies held fixed, multiplies the odds of a positive test by about $1.094$, a
9.4 percent increase in the odds, not the probability." How much the probability itself moves
depends on her other values.

A weak answer just says "the student is wrong because it is an odds ratio" without explaining
that the probability change is not even constant, which is the deeper reason the claim misleads.
:::

**EP 13.3 (explain why).** Simple linear regression has closed-form formulas for its
coefficients, $b_1 = S_{xy}/S_{xx}$ and $b_0 = \bar Y - b_1 \bar X$, but logistic regression has
no such formula and is fit by iteratively reweighted least squares instead. Explain why no
closed form exists, what IRLS actually does at each step, and why the procedure is guaranteed to
climb to a single best set of coefficients rather than getting stuck.

:::{admonition} Model answer
:class: dropdown
No closed form exists because the fitted probability $\pi_i = 1/(1 + e^{-\eta_i})$ is a
nonlinear function of the coefficients. When you set the derivatives of the log-likelihood to
zero you get the score equations $\sum_i (Y_i - m_i \pi_i) X_{ij} = 0$, and because each $\pi_i$
bends through the logistic link, these are nonlinear in $\beta$ and cannot be rearranged into an
algebraic solution the way the linear normal equations can. IRLS solves them by repeated
approximation. At each step it holds the current coefficients fixed, forms the weights
$w_i = m_i \pi_i(1 - \pi_i)$ and a working response $z_i = \eta_i + (Y_i - m_i\pi_i)/w_i$, and
then does one ordinary weighted least squares fit of $z$ on the predictors to get updated
coefficients; because the weights and working response change as the coefficients move, it
refits until the numbers stop changing. It is guaranteed to reach a single best answer because
the log-likelihood is concave: its second-derivative matrix is $-\mathbf{X}'\mathbf{W}\mathbf{X}$,
which is negative definite (the weights $w_i$ are all positive), so the surface is a single hill
with one peak and no false summits, and every Newton step climbs toward it.

A weak answer says only "the equations are nonlinear" without connecting the concavity of the
log-likelihood to the guarantee that IRLS finds the one true maximum.
:::

**EP 13.4 (what would change if).** The five-predictor Pima model of Example 13.4 classifies at
the default 0.5 probability cutoff with the table on the left below. A screening clinic proposes
lowering the cutoff to 0.3, which gives the table on the right.

```text
   cutoff 0.5                        cutoff 0.3
          actual 0  actual 1                  actual 0  actual 1
predict 0      431       114        predict 0      348        57
predict 1       57       150        predict 1      140       207
```

Explain what changes when the clinic moves the cutoff from 0.5 to 0.3. Compute the sensitivity
and specificity at each cutoff, describe the trade-off in plain terms, and say whether the move
is a good idea for a screening test and why.

:::{admonition} Model answer
:class: dropdown
Lowering the cutoff makes the model call more women positive, because it now flags anyone whose
estimated probability clears $0.3$ rather than $0.5$. At $0.5$ the sensitivity is
$150/(150 + 114) = 0.57$ and the specificity is $431/(431 + 57) = 0.88$. At $0.3$ the
sensitivity rises to $207/(207 + 57) = 0.78$ and the specificity falls to
$348/(348 + 140) = 0.71$. So the trade-off is clear: the lower cutoff catches many more of the
true positives (missing 57 women instead of 114) at the cost of more false alarms (140 healthy
women flagged instead of 57). For a screening test this move is defensible and probably wise. A
screening test exists to catch disease, so a missed positive (a false negative) is the costly
error, because a woman who has diabetes is told she is fine and misses follow-up care, whereas a
false positive usually just triggers a confirmatory test. Trading some specificity for a large
gain in sensitivity fits the purpose of screening. The right cutoff ultimately depends on the
real costs of the two errors, which is exactly why one should look at the whole ROC curve rather
than any single cutoff.

A weak answer computes the four numbers but does not connect the choice to the purpose of
screening, so it cannot say why catching more true positives is worth the extra false alarms.
:::

**EP 13.5 (interpret output in context).** To ask whether age, diabetes pedigree, and number of
pregnancies add anything beyond glucose and BMI, an analyst runs a likelihood-ratio test on the
cleaned `pima` data and also reports the in-sample AUC of the larger model.

```text
Model 1: test ~ glucose + bmi                     Residual deviance 738.51 on 749 df
Model 2: test ~ glucose + bmi + age + diabetes + pregnant   Residual deviance 703.24 on 746 df
Likelihood-ratio test: deviance drop = 35.27 on 3 df, p-value = 1.1e-07
in-sample AUC (Model 2) = 0.843
```

State the null hypothesis, show where the statistic $35.27$ comes from, give its reference
distribution and conclusion, and then explain why the AUC of $0.843$ is likely optimistic and
what tool from Chapter 12 would give an honest estimate.

:::{admonition} Model answer
:class: dropdown
The null hypothesis is that the three extra coefficients, on age, diabetes pedigree, and number
of pregnancies, are all zero, so those predictors add nothing once glucose and BMI are in the
model. The likelihood-ratio statistic is the drop in residual deviance between the nested models,
$G^2 = D_{\text{reduced}} - D_{\text{full}} = 738.51 - 703.24 = 35.27$, and it is referred to a
chi-square distribution with $3$ degrees of freedom, the number of coefficients set to zero under
the null. Since a $\chi^2_3$ has mean 3 and $35.27$ is far out in its tail ($p = 1.1 \times
10^{-7}$), we reject the null: the three predictors together carry real information beyond glucose
and BMI. (Had a Wald test on one of these coefficients disagreed with this likelihood-ratio
result, the likelihood-ratio test would be the one to trust, because it uses the actual shape of
the log-likelihood rather than a single quadratic approximation.) The AUC of $0.843$ is likely
optimistic because it was computed on the very same women used to fit the model, so the fitted
coefficients are tuned to this sample's quirks as well as its real signal, and the model looks
better here than it would on new patients. An honest estimate holds out data the model never saw:
a train-test split or, better, $k$-fold cross-validation (@ch12-cross-validation), fitting on
part of the data and measuring the AUC on the untouched part. The gap between the in-sample and
out-of-sample AUC is the optimism, and it grows with the number of predictors.

A weak answer subtracts the deviances correctly but forgets that the degrees of freedom equal
the number of dropped predictors, or treats the in-sample AUC as an honest measure of future
performance.
:::

## Chapter game

:::{admonition} Play the Chapter 13 game
:class: tip
[Play the Chapter 13 game on your phone or laptop](../games/ch13.html): 10 quick rounds, no
setup. It drills the chapter's core moves, reading the logistic model and its extrapolated
predictions, ordering the IRLS fitting loop, reading a coefficient as an odds ratio instead of
a change in probability, and judging a fit by classification, deviance, and AUC, with a
one-paragraph reason after every answer.
:::

:::{admonition} Resumen del capítulo (en español)
:class: dropdown
Este capítulo presenta la **regresión logística (logistic regression)**, el modelo para una
respuesta binaria (sí o no). La historia inicial es la decisión de lanzamiento del transbordador
Challenger en 1986: 23 vuelos previos, cada uno con la temperatura de lanzamiento y el número de
juntas tóricas (**O-rings**) dañadas de seis. La respuesta no es continua, así que la regresión
por mínimos cuadrados falla de tres maneras: predice probabilidades fuera de $[0, 1]$, la
varianza $\pi(1 - \pi)$ no es constante, y los errores no pueden ser normales.

La solución modela $\pi$ a través de las **momios (odds)** $\pi/(1 - \pi)$ y el **logaritmo de
los momios (log-odds o logit)**. El modelo logístico dice que
$\operatorname{logit}(\pi) = \beta_0 + \beta_1 X_1 + \dots$, de modo que $\pi = 1/(1 + e^{-\eta})$,
una curva en forma de S que siempre queda entre 0 y 1. Para las juntas tóricas, el ajuste da
$\operatorname{logit}(\hat\pi) = 11.66 - 0.2162\,\text{temp}$; a 31 grados Fahrenheit el modelo
predice una probabilidad de daño cercana a $0.99$, aunque esto es una extrapolación lejos de
los datos.

No hay fórmula cerrada para los coeficientes: se estiman por **máxima verosimilitud**, derivando
las **ecuaciones de puntaje (score equations)** $\mathbf{X}'(\mathbf{Y} - \boldsymbol{\mu}) =
\mathbf{0}$ y resolviéndolas con **mínimos cuadrados reponderados iterativamente (IRLS)**. Cada
coeficiente se interpreta como una **razón de momios (odds ratio)** $e^{\beta_j}$, no como un
cambio en la probabilidad. Los coeficientes se prueban con la **prueba de Wald** y la **prueba
de razón de verosimilitud**, basada en la **devianza (deviance)**. Finalmente evaluamos el
modelo con una tabla de clasificación, la **curva ROC** y su área (AUC $= 0.84$ en Pima), tras
revisar los ceros imposibles que son datos faltantes disfrazados. El Capítulo 14 extiende esta
maquinaria a la regresión de Poisson y al marco de los modelos lineales generalizados.
:::
