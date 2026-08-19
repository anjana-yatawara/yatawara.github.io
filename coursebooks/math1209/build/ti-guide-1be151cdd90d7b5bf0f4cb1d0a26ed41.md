---
title: "TI-83/84 Quick Guide"
---

# TI-83/84 Quick Guide

This guide collects every TI-83/84 keystroke sequence used across MATH 1209 in one
place, grouped by the kind of task. Menu keys are shown in `MONOSPACE`; the symbol ▸
means "then choose." Bring a TI-83/84 (or the equivalent your instructor names) with
fresh batteries — phone calculators are not allowed on quizzes or exams. Each
procedure pairs with a formula on the [Course Formula Sheet](formulas.md) and an R
function in the weekly units.

## Entering and clearing data (every week)

You put data into a **list** (`L1`, `L2`, …) before almost any calculation.

1. Press `STAT`, then choose **1: Edit**.
2. Move the cursor into `L1` and type each value, pressing `ENTER` after every entry.
3. To empty a list first, move the cursor onto the list *name* (e.g., `L1`) at the top
   and press `CLEAR`, then `ENTER`. Do **not** press `DEL` — that deletes the whole
   list column instead of emptying it.

## Numerical summaries: `1-Var Stats`

**Use when** you need the mean, standard deviation, or five-number summary of a data
set (Ch 2).

1. Enter the data in `L1` (above).
2. `STAT` ▸ `CALC` ▸ **1: 1-Var Stats** ▸ `L1` ▸ `ENTER`.
3. Read the screen: $\bar{x}$ = mean; `Sx` = **sample** standard deviation (this is
   the $s$ you want — ignore `σx`, the population version); `n` = sample size. Press
   the down arrow `▼` to reach `minX`, `Q1`, `Med`, `Q3`, `maxX` — the five-number
   summary.

**Weighted version — expected value $E(X)$ and $SD(X)$ (Ch 4–5).** Put the values in
`L1` and their probabilities $P(x)$ in `L2`, then run `STAT` ▸ `CALC` ▸
**1-Var Stats** `L1,L2` (type the comma before `L2`). The calculator reads `L2` as
weights, so the reported $\bar{x}$ **is** $E(X)$ and `σx` **is** $SD(X)$.

## Pictures: `STAT PLOT` (histogram and boxplot)

**Use when** you want to see the shape of a distribution (Ch 2).

1. Enter data in `L1`.
2. `2ND` ▸ `Y=` (this is `STAT PLOT`) ▸ **Plot1** ▸ turn **On**.
3. Choose the **histogram** icon, or the **modified boxplot** icon (which shows
   outliers as separate dots). Set `Xlist: L1`.
4. `ZOOM` ▸ **9: ZoomStat** auto-fits the window ▸ `GRAPH`.

## Normal-model areas and cutoffs (Ch 4)

All three live under `2ND` ▸ `VARS` (this is the `DISTR` menu).

### `normalcdf(lower, upper, μ, σ)` — find an area (probability)

**Use when** the question asks "what proportion / probability is below, above, or
between" given values.

- "At most" (left tail): use `-1E99` as the lower bound. Get `-1E99` by pressing
  `(-)` `2ND` `,` (the `EE` key) `99`.
- "At least" (right tail): use `1E99` as the upper bound.
- Example: $P(X < 7)$ for $N(10, 1.8)$ → `normalcdf(-1E99, 7, 10, 1.8)` → `0.0478`.
- Example: $P(8 < X < 12)$ → `normalcdf(8, 12, 10, 1.8)` → `0.7335`.

### `invNorm(area, μ, σ)` — find a cutoff value

**Use when** the question gives a percentage and asks for the value at that boundary.
It expects the area **to the left**.

- For a "top $p$%" cutoff, enter `invNorm(1 - p, μ, σ)`.
- Example: the top-15% cutoff for $N(72, 9)$ → `invNorm(0.85, 72, 9)` → `81.33`.
- Example: the bottom-10% cutoff → `invNorm(0.10, 72, 9)` → `60.47`.

### `ShadeNorm(lower, upper, μ, σ)` — draw the shaded region

Found under `2ND` ▸ `VARS` ▸ `DRAW`. It draws the curve with the requested region
shaded and prints the area — use it to picture any `normalcdf` call before trusting
the number.

## Inference for a proportion (Ch 6)

Both are under `STAT` ▸ `TESTS`. Enter `x` = number of successes (a whole count), not
the proportion.

### `1-PropZInt` — confidence interval for $p$

