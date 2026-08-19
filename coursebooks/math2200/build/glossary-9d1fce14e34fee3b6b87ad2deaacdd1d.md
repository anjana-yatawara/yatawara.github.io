---
exports:
  - format: pdf
    template: ../_templates/csub-latex
title: "Glossary"
subtitle: "MATH 2200 — key terms, in plain language"
---

This glossary defines the core vocabulary of MATH 2200. Terms are listed
**alphabetically**, each with a plain-language definition and, where one exists,
the **symbol** we use for it in this book. The first time a term appears in a
chapter it is defined there too; this page is the single place to look it up
again later. The chapter where a term is introduced is shown in parentheses.

:::{note} How to read an entry
Each entry has the form **Term — *(symbol, if any)* — definition (Ch. N)**.
Greek letters denote population *parameters*; Roman letters denote sample
*statistics* (see the convention table below). If you cannot find a term here,
check the chapter that introduces it (use the [search box](../index.md)).
:::

## Conventions for symbols

We follow the standard convention that **Greek letters denote population
*parameters* (fixed, usually unknown) and Roman letters denote sample
*statistics* (computed from data, used to estimate the parameter).**

| Quantity | Parameter (population) | Statistic (sample) |
|---|---|---|
| Mean | $\mu$ ("mu") | $\bar{x}$ ("x-bar") |
| Standard deviation | $\sigma$ ("sigma") | $s$ |
| Proportion | $p$ | $\hat{p}$ ("p-hat") |
| Correlation | $\rho$ ("rho") | $r$ |
| Regression slope | $\beta_1$ ("beta-one") | $b_1$ |

---

## A

**Addition rule** — *($P(A \cup B) = P(A) + P(B) - P(A \cap B)$)* The probability
that at least one of two events occurs; the overlap is subtracted once so it is
not double-counted. (Ch. 4)

**Alternative hypothesis** — *($H_A$)* The claim a study is trying to find
evidence *for*: that there is an effect, a difference, or a relationship. It is
the logical opposite of the null hypothesis and is chosen *before* looking at the
data. (Ch. 8)

**ANOVA (analysis of variance)** — A procedure that compares the means of
**three or more** groups with a single test, by comparing the variation
*between* the group means to the variation *within* the groups using an
$F$-statistic. (Ch. 12)

**Association** — Two variables are associated when knowing the value of one
tells you something about the likely value of the other (their conditional
distributions differ). Association is **not** the same as causation.
(Ch. 3, Ch. 13)

## B

**Bar chart** — A plot with one bar per category whose height encodes the
category's count or proportion; bars have gaps and may be reordered. (Ch. 3)

**Between-group sum of squares (SSB)** — *($\text{SSB} = \sum_j n_j(\bar{x}_j-\bar{x})^2$)*
The total squared distance of each group mean from the grand mean, weighted by
group size; the "signal" piece of variation in ANOVA. (Ch. 12)

**Bias** — A systematic tendency for a study or estimate to miss the truth in a
particular direction (for example, a survey that over-counts one group). Bias is
about *direction*, not random luck, and more data cannot fix it. (Ch. 1)

**Binomial model** — *(Binomial$(n, p)$)* The model for the number of successes
in a fixed number $n$ of independent trials, each with the same success
probability $p$. (Ch. 5)

**BINS conditions** — The four requirements for a binomial model: **B**inary
trials, **I**ndependent trials, fixed **N**umber of trials, and the **S**ame
success probability on each trial. (Ch. 5)

**Bonferroni correction** — A multiple-comparisons fix that tests each of $m$
comparisons at the stricter level $\alpha/m$. (Ch. 12)

**Bootstrap** — A method for estimating how much a statistic would vary by
**resampling, with replacement, from the data you already have**, thousands of
times; the middle 95% of the resampled statistics is a 95% bootstrap confidence
interval. (Ch. 7)

**Boxplot** — A plot of the five-number summary: a box from $Q_1$ to $Q_3$ with a
median line, whiskers to the extreme non-outlier values, and points for outliers.
(Ch. 2)

## C

**Categorical variable** — A variable that records which *category* an
observation falls into (for example, crop type or county region), as opposed to a
number you can meaningfully average. (Ch. 1)

**Causation** — A cause-and-effect relationship in which changing one variable
produces a change in another; established by a well-run randomized experiment,
not by observational data alone. (Ch. 1)

**Census** — A study that measures every unit in the population rather than a
sample. (Ch. 1)

**Central Limit Theorem (CLT)** — The result that the sampling distribution of
the sample mean (or proportion) becomes approximately **Normal**, centered at the
parameter with spread $\sigma/\sqrt{n}$, as the sample size grows — *whatever* the
shape of the population, provided observations are independent. (Ch. 6)

**Chi-square statistic** — *($\chi^2$)* A measure of how far a table of observed
category counts falls from the counts expected under a null hypothesis, computed
as $\sum (O-E)^2/E$ over all cells; larger values give stronger evidence against
the null. (Ch. 11)

**Cluster sampling** — A method that divides the population into clusters,
randomly selects whole clusters, and measures every unit within the chosen
clusters. (Ch. 1)

