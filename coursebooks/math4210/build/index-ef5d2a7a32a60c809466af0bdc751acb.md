---
title: "1. Regression as a way of thinking"
subtitle: "MATH 4210, Chapter 1"
---

(ch01)=
# 1. Regression as a way of thinking

:::{div}
:class: lang-toggle
[Español](./es.md)
:::

Three people are staring at three tables of numbers, and each of them has to decide something.

A production engineer at the Toluca Company has records from 25 manufacturing runs: the size of
each lot and the labor hours it took. She has to recommend a lot size that keeps costs down, and
to do that she needs to know how hours grow with lot size. A single number would settle it: how
many extra hours does one more unit in the lot cost? @fig-ch01-toluca is her data.

```{figure} ../ch02/figures/fig_ch02_toluca_scatter.png
:name: fig-ch01-toluca
:alt: Scatterplot of 25 Toluca production runs, work hours on the vertical axis against lot size on the horizontal axis, with an upward-sloping straight line through the cloud. Work hours climb from about 110 at a lot size of 20 to over 500 at a lot size of 120.
Twenty-five production runs at the Toluca Company. Bigger lots take more hours, and the trend looks straight, but which line is the right one, and how far can you trust its slope? Chapter 2 answers both.
```

On the night of January 27, 1986, a very different table sat in front of engineers deciding
whether to launch the space shuttle Challenger the next morning. For 23 earlier flights they had
the launch temperature and the number of O-rings, out of six, that showed heat damage. The
forecast for launch was about 31 degrees Fahrenheit, colder than any flight on record. Could they
say what the damage risk would be at a temperature they had never flown? @fig-ch01-orings is what
they had to reason from.

```{figure} ../ch13/figures/fig_ch13_orings_temp.png
:name: fig-ch01-orings
:alt: Scatterplot of the fraction of six O-rings damaged against launch temperature in degrees Fahrenheit for 23 shuttle flights. The coolest flights near 53 degrees show the highest damage; warm flights above 70 degrees mostly show none. A red dashed line marks the 31 degree launch far to the left of every observation.
The 23 flights before Challenger. Damage was worst at the coldest launches, and the launch under discussion (dashed line, 31 degrees) sat far below anything ever flown. Judging that risk means extending a pattern past the last data point. Chapter 13 takes it on.
```

A dean at a US college has a third table: for 397 professors, their rank, discipline, years of
experience, sex, and salary. The table was built to answer a pointed question. Men in the data
earn about fourteen thousand dollars a year more than women, on average. Is that gap evidence of
unequal pay, or does it just reflect that the two groups differ in rank and experience? A raw
average cannot tell the difference. @fig-ch01-salary shows how salary climbs with rank alone,
which is one of the things that has to be accounted for before the sex gap means anything.

```{figure} ../ch11/figures/fig_ch11_salary_rank.png
:name: fig-ch01-salary
:alt: A boxplot with jittered points of academic salary in thousands of dollars for three faculty ranks, Assistant, Associate, and Full. Salaries climb from around 80 thousand for Assistant professors to a wide spread centered near 127 thousand for Full professors, with red diamonds marking the group means.
Nine-month salary rises steeply with rank. Before a raw male-female salary gap can mean anything, a model has to hold rank, discipline, and experience fixed. Chapter 11 builds that model.
```

A cost, a catastrophe, and a question of fairness. On the surface they have nothing in common. But
each one is the same kind of problem: someone wants to know how one quantity depends on others, so
they can describe it, predict it, or act on it. That is what **regression** does (Definition 1.1),
and it is the subject of this book. This first chapter is a map. It says what regression is and what it is for,
where the word came from, how the idea grew over two centuries, where it sits in modern data
science and machine learning, and what each of the next fifteen chapters will teach you. There is
almost no math here and nothing to memorize. The goal is to give you the lay of the land before
you start walking it.

:::{admonition} This lesson at a glance
:class: important
- **What we are doing:** Meeting regression as a single idea through three real problems, a production cost, a shuttle launch, and a salary gap, and mapping what the semester will cover.
- **Why we are doing it:** Before any technique, you need to know what regression is for and to keep straight its three uses, describing a relationship, predicting a new case, and reasoning about cause.
- **Main objective:** Say what regression is, name its three uses, and identify the parts of a statistical model (systematic part, random part, parameters, estimates).
- **Where we begin:** With almost no math, only questions. The Toluca cost line (@ch02), the Challenger launch (@ch13), and the faculty salary gap (@ch11) are the threads the rest of the book picks up.
:::

:::{admonition} Learning objectives
:class: tip
By the end of this chapter you will be able to:
- **Explain** what regression is and distinguish its three uses: describing a relationship, predicting a new outcome, and reasoning about cause.
- **Describe** where the word "regression" came from in Galton's height data, and what "regression to the mean" means.
- **Identify** the parts of a statistical model: the systematic part, the random part, the parameters, and their estimates.
- **Distinguish** association from causation, and observational data from experimental data, and say why the difference matters.
- **Locate** regression inside the wider fields of statistics, machine learning, and data science, and explain why judging a model is now a scarcer skill than fitting one.
- **Navigate** the semester by naming the question each chapter answers.
- **Set up** R and Python and use this book to teach yourself.
:::

(ch01-what)=
## 1.1 What regression does

The three opening stories look unrelated, but each one asks the same question, and one tool
answers all three. Regression studies how one quantity, the **response**, changes with one or more
others, the **predictors** (Definition 1.2). Write the response $Y$ and a predictor $X$. Regression
fits a rule that says what value of $Y$ to expect at each value of $X$. It does this without
pretending the world is tidy: two lots of the same size took different hours, and two flights at the
same temperature had different damage. The rule describes the average behavior and treats the
leftover scatter honestly.

:::{admonition} Definition 1.1: Regression
:class: note definition
**Regression** is a method for studying how a response $Y$ changes with one or more predictors $X$.
It fits a rule for the expected value of $Y$ at each setting of $X$ and treats the remaining scatter
as random noise, rather than assuming the relationship is exact.
:::

:::{admonition} Definition 1.2: Response and predictor
:class: note definition
The **response** $Y$ is the variable a regression tries to explain or predict (also called the
dependent or outcome variable). A **predictor** $X$ is a variable used to explain or predict the
response (also called an independent or explanatory variable).
:::

People reach for that rule for three different reasons, and keeping them straight is the first
habit this course wants to build.

**Description.** Sometimes you just want to summarize a relationship that is already in front of
you. How much do work hours rise, on average, per extra unit of lot size? The answer is a slope,
a single interpretable number, and reporting it is description. You are not predicting anything
new or claiming that lot size causes hours in some deep sense; you are compressing a cloud of
points into a sentence a manager can use.

**Prediction.** Sometimes you want a number for a case you have not seen yet. Next week's run is
100 units: how many hours should we budget? A prediction plugs a new $X$ into the fitted rule and
reads off the expected $Y$, ideally with a margin of error attached. Good prediction does not
require that you understand *why* $X$ and $Y$ move together, only that the pattern that held in
the data keeps holding. This is the goal that dominates modern machine learning.

**Causal reasoning.** Sometimes you want to know what would happen if you *changed* something.
Would paying women the same starting salary close the gap? Would a warmer launch have saved the
shuttle? These are causal questions, and they are the hardest of the three, because a regression
fit to observed data measures association, not cause. You can sometimes reason about cause with
regression, but only with extra assumptions and, ideally, the right kind of data. Confusing a
predictive fit with a causal claim is the single most common and most costly mistake in applied
statistics, and this book returns to the warning again and again.

:::{admonition} Key idea
:class: tip keyidea
Regression has three uses, listed here in rising order of how much they ask of the data:
description (summarize a relationship you already have), prediction (guess an unseen outcome), and
causal reasoning (say what an intervention would do). The same fitted line can serve all three, but
the confidence you are entitled to shrinks as you move down the list.
:::

The same fitted line can serve all three goals, but the confidence you are entitled to differs
wildly. @fig-ch01-three-uses puts the three side by side: one line, three questions, and a trust
meter that drops as the questions get bolder.

```{figure} figures/fig_ch01_three_uses.png
:name: fig-ch01-three-uses
:alt: Three copies of the same scatterplot and fitted line. The first, labeled Description, marks the slope with a small triangle. The second, labeled Prediction, drops a dashed line from a new X value up to the fitted line and shows a point with an error bar. The third, labeled Causal reasoning, draws a curved arrow along the line asking what changing X would do. A colored band beneath runs from green on the left to red on the right, labeled trust you are entitled to, high on the left and low on the right.
The same fitted line does all three jobs, but they do not earn the same trust. Description just reads a slope off the data you have; prediction plugs in a new X; causal reasoning asks what an intervention would do, and needs the most from the data. Trust shrinks from left to right.
```

To make the three uses concrete, here are the three opening datasets reduced to three real numbers.

:::{admonition} Example 1.1: Three questions, three numbers
:class: note
**Question.** What single number does each of the three opening problems turn on?

