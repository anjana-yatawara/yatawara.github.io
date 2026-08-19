---
title: "Glossary"
---

# Glossary

Every key term introduced across the fifteen weekly units, gathered here with one
concise definition and organized alphabetically. Symbols are defined where they
appear; the [Course Formula Sheet](formulas.md) collects the matching formulas.

## A

- **addition rule (disjoint)** — For disjoint events, $P(A \text{ or } B) = P(A) + P(B)$.
- **addition rule (general)** — For any two events, $P(A \text{ or } B) = P(A) + P(B) - P(A \text{ and } B)$; the last term removes double-counted outcomes.
- **alternative hypothesis ($H_A$)** — The claim you suspect might be true, stated with $<$, $>$, or $\neq$.
- **approximately normal** — Close enough to bell-shaped and symmetric (mean near median, no long one-sided tail) that the Normal model gives trustworthy probabilities.
- **association** — Two categorical variables are associated when the conditional proportions of one change noticeably across categories of the other.

## B

- **bar chart** — A graph of categorical frequencies or relative frequencies as bar heights; the y-axis must start at 0 to be read honestly.
- **bias** — A sampling method's systematic tendency to miss the true population value; it does not shrink with a bigger sample.

## C

- **case (observation)** — One row of a data table; one individual or unit.
- **categorical (qualitative) variable** — A variable that sorts cases into groups: **nominal** (no natural order) or **ordinal** (a natural order).
- **Central Limit Theorem (CLT)** — For a large enough sample, the sampling distribution of a sample proportion or mean is approximately Normal, centered at the true parameter, regardless of the population's shape.
- **cluster sample** — Randomly selected whole groups (clusters), with every member of a chosen cluster included.
- **complement ($A^c$)** — The event "$A$ does not happen"; $P(A^c) = 1 - P(A)$.
- **conditional proportion** — The proportion of one variable's categories *within* a single row or column of the other.
- **confidence interval** — A range of plausible values for a parameter, built as point estimate $\pm$ margin of error; for a mean, $\bar{x} \pm t^{*}\, s/\sqrt{n}$.
- **confidence level** — The long-run success rate of the interval-building *procedure* (e.g., about 95% of 95% intervals capture the true parameter).
- **confounding variable** — A variable tangled up with both the explanatory and response variables, clouding a causal read.
- **continuous random variable** — A random variable that can take any value along a continuum, so its values cannot be listed in a table.
- **critical value ($z^{*}$ or $t^{*}$)** — The number of standard errors reached on each side of a point estimate for a stated confidence level; $z^{*}$ = 1.645 / 1.960 / 2.576 for 90% / 95% / 99%, while $t^{*}$ is read from a t-table by degrees of freedom.
- **cutoff / threshold** — The specific data value marking a probability boundary (e.g., "the score for the top 15%").

## D

- **degrees of freedom ($df$)** — For one-mean inference, $df = n - 1$; it fixes the exact shape of the t-distribution.
- **density curve** — A smooth curve for a continuous random variable where **area under the curve equals probability**; it is never negative and its total area is 1.
- **deviation** — How far a value sits from the mean, $x - \mu$; can be positive or negative.
- **discrete probability distribution** — A table of every possible value $x$ of a discrete random variable with its probability $P(x)$; always $\sum P(x) = 1$.
- **disjoint (mutually exclusive) events** — Events that cannot both happen on the same outcome, so $P(A \text{ and } B) = 0$.

## E

- **empirical rule (68–95–99.7 rule)** — For a Normal model, about 68% of values fall within 1 SD of the mean, 95% within 2 SD, and 99.7% within 3 SD.
- **event** — A subset of the sample space; something that either happens or not on a given trial.
- **expected value ($E(X)$, $\mu$)** — $\sum x \cdot P(x)$; the probability-weighted, long-run average of a random variable.
- **experiment** — A study in which researchers deliberately assign subjects to treatments.
- **explanatory variable / response variable** — The possible cause, and the outcome it might explain.

## F

- **five-number summary** — Minimum, $Q_1$, median, $Q_3$, maximum.
- **frequency** — A raw count of observations in a category.

## I

- **independent events** — Events for which knowing whether one happened gives no information about the other; then $P(A \text{ and } B) = P(A)P(B)$.
- **interquartile range (IQR)** — $Q_3 - Q_1$; the spread of the middle 50% of the data.
- **`invNorm(area, μ, σ)`** — TI-83/84 function returning the value with a given area to its left (the inverse-normal / percentile problem); matches `xqnorm()` in R.

