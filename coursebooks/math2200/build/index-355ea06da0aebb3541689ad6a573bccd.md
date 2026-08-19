---
exports:
  - format: pdf
    template: ../_templates/csub-latex
title: "Data and Study Design"
subtitle: "Chapter 1 — Where statistics begins"
kernelspec:
  name: ir
  display_name: R
---

```{code-cell} r
:label: ch01-setup
:tags: [remove-cell]

# Chapter 1 setup. Everything the chapter computes comes from the curated files
# in data/processed/, read with read.csv(), so the book, the Shiny Explorer, and
# the labs all read the same numbers from the same files.
library(mosaic)          # favstats(), tally(), the gf_* plots, formula grammar
library(BSDA)            # summary-stat z/t tests used from Ch. 6 on
library(ggplot2)         # figures

# Make the curated data shelf reachable no matter which folder the build runs
# from: walk up until data/processed is found, then read from there.
if (!dir.exists("data/processed")) {
  .d <- getwd()
  while (!dir.exists(file.path(.d, "data", "processed")) && dirname(.d) != .d) .d <- dirname(.d)
  if (dir.exists(file.path(.d, "data", "processed"))) setwd(.d)
}

# Okabe-Ito colorblind-safe palette (CLAUDE.md Part 1, accessibility).
okabe_ito <- c(
  blue       = "#0072B2",
  orange     = "#E69F00",
  green      = "#009E73",
  vermillion = "#D55E00",
  skyblue    = "#56B4E9",
  yellow     = "#F0E442",
  purple     = "#CC79A7",
  grey       = "#999999"
)

# One consistent figure theme for the whole chapter.
theme_set(theme_minimal(base_size = 13))

knitr::opts_chunk$set(
  comment = "#>",
  collapse = TRUE,
  fig.align = "center",
  out.width = "85%"
)
```

(ch01-sec-hook)=
## Why study design comes first

Drive west out of downtown Bakersfield on a still August afternoon and you can
sometimes *see* the air — a brown haze pressed against the Sierra by the bowl of
the San Joaquin Valley. People who live here already know which neighborhoods
seem to carry the heaviest load. But "seems" is not evidence. How does anyone
*know*, with numbers, which Kern County communities bear the most environmental
burden — and how much trust those numbers deserve?

That question is where statistics begins, and it begins with **how the data were
collected**, long before any average is computed.

California's environmental-screening tool, **CalEnviroScreen 4.0**, scores every
census tract in the state for cumulative pollution burden and population
vulnerability. A **census tract** is just a small, stable neighborhood-sized area
the U.S. Census Bureau draws (usually a few thousand people) so that places can be
compared on equal footing. We have the Kern County slice of this tool on our data
shelf as `kern_calenviroscreen`: one row for each of **151 census tracts**, each
described by **40 variables** (a "variable" is one recorded characteristic, like
population or pollution level — defined fully in §1.1). The codebook
`data/codebooks/kern_calenviroscreen.md` lists them all.

```{code-cell} r
:label: ch01-hook

ces <- read.csv("data/processed/kern_calenviroscreen.csv")

# Each tract's CalEnviroScreen percentile ranks it against ALL California
# tracts; higher = more burdened. How many Kern tracts land above the
# statewide 75th percentile (the top quarter of the state)?
n_scored   <- sum(!is.na(ces$ces_percentile))
n_high     <- sum(ces$ces_percentile > 75, na.rm = TRUE)
pct_high   <- 100 * n_high / n_scored

c(tracts_scored = n_scored, in_top_quarter = n_high,
  percent = round(pct_high, 1))
```

Of the **147 Kern tracts** that CalEnviroScreen could score, **73 — nearly half
(49.7%)** — sit in the *top quarter* of the entire state for cumulative
environmental burden (computed above from `kern_calenviroscreen`; the codebook
lists `ces_percentile` as the statewide percentile, higher = more burdened). If
Kern were just an average county, you would expect about a quarter of its tracts
in the statewide top quarter. Half is a striking number — and the only reason we
can state it at all is that someone defined a *tract*, chose which pollutants to
measure, decided how to combine them into a score, and recorded which value
belonged to which place.

This chapter is about those decisions. Before you can summarize data (Chapter 2),
visualize it (Chapter 3), or run a single test (Chapters 8–13), you need to know
**what the data are, how they were gathered, and what questions they can honestly
answer.** Get the design wrong and every later calculation, however elegant, is
built on sand.

:::{note} A note on the datasets in this book
Every number you see in this chapter was computed by the R code shown, from real
or plainly labeled simulated files in `data/processed/`. `kern_calenviroscreen`
is **real** government data (OEHHA, CalEnviroScreen 4.0). When we use a
*simulated* dataset for teaching, its name ends in `_sim` and we say so out loud.
We never publish a number we did not compute.
:::

(ch01-sec-objectives)=
## Learning objectives

By the end of this chapter you will be able to:

1. **Define** population, sample, observation, variable, and variable type
   (numerical vs. categorical; discrete/continuous; ordinal/nominal) and
   **identify** each in a real Kern dataset.
2. **Distinguish** observational studies from experiments and explain how study
   design constrains the **scope of inference** (association vs. causation).
3. **Identify** sources of statistical **bias** (sampling, non-response,
   confounding) in a described study and explain their effect on conclusions.
4. **Classify** sampling strategies (simple random, stratified, cluster,
   convenience) and **select** an appropriate one for a stated question.
5. **Load** a dataset into R and **inspect** its structure (`glimpse`, variable
   types, dimensions, missingness).

:::{note} At a glance
~30 min to read · 4 sections (data basics · study design · sampling & bias ·
missing data) · 4 worked examples · 30 practice problems. New R this chapter:
`read.csv()` to load a file, `dim()`/`glimpse()`/`str()` to inspect it,
`is.na()`/`colSums()` to find missing values, and `set.seed()` for reproducible
random sampling.
:::

