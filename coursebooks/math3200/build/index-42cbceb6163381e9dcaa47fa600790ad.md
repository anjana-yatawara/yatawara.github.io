# Discrete Random Variables and Their Distributions

:::{admonition} Learning Objectives
:class: note

After completing this chapter, you will be able to:

1. Define discrete random variables and construct probability mass functions
2. Compute and interpret cumulative distribution functions
3. Calculate expected values, variances, and standard deviations
4. Derive and apply the Binomial, Geometric, Negative Binomial, Hypergeometric, and Poisson distributions
5. Compute and use moment generating functions
6. Apply Tchebysheff's theorem to bound probabilities

**Prerequisites:** Chapters 2–3. **Builds on:** Probability axioms, conditional probability, counting.

*Content current as of April 2026.*
:::

---

:::{admonition} The Opening Problem
:class: important

**The Lottery Paradox.** In 2023, Americans spent over \$113 billion on lottery tickets. A typical state lottery ticket costs \$2. The expected payout — the average amount you would win if you played millions of times — is about \$0.90. That means every ticket you buy loses about \$1.10 on average. Yet roughly half of all American adults play the lottery regularly. Why?

The answer is that humans are profoundly bad at reasoning about random outcomes. We overweight the tiny probability of a massive jackpot and ignore the near-certainty of a small loss. By the end of this chapter, you will have the mathematical tools to compute expected values precisely, to quantify the spread of possible outcomes, and to understand exactly why the lottery is a losing game — and why casinos, insurance companies, and tech platforms always win in the long run.

But this chapter is about far more than gambling. Random variables and their distributions are the language that science, medicine, engineering, and business use to describe uncertainty. Every time a pharmaceutical company asks "how many patients will respond to this drug?", every time a network engineer asks "how many packets will arrive this second?", every time a quality inspector asks "how many defective parts are in this shipment?" — they are asking questions about discrete random variables.

:::

---

## 4.1 Random Variables: The Formal Definition

:::{admonition} What Are We About to Learn?
:class: tip

Until now, we have been working with events — subsets of a sample space — and computing their probabilities directly. But in practice, we almost never care about the raw outcomes of an experiment. We care about *numbers* derived from those outcomes. When you toss five coins, you don't usually care about the specific sequence HTHHT; you care about the *count* of heads. When a hospital admits patients over a shift, the administrator doesn't track each individual arrival; they track *how many* patients arrived.

A **random variable** is the mathematical device that translates outcomes into numbers. It is a function — a rule — that takes each outcome in the sample space and assigns it a numerical value. This seemingly simple idea is one of the most powerful in all of probability, because once we have numbers, we can compute averages, measure spread, build formulas, and make predictions.

**By the end of this section, you will be able to:**

- Explain what a random variable is and why it is a function, not a number
- Distinguish between discrete and continuous random variables
- Identify the random variable in a real-world scenario
- Use proper notation: uppercase for the variable, lowercase for its values
:::

In Chapters 2 and 3, we built the foundations of probability: sample spaces, events, axioms, conditional probability, and counting. Every calculation started with a sample space $S$ and asked about the probability of some event $A \subseteq S$. This framework is powerful, but it has a practical limitation: most real questions are about *numbers*, not about raw outcomes.

Consider the experiment of rolling two fair dice. The sample space contains 36 ordered pairs: $(1,1), (1,2), \ldots, (6,6)$. But when you play a board game, you don't care which die showed what — you care about the *sum*. When a gambler bets on the total, the relevant quantity is a single number between 2 and 12, not a pair of faces.

We need a way to go from outcomes to numbers. That is exactly what a random variable does.

:::{admonition} Definition 4.1: Random Variable
:class: note

A **random variable** is a real-valued function defined on a sample space $S$. That is, a random variable $Y$ is a rule that assigns a real number $Y(s)$ to every outcome $s$ in $S$.
:::

The word "random" can be misleading. A random variable is not a variable in the algebraic sense (like solving $3x + 1 = 7$ for $x$), and it is not random in the colloquial sense of "unpredictable." It is a *function* — a deterministic mapping — applied to the outcome of a random experiment. The randomness comes from the experiment, not from the function itself.

**Notation convention.** Throughout this book, we follow a strict convention:

- **Uppercase letters** ($Y$, $X$, $Z$) denote random variables — the function itself.
- **Lowercase letters** ($y$, $x$, $z$) denote particular values that the random variable might take — specific numbers.

So $Y$ is the random variable "the number of heads when you toss three coins," and $y = 2$ is one particular value it might take. The expression $P(Y = y)$ reads "the probability that the random variable $Y$ takes the value $y$."

### Discrete vs. Continuous Random Variables

Random variables come in two fundamental types.

:::{admonition} Definition 4.2: Discrete Random Variable
:class: note

A random variable $Y$ is said to be **discrete** if it can assume only a finite or countably infinite number of distinct values.
:::

In plain terms, a discrete random variable *counts* things. The number of emails you receive in an hour (0, 1, 2, 3, ...), the number of heads in ten coin tosses (0, 1, 2, ..., 10), the number of defective items in a shipment — all of these are discrete. You can list the possible values, even if the list is infinitely long.

A **continuous** random variable, by contrast, can take any value in some interval of real numbers. The temperature outside, the time until a light bulb burns out, the exact weight of a bag of flour — these quantities can, in principle, take any value in a continuous range. We will study continuous random variables in Chapter 5. For now, our focus is entirely on discrete random variables.

### Building a Random Variable: Examples

The best way to understand random variables is to build several from scratch.

:::{admonition} Example 4.1: Songs in a Playlist
:class: important

A streaming service randomly selects 3 songs from a library that contains 4 pop songs and 6 hip-hop songs. Let $Y$ denote the number of pop songs in the selection.

**What is the sample space?** Each outcome is a specific set of 3 songs drawn from 10. The sample space $S$ has $C(10, 3) = 120$ equally likely outcomes.

**What does the random variable do?** The function $Y$ takes each set of 3 songs and counts how many are pop. For example:

- If all 3 songs are hip-hop: $Y = 0$
- If 1 pop song and 2 hip-hop songs are selected: $Y = 1$
- If 2 pop and 1 hip-hop: $Y = 2$
- If all 3 are pop: $Y = 3$

So $Y$ can take the values 0, 1, 2, or 3. Notice that $Y$ is discrete — it counts something — and the possible values are a finite set $\{0, 1, 2, 3\}$.
:::

:::{admonition} Example 4.2: Network Packet Errors
:class: important

A network engineer monitors data packets transmitted over a fiber optic link. Each packet independently has a probability 0.01 of being corrupted. The engineer checks packets one at a time until the first corrupted packet is found. Let $Y$ denote the number of the packet on which the first corruption is detected.

**What values can $Y$ take?** The first corruption could be on packet 1, packet 2, packet 3, and so on. In principle, you might have to check an enormous number of packets before finding a corrupted one. So $Y$ can take the values $1, 2, 3, \ldots$ — a countably infinite set.

$Y$ is still discrete, because its possible values can be listed (put into one-to-one correspondence with the positive integers), even though the list never ends.
:::

:::{admonition} Example 4.3: Mapping a Die Roll
:class: important

Roll a fair six-sided die once. Let $X$ denote the face value. Here the random variable is almost trivial: it simply reads the number off the die. The sample space is $S = \{1, 2, 3, 4, 5, 6\}$, and $X(s) = s$ for every outcome. But we could define a *different* random variable on the same experiment. Let

$$W = \begin{cases} 1 & \text{if the roll is even} \\ 0 & \text{if the roll is odd} \end{cases}$$

Now $W$ takes only two values, 0 and 1, even though there are six outcomes. Different random variables can be defined on the same sample space, extracting different information from the same experiment.
:::

### Why Random Variables Matter

You might wonder: if a random variable is just a function on the sample space, why bother defining it? Why not just work with events directly?

The answer is *power*. Once we attach numbers to outcomes, we can:

- **Compute averages** (expected values) — what happens on average in the long run?
- **Measure spread** (variance) — how much variability is there around the average?
- **Derive formulas** — named distributions like the Binomial and Poisson give us powerful shortcuts
- **Build models** — we can describe real-world phenomena with compact mathematical expressions

The rest of this chapter develops all of these ideas. We start by asking: given a discrete random variable $Y$, how do we describe its probability structure completely?

### Seeing It in R

Before moving to formal definitions, let us *see* a random variable in action. The following R code simulates the playlist experiment from Example 4.1 ten thousand times and counts how many pop songs appear in each selection.

```r
#| label: rv-simulation
#| fig-cap: "Simulated distribution of Y = number of pop songs in a 3-song selection"

set.seed(42)
n_sim <- 10000

# Library: 4 pop songs (labeled 1) and 6 hip-hop songs (labeled 0)
library_songs <- c(rep(1, 4), rep(0, 6))

# Simulate: select 3 songs without replacement, count pop songs
Y <- replicate(n_sim, sum(sample(library_songs, size = 3, replace = FALSE)))

# Display relative frequencies
table(Y) / n_sim
barplot(table(Y) / n_sim,
        main = "Simulated Distribution of Y (10,000 Repetitions)",
        xlab = "Number of Pop Songs (Y)",
        ylab = "Relative Frequency",
        col = "steelblue",
        border = "white")
```

Run this code. You will see that $Y = 1$ is the most common outcome, occurring roughly half the time. In the next section, we will compute these probabilities *exactly* using probability mass functions — and the simulation will confirm our theory.

:::{admonition} Common Mistake
:class: warning

**Confusing the random variable with a specific value.** Students often write "$Y = $ the number of heads" when they mean to define the random variable, and then later write "$Y = 2$" when they mean a specific outcome. This creates confusion about whether $Y$ is a function (which it is) or a number (which it is not). The random variable $Y$ is the *rule*; the number $y = 2$ is a *value* that the rule might produce. The probability $P(Y = 2)$ asks: what is the chance that the rule produces the value 2?
:::

---

:::{admonition} What Did We Just Learn?
:class: tip

We formalized an idea you've been using informally your whole life: whenever you count a random outcome — how many heads, how many defects, how many customers — you are defining a **random variable**, a function that maps experimental outcomes to numbers.

**In real life, this means:** Every data point you've ever collected is an observed value of some random variable. When a hospital reports "12 ER admissions last night," the number 12 is an observed value $y = 12$ of the random variable $Y = $ number of ER admissions per night. When a factory reports "3 defective units in today's batch," the number 3 is an observation from $Y = $ number of defectives.

The power of this abstraction is that *different experiments can produce the same type of random variable*. The number of heads in 10 coin tosses and the number of patients responding to a drug out of 10 treated — these are the same random variable from a mathematical standpoint, even though they describe completely different phenomena. This is why a single distribution (the Binomial, as we will see in Section 4.6) can model both.

**What's next:** We have defined what a random variable is. But to do anything useful with it, we need to know the probabilities of each value it can take. That is the probability mass function — the subject of Section 4.2.
:::

---

### Exercises: Section 4.1

**4.1.1.** A rideshare driver completes trips over the course of a day. On a given day, she might complete 0, 1, 2, ..., or as many as 20 trips. Let $Y$ denote the number of trips she completes.

(a) Is $Y$ a discrete or continuous random variable? Explain.
(b) What is the set of possible values for $Y$?
(c) Give an example of an event expressed in terms of $Y$ and explain what it means in plain language.

**4.1.2.** Two students are randomly selected from a study group of 5 computer science majors and 3 mathematics majors. Let $X$ denote the number of mathematics majors selected.

(a) List the possible values of $X$.
(b) Describe the sample space $S$ and explain how $X$ maps each outcome to a number.
(c) Is this an example of a discrete or continuous random variable?

**4.1.3.** For each of the following, identify the random variable, state whether it is discrete or continuous, and list its possible values (or describe the range if continuous).

(a) A tech company tests 15 newly manufactured circuit boards and records how many pass quality inspection.
(b) A weather station records the exact amount of rainfall (in inches) during a 24-hour period.
(c) A social media post is shared by followers, and a researcher counts the total number of shares after 48 hours.
(d) A runner records her exact finishing time (in minutes and seconds) for a 5K race.

**4.1.4.** Consider the experiment of tossing a fair coin three times. The sample space is $S = \{HHH, HHT, HTH, HTT, THH, THT, TTH, TTT\}$.

(a) Define the random variable $Y = $ the number of heads. List the value of $Y$ for each outcome in $S$.
(b) Define a *different* random variable $W$ on the same sample space as follows: $W = 1$ if at least two consecutive tosses show the same face, and $W = 0$ otherwise. List the value of $W$ for each outcome in $S$.
(c) Find $P(Y = 2)$ and $P(W = 1)$.

---


## 4.2 Probability Mass Functions and Cumulative Distribution Functions

:::{admonition} What Are We About to Learn?
:class: tip

In the previous section, we defined what a random variable is — a function that maps outcomes to numbers. But knowing that a random variable *can* take the values 0, 1, 2, and 3 does not tell us *how likely* each value is. We need a complete probability profile: for every possible value, what is its probability?

Imagine you manage a small online store and you know that the number of returns per day can be 0, 1, 2, 3, or 4. That is useful, but not enough to plan staffing. What you really need to know is: returns are 0 about 35% of the time, 1 about 30% of the time, 2 about 20% of the time, 3 about 10% of the time, and 4 about 5% of the time. *That* is a probability mass function — the complete story of a discrete random variable.

**By the end of this section, you will be able to:**

- Write down the probability mass function (PMF) of a discrete random variable
- Verify that a given function is a valid PMF
- Compute and interpret cumulative distribution functions (CDFs)
- Move between PMF and CDF in both directions
- Represent probability distributions as tables, formulas, and graphs
:::

### The Probability Mass Function

Once we have a discrete random variable $Y$, the most natural question is: for each value $y$ that $Y$ can take, what is $P(Y = y)$?

:::{admonition} Definition 4.3: Probability Mass Function (PMF)
:class: note

The **probability distribution** (or **probability mass function**) for a discrete random variable $Y$ is a function $p(y)$ that gives the probability that $Y$ takes the value $y$:
$$p(y) = P(Y = y).$$
The PMF can be represented by a formula, a table, or a graph.
:::

The PMF $p(y)$ assigns a probability to each possible value of $Y$. For values that $Y$ cannot take, we have $p(y) = 0$. The following theorem states the two properties that every valid PMF must satisfy.

:::{admonition} Theorem 4.1: Properties of a PMF
:class: note

For any discrete probability distribution:

1. $0 \leq p(y) \leq 1$ for all $y$.
2. $\displaystyle\sum_{\text{all } y} p(y) = 1$, where the summation is over all values of $y$ with nonzero probability.
:::

Property 1 says that probabilities are between 0 and 1 (they are valid probabilities). Property 2 says that the total probability across all possible values is exactly 1 (something must happen). These two properties are the *only* requirements. Any function satisfying them is a valid PMF.

:::{admonition} Example 4.4: Building a PMF from Scratch
:class: important

An animal shelter records the number of dogs adopted each day. After analyzing a year of data, they find the following distribution:

| $y$ (dogs adopted) | 0 | 1 | 2 | 3 | 4 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| $p(y)$ | 0.15 | 0.30 | 0.25 | 0.20 | 0.10 |

**Is this a valid PMF?**

Step 1: Check that $0 \leq p(y) \leq 1$ for all $y$. Every entry in the table is between 0 and 1. ✓

Step 2: Check that the probabilities sum to 1.
$$0.15 + 0.30 + 0.25 + 0.20 + 0.10 = 1.00. \checkmark$$

Both properties of Theorem 4.1 are satisfied, so this is a valid PMF.

**Using the PMF:**

- $P(Y = 2) = p(2) = 0.25$. There is a 25% chance that exactly 2 dogs are adopted on a given day.
- $P(Y > 2) = p(3) + p(4) = 0.20 + 0.10 = 0.30$. There is a 30% chance that more than 2 dogs are adopted.
- $P(Y \leq 1) = p(0) + p(1) = 0.15 + 0.30 = 0.45$. There is a 45% chance that at most 1 dog is adopted.
:::

:::{admonition} Example 4.5: PMF Given by a Formula
:class: important

The PMF of a random variable $X$ is given by $p(x) = c/x$ for $x = 1, 2, 3, 4, 5$, where $c$ is a constant. Find the value of $c$ that makes this a valid PMF.

**Solution.**

For $p(x)$ to be a valid PMF, we need $\sum_{x=1}^{5} p(x) = 1$:

$$\sum_{x=1}^{5} \frac{c}{x} = c\left(\frac{1}{1} + \frac{1}{2} + \frac{1}{3} + \frac{1}{4} + \frac{1}{5}\right) = c\left(\frac{60 + 30 + 20 + 15 + 12}{60}\right) = c \cdot \frac{137}{60} = 1.$$

Solving for $c$:
$$c = \frac{60}{137} \approx 0.4380.$$

We can verify: $p(1) = 60/137$, $p(2) = 30/137$, $p(3) = 20/137$, $p(4) = 15/137$, $p(5) = 12/137$. These are all between 0 and 1, and they sum to $137/137 = 1$. ✓
:::

:::{admonition} Example 4.6: Is This a Valid PMF?
:class: important

A student proposes the following PMF: $p(x) = (1/4)(3/4)^{x-1}$ for $x = 1, 2, 3, \ldots$. Is this valid?

**Solution.**

First, $p(x) \geq 0$ for all $x$ since $(1/4) > 0$ and $(3/4)^{x-1} > 0$. ✓

Second, we check the sum. This is a geometric series with first term $a = 1/4$ and common ratio $r = 3/4$:

$$\sum_{x=1}^{\infty} \frac{1}{4}\left(\frac{3}{4}\right)^{x-1} = \frac{1/4}{1 - 3/4} = \frac{1/4}{1/4} = 1. \checkmark$$

Yes, this is a valid PMF. It describes a random variable that can take any positive integer value, with probabilities that decrease geometrically. (We will see in Section 4.7 that this is a geometric distribution with $p = 1/4$.)
:::

### The Cumulative Distribution Function

The PMF tells us the probability of each individual value. But we often need to answer questions like "what is the probability that $Y$ is at most 3?" or "what is the probability that $Y$ is between 2 and 5?" The cumulative distribution function makes these calculations easy.

:::{admonition} Definition 4.4: Cumulative Distribution Function (CDF)
:class: note

The **cumulative distribution function** (CDF) of a discrete random variable $Y$ is the function
$$F(y) = P(Y \leq y) = \sum_{t \leq y} p(t),$$
where the sum is taken over all values $t$ of $Y$ that are less than or equal to $y$.
:::

The CDF accumulates probability from left to right. At any point $y$, $F(y)$ tells you the total probability that has "piled up" at or below that value.

**Key properties of the CDF:**

1. $F$ is non-decreasing: if $a < b$, then $F(a) \leq F(b)$.
2. $\lim_{y \to -\infty} F(y) = 0$ and $\lim_{y \to \infty} F(y) = 1$.
3. For a discrete random variable, $F$ is a **step function** — it jumps at each value where $p(y) > 0$ and is flat in between.
4. The PMF can be recovered from the CDF: $p(y) = F(y) - F(y^-)$, where $F(y^-)$ is the value of $F$ just to the left of $y$.

:::{admonition} Example 4.7: From PMF to CDF
:class: important

Return to the animal shelter from Example 4.4. The PMF is:

| $y$ | 0 | 1 | 2 | 3 | 4 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| $p(y)$ | 0.15 | 0.30 | 0.25 | 0.20 | 0.10 |

Build the CDF $F(y)$.

**Solution.** We accumulate probabilities from left to right:

$$F(y) = \begin{cases}
0 & \text{if } y < 0 \\
0.15 & \text{if } 0 \leq y < 1 \\
0.45 & \text{if } 1 \leq y < 2 \\
0.70 & \text{if } 2 \leq y < 3 \\
0.90 & \text{if } 3 \leq y < 4 \\
1.00 & \text{if } y \geq 4
\end{cases}$$

**Using the CDF:**