**Use when** you are *estimating* an unknown proportion.

`STAT` ▸ `TESTS` ▸ **A: 1-PropZInt** ▸ enter `x`, `n`, and `C-Level` ▸ `Calculate`.
The screen reports the interval, $\hat{p}$, and `n`.

### `1-PropZTest` — hypothesis test for $p$

**Use when** you are *testing* a claim about a proportion.

`STAT` ▸ `TESTS` ▸ **5: 1-PropZTest** ▸ enter the claimed `p0`, `x`, `n`, choose the
alternative (`≠p0`, `<p0`, or `>p0`) ▸ `Calculate`. The screen reports `z`, the
p-value, and $\hat{p}$.

## Inference for a mean (Ch 5, 7)

Under `STAT` ▸ `TESTS`. Choose **Stats** to type in $\bar{x}$, `Sx`, `n`, or **Data**
to read from a list in `L1`.

### `ZInterval` — mean interval when $\sigma$ is known

**Use when** the population standard deviation $\sigma$ is given (mostly a Ch 5
preview). `STAT` ▸ `TESTS` ▸ **7: ZInterval** ▸ enter $\sigma$, $\bar{x}$ (or the
data list), `n`, and `C-Level` ▸ `Calculate`.

### `TInterval` — confidence interval for a mean $\mu$

**Use when** you are *estimating* a mean and $\sigma$ is unknown (the usual case).
`STAT` ▸ `TESTS` ▸ **8: TInterval** ▸ **Stats** ▸ enter $\bar{x}$, `Sx`, `n`, and
`C-Level` ▸ `Calculate`. It reports the interval directly.

### `Z-Test` — mean test when $\sigma$ is known

`STAT` ▸ `TESTS` ▸ **1: Z-Test** ▸ **Stats** ▸ enter $\mu_0$, $\sigma$, $\bar{x}$,
`n`, choose the alternative ▸ `Calculate`. Reports `z` and the p-value.

### `T-Test` — hypothesis test for a mean $\mu$

**Use when** you are *testing* a claim about a mean and $\sigma$ is unknown.
`STAT` ▸ `TESTS` ▸ **2: T-Test** ▸ **Stats** ▸ enter $\mu_0$ (the null value),
$\bar{x}$, `Sx`, `n`, choose the alternative (`≠`, `<`, or `>`) ▸ `Calculate`. Reports
`t`, `df`, and the p-value.

## Which procedure? A cross-reference

Reading a problem for its variable type (**categorical** → a proportion;
**numerical** → a mean) and its verb (**estimate** → an interval; **test** → a
hypothesis test) points you at the right menu item. This table maps each task to its
TI menu and its R equivalent from the weekly units.

| Task | TI-83/84 | R (`mosaic` / `BSDA`) |
|---|---|---|
| Normal area (probability) | `2ND VARS (DISTR)` ▸ `normalcdf(lower, upper, μ, σ)` | `xpnorm(q, mean=, sd=)` |
| Normal percentile (inverse) | `invNorm(area, μ, σ)` | `xqnorm(p, mean=, sd=)` |
| One-proportion interval | `STAT ▸ TESTS ▸ 1-PropZInt` | `prop.test(x, n, conf.level=)$conf.int` |
| One-proportion test | `STAT ▸ TESTS ▸ 1-PropZTest` | `prop.test(x, n, p=, alternative=, correct=FALSE)` |
| One-mean interval | `STAT ▸ TESTS ▸ TInterval` | `tsum.test(mean.x=, s.x=, n.x=, conf.level=)$conf.int` |
| One-mean test | `STAT ▸ TESTS ▸ T-Test` | `tsum.test(mean.x=, s.x=, n.x=, mu=)` |

In R, adding `correct = FALSE` to `prop.test()` skips the continuity correction it
applies by default, so its p-value matches the TI's `1-PropZTest` and the by-hand
formula.

## A note on standard errors

There is no dedicated menu for a standard error by itself — key the formula in on the
home screen, watching your parentheses so the square root wraps the *whole* fraction.

- $SE_{\hat{p}}$ with $\hat{p} = 0.55$, $n = 50$:
  `2ND [√] ( .55 × ( 1 − .55 ) ÷ 50 ) ENTER`.
- $SE_{\bar{x}}$ with $\sigma = 1.10$, $n = 30$: `1.10 ÷ 2ND [√] ( 30 ) ENTER`.

The inference menus above (`1-PropZInt`, `TInterval`, and so on) compute the standard
error for you automatically once you enter the summary numbers.
