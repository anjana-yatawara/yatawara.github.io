---
title: "Course Formula Sheet"
---

# Course Formula Sheet

This sheet gathers every formula used in MATH 1209, organized by topic, with each
symbol defined the first time it appears. The notation matches the weekly units:
Roman letters (such as $\bar{x}$, $s$, $\hat{p}$) are **statistics** computed from a
sample, and Greek letters (such as $\mu$, $\sigma$, $p$) are **parameters** that
describe a whole population. Round only at the *end* of a calculation, never in the
middle. A quick guide to entering these on a calculator is in the
[TI-83/84 Quick Guide](ti-guide.md).

## Summarizing data (Ch 2)

| Quantity | Formula | Symbols |
|---|---|---|
| Sample mean | $\bar{x} = \dfrac{\sum x_i}{n}$ | $x_i$ = each data value; $n$ = sample size; $\sum$ = "add up" |
| Sample variance | $s^2 = \dfrac{\sum (x_i - \bar{x})^2}{n-1}$ | average squared distance from the mean |
| Sample standard deviation | $s = \sqrt{\dfrac{\sum (x_i - \bar{x})^2}{n-1}}$ | $s$ = typical distance of a value from $\bar{x}$, in original units |
| Range | $\text{max} - \text{min}$ | largest value minus smallest value |
| Interquartile range | $IQR = Q_3 - Q_1$ | $Q_1, Q_3$ = 25th and 75th percentiles (first and third quartiles) |
| Lower / upper outlier fences | $Q_1 - 1.5\cdot IQR$ and $Q_3 + 1.5\cdot IQR$ | a value beyond either fence is a flagged **outlier** |

**Five-number summary:** minimum, $Q_1$, median, $Q_3$, maximum — the five values
that a boxplot draws. The median is the middle value of the sorted data; $Q_1$ and
$Q_3$ are the medians of the lower and upper halves.

## Probability rules (Ch 3–4)

Every probability is a number $0 \le P(A) \le 1$, where $P(A)$ is the probability of
event $A$.

| Rule | Formula | When it applies |
|---|---|---|
| Complement rule | $P(A^c) = 1 - P(A)$ | $A^c$ = "$A$ does **not** happen"; always valid |
| Addition rule (general) | $P(A \text{ or } B) = P(A) + P(B) - P(A \text{ and } B)$ | any two events; the last term removes double-counting |
| Addition rule (disjoint) | $P(A \text{ or } B) = P(A) + P(B)$ | only when $A$ and $B$ are **disjoint** (cannot both occur) |
| Multiplication rule (independent) | $P(A \text{ and } B) = P(A) \times P(B)$ | only when $A$ and $B$ are **independent** |

## Discrete random variables (Ch 4–5)

A **random variable** $X$ assigns a number to each outcome; $P(x)$ is the probability
$X$ takes the value $x$.

| Quantity | Formula | Symbols |
|---|---|---|
| Valid distribution | $\sum P(x) = 1$, with each $0 \le P(x) \le 1$ | the probabilities of all values sum to exactly 1 |
| Expected value (mean) | $E(X) = \mu = \sum x \cdot P(x)$ | the probability-weighted (long-run) average of $X$ |
| Standard deviation | $SD(X) = \sigma = \sqrt{\sum (x - \mu)^2 \, P(x)}$ | the typical distance of an outcome from $\mu$ |

## The Normal model (Ch 4)

| Quantity | Formula | Symbols |
|---|---|---|
| z-score | $z = \dfrac{x - \mu}{\sigma}$ | how many standard deviations $x$ is above ($+$) or below ($-$) the mean |
| Empirical rule (68–95–99.7) | 68% within $\pm 1\sigma$, 95% within $\pm 2\sigma$, 99.7% within $\pm 3\sigma$ | of the mean, for an approximately Normal distribution |

$\mu$ = population (or model) mean and $\sigma$ = population standard deviation. A
Normal model is written $N(\mu, \sigma)$; the standard Normal is $N(0,1)$. To
standardize a *sample* value instead, use $z = (x - \bar{x})/s$.

## Foundations for inference (Ch 5)