- $P(Y \leq 2) = F(2) = 0.70$. There is a 70% chance that at most 2 dogs are adopted.
- $P(Y > 2) = 1 - F(2) = 1 - 0.70 = 0.30$. There is a 30% chance of more than 2 adoptions.
- $P(1 \leq Y \leq 3) = F(3) - F(0) = 0.90 - 0.15 = 0.75$. Be careful: we subtract $F(0)$, not $F(1)$, because $Y = 1$ should be *included*.
- $P(Y = 2) = F(2) - F(1) = 0.70 - 0.45 = 0.25$. The PMF value can be recovered from the CDF.
:::

:::{admonition} Example 4.8: CDF of a Coin-Toss Experiment
:class: important

A fair coin is tossed 3 times, and $Y$ denotes the number of heads. The PMF of $Y$ is:

| $y$ | 0 | 1 | 2 | 3 |
|:---:|:---:|:---:|:---:|:---:|
| $p(y)$ | $1/8$ | $3/8$ | $3/8$ | $1/8$ |

(a) Write the CDF of $Y$.
(b) Find $P(Y \geq 2)$ using the CDF.
(c) Find $P(Y = 1)$ using only the CDF.

**Solution.**

(a) $$F(y) = \begin{cases}
0 & \text{if } y < 0 \\
1/8 & \text{if } 0 \leq y < 1 \\
4/8 & \text{if } 1 \leq y < 2 \\
7/8 & \text{if } 2 \leq y < 3 \\
1 & \text{if } y \geq 3
\end{cases}$$

(b) $P(Y \geq 2) = 1 - P(Y \leq 1) = 1 - F(1) = 1 - 4/8 = 4/8 = 1/2$.

(c) $P(Y = 1) = F(1) - F(0) = 4/8 - 1/8 = 3/8$.
:::

### Representing Distributions: Table, Formula, Graph

A probability distribution can be represented in three equivalent ways:

1. **A table** — lists each value and its probability (best for small, finite distributions).
2. **A formula** — gives $p(y)$ as a mathematical expression (best for named distributions like the Binomial).
3. **A probability histogram** — a bar graph where the height (or area) of each bar equals the probability. This gives a visual picture of where the probability is concentrated.

For the CDF, the graph is always a staircase (step function), climbing from 0 to 1.

### Seeing It in R

```r
#| label: pmf-cdf-plot
#| fig-cap: "PMF and CDF for the animal shelter adoption data"

# Animal shelter PMF
y_vals <- 0:4
pmf <- c(0.15, 0.30, 0.25, 0.20, 0.10)

par(mfrow = c(1, 2))

# PMF (probability histogram)
barplot(pmf, names.arg = y_vals,
        main = "PMF: p(y)",
        xlab = "y (dogs adopted)", ylab = "p(y)",
        col = "steelblue", border = "white", ylim = c(0, 0.35))

# CDF (step function)
cdf_vals <- cumsum(pmf)
plot(stepfun(y_vals, c(0, cdf_vals)),
     main = "CDF: F(y)",
     xlab = "y", ylab = "F(y)",
     col = "steelblue", lwd = 2,
     verticals = FALSE, pch = 19,
     xlim = c(-1, 5), ylim = c(0, 1))
abline(h = c(0, 1), lty = 3, col = "gray")

par(mfrow = c(1, 1))
```

:::{admonition} Common Mistakes
:class: warning

1. **Confusing $p(y)$ with $F(y)$.** The PMF $p(y)$ gives the probability of *exactly* $y$. The CDF $F(y)$ gives the probability of $y$ *or less*. These are different quantities. If $p(3) = 0.20$, that means $P(Y = 3) = 0.20$, *not* $P(Y \leq 3) = 0.20$.

2. **Off-by-one errors with the CDF.** To find $P(a \leq Y \leq b)$, you compute $F(b) - F(a-1)$, not $F(b) - F(a)$. The subtlety: you want to *include* the value $a$, so you subtract the CDF evaluated just *below* $a$.

3. **Forgetting that the CDF is defined for all real numbers.** Even though $Y$ only takes integer values, $F(y)$ is defined for every real number $y$. For instance, $F(1.5) = F(1) = 0.45$ in Example 4.7, because no probability is added between 1 and 2.
:::

---

:::{admonition} What Did We Just Learn?
:class: tip

We now have two complete tools for describing the probability structure of a discrete random variable:

- The **PMF** $p(y)$ tells you the probability of each individual value — like a recipe listing each ingredient and its exact amount.
- The **CDF** $F(y)$ tells you the cumulative probability up to any point — like a running total of all ingredients added so far.

**In real life, this means:** When a hospital says "there is a 20% chance of 0 admissions, 35% chance of 1 admission, 25% chance of 2, and 20% chance of 3 or more," they are giving you a PMF. When a quality engineer says "95% of shipments have 3 or fewer defects," they are giving you a CDF value: $F(3) = 0.95$.

The PMF is the "individual" view: how likely is *this specific value*? The CDF is the "cumulative" view: how likely is *this value or anything smaller*? You can always move between them. The PMF gives you the building blocks; the CDF stacks them up.

**What's next:** We know *what* values a random variable takes and *how likely* each one is. The natural next question: what is the *average* value? That is the expected value — the subject of Section 4.3.
:::

---

### Exercises: Section 4.2

**4.2.1.** A campus coffee shop tracks the number of espresso drinks ordered in the first 10 minutes after opening. Based on past data, the distribution is:

| $y$ | 0 | 1 | 2 | 3 | 4 | 5 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| $p(y)$ | 0.05 | 0.15 | 0.30 | 0.25 | 0.15 | 0.10 |

(a) Verify that this is a valid PMF.
(b) Find $P(Y \geq 3)$.
(c) Construct the CDF $F(y)$ and write it as a piecewise function.
(d) Find $P(1 < Y \leq 4)$ using the CDF.

**4.2.2.** The PMF of a random variable $X$ is given by $p(x) = cx^2$ for $x = 1, 2, 3$.

(a) Find the value of $c$.
(b) Find $P(X \leq 2)$.
(c) Find the CDF $F(x)$.

**4.2.3.** The CDF of a discrete random variable $Y$ is given by:

$$F(y) = \begin{cases}
0 & \text{if } y < 1 \\
0.25 & \text{if } 1 \leq y < 3 \\
0.60 & \text{if } 3 \leq y < 5 \\
0.90 & \text{if } 5 \leq y < 7 \\
1.00 & \text{if } y \geq 7
\end{cases}$$

(a) What are the possible values of $Y$?
(b) Find the PMF $p(y)$.
(c) Find $P(2 < Y \leq 5)$.

**4.2.4.** A small bakery sells custom cakes. The number of cake orders per day, $Y$, has the following PMF: $p(y) = k(5-y)$ for $y = 0, 1, 2, 3, 4$.

(a) Find the value of $k$.
(b) Find $P(Y \geq 2)$.
(c) Construct and plot the CDF of $Y$.
(d) Find the most likely number of orders (the **mode**).

**4.2.5.** A random variable $X$ has the PMF $p(x) = (1/3)(2/3)^{x}$ for $x = 0, 1, 2, \ldots$.

(a) Verify that this is a valid PMF. (Hint: geometric series.)
(b) Find $P(X \leq 2)$.
(c) Find $P(X > 4)$.
(d) Write a general formula for the CDF $F(x)$ for non-negative integer values of $x$.

---


## 4.3 Expected Value of a Random Variable

:::{admonition} What Are We About to Learn?
:class: tip

You know the PMF of a random variable — you know how likely each value is. But if someone asks you to summarize the distribution in a *single number*, what would you choose?

Think about it this way. A rideshare driver tracks her daily trip count $Y$ over many months. Some days she completes 3 trips, some days 8, some days 12. If she wants to tell her accountant "on a typical day, I do about ___ trips," what number should she give? She wants the **long-run average** — the number that her daily counts would cluster around if she drove for years and years.

That long-run average is the **expected value**. It is not a prediction for any single day (she might do 2 trips or 15 trips tomorrow), but rather the center of gravity of the distribution. Expected value is how insurance companies price policies, how casinos set payouts, how engineers design systems for average load, and how pharmaceutical companies evaluate treatment efficacy.

**By the end of this section, you will be able to:**

- Compute the expected value of a discrete random variable
- Interpret expected value as the long-run average
- Explain why the expected value may not be a value the variable can actually take
:::

### The Definition

Before diving in, let us recall some foundational tools.

:::{admonition} 📐 Calculus Flashback: Summation Notation and Factorials
:class: warning

**Summation notation.** The symbol $\displaystyle\sum_{y=a}^{b} f(y)$ means "add up $f(y)$ for every integer $y$ from $a$ to $b$." For example:
$$\sum_{y=1}^{4} y^2 = 1^2 + 2^2 + 3^2 + 4^2 = 1 + 4 + 9 + 16 = 30.$$

**Key summation properties** (these work just like integrals):

- $\displaystyle\sum c \cdot f(y) = c \cdot \sum f(y)$ (constants come out)
- $\displaystyle\sum [f(y) + g(y)] = \sum f(y) + \sum g(y)$ (sum of sums splits)

**Factorials.** $n! = n \times (n-1) \times (n-2) \times \cdots \times 2 \times 1$. By convention, $0! = 1$.

A critical identity for proofs: $y! = y \cdot (y-1)!$. This lets us "cancel" a factor of $y$ against the $y!$ in a denominator — a trick we will use repeatedly when deriving means and variances of named distributions.

**The geometric series** (converges for $|r| < 1$):
$$\sum_{k=0}^{\infty} r^k = \frac{1}{1-r}, \qquad \text{and multiplying both sides by } a: \quad \sum_{k=0}^{\infty} ar^k = \frac{a}{1-r}.$$

We will encounter geometric series in the Geometric and Negative Binomial distributions.
:::

:::{admonition} Definition 4.5: Expected Value
:class: note

Let $Y$ be a discrete random variable with probability function $p(y)$. The **expected value** of $Y$, denoted $E(Y)$, is
$$E(Y) = \sum_{\text{all } y} y \cdot p(y).$$
If $p(y)$ accurately characterizes the population frequency distribution, then $E(Y) = \mu$, the population mean.
:::

The formula says: multiply each possible value by its probability, and add up all the products. Values with high probability contribute more to the sum; values with low probability contribute less. The result is a *weighted average*, where the weights are the probabilities.

### Why This Makes Sense: The Frequency Interpretation

To see why $E(Y) = \sum y \cdot p(y)$ is the "long-run average," suppose we repeat an experiment 1,000,000 times. Consider a random variable $Y$ with the following PMF:

| $y$ | 0 | 1 | 2 |
|:---:|:---:|:---:|:---:|
| $p(y)$ | $1/4$ | $1/2$ | $1/4$ |

In 1,000,000 repetitions, we would expect approximately 250,000 observations of $Y = 0$, approximately 500,000 of $Y = 1$, and approximately 250,000 of $Y = 2$. The average of all 1,000,000 observations would be:

$$\mu \approx \frac{(250{,}000)(0) + (500{,}000)(1) + (250{,}000)(2)}{1{,}000{,}000} = (0)\left(\frac{1}{4}\right) + (1)\left(\frac{1}{2}\right) + (2)\left(\frac{1}{4}\right) = \sum_{y=0}^{2} y \cdot p(y) = 1.$$

The expected value $E(Y) = 1$ is exactly the center of this symmetric distribution. It is the value around which the outcomes cluster in the long run.

:::{admonition} Example 4.9: Daily App Downloads
:class: important

A small app developer tracks daily downloads of their newest app. The distribution is:

| $y$ (downloads) | 0 | 1 | 2 | 3 | 4 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| $p(y)$ | $0.10$ | $0.25$ | $0.35$ | $0.20$ | $0.10$ |

Find the expected number of daily downloads.

**Solution.**

$$E(Y) = \sum_{y=0}^{4} y \cdot p(y) = (0)(0.10) + (1)(0.25) + (2)(0.35) + (3)(0.20) + (4)(0.10)$$
$$= 0 + 0.25 + 0.70 + 0.60 + 0.40 = 1.95.$$

The expected number of daily downloads is $\mu = 1.95$. Notice that 1.95 is not a value $Y$ can actually take (you cannot have 1.95 downloads). This is perfectly fine — the expected value is a long-run average, not a prediction for a single day. If the developer tracked downloads over 100 days, the total would be approximately $100 \times 1.95 = 195$ downloads.
:::

:::{admonition} Example 4.10: A Carnival Wheel
:class: important

At a carnival, a spinner is divided into 5 equal sections labeled \$0, \$1, \$2, \$5, and \$10. A player pays \$3 to spin the wheel and wins the amount shown. Is this a fair game?

**Solution.**

Let $Y$ denote the amount won on a single spin. Since the sections are equal, each value has probability $1/5$. The expected winnings are:

$$E(Y) = (0)\left(\frac{1}{5}\right) + (1)\left(\frac{1}{5}\right) + (2)\left(\frac{1}{5}\right) + (5)\left(\frac{1}{5}\right) + (10)\left(\frac{1}{5}\right) = \frac{0 + 1 + 2 + 5 + 10}{5} = \frac{18}{5} = 3.60.$$

The expected payout is \$3.60, but the player pays \$3.00 to play. The expected net gain per game is $\$3.60 - \$3.00 = \$0.60$. This game actually *favors* the player — the carnival would lose money in the long run. A carnival operator who understood expected value would charge at least \$3.60 per spin.
:::

### Seeing It in R

```r
#| label: ev-simulation
#| fig-cap: "Simulated long-run average converging to E(Y) = 1.95"

set.seed(123)
y_vals <- 0:4
probs <- c(0.10, 0.25, 0.35, 0.20, 0.10)
true_mean <- sum(y_vals * probs)  # 1.95

# Simulate 5000 days
n <- 5000
downloads <- sample(y_vals, size = n, replace = TRUE, prob = probs)

# Running average
running_avg <- cumsum(downloads) / (1:n)

plot(1:n, running_avg, type = "l", col = "steelblue", lwd = 1.5,
     main = "Running Average Converging to E(Y)",
     xlab = "Number of Days", ylab = "Running Average",
     ylim = c(0, 4))
abline(h = true_mean, col = "red", lwd = 2, lty = 2)
legend("topright", legend = c("Running Average", paste0("E(Y) = ", true_mean)),
       col = c("steelblue", "red"), lwd = c(1.5, 2), lty = c(1, 2))
```

This plot illustrates the frequency interpretation: the running average of observed values bounces around early on but settles closer and closer to $E(Y) = 1.95$ as the number of repetitions grows.

---

:::{admonition} What Did We Just Learn?
:class: tip

The expected value $E(Y) = \sum y \cdot p(y)$ is the **long-run average** of a random variable — the center of gravity of its distribution. It is the number that the average of many, many observations would converge to.

**In real life, this means:**

- An insurance company sets premiums based on the expected payout per policy. If the expected claim is \$800 per year, they charge more than \$800 to cover costs and make a profit.
- A hospital uses expected daily admissions to plan staffing. If $E(Y) = 7.3$ admissions per day, they do not staff for exactly 7 or exactly 8 — they use 7.3 as a planning benchmark.
- A gambler with expected winnings of $-\$1.10$ per lottery ticket knows that, over thousands of tickets, they will lose roughly \$1.10 per ticket on average — even though any single ticket might win millions.

Expected value does not tell you what will happen next. It tells you what happens *on average*. For decision-making under uncertainty, that is often exactly what you need.

**What's next:** So far, $E(Y)$ computes the average of $Y$ itself. But what if we care about a *function* of $Y$ — like $Y^2$, or $3Y + 7$, or the cost of $Y$ repairs? We need $E[g(Y)]$, and it turns out there is a beautifully simple formula for it.
:::

---

### Exercises: Section 4.3

**4.3.1.** A random variable $Y$ has the following PMF:

| $y$ | 1 | 2 | 3 | 4 |
|:---:|:---:|:---:|:---:|:---:|
| $p(y)$ | 0.40 | 0.30 | 0.20 | 0.10 |

(a) Find $E(Y)$.
(b) Find $E(1/Y)$.
(c) Is $E(1/Y) = 1/E(Y)$? What does this tell you about expected values of functions?

**4.3.2.** A coffee roaster packages beans into bags that are supposed to weigh 12 oz. Due to variation in the filling machine, the number of underweight bags in a random sample of 6 bags has the following distribution:

| $y$ (underweight bags) | 0 | 1 | 2 | 3 |
|:---:|:---:|:---:|:---:|:---:|
| $p(y)$ | 0.55 | 0.30 | 0.10 | 0.05 |

(a) Find the expected number of underweight bags.
(b) If each underweight bag must be repackaged at a cost of \$0.75, what is the expected repackaging cost per sample?

**4.3.3.** A game show contestant spins a wheel with four equally likely outcomes: win \$0, win \$100, win \$500, or win \$2000. The contestant must pay an entry fee to play. What is the maximum entry fee that makes this game worth playing (i.e., results in a non-negative expected net gain)?

**4.3.4.** Verify the expected value from Example 4.9 using R simulation. Generate 100,000 simulated values of $Y$ using the given PMF, compute the sample mean, and compare it to the theoretical expected value of 1.95.

---

## 4.4 Expected Value of Functions and Properties of Expectation

:::{admonition} What Are We About to Learn?
:class: tip

In the previous section, we computed $E(Y)$ — the average of the random variable itself. But in practice, we frequently care about some *function* of $Y$, not $Y$ itself.

Here is a concrete situation. A mobile repair shop fixes cracked phone screens. The number of repairs per day, $Y$, is a random variable. Each repair generates \$85 in revenue but costs \$30 in materials, so the daily profit is $g(Y) = 85Y - 30Y = 55Y$... except there is also a fixed daily rent of \$200 regardless of repairs. So the actual daily profit is $g(Y) = 55Y - 200$. To figure out whether this business is viable, we need the *expected profit* $E[g(Y)] = E(55Y - 200)$.

Must we find the entire probability distribution of $g(Y)$ from scratch, then compute its expected value? Fortunately, no. There is a powerful shortcut: you can compute $E[g(Y)]$ directly from the PMF of $Y$, without ever finding the distribution of $g(Y)$.

**By the end of this section, you will be able to:**

- Compute $E[g(Y)]$ for any function $g$ using the PMF of $Y$
- Apply the linearity properties of expectation
- Derive and use the variance shortcut formula $V(Y) = E(Y^2) - \mu^2$
:::

### The Key Theorem

:::{admonition} Theorem 4.2: The Law of the Unconscious Statistician (LOTUS)
:class: note

Let $Y$ be a discrete random variable with probability function $p(y)$ and $g(Y)$ be a real-valued function of $Y$. Then
$$E[g(Y)] = \sum_{\text{all } y} g(y) \cdot p(y).$$
:::

This theorem is so important that it has a name in the probability literature: the **Law of the Unconscious Statistician (LOTUS)**. The humorous name comes from the fact that students often apply this formula "unconsciously" — without realizing that it is a nontrivial shortcut. The remarkable thing LOTUS tells you is: to find the expected value of $g(Y)$, you do *not* need to derive the distribution of $g(Y)$ first. Instead, evaluate $g$ at each value of $Y$, multiply by the probability of that value, and sum. The PMF of $Y$ is all you need. This saves enormous work, and we will use LOTUS constantly throughout this course.

:::{admonition} Proof of Theorem 4.2
:class: note

**Strategy:** We show that computing $E[g(Y)]$ by first finding the distribution of $g(Y)$ and then applying Definition 4.5 gives the same result as summing $g(y) \cdot p(y)$ over all $y$.

Suppose $Y$ takes the finite set of values $y_1, y_2, \ldots, y_n$. The function $g$ may not be one-to-one, so $g(Y)$ may take fewer distinct values; call them $g_1, g_2, \ldots, g_m$ where $m \leq n$.

For each value $g_i$, the probability that $g(Y) = g_i$ is the sum of probabilities of all $y_j$ that map to $g_i$:
$$P[g(Y) = g_i] = \sum_{\substack{j : \\ g(y_j) = g_i}} p(y_j) = p^*(g_i).$$