**Intuition.** The Toluca question is a slope (hours per unit). The salary question starts from a
raw gap (dollars). The Challenger question starts from the plain facts of the record: how many
flights, and how cold was the coldest.

**Formula.** For Toluca, the slope $b_1$ of the least-squares line (the best-fitting straight
line, which Chapter 2 defines precisely) of hours on lot size. For salary, the difference in mean
salary between the two groups. For the O-rings, the count of flights and the minimum launch
temperature.

**Computation.**

```r
toluca <- read.csv("data/toluca.csv")
salaries <- read.csv("data/salaries.csv")
orings <- read.csv("data/orings.csv")

toluca_slope <- coef(lm(hours ~ lotsize, data = toluca))[["lotsize"]]
salary_gap <- mean(salaries$salary[salaries$sex == "Male"]) -
              mean(salaries$salary[salaries$sex == "Female"])
c(toluca_slope = round(toluca_slope, 2),
  salary_gap   = round(salary_gap, 0),
  orings_flights = nrow(orings),
  orings_coldest = min(orings$temp))
```
```text
  toluca_slope     salary_gap orings_flights orings_coldest
          3.57       14088.00          23.00          53.00
```

```python
import numpy as np
import pandas as pd
import statsmodels.formula.api as smf

toluca = pd.read_csv("data/toluca.csv")
salaries = pd.read_csv("data/salaries.csv")
orings = pd.read_csv("data/orings.csv")

toluca_slope = smf.ols("hours ~ lotsize", data=toluca).fit().params["lotsize"]
salary_gap = (salaries.loc[salaries.sex == "Male", "salary"].mean()
              - salaries.loc[salaries.sex == "Female", "salary"].mean())
print(round(toluca_slope, 2), round(salary_gap), len(orings), orings.temp.min())
```
```text
3.57 14088 23 53
```

**Interpretation.** Each extra unit in a Toluca lot costs about $3.57$ work hours on average
(description). Men in the salary data earn about $\$14{,}088$ more per year than women, before
accounting for anything else (a raw gap, not yet a finding). And every shuttle flight on record
launched at $53$ degrees or warmer, so the $31$-degree decision was far outside all experience
(the fact that makes prediction dangerous). Three numbers, three kinds of question. The rest of
the book is about earning the right to state each one with confidence.
:::

::::{admonition} Try it 1.1
:class: important
Label each question as description, prediction, or causal reasoning.

1. "On average, how many more dollars in sales does a store make per extra dollar spent on TV ads?"
2. "If we open a studio in a city with 60,000 young people, how much will it sell?"
3. "If this patient loses 10 pounds, will their blood pressure drop?"

:::{admonition} Solution
:class: dropdown
1. **Description.** It asks for the slope summarizing a relationship already in the data.
2. **Prediction.** It plugs a new predictor value into a fitted rule to guess an unseen outcome.
3. **Causal reasoning.** It asks what would change if we intervened on the patient's weight, which
is a claim about cause, not just association, and needs more than a regression fit to support.
:::
::::

Description and prediction sound like separate jobs, but they come off the same line, so move the
data and you move both at once. The engineer's slope and her hour budget are in the widget below;
drag a run and see which one is fragile.

```{iframe} ../sims/ch01-what-regression-does.html
:class: sim sim-m
:width: 100%
The Toluca runs, with the line refitting as you drag. **What to notice:** the slope b1 is the
description and Yhat is the prediction, and one dragged point moves both. **Try this:** compare how
much Yhat at a lot of 100 moves against Yhat at a lot of 200, a size nobody ever ran. Back to
[Section 1.1](#ch01-what).
```

(ch01-galton)=
## 1.2 The word "regression": Galton's heights

The word "regression" is older than the modern method and comes from a surprising place: a study
of human height. In the 1880s Francis Galton collected the heights of 934 adult children and their
parents, 205 families in all, and asked whether tall parents have tall children. They do, but
Galton noticed something stranger, and the strangeness gave the field its name.

For each child, Galton computed a **mid-parent height**, a weighted average of the two parents'
heights. Then he plotted child height against mid-parent height. @fig-ch01-galton-scatter shows
that plot with two lines drawn on it. The red dashed line is $y = x$: where children would land if
each one exactly matched their parents. The blue line is the actual best-fit line through the data.

```{figure} figures/fig_ch01_galton_scatter.png
:name: fig-ch01-galton-scatter
:alt: Scatterplot of child height against mid-parent height for 934 children, with two lines. A red dashed line marks y equals x (children matching parents), and a blue least-squares line that is clearly shallower, crossing the dashed line near the middle and lying below it on the right and above it on the left.
Galton's 934 children. The least-squares line (blue) is much shallower than the equal-heights line (red dashed): tall parents have children who are tall but closer to average, short parents have children who are short but closer to average. Galton called this pull toward the middle "regression."
```

The blue line is clearly flatter than $y = x$. Read it from the right: the children of very tall
parents are taller than average, but not as tall as their parents. Read it from the left: the
children of very short parents are shorter than average, but not as short. In both directions the
children's heights are pulled toward the overall average. Galton called this pull "regression
toward mediocrity," meaning the middle, and the name stuck to the whole method even though the
method now has nothing to do with heights. @fig-ch01-regression-to-mean makes the pull impossible
to miss by averaging the children within narrow bands of parent height.

```{figure} figures/fig_ch01_regression_to_mean.png
:name: fig-ch01-regression-to-mean
:alt: A plot of average child height per mid-parent height bin against the bin center, with the equal-heights line y equals x dashed in red above the points and the least-squares line in blue through them. Arrows at the extremes show tall-parent bins pulled down toward the mean and short-parent bins pulled up.
The average child height in each band of parent height sits on the shallow blue line, below the red equal-heights line on the right and above it on the left. Every extreme parent group produces a less extreme child group. That is regression to the mean.
```

We can put a number on the pull. Fitting the least-squares line of child height on mid-parent
height gives the slope and intercept below.

:::{admonition} Example 1.2: Galton's regression line
:class: note
**Question.** How much taller, on average, is a child for each extra inch of mid-parent height,
and what does that slope say about regression to the mean?

**Intuition.** Fit the straight line that best predicts child height from mid-parent height and
read its slope. A slope of $1$ would mean children match their parents' deviations from average
exactly; a slope below $1$ means the deviations shrink from one generation to the next.

**Formula.** The fitted line $\widehat{\text{child}} = b_0 + b_1 \cdot \text{midparent}$, where
$b_1$ is the slope and $b_0$ the intercept. (Chapter 2 shows where these numbers come from; here
we just read them.)

**Computation.**

```r
galton <- read.csv("data/galton_heights.csv")
fit <- lm(childHeight ~ midparentHeight, data = galton)
coef(fit)
```
```text
    (Intercept) midparentHeight
     22.6362405       0.6373609
```

```python
galton = pd.read_csv("data/galton_heights.csv")
fit = smf.ols("childHeight ~ midparentHeight", data=galton).fit()
print(fit.params)
```
```text
Intercept          22.636241
midparentHeight     0.637361
dtype: float64
```

**Interpretation.** The slope is about $0.64$. Each extra inch of mid-parent height goes with only
about two-thirds of an inch of extra child height, on average. The slope is well below $1$, and
that is regression to the mean in a single number: the children's heights are a muted echo of
their parents'. The intercept $22.6$ has no standalone meaning here (nobody has a mid-parent
height near zero); it is just the number that pins the line at the right height.
:::

Two cautions that this small example already teaches. First, "regression to the mean" is a fact
about averages, not about any one family: plenty of tall parents have children taller than
themselves; the *average* child of tall parents is shorter than the parents. Second, the effect
is easy to misread as something causal or mysterious, and it is neither. It happens whenever two
measurements are less than perfectly correlated, for a purely statistical reason. The next Try-it
shows the trap in a modern setting.

:::{admonition} Key idea
:class: tip keyidea
**Regression to the mean** is a fact about averages, not fate. Pick cases for being extreme on one
noisy measurement (tallest parents, top rookies), and their second measurement is on average less
extreme, because part of the first extreme was luck that does not repeat. It looks causal or
mysterious and is neither, and it fools people whenever they forget it.
:::

::::{admonition} Try it 1.2
:class: important
A sports magazine notices that the rookies who hit the most home runs in their first season tend
to hit fewer in their second, and runs a story about the "sophomore slump," blaming pressure and
complacency. Give a simpler explanation that needs no psychology at all.

:::{admonition} Solution
:class: dropdown
Home-run totals depend partly on skill and partly on luck (health, favorable matchups, a few balls
that just cleared the fence). The rookies with the very highest totals were probably both skilled
and lucky. Skill carries over to year two; luck does not. So their second-season totals regress
toward the mean, just like the children of the tallest parents. The "slump" is mostly regression
to the mean, the same effect Galton saw, dressed up as a story about character. You would see the
mirror image, a "sophomore surge," if you followed the *worst* rookies instead.
:::
::::

Reading the pull off a static scatterplot takes work. It is easier to feel it by choosing a parent
height yourself and watching how much of their advantage the child keeps.

