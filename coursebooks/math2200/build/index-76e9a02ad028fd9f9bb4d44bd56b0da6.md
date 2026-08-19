---
title: "Summarizing Numerical Data"
subtitle: "Chapter 2 — MATH 2200"
exports:
  - format: pdf
    template: ../_templates/csub-latex
kernelspec:
  name: ir
  display_name: R
---

```{code-cell} r
:label: ch02-setup
:tags: [remove-cell]
# Chapter-wide setup. The shared Kern air-quality data frame `aq` and its PM2.5
# subset `pm` are built here once and reused below.
library(mosaic)          # favstats(), the gf_* plots, and the y ~ x formula grammar
library(BSDA)            # summary-stat z/t tests used from Ch. 6 on

# Make the curated data shelf reachable no matter which folder the build runs
# from: walk up until data/processed is found, then read from there.
if (!dir.exists("data/processed")) {
  .d <- getwd()
  while (!dir.exists(file.path(.d, "data", "processed")) && dirname(.d) != .d) .d <- dirname(.d)
  if (dir.exists(file.path(.d, "data", "processed"))) setwd(.d)
}

# Okabe-Ito colorblind-safe palette (CLAUDE.md Part 1, accessibility).
okabe_ito <- c("#0072B2", "#E69F00", "#009E73", "#CC79A7",
               "#56B4E9", "#D55E00", "#F0E442", "#999999")
theme_set(theme_minimal(base_size = 13))

aq <- read.csv("data/processed/kern_airquality.csv")  # real EPA AirData, 2023
pm <- filter(aq, pollutant == "PM2.5")                # 1,554 monitor-days
```

(ch02-sec-hook)=
## The question that opens this chapter

Every summer, Bakersfield makes a "worst air in the nation" list, and every
summer someone pushes back: *was the air actually that bad, or did a handful of
wildfire-smoke days drag the average up?* That argument is really a statistics
question, and you can settle it with one dataset and two numbers.

The dataset is `kern_airquality` — every daily PM2.5 ("fine particle pollution,"
particles smaller than 2.5 micrometers) reading from every EPA monitor in Kern
County in 2023, a genuine U.S. EPA AirData download (see the
[codebook](../../data/codebooks/kern_airquality.md)). PM2.5 is measured in
**micrograms per cubic meter (µg/m³)**; higher numbers mean dirtier air. The file
holds 1,554 **monitor-days** — one row for each day at each monitor, so a single
day with several monitors reporting contributes several rows.

Here are the two numbers — computed live from the data, not typed in by hand:

```{code-cell} r
:label: ch02-hook-numbers
pm_mean   <- mean(~ daily_mean, data = pm)
pm_median <- median(~ daily_mean, data = pm)
c(mean = pm_mean, median = pm_median)
```

The **mean** daily PM2.5 is about **9.30 µg/m³**, but the **median** is only
about **7.56 µg/m³** *(both dataset-derived from `kern_airquality`,
`daily_mean`, n = 1,554)*. The mean sits noticeably higher than the median.
That gap is the whole story: a small number of very dirty days — the worst day
in the file hit 63.7 µg/m³ — pull the average up, while the *typical* day is
cleaner than the average suggests. By the end of this chapter you will be able
to say exactly how much "a few bad days" distort the picture, and which number
to trust for which question.

That is what summarizing numerical data is for: turning a long column of numbers
into a few honest, well-chosen quantities and pictures that answer a real
question.

(ch02-sec-objectives)=
## Learning objectives

By the end of this chapter you will be able to:

1. **Compute and interpret** measures of center (mean, median) and spread
   (standard deviation, IQR, range) for a numerical variable.
2. **Construct** histograms, boxplots, and density plots in R and read shape,
   center, spread, and outliers from them.
3. **Compare** distributions across groups and describe skew, modality, and the
   effect of outliers on each statistic.
4. **Explain** when the median and IQR are preferable to the mean and standard
   deviation, and justify the choice for a given variable.
5. **Write** a clear, one-paragraph plain-language description of a distribution
   using correct statistical vocabulary.

:::{note} At a glance
~35 min to read · 4 sections (center · spread · pictures · comparing groups) ·
4 worked examples · 30 practice problems. New R this chapter: `favstats()` for
center and spread, `gf_histogram()` and `gf_boxplot()` for pictures, and
`favstats(y ~ group, data = D)` for a summary within each group.
:::

This chapter expands the "examining numerical data" material in *Introduction to
Statistics with Randomization and Simulation* (**ISRS**), the OpenIntro text this
course adapts. It assumes
[Chapter 1](../ch01/index.md): you should already know what a variable, an
observation, and a numerical variable are, and how to load a dataset with
`read.csv()` and inspect it with `glimpse()`.

(ch02-sec-center)=
## 2.1 Measures of center

### Intuition

A **measure of center** is a single number that answers "what is a *typical*
value?" The two you will use constantly are the mean and the median.

The **mean** is the balance point: add up all the values and share the total
equally among the observations, the way you split a restaurant bill evenly. The
**median** is the middle value: line everyone up from smallest to largest and
point at the person in the middle.

When a distribution is roughly symmetric, the mean and median nearly agree. When
it is **skewed** — stretched out by a few unusually large or small values — they
part ways, because the mean feels every value (including the extremes) while the
median only cares about position. That is exactly what we saw with Bakersfield's
air: a right-skewed distribution pulled the mean above the median.

### Formula

Let $x_1, x_2, \dots, x_n$ be the $n$ observed values of a numerical variable,
where $n$ is the **sample size** (the number of observations).

The **sample mean**, read "x-bar," is

$$
\bar{x} \;=\; \frac{1}{n}\sum_{i=1}^{n} x_i
\;=\; \frac{x_1 + x_2 + \cdots + x_n}{n},
$$

where $\sum_{i=1}^{n} x_i$ (the capital Greek sigma) means "add up the $x_i$
from $i = 1$ to $i = n$."

The **median**, written $M$ (or $\tilde{x}$), is the middle value of the
*sorted* data. With the values sorted from smallest to largest:

$$
M \;=\;
\begin{cases}
x_{\left(\frac{n+1}{2}\right)} & \text{if } n \text{ is odd},\\[4pt]
\dfrac{x_{\left(\frac{n}{2}\right)} + x_{\left(\frac{n}{2}+1\right)}}{2}
  & \text{if } n \text{ is even},