By Definition 4.5:
$$E[g(Y)] = \sum_{i=1}^{m} g_i \cdot p^*(g_i) = \sum_{i=1}^{m} g_i \sum_{\substack{j : \\ g(y_j) = g_i}} p(y_j) = \sum_{i=1}^{m} \sum_{\substack{j : \\ g(y_j) = g_i}} g_i \cdot p(y_j).$$

Since $g_i = g(y_j)$ for every $y_j$ in the inner sum, this equals $\sum_{i=1}^{m} \sum_{j : g(y_j) = g_i} g(y_j) \cdot p(y_j)$.

Every $y_j$ appears in exactly one inner sum (because the groups partition $\{y_1, \ldots, y_n\}$), so the double sum collapses to:
$$E[g(Y)] = \sum_{j=1}^{n} g(y_j) \cdot p(y_j).$$

**Why this matters:** This result saves enormous work. Instead of deriving a new distribution every time we want $E[g(Y)]$, we just plug into the original PMF.

$\blacksquare$
:::

:::{admonition} Example 4.11: Expected Repair Cost
:class: important

A bike rental company inspects its fleet of 10 bikes each morning. The number of bikes needing repair, $Y$, has the following distribution:

| $y$ | 0 | 1 | 2 | 3 |
|:---:|:---:|:---:|:---:|:---:|
| $p(y)$ | $1/8$ | $1/4$ | $3/8$ | $1/4$ |

(a) Find $E(Y)$.
(b) Each repair costs \$40. Find the expected daily repair cost.
(c) Find $E(Y^2)$.

**Solution.**

(a) $E(Y) = (0)(1/8) + (1)(1/4) + (2)(3/8) + (3)(1/4) = 0 + 0.25 + 0.75 + 0.75 = 1.75$.

(b) The daily repair cost is $g(Y) = 40Y$. By Theorem 4.2:
$$E(40Y) = \sum_{y} 40y \cdot p(y) = 40 \sum_{y} y \cdot p(y) = 40 \cdot E(Y) = 40(1.75) = \$70.$$

(c) Here $g(Y) = Y^2$:
$$E(Y^2) = (0)^2(1/8) + (1)^2(1/4) + (2)^2(3/8) + (3)^2(1/4) = 0 + 0.25 + 1.50 + 2.25 = 4.00.$$

Note that $E(Y^2) = 4.00 \neq [E(Y)]^2 = (1.75)^2 = 3.0625$. This difference will be important for computing variance.
:::

### Properties of Expected Value

Three fundamental properties of expected value follow directly from the definition. These are tools we will use constantly throughout the rest of this course.

:::{admonition} Theorem 4.3: Expected Value of a Constant
:class: note

Let $c$ be a constant. Then $E(c) = c$.
:::

:::{admonition} Proof of Theorem 4.3
:class: note

**Strategy:** A constant $c$ can be viewed as a function $g(Y) = c$ that ignores $Y$ entirely. We apply Theorem 4.2 and use the fact that probabilities sum to 1.

Consider the function $g(Y) \equiv c$ (it equals $c$ no matter what $Y$ is). By Theorem 4.2:

$$E(c) = \sum_{\text{all } y} c \cdot p(y).$$

Since $c$ does not depend on $y$, we can factor it out of the summation:

$$= c \sum_{\text{all } y} p(y).$$

By Theorem 4.1 (the probabilities of a valid PMF sum to 1), $\sum_y p(y) = 1$. Therefore:

$$E(c) = c \cdot 1 = c. \quad \blacksquare$$
:::

This is intuitive: a constant has no variability, so its "average" is just itself. If you earn exactly \$50 every day, your average daily income is \$50 — no calculation needed.

:::{admonition} Theorem 4.4: Pulling Constants Out
:class: note

Let $c$ be a constant and $g(Y)$ a function of $Y$. Then $E[c \cdot g(Y)] = c \cdot E[g(Y)]$.
:::

:::{admonition} Proof of Theorem 4.4
:class: note

**Strategy:** The constant $c$ does not depend on $y$, so it can be factored out of the summation, just like in algebra.

By Theorem 4.2, the expected value of the function $c \cdot g(Y)$ is:

$$E[c \cdot g(Y)] = \sum_{\text{all } y} c \cdot g(y) \cdot p(y).$$

Since $c$ is a constant (it does not change as $y$ varies), we factor it out:

$$= c \sum_{\text{all } y} g(y) \cdot p(y).$$

But $\sum_y g(y) \cdot p(y) = E[g(Y)]$ by Theorem 4.2. Therefore:

$$E[c \cdot g(Y)] = c \cdot E[g(Y)]. \quad \blacksquare$$
:::

In plain language: if every outcome is multiplied by the same constant, the average gets multiplied by that constant too. If each repair costs \$40 and you average 3 repairs per day, the average daily repair cost is $40 \times 3 = \$120$.

:::{admonition} Theorem 4.5: Linearity of Expectation
:class: note

Let $g_1(Y), g_2(Y), \ldots, g_k(Y)$ be functions of $Y$. Then
$$E[g_1(Y) + g_2(Y) + \cdots + g_k(Y)] = E[g_1(Y)] + E[g_2(Y)] + \cdots + E[g_k(Y)].$$
:::

:::{admonition} Proof of Theorem 4.5
:class: note

**Strategy:** We prove the case $k = 2$. The general case follows by applying the $k = 2$ result repeatedly (mathematical induction). The key step is splitting a single summation into two summations — a basic property of finite sums from algebra.

By Theorem 4.2:

$$E[g_1(Y) + g_2(Y)] = \sum_{\text{all } y} [g_1(y) + g_2(y)] \cdot p(y).$$

Distribute $p(y)$ across the sum inside the brackets:

$$= \sum_{\text{all } y} \left[ g_1(y) \cdot p(y) + g_2(y) \cdot p(y) \right].$$

A sum of sums can be split into two separate sums (this is the distributive property of summation):

$$= \sum_{\text{all } y} g_1(y) \cdot p(y) + \sum_{\text{all } y} g_2(y) \cdot p(y).$$

By Theorem 4.2, each of these sums is an expected value:

$$= E[g_1(Y)] + E[g_2(Y)]. \quad \blacksquare$$
:::

**Why this matters:** Linearity is arguably the most useful property in all of probability. It says: the expected value of a sum is the sum of the expected values, *always*, with no conditions on the functions involved.

Combining Theorems 4.3–4.5, we get a result that is used constantly:

$$E(aY + b) = aE(Y) + b,$$

for any constants $a$ and $b$. The expected value is a **linear operator** — it passes through addition and scalar multiplication.

:::{admonition} Example 4.12: Mobile Repair Shop Profitability
:class: important

Returning to the mobile repair shop from the section opener. The number of screen repairs per day, $Y$, has $E(Y) = 4.2$ repairs. Each repair generates \$55 in net revenue (after materials), and the daily fixed cost (rent, utilities) is \$200. The daily profit is $g(Y) = 55Y - 200$.

**Expected daily profit:**
$$E(55Y - 200) = 55 \cdot E(Y) - 200 = 55(4.2) - 200 = 231 - 200 = \$31.$$

The expected daily profit is \$31. The shop is viable on average, but just barely. A single slow day (say $Y = 3$) would yield $55(3) - 200 = -\$35$ — a loss.
:::

### Variance and Standard Deviation

Knowing the expected value tells us the *center* of the distribution, but two distributions can have the same center and very different shapes. Consider two investments:

- Investment A returns \$5 with probability 1 (guaranteed). $E(Y_A) = 5$.
- Investment B returns \$0 with probability 0.5 and \$10 with probability 0.5. $E(Y_B) = 5$.

Both have the same expected value, but Investment B is riskier — its outcomes are spread out. We need a measure of this spread.

:::{admonition} Definition 4.6: Variance and Standard Deviation
:class: note

If $Y$ is a random variable with mean $E(Y) = \mu$, the **variance** of $Y$ is
$$V(Y) = E[(Y - \mu)^2] = \sum_{\text{all } y} (y - \mu)^2 \cdot p(y).$$

The **standard deviation** of $Y$ is $\sigma = \sqrt{V(Y)}$.

If $p(y)$ accurately characterizes the population, then $V(Y) = \sigma^2$ and $\sigma$ is the population standard deviation.
:::

The variance measures the average squared distance from the mean. Squaring ensures that deviations above and below the mean both contribute positively. The standard deviation $\sigma$ has the same units as $Y$, making it easier to interpret.

### The Variance Shortcut

Computing variance directly from the definition requires calculating $(y - \mu)^2$ for every value. The following theorem provides a much faster alternative.

:::{admonition} Theorem 4.6: Variance Shortcut Formula
:class: note

$$V(Y) = E(Y^2) - \mu^2 = E(Y^2) - [E(Y)]^2.$$

**Proof.**

**Strategy:** Expand $(Y - \mu)^2$ using algebra, then use linearity of expectation (Theorem 4.5) to break the expected value of a sum into a sum of expected values.

Start from the definition:
$$V(Y) = E[(Y - \mu)^2].$$

Expand the square using $(a - b)^2 = a^2 - 2ab + b^2$:
$$= E[Y^2 - 2\mu Y + \mu^2].$$

Apply Theorem 4.5 (linearity) to break this into three separate expected values:
$$= E(Y^2) - E(2\mu Y) + E(\mu^2).$$

Now simplify each term. Remember that $\mu = E(Y)$ is a *constant* (a fixed number, not a random variable):

- **Middle term:** By Theorem 4.4 (pull constants out), $E(2\mu Y) = 2\mu \cdot E(Y) = 2\mu \cdot \mu = 2\mu^2$.
- **Last term:** By Theorem 4.3 (expected value of a constant), $E(\mu^2) = \mu^2$.

Substituting:
$$V(Y) = E(Y^2) - 2\mu^2 + \mu^2 = E(Y^2) - \mu^2. \quad \blacksquare$$
:::

This shortcut is almost always faster than the definition. The recipe is:

1. Compute $E(Y)$. Call it $\mu$.
2. Compute $E(Y^2)$.
3. Variance $= E(Y^2) - \mu^2$.

:::{admonition} Example 4.13: Variance of Bike Repairs
:class: important

Return to the bike rental company in Example 4.11, where $Y$ = number of bikes needing repair.

| $y$ | 0 | 1 | 2 | 3 |
|:---:|:---:|:---:|:---:|:---:|
| $p(y)$ | $1/8$ | $1/4$ | $3/8$ | $1/4$ |

Find $V(Y)$ and $\sigma$.

**Solution (using the shortcut).**

We already found $\mu = E(Y) = 1.75$ and $E(Y^2) = 4.00$ in Example 4.11.

$$V(Y) = E(Y^2) - \mu^2 = 4.00 - (1.75)^2 = 4.00 - 3.0625 = 0.9375.$$
$$\sigma = \sqrt{0.9375} \approx 0.9682.$$

The standard deviation is about 0.97 bikes. Since $\mu = 1.75$, the interval $\mu \pm \sigma$ is approximately $(0.78, 2.72)$. The values $Y = 1$ and $Y = 2$ fall in this interval, and together they account for $1/4 + 3/8 = 5/8 = 62.5\%$ of the probability.
:::

:::{admonition} Example 4.14: Comparing Two Delivery Drones
:class: important

A logistics company is choosing between two delivery drone models. Both models experience random daily breakdowns:

**Drone Model A:** The number of breakdowns $Y_1$ per day has mean 0.15 and variance 0.15 (both equal to $0.15t$ for $t = 1$ operating day).

**Drone Model B:** The number of breakdowns $Y_2$ per day has mean 0.18 and variance 0.18.

The daily operating cost for Model A is $C_A = 12t + 25Y_1^2$, and for Model B is $C_B = 9t + 25Y_2^2$. Which model minimizes expected daily cost?

**Solution.**

For Model A with $t = 1$:
$$E(C_A) = 12 + 25E(Y_1^2).$$

We need $E(Y_1^2)$. From Theorem 4.6: $V(Y_1) = E(Y_1^2) - [E(Y_1)]^2$, so $E(Y_1^2) = V(Y_1) + [E(Y_1)]^2 = 0.15 + (0.15)^2 = 0.15 + 0.0225 = 0.1725$.

$$E(C_A) = 12 + 25(0.1725) = 12 + 4.3125 = \$16.31.$$

For Model B with $t = 1$:
$$E(Y_2^2) = V(Y_2) + [E(Y_2)]^2 = 0.18 + (0.18)^2 = 0.18 + 0.0324 = 0.2124.$$
$$E(C_B) = 9 + 25(0.2124) = 9 + 5.31 = \$14.31.$$

Model B is cheaper for a single day of operation. However, for longer operating periods, the higher breakdown rate of Model B might overtake its lower base cost — a calculation we leave as an exercise.
:::

### The Linear Transformation Rule

One more result that we will use repeatedly:

:::{admonition} Theorem 4.7: Variance of a Linear Function
:class: note

Let $Y$ be a random variable with mean $\mu$ and variance $\sigma^2$, and let $a$ and $b$ be constants. Then:

(a) $E(aY + b) = a\mu + b$
(b) $V(aY + b) = a^2 \sigma^2$

**Proof of (a).** Using Theorems 4.4 and 4.3:
$$E(aY + b) = E(aY) + E(b) = a \cdot E(Y) + b = a\mu + b. \quad \checkmark$$

**Proof of (b).** Let $W = aY + b$. From part (a), the mean of $W$ is $E(W) = a\mu + b$.

**Step 1:** Write the variance of $W$ using the definition:
$$V(W) = E[(W - E(W))^2].$$

**Step 2:** Substitute $W = aY + b$ and $E(W) = a\mu + b$:
$$= E[(aY + b - a\mu - b)^2].$$

**Step 3:** The $+b$ and $-b$ cancel:
$$= E[(aY - a\mu)^2].$$

**Step 4:** Factor out $a$ from the parentheses:
$$= E[a^2(Y - \mu)^2].$$

**Step 5:** Pull the constant $a^2$ out of the expected value (Theorem 4.4):
$$= a^2 \cdot E[(Y - \mu)^2].$$

**Step 6:** Recognize that $E[(Y - \mu)^2] = V(Y) = \sigma^2$:
$$= a^2 \sigma^2. \quad \blacksquare$$
:::

Notice that adding a constant $b$ shifts the distribution but does *not* change the variance — spread is not affected by shifting. Multiplying by a constant $a$ scales the spread by $|a|$, so the variance scales by $a^2$.

:::{admonition} Common Mistakes
:class: warning

1. **Assuming $E(Y^2) = [E(Y)]^2$.** This is false in general. The equality holds only when $V(Y) = 0$, i.e., when $Y$ is constant. For any truly random variable, $E(Y^2) > [E(Y)]^2$.

2. **Forgetting to square $a$ in $V(aY + b) = a^2\sigma^2$.** If you double $Y$, the variance quadruples, not doubles. Variance scales with the square of the multiplier.

3. **Computing variance from the definition when the shortcut is available.** The shortcut $V(Y) = E(Y^2) - \mu^2$ is almost always faster. Use the definition only when asked to demonstrate understanding.
:::

---

:::{admonition} What Did We Just Learn?
:class: tip

We developed the full toolkit for computing expected values and variances of discrete random variables:

- $E[g(Y)] = \sum g(y) \cdot p(y)$ — you can find the expected value of ANY function of $Y$ using $Y$'s PMF directly
- $E(aY + b) = aE(Y) + b$ — expectation is linear
- $V(Y) = E(Y^2) - [E(Y)]^2$ — the shortcut formula that avoids computing $(y - \mu)^2$ for every value
- $V(aY + b) = a^2 V(Y)$ — variance ignores shifts, squares multipliers

**In real life, this means:** An insurance company does not need to know the full distribution of claim costs to set premiums — they need $E(\text{cost})$. A portfolio manager comparing two funds with the same expected return uses variance (or standard deviation) to choose the less risky one. An engineer designing a server uses $E(Y)$ for average load and $\sigma$ for capacity planning (they need headroom above the mean to handle spikes).

The expected value tells you *where* the distribution is centered. The variance tells you *how spread out* it is. Together, they summarize the distribution's location and scale.

**What's next:** We are about to enter the most important part of this chapter — the *named distributions*. Starting with the Binomial in Section 4.6, we will see that entire families of experiments share the same probability structure. Once you recognize the experimental setup, you can write down the PMF, mean, and variance instantly.
:::

---

### Exercises: Section 4.4

**4.4.1.** Let $Y$ have the following PMF:

| $y$ | 1 | 2 | 3 | 4 | 5 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| $p(y)$ | 0.10 | 0.25 | 0.30 | 0.20 | 0.15 |

(a) Find $E(Y)$, $E(Y^2)$, and $V(Y)$.
(b) Find $E(3Y - 2)$ and $V(3Y - 2)$.
(c) Find $E(Y^2 - 2Y + 1)$. (Hint: note that $Y^2 - 2Y + 1 = (Y-1)^2$.)

**4.4.2.** A parking garage charges \$5 per hour. The number of hours a randomly selected car stays in the garage, $Y$, has the distribution:

| $y$ (hours) | 1 | 2 | 3 | 4 | 5 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| $p(y)$ | 0.20 | 0.30 | 0.25 | 0.15 | 0.10 |

(a) Find the expected parking revenue per car.
(b) Find the variance and standard deviation of parking revenue per car.
(c) The garage has 50 spots. If all spots are occupied by independent cars, what is the expected total revenue from all 50 cars?

**4.4.3.** A travel agency offers trip insurance that costs \$120. The coverage pays out \$0, \$500, \$2,000, or \$8,000 depending on the severity of a trip disruption, with probabilities 0.85, 0.08, 0.05, and 0.02, respectively. Find the expected payout and determine whether the insurance is a "good deal" for the buyer (i.e., whether the expected payout exceeds the premium).

**4.4.4.** Let $Y$ be a random variable with $E(Y) = 10$ and $V(Y) = 4$. Without knowing the distribution of $Y$, find:

(a) $E(2Y + 3)$
(b) $V(2Y + 3)$
(c) $E(Y^2)$
(d) $E[(Y - 10)^2]$

**4.4.5.** Prove that for any random variable $Y$ with mean $\mu$, $E[(Y - a)^2]$ is minimized when $a = \mu$. (Hint: expand $(Y - a)^2 = (Y - \mu + \mu - a)^2$ and use properties of expectation.)

---


## 4.5 The Binomial Distribution

:::{admonition} What Are We About to Learn?
:class: tip

Here is a pattern you encounter everywhere:

- A pharmaceutical company tests a new drug on 20 patients. Each patient either responds to the treatment or does not. They want to know: how many patients will respond?
- A quality inspector tests 15 circuit boards. Each board either passes or fails. She wants to know: how many will pass?
- A basketball player attempts 12 free throws in a game. Each shot is either made or missed. We want to know: how many will she make?

All three scenarios share the same structure: a **fixed number of trials**, each with exactly **two outcomes** (success or failure), the same **probability of success on each trial**, and **independence** between trials. This is the most common setup in applied probability, and it has a name: a **Binomial experiment**.

The Binomial distribution gives us a single, elegant formula for the probability of observing exactly $y$ successes in $n$ independent trials. Once you recognize a Binomial setup, you never have to count sample points by hand again — the formula does all the work.

**By the end of this section, you will be able to:**

- Identify whether an experiment is Binomial
- Write down the Binomial PMF and compute probabilities
- Derive the mean and variance of a Binomial random variable
- Use R to compute Binomial probabilities
- Explain when the Binomial model is approximately (but not exactly) correct
:::

### The Bernoulli Trial

Before studying the Binomial, we need its building block: the Bernoulli trial.

:::{admonition} Definition 4.7: Bernoulli Random Variable
:class: note

A **Bernoulli random variable** $X$ takes only two values:
$$X = \begin{cases} 1 & \text{with probability } p \quad (\text{success}) \\ 0 & \text{with probability } 1 - p \quad (\text{failure}) \end{cases}$$
The PMF can be written compactly as $p(x) = p^x(1-p)^{1-x}$ for $x = 0, 1$.
:::

The mean and variance of a Bernoulli random variable are computed step by step:

