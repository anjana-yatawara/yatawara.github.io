---
exports:
  - format: pdf
    template: ../_templates/csub-latex
title: "R Quick Reference"
subtitle: "MATH 2200 — import, wrangle, and analyze in one place"
---

A one-page cheat sheet for the R you use all semester: loading data, the one
**formula pattern** that runs through every command, and the `mosaic` + `BSDA`
functions that carry the course's statistics — each with a **runnable one-line
example**. Every function here matches what the
[Shiny Statistics Explorer](../index.md) shows you and what the
[which-test guide](which-test.md) recommends, so the syntax is the same
everywhere you meet it.

:::{tip} The one idea that unlocks everything: the formula interface
Almost every `mosaic` command reads the same way:
`goal( y ~ x , data = D )`. Read `y ~ x` as **"y broken down by x."** A `~x`
with nothing on the left means **"just x."** The same shape describes,
plots, and tests:
```r
favstats(~ daily_mean, data = air)              # summary of one variable
favstats(daily_mean ~ site_name, data = air)    # summary by group
gf_histogram(~ daily_mean, data = air)          # plot of one variable
gf_boxplot(daily_mean ~ site_name, data = air)  # plot y by group
t.test(~ daily_mean, data = air, mu = 35)        # test on one variable
```
Learn the pattern once and it carries you from Week 2 (`favstats`) to Week 13
(`lm`).
:::

---

## 1. Getting started in every session

```r
library(mosaic)   # summaries, plots (ggformula), simulation, inference
library(BSDA)     # z/t tests from summary statistics (zsum.test, tsum.test)
```

Loading `mosaic` also loads `ggformula` (the `gf_*` plots) and `dplyr` (the
wrangling verbs in §4), so this pair of lines is all you need. On CSUB
JupyterHub these packages are pre-installed — you install nothing.

---

## 2. Importing data

The curated course datasets live in `data/processed/`. Read one into a data
frame with `read.csv()`, then pass that data frame to `data =` everywhere else.

| Task | Code | Notes |
|---|---|---|
| Load a course dataset | `air <- read.csv("data/processed/kern_airquality.csv")` | assign it a short name; use that name in `data =` |
| Read your own CSV file | `dat <- read.csv("myfile.csv")` | a relative path is looked up from your working folder |
| Peek at structure | `glimpse(air)` | variable names, types, first values |
| Quick summary of every column | `inspect(air)` | mosaic: numeric and categorical summaries at once |
| First / last rows | `head(air)` · `tail(air)` | default 6 rows |
| Dimensions | `dim(air)` · `nrow(air)` · `ncol(air)` | rows × columns |
| Column names | `names(air)` | |

See the [dataset index](../../data/INDEX.md) for what each curated file
contains.

---

## 3. The formula interface at a glance

One pattern, three jobs. Wherever you see `goal(formula, data = D)`, the same
two formula shapes apply:

| You want… | Formula shape | Example |
|---|---|---|
| one variable | `~ y` | `favstats(~ daily_mean, data = air)` |
| a variable **by** a group | `y ~ x` | `favstats(daily_mean ~ site_name, data = air)` |
| one categorical variable | `~ y` | `tally(~ category, data = crops)` |
| a two-way table | `~ y + x` | `tally(~ category + is_synthetic, data = crops)` |
| an association (two numeric) | `y ~ x` | `gf_point(yield_per_acre ~ harvested_acres, data = crops)` |

The `~` is read **"by."** You will use these five shapes for the rest of the
course.

---

## 4. Preparing data (a few dplyr verbs)

`mosaic` loads `dplyr`, whose verbs read like sentences. The pipe `|>` ("then")
passes one step's result into the next. You need only a handful:

