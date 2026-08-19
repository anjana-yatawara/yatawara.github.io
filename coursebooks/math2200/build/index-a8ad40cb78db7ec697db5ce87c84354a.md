---
exports:
  - format: pdf
    template: ../_templates/csub-latex
title: "Confidence Intervals"
subtitle: "MATH 2200 — Chapter 7"
kernelspec:
  name: ir
  display_name: R
---

```{code-cell} r
:label: ch07-setup
:tags: [remove-cell]
# Render-ready setup. We use the course R stack: the mosaic teaching package
# (with its ggformula plotting layer) and BSDA. Datasets live in the repo's
# data/processed/ folder; we walk up from the working directory to find that
# shelf, so every read.csv("data/processed/...") call below resolves whether the
# book is built from the repo root or a subfolder.
library(mosaic)
library(BSDA)
library(ggplot2)

repo_root <- getwd()
while (!dir.exists(file.path(repo_root, "data", "processed")) &&
       dirname(repo_root) != repo_root) {
  repo_root <- dirname(repo_root)
}
if (dir.exists(file.path(repo_root, "data", "processed"))) setwd(repo_root)

# Okabe-Ito colorblind-safe palette (CLAUDE.md Part 1). The same eight hues the
# course uses everywhere, in this order:
# 1 blue #0072B2, 2 orange #E69F00, 3 bluish-green #009E73, 4 vermillion #D55E00,
# 5 sky-blue #56B4E9, 6 yellow #F0E442, 7 reddish-purple #CC79A7, 8 black.
okabe_ito <- c("#0072B2", "#E69F00", "#009E73", "#D55E00",
               "#56B4E9", "#F0E442", "#CC79A7", "#000000")
knitr::opts_chunk$set(
  collapse = TRUE,
  comment  = "#>",
  fig.width = 6,
  fig.height = 3.8,
  dpi = 150
)
set.seed(2200)  # every simulation in this chapter is reproducible
```

(ch07-sec-hook)=
## A range, not a guess

Every spring, the *Bakersfield Californian* runs a story about the oil patch:
hiring is up, hiring is down, a rig count moved. Underneath those headlines is a
real number the Bureau of Labor Statistics publishes for the Bakersfield metro
area — **Mining & Logging payroll employment**, which in Kern County is almost
entirely the oilfield workforce. Over the ten years 2015–2024 it averaged about
**8.6 thousand jobs per year** (`kern_energy_employment`, variable
`ces_mining_logging_thsd`).

But "8.6 thousand" is the average of just ten yearly numbers, and those ten
years are themselves a *sample* of the larger process that generates oilfield
employment. If the decade had played out a little differently — a different oil
price here, a different drilling decision there — the average would have landed
somewhere else. So a single number, by itself, hides the question a
decision-maker actually cares about: **how far off could it be?**

A **confidence interval** answers exactly that. Instead of reporting one number,
you report a *range* of plausible values, together with how confident you are
that the range captures the truth. For these ten years, the 95% confidence
interval for the mean annual oilfield payroll runs from about **7.70 to 9.52
thousand jobs** — a number we will compute from scratch, and learn to read
correctly, in this chapter. (All figures here are derived from the real
`kern_energy_employment` dataset; see its
[codebook](../../data/codebooks/kern_energy_employment.md).)

:::{note} The Kern data behind this chapter
`kern_energy_employment` is a 10-row annual panel (2015–2024) built from public
U.S. EIA and BLS series. Our headline variable, `ces_mining_logging_thsd`, is
Bakersfield-MSA oil-sector payroll in **thousands of jobs**. Because crude-oil
production is reported only statewide, the codebook is careful to call the
oil-production column "California (Kern-dominated)," never a measured Kern value
— a transparency rule we keep in our own writing too.
:::

(ch07-sec-objectives)=
## Learning objectives

By the end of this chapter you will be able to:

1. **Interpret a confidence interval correctly** — and recognize the common
   misinterpretations that even textbooks sometimes slip into.
2. **Construct a confidence interval for a mean or a proportion** using the
   CLT-based formula $\text{estimate} \pm (\text{critical value})\times
   \text{SE}$.
3. **Construct a bootstrap confidence interval** by resampling in R, and compare
   it to the formula-based interval.
4. **Explain how the confidence level and the sample size change the width** of
   an interval.
5. **Report an interval estimate with its margin of error in plain language**
   for a decision-maker who has never taken a statistics class.

This chapter builds directly on the **sampling distribution** from Chapter 6:
the pattern of how a sample statistic varies from one sample to the next. A
confidence interval is that idea put to work. Before going on, make sure you are
comfortable with the **standard error** ($SE$) — the spread of a sampling
distribution — which we will lean on in every section.

(ch07-sec-concept-ci)=
## 7.1 What a confidence interval is

### Intuition

In Chapter 6 you learned that a sample statistic — say the sample mean
$\bar{x}$ — bounces around from sample to sample, and that the spread of that
bouncing is the **standard error** ($SE$). The Central Limit Theorem told you
the bouncing is approximately Normal and centered on the true parameter.

Turn that idea around. If $\bar{x}$ usually lands *within about two standard
errors of the truth*, then the truth is usually *within about two standard
errors of $\bar{x}$*. So we can take our one observed estimate and reach out a
couple of standard errors in each direction:

$$
\text{estimate} \;\pm\; (\text{a few})\times SE .
$$

That reach-out interval is a **confidence interval**: a range of plausible
values for the unknown parameter. The "a few" is a **critical value** chosen so
that the interval is wide enough to capture the truth a stated percentage of the
time — the **confidence level**.

### The correct interpretation (read this twice)

A 95% confidence interval does **not** mean "there is a 95% probability the
parameter is in *this* interval." Once you have computed an interval like
$(7.70, 9.52)$, the true mean either is or isn't inside it — there is no
probability left to assign. The 95% describes the **procedure**, across many
hypothetical samples:

> If we repeated the whole study many times and built a 95% interval each time,
> about 95% of those intervals would contain the true parameter.

The confidence is in the *method*, not in any single interval. We unpack this
with a simulation in @ch07-sec-coverage, and we drill the right and wrong phrasings
in Worked Example 4.

### Formula

For a population mean $\mu$, when the population standard deviation is unknown
(the realistic case), the interval is

```{math}
:label: ch07-eq-ci-mean
\bar{x} \;\pm\; t^{\star}_{df}\,\underbrace{\frac{s}{\sqrt{n}}}_{SE},
\qquad df = n-1 .
```

Defining every symbol the first time it appears:

- $\bar{x}$ (**"x-bar"**) — the **sample mean**, our point estimate of $\mu$.
- $\mu$ (**"mu"**) — the unknown **population mean** we are estimating.
- $s$ — the **sample standard deviation** (how spread out the data are).
- $n$ — the **sample size** (number of observations).
- $SE = s/\sqrt{n}$ — the **standard error of the mean**: how much $\bar{x}$
  varies from sample to sample.
- $t^{\star}_{df}$ — the **critical value** from the $t$-distribution with
  $df = n-1$ **degrees of freedom**; the multiplier that makes the interval wide
  enough for the chosen confidence level.
- The two pieces after the $\pm$ together, $t^{\star}_{df}\times SE$, are the
  **margin of error** (**ME**) — the "$\pm$" reach of the interval.

For a population proportion $p$, the parallel formula uses a $z^{\star}$
critical value from the Normal distribution and the proportion's standard error:

```{math}
:label: ch07-eq-ci-prop
\hat{p} \;\pm\; z^{\star}\,\underbrace{\sqrt{\frac{\hat{p}(1-\hat{p})}{n}}}_{SE},
```

where $\hat{p}$ (**"p-hat"**) is the **sample proportion** estimating the
population proportion $p$.

:::{tip} Why $t$ for means but $z$ for proportions?
When we estimate $\mu$ we must also estimate the spread $s$ from the same small
sample, and that extra uncertainty fattens the tails — the $t$-distribution
accounts for it. For a proportion, the spread is determined by $\hat p$ itself
(there is no separate $s$ to estimate), so the Normal-based $z^{\star}$ is the
standard choice. You will meet $t$ in depth in Chapter 10 and proportions in
Chapter 9; here we use both just to *build intervals*.
:::

### In R