```{iframe} ../sims/ch01-regression-to-mean.html
:class: sim sim-m
:width: 100%
Galton's line against the equal-heights line, with a slider for mid-parent height. **What to
notice:** the predicted child always sits between their parents and the average, on either side.
**Try this:** slide from 75 inches down to 65 and watch the fraction kept hold at 0.637 the whole
way. Back to [Section 1.2](#ch01-galton).
```

The Galton data comes back in @ch04, where the shallow slope becomes a correlation and we study
correlation's uses and abuses in full.

(ch01-anatomy)=
## 1.3 The anatomy of a statistical model

Every regression in this book is built from the same two pieces, and naming them now will make the
whole course easier to follow. Look again at any of the scatterplots so far. The points do not sit
on a single curve; they scatter around one. A **statistical model** takes that seriously
(Definition 1.3) by splitting the response into a part a rule can explain and a part it cannot.

$$
Y \;=\; \underbrace{f(X)}_{\text{systematic part}} \;+\; \underbrace{\varepsilon}_{\text{random part}} .
$$

In words: each observed response is the sum of a signal, $f(X)$, the average value of $Y$ that the
predictor accounts for, and a noise term $\varepsilon$, everything else pushing the observation off
that average. @fig-ch01-anatomy draws the split for a single dataset.

:::{admonition} Definition 1.3: Statistical model
:class: note definition
A **statistical model** splits each response into a systematic part and a random part,
$Y = f(X) + \varepsilon$. The systematic part $f(X)$ is the mean response the predictors explain
(the signal); the random part $\varepsilon$ is the variation they do not explain (the noise).
:::

```{figure} figures/fig_ch01_anatomy.png
:name: fig-ch01-anatomy
:alt: A scatterplot of green points rising with X, a blue straight line through their middle labeled the systematic part f of X, and one orange vertical segment from the line to a point labeled the random error epsilon. A caption reads response equals signal plus noise.
A model splits each observation into two parts: the systematic signal f(X) that the predictor explains (blue line), and the random noise epsilon that it does not (one error drawn in orange). Regression is the craft of estimating the signal without being fooled by the noise.
```

The systematic part is what we estimate. In most of this book $f(X)$ is a straight line,
$f(X) = \beta_0 + \beta_1 X$, and the model becomes the simple linear regression model
$Y = \beta_0 + \beta_1 X + \varepsilon$ that @ch02-slr-model builds carefully. In words: the
average response climbs (or falls) by a fixed amount $\beta_1$ for every one-unit step in $X$, and
$\beta_0$ is where the line starts. The Greek letters
$\beta_0$ and $\beta_1$ are **parameters** (Definition 1.4): fixed numbers describing the true
relationship in the whole population, which we never get to see directly. From a sample of data we
compute **estimates** of them, written $b_0$ and $b_1$, which are our best guesses. It is like the
difference between the true average height of every adult alive, a fixed number nobody could ever
measure, and the average height of the hundred people you actually surveyed, a number you can
compute that is close to the truth but not exactly it. The distinction between
a parameter (the truth we want) and an estimate (the number we can compute) runs through every
chapter, and blurring it causes no end of confusion.

:::{admonition} Definition 1.4: Parameter and estimate
:class: note definition
A **parameter** is a fixed but unknown number describing the true relationship in the whole
population, such as the slope $\beta_1$. An **estimate** is a number computed from a sample as a
best guess of a parameter, such as the least-squares slope $b_1$.
:::

The random part $\varepsilon$ is not a mistake or a failure of the model. It is the honest
admission that lot size does not determine hours exactly, that temperature does not determine
O-ring damage exactly, that the world has variation the predictors do not capture. A good model
does not pretend the noise away; it estimates the signal *and* describes the size of the noise, so
that predictions come with error bars and claims come with margins.

The split sounds abstract until you do it to a single row of real data. Take one Toluca run and
pull it apart into the two pieces the equation promises.

:::{admonition} Example 1.3: Signal plus noise in one production run
:class: note
**Question.** The anatomy equation says every observation is a signal plus a noise. For one real
Toluca run, what number is the signal and what number is the noise?

**Intuition.** Fit the line, then read its height at that run's lot size: that height is the average
hours the model explains, the signal. Whatever is left over, the gap from the line up to the actual
hours, is the noise. The two must add back to the hours you observed.

**Formula.** For a run with lot size $x$ and observed hours $y$, the fitted signal is
$\hat{y} = b_0 + b_1 x$ and the leftover is $e = y - \hat{y}$, so that $y = \hat{y} + e$. The
quantity $e$ is the **residual**, the visible stand-in for the unseen error $\varepsilon$ (Chapter
2 makes that distinction exact; the FAQ at the end of this chapter previews it).

**Computation.**

```r
toluca <- read.csv("data/toluca.csv")
fit <- lm(hours ~ lotsize, data = toluca)
b <- coef(fit)

run <- toluca[1, ]                       # the first production run
signal <- b[["(Intercept)"]] + b[["lotsize"]] * run$lotsize
noise  <- run$hours - signal
data.frame(lotsize = run$lotsize, observed = run$hours,
           signal = round(signal, 1), noise = round(noise, 1))
```
```text
  lotsize observed signal noise
1      80      399    348    51
```

```python
toluca = pd.read_csv("data/toluca.csv")
fit = smf.ols("hours ~ lotsize", data=toluca).fit()
b0, b1 = fit.params["Intercept"], fit.params["lotsize"]

run = toluca.iloc[0]                      # the first production run
signal = b0 + b1 * run["lotsize"]
noise = run["hours"] - signal
print(pd.DataFrame({"lotsize": [run["lotsize"]], "observed": [run["hours"]],
                    "signal": [round(signal, 1)], "noise": [round(noise, 1)]}))
```
```text
   lotsize  observed  signal  noise
0       80       399   348.0   51.0
```

**Interpretation.** The first run made a lot of $80$ units and took $399$ hours. The fitted line
puts the average run of that size at about $348$ hours, and that is the signal, the part lot size
explains. This particular run took about $51$ hours more than the model expects, and that is the
noise. Those $51$ hours are not an error in the arithmetic; they are real variation, the crew, the
machines, the day, that lot size alone does not capture. Add the two back, $348 + 51 = 399$, and
you recover the observation exactly. That is $Y = f(X) + \varepsilon$ written out for one line of a
real dataset.
:::

:::{admonition} A note on notation
:class: note
This book follows the notation of the applied-regression literature, laid out in the table on the
[welcome page](../index.md). Two conventions differ from an intro-statistics course like CSUB's
MATH 2200. We write the normal distribution as $N(\mu, \sigma^2)$, with the **variance** in the
second slot, not the standard deviation. And we use plain Roman letters $b_0, b_1$ for estimates as
often as the hatted $\hat\beta_0, \hat\beta_1$; the two mean the same thing. You do not need the
full table yet. Chapter 2 introduces each symbol as it is needed.
:::

:::{admonition} Durable skill: Separate the signal from the noise
:class: tip
The habit of asking "which part of this variation is systematic, and which is just noise?" outlives
this course and this subject. A month of strong sales, a good quarter for a fund, a dip in a
patient's symptoms: each is part signal and part noise, and acting as if the whole thing were
signal is how people chase flukes. When you meet any number that varies, practice splitting it in
your head into the part you could predict and the part you could not, and treating the two
differently. Regression is the formal version of a habit worth having everywhere.
:::

The cleanest place to watch the two parts separate is a mechanism with no mystery in it at all. Toss
a fair coin twenty times, where the signal is fixed at ten heads and everything else on screen is
the random part.

```{iframe} ../sims/ch01-coin-tosses.html
:class: sim sim-m
:width: 100%
Twenty tosses of a fair coin, repeated as many rounds as you like. **What to notice:** the count
almost never lands on ten, yet the pile it builds is perfectly orderly. **Try this:** run 1000
rounds and watch the mean settle near 10 while the spread stays near 2.24, which is the noise term
being described rather than removed. Back to [Section 1.3](#ch01-anatomy).
```

(ch01-causation)=
## 1.4 Association is not causation

Section 1.1 called causal reasoning the hardest of the three uses. This section says why. A
regression line through observed data measures **association** (Definition 1.5): it tells you that
$Y$ tends to be higher when $X$ is higher. It does not, by itself, tell you that changing $X$ would
change $Y$. That gap between association and causation is the most important idea in this chapter,
and one of the few that a whole career in data will keep testing you on.

:::{admonition} Definition 1.5: Association and causation
:class: note definition
Two variables are in **association** when they tend to move together. **Causation** holds when
intervening to change one actually changes the other. A regression fit to observed data measures
association, which need not be causation.
:::

:::{admonition} Key idea
:class: tip keyidea
Association is not causation. A fitted line only reports that $Y$ and $X$ move together in the data
you have; it cannot tell you that changing $X$ would change $Y$. Reading a predictive fit as a
causal claim is the most common and most expensive error in applied statistics, and no amount of
model polish fixes it.
:::

