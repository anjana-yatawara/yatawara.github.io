---
title: "Appendix D: Python Reference"
subtitle: "MATH 4210 -- setup and every Python function used, by chapter"
---

(appendix-d)=
# Appendix D: Python Reference

This appendix collects, in one place, every piece of Python you need for MATH 4210. Use
it to look up a function you saw in a chapter but forgot the syntax for, to set up Python
on your own machine, or to review the whole toolkit before an exam. It is a reference, not
a tutorial: for the reasoning behind any function, go back to the chapter where it first
appears (each table entry below names that chapter).

## D.1 Setting up Python

The book uses Python 3.12 or later, with three packages: pandas for data, statsmodels for
model fitting, and matplotlib for plots. Install them once, in a terminal:

```bash
pip install pandas statsmodels matplotlib scipy
```

`scipy` comes along because statsmodels leans on it for distributions (t, F, chi-square)
and because a few chapters call `scipy.stats` directly. Chapter 12 makes one brief
appearance by `sklearn` for cross-validated shrinkage; install it only if you reach that
chapter:

```bash
pip install scikit-learn
```

Every chapter's Python code starts with the same three imports. Learn this block once and
you will type it at the top of every script for the rest of the course:

```python
import pandas as pd
import numpy as np
import statsmodels.formula.api as smf
```

`pd` reads and holds your data as a DataFrame (a table with named columns). `np` gives you
array math: square roots, sums, matrix algebra. `smf` is the formula API, the part of
statsmodels that lets you write a model the same way you say it out loud, `sales ~ lotsize`,
rather than building matrices by hand. Chapters that plot also import matplotlib:

```python
import matplotlib.pyplot as plt
```

All code in this book reads data with a relative path, `data/toluca.csv`, assuming you run
Python from the book's root folder. If you run a script from inside a chapter folder
instead, adjust the path or set your working directory first.

## D.2 The core workflow

Almost every example in this book follows the same four-step pattern. Learn this pattern
and you can read (and write) any statsmodels analysis in the course.

```python
df = pd.read_csv("data/toluca.csv")            # 1. load the data
fit = smf.ols("hours ~ lotsize", data=df).fit()  # 2. state the model, fit it
print(fit.summary())                             # 3. inspect the fit
pred = fit.predict(pd.DataFrame({"lotsize": [70]}))  # 4. use the fit
```

In words: you load a table, describe the model as a formula string (response on the left of
`~`, predictors on the right), call `.fit()` to estimate the coefficients, and then pull
whatever you need off the fitted object, a summary table, individual numbers, residuals, or
predictions at new x-values. Every table in Section D.4 is a variation on step 3 or step 4:
some attribute or method you call on `fit` once you have it.

A `fit` object is not just numbers; it is a live Python object with named pieces. The two
you will reach for constantly:

- `fit.params` : a pandas Series of the estimated coefficients, indexed by name (`Intercept`,
  `lotsize`, ...).
- `fit.summary()` : a formatted report with coefficients, standard errors, t statistics,
  p-values, R-squared, and the F test, all at once. Print it whenever you want the full
  picture; pull individual pieces (`fit.rsquared`, `fit.pvalues`) when you need one number in
  code.

