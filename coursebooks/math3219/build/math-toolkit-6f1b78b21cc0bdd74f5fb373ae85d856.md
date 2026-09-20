---
title: "The Math Toolkit"
short_title: Math Toolkit
subtitle: "MATH 3219: every symbol this book uses, starting from nothing"
description: "A from-zero reference for every piece of mathematical notation in Inside the
  Machine. Twenty short topics, from what a letter standing for a number means through sigma
  notation, logarithms, percentages, vectors and interval notation. Each topic defines the
  symbol, says how to pronounce it, and works arithmetic you can reproduce on a phone
  calculator."
---

## What this page is for

This book uses mathematical notation. Notation is a shorthand. Someone invented each mark on
this page to save writing, and every one of them can be said out loud in ordinary English.

This appendix says all of them out loud.

You can read it straight through in about an hour, or you can ignore it until a chapter sends
you here. Every chapter in this book links to the exact section you need at the moment you need
it. When Chapter 4 writes $\sum$ for the first time, it links to [Section 10](#toolkit-sigma)
of this page, and Section 10 starts from "add these up."

Three things are true about this page and worth saying now.

**It starts from nothing.** It does not assume you remember high-school algebra. It does not
assume you have seen a subscript before. If you last did algebra eleven years ago, this page is
written for you and not for someone else.

**Every worked example is arithmetic you can check.** The numbers are small on purpose and the
steps are all written down. A phone calculator is enough. If your answer differs from the one
printed here, one of us made a slip, and finding out which one is a useful twenty seconds.

**Nothing here is optional background.** A student who can read $\hat{p} = x/n$ and say
"p-hat equals x over n, which is the number right divided by the number asked" has already done
the hard part of Chapter 11.

:::{note} Where the numbers come from
Some examples on this page use real measurements from this course's lab, such as the
494,032,768 parameters of `Qwen2.5-0.5B-Instruct`, or the 0.767 joules of energy it spends per
token of text it writes. Those came from a script in `lab/` and a JSON file in `lab/out/`.
Every one of them is labelled **real**.

Other examples use small invented numbers, because 2, 1 and 0 are easier to check by hand than
17.2173, 16.3196 and 15.6955. Those are labelled **made up for practice**.

The book's rule is: **we never publish a number we did not compute.** A made-up practice number
is fine as long as it says so. A claim about what a model actually did must be what the model
actually did.
:::

---

## The index of anchors

Every section below has a permanent link name. Chapters link straight to them, and you can
bookmark them. The middle column is what a chapter author types.

| # | Topic | Anchor to link to | Chapters that need it |
|---|---|---|---|
| 1 | [A letter standing for a number](#toolkit-letters) | `toolkit-letters` | all |
| 2 | [Subscripts](#toolkit-subscripts) | `toolkit-subscripts` | all |
| 3 | [Multiplication, written four ways](#toolkit-multiplication) | `toolkit-multiplication` | all |
| 4 | [The fraction bar](#toolkit-fraction-bar) | `toolkit-fraction-bar` | all |
| 5 | [Exponents](#toolkit-exponents) | `toolkit-exponents` | 2 to 9, 11 to 15 |
| 6 | [Negative exponents](#toolkit-negative-exponents) | `toolkit-negative-exponents` | 4, 5, 9, 11 |
| 7 | [The number $e$](#toolkit-e) | `toolkit-e` | 4, 5, 11 |
| 8 | [Logarithms](#toolkit-logarithms) | `toolkit-logarithms` | 5, 6, 11, 13 |
| 9 | [Square roots](#toolkit-square-roots) | `toolkit-square-roots` | 3, 5, 7 to 10, 12 to 15 |
| 10 | [Sigma notation](#toolkit-sigma) | `toolkit-sigma` | 1 to 5, 7 to 10, 12 to 15 |
| 11 | [Percentages, decimals, fractions](#toolkit-percentages) | `toolkit-percentages` | all |
| 12 | [Proportions and "out of"](#toolkit-proportions) | `toolkit-proportions` | 1, 6, 9 to 15 |
| 13 | [Reading a graph](#toolkit-graphs) | `toolkit-graphs` | 3 to 5, 7 to 14 |
| 14 | [Coordinates and vectors](#toolkit-vectors) | `toolkit-vectors` | 8 to 10 |
| 15 | [Absolute value and magnitude](#toolkit-absolute-value) | `toolkit-absolute-value` | 3, 6 to 10 |
| 16 | [Rounding and significant figures](#toolkit-rounding) | `toolkit-rounding` | 1 to 4, 6, 7, 9 to 12, 14, 15 |
| 17 | [Scientific notation](#toolkit-scientific-notation) | `toolkit-scientific-notation` | 1, 3, 4, 6, 7, 11, 15 |
| 18 | [Powers of two, and what a bit is](#toolkit-powers-of-two) | `toolkit-powers-of-two` | 1, 2, 5 to 7, 11, 13 |
| 19 | [Inequalities and interval notation](#toolkit-inequalities) | `toolkit-inequalities` | 1, 4, 5, 7 to 15 |
| 20 | [The Greek letters this book uses](#toolkit-greek) | `toolkit-greek` | 4, 7, 9, 12 to 14 |

Four sections inside those twenty have their own anchor as well, because chapters link straight
to them:

| Anchor to link to | Where it lives | Chapters that use it |
|---|---|---|
| `toolkit-sigma-mean` | inside 10, [the mean](#toolkit-sigma-mean) | 3, 10 |
| `toolkit-sigma-sd` | inside 10, [the standard deviation](#toolkit-sigma-sd) | 3, 6, 7, 13 |
| `toolkit-percentage-points` | inside 11, [percentage points](#toolkit-percentage-points) | 7, 9 to 15 |
| `toolkit-formula-protocol` | [how a formula is presented](#toolkit-formula-protocol) | 2, 13 |

Two more tables sit at the end of the page: a [one-page symbol summary](#toolkit-summary) of
everything in the book, and [twenty problems](#toolkit-check) with full solutions.

:::{tip} For chapter authors
Link to a section like this, in Markdown:

```
see [the Math Toolkit on sigma notation](../appendix/math-toolkit.md#toolkit-sigma)
```

The anchor names in the table above are fixed and will not change. Do not invent new ones.
:::

---

(toolkit-formula-protocol)=
## How a formula is presented in this book

Every formula in this book, here and in all fifteen chapters, arrives in the same six parts, in
the same order. Knowing the shape in advance makes each one easier to walk into.

1. **In words.** What the formula does, in a sentence with no symbols in it at all.
2. **The formula**, on its own line.
3. **The symbols.** A table with one row per symbol, including the operators, including the ones
   you already know. Three columns: the symbol, how to say it out loud, what it means.
4. **Out loud.** The whole formula read as one English sentence.
5. **Worked.** A numeric example with every step shown. Nothing skipped.
6. **Check it.** A test you can apply to your own answer, or a description of what a wrong
   answer looks like.

If you ever meet a formula in this book missing one of the six, that is a mistake in the book.
Tell your instructor.

---

(toolkit-letters)=
## 1. A letter standing for a number, and why we bother

### What it is

In mathematics a letter can stand for a number. When you see

$$p = 0.25$$

it means: the letter $p$ and the number $0.25$ are the same thing here. Wherever $p$ appears in
this discussion, you are allowed to cross it out and write $0.25$ instead.

That is the whole idea. A letter is a container. It is not a puzzle and it is not hiding
anything from you.

### The equals sign

| Symbol | Say it | What it means |
|---|---|---|
| $=$ | "equals", or "is" | the thing on the left and the thing on the right are the same number |

$=$ does not mean "now compute this." It means "these two are the same." So $3 + 4 = 7$ and
$7 = 3 + 4$ say exactly the same thing, in the way that "Bakersfield is the largest city in Kern
County" and "the largest city in Kern County is Bakersfield" say the same thing.

### Why bother

Because a letter lets you say something true about every number at once.

Suppose tacos cost \$2.50 each. You could write out a price list: one taco \$2.50, two tacos
\$5.00, three tacos \$7.50, and on forever. Or you could write one line that covers every case:

> the cost is the number of tacos times the price of one taco.

To write that down compactly you need a name for "the number of tacos" and a name for "the price
of one taco." That is what the letters are for.

The same move is what lets this book talk about a language model at all. The model
`Qwen2.5-0.5B-Instruct` contains **494,032,768 numbers** (**real**, from
`lab/out/we3_params_quant.json`). Nobody is going to write 494,032,768 separate sentences. So
the book writes one sentence about "a weight, call it $w$," and that sentence is true of all
494,032,768 of them.

### Formula 1: the cost of several identical things

**In words.** The total cost is how many you bought, multiplied by the price of one.

**The formula.**

$$C = n \times p$$

**The symbols.**

| Symbol | Say it | What it means |
|---|---|---|
| $C$ | "see" | the total cost, in dollars. The letter is chosen to remind you of "cost." |
| $=$ | "equals" | the left side and the right side are the same number |
| $n$ | "en" | how many items you bought. A whole number: 1, 2, 3 and so on. |
| $\times$ | "times", or "multiplied by" | multiply the two numbers on either side of it |
| $p$ | "pee" | the price of one item, in dollars |

**Out loud.** "C equals n times p." In full English: "the total cost equals the number of items
times the price of one item."

**Worked, with numbers made up for practice.** Four tacos at \$2.50 each.

Step 1, write down what each letter is.
$n = 4$
$p = 2.50$

Step 2, put those numbers into the formula in place of the letters.
$C = 4 \times 2.50$

Step 3, do the multiplication.
$C = 10.00$

Four tacos cost \$10.00.

**Check it.** The answer has to be bigger than the price of one taco and smaller than the price
of a hundred tacos. If you got \$0.625 you divided instead of multiplying. If you got \$6.50 you
added instead of multiplying.

### Letters used for a fixed number

Most letters stand for a number that could change. Two letters in this book stand for a number
that never changes, no matter what:

| Symbol | Say it | Its value | Where you meet it |
|---|---|---|---|
| $e$ | "e" | $2.718282\ldots$ | Chapter 4, softmax. [Section 7](#toolkit-e). |
| $\pi$ | "pie" | $3.141593\ldots$ | angles and circles. [Section 20](#toolkit-greek). |

These are the same kind of thing as the letter $n$ above, with one difference: they are already
filled in. $e$ is a specific number in the same way that 7 is a specific number. It has a letter
because writing $2.718281828459045\ldots$ every time would be unbearable.

:::{warning} A trap worth naming
$e$ is not a variable, and it is not a typo for something else. When you see $e^{2}$ in
Chapter 4, that means $2.718282$ raised to the power 2, which is one specific number,
$7.389056$. Nothing has been left off the page.
:::

### What goes wrong

**Assuming a letter means the same thing everywhere.** It does not. $n$ means "number of tacos"
above, and "number of questions on a test" in Chapter 11. A chapter always tells you what its
letters mean before it uses them. If you cannot find the definition, that is a defect in the
chapter, not a gap in you.

**Reading $ab$ as a word.** Two letters side by side means multiply them. See
[Section 3](#toolkit-multiplication).

**Trying to "solve for" the letter.** Most of the time this book is not asking you to solve
anything. It is handing you a recipe, and the letters are the ingredients.

---

(toolkit-subscripts)=
## 2. Subscripts: $z_1$, $z_2$, $z_i$

### What it is

A **subscript** is a small number or letter written low and to the right of another letter:

$$z_1 \qquad z_2 \qquad z_3 \qquad z_i$$

It is a house number. The letter $z$ names the street, and the subscript says which house on it.

| Written | Say it | What it means |
|---|---|---|
| $z_1$ | "z sub one", or "z one" | the first $z$ |
| $z_2$ | "z sub two" | the second $z$ |
| $z_3$ | "z sub three" | the third $z$ |
| $z_i$ | "z sub eye" | the $i$-th $z$, where $i$ is whichever house number you care about right now |
| $z_n$ | "z sub en" | the last one, if there are $n$ of them |

The name for the small letter itself is **index**. In $z_i$, the letter $i$ is the index.

### Why it exists

Because you often have a long list of numbers that are all the same kind of thing, and you need
to talk about them one at a time without inventing a new letter for each.

Here is a **real** list. When you type `The capital of France is` into
`Qwen2.5-0.5B-Instruct`, the model produces one score for every word it could say next. The
eight highest scores were these (**real**, from `lab/out/we2_softmax.json`):

| Subscript | Word the score belongs to | The score |
|---|---|---|
| $z_1$ | `' Paris'` | 17.2173 |
| $z_2$ | `' ______'` | 16.3196 |
| $z_3$ | `':\n'` | 15.6955 |
| $z_4$ | `':\n\n'` | 15.5711 |
| $z_5$ | `' __'` | 15.3869 |
| $z_6$ | `' ____'` | 15.3036 |
| $z_7$ | `' located'` | 15.2772 |
| $z_8$ | `' the'` | 15.0482 |

That list does not stop at eight. It runs to **151,936** entries, one for every token in the
model's vocabulary. Without subscripts you would need 151,936 different letters, and the Latin
and Greek alphabets together give you about fifty.

The book calls these scores **logits**. Chapter 4 explains where they come from.

### Worked example, with real numbers

Work out the gap between the model's first and second choices.

Step 1, read the two values off the table.
$z_1 = 17.2173$
$z_2 = 16.3196$

Step 2, subtract the second from the first.
$z_1 - z_2 = 17.2173 - 16.3196$

Step 3, do the subtraction.
$17.2173 - 16.3196 = 0.8977$

The gap is $0.8977$. That one number decides how much more likely `' Paris'` is than
`' ______'`, and Chapter 4 turns it into the answer "2.4538 times as likely."

**Check it.** $z_1$ is the biggest score in the list, so $z_1 - z_2$ has to come out positive. A
negative answer means you subtracted the wrong way round.

### A subscript is not an exponent

This is the most common mix-up on this page, so it gets its own table.

| Written | Say it | What it means | Value when $z = 3$ |
|---|---|---|---|
| $z_2$ | "z sub two" | the second item in a list called $z$ | whatever the second item happens to be |
| $z^2$ | "z squared", or "z to the two" | $z$ multiplied by itself: $3 \times 3$ | 9 |

Low and small means "which one." High and small means "multiply it by itself this many times."
Exponents get [Section 5](#toolkit-exponents).

### Two subscripts at once

Sometimes a number sits in a grid rather than a list, and then it needs two house numbers:

$$W_{3,5}$$

says "the number in row 3, column 5 of the grid called $W$." Rows first, then columns, always.

This shows up in Chapter 3. One **real** grid inside `Qwen2.5-0.5B-Instruct` has 896 rows and
896 columns, so it holds 802,816 numbers, and $W_{3,5}$ is one of them (**real**, from
`lab/out/we3_params_quant.json`).

### What goes wrong

**Reading $z_1$ as "z times 1."** It is not a multiplication. There is no operation happening at
all. It is a name.

**Losing track of where the counting starts.** This book starts its lists at 1, so $z_1$ is the
first item. Python, the programming language used in the code cells, starts at 0, so the first
item is `z[0]`. That mismatch is a genuine nuisance, and every chapter that has both will point
it out at the moment it matters.

---

(toolkit-multiplication)=
## 3. Multiplication, written four ways

### What it is

Multiplication has four different written forms in this book. They all mean the same thing.

| Written | Say it | What it means |
|---|---|---|
| $3 \times 4$ | "three times four" | multiply 3 by 4. Result 12. |
| $3 \cdot 4$ | "three times four" | multiply 3 by 4. Result 12. The dot is raised to the middle of the line so it is not mistaken for a decimal point. |
| $3(4)$ | "three times four" | multiply 3 by 4. Result 12. Brackets touching a number mean multiply. |
| $ab$ | "a times b" | multiply the number $a$ by the number $b$. Two letters written together, with nothing between them, means multiply. |

Why four? History, mostly. The $\times$ sign is clear, but it looks like the letter x, which
becomes a problem once letters start standing for numbers. So mathematics quietly dropped it and
started writing $3 \cdot 4$, or $3(4)$, or nothing at all.

In the Python code in this book, multiplication is always written `*`, because a keyboard has no
$\times$ key and a computer cannot guess what $ab$ is supposed to mean.

### Worked example, with real numbers

The vocabulary table inside `Qwen2.5-0.5B-Instruct` is a grid with one row for each of its
151,936 tokens and 896 columns. How many numbers is that?

Step 1, write the multiplication.
$151{,}936 \times 896$

Step 2, break it into pieces you can do one at a time. Notice that $896 = 900 - 4$.
$151{,}936 \times 900 = 136{,}742{,}400$
$151{,}936 \times 4 = 607{,}744$

Step 3, subtract the second from the first.
$136{,}742{,}400 - 607{,}744 = 136{,}134{,}656$

So the vocabulary table holds **136,134,656** numbers. The whole model holds 494,032,768
(**real**, from `lab/out/we3_params_quant.json`).

**Check it.** Round both numbers and multiply the round versions:
$150{,}000 \times 900 = 135{,}000{,}000$. Your exact answer should land near that. It did.
Rounding first is the fastest way to catch a slipped digit, and it is worth doing every time.

### What goes wrong

**Reading $3(4)$ as "three, then four."** It is $12$.

**Reading $ab$ as a two-letter name.** It is $a$ times $b$. When a book wants a two-letter name
it writes it in a different typeface, like $\text{rate}$, or spells the whole word out.

**Confusing $\cdot$ with a decimal point.** The multiplication dot sits at mid-height:
$3 \cdot 4 = 12$. The decimal point sits on the line: $3.4$, which is a number between 3 and 4.
Where there is any risk of confusion, this book writes $\times$.

---

(toolkit-fraction-bar)=
## 4. The fraction bar is division

### What it is

A horizontal bar between two numbers means divide the top by the bottom.

$$\frac{6}{2} = 3$$

Three ways of writing the same instruction:

| Written | Say it | What it means |
|---|---|---|
| $\dfrac{6}{2}$ | "six over two", or "six divided by two" | divide 6 by 2 |
| $6 \div 2$ | "six divided by two" | divide 6 by 2 |
| $6/2$ | "six over two" | divide 6 by 2. This is the form used inside a sentence, and the form Python uses. |

The top of a fraction is the **numerator**. The bottom is the **denominator**. You do not have
to memorise those two words, but statisticians say them constantly, so they are worth knowing.

### The bar has invisible brackets

This matters more than anything else in this section.

The bar groups everything above it and everything below it. Finish the top, finish the bottom,
then divide once, at the end.

$$\frac{2 + 4}{3} = \frac{6}{3} = 2$$

That is not the same as $2 + 4/3$, which comes to $2 + 1.333 = 3.333$. The bar did work that you
have to do with brackets when you type it on one line: `(2 + 4) / 3`.

Chapter 4 leans on this. The softmax formula has a whole long sum underneath the bar, and every
term in that sum has to be added up before you divide even once.

### Worked example, with real numbers

The vocabulary table holds 136,134,656 numbers. The whole model holds 494,032,768. What share of
the model is the vocabulary table?

Step 1, write it as a fraction. Part on top, whole underneath.

$$\frac{136{,}134{,}656}{494{,}032{,}768}$$

Step 2, divide. On a calculator: type 136134656, press divide, type 494032768, press equals.
$136{,}134{,}656 \div 494{,}032{,}768 = 0.275558$

Step 3, turn the decimal into a percentage by multiplying by 100. See
[Section 11](#toolkit-percentages).
$0.275558 \times 100 = 27.5558$

So **27.56%** of this model is a lookup table for words (**real**, from
`lab/out/we3_params_quant.json`). All of the attention machinery, which is the part everyone
writes about, is 8.92%.

**Check it.** A part divided by a whole has to land between 0 and 1. If you get a number bigger
than 1, you divided the whole by the part. Here 0.2756 is a bit more than a quarter, and a
quarter of 494 million is about 123 million, which is close to the 136 million on top. Right
neighbourhood.

### Dividing by zero

You cannot. $\frac{5}{0}$ is not a number, and no calculator will give you one; it returns an
error. This matters in Chapter 9, where cosine similarity divides by the length of a vector, and
a vector of all zeros has length zero. Chapter 9 says what to do about it.

### What goes wrong

**Dividing the wrong way round.** "A out of B" is always $A/B$. Five questions right out of
twenty is $5/20 = 0.25$, not $20/5 = 4$. A proportion above 1 is the warning sign.

**Forgetting the invisible brackets.** If your calculator has no fraction key, put brackets round
the whole top and brackets round the whole bottom before you divide.

---

(toolkit-exponents)=
## 5. Exponents

### What it is

A small number written high and to the right means "multiply the big number by itself this many
times."

$$2^3 = 2 \times 2 \times 2 = 8$$

| Written | Say it | What it means | Value |
|---|---|---|---|
| $2^1$ | "two to the one" | one 2 | 2 |
| $2^2$ | "two squared", or "two to the two" | $2 \times 2$ | 4 |
| $2^3$ | "two cubed", or "two to the three" | $2 \times 2 \times 2$ | 8 |
| $2^{10}$ | "two to the ten" | ten 2s multiplied together | 1024 |

The big number at the bottom is the **base**. The small number up top is the **exponent**, also
called the **power**. "Two to the power of three" and "two to the three" are the same phrase.

### Formula 2: a number raised to a whole-number power

**In words.** Write the base down that many times, with multiplication signs between them, and
work it out.

**The formula.**

$$a^n = \underbrace{a \times a \times \cdots \times a}_{n \text{ copies of } a}$$

**The symbols.**

| Symbol | Say it | What it means |
|---|---|---|
| $a$ | "ay" | the base. The number being multiplied by itself. |
| $n$ | "en" | the exponent. How many copies of $a$ to multiply together. A whole number, for now. |
| $a^n$ | "a to the n" | the result |
| $\times$ | "times" | multiply |
| $\cdots$ | "and so on" | the pattern continues; the writer is saving space |
| the brace underneath | "with n copies of a" | a label saying how many things are in the row above it |

**Out loud.** "a to the n means a multiplied by itself, n times over."

**Worked, with numbers made up for practice.** Compute $2^{10}$ the slow way, because the slow
way is the one that shows you what is happening.

$2^1 = 2$
$2^2 = 2 \times 2 = 4$
$2^3 = 4 \times 2 = 8$
$2^4 = 8 \times 2 = 16$
$2^5 = 16 \times 2 = 32$
$2^6 = 32 \times 2 = 64$
$2^7 = 64 \times 2 = 128$
$2^8 = 128 \times 2 = 256$
$2^9 = 256 \times 2 = 512$
$2^{10} = 512 \times 2 = 1024$

Each line is the line above it, doubled. Ten doublings takes you from 2 to 1024.

**Check it.** Every step up the ladder doubles the value. If two of your lines are not a factor
of two apart, the slip is at that line. On a calculator, look for a key marked `x^y` or `y^x` or
`^`: type 2, that key, 10, equals. You should see 1024.

### Why $2^0 = 1$

This is the step most people want a reason for, so here is the reason.

Read the ladder above from the bottom up instead of the top down. Each step down divides by 2.

$2^3 = 8$
$2^2 = 4$, which is $8 \div 2$
$2^1 = 2$, which is $4 \div 2$
$2^0 = ?$, which must be $2 \div 2$

$2 \div 2 = 1$. So $2^0 = 1$.

The same argument works for any base. $10^0 = 1$. $7^0 = 1$. The rule holds for every base
except zero itself, where the ladder has nothing to stand on and $0^0$ is left undefined.

$2^0 = 1$ is not a special exception someone bolted on. It is what the pattern already says. And
it is load-bearing in Chapter 4, where $e^0 = 1$ shows up in the very first softmax you compute
by hand.

### What goes wrong

**Reading $2^3$ as $2 \times 3$.** It is $8$, not $6$. The exponent counts how many copies, it is
not one of the things being multiplied.

**Reading $2^3$ as $3^2$.** Those are different: $2^3 = 8$ and $3^2 = 9$. Base first, exponent
second.

**Expecting $2^{10}$ to be near 20.** Exponents grow fast, and that speed is the reason
Chapter 6 can store a model in far fewer bytes than you would guess.

---

(toolkit-negative-exponents)=
## 6. Negative exponents

### What it is

A minus sign in the exponent means "one divided by."

$$2^{-1} = \frac{1}{2^{1}} = \frac{1}{2} = 0.5$$

| Written | Say it | What it means | Value |
|---|---|---|---|
| $2^{-1}$ | "two to the minus one" | $1 \div 2$ | 0.5 |
| $2^{-2}$ | "two to the minus two" | $1 \div 4$ | 0.25 |
| $2^{-3}$ | "two to the minus three" | $1 \div 8$ | 0.125 |
| $10^{-3}$ | "ten to the minus three" | $1 \div 1000$ | 0.001 |

### Formula 3: a negative exponent

**In words.** A negative exponent means take the positive version and put it underneath a one.

**The formula.**

$$a^{-n} = \frac{1}{a^{n}}$$

**The symbols.**

| Symbol | Say it | What it means |
|---|---|---|
| $a$ | "ay" | the base, the number being raised to a power |
| $-n$ | "minus en" | a negative exponent. The minus sign is the instruction. |
| $a^{-n}$ | "a to the minus n" | the result, always a positive number if $a$ is positive |
| $1$ | "one" | the number one, sitting on top of the fraction |
| the fraction bar | "divided by" | divide the top by the bottom |
| $a^n$ | "a to the n" | the ordinary positive-exponent version, from [Section 5](#toolkit-exponents) |

**Out loud.** "a to the minus n equals one over a to the n."

**Worked, with numbers made up for practice.** Compute $2^{-4}$.

Step 1, drop the minus sign and work out the positive version.
$2^{4} = 2 \times 2 \times 2 \times 2 = 16$

Step 2, put that underneath a 1.
$2^{-4} = \dfrac{1}{16}$

Step 3, do the division to get a decimal.
$1 \div 16 = 0.0625$

**Check it.** A negative exponent on a base bigger than 1 always gives an answer between 0 and
1. If your answer is bigger than 1, the minus sign got lost. And $2^{-4} = 0.0625$ should be
smaller than $2^{-3} = 0.125$, because you divided by a bigger number. It is.

### Why it works, from the ladder

Keep walking down the ladder in [Section 5](#toolkit-exponents), dividing by 2 each time.

$2^{2} = 4$
$2^{1} = 2$
$2^{0} = 1$
$2^{-1} = 1 \div 2 = 0.5$
$2^{-2} = 0.5 \div 2 = 0.25$
$2^{-3} = 0.25 \div 2 = 0.125$

Nothing new happened at zero. The pattern carried straight on through it.

### Where this book uses it

Chapter 6 stores numbers inside a computer, and a computer stores a fraction as a sum of
negative powers of two. The number $0.75$, for instance, is $2^{-1} + 2^{-2}$, which is
$0.5 + 0.25$. That is the reason Chapter 6 can tell you exactly which numbers a computer can
hold and which ones it can only approximate.

Negative exponents also appear in scientific notation, where $1.69 \times 10^{-5}$ is a compact
way of writing $0.0000169$. See [Section 17](#toolkit-scientific-notation).

---

(toolkit-e)=
## 7. The number $e$, and what $e^x$ means

### What it is

$e$ is a fixed number:

$$e = 2.718281828459045\ldots$$

The dots mean the decimals carry on forever without repeating, the same way $\pi$'s do. For
every calculation in this book, $e = 2.718282$ is close enough.

| Symbol | Say it | What it means |
|---|---|---|
| $e$ | "e" | the fixed number $2.718282\ldots$ |
| $e^x$ | "e to the x" | $e$ raised to the power $x$ |
| $\exp(x)$ | "exp of x" | exactly the same thing as $e^x$. This is what the button on a calculator is usually called. |
| $\ldots$ | "and so on" | the decimals continue |

$e$ is not standing in for anything you are supposed to work out. It is a number, in the way
that 7 is a number. It has a letter because nobody wants to write 2.718281828459045 repeatedly.

### Where it is on a calculator

- **Phone calculator**, iPhone or Android: turn the phone sideways to get the scientific keypad.
  Look for a key marked `e^x`. On some phones it is the second function of the `ln` key, so you
  press `2nd` or `Shift` first.
- **Windows Calculator**: switch to Scientific mode from the menu, then use the `e^x` key.
- **A physical scientific calculator**: `e^x` is nearly always printed above the `ln` key.
- **Google**: type `e^2` into the search box.
- **Python**, which this book uses: `import math` then `math.exp(2)`.

A quick test that you have found the right key: enter 1. You should get $2.718282$. Enter 0. You
should get exactly 1.

### Formula 4: the exponential function

**In words.** Take the fixed number 2.718282 and raise it to whatever power you are given.

**The formula.**

$$y = e^{x}$$

**The symbols.**

| Symbol | Say it | What it means |
|---|---|---|
| $y$ | "why" | the answer, always a positive number |
| $=$ | "equals" | the two sides are the same number |
| $e$ | "e" | the fixed number $2.718282\ldots$ |
| $x$ | "ex" | the exponent. Any number at all: positive, zero, negative, whole or not. |
| $e^x$ | "e to the x" | $e$ raised to the power $x$ |

**Out loud.** "y equals e to the x," or in full, "y is the number 2.718282 raised to the power
x."

**Worked, with numbers made up for practice.** The three values that Chapter 4 uses in its first
softmax, computed from the scores 2, 1 and 0.

Step 1, $e^{2}$. Press `e^x`, enter 2.
$e^{2} = 7.389056$

Step 2, $e^{1}$. This is $e$ itself.
$e^{1} = 2.718282$

Step 3, $e^{0}$. Any number to the power zero is 1, from [Section 5](#toolkit-exponents).
$e^{0} = 1.000000$

Step 4, add them, because softmax is going to need the total.
$7.389056 + 2.718282 + 1.000000 = 11.107338$

**Check it.** Three sanity tests, in order of usefulness:

- $e^{x}$ is **always positive**, whatever $x$ is. A negative answer means a slip.
- $e^{0} = 1$ exactly, and $e^{1} = 2.718282$. If your calculator disagrees on either, you are
  on the wrong key.
- Bigger $x$ gives bigger $e^{x}$, always. If your list is not in the same order as your inputs,
  check the arithmetic.

### What $e^x$ does to differences

There is one property worth meeting now, because Chapter 4 is built on it. Raising $e$ to a
power turns **differences into ratios**.

Here it is with the **real** numbers from the lab. The top two logits were $z_1 = 17.2173$ for
`' Paris'` and $z_2 = 16.3196$ for `' ______'` (**real**, `lab/out/we2_softmax.json`).

Step 1, take the difference.
$17.2173 - 16.3196 = 0.8977$

Step 2, raise $e$ to that difference.
$e^{0.8977} = 2.4538$

Step 3, compare that with the two probabilities the model actually assigned, which were
$30.219\%$ and $12.315\%$ (**real**, same file).
$0.30219 \div 0.12315 = 2.4538$

The two agree to four decimal places. A gap of 0.8977 in the scores is exactly a factor of
2.4538 in the probabilities. Chapter 4 explains why that has to happen.

### What goes wrong

**Reading $e^2$ as $e \times 2$.** That would be 5.437. It is 7.389056.

**Using the `EXP` or `EE` key by mistake.** On many calculators `EXP` or `EE` means "times ten
to the power of", for scientific notation, which is
[Section 17](#toolkit-scientific-notation). It is a different key from `e^x` and it will give
you a wildly wrong answer. Test with $e^1 = 2.718282$ before you trust a key.

---

(toolkit-logarithms)=
## 8. Logarithms: the reverse of an exponent

### What it is

A logarithm answers one question: **what exponent was used?**

Exponents go one way:

> "2 raised to the power 3 is 8."

Logarithms go back the other way:

> "To get 8 from 2, the exponent you need is 3."

Written down, that second sentence is

$$\log_2(8) = 3$$

| Written | Say it | What it means |
|---|---|---|
| $\log$ | "log" | short for logarithm. It asks for an exponent. |
| $\log_2$ | "log base two" | the small 2 is the **base**: the number being raised to a power |
| $\log_2(8)$ | "log base two of eight" | the exponent that turns 2 into 8 |
| $(\ )$ | "of" | brackets holding the number you are asking about |

### Formula 5: the definition of a logarithm

**In words.** The log base two of a number is the power you have to raise two to in order to get
that number.

**The formula.**

$$\log_2(x) = y \quad \text{means exactly the same as} \quad 2^{y} = x$$

**The symbols.**

| Symbol | Say it | What it means |
|---|---|---|
| $\log_2$ | "log base two" | asks: two to what power? |
| $x$ | "ex" | the number you have. Must be greater than zero. |
| $y$ | "why" | the exponent, which is the answer |
| $=$ | "equals" | the two sides are the same number |
| $2^{y}$ | "two to the y" | two raised to the power $y$, from [Section 5](#toolkit-exponents) |

**Out loud.** "Log base two of x equals y" says the same thing as "two raised to the power y
equals x." They are one fact written in two directions.

**Worked, with numbers made up for practice.** Compute $\log_2(1024)$.

Step 1, ask the question in plain words. Two to what power gives 1024?

Step 2, climb the doubling ladder from [Section 5](#toolkit-exponents) and count the steps.
$2^1 = 2$
$2^2 = 4$
$2^3 = 8$
$2^4 = 16$
$2^5 = 32$
$2^6 = 64$
$2^7 = 128$
$2^8 = 256$
$2^9 = 512$
$2^{10} = 1024$

Step 3, read off the exponent that landed on 1024. It is 10.
$\log_2(1024) = 10$

**Check it.** Put the answer back through the exponent: $2^{10}$ should equal your starting
number. $2^{10} = 1024$. It does. That reverse check works on every logarithm and it is the
fastest way to catch a mistake.

### Doing it on a calculator that has no $\log_2$ key

Most calculators have `log` (base 10) and `ln` (base $e$) but no base-2 key. Either one gets you
there:

$$\log_2(x) = \frac{\log(x)}{\log(2)}$$

**Worked, with numbers made up for practice.** $\log_2(1024)$ again, this time with the base-10
key.

Step 1, take the log of the top number.
$\log(1024) = 3.010300$

Step 2, take the log of 2.
$\log(2) = 0.301030$

Step 3, divide.
$3.010300 \div 0.301030 = 10.000000$

Same answer, 10. In Python this book writes `math.log2(1024)`, which does it in one step.

### What logarithms do to size

A logarithm shrinks big numbers down to manageable ones.

| $x$ | $\log_2(x)$ | In words |
|---|---|---|
| 1 | 0 | $2^0 = 1$ |
| 2 | 1 | |
| 8 | 3 | |
| 1,024 | 10 | |
| 1,048,576 | 20 | a million turns into 20 |
| 151,936 | 17.213 | the vocabulary of our model needs about 17.2 bits |

That last row is why a logarithm belongs in this book. Chapter 5 measures how uncertain the
model is, and the natural unit for uncertainty is **bits**, which is a base-2 logarithm. A
number as big as 151,936 turns into a number as small as 17.213, which you can hold in your head
and compare against another.

### Three rules that catch mistakes

| If $x$ is | then $\log_2(x)$ is | Example |
|---|---|---|
| bigger than 1 | positive | $\log_2(8) = 3$ |
| exactly 1 | zero | $\log_2(1) = 0$ |
| between 0 and 1 | negative | $\log_2(0.5) = -1$ |
| zero or negative | undefined; the calculator returns an error | $\log_2(0)$ has no answer |

That third row surprises people, so here is why. $\log_2(0.5)$ asks "two to what power gives
0.5?" From [Section 6](#toolkit-negative-exponents), $2^{-1} = 0.5$. The exponent is $-1$. All
probabilities are between 0 and 1, so **every logarithm of a probability comes out negative.**
Chapter 5 puts a minus sign in front of the entropy formula for exactly that reason, and
[Section 10.4](#toolkit-sigma) shows the arithmetic.

### What goes wrong

**Pressing `log` and getting a different answer.** The plain `log` key is base 10 on nearly every
calculator, and `ln` is base $e$. If you want base 2, either use the division trick above or use
a `log2` function. Test yourself: $\log_2(8)$ must be 3. If your key gives 0.903, that is base
10, and 0.903 is $\log_{10}(8)$.

**Expecting a logarithm of a negative number.** There is no exponent you can put on 2 that
produces a negative answer, so there is no logarithm of a negative number. Your calculator will
say so.

---

(toolkit-square-roots)=
## 9. Square roots, and why standard deviation has one

### What it is

A square root undoes a squaring.

$$\sqrt{9} = 3 \qquad \text{because} \qquad 3 \times 3 = 9$$

| Symbol | Say it | What it means |
|---|---|---|
| $\sqrt{\ \ }$ | "the square root of" | what number, multiplied by itself, gives the number inside? |
| $\sqrt{9}$ | "square root of nine", or "root nine" | 3 |
| $3^2$ | "three squared" | $3 \times 3 = 9$. The square root is this operation run backwards. |

The long bar over the top of the number is part of the symbol. Everything under the bar goes
inside the root, exactly like the invisible brackets on a fraction bar in
[Section 4](#toolkit-fraction-bar). So $\sqrt{9 + 16} = \sqrt{25} = 5$, which is not the same as
$\sqrt{9} + \sqrt{16} = 3 + 4 = 7$.

### Some square roots are tidy and most are not

| Number | Square root | Exact? |
|---|---|---|
| 1 | 1 | yes |
| 4 | 2 | yes |
| 9 | 3 | yes |
| 16 | 4 | yes |
| 25 | 5 | yes |
| 100 | 10 | yes |
| 2 | 1.414214 | no, the decimals run on forever |
| 0.016 | 0.126491 | no |

On a calculator the key is marked $\sqrt{\ }$ and usually sits near the division key. On a phone,
turn it sideways for the scientific keypad.

### Why standard deviation has a square root in it

Here is the reason, in plain terms, before any formula.

A **standard deviation** is one number that says how spread out a list of numbers is. To build
it you measure how far each value sits from the average. Some of those distances are positive
and some are negative, and if you added them up as they stand they would cancel out and always give
zero, which tells you nothing.

The fix is to **square** every distance first. Squaring turns every negative into a positive, so
nothing cancels.

But squaring has a side effect. If your numbers were measured in joules, squaring them gives you
joules squared, which is not a unit anybody wants. The average of those squares is a number in
the wrong units and on the wrong scale.

So at the very end you take the **square root**, which undoes the squaring and puts the answer
back into the original units. A standard deviation of 0.066741 is in the same units as the
weights it describes, and you can compare it against them directly.

**Square first so nothing cancels, square root last so the units come back.** That is the whole
story, and [Section 10.3](#toolkit-sigma) does the arithmetic.

### Formula 6: the standard error of a proportion

Here is a formula from Chapter 12 that uses a square root and needs nothing else on this page
yet.

**In words.** The standard error of an accuracy score says how much that score would wobble if
you had asked a different set of questions of the same size.

**The formula.**

$$SE = \sqrt{\frac{\hat{p}\,(1 - \hat{p})}{n}}$$

**The symbols.**

| Symbol | Say it | What it means |
|---|---|---|
| $SE$ | "the standard error" | the answer: how much the score would move, in the same units as the score |
| $=$ | "equals" | the two sides are the same number |
| $\sqrt{\ \ }$ | "the square root of" | applies to everything under the long bar |
| $\hat{p}$ | "p-hat" | the accuracy you measured, as a decimal between 0 and 1. The little hat means "measured", not "true". |
| $1 - \hat{p}$ | "one minus p-hat" | the share you got wrong |
| $(\ )$ | brackets | do what is inside first |
| the fraction bar | "divided by" | divide the top by the bottom |
| $n$ | "en" | how many questions were on the test |

**Out loud.** "The standard error is the square root of p-hat times one minus p-hat, all divided
by n."

**Worked, with real numbers.** In the lab, `Qwen2.5-0.5B-Instruct` answered 5 of 20 questions
correctly on the course's statistics bank, so $\hat{p} = 0.25$ and $n = 20$ (**real**, from
`lab/out/we6_eval.json`).

Step 1, work out $1 - \hat{p}$.
$1 - 0.25 = 0.75$

Step 2, multiply the two.
$0.25 \times 0.75 = 0.1875$

Step 3, divide by $n$.
$0.1875 \div 20 = 0.009375$

Step 4, take the square root.
$\sqrt{0.009375} = 0.0968$

The standard error is $0.0968$, which is 9.68 percentage points. A score of 25% that could
easily have been 15% or 35% is not a score you should report on its own, and Chapter 12 is about
what to report instead.

**Check it.** The standard error must be a positive number smaller than the accuracy scale
itself. Two more tests: it gets smaller as $n$ gets bigger, and it is largest when
$\hat{p} = 0.5$. If you take the square root and get something bigger than the number you
started with, check whether that number was less than 1. The square root of a number between 0
and 1 is always bigger than the number, which is correct and often surprising:
$\sqrt{0.009375} = 0.0968$, and $0.0968$ is bigger than $0.009375$.

### What goes wrong

**Splitting a root across a plus sign.** $\sqrt{9 + 16} = 5$, and $\sqrt{9} + \sqrt{16} = 7$.
Finish everything under the bar before you press the root key.

**Taking the root of a negative number.** There is no ordinary number that multiplies by itself
to give a negative, so your calculator will report an error. If you are computing a standard
error and land under a root sign with a negative number, the mistake happened earlier.

---

(toolkit-sigma)=
## 10. Sigma notation: "add these up"

This is the symbol that stops more readers than any other in the book, so it gets built in four
steps, from an English sentence to the real formula.

### Step 1: the English sentence

You have five numbers and you want their total. In English:

> add them all up.

### Step 2: write them out

$$3 + 1 + 4 + 1 + 5 = 14$$

That works. It stops working when there are 151,936 numbers.

### Step 3: give the list a name and use subscripts

Call the list $x$, and number the entries with subscripts from
[Section 2](#toolkit-subscripts):

$$x_1 = 3, \quad x_2 = 1, \quad x_3 = 4, \quad x_4 = 1, \quad x_5 = 5$$

Now the total is

$$x_1 + x_2 + x_3 + x_4 + x_5$$

Better, because it no longer mentions the actual values. But it still writes out every term.

### Step 4: the sigma

$$\sum_{i=1}^{5} x_i$$

That is the same total, written once. Read it as: "add up $x_i$, starting at $i = 1$ and
stopping at $i = 5$."

### The anatomy of the symbol

The symbol has four parts and they are always in the same places.

| Part | Where it sits | Say it | What it means |
|---|---|---|---|
| $\sum$ | the big shape in the middle | "the sum of", or "sigma" | add up whatever comes after me. It is the capital Greek letter sigma, chosen because "sigma" starts with the same sound as "sum". |
| $i = 1$ | underneath | "starting at i equals one" | the counter is called $i$, and it starts at 1 |
| $5$ | on top | "up to five" | the counter stops at 5 |
| $x_i$ | to the right | "x sub i" | the thing being added. See [Section 2](#toolkit-subscripts). |

To expand a sigma back into a plain sum, write out the thing on the right once for each value
the counter takes, and put plus signs between them.

$$\sum_{i=1}^{5} x_i = x_1 + x_2 + x_3 + x_4 + x_5$$

Nothing more is happening. Every sigma in this book can be unfolded that way, and when a sigma
confuses you, unfolding it is the move.

:::{tip} A different letter changes nothing
$\sum_{i=1}^{5} x_i$ and $\sum_{j=1}^{5} x_j$ mean the same total. The counter's name is
private to the sum. Chapter 4 uses $j$ for the counter in softmax's denominator while $i$ is
already in use for the token being asked about, and that is the only reason for the switch.
:::

(toolkit-sigma-general)=
### Formula 7: the general sum

**In words.** Add up every number in a list, from the first to the last.

**The formula.**

$$\sum_{i=1}^{n} x_i$$

**The symbols.**

| Symbol | Say it | What it means |
|---|---|---|
| $\sum$ | "the sum of" | add up everything that follows |
| $i$ | "eye" | the counter. It takes the value 1, then 2, then 3, and so on. |
| $i = 1$ | "i equals one", written below the sigma | where the counter starts |
| $n$ | "en", written above the sigma | where the counter stops. Also the number of items in the list. |
| $x_i$ | "x sub i" | the $i$-th number in the list |

**Out loud.** "The sum, from i equals one to n, of x sub i." In full English: "add up all the
numbers in the list $x$, from the first to the last."

**Worked, with numbers made up for practice.** Take the five numbers 3, 1, 4, 1, 5, so $n = 5$.

Step 1, unfold the sigma.
$\sum_{i=1}^{5} x_i = x_1 + x_2 + x_3 + x_4 + x_5$

Step 2, put in the values.
$= 3 + 1 + 4 + 1 + 5$

Step 3, add them one at a time, left to right.
$3 + 1 = 4$
$4 + 4 = 8$
$8 + 1 = 9$
$9 + 5 = 14$

$$\sum_{i=1}^{5} x_i = 14$$

**Check it.** The total has to be at least as big as the largest single number, which is 5, and
no bigger than 5 times the largest, which is 25. Fourteen sits inside that range. If your total
is smaller than the biggest number in your list, you dropped a term.

(toolkit-sigma-mean)=
### Formula 8: the mean

**In words.** The average of a list of numbers is their total, shared out equally among them.

**The formula.**

$$\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i$$

**The symbols.**

| Symbol | Say it | What it means |
|---|---|---|
| $\bar{x}$ | "x-bar" | the average of the list. The bar on top means "the average of". |
| $=$ | "equals" | the two sides are the same number |
| $\dfrac{1}{n}$ | "one over n" | multiplying by one over $n$ is the same as dividing by $n$ |
| $n$ | "en" | how many numbers are in the list |
| $\sum_{i=1}^{n} x_i$ | "the sum from i equals one to n of x sub i" | the total, from Formula 7 |

**Out loud.** "x-bar equals one over n, times the sum of all the x values." In plain English:
"the average is the total divided by how many there are."

**Worked, with numbers made up for practice.** The same five numbers, 3, 1, 4, 1, 5.

Step 1, find the total.
$3 + 1 + 4 + 1 + 5 = 14$

Step 2, count how many numbers there are.
$n = 5$

Step 3, divide.
$14 \div 5 = 2.8$

$$\bar{x} = 2.8$$

**Check it.** An average always lands between the smallest and largest values in the list. The
smallest here is 1 and the largest is 5, and 2.8 sits between them. An average outside that range
means either the total or the count is wrong.

(toolkit-sigma-sd)=
### Formula 9: the standard deviation

This is the formula that uses everything so far: subscripts, sigma, a fraction bar and a square
root. It is the longest formula on this page, and you can walk through it one piece at a time.

**In words.** The standard deviation is a typical distance from the average. Measure how far each
value is from the average, square those distances so the negatives do not cancel, average the
squares, then take a square root to undo the squaring.

**The formula.**

$$s = \sqrt{\frac{1}{n-1}\sum_{i=1}^{n}\left(x_i - \bar{x}\right)^2}$$

**The symbols.**

| Symbol | Say it | What it means |
|---|---|---|
| $s$ | "ess" | the standard deviation, in the same units as the original numbers |
| $\sqrt{\ \ }$ | "the square root of" | applies to everything under the long bar |
| $n$ | "en" | how many numbers are in the list |
| $n - 1$ | "en minus one" | one less than the count. Statisticians divide by this rather than $n$ when the list is a sample. Chapter 12 says why. |
| $\sum_{i=1}^{n}$ | "the sum from i equals one to n" | add up what comes next, once for each item |
| $x_i$ | "x sub i" | the $i$-th number in the list |
| $\bar{x}$ | "x-bar" | the average, from Formula 8 |
| $x_i - \bar{x}$ | "x sub i minus x-bar" | how far this value is from the average. Negative when the value is below average. |
| $(\ )^2$ | "all squared" | multiply the bracket by itself. Brackets first, then square. |

**Out loud.** "s is the square root of, one over n minus one, times the sum of each value minus
the average, all squared."

**Worked, with numbers made up for practice.** The same five numbers: 3, 1, 4, 1, 5.

Step 1, find the average. From Formula 8, $\bar{x} = 2.8$.

Step 2, subtract the average from each number.
$3 - 2.8 = 0.2$
$1 - 2.8 = -1.8$
$4 - 2.8 = 1.2$
$1 - 2.8 = -1.8$
$5 - 2.8 = 2.2$

Step 3, square each of those. Squaring makes every one positive.
$0.2 \times 0.2 = 0.04$
$-1.8 \times -1.8 = 3.24$
$1.2 \times 1.2 = 1.44$
$-1.8 \times -1.8 = 3.24$
$2.2 \times 2.2 = 4.84$

Step 4, add the squares. This is the sigma.
$0.04 + 3.24 + 1.44 + 3.24 + 4.84 = 12.80$

Step 5, divide by $n - 1$, which is $5 - 1 = 4$.
$12.80 \div 4 = 3.20$

Step 6, take the square root.
$\sqrt{3.20} = 1.7889$

$$s = 1.7889$$

**Check it.** Four tests, any one of which catches most mistakes:

- The five differences in step 2 must add to zero: $0.2 - 1.8 + 1.2 - 1.8 + 2.2 = 0$. They do.
  If they do not, the average is wrong.
- Every squared value in step 3 must be positive. A negative one means a sign error.
- The standard deviation should be roughly the size of a typical distance from the average. The
  distances here were 0.2, 1.8, 1.2, 1.8, 2.2, and 1.7889 sits comfortably among them.
- The standard deviation can never be bigger than the full range of the data, which is
  $5 - 1 = 4$ here.

**A real one for scale.** One weight matrix inside `Qwen2.5-0.5B-Instruct` holds 802,816 numbers
with an average of $-0.000017$ and a standard deviation of $0.066741$ (**real**, from
`lab/out/we3_params_quant.json`). The same six steps were carried out, 802,816 times over,
by a computer.

(toolkit-sigma-entropy)=
### Formula 10: entropy

This one is here because Chapter 5 needs it, and because it is the place where sigma,
logarithms and negative numbers all meet.

**In words.** Entropy is one number saying how spread out a set of probabilities is. It is small
when the model is committed to one answer and large when the model is spreading its bets.

**The formula.**

$$H = -\sum_{i=1}^{V} p_i \log_2(p_i)$$

**The symbols.**

| Symbol | Say it | What it means |
|---|---|---|
| $H$ | "aitch" | the entropy, measured in **bits** |
| $=$ | "equals" | the two sides are the same number |
| $-$ | "minus" | flip the sign of everything after it. It is here because every $\log_2$ of a probability is negative, and entropy is reported as a positive number. |
| $\sum_{i=1}^{V}$ | "the sum from i equals one to V" | add up the next piece once for every token |
| $V$ | "vee" | the vocabulary size. For our model, 151,936. |
| $p_i$ | "p sub i" | the probability of token $i$, a number between 0 and 1 |
| $\log_2(p_i)$ | "log base two of p sub i" | the exponent that turns 2 into $p_i$. Always negative here, because $p_i$ is less than 1. See [Section 8](#toolkit-logarithms). |

**Out loud.** "H equals minus the sum, over every token, of that token's probability times the
log base two of that probability."

**Worked, with numbers made up for practice.** Four possible words, each equally likely, so each
has probability $0.25$. Here $V = 4$.

Step 1, work out $\log_2(0.25)$. Ask: two to what power gives 0.25? From
[Section 6](#toolkit-negative-exponents), $2^{-2} = 0.25$, so the answer is $-2$.
$\log_2(0.25) = -2$

Step 2, multiply each probability by its own log.
$0.25 \times (-2) = -0.5$

Step 3, add that up four times, once per token.
$-0.5 + (-0.5) + (-0.5) + (-0.5) = -2.0$

Step 4, apply the minus sign on the front of the formula.
$H = -(-2.0) = 2.0$

The entropy is **2.0 bits**. That is the sensible answer: with four equally likely choices you
need exactly two yes-or-no questions to pin down which one it is, and two yes-or-no questions is
two bits. [Section 18](#toolkit-powers-of-two) unpacks that link.

**A real one.** With the temperature set to 1.0, the entropy of the real distribution over all
151,936 tokens was **4.450 bits**, and 25 tokens together held 90% of the probability. Turn the
temperature down to 0.25 and the entropy drops to **0.237 bits**, with a single token holding
90% of the probability (**real**, from `_research/00-lab-verified-findings.md`, produced by
`lab/we2_softmax.py`). Low entropy is a committed model. High entropy is a hesitant one.

**Check it.** Three tests:

- Entropy is never negative. If yours is, you dropped the minus sign on the front.
- Entropy is zero when one probability is 1 and the rest are 0, because the model has no
  uncertainty left at all.
- Entropy is at its largest when everything is equally likely, and that largest value is
  $\log_2(V)$. For $V = 4$ that is 2 bits, which is exactly what the worked example gave. For
  $V = 151{,}936$ it would be 17.213 bits, so any entropy you compute for our model has to land
  between 0 and 17.213.

---

(toolkit-percentages)=
## 11. Percentages, decimals and fractions

This section is the longest on the page, because this is what trips up the most people, and
because nearly every number in this book is a percentage.

### One number, three costumes

These three are the same number:

$$\frac{1}{4} \qquad = \qquad 0.25 \qquad = \qquad 25\%$$

They are one quantity written three ways, the way a single distance can be written 1 mile or
1.609 kilometres. Nothing changes except the costume.

| Costume | Looks like | Best for |
|---|---|---|
| **fraction** | $\frac{1}{4}$, $\frac{5}{20}$ | showing where a number came from: 5 right out of 20 asked |
| **decimal** | $0.25$ | doing arithmetic, and what a computer always gives you |
| **percentage** | $25\%$ | talking to a person |

### What "per cent" means

"Per cent" is Latin for "per hundred." The symbol $\%$ means "out of a hundred."

$$25\% \quad \text{means} \quad \frac{25}{100} \quad \text{means} \quad 25 \div 100 \quad \text{means} \quad 0.25$$

So the $\%$ sign is a compressed instruction: it says "there is a division by 100 hiding here."
Once you read $\%$ as "divided by a hundred," every conversion on this page becomes one step.

| Symbol | Say it | What it means |
|---|---|---|
| $\%$ | "per cent" | divided by one hundred |
| $25\%$ | "twenty-five per cent" | $25 \div 100 = 0.25$ |
| $100\%$ | "one hundred per cent" | $100 \div 100 = 1$, which is all of it |
| $0.5\%$ | "nought point five per cent" | $0.5 \div 100 = 0.005$, which is one two-hundredth |

### Formula 11: decimal to percentage, and back

**In words.** To turn a decimal into a percentage, multiply by a hundred. To go back the other
way, divide by a hundred.

**The formula.**

$$\text{percentage} = \text{decimal} \times 100 \qquad\qquad \text{decimal} = \frac{\text{percentage}}{100}$$

**The symbols.**

| Symbol | Say it | What it means |
|---|---|---|
| $\text{decimal}$ | "the decimal" | the number written with a point, such as 0.25. Usually between 0 and 1. |
| $\text{percentage}$ | "the percentage" | the same number written per hundred, such as 25 |
| $\times 100$ | "times one hundred" | multiply by a hundred |
| the fraction bar | "divided by" | divide the top by the bottom |

**Out loud.** "A percentage is the decimal times one hundred." And: "a decimal is the percentage
divided by one hundred."

**Worked, with real numbers.** Both directions, using the measured accuracy of
`Qwen2.5-0.5B-Instruct` on the course's 20-question bank.

Direction one, decimal to percentage. The lab recorded $0.25$ (**real**, from
`lab/out/we6_eval.json`).
Step 1, multiply by 100.
$0.25 \times 100 = 25$
Step 2, write the symbol on the end.
$25\%$

Direction two, percentage to decimal. The lab also recorded the rotation-debiased score as
$15.0\%$ (**real**, from `lab/out/we6b_eval_debiased.json`).
Step 1, divide by 100.
$15 \div 100 = 0.15$
Step 2, that decimal is what you use in any further arithmetic.
$0.15$

**Check it.** Multiplying by 100 makes a number bigger, so the percentage is always the bigger
of the two. $0.25$ becomes $25$, not $0.0025$. If your percentage came out smaller than your
decimal, you divided when you should have multiplied.

### The shortcut, and why it works

Multiplying by 100 moves the decimal point **two places to the right**. Dividing by 100 moves it
**two places to the left**.

| Decimal | Move the point | Percentage |
|---|---|---|
| 0.25 | right two | 25% |
| 0.05 | right two | 5% |
| 0.5 | right two | 50% |
| 1.0 | right two | 100% |
| 0.007 | right two | 0.7% |
| 2.53 | right two | 253% |

Going the other way:

| Percentage | Move the point | Decimal |
|---|---|---|
| 35% | left two | 0.35 |
| 95% | left two | 0.95 |
| 7.2% | left two | 0.072 |
| 0.4% | left two | 0.004 |
| 153% | left two | 1.53 |

This is not a separate rule to memorise. Our number system is built on tens, so multiplying by
$100 = 10 \times 10$ shifts every digit two columns. The shortcut and the multiplication are the
same act.

### Fraction to decimal: divide the top by the bottom

$$\frac{5}{20} = 5 \div 20 = 0.25$$

That is all there is to it, and it is why [Section 4](#toolkit-fraction-bar) comes before this
one. On a calculator: 5, divide, 20, equals.

| Fraction | Division | Decimal | Percentage |
|---|---|---|---|
| $\frac{1}{2}$ | $1 \div 2$ | 0.5 | 50% |
| $\frac{1}{4}$ | $1 \div 4$ | 0.25 | 25% |
| $\frac{3}{4}$ | $3 \div 4$ | 0.75 | 75% |
| $\frac{1}{3}$ | $1 \div 3$ | 0.3333 | 33.33% |
| $\frac{3}{20}$ | $3 \div 20$ | 0.15 | 15% |
| $\frac{14}{20}$ | $14 \div 20$ | 0.7 | 70% |
| $\frac{19}{20}$ | $19 \div 20$ | 0.95 | 95% |

The last three rows are **real** scores from the lab. Three models sat the same twenty
questions under the same scoring procedure, the rotation-debiased one from Chapter 13, and
scored 3 of 20, 14 of 20 and 19 of 20 in order of size (**real**, from
`lab/out/lab4_size_ladder.json`).

The phrase "under the same scoring procedure" is doing real work in that sentence. Change the
procedure and the numbers change: scored the naive way, the smallest model gets 5 of 20 rather
than 3 (**real**, from `lab/out/we6_eval.json`). Chapter 13 is about that, and this book never
prints an accuracy without naming the procedure that produced it.

### Formula 12: a percentage of something

**In words.** To find a percentage of a quantity, turn the percentage into a decimal, then
multiply.

**The formula.**

$$\text{part} = \frac{\text{percentage}}{100} \times \text{whole}$$

**The symbols.**

| Symbol | Say it | What it means |
|---|---|---|
| $\text{part}$ | "the part" | the answer: how much of the whole you are talking about |
| $\text{percentage}$ | "the percentage" | the share, written per hundred, such as 27.56 |
| $100$ | "one hundred" | what turns a percentage into a decimal |
| $\times$ | "times" | multiply |
| $\text{whole}$ | "the whole" | the total amount you are taking a share of |

**Out loud.** "The part equals the percentage divided by a hundred, times the whole."

**Worked, with real numbers.** The vocabulary table is 27.56% of `Qwen2.5-0.5B-Instruct`, which
has 494,032,768 parameters. How many parameters is that?

Step 1, turn the percentage into a decimal.
$27.56 \div 100 = 0.2756$

Step 2, multiply by the whole.
$0.2756 \times 494{,}032{,}768 = 136{,}155{,}431$

Step 3, compare with the exact count, which
[Section 3](#toolkit-multiplication) worked out as $151{,}936 \times 896 = 136{,}134{,}656$.

The two differ by about 20,000, which is a rounding effect: 27.56% is the rounded version of
27.5558%. [Section 16](#toolkit-rounding) is about exactly this, and Chapter 3 always quotes the
exact count rather than reconstructing it from a rounded share.

**Check it.** A percentage below 100 must give you a part smaller than the whole. Rough check:
27.56% is a bit over a quarter, and a quarter of 494 million is 123.5 million, so an answer near
136 million is right. An answer near 13.6 billion means the decimal point moved the wrong way.

### Formula 13: percentage change

**In words.** Percentage change says how much bigger or smaller a new number is than an old one,
as a share of the old one.

**The formula.**

$$\text{percentage change} = \frac{\text{new} - \text{old}}{\text{old}} \times 100$$

**The symbols.**

| Symbol | Say it | What it means |
|---|---|---|
| $\text{new}$ | "the new value" | the value after the change |
| $\text{old}$ | "the old value" | the value before the change. This is the **base**, and it goes on the bottom. |
| $\text{new} - \text{old}$ | "new minus old" | how much it moved. Negative if it went down. |
| the fraction bar | "divided by" | divide the top by the bottom |
| $\times 100$ | "times one hundred" | turns the decimal into a percentage |

**Out loud.** "Percentage change equals new minus old, all divided by old, times one hundred."

**Worked, with real numbers.** In the lab, `Qwen2.5-0.5B-Instruct` used 0.767 joules of GPU
energy per token it produced, and `Qwen2.5-3B-Instruct` used 1.941 joules per token (**real**,
from `lab/out/theme_s_energy.json`). By what percentage did the energy go up?

Step 1, subtract. The old value is the small model, because that is what we are measuring the
change from.
$1.941 - 0.767 = 1.174$

Step 2, divide by the old value.
$1.174 \div 0.767 = 1.5306$

Step 3, multiply by 100.
$1.5306 \times 100 = 153.06$

The 3B model costs about **153% more energy per token**. Said the other way, it costs
$1.941 \div 0.767 = 2.53$ times as much, which the lab notebook reports as $2.53\times$.

**Check it.** "153% more" and "2.53 times as much" must agree, and they do: a 153% increase means
you kept the original 100% and added 153% on top, which is 253% of the original, which is 2.53
times. If your percentage increase and your multiplier do not line up that way, one of them is
wrong.

**One more check, and it is the honest one.** The lab stored those two energy figures to full
precision, as 0.7670694643464218 and 1.940526247555462. Run the same three steps on the full
numbers and you get 152.98%, not 153.06%. The gap of 0.08 percentage points came from rounding
the inputs to three decimal places before dividing. That is why this book says "about 153%"
rather than quoting five digits, and it is the whole argument of
[Section 16](#toolkit-rounding), visible in one calculation.

:::{warning} Which number goes on the bottom
The **old** value goes on the bottom. Swap them and you get a different answer to a different
question. Going from 0.767 up to 1.941 is a 153% increase. Going from 1.941 down to 0.767 is a
60.5% decrease. Both are true; they are answers to different questions, and the denominator is
what tells them apart.
:::

(toolkit-percentage-points)=
### Percentage points, which is not the same as percent

This distinction matters in Chapters 12, 13 and 14, and getting it wrong changes the meaning of
a result.

Two **real** numbers from the lab, both under the rotation-debiased procedure of Chapter 13:
`Qwen2.5-1.5B-Instruct` scored 70.0% on the twenty-question bank and `Qwen2.5-3B-Instruct`
scored 95.0% on the same twenty questions (**real**, from `lab/out/we7_paired.json`).

**The difference in percentage points.** Subtract one from the other.
$95.0 - 70.0 = 25.0$
The gap is **25.0 percentage points**. This is what the book reports.

**The difference in percent.** Divide, using Formula 13.
$(95.0 - 70.0) \div 70.0 = 0.3571$
$0.3571 \times 100 = 35.71$
The larger model scored **35.7% higher** than the smaller one, in relative terms.

Both statements describe the same pair of numbers. They are different by a factor of 1.43, and a
reader who is told "25%" when the truth is "25 percentage points" has been given the wrong
number.

**The rule.** When you subtract two percentages, the answer is in **percentage points**. When
you divide them, the answer is in **percent**. Say which one you mean, every time.

### The trap of going down and then back up

A 50% cut followed by a 50% rise does not return you to where you started.

Step 1, start at 100 and cut it by 50%.
$100 \times 0.50 = 50$

Step 2, now raise that by 50%. The base has changed; it is 50 now, not 100.
$50 \times 1.50 = 75$

You end at 75, not 100. The percentages were taken on different bases, so they do not cancel.
This shows up whenever someone claims a model "lost 30% then recovered 30%."

### Common mistakes with percentages

1. **Confusing 0.25 with 0.25%.** $0.25$ is $25\%$. $0.25\%$ is $0.0025$, which is a hundred
   times smaller. When a chapter prints a decimal, it has no $\%$ sign on it.
2. **Adding percentages that have different bases.** 50% of the students in one class plus 50%
   of the students in another class is not 100% of anything.
3. **Reporting a percentage without saying what of.** "Accuracy went up 10%" leaves out the
   base. Every number in running prose in this book carries a unit or a referent for exactly
   this reason.
4. **Forgetting that a percentage can exceed 100.** If the new value is more than double the
   old, the percentage change is above 100%. That is a real answer, not a mistake.
5. **Rounding a percentage before using it in the next calculation.** Carry the full decimal
   through, round at the end. [Section 16](#toolkit-rounding).

:::{dropdown} Try it: three conversions
1. The model answered 7 questions right out of 20. Write that as a fraction, a decimal and a
   percentage.
2. A quantization scheme has a measured error of 7.2%. Write that as a decimal.
3. Energy per token went from 1.133 joules to 1.941 joules. What is the percentage change?

**Solutions.**

**1.** The fraction is $\frac{7}{20}$. To get the decimal, divide the top by the bottom:
$7 \div 20 = 0.35$. To get the percentage, multiply by 100: $0.35 \times 100 = 35$, so
**35%**. Check: 7 is a bit more than a third of 20, and 35% is a bit more than a third.

**2.** Divide by 100: $7.2 \div 100 = 0.072$. Check: moving the point two places left turns
7.2 into 0.072. The 7.2% blockwise error at 4 bits is **real**, from `lab/out/we3b_quant.json`.

**3.** Subtract first: $1.941 - 1.133 = 0.808$. Divide by the old value:
$0.808 \div 1.133 = 0.7131$. Multiply by 100: $71.31$. So energy per token rose by about
**71%**. Both energy figures are **real**, from `lab/out/theme_s_energy.json`. Check: 1.941
is not quite double 1.133, so the increase should be under 100%. It is. Run the same steps on
the full-precision values the lab stored and you get 71.22% rather than 71.31%, which is the
rounding effect from [Section 16](#toolkit-rounding) again, and the reason the answer above is
given as "about 71%".
:::

---

(toolkit-proportions)=
## 12. Proportions, and what "out of" means

### What it is

A **proportion** is a part divided by a whole. It answers "what share of the total is this?"

The phrase "5 out of 20" always means the division $5 \div 20$. The word "out of" is the
fraction bar spoken aloud.

$$5 \text{ out of } 20 \quad = \quad \frac{5}{20} \quad = \quad 0.25$$

A proportion is always a number between 0 and 1. Zero means none of them. One means all of them.

### Formula 14: a sample proportion

**In words.** Accuracy is the number of questions the model got right, divided by the number of
questions you asked.

**The formula.**

$$\hat{p} = \frac{x}{n}$$

**The symbols.**

| Symbol | Say it | What it means |
|---|---|---|
| $\hat{p}$ | "p-hat" | the proportion you measured. Here, the accuracy. |
| the hat, $\hat{\ }$ | "hat" | marks a number you measured rather than the true value you would get from an infinite test. Chapter 12 makes a great deal of this. |
| $=$ | "equals" | the two sides are the same number |
| $x$ | "ex" | how many were correct. A count, so a whole number. |
| the fraction bar | "divided by" | divide the top by the bottom |
| $n$ | "en" | how many were asked. Also a whole number, and never zero. |

**Out loud.** "p-hat equals x over n," or in full English, "the measured accuracy is the number
right divided by the number asked."

**Worked, with real numbers.** Three models sat the same twenty-question bank in the lab, scored
the same way each time, with the rotation-debiased procedure of Chapter 13. All three counts are
**real**, from `lab/out/lab4_size_ladder.json`.

`Qwen2.5-0.5B-Instruct` got 3 right.
$\hat{p} = 3 \div 20 = 0.15$, which is 15.0%

`Qwen2.5-1.5B-Instruct` got 14 right.
$\hat{p} = 14 \div 20 = 0.70$, which is 70.0%

`Qwen2.5-3B-Instruct` got 19 right.
$\hat{p} = 19 \div 20 = 0.95$, which is 95.0%

**Check it.** Every one of those is between 0 and 1. A proportion above 1 means the count and
the total swapped places. A negative proportion is not possible at all.

:::{warning} A proportion belongs to a procedure, not to a model
Score the same smallest model a different defensible way and it gets 5 of 20, which is 25.0%
(**real**, from `lab/out/we6_eval.json`), or 7 of 20, which is 35.0% (**real**, from
`lab/out/we6b_eval_debiased.json`). Same model. Same twenty questions. Three honest procedures,
three different answers between 15% and 35%.

That is not a flaw in the arithmetic on this page. It is the finding of Chapter 13, and it is
the reason this book never reports an accuracy without saying how it was scored.
:::

### "Out of" and the base

"Out of" names the whole, and changing the whole changes the meaning even when the top number
stays the same.

- 5 out of 20 is 25%.
- 5 out of 100 is 5%.
- 5 out of 5 is 100%.

The number 5 did not move. The base did. Whenever this book reports a proportion it says what
the base was, and when a chapter says "**n = 20**" that is the base being named.

### Scaling a proportion to a different base

Because a proportion is a share, you can rewrite it over any base you like.

$$\frac{5}{20} = \frac{25}{100} = 25\%$$

Step 1, work out what turns 20 into 100. $100 \div 20 = 5$.
Step 2, multiply the top by the same amount. $5 \times 5 = 25$.
Step 3, so $\frac{5}{20}$ and $\frac{25}{100}$ are the same share, and the second is a
percentage by definition.

Multiplying top and bottom by the same number never changes a fraction's value, because you are
multiplying by $\frac{5}{5}$, which is 1.

### "One in four" and other spoken forms

English has several ways to say a proportion, and they mean the same thing.

| Spoken | As a fraction | As a decimal | As a percentage |
|---|---|---|---|
| "one in four" | $\frac{1}{4}$ | 0.25 | 25% |
| "a quarter of them" | $\frac{1}{4}$ | 0.25 | 25% |
| "five out of twenty" | $\frac{5}{20}$ | 0.25 | 25% |
| "one in five" | $\frac{1}{5}$ | 0.20 | 20% |
| "nineteen out of twenty" | $\frac{19}{20}$ | 0.95 | 95% |

### A proportion is not a rate

A **proportion** has the same kind of thing on top and bottom, so it has no units: questions
divided by questions. A **rate** has different things on top and bottom, so it keeps its units:
27.7 tokens per second, or 0.767 joules per token (both **real**, from
`lab/out/theme_s_energy.json`).

Proportions are capped at 1. Rates are not. A model can produce 27.7 tokens per second, and
there is nothing strange about that number being above 1.

### What goes wrong

**Reporting a proportion with no base.** "The model got 25%" with no $n$ attached is half a
result. With $n = 20$, that 25% could easily have been 15% or 35%. Chapter 12 shows the
arithmetic.

**Treating a count as a proportion.** "It got 5" and "it got 0.25" are different claims. The
first is a count; the second is a share.

---

(toolkit-graphs)=
## 13. Reading a graph

### The parts of a graph

Nearly every figure in this book has the same parts, in the same places.

| Part | Where it is | What it does |
|---|---|---|
| **title** | across the top | says what the whole picture is about |
| **x-axis** | the horizontal line along the bottom | the side-to-side direction. The letter "x" is its name, nothing more. |
| **y-axis** | the vertical line up the left side | the up-and-down direction |
| **axis label** | printed alongside each axis | says what that direction measures, and in what units |
| **tick marks** | short lines along an axis, with numbers | the scale, so you can read a value off |
| **legend** | usually top right or above the plot | says which colour or pattern means what |
| **gridlines** | faint lines across the plot | help your eye carry a value across to the axis |

**A point** on a graph is one observation, sitting at the place where its x-value and its
y-value cross. **A bar** is a quantity drawn as a rectangle, where the height is the number and
the label underneath says what it is the height of.

### Reading a value off a real figure

Here is a figure from this book's own lab, produced by `lab/we2_softmax.py`.

```{figure} ../figures/we2-softmax-temperature-bars.png
:alt: A grouped bar chart titled "Temperature reshapes the next-token distribution", for the
  model Qwen2.5-0.5B-Instruct on the prompt "The capital of France is". The horizontal axis
  lists eight candidate next tokens, with the token for Paris on the left, followed by a
  long-underscore token, two colon-and-newline tokens, two shorter underscore tokens, the
  word located and the word the. The vertical axis is labelled "probability (%)" and runs
  from 0 to 100 with ticks every 20. Each token has five bars, one per temperature setting,
  shown in the legend as T = 0.25, 0.5, 1.0, 1.5 and 2.0. The Paris group is by far the
  tallest, reaching about 97 percent at T = 0.25, falling to about 30 percent at T = 1.0 and
  to about 2 percent at T = 2.0. Every other group sits below about 13 percent at every
  temperature.
:width: 100%

The probability the model gives each of its top eight next words, at five temperature
settings. Every bar is real output from `Qwen2.5-0.5B-Instruct`.
```

Walk through it one part at a time.

**The title** says what is being shown: how temperature reshapes the distribution over the next
token, for one named model and one named prompt. Every figure in this book names its model and
its prompt, because a number without a procedure attached is not a result.

**The x-axis** does not hold numbers here. It holds eight labels, one per candidate word, and
they are written in quote marks because the leading space in `' Paris'` is part of the token.
An axis whose entries are labels rather than numbers is called **categorical**. The order of
the labels is a choice the figure's author made, and here they are sorted from most likely to
least likely.

**The y-axis** is labelled `probability (%)` and runs from 0 to 100, with tick marks every 20.
The unit is in the label, so every bar height is a percentage.

**The legend** lists five temperature settings and gives each one a colour. Colour alone is not
enough to carry meaning, so the five bars in each group also stay in the same left-to-right
order, T = 0.25 first and T = 2.0 last.

**Now read a value.** Find the `' Paris'` group at the far left. Its tallest bar is the first
one, T = 0.25. Follow its top edge across to the y-axis. It lands a little below the 100 mark,
close to 97.

The recorded value is **96.799%** (**real**, from `lab/out/we2_softmax.json`). Reading 97 off
the picture is as precise as a picture can be, and this is the honest division of labour: **a
figure shows you the shape, a table gives you the number.** This book prints both.

**Read a second value.** In the same `' Paris'` group, find the middle bar, T = 1.0. Its top
edge sits a little above the 30 line. The recorded value is **30.219%** (**real**, same file).

**Now read the shape.** The tall bar drops from about 97 to about 30 to about 2 as the
temperature rises, while the other seven groups barely move. That is the finding: raising the
temperature takes probability away from the leader and spreads it across the rest of the
vocabulary. You can see it before you have read a single number.

### What goes wrong when reading a graph

**Ignoring where the y-axis starts.** A bar chart whose axis starts at 90 instead of 0 makes a
small difference look enormous. Check the bottom tick before you believe a gap. Every bar chart
in this book starts its y-axis at zero.

**Assuming the x-axis is numeric.** In the figure above it is a list of labels, so the distance
between `' Paris'` and `' ______'` means nothing at all.

**Reading a value more precisely than the picture allows.** You can see that a bar is near 97.
You cannot see that it is 96.799. Go to the table or the JSON file for that.

**Missing the units.** A y-axis labelled "probability (%)" and one labelled "probability" differ
by a factor of 100.

---

(toolkit-vectors)=
## 14. Coordinates, and what a vector is

### Coordinates

A pair of numbers in brackets tells you where a point sits on a graph.

$$(3, 4)$$

The first number is how far along the x-axis, the second is how far up the y-axis. Always in
that order: **across, then up.**

| Written | Say it | What it means |
|---|---|---|
| $(3, 4)$ | "three comma four", or "the point three four" | 3 across, 4 up |
| $(0, 0)$ | "the origin" | where the two axes cross. Zero across, zero up. |
| $(-4, 3)$ | "minus four comma three" | 4 to the **left**, 3 up. A negative first number means go left. |
| $(3, -4)$ | "three comma minus four" | 3 right, 4 **down** |

The two numbers are called the **coordinates** of the point. The whole pair is an
**ordered pair**, and "ordered" is doing real work: $(3, 4)$ and $(4, 3)$ are different places.

### A vector is the same pair, read as an arrow

Take the pair $(3, 4)$ and draw an arrow from the origin $(0,0)$ to that point. That arrow is a
**vector**.

So a vector is two things at once, and they are the same thing:

- **a list of numbers**, $(3, 4)$, which is how you compute with it;
- **an arrow** with a direction and a length, which is how you picture it.

Chapter 8 uses both pictures in the same paragraph, and swapping between them is the skill that
chapter is teaching.

| Written | Say it | What it means |
|---|---|---|
| $\mathbf{a}$ | "vector a", "bold a" | a whole vector, written in bold. The bold type is what tells you it is a list rather than a single number. |
| $\vec{a}$ | "vector a", "a with an arrow" | the same thing. Some books use the arrow, some use bold. This book uses bold. |
| $a_1$ | "a sub one" | the first number in the vector, which is the x-coordinate |
| $a_2$ | "a sub two" | the second number, the y-coordinate |
| $D$ | "dee" | how many numbers the vector has. Its **dimension**. |

### Vectors longer than two

You can draw a vector with two numbers on paper. With three you need a model of a room. Beyond
that you cannot draw it at all, and that is fine, because the arithmetic does not care.

The sentence embeddings in Chapters 8, 9 and 10 are vectors with **384 numbers** in them
(**real**, from `lab/out/we5_embeddings.json`, produced by the model
`sentence-transformers/all-MiniLM-L6-v2`). Nobody can picture 384 directions at once. Everybody
can add up 384 products. The formulas below are written so they work for any $D$, whether $D$ is
2 or 384.

### Formula 15: the dot product

**In words.** Multiply the matching pairs of numbers from two vectors, then add up all the
products. The answer is a single number.

**The formula.** For two vectors with $D$ numbers each:

$$\mathbf{a} \cdot \mathbf{b} = \sum_{i=1}^{D} a_i\, b_i$$

In two dimensions, unfolded, that reads

$$\mathbf{a} \cdot \mathbf{b} = a_1 b_1 + a_2 b_2$$

**The symbols.**

| Symbol | Say it | What it means |
|---|---|---|
| $\mathbf{a}$, $\mathbf{b}$ | "vector a", "vector b" | two vectors with the same number of entries |
| $\cdot$ | "dot" | the dot product. Between two **bold** vectors this raised dot means this operation, not ordinary multiplication. |
| $\sum_{i=1}^{D}$ | "the sum from i equals one to D" | add up the next piece once for each coordinate. See [Section 10](#toolkit-sigma). |
| $a_i$ | "a sub i" | the $i$-th number in $\mathbf{a}$ |
| $b_i$ | "b sub i" | the $i$-th number in $\mathbf{b}$ |
| $a_i\, b_i$ | "a sub i times b sub i" | multiply them. Two symbols side by side means multiply, from [Section 3](#toolkit-multiplication). |
| $D$ | "dee" | how many numbers each vector holds |

**Out loud.** "a dot b is the sum, over every position, of a's number at that position times b's
number at that position."

**Worked, with numbers made up for practice.** Take $\mathbf{a} = (3, 4)$ and
$\mathbf{b} = (4, 3)$, so $D = 2$.

Step 1, write down the matching pairs.
$a_1 = 3$ and $b_1 = 4$
$a_2 = 4$ and $b_2 = 3$

Step 2, multiply each pair.
$3 \times 4 = 12$
$4 \times 3 = 12$

Step 3, add the products.
$12 + 12 = 24$

$$\mathbf{a} \cdot \mathbf{b} = 24$$

This matches the lab's recorded value of 24 for this pair (**real**, from
`_research/00-lab-verified-findings.md`, produced by `lab/we5_embeddings.py`).

**Check it.** The dot product of a vector with itself is the sum of its squares, and that can
never be negative. Try it: $\mathbf{a} \cdot \mathbf{a} = 3 \times 3 + 4 \times 4 = 9 + 16 = 25$.
A dot product of **zero** means the two arrows are at right angles. The lab found exactly that
for $\mathbf{a} = (3,4)$ and $\mathbf{c} = (-4,3)$: the dot product is
$3 \times (-4) + 4 \times 3 = -12 + 12 = 0$, and the angle between them is 90.00 degrees
(**real**, same source).

### Adding vectors

Add the matching numbers.

$$(3, 4) + (1, 2) = (3 + 1,\; 4 + 2) = (4, 6)$$

As arrows, that is walking along the first arrow and then along the second. Chapter 8 uses this.

### What goes wrong

**Reading $(6.0\%, 44.0\%)$ as a point.** It is not. Brackets with a comma have a second meaning
in this book: an **interval**, meaning "somewhere between these two." The clue is the $\%$ signs
and the context. See [Section 19](#toolkit-inequalities), which is where that particular pair
comes from.

**Mixing up a vector and a single number.** A dot product turns two vectors into one plain
number. After you compute it, the arrows are gone.

**Adding vectors of different lengths.** You cannot. Every position in one has to have a partner
in the other.

---

(toolkit-absolute-value)=
## 15. Absolute value and magnitude

### Absolute value

Two vertical bars around a number mean "drop the sign."

$$|-3| = 3 \qquad\qquad |3| = 3$$

| Symbol | Say it | What it means |
|---|---|---|
| $\lvert\ \rvert$ | "the absolute value of", or "mod" | the size of the number, ignoring whether it is positive or negative |
| $\lvert -3 \rvert$ | "the absolute value of minus three" | 3 |
| $\lvert 0 \rvert$ | "the absolute value of zero" | 0 |

The picture: absolute value is **distance from zero**. The number $-3$ sits three steps to the
left of zero and $3$ sits three steps to the right. Both are three steps away, so both have
absolute value 3. Distance has no direction, so it is never negative.

### Formula 16: absolute value

**In words.** The absolute value of a number is that number with any minus sign removed.

**The formula.**

$$\lvert x \rvert = \begin{cases} x & \text{if } x \ge 0 \\ -x & \text{if } x < 0 \end{cases}$$

**The symbols.**

| Symbol | Say it | What it means |
|---|---|---|
| $\lvert x \rvert$ | "the absolute value of x" | the size of $x$, with no sign |
| the large brace | "one of these two cases applies" | read the two lines as a pair of rules, and use whichever line's condition is true |
| $x \ge 0$ | "x is greater than or equal to zero" | $x$ is positive or zero. See [Section 19](#toolkit-inequalities). |
| $x < 0$ | "x is less than zero" | $x$ is negative |
| $-x$ | "minus x" | flip the sign of $x$. If $x$ is $-3$, then $-x$ is $3$. |

**Out loud.** "The absolute value of x is x itself when x is zero or positive, and minus x when
x is negative."

**Worked, with real numbers.** The weight matrix `layers[0].self_attn.q_proj.weight` inside
`Qwen2.5-0.5B-Instruct` has a smallest value of $-1.2266$ and a largest of $1.1719$ (**real**,
from `lab/out/we3_params_quant.json`). Which of the two is furthest from zero?

Step 1, take the absolute value of each.
$\lvert -1.2266 \rvert = 1.2266$
$\lvert 1.1719 \rvert = 1.1719$

Step 2, compare the two sizes.
$1.2266 > 1.1719$

So the **negative** weight is the extreme one. Its size, 1.2266, is what sets the quantization
scale in Chapter 7, and that single outlier is the reason per-tensor quantization fails: half
the weights in that matrix are smaller than 0.02698 in absolute value, a ratio of about 45 to 1
(**real**, from `_research/00-lab-verified-findings.md`, produced by
`lab/we3_params_quant.py`).

**Check it.** An absolute value is never negative. If you get a negative answer you applied the
wrong line of the formula. And $\lvert x \rvert$ is always either $x$ or its mirror image, never
some third number.

### Magnitude: the length of a vector

For a vector, "how big is it" means "how long is the arrow." That length is called its
**magnitude** or its **norm**, and it is written with **double** bars.

### Formula 17: the magnitude of a vector

**In words.** Square each number in the vector, add up the squares, then take the square root.
The answer is the length of the arrow.

**The formula.**

$$\lVert \mathbf{a} \rVert = \sqrt{a_1^2 + a_2^2}$$

For a vector with $D$ numbers instead of 2:

$$\lVert \mathbf{a} \rVert = \sqrt{\sum_{i=1}^{D} a_i^2}$$

**The symbols.**

| Symbol | Say it | What it means |
|---|---|---|
| $\lVert \mathbf{a} \rVert$ | "the norm of a", "the length of a", "the magnitude of a" | how long the arrow is. Double bars, to distinguish it from the single bars of absolute value. |
| $\mathbf{a}$ | "vector a" | the vector, in bold |
| $a_1$, $a_2$ | "a sub one", "a sub two" | its first and second numbers |
| $a_i^2$ | "a sub i squared" | that number multiplied by itself |
| $\sqrt{\ \ }$ | "the square root of" | applies to everything under the bar. See [Section 9](#toolkit-square-roots). |
| $\sum_{i=1}^{D}$ | "the sum from i equals one to D" | add up the squares, one per coordinate |

**Out loud.** "The length of a is the square root of the sum of the squares of its numbers."

**Worked, with numbers made up for practice.** Find the length of $\mathbf{a} = (3, 4)$.

Step 1, square each coordinate.
$3^2 = 3 \times 3 = 9$
$4^2 = 4 \times 4 = 16$

Step 2, add the squares.
$9 + 16 = 25$

Step 3, take the square root.
$\sqrt{25} = 5$

$$\lVert \mathbf{a} \rVert = 5$$

**A second one, because Chapter 9 turns on it.** Find the length of $\mathbf{d} = (6, 8)$, which
is exactly $\mathbf{a}$ doubled.

$6^2 = 36$
$8^2 = 64$
$36 + 64 = 100$
$\sqrt{100} = 10$

$\mathbf{d}$ is twice as long as $\mathbf{a}$ and points in exactly the same direction. The lab
recorded a dot product of **50** between them, a cosine similarity of **1.0000**, and an angle of
**0.00 degrees** (**real**, from `_research/00-lab-verified-findings.md`, produced by
`lab/we5_embeddings.py`). That is the whole argument for dividing by the lengths in Chapter 9:
length is not meaning.

**Check it.** A length is never negative, and it is never smaller than the biggest single
coordinate. Here the biggest coordinate is 4 and the length is 5, which passes. A length of zero
happens only when every coordinate is zero.

### The two kinds of bars, side by side

| Symbol | Bars | Applies to | Gives you |
|---|---|---|---|
| $\lvert x \rvert$ | single | one number | its distance from zero |
| $\lVert \mathbf{a} \rVert$ | double | a whole vector | the length of the arrow |

They do the same job in different settings: both answer "how big is this, ignoring which way it
points."

---

(toolkit-rounding)=
## 16. Rounding, decimal places and significant figures

### Place value

Every digit in a decimal number has a name for its position.

| Number | Digit | Its place | What it is worth |
|---|---|---|---|
| 0.**7**67 | 7 | first decimal place, tenths | $7 \div 10 = 0.7$ |
| 0.7**6**7 | 6 | second decimal place, hundredths | $6 \div 100 = 0.06$ |
| 0.76**7** | 7 | third decimal place, thousandths | $7 \div 1000 = 0.007$ |

"Two decimal places" means "keep two digits after the point."

### How to round

Look at the **next** digit after the place you are keeping.

- If it is 0, 1, 2, 3 or 4, leave the last kept digit alone.
- If it is 5, 6, 7, 8 or 9, add one to the last kept digit.

**Worked, with real numbers.** The lab measured the energy cost of `Qwen2.5-0.5B-Instruct` as
$0.7670694643464218$ joules per token (**real**, from `lab/out/theme_s_energy.json`). Round it
several ways.

To three decimal places: the digits after the point are 7, 6, 7, then 0. Keep three: `0.767`.
The next digit is 0, which is under 5, so nothing changes.
$0.7670694643464218 \to \mathbf{0.767}$

To two decimal places: keep 7 and 6. The next digit is 7, which is 5 or more, so the 6 goes up
to 7.
$0.7670694643464218 \to \mathbf{0.77}$

To one decimal place: keep 7. The next digit is 6, which is 5 or more, so the 7 goes up to 8.
$0.7670694643464218 \to \mathbf{0.8}$

**Check it.** A rounded number is always close to the original, and never further away than half
a step of the place you rounded to. Rounding 0.767 to one decimal place can give 0.7 or 0.8, and
nothing else. If you land on 0.6, something went wrong.

### Rounding only once

Round from the **original** number every time. Never round a rounded number.

Take $0.4449$ and round it to one decimal place.

The right way, in one step: the digit after the first decimal place is 4, which is under 5, so
the answer is $\mathbf{0.4}$.

The wrong way, in stages: $0.4449 \to 0.445 \to 0.45 \to 0.5$. Each step was a legal rounding
and the final answer is wrong by a whole tenth. The error built up.

This is why the book carries full precision through a calculation and rounds only at the end,
and why a chapter that quotes a rounded percentage always gives the exact count as well.

### Significant figures

Decimal places count digits after the point. **Significant figures** count meaningful digits
from the left, wherever the point happens to sit. They are the better tool when numbers vary
wildly in size, which model measurements do.

Start counting at the first digit that is not zero.

| Number | To 3 significant figures | Why |
|---|---|---|
| 494,032,768 | 494,000,000 | the first three meaningful digits are 4, 9, 4 |
| 0.06674061715602875 | 0.0667 | the leading zeros do not count; start at the 6 |
| 0.7670694643464218 | 0.767 | |
| 151,936 | 152,000 | the fourth digit is 9, so the third rounds up from 1 to 2 |
| 1.940526247555462 | 1.94 | |

All five of those starting numbers are **real** measurements from `lab/out/`.

**Why the book cares.** Printing $0.7670694643464218$ joules per token implies you measured
energy to sixteen digits. You did not. The measurement is GPU board power sampled at about 50
times a second across one greedy run, so three digits is generous. Printing more digits than you
measured is a quiet way of overstating what you know, and this book treats that as the same
offence as inventing a number.

### What goes wrong

**Rounding in stages.** Covered above. It is the most common mistake in this section.

**Dropping a zero that is doing work.** $0.070$ rounded to two decimal places is $0.07$, and
those are the same number. But $0.70$ and $0.7$ mean different things in a results table:
$0.70$ says you measured to two places. When a table has a column of figures, keep the same
number of decimal places down the whole column.

**Rounding too early in a chain.** Multiply first, round last. In
[Section 11](#toolkit-percentages) the rounded share 27.56% rebuilt a parameter count about
20,000 short of the exact one. That is the cost of rounding early, made visible.

---

(toolkit-scientific-notation)=
## 17. Scientific notation

### What it is

Scientific notation writes a number as something between 1 and 10, multiplied by a power of ten.

$$494{,}032{,}768 \;=\; 4.94032768 \times 10^{8}$$

It exists because model sizes are inconveniently large and weight values are inconveniently
small, and both are awkward to read with all their zeros in place.

### Formula 18: scientific notation

**In words.** Write the number as a single digit, a decimal point, the rest of the digits, then
say how many places the point has to move to get the original number back.

**The formula.**

$$x = a \times 10^{b}, \qquad \text{where } 1 \le a < 10$$

**The symbols.**

| Symbol | Say it | What it means |
|---|---|---|
| $x$ | "ex" | the number you started with |
| $a$ | "ay" | the **mantissa**: one digit, a point, then the rest. Always at least 1 and less than 10. |
| $\times$ | "times" | multiply |
| $10^{b}$ | "ten to the b" | ten raised to the power $b$. See [Section 5](#toolkit-exponents). |
| $b$ | "bee" | the **exponent**: how many places the decimal point moves. Positive for big numbers, negative for small ones. |
| $1 \le a < 10$ | "a is at least one and less than ten" | the rule that makes the form unique. See [Section 19](#toolkit-inequalities). |

**Out loud.** "x equals a times ten to the b, where a is at least one and less than ten."

**Worked, with real numbers.** Write the parameter count of `Qwen2.5-0.5B-Instruct`, which is
$494{,}032{,}768$, in scientific notation (**real**, from `lab/out/we3_params_quant.json`).

Step 1, put the decimal point after the first digit.
$4.94032768$

Step 2, count how many places you moved it. It started at the far right end of 494,032,768 and
finished after the 4, which is 8 places to the left.

Step 3, write it out. Moving left means a positive exponent.
$494{,}032{,}768 = 4.94032768 \times 10^{8}$

Step 4, to three significant figures, from [Section 16](#toolkit-rounding):
$4.94 \times 10^{8}$

**Worked again, with a small real number.** The average weight in that same matrix is
$-0.0000169$ (**real**, same file).

Step 1, put the point after the first digit that is not zero.
$1.69$

Step 2, count the places. From $0.0000169$ to $1.69$ the point moved 5 places to the **right**.

Step 3, moving right means a **negative** exponent, from
[Section 6](#toolkit-negative-exponents).
$-0.0000169 = -1.69 \times 10^{-5}$

**Check it.** Move the point back the way you came and see whether you land on the number you
started with. For $4.94 \times 10^{8}$, move the point 8 places right: 494,000,000. Close to
494,032,768, and exact once you use all the digits. For $1.69 \times 10^{-5}$, move it 5 places
left: 0.0000169. Correct.

### The rule for the sign of the exponent

| The number is | The exponent is | Example |
|---|---|---|
| bigger than 10 | positive | $151{,}936 = 1.51936 \times 10^{5}$ |
| between 1 and 10 | zero | $4.94 = 4.94 \times 10^{0}$ |
| between 0 and 1 | negative | $0.0667 = 6.67 \times 10^{-2}$ |

A negative exponent never means a negative number. $1.69 \times 10^{-5}$ is positive; it is
merely small. A negative **number** carries its own minus sign at the front, like
$-1.69 \times 10^{-5}$.

### On a calculator and in Python

Calculators and computers often write scientific notation with an `E` or an `e` instead of
"times ten to the":

| On screen | Means | Ordinary form |
|---|---|---|
| `4.94032768E8` | $4.94032768 \times 10^{8}$ | 494,032,768 |
| `1.69e-05` | $1.69 \times 10^{-5}$ | 0.0000169 |
| `3.086e+09` | $3.086 \times 10^{9}$ | 3,086,000,000 |

That last one is close to the real parameter count of `Qwen2.5-3B-Instruct`, which is
$3{,}085{,}938{,}688$ (**real**, from `lab/out/theme_s_energy.json`).

:::{warning} The `e` on a calculator is not the number $e$
This is a genuine collision and it catches people. In `1.69e-05` the letter `e` means "times ten
to the power of." The number $e = 2.718282$ from [Section 7](#toolkit-e) is a different thing
entirely. The calculator key for one is marked `EXP` or `EE`; the key for the other is marked
`e^x`. Test which one you have: press the key with 1. If you get 2.718282, that is the number
$e$. If you get 10, that is the exponent key.
:::

### Model sizes side by side

Scientific notation makes three very different models comparable at a glance. All three counts
are **real**, from `lab/out/theme_s_energy.json`.

| Model | Parameters | Scientific notation | Said out loud |
|---|---|---|---|
| `Qwen2.5-0.5B-Instruct` | 494,032,768 | $4.94 \times 10^{8}$ | about half a billion |
| `Qwen2.5-1.5B-Instruct` | 1,543,714,304 | $1.54 \times 10^{9}$ | about one and a half billion |
| `Qwen2.5-3B-Instruct` | 3,085,938,688 | $3.09 \times 10^{9}$ | about three billion |

---

(toolkit-powers-of-two)=
## 18. Powers of two, and what a bit is

### What a bit is

A **bit** is one yes-or-no answer. On or off. 1 or 0. It is the smallest piece of information
there is, and every number inside a computer is built out of them.

One bit gives you two possibilities: 0 or 1.

Two bits give you four, because each of the first bit's two options can be followed by either
of the second bit's two options:

| First bit | Second bit | The pattern |
|---|---|---|
| 0 | 0 | 00 |
| 0 | 1 | 01 |
| 1 | 0 | 10 |
| 1 | 1 | 11 |

Three bits give you eight. Every extra bit **doubles** the count, because every pattern you
already had can now be followed by a 0 or by a 1.

### Formula 19: how many values fit in $b$ bits

**In words.** The number of different values you can store is two multiplied by itself once per
bit.

**The formula.**

$$\text{number of values} = 2^{b}$$

**The symbols.**

| Symbol | Say it | What it means |
|---|---|---|
| $2$ | "two" | the base. Two, because a bit has two states. |
| $b$ | "bee" | how many bits you have. A whole number. |
| $2^{b}$ | "two to the b" | two multiplied by itself $b$ times. See [Section 5](#toolkit-exponents). |

**Out loud.** "The number of values is two to the power of the number of bits."

**Worked, with numbers made up for practice.** How many different values fit in 4 bits?

Step 1, write it out.
$2^{4} = 2 \times 2 \times 2 \times 2$

Step 2, multiply one step at a time.
$2 \times 2 = 4$
$4 \times 2 = 8$
$8 \times 2 = 16$

$$2^{4} = 16$$

Four bits hold **16** different values. Chapter 7 quantizes a model to 4 bits, which means every
weight in it gets rounded to one of 16 allowed levels.

**Check it.** Each extra bit doubles the answer. Going from 3 bits to 4 bits should take you from
8 to 16, and it did. If your answer for 4 bits is 8, you counted one doubling short.

### The table worth knowing

| Bits $b$ | Values $2^{b}$ | Where it shows up |
|---|---|---|
| 1 | 2 | one yes-or-no |
| 2 | 4 | the harshest quantization Chapter 7 tries |
| 3 | 8 | |
| 4 | **16** | 4-bit quantization, the one that makes models fit on a laptop |
| 6 | 64 | |
| 8 | **256** | one **byte**. Also 8-bit quantization. |
| 10 | 1,024 | often called "a thousand" by computer people |
| 16 | 65,536 | **FP16**, the half-precision format this book's models are stored in |
| 20 | 1,048,576 | about a million |
| 32 | 4,294,967,296 | **FP32**, full precision |

### From bits to file size

A **byte** is 8 bits. It holds $2^{8} = 256$ values. File sizes are counted in bytes.

**Worked, with real numbers.** `Qwen2.5-0.5B-Instruct` has 494,032,768 parameters, and it is
stored in FP16, which uses 16 bits, that is 2 bytes, for each one. How big is the file?

Step 1, multiply the parameter count by the bytes per parameter.
$494{,}032{,}768 \times 2 = 988{,}065{,}536$ bytes

Step 2, convert bytes to gigabytes. One gigabyte is $1{,}000{,}000{,}000$ bytes, which is
$10^{9}$.
$988{,}065{,}536 \div 1{,}000{,}000{,}000 = 0.988$

The model is **0.988 GB** (**real**, and it matches `lab/out/lab4_size_ladder.json`, which
records `size_fp16_gb` as 0.988065536).

**Check it.** Two bytes per parameter, so the file in bytes should be about twice the parameter
count. $494$ million doubled is $988$ million. It is. And the quantization table in Chapter 7
falls straight out of this: at 8 bits, one byte per weight, 0.494 GB. At an ideal 4 bits, half a
byte per weight, 0.247 GB. All three are **real**, from
`_research/00-lab-verified-findings.md`.

:::{note} Two meanings of "gigabyte", both honest
Some software counts a gigabyte as $10^{9} = 1{,}000{,}000{,}000$ bytes. Other software counts
it as $2^{30} = 1{,}073{,}741{,}824$ bytes, which is properly called a **gibibyte**, GiB. The
same file is 0.988 GB under the first convention and 0.920 GiB under the second. Nothing has
changed except the divisor.

This book uses the decimal convention, $10^{9}$, because that is what the lab scripts used.
Where a chapter quotes a size, that is the convention it means.
:::

### Why entropy is measured in bits

[Section 10.4](#toolkit-sigma) computed an entropy of 2.0 bits for four equally likely words.
That number now has a concrete meaning: with four possibilities, you need 2 yes-or-no questions
to identify which one it is, because $2^{2} = 4$.

Run it backwards with a logarithm, from [Section 8](#toolkit-logarithms): the number of bits you
need for $V$ equally likely options is $\log_2(V)$. For 4 options that is 2 bits. For the model's
full vocabulary of 151,936 tokens it is 17.213 bits. So when Chapter 5 reports an entropy of
4.450 bits at temperature 1.0 (**real**, from `_research/00-lab-verified-findings.md`, produced
by `lab/we2_softmax.py`), it is saying the model's uncertainty is about as large as if it were
choosing at random among roughly $2^{4.45}$, that is about 22, equally likely words. The lab's
own count of how many tokens hold 90% of the probability at that temperature is 25 (**real**,
same source), which is the same story told a second way.

---

(toolkit-inequalities)=
## 19. Inequality signs and interval notation

### The signs

| Symbol | Say it | What it means | True example |
|---|---|---|---|
| $<$ | "is less than" | the left side is smaller | $3 < 5$ |
| $>$ | "is greater than" | the left side is bigger | $5 > 3$ |
| $\le$ | "is less than or equal to" | smaller, or exactly the same | $3 \le 3$ |
| $\ge$ | "is greater than or equal to" | bigger, or exactly the same | $5 \ge 3$ |
| $\ne$ | "is not equal to" | the two are different numbers | $3 \ne 5$ |
| $\approx$ | "is approximately equal to" | close enough for the purpose at hand | $e \approx 2.718$ |

**Which way does it point?** The wide open end faces the bigger number and the sharp point faces
the smaller one. $5 > 3$ opens towards the 5. Some people picture a mouth that eats the larger
number. Use whatever sticks.

The line underneath in $\le$ and $\ge$ is the "or equal to" part. It is the $=$ sign, tucked in.

### Two inequalities at once

You can pin a number between two others by writing both bounds around it:

$$0 \le p \le 1$$

reads "p is greater than or equal to zero, and less than or equal to one." In plain English: any
probability lies between 0 and 1, and both ends are allowed.

The variable sits in the middle and the smaller bound always goes on the left. This is the shape
used in [Section 17](#toolkit-scientific-notation) to say $1 \le a < 10$, which means "$a$ can
be 1, can be anything up to 10, but cannot be 10 itself."

### Interval notation

An **interval** is a stretch of the number line, and this book writes one as two numbers in
brackets with a comma between.

$$(6.0\%, \; 44.0\%)$$

reads "from 6.0% up to 44.0%."

| Written | Say it | What it means | As an inequality |
|---|---|---|---|
| $(a, b)$ | "the open interval a to b" | everything strictly between $a$ and $b$, ends **not** included | $a < x < b$ |
| $[a, b]$ | "the closed interval a to b" | everything between $a$ and $b$, ends **included** | $a \le x \le b$ |
| $[a, b)$ | "half-open, a to b" | includes $a$, excludes $b$ | $a \le x < b$ |

Round brackets mean the end is **not** part of the interval. Square brackets mean it **is**. For
confidence intervals in this book the difference never changes a conclusion, and this book uses
round brackets throughout.

:::{warning} An interval is not a coordinate pair
$(3, 4)$ in [Section 14](#toolkit-vectors) is a point: 3 across and 4 up. $(6.0\%, 44.0\%)$ here
is an interval: everything between 6.0% and 44.0%.

Same brackets, same comma, two different jobs. What tells them apart is the context and the
units. A coordinate pair appears next to a graph. An interval appears next to a measurement,
and both of its numbers are in the same units as that measurement.
:::

### Formula 20: a confidence interval for an accuracy

**In words.** Take the accuracy you measured, then go out an equal distance either side of it, to
say what range of true values would be consistent with what you saw.

**The formula.**

$$\hat{p} \pm z^{\star} \times SE$$

**The symbols.**

| Symbol | Say it | What it means |
|---|---|---|
| $\hat{p}$ | "p-hat" | the accuracy you measured, as a decimal. See [Section 12](#toolkit-proportions). |
| $\pm$ | "plus or minus" | do the calculation twice: once adding, once subtracting. You get two numbers, the two ends of the interval. |
| $z^{\star}$ | "z-star" | a fixed multiplier set by how confident you want to be. For 95% confidence it is 1.96, and that is the only value this book uses. |
| $\times$ | "times" | multiply |
| $SE$ | "the standard error" | from Formula 6 in [Section 9](#toolkit-square-roots) |

**Out loud.** "p-hat, plus or minus one point nine six times the standard error."

**Worked, with real numbers.** `Qwen2.5-0.5B-Instruct` scored 5 out of 20, so $\hat{p} = 0.25$,
and [Section 9](#toolkit-square-roots) computed $SE = 0.0968$ (**real**, from
`lab/out/we6_eval.json`).

Step 1, multiply the standard error by 1.96.
$1.96 \times 0.0968 = 0.1897$

Step 2, subtract that from the accuracy to get the lower end.
$0.25 - 0.1897 = 0.0603$

Step 3, add it to get the upper end.
$0.25 + 0.1897 = 0.4397$

Step 4, write both ends as percentages, from
[Section 11](#toolkit-percentages), and put them in interval brackets.
$0.0603 \times 100 = 6.03$
$0.4397 \times 100 = 43.97$

$$(6.0\%, \; 44.0\%)$$

That is the interval printed in Chapter 12 (**real**, from `lab/out/we6_eval.json`). The honest
statement about this model is not "it scored 25%." It is "somewhere between about 6% and about
44%, on twenty questions."

**Check it.** Three tests:

- The measured value must sit exactly in the middle. Here 25.0% is halfway between 6.0% and
  44.0%, since $25.0 - 6.0 = 19.0$ and $44.0 - 25.0 = 19.0$. If your two ends are not equally
  spaced round the middle, you made an arithmetic slip.
- The lower end must be smaller than the upper end. If it is not, you swapped the plus and the
  minus.
- A very wide interval is not an error in your arithmetic. It is the answer. At $n = 20$ the
  interval is so wide it settles nothing, and Chapter 12 is about what to do next.

### When the formula gives an impossible answer

Here is a case worth seeing, because it shows that a formula can have assumptions baked into it.

**Worked, with numbers made up for practice.** Suppose a model gets 8 out of 10, so
$\hat{p} = 0.8$ and $n = 10$.

Step 1, the standard error, from Formula 6.
$1 - 0.8 = 0.2$
$0.8 \times 0.2 = 0.16$
$0.16 \div 10 = 0.016$
$\sqrt{0.016} = 0.1265$

Step 2, multiply by 1.96.
$1.96 \times 0.1265 = 0.2479$

Step 3, the two ends.
$0.8 - 0.2479 = 0.5521$
$0.8 + 0.2479 = 1.0479$

The interval is $(0.5521,\; 1.0479)$, that is $(55.21\%,\; 104.79\%)$.

**An accuracy of 104.79% is not possible.** No model answers more than all of the questions. The
arithmetic is correct and the answer is still nonsense, which tells you the formula has
assumptions and this case has broken them. Chapter 12 names the assumption and shows what
statisticians use instead when $n$ is small.

This is a good thing to have met early. A formula is a tool with a range of use, not a
guarantee.

### Inequalities in the language of this book

| In the book | In symbols | What it means |
|---|---|---|
| "a probability" | $0 \le p \le 1$ | between 0 and 1, both ends allowed |
| "the temperature is positive" | $T > 0$ | greater than zero, and zero is not allowed |
| "a cosine similarity" | $-1 \le \cos \le 1$ | from minus one to one, both ends allowed |
| "at least 1,000 questions" | $n \ge 1000$ | a thousand or more |
| "the p-value did not clear 0.05" | $0.0625 > 0.05$ | the measured p-value is bigger than the cut-off |

That last row is **real**. McNemar's exact test on the 1.5B against the 3B model gave
$p = 0.0625$ on twenty questions (**real**, from `lab/out/we7_paired.json`), and 0.0625 is
greater than 0.05, so the 25 percentage point gap between the two models could not be declared
statistically significant. Chapter 13 takes that apart.

---

(toolkit-greek)=
## 20. The Greek letters this book uses

Greek letters are used for the same reason as Latin ones: to name a number. Mathematics ran out
of convenient Latin letters some centuries ago and borrowed the next alphabet along. A Greek
letter carries no extra difficulty; it is a name, and it has a pronunciation.

### The five that matter here

| Letter | Name | Say it | What it means in this book | Where |
|---|---|---|---|---|
| $\alpha$ | alpha | "AL-fa" | a **significance level**: the cut-off you set before a test, almost always 0.05 | Ch. 12, 13 |
| $\mu$ | mu | "MEW" | the **true average** of something, the value you would get from an endless supply of data. Compare $\bar{x}$, the average you actually measured. | Ch. 12 |
| $\sigma$ | sigma, lower case | "SIG-ma" | a **standard deviation**: how spread out a set of numbers is | Ch. 3, 12 |
| $\Sigma$ | Sigma, capital | "SIG-ma" | **add up**. See [Section 10](#toolkit-sigma). | Ch. 4, 5, 8, 9, 12 |
| $\pi$ | pi | "PIE" | the fixed number $3.141593\ldots$ | Ch. 9 |

:::{warning} Two sigmas, two completely different jobs
$\sigma$ and $\Sigma$ are the same letter in lower and upper case, and they are used for
unrelated things.

**Capital $\Sigma$ is an instruction.** It tells you to add things up. It always has something
written after it, and usually numbers above and below it.

**Lower-case $\sigma$ is a quantity.** It is a number, a standard deviation, and it sits in a
formula the way any other number does.

The way to tell them apart in half a second: if it has a start value underneath and a stop
value on top, it is the capital and it means "add." If it is standing alone, it is the
lower-case one and it means "spread."
:::

### The rest of the Greek alphabet you may meet

You will not need these to read this book, and they are here so that no Greek letter anywhere is
a mystery.

| Letter | Name | Say it | Common use |
|---|---|---|---|
| $\beta$ | beta | "BAY-ta" | a slope or a coefficient |
| $\gamma$ | gamma | "GAM-a" | a rate or a scaling factor |
| $\Delta$ | Delta, capital | "DEL-ta" | "the change in". $\Delta x$ is how much $x$ moved. |
| $\delta$ | delta, lower case | "DEL-ta" | a small amount |
| $\epsilon$ | epsilon | "EP-si-lon" | a very small number, or an error term |
| $\theta$ | theta | "THAY-ta" | an angle, or a set of model parameters |
| $\lambda$ | lambda | "LAM-da" | a rate, or a tuning knob |
| $\rho$ | rho | "ROW" | a correlation |
| $\chi$ | chi | "KYE" | a family of statistical tests, written $\chi^2$ |
| $\Phi$ | Phi, capital | "FIE" | a cumulative normal probability |

### Marks that are not letters

These appear on top of, beside, or around a letter, and each one changes its meaning.

| Mark | Example | Say it | What it means |
|---|---|---|---|
| hat | $\hat{p}$ | "p-hat" | a value you **measured**, as opposed to the true value you cannot see |
| bar | $\bar{x}$ | "x-bar" | the **average** of a list |
| star | $z^{\star}$ | "z-star" | a fixed critical value, set by the confidence level |
| plus-minus | $\pm$ | "plus or minus" | do it twice, once adding and once subtracting |
| bold | $\mathbf{a}$ | "vector a" | a whole list of numbers, not a single one |
| single bars | $\lvert x \rvert$ | "absolute value of x" | distance from zero |
| double bars | $\lVert \mathbf{a} \rVert$ | "the length of a" | the length of a vector |
| degree | $16.26^{\circ}$ | "sixteen point two six degrees" | an angle measured in degrees |
| per cent | $25\%$ | "twenty-five per cent" | divided by a hundred |
| the dots | $2.718282\ldots$ | "and so on" | the digits continue |

### Why $\pi$ is in this book at all

$\pi$ is the number you get when you divide the distance around any circle by the distance across
it. It is $3.141593\ldots$, the decimals never stop, and it is the same for every circle.

It is here for two reasons. First, because Chapter 9 measures angles, and angles and circles are
the same subject. Second, because $\pi$ is the clearest example of the idea in
[Section 1](#toolkit-letters): a letter standing for one fixed number that never changes. If you
are comfortable with $\pi$ being a number, you are already comfortable with $e$ being a number,
and $e$ is the one Chapter 4 needs.

---

(toolkit-summary)=
## Everything on one page

Every symbol in this book, with its pronunciation and where it is explained.

| Symbol | Say it | Means | Section |
|---|---|---|---|
| $=$ | "equals" | the two sides are the same number | [1](#toolkit-letters) |
| $a$, $n$, $p$ | a letter | a number with a name | [1](#toolkit-letters) |
| $z_i$ | "z sub i" | the $i$-th item in a list called $z$ | [2](#toolkit-subscripts) |
| $W_{i,j}$ | "W sub i j" | the number in row $i$, column $j$ | [2](#toolkit-subscripts) |
| $\times$, $\cdot$, $3(4)$, $ab$ | "times" | multiply | [3](#toolkit-multiplication) |
| $\dfrac{a}{b}$, $a/b$ | "a over b" | divide $a$ by $b$ | [4](#toolkit-fraction-bar) |
| $a^n$ | "a to the n" | $a$ multiplied by itself $n$ times | [5](#toolkit-exponents) |
| $a^0$ | "a to the zero" | 1, for any $a$ other than 0 | [5](#toolkit-exponents) |
| $a^{-n}$ | "a to the minus n" | one divided by $a^n$ | [6](#toolkit-negative-exponents) |
| $e$ | "e" | the fixed number $2.718282\ldots$ | [7](#toolkit-e) |
| $e^x$, $\exp(x)$ | "e to the x" | $e$ raised to the power $x$ | [7](#toolkit-e) |
| $\log_2(x)$ | "log base two of x" | the power of 2 that gives $x$ | [8](#toolkit-logarithms) |
| $\sqrt{x}$ | "the square root of x" | what number times itself gives $x$ | [9](#toolkit-square-roots) |
| $SE$ | "the standard error" | how much a measured value would wobble | [9](#toolkit-square-roots) |
| $\sum_{i=1}^{n} x_i$ | "the sum from i equals 1 to n of x sub i" | add them all up | [10](#toolkit-sigma) |
| $\bar{x}$ | "x-bar" | the average of a list | [10](#toolkit-sigma) |
| $s$ | "ess" | the standard deviation | [10](#toolkit-sigma) |
| $H$ | "aitch" | entropy, in bits | [10](#toolkit-sigma) |
| $\%$ | "per cent" | divided by one hundred | [11](#toolkit-percentages) |
| $\hat{p}$ | "p-hat" | a measured proportion, $x/n$ | [12](#toolkit-proportions) |
| $x$, $n$ | "ex", "en" | how many right, how many asked | [12](#toolkit-proportions) |
| x-axis, y-axis | | across, and up | [13](#toolkit-graphs) |
| $(3, 4)$ | "the point three four" | a coordinate pair, or a 2-D vector | [14](#toolkit-vectors) |
| $\mathbf{a}$ | "vector a" | a list of numbers | [14](#toolkit-vectors) |
| $\mathbf{a} \cdot \mathbf{b}$ | "a dot b" | the dot product, a single number | [14](#toolkit-vectors) |
| $D$ | "dee" | how many numbers a vector holds | [14](#toolkit-vectors) |
| $\lvert x \rvert$ | "absolute value of x" | distance from zero | [15](#toolkit-absolute-value) |
| $\lVert \mathbf{a} \rVert$ | "the length of a" | the length of a vector | [15](#toolkit-absolute-value) |
| $a \times 10^{b}$ | "a times ten to the b" | scientific notation | [17](#toolkit-scientific-notation) |
| $2^{b}$ | "two to the b" | how many values fit in $b$ bits | [18](#toolkit-powers-of-two) |
| $<$, $>$, $\le$, $\ge$, $\ne$, $\approx$ | see [19](#toolkit-inequalities) | comparisons | [19](#toolkit-inequalities) |
| $(a, b)$ | "the interval a to b" | everything between $a$ and $b$ | [19](#toolkit-inequalities) |
| $\pm$ | "plus or minus" | do it twice, adding then subtracting | [19](#toolkit-inequalities) |
| $\alpha$ | "AL-fa" | a significance level, usually 0.05 | [20](#toolkit-greek) |
| $\mu$ | "MEW" | a true average | [20](#toolkit-greek) |
| $\sigma$ | "SIG-ma" | a standard deviation | [20](#toolkit-greek) |
| $\Sigma$ | "SIG-ma" | add up | [20](#toolkit-greek) |
| $\pi$ | "PIE" | the fixed number $3.141593\ldots$ | [20](#toolkit-greek) |

---

(toolkit-check)=
## Twenty problems, with full solutions

Work them with a calculator. Every solution shows every step. The section link on each problem
takes you back to the explanation if you want it first.

:::{dropdown} 1 to 5: letters, subscripts, multiplication, fractions, exponents
**1.** ([Section 1](#toolkit-letters)) A model produces $n = 85$ tokens and each one costs
$p = 0.767$ joules. Use $C = n \times p$ to find the total energy.

**2.** ([Section 2](#toolkit-subscripts)) Given $z_1 = 17.2173$ and $z_3 = 15.6955$, find
$z_1 - z_3$.

**3.** ([Section 3](#toolkit-multiplication)) Work out $896 \times 896$.

**4.** ([Section 4](#toolkit-fraction-bar)) Work out $\frac{3 + 9}{4}$, then work out
$3 + \frac{9}{4}$. Say why they differ.

**5.** ([Section 5](#toolkit-exponents)) Work out $2^{6}$, $10^{0}$ and $5^{3}$.

---

**Solutions.**

**1.** $C = 85 \times 0.767 = 65.195$ joules. The lab's recorded total for that run was 65.2
joules (**real**, from `lab/out/theme_s_energy.json`), so the two agree to one decimal place.
Check: 85 times roughly 0.8 is about 68, so an answer near 65 is right.

**2.** $17.2173 - 15.6955 = 1.5218$. Check: the answer is positive, which it must be, because
$z_1$ is the largest logit in the list.

**3.** Break it up: $896 \times 900 = 806{,}400$ and $896 \times 4 = 3{,}584$. Subtract:
$806{,}400 - 3{,}584 = 802{,}816$. Check against the rough version: $900 \times 900 = 810{,}000$,
so 802,816 is the right size. That is the number of weights in one real attention matrix
(**real**, `lab/out/we3_params_quant.json`).

**4.** $\frac{3+9}{4} = \frac{12}{4} = 3$. And $3 + \frac{9}{4} = 3 + 2.25 = 5.25$. They differ
because the fraction bar has invisible brackets round everything above it: the first expression
adds before dividing, the second divides before adding.

**5.** $2^{6} = 2 \times 2 \times 2 \times 2 \times 2 \times 2 = 64$. $10^{0} = 1$, because
anything to the power zero is 1. $5^{3} = 5 \times 5 \times 5 = 125$.
:::

:::{dropdown} 6 to 10: negative exponents, e, logs, roots, sigma
**6.** ([Section 6](#toolkit-negative-exponents)) Write $2^{-5}$ as a fraction and as a decimal.

**7.** ([Section 7](#toolkit-e)) Compute $e^{0}$, $e^{1}$ and $e^{3}$, each to six decimal
places.

**8.** ([Section 8](#toolkit-logarithms)) Compute $\log_2(64)$ and $\log_2(0.25)$.

**9.** ([Section 9](#toolkit-square-roots)) Compute $\sqrt{0.16}$ and $\sqrt{36 + 64}$.

**10.** ([Section 10](#toolkit-sigma)) Given $x_1 = 2$, $x_2 = 6$, $x_3 = 7$, $x_4 = 5$, compute
$\sum_{i=1}^{4} x_i$ and then $\bar{x}$.

---

**Solutions.**

**6.** $2^{5} = 32$, so $2^{-5} = \frac{1}{32}$. As a decimal, $1 \div 32 = 0.03125$. Check: it
is between 0 and 1, and half of $2^{-4} = 0.0625$.

**7.** $e^{0} = 1.000000$. $e^{1} = 2.718282$. $e^{3} = 20.085537$. Check: each is bigger than
the one before, and all three are positive.

**8.** $\log_2(64)$: climb the ladder, $2^6 = 64$, so the answer is **6**. $\log_2(0.25)$: from
negative exponents, $2^{-2} = 0.25$, so the answer is **$-2$**. Check both by reversing:
$2^{6} = 64$ and $2^{-2} = 0.25$.

**9.** $\sqrt{0.16} = 0.4$, because $0.4 \times 0.4 = 0.16$. $\sqrt{36 + 64} = \sqrt{100} = 10$.
Finish under the bar first. Splitting it would give $6 + 8 = 14$, which is wrong.

**10.** The sum: $2 + 6 + 7 + 5 = 20$. The mean: $n = 4$, so $\bar{x} = 20 \div 4 = 5$. Check:
5 lies between the smallest value, 2, and the largest, 7.
:::

:::{dropdown} 11 to 15: percentages, proportions, graphs, vectors, magnitude
**11.** ([Section 11](#toolkit-percentages)) Convert 0.072 to a percentage, and 44.0% to a
decimal.

**12.** ([Section 11](#toolkit-percentages)) A score goes from 25.0% to 35.0%. State the change
in percentage points, and the change in percent.

**13.** ([Section 12](#toolkit-proportions)) A model gets 13 out of 20. Give the proportion as a
fraction, a decimal and a percentage.

**14.** ([Section 14](#toolkit-vectors)) Compute the dot product of $(2, 5)$ and $(3, 1)$.

**15.** ([Section 15](#toolkit-absolute-value)) Compute $\lvert -0.02698 \rvert$ and
$\lVert (5, 12) \rVert$.

---

**Solutions.**

**11.** $0.072 \times 100 = 7.2\%$. And $44.0 \div 100 = 0.44$. Check: the percentage is the
bigger-looking number in both cases.

**12.** Percentage points: $35.0 - 25.0 = 10.0$ percentage points. Percent:
$(35.0 - 25.0) \div 25.0 = 0.4$, and $0.4 \times 100 = 40\%$. The score rose by 10 percentage
points, which is a 40% relative increase. Both 25.0% and 35.0% are **real** scores of the same
model on the same twenty questions under two different scoring procedures
(`lab/out/we6b_eval_debiased.json`).

**13.** $\frac{13}{20}$. Divide: $13 \div 20 = 0.65$. Multiply by 100: $65\%$. Check: it is
between 0 and 1, and a bit under two thirds.

**14.** $2 \times 3 = 6$ and $5 \times 1 = 5$. Add: $6 + 5 = 11$. Check: both vectors point up
and to the right, so a positive dot product is expected.

**15.** $\lvert -0.02698 \rvert = 0.02698$; drop the minus sign. For the magnitude:
$5^2 = 25$, $12^2 = 144$, $25 + 144 = 169$, $\sqrt{169} = 13$. Check: 13 is bigger than the
largest coordinate, 12, which is always true.
:::

:::{dropdown} 16 to 20: rounding, scientific notation, bits, intervals, Greek
**16.** ([Section 16](#toolkit-rounding)) Round $1.940526247555462$ to three decimal places, to
one decimal place, and to two significant figures.

**17.** ([Section 17](#toolkit-scientific-notation)) Write $1{,}543{,}714{,}304$ and $0.000045$
in scientific notation.

**18.** ([Section 18](#toolkit-powers-of-two)) How many values fit in 6 bits? How many bytes does
a model with 1,543,714,304 parameters take at FP16?

**19.** ([Section 19](#toolkit-inequalities)) A measured accuracy is 0.70 with a standard error
of 0.1025. Give the 95% interval, using $z^{\star} = 1.96$.

**20.** ([Section 20](#toolkit-greek)) Say out loud, and explain in one sentence each:
$\sum_{i=1}^{3} x_i$, $\sigma = 0.0667$, $\hat{p} = 0.25$, $\alpha = 0.05$.

---

**Solutions.**

**16.** Three decimal places: the fourth digit after the point is 5, so the third rounds up.
$1.940526\ldots \to \mathbf{1.941}$. One decimal place: the second digit after the point is 4,
under 5, so nothing changes. $\to \mathbf{1.9}$. Two significant figures: count from the first
non-zero digit, so keep 1 and 9; the next digit is 4, under 5. $\to \mathbf{1.9}$. The starting
number is **real**: joules per token for `Qwen2.5-3B-Instruct`
(`lab/out/theme_s_energy.json`).

**17.** $1{,}543{,}714{,}304 = 1.543714304 \times 10^{9}$; the point moved 9 places left, so the
exponent is positive 9. To three significant figures, $1.54 \times 10^{9}$. And
$0.000045 = 4.5 \times 10^{-5}$; the point moved 5 places right, so the exponent is negative 5.
The parameter count is **real** (`lab/out/theme_s_energy.json`).

**18.** $2^{6} = 64$ values. For the file size: FP16 is 2 bytes per parameter, so
$1{,}543{,}714{,}304 \times 2 = 3{,}087{,}428{,}608$ bytes. Divide by $10^{9}$ to get
**3.087 GB**, which matches the lab's recorded `size_fp16_gb` of 3.087428608 (**real**,
`lab/out/lab4_size_ladder.json`).

**19.** $1.96 \times 0.1025 = 0.2009$. Lower end: $0.70 - 0.2009 = 0.4991$. Upper end:
$0.70 + 0.2009 = 0.9009$. As percentages, the interval is $(49.9\%,\; 90.1\%)$. Check: 70.0% is
exactly in the middle, since $70.0 - 49.9 = 20.1$ and $90.1 - 70.0 = 20.1$. The 0.70 accuracy
and its 0.1025 standard error are **real** (`lab/out/lab4_size_ladder.json`, for
`Qwen2.5-1.5B-Instruct`).

**20.**
$\sum_{i=1}^{3} x_i$ is "the sum from i equals one to three of x sub i," meaning add up the
first three numbers in the list $x$.
$\sigma = 0.0667$ is "sigma equals nought point oh six six seven," meaning the standard
deviation, that is the typical spread, is 0.0667.
$\hat{p} = 0.25$ is "p-hat equals nought point two five," meaning the accuracy measured on this
sample is 25%.
$\alpha = 0.05$ is "alpha equals nought point oh five," meaning the significance cut-off chosen
before the test was 5%.
:::

---

## If a symbol is not on this page

Every chapter defines its own new symbols where it uses them, and
[the Formula Sheet](formulas.md) collects every named formula in the book in one place with a
worked instance of each.

If you meet a symbol in this book that is defined neither here, nor in the chapter using it, nor
on the Formula Sheet, that is a defect in the book rather than a gap in your preparation. Tell
your instructor so it can be fixed for the next reader.
