---
title: "R Quick Reference"
---

# R Quick Reference

A one-page cheat sheet for the R this course actually uses: the two packages you
load, the one **formula pattern** that runs through nearly every command, and the
`mosaic`/`BSDA` functions that match each calculator procedure in the
[TI-83/84 Quick Guide](ti-guide.md). Every function here is taught step by step,
with real output, in the [R-Help lessons](../r-help/index.md) — this page is the
short version to keep open while you work. Nothing here goes beyond what MATH 1209
covers (Ch 1–7): one proportion, one mean, and the ideas that build up to them.
Remember: **R is always optional in this course** — everything below has a
calculator equivalent.

:::{tip} The one idea that unlocks most of it: the formula interface
Almost every `mosaic` command reads the same way: `goal( y ~ x , data = D)`. Read
`y ~ x` as **"y broken down by x."** A `~x` with nothing on the left means **"just
x."** The same shape describes, plots, and tests:
```r
favstats(~ length, data = KidsFeet)             # summary of one variable
favstats(length ~ sex, data = KidsFeet)          # summary by group
gf_histogram(~ length, data = KidsFeet)          # plot of one variable
gf_boxplot(length ~ sex, data = KidsFeet)        # plot y by group
t.test(~ length, data = KidsFeet, mu = 25)       # test on one variable
```
Learn the pattern once and it carries you through every R box in the book.
:::

---

## 1. Getting started, every session

```r
library(mosaic)   # summaries, plots (ggformula), simulation
library(BSDA)     # z/t tests from summary statistics (zsum.test, tsum.test)
```