| Verb | What it does | One-line example |
|---|---|---|
| `filter()` | keep rows that match a condition | `filter(air, pollutant == "PM2.5")` |
| `select()` | keep (or drop) columns | `select(air, date, site_name, daily_mean)` |
| `mutate()` | add or change a column | `mutate(air, over = daily_mean > 35)` |
| `arrange()` | sort rows | `arrange(air, desc(daily_mean))` |

**Piping them together** (keep PM2.5 rows, then summarise by site):

```r
air |>
  filter(pollutant == "PM2.5") |>
  favstats(daily_mean ~ site_name, data = _)
```

The `==` tests equality ("is the pollutant exactly PM2.5?"); `desc()` sorts
largest-first.

---

## 5. Describe & visualize

| Goal | Code | Produces |
|---|---|---|
| Numerical summary of a variable | `favstats(~ daily_mean, data = air)` | min, Q1, median, Q3, max, mean, sd, n, missing |
| Same summary, by group | `favstats(daily_mean ~ site_name, data = air)` | one row of summaries per group |
| A single statistic | `mean(~ daily_mean, data = air)` · `sd(...)` · `median(...)` · `IQR(...)` | one number (formula form) |
| Frequency table (categorical) | `tally(~ category, data = crops)` | counts per category |
| Proportions instead of counts | `tally(~ category, data = crops, format = "proportion")` | shares per category |
| Two-way table | `tally(~ category + is_synthetic, data = crops)` | cross-tabulation |
| Histogram | `gf_histogram(~ daily_mean, data = air)` | distribution of one numeric variable |
| Boxplot (optionally by group) | `gf_boxplot(daily_mean ~ site_name, data = air)` | center/spread/outliers across groups |
| Bar chart (categorical) | `gf_bar(~ category, data = crops)` | counts per category |
| Scatterplot | `gf_point(yield_per_acre ~ harvested_acres, data = crops)` | relationship between two numerics |
| Scatterplot + fitted line | `gf_point(yield_per_acre ~ harvested_acres, data = crops) %>% gf_lm()` | least-squares line over the points |

The `gf_*` helpers (from `ggformula`) return **ggplot** objects, so you can add
labels and a colorblind-safe palette. Define the Okabe–Ito colors once and
apply them with `gf_refine()`:

```r
okabe_ito <- c("#0072B2","#E69F00","#009E73","#CC79A7",
               "#56B4E9","#D55E00","#F0E442","#999999")
gf_boxplot(daily_mean ~ site_name, fill = ~ site_name, data = air) %>%
  gf_refine(scale_fill_manual(values = okabe_ito))
```

---

## 6. Probability, the Normal model & simulation

| Goal | Code | Notes |
|---|---|---|
| Normal area, **with picture** | `xpnorm(42, mean = 30, sd = 8)` | prints the z-score and both tail probabilities *and* shades the curve; add `lower.tail = FALSE` for the upper tail |
| Normal percentile (cutoff) | `xqnorm(0.95, mean = 30, sd = 8)` | the value with 95% below it |
| Draw a Normal curve | `plotDist("norm", mean = 30, sd = 8)` | the model on its own |
| Binomial probability | `dbinom(3, size = 10, prob = 0.4)` | exactly 3 successes; `pbinom()` for "≤ 3", `xpbinom()` draws it |
| Build a sampling distribution | `do(1000) * mean(~ daily_mean, data = resample(air))` | resample-and-recompute; the CLT in action |
| Flip / draw at random | `rflip(10)` · `resample(x)` · `shuffle(x)` · `sample(x)` | the building blocks of a simulation |

`xpnorm()` is the teaching tool: it *shows its work* — the z-score, the tail
areas, and the shaded curve — so you can read *why*, not just the number. Set a
seed (`set.seed(2200)`) before any `do()` simulation so your result is
reproducible.

---

## 7. Inference: tests, intervals, models

Pick the right procedure with the [which-test guide](which-test.md). Every test
below prints a decision **and** a confidence interval; pull the interval alone
with `confint(model)` or `result$conf.int`.