**Coefficient of determination** — *($R^2$)* The fraction of the variation in the
response explained by the regression line; for one predictor it equals $r$
squared. (Ch. 13)

**Coefficient of variation (CV)** — *($\text{CV}=s/\bar{x}$)* A unitless measure
of relative spread, the standard deviation divided by the mean (often reported as
a percent). (Ch. 2)

**Complement** — *($A^c$, with $P(A^c) = 1 - P(A)$)* The event that a given event
does **not** occur. (Ch. 4)

**Conditional probability** — *($P(A \mid B) = P(A \cap B)/P(B)$)* The probability
of one event given that another has occurred. (Ch. 4)

**Conditional proportion** — *($p_{j\mid i} = O_{ij}/R_i$)* The share within a
given row or column of a two-way table, using that margin's total as the
denominator. (Ch. 3)

**Confidence interval (CI)** — A range of plausible values for an unknown
parameter, of the form $\text{estimate} \pm \text{margin of error}$, built so that
a stated percentage (the **confidence level**, e.g. 95%) of intervals built this
way would capture the true parameter over many samples. (Ch. 7)

**Confidence level** — The stated percentage (e.g. 90%, 95%, 99%) of confidence
intervals, built by a given procedure, that would contain the true parameter over
many samples; higher levels give wider intervals. (Ch. 7)

**Confounding (confounding variable)** — A third variable, tied to *both* the
explanatory and the response variable, that offers an alternative explanation for
an observed association; the main reason observational studies cannot prove
causation. (Ch. 1)

**Contingency table** — See **two-way table**: a table of counts cross-classifying
observations by two categorical variables. (Ch. 3, Ch. 11)

**Continuous random variable** — *($X$)* A random variable that can take any value
in an interval, such as a measured length or weight. (Ch. 5)

**Continuous variable** — A numerical variable that can take any value in a range,
such as a measurement like PM2.5 concentration. (Ch. 1)

**Convenience sample** — A sample of whoever is easiest to reach; fast and cheap
but the most bias-prone, never a sound basis for conclusions about a population.
(Ch. 1)

**Correlation coefficient** — *($r$)* A unit-free number between $-1$ and $+1$
measuring the **strength and direction of a linear relationship** between two
numerical variables. Values near $0$ mean little *linear* association; $r$ says
nothing about non-linear patterns or causation. (Ch. 13)

**Count** — *($n_i$)* The number of observations falling in a category. (Ch. 3)

**Coverage** — The long-run proportion of confidence intervals built by a
procedure that actually contain the true parameter; for a correct 95% method the
coverage is about 95%. (Ch. 7)

**Cramér's V** — *($V = \sqrt{\chi^2 / (n \cdot \min(r-1, c-1))}$)* An effect-size
measure for a chi-square test reporting the strength of an association on a 0
(none) to 1 (perfect) scale. (Ch. 11)

**Critical value** — *($t^\star$, $z^\star$)* The multiplier in a confidence
interval ($t^\star$ from the $t$-distribution for a mean, $z^\star$ from the
Normal for a proportion) chosen so the interval is wide enough for the desired
confidence level (e.g. $z^\star = 1.96$ for 95%). (Ch. 7, Ch. 9, Ch. 10)

**Cumulative percent** — The running total of percents down a (usually sorted)
frequency table, reaching 100% at the last row. (Ch. 3)

## D

**Dataset** — An organized table of data in which each row is an observation and
each column is a variable. (Ch. 1)

**Degrees of freedom** — *($df$)* The parameter that controls the shape
(tail-heaviness) of a $t$- or chi-square distribution. For a one-sample or paired
$t$-test, $df = n-1$; for chi-square goodness-of-fit, $df = k-1$; for chi-square
independence, $df = (r-1)(c-1)$. (Ch. 10, Ch. 11)

**Density plot** — A smoothed curve that traces the shape of a numerical
distribution without depending on bin edges. (Ch. 2)

**Deviation** — *($x_i - \bar{x}$)* The signed distance of one observation from the
mean. (Ch. 2)

**Discrete random variable** — *($X$)* A random variable that takes separated,
listable values, such as a count. (Ch. 5)

**Discrete variable** — A numerical variable that takes countable, separated
values, such as a count of monitors or people. (Ch. 1)

**Disjoint (mutually exclusive) events** — *($P(A \cap B) = 0$)* Two events that
cannot both occur. (Ch. 4)

**Distribution** — The pattern of values a variable takes: which values occur, and
how often. We describe it by its shape, center, and spread. (Ch. 2)

## E

**Effect size** — A measure of the magnitude of an effect that does not depend on
sample size, such as Cohen's $d$ (the difference in means in pooled-standard-
deviation units). (Ch. 8)

**Empirical probability** — *($\hat{P}(A) = n_A/n$)* A data-based estimate of a
true probability, equal to the number of times an event occurred divided by the
number of observations. (Ch. 4)

**Empirical rule** — Another name for the **68–95–99.7 rule**. (Ch. 5)

**Eta-squared** — *($\eta^2 = \text{SSB}/\text{SST}$)* An ANOVA effect size giving
the proportion of total variation explained by the grouping. (Ch. 12)