That is the *entire* package list for MATH 1209, all semester (see
[R-Help Lesson 5](../r-help/L05.md)). On the **CSUB JupyterHub**
(<https://csub.jupyter.cal-icor.org/>) both are pre-installed — you install
nothing, ever.

---

## 2. Getting data into R

| Task | Code | Notes |
|---|---|---|
| Load a dataset built into `mosaic`/`mosaicData` | `data(KidsFeet)` | see the [dataset index](datasets.md) |
| Peek at structure | `str(KidsFeet)` · `glimpse(KidsFeet)` | variable names, types, first values |
| Quick summary of every column | `inspect(KidsFeet)` | numeric and categorical summaries at once |
| First / last rows | `head(KidsFeet)` · `tail(KidsFeet)` | default 6 rows |
| Dimensions | `nrow(KidsFeet)` · `ncol(KidsFeet)` | rows × columns |
| Column names | `names(KidsFeet)` | |
| Read your own CSV file (e.g., for a project) | `dat <- read.csv("myfile.csv")` | see [R-Help Lesson 6](../r-help/L06.md) for CSV, Excel, and URL imports |

---

## 3. The formula interface at a glance

| You want… | Formula shape | Example |
|---|---|---|
| one variable | `~ y` | `favstats(~ length, data = KidsFeet)` |
| a variable **by** a group | `y ~ x` | `favstats(length ~ sex, data = KidsFeet)` |
| one categorical variable | `~ y` | `tally(~ sex, data = KidsFeet)` |
| a two-way table | `~ y + x` | `tally(~ sex + biggerfoot, data = KidsFeet)` |
| a numeric response by a two-level group (the t-tests in Ch 7) | `y ~ x` | `t.test(length ~ sex, data = KidsFeet)` |

The `~` is read **"by."** You will use these shapes for the whole course.

---

## 4. Describe & visualize (Ch 1–2)

| Goal | Code | Produces |
|---|---|---|
| Numerical summary of a variable | `favstats(~ length, data = KidsFeet)` | min, Q1, median, Q3, max, mean, sd, n, missing |
| Same summary, by group | `favstats(length ~ sex, data = KidsFeet)` | one row of summaries per group |
| A single statistic | `mean(~ length, data=)` · `sd(...)` · `median(...)` · `IQR(...)` | one number (formula form) |
| Frequency table (categorical) | `tally(~ sex, data = KidsFeet)` | counts per category |
| Proportions instead of counts | `tally(~ sex, data = KidsFeet, format = "proportion")` | shares per category |
| Two-way table | `tally(~ sex + biggerfoot, data = KidsFeet)` | cross-tabulation |
| Histogram | `gf_histogram(~ length, data = KidsFeet)` | distribution of one numeric variable |
| Boxplot (optionally by group) | `gf_boxplot(length ~ sex, data = KidsFeet)` | center/spread/outliers across groups |
| Bar chart (categorical) | `gf_bar(~ sex, data = KidsFeet)` | counts per category |

`gf_*` functions (the "ggformula" family) return plots you can label and color
accessibly. [R-Help Lesson 10](../r-help/L10.md) walks through titles, axis labels,
and building an Okabe–Ito colorblind-safe palette step by step:

```r
gf_boxplot(length ~ sex, fill = ~ sex, data = KidsFeet) %>%
  gf_labs(title = "Foot length by sex", x = "Sex", y = "Length (cm)") %>%
  gf_refine(scale_fill_manual(values = c("#0072B2", "#E69F00")))
```

---

## 5. Probability & the Normal model (Ch 3–4)

| Goal | Code | Notes |
|---|---|---|
| Normal area, **with picture** | `xpnorm(115, mean = 100, sd = 15)` | prints the z-score and both tail probabilities *and* shades the curve; matches the calculator's `normalcdf` |
| Normal percentile (cutoff) | `xqnorm(0.90, mean = 100, sd = 15)` | the value with 90% below it; matches `invNorm` |
| Draw a Normal curve alone | `plotDist("norm", mean = 100, sd = 15)` | the model on its own, no shading |
| Binomial probability | `dbinom(3, size = 10, prob = 0.4)` | exactly 3 successes; `pbinom()` for "≤ 3" |
| Build a sampling distribution (simulation) | `do(1000) * mean(~ length, data = resample(KidsFeet))` | resample-and-recompute; makes the Central Limit Theorem visible |
| Flip a coin / resample at random | `rflip(10)` · `resample(x)` | the building blocks of a simulation |

`xpnorm()` is the teaching tool of the two: it *shows its work* — the z-score, both
tail areas, and the shaded curve — instead of returning a bare number. Set a seed
(`set.seed(1209)`) before any `do()` simulation so your result is reproducible; see
[R-Help Lesson 11](../r-help/L11.md).

---

## 6. Inference: one proportion, one mean (Ch 5–7)

Pick the right procedure with the [which-test guide](which-test.md). `prop.test()`
and `t.test()`/`tsum.test()` all print a decision **and** a confidence interval in
one call — you never run the interval and the test separately.

| Procedure | Code | Matches (TI-83/84) | Used in |
|---|---|---|---|
| One proportion, interval + test | `prop.test(x, n, p = 0.5)` | `1-PropZInt` / `1-PropZTest` | Ch 6 |
| One mean, raw data (t) | `t.test(~ length, data = KidsFeet, mu = 25)` | `TInterval` / `T-Test` | Ch 7 |
| One mean from summary stats, $\sigma$ unknown (t) | `tsum.test(mean.x = 24.72, s.x = 1.32, n.x = 39, mu = 25)` | `TInterval` / `T-Test` (Stats mode) | Ch 7 |
| One mean from summary stats, $\sigma$ **known** (z) | `zsum.test(mean.x = 24.72, sigma.x = 1.3, n.x = 39, mu = 25)` | `ZInterval` / `Z-Test` | Ch 5 preview |

:::{tip} Summary stats vs. raw data
When a problem hands you $\bar{x}$, $s$, and $n$ instead of a data file — the usual
case on a quiz or exam — use the `BSDA` **`sum`** tests, `tsum.test()` and
`zsum.test()`, which take the three numbers directly, exactly like typing into
`TInterval`/`T-Test` in **Stats** mode. With a full data column in R, use the
`mosaic` formula form instead, `t.test(~ x, data = D, mu = )`.
:::

:::{note} `prop.test`: your hand formula vs. R's default
By default, `prop.test()` uses the **Wilson score** interval with a continuity
correction, so its CI can differ slightly from the hand-computed **Wald** interval
($\hat p \pm z^{*}\sqrt{\hat p(1-\hat p)/n}$) from the [Course Formula
Sheet](formulas.md). Add `correct = FALSE` to match the by-hand formula and your
calculator's `1-PropZTest` more closely; the small gap otherwise is expected, not
an error. [R-Help Lesson 9](../r-help/L09.md) works through this side by side.
:::

Add `alternative = "less"` or `alternative = "greater"` to either `prop.test()` or
a t-procedure for a one-sided test — the same directional choice you make on the
calculator's `1-PropZTest`/`T-Test` screen.

---

## 7. Reading the table functions directly

When you want a raw probability or critical value without a full test (and want
to check software against the [distribution tables](tables.md)):

| Distribution | Area from a value | Value from an area |
|---|---|---|
| Normal | `pnorm(z)` | `qnorm(p)` |
| t (with `df`) | `pt(t, df)` | `qt(p, df)` |

---

## 8. Reproducibility habits

| Habit | Code | Why |
|---|---|---|
| Fix randomness | `set.seed(1209)` | same simulation result every run |
| Comment your steps | `# what this line does` | future-you and your grader thank you |
| Report your R version | `sessionInfo()` | see [R-Help Lesson 11](../r-help/L11.md) |

:::{note} If a function errors
Read the message top to bottom before changing anything — R usually names the
problem (a misspelled column, a missing `data =`, text where a number was
expected). [R-Help Lesson 12](../r-help/L12.md) is a field guide to the errors you
will meet most often, with the exact fix for each.
:::