The classic illustration needs no equations. Across the summer, ice-cream sales and drownings rise
and fall together; their correlation is strong and real. No sane person concludes that ice cream
causes drowning, or that banning ice cream would save swimmers. A third variable, hot weather,
drives both: heat sends people to buy ice cream and, separately, sends them into the water where a
few drown. @fig-ch01-confounder draws the situation. The hidden driver is called a **confounder** or
**lurking variable** (Definition 1.6), and whenever one is present, the association between $X$ and
$Y$ can be large while the causal effect of $X$ on $Y$ is zero.

:::{admonition} Definition 1.6: Confounder (lurking variable)
:class: note definition
A **confounder**, also called a **lurking variable**, is a variable that influences both the
predictor and the response, creating an association between them that need not be causal.
:::

```{figure} figures/fig_ch01_confounder.png
:name: fig-ch01-confounder
:alt: A diagram with a box "hot weather (lurking variable Z)" at the top, arrows down to two boxes, "ice-cream sales X" on the left and "drownings Y" on the right, and a dashed double-headed arrow between X and Y labeled strong correlation but no causal arrow.
Hot weather (Z) causes both ice-cream sales (X) and drownings (Y), so X and Y are strongly correlated even though neither causes the other. A confounder can manufacture an association out of nothing causal.
```

This is exactly why the salary example is hard. Men and women in the data differ not only in sex
but in the mix of ranks, disciplines, and years of service, and all of those affect salary. Rank
is a lurking variable for the raw sex gap. A responsible analysis has to hold the confounders fixed
before the remaining gap can be read as anything about sex, and even then the reading takes care.
@ch11 does this work; @ch16 makes reasoning about direct and indirect effects its whole subject.

Two things help you fight confounding, and the difference between them organizes much of statistics.

**Observational data** (Definition 1.7) is collected by watching the world as it is. Galton did not assign heights
to parents; the Toluca engineers did not set the lot sizes to study them; nobody chose professors'
sexes. In observational data the predictor and the confounders come tangled together, and no amount
of clever fitting fully untangles them. You can adjust for the confounders you thought to measure,
but never for the ones you did not.

**Experimental data** is collected by intervening. If you can *randomly assign* the value of $X$,
say by flipping a coin to decide each unit's treatment, then on average the treatment groups match
on every confounder, measured or not, because randomization balances them. That is why a randomized
experiment can support a causal claim that observational data cannot. @fig-ch01-obs-vs-exp shows the
one structural change that makes the difference. Most data you will meet after
this course is observational, which is precisely why the association-causation distinction deserves
the drilling it gets here.

```{figure} figures/fig_ch01_obs_vs_exp.png
:name: fig-ch01-obs-vs-exp
:alt: Two diagrams side by side. On the left, labeled Observational, a confounder Z has arrows pointing down to both predictor X and response Y, and a dashed double-headed arrow between X and Y is labeled tangled, is it X or Z. On the right, labeled Experimental, the arrow from Z to X is greyed out and crossed with a red X labeled coin flip cuts this, while a solid arrow runs from X to Y labeled clean, only X can drive Y.
Observational and experimental data differ by one arrow. When you watch the world (left), a confounder Z feeds both X and Y, so their link is tangled. When you assign X at random (right), the coin flip cuts the arrow from Z into X, so any remaining X-Y link is causal.
```

:::{admonition} Definition 1.7: Observational and experimental data
:class: note definition
**Observational data** is collected by watching the world without intervening, so predictors and
confounders come tangled together. **Experimental data** is collected by intervening, especially by
randomly assigning the predictor's value, so that the groups balance on all confounders on average.
:::

One more discipline protects you against both confounding and plain misreading: look at the data
before you trust a summary of it. @fig-ch01-anscombe shows four small datasets built by the
statistician Frank Anscombe. All four have the same mean of $X$, the same mean of $Y$, the same
correlation, and the *same* fitted regression line. On paper they are identical. Plotted, they
could not be more different.

```{figure} figures/fig_ch01_anscombe.png
:name: fig-ch01-anscombe
:alt: Four scatterplots in a two-by-two grid, each with the same fitted line. Panel one is a genuine noisy straight line, panel two is a smooth curve, panel three is a tight line with one high outlier, and panel four has all points at one x value plus a single far-right point that sets the slope.
Anscombe's quartet: four datasets with identical means, variances, correlation, and fitted line, yet four different shapes. Only one is a genuine straight-line relationship. The summary numbers cannot tell them apart, but a two-second plot can.
```

:::{admonition} Example 1.4: Anscombe's quartet
:class: note
**Question.** Can four datasets really share every standard summary and still be shaped completely
differently?

**Intuition.** Compute the mean of $X$, the variance of $X$, the mean of $Y$, the correlation, and
the fitted line for each of the four sets, and check whether they match.

**Formula.** For each set, the sample means, the sample variance of $X$, the correlation $r$, and
the least-squares line $\hat{y} = b_0 + b_1 x$.

**Computation.**

```r
anscombe <- read.csv("data/anscombe.csv")
stats <- sapply(1:4, function(k) {
  x <- anscombe[[paste0("x", k)]]
  y <- anscombe[[paste0("y", k)]]
  f <- lm(y ~ x)
  c(mean_x = mean(x), var_x = var(x), mean_y = mean(y),
    cor_xy = cor(x, y), b0 = coef(f)[[1]], b1 = coef(f)[[2]])
})
colnames(stats) <- paste0("set", 1:4)
round(stats, 2)
```
```text
        set1  set2  set3  set4
mean_x  9.00  9.00  9.00  9.00
var_x  11.00 11.00 11.00 11.00
mean_y  7.50  7.50  7.50  7.50
cor_xy  0.82  0.82  0.82  0.82
b0      3.00  3.00  3.00  3.00
b1      0.50  0.50  0.50  0.50
```

```python
anscombe = pd.read_csv("data/anscombe.csv")
rows = {}
for k in range(1, 5):
    x = anscombe[f"x{k}"]; y = anscombe[f"y{k}"]
    f = smf.ols(f"y{k} ~ x{k}", data=anscombe).fit()
    rows[f"set{k}"] = [x.mean(), x.var(), y.mean(),
                       x.corr(y), f.params.iloc[0], f.params.iloc[1]]
tab = pd.DataFrame(rows, index=["mean_x", "var_x", "mean_y",
                                "cor_xy", "b0", "b1"])
print(tab.round(2))
```
```text
         set1   set2   set3   set4
mean_x   9.00   9.00   9.00   9.00
var_x   11.00  11.00  11.00  11.00
mean_y   7.50   7.50   7.50   7.50
cor_xy   0.82   0.82   0.82   0.82
b0       3.00   3.00   3.00   3.00
b1       0.50   0.50   0.50   0.50
```

**Interpretation.** Every column is identical: same means, same variance, same correlation of
$0.82$, same fitted line $\hat{y} = 3.0 + 0.5x$. Yet @fig-ch01-anscombe shows one honest straight
line, one clean curve that a line has no business summarizing, one straight line derailed by a
single outlier, and one where a lone far-off point sets the entire slope. The numbers are blind to
all of this. Plotting is not optional decoration; it is a safety check you run every single time.
:::

::::{admonition} Try it 1.3
:class: important
A news headline reads: "Students who own more books score higher on reading tests. Buy your child
books to raise their scores." Name a plausible confounder and explain how it could produce the
association without book-buying causing higher scores.

:::{admonition} Solution
:class: dropdown
Family income and parents' education are plausible confounders. Wealthier, more-educated households
tend to own more books *and* to support reading in a dozen other ways (time read aloud, quiet study
space, vocabulary at the dinner table). Those households would produce higher-scoring readers even
if the specific act of buying more books did nothing. The book count is partly a marker for the
home environment, so the association is real while the causal advice may be worthless. Only an
experiment (randomly giving some families books) or careful adjustment for the confounders could
separate the two.
:::
::::

(ch01-history)=
## 1.5 A short history, from Gauss to statistical learning

Regression did not arrive all at once. It grew over two centuries as people kept needing to pull a
signal out of noisy measurements, and the tools we use today are the accumulated answer.
@fig-ch01-timeline marks the milestones.

```{figure} figures/fig_ch01_timeline.png
:name: fig-ch01-timeline
:alt: A horizontal timeline with seven labeled events: 1805 Legendre and Gauss least squares, 1886 Galton coins regression, 1896 Pearson correlation, 1925 Fisher ANOVA and likelihood and experimental design, 1972 Nelder and Wedderburn generalized linear models, 2010 statistical learning and machine learning go mainstream, and 2023 the LLM era.
Two centuries of regression in seven steps, from least squares for planetary orbits to models anyone can now fit with a sentence of code.
```

**Least squares (around 1805).** The method at the heart of this book was invented to track the
sky. Adrien-Marie Legendre published the least-squares recipe in 1805, and Carl Friedrich Gauss,
who claimed earlier use and supplied the probability theory, applied it to predict the orbit of the
dwarf planet Ceres from a handful of noisy telescope readings. The problem was the same one the
Toluca engineer faces: many imperfect measurements, one underlying line, find the line that fits
best. @ch02 derives their answer from scratch.

