---
title: "Week 5 — Variability of a Random Variable; Continuous Curves"
short_title: "Week 5"
---

# Week 5 — Variability of a Random Variable; Continuous Curves

:::{admonition} This week
:class: tip
**OpenIntro 4th ed.** — finishing §3.4 (stopping before §3.4.3) and starting §3.5 (Continuous
Distributions).

By the end of this week you can:
1. Compute the standard deviation of a discrete random variable, $SD(X) = \sqrt{\sum (x-\mu)^2 P(x)}$.
   *(Apply, §3.4.2)*
2. Explain that for a continuous random variable, probability is the **area** under a density curve.
   *(Understand, §3.5)*
3. Identify the key features of a Normal density curve (bell-shaped, symmetric, centered at $\mu$,
   spread out by $\sigma$). *(Understand, §3.5)*
4. Explain that the total area under any density curve equals 1. *(Understand, §3.5)*
:::

Last week you built your first probability distribution table and used it to find a game's expected
winnings — the long-run average payout if you played over and over. That average is only half the
story. Two games can share the exact same average payout and still feel completely different to play:
one might pay out close to that average almost every time, while the other swings wildly between a big
loss and a rare big win. This week you'll learn to measure that swing with the **standard deviation of
a random variable**. Then you'll take the first step past distributions built from a short list of
outcomes — *discrete* random variables — into the kind where the outcome could be any number in a
range at all, like a person's height or how long a coffee order takes. That's a *continuous* random
variable, and it's the introduction to the bell-shaped Normal curve you'll spend the next several
weeks with.

## The mean of a random variable, one more time

A **random variable** $X$ assigns a number to every outcome of a random process. Its **probability
distribution** lists each possible value $x$ next to $P(x)$, the chance that value occurs — every
$P(x)$ is between 0 and 1, and they all add up to 1. You already met the **mean**, or **expected
value**, of $X$:

$$\mu = E(X) = \sum x \cdot P(x)$$

Read this as a **weighted average**: instead of averaging every value equally, multiply each value by
how likely it is, then add the products. $\mu$ isn't necessarily a value $X$ can even take on — it's
the distribution's balancing point, and its most useful meaning is a **long-run average**: if the
random process repeated itself thousands of times, the average of all those outcomes would settle in
near $\mu$.

## How far from the mean? The standard deviation of a random variable

The **standard deviation** of a random variable, written $\sigma$ or $SD(X)$, measures the typical
distance an outcome lands from $\mu$:

$$\sigma = SD(X) = \sqrt{\sum (x - \mu)^2\, P(x)}$$

Read it left to right: find each outcome's **deviation** from the mean, $x-\mu$ (this can be
negative); **square** every deviation so negatives don't cancel positives; weight each squared
deviation by its probability $P(x)$ and add them up (this sum is the **variance**, $\sigma^2$); then
undo the squaring with a square root so $\sigma$ comes back in the same units as $X$.

**Worked Example 1 — a warm-up with round numbers.** Before the richer example below, try the
formula on the simplest possible game: flip one fair coin. Heads (probability 0.5) pays \$4; tails
(probability 0.5) pays \$0. Let $X$ be the payout.

| Outcome | $x$ | $P(x)$ | $x\cdot P(x)$ | $x-\mu$ | $(x-\mu)^2$ | $(x-\mu)^2 P(x)$ |
|---|---:|---:|---:|---:|---:|---:|
| Heads | \$4 | 0.5 | 2 | 2 | 4 | 2 |
| Tails | \$0 | 0.5 | 0 | −2 | 4 | 2 |
| **Total** | | **1.0** | **2** | | | **4** |

$\mu = E(X) = 2 + 0 = \$2$: the long-run average payout is \$2. Summing the last column gives the
variance, $\sigma^2 = 2 + 2 = 4$, so $\sigma = \sqrt{4} = \$2$. Every step is a round number here on
purpose, so you can check each one in your head before the next example makes the numbers messier.