In the mosaic/BSDA stack, the one-sample interval comes straight from base R's
`t.test()`, written with the formula `~ variable` (read the `~` as "just this
variable"). The line you want in the printout is **`95 percent confidence
interval`**.

```{code-cell} r
:label: ch07-ci-mean-demo
energy <- read.csv("data/processed/kern_energy_employment.csv")

# 95% CI for the mean annual oilfield (Mining & Logging) payroll, in 1000s jobs.
# t.test also runs a test against a default mu = 0 (the "t = ..., p-value = ..."
# line); we are only ESTIMATING here, so ignore that line and read the
# "95 percent confidence interval" block.
ci_oil <- t.test(~ ces_mining_logging_thsd, data = energy, conf.level = 0.95)
ci_oil
```

The printout is a compact block: a test line (`t = 21.43, df = 9,
p-value = 4.9e-09`), then the `95 percent confidence interval` — here
`7.701093 9.518907` — and finally the `sample estimates` line giving
`mean of x` $= 8.61$. We ignore the test line (its null "the mean is $0$" is not
a question anyone asks about a payroll count) and read the interval.

```{code-cell} r
:label: ch07-ci-mean-pieces
# The test object carries the computed pieces for reuse:
ci_oil$estimate    # x-bar (the sample mean)
ci_oil$stderr      # the standard error, s / sqrt(n)
ci_oil$conf.int    # the 95% interval (lower, upper)
```

The interval is $(7.70,\ 9.52)$ thousand jobs — the number from
@ch07-sec-hook, now derived — with $\bar{x} = 8.61$ and $SE = 0.402$.
**Every digit in this paragraph came from `kern_energy_employment`, not from
hand-waving.**

(ch07-sec-margin)=
## 7.2 The margin of error, the level, and the sample size

### Intuition

The margin of error $ME = t^{\star}\times SE$ has only two moving parts, and
each one is intuitive:

- **Confidence level $\rightarrow$ critical value.** Want to be *more* confident the
  interval catches the truth? You must cast a *wider* net, so $t^{\star}$ (or
  $z^{\star}$) grows. A 99% interval is wider than a 95% interval, which is
  wider than a 90% interval — for the same data.
- **Sample size $\rightarrow$ standard error.** More data makes $\bar{x}$ steadier, so
  $SE = s/\sqrt{n}$ shrinks. Because of the **$\sqrt{n}$**, cutting the margin in
  half takes **four times** the data, not twice.

There is a genuine trade-off here: a wider interval is more likely to be right
but less useful (it says less); a narrower interval is more informative but
riskier. Choosing a confidence level is choosing where to sit on that trade-off.

### Formula

For a mean, the margin of error is

```{math}
:label: ch07-eq-me
ME = t^{\star}_{df}\,\frac{s}{\sqrt{n}} .
```

If you are *planning* a study and want the margin no larger than some target $m$
(using a planning value $\sigma$ for the spread and the Normal $z^{\star}$), solve
@ch07-eq-me for $n$. Set the margin equal to the target and unwind it one step at
a time: from $z^{\star}\sigma/\sqrt{n} = m$, multiply both sides by $\sqrt{n}$ and
divide by $m$ to get $\sqrt{n} = z^{\star}\sigma/m$, then **square both sides**:

```{math}
:label: ch07-eq-n-plan
n \;\ge\; \left(\frac{z^{\star}\,\sigma}{m}\right)^{2}.
```

Always **round $n$ up** to the next whole observation.

### In R

We can show the level effect directly on the Kern data by asking `t.test()` for
three confidence levels and reading off the widths.

```{code-cell} r
:label: ch07-level-widths
levels <- c(0.90, 0.95, 0.99)
# For one confidence level, pull t.test's interval and record its width;
# sapply runs that same recipe for each of the three levels and collects them.
widths <- sapply(levels, function(cl) {
  ci <- t.test(~ ces_mining_logging_thsd, data = energy,
               conf.level = cl)$conf.int
  diff(ci)                       # upper - lower = interval width
})
data.frame(level = levels, width_thousands = round(widths, 3))
```

The widths grow with the level — from about **1.47** (90%) to **2.61**
thousand jobs (99%) on these same ten years. The 90% interval is the narrowest
because it demands the least confidence.

:::{important} Durable skill — Quantitative reasoning
**Reading a margin of error is a numeracy skill you will use far from this
class.** Polls report "47% ± 3 points"; lab results report a measurement "± its
uncertainty"; a budget forecast comes with a range. In every case the **± is the
margin of error**, and it is doing the same job it does here: separating the
signal (the estimate) from the noise (the sampling variability). A reader who
ignores the ± and fixates on the point estimate is, quite literally, reading
only half the result. Practicing the trade-off between *confidence* and *width*
trains you to ask the right follow-up question of any number a workplace hands
you: *how sure are we, and how would we get surer?*
:::

(ch07-sec-bootstrap)=
## 7.3 Confidence intervals without a formula: the bootstrap

### Intuition

The formula in @ch07-eq-ci-mean leans on the CLT and on the $t$-distribution being a
good description of how $\bar{x}$ varies. When the sample is small or oddly
shaped, you might wonder whether that description holds. The **bootstrap** sets
the formula aside and lets the data describe their own variability.

The trick is almost cheeky: treat your sample *as if it were the population*,
then draw new samples **from your sample, with replacement**, each the same size
$n$. Each such **resample** gives a new $\bar{x}$. Do it thousands of times and
you have rebuilt a sampling distribution — empirically, with no formula. The
middle 95% of those resampled means is a **95% bootstrap confidence interval**
(the *percentile* method).

### Formula

There is no closed-form formula; the procedure *is* the definition. For $B$
resamples:

1. Resample $n$ values from the data **with replacement**; compute the
   statistic. We write a resampled mean as $\bar{x}^{*}_b$ — the star marks it as
   coming from a *resample* rather than the original data, and $b$ counts which
   resample it is.
2. Repeat for $b = 1, \dots, B$, where $B$ is the **number of resamples** (say
   $B = 10{,}000$).
3. The **percentile interval** is the range between the 2.5th and 97.5th
   percentiles of the $B$ resampled statistics — the middle 95% of them.

### In R

```{code-cell} r
:label: ch07-bootstrap-ci
oil <- energy$ces_mining_logging_thsd
n   <- length(oil)

set.seed(2200)                       # reproducible resampling
B <- 10000
boot_means <- replicate(B, {
  resample <- sample(oil, size = n, replace = TRUE)
  mean(resample)
})

boot_ci <- quantile(boot_means, c(0.025, 0.975))
round(boot_ci, 3)
```

The bootstrap interval lands close to the formula interval $(7.70, 9.52)$, but it
is a touch **narrower**: its dashed bounds sit near $(7.9, 9.4)$, so its lower end
is about two tenths of a thousand jobs *above* the formula's $7.70$. That gap is
expected — the percentile bootstrap does not carry the $t$-distribution's
small-sample tail-widening, and with only $n = 10$ years that widening is not
negligible. **The near-agreement is still the lesson:** when conditions hold, the
formula and the bootstrap tell essentially the same story, which is exactly why we
trust the convenient formula. When they *disagree sharply*, the bootstrap is the
warning light.

```r
ggplot(data.frame(boot_means = boot_means), aes(x = boot_means)) +
  geom_histogram(bins = 40, fill = okabe_ito[1], colour = "white") +
  geom_vline(xintercept = boot_ci, linetype = "dashed",
             colour = okabe_ito[4], linewidth = 0.9) +
  labs(
    x = "Resampled mean oilfield payroll (thousands of jobs)",
    y = "Number of resamples",
    title = "Bootstrap sampling distribution (B = 10,000)"
  ) +
  theme_minimal(base_size = 12)
```

![A roughly bell-shaped histogram of 10,000 bootstrap resample means for annual Bakersfield-MSA oilfield payroll, centered near 8.6 thousand jobs, with two vertical dashed lines marking the 2.5th and 97.5th percentiles near 7.9 and 9.4 thousand jobs that bound the 95% bootstrap confidence interval.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA0gAAAH4CAIAAAD/0FrQAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAABJ0AAASdAHeZh94AAAgAElEQVR4nOzdeXRU9f3/8ffMZCaTlWyELYAgAiYQ2b5EXKgoLlVRcaEtEkCoiLhUSNkUBLSIIiJKWYpYBakFQa1UWhCoUkWtsv3ACIgoBNkTCNkz2/39cdtpmmVyb5LJzVyej8Ph3Nz7uTPvuXPnzms+d7MoiiIAAAAIfVajCwAAAEDDINgBAACYBMEOAADAJAh2AAAAJkGwAwAAMAmCHQAAgEkQ7AAAAEyCYAcAAGASBDsAAACTMGewO3nypKOKiIiIrl27jhkz5osvvgh2AcXFxZMnT/Z6vY02I0Rkw4YNDodj9uzZ6p+fffaZw+EYP368sVWpPvjgA4fDMX/+fPXPutWmffWo9PiffPKJw+GYNGmS3rJ1FWPsAh8zZszNN9+sDhu+BajWgw8+2LZt22onuVyuRYsW9ezZMyIi4vLLL581a1ZBQYHGh9U+r8aWtTbLyclxOBz79+/XWCGARqWY0YkTJwK/6qysrOA9u8/nczqdIuLxeBpnRqj++te/isisWbPUP//5z3+KyGOPPWZsVar3339fRF588UX1zzrUpmv1qPT4H3/8sYhMmDChDpVrL8bABb5582YROXLkiPqnsVuAar300ksi0rJly6qTiouLu3TpIiJJSUmDBw9u166diMTHx+fk5NT6sNrn1dhSY7Px48enpKS4XC79SwJAcJk82Hm9Xv9Ir9dbWFi4fv16u90uIlu2bAnSs/t8PvXZ6xDs6jYjVJWCXZNSKdjVQX1Wj2AEu6azrpaXlyclJY0dO9Y/xtgtQCVut3vChAlqPdUGu1/96lcionZ/Kori8/mWLVsmIh07dqxYf7W0z6uxpcZmBQUFNptt7ty5dV8uAILD5MHO5/NVnbpw4UIRGTx4cJCenWBnFIJdTcwd7J5//nkROXXqlH+MsVsAP5/P9/HHH7dp00ZEYmJiqg12R48eFZGUlJRKOWzo0KEisnXr1gCPr31ejS11FTNjxgwRyc3NrWUpAGhc5jzGLrB+/fqJyPfff19p/IULF1544QX1yJJLL730N7/5zQ8//FB19sDNli5dqvYHiEh4eLjD4Th37pz6Z3Fx8bx583r16hUREZGSkpKZmfnZZ5/VOuPWrVsdDsemTZu2b9/erVu3hISEUaNGlZaWqi3379+flZXVq1evqKio+Pj466+//rXXXnO73f6HVQ+uevfdd4uKiiZNmpSSkhIfH5+Zmfnll19qWVaBa/bTWMaGDRuKi4ufffbZyy67LDo6+vbbb9++fbvaYMuWLQMHDoyKiuratevChQsrHrlV55dQ7XFmH3zwQWlp6bx587p16xYVFXXllVe+/vrr1R61lpOT89vf/jYlJaVZs2ZDhgzJzs7Ozc11OByjRo2qdbn9+OOP48ePb9WqVfPmzcePH3/hwoXAtUlDrx41He5WVFQ0bdq0tm3bxsfHDxkypOoyrHScop96jOALL7wQoJhqn7TWj5Xe96WS0tLS6dOn33TTTS1atKi1saqmLUCD+/LLLwcMGHD8+PEpU6bs27ev2jbqr5Hx48dbrf+zNX788cdFZMmSJQEeX/u8GlvqKmbMmDEioq4SAJoQo5NlUAT+vb58+XIRmTZtWsWRX3zxhfpdlZycPHjw4K5du6qPsHDhQl3NNm3adN9996kj77777l/+8peFhYWKopw/fz4pKck/o/rVIhWO9alpRvXgoTvvvFNE0tPT+/fvn5qaqr6uWbNmqe3T09PvvvvuHj16qH926dLF7XarD6t21UybNq19+/YicsMNN/ifutaerVprVmkv48knn2zTpo3dbr/11lv9i+6TTz7JysoSkT59+gwcOFAdOXToUP/ja38JgY+xUx9n+vTpHTp0EJEBAwZcd9116uP079+/0qqiNlZfxR133KF2t6hfb5mZmYGX28aNG9V5U1NTBw0aFBUVlZycPGXKFKn5GLsGXz2qfe3XXnttq1atrFbrwIED/U/x5JNPBliGfmqP43PPPRegmKrH2Gn5WOl6X6pauXKliKxfv77iyDpsAaqaMWOGPaCJEycGfoSvv/76ySefPHPmjKIo+fn5Ul2PXWZmpoh8/vnnlcafP39eRJxOZ4DH1z6vxpZ6i+natavVai0tLQ1QJIBGdnEFu7Kysk2bNjmdzri4uPPnz/vHnz17Vv36+dOf/uSfZc+ePbGxsVJhB4TGZtXupVIzwWuvvVaxSDUu+I/4rnZG9ZtbRJYuXaqOUadmZ2eLSGJi4unTpys+ZnJysohs2LBBHeMPKKmpqWfPnlVHHj58ODExUQ1VARajlpr1ljF48ODy8nJ15CuvvCIiVqs1OTn5hx9+UEfm5OSoC9n/gNpfgpZgJyJ33HFHQUGBOvLkyZNxcXEisn37dv/jqG+01Wr9+OOP1TFut/uJJ55QZw8c7E6ePGmz2Ww226effqqOcblc/k6+moJdg68eNb32vn375ufnqyO///77+Ph4EfnnP/9Z0zL0qxjsaiqm0pNq/Lxof1+q1bt3bxHJy8urOFLvFqBa06ZNk4B07dquKdh179694rvs5/F41Gfxf16q0j6vxpZ6i5k7d66IbNq0KdArB9C4TB7sbDab+tvaZrP5N8dpaWmVvgbUHqOZM2dWehx1X1hKSor69aCxWbXfeampqSJS6bvklVdeSUtL86eHAN/ckZGRlY56eeuttzp16rRu3bpKxagX1JgzZ476p/9b8+TJkxWbffrppyLSvXv3mpeippr1llFcXOxvo37ViciHH35Ycd4hQ4aIiD8YaX8JWoKd1WqtWIOiKAsWLKgYWRRFmTx5sogsWrSoYjOfz9ezZ0+pLdhNnDhRqnT0er1e9ezCmoJdg68eNb32Sk/xySefiEjPnj39Yxow2Gn8vGh/X6pSj0mIi4urNF7vFqAR1BTsIiMjpYYj1dT9oQECqPZ5NbbUW4x6KMXjjz9eU4UAGp/Jj7Hzer1ut9vtdlc8WCc7O3vKlCn+w9TkP8eOqIeMVHTVVVclJSX99NNPx48f196sWuoOyjFjxlRs8/jjj3/zzTf+HU8B9O/fv9JRL8OGDTt06NA999xTqWXnzp1FpKysrOLIO+64o2XLlhXHXH311VFRUfv27SssLKxPzbrKuOqqq9RvDpXacyP/OebJT90lV1RUVP+XUNWAAQMq1iAil19+uYjk5eX5x6i76tQDxv0sFsvTTz9d6+OvWrVKRNRs6me1WgNfQ67BV49qDR06VO0G87v22mvtdvvu3bt1LUONdH1etLwvVamP0KdPn5oaaNwCGKikpEREKuZOP4fDISIBDjTUPq/GlnqLUX+uqD+xADQR5g92/gzr8/lKSkq++eabjIyM1157LSMjQ91IFRcXq5uzqgdfWyyWAQMGiMiRI0c0NqupkmeffdbhcKxduzYlJaVFixaTJ0/+8ssv/Ts4aqXmpGr5fL5z585lZ2e/8847jz322IgRI6TK9td/7FrFmvv27SsiOTk5DVKzljLS0tIq1aAOREVFVRzvPzC//i+hKvUaXRWp12NzuVzqn8XFxXl5eXa7vVIGEpFu3boFfvDy8vKTJ0+KiHrAXEVqb19Ngrd6VHTttddWGmO1Wq+44goRUctuQHo/L7W+L9X67rvvRMR/6F5VWrYAxlJfZrWVqK+92pild16NLfUWk5CQICK7d+/29+ACMJzJg50/OqjDERERaWlp//znP+Pj4/ft27dt2zb5T6+S0+msts+jefPmIlJSUqKxWU2VdOzY8dixY1lZWTExMWfOnJk7d26/fv2ioqLmzJmjZZsYERFRdeShQ4eGDBnicDgSExO7dev2i1/84ve//32lkKRSj3irRA0fxcXF9axZexnR0dHVPlHFt6kmdXsJValfXQGeXX0TmzVrVnXemur3Ky8vFxGr1Vp1JakaEysKxupRlb+LtCJ1wQZYdVWKomh5Cj+9n5da35dqqf156qNVS8sWoCYzZ86sevuKihrkTh6XXnqpVLf8vV6v+tZX+1HSO6/GlnqLCQ8PVwcqngIPwFgmD3bVcjgcan/Shg0b5D/bprKysmq/uk6dOiUiMTExGpsFeN7k5OR58+bl5+cfPHhw0aJFvXv3drlcTz75pJYdfFV9+eWXnTt3Xrt27XXXXbdgwYLNmzcfOXLE4/Go1+iqVGS1O9pOnz4tNSQY7TXrKkPLV3VN6vwS9FLfaPU0wEpqTT/qvD6fr2oaq3XHX8OuHtWq9v5R6jKslPmqdhYG7jmrqv6fFy3U5aw3dFbaAtTEvxu3Jg3S4aceXqkukIrUFT4+Pr7aDmy982psqbcY/5LX+xYACJ6LMdjJf3Yo+H+Dqr0FZ86cqdRMURT1N/2ll16qsVmtT221Wjt37jxu3LgdO3b87W9/E5GXXnqpDptF9XoTa9eu3bJly29+85uBAwe2b9/eZrOp+9QqfeXs2rWr0uw+n2/Hjh0iol5DpM416yqjPur5ErSLiYmJioryer1VLz536NChwPOGh4enpKRIdSvJgQMHtDx7Q60e1frXv/5VaYzX692zZ4+ItGrVSh0TFhYm1UXYH3/8UddzNdTnJTC1yzY3N1fvjBW3ADV59tlnAx+hrN4lrJ5uuukmEdm5c2el8epe5sBHWGqfV2NLvcX4476/6w6A4S7GYOfxeN5++20Rueaaa0TEYrE8+OCDIvL6669Xavn111/n5eUlJSU1b95cY7OK4/3fxyUlJffdd1/Pnj0rfZGoxzyp91usdsaalJeX//TTT/KfDXHFGf/4xz9KlUS1YsUKdS+h3xdffFFSUnLttddW3QWmvWa9ZdRHHV5C3VgsloceekhE/vKXv1Sa9PLLL9c6+8iRI0VkxYoVFUcqihJg3gZfPWqydu3aSh1vmzdv9nq9AwcO9O/MVS+Aoqa9is/45z//udrHrKmYOnxe6qBt27bqA+qaq9IWwFjqZ2f+/PmVluTvf/97EXnggQcaZF6NLfUWo/btderUqT6d8QAa1sUV7BRFOX78+JAhQ06ePBkTE3Pbbbep45966in1//fff9+/RTt48OCtt94qIkuWLFE3WxqbWSwW9UgU/7FfkZGRhw8f3rNnj3prRX8x8+bNE5ERI0aoxyFVnbEmDodDPWZLPQdTVVZWNmbMmK+++kpEKvU2lZSUDB061B+MfvjhB/WStosWLarpKbTUrLeM+qjDS6gz9WLCDz74oD8xqN0zmzZtqnXeCRMmREZGTpky5aOPPlLH+Hy+WbNmVe0F8Wvw1aMmhYWFv/zlL/3LcP/+/erZu+qFRVTqzritW7f6u/e8Xu+0adP27t1b8aG0FKPx81IfHTt2FJEdO3ZoDLs1bQEM1K5du0GDBh06dGjy5Mn+ZL9q1aq33nqra9eu6rKq/7waW+ot5vDhwyJyyy231HcpAGhAui6OEiqqXsVKvd6s/1Xb7fZdu3ZVnOXjjz9WDx9p167dsGHD/BdQqHSXa43N1C1dx44dH3jgAfWKWUePHlU7lmJiYu6+++4hQ4aokahTp07+C8ZWO6N6obLJkydXeo1r165Vn7pDhw6ZmZnqBS9iY2N/97vficjAgQP9BYtIenp6ZGRkZGTkvffe279/f3XGP/3pT4EXo5aadZVR9YKu6ryVrnqqXhj273//u96XoOU6dlVrqHq/BEVRPvzwQ/UpevToMXToUHVP5Q033CAiI0eODLzcduzYoa5sqampQ4cOVc9OUE/grek6dg2+elT72ocPHx4bG6suw6uvvlp9gW+++WaledV7gIpIv379hgwZou6bVu8EX/GqclWLqboktXxedL0vVamPeeLEiYoj67AFCLaarmOnTlIPJ0hOTh46dOhll10mIpGRkVUvFHzVVVfZ7fZVq1bVYV6NLbU/oKIoanb/xz/+UceFAiAITB7sKklKSurfv//8+fMrfln65eXlzZo1Ky0tzWaztWvXbvz48d9++23dmp0/f/7ee+9Vr8u1bds2/4yzZ8/u2bOn0+l0OBz9+/dftGiRenR5gBlr+uZWFOXzzz8fNGhQbGysw+Ho16/fq6++WlJS4vF4HA6H1WotKSlRKnxrnj59+oEHHoiNjY2Pjx83btzBgwe1LEktNesqo9Ljaw92Wl5CAwY7RVEOHz48atSopKQkNQnt37//H//4h5aooSjKiRMnJk+e3KZNG4fDMXDgwE8++UTduVlTsNO4qLWvHtW+9pUrV+bm5o4dOzYuLi4uLm748OHfffddtfX/7W9/GzhwoMPhaNWq1YQJE3Jzc9VLk1QMdlWLqXZJ1vp5qWewU28ptnz58ooj67YFCKoAwU5RlLKysgULFqSnp1ut1nbt2k2aNKnaSyirPw9WrlxZh3m1t9TYzOfzJSYm2my2SmspAGOZM9jBr6ZvzRDSdF7Ce++9JyKvvPKK0YXgv0pKSux2e+/evY0upJFkZmauXbvW6CoURVHUMyqq/c0JwEAX1zF2gBYPPfTQzTffXPU+ImqPYHp6uhFFoXoRERHPPPPMzp07f/jhB6NrCbrvv/9+9erVle7UYpQFCxZYrVb1HnoAmg6CHVBZnz59Pvroo0ceeaTiZVc/+OCDN954IykpyX90GpqICRMmJCUlqcd7mdvy5cs//PDDNm3aGF2I5OXlLV68+IUXXkhMTDS6FgD/g2AHVDZixIju3bt/8MEHERERP//5z++7776kpKS77rorKipqx44dAS4YC0M4HI633npr9erVx44dM7qW4Hr++ecrXVrIKHPnzk1OTv7Nb35jdCEAKiPYAZU5HI5du3b96U9/6t+//6effrp+/fquXbsuWLDg1KlTDXsxZDSUW265ZdiwYeqV8xBsx44dmzt37ubNm/mRAzRBFoVbwQAAAJgCPXYAAAAmQbADAAAwCYIdAACASRDsAAAATIJgBwAAYBIEOwAAAJMg2AEAAJgEwQ4AAMAkCHZGUhSFC0QbhYVvLBa+UZT/MLqQixRL3kAXyZpPsDNSeXl5cXGx0VVcpAoLC/Py8txut9GFXIwURTl//rzRVVykXC5XXl4eWx6jFBYWstkxhKIoeXl5F8OWh2AHAABgEgQ7AAAAkyDYAQAAmATBDgAAwCQIdgAAACZBsAMAADCJMKMLAOrFnZeT89Kt6nCH6Z9bI2KNrQeAKZ1846GSQ9tFJOGmx+OvG2N0OUCNCHYIbYrHVX48+9/Dis/YYgCYlTvvqLqp8RacNboWIBB2xQIAAJgEwQ4AAMAkCHYAAAAmQbADAAAwCYIdAACASRDsAAAATIJgBwAAYBIEOwAAAJMg2AFobBaLJTo62ugqAMCECHYADOBwOIwuAQBMiFuKIeRZbHajS4A+2388N/Oj77S3/2jMlRZL8MoBNLCG/XtTY6VDBE0awQ6hzdGi0+V/dBldBfQ5XVS+5TsdN9z0KYqNZAdDtZvwodElAJrwywMAAMAkCHYAAAAmQbADAAAwCYIdAACASRDsAAAATIJgBwAAYBIEOwAAAJMg2AEAAJgEwQ4AAMAkCHYAAAAmQbADAAAwCe4Vi9CmuMvKcvaow85L+lhsrNIAGl75if2+0gsiYk9oGxbfxuhygBrxLYjQ5j7304/P9FOHuyw5b4uMM7YehLo3vz62ePsRjY1T4pzvjfy/YJaDpuL02+OL9m0SkeR7fpd0x1NGlwPUiGAHAP91oqDs62P5GhufK4kKajEAoBfBDoBpPfjO/9t9/ILGxs/fdvnAzs2DWg8ABJvZgp3P5/N6vUZXoZXX6/X5fG632+hCQpjH4/EPu91un+aFqShKpdnRCCwWS1hYHTc7uj4pYWFhFovl4NminT9pDXbnSur4SVQUJYRWJHULyZZHL3WLISJer7c+iy601hYz8b+DJljz7XZ7gKlmC3Zer7e0tNToKrTyer2KooRQwU2Qp6zMP1xWVma1aF2Y6tdbeXm5CT7kISQsLKxuwU7vJyUyMrLOCVIvn88XQp9in88nIh6PJ4Rqbgr8XQb1XHRer9flcrHZaXxqsDPHd676w7XGqY1ZSiOw2+2Bk2yTUlZW5vF4oqOjjS4khLlK/7v0YmJibJGxGmcsKChwuVxRUVEhtMJczCwWS2ys1je3kdlstiZbW1Xl5eWFhYUOh4Mtjy75//mdEB4eXp+3u6CgICIigs1O41MUJS8vrylvSRoK17EDAAAwCYIdAACASRDsAAAATIJgBwAAYBIEOwAAAJMw21mxAOrj+iVfnCosq72diIisHd4nrWVMUOsBAOhCsENos0bExl//sDpsCXMYW4wJHDpb9NMFrcGu1O0VkR3H8r/PLdY4y+UtYq5obfJrDcCUonvcbm/eUUScl/QyuhYgEIIdQltYbHKrEYuNruKituzLo699maOx8aQBnQh2CEUJAx81ugRAE46xAwAAMAmCHQAAgEkQ7AAAAEyCYAcAAGASBDsAAACTINgBAACYBMEOAADAJAh2AAAAJkGwAwAAMAmCHQAAgEkQ7AAAAEyCe8UitHkKzpxZ96Q63HLYq1ZHpLH1ADClvE0vlx/PFpHY3oOjr7jN6HKAGhHsENp8pQX5215Xh1v8cp4Q7AAEQfG+TUX7NomII6kDwQ5NGbtiAQAATIJgBwAAYBIEOwAAAJMg2AEAAJgEwQ4AAMAkCHYAAAAmQbADAAAwCYIdAACASRDsAAAATIJgBwAAYBIEOwAAAJPgXrEIbfbEth2f2aUOW8OjjS0GgFm1zPy9r6xQRMLiWhldCxAIwQ6hzRIW7mzf0+gqAJico0Uno0sANGFXLAAAgEkQ7AAAAEyCYAcAAGASBDsAAACTINgBAACYBMEOAADAJAh2AJo6i8XoCmoQ6+SKUQCaFoIdgKbO2lSTXVyE3egSAOB/NOrPzTNnzrzxxhu7du1q1arV0KFD+/bt65904MCBFStWHD58OD09fezYsUlJSVomAbhIeHzK7C2HtLf/7XWXRjlswaunolOF5X/44qj29o9f2yGeRAggOBov2OXm5o4dO3bWrFmTJk06ceLEb3/726lTp6anp4vIsWPHZsyYMW/evJSUlK+++urhhx9+8803o6KiAk8CcPFweXwzNx3U3n5sv/aNFuxOFpTpqu3+Xm0IdgCCpPF2xb7++uujRo3q3r27xWJp06bN0KFDV61apU5avHjxiBEj2rZta7FYMjIyMjIyNmzYUOskQEREUf7nHwAEA9sZhIhGCnYej2f79u3XXHONf8ygQYPmzp0rIm63Ozs7u3v37v5JGRkZGzduDDwJULnOHP52pFX95y29YHQ5AMwp56Wfq9uZ3L8+Z3QtQCCNtCv23LlzImKz2ZYtW/bJJ58kJCSMHj26Z8+eIlJYWCgi8fHx/sYtWrTIzc31+XwBJlmtnPYBAADwPxop2BUUFIjI7373u4cffvjBBx88evTo5MmTJ02a1Lt37+LiYhFxOBz+xuHh4SLidrsDTFIHqiovLy8qKgrmS2l45eXlRpcQwrz5+f7hc+fOWUu9GmdUFEVELly4YGmqZ1w2sri4OJutkQ5Kg4icP3/e5/MZ9exlZWVseXRxu93qQElJSV5eXoM8FBqfz+er59vXFCQkJAT45mqkYOf1ekXk9ttvv+SSS0TkkksuGT169KuvvrpixYqqjQOUq+U7WOEAiItJxbdbUZQ6vPusMDBE3VbXhi3AwGcPOZU2NQZWgnoy/dvXSMEuIiJCRC6//HL/mLS0tPPnz5eVlUVGRoqI2+3298yVlZWJiMPhCDCppicKDw+vqTOvCSorK/N4PNHR0UYXEsJc3nz/j6/ExERbZJzGGQsKClwuV7Nmzex2zk+EARISEgx53vLy8sLCQqfTyZZHlxKHwyUiIpGRkfW56lZBQUFERASbncanKEpeXp7VajXqo9doGulINfU4OY/H4x+j7oOwWq2xsbEikl9hh9rp06eTk5MtFkuASY1TNgAAQAhppGAXExPTunXrXbt2+cd88803bdu2dTgcdrs9LS3t4MH/XgVqx44dAwYMEJEAkwAAAFBJ451b+sQTT7z22ms//PCDoig5OTlvvPHGo48+qk4aPXr0smXLTpw4oSjKrl27tm/fPnjw4FonAQAAoKLGu/NE165d582b9/rrr3/77beXXnrp9OnT/YfcderUafr06XPnzs3JyenRo8fChQvVo+sCTwIAAEBFjXqv2EsvvXT27NnVTkpLS1uwYIHeSQAAAPDjMr8AAAAmQbADAAAwiUbdFQs0OIs93HlJr38PW7lxAoCgcLTo5Cw8KyJhzVoaXQsQCMEOoc2e0LbjrJ1GVwHA5Fpm/t7oEgBN2BULAABgEgQ7AAAAkyDYAQAAmATBDgAAwCQ4eQIwp1OF5c989J329q8O7hZmtQSvHgBAIyDYAeaUV+xa8vkR7e1fvjONYAcAoY5dsQAAACZBsAMAADAJgh0AAIBJ1CvYKYqSl5fndrsbqhoAAADUmb5gt3fv3hdeeEEdPnv2bIcOHZKSkpxO56JFi4JQGwAAAHTQcVbsgQMHrrjiipYtW06ePFlEhg8ffvTo0XHjxh05cuTRRx9NTU0dMGBA0OoEqucrvXDhX++ow3HXDLeEhRtbDwBTKtr7d/e5n0QkokMfZ/ueRpcD1EhHsJszZ06HDh327dsnIhcuXNi4cWNmZqbaV3fzzTfPmzePYIfG5yk4e/KNMepwbN/7bAQ7AEFw7qNXivZtEpHke35HsENTpmNX7NatWx977LGoqCgR2b59u4iMHDlSnTRs2LBt27YFoTwAAABopSPY5efnJyQkqMOrV68Wkb59+6p/lpeXN3hlAAAA0EVHsOvdu/eWLVtExO12r1mzpl+/ftHR0SLi8/kWLVp09dVXB6tGAAAAaKDjGLsJEybcddddkZGRBw4ccLlcU6dOFZHNmzdPmzZtz549W7duDVqRAGAeCZEOo0sAYFo6gt0dd9wxd+7cqVOnKooyffr022+/XURmzJjxzTffrFix4vrrrw9akQBgHjHhNtBC0NoAACAASURBVKNLAGBaOoKdxWKZOHFiVlaWoig22783TGvXrk1OTrbb7cEpDwDM6eF3914o9WhsPPL/2t7UpXlQ6wFgDjqCncpqtfp8vrNnzxYVFXXo0IFUBwB18N7eU2eKtJ52dtUl8QQ7AFrou/OEy+WaPXt2bGxscnJyx44dRWTgwIH3339/fn5+cMoDAACAVjqCncfjueqqq6ZNm3bDDTfcdttt6sj27du//fbbnTp1KiwsDE6FAAAA0ERHsFu+fPnu3bv379//wQcf/PrXv1ZHrly5cvfu3fn5+c8//3xwKgQAAIAmOoLd4sWLn3jiia5du1Ya36NHjylTpqxcubJBCwMAAIA+Ok6eOHToUFZWVrWTunXrdvLkyQYqCdAhLLZ5qxFL1GGrI8LYYgCYVcKNj8X0uktEIjr2NboWIBAdwa5bt24bN24cMWJE1Unvv/9+enp6w1UFaGWNaBZ//VijqwBgctFX3GZ0CYAmOnbFPvroo6tXr1bvKlbRli1b3nnnnTFjxjRoYQAAANBHR4/dsGHDli1bduONN/bu3Ts2NlZE5s+fv27dui+++CI1NXX06NFBKxIAAAC109FjZ7PZtm3bNm/evEOHDn388ccikpWVtXPnzilTpuzcuZPLFAMAABhL350nwsLCsrKyJkyYcO7cucLCwoiIiKSkJP/txQAAAGAg3bcUExGLxZKYmJiYmNjg1QAAAKDOagl2DofD7XZrfCxFUepdDwAAAOqolmA3cuRIr9fbOKUAAACgPmoJdsuWLWucOgAAAFBPOs6KBQAAQFNWl5MnvF7v6dOni4qKmjVrlpycbLFYGrwsAAAA6KWvx660tHTChAnh4eFt2rTp0qVLy5YtIyMjZ86cqf0ECwAAAASJjh674uLi1NTUnJyc2267bdCgQQkJCXl5eR9++OGsWbPef//9r776Kjw8PHiFAtVynzv206v3qMPtp2y1OmOMrQeAKZ1a9Xjp91+KSPz1Y+P6jzK6HKBGOoLdiy++mJOTs2vXrp49e/pHjh07du/evT179ly0aNGECROCUKE+bre7tLTU6Cq08nq9iqIUFBQYXUgI85zPK/3xa3W44EK+1aX1mjsej0dEiouLrVazHWlqtVqjo6ONrgINr7S0tP67R3w+n4i4XC62PLqU/PRt2Y9fi4jj9C3Weiw6j8dTUlLCIUyNT70imzm+c2NiYgKsQjqC3euvvz5x4sSKqU6Vnp4+adKkJUuWNIVgZ7PZIiIijK5CK5fL5fV6Q6jgJsjtdPqHnU6nTfPCLCkp8fl84eHhYWF1OdK0KeM7w6wcDkf9V1e32+3xeMLCwtjy6OK/x1I9F11JSUmDvI/QS1EUt9ttsVhMsOYH3sjrWLfKyso6d+5c7aT09PRXX31VX13BYbVaQ6gDRu2x4za79aFU2D7a7Xab5oWpfjDCwsJY/ggVNput/rdwVHvsrFYra74u/q9Sm81Wn0VnsVjY7BjCfw8F0y98HRlo+PDhCxYsUDcKlaxYseLee+9tuKoAAACgm45gN3v27KioqMGDBx87dsyffPPz87Oysnbs2PH88897KwhOtQAAAKiRjl2xPXv2PHfu3FdffbV+/Xqn09m6detz587l5+erU1u3bl2xMfeNBQAAaGQ6gt0tt9xCVxwAAECTpSPYvfzyy8GrAwAAAPWk74xrRVFOnjx55syZak+h6NWrVwNVBQAAAN10BLv8/PxrrrkmOzu7pgYcVwcEyerdxxd+dkRj48tbRC8fckUwywEANFE6gt3EiROzs7NnzJjxs5/9LDw8nIugAo3m+IWyz4+c09jY7a2mQx0AcDHQEezWrVs3fvz4mTNnBq0YAAAA1J2OYJeUlJSamhq8UoA6cCRfevkf/333TIu1vhflB4BqtZuwQT3cyBI6NzfCxUnHCjp+/PilS5dyIB2aFovFYgtT/wmHBwAIEqvtP9sZgh2aNB09dmPHjv3kk0+GDBkyadKklJSUqrdkbdGiRYPWBgAAAB10BDuXy1VeXr5+/fp169ZV24DOPAAAAAPpCHZTp05dv379rbfeOmjQoKioqODVBAAAgDrQEexWrVqVmZm5cuXK4FUDAACAOtNxEKjdbh8wYEDwSgEAAEB96Ah2I0aMeOedd4JXCgAAAOpDR7B7+umnc3JyHn/88WPHjpWVlXmrCF6VAAAAqJWOYNe/f/8LFy4sXLiwXbt2ERERYVUEr0oAAADUSkcau+aaa+iWAwAAaLJ0BLuXX345eHUAAACgnhps/6nH42FvLBqf4ikvP3lQHXa2SRNuFwsgCFxnf/CVFYlIWGyLsGbcZglNl74olpOTs2bNmpMnT3o8HhFRFMXj8ZSXl58+ffof//hHaWlpcIoEauTOO/bDtCvU4S5Lztsi44ytB4ApnVoxrmjfJhFJvud3SXc8ZXQ5QI10BLvvvvuuS5cu1U5q2bJlZmZmA5UEAACAutBxVuyzzz4bGRmZnZ3tdrv79u07ceLE8vLyY8eO3Xnnne3bt1+6dGnwqgQAAECtdPTYbd269ZFHHklNTRWRO++88/3333c4HCkpKe+++27nzp3XrFnzq1/9Kmh1AubxwOo92388p7Hxi3ek3pnWMqj1AABMQ0ewO3/+fHp6ujrct2/fp556yufzWa1Wm8326KOPLly4kGAHaPHThbJDucUaGxeUeYJaDADATHTsir3kkkvOnDmjDnfo0EFE8vLy1D9bt269Y8eOBi8OAAAA2ukIdjfddNMf//hHt9stIm3atBGRLVu2qJPWr1+flJQUjPoAAACgkY5dsU888cSrr77avXv3AwcOOJ3OoUOHZmZmZmdn//DDD3/+858nT54cvCoBAABQKx3BrkOHDl9++eWyZcvUP//whz989913s2fPFpG+ffs+/fTTQSkQAAAA2ui7QHFGRkZGRoY6HB0d/dVXX506dUpEWrVq1fClAQAAQI/63gTM4XDExsY2SCkAAACoDx0nT4jI3r17X3jhBXX47NmzHTp0SEpKcjqdixYtCkJtAAAA0EFHj92BAweuuOKKli1bqudJDB8+/OjRo+PGjTty5Mijjz6ampo6YMCAoNUJVM/qjIm7dqQ6bAlzGFoLANOKSrsxLK6ViIS3TTe6FiAQHcFuzpw5HTp02Ldvn4hcuHBh48aNmZmZal/dzTffPG/ePIIdGl9Ysxatf/2G0VUAMLnEn2cZXQKgiY5dsVu3bn3ssceioqJEZPv27SIycuRIddKwYcO2bdsWhPIAAACglY5gl5+fn5CQoA6vXr1aRPr27av+WV5e3uCVAQAAQBcdwa53797qrSbcbveaNWv69esXHR0tIj6fb9GiRVdffXWwagQAAIAGOo6xmzBhwl133RUZGXngwAGXyzV16lQR2bx587Rp0/bs2bN169agFQkAAIDa6Qh2d9xxx9y5c6dOnaooyvTp02+//XYRmTFjxjfffLNixYrrr78+aEUCAACgdjqCncVimThxYlZWlqIoNptNHbl27drk5GS73R6c8gAAAKCV7jtPWK1Wn8939uzZoqKiDh061CHVKYry5JNP9u/f/+c//7l/5IEDB1asWHH48OH09PSxY8cmJSVpmQQAAAA/fXeecLlcs2fPjo2NTU5O7tixo4gMHDjw/vvvz8/P1/4gH3/8cXZ2ts/n8485duzYjBkzxo0bt2bNmhtvvPHhhx8uLi6udRIAAAAq0hHsPB7PVVddNW3atBtuuOG2225TR7Zv3/7tt9/u1KlTYWGhlge5cOHCkiVLKt1edvHixSNGjGjbtq3FYsnIyMjIyNiwYUOtkwAAAFCRjmC3fPny3bt379+//4MPPvj1r3+tjly5cuXu3bvz8/Off/75Wh9BUZR58+Y9/PDD7du39490u93Z2dndu3f3j8nIyNi4cWPgSQAAAKhExzF2ixcvfuKJJ7p27VppfI8ePaZMmbJixYrZs2cHfoTPP/+8vLx8wIABFa+Nonb1xcfH+8e0aNEiNzfX5/MFmGS1Vh9JvV6v2+3W/qKM5Xa7fT5fWVmZ0YVcjNSDAVwul9frbbQntdvt/hOPAL3cbnf9V1ePxyMiXq+XLY8hfD5fI292oFIURf3fBGu+0+kMMFVHsDt06FBWVvU3y+vWrdvJkycDz15cXLxgwYKlS5daLJZK40XE4fjv7dvDw8NFxO12B5ikDlTl8XiKioq0vJymI4SSaBOkFOcVfzRPHY66/WmLPULX7KWlpUEoqkaxsbEEO9RZWVlZQ93mx+12s+XRpXT7H71nDomII/UmR5d63RhdzdYwhKIoIRcSqgoPD68UpSrSEey6deu2cePGESNGVJ30/vvvp6enB5795ZdfHjlyZGJiYq1PFKDcAJNUNpstIkLfV7uBPB6PoihcLKY+PEWus58tV4cTB8+yan731R/N4eHhNfX+BkNjPhfMx+Fw1H8V8nq9LpfLZrNV/M2MWhUe2Fz67RYRccS3juhxa50fx+VyhYWFsSlofGpfncViCdzdFRICZyEdwe7RRx8dOXLk6NGjBw4cWHH8li1b3nnnnSVLlgSYd8eOHWfOnLn11mo+DJGRkSLidrv9Wxm1m9ThcASYVOPrCQsLC9N9DRejlJWVeTyeqKgoowsJYa6i/ya5yMhIW6TWhen1er1er9PpJFgjVISHh9e0s0K78vJyl8tlt9vZ8uji72t3OBz1WXRsdoziD3amX/N1ZKBhw4YtW7bsxhtv7N27t3pa6/z589etW/fFF1+kpqaOHj06wLwbN248cuTI3Xffrf7p9Xr37du3fPnyNWvWqA+Vn5/vX9anT59OTk62WCwBJul/pQAAACanI9jZbLZt27a98sorzzzzTEFBgYhkZWU5HI4pU6bMmDEj8O+PadOmVfzzqaee6tevn3pTMhFJS0s7ePBgmzZt1D937NgxYMAAEbHb7TVNAgAAQCX6dvOHhYVlZWXl5+fn5ub++OOPp06dKikpmTNnTh32WFfsdRs9evSyZctOnDihKMquXbu2b98+ePDgWicBAACgIh09dgsXLrz88ssHDhxosVgSExO1nAahUadOnaZPnz537tycnJwePXosXLhQPbou8CQAAABUpCPYPffccxMnTqx05kTdVL3iXVpa2oIFC6ptHGASAAAA/HTsim3ZsqV6aB0AoDFddUmC0SUACA06euzWrVvXp0+f9u3b33bbbfHx8VWvs8qFeQAgGMJsDXYpAPVinyF0WSgAuuj4bA8fPjwsLGzUqFE1NVDv1wEACIYHVu9ZueMnjY2fvqnzjJs6Vx0fWhf7BKCXjo93jx49ar29BAAgSHyK4tP8+1n9pf3NqcJ399Zyv0c/i8jT1WVBACFER7BbtGhR8OoAADS4fScLZm46qLGx1WIh2AGhjg55hDZ7fJtLpn2mDlvDo40tBoBZtfjVS0l3ThcRe2I7o2sBAiHYIbRZHBGRl11tdBUATC68TZrRJQCacB4rAACASdBjB9Sdosj0jQe0t590fafYcD50AIBgqeU7pri4OCoqqnFKAUKOT1Fmbzmkvf24qy8h2AEAgqeWXbFdu3Zdvny5Ovzuu+8eO3Ys+CUBAACgLmoJdrm5ueXl5erwr371q88++yz4JQEAAKAuatkr1Ldv35kzZ0ZERDRv3tzr9W7cuDEmJqamxrfffntDlwcAAACtagl2S5Ys6d279+jRo9U/V65cuXLlypoac0sxAAAAA9US7FJTUy9cuHD69Gm3233ZZZc99dRTI0eObJTCAAAAoE/tJ+g5HI62bduKyMCBA6+77rqOHTsGvyoAAADopuPKC5s2bVIHysrKcnJyiouLY2NjU1JSwsPDg1MbAAAAdNB354mSkpKHHnooIiKiS5cuvXr16tSpk9PpvOeeewoLC4NUHwCgcVgtFqNLAFBfOnrs3G53r169Dh48eN999915552JiYm5ubnr169fu3btnj17srOznU5n8AoFquU6c/jwk93U4c6vnrRFxhlbDwBTOrbgjqJvNotI88Ezk26bbHQ5QI10BLulS5cePHjwq6+++r//+z//yGHDhu3du7dnz55LliwZP358ECoEAlIUxV1mdBGAeZS6vVM36LhR3rirL+nc3Pw3KFI8rn9varweo2sBAtER7JYvX/7www9XTHWq9PT0rKysN998k2AHAKGuzON75dMftLe/LTX5Ygh2QKjQcYzdd999d+WVV1Y7qU+fPtnZ2Q1UEgAAAOpCR7Dr3LnzF198Ue2kf/3rX5dddlkDlQQAAIC60BHsHnrooaVLl3799deVxv+///f/5s+f7787BQAAAAyh4xi7Bx98cMGCBX379r3zzjvvvPPO5s2b5+XlrV+//r333ktJSXnssceCVyUAAABqpSPY2e32PXv2TJ48efHixR988IF//KhRo15++WUuUwwAAGAsHcFORCIjIxcuXPjSSy+dPHmyoKAgOjq6devWRDoAAICmQF+wUzkcjvbt2zd4KQAAAKgPfbcUAwAAQJNFsAMAADCJuuyKBZoOi80e3vryfw9b+KECICjsie3UTY0tJsnoWoBACHYIbfak9pfO+dboKgCYXKsHlhldAqAJPRwAAAAmoSPYLVy4cMuWLcErBQAAAPWhI9g999xze/fuDV4pAAAAqA8dwa5ly5YFBQXBKwUAAAD1oePkiXXr1vXp06d9+/a33XZbfHy8zWar1MBq5Yg9AAAAw+gIdsOHDw8LCxs1alRNDRRFaYiSAAAAUBc6gl2PHj3S09ODVwoAAADqQ0ewW7RoUfDqAAAAQD3V5ag4n8939uzZH3/8UUTcbndDlwQAAIC60HfnCZfL9eKLL86ZM6e4uFhEFEUZOHBgSkrKokWL4uLiglOhPoqi+Hw+o6vQyufzKYri9XqNLuRipB4S6vP56rz8q54/BFy01K2Z0VWEAPVLis1+4/OvnyZY+IG/fXQEO4/Hc9VVV+3cufOOO+7wer0bNmwQkfbt27/11lub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)

*Bootstrap distribution of the mean annual oilfield payroll.*

:::{warning} A bootstrap interval is only as good as the sample
Resampling cannot invent information the sample never had. If the original
sample is biased or tiny, the bootstrap faithfully reproduces that bias — it
just quantifies the *sampling* variability, not the data-collection flaws. With
$n = 10$ years, our interval honestly reflects "we only have ten years"; it
cannot rescue us from, say, a decade that happened to be unusual.
:::

(ch07-sec-coverage)=
## 7.4 Why "95% confident" means what it means

### Intuition

The single most-tested idea in this chapter is the interpretation from
@ch07-sec-concept-ci. The cleanest way to *see* it is to play God: invent a
population whose true mean we know, draw many samples, build a 95% interval from
each, and count how many capture the truth. It should be about 95%.

### In R

We use a population mean of 8.61 (our oilfield estimate) just to have a concrete
target; the point is the **counting**, not the number.

```{code-cell} r
:label: ch07-coverage-sim
set.seed(2200)
true_mu    <- 8.61
# Round-number PLANNING value for the made-up population, not the sample
# statistic. We deliberately use 1.27 (not the sample s = 1.271) because this
# is an invented "true" population we draw from — the point is the counting,
# not matching the Kern data exactly.
true_sigma <- 1.27
n_each     <- 10
n_studies  <- 1000

captured <- replicate(n_studies, {
  samp <- rnorm(n_each, mean = true_mu, sd = true_sigma)  # 10 fake draws from a bell curve
  ci   <- t.test(samp, conf.level = 0.95)$conf.int        # build a 95% CI
  ci[1] <= true_mu && true_mu <= ci[2]                    # did this one catch mu?
})

mean(captured)   # share of the 1000 intervals that captured the truth
```

Run this and you will get a number close to **0.95** — about 95% of the
intervals contain the true mean, exactly as advertised. (Each interval either
catches $\mu$ or not, a `TRUE`/`FALSE`; `mean()` of `TRUE`/`FALSE` values is just
the *fraction* that were `TRUE`.) The 5% that miss are not mistakes in arithmetic;
they are the price of the method, baked into the word "95%."

The simulator below lets you *see* that counting happen. Each row is one 95%
interval built from a fresh sample; press **Play** and watch batch after batch of
twenty intervals, a stubborn handful missing the target every time.

:::{figure} #fig-ci-coverage-sim
:label: ch07-fig-ci-coverage-interactive
:alt: An animated dot-and-error-bar chart of twenty horizontal 95% confidence intervals against a green vertical dashed line marking the true mean. Most intervals are blue circles that cross the dashed line (they capture the true mean); a few are vermillion X markers whose intervals fall entirely to one side and miss it. Pressing Play cycles through 20 batches of twenty intervals, and in each batch about nineteen of the twenty capture the true mean, illustrating 95% coverage.
**Confidence-interval coverage (simulated)** — press Play: each batch draws twenty fresh 95% intervals; the vermillion ✕ intervals are the ~5% that miss the true mean (green dashed line), while the blue-circle intervals capture it.
:::

:::{tip} Going deeper (optional) — why a CI and a two-sided test agree
:class: dropdown
This box is enrichment; you can skip it without missing any required skill.

There is a clean duality between a confidence interval and a hypothesis test
(Chapter 8). A 95% confidence interval is exactly the set of "null" values that a
two-sided test at significance level $\alpha = 0.05$ would *not* reject. So the
two tools are the same evidence wearing different clothes:

- If a value $\mu_0$ sits **inside** the 95% interval, a two-sided test of
  $H_0:\mu=\mu_0$ would **fail to reject** at $\alpha=0.05$ — the data are
  consistent with that value.
- If $\mu_0$ sits **outside** the interval, the same test would **reject** it.

That is why @ch07-sec-we3's interval $(0.416, 0.577)$ "including 0.50" is the same
statement as "a two-sided test would not reject $p = 0.50$." The interval does
more than the test, though: it hands you the *whole range* of values the data
cannot rule out, not just a yes/no verdict about one of them. We make this
duality precise in Chapter 8; here it is enough to notice that "is $\mu_0$ in the
interval?" and "would a test reject $\mu_0$?" are two ways of asking one
question.
:::

:::{important} Durable skill — Quantitative communication
**The hard part of a confidence interval is saying it in words a non-expert will
not misread.** "We are 95% sure the average is between 7.7 and 9.5 thousand oil
jobs" is loose but defensible in a meeting; "there's a 95% chance the true
average is in this exact range" is wrong and will be quoted back to you. In any
workplace that reports estimates — public health, market research, engineering
QA — the person who can translate a margin of error into a sentence a city
council or a client actually understands is the person whose analysis gets used.
Practice writing the one-sentence version every time; it is graded in this
course and rewarded everywhere after it.
:::

(ch07-sec-worked)=
## Worked examples

Every worked example below follows the same five steps, so you always know what
comes next:

1. **State the estimate** — the sample mean $\bar{x}$ or sample proportion
   $\hat{p}$ you are reaching out from.
2. **Find the standard error** $SE$ — how much that estimate wobbles from sample
   to sample.
3. **Pick the critical value** — $t^{\star}$ (means) or $z^{\star}$
   (proportions) for your confidence level.
4. **Build the margin of error** $ME = (\text{critical value})\times SE$, and
   form the interval $\text{estimate}\pm ME$.
5. **Say it in plain words** — what the interval means for a real reader.

(ch07-sec-we1)=
### Worked Example 1 — Mean oilfield payroll (the Kern hook)

**Question.** Using all ten years of `kern_energy_employment`, build and
interpret a 95% confidence interval for the mean annual oilfield (Mining &
Logging) payroll in the Bakersfield MSA.

**Intuition.** We have one sample of $n=10$ yearly averages. The sample mean is
our best single guess; the interval reaches out a couple of standard errors on
each side to express how uncertain that guess is.

**Formula.** Mean interval, @ch07-eq-ci-mean:
$\bar{x} \pm t^{\star}_{9}\,\dfrac{s}{\sqrt{n}}$, with $df = n-1 = 9$.

**Computation.** From the data, $\bar{x} = 8.61$, $s = 1.271$, $n = 10$, so
$SE = 1.271/\sqrt{10} = 0.402$. The 95% critical value is
$t^{\star}_{9} = 2.262$, giving $ME = 2.262 \times 0.402 = 0.909$.

```{code-cell} r
:label: ch07-we1
t.test(~ ces_mining_logging_thsd, data = energy, conf.level = 0.95)$conf.int
```

So the interval is $8.61 \pm 0.91 = (7.70,\ 9.52)$ thousand jobs.

**Interpretation.** We are 95% confident that the mean annual oilfield payroll
for the Bakersfield MSA over this period lies between about **7,700 and 9,500
jobs**. The interval does *not* tell us where any single year fell (2015 was
11.4k, well above it); it estimates the *average* level and how precisely ten
years pin it down.

(ch07-sec-we2)=
### Worked Example 2 — Total nonfarm payroll, three confidence levels

**Question.** For the same dataset's total nonfarm payroll
(`ces_total_nonfarm_thsd`, thousands of jobs), construct 90%, 95%, and 99%
confidence intervals for the mean and compare their widths.

**Intuition.** Same data, three different "nets." More confidence $\Rightarrow$ wider net.

**Formula.** @ch07-eq-ci-mean with $t^{\star}_{9}$ equal to $1.833$ (90%), $2.262$
(95%), and $3.250$ (99%).

**Computation.** Here $\bar{x} = 271.69$, $s = 14.914$, $n = 10$, so
$SE = 4.716$.

```{code-cell} r
:label: ch07-we2
for (cl in c(0.90, 0.95, 0.99)) {
  ci <- t.test(~ ces_total_nonfarm_thsd, data = energy, conf.level = cl)$conf.int
  cat(sprintf("%.0f%% CI: (%.1f, %.1f)  width = %.1f\n",
              100 * cl, ci[1], ci[2], diff(ci)))
}
```

This prints the 95% interval as $(261.0,\ 282.4)$ thousand jobs, with the 90%
interval narrower and the 99% interval wider.

**Interpretation.** All three intervals are centered on the same estimate
(271.7k jobs); confidence buys width. A planner who needs to be *very* sure
quotes the 99% range; one who wants a tighter working estimate accepts the 90%
range and its higher chance of missing.

(ch07-sec-we3)=
### Worked Example 3 — A proportion: high-burden tracts

**Question.** In `kern_calenviroscreen`, a census tract is "high-burden" if its
statewide CalEnviroScreen percentile is at least 75. Of the Kern tracts with a
score, what fraction are high-burden, and what is a 95% confidence interval for
that proportion?

**Intuition.** We have a yes/no label per tract; $\hat p$ is the observed
fraction, and we reach out $z^{\star}$ standard errors to estimate the
population proportion $p$.

**Formula.** Proportion interval, @ch07-eq-ci-prop:
$\hat p \pm z^{\star}\sqrt{\hat p(1-\hat p)/n}$, with $z^{\star}=1.96$ for 95%.
First check the **success–failure condition**: $n\hat p \ge 10$ and
$n(1-\hat p)\ge 10$.

**Computation.**

```{code-cell} r
:label: ch07-we3
ces  <- read.csv("data/processed/kern_calenviroscreen.csv")
high <- ifelse(ces$ces_percentile >= 75, "high_burden", "not")  # label tracts
x <- sum(high == "high_burden", na.rm = TRUE)   # 73 high-burden tracts
n <- sum(!is.na(high))                           # 147 scored tracts
# prop.test returns a Wilson (score) interval; correct = FALSE drops the
# continuity correction so it lines up with the by-hand Wald interval below.
prop.test(x, n, correct = FALSE)$conf.int
```

Here 73 of 147 scored tracts are high-burden, so $\hat p = 0.497$,
$SE = \sqrt{0.497\times 0.503/147} = 0.041$, and
$ME = 1.96 \times 0.041 = 0.081$. The success–failure check passes easily
($n\hat p = 73$, $n(1-\hat p)=74$, both $\ge 10$). The by-hand Wald interval is
$0.497 \pm 0.081 = (0.416,\ 0.577)$; `prop.test()` prints the Wilson *score*
interval $(0.417,\ 0.576)$, which for $n = 147$ and $\hat p$ near one-half agrees
with the Wald interval to within about a thousandth.

**Interpretation.** We are 95% confident that between about **42% and 58%** of
Kern's scored tracts rank in the worst statewide quarter for environmental
burden. The interval comfortably includes 50%, so these data are consistent with
"about half" — a sobering headline that the margin of error keeps honest.

(ch07-sec-we4)=
### Worked Example 4 — Saying it right (interpretation drill)

**Question.** A student reports the Worked Example 1 interval four ways. Mark
each as correct or incorrect, and fix the wrong ones.

| # | Statement | Verdict |
|---|---|---|
| a | "There is a 95% probability the true mean is between 7.70 and 9.52." | ❌ |
| b | "95% of years had oilfield payroll between 7.70 and 9.52 thousand." | ❌ |
| c | "If we repeated this study many times, about 95% of the intervals we'd build would contain the true mean." | ✅ |
| d | "We are 95% confident the true mean oilfield payroll is between 7.70 and 9.52 thousand jobs." | ✅ |

**Reasoning.**

- **(a)** treats *this* fixed interval as having a probability. Once computed,
  the interval either contains $\mu$ or not; the 95% describes the **procedure**,
  not this instance. *Fix:* use (c) or (d)'s wording.
- **(b)** confuses a confidence interval for the **mean** with a range for
  **individual years**. Indeed 2015's value (11.4k) lies outside it. A range for
  individual values is a *prediction interval*, a different and wider thing.
- **(c)** is the textbook-correct frequency statement.
- **(d)** is the accepted plain-language shorthand: "confident," not
  "probability."

**Interpretation.** The difference between (a) and (d) looks like hair-splitting
but is the whole idea of the chapter: confidence lives in the *method that
generates* intervals, not in any single interval you happen to hold.

(ch07-sec-tryit)=
## Try it

Put these ideas in motion with the two companion tools built for this chapter:

- **Shiny — Statistics Explorer, "CI Calculator & Visualizer" module.** Pick a
  dataset, choose a variable and a confidence level, and watch the interval (and
  the **exact R code** that produced it) update live. Launch the app
  with `shiny::runApp("shiny-explorer")` and open the *Confidence Intervals*
  tab. The code panel uses the same `t.test()` / `prop.test()` calls
  you see above, so the app and this book teach identical syntax.
- **Jupyter lab — `labs/lab07-confidence-intervals.ipynb`.** A guided, R-kernel
  notebook: rebuild the oilfield interval, run your own bootstrap, and write the
  coverage-simulation loop from @ch07-sec-coverage. Starter code and a reflection
  prompt are included; the instructor solution is in
  `instructor/lab-solutions/`.

(ch07-sec-summary)=
## Chapter summary

- A **confidence interval** reports a *range* of plausible values for an unknown
  parameter, in the form $\text{estimate} \pm ME$, instead of a single guess.
- For a mean: $\bar{x} \pm t^{\star}_{df}\,s/\sqrt{n}$ with $df = n-1$. For a
  proportion: $\hat p \pm z^{\star}\sqrt{\hat p(1-\hat p)/n}$, after the
  success–failure check.
- The **margin of error** $ME = (\text{critical value})\times SE$ has two
  levers: a higher **confidence level** widens it; a larger **sample size**
  narrows it, but only at the rate $1/\sqrt{n}$.
- The **bootstrap** rebuilds the sampling distribution by resampling the data
  with replacement; its percentile interval agrees with the formula when
  conditions hold and warns you when they don't.
- "95% confident" is a statement about the **procedure**: about 95% of intervals
  built this way capture the truth. It is *not* a probability about one fixed
  interval, nor a range for individual observations.
- On the real Kern oil data, the 95% interval for mean annual oilfield payroll
  is $(7.70, 9.52)$ thousand jobs — a result we computed, never assumed.

(ch07-sec-faq)=
## FAQ

**Q1. Why do we add and subtract the margin of error instead of just reporting
the sample mean?**
Because the sample mean would be wrong to some unknown degree. The margin of
error is an honest admission of how far off it could plausibly be; dropping it
pretends to a precision the data don't have.

**Q2. Is a 99% interval "better" than a 95% interval?**
Not better — *more cautious*. It is more likely to contain the truth but says
less because it is wider. The right level depends on how costly a miss would be
for your decision. 95% is a common default, not a law.

**Q3. My bootstrap interval changed slightly when I ran it again. Did I make a
mistake?**
No — resampling uses random draws, so two runs differ a little. Set a seed
(`set.seed(2200)`) for reproducibility, and increase $B$ (the number of
resamples) to make the wobble smaller.

**Q4. When should I use $t^{\star}$ and when $z^{\star}$?**
Use $t^{\star}$ (with $df = n-1$) for a **mean**, because we estimate the spread
$s$ from the data. Use $z^{\star}$ for a **proportion**. With large $n$ the two
critical values nearly coincide, but in this course we keep the distinction
explicit.

**Q5. The interval includes a "no-difference" value like 0 (or 50%). So what?**
That is informative: if a plausible-values range includes the boundary that
means "no effect," your data are *consistent* with no effect. This is the bridge
to hypothesis testing in Chapter 8 — a 95% interval that excludes the null value
corresponds to a significant test at $\alpha = 0.05$.

**Q6. Does a wider sample range (more spread) make the interval wider?**
Yes. The margin of error contains $s$ in the numerator, so a more variable
variable produces a wider interval — more spread means more uncertainty about
the mean, all else equal.

**Q7. How big a sample do I need for a margin of error I can live with?**
Solve @ch07-eq-n-plan: $n \ge (z^{\star}\sigma/m)^2$, using a planning value for the
spread $\sigma$ and your target margin $m$. Always round up. Halving the margin
quadruples the required $n$.

**Q8. Can I build a confidence interval from summary statistics if I don't have
the raw data?**
Yes. BSDA's `tsum.test(mean.x = 8.61, s.x = 1.271, n.x = 10)` builds the mean
interval from summaries alone — handy when a report gives you $\bar{x}$, $s$, and
$n$ but not the data.

(ch07-sec-practice)=
## Practice problems

:::{note}
Problems are auto-numbered in order. **Odd-numbered** answers appear in the
[answers appendix](../appendix/answers.md); full worked solutions to all
problems are in the instructor key. Unless told otherwise, use a 95% confidence
level, keep full precision until the final step, and round final answers to two
decimals. Critical values you may need: $z^{\star}_{.90}=1.645$,
$z^{\star}_{.95}=1.960$, $z^{\star}_{.99}=2.576$.
:::

**Conceptual & interpretation**

1. In one sentence, explain why a confidence interval is more honest than
   reporting only a sample mean.
2. State, in plain language, the *correct* interpretation of a 95% confidence
   interval. Then write one *incorrect* interpretation and say what is wrong with
   it.
3. True or false, with a reason: "A 90% confidence interval is wider than a 99%
   confidence interval built from the same data."
4. Explain why the bootstrap interval and the formula interval usually agree,
   and name one situation in which they might not.
5. A poll reports "52% ± 4 percentage points." Identify the point estimate, the
   margin of error, and the implied confidence interval.
6. Why does quadrupling the sample size only halve the margin of error?

**Computation — means**

7. A sample has $\bar{x} = 50$, $s = 8$, $n = 16$. Construct a 95% confidence
   interval for $\mu$. (Use $t^{\star}_{15} = 2.131$.)
8. Using `kern_energy_employment`, the Kern County unemployment rate
   (`kern_unemp_rate`) over 2015–2024 has $\bar{x} = 9.23$, $s = 1.664$,
   $n = 10$. Build a 95% confidence interval for the mean unemployment rate.
9. For the same unemployment-rate data, build a **90%** interval
   (use $t^{\star}_{9} = 1.833$) and a **99%** interval
   (use $t^{\star}_{9} = 3.250$). Which is widest, and why?
10. A sample of $n = 25$ commute times has $\bar{x} = 28$ minutes and $s = 9$
    minutes. Construct a 95% interval for the mean commute time
    (use $t^{\star}_{24} = 2.064$).
11. Re-express the oilfield-payroll 95% interval $(7.70, 9.52)$ thousand jobs in
    the form $\bar{x} \pm ME$. What are $\bar{x}$ and $ME$?
12. A study reports a 95% confidence interval for a mean as $(12.4, 17.6)$. What
    were the sample mean and the margin of error?

**Computation — proportions**

13. In a sample of $n = 200$ households, $\hat p = 0.40$ have rooftop solar.
    Check the success–failure condition and build a 95% interval for $p$.
14. Of $n = 150$ Kern tracts surveyed, $x = 45$ report a particular hazard.
    Estimate $p$ and give a 95% confidence interval.
15. For the high-burden-tract example (@ch07-sec-we3), the 95% interval was
    $(0.416, 0.577)$. Does it include $0.50$? What does that tell you?
16. A 95% interval for a proportion is $0.30 \pm 0.07$. State the interval and
    explain whether the value $0.25$ is plausible for $p$.

**Sample-size planning & level effects**

17. You want a 95% confidence interval for a mean with margin of error no larger
    than $m = 2$, and a planning value $\sigma = 8$. Use @ch07-eq-n-plan to find the
    minimum sample size.
18. Repeat problem 17 with the same $\sigma = 8$ but a tighter target $m = 1$.
    Compare your answer to problem 17 and comment on the cost of precision.
19. For a 95% interval estimating a proportion to within $m = 0.04$, using the
    conservative planning value $\hat p = 0.5$, find the minimum $n$
    ($n \ge (z^{\star})^2 (0.25)/m^2$).
20. Explain, using @ch07-eq-me, two different changes you could make to a study to
    *narrow* a confidence interval, and a cost of each.

**Data-driven & R**

21. Write the R call (mosaic `t.test` with the `~ variable` formula) that produces
    a 90% confidence interval for the mean total nonfarm payroll
    (`ces_total_nonfarm_thsd`) from `kern_energy_employment`.
22. Describe, in steps (no code required), how you would build a bootstrap 95%
    interval for the mean unemployment rate from `kern_energy_employment`.
23. The coverage simulation in @ch07-sec-coverage returned about $0.95$. If you
    changed the confidence level in that loop to 0.80, what proportion of
    intervals would you expect to capture the truth, and would the intervals be
    wider or narrower?
24. Using `kern_energy_employment`, the 95% interval for mean oilfield payroll is
    $(7.70, 9.52)$. A reporter writes, "95% of years had oilfield payroll in this
    range." Explain why that is wrong and write a correct one-sentence summary.
25. A colleague gives you only $\bar{x} = 8.61$, $s = 1.271$, and $n = 10$ for
    oilfield payroll (no raw data). Write the `tsum.test()` call (BSDA) using its
    summary-statistics arguments (`mean.x`, `s.x`, `n.x`) and state the 95%
    interval you expect.

(ch07-sec-glossary)=
## Glossary additions

New terms introduced in this chapter are defined in the
[glossary appendix](../appendix/glossary.md): *confidence interval*,
*confidence level*, *margin of error*, *critical value*, *bootstrap*, and
*coverage*. The per-chapter glossary fragment lives at `book/ch07/_glossary.md`.

## Resumen en español

:::{note} Resumen del capítulo
:class: dropdown
En este capítulo aprendiste a construir e interpretar un **intervalo de confianza** (confidence interval): un rango de valores plausibles para un parámetro poblacional desconocido. En lugar de reportar un solo número, el intervalo te dice con cuánta certeza puede equivocarse esa estimación puntual.

El ejemplo central del capítulo proviene de datos reales del condado de Kern: el empleo anual en la industria petrolera de la zona metropolitana de Bakersfield, registrado en el conjunto de datos `kern_energy_employment`. A partir de diez años de datos, la **media muestral** (sample mean) fue de aproximadamente 8.61 miles de empleos, y el **intervalo de confianza** (confidence interval) del 95% resultó ser de 7.70 a 9.52 miles de empleos.

La fórmula general es:

estimación ± (valor crítico) × error estándar

Para la media, el **error estándar** (standard error) es $s/\sqrt{n}$, y el **valor crítico** (critical value) proviene de la distribución $t$ con $n-1$ **grados de libertad** (degrees of freedom). Para una proporción, se usa la distribución normal con $z^{\star}$.

Dos palancas controlan el ancho del intervalo: aumentar el **nivel de confianza** (confidence level) lo hace más amplio; aumentar el **tamaño de muestra** (sample size) lo estrecha, pero solo a razón de $1/\sqrt{n}$, lo cual significa que para reducir el **margen de error** (margin of error) a la mitad se necesita cuadruplicar $n$.

El capítulo también presentó el **bootstrap** (bootstrap): un método de remuestreo que reconstruye la distribución muestral sin fórmulas. Con los datos del petróleo de Kern, el intervalo bootstrap coincidió muy de cerca con el intervalo de fórmula, lo que confirma que ambos enfoques cuentan la misma historia cuando las condiciones se cumplen.

La interpretación correcta es crucial: decir "estamos 95% seguros de que la media verdadera está entre 7.70 y 9.52 miles de empleos" es aceptable. Decir "hay un 95% de probabilidad de que la media verdadera esté en este intervalo exacto" es incorrecto: el 95% describe el **procedimiento** (procedure), no este intervalo en particular.

En R, la función `t.test()` (con la fórmula `~ variable`, a partir de datos crudos) o `tsum.test()` del paquete `BSDA` (a partir de resúmenes) construye el intervalo; se lee el bloque `95 percent confidence interval` de la salida.

$$SE(\bar{x}) = \frac{\sigma}{\sqrt{n}}$$
:::
