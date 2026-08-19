---
exports:
  - format: pdf
    template: ../_templates/csub-latex
title: "Which Test Should I Use?"
subtitle: "MATH 2200 — a decision guide from data to procedure"
---

The hardest part of inference is usually *choosing the procedure*, not running
it. This guide walks you from a description of your data to the exact test — and
to the `mosaic`/`BSDA` function that performs it. It uses the same formula
interface, `goal(y ~ x, data = D)`, as the rest of the course, so once the guide
names your test you already know how to call it.

:::{tip} Three questions decide almost everything
1. **What is the response variable?** *Numerical* (a number you average) or
   *categorical* (a label/category)? Or are you relating **two numerical
   variables** (an *association*)?
2. **How many groups are you comparing?** One, two, or three-or-more?
3. **Are the measurements paired?** (Same subjects measured twice, or matched
   pairs — only relevant for two numerical groups.)

Answer those three and the table below names your test.
:::

---

## 1. The master decision table

| Response | # groups | Paired? | Procedure | R function (`mosaic` / `BSDA`) |
|---|---|---|---|---|
| **Categorical** (binary) | 1 | — | One proportion (z) | `prop.test(x, n, p = )` (or `binom.test`) |
| **Categorical** (3+ categories) | 1 | — | Chi-square goodness of fit | `chisq.test(tally(~ var, data = D), p = ...)` |
| **Categorical** (binary) | 2 | — | Two proportions (z) | `prop.test(c(x1, x2), c(n1, n2))` |
| **Categorical × categorical** | 2 vars | — | Chi-square independence | `xchisq.test(tally(~ y + x, data = D))` |
| **Numerical** | 1 | — | One-sample t | `t.test(~ y, data = D, mu = )` — or `tsum.test()` from summary stats |
| **Numerical** | 2 | **No** | Two-sample (independent) t | `t.test(y ~ group, data = D)` |
| **Numerical** | 2 | **Yes** | Paired t | `t.test(after, before, paired = TRUE)` |
| **Numerical** | 3+ | — | One-way ANOVA (F) | `anova(aov(y ~ group, data = D))` |
| **Two numerical** (association) | — | — | Correlation / linear regression | `cor(y ~ x, data = D)` / `lm(y ~ x, data = D)` |

Reading the whole table top to bottom is itself the decision procedure: find the
row that matches your response type, number of groups, and pairing, and the last
column is the call to make.

---

## 2. Decision flow, in words

Follow the branches in order.

**Step 1 — Response type?**

- **Numerical** (e.g. PM2.5 level, yield per acre) $\rightarrow$ go to Step 2A.
- **Categorical** (e.g. yes/no, crop type, region) $\rightarrow$ go to Step 2B.
- **Relating two numerical variables** (does $y$ move with $x$?) $\rightarrow$
  **correlation / regression**, `lm(y ~ x, data = D)`. Done.

**Step 2A — Numerical: how many groups?**

- **One group**, comparing its mean to a fixed value $\rightarrow$ **one-sample t**,
  `t.test(~ y, data = D, mu = )` (or `tsum.test()` from summary statistics).
- **Two groups** $\rightarrow$ are they **paired** (same subjects twice / matched)?
  - Paired $\rightarrow$ **paired t**, `t.test(after, before, paired = TRUE)`.
  - Not paired $\rightarrow$ **two-sample t**, `t.test(y ~ group, data = D)`.
- **Three or more groups** $\rightarrow$ **one-way ANOVA**,
  `anova(aov(y ~ group, data = D))`.

**Step 2B — Categorical: how many variables/groups?**

- **One categorical variable, binary** (two outcomes), one group $\rightarrow$
  **one proportion**, `prop.test(x, n, p = )`.
- **One categorical variable, 3+ categories**, checking against claimed
  proportions $\rightarrow$ **goodness of fit**,
  `chisq.test(tally(~ var, data = D), p = ...)`.