**Event** — *($A$)* A collection of outcomes of interest; a subset of the sample
space. (Ch. 4)

**Expected count** — *($E$)* The number of observations a cell would contain if
the null hypothesis were true; for goodness-of-fit $E_i = n p_i$, for independence
$E_{ij} = R_i C_j / n$. (Ch. 11)

**Expected-count condition** — The requirement that every expected count be at
least 5 for the chi-square approximation to be trustworthy. (Ch. 11)

**Expected value** — *($E(X)$, or $\mu$)* The probability-weighted (long-run)
average value of a random variable — the balancing point of its distribution.
(Ch. 5)

**Experiment** — A study in which the researcher assigns units to treatment
conditions, ideally at random; random assignment is what lets an experiment
support a causal conclusion. (Ch. 1)

**Explanatory variable** — *($x$)* The variable suspected of *influencing* another
(also called the predictor or independent variable, plotted on the $x$-axis). Its
partner is the response variable. (Ch. 1, Ch. 13)

**Extrapolation** — Using a regression line to predict beyond the observed range
of the explanatory variable, where the linear pattern may not hold. (Ch. 13)

## F

**Family-wise error rate** — The probability of at least one false positive across
a whole family of tests; approximately $1-(1-\alpha)^m$ for $m$ independent tests.
(Ch. 12)

**F-distribution** — The right-skewed sampling distribution of the
$F$-statistic under the null hypothesis, indexed by two degrees of freedom
$(k-1,\,N-k)$. (Ch. 12)

**Fitted (predicted) value** — *($\hat{y}$)* The value the regression line gives
for a chosen $x$; the "hat" denotes an estimate, not an observation. (Ch. 13)

**Five-number summary** — The minimum, $Q_1$, median, $Q_3$, and maximum of a
numerical variable. (Ch. 2)

**Frequency table** — A table listing each category of a categorical variable with
its count, proportion, and percent. (Ch. 3)

**F-statistic** — *($F = \text{MSB}/\text{MSW}$)* The ratio of between-group to
within-group mean squares used in ANOVA; large values are evidence against equal
means. (Ch. 12)

## G

**Goodness-of-fit test** — A chi-square test of whether the counts of one
categorical variable match a hypothesized set of proportions, using $df = k-1$ for
$k$ categories. (Ch. 11)

**Grand mean** — *($\bar{x}$)* The mean of all observations pooled across every
group. (Ch. 12)

## H

**High-leverage point** — An observation with an extreme explanatory ($x$) value,
giving it the potential to pull the regression line toward itself. (Ch. 13)

**Histogram** — A graph that shows the distribution of a numerical variable by
grouping values into equal-width bins and drawing a bar for the count in each bin.
(Ch. 2)

**Homogeneity of variance** — The ANOVA condition that the groups share roughly
equal population variances; checked by the max÷min group-SD ratio (rule of thumb
$< 2$). (Ch. 12)

**Hypothesis test** — A formal procedure for deciding whether sample data give
convincing evidence against a null hypothesis, by asking how surprising the data
would be if the null were true (the **p-value**). (Ch. 8)

## I

**Independence** — Two events are independent when the occurrence of one does not
change the probability of the other ($P(A\mid B) = P(A)$, equivalently
$P(A\cap B) = P(A)P(B)$). Observations are independent when one unit's value gives
no information about another's — a core condition for almost every inference
procedure. (Ch. 4)

**Independence (categorical)** — The absence of association: every conditional
distribution in a two-way table is identical to the marginal distribution. (Ch. 3)

**Influential point** — A point whose removal noticeably changes the slope or
intercept of a regression; typically a high-leverage point that is also off the
trend. (Ch. 13)

**Intercept** — *($b_0$)* The predicted value of the response when the explanatory
variable equals zero; meaningful only if $x=0$ lies within the data range.
(Ch. 13)

**Interpolation** — Using a regression line to predict for an $x$ value that lies
*inside* the observed range of the data, where the fitted line is on firmer
ground (contrast **extrapolation**). (Ch. 13)

**Interquartile range (IQR)** — *($\text{IQR} = Q_3 - Q_1$)* The spread of the
middle 50% of the data: the third quartile minus the first quartile. Resistant to
outliers. (Ch. 2)