| Procedure | Code | Used in |
|---|---|---|
| One proportion (CI + test) | `prop.test(x = 12, n = 40, p = 0.5)` | Ch. 9 |
| Two proportions | `prop.test(c(30, 45), c(100, 120))` | Ch. 9 |
| One mean, raw data (t) | `t.test(~ daily_mean, data = air, mu = 35)` | Ch. 10 |
| One mean from summary stats (t) | `tsum.test(mean.x = 36.2, s.x = 8.1, n.x = 40, mu = 35)` | Ch. 10 |
| One mean from summary stats (z, σ known) | `zsum.test(mean.x = 36.2, sigma.x = 8, n.x = 40, mu = 35)` | Ch. 10 |
| One mean, raw data (z, σ known) | `z.test(x, mu = 35, sigma.x = 8)` | Ch. 10 |
| Two means, independent (Welch t) | `t.test(active_minutes ~ group, data = fit)` | Ch. 10 |
| Paired means | `t.test(after, before, paired = TRUE)` | Ch. 10 |
| Chi-square goodness of fit | `chisq.test(tally(~ category, data = crops), p = rep(1/5, 5))` | Ch. 11 |
| Chi-square independence (shows expected) | `xchisq.test(tally(~ sex + bmi_who, data = nhanes))` | Ch. 11 |
| One-way ANOVA (F) | `anova(aov(daily_mean ~ site_name, data = air))` | Ch. 12 |
| Correlation | `cor(yield_per_acre ~ harvested_acres, data = crops)` | Ch. 13 |
| Linear regression (coefficient table) | `msummary(lm(yield_per_acre ~ harvested_acres, data = crops))` | Ch. 13 |

:::{tip} Summary stats vs. raw data
When a problem hands you $\bar{x}$, $s$, and $n$ instead of a data file, use the
`BSDA` **`sum`** tests — `tsum.test()` (t) and `zsum.test()` (z) — which take the
three numbers directly. With a data frame, use the mosaic formula form
(`t.test(~ x, data = D)`).
:::

:::{note} `prop.test`: Wilson vs. Wald
By default `prop.test()` uses the **Wilson** interval with a continuity
correction, so its CI can differ slightly from the hand-computed **Wald**
interval (`p̂ ± z*·SE`) the chapter derives. To match the by-hand formula, add
`correct = FALSE`; the small gap is expected and is discussed in Ch. 9.
:::

`xchisq.test()` prints the observed **and** expected counts with residuals —
exactly the table Ch. 11 teaches you to read. `msummary()` prints the
coefficient table (estimate, SE, t, p) plus $R^2$.

---

## 8. Reading the table & distribution functions directly

When you need a raw probability or critical value (and want to check software
against the [distribution tables](tables.md)):

| Distribution | Area from a value | Value from an area |
|---|---|---|
| Normal | `pnorm(z)` | `qnorm(p)` |
| t (with `df`) | `pt(t, df)` | `qt(p, df)` |
| Chi-square | `pchisq(x, df, lower.tail = FALSE)` | `qchisq(1 - a, df)` |
| F | `pf(F, df1, df2, lower.tail = FALSE)` | `qf(1 - a, df1, df2)` |
| Binomial | `pbinom(k, size = n, prob = p)` | `qbinom(p, size = n, prob = p)` |

---

## 9. Reproducibility habits

| Habit | Code | Why |
|---|---|---|
| Fix randomness | `set.seed(2200)` | same simulation result every run |
| Comment your steps | `# what this line does` | future-you and your grader thank you |
| Keep raw data read-only | load, then `mutate()` into a new object | never overwrite the original |
| Report your R version | `sessionInfo()` | makes results reproducible by others |

:::{note} If a function errors
Read the message top to bottom before changing anything — R usually names the
problem (a misspelled column, a missing `data =`, text where a number was
expected). Two of the most common fixes: check the column name with
`names(air)`, and make sure the variable is on the correct side of the `~`.
:::