\end{cases}
$$

where $x_{(k)}$ denotes the $k$-th value in the sorted list. In words: if there
is an odd number of values, the median is the single middle one; if there is an
even number, average the two middle ones.

### R

In `mosaic`, one function — `favstats()` — reports center and spread together in
one labelled block. It uses the formula grammar you will see all chapter:
`favstats(~ variable, data = D)` reads as "the summary statistics of *variable*
in the data frame *D*." If you want center on its own, `mean()` and `median()`
take the same `~ variable` form:

```{code-cell} r
:label: ch02-center-r
mean(~ daily_mean, data = pm)
median(~ daily_mean, data = pm)
```

```{code-cell} r
:label: ch02-describe-full
favstats(~ daily_mean, data = pm)
```

The printout labels each column — `min`, `Q1`, `median`, `Q3`, `max`, `mean`,
`sd`, `n`, and `missing` — so you can read the five-number summary, the mean, and
the SD straight off one line. Notice that `mean` (9.30) comes out larger than
`median` (7.56): the signature of right skew.

:::{note} Why the mean can be larger than every 'typical' day
A common misread is "the mean is the value most days are near." It is not. The
mean is a balance point, and one very large value can pull it above the bulk of
the data. In `kern_airquality`, **only about 38% of PM2.5 days are above the
mean** — most days are *below* it. The mean is a fair summary of the *total*
burden, not of the *typical* day.
:::

(ch02-sec-spread)=
## 2.2 Measures of spread

### Intuition

Two cities can have the same average air quality and feel completely different:
one steady, one swinging between crystal-clear and choking. **Spread** measures
how far the values reach from the center — how much they vary.

- The **range** is the crudest measure: largest minus smallest. It uses only two
  numbers and is wrecked by a single outlier.
- The **standard deviation (SD)** is the *typical distance of a value from the
  mean*. It uses every observation, which makes it informative but also
  sensitive to extremes.
- The **interquartile range (IQR)** is the width of the *middle half* of the
  data: the distance from the 25th percentile to the 75th. Because it ignores
  the smallest 25% and largest 25%, it shrugs off outliers.

### Formula

The **range** is

$$
\text{range} \;=\; x_{(n)} - x_{(1)} \;=\; \max - \min .
$$

The **sample variance** $s^2$ is the average squared distance from the mean
(with the denominator $n-1$, explained below):

$$
s^2 \;=\; \frac{1}{n-1}\sum_{i=1}^{n}\left(x_i - \bar{x}\right)^2,
$$

where $(x_i - \bar{x})$ is the **deviation** of observation $i$ from the mean. In
plain words, the recipe is: subtract the mean from each value, square each of
those gaps (squaring makes them all positive and punishes big gaps more), add the
squares up, and divide by $n-1$. The squaring is why variance comes out in
*squared* units — which is exactly why we take a square root next.
The **sample standard deviation** $s$ is the square root of the variance, which
returns the result to the original units:

$$
s \;=\; \sqrt{s^2} \;=\; \sqrt{\frac{1}{n-1}\sum_{i=1}^{n}\left(x_i-\bar{x}\right)^2}.
$$

We divide by $n-1$ rather than $n$. This is called **Bessel's correction**. Here
is the reason: the deviations are measured from the *sample* mean $\bar{x}$, and
$\bar{x}$ is itself estimated from the same data. That ties the deviations
together — they are forced to add up to zero, so once you know any $n-1$ of them,
the last one is fixed. Only $n-1$ are free to vary, so we average over $n-1$, not
$n$. Doing so keeps $s^2$ from systematically under-estimating the true
variability. R uses $n-1$ by default, so you rarely have to think about it.

:::{tip} Going deeper (optional): the mean and SD are a matched pair
:class: dropdown
This is optional enrichment. There is a deeper reason the mean and the standard
deviation are always reported together: the mean is the single number that makes
the **sum of squared deviations as small as possible**. Pick any other center $c$
and recompute $\sum (x_i - c)^2$, and you will always get a *larger* total than you
get with $c = \bar{x}$. The SD is then literally "how big those minimized squared
gaps came out, on average." (The median, by contrast, minimizes the sum of
*absolute* gaps $\sum |x_i - c|$ — which is one reason the median pairs naturally
with the IQR instead.) This least-squares idea returns as the engine of regression
in Chapter 13.
:::

For the **IQR**, define the **quartiles**: $Q_1$ is the 25th percentile (a value
below which about a quarter of the data fall), $Q_2 = M$ is the median, and
$Q_3$ is the 75th percentile. Then

$$
\text{IQR} \;=\; Q_3 - Q_1 .
$$

### R

```{code-cell} r
:label: ch02-spread-r
sd(~ daily_mean, data = pm)          # standard deviation, denominator n - 1
var(~ daily_mean, data = pm)         # variance
IQR(~ daily_mean, data = pm)         # Q3 - Q1
range(~ daily_mean, data = pm)       # returns c(min, max); width is diff(range(...))
diff(range(~ daily_mean, data = pm)) # the numeric range (max - min)
quantile(~ daily_mean, data = pm)    # min, Q1, median, Q3, max
```

The SD, and the quartiles $Q_1$ and $Q_3$ whose difference is the IQR, also
appear — labelled — in the `favstats()` block from §2.1. For
PM2.5 the SD is about **7.63 µg/m³** and the IQR is about **7.70 µg/m³** *(both
dataset-derived from `kern_airquality`)* — the typical day-to-day swing is almost
as large as the average level itself.

:::{tip} Mean/SD vs. median/IQR — a rule of thumb
**Mean and SD** are the natural pair for roughly symmetric data with no wild
outliers. **Median and IQR** are the **resistant** pair: they barely move when a
few extreme values are present or when the distribution is skewed. When in doubt,
plot the data first (§2.3), then report the pair that matches its shape — and
when a distribution is skewed, reporting both pairs is often the honest choice.
:::

(ch02-sec-shape)=
## 2.3 Picturing a distribution

### Intuition

Numbers summarize; pictures reveal. Before trusting any single statistic, look
at the **distribution** — the pattern of which values occur and how often. Three
plots do most of the work:

