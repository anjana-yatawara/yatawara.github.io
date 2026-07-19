---
title: "Appendix C: R Reference"
subtitle: "MATH 4210 -- setup and every R function used, by chapter"
---

(appC-r-reference)=
# Appendix C: R Reference

This appendix is a lookup table, not a tutorial. Use it to install R and the course
packages once, to find the one-line syntax for reading a course dataset, and to look up any
R function you saw in a chapter but forgot how it works. Functions are grouped by the
chapter that introduces them; a function used again in a later chapter is not repeated,
so if you cannot find something under "your" chapter, check an earlier one.

## Installing R for this course

The course was built and checked against **R 4.6.0**. Download it from
[CRAN](https://cran.r-project.org/) for your operating system, then install
[RStudio Desktop](https://posit.co/download/rstudio-desktop/) as your editor; it is not
required, but it makes running the chapter code much easier.

Every dataset in this book loads with base R alone (`read.csv`), but several chapters use
add-on packages for diagnostics, model selection, and shrinkage. Install all of them once,
before you start Chapter 2:

```r
install.packages(c(
  "faraway", "car", "leaps", "lmtest", "ggplot2", "broom",
  "glmnet", "ellipse", "dplyr", "MASS", "boot", "carData", "HistData"
))
```

`MASS` and `boot` ship with R itself, so `install.packages` will report they are already
present; the line above is safe to run regardless. Load a package in any R session with
`library(packagename)` before using its functions; the chapter tables below note which
package each function comes from when it is not base R.

:::{note} Checking your setup
Run `R.version.string` at the console; it should report `"R version 4.6.0"` or later. Run
`library(faraway)` and `library(car)`; if either errors with "there is no package called",
re-run the `install.packages` line above.
:::

## Reading course data

Every dataset used in this book lives in `data/` as a plain CSV, one row per observation,
with column headers already set to the names used in the chapters. Read any of them with
base R's `read.csv`, giving the path relative to the book's root folder:

```r
toluca <- read.csv("data/toluca.csv")
head(toluca)
```

```text
  lotsize hours
1      80   399
2      30   121
3      50   221
4      90   376
5      70   361
6      60   224
```

All chapter R code assumes your working directory is the book's root folder (the one that
contains `data/`), so every `read.csv` call in the book uses a path like `"data/toluca.csv"`,
never a full file-system path. In RStudio, open the project at the book root, or set it
by hand with `setwd("path/to/book-myst")` before running any chapter's code. See
@appE-datasets for the story, provenance, and variable list of every dataset.

## How to read the tables below

Each row gives the function, the package it comes from (blank means base R, already loaded
in any session), a one-line description of what it does, and a minimal example. Functions
are listed once, in the chapter where the book first uses them; later chapters build on
these without repeating the entry. `library(...)` itself is not tabulated; load whichever
package a function's row names before calling it.

### Chapter 1: Regression as a way of thinking

| Function | Package | Purpose | Example |
|---|---|---|---|
| `read.csv` | base | Read a CSV file into a data frame. | `d <- read.csv("data/toluca.csv")` |
| `lm` | base | Fit a linear model by least squares. | `fit <- lm(hours ~ lotsize, data = d)` |
| `coef` | base | Extract fitted coefficients from a model. | `coef(fit)` |
| `predict` | base | Compute fitted or predicted values from a model. | `predict(fit)` |
| `mean` | base | Arithmetic mean of a vector. | `mean(d$hours)` |
| `min` | base | Smallest value in a vector. | `min(d$lotsize)` |
| `sum` | base | Sum of a vector's entries. | `sum(d$hours)` |
| `nrow` | base | Number of rows in a data frame. | `nrow(d)` |
| `cor` | base | Pearson correlation between two vectors. | `cor(d$lotsize, d$hours)` |
| `var` | base | Sample variance of a vector. | `var(d$hours)` |
| `sapply` | base | Apply a function to each element of a list or vector, simplifying the result. | `sapply(d, class)` |
| `round` | base | Round a number to a given number of decimal places. | `round(3.14159, 2)` |
| `plot` | base | Draw a scatterplot or other base-R plot. | `plot(d$lotsize, d$hours)` |
| `abline` | base | Add a straight line to an existing plot. | `abline(fit)` |
| `par` | base | Get or set plotting parameters (layout, margins). | `par(mfrow = c(1, 2))` |
| `data.frame` | base | Build a data frame from named vectors. | `data.frame(x = 1:3, y = 4:6)` |

### Chapter 2: Simple linear regression

| Function | Package | Purpose | Example |
|---|---|---|---|
| `residuals` | base | Extract residuals $e_i = Y_i - \hat{Y}_i$ from a fitted model. | `residuals(fit)` |
| `fitted` | base | Extract fitted values $\hat{Y}_i$ from a fitted model. | `fitted(fit)` |
| `summary` | base | Print a model's coefficients, standard errors, $t$ tests, and $R^2$. | `summary(fit)` |
| `sqrt` | base | Square root. | `sqrt(25)` |
| `set.seed` | base | Fix the random-number generator's starting point for reproducibility. | `set.seed(4210)` |
| `replicate` | base | Repeat an expression a fixed number of times, collecting the results. | `replicate(1000, mean(rnorm(10)))` |
| `rnorm` | base | Draw random values from a Normal distribution. | `rnorm(10, mean = 0, sd = 1)` |
| `sd` | base | Sample standard deviation of a vector. | `sd(d$hours)` |

### Chapter 3: Inference for simple linear regression

| Function | Package | Purpose | Example |
|---|---|---|---|
| `confint` | base | Confidence intervals for a model's coefficients. | `confint(fit, level = 0.95)` |
| `anova` | base | Analysis-of-variance table for a fitted model. | `anova(fit)` |
| `qt` | base | Quantile (inverse CDF) of the $t$ distribution. | `qt(0.975, df = 23)` |
| `qf` | base | Quantile (inverse CDF) of the $F$ distribution. | `qf(0.95, df1 = 1, df2 = 23)` |

### Chapter 4: Correlation

| Function | Package | Purpose | Example |
|---|---|---|---|
| `cor.test` | base | Hypothesis test and confidence interval for a correlation. | `cor.test(d$lotsize, d$hours)` |
| `atanh` | base | Inverse hyperbolic tangent; the Fisher $z$ transform of a correlation. | `atanh(0.86)` |
| `tanh` | base | Hyperbolic tangent; inverts the Fisher $z$ transform. | `tanh(1.29)` |
| `qnorm` | base | Quantile (inverse CDF) of the standard Normal distribution. | `qnorm(0.975)` |
| `aggregate` | base | Compute a summary statistic for each group in a data frame. | `aggregate(hours ~ lotsize, data = d, FUN = mean)` |
| `which.max` | base | Index of the largest value in a vector. | `which.max(d$hours)` |

### Chapter 5: Randomization and bootstrap inference for regression

| Function | Package | Purpose | Example |
|---|---|---|---|
| `sample` | base | Draw a random sample (with or without replacement) from a vector. | `sample(d$hours, size = 25, replace = TRUE)` |
| `numeric` | base | Create a numeric vector of a given length, filled with zeros. | `numeric(1000)` |
| `quantile` | base | Sample quantiles of a vector (used for bootstrap percentile intervals). | `quantile(boot_slopes, c(0.025, 0.975))` |
| `abs` | base | Absolute value. | `abs(-3.5)` |
| `max` | base | Largest value in a vector. | `max(d$hours)` |
| `length` | base | Number of elements in a vector. | `length(d$hours)` |
| `c` | base | Combine values into a vector. | `c(1, 2, 3)` |

### Chapter 6: Matrix algebra for regression

| Function | Package | Purpose | Example |
|---|---|---|---|
| `dim` | base | Dimensions (rows, columns) of a matrix or data frame. | `dim(X)` |
| `head` | base | First few rows of a data frame or matrix. | `head(d)` |
| `ncol` | base | Number of columns in a matrix or data frame. | `ncol(X)` |
| `cbind` | base | Bind vectors or matrices together as columns. | `X <- cbind(1, d$lotsize)` |
| `colnames` | base | Get or set a matrix's column names. | `colnames(X) <- c("intercept", "lotsize")` |
| `matrix` | base | Build a matrix from a vector, given its dimensions. | `matrix(1:6, nrow = 2)` |
| `t` | base | Transpose a matrix. | `t(X)` |
| `%*%` | base | Matrix multiplication. | `t(X) %*% X` |
| `isSymmetric` | base | Test whether a matrix equals its own transpose. | `isSymmetric(t(X) %*% X)` |
| `qr` | base | QR decomposition of a matrix (used internally by `lm`, and for rank checks). | `qr(X)$rank` |
| `det` | base | Determinant of a square matrix. | `det(t(X) %*% X)` |
| `solve` | base | Matrix inverse, or solve a linear system $\mathbf{A}\mathbf{x} = \mathbf{b}$. | `solve(t(X) %*% X)` |
| `diag` | base | Extract or construct a diagonal matrix. | `diag(3)` |
| `as.numeric` | base | Coerce an object to a plain numeric vector. | `as.numeric(coef(fit))` |
| `chol` | base | Cholesky decomposition of a symmetric positive-definite matrix. | `chol(t(X) %*% X)` |
| `cov` | base | Sample covariance matrix of a data frame or matrix. | `cov(d)` |

### Chapter 7: The general linear model

| Function | Package | Purpose | Example |
|---|---|---|---|
| `all.equal` | base | Test near-equality of two numeric objects, up to rounding error. | `all.equal(coef(fit), b_hand)` |

### Chapter 8: Multiple regression in practice

| Function | Package | Purpose | Example |
|---|---|---|---|
| `resid` | base | Extract residuals from a fitted model (identical to `residuals`). | `resid(fit)` |
| `scale` | base | Center and/or scale the columns of a matrix or data frame. | `scale(d[, c("triceps", "thigh")])` |
| `as.data.frame` | base | Coerce an object (e.g. a matrix) to a data frame. | `as.data.frame(scale(d))` |
| `deviance` | base | Residual sum of squares of a fitted model. | `deviance(fit)` |

### Chapter 9: Model diagnostics

| Function | Package | Purpose | Example |
|---|---|---|---|
| `hatvalues` | base | Leverage values $h_{ii}$, the diagonal of the hat matrix. | `hatvalues(fit)` |
| `rstandard` | base | Standardized (internally studentized) residuals. | `rstandard(fit)` |
| `rstudent` | base | Studentized deleted (externally studentized) residuals. | `rstudent(fit)` |
| `cooks.distance` | base | Cook's distance, an overall influence measure for each observation. | `cooks.distance(fit)` |
| `dffits` | base | DFFITS, the standardized change in a fitted value when one case is deleted. | `dffits(fit)` |
| `dfbetas` | base | DFBETAS, the standardized change in each coefficient when one case is deleted. | `dfbetas(fit)` |
| `factor` | base | Convert a variable to a categorical factor. | `d$grp <- factor(d$grp)` |
| `bptest` | lmtest | Breusch-Pagan test for nonconstant error variance. | `bptest(fit)` |
| `shapiro.test` | base | Shapiro-Wilk test for Normality of a sample. | `shapiro.test(residuals(fit))` |
| `dwtest` | lmtest | Durbin-Watson test for autocorrelated residuals. | `dwtest(fit)` |
| `library` | base | Load an installed package into the current session. | `library(lmtest)` |
| `sort` | base | Sort a vector in increasing (or decreasing) order. | `sort(cooks.distance(fit))` |
| `which` | base | Indices of the `TRUE` entries of a logical vector. | `which(hatvalues(fit) > 0.5)` |
| `range` | base | Minimum and maximum of a vector, as a length-2 vector. | `range(d$hours)` |
| `tapply` | base | Apply a function to a vector, grouped by a factor. | `tapply(d$hours, d$grp, mean)` |
| `pf` | base | Cumulative distribution function of the $F$ distribution. | `pf(4.2, df1 = 1, df2 = 23, lower.tail = FALSE)` |

### Chapter 10: Remedial measures and transformations

| Function | Package | Purpose | Example |
|---|---|---|---|
| `log` | base | Natural logarithm (base $e$). | `log(d$body)` |
| `boxcox` | MASS | Profile log-likelihood plot for the Box-Cox family of power transformations. | `MASS::boxcox(fit)` |
| `qchisq` | base | Quantile (inverse CDF) of the chi-squared distribution. | `qchisq(0.95, df = 1)` |
| `rlm` | MASS | Fit a robust regression by iteratively reweighted least squares, down-weighting outliers. | `MASS::rlm(y ~ x, data = d)` |
| `rbind` | base | Bind vectors or data frames together as rows. | `rbind(row1, row2)` |

### Chapter 11: Categorical predictors and interactions

| Function | Package | Purpose | Example |
|---|---|---|---|
| `relevel` | base | Change which level of a factor is the reference (baseline) level. | `d$rank <- relevel(d$rank, ref = "AsstProf")` |
| `model.matrix` | base | Build the design matrix $\mathbf{X}$ a model uses, including dummy columns. | `model.matrix(fit)` |
| `I` | base | Protect an expression from formula notation, so it is used as-is. | `lm(y ~ x + I(x^2), data = d)` |
| `pmax` | base | Elementwise maximum across two or more vectors. | `pmax(0, x - 5)` |
| `expand.grid` | base | Build a data frame of every combination of the given values. | `expand.grid(x = 1:3, grp = c("a", "b"))` |
| `table` | base | Cross-tabulate one or more factors. | `table(d$rank, d$sex)` |

### Chapter 12: Multicollinearity, variable selection, and validation

| Function | Package | Purpose | Example |
|---|---|---|---|
| `vif` | car | Variance inflation factors, a multicollinearity diagnostic. | `car::vif(fit)` |
| `regsubsets` | leaps | Best-subsets search across candidate predictors. | `leaps::regsubsets(y ~ ., data = d)` |
| `AIC` | base | Akaike information criterion of a fitted model. | `AIC(fit)` |
| `BIC` | base | Bayesian (Schwarz) information criterion of a fitted model. | `BIC(fit)` |
| `order` | base | Indices that would sort a vector. | `order(d$hours)` |
| `formula` | base | Extract or build a model formula object. | `formula(fit)` |
| `glmnet` | glmnet | Fit a ridge, lasso, or elastic-net penalized regression path. | `glmnet::glmnet(as.matrix(X), y, alpha = 1)` |
| `cv.glmnet` | glmnet | Cross-validated `glmnet` fit, chooses the penalty by held-out error. | `glmnet::cv.glmnet(as.matrix(X), y, alpha = 1)` |
| `as.matrix` | base | Coerce a data frame to a plain numeric matrix. | `as.matrix(d[, c("x1", "x2")])` |

### Chapter 13: Logistic regression

| Function | Package | Purpose | Example |
|---|---|---|---|
| `glm` | base | Fit a generalized linear model (here, with `family = binomial`). | `glm(damage_bin ~ temp, data = d, family = binomial)` |
| `confint.default` | base | Wald (asymptotic Normal) confidence intervals for a `glm`'s coefficients. | `confint.default(fit)` |
| `drop1` | base | Compare a model to each of its one-term-simpler versions (likelihood-ratio tests). | `drop1(fit, test = "Chisq")` |
| `exp` | base | Exponential function; converts a log-odds coefficient to an odds ratio. | `exp(coef(fit))` |
| `pchisq` | base | Cumulative distribution function of the chi-squared distribution. | `pchisq(5.2, df = 1, lower.tail = FALSE)` |
| `outer` | base | Outer product: apply a function to every pair from two vectors. | `outer(1:3, 1:3, "+")` |
| `cut` | base | Cut a numeric vector into labeled bins (used to build calibration groups). | `cut(fitted(fit), breaks = 5)` |

### Chapter 14: Poisson regression and the GLM idea

| Function | Package | Purpose | Example |
|---|---|---|---|
| `poisson` | base | Family object for Poisson `glm` fits (log link by default). | `glm(count ~ x, data = d, family = poisson)` |
| `quasipoisson` | base | Family object for overdispersed count data; same mean model, inflated variance. | `glm(count ~ x, data = d, family = quasipoisson)` |
| `gaussian` | base | Family object for `glm` fits with a Normal response (recovers ordinary `lm`). | `glm(y ~ x, data = d, family = gaussian)` |
| `df.residual` | base | Residual degrees of freedom of a fitted model. | `df.residual(fit)` |
| `glm.nb` | MASS | Negative-binomial regression, for overdispersed counts. | `MASS::glm.nb(count ~ x, data = d)` |

### Chapter 15: Regression with time: autocorrelation and forecasting

| Function | Package | Purpose | Example |
|---|---|---|---|
| `seq_len` | base | Generate the sequence `1, 2, ..., n`. | `seq_len(nrow(d))` |
| `diff` | base | Lagged differences of a vector. | `diff(d$passengers)` |
| `subset` | base | Filter rows of a data frame by a logical condition. | `subset(d, year >= 1955)` |

### Chapter 16: Path analysis and a look ahead

No new functions beyond those already tabulated in earlier chapters; Chapter 16 reuses
`lm`, `coef`, `cor`, `scale`, `cooks.distance`, `factor`, and `relevel` to build a path
model from a sequence of ordinary regressions.

:::{note} `package::function` notation
A double colon, as in `MASS::boxcox(fit)`, calls a function from a specific package
without first running `library(MASS)`. Both styles work once the package is installed;
the book uses `package::function` the first time a function appears in a chapter, so you
can see at a glance which package it needs, and the bare function name afterward.
:::

See @appendix-d for the equivalent lookup table in Python, and @appE-datasets
for full documentation of every dataset named in the examples above.