**Correlation and the word "regression" (1886 to 1896).** Galton, studying heredity, gave us
regression to the mean and the first regression lines. His younger colleague Karl Pearson turned
Galton's ideas into the correlation coefficient, the standardized measure of association that
@ch04 covers, and built much of the machinery of modern statistics around it.

**Fisher and the inference framework (1920s and 1930s).** Ronald Fisher, working on agricultural
experiments, gave regression its inferential backbone: the analysis of variance that splits
variation into named pieces (@ch03), maximum likelihood as a general principle for estimation
(@ch02, @ch13), and the theory of randomized experiments that grounds the causal reasoning of
Section 1.4. Much of what a statistician means by "significance" traces to Fisher.

**Generalized linear models (1972).** For a long time regression meant a straight line with
normal, constant-variance noise. But many responses are not like that: yes-or-no outcomes,
counts, rates. In 1972 John Nelder and Robert Wedderburn showed that linear regression, logistic
regression for binary data, Poisson regression for counts, and several others are all special
cases of one framework, the generalized linear model. @ch13 and @ch14 build two of these and
@ch14-glm shows the unifying idea.

**Statistical learning and machine learning (1990s to now).** As computers grew cheap, the same
core idea, fit a rule that predicts $Y$ from $X$ and check it honestly on new data, expanded into
a field obsessed with prediction: cross-validation, regularization, trees, and neural networks.
Regression is the foundation this field is built on, and the ideas of overfitting and validation
that dominate it appear in this course in @ch12. The most recent chapter of the story is the one
you are living in, and it is worth its own section.

(ch01-today)=
## 1.6 Where regression sits today

It would be easy to think regression is a quaint relic next to modern artificial intelligence. The
opposite is true: regression is the thing modern AI is mostly made of. @fig-ch01-ml-nesting shows
how the pieces nest.

```{figure} figures/fig_ch01_ml_nesting.png
:name: fig-ch01-ml-nesting
:alt: Four nested rounded boxes. The outermost is statistical learning and data science, inside it supervised learning, inside that generalized linear models, and at the center linear regression, labeled as least squares, the method this course teaches from the ground up.
Linear regression sits at the center of a set of nested fields. Generalized linear models extend it to other kinds of response; supervised machine learning extends it to flexible signals; and it is still the last step inside a neural network. Master the center and the rest has a home to attach to.
```

Supervised machine learning, the branch of AI that learns to predict an output from inputs, is
regression with the signal $f(X)$ allowed to be far more flexible than a straight line. A neural
network spends most of its effort transforming raw inputs into useful features, but its final step
is almost always an ordinary linear regression or logistic regression on those features: the same
$b_0 + b_1 x_1 + \dots$ you will fit by hand in @ch02, sitting inside the machine. Large language
models, the systems behind modern AI assistants, are trained by a form of this same prediction
game played billions of times. The vocabulary changes ("loss functions," "gradient descent,"
"embeddings"), but least squares and maximum likelihood, the two ideas @ch02 is built on, are
underneath.

This has a sharp consequence for what is worth learning, and it is the thesis of this course.
Fitting a model used to be the hard part. It took tables, careful arithmetic, and a mainframe. Now
anyone can fit a regression, a random forest, or a neural network in one line of code, and an AI
assistant will write that line on request and even interpret the output for you. The scarce skill
is no longer *fitting* a model. It is *judging* one: knowing whether the model is appropriate,
whether its assumptions hold, whether the data can support the claim being made, whether a
confounder is lurking, whether the confident-looking prediction is actually an extrapolation off
the edge of all experience, the way the Challenger decision was. A machine will hand you an answer
in seconds. Deciding whether to trust it is human work, and it is the work this book trains.

:::{admonition} Durable skill: Judge a model you did not fit
:class: tip
More and more, your job will be to evaluate an analysis someone else, or some machine, produced.
The questions are always the same, and you can ask them of any model, in any field, without redoing
the computation. What is the response, and what are the predictors? Is this observational or
experimental data? What would have to be true for the conclusion to hold, and is it? Is the
prediction inside the range of the data or past its edge? Was the model checked on data it was not
fit to? Every homework set in this course includes an "audit this analysis" problem for exactly this
reason. Being the person in the room who can say precisely why a slick result should not be trusted
is a durable, and increasingly rare, form of expertise.
:::

(ch01-tour)=
## 1.7 A tour of the semester

Here is the road ahead. The book teaches one repeatable process, the modeling workflow that @ch02
names in full (@ch02-workflow): **ASK** a question and get the data, **EXPLORE** it with plots and
summaries, **FIT** a model, **CHECK** whether it can be trusted, and **USE** it to interpret,
predict, or decide. Every chapter is one trip around that loop on a real dataset. @fig-ch01-workflow
draws the loop so you can hold the whole book in one picture.

```{figure} figures/fig_ch01_workflow.png
:name: fig-ch01-workflow
:alt: Five labeled boxes in a row connected by arrows. ASK, get the data; EXPLORE, plots and summaries; FIT, estimate the model; CHECK, can we trust it; USE, interpret, predict, decide. A dashed red curved arrow loops from CHECK back to EXPLORE, labeled if the check fails, go back and try again.
The one workflow the whole course repeats: ASK, EXPLORE, FIT, CHECK, USE. The dashed arrow is the honest part: when a model fails its check, you go back and try again rather than pushing a bad model forward. Every chapter is one trip around this loop.
```

What follows is the one question each chapter answers.

**Part I: Regression from the ground up.**

- **@ch02, Simple linear regression.** What is the single best line through a cloud of points, and
  can we prove that no other line beats it? You will fit the Toluca line by hand and prove its
  optimality (@ch02-least-squares).
- **@ch03, Inference for simple linear regression.** You budgeted about $419$ hours for next week's
  100-unit run, but how far off might you be? The chapter separates a narrow interval for the
  *average* run from a much wider interval for a *single new* run (@ch03-prediction-interval), the
  distinction in @fig-ch01-toluca that most people get wrong.
- **@ch04, Correlation.** How do you put one honest number on the strength of a relationship, and
  how does that number lie to you when the data curve, when an outlier sneaks in, or when the sample
  is narrow? Galton's heights and the correlation-slope link return here (@ch04-r-and-slope).
- **@ch05, Randomization and bootstrap inference.** With only 13 punters, is a slope you see real or
  a fluke of a tiny sample? When the usual assumptions are shaky, you let the computer shuffle and
  resample the data to find out (@ch05-permutation-slope, @ch05-bootstrap).

**Part II: The linear model in matrix form.**

- **@ch06, Matrix algebra for regression.** How do you write a regression with twenty predictors
  without drowning in twenty equations? Matrix algebra packs the whole dataset into two symbols. No
  prior linear algebra is assumed; the chapter builds it from nothing.
- **@ch07, The general linear model.** Why does least squares work for any number of predictors at
  once, and what is the elegant geometry (a projection) hiding underneath it?
- **@ch08, Multiple regression in practice.** When two predictors overlap, what does a single
  coefficient even mean? You will learn the careful "holding the others fixed" reading and see it in
  a picture with added-variable plots.

**Part III: Building and checking models.**

- **@ch09, Model diagnostics.** A model can explain most of the variation and still predict a
  negative number of species. How do you catch a model that is wrong in every way that matters, and
  find the one high-leverage point quietly steering the whole fit (@ch09)?
- **@ch10, Remedial measures and transformations.** Brain and body weights across 62 mammals look
  hopeless on a plot until you take logarithms and the mess snaps into a clean straight line. When is
  the problem your model, and when is it just your scale (@ch10-log-interpretation)?
- **@ch11, Categorical predictors and interactions.** Back to the salary gap: once you hold rank,
  discipline, and experience fixed, how much of the raw $\$14{,}088$ is left, and how do you even put
  a category like rank into a regression (@ch11-dummy-coding, @ch11-interactions)?
- **@ch12, Multicollinearity, selection, and validation.** With thirteen tangled body measurements
  predicting body fat, which do you keep? And why will a model chosen to fit your data always look
  better on that data than it deserves (@ch12-cross-validation, @ch12-shrinkage)?

**Part IV: Regression for other kinds of response.**

- **@ch13, Logistic regression.** Back to the shuttle: how do you put a number on the O-ring failure
  risk at $31$ degrees when the outcome is not a quantity but a yes-or-no (@ch13-logistic-model,
  @ch13-odds-ratio)?
- **@ch14, Poisson regression and the GLM idea.** Species counts cannot be negative or fractional,
  and their spread grows with their size. What model respects that, and how are linear, logistic, and
  Poisson regression all one idea (@ch14-poisson-model, @ch14-glm)?

**Part V: Special topics (guided self-study).**

- **@ch15, Regression with time.** Twelve years of monthly airline passengers trend up and cycle
  every summer. How do you forecast the next year honestly, and why do time-ordered errors break the
  standard formulas (@ch15-forecasting)?