**Mean:**
$$E(X) = \sum_{x=0}^{1} x \cdot p(x) = 0 \cdot P(X = 0) + 1 \cdot P(X = 1) = 0 \cdot (1-p) + 1 \cdot p = p.$$

**Variance:** First find $E(X^2)$. Since $X$ only takes values 0 and 1, and $0^2 = 0$ and $1^2 = 1$:
$$E(X^2) = 0^2 \cdot (1-p) + 1^2 \cdot p = p.$$

Notice that $E(X^2) = E(X) = p$ for the Bernoulli — this is a special coincidence because $X^2 = X$ when $X$ is 0 or 1. Now apply the variance shortcut:
$$V(X) = E(X^2) - [E(X)]^2 = p - p^2 = p(1 - p) = pq.$$

A Bernoulli trial is a single coin flip (possibly unfair). The Binomial distribution counts the number of "heads" in $n$ such flips.

### The Binomial Experiment

:::{admonition} 📖 The Story of the Binomial
:class: important

You perform **$n$ independent trials**, each with the **same probability $p$ of success**. You count the **total number of successes**. That count is $\text{Bin}(n, p)$.

*Recognize this story and you can write down the PMF, mean, and variance instantly.*
:::

:::{admonition} Definition 4.8: Binomial Experiment
:class: note

A **Binomial experiment** has the following five properties:

1. The experiment consists of a **fixed number** $n$ of identical trials.
2. Each trial results in one of **two outcomes**: success ($S$) or failure ($F$).
3. The **probability of success** $p$ is the same on every trial. The probability of failure is $q = 1 - p$.
4. The trials are **independent**.
5. The random variable of interest is $Y$ = the number of successes in the $n$ trials.
:::

**Important:** The label "success" does not mean "good." If we are counting defective items, a defective is a "success" in the Binomial sense. It is merely the outcome we are counting.

:::{admonition} Example 4.15: Is This a Binomial Experiment?
:class: important

A COVID-19 rapid test has a sensitivity of 92% (it correctly identifies 92% of positive cases). A clinic administers the test to 8 patients who are known to have COVID. Let $Y$ denote the number of tests that correctly return positive. Is this Binomial?

**Solution.** Check the five conditions:

1. Fixed number of trials: $n = 8$. ✓
2. Two outcomes per trial: test returns positive (success) or negative (failure). ✓
3. Probability of success: $p = 0.92$ on each trial. ✓
4. Independence: if the tests are administered independently (different test kits, different moments), the outcome of one test does not affect another. ✓
5. $Y$ = number of correct positives among the 8 tests. ✓

All conditions met. $Y \sim \text{Binomial}(n = 8, p = 0.92)$.
:::

### Deriving the Binomial PMF

:::{admonition} 📐 Calculus Flashback: The Binomial Theorem and Factorial Cancellation
:class: warning

Two tools are essential for everything that follows in this section.

**The Binomial Theorem** (from Algebra II / Precalculus):
$$(a + b)^n = \sum_{y=0}^{n} C(n, y) \, a^y \, b^{n-y}$$

Setting $a = p$ and $b = q = 1-p$: $(p + q)^n = \sum_{y=0}^{n} C(n, y) \, p^y \, q^{n-y} = 1^n = 1$. This is how we prove that the Binomial PMF sums to 1.

**Factorial cancellation trick.** When computing $E(Y)$, we encounter $y \cdot C(n,y) = y \cdot \frac{n!}{y!(n-y)!}$. The key identity is:

$$y \cdot \frac{1}{y!} = \frac{y}{y \cdot (y-1)!} = \frac{1}{(y-1)!}$$

This cancellation is what makes the derivation work. Similarly, for the variance proof: $y(y-1) \cdot \frac{1}{y!} = \frac{1}{(y-2)!}$.

After canceling, we also factor $n! = n \cdot (n-1)!$ and then **reindex** the sum by substituting $j = y - 1$, which transforms the remaining sum into a recognizable binomial expansion. This "cancel-and-reindex" technique appears in nearly every named distribution proof.
:::

To find $P(Y = y)$, we count the sample points that result in exactly $y$ successes.

Each outcome of the experiment is an $n$-tuple of $S$'s and $F$'s. A specific $n$-tuple with $y$ successes and $n - y$ failures — for example, $\underbrace{SS \cdots S}_{y} \underbrace{FF \cdots F}_{n-y}$ — has probability:

$$\underbrace{p \cdot p \cdots p}_{y} \cdot \underbrace{q \cdot q \cdots q}_{n-y} = p^y q^{n-y}$$

by independence. Every $n$-tuple with exactly $y$ successes has this same probability, regardless of *where* the successes appear.

How many such $n$-tuples are there? We must choose which $y$ of the $n$ positions are successes. By the combinations formula from Chapter 2, there are $C(n, y) = \frac{n!}{y!(n-y)!}$ ways.

Multiplying the number of $n$-tuples by the probability of each:

:::{admonition} Definition 4.9: Binomial Distribution
:class: note

A random variable $Y$ is said to have a **Binomial distribution** based on $n$ trials with success probability $p$ if and only if

$$p(y) = C(n, y) \cdot p^y q^{n-y} = \frac{n!}{y!(n-y)!} p^y (1-p)^{n-y}, \qquad y = 0, 1, 2, \ldots, n.$$

We write $Y \sim \text{Bin}(n, p)$.
:::

:::{admonition} Example 4.16: Smartphone Screen Defects
:class: important

A batch of 800 smartphone screens is produced, and historically 4% have dead pixels (defective). A quality inspector randomly selects 5 screens for testing. Find:

(a) The probability that none of the 5 are defective.
(b) The probability that at least one is defective.
(c) The probability that exactly 2 are defective.

**Solution.** Since the batch is large (800) relative to the sample (5), removal of a few screens barely changes the composition of the rest. The Binomial model is reasonable with $n = 5$ and $p = 0.04$.

(a) $$P(Y = 0) = C(5,0)(0.04)^0(0.96)^5 = (1)(1)(0.8154) = 0.8154.$$

There is about an 81.5% chance that no defective screen is found.

(b) $$P(Y \geq 1) = 1 - P(Y = 0) = 1 - 0.8154 = 0.1846.$$

About an 18.5% chance of finding at least one defective.

(c) $$P(Y = 2) = C(5,2)(0.04)^2(0.96)^3 = 10 \times 0.0016 \times 0.8847 = 0.0142.$$

Only about a 1.4% chance of finding exactly 2 defectives in 5 screens.
:::

:::{admonition} Example 4.17: Drug Trial Significance
:class: important

A disease has a 30% natural recovery rate (without any treatment). A new drug is tested on 10 patients, and 8 recover. If the drug is actually *worthless* (recovery rate is still 30%), how likely is it that 8 or more of 10 patients recover by chance?

**Solution.** If the drug is worthless, $Y \sim \text{Bin}(10, 0.30)$. We need:

$$P(Y \geq 8) = P(Y = 8) + P(Y = 9) + P(Y = 10).$$

$$P(Y = 8) = C(10,8)(0.30)^8(0.70)^2 = 45 \times 0.00006561 \times 0.49 = 0.001447$$
$$P(Y = 9) = C(10,9)(0.30)^9(0.70)^1 = 10 \times 0.0000197 \times 0.70 = 0.000138$$
$$P(Y = 10) = C(10,10)(0.30)^{10}(0.70)^0 = 1 \times 0.0000059 \times 1 = 0.0000059$$

$$P(Y \geq 8) = 0.001447 + 0.000138 + 0.0000059 \approx 0.00159.$$

This probability is extremely small (about 0.16%). If the drug were truly worthless, seeing 8 or more recoveries out of 10 would be a very rare event. This is strong evidence that the drug does something — this is the logic behind hypothesis testing, which you will study in mathematical statistics.
:::

### Mean and Variance of the Binomial

:::{admonition} Theorem 4.8: Mean and Variance of a Binomial Random Variable
:class: note

Let $Y \sim \text{Bin}(n, p)$. Then:
$$\mu = E(Y) = np \qquad \text{and} \qquad \sigma^2 = V(Y) = npq = np(1-p).$$
:::

:::{admonition} Proof of Theorem 4.8
:class: note

**Strategy:** We use the "cancel-and-reindex" technique. The key idea is to cancel $y$ with the $y!$ in the denominator of $C(n,y)$, then recognize that the remaining sum is itself a binomial expansion equal to 1.

**Mean.** By definition,
$$E(Y) = \sum_{y=0}^{n} y \cdot C(n,y) \cdot p^y q^{n-y}.$$

The $y = 0$ term contributes 0, so the sum starts at $y = 1$:
$$= \sum_{y=1}^{n} y \cdot \frac{n!}{y!(n-y)!} p^y q^{n-y}.$$

Cancel $y$ with $y! = y \cdot (y-1)!$:
$$= \sum_{y=1}^{n} \frac{n!}{(y-1)!(n-y)!} p^y q^{n-y}.$$

Factor out $np$: write $n! = n \cdot (n-1)!$ and $p^y = p \cdot p^{y-1}$:
$$= np \sum_{y=1}^{n} \frac{(n-1)!}{(y-1)!(n-y)!} p^{y-1} q^{n-y}.$$

Substitute $j = y - 1$ (so $j$ runs from 0 to $n-1$, and $n - y = (n-1) - j$):
$$= np \sum_{j=0}^{n-1} \frac{(n-1)!}{j!(n-1-j)!} p^{j} q^{(n-1)-j} = np \sum_{j=0}^{n-1} C(n-1, j) p^j q^{(n-1)-j}.$$

The remaining sum is the binomial expansion of $(p + q)^{n-1} = 1^{n-1} = 1$. Therefore $E(Y) = np$.

**Variance.** We use the shortcut $V(Y) = E(Y^2) - [E(Y)]^2$. Finding $E(Y^2)$ directly is hard, so we use a trick: compute $E[Y(Y-1)]$ first (because $y(y-1)$ cancels nicely with $y!$), then recover $E(Y^2) = E[Y(Y-1)] + E(Y)$.

**Step 1:** Compute $E[Y(Y-1)]$.

$$E[Y(Y-1)] = \sum_{y=0}^{n} y(y-1) \cdot \frac{n!}{y!(n-y)!} p^y q^{n-y}.$$

The $y = 0$ and $y = 1$ terms vanish (since $y(y-1) = 0$ for both). So the sum starts at $y = 2$:

$$= \sum_{y=2}^{n} y(y-1) \cdot \frac{n!}{y!(n-y)!} p^y q^{n-y}.$$

**Step 2:** Cancel $y(y-1)$ with $y!$. Since $y! = y(y-1)(y-2)!$, we get $\frac{y(y-1)}{y!} = \frac{1}{(y-2)!}$:

$$= \sum_{y=2}^{n} \frac{n!}{(y-2)!(n-y)!} p^y q^{n-y}.$$

**Step 3:** Factor out $n(n-1)p^2$. Write $n! = n(n-1)(n-2)!$ and $p^y = p^2 \cdot p^{y-2}$:

$$= n(n-1)p^2 \sum_{y=2}^{n} \frac{(n-2)!}{(y-2)!(n-y)!} p^{y-2} q^{n-y}.$$

**Step 4:** Reindex. Let $j = y - 2$, so $j$ runs from 0 to $n - 2$, and $n - y = (n-2) - j$:

$$= n(n-1)p^2 \sum_{j=0}^{n-2} \frac{(n-2)!}{j!(n-2-j)!} p^{j} q^{(n-2)-j} = n(n-1)p^2 \sum_{j=0}^{n-2} C(n-2, j) p^j q^{(n-2)-j}.$$

**Step 5:** Recognize the binomial expansion. The sum equals $(p + q)^{n-2} = 1^{n-2} = 1$.

$$E[Y(Y-1)] = n(n-1)p^2.$$

**Step 6:** Recover the variance.

$$E(Y^2) = E[Y(Y-1)] + E(Y) = n(n-1)p^2 + np.$$

$$V(Y) = E(Y^2) - [E(Y)]^2 = n(n-1)p^2 + np - (np)^2$$

Expand $n(n-1)p^2 = n^2p^2 - np^2$:

$$= n^2p^2 - np^2 + np - n^2p^2 = np - np^2 = np(1-p) = npq. \quad \blacksquare$$
:::

The results are elegant: the mean is $np$ (on average, the fraction $p$ of $n$ trials are successes), and the variance is $npq$. Notice that the variance is maximized when $p = 0.5$ (maximum uncertainty per trial).

:::{admonition} Alternative Proof of $E(Y) = np$ Using Indicator Variables *(Optional but powerful)*
:class: tip

There is a much shorter proof that avoids all the factorial algebra. The idea: decompose $Y$ into a sum of simpler random variables.

Define **indicator random variables** $I_1, I_2, \ldots, I_n$, where

$$I_j = \begin{cases} 1 & \text{if trial } j \text{ is a success} \\ 0 & \text{if trial } j \text{ is a failure} \end{cases}$$

Each $I_j$ is Bernoulli with $E(I_j) = p$. The total number of successes is:
$$Y = I_1 + I_2 + \cdots + I_n.$$

