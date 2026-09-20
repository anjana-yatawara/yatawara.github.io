---
title: "Glossary"
short_title: Glossary
subtitle: "MATH 3219: every term the course uses, alphabetically, with the chapter that defines it"
description: "Plain-language definitions of every technical term in Inside the Machine, each with the chapter where it is introduced, a small concrete example drawn from the book's own measurements, and a note wherever the term is commonly misused."
---

Every boldfaced term from Chapters 1 through 15, collected in one place. Each entry gives
a plain-language definition, names the chapter where the term is introduced, and where it
helps, a small concrete example. A few terms come back later with a sharper sense; that is
noted in the entry.

Chapter numbers are week numbers. Chapter 7 is Week 7.

## How to read an entry

Each entry has the form **Term**: definition. (Ch. N). Example.

Some words carry two different technical meanings, and a few carry a technical meaning
and a loose everyday one. Those entries end with a line beginning *Not to be confused
with*. Three of them matter enough to get their own box: **bias**, **parameter** and
**temperature**. Read those three boxes even if you skip the rest of this appendix.

```{admonition} Where the numbers come from
:class: note
Every figure quoted below was computed by a script in `lab/` and written to a JSON file in
`lab/out/`. Nothing here is recalled, estimated, or rounded to look tidier than it is.
Where a quantity has not been measured yet, the entry says `[to be measured]` rather than
offering a plausible number.
```

```{dropdown} Chapter numbers and titles
| Ch. | Title |
|---|---|
| 1 | Where is this running, and what did it cost? |
| 2 | Numbers all the way down: tokens |
| 3 | What is a parameter? |
| 4 | The probability of the next word |
| 5 | Temperature, and what it does not do |
| 6 | Bits, precision, and rounding |
| 7 | Quantization: what you lose, what it buys |
| 8 | A sentence is an arrow |
| 9 | Similarity is geometry |
| 10 | Retrieval: the open-book exam |
| 11 | Can a model take a test? |
| 12 | Is that score real? |
| 13 | Measure your measurement |
| 14 | Bias in the benchmark, and who pays |
| 15 | Capstone |
```

## A