- **@ch16, Path analysis and a look ahead.** Does an occupation earn prestige because it pays well or
  because it takes schooling? Path analysis uses chains of regressions to split an effect into direct
  and indirect routes (@ch16-path-diagrams), and the chapter closes by walking the whole workflow one
  last time.

::::{admonition} Try it 1.4
:class: important
For each situation, name the one chapter you would open first.

1. Your fitted model has a beautiful $R^2$, but a colleague says one city is driving the whole result.
2. Your outcome is whether a loan defaulted, coded 0 or 1, and a straight line gives predictions
   below 0 and above 1.
3. You want to report how uncertain your predicted value is for a brand-new observation.

:::{admonition} Solution
:class: dropdown
1. **@ch09 (Model diagnostics)**, which covers high-leverage points and influence, the tools for
finding a single point that dominates a fit.
2. **@ch13 (Logistic regression)**, built specifically for binary 0/1 outcomes where a straight line
misbehaves.
3. **@ch03 (Inference for simple linear regression)**, which builds the prediction interval for a new
observation.
:::
::::

(ch01-selfstudy)=
## 1.8 How to teach yourself from this book

This book is written so that a student who misses class can learn a chapter alone and still do the
homework. A few habits make that work.

**Read in the order the chapter is written.** Each concept section goes intuition first, then the
formula, then the same computation in R and in Python. The intuition is what makes the formula
stick, so do not skip ahead to the symbols. Read the opening vignette before anything else; it is
the real question the chapter exists to answer.

**Run the code yourself, in both languages if you can.** Every worked example reads a real CSV from
the book's `data/` folder and shows real output. Type it out, run it, and change something to see
what happens. R is this course's primary language, but Python appears beside it in every example
because you will likely use it after graduation, and seeing the same idea twice cements it.

**Do every Try-it as you reach it.** Each one is a short task with a full solution hidden in a
dropdown just below. Attempt it honestly before you open the solution; the small struggle is where
the learning is. Watch for the **Durable skill** boxes too: each names a habit worth more than any
single formula.

**Work the practice problems in order.** They come in bands. Band A checks that you understood the
ideas; Band B (in later chapters) asks you to derive and prove; Band C asks you to analyze real data
in R or Python. Answers to the odd-numbered problems are in Appendix H, so you can grade yourself.
The promise of the book is simple: a reader who does every Try-it and every odd problem can solve
the even problems and the exams.

**Expect to reread.** You do not have to understand something the first time you see it. Reread the
intuition, run the code, sleep on it, and come back. Understanding usually arrives on the second or
third pass. That is normal, and it is not a sign that you are behind.

Before Chapter 2's first worked example you will need R and Python installed and working. Full setup
instructions, the list of packages, and a function-by-function reference for every chapter live in
[Appendix C (R)](../appendix/r-reference.md) and [Appendix D (Python)](../appendix/python-reference.md).
A datasheet for every dataset in the book, including the ones you met in this chapter, is in
[Appendix E](../appendix/datasets.md).

## 1.9 Chapter summary

You now have the map. Regression studies how a response depends on one or more predictors, and it
serves three different goals: describing a relationship, predicting a new outcome, and reasoning
about cause, in rising order of difficulty. You saw where the word came from in Galton's heights and
what regression to the mean means, both as a fitted slope below one and as a trap that dresses up
plain statistics as a story. You learned the anatomy shared by every model in the book, a systematic
signal plus random noise, and the difference between a parameter and its estimate. You saw why
association is not causation, how a confounder manufactures a false link, and how observational and
experimental data differ in what they can prove. You placed regression in its history, from Gauss's
orbits to Fisher's inference to the generalized linear model to modern machine learning, and you saw
why, now that any model can be fit in one line, the scarce skill is judging models rather than
fitting them. And you have a tour of the fifteen chapters ahead.

**Key results at a glance.**

| Result | Statement or formula | Valid when |
|---|---|---|
| Statistical model (Definition 1.3) | $Y = f(X) + \varepsilon$: response equals systematic signal plus random noise | every model in the book |
| Simple linear regression | $f(X) = \beta_0 + \beta_1 X$; the mean of $Y$ is a straight line in $X$ | the signal is taken to be a line |
| Parameter vs estimate (Definition 1.4) | $\beta_0, \beta_1$ are the unknown truth; $b_0, b_1$ are computed from data | always |
| Three uses of regression | description (a slope), prediction (a new $Y$), causal reasoning (an intervention) | trust decreases across the three |
| Regression to the mean | Galton's line $\widehat{\text{child}} = 22.6 + 0.64 \cdot \text{midparent}$; slope below 1 | two imperfectly correlated measurements |
| Association is not causation (Definition 1.5) | $X$ and $Y$ moving together need not mean changing $X$ changes $Y$ | any observational data |
| Observational vs experimental (Definition 1.7) | random assignment balances confounders on average | causal claims need an experiment or strong assumptions |

**Key terms.** **regression**, **response**, **predictor**, **description**, **prediction**,
**causal reasoning**, **regression to the mean**, **statistical model**, **systematic part (signal)**,
**random part (error)**, **parameter**, **estimate**, **association**, **causation**, **confounder
(lurking variable)**, **observational data**, **experimental data**, **extrapolation**, **generalized
linear model**, **supervised machine learning**, **modeling workflow**.

**You should now be able to:**

- [ ] Say what regression is and tell its three uses apart: describing a relationship, predicting a new outcome, and reasoning about cause.
- [ ] Explain where the word "regression" came from in Galton's heights and what regression to the mean means, as a slope below one and as a trap.
- [ ] Name the parts of a statistical model: the systematic signal, the random noise, the parameters, and their estimates.
- [ ] Distinguish association from causation, and observational from experimental data, and say why the difference matters.
- [ ] Place regression inside statistics, machine learning, and data science, and explain why judging a model now matters more than fitting one.
- [ ] Name the question each chapter of the semester answers.
- [ ] Set up R and Python and use this book to teach yourself.

**Where this fits.** This chapter is the ASK stage of the whole course: it frames the questions and
the way of thinking, and it previews the workflow that @ch02-workflow will name in full. Everything
from here on adds tools. @ch02 turns the loose idea of a "best line" into a precise, provable
recipe on the Toluca data (@ch02-least-squares), and the machinery only grows from there. You will not need to have
memorized anything in this chapter, but if the difference between description and prediction, between
association and causation, and between a parameter and an estimate is clear to you, the rest of the
book will feel less like a pile of formulas and more like one idea, carefully extended.

## 1.10 Frequently asked questions

**Q1. Is "regression" the same as "line of best fit"?** For most of this book, yes: the systematic
part is a straight line and regression finds the best one. But the word is broader. Logistic
regression (@ch13) and Poisson regression (@ch14) fit curved rules for non-continuous responses, and
in machine learning the fitted signal can be very flexible. What unites them all is the shape
$Y = f(X) + \varepsilon$: estimate a systematic part, describe the noise.

**Q2. If regression only shows association, why is it used to argue about causes all the time?**
Because with the right data (ideally a randomized experiment) or the right assumptions (adjusting for
the confounders you can measure and defending that you have caught the important ones), an
association can support a careful causal claim. The point of Section 1.4 is not that regression can
never speak to cause; it is that it does so only with extra work and extra honesty, never
automatically. @ch11 and @ch16 show what that work looks like.

**Q3. Why teach this when an AI can fit any model in one line?** Precisely because it can. When
fitting is free, the value moves to judgment: choosing the right model, checking its assumptions,
spotting the confounder, catching the extrapolation, and knowing when the confident output is wrong.
Those are the skills this course grades, and they are the skills that make you useful next to a
machine rather than replaceable by one.

**Q4. Do I really need both R and Python?** R is required (it is the course's primary language and a
catalog requirement), and every example is in R. Python runs alongside it because it is what much of
industry uses, and seeing the identical analysis in two languages makes the concept, rather than the
syntax, the thing you remember. If you are stretched for time, follow R closely and treat Python as
a bonus, but do install both.

**Q5. I have not taken linear algebra. Can I still do this course?** Yes. Chapter 6 builds every
piece of matrix algebra the book uses, from the definition of a matrix up, tied at each step to a
regression use. Chapters 2 through 5 use no matrices at all. If you have taken linear algebra,
Chapter 6 will read like review; if not, it is written to teach you.

**Q6. What is the difference between the error $\varepsilon$ and the residual?** The error
$\varepsilon$ is the gap between an observation and the *true* line, which we never see because we
never know the true parameters. The residual is the gap between an observation and our *fitted*
line, which we can compute. Residuals are our visible estimates of the invisible errors, and
Chapter 2 makes the distinction precise. It matters because we use the residuals to estimate the
size of the noise.

**Q7. Is regression to the mean the same as "things always average out"?** No, and this is a common
muddle. Regression to the mean is about *extremes being followed by less extreme values*, because
extremes are usually part skill and part luck and the luck does not repeat. It does not say that a
tall person's next measurement will be average, or that a good team is due for a loss. It is a
statement about the average of a group selected for being extreme, nothing more.