**Worked Example 2 — expected winnings on a raffle ticket.** A campus club sells 200 tickets at \$5
each for a fundraiser. One ticket wins a \$300 grand prize, four tickets win a \$25 gift card, and the
remaining 195 tickets win nothing. Let $X$ be a ticket buyer's **net winnings** — the prize won minus
the \$5 cost — for a single ticket.

| Outcome | $x$ | $P(x)$ | $x\cdot P(x)$ | $x-\mu$ | $(x-\mu)^2$ | $(x-\mu)^2 P(x)$ |
|---|---:|---:|---:|---:|---:|---:|
| Grand prize | \$295 | 0.005 | 1.475 | 298 | 88,804 | 444.02 |
| Gift card | \$20 | 0.020 | 0.400 | 23 | 529 | 10.58 |
| No prize | −\$5 | 0.975 | −4.875 | −2 | 4 | 3.90 |
| **Total** | | **1.000** | **−3.00** | | | **458.50** |

Summing the $x\cdot P(x)$ column gives $\mu = E(X) = -\$3.00$. On average, a ticket buyer loses \$3
per ticket in the long run. That is exactly why the fundraiser works: multiply that average loss by
all 200 tickets sold, and $200 \times (-\$3) = -\$600$ for players collectively — which means \$600
raised for the club. You can check that number directly, ticket by ticket, instead of through the
probability table:

| | Amount |
|---|---:|
| Ticket sales (200 tickets × \$5) | \$1,000 |
| Prizes paid out (\$300 + 4 × \$25) | \$400 |
| **Net raised for the club** | **\$600** |

Both routes agree: \$600. Summing the last column of the first table and taking the square root gives

$$\sigma = \sqrt{458.50} \approx \$21.41.$$

A single ticket's outcome typically lands about \$21.41 away from that $-\$3$ average — a large spread
relative to the mean. Almost every ticket loses exactly \$5 (close to average), but the rare \$295 win
sits far out and pulls the *typical distance* from the mean way up. A hypothetical raffle with the same
$-\$3$ mean where every ticket simply lost \$3 for certain would have $\sigma = 0$ — no spread, because
there'd be nothing uncertain about the outcome. Here $\sigma \approx \$21.41$ signals real risk: most
players lose a little, a few win a lot.

## From discrete to continuous: density curves

Every random variable so far — carnival-game payouts, raffle winnings — has been **discrete**: a short list
of possible values you can put in a table and add up. Many real quantities aren't like that. A
person's height, an espresso machine's steaming time, or a commute can fall anywhere along a
continuum, with no useful way to list "every possible value" one at a time. These are **continuous
random variables**, and they need a different tool than a probability table: a **density curve**.

A density curve is a smooth curve where **area, not height, equals probability**. The probability that
$X$ falls between two values $a$ and $b$ is the area under the curve between $a$ and $b$ — never read a
probability directly off the curve's height. Two properties always hold: the curve never dips below 0,
and the **total area under the entire curve equals 1** (some outcome always happens). One especially
important density-curve shape — the one you'll use for the rest of the semester — is the **Normal
curve**: bell-shaped, symmetric, single-peaked, centered exactly at the mean $\mu$, with its spread
controlled by $\sigma$. A Normal curve with mean $\mu$ and standard deviation $\sigma$ is written
$N(\mu, \sigma)$.

**Worked Example 3 — Reading area under a density curve.** Suppose adult female height (inches) is
modeled by a Normal density curve $N(64.5, 2.5)$ — a common illustrative figure for this bell shape,
not a claim about any specific real survey. What's the probability a randomly selected woman is
between 63 and 66 inches tall? Because $X$ is continuous, this probability is the **area** under the
curve between 63 and 66, not a height read off the curve. R's `xpnorm()` function computes that area
(quietly converting each boundary to a standardized distance from the mean behind the scenes — a
preview of the z-score tool coming in Week 6) and reports:

$$P(X<63)=0.2743, \qquad P(X<66)=0.7257,$$

