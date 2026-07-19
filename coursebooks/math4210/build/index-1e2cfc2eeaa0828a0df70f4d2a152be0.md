---
title: "Welcome"
subtitle: "MATH 4210 -- Regression Modeling and Analysis"
---

## MATH 4210: Regression Modeling and Analysis

**California State University, Bakersfield, Department of Mathematics**
**4 units | Fall 2026 | Tuesday and Thursday, 8:15-9:50 AM | Science III 239**
**Instructor: Anjana Yatawara | ayatawara@csub.edu**

This is the coursebook for MATH 4210, an advanced undergraduate course in
applied regression. It is a free, open coursebook: you can read it on a
laptop or a phone, search it, copy its code, and keep it after the semester
ends. Nothing in it is behind a paywall.

## What this book is

This book teaches regression as a way of answering real questions with data,
not as a list of formulas to memorize. Every chapter opens with a genuine
dataset and a question someone actually cared about, builds the theory
needed to answer it, and proves every result along the way at a level you
can follow with the matrix algebra the book itself teaches in Chapter 6.

Three commitments run through every chapter:

:::{tip} How every idea is built
1. **Intuition first.** Plain-language motivation. Why does this idea exist,
   and what question does it answer? No symbols yet.
2. **Formula second.** The notation, with every symbol defined the first time
   it appears. The formula is a precise restatement of the intuition, not a
   new mystery.
3. **R and Python third.** Executed code, in both languages, on the same
   data file, so you see the idea run and can run it yourself. R is this
   course's primary language; Python is carried alongside it because that is
   what many of you will use after graduation.
:::

We never publish a number the book did not compute. Every figure, summary
statistic, and worked answer is produced by code that runs on a real,
documented dataset, or it carries a citation to its source. Every derivation
is complete: this book does not write "algebra left to the reader" in its
exposition. Where a full proof genuinely needs graduate-level machinery, the
book says so plainly, proves what is provable at our level, and points you to
where the rest is proved.

## How to self-study from this book

If you miss a class meeting, or simply want to work ahead, you can learn a
full chapter alone. Each chapter is built to make that possible:

- **Read the opening vignette first.** It is the real question the chapter
  answers, stated before any theory.
- **Read the Learning objectives box.** It tells you exactly what you should
  be able to do when you finish, in concrete, checkable terms.
- **Follow intuition, then formula, then computation, in order.** Do not skip
  to the formula. The intuition is what makes the formula stick.
- **Do every "Try it" box as you reach it.** Each one is a short task with a
  complete solution in a dropdown right below it. Attempt the task honestly
  before opening the solution.
- **Read every derivation.** They are written out in full, never compressed
  to "it can be shown that."
- **Watch for Durable skill callouts.** Each chapter flags at least two
  skills, quantitative reasoning, critical thinking, quantitative
  communication, or self-directed learning, that outlive this course, and
  says how to keep practicing them.
- **Work the Practice problems in order: A, then B, then C.** Band A checks
  concepts, Band B asks you to derive and prove, Band C asks you to analyze
  real data in R and/or Python. Answers to odd-numbered problems are in
  [Appendix H](appendix/answers.md); check yourself there before you compare
  notes with a classmate.
- **Read the chapter summary and FAQ last.** They tie the chapter together
  and clear up the misunderstandings students most often bring to office
  hours.

## Roadmap of the book

The book has sixteen chapters in five parts, plus a reference appendix.

**Part I. Regression from the ground up (Chapters 1-5).** Simple linear
regression from first principles: what a statistical model is, least
squares by hand, inference for a slope, correlation, and what to do when the
usual normal-theory assumptions are in doubt (permutation and bootstrap
methods). By the end of Part I you can fit, interpret, and defend a
one-predictor regression completely.

**Part II. The linear model in matrix form (Chapters 6-8).** A
self-contained introduction to the matrix algebra the rest of the book
needs, then the general linear model: least squares, the hat matrix,
Gauss-Markov, and multiple regression in practice. By the end of Part II you
can fit and interpret a regression with any number of predictors and prove
the properties of the estimator that make it trustworthy.

**Part III. Building and checking models (Chapters 9-12).** How to tell
whether a fitted model is any good: residual diagnostics, influence and
leverage values, transformations and weighted least squares, categorical predictors
and interactions, and multicollinearity, model selection, and validation. By
the end of Part III you can take a fitted model apart and decide whether to
trust it.

**Part IV. Regression for other kinds of response (Chapters 13-14).** What
happens when the response is not a continuous, normally distributed number:
logistic regression for binary outcomes and Poisson regression for counts,
introduced as two cases of the general idea of a generalized linear model.

**Part V. Special topics (Chapters 15-16).** Two self-study chapters for the
end of the semester: regression with autocorrelated, time-ordered data, and
path analysis, a first look at using sequences of regressions to reason
about direct and indirect effects.

The appendices in the back are reference material you will return to all
semester: a chapter-by-chapter formula summary, statistical tables, R and
Python quick references, a datasheet for every dataset in the book, a
which-method decision guide, a glossary, and answers to the odd-numbered
practice problems.

## Course notation