## 1.11 Practice problems

:::{note}
The book sorts practice problems into three bands: (A) concepts, (B) theory (derivations and
proofs), and (C) data analysis in R or Python. This opening chapter is a panoramic map with no
derivations of its own, so it carries only Band A and Band C problems; Band B begins in Chapter 2,
where the first proofs appear, and grows from there. Odd-numbered answers appear in Appendix H;
full solutions are in the instructor materials.
:::

1. (A) In your own words, what does regression do? Answer in two sentences, using the words "response" and "predictor."
2. (A) Name the three uses of regression discussed in Section 1.1, and give a one-line example of each that is not in the chapter.
3. (A) For each question, say whether it is description, prediction, or causal reasoning: (a) "How much does average blood pressure rise per year of age in this clinic?" (b) "If we raise the price by one dollar, how many fewer units will we sell?" (c) "What sales should we expect next quarter given our ad budget?"
4. (A) Explain the difference between a parameter ($\beta_1$) and an estimate ($b_1$) in one or two sentences. Why can we never know $\beta_1$ exactly?
5. (A) Write the general anatomy of a statistical model, $Y = f(X) + \varepsilon$, and explain in plain words what each of the two pieces represents.
6. (A) A classmate says the error term $\varepsilon$ means the model made a mistake and a better model would remove it. Correct the misunderstanding.
7. (A) Explain "regression to the mean" in your own words, and give an everyday example other than heights or sports.
8. (A) Galton's fitted slope of child on mid-parent height is about $0.64$. What would a slope of exactly $1$ have meant? What would a slope of $0$ have meant?
9. (A) Why is a raw difference in average salary between two groups not, by itself, evidence of unequal pay? Name one confounder and explain its role.
10. (A) Define "confounder" and draw (in words or a sketch) the ice-cream-and-drownings diagram, labeling the causal arrows.
11. (A) Explain the difference between observational and experimental data, and why randomized assignment helps establish cause.
12. (A) Anscombe's four datasets share the same mean, variance, correlation, and fitted line. What is the single lesson Anscombe wanted you to take from this, and what one-word action does it recommend before trusting any summary?
13. (A) Give an example of a strong correlation between two variables that you are confident is not causal, and name the likely lurking variable.
14. (A) In one sentence each, state what least squares was originally invented to do (around 1805) and who gave "regression" its name.
15. (A) The chapter claims regression is "the core that modern machine learning is built on." Explain what a neural network's final step has to do with the regression in this course.
16. (A) State the course thesis about the AI era in your own words: what skill has become scarce, and why?
17. (A) You are handed a confident-looking prediction from an AI assistant. List four questions you would ask before trusting it (draw on the "Judge a model you did not fit" box).
18. (A) Why does the Challenger example illustrate the danger of extrapolation? What was special about the $31$-degree launch relative to the data?
19. (A) Name the five stages of the modeling workflow in order, and give a one-phrase description of each.
20. (A) For each chapter question below, name the chapter (2 through 16) that answers it: (a) which of thirteen tangled body measurements to keep; (b) whether a slope from only thirteen punters is real; (c) how to forecast next year's monthly airline demand.
21. (A) Explain the difference between the confidence interval for a mean response and the prediction interval for a new observation, using @fig-ch01-toluca as your reference. Which is wider, and why?
22. (A) A headline says "people who drink red wine live longer, so drink red wine." Identify the causal claim, name a plausible confounder, and say what kind of study would be needed to support the advice.
23. (A) Why does this book show every example in both R and Python? Give two distinct reasons from Section 1.8.
24. (A) Explain the "sophomore slump" (Try it 1.2) as regression to the mean, and predict what you would see if you instead followed the *worst* rookies into their second year.
25. (C) Read `galton_heights.csv` in R or Python. Fit the line predicting `childHeight` from `midparentHeight`, report the slope, and confirm it is below 1. In one sentence, connect the number to regression to the mean.
26. (C) Using `galton_heights.csv`, predict the child height for a mid-parent height of 66 inches and of 72 inches. Confirm that the taller prediction is closer to the overall mean child height (about $66.7$ inches) than 72 is, illustrating the pull toward the middle.
27. (C) Read `anscombe.csv` and reproduce the summary table from Example 1.4 for all four x-y pairs (means, variance of x, correlation, and fitted line). Then make the four scatterplots. Which of the four is a genuine straight-line relationship, and which one has its slope set by a single point?
28. (C) Read `orings.csv`. Report the number of flights, the coldest launch temperature in the data, and the total number of damage incidents. Explain why predicting the damage risk at $31$ degrees is an extrapolation, referring to the coldest temperature you found.

## 1.12 Exam practice

The problems above check that you can recall and apply the ideas. The exams ask for something
harder: to explain your reasoning in full sentences, to judge a claim someone else made, and to
read real software output in context. The five questions here are written in that exam style. Each
one wants prose, not a bare word or number. Attempt a complete written answer before you open the
model answer, and compare not just the conclusion but the reasoning. A grader gives full marks for
the reasoning.

**EP 1.1. One line, three requests.** A marketing analyst fits a single least-squares line of
monthly sales (in thousands of dollars) on monthly advertising spend (also in thousands). She then
uses that one line for three requests. She tells the finance team that each extra thousand dollars
of advertising goes with about four thousand dollars more in sales. She forecasts next month's
sales from the budget already approved for next month. And she advises the CEO that raising the ad
budget by ten thousand dollars will raise sales by about forty thousand dollars. Explain why the
same fitted line can serve all three requests, yet the trust the analyst is entitled to is not the
same for each. Rank the three requests from most to least trustworthy and defend the ranking.

:::{admonition} Model answer
:class: dropdown
All three requests read off the same fitted rule, $\hat{Y} = b_0 + b_1 X$: the first reports its
slope, the second plugs a new value of $X$ into it, and the third asks what moving $X$ would do. One
line can answer all three because description, prediction, and causal reasoning are three questions
you can put to a single fit, not three different fits.

The trust differs because each request asks more of the data than the one before it. Reporting the
slope is **description**: it only summarizes the pattern already in the data, so it is the most
trustworthy of the three. Forecasting next month's sales is **prediction**: it assumes the same
pattern keeps holding for a new month, and it is safe only if next month's budget sits inside the
range of budgets the line was fit on, rather than being an extrapolation past them. Advising the CEO
that more spending will cause more sales is **causal reasoning**, and it is the least trustworthy,
because the line measures association, not cause. If some third variable, say the season, drives both
ad spend and sales together, then raising the budget need not raise sales at all, even though the
line slopes upward. So the ranking, most to least trustworthy, is description, then prediction, then
causal reasoning.

A weak answer names the three uses but does not connect the shrinking trust to the extra assumption
each use adds: pattern-stability (and staying inside the data range) for prediction, and the absence
of a confounder for the causal claim.
:::

**EP 1.2. A claim about regression to the mean.** A student writes: "Regression to the mean proves
that extremes disappear over time. So a very tall father should expect a son of about average
height, and a team that just won the championship is due for a losing season next year." Evaluate
the claim. State precisely what regression to the mean does and does not assert, and correct the two
specific errors.

:::{admonition} Model answer
:class: dropdown
The claim starts from a true observation, that cases selected for being extreme on one measurement
tend to be less extreme on a second, but it draws two wrong conclusions from it.

The first error is the size of the pull. Regression to the mean does not drag the second measurement
all the way back to the average; it predicts a value that is less extreme than the first but usually
still on the same side of the average. Galton's fitted slope of about $0.64$ says the son of a very
tall father is predicted to be tall, only about two-thirds as far above average as his father, not
average. Expecting "about average" confuses a slope below one with a slope of zero.

The second error is treating a statement about groups as a fact about single cases and about the
future. Regression to the mean describes the average of a group selected for being extreme, and it
works because an extreme value is usually part skill and part luck, and the luck does not repeat.
Skill does carry over. A championship team is expected to stay above average next year, just less
extreme, so it is not "due" for a losing season; believing a good team owes the world a bad year is
the gambler's fallacy, not regression to the mean.

A weak answer correctly names regression to the mean but does not catch that the predicted value
stays on the extreme side of the average (a slope below one, not zero), and does not separate the
luck that fails to repeat from the skill that does.
:::

**EP 1.3. Interpreting a fitted line in context.** Galton's data on $934$ children are used to fit
child height (inches) on mid-parent height (inches). Here is the R output, then the Python
coefficients, then predicted child heights at three mid-parent heights. The mean child height in the
data is $66.75$ inches.

```text
Coefficients:
                Estimate Std. Error t value Pr(>|t|)
(Intercept)     22.63624    4.26511   5.307 1.39e-07 ***
midparentHeight  0.63736    0.06161  10.345  < 2e-16 ***
---
Residual standard error: 3.392 on 932 degrees of freedom
Multiple R-squared:  0.103,	Adjusted R-squared:  0.102
```

```text
Intercept          22.636241
midparentHeight     0.637361

predicted child height at midparent = 64, 68, 72:
   63.42734   65.97678   68.52623
```