## J

- **joint probability ($P(A \text{ and } B)$)** — The probability that both $A$ and $B$ happen.
- **joint proportion** — The proportion of *all* observations in one specific cell of a two-way table (both variables at once).

## L

- **Law of Large Numbers** — As repetitions grow, the observed relative frequency of an event settles toward its true probability.

## M

- **margin of error (ME)** — The distance an interval reaches on either side of the point estimate; $ME = (\text{critical value}) \times SE$.
- **marginal proportion** — A proportion for one variable read from a table's row or column total, ignoring the other variable.
- **mean ($\bar{x}$)** — The arithmetic average, $\sum x_i / n$; pulled toward outliers and skew.
- **median** — The middle value of sorted data; resistant to outliers and skew.
- **misleading graph** — A graph (e.g., one with a truncated y-axis) that distorts the visual comparison without changing the underlying numbers.
- **mode** — The most frequently occurring value.
- **multiplication rule (independent events)** — $P(A \text{ and } B) = P(A) \times P(B)$, valid only when the events are independent.

## N

- **normal distribution ($N(\mu, \sigma)$)** — A symmetric, unimodal, bell-shaped density curve centered at $\mu$ with spread controlled by $\sigma$.
- **`normalcdf(lower, upper, μ, σ)`** — TI-83/84 function returning the area (probability) between two cutoffs on a Normal curve; matches `xpnorm()` in R.
- **null hypothesis ($H_0$)** — The skeptical "nothing new" claim about a parameter, stated as an equality and assumed true unless the data give strong evidence otherwise.
- **null proportion ($p_0$) / null mean ($\mu_0$)** — The specific value claimed under $H_0$; $p_0$ (not $\hat{p}$) is used inside a proportion test's standard error.
- **numerical (quantitative) variable** — A variable whose values can be meaningfully averaged: **discrete** (counted) or **continuous** (measured on a scale).

## O

- **observational study** — A study in which subjects are measured, not assigned, to groups.
- **one-proportion z-interval / z-test** — Ch 6 procedures for estimating ($\hat{p} \pm z^{*}SE$) or testing ($z = (\hat{p} - p_0)/\sqrt{p_0(1-p_0)/n}$) a single population proportion.
- **one-sample t-test** — Tests $H_0: \mu = \mu_0$ using $t = (\bar{x} - \mu_0)/(s/\sqrt{n})$ with $df = n - 1$.
- **one-sided / two-sided test** — A test whose $H_A$ points in one direction ($<$ or $>$) versus either direction ($\neq$).
- **outlier** — A value below $Q_1 - 1.5\cdot IQR$ or above $Q_3 + 1.5\cdot IQR$.

## P

- **parameter** — A numerical summary of a population (usually unknown); written with Greek letters, e.g. $\mu$, $p$.
- **percentile** — The value below which a stated percentage of the data falls.
- **placebo / blinding** — A placebo is a fake treatment that looks real; blinding keeps subjects (and sometimes researchers) unaware of who received which treatment.
- **point estimate** — A single statistic used as the best guess at a parameter (e.g., $\hat{p}$ for $p$, $\bar{x}$ for $\mu$).
- **population** — The entire group a study wants to learn about.
- **population proportion ($p$)** — The true share of a population that has some trait; a parameter, usually unknown.
- **probability ($P(A)$)** — A number from 0 (never) to 1 (always) measuring how likely event $A$ is; interpreted here as a long-run relative frequency.
- **p-value** — The probability of a test statistic at least this extreme, *assuming $H_0$ is true*.

## Q

- **quartiles ($Q_1$, $Q_3$)** — The 25th and 75th percentiles.

## R

- **random assignment** — Randomly deciding which treatment each subject receives; distinct from random sampling.
- **random variable ($X$)** — A variable that assigns a number to the outcome of a random process.
- **range** — Maximum minus minimum.
- **relative frequency** — A category's count divided by the total $n$; a proportion or percent.
- **resistant (robust) statistic** — A statistic that outliers and skew barely change (median, IQR); the mean and SD are *not* resistant.

## S