**Intersection** — *($A \cap B$)* The event that both of two events occur ("A and
B"). (Ch. 4)

## J

**Joint proportion** — *($p_{ij} = O_{ij}/n$)* The count in one cell of a two-way
table divided by the grand total; the share of *everything* in that combination.
(Ch. 3)

## L

**Law of Large Numbers** — The principle that an empirical probability settles
down toward the true probability as the number of observations grows. (Ch. 4)

**Least-squares regression line** — *($\hat{y}=b_0+b_1x$)* The unique straight line
that minimizes the sum of squared residuals; it always passes through the point of
averages $(\bar{x},\bar{y})$. (Ch. 13)

**LINE conditions** — The four assumptions of regression inference:
**L**inearity, **I**ndependence, **N**ormal residuals, and **E**qual spread of
residuals. (Ch. 13)

**Long-run-frequency probability** — *($\hat{P}(A) = n_A/n$)* A probability viewed
as the fraction of repetitions in which an event occurs over many repeats of a
process; estimated from data. (Ch. 4)

## M

**Margin of error (ME)** — *($\text{ME} = (\text{critical value}) \times SE$)* The
"$\pm$" part of a confidence interval: how far the interval reaches on each side of
the estimate. (Ch. 7, Ch. 9)

**Marginal proportion** — *($p_{i\cdot}=R_i/n$, $p_{\cdot j}=C_j/n$)* The share in
one category of a single variable, ignoring the other, read from a row or column
total of a two-way table. (Ch. 3)

**Mean** — *($\mu$ for a population, $\bar{x}$ for a sample)* The arithmetic
average: add the values and divide by how many there are,
$\bar{x} = \frac{1}{n}\sum x_i$. Sensitive to outliers. (Ch. 2)

**Mean difference** — *($\bar{d}$)* The average of the within-pair differences in a
paired design, the quantity a paired $t$-test tests against zero. (Ch. 10)

**Mean square between (MSB)** — *($\text{MSB}=\text{SSB}/(k-1)$)* SSB divided by its
degrees of freedom; an estimate of variance that includes any real mean
differences. (Ch. 12)

**Mean square within (MSW)** — *($\text{MSW}=\text{SSW}/(N-k)$)* SSW divided by its
degrees of freedom; an estimate of the common within-group variance. (Ch. 12)

**Median** — *($M$)* The middle value when the data are sorted (the 50th
percentile); half the observations fall below it and half above. Resistant to
outliers, so it is often preferred for skewed data. (Ch. 2)

**Missing value** — A value that was not recorded for an observation, written `NA`
("not available") in R; how and why a value is missing can itself bias results.
(Ch. 1)

**Monte Carlo simulation** — Estimating a distribution or quantity by drawing many
random samples on a computer and summarizing the results. (Ch. 6)

**Mosaic plot** — A display of a two-way table in which rectangle areas are
proportional to cell counts. (Ch. 3)

**Multiple-comparisons problem** — The inflation of the overall false-positive rate
that occurs when many hypothesis tests are run on the same data. (Ch. 12)

**Multiplication rule** — *($P(A \cap B) = P(B)\,P(A \mid B)$)* The probability that
both events occur; for independent events this simplifies to $P(A)\,P(B)$. (Ch. 4)

## N

**Nominal variable** — A categorical variable whose categories have no inherent
order, such as major or crop type. (Ch. 1)

**Non-response bias** — Bias that arises when the people who decline to participate
differ systematically from those who respond. (Ch. 1)

**Normal distribution (Normal model)** — *($N(\mu, \sigma)$)* A symmetric,
bell-shaped distribution described entirely by its mean $\mu$ and standard
deviation $\sigma$. The **68–95–99.7 rule** says about 68%, 95%, and 99.7% of
values lie within 1, 2, and 3 standard deviations of the mean. (Ch. 5)

**Null distribution** — The distribution of a test statistic across many simulated
worlds in which the null hypothesis is true; the yardstick against which the
observed statistic is compared. (Ch. 8)

**Null hypothesis** — *($H_0$)* The "nothing is going on" claim a test assumes true
while weighing the evidence: no effect, no difference, no relationship. A test
never *proves* $H_0$; it either rejects it or fails to reject it. (Ch. 8)

**Null standard error** — *($SE_0 = \sqrt{p_0(1-p_0)/n}$)* The standard error of
$\hat{p}$ computed under the null hypothesis, using the hypothesized value. (Ch. 9)

**Numerical variable** — A variable whose values are numbers it makes sense to do
arithmetic on (for example, PM2.5 concentration or yield per acre). May be
*discrete* (counts) or *continuous* (measurements). (Ch. 1)

## O

**Observation** — A single entity you have data on (also called a case or unit);
one row of a dataset, such as one Kern census tract. (Ch. 1)

**Observational study** — A study in which researchers *observe* and measure
without assigning treatments. It can reveal association but, because of possible
confounding, generally cannot establish causation. (Ch. 1)

**Observed count** — *($O$, or $O_{ij}$ for a two-way table)* The actual number of
observations falling in a category or table cell, taken directly from the data.
(Ch. 11)

**Okabe–Ito palette** — The eight-color, colorblind-safe qualitative palette used
for every figure in this book. (Ch. 3)

**Omnibus test** — A single overall test (such as the ANOVA $F$-test) of whether
any difference exists among several groups, prior to locating which groups differ.
(Ch. 12)

**One-proportion z-test** — A hypothesis test comparing a single sample proportion
to a hypothesized value using a $z$-statistic. (Ch. 9)

**One-sample t-test** — *(`t.test(~x, data=)` / `tsum.test`)* A hypothesis test (and matching
confidence interval) comparing the mean of one group of measurements to a fixed
hypothesized value $\mu_0$, using $t = (\bar{x} - \mu_0)/(s/\sqrt{n})$. (Ch. 10)

**One-sided test** — *($H_A: \mu_1 - \mu_2 > 0$ or $< 0$)* A test whose alternative
specifies a direction, legitimate only when the direction is justified before
seeing the data. (Ch. 8)

**One-way ANOVA** — ANOVA with a single categorical grouping variable (one factor)
and a numerical response. (Ch. 12)

**Ordinal variable** — A categorical variable whose categories have a natural
order, such as class standing (Freshman < Sophomore < Junior < Senior). (Ch. 1)

**Outlier** — An observation that lies unusually far from the bulk of the data; the
boxplot rule flags points beyond $Q_1 - 1.5\,\text{IQR}$ or
$Q_3 + 1.5\,\text{IQR}$. Outliers can heavily distort the mean, standard
deviation, and a regression line, so they are always investigated, never quietly
deleted. (Ch. 2, Ch. 13)

## P

**Paired t-test** — *(`t.test(~diff, data=)` on the differences)* A
one-sample $t$-test applied to the within-pair differences of matched data; used
when each observation in one group is matched one-to-one with one in the other.
(Ch. 10)

**Parameter** — A fixed (usually unknown) number describing a *population*, such as
$\mu$ or $p$, typically denoted by a Greek letter. Inference uses sample
statistics to estimate parameters. (Ch. 6)

**Percent** — *($100\,p_i$)* A proportion expressed out of 100. (Ch. 3)

**Percentile** — A value below which a stated percentage of the data fall (e.g. the
90th percentile). (Ch. 2)

**Permutation test** — Another name for a **randomization test**: the null
distribution comes from permuting (shuffling) the observed labels or values.
(Ch. 8)

**Pooled proportion** — *($\hat{p}_{\text{pool}} = (x_1+x_2)/(n_1+n_2)$)* The
combined success rate across two groups, used in the two-proportion test. (Ch. 9)

**Pooled standard error** — *($\sqrt{\hat{p}_{\text{pool}}(1-\hat{p}_{\text{pool}})(1/n_1+1/n_2)}$)*
The standard error for a two-proportion test built from the pooled proportion.
(Ch. 9)

**Population** — The entire collection of individuals or items we want to draw a
conclusion about. (Ch. 1)

**Population distribution** — The distribution of a variable's values across every
member of the population. (Ch. 6)

**Population proportion** — *($p$)* The true, usually unknown, fraction of the whole
population with a given trait. (Ch. 9)

**Pearson correlation coefficient** — See **correlation coefficient** *($r$)*: the
full name of the standard correlation measure, distinguishing it from rank-based
alternatives. (Ch. 13)

**Point of averages** — *($(\bar{x}, \bar{y})$)* The point made of the mean of $x$
and the mean of $y$; the least-squares regression line always passes through it.
(Ch. 13)

**Population slope** — *($\beta_1$)* The unknown true slope of the linear
relationship that the sample slope $b_1$ estimates. (Ch. 13)

**Positive / negative association** — Two numerical variables are *positively*
associated when large values of one tend to occur with large values of the other,
and *negatively* associated when large values of one occur with small values of
the other. (Ch. 13)

**Power** — The probability of correctly rejecting a false null hypothesis; equals
$1 - \beta$ and rises with larger samples and larger true effects. (Ch. 8)

**Practical significance** — Whether an effect is large enough to matter in the
real world, judged by the effect size and confidence interval rather than the
p-value. (Ch. 8)

**Probability** — *($P(A)$)* A number between 0 and 1 measuring how likely an event
is to occur; 0 means impossible and 1 means certain. (Ch. 4)

**Probability distribution** — *($P(X = x)$)* The list of values a discrete random
variable can take together with the probability of each. (Ch. 5)

**Proportion (relative frequency)** — *($p$ for a population, $\hat{p}$ for a
sample; $p_i = n_i/n$)* The fraction of a group that has a particular
characteristic; a value between 0 and 1. Equivalently the mean of 0/1
(success/failure) data. (Ch. 3, Ch. 9)

**p-value** — The probability of getting a result **at least as extreme** as the
one observed, *if the null hypothesis were true*. A small p-value means the data
would be surprising under $H_0$, which counts as evidence against it. It is **not**
the probability that $H_0$ is true. (Ch. 8)

## Q

**Quantile** — The value below which a stated fraction of a distribution falls; the
inverse of a cumulative probability, found in R with `qnorm`. (Ch. 5)

**Quartiles** — *($Q_1$, $Q_2 = $ median, $Q_3$)* The three values that split sorted
data into four equal-sized parts (the 25th, 50th, and 75th percentiles). (Ch. 2)

## R

**Random process** — Any action or experiment whose outcome is not known in
advance, such as rolling a die or measuring a randomly chosen day's air quality.
(Ch. 4)

**Random variable** — *($X$)* A numerical outcome of a random process, before we
know its value (for example, the result of rolling a die). Discrete if its values
are listable, continuous if it can be any value in an interval. (Ch. 5)

**Randomization test** — A test that builds the null distribution of a statistic by
repeatedly shuffling the group labels and recomputing the statistic, valid when
assignment to groups is (under the null) exchangeable. (Ch. 8)

**Range** — *($\max - \min$)* The distance from the smallest to the largest value.
(Ch. 2)

**Reproducibility** — The property that anyone re-running your code on the same data
obtains the same result; in R, achieved for random procedures by fixing the seed
with `set.seed()`. (Ch. 1)

**Repetition (rep)** — One simulated sample (draw a sample, compute the statistic)
in building a simulated sampling distribution. (Ch. 6)

**Residual** — *($e = y - \hat{y}$)* The vertical gap between an observed value and
the value a model predicts for it; what the model got "wrong" for that point.
Least squares minimizes the sum of these squared. (Ch. 13)

**Residual standard error** — *($s_e=\sqrt{\text{SSE}/(n-2)}$)* The typical size of a
residual, reported in the units of the response. (Ch. 13)

**Resistant statistic** — A summary (such as the median or IQR) whose value changes
little when a few extreme observations are added or removed. (Ch. 2)

**Response variable** — *($y$)* The outcome variable a study measures, suspected of
being influenced by the explanatory variable (plotted on the $y$-axis). (Ch. 1,
Ch. 13)

**Row total / column total / grand total** — *($R_i$, $C_j$, $n$)* The sum across a
row, down a column, or over the whole two-way table. (Ch. 3)

## S

**Sample** — The subset of the population we actually collect data on. (Ch. 1)

**Sample distribution** — The distribution of the values in a single observed
sample of size $n$. (Ch. 6)

**Sample mean** — *($\bar{x} = \frac{1}{n}\sum x_i$)* The arithmetic average of the
observations in a sample. (Ch. 6)

**Sample proportion** — *($\hat{p}$)* The fraction of "successes" in a sample of a
yes/no variable; used to estimate the population proportion. (Ch. 6, Ch. 9)

**Sample space** — *($S$)* The set of all possible outcomes of a random process.
(Ch. 4)

**Sampling bias** — A systematic tendency for a sampling method to over- or
under-represent part of the population, tilting estimates in a fixed direction that
more data cannot fix. (Ch. 1)

**Sampling distribution** — The distribution of a **statistic** (like $\bar{x}$ or
$\hat{p}$) across all possible samples of a given size $n$. Its spread is the
standard error; the CLT describes its shape. (Ch. 6)

**Scope of inference** — The limits on what a study's conclusions can claim, set by
two design choices: random assignment (allows causal claims) and random sampling
(allows generalization to a population). (Ch. 1)

**Seed** — *(`set.seed(k)`)* A fixed starting value for a random-number generator
that makes a simulation reproducible. (Ch. 1, Ch. 4)

**Segmented (stacked) bar chart** — A bar chart in which each bar is divided by a
second categorical variable; at 100% height it shows the conditional distribution
within each group. (Ch. 3)

**Significance level** — *($\alpha$)* The threshold, chosen in advance (commonly
$0.05$), below which a p-value leads us to reject the null hypothesis; also the
probability of a Type I error. (Ch. 8)

**Simple random sample** — A sample in which every unit of the population has an
equal chance of being selected. (Ch. 1)

**Simulation** — Estimating a probability (or a sampling distribution) by using a
computer to generate many repetitions of a random process and recording the
fraction in which an event occurs. (Ch. 4)

**Skew** — Asymmetry in a distribution; right- (positive-) skew has a longer tail
toward large values, left- (negative-) skew toward small values. (Ch. 2)

**Slope** — *($b_1$)* The predicted change in the response for a one-unit increase
in the explanatory variable; shares the sign of the correlation. (Ch. 13)

**Standard deviation** — *($\sigma$ for a population, $s$ for a sample)* A measure
of spread: roughly, the typical distance of a value from the mean; the square root
of the variance, in the original units. (Ch. 2)

**Standard deviation (of a random variable)** — *($\sigma$)* The square root of the
variance of a random variable, the spread in the original units. (Ch. 5)

**Standard error (SE)** — The standard deviation of a *statistic's* sampling
distribution — how much the estimate would bounce around from sample to sample.
For a mean, $SE = s/\sqrt{n}$; for a proportion, $\sqrt{p(1-p)/n}$. (Ch. 6)

**Standard error of the mean** — *($SE = s/\sqrt{n}$)* The standard deviation of the
sampling distribution of the sample mean. (Ch. 10)

**Standard error of the slope** — *($\text{SE}(b_1)=s_e/\sqrt{S_{xx}}$)* How much the
estimated slope would vary from sample to sample. (Ch. 13)

**Standard Normal** — *($N(0, 1)$)* The Normal model of z-scores, with mean 0 and
standard deviation 1. (Ch. 5)

**Standardized residual** — *($r_{ij} = (O_{ij}-E_{ij})/\sqrt{E_{ij}}$)* The signed,
scaled gap between a cell's observed and expected counts; values beyond about
$\pm 2$ flag cells that drive a significant chi-square result. (Ch. 11)

**Statistic** — A number computed from a *sample* (such as $\bar{x}$, $s$, or
$\hat{p}$), used to estimate a parameter. (Ch. 6)

**Statistical significance** — A result is statistically significant when its
p-value falls below $\alpha$, meaning it is unlikely to be chance alone. It does
not by itself mean the effect is large or important in practice. (Ch. 8)

**Stratified sampling** — A method that divides the population into groups (strata)
and randomly samples some units from every stratum, guaranteeing each group is
represented. (Ch. 1)

**Student's t-distribution** — *($t$)* A bell-shaped distribution, a little heavier
in the tails than the Normal, used for inference about a mean when the population
standard deviation is unknown and estimated by $s$. Its exact shape is set by its
**degrees of freedom**. (Ch. 10)

**Success–failure condition** — The check that there are at least 10 expected
successes *and* at least 10 expected failures ($np \ge 10$ and $n(1-p) \ge 10$)
needed for the Normal approximation to a proportion. (Ch. 6, Ch. 9)

**Sum of squared errors (SSE)** — The total of the squared residuals, the quantity
least squares minimizes. (Ch. 13)

## T

**t-distribution** — See **Student's t-distribution**. (Ch. 10)

**Test of independence** — A chi-square test of whether the two categorical
variables of a two-way table are associated, using $df = (r-1)(c-1)$ for an
$r \times c$ table. (Ch. 11)

**Test statistic** — A single number computed from the data that measures how far
the sample falls from what the null hypothesis predicts (for example, a difference
in group means $D$). (Ch. 8)

**Total sum of squares (SST)** — *($\text{SST} = \text{SSB} + \text{SSW}$)* The total
squared variation of all observations about the grand mean. (Ch. 12)

**Tukey HSD (Honest Significant Difference)** — An ANOVA-specific procedure that
adjusts all pairwise group comparisons jointly to control the family-wise error
rate. (Ch. 12)

**Two-proportion z-test** — A hypothesis test for whether two population
proportions differ. (Ch. 9)

**Two-sample t-test (Welch)** — *(`t.test(y ~ g, data=)`)* A hypothesis test
(and confidence interval) comparing the means of two independent groups without
assuming equal variances, using
$t = ((\bar{x}_1 - \bar{x}_2) - \mu_0)/\sqrt{s_1^2/n_1 + s_2^2/n_2}$. (Ch. 10)

**Two-sided test** — *($H_A: \mu_1 - \mu_2 \neq 0$)* A test whose alternative allows
a difference in either direction. (Ch. 8)

**Two-way table (contingency table)** — *($O_{ij}$)* A table of counts
cross-classifying observations by two categorical variables simultaneously.
(Ch. 3, Ch. 11)

**Type I error** — Rejecting a true null hypothesis (a "false alarm"); its
probability is $\alpha$. (Ch. 8)

**Type II error** — Failing to reject a false null hypothesis (a "miss"); its
probability is denoted $\beta$. (Ch. 8)

## U

**Unbiased estimator** — A statistic whose sampling distribution is centered on the
parameter it estimates (so on average it hits the target). (Ch. 6)

**Union** — *($A \cup B$)* The event that at least one of two events occurs ("A or
B"). (Ch. 4)

**Unpooled standard error** — The standard error for a confidence interval on a
difference of proportions, using each group's own $\hat{p}_i$. (Ch. 9)

## V

**Variable** — Any characteristic recorded for each observation in a dataset.
Variables are either numerical or categorical. (Ch. 1)

**Variance** — *($s^2$ for a sample, $\sigma^2$ for a random variable)* The average
squared deviation from the mean. For a sample,
$s^2 = \frac{1}{n-1}\sum (x_i-\bar{x})^2$; for a random variable, $E(X^2) - \mu^2$.
(Ch. 2, Ch. 5)

## W

**Wald standard error** — *($\sqrt{\hat{p}(1-\hat{p})/n}$)* The standard error of
$\hat{p}$ computed from the data, used for a confidence interval. (Ch. 9)

**Welch ANOVA** — A version of one-way ANOVA that does not assume equal group
variances, used when the homogeneity condition fails. (Ch. 12)

**Within-group sum of squares (SSW)** — *($\text{SSW} = \sum_j\sum_i (x_{ij}-\bar{x}_j)^2$)*
The total squared distance of each observation from its own group mean; the
"noise" piece of variation in ANOVA. (Ch. 12)

## Z

**z-score** — *($z = (x - \mu)/\sigma$)* How many standard deviations a value lies
above (positive) or below (negative) the mean. Standardizing lets us compare
values measured on different scales and read Normal probabilities. (Ch. 5)

## Symbol index

A quick lookup from notation to term (see the entry for the full definition).

| Symbol | Term |
|---|---|
| $\mu$ | Mean / expected value (population) |
| $\bar{x}$ | Sample mean; grand mean |
| $\sigma$, $s$ | Standard deviation (population, sample) |
| $\sigma^2$, $s^2$ | Variance (random variable, sample) |
| $p$, $\hat{p}$ | Proportion (population, sample) |
| $r$ | Correlation coefficient |
| $R^2$ | Coefficient of determination |
| $b_0$, $b_1$ | Regression intercept, slope (sample) |
| $\beta_1$ | Population slope |
| $\hat{y}$ | Fitted (predicted) value |
| $e$ | Residual |
| $H_0$, $H_A$ | Null, alternative hypothesis |
| $\alpha$ | Significance level; Type I error rate |
| $\beta$ | Type II error rate |
| $z$, $z^\star$ | z-score; z critical value |
| $t$, $t^\star$ | t-statistic; t critical value |
| $df$ | Degrees of freedom |
| $\chi^2$ | Chi-square statistic |
| $F$ | F-statistic |
| $\eta^2$ | Eta-squared (ANOVA effect size) |
| $V$ | Cramér's V |
| $Q_1$, $Q_3$ | First, third quartile |
| $E(X)$ | Expected value |
| $P(A)$ | Probability of event $A$ |
| $A^c$ | Complement of event $A$ |
| $A \cup B$, $A \cap B$ | Union, intersection |
| $SE$ | Standard error |
| $\text{ME}$ | Margin of error |
| $O$, $E$ | Observed, expected count |

## Glosario bilingüe (English $\leftrightarrow$ Español)

Para estudiantes hispanohablantes: los términos clave del curso con su traducción.
For Spanish-speaking students: the course's key terms with their Spanish translation.
(CSUB es una institución al servicio de hispanos / *Hispanic-Serving Institution*.)

| English | Español |
|---|---|
| alternative hypothesis | hipótesis alternativa |
| ANOVA (analysis of variance) | ANOVA (análisis de varianza) |
| association | asociación |
| bar chart | gráfica de barras |
| between-group variance | varianza entre grupos |
| bias | sesgo |
| binomial model | modelo binomial |
| bootstrap | bootstrap (remuestreo con reemplazo) |
| boxplot | diagrama de caja |
| categorical variable | variable categórica |
| Central Limit Theorem | Teorema del Límite Central |
| chi-square statistic | estadístico ji-cuadrada |
| complement rule | regla del complemento |
| conditional probability | probabilidad condicional |
| conditional proportion | proporción condicional |
| confidence interval | intervalo de confianza |
| confidence level | nivel de confianza |
| confounding variable | variable de confusión |
| contingency table | tabla de contingencia |
| continuous | continua |
| control group | grupo de control |
| correlation | correlación |
| count | conteo |
| critical value | valor crítico |
| dataset | conjunto de datos |
| degrees of freedom | grados de libertad |
| discrete | discreta |
| disjoint (mutually exclusive) | disjuntos (mutuamente excluyentes) |
| distribution | distribución |
| effect size | tamaño del efecto |
| event | evento |
| expected count | conteo esperado |
| expected value | valor esperado |
| experiment | experimento |
| extrapolation | extrapolación |
| F-statistic | estadístico F |
| five-number summary | resumen de cinco números |
| frequency table | tabla de frecuencias |
| goodness-of-fit test | prueba de bondad de ajuste |
| grand mean | media global |
| histogram | histograma |
| independent events | eventos independientes |
| intercept | intercepto (ordenada al origen) |
| interquartile range (IQR) | rango intercuartílico (IQR) |
| intersection | intersección |
| Law of Large Numbers | Ley de los Grandes Números |
| least squares | mínimos cuadrados |
| line of best fit | recta de mejor ajuste |
| linear regression | regresión lineal |
| margin of error | margen de error |
| marginal proportion | proporción marginal |
| mean | media |
| mean difference | diferencia de medias |
| mean square | cuadrado medio |
| median | mediana |
| missing value | valor perdido |
| nominal | nominal |
| non-response bias | sesgo por no respuesta |
| Normal model | modelo Normal |
| null distribution | distribución nula |
| null hypothesis | hipótesis nula |
| numerical variable | variable numérica |
| observation | observación |
| observational study | estudio observacional |
| observed count | conteo observado |
| ordinal | ordinal |
| outlier | valor atípico |
| p-value | valor p |
| paired t-test | prueba t pareada |
| parameter | parámetro |
| Pearson's r | r de Pearson |
| point estimate | estimación puntual |
| pooled proportion | proporción agrupada |
| population | población |
| population mean | media poblacional |
| power | potencia |
| practical significance | significancia práctica |
| prediction | predicción |
| probability | probabilidad |
| proportion | proporción |
| quartile | cuartil |
| R-squared (coefficient of determination) | R cuadrado (coeficiente de determinación) |
| random assignment | asignación aleatoria |
| random sampling | muestreo aleatorio |
| random variable | variable aleatoria |
| range | rango |
| relative frequency | frecuencia relativa |
| reproducible | reproducible |
| residual | residuo |
| resistant statistic | estadístico resistente |
| sample | muestra |
| sample mean | media muestral |
| sample proportion | proporción muestral |
| sample size | tamaño de muestra |
| sample space | espacio muestral |
| sampling distribution | distribución muestral |
| scope of inference | alcance de la inferencia |
| segmented bar chart | gráfica de barras segmentadas |
| significance level | nivel de significancia |
| simulation | simulación |
| skew (skewed) | asimetría (asimétrico) |
| slope | pendiente |
| standard deviation | desviación estándar |
| standard error | error estándar |
| statistic | estadístico |
| statistical significance | significancia estadística |
| success–failure condition | condición de éxito–fracaso |
| sum of squares | suma de cuadrados |
| t-distribution (Student's) | distribución t de Student |
| test of independence | prueba de independencia |
| test statistic | estadístico de prueba |
| two-proportion z-test | prueba z de dos proporciones |
| two-way table | tabla de doble entrada |
| Type I error | error Tipo I |
| Type II error | error Tipo II |
| union | unión |
| variable | variable |
| variance | varianza |
| within-group variance | varianza dentro de los grupos |
| z-score | puntaje z |
