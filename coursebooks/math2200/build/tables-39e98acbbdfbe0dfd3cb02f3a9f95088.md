---
exports:
  - format: pdf
    template: ../_templates/csub-latex
title: "Distribution Tables"
subtitle: "MATH 2200 — how to read z, t, χ², and F tables"
kernelspec:
  name: ir
  display_name: R
---

Before software, statisticians read **probability tables** to turn a
distribution into a number (a probability or a critical value). You will mostly
use R — `pnorm`, `qt`, and friends — but reading a table by hand cements what
those functions actually *do*, and many exams still hand you one. This appendix
explains how to read each table and then **generates small reference tables with
live R code** so the values are computed, never transcribed.

:::{tip} The one idea behind every table
A distribution table answers one of two questions:

- **"How much area?"** Given a cutoff value, what proportion of the distribution
  lies beyond it? (This is a **probability** — R: `pnorm`, `pt`, `pchisq`,
  `pf`.)
- **"What cutoff?"** Given a tail area you want, what value marks it off? (This
  is a **critical value** or **quantile** — R: `qnorm`, `qt`, `qchisq`, `qf`.)

Confidence intervals need *critical values* (the "what cutoff?" direction);
p-values need *areas* (the "how much area?" direction).
:::

```{code-cell} r
:label: app-tables-setup
# Round helper so every printed table is tidy and reproducible.
fmt <- function(x, d = 4) formatC(x, format = "f", digits = d)
```

---

## 1. The standard Normal (z) table

The **z-table** gives the area to the **left** of a z-score under the standard
Normal curve $N(0, 1)$. To find the area to the *right*, subtract from 1; the
curve's symmetry means the area below $-z$ equals the area above $+z$.

- **R for an area (left tail):** `pnorm(z)`
- **R for a critical value:** `qnorm(area_to_left)`

A two-sided $C\%$ confidence interval uses the critical value $z^\star$ that
puts $(1-C)/2$ in each tail, i.e. `qnorm(1 - (1 - C)/2)`.

```{code-cell} r
:label: app-tables-z-areas
z   <- c(-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 1.96, 2, 2.5)
data.frame(z = z, `area_left_P(Z<z)` = fmt(pnorm(z)), check.names = FALSE)
```

```{code-cell} r
:label: app-tables-z-critical
conf <- c(0.80, 0.90, 0.95, 0.98, 0.99)
data.frame(
  confidence_level = paste0(conf * 100, "%"),
  tail_area_each   = fmt((1 - conf) / 2),
  z_star           = fmt(qnorm(1 - (1 - conf) / 2))
)
```

The **68–95–99.7 rule** is just three z-areas; here are the exact figures:

```{code-cell} r
:label: app-tables-empirical-rule
k <- 1:3
data.frame(
  within_k_SD = k,
  exact_area  = fmt(pnorm(k) - pnorm(-k)),
  rounded     = c("68%", "95%", "99.7%")
)
```

---

## 2. The t table

The **t-distribution** is used for inference about means when $\sigma$ is
unknown. It is bell-shaped but heavier-tailed than the Normal; its shape depends
on the **degrees of freedom** ($df$). As $df$ grows, the t-table converges to
the z-table (look at the bottom row below).

- **R for a critical value:** `qt(1 - tail_area, df)`
- A two-sided $C\%$ CI for a mean uses `qt(1 - (1 - C)/2, df)` with $df = n-1$.

```{code-cell} r
:label: app-tables-t-critical
dfs   <- c(1, 5, 10, 15, 20, 30, 50, 100, Inf)
levels_c <- c(0.90, 0.95, 0.99)
tbl <- sapply(levels_c, function(C) qt(1 - (1 - C) / 2, dfs))
out <- data.frame(df = ifelse(is.finite(dfs), as.character(dfs), "Inf (= z)"),
                  check.names = FALSE)
out[paste0("t*_", levels_c * 100, "%")] <- fmt(tbl)
out
```