| Quantity | Formula | Symbols |
|---|---|---|
| Standard error of a proportion | $SE_{\hat{p}} = \sqrt{\dfrac{\hat{p}\,(1 - \hat{p})}{n}}$ | $\hat{p}$ = sample proportion; typical wobble of $\hat{p}$ |
| Standard error of a mean | $SE_{\bar{x}} = \dfrac{s}{\sqrt{n}}$ | use $\sigma/\sqrt{n}$ when $\sigma$ is known |
| Confidence interval (general) | $\text{point estimate} \pm (\text{critical value}) \times SE$ | a range of plausible values for the parameter |
| Margin of error | $ME = (\text{critical value}) \times SE$ | half the width of a confidence interval |
| Test statistic (general) | $\dfrac{\text{estimate} - \text{null value}}{SE}$ | how far the estimate sits from the claim, in $SE$ units |
| Decision rule | reject $H_0$ if p-value $< \alpha$; otherwise fail to reject | $\alpha$ = significance level, chosen *before* seeing data |

## Inference for a proportion (Ch 6)

| Quantity | Formula | Symbols |
|---|---|---|
| Success–failure condition | interval: $n\hat{p} \ge 10$ and $n(1-\hat{p}) \ge 10$; test: $np_0 \ge 10$ and $n(1-p_0) \ge 10$ | must hold to use a Normal-based procedure |
| One-proportion z-interval | $\hat{p} \pm z^{*}\sqrt{\dfrac{\hat{p}\,(1-\hat{p})}{n}}$ | $SE$ uses the sample value $\hat{p}$ |
| One-proportion z-test | $z = \dfrac{\hat{p} - p_0}{\sqrt{p_0(1-p_0)/n}}$ | $SE$ uses the claimed value $p_0$ |

$p$ = the true population proportion (a parameter); $p_0$ = the specific value of $p$
claimed by $H_0$.

## Inference for a mean (Ch 7)

| Quantity | Formula | Symbols |
|---|---|---|
| One-mean t-interval | $\bar{x} \pm t^{*}\dfrac{s}{\sqrt{n}}$, with $df = n - 1$ | uses the t-distribution because $\sigma$ is unknown |
| One-mean t-test | $t = \dfrac{\bar{x} - \mu_0}{s/\sqrt{n}}$, with $df = n - 1$ | $\mu_0$ = the mean claimed by $H_0$ |

$\mu$ = the true population mean (a parameter); $df$ = degrees of freedom, which fix
the exact shape of the t-distribution.

## Critical values

**z-critical values $z^{*}$** (for Normal-based intervals and tests — short enough to
memorize):

| Confidence level | 90% | 95% | 99% |
|---|---:|---:|---:|
| $z^{*}$ | 1.645 | 1.960 | 2.576 |

**t-critical values $t^{*}$** are read from a t-table (or `invT`) using the row for
your degrees of freedom, $df = n - 1$. They are always *larger* than the matching
$z^{*}$ for small samples and shrink toward $z^{*}$ as $df$ grows. For example, the
row for $df = 23$ reads:

| $df$ | 90% | 95% | 99% |
|---:|---:|---:|---:|
| 23 | 1.714 | 2.069 | 2.807 |

## Symbols at a glance

| Symbol | Meaning |
|---|---|
| $n$ | sample size |
| $\sum$ | "add up all the terms" |
| $\bar{x}$ | sample mean (a statistic) |
| $\mu$ | population mean / expected value (a parameter) |
| $s$, $s^2$ | sample standard deviation and sample variance |
| $\sigma$, $\sigma^2$ | population standard deviation and variance |
| $Q_1, Q_3$ | first and third quartiles (25th, 75th percentiles) |
| $IQR$ | interquartile range, $Q_3 - Q_1$ |
| $P(A)$, $A^c$ | probability of event $A$; complement of $A$ |
| $X$, $P(x)$ | a random variable; the probability it equals the value $x$ |
| $E(X)$, $SD(X)$ | expected value and standard deviation of $X$ |
| $z$ | z-score, $(x-\mu)/\sigma$ |
| $p$, $\hat{p}$ | population proportion (parameter); sample proportion (statistic) |
| $SE$ | standard error (the SD of a sampling distribution) |
| $z^{*}$, $t^{*}$ | critical values for a chosen confidence level |
| $ME$ | margin of error |
| $df$ | degrees of freedom, $n - 1$ for one-mean inference |
| $H_0$, $H_A$ | null and alternative hypotheses |
| $\alpha$ | significance level (chosen before seeing the data) |
| $p_0$, $\mu_0$ | the value claimed under $H_0$ for a proportion or a mean |
