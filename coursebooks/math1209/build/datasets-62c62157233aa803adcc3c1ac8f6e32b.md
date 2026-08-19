---
title: "Datasets Used in This Book"
---

# Datasets used in this book

MATH 1209 is a **concept-first, calculator-first** course: most worked examples build
a small, clearly labeled hypothetical scenario right in the text — a shelter's cat
weights, a coffee cart's morning rush, a campus fee referendum — with numbers chosen
to teach the method cleanly, not pulled from an external file. Those in-text scenarios
are not separate "datasets" you load; you read them straight off the page or the
calculator screen.

One real, published dataset does get loaded into R and explored directly, in Week 1.
This page documents it the same way the department documents every dataset in its
teaching library, so you always know exactly where a number came from.

## `KidsFeet`

| Field | Value |
|---|---|
| Package | `mosaicData` (loaded automatically with `library(mosaic)`) |
| Real or simulated | **REAL** — an actual measurement study, not a simulation |
| Rows × columns | **39 × 8** |
| Used in | Week 1 (Data & Study Design) |
| Source | Mary C. Meyer, "Wider Shoes for Wider Feet?", *Journal of Statistics Education*, vol. 14, no. 1 (2006), <https://jse.amstat.org/v14n1/datasets.meyer.html> — data collected from a fourth-grade classroom in Ann Arbor, Michigan, in October 1997 |
| License | `mosaicData` is distributed under GPL-2 \| GPL-3 (per CRAN); free to use and redistribute for teaching |

**What it measures.** Foot length and width for 39 children, gathered to ask a real
question: do boys' feet run wider than girls', or does children's shoe sizing just
assume so? Week 1 uses it purely to practice classifying variables — you are not
asked to answer the shoe-sizing question, though you are welcome to explore it.

**Variables** (as shown in Week 1's `head(KidsFeet)` table):

| Variable | Meaning | Type |
|---|---|---|
| `name` | child's first name | categorical (nominal) |
| `birthmonth` | month of birth (1–12) | categorical (nominal) — looks numeric but averaging it means nothing |
| `birthyear` | year of birth (2-digit) | categorical (nominal), same trap as `birthmonth` |
| `length` | longer foot's length, cm | numerical (continuous) |
| `width` | longer foot's width, cm | numerical (continuous) |
| `sex` | `B` (boy) or `G` (girl) | categorical (nominal) |
| `biggerfoot` | which foot is bigger, `L` or `R` | categorical (nominal) |
| `domhand` | dominant hand, `L` or `R` | categorical (nominal) |

## How to load it yourself

`KidsFeet` ships inside the `mosaicData` package, which loads automatically the
moment you run `library(mosaic)` — there is no file to download and no path to get
right.

```r
library(mosaic)
data(KidsFeet)     # makes the table available by name
nrow(KidsFeet)      # 39
names(KidsFeet)     # the 8 column names above
head(KidsFeet)       # first 6 rows
```

Run this (or any other R in the book) for free at the **CSUB JupyterHub**,
<https://csub.jupyter.cal-icor.org/> — log in with your CSUB account and `mosaic`
(with `KidsFeet` inside it) is already installed. If you have never opened a
notebook before, start with [R-Help Lesson 2](../r-help/L02.md) (getting into
JupyterHub) and [R-Help Lesson 6](../r-help/L06.md) (importing and loading data,
including built-in tables like this one).

:::{tip} Why this book stays this small on datasets
A GE statistics course lives or dies on whether you can see *every* step of a
calculation — by hand, on your calculator, and in R — without a giant spreadsheet
getting in the way. `KidsFeet` is here to show you what a real research dataset
looks like and how to describe it; the rest of the semester leans on short,
transparent, hand-checkable numbers so the *statistics*, not the data wrangling,
stays the star of the show.
:::