By linearity of expectation (Theorem 4.5) — which works even though the $I_j$ might be dependent (they happen to be independent here, but we don't need that):
$$E(Y) = E(I_1) + E(I_2) + \cdots + E(I_n) = p + p + \cdots + p = np. \quad \blacksquare$$

**Why this matters:** This three-line proof replaces an entire page of factorial manipulation. The indicator decomposition technique is one of the most powerful tools in probability — it will appear again with the Hypergeometric mean, the matching problem, and the coupon collector problem. Any time you are counting "how many things have a property," try writing the count as a sum of indicators.
:::

:::{admonition} Example 4.18: Polling and Margin of Error
:class: important

A political poll surveys 400 likely voters. Suppose the true proportion who favor a certain candidate is $p = 0.52$.

(a) Find the expected number of voters in the sample who favor the candidate.
(b) Find the standard deviation.
(c) Within what range would you expect the observed count to fall with high probability?

**Solution.** $Y \sim \text{Bin}(400, 0.52)$.

(a) $E(Y) = np = 400(0.52) = 208$.

(b) $\sigma = \sqrt{npq} = \sqrt{400(0.52)(0.48)} = \sqrt{99.84} \approx 9.99$.

(c) The interval $\mu \pm 2\sigma = 208 \pm 20 = (188, 228)$. We expect, with high probability, between 188 and 228 voters in the sample to favor the candidate (i.e., between 47% and 57% of the sample). This is why election polls have margins of error — even with the true value at 52%, a sample of 400 might show anywhere from 47% to 57%.
:::

### Seeing It in R

```r
#| label: binomial-sim
#| fig-cap: "Binomial PMF for Y ~ Bin(15, 0.4)"

# Theoretical PMF
n <- 15; p <- 0.4
y_vals <- 0:n
pmf_theory <- dbinom(y_vals, n, p)

# Simulation
set.seed(99)
n_sim <- 50000
Y_sim <- rbinom(n_sim, n, p)

par(mfrow = c(1, 2))

# Theoretical PMF
barplot(pmf_theory, names.arg = y_vals,
        main = paste0("Theoretical: Bin(", n, ", ", p, ")"),
        xlab = "y", ylab = "p(y)",
        col = "steelblue", border = "white")

# Simulated histogram (relative frequency)
barplot(table(Y_sim) / n_sim,
        main = paste0("Simulated (", format(n_sim, big.mark = ","), " repetitions)"),
        xlab = "y", ylab = "Relative Frequency",
        col = "coral", border = "white")

par(mfrow = c(1, 1))

# Verify mean and variance
cat("Theoretical: E(Y) =", n * p, " V(Y) =", n * p * (1 - p), "\n")
cat("Simulated:   E(Y) =", round(mean(Y_sim), 3),
    " V(Y) =", round(var(Y_sim), 3), "\n")
```

**Key R functions for the Binomial:**

| Function | What it computes |
|:---|:---|
| `dbinom(y, n, p)` | $P(Y = y)$ — the PMF |
| `pbinom(y, n, p)` | $P(Y \leq y)$ — the CDF |
| `rbinom(nsim, n, p)` | Simulate `nsim` values from $\text{Bin}(n, p)$ |

:::{admonition} Common Mistakes
:class: warning

1. **Forgetting to check the five conditions.** Not every "count of successes" is Binomial. If the trials are not independent (e.g., sampling without replacement from a small population), or if $p$ changes from trial to trial, the Binomial does not apply.

2. **Confusing "success" with "good."** In a defectives problem, a defective item is a "success" because it is the outcome we are counting. Define $Y$ clearly before computing.

3. **Using Binomial when the population is small.** If you draw 10 items from a lot of 30, removal of each item noticeably changes the probability of the next draw. Use the Hypergeometric instead (Section 4.9). The rule of thumb: Binomial is safe when the sample is less than 5% of the population.
:::

---

:::{admonition} What Did We Just Learn?
:class: tip

The **Binomial distribution** models the count of successes in a fixed number of independent trials, each with the same probability of success. Its PMF is $p(y) = C(n,y) p^y q^{n-y}$, its mean is $np$, and its variance is $npq$.

**In real life, this means:**

- A medical researcher who tests a drug on $n = 50$ patients with a per-patient response rate of $p = 0.70$ can immediately compute $E(Y) = 35$ expected responders and $\sigma = \sqrt{50(0.70)(0.30)} \approx 3.24$.
- A manufacturer who produces $n = 1000$ items with a defect rate of $p = 0.02$ expects $np = 20$ defectives, with a standard deviation of about $\sqrt{1000(0.02)(0.98)} \approx 4.43$.
- A pollster surveying $n = 500$ people can quantify the expected range of outcomes for any hypothesized true proportion.

The Binomial is the workhorse of discrete probability. If you can identify the five conditions, you have instant access to probabilities, means, and variances without counting a single sample point.

**What's next:** The Binomial counts the total number of successes in $n$ trials. But what if we ask a different question: how many trials until the *first* success? That is the Geometric distribution — the subject of Section 4.6.
:::

---

### Exercises: Section 4.5

**4.5.1.** A ride-sharing app shows that 75% of ride requests during rush hour are accepted by drivers within 2 minutes. If 20 ride requests come in during a rush hour window:

(a) What is the probability that exactly 16 are accepted within 2 minutes?
(b) What is the probability that at least 18 are accepted within 2 minutes?
(c) Find the expected number and standard deviation of requests accepted within 2 minutes.

**4.5.2.** In a manufacturing process, each item independently has a 3% probability of being defective. A batch of 25 items is produced.

(a) Find the probability that the batch contains no defective items.
(b) Find the probability that the batch contains more than 2 defective items.
(c) The manufacturer rejects a batch if it contains 3 or more defectives. What is the probability that a batch is rejected?

**4.5.3.** A multiple-choice exam has 30 questions, each with 4 options (one correct). A student who guesses on every question can be modeled as a Binomial experiment with $p = 0.25$.

(a) Find the expected number of correct answers.
(b) Find the standard deviation.
(c) Find $P(Y \geq 10)$ using R (command: `1 - pbinom(9, 30, 0.25)`). Would you consider 10 or more correct answers "surprisingly good" for a pure guesser?

**4.5.4.** A certain genetic marker is present in 15% of a large population. In a sample of 12 randomly selected individuals:

(a) Find $P(Y = 0)$, $P(Y = 1)$, and $P(Y = 2)$.
(b) Find $P(Y \geq 4)$.
(c) Compute $\mu$ and $\sigma$.

**4.5.5.** A basketball player has a free-throw percentage of 80%. She shoots 6 free throws in a game.

(a) Find the probability that she makes all 6.
(b) Find the probability that she misses at most 1.
(c) The player claims she is "in the zone" if she makes at least 5 of 6. What is the probability of this happening even without any hot streak (i.e., purely by chance with $p = 0.80$)?

**4.5.6.** (Proof exercise) Show that the Binomial PMF sums to 1 by using the Binomial Theorem: $(p + q)^n = \sum_{y=0}^{n} C(n,y) p^y q^{n-y}$, with $q = 1 - p$.

---


## 4.6 The Geometric Distribution

:::{admonition} What Are We About to Learn?
:class: tip

The Binomial asks: "In $n$ trials, how many successes?" Now we flip the question: **"How many trials until the first success?"**

Imagine you are applying for jobs. Each application independently has a 20% chance of resulting in an interview. You submit applications one after another. The question burning in your mind is not "how many interviews will I get out of 10 applications?" (that is Binomial). It is "how many applications will I need to submit before I finally land an interview?" That is the Geometric distribution.

The Geometric distribution models *waiting* — the number of trials you must endure before the event you are waiting for finally occurs. It applies to job searches, sales calls, equipment testing, debugging code, and any situation where you keep trying until you succeed.

**By the end of this section, you will be able to:**

- Identify scenarios that follow a Geometric distribution
- Compute probabilities, mean, and variance for Geometric random variables
- Explain and apply the memoryless property
:::

### Derivation

Consider an experiment where independent Bernoulli trials (each with success probability $p$) are performed sequentially until the *first* success occurs. Let $Y$ = the trial number on which the first success happens.

For $Y = y$, we need $y - 1$ failures followed by 1 success:
$$P(Y = y) = \underbrace{q \cdot q \cdots q}_{y-1} \cdot p = q^{y-1} p.$$

:::{admonition} 📖 The Story of the Geometric
:class: important

You perform **independent Bernoulli trials** (each with success probability $p$) and **count the trial number of the first success**. That trial number is $\text{Geom}(p)$.

*Key question it answers: "How long do I have to wait?"*
:::

:::{admonition} Definition 4.10: Geometric Distribution
:class: note

A random variable $Y$ has a **Geometric distribution** with parameter $p$ if
$$p(y) = q^{y-1} p, \qquad y = 1, 2, 3, \ldots, \quad 0 < p \leq 1,$$
where $q = 1 - p$. We write $Y \sim \text{Geom}(p)$.
:::

**Note on parameterization.** Some textbooks (and R) define the Geometric as the number of *failures before* the first success, so $Y$ starts at 0. We follow the Wackerly convention where $Y$ = the trial number of the first success, so $Y$ starts at 1. When using R's `dgeom` and `pgeom`, adjust accordingly: R's `dgeom(k, p)` gives $P(X = k)$ where $X$ = number of failures, so $P(Y = y) = $ `dgeom(y-1, p)`.

The probabilities sum to 1 because this is a geometric series:
$$\sum_{y=1}^{\infty} q^{y-1} p = p \sum_{y=1}^{\infty} q^{y-1} = p \cdot \frac{1}{1-q} = p \cdot \frac{1}{p} = 1.$$

### Mean and Variance

Before deriving the mean and variance, let us recall a critical calculus tool that students often forget.

:::{admonition} 📐 Calculus Flashback: Geometric Series and Their Derivatives
:class: warning

These formulas from Calculus II are essential for the proofs that follow. Make sure you are comfortable with them.

**The geometric series** (converges for $|r| < 1$):
$$\sum_{k=0}^{\infty} r^k = \frac{1}{1 - r}$$

**Differentiate both sides with respect to $r$** (term-by-term differentiation is valid for power series inside the radius of convergence):
$$\sum_{k=1}^{\infty} k r^{k-1} = \frac{d}{dr}\left[\frac{1}{1-r}\right] = \frac{1}{(1-r)^2}$$

To compute $\frac{d}{dr}\left[\frac{1}{1-r}\right]$: rewrite as $(1-r)^{-1}$, then apply the **chain rule**: $\frac{d}{dr}(1-r)^{-1} = -1 \cdot (1-r)^{-2} \cdot (-1) = \frac{1}{(1-r)^2}$.

**Differentiate once more** to get the second derivative:
$$\sum_{k=2}^{\infty} k(k-1) r^{k-2} = \frac{d}{dr}\left[\frac{1}{(1-r)^2}\right] = \frac{2}{(1-r)^3}$$

To compute $\frac{d}{dr}\left[(1-r)^{-2}\right]$: apply the chain rule: $-2(1-r)^{-3} \cdot (-1) = \frac{2}{(1-r)^3}$.

We will use these formulas with $r = q = 1 - p$ in the proofs below.
:::

:::{admonition} Theorem 4.9: Mean and Variance of a Geometric Random Variable
:class: note

If $Y \sim \text{Geom}(p)$, then
$$\mu = E(Y) = \frac{1}{p} \qquad \text{and} \qquad \sigma^2 = V(Y) = \frac{1 - p}{p^2} = \frac{q}{p^2}.$$
:::

:::{admonition} Proof of Theorem 4.9
:class: note

**Proof of the mean.** By definition,

$$E(Y) = \sum_{y=1}^{\infty} y \cdot p(y) = \sum_{y=1}^{\infty} y \cdot q^{y-1} \cdot p.$$

Factor out the constant $p$ (which does not depend on $y$):

$$= p \sum_{y=1}^{\infty} y \cdot q^{y-1}.$$

Now recognize this sum: from the Calculus Flashback above, $\sum_{k=1}^{\infty} k r^{k-1} = \frac{1}{(1-r)^2}$. Setting $r = q$:

$$\sum_{y=1}^{\infty} y \cdot q^{y-1} = \frac{1}{(1-q)^2} = \frac{1}{p^2}.$$

Therefore:

$$E(Y) = p \cdot \frac{1}{p^2} = \frac{1}{p}. \quad \checkmark$$

**Proof of the variance.** We use the shortcut $V(Y) = E(Y^2) - [E(Y)]^2$, and to find $E(Y^2)$ we use the trick of computing $E[Y(Y-1)]$ first (since the algebra is simpler), then recovering $E(Y^2) = E[Y(Y-1)] + E(Y)$.

$$E[Y(Y-1)] = \sum_{y=1}^{\infty} y(y-1) \cdot q^{y-1} \cdot p.$$

The $y = 1$ term is $1 \cdot 0 \cdot q^0 \cdot p = 0$, so the sum effectively starts at $y = 2$:

$$= p \sum_{y=2}^{\infty} y(y-1) \cdot q^{y-1}.$$

Factor out one $q$ by writing $q^{y-1} = q \cdot q^{y-2}$:

$$= pq \sum_{y=2}^{\infty} y(y-1) \cdot q^{y-2}.$$

From the Calculus Flashback, $\sum_{k=2}^{\infty} k(k-1) r^{k-2} = \frac{2}{(1-r)^3}$. Setting $r = q$:

$$= pq \cdot \frac{2}{(1-q)^3} = pq \cdot \frac{2}{p^3} = \frac{2q}{p^2}.$$

Now recover $E(Y^2)$:

$$E(Y^2) = E[Y(Y-1)] + E(Y) = \frac{2q}{p^2} + \frac{1}{p} = \frac{2q + p}{p^2} = \frac{2 - 2p + p}{p^2} = \frac{2 - p}{p^2}.$$

Finally, the variance:

$$V(Y) = E(Y^2) - [E(Y)]^2 = \frac{2 - p}{p^2} - \frac{1}{p^2} = \frac{2 - p - 1}{p^2} = \frac{1 - p}{p^2} = \frac{q}{p^2}. \quad \blacksquare$$
:::

The mean makes intuitive sense: if the probability of success on each trial is $p = 0.20$, then on average you need $1/0.20 = 5$ trials. A lower success probability means a longer expected wait.

:::{admonition} Example 4.19: Job Applications
:class: important

A recent graduate applies for entry-level data analyst positions. Each application independently has a 15% chance of resulting in an interview. Let $Y$ be the number of applications submitted until the first interview.

(a) Find the probability that the first interview comes on the 4th application.
(b) Find the probability that the graduate needs more than 8 applications.
(c) Find the expected number of applications and the standard deviation.

**Solution.** $Y \sim \text{Geom}(p = 0.15)$, so $q = 0.85$.

(a) $$P(Y = 4) = (0.85)^3(0.15) = (0.6141)(0.15) = 0.0921.$$

About a 9.2% chance the first interview comes on the 4th application.

(b) $$P(Y > 8) = \sum_{y=9}^{\infty} (0.85)^{y-1}(0.15) = (0.85)^8 \cdot \frac{0.15}{1 - 0.85} \cdot (1 - 0.85 + 0.85 + \ldots)$$

More directly: $P(Y > 8) = P(\text{no success in first 8 trials}) = q^8 = (0.85)^8 = 0.2725.$

There is about a 27.3% chance of needing more than 8 applications. This is a useful formula: $P(Y > k) = q^k$.

(c) $$E(Y) = \frac{1}{0.15} = 6.67 \text{ applications}. \qquad \sigma = \frac{\sqrt{0.85}}{0.15} = \frac{0.9220}{0.15} = 6.15 \text{ applications}.$$

The graduate should expect to submit about 6 or 7 applications, but with substantial variability — some graduates get lucky on application 1, while others may need 15 or more.
:::

### The Memoryless Property

The Geometric distribution has a remarkable and counterintuitive property: it has no memory.

$$P(Y > s + t \mid Y > s) = P(Y > t), \qquad \text{for all } s, t \geq 0.$$

In words: given that you have already failed $s$ times, the probability of needing *more than* $t$ additional trials is the same as if you were starting fresh. The past failures provide no information about how much longer you will wait.

**Proof.** Using $P(Y > k) = q^k$:
$$P(Y > s + t \mid Y > s) = \frac{P(Y > s + t)}{P(Y > s)} = \frac{q^{s+t}}{q^s} = q^t = P(Y > t). \quad \blacksquare$$

:::{admonition} Example 4.20: Equipment Reliability
:class: important

A piece of laboratory equipment has a probability $p = 0.03$ of malfunctioning during any given hour of operation. Hours are independent.

(a) Find the probability that the equipment survives at least 50 hours.
(b) Given that the equipment has already survived 50 hours, find the probability it survives at least 20 more hours.

**Solution.** $Y = $ hour of first malfunction $\sim \text{Geom}(0.03)$.

(a) $P(Y > 50) = (0.97)^{50} = 0.2181$. About a 21.8% chance of surviving 50 hours.

(b) By the memoryless property: $P(Y > 70 \mid Y > 50) = P(Y > 20) = (0.97)^{20} = 0.5438$.

The fact that the equipment has already lasted 50 hours tells us nothing about the next 20. It is as if the clock resets. This is realistic for failures caused by random shocks (a power surge, a random component failure) but unrealistic for wear-based failures (tires, brakes), where older equipment is more likely to fail.
:::

---

:::{admonition} What Did We Just Learn?
:class: tip

The **Geometric distribution** models the number of independent Bernoulli trials until the *first* success. Its PMF is $p(y) = q^{y-1}p$, its mean is $1/p$, and it has the memoryless property — past failures do not affect future waiting time.

**In real life, this means:** When a salesperson cold-calls potential clients with a 5% conversion rate, they should expect $1/0.05 = 20$ calls before the first sale. The memoryless property says that after 19 unsuccessful calls, the 20th call is no more likely to succeed than the 1st one was. There is no "law of averages" that makes the next call more likely — each call is an independent fresh start.

**What's next:** The Geometric waits for the *first* success. What if we need to wait for the *third* success, or the *r*-th success? That generalization is the Negative Binomial.
:::

---

### Exercises: Section 4.6

**4.6.1.** A student tries to log into a university portal, but keeps mistyping the CAPTCHA. Each attempt independently has a 70% chance of success. Let $Y$ be the attempt on which the student first succeeds.

(a) Find $P(Y = 1)$, $P(Y = 2)$, and $P(Y = 3)$.
(b) Find $P(Y > 5)$.
(c) Find $E(Y)$ and $\sigma$.

**4.6.2.** A fisherman catches a fish on any given cast with probability 0.10. Casts are independent.

(a) What is the probability that the first fish is caught on the 7th cast?
(b) What is the expected number of casts until the first fish?
(c) If the fisherman has already made 12 unsuccessful casts, what is the probability he catches a fish within the next 3 casts? (Use the memoryless property.)

**4.6.3.** Suppose $Y \sim \text{Geom}(p)$.

(a) Show that $P(Y > k) = q^k$ for $k = 0, 1, 2, \ldots$.
(b) Use part (a) to derive the CDF $F(y) = P(Y \leq y) = 1 - q^y$ for positive integers $y$.
(c) Find the median of $Y$ — the smallest value $m$ such that $F(m) \geq 0.5$.

**4.6.4.** An online retailer finds that 12% of visitors to a product page make a purchase. If visitors arrive independently, what is the probability that the 1st purchase occurs within the first 5 visitors? What is the probability it takes more than 20 visitors?

---

## 4.7 The Negative Binomial Distribution

:::{admonition} What Are We About to Learn?
:class: tip

The Geometric distribution answered: "How many trials until the first success?" The **Negative Binomial** generalizes this: "How many trials until the $r$-th success?"

A recruiting firm needs to hire 3 software engineers. Each candidate interviewed independently has a 25% chance of being qualified. The firm interviews candidates one by one and stops when they have found their 3rd qualified candidate. How many interviews should they expect?

This is not Binomial (there is no fixed number of trials — the firm stops when the goal is met). It is not Geometric (they need the *third* success, not the first). It is Negative Binomial.

**By the end of this section, you will be able to:**

- Derive the Negative Binomial PMF from first principles
- Compute probabilities, mean, and variance
- Explain the relationship between Geometric and Negative Binomial
:::

### Derivation

We perform independent Bernoulli trials with success probability $p$ until we observe the $r$-th success. Let $Y$ = the trial number on which the $r$-th success occurs. For $Y = y$, we need:

- Exactly $r - 1$ successes in the first $y - 1$ trials (so the $r$-th success has not yet occurred), AND
- A success on trial $y$ (completing the $r$-th success).

The number of ways to arrange $r - 1$ successes in $y - 1$ trials is $C(y-1, r-1)$. The probability of any such arrangement followed by a success is $p^{r-1} q^{y-r} \cdot p = p^r q^{y-r}$.

:::{admonition} 📖 The Story of the Negative Binomial
:class: important

You perform **independent Bernoulli trials** and **count the trial number on which the $r$-th success occurs**. That trial number is $\text{NegBin}(r, p)$.

*The Geometric is the special case $r = 1$ — waiting for the first success.*
:::

:::{admonition} Definition 4.11: Negative Binomial Distribution
:class: note

A random variable $Y$ has a **Negative Binomial distribution** with parameters $r$ and $p$ if
$$p(y) = C(y-1, r-1) \cdot p^r q^{y-r}, \qquad y = r, r+1, r+2, \ldots$$
We write $Y \sim \text{NegBin}(r, p)$.
:::

**Why $C(y-1, r-1)$ and not $C(y, r)$?** Because the $r$-th success is *fixed* at position $y$ — it must be the last trial. We are only choosing where the first $r-1$ successes go among the first $y-1$ positions. This is the key insight that students often miss.

**Relationship to Geometric:** When $r = 1$, $C(y-1, 0) = 1$ and the Negative Binomial reduces to $p(y) = p \cdot q^{y-1}$, which is exactly the Geometric distribution. The Geometric is a special case of the Negative Binomial.

:::{admonition} Theorem 4.10: Mean and Variance of the Negative Binomial
:class: note

If $Y \sim \text{NegBin}(r, p)$, then
$$\mu = E(Y) = \frac{r}{p} \qquad \text{and} \qquad \sigma^2 = V(Y) = \frac{r(1-p)}{p^2} = \frac{rq}{p^2}.$$
:::

:::{admonition} Proof of Theorem 4.10 (via decomposition)
:class: note

**Strategy:** We decompose $Y$ into a sum of independent Geometric random variables. Let $Y_1$ = the trial number of the 1st success, $Y_2$ = the number of *additional* trials from the 1st success to the 2nd success, and so on up to $Y_r$. Then $Y = Y_1 + Y_2 + \cdots + Y_r$, and each $Y_i \sim \text{Geom}(p)$ independently.

(Why are the $Y_i$ independent Geometric? After the $(i-1)$-th success, we start fresh — each subsequent trial still has probability $p$ of success, independent of everything before. The number of additional trials until the next success is Geometric.)

**Mean:** By linearity of expectation (Theorem 4.5):
$$E(Y) = E(Y_1) + E(Y_2) + \cdots + E(Y_r) = \frac{1}{p} + \frac{1}{p} + \cdots + \frac{1}{p} = \frac{r}{p}.$$

**Variance:** Since the $Y_i$ are *independent*, the variance of their sum is the sum of their variances (a result proved in Chapter 6, but intuitive: independent sources of randomness contribute additively to total variability):
$$V(Y) = V(Y_1) + V(Y_2) + \cdots + V(Y_r) = \frac{q}{p^2} + \frac{q}{p^2} + \cdots + \frac{q}{p^2} = \frac{rq}{p^2}. \quad \blacksquare$$
:::

These results make intuitive sense: waiting for the $r$-th success takes $r$ times as long on average as waiting for the first, and the total variability scales linearly with $r$.

:::{admonition} Example 4.21: Recruiting Software Engineers
:class: important

A firm interviews candidates for software engineer positions. Each candidate independently has a 25% probability of being qualified. The firm needs to hire 3 qualified engineers.

(a) Find the probability that the 3rd qualified candidate is found on the 8th interview.
(b) Find the expected number of interviews and the standard deviation.

**Solution.** $Y \sim \text{NegBin}(r = 3, p = 0.25)$, $q = 0.75$.

(a) $$P(Y = 8) = C(7, 2)(0.25)^3(0.75)^5 = 21 \times 0.015625 \times 0.23730 = 0.0779.$$

About a 7.8% chance that the 3rd hire is found on the 8th interview.

(b) $$E(Y) = \frac{3}{0.25} = 12 \text{ interviews}. \qquad \sigma = \frac{\sqrt{3 \times 0.75}}{0.25} = \frac{\sqrt{2.25}}{0.25} = \frac{1.5}{0.25} = 6.$$

The firm should expect about 12 interviews, but with high variability ($\sigma = 6$). It would not be unusual to need 18 or more interviews, or to finish as early as 6.
:::

:::{admonition} Example 4.22: Oil Exploration
:class: important

A geological survey indicates that an exploratory well drilled in a particular region strikes oil with probability 0.15. Wells are drilled independently. Find the probability that the 2nd oil strike comes on the 10th well drilled.

**Solution.** $Y \sim \text{NegBin}(r = 2, p = 0.15)$, $q = 0.85$.

$$P(Y = 10) = C(9, 1)(0.15)^2(0.85)^8 = 9 \times 0.0225 \times 0.2725 = 0.0552.$$

About a 5.5% chance. The expected number of wells is $E(Y) = 2/0.15 \approx 13.3$.
:::

**R functions for the Negative Binomial:** R parameterizes using the number of failures, not the trial number. If $Y \sim \text{NegBin}(r, p)$ in our notation, then the number of failures is $Y - r$, and:

| Our notation | R command |
|:---|:---|
| $P(Y = y)$ | `dnbinom(y - r, r, p)` |
| $P(Y \leq y)$ | `pnbinom(y - r, r, p)` |

---

:::{admonition} What Did We Just Learn?
:class: tip

The **Negative Binomial** distribution models the number of trials needed to accumulate $r$ successes. It generalizes the Geometric (which is the $r = 1$ case) and fills the gap between "how many successes in $n$ trials" (Binomial) and "how many trials for $r$ successes" (Negative Binomial).

**In real life, this means:** A recruiter hiring $r = 5$ positions with a 20% qualification rate expects $5/0.20 = 25$ interviews. A reliability engineer testing equipment until $r = 3$ failures expects $3/p$ total tests. A fundraiser seeking $r = 10$ donations with a 5% response rate expects $10/0.05 = 200$ solicitations.

**What's next:** Every distribution so far has assumed *independence* between trials — one outcome does not affect the next. But what happens when we sample *without replacement* from a finite population? That is the Hypergeometric distribution.
:::

---

### Exercises: Section 4.7

**4.7.1.** A sales representative makes cold calls with a 10% chance of making a sale on each call. She needs to make 4 sales today.

(a) What is the probability that her 4th sale comes on the 20th call?
(b) How many calls should she expect to make?
(c) What is the standard deviation of the number of calls?

**4.7.2.** In a game, a player rolls a fair die repeatedly until they roll three 6's. Let $Y$ be the total number of rolls needed.

(a) Find $P(Y = 5)$.
(b) Find $E(Y)$.

**4.7.3.** Show that the Negative Binomial PMF reduces to the Geometric PMF when $r = 1$.

---


## 4.8 The Hypergeometric Distribution

:::{admonition} What Are We About to Learn?
:class: tip

Every distribution so far has assumed that trials are **independent** — the outcome of one trial does not affect the next. The Binomial, Geometric, and Negative Binomial all rely on this assumption. But independence is violated whenever we **sample without replacement** from a finite population.

Think of it this way. A deck of cards has 12 face cards out of 52 total. If you draw 5 cards, the probability that the second card is a face card *depends* on what the first card was. If the first card was a face card, only 11 face cards remain out of 51 — the probability has changed. This is fundamentally different from flipping a coin, where each flip is independent.

The **Hypergeometric distribution** handles exactly this situation: sampling without replacement from a finite population that contains two types of items.

**By the end of this section, you will be able to:**

- Identify sampling-without-replacement scenarios
- Compute Hypergeometric probabilities using the counting-based formula
- State the mean and variance, including the finite population correction factor
- Explain when the Binomial is a good approximation to the Hypergeometric
:::

:::{admonition} 📖 The Story of the Hypergeometric
:class: important

You have a population of **$N$ items** containing **$r$ successes** and **$N-r$ failures**. You draw **$n$ items without replacement**. The count of successes in your sample is $\text{HGeom}(N, r, n)$.

*The key difference from Binomial: trials are NOT independent because you sample WITHOUT replacement.*
:::

### The Setup

We have a population of $N$ items, of which $r$ are "successes" and $N - r$ are "failures." We draw a sample of $n$ items *without replacement*. Let $Y$ = the number of successes in the sample.

The probability of getting exactly $y$ successes is found by counting:

- Choose $y$ successes from the $r$ available: $C(r, y)$ ways.
- Choose $n - y$ failures from the $N - r$ available: $C(N-r, n-y)$ ways.
- Choose any $n$ items from $N$ total: $C(N, n)$ ways.

:::{admonition} Definition 4.12: Hypergeometric Distribution
:class: note

A random variable $Y$ has a **Hypergeometric distribution** if
$$p(y) = \frac{C(r, y) \cdot C(N-r,\; n-y)}{C(N, n)},$$
where $y$ is an integer satisfying $\max(0, n - N + r) \leq y \leq \min(r, n)$.

**Parameters:** $N$ = population size, $r$ = number of successes in the population, $n$ = sample size.
:::

:::{admonition} Example 4.23: Drawing Cards
:class: important

You draw 5 cards from a standard 52-card deck. What is the probability of getting exactly 2 hearts?

**Solution.** $N = 52$, $r = 13$ (hearts), $n = 5$, $y = 2$.

$$P(Y = 2) = \frac{C(13, 2) \cdot C(39, 3)}{C(52, 5)} = \frac{78 \times 9139}{2{,}598{,}960} = \frac{712{,}842}{2{,}598{,}960} = 0.2743.$$

About a 27.4% chance of drawing exactly 2 hearts.
:::

:::{admonition} Example 4.24: Scholarship Selection
:class: important

A university department has 20 graduate students: 8 are international students and 12 are domestic. A committee randomly selects 6 students to receive travel scholarships. What is the probability that exactly 3 of the selected students are international?

**Solution.** $N = 20$, $r = 8$ (international), $n = 6$, $y = 3$.

$$P(Y = 3) = \frac{C(8, 3) \cdot C(12, 3)}{C(20, 6)} = \frac{56 \times 220}{38{,}760} = \frac{12{,}320}{38{,}760} = 0.3179.$$

About a 31.8% chance. This is the most likely single outcome, reflecting the proportions in the population (8/20 = 40% international, and 3/6 = 50% is close to that).
:::

### Mean, Variance, and the Finite Population Correction

:::{admonition} Theorem 4.11: Mean and Variance of the Hypergeometric
:class: note

If $Y$ has a Hypergeometric distribution with parameters $N$, $r$, and $n$, then
$$\mu = E(Y) = \frac{nr}{N} \qquad \text{and} \qquad \sigma^2 = V(Y) = n \cdot \frac{r}{N} \cdot \frac{N-r}{N} \cdot \frac{N-n}{N-1}.$$
:::

The mean $nr/N$ is identical to the Binomial mean $np$ with $p = r/N$ — on average, the fraction of successes in the sample matches the fraction in the population.

The variance, however, has an extra factor: $\frac{N-n}{N-1}$, called the **finite population correction** (FPC). This factor is always less than or equal to 1, so the Hypergeometric variance is always *less than or equal to* the corresponding Binomial variance $npq$. Sampling without replacement reduces variability because drawing successes early makes failures more likely later (and vice versa).

When $N$ is much larger than $n$ (say, $n < 0.05N$), the FPC is close to 1, and the Hypergeometric is well approximated by a Binomial with $p = r/N$. Removing a few items from a huge population barely changes the composition.

### Seeing It in R

```r
#| label: hypergeometric-comparison
#| fig-cap: "Hypergeometric vs Binomial approximation"

# Scholarship example: N=20, r=8, n=6
N <- 20; r_succ <- 8; n <- 6
y_vals <- 0:n
p_hyper <- dhyper(y_vals, r_succ, N - r_succ, n)
p_binom <- dbinom(y_vals, n, r_succ / N)

# Side-by-side comparison
barplot(rbind(p_hyper, p_binom), beside = TRUE,
        names.arg = y_vals,
        col = c("steelblue", "coral"),
        main = "Hypergeometric vs Binomial (N=20, small population)",
        xlab = "y", ylab = "P(Y = y)",
        legend.text = c("Hypergeometric", "Binomial approx"),
        args.legend = list(x = "topright"))
```

**Key R functions:** `dhyper(y, r, N-r, n)` gives $P(Y = y)$; `phyper(y, r, N-r, n)` gives $P(Y \leq y)$.

---

:::{admonition} What Did We Just Learn?
:class: tip

The **Hypergeometric distribution** models the number of successes when sampling without replacement from a finite population of two types. Its PMF is based on counting (combinations), its mean is $nr/N$, and its variance includes the finite population correction factor $\frac{N-n}{N-1}$.

**In real life, this means:** When a quality inspector tests 10 items from a lot of 50, the outcomes are not independent — each item removed changes the composition. The Hypergeometric is the correct model. The Binomial would overestimate the variance. But when the lot is large (say, 10 from 10,000), the Binomial is a perfectly good approximation.

The Hypergeometric also appears in statistical tests. Fisher's exact test, widely used in medical research and genetics, is based on the Hypergeometric distribution.

**What's next:** Our final named distribution — the Poisson — models something completely different: the count of events occurring randomly in a fixed interval of time or space.
:::

---

### Exercises: Section 4.8

**4.8.1.** A jar contains 15 red marbles and 10 blue marbles. You draw 7 marbles without replacement.

(a) Find $P(Y = 3)$, where $Y$ = number of red marbles drawn.
(b) Find $E(Y)$ and $V(Y)$.
(c) If the jar instead contained 1500 red and 1000 blue marbles and you drew 7, compute the Binomial approximation to $P(Y = 3)$ and compare to the exact Hypergeometric probability.

**4.8.2.** A box contains 30 USB drives, 6 of which are defective. An inspector randomly selects 5 drives for testing.

(a) Find the probability that the sample contains exactly 1 defective.
(b) Find the probability that the sample contains no defectives.
(c) Find the probability that the sample contains at least 2 defectives.

**4.8.3.** A hiring committee reviews 25 applicants, of whom 10 have graduate degrees. They randomly select 8 for interviews. Find the expected number with graduate degrees and the standard deviation. Compare the Hypergeometric standard deviation to the Binomial approximation $\sqrt{npq}$.

**4.8.4.** (Proof exercise) Show that when $N \to \infty$ with $r/N = p$ held constant, the Hypergeometric PMF converges to the Binomial PMF $C(n,y) p^y (1-p)^{n-y}$. (Hint: use the fact that $C(r, y)/C(N, y) \to p^y$ as $N, r \to \infty$ with $r/N \to p$.)

---

## 4.9 The Poisson Distribution

:::{admonition} What Are We About to Learn?
:class: tip

All the distributions so far have been rooted in **trials** — a fixed number of attempts (Binomial), sequential attempts until a goal (Geometric, Negative Binomial), or draws from a finite population (Hypergeometric). The **Poisson distribution** does something entirely different: it counts **events occurring randomly in a fixed interval** of time, space, or volume.

How many customers walk into a coffee shop between 8 and 9 AM? How many typos appear per page of a manuscript? How many meteorites strike a given area of the moon per century? How many server requests arrive per second? These are not "trials" in any meaningful sense — there is no fixed number of opportunities. Events just *happen*, at some average rate, scattered randomly across an interval.

The Poisson distribution captures this phenomenon beautifully with a single parameter $\lambda$ — the average rate — and it turns out to arise as a natural limit of the Binomial when the number of trials is large and the probability of success on each is small.

**By the end of this section, you will be able to:**

- Identify situations where the Poisson distribution applies
- Compute Poisson probabilities, mean, and variance
- Use the Poisson as an approximation to the Binomial
- Scale the Poisson rate for different interval lengths
:::

### The Poisson Model

:::{admonition} 📖 The Story of the Poisson
:class: important

**Events occur independently at a constant average rate** $\lambda$ **per interval**. You count **how many events occur in one interval**. That count is $\text{Pois}(\lambda)$.

*No fixed number of "trials." Events just happen — at some average rate — scattered randomly across time or space.*
:::

The Poisson distribution applies when:

1. Events occur **independently** — one event does not make another more or less likely.
2. Events occur at a **constant average rate** $\lambda$ per interval.
3. In a sufficiently small sub-interval, at most one event can occur (no simultaneous events).

:::{admonition} Definition 4.13: Poisson Distribution
:class: note

A random variable $Y$ has a **Poisson distribution** with parameter $\lambda > 0$ if
$$p(y) = \frac{\lambda^y}{y!} e^{-\lambda}, \qquad y = 0, 1, 2, \ldots$$
We write $Y \sim \text{Pois}(\lambda)$.
:::

The probabilities sum to 1 because of the Taylor series for $e^{\lambda}$:
$$\sum_{y=0}^{\infty} \frac{\lambda^y}{y!} e^{-\lambda} = e^{-\lambda} \sum_{y=0}^{\infty} \frac{\lambda^y}{y!} = e^{-\lambda} \cdot e^{\lambda} = 1.$$

:::{admonition} Theorem 4.12: Mean and Variance of the Poisson
:class: note

If $Y \sim \text{Pois}(\lambda)$, then
$$\mu = E(Y) = \lambda \qquad \text{and} \qquad \sigma^2 = V(Y) = \lambda.$$

**Proof (Mean).**
$$E(Y) = \sum_{y=0}^{\infty} y \cdot \frac{\lambda^y}{y!} e^{-\lambda}.$$

The $y = 0$ term vanishes. For $y \geq 1$, cancel $y$ with $y! = y(y-1)!$:
$$= e^{-\lambda} \sum_{y=1}^{\infty} \frac{\lambda^y}{(y-1)!} = \lambda e^{-\lambda} \sum_{y=1}^{\infty} \frac{\lambda^{y-1}}{(y-1)!}.$$

Substituting $j = y - 1$:
$$= \lambda e^{-\lambda} \sum_{j=0}^{\infty} \frac{\lambda^j}{j!} = \lambda e^{-\lambda} \cdot e^{\lambda} = \lambda. \quad \blacksquare$$

**Proof of the variance.** We use $V(Y) = E[Y(Y-1)] + E(Y) - [E(Y)]^2$. First, find $E[Y(Y-1)]$:

$$E[Y(Y-1)] = \sum_{y=0}^{\infty} y(y-1) \cdot \frac{\lambda^y}{y!} e^{-\lambda}.$$

The $y = 0$ and $y = 1$ terms are both zero (since $y(y-1) = 0$ for $y = 0$ and $y = 1$). For $y \geq 2$, cancel $y(y-1)$ with $y! = y(y-1)(y-2)!$:

$$= e^{-\lambda} \sum_{y=2}^{\infty} \frac{\lambda^y}{(y-2)!}.$$

Factor out $\lambda^2$ by writing $\lambda^y = \lambda^2 \cdot \lambda^{y-2}$:

$$= \lambda^2 e^{-\lambda} \sum_{y=2}^{\infty} \frac{\lambda^{y-2}}{(y-2)!}.$$

Substitute $j = y - 2$ (so $j$ runs from 0 to $\infty$):

$$= \lambda^2 e^{-\lambda} \sum_{j=0}^{\infty} \frac{\lambda^j}{j!} = \lambda^2 e^{-\lambda} \cdot e^{\lambda} = \lambda^2.$$

Now compute the variance:

$$V(Y) = E[Y(Y-1)] + E(Y) - [E(Y)]^2 = \lambda^2 + \lambda - \lambda^2 = \lambda. \quad \blacksquare$$

The result is elegant: the Poisson mean and variance are *both* equal to $\lambda$.
:::

The elegance of the Poisson: the mean and variance are *both* equal to $\lambda$. If you observe data where the sample mean and sample variance are approximately equal, the Poisson may be a good model.

:::{admonition} Example 4.25: Food Delivery Orders
:class: important

A restaurant receives online delivery orders at an average rate of 6 per hour during the lunch rush. Assuming orders arrive according to a Poisson process:

(a) Find the probability of receiving exactly 4 orders in a given hour.
(b) Find the probability of receiving 10 or more orders in an hour.
(c) Find the probability of receiving no orders in a 15-minute window.

**Solution.** For one hour, $Y \sim \text{Pois}(\lambda = 6)$.

(a) $$P(Y = 4) = \frac{6^4}{4!} e^{-6} = \frac{1296}{24} e^{-6} = 54 \times 0.002479 = 0.1339.$$

About a 13.4% chance of exactly 4 orders.

(b) $$P(Y \geq 10) = 1 - P(Y \leq 9) = 1 - \sum_{y=0}^{9} \frac{6^y}{y!} e^{-6}.$$

Using R: `1 - ppois(9, 6)` $= 0.0839$. About an 8.4% chance.

(c) For a 15-minute window (one-quarter of an hour), the rate scales: $\lambda_{15} = 6 \times (15/60) = 1.5$. Now $W \sim \text{Pois}(1.5)$:
$$P(W = 0) = \frac{(1.5)^0}{0!} e^{-1.5} = e^{-1.5} = 0.2231.$$

About a 22.3% chance of no orders in a 15-minute window.
:::

### The Poisson Approximation to the Binomial

The Poisson distribution arises as a limit of the Binomial when $n$ is large, $p$ is small, and $\lambda = np$ remains moderate. Intuitively: if you have many trials, each with a tiny probability of success, the count of successes is approximately Poisson.

**Rule of thumb:** The Poisson approximation to the Binomial is good when $n \geq 20$ and $p \leq 0.05$, with $\lambda = np$.

:::{admonition} Example 4.26: Rare Manufacturing Defects
:class: important

A precision manufacturer produces 10,000 microchips, each with a 0.0003 probability of a critical flaw. Find the probability that a batch contains at least 2 flawed chips.

**Solution.** Exact model: $Y \sim \text{Bin}(10{,}000, 0.0003)$, so $\lambda = np = 3$. Using the Poisson approximation with $\lambda = 3$:

$$P(Y \geq 2) = 1 - P(Y = 0) - P(Y = 1) = 1 - e^{-3} - 3e^{-3} = 1 - 4e^{-3} = 1 - 0.1991 = 0.8009.$$

About an 80.1% chance of at least 2 flawed chips in the batch. Computing this with the exact Binomial formula ($n = 10{,}000$, $p = 0.0003$) would be computationally expensive but yields nearly the same answer.
:::

### Seeing It in R

```r
#| label: poisson-sim
#| fig-cap: "Poisson distribution and simulation for delivery orders"

lambda <- 6
y_vals <- 0:15
pmf_theory <- dpois(y_vals, lambda)

# Simulation
set.seed(77)
Y_sim <- rpois(50000, lambda)

par(mfrow = c(1, 2))
barplot(pmf_theory, names.arg = y_vals,
        main = paste0("Theoretical: Pois(", lambda, ")"),
        xlab = "y (orders)", ylab = "P(Y = y)",
        col = "steelblue", border = "white")
barplot(table(factor(Y_sim, levels = y_vals)) / length(Y_sim),
        main = "Simulated (50,000 hours)",
        xlab = "y (orders)", ylab = "Relative Frequency",
        col = "coral", border = "white")
par(mfrow = c(1, 1))
```

**Key R functions:** `dpois(y, lambda)`, `ppois(y, lambda)`, `rpois(nsim, lambda)`.

---

:::{admonition} What Did We Just Learn?
:class: tip

The **Poisson distribution** models the count of independent events occurring at a constant rate in a fixed interval. Its PMF is $p(y) = \frac{\lambda^y}{y!}e^{-\lambda}$, and both its mean and variance equal $\lambda$.

**In real life, this means:**

- A call center receiving $\lambda = 12$ calls per hour can compute the probability of being overwhelmed (e.g., 20+ calls): `1 - ppois(19, 12)` $\approx 0.0095$, about a 1% chance.
- An ER with $\lambda = 5$ trauma cases per shift can plan for worst-case staffing using Poisson tail probabilities.
- A website experiencing $\lambda = 100$ hits per minute can size its server to handle the expected load plus a safety margin.

The Poisson is the go-to model for rare events, arrival processes, and counting phenomena. Its elegance — one parameter controlling both mean and variance — makes it one of the most widely used distributions in all of applied statistics.

**What's next:** We have now covered all five named distributions. In the next section, we step back and develop a powerful general tool — the moment-generating function — that can identify distributions and compute moments in one stroke.
:::

---

### Exercises: Section 4.9

**4.9.1.** A hospital emergency department sees an average of 8 patients per hour overnight. Assume arrivals follow a Poisson process.

(a) Find the probability of exactly 5 arrivals in a given hour.
(b) Find the probability of 12 or more arrivals in an hour.
(c) Find the probability of no arrivals in a 15-minute window.
(d) Find the expected number and standard deviation of arrivals per hour.

**4.9.2.** The number of typos per page in a 300-page manuscript follows a Poisson distribution with $\lambda = 0.8$ typos per page.

(a) Find the probability that a randomly selected page has no typos.
(b) Find the probability that a page has 3 or more typos.
(c) In a 5-page section, what is the expected number of typos? What distribution does the total follow?

**4.9.3.** (Poisson approximation) A large website has 50,000 daily visitors, each with a 0.00004 probability of encountering a critical error.

(a) Identify $n$ and $p$ for the Binomial model.
(b) Compute $\lambda = np$ and use the Poisson approximation to find $P(Y = 0)$, $P(Y = 1)$, and $P(Y \geq 3)$.

**4.9.4.** Earthquakes of magnitude 6.0 or greater occur in a certain region at an average rate of 2.5 per year. Assuming a Poisson process:

(a) Find the probability of no such earthquakes in a given year.
(b) Find the probability of 5 or more in a given year.
(c) Find the probability of no such earthquakes in a 6-month period.

**4.9.5.** (Proof exercise) Show that for the Poisson distribution, $E[Y(Y-1)] = \lambda^2$, and use this to confirm that $V(Y) = \lambda$.

---


## 4.10 Moments and Moment-Generating Functions

:::{admonition} What Are We About to Learn?
:class: tip

We have five named distributions, each with its own PMF, mean, and variance. Now imagine someone hands you a mysterious function $m(t) = e^{3(e^t - 1)}$ and says: "This encodes a complete distribution. Can you identify it?"

Remarkably, you can. The function $m(t)$ is a **moment-generating function** (MGF) — a mathematical fingerprint that uniquely identifies a probability distribution. Match the fingerprint to a known distribution, and you have identified it without ever seeing the PMF directly.

MGFs also provide an efficient way to compute moments ($E(Y)$, $E(Y^2)$, etc.) — just take derivatives and evaluate at $t = 0$. In later courses (mathematical statistics, Chapter 7 of this book), MGFs become indispensable for proving results about sums of random variables and limit theorems.

**By the end of this section, you will be able to:**

- Define and compute moments and moment-generating functions
- Use MGFs to find the mean and variance of a distribution
- Identify a distribution from its MGF
:::

### Moments

:::{admonition} Definition 4.14: Moments
:class: note

The $k$-th **moment about the origin** of $Y$ is $\mu'_k = E(Y^k)$.

The $k$-th **central moment** of $Y$ is $\mu_k = E[(Y - \mu)^k]$.
:::

In particular, $\mu'_1 = E(Y) = \mu$ (the mean), and $\mu_2 = V(Y) = \sigma^2$ (the variance). Higher moments capture other features of the distribution: the third central moment relates to *skewness* (asymmetry), and the fourth to *kurtosis* (tail heaviness).

### The Moment-Generating Function

:::{admonition} 📐 Calculus Flashback: Exponential Functions and Their Derivatives
:class: warning

The MGF involves $e^{tY}$, so we need to differentiate exponentials confidently. Review these rules from Calculus I:

**Derivative of $e^x$:** $\dfrac{d}{dx}\left[e^x\right] = e^x$ (the exponential is its own derivative).

**Chain rule with exponentials:** If $f(t)$ is any differentiable function of $t$, then:
$$\frac{d}{dt}\left[e^{f(t)}\right] = f'(t) \cdot e^{f(t)}$$

*Differentiate the exponent, then multiply by the original exponential.*

**Product rule:** $\dfrac{d}{dt}[u(t) \cdot v(t)] = u'(t) \cdot v(t) + u(t) \cdot v'(t)$.

**Taylor series for $e^x$** (from Calculus II):
$$e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots = \sum_{k=0}^{\infty} \frac{x^k}{k!}$$

This converges for all $x$. We used this in the Poisson section to show that $\sum \frac{\lambda^y}{y!} = e^{\lambda}$.
:::

:::{admonition} Definition 4.15: Moment-Generating Function
:class: note

The **moment-generating function** (MGF) of $Y$ is
$$m(t) = E(e^{tY}) = \sum_{\text{all } y} e^{ty} \cdot p(y),$$
provided the sum is finite for some interval of $t$ around 0.
:::

Why does this "generate" moments? Expand $e^{tY}$ using the Taylor series for $e^x$ with $x = tY$:
$$m(t) = E\left[1 + tY + \frac{(tY)^2}{2!} + \frac{(tY)^3}{3!} + \cdots\right] = 1 + t \cdot E(Y) + \frac{t^2}{2!} E(Y^2) + \frac{t^3}{3!} E(Y^3) + \cdots$$

The $k$-th moment $\mu'_k = E(Y^k)$ appears as the coefficient of $t^k / k!$. To extract it, differentiate $k$ times and set $t = 0$:

:::{admonition} Theorem 4.13: MGF Generates Moments
:class: note

$$\mu'_k = E(Y^k) = m^{(k)}(0) = \left.\frac{d^k m(t)}{dt^k}\right|_{t=0}.$$
:::

:::{admonition} Uniqueness Theorem (stated without proof)
:class: note

If two random variables have the same MGF (wherever it exists), they have the same probability distribution. The MGF uniquely determines the distribution.
:::

### Computing MGFs and Identifying Distributions

:::{admonition} Example 4.27: MGF of the Poisson Distribution
:class: important

Let $Y \sim \text{Pois}(\lambda)$. Derive the MGF and use it to find $E(Y)$ and $V(Y)$.

**Step 1: Derive the MGF.**

$$m(t) = E(e^{tY}) = \sum_{y=0}^{\infty} e^{ty} \cdot \frac{\lambda^y}{y!} e^{-\lambda}.$$

Factor out $e^{-\lambda}$ (it does not depend on $y$) and combine $e^{ty} \cdot \lambda^y = (\lambda e^t)^y$:

$$= e^{-\lambda} \sum_{y=0}^{\infty} \frac{(\lambda e^t)^y}{y!}.$$

Recognize the Taylor series: $\sum_{y=0}^{\infty} \frac{x^y}{y!} = e^x$, with $x = \lambda e^t$:

$$= e^{-\lambda} \cdot e^{\lambda e^t} = e^{\lambda e^t - \lambda} = e^{\lambda(e^t - 1)}.$$

So $m(t) = e^{\lambda(e^t - 1)}$.

**Step 2: Find $E(Y)$ using $m'(0)$.**

We need $\frac{d}{dt}\left[e^{\lambda(e^t - 1)}\right]$. This is an exponential with exponent $f(t) = \lambda(e^t - 1)$.

By the chain rule: $m'(t) = f'(t) \cdot e^{f(t)}$.

First, find $f'(t)$: since $f(t) = \lambda e^t - \lambda$, we get $f'(t) = \lambda e^t$ (the derivative of $\lambda e^t$ is $\lambda e^t$; the derivative of $-\lambda$ is 0).

Therefore:

$$m'(t) = \lambda e^t \cdot e^{\lambda(e^t - 1)}.$$

Evaluate at $t = 0$: $m'(0) = \lambda e^0 \cdot e^{\lambda(e^0 - 1)} = \lambda \cdot 1 \cdot e^{\lambda(1-1)} = \lambda \cdot e^0 = \lambda$.

$$E(Y) = m'(0) = \lambda. \quad \checkmark$$

**Step 3: Find $E(Y^2)$ using $m''(0)$.**

We need the derivative of $m'(t) = \lambda e^t \cdot e^{\lambda(e^t - 1)}$. This is a product of two functions, so we use the **product rule**: $\frac{d}{dt}[u \cdot v] = u' \cdot v + u \cdot v'$.

Let $u(t) = \lambda e^t$ and $v(t) = e^{\lambda(e^t - 1)}$.

- $u'(t) = \lambda e^t$
- $v'(t) = \lambda e^t \cdot e^{\lambda(e^t - 1)}$ (chain rule, same as before)

Therefore:

$$m''(t) = \lambda e^t \cdot e^{\lambda(e^t-1)} + \lambda e^t \cdot \lambda e^t \cdot e^{\lambda(e^t-1)} = \lambda e^t \cdot e^{\lambda(e^t-1)} \left[1 + \lambda e^t\right].$$

Evaluate at $t = 0$: $m''(0) = \lambda \cdot 1 \cdot 1 \cdot [1 + \lambda] = \lambda + \lambda^2$.

$$E(Y^2) = m''(0) = \lambda + \lambda^2.$$

**Step 4: Compute the variance.**

$$V(Y) = E(Y^2) - [E(Y)]^2 = (\lambda + \lambda^2) - \lambda^2 = \lambda. \quad \checkmark$$
:::

:::{admonition} Example 4.28: Identifying a Distribution from Its MGF
:class: important

A random variable $W$ has MGF $m_W(t) = (0.7e^t + 0.3)^8$. What is the distribution of $W$?

**Solution.**

The MGF of a $\text{Bin}(n, p)$ random variable is $m(t) = (pe^t + q)^n$. Comparing:
$$(0.7e^t + 0.3)^8 = (pe^t + q)^n \implies p = 0.7, \quad q = 0.3, \quad n = 8.$$

By uniqueness, $W \sim \text{Bin}(8, 0.7)$.
:::

:::{admonition} Example 4.29: Identifying from a Poisson MGF
:class: important

A random variable $X$ has MGF $m_X(t) = e^{4.5(e^t - 1)}$. Identify the distribution and find $P(X = 2)$.

**Solution.**

This matches the Poisson MGF $e^{\lambda(e^t - 1)}$ with $\lambda = 4.5$. So $X \sim \text{Pois}(4.5)$.

$$P(X = 2) = \frac{(4.5)^2}{2!} e^{-4.5} = \frac{20.25}{2} \times 0.01111 = 0.1125.$$
:::

**Summary of MGFs for named distributions:**

| Distribution | MGF $m(t)$ |
|:---|:---|
| Bernoulli$(p)$ | $pe^t + q$ |
| Binomial$(n, p)$ | $(pe^t + q)^n$ |
| Geometric$(p)$ | $\dfrac{pe^t}{1 - qe^t}$, for $t < -\ln q$ |
| Poisson$(\lambda)$ | $e^{\lambda(e^t - 1)}$ |

---

:::{admonition} What Did We Just Learn?
:class: tip

The **moment-generating function** $m(t) = E(e^{tY})$ encodes the entire distribution of $Y$ into a single function. Differentiating $k$ times at $t = 0$ extracts the $k$-th moment, and the uniqueness theorem lets us identify distributions by matching MGFs.

**In real life, this means:** MGFs are a theoretical power tool rather than a practical calculator. You will not use them to compute probabilities in everyday work — R does that faster. But in theoretical statistics, MGFs are essential for proving that sums of independent random variables have certain distributions (e.g., the sum of independent Poissons is Poisson), for establishing the Central Limit Theorem, and for deriving sampling distributions.

Think of the MGF as a distribution's DNA — compact, unique, and from which all properties can be reconstructed.

**What's next:** Our final topic is a remarkable inequality that works for *any* distribution — even if you do not know its name, shape, or MGF. It only requires the mean and variance.
:::

---

### Exercises: Section 4.10

**4.10.1.** Derive the MGF of a Bernoulli$(p)$ random variable directly from the definition.

**4.10.2.** A random variable $Z$ has MGF $m(t) = \dfrac{0.4 e^t}{1 - 0.6 e^t}$ for $t < -\ln(0.6)$. Identify the distribution of $Z$ and find $E(Z)$ and $V(Z)$.

**4.10.3.** Use the MGF of the Binomial distribution $m(t) = (pe^t + q)^n$ to derive $E(Y) = np$ and $V(Y) = npq$ by computing $m'(0)$ and $m''(0)$.

**4.10.4.** A random variable $X$ has MGF $m(t) = (0.5e^t + 0.5)^{12}$. Find $P(X \leq 3)$ using R.

---

## 4.11 Tchebysheff's Theorem

:::{admonition} What Are We About to Learn?
:class: tip

Every result so far in this chapter has required knowing the *specific distribution* of $Y$ — Binomial, Poisson, Geometric, etc. But what if you only know the mean and variance and nothing else? Can you still say anything useful about probabilities?

Remarkably, yes. **Tchebysheff's theorem** provides a universal lower bound on the probability that $Y$ falls within $k$ standard deviations of its mean — and it works for *every* distribution, no matter how strange its shape.

A streaming platform knows that daily active users average $\mu = 2.4$ million with a standard deviation of $\sigma = 0.3$ million, but they do not know the exact distribution. Tchebysheff's theorem lets them guarantee that at least 75% of days will have between 1.8 and 3.0 million users — without knowing anything else.

**By the end of this section, you will be able to:**

- State and prove Tchebysheff's theorem
- Apply it to bound probabilities when the distribution is unknown
- Compare the Tchebysheff bound to the (tighter) empirical rule
:::

### Markov's Inequality (The Foundation)

Before proving Tchebysheff's theorem, we establish a simpler but more general result that it builds on.

:::{admonition} Theorem 4.14a: Markov's Inequality
:class: note

Let $Y$ be a **non-negative** random variable (i.e., $P(Y \geq 0) = 1$) with finite mean $E(Y)$. Then for any constant $a > 0$:
$$P(Y \geq a) \leq \frac{E(Y)}{a}.$$
:::

:::{admonition} Proof of Markov's Inequality
:class: note

**Strategy:** The idea is beautifully simple — replace $Y$ with something smaller that is easier to compute.

**Step 1.** Define an indicator: let $I = 1$ if $Y \geq a$ and $I = 0$ otherwise. Then $a \cdot I \leq Y$, because:

- If $Y \geq a$: then $I = 1$, so $a \cdot I = a \leq Y$. ✓
- If $Y < a$: then $I = 0$, so $a \cdot I = 0 \leq Y$ (since $Y \geq 0$). ✓

**Step 2.** Take expected values of both sides. Since $a \cdot I \leq Y$ always:
$$E(a \cdot I) \leq E(Y).$$

**Step 3.** The left side simplifies: $E(a \cdot I) = a \cdot E(I) = a \cdot P(Y \geq a)$ (since $E(I) = P(Y \geq a)$ — this is the **Fundamental Bridge**: the expected value of an indicator equals the probability of the event).

**Step 4.** Therefore $a \cdot P(Y \geq a) \leq E(Y)$, and dividing by $a$:
$$P(Y \geq a) \leq \frac{E(Y)}{a}. \quad \blacksquare$$
:::

**Why Markov matters:** It says a non-negative random variable cannot frequently be much larger than its mean. For example, if $E(Y) = 10$, then $P(Y \geq 100) \leq 10/100 = 0.10$. The bound is often loose, but it works with *only* the mean — no variance needed.

**From Markov to Tchebysheff:** Tchebysheff's theorem is simply Markov's inequality applied to the non-negative random variable $(Y - \mu)^2$ with $a = k^2\sigma^2$. This gives us the tighter bound that uses variance information.

:::{admonition} Theorem 4.14: Tchebysheff's Theorem
:class: note

Let $Y$ be a random variable with mean $\mu$ and finite variance $\sigma^2$. Then, for any constant $k > 0$,
$$P(|Y - \mu| < k\sigma) \geq 1 - \frac{1}{k^2},$$
or equivalently,
$$P(|Y - \mu| \geq k\sigma) \leq \frac{1}{k^2}.$$
:::

**What this says in plain language:** At least $1 - 1/k^2$ of the probability lies within $k$ standard deviations of the mean.

| $k$ | At least this fraction is within $\mu \pm k\sigma$ |
|:---:|:---:|
| 2 | $1 - 1/4 = 75\%$ |
| 3 | $1 - 1/9 \approx 88.9\%$ |
| 4 | $1 - 1/16 = 93.75\%$ |
| 5 | $1 - 1/25 = 96\%$ |

:::{admonition} Proof of Tchebysheff's Theorem
:class: note

**Strategy:** We start from the definition of variance — which is a sum over *all* values of $Y$ — and show that the terms far from $\mu$ alone already account for enough to force an upper bound on their total probability.

**Step 1.** Write out the definition of variance as a sum:

$$\sigma^2 = E[(Y - \mu)^2] = \sum_{\text{all } y} (y - \mu)^2 \, p(y).$$

This sum adds up $(y - \mu)^2 \cdot p(y)$ for every value $y$ that $Y$ can take. Every term in this sum is non-negative because $(y - \mu)^2 \geq 0$ and $p(y) \geq 0$.

**Step 2.** Split the sum into two groups — the values "far" from $\mu$ (at least $k\sigma$ away) and the values "close" to $\mu$ (less than $k\sigma$ away):

$$\sigma^2 = \underbrace{\sum_{|y - \mu| \geq k\sigma} (y - \mu)^2 \, p(y)}_{\text{far terms}} + \underbrace{\sum_{|y - \mu| < k\sigma} (y - \mu)^2 \, p(y)}_{\text{close terms}}.$$

**Step 3.** Drop the "close" sum. Since every term in that sum is $\geq 0$, removing it can only make the right side smaller. This gives us an *inequality*:

$$\sigma^2 \geq \sum_{|y - \mu| \geq k\sigma} (y - \mu)^2 \, p(y).$$

**Step 4.** Replace $(y - \mu)^2$ with something smaller. In the "far" sum, every $y$ satisfies $|y - \mu| \geq k\sigma$, which means $(y - \mu)^2 \geq (k\sigma)^2 = k^2\sigma^2$. So every term in the sum is at least $k^2\sigma^2 \cdot p(y)$:

$$\sigma^2 \geq \sum_{|y - \mu| \geq k\sigma} k^2\sigma^2 \, p(y).$$

**Step 5.** Factor out the constant $k^2\sigma^2$ (it does not depend on $y$):

$$\sigma^2 \geq k^2\sigma^2 \sum_{|y - \mu| \geq k\sigma} p(y).$$

The remaining sum is simply $P(|Y - \mu| \geq k\sigma)$ — the total probability of all values at least $k\sigma$ away from the mean.

$$\sigma^2 \geq k^2\sigma^2 \cdot P(|Y - \mu| \geq k\sigma).$$

**Step 6.** Divide both sides by $k^2\sigma^2$ (which is positive since $k > 0$ and $\sigma^2 > 0$):

$$P(|Y - \mu| \geq k\sigma) \leq \frac{\sigma^2}{k^2\sigma^2} = \frac{1}{k^2}. \quad \blacksquare$$

**Why this proof works:** The entire argument rests on two simple ideas — (1) dropping non-negative terms from a sum can only decrease it, and (2) replacing a quantity with something smaller also decreases the sum. These two underestimates, combined, produce the bound.
:::

Two critical observations:

1. **It works for any distribution.** No assumptions about shape, symmetry, or named families. This is its power.
2. **It is conservative.** For most distributions, the actual probability within $\mu \pm 2\sigma$ is much higher than 75%. For a normal distribution, it is 95.4%. Tchebysheff gives a guaranteed floor, not an exact answer.

:::{admonition} Example 4.30: Streaming Platform Users
:class: important

A streaming platform has daily active users with $\mu = 2.4$ million and $\sigma = 0.3$ million. The distribution is unknown. What can be said about $P(1.8 < Y < 3.0)$?

**Solution.** $\mu - k\sigma = 1.8$ means $2.4 - 0.3k = 1.8$, so $k = 2$. Similarly, $\mu + k\sigma = 3.0$ confirms $k = 2$.

By Tchebysheff: $P(1.8 < Y < 3.0) = P(|Y - 2.4| < 0.6) \geq 1 - 1/4 = 0.75$.

At least 75% of days have between 1.8 and 3.0 million users. If the distribution happens to be approximately normal, the actual probability would be about 95% — but we can *guarantee* at least 75% regardless.
:::

:::{admonition} Example 4.31: Finding $k$ from a Probability Bound
:class: important

The number of ride-share requests per hour has $\mu = 45$ and $\sigma = 7$. Find the value $C$ such that $P(|Y - 45| \geq C) \leq 0.04$.

**Solution.** We need $1/k^2 \leq 0.04$, so $k^2 \geq 25$, giving $k \geq 5$.

Therefore $C = k\sigma = 5 \times 7 = 35$, and $P(|Y - 45| \geq 35) \leq 0.04$.

Equivalently, at least 96% of hours have between $45 - 35 = 10$ and $45 + 35 = 80$ requests.
:::

---

:::{admonition} What Did We Just Learn?
:class: tip

**Tchebysheff's theorem** tells us that for *any* random variable with known mean and variance, at least $1 - 1/k^2$ of the probability lies within $k$ standard deviations of the mean. It is a universal safety net — conservative but completely general.

**In real life, this means:** When you do not know the shape of a distribution (which is common in practice), Tchebysheff gives you guaranteed bounds. An operations manager who knows the average and standard deviation of daily demand but not its exact distribution can still make confident statements like "at least 89% of days will have demand between $\mu - 3\sigma$ and $\mu + 3\sigma$."

If you *do* know the distribution is approximately bell-shaped, the empirical rule (68-95-99.7) gives much tighter bounds. Tchebysheff is the fallback when you know nothing about the shape.

**What's next:** We bring everything together in the chapter summary, with a master comparison table of all distributions and their stories, formulas, and parameters.
:::

---

### Exercises: Section 4.11

**4.11.1.** A random variable $Y$ has mean $\mu = 25$ and standard deviation $\sigma = 4$.

(a) Use Tchebysheff's theorem to find a lower bound for $P(17 < Y < 33)$.
(b) Find the value $C$ such that $P(|Y - 25| \geq C) \leq 0.01$.

**4.11.2.** The number of daily transactions at an ATM has $\mu = 120$ and $\sigma = 18$, with unknown distribution. The bank wants at least 90% of days to fall within the staffing plan's capacity range. What range (centered at $\mu$) guarantees this?

**4.11.3.** $Y \sim \text{Bin}(100, 0.5)$, so $\mu = 50$ and $\sigma = 5$. Use Tchebysheff to find a lower bound for $P(40 < Y < 60)$. Then compute the exact probability using R (`pbinom(59, 100, 0.5) - pbinom(40, 100, 0.5)`) and compare. How conservative is the bound?

---


## 4.12 The Poisson Limit Theorem ★

*This section is optional enrichment. It provides the formal proof that the Poisson distribution arises as a limit of the Binomial. Your instructor may choose to skip this section.*

:::{admonition} What Are We About to Learn?
:class: tip

In Section 4.9, we stated that when $n$ is large and $p$ is small with $np = \lambda$ held constant, the Binomial approaches the Poisson. Here we prove it rigorously by decomposing the Binomial PMF into four factors and analyzing each one as $n \to \infty$.
:::

:::{admonition} Theorem 4.15: The Poisson Limit Theorem
:class: note

Let $Y_n \sim \text{Bin}(n, \lambda/n)$ for each positive integer $n$, where $\lambda > 0$ is fixed. Then for every non-negative integer $y$:
$$\lim_{n \to \infty} P(Y_n = y) = \frac{\lambda^y}{y!} e^{-\lambda}.$$
:::

::::{admonition} Proof of the Poisson Limit Theorem
:class: note

**Strategy:** Write out the Binomial PMF with $p = \lambda/n$, then decompose it into four factors that we can analyze independently as $n \to \infty$.

**Step 1: Write the Binomial PMF.** With $p = \lambda/n$ and $q = 1 - \lambda/n$:

$$P(Y_n = y) = \frac{n!}{y!(n-y)!} \left(\frac{\lambda}{n}\right)^y \left(1 - \frac{\lambda}{n}\right)^{n-y}.$$

**Step 2: Rearrange into four factors.** Separate the pieces strategically:

$$P(Y_n = y) = \underbrace{\frac{n!}{(n-y)! \cdot n^y}}_{\text{Factor A}} \cdot \underbrace{\frac{\lambda^y}{y!}}_{\text{Factor B}} \cdot \underbrace{\left(1 - \frac{\lambda}{n}\right)^{n}}_{\text{Factor C}} \cdot \underbrace{\left(1 - \frac{\lambda}{n}\right)^{-y}}_{\text{Factor D}}$$

**Step 3: Analyze each factor as $n \to \infty$.**

**Factor A:** $\dfrac{n!}{(n-y)! \cdot n^y} = \dfrac{n \cdot (n-1) \cdot (n-2) \cdots (n-y+1)}{n^y}$

This is a product of $y$ fractions: $\frac{n}{n} \cdot \frac{n-1}{n} \cdot \frac{n-2}{n} \cdots \frac{n-y+1}{n}$. Each fraction $\to 1$ as $n \to \infty$ (since $y$ is fixed). Therefore **Factor A $\to 1$**.

**Factor B:** $\dfrac{\lambda^y}{y!}$ does not depend on $n$ at all. It is a **constant**.

**Factor C:** $\left(1 - \dfrac{\lambda}{n}\right)^{n}$

:::{admonition} 📐 Calculus Flashback: A Famous Limit
:class: warning

From Calculus I, one of the most important limits in mathematics:
$$\lim_{n \to \infty} \left(1 + \frac{x}{n}\right)^n = e^x.$$
Setting $x = -\lambda$: $\lim_{n \to \infty} \left(1 - \frac{\lambda}{n}\right)^n = e^{-\lambda}$.
:::

Therefore **Factor C $\to e^{-\lambda}$**.

**Factor D:** $\left(1 - \dfrac{\lambda}{n}\right)^{-y}$. Since $y$ is fixed and $\lambda/n \to 0$, this $\to (1 - 0)^{-y} = 1$. Therefore **Factor D $\to 1$**.

**Step 4: Combine.** As $n \to \infty$:

$$P(Y_n = y) \to 1 \cdot \frac{\lambda^y}{y!} \cdot e^{-\lambda} \cdot 1 = \frac{\lambda^y}{y!} e^{-\lambda}. \quad \blacksquare$$
::::

**Why this matters:** This theorem explains *where the Poisson distribution comes from*. When you have many opportunities for a rare event (large $n$, small $p$), the Poisson emerges naturally. This is why it shows up in so many seemingly unrelated contexts — typos, radioactive decay, server requests, disease cases — all are situations with many "trials" and small individual probabilities.

---

## 4.13 Classic Problems ★

*This section is optional enrichment. It showcases three classic probability problems that illustrate the power of expected value and indicator random variables. Your instructor may assign selected problems or skip this section entirely.*

:::{admonition} What Are We About to Learn?
:class: tip

Three famous problems that have fascinated mathematicians for centuries — each one solvable with the tools from this chapter, and each one revealing something surprising about probability.
:::

### The Matching Problem (Montmort, 1708)

A professor returns $n$ exams to $n$ students completely at random. What is the expected number of students who receive their own exam?

**Solution using indicator variables.** Let $I_j = 1$ if student $j$ gets their own exam, and $I_j = 0$ otherwise. The total number of matches is $Y = I_1 + I_2 + \cdots + I_n$.

Each student has a $1/n$ chance of getting their own exam: $E(I_j) = 1/n$.

By linearity of expectation (even though the $I_j$'s are dependent!):
$$E(Y) = E(I_1) + E(I_2) + \cdots + E(I_n) = n \cdot \frac{1}{n} = 1.$$

**The surprising result:** No matter how many students there are — 5 or 500 or 5 million — the expected number of matches is always exactly 1. Furthermore, for large $n$, the number of matches is approximately $\text{Pois}(1)$, so the probability of zero matches approaches $e^{-1} \approx 0.368$.

### The Coupon Collector Problem

A cereal company puts one of $n$ different toy figurines in each box, chosen uniformly at random. How many boxes must you buy, on average, to collect all $n$ figurines?

**Solution using Geometric decomposition.** After collecting $k$ distinct figurines, the probability that the next box contains a *new* one is $p_k = (n - k)/n$. The number of additional boxes needed to get the next new figurine is $\text{Geom}(p_k)$ with mean $n/(n - k)$.

The total number of boxes is $T = T_0 + T_1 + \cdots + T_{n-1}$ where $T_k \sim \text{Geom}((n-k)/n)$.

By linearity:
$$E(T) = \frac{n}{n} + \frac{n}{n-1} + \frac{n}{n-2} + \cdots + \frac{n}{1} = n\left(1 + \frac{1}{2} + \frac{1}{3} + \cdots + \frac{1}{n}\right) = n \cdot H_n$$

where $H_n = \sum_{k=1}^{n} 1/k$ is the $n$-th **harmonic number**. For large $n$, $H_n \approx \ln n + 0.5772$ (Euler's constant).

**Example:** With $n = 50$ figurines, $E(T) = 50 \cdot H_{50} \approx 50 \times 4.499 \approx 225$ boxes. You need to buy roughly 4.5 times as many boxes as there are figurines!

### The St. Petersburg Paradox (Bernoulli, 1738)

A casino offers this game: flip a fair coin repeatedly until the first heads appears on toss $k$. You win $2^k$ dollars. How much should you pay to play?

**Expected value calculation:** $Y$ = winnings. $P(Y = 2^k) = (1/2)^k$ for $k = 1, 2, 3, \ldots$

$$E(Y) = \sum_{k=1}^{\infty} 2^k \cdot \left(\frac{1}{2}\right)^k = \sum_{k=1}^{\infty} 1 = \infty.$$

The expected value is **infinite**! By naive expected-value reasoning, you should be willing to pay any finite amount to play. Yet no rational person would pay even \$100.

**Why this matters:** The St. Petersburg Paradox shows that expected value alone does not capture everything about a decision. It motivated Daniel Bernoulli to propose **expected utility** (using $E[\log(\text{wealth})]$ instead of $E[\text{wealth}]$) — one of the foundational ideas of economics and decision theory. It is a powerful reminder that while expected value is an essential tool, it has limits.

---


## Chapter Summary

This chapter introduced **discrete random variables** — functions that assign numerical values to the outcomes of random experiments — and developed the complete toolkit for describing their probability behavior.

**Key takeaways:**

1. A **random variable** is a function from the sample space to the real numbers. It translates outcomes into numbers we can compute with.

2. The **probability mass function** (PMF) $p(y) = P(Y = y)$ provides the probability of each value. The **cumulative distribution function** (CDF) $F(y) = P(Y \leq y)$ accumulates probabilities from left to right.

3. The **expected value** $E(Y) = \sum y \cdot p(y)$ is the long-run average — the center of gravity of the distribution. More generally, $E[g(Y)] = \sum g(y) \cdot p(y)$.

4. The **variance** $V(Y) = E(Y^2) - [E(Y)]^2$ measures spread. The standard deviation $\sigma = \sqrt{V(Y)}$ has the same units as $Y$.

5. Five **named distributions** capture common experimental patterns. The distribution you choose depends on the *story* of the experiment:

| Distribution | The Story | PMF | $E(Y)$ | $V(Y)$ |
|:---|:---|:---|:---:|:---:|
| **Bernoulli**$(p)$ | Single trial, two outcomes | $p^y q^{1-y}$ | $p$ | $pq$ |
| **Binomial**$(n,p)$ | $n$ trials, count successes | $C(n,y) p^y q^{n-y}$ | $np$ | $npq$ |
| **Geometric**$(p)$ | Trials until 1st success | $q^{y-1}p$ | $1/p$ | $q/p^2$ |
| **Neg. Binomial**$(r,p)$ | Trials until $r$-th success | $C(y\!-\!1, r\!-\!1)p^r q^{y-r}$ | $r/p$ | $rq/p^2$ |
| **Hypergeometric**$(N,r,n)$ | $n$ draws without replacement | $\frac{C(r,y)C(N-r,n-y)}{C(N,n)}$ | $nr/N$ | $n\frac{r}{N}\frac{N-r}{N}\frac{N-n}{N-1}$ |
| **Poisson**$(\lambda)$ | Events in a fixed interval | $\frac{\lambda^y}{y!}e^{-\lambda}$ | $\lambda$ | $\lambda$ |

6. **Moment-generating functions** $m(t) = E(e^{tY})$ uniquely determine distributions and generate moments via $\mu'_k = m^{(k)}(0)$.

7. **Tchebysheff's theorem** provides universal probability bounds: at least $1 - 1/k^2$ of the probability is within $k$ standard deviations of the mean, for *any* distribution.

### The Distribution Family Tree

Understanding the *relationships* between distributions is as important as knowing the formulas:

- **Bernoulli** is Binomial with $n = 1$.
- **Geometric** is Negative Binomial with $r = 1$.
- **Poisson** is the limit of Binomial as $n \to \infty$, $p \to 0$, $np \to \lambda$.
- **Hypergeometric** converges to Binomial as $N \to \infty$ with $r/N = p$ constant.
- **Binomial additivity:** If $X \sim \text{Bin}(n, p)$ and $Y \sim \text{Bin}(m, p)$ are independent, then $X + Y \sim \text{Bin}(n + m, p)$.
- **Poisson additivity:** If $X \sim \text{Pois}(\lambda_1)$ and $Y \sim \text{Pois}(\lambda_2)$ are independent, then $X + Y \sim \text{Pois}(\lambda_1 + \lambda_2)$.
- **Negative Binomial as Geometric sum:** $\text{NegBin}(r, p) = \text{Geom}_1(p) + \text{Geom}_2(p) + \cdots + \text{Geom}_r(p)$, with independent Geometric terms.

### Which Distribution? A Selection Guide

When faced with a problem, ask these questions in order:

| Question | If YES | If NO |
|:---|:---|:---|
| **Fixed number of trials $n$?** | Go to next row | Go to Geometric/NegBin/Poisson |
| **Sampling with replacement (or population ≫ sample)?** | **Binomial** | **Hypergeometric** |
| **Counting events in a time/space interval?** | **Poisson** | Go to next row |
| **Waiting for the 1st success?** | **Geometric** | Go to next row |
| **Waiting for the $r$-th success?** | **Negative Binomial** | Re-read the problem! |

### Key R Functions

| Distribution | $P(Y = y)$ | $P(Y \leq y)$ | Simulate |
|:---|:---|:---|:---|
| Binomial | `dbinom(y, n, p)` | `pbinom(y, n, p)` | `rbinom(nsim, n, p)` |
| Geometric | `dgeom(y-1, p)` | `pgeom(y-1, p)` | `rgeom(nsim, p) + 1` |
| Neg. Binomial | `dnbinom(y-r, r, p)` | `pnbinom(y-r, r, p)` | `rnbinom(nsim, r, p) + r` |
| Hypergeometric | `dhyper(y, r, N-r, n)` | `phyper(y, r, N-r, n)` | `rhyper(nsim, r, N-r, n)` |
| Poisson | `dpois(y, lambda)` | `ppois(y, lambda)` | `rpois(nsim, lambda)` |

*Note:* R parameterizes the Geometric and Negative Binomial by the number of *failures*, not the trial number. Adjust accordingly (see the notes in Sections 4.6 and 4.7).

---

:::{admonition} Common Mistakes — The Complete List
:class: warning

1. **PMF vs CDF.** $p(y) = P(Y = y)$ is the probability of *exactly* $y$. $F(y) = P(Y \leq y)$ is the probability of $y$ *or less*. Never confuse them.

2. **$E(Y^2) \neq [E(Y)]^2$.** The expected value of the square is not the square of the expected value. The difference is the variance: $V(Y) = E(Y^2) - [E(Y)]^2$.

3. **Binomial vs Hypergeometric.** If sampling *with* replacement (or from a very large population): Binomial. If sampling *without* replacement from a *small* population: Hypergeometric. Rule of thumb: if $n < 0.05N$, the Binomial is a safe approximation.

4. **Geometric: $y$ starts at 1, not 0.** In our convention, $Y$ is the *trial number* of the first success, so $Y \geq 1$. R's `dgeom` counts *failures before* the first success, starting at 0. Always check your parameterization.

5. **Poisson rate scaling.** If $\lambda = 6$ per hour, then the rate per 20-minute window is $\lambda_{20} = 6 \times (20/60) = 2$, not 6. Always scale the rate to match the interval.

6. **Variance shortcut vs definition.** Use $V(Y) = E(Y^2) - \mu^2$ (the shortcut) unless specifically asked to use the definition $V(Y) = E[(Y-\mu)^2]$. The shortcut is faster and less error-prone.

7. **MGF identification.** If $m(t) = (pe^t + q)^n$, it is Binomial. If $m(t) = e^{\lambda(e^t - 1)}$, it is Poisson. Memorize these fingerprints.
:::

---

:::{admonition} Think About It
:class: tip

You now have six named distributions in your toolkit. But here is the real skill this chapter teaches: **given a real-world situation, choosing which distribution applies.**

The distribution is not in the formula — it is in the **story**. Fixed trials with binary outcomes? Binomial. Waiting for the first success? Geometric. Waiting for the $r$-th success? Negative Binomial. Drawing from a small population without replacement? Hypergeometric. Events arriving randomly in time? Poisson. The math is the straightforward part. **The modeling decision — translating a messy real-world scenario into a clean probabilistic setup — is where expertise lives.** That is the difference between knowing formulas and understanding probability.

:::

---

## Chapter Refresh Homework

The following problems span the entire chapter. They are designed to test your ability to identify the correct distribution, compute by hand, verify in R, and interpret results in context.

**4.R.1.** A campus IT department records the number of help desk tickets submitted per hour. The distribution is:

| $y$ | 0 | 1 | 2 | 3 | 4 | 5 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| $p(y)$ | 0.08 | 0.18 | 0.28 | 0.22 | 0.14 | 0.10 |

(a) Find $E(Y)$, $E(Y^2)$, $V(Y)$, and $\sigma$.
(b) Each ticket takes an average of 15 minutes to resolve. Find the expected total resolution time per hour and its standard deviation.
(c) Use Tchebysheff's theorem to find an interval that contains at least 75% of hourly ticket counts.

**4.R.2.** A pharmaceutical company tests a new antibiotic. Each patient independently has a 65% probability of showing significant improvement. Fifteen patients are enrolled in the trial.

(a) What distribution does $Y$ (the number who improve) follow? State the parameters.
(b) Find $P(Y = 10)$ and $P(Y \geq 12)$.
(c) Find the expected number who improve and the standard deviation.
(d) If fewer than 8 patients improve, the drug is deemed ineffective. Find this probability.

**4.R.3.** A venture capital firm reviews startup pitches. Each pitch independently has a 12% chance of receiving funding. The firm reviews pitches until it funds its 3rd startup.

(a) What distribution does $Y$ (the number of pitches reviewed) follow?
(b) Find the expected number of pitches and the standard deviation.
(c) Find the probability that the 3rd funded startup is found on exactly the 15th pitch.

**4.R.4.** A box contains 40 light bulbs, 8 of which are defective. An inspector randomly selects 6 bulbs for testing.

(a) What distribution does $Y$ (the number of defectives in the sample) follow? Why not Binomial?
(b) Find $P(Y = 0)$, $P(Y = 1)$, and $P(Y \geq 3)$.
(c) Find $E(Y)$ and $V(Y)$. Compare the Hypergeometric variance to the Binomial approximation $npq$ with $p = 8/40$.

**4.R.5.** A regional earthquake monitoring station records an average of 3.2 earthquakes of magnitude 4.0+ per month.

(a) What distribution is appropriate? State the parameter.
(b) Find the probability of exactly 5 earthquakes in a given month.
(c) Find the probability of no earthquakes in a 2-week period.
(d) Find the probability of 8 or more earthquakes in a 2-month period.

**4.R.6.** A random variable $X$ has MGF $m(t) = e^{7(e^t - 1)}$.

(a) Identify the distribution of $X$.
(b) Find $E(X)$ and $V(X)$ directly from the distribution.
(c) Verify $E(X)$ by computing $m'(0)$.

**4.R.7.** An online retailer finds that 8% of packages are delivered late. In a random sample of 30 packages:

(a) Find the probability that exactly 3 are delivered late.
(b) Find the probability that fewer than 2 are delivered late.
(c) Use the Poisson approximation (with $\lambda = np$) to approximate $P(Y = 3)$ and compare to the exact Binomial answer from part (a).

**4.R.8.** A student has a 0.40 probability of scoring a bullseye on each dart throw. Throws are independent.

(a) What is the probability that the student's first bullseye comes on the 5th throw?
(b) What is the expected number of throws until the first bullseye?
(c) Given that the first 3 throws were not bullseyes, what is the probability that the first bullseye comes on throw 6 or later? (Use the memoryless property.)

**4.R.9.** A random variable $Y$ has mean 50 and standard deviation 6, but its distribution is unknown.

(a) Use Tchebysheff's theorem to bound $P(38 < Y < 62)$.
(b) Find $C$ such that $P(|Y - 50| \geq C) \leq 0.05$.
(c) If you later learn that $Y$ is approximately normally distributed, how does your answer to (a) change?

**4.R.10.** (Distribution identification) For each scenario below, identify the appropriate distribution and state its parameters. Do not compute probabilities — just identify and justify.

(a) A roulette wheel has 38 slots (18 red, 18 black, 2 green). A gambler bets on red 20 times. $Y$ = number of wins.
(b) A committee of 5 is randomly selected from a group of 10 men and 8 women. $Y$ = number of women on the committee.
(c) A website receives an average of 200 hits per minute. $Y$ = number of hits in a 30-second window.
(d) A telemarketer calls potential customers. Each call independently has a 3% success rate. $Y$ = the call number on which the 2nd sale occurs.
(e) A student retakes a certification exam repeatedly until passing. Each attempt has a 55% pass rate. $Y$ = the attempt on which the student first passes.

**4.R.11.** (Proof) Let $Y$ be a discrete random variable with $E(Y) = \mu$ and $V(Y) = \sigma^2$. Prove that $E[(Y - a)^2]$ is minimized when $a = \mu$. Interpret this result in plain language.

**4.R.12.** (Comprehensive R exercise) Using R, generate 100,000 simulated values from each of the following distributions. For each, compute the sample mean and sample variance and compare to the theoretical values.

(a) $\text{Bin}(20, 0.35)$
(b) $\text{Pois}(7.5)$
(c) $\text{Geom}(0.15)$

Provide your R code and a brief summary of what you observe.