- A **histogram** slices the number line into equal-width **bins** and draws a
  bar for how many observations fall in each. It shows the overall **shape**.
- A **density plot** is a smoothed histogram — a continuous curve that traces the
  same shape without depending on bin edges.
- A **boxplot** draws a box from $Q_1$ to $Q_3$ (so the box *is* the IQR), a line
  at the median, "whiskers" reaching to the most extreme non-outlier values, and
  individual points for outliers. It is the **five-number summary** — the minimum,
  $Q_1$, median, $Q_3$, and maximum — made visible, and it shines when comparing
  groups.

When you read a distribution, name four things: **shape** (symmetric, or skewed
left/right; one peak or several), **center**, **spread**, and **outliers**
(values that stand far apart from the rest).

### Formula

A distribution is **right-skewed** (positively skewed) when its longer tail
points toward larger values; then typically $\bar{x} > M$. It is **left-skewed**
when the longer tail points toward smaller values; then typically $\bar{x} < M$.
A handy diagnostic: compare the mean and median.

$$
\bar{x} > M \;\Rightarrow\; \text{likely right-skewed}, \qquad
\bar{x} < M \;\Rightarrow\; \text{likely left-skewed}.
$$

The boxplot marks a point as a **suspected outlier** when it falls beyond the
**1.5 × IQR fences**:

$$
\text{lower fence} = Q_1 - 1.5\,\text{IQR}, \qquad
\text{upper fence} = Q_3 + 1.5\,\text{IQR}.
$$

Any value below the lower fence or above the upper fence is flagged. This is a
convention, not a law of nature — a flagged point is a value to *investigate*,
not automatically a mistake to delete.

### R

The `ggformula` plotting helpers (loaded with `mosaic`) use the same `y ~ x`
formula grammar as the summaries. We fill them with the Okabe–Ito
colorblind-safe palette and add a dashed line at the mean by hand, so you can see
it pulled to the right of the bulk of the data:

```r
pm_mean <- mean(~ daily_mean, data = pm)   # the balance point we mark on the plot

gf_histogram(~ daily_mean, data = pm, bins = 30,
             fill = okabe_ito[1], color = "white",
             title = "Daily PM2.5 in Kern County, 2023",
             xlab = "PM2.5 daily mean (µg/m³)",
             ylab = "Number of monitor-days") |>
  gf_vline(xintercept = ~ pm_mean, linetype = "dashed",
           color = okabe_ito[6], linewidth = 1)
```