so the strip between them has area $P(63<X<66)=0.4515$ — about 45.1% of adult women, under this model,
fall in that six-inch window. Two things this previews: first, $P(X<66)$ already includes everything up
through 63, so the middle strip's area is the *difference* of two "less-than" areas — the same
whole-minus-the-rest logic you'll use constantly with density curves. Second, because a single exact
height is a line with zero width, the area above any one exact value is 0, so $P(X=64.5)=0$ even
though $P(63<X<66)>0$.

:::{admonition} On your TI-83/84
:class: note
The **frequency-list trick** from last week extends naturally to the standard deviation: enter the
raffle's net-winnings values in `L1` (295, 20, −5) and their probabilities in `L2` (.005, .02, .975),
then run `STAT ▸ CALC ▸ 1-Var Stats L1,L2`. The calculator reads `L2` as weights, so it reports `x̄` =
$\mu$ = −3 (that's $E(X)$) **and** `σx` = $\sigma$ ≈ 21.41 (that's $SD(X)$) on the same screen — no
separate formula needed. For a first look at reading area under a curve, `2ND VARS` (`DISTR`)
`▸ ShadeNorm(63, 66, 64.5, 2.5)` draws the bell curve from Worked Example 3, shades the region between
63 and 66, and prints the area (0.4515) right on the graph screen — a preview of the `normalcdf(`
function you'll use starting next week.
:::

**See it in R.**

```r
library(mosaic)

# Worked Example 2: raffle net winnings ($5 ticket, 200 sold)
x <- c(295, 20, -5)             # net winnings (prize won - $5 cost)
p <- c(0.005, 0.020, 0.975)     # 1 grand prize, 4 gift cards, 195 no-prize / 200
sum(p)                          # check: probabilities sum to 1

mu <- sum(x * p)                # E(X)
mu

sigma <- sqrt(sum((x - mu)^2 * p))   # SD(X)
sigma

# Worked Example 3 preview: area under a density curve
xpnorm(c(63, 66), mean = 64.5, sd = 2.5, plot = FALSE)
gf_dist("norm", mean = 64.5, sd = 2.5)   # draws the N(64.5, 2.5) density curve
```

Running this prints `mu = -3` and `sigma = 21.41261` — matching the by-hand table above — and
`xpnorm()` prints `P(X ≤ 63) = 0.2743` and `P(X ≤ 66) = 0.7257`, the same two areas used in Worked
Example 2. `gf_dist("norm", ...)` draws the $N(64.5, 2.5)$ density curve itself, a visual check that
it's bell-shaped and centered where you'd expect.