:::{note} Worked read
For a 95% CI with $n = 11$ (so $df = 10$), the table gives
$t^\star =$ {eval}`fmt(qt(0.975, 10), 3)`. Compare it to the Normal's
$z^\star =$ {eval}`fmt(qnorm(0.975), 3)`: the t-value is a little larger, widening
the interval to pay for not knowing $\sigma$. Both numbers were computed by the
R chunk above.
:::

---

## 3. The chi-square (χ²) table

The **chi-square distribution** is right-skewed and lives on $[0, \infty)$. We
use it for goodness-of-fit and independence tests, which are always **one-sided
(upper tail)**: only large $\chi^2$ values count as evidence against the null.

- **R for an upper-tail critical value:** `qchisq(1 - alpha, df)`
- **R for a p-value from a statistic:** `pchisq(stat, df, lower.tail = FALSE)`

Degrees of freedom: $k - 1$ for goodness of fit ($k$ categories);
$(r-1)(c-1)$ for an $r \times c$ independence table.

```{code-cell} r
:label: app-tables-chisq-critical
df_chi <- c(1, 2, 3, 4, 5, 6, 8, 10)
alphas <- c(0.10, 0.05, 0.01)
m <- sapply(alphas, function(a) qchisq(1 - a, df_chi))
out <- data.frame(df = df_chi)
out[paste0("alpha=", alphas)] <- fmt(m, 3)
out
```

---

## 4. The F table

The **F-distribution** is used in ANOVA to compare variances. It is
right-skewed and indexed by **two** degrees of freedom: the numerator
$df_1 = k - 1$ (number of groups minus one) and the denominator
$df_2 = N - k$ (total observations minus number of groups). ANOVA tests are
**upper-tailed**: large $F$ means the group means differ.

- **R for a critical value:** `qf(1 - alpha, df1, df2)`
- **R for a p-value:** `pf(F_stat, df1, df2, lower.tail = FALSE)`

Because $F$ needs two $df$'s, a printed table fixes $\alpha$ (here $0.05$) and
lays $df_1$ across the top, $df_2$ down the side:

```{code-cell} r
:label: app-tables-f-critical
df1_vals <- c(1, 2, 3, 4, 5)
df2_vals <- c(5, 10, 15, 20, 30, 60, 120)
fmat <- outer(df2_vals, df1_vals, function(d2, d1) qf(0.95, d1, d2))
out <- data.frame(df2 = df2_vals)
out[paste0("df1=", df1_vals)] <- fmt(fmat, 3)
out
```

:::{note} Worked read
A one-way ANOVA with $k = 3$ groups and $N = 33$ observations has
$df_1 = 2$ and $df_2 = 30$. The $\alpha = 0.05$ critical value is
$F^\star =$ {eval}`fmt(qf(0.95, 2, 30), 3)` (row $df_2 = 30$, column $df_1 = 2$
above). If your computed $F$ exceeds this, reject the null that all three means
are equal.
:::

---

## 5. Quick R reference for every table

| You want… | Direction | R function | Example |
|---|---|---|---|
| Normal area (left) | value $\rightarrow$ area | `pnorm(z)` | `pnorm(1.96)` $\rightarrow$ 0.975 |
| Normal critical value | area $\rightarrow$ value | `qnorm(p)` | `qnorm(0.975)` $\rightarrow$ 1.96 |
| t critical value | area $\rightarrow$ value | `qt(p, df)` | `qt(0.975, 10)` |
| t p-value | value $\rightarrow$ area | `pt(t, df, lower.tail=FALSE)` | upper tail |
| χ² critical value | area $\rightarrow$ value | `qchisq(1-a, df)` | `qchisq(0.95, 3)` |
| χ² p-value | value $\rightarrow$ area | `pchisq(x, df, lower.tail=FALSE)` | always upper tail |
| F critical value | area $\rightarrow$ value | `qf(1-a, df1, df2)` | `qf(0.95, 2, 30)` |
| F p-value | value $\rightarrow$ area | `pf(F, df1, df2, lower.tail=FALSE)` | always upper tail |

:::{tip} Why we still teach the tables
The R functions and the printed tables answer the **same** two questions
("how much area?" / "what cutoff?"). Reading a table once makes `pnorm` and
`qt` stop feeling like magic — you can always sanity-check software against the
reference tables generated on this page.
:::