![Histogram of daily PM2.5 concentration in micrograms per cubic meter. Most bars are bunched between roughly 0 and 15, forming a tall peak, and then a long low tail of bars extends rightward past 40 and out toward 60. A vertical dashed line marks the mean near 9.3, sitting to the right of the tallest bars.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA0gAAAH4CAIAAAD/0FrQAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAABJ0AAASdAHeZh94AAAgAElEQVR4nOzde4DM9f7H8c/cd9buWiy7a12SaziFFSESorsT8QvdKF0cdbqhJELooos4nQqnUyLFcQmFnIisiMgtS8mtzWW3tTc7O5fv9/fHh2nO7pqd71zMzuzz8dfs9/v5fuY93/3OzGu+l89Xp6qqAAAAQOTTh7sAAAAABAfBDgAAIEoQ7AAAAKIEwQ4AACBKEOwAAACiBMEOAAAgShDsAAAAogTBDgAAIEoQ7AAAAKIEwQ4AACBKVIlgZy5P9erVW7duPXjw4JUrV7pcrkD6P3bsmOzTPWX37t1mszk5OTng2s8r9yVUq1YtNTW1W7duL7744q+//urZ3uVyuZv99a9/9d55//79ZcvRo0eXmqWq6ldffTVw4MDU1FSr1dquXbspU6bk5OT4Xvmtt95abvFms/nDDz/0smDZtRo4u90u+/z+++/LbeB0Om+55RbZ5r///W8Qnzq4Dh06NGXKlM6dO1evXj0uLu7qq68eP378L7/8Eu66wknTtrpz584hQ4YkJycnJCTceuutS5cuVRQlwG6dTueCBQt69OiRkJCQnJw8dOjQTZs2BfMVAoAv1CqgwpWQlpaWmZnpd/9HjhwptTJ//PFHIUSNGjWCUb6q+nY/39dff93d3ul0es4qKiq6WM9FRUXuZk899ZTnrOLi4q5du5Z9Ir1ev3r1al/KVhQlJibmYgXPnTvXy7Jl12rgSkpKZJ/btm0rO9dut/fq1Uu+wE2bNgXxeYMoJyenZ8+eF1ul999/v91uD3eNpTmdzvnz5+/YsSN0T6FpW506dWrZln369Cm76nzvNi8vr2nTpmVb3nvvvS6XK3QvHABKqULB7tVXXz3i4cCBA19//fULL7xgMBiEECaT6ZdffvGv/0sW7Eq9hF9//fWnn3764osvmjdvLhts3rxZti8V7LzksFWrVrmblQp2AwcOFEIkJSWtX7++pKTE5XL99ttvd911l2x85MiRCsvOzc2VjQ8ePHikjIKCAi/LXuJgV1JS0r17d7klhDSCBOLo0aPx8fFCiHr16i1evDgnJ8flcrlcrtOnT7/11lt6vV4I0atXr8qWJK6//nohxMaNG0P3FL5vqxs3bpQTFy5cWFJS4nQ6t23blpSUJIR49NFH/etWUZTOnTsLIVq0aLFz506n02m329evX5+YmCiEmDhxYuheOACUUoWC3YoVK8qde+LEiVq1agkhGjVq5HQ6g/KMIQp2F3sJdrtd7i1o3769nOIOdvJL6M4777xYz7fddpsQQn4teQY797HdUgFOUZTevXsLIe6+++4Ky5ZHPNPT0316kaF3sWBns9m6dOkihIiJidm/f3+4yvOuuLg4JSVFCNG7d++SkpKyDXbu3Clf3YwZMy59eV506NAhpMHO921VUZQGDRoIIT7++GPPlidOnJA9nDp1yo9uf/jhB9kyOzvbs+W3334rp1fC3agAolWVOMfOu7S0NPkj/tdff/3888/DXY4/TCbTxIkThRDbt2+32Wyesx588EEhxOLFi92ZxlNRUdGKFSt69ep1zTXXlJr1xRdfCCFuv/32hg0bek7X6XQTJkyQfVZYmAy4N9xwg6aXc4mVlJRcf/31mzdvjo+P37dv3xVXXBHuisr38ssvnzx5Mikpafny5eWeetimTZsXX3xRCDFq1Khy/93Ryvdtdf/+/fLcTbkrzi0tLe3+++8XQsybN8+PbgsKCnr37v3II4/In4hunTp1kg9+/vnngF8lAPiEYCeEEC1btrzjjjuEEK+//nqpWU6nc9myZYMHD65fv77Var3sssuGDBny3//+V/U4763C0/wzMjLMZnNCQkK5V2mMHj3abDa/8847gbyEVq1ayQcFBQWe0xs0aHDzzTcLITZv3lx2qfXr1wshRo4cWXZWSUlJ06ZNe/ToUXZWzZo1hRA2m+1i55u7ZWRkiAu7A7Uqu1Z//fVXs9l8zz33CCH27Nlz77331q5du0aNGv369ZMvxA82m61bt25btmypVavWTz/9dPnll1+s5ZYtW+655566detWq1atW7duc+fOLRWeMjMzzWbzsGHDiouLH3744erVq7dt23bOnDlBqdzhcMgzw9544w0vpy0+9thjzZs3HzVq1Llz5zynq6r61VdfDRgwIDk5uVq1atdee+3MmTMLCws923i54kduojNnzpR/+v5yPvzwQ7PZvG3bNiFE9+7dzWbzk08+GfS3g+/bqtyFdsstt5hMplIt+/fvL4T4+OOP/ei2W7dua9as+ec//3mxCuVRcgC4FMK9y/BSkK/0YscxJfnrXAjh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)

*Histogram of daily PM2.5 across all Kern County monitors, 2023. The distribution is strongly right-skewed: a tall cluster of clean days near the low end and a long thin tail of dirty days stretching to the right, with the mean (dashed line) pulled above the bulk of the data.*

```r
pm_region <- pm |>
  mutate(region = ifelse(city == "Bakersfield",
                         "Bakersfield",
                         "Desert (Ridgecrest/Mojave)"))
gf_boxplot(daily_mean ~ region, data = pm_region, fill = ~ region,
           title = "PM2.5 by area of Kern County",
           xlab = "Area of Kern County",
           ylab = "PM2.5 daily mean (µg/m³)") |>
  gf_refine(scale_fill_manual(values = okabe_ito), guides(fill = "none"))
```

![Two side-by-side boxplots of daily PM2.5. The Bakersfield box is centered higher, around 11, with a tall box and a long upper whisker plus many outlier points reaching past 40. The desert box is centered lower, around 4 to 5, is short, and has only a few small outliers.](data:image/png;base64,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kiVLmjRpUjNFAmo6cOCAw7F0RqPx4sWLvq8HAABnvAt2I0aM6Ny58z333JOcnKzX68eNG/fGG28MGDAgJSVl48aNo0aNqqEqARXl5eU5OxUREeHLSgAAcM27WbE6nW7nzp1Lly5VVvZ66623jhw5snHjRiHEgAEDJk+eXCM1AqqyDiStrKCgIDIy0pfFAADggtc7T+j1+pEjR44cOVIIERwcvGHDhitXrgghbrjhhuqvDvADDgfYAQDgh6qypZgdIh0CW1RUVBVOAQDge1XZ5rKkpGT58uVPPfXUvffeK4T46quvzpw5U92FAf7CxZ8u5eXlvqwEAADXvG6x27Zt28CBA21/n82YMePo0aPz588fN25ctdYG+IWrV686O0VzNQDAr3jXYnfmzJnbbrutY8eOO3bseO+995SDS5cubdOmzfjx43/66acaqBBQ2aVLl5ydOn78uC8rAQDANe+C3euvv96gQYNt27b17NmzYcOGysEuXbrs27evefPmr7/+eg1UCKgsNjbW2SnrRiwAAPgD74LdypUrJ0+erNfr7Y7r9fopU6Z8//331VcY4C8GDRrk8LjBYIiLi/NxMQAAuOBdsCsuLna2ImtoaKjJZKqOkgD/EhRUDZPHAQDwAe+CXc+ePT/55BOHpz788MOePXtWR0mAf/n6668dHjcajcoijgAA+Anvgt0zzzyzc+fOefPmWSwW60FJkubNm7dz586xY8dWd3mA+nJycpydOnfunC8rAQDANe/6mO6888777rtv8uTJr7zySkJCghBizJgxX3311dWrV3v37n3ffffVTJGAmsLDw52dio6O9mUlAAC45l2LnUaj+fLLLz/99NPQ0NCjR48KIRYtWiRJ0ttvv/39999rtVVZ7hjwc02aNHF2qm7dur6sBAAA17weFa7Vah999NFHH320sLCwqKgoLCwsJiaGzTQRwOrUqaPRaGRZrnzqypUr9evX931JAAA4VPXpflFRUWyUidqgRYsWDoNdUFBQYmKiKiUBAOBQVYKdLMsVFRUOGzBCQ0OvuSTAv8THx0uSVPl4SEgIww8AAH7Fu19LFotl5syZkZGRoaGhYY7UUJWAig4fPuxwKbvi4uLCwkLf1wMAgDPetdgtWLAgPT09KSlp8ODBYWFhNFegNigqKrJd38cWi3IDAPyKd8Huvffeu+WWW7Zv306kQ+0hSZLDgQdCCIaZAgD8inf57PLly6NGjSLVoVYpKytzdury5cu+rAQAANe8i2h33313dnZ2DZUC+Cej0ejsVGxsrC8rAQDANe+C3euvv/7BBx8cO3ashqoB/JCLYHf16lVfVgIAgGvejbFLTk6eP39+q1atbr755s6dO+v1ersL3nnnneqrDfALLtbfDg4O9mUlAAC45l2wO3To0N///nchxI4dO3bs2FH5AoIdAk+DBg2c7TwBAIBf8S7YTZ06NTQ09Ouvv+7cubPBYKihmgC/0rFjR4fH69Spc8MNN/i4GAAAXPAu2GVlZb3wwgupqak1VA3gh5KTkw0GQ0VFhd3xli1bqlIPAADOeDd5onHjxtHR0TVUCuCffv75Z7PZ7PC4w63GAABQi3fBbsKECR988IGzVfiBgJSdne3wM282my9cuOD7egAAcMa7rtjHH398zZo1ffr0efXVV5s2bRoSEmJ3QUJCQvXVBviFkydPOjvFzhMAAL/iXbALDQ1VNse84447HF7AzEEEHhc7T/zxxx/t2rXzZTEAALjgXbBLT09nUBFqm/DwcGenmjRp4stKAABwzbtgN3369BqqA/BbLjZHLi8vj4iI8GUxAAC44N3kCaAWcrFv2JUrV3xZCQAArhHsgKpjgWIAgF/xrivWDzFdAzXtzz//dHaqtLSUTyBQa1n/+/NzAD7jYvtyxXUf7AoKChwuHgtUl8LCQmenfvrpp7CwMF8WA8DflJeXl5eXq10FaouYmJigIFfh7boPdjExMWqXgAAXHR3tbJhd586d4+LifFwPAD9RWlpaWloaEhLCJCr4D8bYAW507NjR2al69er5shIAAFzzLtjR2oxayGAwODvlYsIsAAC+512wi42NHTNmzP79+xkoitrDxUjVyrvqAQCgIu+C3ciRIz/55JOOHTvWr19//vz5ubm5NVQW4D+YHgEAuF54F+w++OCDkpKS9evXp6SkTJgwIT4+vl+/ft99952ygSwQkFzsPKHT6XxZCQAArnk9eSI4OHjAgAHr1q27evXqZ599duHChdTU1IiIiOnTpx8/frwmSgTU5WIgHX/SAAD8StVnxUZHRz/yyCOHDh06e/ZsWlraW2+91bJly7Zt265cudJisVRjiYC6jh496uwUwQ4A4FeuaR27U6dOrVix4t133/3zzz+1Wu1jjz1WXl4+ePDgFi1a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32K3cePGZ555xnY1k65du+7du7ewsLB79+6lpaU1WR4AAAA85T7YlZSUJCQk2B1s27btjh07cnJyBg4caLFYaqY2AAAAeMF9sGvTps26desqH+/WrdvixYuzsrJGjRoly3IN1AYAgD+SZfnrr79+9NFH77nnnoceeujjjz82m81qFwUI4ckYu0ceeWTcuHGbN2/u27ev3amHH3746NGjs2fPFkJcunSpRgoEAMDPvPjii5s3bzaZTEKIs2fPZmRkZGVlffTRR1otq8NCZe4/go8//nijRo369evXtGnTymfT09MnTZq0ePHi9evX10B5AAD4l+3bt3/33XdKqlOYTKYjR46sWLFCxaoAhcaTXtTi4uJZnjV7wQAAIABJREFUs2b98MMPu3btcnjBN9988/DDD5eUlNAnW0PmzJmzYcMGtauo7cxmc1FRkVarjY6OVrsWiNmzZ3fr1k3tKlAbzZo1a+3atZIk2R1v27btp59+qkZFwP94tPNERETEnDlzXFwwePDg/Pz83377rZqqgr3S0tL8/Hy1q4AQQkiSxL+FP2BIE9Ry7ty5yqlOCHHx4kXfFwPY8XRLMbf0en379u2r625w6HL9rrn1O6ldBaCypoe/Ci613/wG8Jkbb7zx4MGDdn9aaDQah/ttAj5WbcEOPmAKjigNT1S7CkBlkpYfXFDTfffd98UXX9gd1Gg0Dz30kCr1ALbc/3zs0KGD510e2dnZ11YPAAB+rXHjxjNnzkxPT9doNEajMSgoSJKksWPHdu3aVe3SAA+C3W+//WY79wcAgFrurrvu6tChw5o1a44dO5acnDxw4ED6YeEn3Ae7+vXrnzp1KjY29plnnhk+fHizZs00Go0PKgMAwG8lJSU9/PDDpaWlISEhERERapcD/If7dez++OOP48ePT5w48d13323ZsmWrVq0+/PDDS5cuaRzxQcUAAABwyH2w02g0zZs3nzlzZl5e3sGDB++7775nn302MTGxU6dOS5cuvXr1qg+qBAAAgFtebH6i0Wjatm375ptvFhQU7N69u0ePHqNGjYqNjb3jjjtWrVpVUlJSc1UCAADArarsaqfT6bp27frBBx+UlJRs3769YcOG999/f0RExH333Vft9QEAAMBD17QclF6v79mzp8FgKC4u/vrrr7/55pvqKgsAAADeqkqLnRDCYrHs3r177Nix4eHh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)

*Boxplots of daily PM2.5 for Bakersfield monitors versus the desert monitors (Ridgecrest and Mojave). Bakersfield air is both higher on average and far more variable, with many high-side outliers; the desert sites are lower and tighter.*

The two pictures together tell the chapter's story: the histogram explains
*why* the mean exceeded the median (right skew), and the grouped boxplot shows
that the county average hides two very different realities.

:::{important} Durable skill — Quantitative communication (QC)
**What you are practicing:** turning a distribution into a short, honest
sentence a non-statistician can act on. "The average was 9.3, but most days were
cleaner than that — a handful of smoky days pulled the average up" is worth more
to a decision-maker than a wall of numbers.

**Where it transfers:** a nurse charting patient vitals, an analyst briefing a
city council on housing costs, a teacher explaining test-score spread to parents.
In every one of these jobs, *choosing the right summary and saying what it means
in plain language* is the deliverable. Reporting a mean for skewed data without
mentioning the skew is not a math error — it is a communication failure, and it
can mislead real decisions.
:::

(ch02-sec-groups)=
## 2.4 Comparing groups

### Intuition

Most real questions are comparisons: cleaner here or there? higher this year or
last? The tools do not change — you compute the same center and spread — you just
compute them *within each group* and line the results up. The single best picture
for comparison is **side-by-side boxplots**, because they let you compare center,
spread, and outliers at a glance.

### Formula

There is no new formula. You apply the §2.1–2.3 definitions to each group
separately. A compact way to describe a difference in centers is the gap between
group means or medians, e.g. $\bar{x}_{\text{A}} - \bar{x}_{\text{B}}$.

### R

To summarize a variable *within each group*, hand `favstats()` a two-sided
formula: `favstats(y ~ group, data = D)` reads as "the summary of *y* broken down
*by* group." One line replaces a whole pipeline, and it is the workhorse pattern
you will reuse in every later chapter:

```{code-cell} r
:label: ch02-group-summary
favstats(daily_mean ~ site_name, data = pm)
```

Each row is one monitoring site, with its whole distribution on a single line:
the five-number summary (`min`, `Q1`, `median`, `Q3`, `max` — the same five you
would read off a boxplot), plus the `mean`, the `sd`, the sample size `n`, and
any `missing` values. Read across a row for one site's typical level and spread;
read down a column to compare the sites.

:::{important} Durable skill — Quantitative reasoning (QR)
**What you are practicing:** choosing *which* number actually answers the
question, and computing it correctly. A grouped summary forces you to decide:
center or spread? mean or median? per group or pooled? That judgment — matching a
statistic to a question — is quantitative reasoning.

**Where it transfers:** comparing conversion rates across marketing channels,
defect rates across factory shifts, or recovery times across treatments. The
`y ~ group` move — *compute this summary within each group* — is the
split-apply-combine idea behind every pivot table, `GROUP BY` query, and
spreadsheet subtotal on earth; learning it once in R teaches the *idea* that
underlies all data work.
:::

(ch02-sec-worked)=
## Worked examples

(ch02-sec-ex1)=
### Example 1 — Center and spread by hand (a small clean sample)

**Intuition.** Before trusting R, compute everything once by hand on five
numbers so you know what the functions are doing.

**Setup.** Suppose five monitor-days gave PM2.5 readings (µg/m³):
$4, 6, 9, 12, 19$. Find the mean, median, range, variance, standard deviation,
and IQR.

**Formula $\rightarrow$ computation.**

*Mean:*
$$
\bar{x} = \frac{4+6+9+12+19}{5} = \frac{50}{5} = 10.
$$

*Median:* sorted, the values are $4,6,\mathbf{9},12,19$; with $n=5$ (odd) the
middle value is $M = 9$.

*Range:* $19 - 4 = 15$.

*Variance:* the deviations from the mean $\bar{x}=10$ are $-6,-4,-1,2,9$, with
squares $36,16,1,4,81$ summing to $138$. With $n-1 = 4$,
$$
s^2 = \frac{138}{4} = 34.5, \qquad s = \sqrt{34.5} \approx 5.87.
$$

*IQR:* using R's default quartiles on this small set, $Q_1 = 6$ and $Q_3 = 12$,
so $\text{IQR} = 12 - 6 = 6$.

**Check in R.**

```{code-cell} r
:label: ch02-ex1-check
x <- c(4, 6, 9, 12, 19)
c(mean = mean(x), median = median(x),
  range = diff(range(x)), var = var(x), sd = sd(x), iqr = IQR(x))
```

**Interpretation.** A typical reading is about 9–10 µg/m³, and individual days
sit roughly 5.9 µg/m³ away from the mean on average. The mean and median nearly
agree (10 vs. 9), which is what we expect when no single value dominates.

(ch02-sec-ex2)=
### Example 2 — One outlier, two very different statistics

**Intuition.** Add a single wildfire-smoke day to Example 1's sample and watch
which statistics buckle and which hold.

**Setup.** The new sample is $4, 6, 9, 12, 19, 90$ (one extreme day of 90 µg/m³).

**Computation.**

```{code-cell} r
:label: ch02-ex2-check
y <- c(4, 6, 9, 12, 19, 90)
c(mean = mean(y), median = median(y), sd = sd(y), iqr = IQR(y))
```

**Interpretation.** The single extreme value drags the **mean** from 10 up to
about **23.3** and inflates the **SD** from 5.9 to about **33.1** — both more
than tripled by one number. The **median** barely moves (9 $\rightarrow$ 10.5) and the
**IQR** stays modest. This is the precise sense in which the median and IQR are
**resistant** to outliers and the mean and SD are not. For a variable like daily
PM2.5, which genuinely has rare extreme days, that resistance is why the median
is often the fairer "typical day."

(ch02-sec-ex3)=
### Example 3 — The Kern hook, finished (mean vs. median on real data)

**Intuition.** Now answer the opening question with the full real dataset: how
much do "a few bad days" distort Bakersfield's air-quality average?

**Computation.**

```{code-cell} r
:label: ch02-ex3-compute
pm_mean   <- mean(~ daily_mean, data = pm)
pm_median <- median(~ daily_mean, data = pm)
gap       <- pm_mean - pm_median
above     <- mean(~ (daily_mean > pm_mean), data = pm)  # fraction of days above the mean
worst     <- max(~ daily_mean, data = pm)
c(mean = pm_mean, median = pm_median, gap = gap,
  frac_above_mean = above, worst_day = worst)
```

**Interpretation.** The mean (≈ 9.30 µg/m³) exceeds the median (≈ 7.56 µg/m³) by
about **1.73 µg/m³** — the mean is roughly **23% higher** than the typical day.
Only about **38%** of days are above the mean, confirming that most days are
cleaner than the average implies, with the worst day (63.7 µg/m³) and its few
companions doing the pulling *(all values dataset-derived from `kern_airquality`,
`daily_mean`, n = 1,554)*. So the skeptic is partly right: the *average* overstates
the *typical* day. The honest summary reports **both** numbers and names the skew.

(ch02-sec-ex4)=
### Example 4 — Comparing two monitors

**Intuition.** "Kern County air" is an average over very different places. Compare
a busy Bakersfield monitor with a high-desert one.

**Computation.**

```{code-cell} r
:label: ch02-ex4-compute
two_sites <- filter(pm, site_name %in% c("Bakersfield-California", "Ridgecrest-Ward"))
favstats(daily_mean ~ site_name, data = two_sites)
```

**Interpretation.** Bakersfield-California averages about **11.93 µg/m³** with an
SD near **8.33**, while Ridgecrest-Ward averages about **4.55 µg/m³** with an SD
near **2.99** *(dataset-derived from `kern_airquality`)*. The Bakersfield site is
both **dirtier on average and far more variable** — its spread alone (SD 8.33) is
larger than the desert site's entire mean. Reporting only a county-wide average
would hide this gap. This is the comparison habit you will formalize with
inference in [Chapter 10](../ch10/index.md).

(ch02-sec-tryit)=
## Try it — the interactive tools

Reading is not doing. Practice this chapter's skills two ways:

- **Statistics Explorer — Descriptive Statistics & Visualization modules.**
  Load `kern_airquality`, pick `daily_mean`, and click to get the mean, median,
  SD, IQR, histogram, and boxplot. **Every click shows the exact R code it ran**,
  so you can copy it into your own script. (App: `shiny-explorer/`; modules
  *Descriptive Statistics* and *Visualization*, per the
  [blueprint](../BLUEPRINT.md) Phase 5 module list.)
- **Jupyter lab — `labs/lab02-summarizing-numerical-data.ipynb`.** A guided,
  step-by-step walkthrough of `favstats()`, the `gf_*` plots, and grouped
  summaries with `favstats(y ~ group)`, with short exercises and a reflection prompt. Your
  instructor will share the CSUB JupyterHub link.

(ch02-sec-summary)=
## Chapter summary

- A **measure of center** answers "what is typical?" The **mean** $\bar{x}$ is
  the balance point; the **median** $M$ is the middle of the sorted data. For
  skewed data they differ, and the gap is informative.
- A **measure of spread** answers "how much do values vary?" The **range** is
  max − min; the **standard deviation** $s$ is the typical distance from the mean
  (using denominator $n-1$); the **IQR** is the width of the middle half,
  $Q_3 - Q_1$.
- **Mean and SD** suit symmetric data; **median and IQR** are **resistant** and
  suit skewed data or data with outliers. When in doubt, report both and explain.
- Always **plot first**: a **histogram** (or density plot) shows shape, a
  **boxplot** shows the five-number summary and outliers (flagged beyond the
  $1.5 \times \text{IQR}$ fences) and is ideal for comparing groups.
- Read every distribution for **shape, center, spread, and outliers**, and
  describe it in one plain-language sentence.
- In R (all one formula grammar): `mean(~x, data=)`, `median()`, `sd()`, `var()`,
  `IQR()`, `quantile()`, and `favstats(~x, data=)` for center and spread;
  `gf_histogram(~x, data=)` and `gf_boxplot(y ~ g, data=)` for pictures; and
  `favstats(y ~ group, data=)` for per-group summaries.

(ch02-sec-faq)=
## FAQ

**Q1. When should I report the median instead of the mean?**
When the distribution is skewed or has outliers (incomes, house prices, daily
PM2.5). The median answers "typical value" without being dragged by extremes. For
roughly symmetric data, the mean is fine and uses all the information.

**Q2. Why does R divide by $n-1$ for the standard deviation?**
Because the deviations are measured from the *sample* mean, which is itself
estimated from the data. Dividing by $n-1$ (Bessel's correction) corrects a
slight under-estimation, giving an unbiased sample variance. R's `sd()` and
`var()` do this by default.

**Q3. The range and the IQR sound similar — what is the difference?**
The **range** (max − min) uses only the two most extreme values, so one outlier
can blow it up. The **IQR** ($Q_3 - Q_1$) is the spread of the *middle 50%* and
ignores the extreme quarters, so it is resistant. They answer different
questions: total reach vs. typical spread.

**Q4. How many bins should a histogram have?**
There is no single right answer; the bin count is a choice that changes the
story. Too few bins hide structure; too many turn the histogram into noise. Try a
few (e.g. 15, 30, 50) and pick one that shows the shape clearly. A density plot
sidesteps the choice by smoothing.

**Q5. A boxplot flagged some points as outliers. Should I delete them?**
No — not automatically. The $1.5 \times \text{IQR}$ rule flags points to
*investigate*, not to discard. A flagged PM2.5 day might be a real wildfire day,
which is exactly the data you care about. Delete a value only when you have a
documented reason to believe it is an error.

**Q6. Can the mean be larger than most of the data?**
Yes. In a right-skewed distribution the mean sits above the majority of values —
in `kern_airquality`, only about 38% of days exceed the mean. The mean is the
balance point, not "where most days are."

**Q7. What is the difference between variance and standard deviation?**
The **variance** $s^2$ is the average squared deviation; the **standard
deviation** $s = \sqrt{s^2}$ is its square root. The SD is usually reported
because it is in the *same units* as the data (µg/m³, not µg²/m⁶), so it is
directly interpretable as a typical distance from the mean.

(ch02-sec-practice)=
## Practice problems

Problems are numbered in order. **Odd-numbered** answers are in the
[Answers appendix](../appendix/answers.md); full worked solutions are in the
instructor key. Unless a problem says otherwise, round final answers to **2
decimal places** and keep full precision until the last step. Several problems use
real data — load it with `library(mosaic); aq <- read.csv("data/processed/kern_airquality.csv"); pm <- filter(aq, pollutant == "PM2.5")` (the `filter()` keeps only the rows whose `pollutant` equals `"PM2.5"` — `==` tests equality).

**By-hand center and spread.**

1. For the sample $3, 7, 7, 2, 11$, compute the mean and the median by hand.
2. For the sample $5, 8, 8, 10, 14, 21$, compute the mean and the median.
3. For the sample $3, 7, 7, 2, 11$, compute the range, the sample variance, and
   the sample standard deviation by hand (denominator $n-1$).
4. For the sample $2, 4, 4, 4, 5, 5, 7, 9$, compute the standard deviation.
5. A dataset has $\sum x_i = 240$ and $n = 16$. What is the mean?
6. Find $Q_1$, $Q_3$, and the IQR for $4, 8, 15, 16, 23, 42$ using R's default
   quantiles (`quantile()`).

**Reasoning about center, spread, and shape.**

7. A variable has mean 50 and median 38. Is it more likely right-skewed or
   left-skewed? Explain in one sentence.
8. Two classes have the same mean exam score, but class A has SD 4 and class B
   has SD 12. Describe how the two distributions differ.
9. You add one value of 1,000 to a sample of ten values near 20. State what
   happens (rises a lot / barely changes) to each of: mean, median, SD, IQR.
10. Explain in your own words why dividing by $n-1$ instead of $n$ matters for
    the sample variance.
11. A boxplot's box runs from 12 to 28 with the median line at 15. Is the middle
    half of the data skewed? In which direction, and how can you tell?
12. Give a real-world numerical variable you would summarize with the **median**
    rather than the mean, and explain why.

**Reading and choosing plots.**

13. You want to compare the distribution of monthly rent across four Bakersfield
    neighborhoods in one figure. Which plot is best, and why?
14. A histogram of commute times has one tall bar near 10 minutes and a long thin
    tail out to 90 minutes. Name the shape and predict whether the mean or median
    is larger.
15. Using the $1.5 \times \text{IQR}$ rule, find the outlier fences for a variable
    with $Q_1 = 20$ and $Q_3 = 40$, and state whether a value of 75 is flagged.
16. Explain why a density plot can be preferable to a histogram when comparing the
    shapes of two distributions on the same axes.

**Real data — `kern_airquality` (PM2.5 `daily_mean`).**

17. Load the PM2.5 data and report the mean and median of `daily_mean`. Based on
    those two numbers alone, is the distribution skewed, and in which direction?
18. Report the standard deviation and the IQR of PM2.5 `daily_mean`. Which is the
    larger measure of spread here, and why might they differ?
19. Compute the $1.5 \times \text{IQR}$ upper fence for PM2.5 `daily_mean` and
    report how many monitor-days are flagged as high-side outliers.
20. Using `favstats(daily_mean ~ site_name)`, find which monitoring **site** has
    the highest mean PM2.5 and which has the lowest. Report both means.
21. Make a histogram of PM2.5 `daily_mean` with `gf_histogram()`. In one sentence,
    describe its shape, center, and spread.
22. Make side-by-side boxplots of PM2.5 `daily_mean` for `city == "Bakersfield"`
    versus the other cities. Which group is more variable?

**Synthesis and communication.**

23. The worst single PM2.5 day in the file is 63.7 µg/m³. If that one day were
    removed, would the **median** change much? Would the **mean**? Explain your
    reasoning without recomputing.
24. Write a two-sentence, plain-language summary of the PM2.5 `daily_mean`
    distribution suitable for a Bakersfield city-council briefing. Use center,
    spread, and shape, and avoid jargon.
25. An analyst reports "average Kern PM2.5 was 9.3 µg/m³" with no other detail.
    Name one thing this summary hides and how you would fix the report in one
    added sentence.
26. For Ridgecrest-Ward, the SD of PM2.5 is about 2.99 and for
    Bakersfield-California about 8.33. Interpret the practical meaning of that
    difference for someone living near each monitor.
27. The **coefficient of variation** is $\text{CV} = s / \bar{x}$ (often as a
    percent), a unitless measure of relative spread. Compute it for PM2.5
    `daily_mean` and explain what "relative spread" adds beyond the SD alone.
28. Suppose a variable is measured in inches and you convert it to centimeters
    (multiply every value by 2.54). What happens to the mean, the SD, and the
    CV? Explain.
29. You have two summaries of the same variable: one reports mean 9.30 and SD
    7.63; the other reports median 7.56 and IQR 7.70. Which pair would you put in
    a headline, and which in a technical appendix? Justify your choice.
30. In two or three sentences, explain to a classmate who missed this chapter the
    difference between a measure of **center** and a measure of **spread**, with
    one example of each.

## Glossary

New terms introduced in this chapter are added to the book
[Glossary](../appendix/glossary.md): *mean, median, range, variance, standard
deviation, deviation, quartile, interquartile range (IQR), percentile,
distribution, histogram, density plot, boxplot, five-number summary, skew,
outlier, resistant statistic, coefficient of variation.*

## Resumen en español

:::{note} Resumen del capítulo
:class: dropdown
En este capítulo aprendiste a resumir datos numéricos usando dos tipos de
medidas: las **medidas de tendencia central (measures of center)** y las
**medidas de dispersión (measures of spread)**.

Para describir el valor típico de un conjunto de datos, usamos la
**media (the mean)**, que es el promedio aritmético, y la **mediana
(the median)**, que es el valor del centro cuando los datos están ordenados
de menor a mayor. La fórmula de la media muestral es
$\bar{x} = \tfrac{1}{n}\sum x_i$, es decir, se suman todos los valores y se
divide entre el número de observaciones $n$. Cuando los datos tienen una
distribución simétrica, la media y la mediana son casi iguales. Cuando la
distribución es **asimétrica (skewed)** — con una cola larga hacia los valores
altos o bajos — la media se aleja de la mediana, y esa diferencia te dice algo
importante sobre los datos.

Para medir cuánto varían los datos alrededor del centro, usamos tres
herramientas: el **rango (range)**, que es el valor máximo menos el mínimo; la
**desviación estándar (standard deviation)** $s$, que representa la distancia
típica de cada valor a la media; y el **rango intercuartílico (interquartile
range, IQR)** = $Q_3 - Q_1$, que describe la amplitud de la mitad central de
los datos. La media y la desviación estándar son sensibles a los
**valores atípicos (outliers)**; en cambio, la mediana y el IQR son
**estadísticos resistentes (resistant statistics)** porque casi no cambian ante
valores extremos.

El capítulo comenzó con una pregunta real: ¿la calidad del aire en Bakersfield
es tan mala como dicen, o unos pocos días de humo de incendio elevan el
promedio? Con los datos de PM2.5 del condado de Kern (2023), encontramos que la
media fue de aproximadamente 9.30 µg/m³ y la mediana de 7.56 µg/m³. Esa
diferencia confirma que la distribución es asimétrica hacia la derecha: la
mayoría de los días son más limpios de lo que la media sugiere.

En R, la función principal de este capítulo es `favstats()` del paquete
`mosaic`, que muestra la media, la mediana, la desviación estándar, los
cuartiles y más en un solo bloque etiquetado, usando la gramática de fórmulas
`favstats(~ variable, data = D)`. Para visualizar la distribución, usamos
`gf_histogram()` (histograma) y `gf_boxplot()` (diagrama de caja). Cuando
compares grupos, `favstats(y ~ grupo, data = D)` te da un resumen por grupo en
una sola línea de código.
:::