(ch01-sec-data-basics)=
## 1.1 Data, observations, and variables

### Intuition

A **dataset** is just an organized table. Picture a spreadsheet: each **row** is
one *thing* you measured, and each **column** is one *characteristic* you
recorded about it. In `kern_calenviroscreen`, each row is a census tract and each
column is something measured about that tract — its population, its PM2.5 level,
its poverty rate.

The vocabulary is worth getting right once, because the whole course uses it:

- An **observation** (or *case*, or *unit*) is a single entity you have data on —
  here, one census tract. It is a **row**.
- A **variable** is a single characteristic recorded for every observation — here,
  PM2.5 concentration or total population. It is a **column**.
- The **population** is the entire collection of units you want to learn about
  (every census tract in Kern County).
- A **sample** is the subset you actually have data on. When you have the whole
  population — as we nearly do here — there is no sampling, and the numbers
  describe the county directly.

### Variable types

Variables come in two big families, and almost every choice you make later —
which graph, which summary, which test — depends on which family a variable is in.

- A **numerical variable** records a number you can do arithmetic on (averaging it
  means something). PM2.5 concentration (µg/m³) is numerical. Numerical variables
  are **continuous** if they can take any value in a range (a measurement like
  concentration) or **discrete** if they come in countable jumps (a count like
  "number of monitors").
- A **categorical variable** records which *group* an observation falls into.
  Crop type ("ALMONDS", "GRAPES") is categorical. A categorical variable is
  **ordinal** if its categories have a natural order (class standing: Freshman <
  Sophomore < Junior < Senior) and **nominal** if they do not (major, county
  region).

A useful test: if averaging the values would be nonsense, the variable is
categorical. The "average major" is meaningless; the average PM2.5 is not.

### R

Loading a dataset and reading off its structure is the first real R skill in this
course. Every curated dataset lives as a `.csv` file in `data/processed/`, and
you read one into a data frame with `read.csv()` — the book, the Shiny app, and
the labs all reach the data the same way.

```{code-cell} r
:label: ch01-glimpse-demo
:tags: [skip-execution]

# Load the dataset by pointing read.csv() at its file in data/processed/:
ces <- read.csv("data/processed/kern_calenviroscreen.csv")

# How big is it? rows = observations, columns = variables:
dim(ces)            # -> 151  40

# A compact view of every column, its type, and the first few values:
dplyr::glimpse(ces)

# Base-R alternative if you have not loaded dplyr:
str(ces)
```

`dim(ces)` returns `151 40`: **151 observations (tracts) and 40 variables**
(confirmed against `kern_calenviroscreen`). `glimpse()` prints one line per
column showing its name, its type (`<dbl>` for a number, `<chr>` for text), and a
preview — your fastest way to see *what kind* of variable each column is before
you do anything with it.

:::{tip} Reading R types as variable types
In `glimpse()`/`str()` output, `<dbl>` and `<int>` columns are **numerical**;
`<chr>`, `<fct>`, and `<lgl>` columns are **categorical**. But R cannot tell you
whether a numerical-*looking* column is really a label — a tract ID stored as
digits is still categorical. Always sanity-check against the codebook in
`data/codebooks/`.
:::

:::{tip} Reading the R punctuation
A few symbols show up constantly; read them like words and the code stops looking
like hieroglyphics:

- `ces$ces_percentile` — the `$` means "the *column* named `ces_percentile` of the
  data frame `ces`." Read it "ces's ces_percentile."
- `ces[rows, cols]` — square brackets pick out **rows and columns**: the part
  before the comma chooses rows, the part after chooses columns. `ces[1:5, ]`
  (nothing after the comma) means "the first five rows, all columns."
- `dplyr::glimpse` — the `::` means "the `glimpse` function *from the* `dplyr`
  package." It is just a way to name exactly which package a function comes from.
- `!is.na(x)` — `is.na(x)` asks "is this value missing?"; the `!` in front means
  "not," so `!is.na(x)` keeps the values that are **not** missing.
:::

(ch01-sec-design)=
## 1.2 Observational studies vs. experiments

### Intuition

Here is the single most important distinction in this chapter, because it decides
what your data are *allowed to claim*.

In an **observational study**, you watch and record what is already happening; you
do **not** assign anyone or anything to a condition. CalEnviroScreen is
observational: nobody decided which tracts would have high PM2.5. We simply
recorded the pollution where it fell.

In an **experiment**, the researcher *assigns* the treatment — ideally at random.
If you randomly gave half of a group a new tutoring method and half the old one,
you ran an experiment.

Why does the distinction matter so much? Because of one word: **confounding**. A
**confounding variable** is a third variable linked to *both* of the things you
are comparing, offering an alternative explanation for any pattern you see.
Tracts with high pollution also tend to have high poverty, less green space, older
housing — any of which could be the real driver of, say, an asthma difference.
In an observational study you usually cannot untangle them.

This leads to the rule that governs honest data analysis:

> **Observational data can establish *association*. Only a well-run experiment
> can establish *causation*.** Random assignment is what breaks the link between
> the treatment and every confounder, so that a difference in outcomes can be
> credited to the treatment itself.

### Scope of inference

Two design choices set the limits — the **scope of inference** — of any study:

1. **Were units assigned at random to groups?** If yes $\rightarrow$ causal conclusions are
   on the table. If no (observational) $\rightarrow$ association only.
2. **Were units sampled at random from a population?** If yes $\rightarrow$ you can generalize
   to that population. If no $\rightarrow$ conclusions stay limited to the units you observed.