This book follows the notation of Kutner, Nachtsheim, and Neter's *Applied
Linear Regression Models* ("ALRM"), the standard for the applied-regression
tradition this course sits in. Learn this table now; every later chapter
uses it without re-explaining it (though each chapter reminds you of a
symbol's meaning in a single line the first time it reappears).

| Symbol | Read as | Meaning |
|---|---|---|
| $Y_i$ | "Y sub i" | the response (dependent variable) for observation $i$ |
| $X_i$ | "X sub i" | the predictor for observation $i$; with more than one predictor, $X_{i1}, X_{i2}, \dots$ (@ch02 notes the synonyms other books use) |
| $\beta_0, \beta_1$ | "beta naught, beta one" | the true (population) intercept and slope parameters; unknown constants |
| $b_0, b_1$ | "b naught, b one" | the least-squares **estimates** of $\beta_0, \beta_1$, computed from sample data; equivalently written $\hat{\beta}_0, \hat{\beta}_1$ ("beta-hat") |
| $\varepsilon_i$ | "epsilon sub i" | the true (unobservable) random error for observation $i$; the book assumes $\varepsilon_i \sim N(0, \sigma^2)$, independent across $i$ |
| $e_i$ | "e sub i" | the **residual** $e_i = Y_i - \hat{Y}_i$, the observable stand-in for $\varepsilon_i$ |
| $\hat{Y}_i$ | "Y-hat sub i" | the fitted (predicted) value for observation $i$ |
| $n$ | "n" | the number of observations (sample size) |
| $p$ | "p" | the number of regression parameters, **including** the intercept (so simple linear regression has $p = 2$) |
| $\sigma^2$ | "sigma squared" | the true error variance |
| $s^2$ (or MSE) | "s squared" | the estimated error variance |
| SSTO | "S-S-T-O" | total sum of squares, $\sum (Y_i - \bar{Y})^2$ |
| SSR | "S-S-R" | regression sum of squares, $\sum (\hat{Y}_i - \bar{Y})^2$ |
| SSE | "S-S-E" | error sum of squares, $\sum (Y_i - \hat{Y}_i)^2$ |
| MSR | "M-S-R" | regression mean square, SSR divided by its degrees of freedom |
| MSE | "M-S-E" | error mean square, SSE divided by its degrees of freedom; also the estimate of $\sigma^2$ |
| $r$ | "r" | the sample Pearson correlation coefficient |
| $R^2$ | "R squared" | the coefficient of determination, SSR / SSTO |
| $\mathbf{Y}$ | "Y" (bold) | the $n \times 1$ response vector, matrix form |
| $\mathbf{X}$ | "X" (bold) | the $n \times p$ design (model) matrix, matrix form |
| $\boldsymbol{\beta}$ | "beta" (bold) | the $p \times 1$ parameter vector |
| $\mathbf{b}$ | "b" (bold) | the $p \times 1$ least-squares estimate of $\boldsymbol{\beta}$ |
| $\mathbf{X}'$ | "X transpose" or "X prime" | the transpose of $\mathbf{X}$; transpose is always written with a prime in this book |
| $\mathbf{H}$ | "hat matrix" | the hat matrix, $\mathbf{H} = \mathbf{X}(\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}'$, so that $\hat{\mathbf{Y}} = \mathbf{H}\mathbf{Y}$ |
| $s^2\{b_1\}$ | "s squared of b one" | the estimated variance of the sampling distribution of $b_1$ (ALRM's brace notation for the estimated variance of any statistic) |
| $N(\mu, \sigma^2)$ | "N of mu, sigma squared" | the normal distribution, parameterized here by its **variance** (see the note below) |

:::{important} Notation changes since MATH 2200
If you took MATH 2200 at CSUB, two conventions are different here, on
purpose, because this course follows the applied-regression literature
instead of the introductory-statistics literature:

1. **The normal distribution.** MATH 2200 wrote $N(\mu, \sigma)$, giving the
   normal distribution's **standard deviation** in the second slot. This book
   writes $N(\mu, \sigma^2)$, giving the **variance** in the second slot. Both
   conventions are common in the wild; you must check which one a source is
   using every time you read $N(\mu, \cdot)$ outside this book.
2. **Roman letters for estimates.** MATH 2200 used a hat on a Greek letter
   for every estimate ($\hat{p}$, $\hat{\mu}$). This book keeps the hat
   notation available ($\hat{\beta}_0, \hat{\beta}_1$) but more often uses the
   plain Roman letters $b_0, b_1$ for the least-squares estimates of
   $\beta_0, \beta_1$, following ALRM. The two notations mean exactly the same
   thing; $b_1$ and $\hat{\beta}_1$ are the same number. This book says so
   once, in Chapter 2, and then uses $b_0, b_1$ throughout.
:::

## Software setup

Every worked example in this book runs in both R and Python, reading the
same CSV file from the book's `data/` folder. R is the course's primary
language (a catalog requirement); Python is carried alongside it. You will
need both installed and working before Chapter 1's first worked example.

- **R setup, packages, and a function-by-function reference for every
  chapter**: see [Appendix C, R Quick Reference](appendix/r-reference.md).
- **Python setup, packages, and a function-by-function reference for every
  chapter**: see [Appendix D, Python Quick Reference](appendix/python-reference.md).

## Accessibility

This book is built to be usable by everyone:

- **Every figure has meaningful alt text** describing what the figure shows,
  not just that a figure exists.
- **Color is never the only signal.** Plots use a colorblind-safe palette,
  and important distinctions are also carried by shape, position, or labels.
- **Tables have proper headers**, and text and background colors are chosen
  for readable contrast.
- **The layout is responsive**, so the book reads cleanly on a phone, and the
  site has full-text search.

If you use a screen reader or other assistive technology and hit a barrier in
this book, that is a bug worth fixing. Tell your instructor so it can be
reported to the CSUB Department of Mathematics.

## Licensing, in one sentence

The writing is free to reuse and adapt under **CC BY-SA 4.0**, and the code
is **MIT**.

---

Welcome to MATH 4210. Open R (or Python, or both), pick up Chapter 1, and
let us begin with the question that gave regression its name.