- **sample** — The subset of a population actually observed.
- **sample mean ($\bar{x}$)** — The average of a sample; the point estimate of $\mu$.
- **sample proportion ($\hat{p}$)** — $x/n$, the share of a sample with a trait; the point estimate of $p$.
- **sample space ($S$)** — The complete list of possible outcomes of a process.
- **sample standard deviation ($s$)** — $\sqrt{s^2}$; the typical distance of a value from $\bar{x}$, in original units.
- **sample variance ($s^2$)** — The average squared distance from the mean, $\sum(x_i - \bar{x})^2/(n-1)$.
- **sampling distribution** — The distribution of a statistic's value across every possible sample of a given size.
- **sampling variability** — The natural tendency of a statistic to differ from sample to sample.
- **segmented (stacked) bar chart / mosaic plot** — Graphs that show conditional proportions within each category, useful for spotting association.
- **`ShadeNorm(lower, upper, μ, σ)`** — TI-83/84 draw command that shades the requested region under a Normal curve.
- **significance level ($\alpha$)** — The pre-chosen risk of a wrong rejection; commonly 0.05.
- **simple random sample (SRS)** — A sample drawn so that every possible sample of size $n$ has an equal chance of selection.
- **skewed distribution** — An asymmetric distribution with a longer tail on one side (right-skewed: mean > median).
- **standard deviation of a random variable ($\sigma$, $SD(X)$)** — $\sqrt{\sum(x - \mu)^2 P(x)}$; the typical distance an outcome falls from $\mu$.
- **standard error (SE)** — The standard deviation of a sampling distribution; $SE_{\hat{p}} = \sqrt{\hat{p}(1-\hat{p})/n}$ and $SE_{\bar{x}} = s/\sqrt{n}$.
- **standard error of the mean ($SE_{\bar{x}}$)** — $s/\sqrt{n}$; how much sample means typically vary from the true population mean.
- **standard normal distribution ($N(0,1)$)** — The Normal model with mean 0 and SD 1; what any Normal distribution becomes once standardized.
- **standardizing** — Converting a value (or a whole distribution) to z-scores so it can be compared on a common scale.
- **statistic** — A numerical summary of a sample, computed from data; written with Roman letters, e.g. $\bar{x}$, $\hat{p}$.
- **statistically significant** — The decision reached when the p-value is less than $\alpha$.
- **stratified sample** — Random sampling done separately within predefined subgroups (strata).
- **success–failure condition** — The check ($n\hat{p} \ge 10$ and $n(1-\hat{p}) \ge 10$, or $np_0 \ge 10$ and $n(1-p_0) \ge 10$ for a test) that justifies a Normal-based procedure for a proportion.
- **symmetric distribution** — Roughly a mirror image on both sides of the center.

## T

- **t-distribution** — A bell-shaped curve like the Normal but with heavier tails, used for one-mean inference when $\sigma$ is unknown; indexed by its degrees of freedom.
- **test statistic** — A standardized measure (here $z$ or $t$) of how far a sample statistic is from the value $H_0$ claims, in standard-error units.
- **`TInterval` / `T-Test`** — TI-83/84 menu items (under `STAT ▸ TESTS`) for a one-mean confidence interval and hypothesis test.
- **`t.test()` / `tsum.test()` / `zsum.test()`** — R functions for one-mean inference: `t.test()` from raw data, `tsum.test()` from summary statistics, and `zsum.test()` as the large-sample z equivalent.
- **treatment / control group** — The condition applied to a group; the control group gets no treatment (or a standard one) for comparison.
- **two-way (contingency) table** — A table cross-tabulating two categorical variables.
- **Type I error** — Rejecting a true $H_0$; occurs with probability $\alpha$ by design.
- **Type II error** — Failing to reject a false $H_0$.

## U

- **unbiased** — Describes a statistic whose sampling distribution is centered on the true parameter (it does not systematically run high or low).
- **union ("or")** — The event that *at least one* of $A$ or $B$ happens.
- **unimodal / bimodal** — A distribution with one peak, or with two peaks.

## V

- **variable** — One column of a data table; a characteristic that can vary from case to case.
- **variance ($\sigma^2$, $s^2$)** — The (probability-)weighted average of squared deviations; its square root is the standard deviation.

## W

- **weighted average** — An average in which some values count more because they are multiplied by a weight (e.g., a probability) before summing.
- **which-test decision language** — The habit of reading a scenario for its variable type (categorical / numerical) and its verb (estimate / test) before choosing a procedure.

## Z

- **z-score** — $z = (x - \mu)/\sigma$; how many standard deviations a value is above (positive) or below (negative) the mean.
- **z-table** — A printed table of cumulative areas $P(Z < z)$ under the standard Normal curve, indexed by $z$ to two decimals.