So a study can be any combination: a randomized experiment on a convenience
sample (causal, but hard to generalize), or an observational study on a random
sample (generalizable association, no causation). Name both axes before you trust
any headline.

### R

R does not decide scope of inference for you — *you* do, from how the data were
collected. But R helps you see the structure that hints at the design. Here we
peek at the simulated first-day class survey (`firstday_survey_sim`, a
**simulated** classroom dataset, not real students — note the `_sim`):

```{code-cell} r
:label: ch01-survey-structure
:tags: [skip-execution]

survey <- read.csv("data/processed/firstday_survey_sim.csv")
dim(survey)                       # 150 students x 8 variables
dplyr::glimpse(survey)

# A categorical variable's categories, with counts:
tally(~ major, data = survey)     # mosaic: a labelled count of each category
```

This is an **observational** dataset: students reported their major, work hours,
and commute; nobody assigned them. So it can reveal that, say, students who work
more *tend* to study less — an association — but it cannot prove that working
*causes* less studying, because a confounder (a demanding family situation, for
instance) could drive both.

(ch01-sec-sampling)=
## 1.3 Sampling and bias

### Intuition

Most of the time you cannot measure the whole population, so you take a
**sample** and hope it mirrors the population. The danger is **bias**: a
*systematic* tendency to miss the truth in a particular direction. Bias is not bad
luck — random samples bounce around the truth harmlessly. Bias is a tilt that
*no amount of extra data will fix*, because it is baked into how the data were
collected. Three classic sources:

- **Sampling bias** — the method systematically over- or under-represents part of
  the population. An online poll only reaches people with internet and the
  patience to click.
- **Non-response bias** — the people who *decline* to participate differ
  systematically from those who answer. If unhappy customers are likeliest to
  return a survey, satisfaction looks worse than it is.
- **Confounding** — (as above) a lurking third variable distorts an observed
  association.

A bigger biased sample is still biased; it is just *confidently* wrong. The fix is
in the **design**, not the sample size.

### Sampling strategies

When you *can* choose how to sample, four strategies appear constantly:

| Strategy | How it works | When it shines |
|---|---|---|
| **Simple random** | Every unit has an equal chance; draw at random. | The gold-standard default; needs a list of the whole population. |
| **Stratified** | Split the population into groups (*strata*), then randomly sample *within* each. | When you want to guarantee representation of each group (e.g. each county region). |
| **Cluster** | Split into groups (*clusters*), randomly choose whole clusters, measure everyone in them. | When reaching scattered units is costly (e.g. sample whole schools, then survey all students). |
| **Convenience** | Take whoever is easy to reach. | Fast and cheap — and the most bias-prone; avoid for real conclusions. |

The difference between stratified and cluster sampling trips people up: in
**stratified** sampling you sample *some* units from *every* group; in **cluster**
sampling you take *all* units from *some* groups.

:::{tip} Going deeper (optional): why the sampling method changes the *math* later
:class: dropdown
This is optional and not needed to pass the chapter. Here is the connection to the
rest of the course: the clean formulas you will meet for standard errors and
confidence intervals (Chapters 6–10) all assume a **simple random sample** of
*independent* observations. Stratified sampling usually makes an estimate *more*
precise than that baseline (you have removed between-group variation on purpose),
while cluster sampling usually makes it *less* precise (units in the same cluster
resemble each other, so each new unit adds less fresh information). The design you
choose does not just affect bias — it changes how much a sample-based estimate
bounces around, which is the engine of everything in the second half of this book.
:::

### R

A core habit of trustworthy work is **reproducibility**: anyone re-running your
code gets your result. In R, random sampling becomes reproducible when you fix the
random seed with `set.seed()` first.

```{code-cell} r
:label: ch01-sampling-demo
:tags: [skip-execution]

ces <- read.csv("data/processed/kern_calenviroscreen.csv")

# A reproducible simple random sample of 10 tracts:
set.seed(2200)                       # makes the "random" draw repeatable
idx    <- sample(nrow(ces), size = 10)
ces_10 <- ces[idx, ]
nrow(ces_10)                          # 10

# A stratified idea: sample within levels of a grouping variable.
# (Here we just illustrate the split; real stratified sampling draws
#  a fixed number from each stratum.)
ces$burden_band <- ifelse(ces$ces_percentile > 75, "high", "lower")
table(ces$burden_band, useNA = "ifany")
```

`set.seed(2200)` is the small discipline that separates a result you can defend
from one you cannot reproduce. Use it before every simulation in this course.

:::{important} Durable skill — Critical thinking: judge the data before the math
**Critical thinking starts with skepticism about where numbers come from.**
On the job, the first question a good analyst asks of any dashboard, report, or
"data-driven" claim is not *what does it say?* but *how was this collected, and
what can it honestly conclude?* A marketing team that only surveys customers who
opened an email, a city that counts complaints instead of incidents, a hiring
tool trained on whoever applied before — each can produce confident numbers that
are systematically wrong. The habit you build here — name the population, spot the
bias, separate association from causation — is the same habit that keeps a manager,
nurse, or policy analyst from acting on a misleading chart. **Tag: CT.**
:::

(ch01-sec-missing)=
## 1.4 Missing data

### Intuition

Real datasets have holes. A tract too small for a reliable estimate, a student who
skipped an "optional" survey item — these become **missing values**, written `NA`
("not available") in R. Missing data is not just a nuisance; *why* a value is
missing can itself bias your results. If small, rural tracts are likeliest to be
missing a health indicator, then dropping the missing rows quietly removes rural
places from your conclusion. Always look at *how much* is missing and *where*
before you decide what to do about it.

### R

R has one function that answers "is this missing?" — `is.na()` — and you build
everything from it. `is.na(x)` returns `TRUE`/`FALSE` for each value, and R
counts a `TRUE` as 1, so `sum(is.na(x))` is just "how many are missing?"