![A probability histogram of the raffle's net winnings has three bars: a very tall bar at x = -$5 reaching a height of 0.975, a short bar at x = $20 with height 0.02, and a barely visible bar at x = $295 with height 0.005. A vertical dashed line marks the mean, mu = -$3, sitting just to the right of the tall -$5 bar -- most tickets lose close to the average, while the rare $295 win sits far out in the right tail and pulls the standard deviation up to $21.41.](data:image/png;base64,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)

*Figure 1.* A probability histogram of the raffle's net winnings has three bars: a very tall bar at
$x=-\$5$ reaching a height of 0.975, a short bar at $x=\$20$ with height 0.02, and a barely visible bar
at $x=\$295$ with height 0.005. A vertical dashed line marks the mean, $\mu=-\$3$, sitting just to the
right of the tall $-\$5$ bar — most tickets lose close to the average, while the rare \$295 win sits
far out in the right tail and pulls the standard deviation up to \$21.41.

![A bell-shaped Normal density curve N(64.5, 2.5) is shaded between x = 63 and x = 66. The shaded strip's area, 0.4515, is printed in the middle of the curve; the unshaded area in both tails together equals 1 minus 0.4515 = 0.5485, and the entire shaded-plus-unshaded region under the curve sums to exactly 1.](data:image/png;base64,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)

*Figure 2.* A bell-shaped Normal density curve $N(64.5, 2.5)$ is shaded between $x=63$ and $x=66$. The
shaded strip's area, 0.4515, is printed in the middle of the curve; the unshaded area in both tails
together equals $1-0.4515=0.5485$, and the entire shaded-plus-unshaded region under the curve sums to
exactly 1.

:::{admonition} MATH 952 skills refresher — weighted averages, squaring, and square roots
:class: seealso
$E(X)=\sum x\cdot P(x)$ is a **weighted average**: multiply each value by its own weight (here, its
probability) before adding, instead of just adding values and dividing by how many there are. A fast
check that your probabilities are legitimate weights: they must add to exactly 1 (Worked Example 2:
$0.005+0.020+0.975=1.000$ ✓). For the standard deviation, do the steps in order: **subtract** first
($x-\mu$, which can be negative — that's fine), **square** second (a negative squared is always
positive, e.g. $(-2)^2=4$), **multiply and add** third, and only take the **square root** at the very
last step, on the calculator's $\sqrt{\ \ }$ key, after everything is already summed. Taking the square
root too early, or forgetting to square a negative deviation, is the most common arithmetic slip on
this formula.
:::

## Check your understanding

1. A carnival ring-toss game costs \$3 to play. You win a \$10 prize with probability 0.10, a \$5 prize
   with probability 0.20, and nothing the rest of the time. Let $X$ be your net winnings. Find $\mu =
   E(X)$.
2. Using the same ring-toss game, find $\sigma = SD(X)$. (Hint: build the same six-column table as
   Worked Example 2.)
3. In Worked Example 2's raffle, the club sells all 200 tickets. Using $\mu = E(X) = -\$3$, find the
   players' total expected net winnings across all 200 tickets, and explain what that number means for
   the club's fundraiser.
4. In Worked Example 3, $P(X < 66) = 0.7257$. Using the fact that the total area under any density
   curve equals 1, find $P(X > 66)$ without computing a new area from scratch.
5. Explain, in your own words, why height needs a density curve instead of a probability table like the
   ones you built for discrete random variables in Weeks 4–5.
6. True or false, with a one-sentence reason: for the continuous $X$ in Worked Example 3, $P(X = 64.5) >
   0$.

## Key terms

- **Random variable ($X$)** — a variable that assigns a number to every outcome of a random process.
- **Expected value / mean of a random variable ($\mu$, $E(X)$)** — the probability-weighted average of
  a random variable's possible values, $\mu=\sum x\cdot P(x)$; best interpreted as a long-run average
  over many repetitions.
- **Weighted average** — an average in which some values count more than others because they're
  multiplied by a weight (here, a probability) before summing.
- **Deviation** — how far a value sits from the mean, $x-\mu$; can be positive or negative.
- **Variance ($\sigma^2$)** — the probability-weighted average of the squared deviations,
  $\sum(x-\mu)^2 P(x)$.
- **Standard deviation of a random variable ($\sigma$, $SD(X)$)** — the square root of the variance;
  the typical distance an outcome falls from $\mu$, in the same units as $X$.
- **Continuous random variable** — a random variable that can take any value along a continuum (no
  gaps), so its possible values can't be listed in a table.
- **Density curve** — a smooth curve describing a continuous random variable, where **area under the
  curve equals probability**; the curve is never negative, and the total area under it always equals
  1.
- **Normal distribution, $N(\mu,\sigma)$** — a specific bell-shaped, symmetric, single-peaked density
  curve centered at $\mu$ with spread controlled by $\sigma$.

:::{admonition} Durable skill: quantitative reasoning & critical thinking
:class: important
Every insurance premium, casino game, and investment product is priced using exactly the reasoning in
Worked Example 2: a company computes the expected value of a bet — often tilted in its own favor — and
prices around it, while a customer who only sees the possible upside is reasoning about the wrong
number. Being able to compute, and question, an expected value is a quantitative-reasoning skill that
transfers directly to reading a workplace risk assessment, a loan offer, or a benefits package.
:::