**Absolute value**: The size of a number with its sign thrown away, written $|x|$. (Ch. 3). Example: the
median absolute value of the 802,816 numbers in one attention weight matrix is 0.02698, which says
that a typical weight is tiny whichever way it points. See
[Toolkit 15](math-toolkit.md#toolkit-absolute-value).

**Access line**: The amount of memory a particular machine has free for a model. A model fits
below the line or it does not run at all; there is no partial credit. (Ch. 14, argued in Ch. 7).
Example: a 4 GB card holds the 0.99 GB and 3.09 GB models and not the 6.17 GB one.

**Accuracy**: The share of benchmark questions a model answers correctly, $\hat p = x/n$.
Because it is computed from a sample of questions, it is a random variable, not a fixed
property of the model. It is also not a property of the model alone: it belongs to the
scoring procedure that produced it, so an accuracy is only complete when the procedure is
named. (Ch. 11, sharpened in Ch. 13). Example: scored by the log-probability of the letter,
the 0.5B model answered 5 of 20 questions on the course bank, $\hat p = 0.25$; scored by
four-way option rotation it answered 3 of 20, $\hat p = 0.15$.
*Not to be confused with* a number you can report on its own. Accuracy without an interval
is half a result; see **confidence interval**.

**Accuracy points per unit of extra energy**: How many percentage points of accuracy a step up
in model size buys, divided by the factor by which that step multiplies the energy per token. It
asks which step is the better bargain. (Ch. 7, used again in Ch. 14). Example: the step from the
0.5B to the 1.5B gains 55 points at 1.48 times the energy; the step from the 1.5B to the 3B gains
25 points at 1.71 times.

**Angle**: How far apart two arrows point, measured in degrees. Cosine similarity is a number
between $-1$ and 1; the angle is the same fact in a unit you can picture. (Ch. 9). Example:
$(3,4)$ and $(4,3)$ have cosine 0.9600 and an angle of 16.26 degrees; $(3,4)$ and $(-4,3)$ have
cosine 0 and an angle of 90 degrees.

**Answer extraction**: Turning a model's output into one scored choice. How you do it is a
decision you make, not a fact you read off. (Ch. 11, revisited Ch. 13). Example: three
defensible extraction procedures gave 25.0%, 35.0% and 15.0% on the same model and the
same twenty questions.

**Arccos**: The operation that turns a cosine back into the angle that produced it. (Ch. 9).
Example: $\arccos(0.9600) = 16.26$ degrees.
*Not to be confused with* a similarity. Arccos runs the other way: similarity goes in, degrees
come out.

**Argmax**: The operation that returns *which* item in a list is largest, not how large it
is. (Ch. 5). Example: over the Chapter 4 logits the argmax is token id 12095, `' Paris'`.
*Not to be confused with* the maximum itself, which here is the logit value 17.2173.
Argmax answers "which one"; max answers "how big".

**Attention**: The part of the network that lets each position in the text look back at
earlier positions and decide how much weight to give each one. (Ch. 3).
*Not to be confused with* the model as a whole. In Qwen2.5-0.5B-Instruct all four
attention projections together are 8.92% of the parameters, the smallest of the three
groups. The famous part is not the big part.

**Axis**: One of the two reference lines a pair of coordinates is measured against, usually drawn
across and up. (Ch. 8).

## B

**Benchmark**: A fixed set of questions with known answers, used to score a model.
(Ch. 11). The bank built for this course has 20 questions, which Chapter 12 shows is far
too small to settle anything; Miller (arXiv:2411.00640) recommends at least 1,000
questions for an evaluation to signal reliably.

**Bias**: One word, two unrelated technical meanings. The course uses both and always says
which.

**Bias (fairness)**: A pattern in which a system works less well for some groups of people
than others, or reproduces an unfair pattern present in its training data. (Ch. 14).

**Bias (statistical)**: A systematic error that pushes a measurement the same way every
time, so collecting more data does not remove it. (Ch. 13). Example: scoring by the
log-probability of the letters A, B, C and D gave the 0.5B model 25.0%, because it picked
A on 16 of 20 questions while the correct answers were spread B: 8, C: 8, D: 2, A: 2. The
procedure was measuring a preference for the letter A, not knowledge of statistics.

```{admonition} These are two different meanings of one word
:class: warning
A statistically biased measurement is an instrument that reads wrong in a fixed direction.
An unfair system is a social and ethical claim about who is served worse. They are not the
same thing, and neither implies the other. A perfectly unbiased scoring procedure can
measure an unfair system accurately, and a biased procedure can produce a wrong number
about a system that is perfectly fair. When this book writes "bias" with no qualifier it
means the statistical sense; Chapter 14 says "fairness", or names the group, whenever it
means the other.
```

**Binomial probability**: The chance of getting exactly a stated number of questions right,
when every question is independent and each is right with the same probability. (Ch. 14).
Example: on 20 questions with four options, the chance of exactly 5 right by guessing is the
binomial probability at $n = 20$, $x = 5$, $p = 0.25$.

**Bit**: A single binary digit, 0 or 1. With $b$ bits you can name $2^b$ distinct values.
(Ch. 6). Example: 4 bits give 16 levels, and those 16 levels are all a 4-bit quantizer has
to represent every weight in a block.

**Bit width**: How many bits are used to store one number. Fewer bits means fewer distinct values
the format can name. (Ch. 6). Example: the course measures bit widths of 8, 6, 4, 3 and 2 on the
same weight matrix.

**Block**: A small run of neighbouring weights that share one quantization scale, so that one huge
weight cannot set the scale for a whole tensor. (Ch. 7). Example: with 32-weight blocks the mean
4-bit error falls from 46.6% to 7.2%.

**Blockwise quantization**: Quantization that splits a weight matrix into small blocks, 32
weights each in this book, and gives every block its own scale, so a single large weight
cannot spoil the whole tensor. (Ch. 7). Example: at 4 bits the mean error falls from 46.6%
of the weight standard deviation with one scale per tensor to 7.2% with one scale per
32-weight block.

**Board power**: The electrical power the whole graphics card draws, measured at the card rather
than at the chip. It includes the memory and the fans. (Ch. 7). Example: the lab card drew a mean
of 21.3 W while the 0.5B model wrote and 30.2 W while the 3B did.
*Not to be confused with* the power of the machine. Board power leaves out the processor, the
memory, the power supply's losses, the screen and the cooling.

**Bootstrap**: A way of seeing how much a statistic would wobble, by drawing new samples of
the same size from your own data, with replacement, and recomputing the statistic each
time. (Ch. 12). Example: 10,000 bootstrap resamples of the 20-question run, seeded
20260912, gave a mean of 24.8%, a standard deviation of 9.74 percentage points, and a 95%
interval from 5.0% to 45.0%.

**Byte**: Eight bits. Model files are measured in bytes, which is why the storage format
sets the file size directly. (Ch. 6). Example: 494,032,768 parameters at FP16, two bytes
each, occupy 0.988 GB.

## C

**Categorical variable**: A variable whose values are names or labels rather than amounts,
so arithmetic on them means nothing. (Ch. 2, revisited Ch. 14). Example: a token id is
categorical. Id 12095 is `' Paris'`; id 12096 is not "one more than Paris". The vocabulary
of Qwen2.5-0.5B-Instruct is a categorical variable with 151,936 categories.

**Chance level**: The score a model would get by guessing, with no knowledge at all.
(Ch. 11). On four-option questions it is 25%, which is exactly what the first scoring
procedure gave the 0.5B model. A result sitting on chance is a reason to check the
procedure, not to report the number.

**Characters per token**: The number of characters in a piece of text divided by the number of
tokens that text became. It describes one text as handled by one tokenizer, and it is not
comparable across tokenizers unless you say so. (Ch. 2).

**Chat template**: The wrapper of special tokens an instruction-tuned model expects around
your text, marking where your turn ends and the model's begins. (Ch. 4).
*Not to be confused with* the prompt. The prompt is your words; the template is the
scaffolding wrapped around them before the model sees anything.

```{admonition} The chat template will break your first logits experiment
:class: warning
Ask Ollama for the next token after `The capital of France is` without setting
`"raw": true` and it applies the chat template first. Your sentence becomes a
conversational turn, so the "next token" is the first token of a *reply*. It came back as
`'The'` at 99.9993%, a log-probability of $-6.53 \times 10^{-6}$. That looks like a model
with no uncertainty whatsoever, and it teaches the opposite of the lesson. With
`"raw": true` the same prompt gives the real continuation distribution, in which
`' Paris'` holds 54.25% for the 7B model.
```

**Chunk**: A short passage a document is cut into before retrieval, so that a search
returns a paragraph you can paste into a prompt rather than a whole report. (Ch. 10).

**Concordant pair**: In a paired comparison, a question on which both systems agreed, both
right or both wrong. Concordant pairs carry no information about which system is better.
(Ch. 13). Example: of 20 questions, 15 were concordant, 14 with both models correct and 1
with both wrong.

**Confidence interval**: A range of values for an unknown quantity, built by a rule that
captures the truth in a stated share of repeated samples. (Ch. 12). Example: the
20-question accuracy of 25.0% from the letter-scoring procedure carries a 95% Wald interval
from 6.0% to 44.0%.
*Not to be confused with* "a 95% chance the truth lies in this interval". The truth stays
put; it is the interval that moves from sample to sample.

**Confound**: A second thing that changed at the same time as the thing you meant to change, so
that the result cannot be credited to either one. (Ch. 9, revisited Ch. 11). Example: comparing a
bigger model on a different prompt format confounds size with format.

**Consistency under rotation**: The count of questions on which a model gives the same answer
no matter where the options are placed. It measures whether the model knows the material, which
is a different question from whether it scored well. (Ch. 11). Example: 1 of 20 for the 0.5B
model, 13 of 20 for the 1.5B, 18 of 20 for the 3B.

**Context length**: The largest number of tokens a model can have in front of it at once,
prompt and generated text together. Anything beyond it has to be dropped or summarised,
which is one of the reasons retrieval exists. (Ch. 2, revisited Ch. 10). It is counted in
tokens, not words: the prompt `The capital of France is` is five tokens,
`[785, 6722, 315, 9625, 374]`. The context length of the three models used in this course
is [to be measured].

**Contingency table**: A two-by-two count of how two systems agreed and disagreed on the
same items. (Ch. 13). Example: on the same 20 questions the 1.5B and 3B models were both
correct on 14, both wrong on 1, and disagreed on 5, all 5 in the 3B's favour.

**Controlled experiment**: A comparison in which one thing is varied and everything else is
held fixed, so a difference in the result can be attributed to the one thing. (Ch. 9, revisited
Ch. 11). Example: the size ladder holds the model family, the question bank, the prompt format
and the machine fixed, and moves only the parameter count.

**Coordinates**: The list of numbers that says where a point sits, one number for each axis.
(Ch. 8). Example: $(3, 4)$ means three along and four up.

**Corpus**: The collection of documents a retrieval system searches. (Ch. 10). Lab 2 uses
a Kern County and CSUB corpus, so you can check the answers yourself.

**Cosine similarity**: The dot product of two vectors divided by both of their lengths,
giving a number from $-1$ to $1$ that depends only on direction. (Ch. 9). Formula:
$\cos\theta = \dfrac{a \cdot b}{\lVert a \rVert \, \lVert b \rVert}$. Example: $a=(3,4)$
and $d=(6,8)$ point in exactly the same direction, and their cosine is 1.0000 even though
$d$ is twice as long. That is why you divide by the lengths: length is not meaning.
*Not to be confused with* a distance. Cosine is *large* when two things are alike; a
distance is *small* when they are alike.

**Critical value**: The multiplier a confidence level asks you to use. (Ch. 12). Example: 95 per
cent confidence uses 1.96, so the interval is the estimate plus and minus 1.96 standard errors.

## D

**Debiasing gap**: The naive score minus the debiased score for the same model on the same
questions. A large gap says the naive procedure was reading something other than knowledge.
(Ch. 13). Example: 10 points for the 0.5B model, 10 points for the 1.5B, 0 points for the 3B.

**Degree**: The unit an angle is measured in. A quarter turn is 90 degrees. (Ch. 9).

**Dequantize**: Turn a stored small integer back into the number it stands for, by multiplying
by the scale. Every quantized model does this to run. (Ch. 7).

**Diagonal**: The entries of a square table where the row and the column are the same. In a
similarity matrix they are every sentence compared with itself. (Ch. 9). Example: the diagonal of
a cosine similarity matrix is all ones.

**Dimension**: How many numbers a vector holds. (Ch. 8, revisited Ch. 9). Example: the hand
examples use 2 dimensions; `all-MiniLM-L6-v2` produces 384.

**Disaggregation**: Breaking one overall score into the separate scores of named slices, so that
a failure confined to one slice becomes visible. (Ch. 14). Example: splitting a 20-question bank
by topic turns one accuracy into nine.

**Discordant pair**: In a paired comparison, a question on which the two systems disagreed,
one right and one wrong. These are the only items that carry information about which system
is better. (Ch. 13). Example: 5 discordant pairs, all 5 favouring the 3B model, none
favouring the 1.5B.

**Distributional cost**: Who bears the cost of a computation, as opposed to how large the cost
is. Two systems can spend the same energy and put the bill in very different places. (Ch. 14).

**Dot product**: Multiply two vectors entry by entry, then add the results, giving a single
number. (Ch. 8). Formula: $a \cdot b = \sum_i a_i b_i$. Example:
$(3,4) \cdot (4,3) = 3(4) + 4(3) = 24$, and $(3,4) \cdot (-4,3) = 0$, which is what
perpendicular looks like in arithmetic.

## E

**e**: A fixed number, 2.718281828 and on for ever, which is the base softmax uses. Nothing in
the course asks you to derive it; you only need to know it is a little under 3 and that your
calculator has a key for it. (Ch. 4). See [Toolkit 7](math-toolkit.md#toolkit-e).

**Embedding**: A list of numbers standing in for a token, a sentence or a document,
arranged so that things with similar meanings sit near one another. (Ch. 3, revisited
Ch. 9). Example: `all-MiniLM-L6-v2` turns any sentence into 384 numbers. The two
Bakersfield sentences score 0.833 against each other and 0.084 against a sentence about a
cat.

**Energy per token**: The electrical energy spent producing one token, in joules. (Ch. 7).
Example, measured on the lab GPU: 0.767 J per token for the 0.5B model, 1.133 for the
1.5B, 1.941 for the 3B, so the 3B costs 2.53 times the 0.5B for each token it writes.
These are GPU board power only, with no CPU, RAM, power-supply losses, display or cooling,
so they are a lower bound on the energy of local inference.

**Entropy**: A measure, in bits, of how spread out a probability distribution is. Low
entropy means the model has nearly made up its mind; high entropy means it has not.
(Ch. 5). Example: one fixed set of logits has entropy 0.237 bits at $T = 0.25$, 4.450 bits
at $T = 1.0$, and 13.367 bits at $T = 2.0$. The logits never changed; only the temperature
did.

**Exponential**: The operation that raises $e$ to a power, written $e^{x}$ or $\exp(x)$. It turns
any number, including a negative one, into a positive one, and it turns addition into
multiplication. (Ch. 4). Example: $e^{2} = 7.389056$, $e^{1} = 2.718282$, $e^{0} = 1$. See
[Toolkit 7](math-toolkit.md#toolkit-e).

## F

**Factorial**: Written with an exclamation mark, it means multiply every whole number from this
one down to 1. (Ch. 14). Example: $4! = 4 \times 3 \times 2 \times 1 = 24$. By convention
$0! = 1$.

**Floating point**: The way a computer stores numbers that are not whole, as a sign, an
exponent, and a fixed number of significant digits. Fewer bits means fewer values it can
represent, so more rounding. (Ch. 6). FP32 uses four bytes per number, FP16 two, and INT8
one. Example: the same 494,032,768 parameters take 1.976 GB at FP32, 0.988 GB at FP16, and
0.494 GB at INT8.

**Forward pass**: One run of the model over one input, producing one set of logits. Scoring a
question costs one forward pass per option you score. (Ch. 11).

## G

**Gap (quantization)**: Also called the step: the distance from one representable level to the
next. A small gap means the format can tell nearby numbers apart; a large gap means it cannot.
(Ch. 6).
*Not to be confused with* the mean gap in retrieval, which is the distance between the first and
second results of a search.

**GGUF**: The single-file format used by `llama.cpp` and Ollama to ship a quantized model,
weights and tokenizer together, ready to run. (Ch. 7). Example: `qwen2.5:7b` in GGUF at
Q4_K_M is 4.7 GB.

**Gibibyte**: 1,073,741,824 bytes, which is $2^{30}$. Graphics cards are sold in gigabytes and
measured in gibibytes, which is where a great deal of confusion starts. (Ch. 1). Example: a card
sold as "4 GB" holds 4,294,967,296 bytes.
*Not to be confused with* a gigabyte, which is smaller.

**Gigabyte**: 1,000,000,000 bytes, written GB. (Ch. 1). Example: 494,032,768 parameters at two
bytes each is 988,065,536 bytes, which is 0.988 GB.

**Granularity**: How coarse the set of possible answers is. A small test can only produce a few
distinct scores, so a difference smaller than one step is not measurable at all. (Ch. 12).
Example: 20 questions admit 21 possible accuracies, and 10,000 bootstrap resamples produced only
14 distinct ones.

**Greedy decoding**: Taking the single highest-probability token at every step, with no
randomness at all, so the same prompt always produces the same output. (Ch. 5). Every
generation in this book is greedy or scored from log-probabilities; the one random
procedure, the bootstrap, is seeded.
*Not to be confused with* good decoding. "Greedy" describes the rule, take the biggest
number available now, and is not a compliment.

## H

**Hallucination**: A fluent, confident output that is false. The model is producing
likely-sounding text; nothing in the machinery checks facts. (Ch. 10, revisited Ch. 13).
*Not to be confused with* a low-probability output. Probability here is about which text is
likely, never about which text is true. The model gave `' Paris'` 30.219% and a
fill-in-the-blank token 12.315% on the same step; neither number is a claim about the
world.

**Hits at rank 1**: The count of questions for which the correct passage came back first. It is
the plainest retrieval score there is. (Ch. 10). Example: heading-aware chunks with
`all-MiniLM-L6-v2` scored 3 of 6; the same chunks with `bge-small-en-v1.5` scored 6 of 6.

**Hosted model**: A model that runs on somebody else's machine and is reached over the network.
You cannot measure its energy, its memory or its weights. (Ch. 1).
*Not to be confused with* a large model. Hosted describes where it runs, not how big it is.

## I

**Idle power**: The power a GPU draws with nothing running. Every job is charged for it,
which is why short jobs look expensive per token. (Ch. 7). Example: idle was 13.8 W on the
lab machine, against a 21.3 W mean while the 0.5B model generated. The honest marginal cost
of that run is 0.268 J per token above idle, against 0.767 J per token all in.

**Inference**: Running a trained model to produce output. It happens every time anyone uses
the model; training happened once. (Ch. 1).
*Not to be confused with* statistical inference, which means drawing a conclusion about a
population from a sample and is what Chapters 11 to 14 do. Both senses appear in this book,
sometimes on the same page, and the text always names which one it means.

**Instruct model**: A model given extra training so it follows instructions and holds a
conversation, rather than only continuing text. (Ch. 1). All three Qwen2.5 models used in
this course are `-Instruct` versions, which is why the chat template matters.

**INT8**: An eight-bit integer format, one byte per weight. See **floating point** and
**quantization**. (Ch. 6).

**Item**: One question on a benchmark. The word matters because accuracy is a count over items,
and the number of items sets how precise that count can be. (Ch. 11).

## J

**Joule (J)**: The unit of energy. One watt drawn for one second is one joule. (Ch. 7).

## K

**Kilowatt-hour**: A thousand watt-hours, and the unit an electricity bill is written in. (Ch. 7,
used in Ch. 14). Example: 1,000 tokens from the 0.5B model took 0.213 Wh, which is 0.000213
kilowatt-hours.

**K-quant**: The family of blockwise quantization schemes used inside GGUF files, with
names like Q4_K_M. They use one scale per small block, which is the fix Chapter 7 derives
from first principles. (Ch. 7).

## L

**Length normalisation**: Dividing a score by how long the thing scored is, so that longer
options are not punished for having more tokens. (Ch. 13). Example: scoring the option text with
length normalisation moved the 0.5B model from 25.0% to 35.0% on the same twenty questions.

**Length (of a vector)**: How long the arrow is, written $\lVert a \rVert$ and found by squaring
every coordinate, adding, and taking the square root. Also called the norm or the magnitude.
(Ch. 8). Example: the length of $(3, 4)$ is $\sqrt{9 + 16} = 5$.

**Local model**: A model whose weights sit on your own machine, so you can weigh the file, count
the parameters and meter the electricity. (Ch. 1). Every measurement in this book is of a local
model, which is why the numbers exist at all.

**Logit**: The raw score a model assigns each token in the vocabulary, before anything
turns it into a probability. Logits can be negative and do not add up to anything in
particular. (Ch. 4). Example: for `The capital of France is` the 151,936 logits ran from
$-14.495$ to $17.217$, the largest belonging to `' Paris'` and the second largest,
16.3196, to `' ______'`, a fill-in-the-blank token.

**Log-probability**: The natural logarithm of a probability. It is always zero or negative,
and closer to zero means more likely. Models work in logs because multiplying many small
probabilities underflows to zero, while adding their logarithms does not. (Ch. 4). Example:
a probability of 99.9993% is a log-probability of $-6.53 \times 10^{-6}$.

## M

**Magnitude**: How big a number is, ignoring its sign. In Chapter 6 it is the range a storage
format has to cover; in Chapter 8 it is another word for the length of a vector. (Ch. 6,
Ch. 8).

**Majority vote**: Asking the same question several ways and keeping the answer that came back
most often. (Ch. 13). Example: a majority vote over four cyclic rotations of the options scored
the 0.5B model at 15.0%.

**Manipulation check**: A test that the thing you meant to change really did change. Without
one, a null result can mean either "no effect" or "the experiment did not run". (Ch. 9).

**Margin of error**: The half-width of a confidence interval: the critical value times the
standard error. (Ch. 12). Example: $1.96 \times 0.0968 = 0.1898$, which is 19.0 percentage
points, giving 25.0% plus and minus 19.0 points.

**Matrix**: A rectangular table of numbers, described by its shape, rows first. (Ch. 3).
Example: one attention weight matrix in the 0.5B model has shape (896, 896), which is 802,816
numbers.

**McNemar's test**: The significance test built for a paired yes-or-no comparison. It
ignores the items both systems scored the same way and asks whether the discordant pairs
split more lopsidedly than fair coin tosses would. (Ch. 13). Example: 5 discordant pairs,
all favouring the 3B model, gives an exact two-sided $p = 2 \times (1/2)^5 = 0.0625$,
which does not clear 0.05. A 25-point gap can fail to be significant on 20 questions.

**Mean**: The ordinary average: add the values and divide by how many there are. (Ch. 3).
Example: the mean of those 802,816 weights is $-0.000017$, which is nearly zero because the
positive and negative weights very nearly cancel. See
[Toolkit 10](math-toolkit.md#toolkit-sigma-mean).

**Mean gap**: The average distance between the top-scoring passage and the runner-up, across a
set of questions. It is a confidence signal inside one system and it does not transfer between
systems. (Ch. 10). Example: the system that got 3 of 6 had a mean gap of 0.058; the system that
got 6 of 6 had 0.055, which is smaller.

**Median absolute value**: The middle value once every weight has had its sign removed and they
have been sorted. It says what a typical weight looks like, without being dragged by outliers.
(Ch. 3). Example: 0.02698 for one attention matrix, against a largest absolute weight of 1.2266.

**Model family**: A set of models trained the same way at different sizes, so that size can be
compared with everything else held fixed. (Ch. 11). Example: Qwen2.5 at 0.5B, 1.5B and 3B.

**Model weights**: The learned numbers themselves, stored as matrices in the model file.
See **parameter**. (Ch. 3). Example: one real matrix,
`layers[0].self_attn.q_proj.weight`, is 896 by 896, which is 802,816 numbers, with mean
$-0.000017$, standard deviation 0.066741, smallest $-1.2266$ and largest 1.1719.

## N

**Nearest neighbour**: The item in a collection with the highest similarity to a query.
(Ch. 10). Example: the query "Which California county is Bakersfield in?" scored 0.910
against its best match, 0.719 against the second, and 0.089 against the third. The gap
between second and third is the whole idea of retrieval.

**Next-token prediction**: The only thing a language model does. Given the text so far, it
produces a probability for every token in the vocabulary as the next one. Longer outputs
come from repeating that single step. (Ch. 4, previewed Ch. 1).

**Nine-tenths count**: Written $k_{0.9}$, the smallest number of tokens you can take from the top
of the sorted list whose probabilities add to at least 0.9. It never goes below 1, never above the
vocabulary size, and it only rises when the temperature rises. (Ch. 5). Example: 1 token at
$T = 0.25$ and 41,274 tokens at $T = 2.0$, on the same logits.

**Normalisation**: Dividing by something so that a quantity is on a comparable footing.
(Ch. 4, revisited Ch. 9). Softmax divides by the sum of the exponentials so the
probabilities add to 1; cosine similarity divides by both vector lengths so only direction
is left. Saying a procedure "normalises" is not a definition until you say what it divides
by and what that buys you.

**Normalising constant**: The total you divide by so that a set of numbers adds to 1. In softmax
it is the sum of all the exponentials. (Ch. 4). Example: for the logits 2, 1 and 0 it is
$7.389056 + 2.718282 + 1.000000 = 11.107338$.

**Null hypothesis**: The dull explanation a test tries to rule out, namely that there is no
real difference and what you saw is the wobble of sampling. (Ch. 13). In McNemar's test it
is the claim that each discordant pair is a fair coin toss.

## O

**Okabe-Ito**: The eight-colour palette used for every figure in this book, chosen to stay
distinguishable under the common forms of colour vision deficiency: blue `#0072B2`, orange
`#E69F00`, green `#009E73`, vermillion `#D55E00`, sky blue `#56B4E9`, yellow `#F0E442`,
purple `#CC79A7`, grey `#999999`. (Ch. 1). Colour never carries meaning on its own in this
book; a label, a shape or a position always carries it too.

**Ollama**: A program that downloads and runs quantized models from a single command, with
no Python installation. (Ch. 1). It is the no-install path for this course. The chapters
that need the full distribution use `transformers` instead, because Ollama returns only the
top few tokens, and returns the real continuation distribution only in `raw` mode.

**Order preserving**: A rule that can change the values but never changes which is largest. Any
positive temperature is order preserving, which is why temperature cannot make a model pick a
different top token. (Ch. 4, revisited Ch. 5).

**Ordered pair**: Two numbers written in a fixed order, as in $(3, 4)$. Swapping them names a
different point. (Ch. 8).

**Origin**: The point $(0, 0)$, where the axes cross. Every vector in this book is drawn from the
origin. (Ch. 8).

**Orthogonal**: Another word for perpendicular, at right angles. Two orthogonal vectors have a dot
product of exactly 0. (Ch. 8, revisited Ch. 9). Example: $(3,4) \cdot (-4,3) = 0$.

**Outlier**: A value far away from the rest, large enough to distort any summary that is sensitive
to the extremes. (Ch. 7). Example: one weight of 1.2266 against a median absolute weight of
0.02698, a ratio of about 45, is what makes a single per-tensor scale fail.

## P

**Paired comparison**: Comparing two models through their question-by-question differences
on the *same* questions, instead of treating the two scores as separate samples. (Ch. 13).
Example: on the 20-question bank the paired standard error was 0.0993 against 0.1135
unpaired, so the unpaired interval was 1.14 times wider on identical data. That is a modest
gain, not a dramatic one; pairing pays most when the systems agree often and their
disagreements are balanced.

**Parameter**: One of the numbers inside the model, set during training and fixed
afterwards. (Ch. 3). Example: Qwen2.5-0.5B-Instruct has 494,032,768 of them. 27.56% sit in
the vocabulary table, 63.51% in the MLP blocks, and 8.92% in all of attention.

```{admonition} A parameter is not a setting you choose
:class: warning
A parameter is *learned*. It was set by training, it lives in the model file, and you
cannot change it by typing something different. Temperature, top-k, the random seed and the
number of tokens to generate are **not** parameters; they are settings you choose at run
time, and this book calls them settings, or sampling controls, so the two never blur.

Statistics uses the word a third way, for a fixed unknown property of a population, such as
a model's true accuracy $p$ over every question you might have asked. Chapters 11 to 14 use
that sense and say so. Three meanings, one word; the chapter always names which is in play.
```

**Passage**: One chunk of a document, as offered to a retrieval system. (Ch. 10).

**Percentage point**: The unit for the difference between two percentages. (Ch. 11, used
throughout Chs. 12 to 14). Example: 95.0% minus 70.0% is 25.0 percentage points, not 25 per cent.
*Not to be confused with* per cent. Going from 70% to 95% is a rise of 25 percentage points and
also a rise of about 36 per cent; the two sentences say different things. See
[Toolkit 11](math-toolkit.md#toolkit-percentage-points).

**Percentile**: The value below which a stated share of a sorted list falls. (Ch. 12). Example:
a 95 per cent bootstrap interval is the 2.5th and the 97.5th percentiles of the resampled scores,
which here were 5.0% and 45.0%.

**Perpendicular**: At right angles. The same idea as orthogonal, and the dot product of two
perpendicular vectors is exactly 0. (Ch. 8).

**Per-tensor quantization**: Quantization that uses a single scale for a whole weight matrix, so
the largest weight in the matrix sets the step size for every weight in it. (Ch. 7). Example: at
4 bits the mean error is 46.6% per tensor against 7.2% blockwise.

**Place value**: The rule that a digit's position decides what it is worth. It matters here
because the tokenizer gives every digit its own token, so the model has to learn place value
rather than read it off. (Ch. 2). Example: `'1234567'` becomes 7 tokens, one per digit.

**Point estimate**: A single number offered as the answer, with no width attached. (Ch. 12).
Example: 25.0% is a point estimate; 6.0% to 44.0% is what it turns into once you are honest about
the sample size.

**Population**: The whole collection you wish you could measure, as opposed to the sample you
actually measured. (Ch. 12). Example: every statistics question anyone could write, of which the
course bank is twenty.

**Position bias**: The tendency of a scoring procedure to reward an answer for where it
sits in the list rather than for being right. (Ch. 13). Example: the 0.5B model picked
option A on 16 of 20 questions, while the correct answers were spread B: 8, C: 8, D: 2,
A: 2. The standard fix is cyclic rotation.

**Precision (numerical)**: How finely a number format can tell nearby values apart. More
bits means finer steps and less rounding. (Ch. 6). Example: the weight $-0.02697754$
survives as $-0.02681702$ under 8-bit blockwise quantization, and collapses to exactly
$0.0$ under 4-bit per-tensor quantization.
*Not to be confused with* two other things. It is not the classification measure also
called precision, the share of flagged items that turned out to be right, which this course
does not use. And it is not the everyday word for "correct": a number can be stored to
great precision and still be wrong.

**Probability distribution**: A set of probabilities, one for each possible outcome, every
one at least zero and all of them adding to exactly 1. (Ch. 4). Example: softmax turns
151,936 logits into a distribution over the entire vocabulary.

**Probability mass**: How much of the total probability of 1 a group of tokens holds
between them. (Ch. 4). Example: at $T = 1.0$ it takes 25 tokens to hold 90% of the mass; at
$T = 2.0$ it takes 41,274.

**Prompt**: The text you give the model to continue. (Ch. 1). Example:
`The capital of France is` becomes the five token ids `[785, 6722, 315, 9625, 374]` before
the model sees anything.

**Proportion**: A count divided by a total, between 0 and 1. Written $\hat p$ when computed
from a sample and $p$ when it means the unknown truth. (Ch. 11). Accuracy is a proportion,
which is exactly why it comes with a standard error.

**p-value**: Assuming the null hypothesis is true, the probability of a result at least as
lopsided as the one you got. Small means the data sit awkwardly with the null. (Ch. 13).
Example: McNemar's exact $p = 0.0625$ for a 25-point gap measured on 20 questions.
*Not to be confused with* the probability that the null hypothesis is true. The p-value is
computed *assuming* the null, so it cannot also be a verdict on it.

## Q

**Quantization**: Storing each weight with fewer bits by rounding it to one of a small set
of levels, making the model smaller on disk, smaller in memory, and cheaper to run.
(Ch. 7). Example: 4 bits gives 16 levels for every weight.
*Not to be confused with* a fixed quality tax. "4-bit loses 25% of the quality" is not a
statement about anything; the loss depends entirely on the scheme. At 4 bits, one scale per
tensor gave a mean weight error of 46.6% of the weight standard deviation and one scale per
32-weight block gave 7.2%. Measure it.

**Quantization level**: One of the values a quantized format can actually store. With $b$ bits
there are $2^{b}$ of them. (Ch. 6). Example: 4 bits gives 16 levels to cover the whole range of a
weight matrix.

**Query**: The question text a retrieval system embeds and searches with. (Ch. 10). Example:
"Which California county is Bakersfield in?" scored 0.910 against the right passage.

## R

**RAG (retrieval-augmented generation)**: Searching a document collection for passages
relevant to the question and pasting them into the prompt before the model answers. An
open-book exam instead of a memory test. (Ch. 10).
*Not to be confused with* training the model on your documents. RAG changes the prompt and
never touches a single weight.

**Random variable**: A quantity whose value depends on a draw you happened to make, so it has a
distribution rather than a single value. (Ch. 12). Accuracy is one: ask a different twenty
questions and it moves.

**Range (of a format)**: The largest magnitude a group of numbers contains, which is what a
quantized format has to stretch to cover. One large value therefore sets the step size for every
small one. (Ch. 6). Example: one weight of 1.2266 sets the range for a matrix whose typical
weight is 0.02698.

**Rank**: The position an item takes once the list is sorted best first. Rank 1 is the top.
(Ch. 10).

**Resample**: One of the bootstrap's imitation samples, drawn from your own data with
replacement. (Ch. 12). Example: resampling 20 items can produce only 14 distinct
accuracies, and 79.9% of 10,000 resamples gave a score other than the observed 25%, which
was the letter-scored result.

**Retrieval**: Finding the items in a collection most similar to a query, usually by cosine
similarity between embeddings. (Ch. 10).

**Rotation (cyclic)**: Asking the same question several times with the options cycled
through the positions, then taking the majority answer, so that a preference for a position
cannot help the model. (Ch. 13). Example: under four-way rotation the 0.5B model scored
15.0%, and gave a consistent answer on only 1 question of 20.

**Rounding error**: The gap between a number and the nearest value the format can actually
store. (Ch. 6). Example: at 4 bits with one scale per tensor, the weight $-0.02697754$
rounds to $0.0$, an error the size of the whole weight. With one scale per 32-weight block
it rounds to $-0.02162388$.

**Rule of three**: If something never happened in $n$ tries, its rate could still be as high as
about $3 \div n$. It is the honest reading of a zero. (Ch. 14). Example: 0 correct out of 20
leaves an upper limit of $3 \div 20 = 15\%$; 0 out of 3 leaves 100%, which is no information at
all.

## S

**Sample**: The part you actually measured. (Ch. 12). Example: the twenty questions on the course
bank.

**Sample proportion**: The share of a sample with some property, written $\hat p$. Accuracy is
one. (Ch. 12). Example: $\hat p = 5 \div 20 = 0.25$.

**Sampling**: Two senses, both used in this book.

**Sampling (from a distribution)**: Drawing a token at random, with probability equal to its
share of the distribution, instead of always taking the largest. (Ch. 5). This is what makes
two runs of the same prompt differ.

**Sampling (statistical)**: Taking a subset of a population in order to learn about the
whole. (Ch. 12). A 20-question benchmark is a sample of all the questions you could have
asked, which is why its score moves when you change the questions.

**Sampling variability**: The amount a statistic changes from one sample to the next purely
by chance, with nothing about the underlying truth changing at all. (Ch. 12). Example: the
bootstrap standard deviation of the 20-question accuracy was 9.74 percentage points, so the
score by itself tells you very little.

**Scalar**: An ordinary single number, as opposed to a vector. Multiplying a vector by a scalar
stretches it without turning it. (Ch. 8, revisited Ch. 9). Example: $d = 2a$ points exactly where
$a$ points, so their cosine similarity is 1.0000.

**Scale (quantization)**: The number a quantizer multiplies its integer levels by in order
to cover the range of the weights. Whatever sets the scale sets it for everything the scale
covers. (Ch. 7). Example: 4-bit per-tensor quantization of the 896 by 896 matrix took its
scale from the single largest weight, 1.2266, while half the weights are smaller than
0.02698, a ratio of roughly 45. Almost every level was spent on a range nothing occupies.
Blockwise quantization exists to stop this.

**Scaled logit**: A logit after it has been divided by the temperature, which is the number
softmax actually receives. (Ch. 5). Example: at $T = 0.5$ a logit of 2 arrives at softmax as 4.

**Scientific notation**: Writing a number as a digit or two times a power of ten, so that very
small and very large numbers stay readable. (Ch. 3). Example: the mean weight $-0.000017$ is
$-1.7 \times 10^{-5}$. See
[Toolkit 17](math-toolkit.md#toolkit-scientific-notation).

**Scoring procedure**: The exact rule that turns a model's output into right or wrong. It is a
choice, it is part of the result, and a score means nothing until it is named. (Ch. 13). Example:
three defensible procedures gave 25.0%, 35.0% and 15.0% on one model and one bank of twenty
questions.

**Seed**: A number that fixes the starting point of a pseudo-random generator, so a random
procedure repeats exactly. (Ch. 5, revisited Ch. 12). Every bootstrap in this book is seeded
20260912, which is why your numbers should match the printed ones.

**Semantic attractor**: A chunk that wins searches it has no business winning, because its text
resembles many questions at once. (Ch. 10). Example: a *Capstone Course Requirements* section
took the top rank on three questions about other sections.

**Shape**: The size of a matrix, rows first then columns. (Ch. 3). Example: shape (896, 896)
means 896 rows and 896 columns, so $896 \times 896 = 802{,}816$ numbers.

**Share**: A part divided by the whole, usually reported as a percentage. (Ch. 3). Example: the
vocabulary table is 27.56% of the 0.5B model's parameters, the MLP blocks are 63.51%, and all of
attention is 8.92%.

**Significance (statistical)**: The verdict that a result is too lopsided to be comfortably
explained by sampling variability alone, conventionally at $p < 0.05$. (Ch. 13). Example:
95% against 70% looks decisive, and is not significant on 20 questions by McNemar's test,
$p = 0.0625$.
*Not to be confused with* importance. A statistically significant difference can be
trivially small, and a difference that matters enormously can fail to reach significance
because the study was too small to see it.

**Similarity matrix**: A square table holding the cosine similarity of every item with every
other. Its diagonal is all ones and it is symmetric. (Ch. 9).

**Softmax**: The function that turns a list of logits into a probability distribution:
exponentiate each one, then divide by the total. Every output is positive, they add to 1,
and the ranking is unchanged. (Ch. 4). Formula: $p_i = \dfrac{e^{z_i}}{\sum_j e^{z_j}}$.
Example: a logit of 17.2173 for `' Paris'` becomes a probability of 30.219% once all
151,936 logits are taken into account.

**Standard deviation**: A measure of how spread out a set of numbers is, in the same units as the
numbers. (Ch. 3). Example: the 802,816 weights in one attention matrix have a standard deviation
of 0.066741. See [Toolkit 10](math-toolkit.md#toolkit-sigma-sd).
*Not to be confused with* the standard error, which measures how unreliable a summary is rather
than how spread out the data are.

**Standard error**: The standard deviation of a statistic across repeated samples, that is,
how far your number would move if you did the whole thing again. (Ch. 12). Formula for a
proportion: $\mathrm{SE} = \sqrt{\hat p (1 - \hat p)/n}$. Example: 5 correct out of 20
gives $\sqrt{0.25 \times 0.75 / 20} = 0.0968$.
*Not to be confused with* the standard deviation of the data. The standard deviation says
how spread out the observations are; the standard error says how unreliable your summary of
them is.

**Storage format**: The agreed way a number is written down in a file: how many bits, and how
they are split between sign, exponent and digits. (Ch. 3, worked in Ch. 6). Example: FP32, FP16
and INT8 hold the same 494,032,768 parameters in 1.976 GB, 0.988 GB and 0.494 GB.

**Subgroup**: A named slice of a benchmark, scored separately. An overall score can hide a
complete failure on one slice. (Ch. 14). Example: inside the letter-scored overall 25%, the
0.5B model scored 2 of 2 on study-design questions and 0 of 3 on probability questions.

**Subgroup gap**: The difference between the best-scoring and the worst-scoring slice of a
benchmark. An overall score hides it completely. (Ch. 14).

**Subword**: A piece of a word, which is what most tokens are. (Ch. 2). Example: `'Bakersfield'`
becomes three tokens, `'B'`, `'akers'` and `'field'`.

**Symmetric**: A table that reads the same whether you go down and across or across and down.
(Ch. 9). A similarity matrix is symmetric because the similarity of A to B is the similarity of B
to A.

## T

**Temperature**: A number you divide the logits by before applying softmax. Below 1 it
sharpens the distribution, above 1 it flattens it, and at exactly 1 it does nothing at all.
(Ch. 5). Formula: $p_i = \dfrac{e^{z_i/T}}{\sum_j e^{z_j/T}}$. Example: `' Paris'` holds
96.799% of the mass at $T = 0.25$, 30.219% at $T = 1.0$, and 2.447% at $T = 2.0$.

```{admonition} Temperature does not make a model creative
:class: warning
This is the most common false sentence about language models, and the course is built
partly to retire it.

Temperature divides the logits *before* they are exponentiated. That is the whole
mechanism. It can flatten the distribution or sharpen it, and it can do nothing else. In
particular it **cannot reorder the tokens**: whatever was most likely at $T = 1$ is still
most likely at $T = 0.25$ and at $T = 2.0$. It adds no knowledge, no vocabulary and no
ideas, because the logits it starts from never changed.

What it does change is how much probability sits away from the top. At $T = 0.25$ a single
token holds 90% of the mass. At $T = 2.0$ you need 41,274 tokens to hold that same 90%. So
a high temperature makes an unlikely continuation easier to draw, and if the result
surprises you, the surprise was already sitting in the distribution.
```

**Token**: The unit a model actually reads and writes: a whole word, a word fragment, a
mark of punctuation, or a single character, each carrying an integer id. (Ch. 2). Example:
`Bakersfield` is three tokens, `['B', 'akers', 'field']`, and `1234567` is seven, one per
digit.
*Not to be confused with* a word. Token counts and word counts are different numbers, and
the difference is the honest mechanical reason these models are unreliable at spelling and
arithmetic.

**Token id**: The whole number a tokenizer assigns to a token, which is what the model actually
receives. (Ch. 2). Example: `' Paris'` is token id 12095 in the Qwen2.5 vocabulary.

**Tokenizer**: The program that cuts text into tokens and maps each to its id, and maps ids
back into text. It is fixed before training and never changes afterwards. (Ch. 2).

**Tokens per second**: The generation rate, measured on your own machine, so it says as much
about your hardware as about the model. (Ch. 1). Example, on the lab GPU: 27.7 for the
0.5B, 24.2 for the 1.5B, 15.6 for the 3B.

**Top-k**: Keeping only the $k$ highest-scoring items and discarding the rest, whether those are
candidate tokens or retrieved passages. (Ch. 5, revisited Ch. 10).

**Training**: The one-time process that set the parameters, by adjusting them until the
model's next-token predictions matched an enormous amount of text. Nothing in this course
trains a model; every lab runs models that were trained elsewhere. (Ch. 1).
*Not to be confused with* inference, which is running the finished model, or with RAG,
which changes the prompt rather than the weights.

**`transformers`**: The Python library used wherever the book needs the whole distribution,
because it exposes all 151,936 logits rather than a top-k summary. (Ch. 4).

## U

**Unit vector**: A vector that has been divided by its own length, so its length is exactly 1. It
carries direction and nothing else. (Ch. 8). Example: $(3, 4)$ has length 5, so its unit vector
is $(0.6, 0.8)$.

**Unpaired comparison**: Treating two models' scores as two independent proportions, which
throws away the fact that they answered the same questions. (Ch. 13). Example: the unpaired
95% interval for the 25-point gap ran from $+2.8$ to $+47.2$ points, against $+5.5$ to
$+44.5$ paired, on exactly the same data.

## V

**Variable**: In an experiment, a thing that can take different values. The one you move is the
independent variable; the one you watch is the dependent variable; the ones you hold still are
controls. (Ch. 9, revisited Ch. 11).

**Vector**: An ordered list of numbers, which you can picture as an arrow from the origin.
(Ch. 8). Example: $(3,4)$ is a two-dimensional vector; a sentence embedding from
`all-MiniLM-L6-v2` is a 384-dimensional one, which you cannot picture and can still compute
with.

**Vocabulary**: The fixed list of every token a model knows, each with an id. Nothing
outside the list can be read or written directly; everything else is assembled from pieces.
(Ch. 2). Example: Qwen2.5-0.5B-Instruct has 151,936 entries, and the table holding one
embedding per entry, 151,936 by 896, is 27.56% of the whole model's parameters.

**Vocabulary size**: How many distinct tokens a tokenizer knows, which is also the length of
every logit vector the model produces. (Ch. 2). Example: 151,936 for the Qwen2.5 tokenizer.

**VRAM**: The memory on a graphics card. A model has to fit in it to run at full speed.
(Ch. 1). Example: at FP16 the three course models need 0.99, 3.09 and 6.17 GB, so a 4 GB
student laptop GPU fits the 1.5B and does not fit the 3B. That is the access line of
Theme S, in gigabytes.

## W

**Wald interval**: The textbook confidence interval for a proportion,
$\hat p \pm z\sqrt{\hat p (1 - \hat p)/n}$. It is simple, it is what most people mean by
"plus or minus", and it misbehaves when $n$ is small or $\hat p$ sits near 0 or 1.
(Ch. 12). Example: with $n = 10$ and $x = 8$ it runs from 0.5521 to 1.0479, past 1, which is
impossible for a proportion. The formula has assumptions, and this is what it looks like
when they fail.

**Watt (W), watt-hour (Wh)**: A watt is a rate of energy use, one joule per second. A
watt-hour is the energy used by one watt kept running for an hour. (Ch. 7). Example:
generating 1,000 tokens cost 0.213 Wh on the 0.5B model and 0.539 Wh on the 3B.

**Weight**: See **model weights** and **parameter**. (Ch. 3).

**Weight matrix**: One rectangular block of a model's parameters, doing one step of the
arithmetic. (Ch. 3). Example: `layers[0].self_attn.q_proj.weight` has shape (896, 896) and holds
802,816 of the model's 494,032,768 parameters.

**Wilson interval**: A confidence interval for a proportion built by solving the test
inequality rather than by adding and subtracting a margin, and which therefore always stays
inside 0 to 1. (Ch. 12). Example: with $n = 10$ and $x = 8$ it runs from 0.4902 to 0.9433,
where the Wald interval ran past 1. The "plus four" shortcut, adding two successes and two
failures before applying the Wald formula, gives 0.4776 to 0.9509 and is close enough to do
by hand.