- **A binary outcome compared across two groups** $\rightarrow$ **two
  proportions**, `prop.test(c(x1, x2), c(n1, n2))`.
- **Two categorical variables, testing if they are related** $\rightarrow$
  **chi-square independence**, `xchisq.test(tally(~ y + x, data = D))`.

---

## 3. Confidence interval, test, or both?

The table picks the *procedure*; you still decide what you want from it:

- A **confidence interval** estimates the parameter ("how big is the
  difference?"). Use it when the goal is a *range of plausible values*.
- A **hypothesis test** weighs evidence against a specific claim ("is there any
  difference at all?"). Use it when the goal is a *yes/no decision* with a
  p-value.

The `t.test`, `prop.test`, and `BSDA` `*sum.test` functions report **both** by
default — the printout gives you the test decision *and* the matching interval.
For a regression or ANOVA model, read the interval with `confint(model)`.

---

## 4. Worked routing examples

:::{note} Example A — "Is average daily PM2.5 above the 35 µg/m³ standard?"
Response is **numerical** (PM2.5), **one group**, compared to a fixed value
(35). $\rightarrow$ **one-sample t**.
```r
t.test(~ daily_mean, data = air, mu = 35, alternative = "greater")
# only summary stats on hand? use BSDA:
tsum.test(mean.x = 36.2, s.x = 8.1, n.x = 40, mu = 35, alternative = "greater")
```
:::

:::{note} Example B — "Did almond yield differ between two years?"
Response is **numerical** (yield), **two groups** (the two years). If the same
fields are measured both years, the data are **paired**; if they are different
samples, they are **independent**.
```r
# paired (same fields both years):
t.test(yield_2024, yield_2023, paired = TRUE)
# independent (different samples):
t.test(yield_per_acre ~ year, data = crops)
```
:::

:::{note} Example C — "Do PM2.5 averages differ across the county's monitoring sites?"
Response is **numerical**, **three or more groups** (the sites). $\rightarrow$ **ANOVA**.
```r
anova(aov(daily_mean ~ site_name, data = air))
```
:::

:::{note} Example D — "Is the share of high-burden tracts different in Kern vs. the rest of the state?"
Response is **categorical/binary** (high-burden: yes/no) compared across
**two groups** (Kern vs. state). $\rightarrow$ **two proportions**.
```r
# x = high-burden counts, n = tracts in each area:
prop.test(c(x_kern, x_state), c(n_kern, n_state))
```
:::

:::{note} Example E — "Is crop category related to region of the county?"
**Two categorical variables** (crop category, region). $\rightarrow$ **chi-square
independence**.
```r
xchisq.test(tally(~ category + region, data = crops))
```
:::

---

## 5. Before you trust any result — check the conditions

Every procedure assumes something. Here is the short version; the chapter that
introduces each test lists the exact conditions for your case.

| Procedure | Key conditions |
|---|---|
| One / two proportions | Independence; **success–failure** (≥ 10 successes *and* ≥ 10 failures, in each group) |
| Goodness of fit / independence | Independence; every **expected count ≥ 5** |
| One / two / paired means (t) | Independence; population roughly Normal **or** $n \ge 30$ (for paired, the *differences* are Normal) |
| ANOVA (F) | Independence; roughly Normal within groups; **comparable spreads** (largest SD < ~2× smallest) |
| Correlation / regression | **Linearity**; independent, roughly Normal residuals with constant spread |

If a condition fails, the result may be misleading. The chapter that introduces
each test explains what to do (for example, a randomization or bootstrap
approach when Normality is doubtful — see Ch. 7 and Ch. 8).

:::{tip} When in doubt, describe before you test
Plot and summarize first: `favstats(y ~ group, data = D)` and a
`gf_boxplot(y ~ group, data = D)` (or `gf_point` for two numeric variables) show
you the response type, the number of groups, and whether the shapes and spreads
look reasonable — *before* you commit to a procedure.
:::