```{code-cell} r
:label: ch01-missing-demo
:tags: [skip-execution]

ces <- read.csv("data/processed/kern_calenviroscreen.csv")

# How many tracts are missing the headline CalEnviroScreen percentile?
sum(is.na(ces$ces_percentile))        # 4

# Missing counts for several columns at once: colSums adds up the TRUEs (the
# missing values) down each of the selected columns.
colSums(is.na(ces[c("ces_percentile", "poverty", "ling_isolation")]))
```

In `kern_calenviroscreen`, **4** tracts are missing `ces_percentile`, **4** are
missing `poverty`, and **9** are missing `ling_isolation` (linguistic isolation)
— values OEHHA suppresses for tracts too small to estimate reliably (computed
above; see the codebook's missingness notes). That is *missing-not-at-random*:
the holes cluster in small tracts, so dropping them is not harmless. Notice that
every summary in this chapter used `na.rm = TRUE` or `na.rm`-style handling on
purpose, and reported the count it dropped.

(ch01-sec-worked)=
## Worked examples

Each example walks the same path you will: **intuition $\rightarrow$ formula/definition $\rightarrow$
computation $\rightarrow$ interpretation.**

(ch01-sec-wex1)=
### Worked Example 1 — Classifying variables in a real dataset (Kern)

**Question.** In `kern_calenviroscreen`, classify each of these variables:
`tract`, `total_pop`, `pm25`, `ces_percentile`. For each, state numerical vs.
categorical and the sub-type.

**Intuition.** Ask of each column: *would averaging it mean something?* If yes,
numerical; if no, categorical. Then ask whether numbers are measurements
(continuous) or counts (discrete), and whether categories are ordered (ordinal)
or not (nominal).

**Definition recap.** Numerical = arithmetic is meaningful; categorical = labels.
Continuous = any value in a range; discrete = countable. Ordinal = ordered
categories; nominal = unordered.

**Computation / reasoning.**

```{code-cell} r
:label: ch01-wex1
:tags: [skip-execution]

str(ces[c("tract", "total_pop", "pm25", "ces_percentile")])
```

- `tract` — a census-tract **ID**. It is stored as digits, but averaging tract
  numbers is nonsense, so it is **categorical (nominal)** — a label.
- `total_pop` — a **count** of people. Numerical, and **discrete** (you cannot
  have 5,878.4 people, even though the *mean* of counts can be a decimal).
- `pm25` — a **measurement** in µg/m³. Numerical, and **continuous**.
- `ces_percentile` — a statewide percentile from 0–100. Numerical and
  effectively **continuous** (it can take many in-between values).

**Interpretation.** Two of these columns are numbers you can summarize with a mean
(Chapter 2); two are labels you summarize with counts and proportions (Chapter 3).
Misclassifying `tract` as numerical and "averaging" it would be a classic
beginner error — the codebook flags it as an `id` for exactly this reason.

(ch01-sec-wex2)=
### Worked Example 2 — Counting high-burden tracts (Kern)

**Question.** What fraction of scored Kern tracts rank above the statewide **90th**
percentile for cumulative environmental burden? Above the 75th?

**Intuition.** "Above the 90th percentile" means "in the worst-burdened 10% of all
California tracts." We count how many Kern tracts clear that bar, then divide by
the number of tracts that actually have a score (excluding the missing ones).

**Definition.** A **proportion** is $p = \dfrac{\text{count meeting the condition}}{n}$,
where $n$ ("n") is the number of non-missing observations. In plain words: count
how many cases pass the test, then divide by how many cases you actually had. A
**percent** is just that proportion multiplied by 100 ($100p$) — the same fact
written out of 100 instead of out of 1.

**Computation.**

```{code-cell} r
:label: ch01-wex2
:tags: [skip-execution]

n_scored <- sum(!is.na(ces$ces_percentile))   # 147
n_90 <- sum(ces$ces_percentile > 90, na.rm = TRUE)   # 23
n_75 <- sum(ces$ces_percentile > 75, na.rm = TRUE)   # 73
c(p_above_90 = round(100 * n_90 / n_scored, 1),
  p_above_75 = round(100 * n_75 / n_scored, 1))
```

Working it by hand: $n = 147$ scored tracts; $23$ exceed the 90th percentile, so
$p = 23/147 = 0.156$, i.e. **15.6%**; and $73$ exceed the 75th, so
$73/147 = 0.497$, i.e. **49.7%** (all computed from `kern_calenviroscreen`).

**Interpretation.** About **1 in 6** Kern tracts (15.6%) is in the *worst-burdened
10%* of the entire state, and about **half** are in the worst-burdened 25%. In a
"typical" county you would expect 10% and 25%. Kern is over-represented at the
high-burden end — a real finding, and one we can only state because the data were
collected the same way for every tract in California, making the percentile
comparison fair.

(ch01-sec-wex3)=
### Worked Example 3 — Observational vs. experiment, and scope of inference

**Question.** A researcher notices that, across Kern tracts, higher PM2.5 goes with
higher asthma ED-visit rates, and concludes "PM2.5 *causes* asthma visits in
Kern." Evaluate the claim using study-design vocabulary.

**Intuition.** Ask the two scope-of-inference questions: was there random
*assignment* ($\rightarrow$ causation possible) and random *sampling* ($\rightarrow$ generalization
possible)?

**Roadmap.** We will check the claim in four short steps: (1) was there random
assignment? (2) is there a believable confounder? (3) was there random sampling?
(4) put it together into the strongest *honest* conclusion. Take them one at a
time.

**Reasoning.**

- **Assignment?** No one assigned tracts to "high PM2.5" or "low PM2.5." This is an
  **observational study**, so it can show **association**, not causation.
- **Confounding?** Yes, plausibly. High-PM2.5 tracts also tend to have higher
  poverty (the median Kern poverty rate is **51.9%** below 2× the federal poverty
  level, from `kern_calenviroscreen`), older housing, and less access to care —
  any of which could drive asthma visits. PM2.5 and these confounders are tangled.
- **Sampling?** The data are *every* Kern tract (a near-census), so we can describe
  Kern, but we cannot extend the claim to, say, Fresno.

**Interpretation.** The honest conclusion is: *in Kern County, tracts with higher
PM2.5 tend to have higher asthma ED-visit rates (an association).* The causal word
"causes" overreaches the design. Establishing causation would require either a
randomized experiment (impossible/unethical here — you cannot assign people more
pollution) or careful methods that adjust for confounders. This is the everyday
discipline of scope of inference.

(ch01-sec-wex4)=
### Worked Example 4 — Inspecting structure and missingness (simulated survey)

**Question.** A first-day class survey was collected (`firstday_survey_sim`, a
**simulated** dataset — not real students). How many students and variables are
there, what proportion hold a paying job, and which items have missing values?

**Intuition.** Start every analysis by sizing the dataset and finding the holes,
*before* computing anything fancy.

**Computation.**

```{code-cell} r
:label: ch01-wex4
:tags: [skip-execution]

survey <- read.csv("data/processed/firstday_survey_sim.csv")
dim(survey)                                   # 150  8

# Proportion who report any paid work, out of all 150 students.
# A missing work value is treated here as "not known to be working" (counts in
# the denominator but not as > 0), so the denominator is the full 150.
mean(survey$work_hours_week > 0 & !is.na(survey$work_hours_week))

# Missing counts for three optional items at once (colSums adds up the TRUEs):
colSums(is.na(survey[c("commute_minutes", "work_hours_week", "stat_anxiety")]))
```

**Interpretation.** The survey has **150 students** and **8 variables**.
**56.0%** report paid work (`work_hours_week > 0`), consistent with a commuter HSI
where many students work — a design fact, not an accident. Missingness is confined
to three "optional" items: **5** missing commute time, **4** missing work hours,
**3** missing anxiety (all computed from `firstday_survey_sim`). Because the file
is simulated, these holes were *built in on purpose* to let you practice
missing-data handling — and we label it `_sim` so no one mistakes it for a real
survey of real students.

(ch01-sec-figures)=
## Figures

```r
ces <- read.csv("data/processed/kern_calenviroscreen.csv")

ggplot(ces, aes(x = ces_percentile)) +
  geom_histogram(binwidth = 5, boundary = 0,
                 fill = okabe_ito["blue"], color = "white") +
  geom_vline(xintercept = 75, linetype = "dashed",
             color = okabe_ito["vermillion"], linewidth = 1) +
  annotate("text", x = 78, y = Inf, vjust = 2, hjust = 0,
           label = "statewide 75th pct", color = okabe_ito["vermillion"]) +
  labs(
    x = "CalEnviroScreen statewide percentile (higher = more burdened)",
    y = "Number of Kern tracts",
    title = "Kern County tracts skew toward high environmental burden"
  )
```

![Histogram of CalEnviroScreen statewide percentile for Kern County census tracts. Most bars fall on the right (high) side of the scale, and a vertical dashed line at the 75th percentile shows that roughly half the tracts lie above it, indicating Kern tracts are concentrated toward the high-burden end of the statewide distribution.](data:image/png;base64,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)

*Distribution of CalEnviroScreen statewide percentile across 147 scored Kern County census tracts. The dashed line marks the statewide 75th percentile; bars to its right are Kern tracts in the worst-burdened quarter of California. The bulk of the distribution sits to the right, showing Kern tracts skew toward high cumulative environmental burden.*

```r
survey <- read.csv("data/processed/firstday_survey_sim.csv")

ggplot(survey, aes(y = forcats::fct_rev(forcats::fct_infreq(major)))) +
  geom_bar(fill = okabe_ito["orange"]) +
  labs(
    x = "Number of students",
    y = "Declared major",
    title = "Major is categorical (nominal): summarize it with counts"
  )
```

![Horizontal bar chart of student counts by declared major in the simulated first-day survey. Nursing and Business have the most students, followed by Psychology and Kinesiology, with several smaller-count majors; the chart illustrates that a categorical variable is summarized by counts per category rather than by a mean.](data:image/png;base64,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3rBQNAAAAADQYKbdPPHcc8+5uLhYKBRjlJeXp6enz5s3LyIiYsaMGTt37iwpKTG8Smxs7OHDh03dUcPW0hMdHX3q1Kl6q926dUsmk1VUNOo5UqWlpampqdyfZokfAAAAWhbTRuxiYmKSkpJmzpxplbP7v/766/Lly99///01a9ZIJJKqqqqTJ0++8847n332Wbdu3epaKzExsQH7athaerRarYHrEfVqNnJfFy5c0J2JxizxAwAAQMti2ojdtGnTnn/++cDAwAsXLvz5559/12ChKAkhT548WbJkyfLly4OCgqRSKY/Hk0gk48aNGz58+EcffaTRaCy3awAAAIAWwbQROwcHB5pCvfbaa7VWsNxdsQcOHOjcubOvr69e+ZQpUwICAribYmJiYoKDg7Ozs2/dujVmzJhJkybFxsYGBASEh4cTQmJjY998883CwsJTp04pFIpXX311+vTpt2/f3rVr119//RUQEDB9+nSJREJr6q4VFhYml8szMjJKSkr8/PymT5+ue0r6xo0bR48ezc3NFYlEL7300tSpU11dXRv2NqOjo0NDQ0eMGEH/LCwsnDFjxo4dO9zc3AghFRUVu3btunr1anV1tY+PT3h4eJ8+fQgh27ZtO378OCFEJpN9+umnPj4+uvHn5uYeOnQoOzvbw8MjLCxsyJAhXHPdv39/z549t2/fbtOmzahRo0aNGoXHigAAALRcpiV2q1evNvLconmxLPv999+/+eabNRdJpVKa3FBarTY1NTU5OXnx4sX0qjWGYbh0k2GYxMTEDz/8MDU1taKiYvbs2VevXg0JCVm3bh0hZPXq1Zs3b168eHHNtTZt2hQdHb1lyxatVrtly5bY2Nht27bR9OjcuXMHDhxISEho06aNSqVKS0ubO3fuzp07G3YDtt7ZW5ZlubO0LMvGxMSMHj06LS2Nz+ffu3cvNjY2OTnZy8vrvffec3Nzu3jxYlJSEhczjf/GjRuffPLJqlWrli9fXlZWtnTp0srKylGjRhFCbt68uWLFio8++iguLq6qqmrdunU//fTTypUrces4AABAC2VaYkeTnqanUqmUSmWnTp2MqTxw4EAvLy9CCB3l0tOrV6/BgwcTQlxcXIYOHXry5MmJEyfSSwZHjx69Zs0almVrZjbdu3cfNmwYIUQgEERGRs6YMaO0tNTNzY1l2R07dsyZM6dt27aE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Oou9e/empqb6+PiMHj168+bN/fr1CwgIuHLlyg8//BAUFESvDGvO9E64FBYWDhgwgCa/27Zt0z0lakBZWdmGDRtiY2OHDh1KSx49elTvWgqFIioqat26dbrDbA4ODh988MH333//4MGDWhM73V/quj/RXFxcCCEqlYq7+aPWXy31vjWhUBgcHBwcHKxSqbKzsxMSElQqVVRUlIE3YqHvGCR2YEU1L3htPtRqtVAo1P0V1zpVVVURQkQikVAotHYsVqZQKMRicStPcLnEzt7evrUldvUyLeVPTU3t0aPHr7/++tlnn40dO9bb2zsxMfHatWsZGRkXL1709PS0UJTm8n//93/ca6VSeffu3QEDBnTo0MHOzu7GjRvcourq6okTJ2ZlZdW6kSdPnhBCdO8ezc3NJfWdLpFIJJ07dz558qReuUKhIITQS+UIITwej9uOk5MTHZmjdNNHT09PgUBA90vl5eXV3Knxb00sFvv5+QUGBt65c8fAuwAAAIDmzLTE7ubNm++99x4dBnzttddOnDhBy998883XX3/9s88+M3+AZnX9+vULFy6wLKtQKDZs2NC3b18fHx+BQDB37tzU1NTffvuNZVm1Wr1161ZHR8fBgwfXupFnn32Wz+efOnWK3nmal5eXnJxMjDjTv3z58itXruzYsYNe7Mmy7OPHj+Pj48eOHcuNqDk7Oz99+pRhGI1GM3jw4MzMzKdPnxJCHj9+vHXrVm5TAoFg/vz5n3/+OX1wxaNHj2odLjX81oqKimQyWU5ODr1/tqCg4PLlyyEhIaa3KwAAADQLpp1T4/F47dq1o6979epVUVFRXl7u7OxMCBk3btz69etXr15t/hjrk5eXJ5PJdEt69uy5Zs2amjWnTp36559/Tpw4USQShYaGymQyOoRLb009cOBATk6OVCoNDg5OSkqqa6BbJBJt2rTpq6++GjdunIuLi7+/f0pKSkxMzL179wxPFOLh4bFjx46MjIyVK1f+8ccfQqGwd+/e7777bv/+/bk6/v7+Z8+eDQsLW7hwYWhoqEajmT9/vlKpHDRoUHx8/OzZs7magYGBEolk06ZN9+7d69Wr14IFC+jNtnoMvDV3d/d169alp6evWbPm/7V353FN3Pn/wD+TkAAhJAhYDhWLB4gHFqtVpHh8qwJFQBDqerSra/GgighadT2quB7VSkHRbynUSrX1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)

*A first look at variable types in the simulated first-day survey (firstday_survey_sim). Counts of students by declared major — a nominal categorical variable best summarized by counts, not an average.*

:::{important} Durable skill — Self-directed learning: own your R environment
**Setting up and trusting your own tools is a career skill, not a chore.** In this
chapter you installed nothing magic: you loaded a package, called one loader, and
read a data structure — but you did it *reproducibly*, with a seed and a codebook
at your elbow. Every workplace that touches data expects you to set up your own
analysis environment, find the documentation, and verify that the file you loaded
is the file you think it is. The student who learns to read a codebook, check
dimensions, and confirm types before computing is the employee who catches the
"the spreadsheet had an extra header row" error before it reaches a decision.
Building this self-reliance now — looking things up, checking your own work — is
the most durable thing this course can give you. **Tag: SDL.**
:::

(ch01-sec-tryit)=
## Try it

Practice the skills from this chapter in two interactive places:

- **Shiny — Statistics Explorer $\rightarrow$ Data Import & Preview module.** Load
  `kern_calenviroscreen` (and `firstday_survey_sim`), preview the table, and watch
  the panel display the exact `read.csv()` / `glimpse()` R code your clicks
  generate. Path: `shiny-explorer/` (run with `shiny::runApp("shiny-explorer")`),
  module: *Data Import & Preview*.
- **Jupyter (R kernel) — Lab 1: RStudio/Quarto & EDA setup.** A guided notebook
  that loads a dataset, inspects its structure, classifies its variables, and
  documents its missingness. Path: `labs/lab01-data-study-design.ipynb`.

Both read the same curated `data/processed/` files with the same R you learn
here, so the syntax carries over everywhere.

(ch01-sec-practice)=
## Practice problems

Work each problem fully before checking. **Odd-numbered** answers appear in
[Appendix: Answers](../appendix/answers.md); full worked solutions live in the
instructor materials. Unless a problem says otherwise, use
`kern_calenviroscreen` (real), `firstday_survey_sim` (simulated), or
`kern_crops_sim` (simulated) from `data/processed/`.

1. Define, in your own words, the difference between a **population** and a
   **sample**. Give one example of each from the Kern air-pollution context.

2. For the `firstday_survey_sim` dataset, what is the **observation** (the unit in
   each row)? Name two variables and give the type of each.

3. Classify each variable as numerical (continuous/discrete) or categorical
   (ordinal/nominal): (a) a student's `year` (Freshman… Senior); (b) a tract's
   `total_pop`; (c) a tract's `pm25`; (d) a crop's `commodity`.

4. Explain why a census-tract ID stored as the digits `06029001100` is a
   **categorical** variable even though it looks like a number.

5. A study records the PM2.5 level and asthma rate of every Kern tract and finds
   they move together. Is this an **observational study** or an **experiment**?
   What is the strongest causal claim it can support?

6. Define **confounding variable** and give a plausible confounder for the PM2.5 /
   asthma association in Kern.

7. State the two **scope-of-inference** questions. For a randomized study-methods
   experiment run only on one professor's class, answer both.

8. A campus dining survey is emailed to all students; 12% respond, mostly students
   who eat on campus daily. Name the **two** kinds of bias most at risk here and
   explain each in one sentence.

9. Using `kern_calenviroscreen`, write the R to compute how many tracts are
   missing the `poverty` value, and state the number (it is in the codebook /
   computed in this chapter).

10. Distinguish **stratified** sampling from **cluster** sampling in one sentence
    each, then say which you would use to guarantee every region of Kern County is
    represented in a 200-tract sample.

11. You read: "A bigger sample always gives a more accurate estimate." Explain why
    this is **false** when the sampling method is biased.

12. For `firstday_survey_sim`, write the R that returns the number of students and
    the number of variables. What does each number represent?

13. Give one example each of a variable that is (a) continuous numerical,
    (b) discrete numerical, (c) ordinal categorical, (d) nominal categorical —
    drawn from any dataset in this chapter.

14. Explain why **random assignment** (not just random sampling) is what allows an
    experiment to support a causal conclusion.

15. In `kern_calenviroscreen`, the codebook says `ces_percentile` is missing for 4
    tracts because OEHHA suppresses scores for very small tracts. Why is dropping
    those 4 rows **not** a harmless choice? Name the missingness concern.

16. A convenience sample of shoppers outside one Bakersfield store is used to
    estimate the county's average commute time. Identify the population, the
    sample, and the most likely direction of bias.

17. Classify the study and state its scope of inference: researchers randomly
    assign 60 volunteers to a 6-week walking program or a control group and
    compare resting heart rate.

18. Using `kern_crops_sim` (simulated), name the observation in each row and give
    one numerical and one categorical variable from it.

19. Explain the difference between **association** and **causation** using the
    PM2.5/asthma example, and state which one observational Kern data can
    establish.

20. Write the R that loads `kern_calenviroscreen` and prints its dimensions. How
    many observations and variables are there?

21. A researcher wants to estimate the average sleep of CSUB students and surveys
    only students leaving an 8 a.m. class. Name the bias and its likely direction.

22. For each, state whether random **assignment**, random **sampling**, both, or
    neither is present, and the resulting scope: (a) a poll of 1,000 randomly
    dialed Kern residents; (b) a randomized clinical trial on volunteers.

23. Using `firstday_survey_sim`, write the R to find the proportion of **all 150**
    students who report any paid work (`work_hours_week > 0`), treating a missing
    work value as "not known to be working." State the value (computed in this
    chapter).

24. Why must you call `set.seed()` *before* `sample()` if you want a reproducible
    random sample? What goes wrong if you skip it?

25. A news story reports "students who use the campus tutoring center earn higher
    grades, so tutoring raises grades." Identify the design (observational vs.
    experimental) and a confounder that weakens the causal claim.

26. Define **non-response bias** and describe a redesign of the dining survey in
    Problem 8 that would reduce it.

27. In `kern_calenviroscreen`, roughly half of scored tracts exceed the statewide
    75th percentile for burden. If Kern were a "statistically average" county,
    what fraction would you expect above the 75th percentile, and what does the
    gap suggest?

28. You have data on every Kern tract (a near-census). Can you generalize a finding
    to all of California? Explain using scope of inference.

29. Match each scenario to a sampling strategy (simple random, stratified, cluster,
    convenience): (a) randomly pick 8 schools, survey all students in them;
    (b) survey the first 50 people you see; (c) draw 100 tracts at random from a
    full tract list; (d) sample 20 tracts from each of Kern's regions.

30. In two or three sentences, explain to a non-statistician why "how the data were
    collected" matters more than "how much data there is" — using one example from
    this chapter.

(ch01-sec-summary)=
## Chapter summary

- A **dataset** is a table: **rows are observations** (units), **columns are
  variables** (characteristics). The **population** is everything you want to
  learn about; the **sample** is what you actually measure.
- Variables are **numerical** (continuous or discrete — arithmetic is meaningful)
  or **categorical** (ordinal or nominal — labels). Which family a variable is in
  drives every later choice of graph, summary, and test.
- **Observational studies** record what is already happening and can show
  **association** only; **experiments** assign treatments (ideally at random) and
  can show **causation**, because random assignment breaks the link to confounders.
- **Scope of inference** has two axes: random **assignment** ($\rightarrow$ causation) and
  random **sampling** ($\rightarrow$ generalization). Name both before trusting a claim.
- **Bias** is a systematic tilt that more data cannot fix; watch for **sampling**,
  **non-response**, and **confounding**. Good **sampling design** (simple random,
  stratified, cluster — not convenience) is the cure.
- **Missing data** (`NA`) must be counted and understood, not silently dropped —
  *why* a value is missing can bias the result.
- In R: `read.csv()` loads a dataset, `dim()`/`glimpse()`/`str()` reveal its
  structure, `is.na()`/`colSums()` find and count the holes, and `set.seed()`
  makes random work **reproducible**.

(ch01-sec-faq)=
## FAQ

**Q1. Is "data" singular or plural, and does it matter here?**
Either is fine in everyday writing. What matters is the concept: a dataset is a
structured table of observations and variables. Focus on getting *that* right.

**Q2. If I have data on the whole population, do I still need statistics?**
Yes — to *summarize and communicate* it (Chapters 2–3). You skip the *inference*
machinery (Chapters 6–13) only when you truly have the entire population, which is
rare. Even `kern_calenviroscreen`, a near-census of Kern, still benefits from
clear summaries.

**Q3. How can I tell numerical from categorical when a category is written as a
number (like a 1–7 anxiety rating)?**
Ask whether averaging is meaningful and whether the gaps are equal. A 1–7 Likert
rating is a borderline case often treated as numerical for convenience but is
really ordinal. When in doubt, check the codebook and say which choice you made.

**Q4. Why can't a big observational study prove causation?**
Because no matter how many rows you have, you did not *assign* the treatment, so a
confounding variable can always offer an alternative explanation. Size cannot
remove confounding; only random assignment (or careful adjustment) can.

**Q5. What's the practical difference between stratified and cluster sampling?**
Stratified: you take *some* units from *every* group (guarantees each group
appears). Cluster: you take *all* units from *some* randomly chosen groups
(cheaper when groups are scattered). Stratified reduces variability; cluster
reduces cost.

**Q6. Is convenience sampling ever okay?**
For a quick classroom demo or a pilot, yes — but never as the basis for a real
conclusion about a population, because its bias is unknown and uncorrectable. Say
so explicitly whenever you use it.

**Q7. What should I do with missing values?**
First, *count* them and ask *why* they are missing. Only then choose a handling
strategy (drop with `na.rm = TRUE`, or impute later in the course). Never delete
rows silently — report what you dropped, as every example in this chapter did.

**Q8. Why does this course keep using a `_sim` dataset instead of all real data?**
Some real sources (like the USDA crop API) require credentials we cannot obtain
without fabricating, so we generate a plainly labeled simulated stand-in with a
committed, seeded script. We *never* present simulated data as real — that is why
the name ends in `_sim` and the codebook says so.

<!--
================================================================================
GLOSSARY ADDITIONS for this chapter were written to book/ch01/_glossary.md
(per-chapter fragment; the appendix finalizer merges all fragments into
appendix/glossary.md). ODD-numbered short answers were written to
book/ch01/_answers.md. Full worked keys live in instructor/keys/ch01.qmd and
instructor/keys/ch01_answers.json. None of those are rendered into the public
book. — chapter-author, ch01
================================================================================
-->

## Resumen en español

:::{note} Resumen del capítulo
:class: dropdown

La estadística comienza mucho antes de calcular cualquier promedio: comienza con **cómo se recopilaron los datos**. En este capítulo usted aprendió a leer un conjunto de datos como una tabla organizada, donde cada **fila** es una **observación** (observation) y cada **columna** es una **variable** (variable), es decir, una característica medida para cada unidad.

Las variables se dividen en dos grandes familias. Una **variable numérica** (numerical variable) registra un número sobre el que tiene sentido hacer aritmética — como la concentración de PM2.5 en µg/m³ en los tramos censales de Kern County. Una **variable categórica** (categorical variable) registra a qué grupo pertenece cada observación — como el tipo de cultivo o la carrera universitaria. Dentro de las numéricas, usted distingue entre **continuas** (continuous) y **discretas** (discrete); dentro de las categóricas, entre **ordinales** (ordinal) y **nominales** (nominal).

La distinción más importante del capítulo es la diferencia entre un **estudio observacional** (observational study) y un **experimento** (experiment). En un estudio observacional usted solo registra lo que ya ocurre y puede identificar **asociación** (association), pero no causalidad. El ejemplo de Kern County es revelador: de los 147 tramos censales con datos de CalEnviroScreen 4.0, casi la mitad — el 49.7% — se ubica en el cuarto superior de toda California en cuanto a carga ambiental acumulada. Que los tramos con mayor PM2.5 también tengan tasas más altas de urgencias por asma describe una asociación, no causalidad, porque una **variable de confusión** (confounding variable) — como la pobreza — puede explicar ambas cosas a la vez. Solo un experimento con **asignación aleatoria** (random assignment) puede establecer causación.

El **alcance de la inferencia** (scope of inference) depende de dos preguntas clave: ¿hubo asignación aleatoria? (esto abre la puerta a conclusiones causales) y ¿hubo **muestreo aleatorio** (random sampling)? (esto permite generalizar a la población). El **sesgo** (bias) es una distorsión sistemática que los datos adicionales no pueden corregir; puede surgir del diseño de muestreo, de la **no respuesta** (non-response), o de la confusión entre variables.

En R, las funciones clave de este capítulo son `read.csv()` para cargar datos desde `data/processed/`, `glimpse()` y `str()` para inspeccionar la estructura, `is.na()` y `colSums()` para detectar y contar **valores perdidos** (missing values, NA) y `set.seed()` para garantizar resultados **reproducibles** (reproducible). Estas herramientas son el primer peldaño del proceso estadístico que continuará a lo largo del curso.
:::