Formulas support the same shorthand throughout the book: `y ~ x1 + x2` for multiple
regression, `y ~ x1 * x2` for two predictors plus their interaction, `y ~ x1 + I(x1**2)` for
a squared term (the `I()` wrapper tells the formula parser "compute this, do not treat `**`
as formula syntax"), and `y ~ C(group)` to force a numeric-looking column to be treated as
categorical.

## D.3 Reading the tables below

Each chapter section lists the Python functions and methods that chapter uses, in the order
they first appear, with a one-line description and a minimal runnable example. Examples use
the book's own datasets so you can paste them into a Python session and see real output. They
are deliberately short: for the full worked analysis, see the chapter's numbered examples and
its `code/chNN_examples.py` file, which contains every code block from the chapter verbatim.

Some entries are pandas methods (`Series.mean`), some are numpy functions (`numpy.sqrt`),
some are scipy distribution functions (`scipy.stats.t.ppf`), and some are methods on a fitted
statsmodels object (`fit.resid`). The dotted path tells you where to find it: `pandas.read_csv`
lives on the `pd` module, `fit.resid` lives on whatever object you got back from `.fit()`.

## D.4 Functions by chapter

### Chapter 1: Regression as a way of thinking

Data: `toluca.csv`, `salaries.csv`, `orings.csv`, `galton_heights.csv`, `anscombe.csv`

| Function | What it does | Example |
|---|---|---|
| `pandas.read_csv` | Loads a CSV file into a DataFrame | `df = pd.read_csv("data/toluca.csv")` |
| `statsmodels.formula.api.ols` | States a linear model from a formula | `fit = smf.ols("hours ~ lotsize", data=df).fit()` |
| `fit.params` | Coefficient estimates, by name | `fit.params["lotsize"]` |
| `fit.predict` | Predicted values at new x | `fit.predict(pd.DataFrame({"lotsize": [70]}))` |
| `Series.mean` | Column mean | `df["hours"].mean()` |
| `Series.min` | Column minimum | `df["hours"].min()` |
| `Series.corr` | Correlation between two columns | `df["lotsize"].corr(df["hours"])` |
| `Series.var` | Column variance | `df["hours"].var()` |
| `len` | Number of rows (built-in Python) | `len(df)` |
| `pandas.DataFrame` | Builds a small table by hand | `pd.DataFrame({"lotsize": [70]})` |
| `DataFrame.round` | Rounds every numeric column | `df.round(2)` |
| `numpy` | The numeric-array module | `import numpy as np` |

### Chapter 2: Simple linear regression

Data: `toluca.csv`, `toluca_mini.csv` (see @ch02-slr-model, @ch02-least-squares)

| Function | What it does | Example |
|---|---|---|
| `pandas.read_csv` | Loads a CSV file | `df = pd.read_csv("data/toluca.csv")` |
| `statsmodels.formula.api.ols` | Fits the simple linear regression model | `fit = smf.ols("hours ~ lotsize", data=df).fit()` |
| `fit.params` | The estimates b0, b1 | `fit.params["Intercept"]` |
| `fit.predict` | Fitted value or prediction at new x | `fit.predict(df)` |
| `fit.resid` | Residuals e_i = y_i - yhat_i | `fit.resid` |
| `fit.fittedvalues` | Fitted values yhat_i | `fit.fittedvalues` |
| `fit.summary` | Full regression report | `print(fit.summary())` |
| `numpy.sum` | Sum of an array | `np.sum(fit.resid ** 2)` |
| `numpy.sqrt` | Square root | `np.sqrt(mse)` |
| `numpy.polyfit` | Least-squares polynomial fit by hand (bypasses statsmodels) | `np.polyfit(df["lotsize"], df["hours"], 1)` |
| `numpy.random.default_rng` | Seeded random number generator | `rng = np.random.default_rng(4210)` |
| `rng.normal` | Draws normal random values | `rng.normal(0, 1, size=10)` |

### Chapter 3: Inference for simple linear regression

Data: `toluca.csv`, `advertising.csv` (see @ch03-anova-table, @ch03-f-test, @ch03-prediction-interval)

| Function | What it does | Example |
|---|---|---|
| `pandas.read_csv` | Loads a CSV file | `df = pd.read_csv("data/toluca.csv")` |
| `statsmodels.formula.api.ols` | Fits the model | `fit = smf.ols("hours ~ lotsize", data=df).fit()` |
| `fit.summary` | Coefficients, SEs, t, p, R-squared, F | `print(fit.summary())` |
| `fit.conf_int` | Confidence intervals for coefficients | `fit.conf_int(alpha=0.05)` |
| `fit.params` | Coefficient estimates | `fit.params` |
| `fit.resid` | Residuals | `fit.resid` |
| `fit.fittedvalues` | Fitted values | `fit.fittedvalues` |
| `fit.get_prediction` | Prediction object for CI or PI at new x | `pr = fit.get_prediction(pd.DataFrame({"lotsize": [70]}))` |
| `get_prediction.conf_int` | CI (or PI with `obs=True`) from a prediction object | `pr.conf_int(obs=True, alpha=0.05)` |
| `statsmodels.api.stats.anova_lm` | ANOVA table for a fitted model | `sm.stats.anova_lm(fit)` |
| `scipy.stats.t.ppf` | t distribution quantile (critical value) | `stats.t.ppf(0.975, df=23)` |
| `scipy.stats.f.ppf` | F distribution quantile | `stats.f.ppf(0.95, 1, 23)` |
| `numpy.random.default_rng` | Seeded RNG | `rng = np.random.default_rng(4210)` |
| `numpy.sum` | Sum of an array | `np.sum(fit.resid ** 2)` |
| `numpy.sqrt` | Square root | `np.sqrt(mse)` |

### Chapter 4: Correlation

Data: `savings.csv`, `anscombe.csv`, `galton_heights.csv` (see @ch04-r-and-slope)

| Function | What it does | Example |
|---|---|---|
| `pandas.read_csv` | Loads a CSV file | `df = pd.read_csv("data/savings.csv")` |
| `DataFrame.corr` | Correlation matrix of all numeric columns | `df.corr(numeric_only=True)` |
| `Series.corr` | Correlation between two columns | `df["sr"].corr(df["ddpi"])` |
| `statsmodels.formula.api.ols` | Fits the regression to compare against r | `fit = smf.ols("sr ~ ddpi", data=df).fit()` |
| `fit.params` | Coefficient estimates | `fit.params` |
| `fit.rsquared` | R-squared (equals r^2 in simple regression) | `fit.rsquared` |
| `fit.tvalues` | t statistics for each coefficient | `fit.tvalues` |
| `fit.pvalues` | p-values for each coefficient | `fit.pvalues` |
| `scipy.stats.pearsonr` | Pearson r with its p-value | `stats.pearsonr(df["sr"], df["ddpi"])` |
| `scipy.stats.spearmanr` | Spearman rank correlation | `stats.spearmanr(df["sr"], df["ddpi"])` |
| `scipy.stats.norm.ppf` | Normal quantile (for the Fisher z interval) | `stats.norm.ppf(0.975)` |
| `numpy.arctanh` | Fisher z transform of r | `np.arctanh(r)` |
| `numpy.tanh` | Inverse Fisher z transform | `np.tanh(z)` |
| `numpy.corrcoef` | Correlation matrix from arrays | `np.corrcoef(df["sr"], df["ddpi"])` |
| `numpy.random.default_rng` | Seeded RNG | `rng = np.random.default_rng(4210)` |
| `DataFrame.groupby` | Splits a table by a grouping column | `df.groupby("country").mean(numeric_only=True)` |

### Chapter 5: Randomization and bootstrap inference for regression

Data: `punting.csv`, `toluca.csv` (see @ch05-permutation-slope, @ch05-bootstrap)

| Function | What it does | Example |
|---|---|---|
| `pandas.read_csv` | Loads a CSV file | `df = pd.read_csv("data/punting.csv")` |
| `statsmodels.formula.api.ols` | Fits the observed model | `fit = smf.ols("Distance ~ RStr", data=df).fit()` |
| `fit.summary` | Full report | `print(fit.summary())` |
| `fit.pvalues` | p-values for each coefficient | `fit.pvalues` |
| `fit.bse` | Standard errors of the coefficients | `fit.bse` |
| `fit.conf_int` | Confidence intervals | `fit.conf_int()` |
| `numpy.random.default_rng` | Seeded RNG that drives every resample | `rng = np.random.default_rng(4210)` |
| `rng.permutation` | Shuffles an array (for a permutation test) | `rng.permutation(df["Distance"].to_numpy())` |
| `rng.integers` | Random integer indices (for bootstrap resampling) | `rng.integers(0, len(df), size=len(df))` |
| `rng.choice` | Random sample with replacement | `rng.choice(df.index, size=len(df), replace=True)` |
| `numpy.sum`, `numpy.mean`, `numpy.std` | Basic array summaries | `np.mean(boot_slopes)` |
| `numpy.quantile` | Percentile of an array (bootstrap CI endpoints) | `np.quantile(boot_slopes, [0.025, 0.975])` |
| `numpy.abs` | Absolute value | `np.abs(t_stat)` |
| `numpy.max` | Maximum of an array | `np.max(perm_slopes)` |
| `numpy.empty`, `numpy.array`, `numpy.asarray` | Preallocate or build arrays for a resampling loop | `boot_slopes = np.empty(2000)` |

### Chapter 6: Matrix algebra for regression

Data: `dwaine.csv` (see @ch06-matrix-mult, @ch06-inverse, @ch06-projection, @ch06-random-vectors, @ch06-mvn)

| Function | What it does | Example |
|---|---|---|
| `pandas.read_csv` | Loads a CSV file | `df = pd.read_csv("data/dwaine.csv")` |
| `numpy.column_stack` | Builds the design matrix **X** from columns | `X = np.column_stack([np.ones(len(df)), df["targtpop"], df["dispoinc"]])` |
| `numpy.ones` | A column of 1s, for the intercept | `np.ones(len(df))` |
| `numpy.array` | Builds an array or vector by hand | `y = np.array(df["sales"])` |
| `numpy.allclose` | Checks two arrays are equal within rounding error | `np.allclose(X @ b, fit.fittedvalues)` |
| `numpy.linalg.matrix_rank` | Rank of a matrix | `np.linalg.matrix_rank(X)` |
| `numpy.linalg.det` | Determinant of a square matrix | `np.linalg.det(X.T @ X)` |
| `numpy.linalg.inv` | Matrix inverse | `np.linalg.inv(X.T @ X)` |
| `numpy.round` | Rounds every entry of an array | `np.round(X.T @ X, 2)` |
| `numpy.trace` | Sum of the diagonal (trace) | `np.trace(H)` |
| `numpy.eye` | Identity matrix | `np.eye(3)` |
| `numpy.sqrt` | Square root | `np.sqrt(np.diag(cov))` |
| `numpy.diag` | Extracts or builds a diagonal | `np.diag(H)` |
| `numpy.linalg.cholesky` | Cholesky factor of a covariance matrix | `np.linalg.cholesky(sigma)` |
| `numpy.cov` | Sample covariance matrix | `np.cov(X, rowvar=False)` |
| `numpy.random.default_rng` | Seeded RNG | `rng = np.random.default_rng(4210)` |
| `rng.standard_normal` | Draws standard normal values | `rng.standard_normal((100, 3))` |
| `statsmodels.formula.api.ols` | Fits the model to check the matrix formulas | `fit = smf.ols("sales ~ targtpop + dispoinc", data=df).fit()` |
| `fit.params` | Coefficient estimates, to compare against b = (X'X)^-1 X'y | `fit.params` |
| `fit.summary2` | Alternate summary report, easier to read programmatically | `fit.summary2()` |

### Chapter 7: The general linear model

Data: `dwaine.csv`, `toluca.csv` (see @ch07-ls-matrix, @ch07-hat-matrix, @ch07-gauss-markov, @ch07-geometry)

| Function | What it does | Example |
|---|---|---|
| `pandas.read_csv` | Loads a CSV file | `df = pd.read_csv("data/dwaine.csv")` |
| `numpy.column_stack` | Builds the design matrix | `X = np.column_stack([np.ones(len(df)), df["targtpop"], df["dispoinc"]])` |
| `numpy.ones` | Intercept column | `np.ones(len(df))` |
| `numpy.linalg.inv` | Matrix inverse, for (X'X)^-1 | `np.linalg.inv(X.T @ X)` |
| `numpy.trace` | Trace of the hat matrix (equals p) | `np.trace(H)` |
| `numpy.diag` | Diagonal entries (leverages h_ii) | `np.diag(H)` |
| `numpy.sqrt` | Square root | `np.sqrt(mse)` |
| `numpy.allclose` | Checks agreement between hand and statsmodels fits | `np.allclose(b, fit.params)` |
| `numpy.round` | Rounds for display | `np.round(H, 3)` |
| `statsmodels.formula.api.ols` | Fits the model directly | `fit = smf.ols("sales ~ targtpop + dispoinc", data=df).fit()` |
| `numpy.random.default_rng` | Seeded RNG | `rng = np.random.default_rng(4210)` |

### Chapter 8: Multiple regression in practice

Data: `dwaine.csv`, `bodyfat3.csv`, `savings.csv` (see @ch08-extra-ss, @ch08-general-linear-test, @ch08-avplots)

| Function | What it does | Example |
|---|---|---|
| `pandas.read_csv` | Loads a CSV file | `df = pd.read_csv("data/bodyfat3.csv")` |
| `statsmodels.formula.api.ols` | Fits the full or reduced model | `fit = smf.ols("bodyfat ~ triceps + thigh + midarm", data=df).fit()` |
| `fit` | The fitted-model object itself, reused across a general linear test | `full = smf.ols("bodyfat ~ triceps + thigh + midarm", data=df).fit()` |
| `fit.params` | Coefficient estimates | `fit.params` |
| `fit.ssr` | Error sum of squares, SSE | `fit.ssr` |
| `fit.resid` | Residuals | `fit.resid` |
| `fit.tvalues` | t statistics | `fit.tvalues` |
| `fit.df_resid` | Residual degrees of freedom | `fit.df_resid` |
| `fit.rsquared` | R-squared | `fit.rsquared` |
| `fit.rsquared_adj` | Adjusted R-squared | `fit.rsquared_adj` |
| `statsmodels.api.OLS` | Lower-level OLS constructor (matrix input, not a formula) | `sm.OLS(y, X).fit()` |
| `numpy.polyfit` | Quick polynomial fit outside statsmodels | `np.polyfit(df["thigh"], df["bodyfat"], 1)` |

### Chapter 9: Model diagnostics

Data: `gala.csv`, `savings.csv`, `toluca.csv` (see @ch09-leverage points, @ch09-studentized, @ch09-cooks-distance)

| Function | What it does | Example |
|---|---|---|
| `pandas.read_csv` | Loads a CSV file | `df = pd.read_csv("data/gala.csv")` |
| `statsmodels.formula.api.ols` | Fits the model | `fit = smf.ols("Species ~ Area + Elevation", data=df).fit()` |
| `fit.get_influence` | Builds the influence-diagnostics object | `infl = fit.get_influence()` |
| `influence.hat_matrix_diag` | Leverages h_ii | `infl.hat_matrix_diag` |
| `influence.resid_studentized_internal` | Internally studentized residuals | `infl.resid_studentized_internal` |
| `influence.resid_studentized_external` | Externally studentized (deleted) residuals | `infl.resid_studentized_external` |
| `influence.cooks_distance` | Cook's distance for each observation | `infl.cooks_distance[0]` |
| `influence.dffits` | DFFITS for each observation | `infl.dffits[0]` |
| `influence.dfbetas` | DFBETAS for each coefficient and observation | `infl.dfbetas` |
| `fit.resid` | Raw residuals | `fit.resid` |
| `fit.fittedvalues` | Fitted values | `fit.fittedvalues` |
| `fit.rsquared` | R-squared | `fit.rsquared` |
| `fit.scale` | MSE (estimated error variance) | `fit.scale` |
| `fit.ssr` | SSE | `fit.ssr` |
| `statsmodels.stats.api.het_breuschpagan` | Breusch-Pagan test for non-constant variance | `sm.stats.het_breuschpagan(fit.resid, fit.model.exog)` |
| `scipy.stats.shapiro` | Shapiro-Wilk test for normality of residuals | `stats.shapiro(fit.resid)` |
| `scipy.stats.t.ppf` | t quantile for a cutoff line | `stats.t.ppf(0.975, df=fit.df_resid)` |
| `scipy.stats.f.sf` | Upper-tail F probability (Cook's distance benchmark) | `stats.f.sf(d, 3, fit.df_resid)` |
| `statsmodels.stats.stattools.durbin_watson` | Durbin-Watson statistic | `durbin_watson(fit.resid)` |
| `numpy.random.default_rng` | Seeded RNG | `rng = np.random.default_rng(4210)` |
| `numpy.argsort` | Indices that would sort an array | `np.argsort(infl.cooks_distance[0])` |
| `numpy.argmax` | Index of the largest value | `np.argmax(infl.cooks_distance[0])` |

### Chapter 10: Remedial measures and transformations

Data: `mammals.csv`, `cars.csv`, `strongx.csv`, `gala.csv`, `savings.csv`

| Function | What it does | Example |
|---|---|---|
| `pandas.read_csv` | Loads a CSV file | `df = pd.read_csv("data/mammals.csv")` |
| `numpy.log` | Natural log, for a log-log model | `np.log(df["body"])` |
| `numpy.sqrt` | Square root, a milder variance-stabilizing transform | `np.sqrt(df["body"])` |
| `statsmodels.formula.api.ols` | Fits an ordinary least-squares model | `fit = smf.ols("np.log(brain) ~ np.log(body)", data=df).fit()` |
| `statsmodels.formula.api.wls` | Fits a weighted least-squares model | `fit = smf.wls("dist ~ speed", data=df, weights=w).fit()` |
| `statsmodels.formula.api.rlm` | Fits a robust regression, resistant to outliers | `fit = smf.rlm("dist ~ speed", data=df).fit()` |
| `numpy.linalg.lstsq` | Direct least-squares solve, outside the formula API | `b, *_ = np.linalg.lstsq(X, y, rcond=None)` |
| `numpy.column_stack` | Builds a design matrix | `X = np.column_stack([np.ones(len(df)), df["speed"]])` |
| `fit.params` | Coefficient estimates | `fit.params` |
| `fit.rsquared` | R-squared | `fit.rsquared` |
| `fit.bse` | Standard errors | `fit.bse` |
| `fit.predict` | Predicted values | `fit.predict(df)` |
| `fit.weights` | The weights used in a WLS fit | `fit.weights` |
| `fit.get_influence` | Influence diagnostics on the fit | `fit.get_influence()` |
| `numpy.arange` | Evenly spaced values, for a grid to plot over | `np.arange(0, 25, 0.5)` |
| `numpy.argmax` | Index of the largest value | `np.argmax(resid ** 2)` |
| `pandas.Series` | Builds a labeled 1-D array | `pd.Series(weights)` |
| `pandas.DataFrame` | Builds a small table by hand | `pd.DataFrame({"speed": grid})` |

### Chapter 11: Categorical predictors and interactions

Data: `salaries.csv`, `cars.csv` (see @ch11-dummy-coding, @ch11-interactions, @ch11-polynomial)

| Function | What it does | Example |
|---|---|---|
| `pandas.read_csv` | Loads a CSV file | `df = pd.read_csv("data/salaries.csv")` |
| `pandas.Categorical` | Marks a column as categorical, with a chosen level order | `df["rank"] = pd.Categorical(df["rank"], categories=["AsstProf", "AssocProf", "Prof"])` |
| `pandas.DataFrame.rename` | Renames columns | `df.rename(columns={"yrs.since.phd": "yrs_phd"})` |
| `pandas.DataFrame.groupby` | Splits by group, for group means | `df.groupby("rank")["salary"].mean()` |
| `pandas.DataFrame.value_counts` | Counts of each category | `df["rank"].value_counts()` |
| `statsmodels.formula.api.ols` | Fits a model with dummy coding or interactions | `fit = smf.ols("salary ~ C(rank) * sex", data=df).fit()` |
| `fit.params` | Coefficient estimates, including dummy contrasts | `fit.params` |
| `fit.summary2` | Alternate summary report | `fit.summary2()` |
| `fit.predict` | Predicted values at new rows | `fit.predict(newdata)` |
| `fit.model.exog` | The numeric design matrix statsmodels built from the formula | `fit.model.exog` |
| `fit.fvalue` | Overall F statistic | `fit.fvalue` |
| `statsmodels.stats.anova.anova_lm` | ANOVA table, e.g. to test an interaction term | `anova_lm(reduced, full)` |
| `numpy.corrcoef` | Correlation matrix from arrays | `np.corrcoef(df["speed"], df["dist"])` |
| `C` | Formula wrapper that forces categorical treatment | `smf.ols("salary ~ C(discipline)", data=df)` |
| `Treatment` | Chooses the reference level inside `C()` | `C(rank, Treatment(reference="AsstProf"))` |

### Chapter 12: Multicollinearity, variable selection, and validation

Data: `fat.csv` (see @ch12-vif, @ch12-criteria, @ch12-cross-validation, @ch12-shrinkage)

| Function | What it does | Example |
|---|---|---|
| `pandas.read_csv` | Loads a CSV file | `df = pd.read_csv("data/fat.csv")` |
| `smf.ols` | Fits a candidate model | `fit = smf.ols("brozek ~ age + weight + height", data=df).fit()` |
| `numpy.linalg.lstsq` | Direct least-squares solve | `np.linalg.lstsq(X, y, rcond=None)` |
| `itertools.combinations` | Generates predictor subsets for best-subsets search | `list(combinations(predictors, 3))` |
| `get_influence().hat_matrix_diag` | Leverages, used inside a validation loop | `fit.get_influence().hat_matrix_diag` |
| `numpy.random.default_rng` | Seeded RNG for the train/test split | `rng = np.random.default_rng(4210)` |
| `sklearn.linear_model.LassoCV` | Lasso regression with built-in cross-validation | `LassoCV(cv=10).fit(X, y)` |
| `sklearn.linear_model.RidgeCV` | Ridge regression with built-in cross-validation | `RidgeCV(cv=10).fit(X, y)` |
| `sklearn.linear_model.Lasso` | Lasso at a fixed penalty | `Lasso(alpha=0.5).fit(X, y)` |
| `sklearn.preprocessing.StandardScaler` | Standardizes predictors before shrinkage | `StandardScaler().fit_transform(X)` |

### Chapter 13: Logistic regression

Data: `orings.csv`, `pima.csv` (see @ch13-logistic-model, @ch13-odds-ratio, @ch13-mle)

| Function | What it does | Example |
|---|---|---|
| `statsmodels.formula.api.glm` | Fits a generalized linear model | `fit = smf.glm("damage ~ temp", data=df, family=sm.families.Binomial()).fit()` |
| `statsmodels.api.families.Binomial` | The binomial family, for logistic regression | `sm.families.Binomial()` |
| `fit.summary` | Full GLM report | `print(fit.summary())` |
| `fit.predict` | Predicted probabilities | `fit.predict(pd.DataFrame({"temp": [31]}))` |
| `fit.params` | Coefficient estimates, on the log-odds scale | `fit.params` |
| `fit.conf_int` | Confidence intervals for the coefficients | `fit.conf_int()` |
| `scipy.stats.chi2.sf` | Upper-tail chi-square probability, for a deviance test | `stats.chi2.sf(dev_diff, df=1)` |
| `pandas.crosstab` | Two-way count table | `pd.crosstab(df["test"], df["glucose"] > 140)` |
| `numpy.exp` | Exponentiates log-odds to get odds | `np.exp(fit.params)` |
| `numpy.linalg.solve` | Solves a linear system (used inside Newton-Raphson by hand) | `np.linalg.solve(info, score)` |

### Chapter 14: Poisson regression and the GLM idea

Data: `gala.csv`, `ships.csv`, `toluca.csv` (see @ch14-poisson-model, @ch14-glm)

| Function | What it does | Example |
|---|---|---|
| `pandas.read_csv` | Loads a CSV file | `df = pd.read_csv("data/ships.csv")` |
| `statsmodels.formula.api.glm` | Fits a GLM | `fit = smf.glm("incidents ~ type + year", data=df, family=sm.families.Poisson()).fit()` |
| `statsmodels.api.families.Poisson` | The Poisson family, for count data | `sm.families.Poisson()` |
| `statsmodels.api.families.Gaussian` | The Gaussian family (ordinary regression as a GLM) | `sm.families.Gaussian()` |
| `statsmodels.formula.api.ols` | Fits ordinary least squares, for comparison | `smf.ols("Species ~ Area", data=df).fit()` |
| `numpy.exp` | Exponentiates the linear predictor to get a rate | `np.exp(fit.params)` |
| `numpy.log` | Natural log, the Poisson link function | `np.log(df["incidents"] + 1)` |
| `fit.params` | Coefficient estimates | `fit.params` |
| `fit.bse` | Standard errors | `fit.bse` |
| `fit.fittedvalues` | Fitted mean counts | `fit.fittedvalues` |
| `fit.resid_pearson` | Pearson residuals | `fit.resid_pearson` |
| `fit.df_resid` | Residual degrees of freedom | `fit.df_resid` |

### Chapter 15: Regression with time: autocorrelation and forecasting

Data: `airpassengers.csv` (see @ch15-autocorrelation, @ch15-forecasting)

| Function | What it does | Example |
|---|---|---|
| `pandas.read_csv` | Loads a CSV file | `df = pd.read_csv("data/airpassengers.csv")` |
| `numpy.arange` | Builds a time index | `np.arange(len(df))` |
| `numpy.log` | Log transform to stabilize a multiplicative trend | `np.log(df["passengers"])` |
| `numpy.exp` | Undoes a log transform to return to the original scale | `np.exp(pred_log)` |
| `statsmodels.formula.api.ols` | Fits the trend model | `fit = smf.ols("np.log(passengers) ~ t", data=df).fit()` |
| `fit.params` | Coefficient estimates | `fit.params` |
| `fit.rsquared` | R-squared | `fit.rsquared` |
| `fit.scale` | MSE | `fit.scale` |
| `fit.resid` | Residuals, inspected for leftover autocorrelation | `fit.resid` |
| `fit.fittedvalues` | Fitted values | `fit.fittedvalues` |
| `fit.model.exog` | Design matrix, used to build a forecast row | `fit.model.exog` |
| `fit.get_prediction` | Prediction object, for a prediction interval | `fit.get_prediction(newdata)` |
| `statsmodels.stats.stattools.durbin_watson` | Durbin-Watson statistic for autocorrelated residuals | `durbin_watson(fit.resid)` |
| `numpy.diff` | Differences consecutive values (a simple detrending step) | `np.diff(df["passengers"])` |
| `numpy.linalg.lstsq` | Direct least-squares solve for a Cochrane-Orcutt style fit | `np.linalg.lstsq(X, y, rcond=None)` |
| `numpy.random.default_rng` | Seeded RNG | `rng = np.random.default_rng(4210)` |
| `rng.standard_normal` | Simulated normal errors, for a forecast demonstration | `rng.standard_normal(12)` |
| `numpy.sqrt` | Square root | `np.sqrt(mse)` |
| `numpy.mean` | Mean of an array | `np.mean(errors)` |

### Chapter 16: Path analysis and a look ahead

Data: `duncan.csv` (see @ch16-path-diagrams)

| Function | What it does | Example |
|---|---|---|
| `pandas.read_csv` | Loads a CSV file | `df = pd.read_csv("data/duncan.csv")` |
| `statsmodels.formula.api.ols` | Fits each structural equation in the path model | `fit = smf.ols("prestige ~ income + education", data=df).fit()` |
| `fit.params` | Path-coefficient estimates | `fit.params` |
| `DataFrame.corr` | Correlation matrix among all variables in the path diagram | `df.corr(numeric_only=True)` |
| `DataFrame.mean` | Column means | `df.mean(numeric_only=True)` |
| `DataFrame.std` | Column standard deviations | `df.std(numeric_only=True)` |
| `Series.corr` | Correlation between two variables | `df["income"].corr(df["prestige"])` |
| `numpy` | The numeric-array module | `import numpy as np` |

## D.5 Common errors and fixes

- **`PatsyError: model is missing required outcome variables`.** Your formula string
  misspelled a column name, or you passed `data=` a DataFrame that does not contain that
  column. Check `df.columns` against your formula.
- **A categorical column fits as if it were numeric.** Wrap it: `C(column_name)`. Without
  `C()`, a column of small integers (like a Likert rating) is treated as a continuous
  predictor, not a set of groups.
- **`fit.predict(new_row)` raises a `KeyError` or gives the wrong answer.** The new data must
  be a DataFrame with the same column names as the original fit, even if it has only one row:
  `pd.DataFrame({"lotsize": [70]})`, not a bare list or Series.
- **Results differ slightly from a hand calculation.** statsmodels uses QR decomposition
  internally rather than the textbook (X'X)^-1 X'y formula; the two agree to many decimal
  places but not to the last bit. Use `numpy.allclose`, not `==`, to compare them.
- **`np.log` of a negative or zero value gives `nan` or a warning.** Check the variable's
  range before transforming; a log transform requires strictly positive values (add a small
  constant only when the chapter's method calls for it, and say so in your write-up).