**(a)** Interpret the slope $0.637$ in the units of this problem. **(b)** Explain why you should
*not* read the intercept $22.64$ as "a child whose parents average zero inches is predicted to be
$22.64$ inches tall." **(c)** Using the three predicted values and the mean child height of $66.75$
inches, explain how the predictions at mid-parent heights of $64$ and $72$ inches illustrate
regression to the mean. **(d)** A classmate says the low $R^2$ of $0.103$ means the regression is
wrong and should be thrown out. Respond.

:::{admonition} Model answer
:class: dropdown
**(a)** Each additional inch of mid-parent height goes with about $0.637$ of an inch more child
height, on average. The relationship is positive but shallow: taller parents do have taller children,
but the increase is well under one inch per parental inch.

**(b)** A mid-parent height of zero is nowhere near the data, which sit around $64$ to $72$ inches,
so the intercept is not a real prediction for anyone. It is only the number that pins the line at the
right height over the range that was actually observed. Reading it as a prediction at zero is
extrapolating far past every data point, where the straight-line relationship was never checked.

**(c)** A mid-parent height of $64$ inches is below the average parent, and the model predicts a
child of $63.43$ inches, which is below the mean child height of $66.75$ but closer to it than $64$
is. A mid-parent height of $72$ inches is well above average, and the model predicts $68.53$ inches,
above the mean child height but closer to it than $72$ is. In both directions the predicted child is
pulled toward the middle relative to the parents. That pull, produced by a slope below one, is
exactly regression to the mean.

**(d)** A low $R^2$ does not mean the model is wrong. It means mid-parent height explains only about
$10$ percent of the variation in child height, which is honest: height has many causes beyond the
parents' average, so most of the scatter is left unexplained. The slope is still real and sharply
significant (its $t$ value is over ten). Whether to keep the model depends on the question. For
describing how child height tracks parent height it is fine; for predicting one child's height
precisely it is weak, and the large residual standard error of $3.39$ inches says so.

A weak answer reads the intercept as a literal prediction, or treats the low $R^2$ as proof the fit
is broken, missing that $R^2$ measures explained variation, not correctness.
:::

**EP 1.4. The salary gap: what would change if.** The dean's data show men earning about $\$14{,}088$
more per year than women, on average. A trustee reads this raw gap as proof that the college underpays
women. For each change below, say what it would do to the strength of a *causal* reading of the gap,
and why. **(a)** The analyst refits holding rank, discipline, and years of service fixed, and the gap
shrinks to a small amount. **(b)** Even after that adjustment, some variable nobody measured (say,
field-specific outside job offers) still differs between the two groups. **(c)** Imagine,
hypothetically, that sex could have been randomly assigned to faculty. Close with one sentence on why
observational salary data can rarely settle the causal question on its own.

:::{admonition} Model answer
:class: dropdown
**(a)** Rank, discipline, and years of service all affect salary and may be distributed differently
between the groups, so they are confounders for the raw gap. Holding them fixed removes the part of
the $\$14{,}088$ that was really a difference in rank or experience. If the gap shrinks to a small
amount, most of the raw difference was confounding, and the smaller remaining gap is a better, though
still imperfect, estimate of any true unequal-pay effect.

**(b)** Any confounder you cannot measure stays tangled in the comparison, because you can only adjust
for variables you have. So even the adjusted gap can be biased in either direction by the unmeasured
outside-offer difference, and it is still not proof of underpayment. Adjustment strengthens the case
only for the confounders you actually caught.

**(c)** Random assignment would balance every confounder, measured or not, between the groups on
average, so a gap that remained after randomization could be read as causal. But sex cannot be
assigned by a coin flip, which is precisely why this causal question is hard and why no amount of
adjustment fully substitutes for an experiment.

Because observational salary data always leaves some unmeasured confounder uncontrolled, it can
establish that the groups differ in pay, an association, but rarely that unequal treatment caused the
difference on its own.

A weak answer treats the adjusted gap as either fully proving or fully disproving discrimination,
missing that unmeasured confounders survive adjustment and that only randomization balances them all.
:::

**EP 1.5. The Challenger launch: reading a figure.** Refer to @fig-ch01-orings, the $23$ shuttle
flights before Challenger. Every flight on record launched at $53$ degrees Fahrenheit or warmer, and
the launch under discussion was forecast at about $31$ degrees. **(a)** Using the figure, explain in
context why forecasting O-ring damage at $31$ degrees is an extrapolation, and why that makes the
prediction unreliable even when a fitted curve reports a confident-looking number. **(b)** What would
change about the reliability of the $31$-degree prediction if the coldest earlier flight had been at
$30$ degrees instead of $53$? **(c)** A manager says, "The fitted line already gives a damage
estimate at $31$ degrees, so we have accounted for the cold." Evaluate that statement.

:::{admonition} Model answer
:class: dropdown
**(a)** In the figure every point sits at $53$ degrees or warmer, so $31$ degrees lies far to the
left of all the data. The relationship between temperature and damage was only ever observed over the
warm range, and the shape of any curve below $53$ degrees is an assumption the data cannot check. A
model will still return a number at $31$ degrees, and its interval may even look narrow, but that
narrowness reflects only the fitted line's uncertainty over the observed range, not the real and much
larger uncertainty about a temperature no flight ever saw. That is what makes an extrapolated
prediction untrustworthy.

**(b)** If a flight had launched near $30$ degrees, then $31$ degrees would fall *inside* the observed
range, making the prediction an interpolation rather than an extrapolation. The data would then speak
directly to how the O-rings behave in the cold, and the prediction at $31$ degrees would be far more
trustworthy, because the pattern would have been tested near that temperature instead of assumed.

**(c)** Fitting a line does not "account for" a temperature that was never observed. The line only
summarizes flights at $53$ degrees and warmer, so reading it at $31$ degrees extends that summary past
the edge of all experience. Having an equation to plug the number into gives a false sense of safety;
the cold was not accounted for, it was assumed away.

A weak answer says the prediction is merely uncertain without identifying that $31$ degrees lies
outside the range of the data, or believes that once an equation exists any input value is safe to
plug in.
:::

## Chapter game

:::{admonition} Play the Chapter 1 game
:class: tip
Play the Chapter 1 game on your phone or laptop: 10 quick rounds, no setup.
[Open the game](../games/ch01.html). It drills the working ideas of this chapter:
sorting a question into description, prediction, or causal reasoning; reading Galton's
below-one slope as regression to the mean; matching the parts of $Y = f(X) + \varepsilon$;
fitting and diagnosing Anscombe's real data; ordering the ASK, EXPLORE, FIT, CHECK, USE
workflow; and spotting the confounder and the extrapolation, with the reason shown after
every answer.
:::

:::{admonition} Resumen del capítulo (en español)
:class: dropdown
Este capítulo es un mapa panorámico de la **regresión (regression)**, la herramienta que estudia
cómo una **respuesta (response)** $Y$ depende de uno o más **predictores (predictors)** $X$. Se abre
con tres problemas reales: estimar horas de trabajo a partir del tamaño del lote en la empresa
Toluca, decidir el lanzamiento del transbordador Challenger a partir del daño en los anillos con la
temperatura, y evaluar una diferencia salarial de unos $\$14{,}088$ entre hombres y mujeres. Los
tres son la misma clase de pregunta.

La regresión sirve para tres fines de dificultad creciente: **describir (describe)** una relación
mediante una pendiente, **predecir (predict)** un valor nuevo, y **razonar sobre causas (causal
reasoning)**, lo más difícil, porque un ajuste mide asociación, no causa. La palabra "regresión"
proviene de Francis Galton, quien notó que los hijos de padres muy altos son altos pero menos que
sus padres: la **regresión a la media (regression to the mean)**. La pendiente ajustada de la altura
del hijo sobre la de los padres es aproximadamente $0.64$, claramente menor que $1$.

Todo modelo del libro tiene la misma anatomía, $Y = f(X) + \varepsilon$: una parte sistemática (la
señal que $X$ explica) más una parte aleatoria (el ruido). Distinguimos un **parámetro (parameter)**
$\beta_1$, la verdad desconocida, de su **estimación (estimate)** $b_1$, lo que calculamos. La
**asociación no es causa (association is not causation)**: una **variable oculta (confounder)** como
el calor puede crear una correlación fuerte entre ventas de helado y ahogamientos sin ningún vínculo
causal. Los datos **experimentales (experimental)** con asignación aleatoria permiten afirmar causa;
los **observacionales (observational)** no. El cuarteto de Anscombe recuerda que siempre hay que
graficar los datos.

Una breve historia va de los mínimos cuadrados de Gauss y Legendre (hacia 1805) a Fisher, a los
modelos lineales generalizados (1972) y al aprendizaje automático actual. La tesis del curso: ahora
que cualquier modelo se ajusta en una línea de código, la habilidad escasa es **juzgar (judge)** los
modelos, no ajustarlos. El capítulo cierra con un recorrido por los quince capítulos siguientes y
consejos para estudiar de forma autónoma.
:::
