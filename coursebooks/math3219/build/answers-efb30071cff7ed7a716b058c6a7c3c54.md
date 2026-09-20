---
title: "Answers"
short_title: Answers
subtitle: "MATH 3219, solutions to the odd-numbered practice problems"
description: "Answers and worked solutions to the odd-numbered practice problems, chapter by
  chapter. Every odd-numbered problem in all fifteen chapters is worked in full, with every
  arithmetic step shown."
---

## What is on this page, and what is not

:::{important} Scope
**Here:** answers to the **odd-numbered** practice problems at the end of each chapter, with a
full worked solution wherever a bare number would not teach you anything.

**Not here:** even-numbered answers, concept-check keys, lab rubrics, or capstone solutions.
Those stay in the instructor materials so the problems remain usable for graded work.
:::

Every number on this page was computed. Nothing was recalled, estimated, or rounded into
looking cleaner than it is. Where a solution reports a lab measurement, the solution names the
JSON file in `lab/out/` that holds it, so you can open the file and check. Where a solution is
pure arithmetic, every step is printed, so you can redo it on paper and get the same digits.
That is the same policy the rest of the book runs on: **we never publish a number we did not
compute.**

## How to use these answers

Four things. The second one is the one that matters.

1. **Try the problem first, all the way to a number.** Reading a solution before you have
   attempted the problem feels like learning and is not. You will recognise every step and be
   unable to produce any of them a week later. Check *after*, not before.

2. **An answer you can reproduce is worth more than one you recognise.** The test is not
   whether the solution below makes sense while you read it. The test is whether you can close
   this page, take a blank sheet, and get the same digits. If you cannot, you have not finished
   the problem; you have finished reading about it.

3. **A mismatch is information.** When your number differs from the one here, do not scan for
   the line where the text disagrees with you. Redo the problem slowly from the start. In this
   course the three most common slips are dividing by $T$ *after* exponentiating instead of
   before, forgetting that a length is a square root, and rounding at an intermediate step.

4. **Keep full precision until the last line.** Round once, at the end, to the precision the
   chapter asks for. Rounding $e^{2}$ to $7.4$ partway through a softmax will move your final
   percentage by more than you expect.

:::{tip} If you are stuck before you start
The formula you need is in the [formula summary](formulas.md), stated once with every symbol
defined. If the symbol itself is the problem, the [glossary](glossary.md) defines it in words
first. Neither page gives away a solution.
:::

## Numbering convention

Practice problems are numbered from 1 within each chapter, in the order they appear. "Odd
numbered" means problems 1, 3, 5, 7, and so on, of *that chapter's* set. A reference such as
"Ch. 12, #7" means the seventh practice problem in Chapter 12, not a book-wide running count.

Some solutions below are not yet keyed to problem numbers. Those are labelled in bold by what
they compute, and the numbers are attached when the chapter's problem set is fixed.

## Status of this appendix

All fifteen chapters now carry a finished practice set. This appendix does not yet carry a
finished answer set, and the table below says exactly where the gap is, chapter by chapter, so
you never have to guess whether an answer is missing or not yet written.

**The count, as of this build.** The fifteen chapters hold **404 practice problems** between
them, of which **203 are odd-numbered** and therefore belong on this page. This page currently
holds **10 worked solutions**, none of them keyed to a problem number. So **15 of 15 chapters**
have odd-numbered problems whose answers are still missing.

:::{table} Which chapters have solutions, as of this build. "Standing computation" means the calculation the chapter is built on, worked in full below but not yet tied to a problem number.
:label: tbl-answers-status

| Chapter | Title | Problems | Odd-numbered | Worked here | Status |
|---|---|---:|---:|---:|---|
| 1 | Where is this running, and what did it cost? | 26 | 13 | 0 | Answers not yet written |
| 2 | Numbers all the way down: tokens | 24 | 12 | 0 | Answers not yet written |
| 3 | What is a parameter? | 28 | 14 | 0 | Answers not yet written |
| 4 | The probability of the next word | 27 | 14 | 1 | Standing computation only |
| 5 | Temperature, and what it does not do | 30 | 15 | 1 | Standing computation only |
| 6 | Bits, precision, and rounding | 26 | 13 | 1 | Standing computation only |
| 7 | Quantization: what you lose, what it buys | 30 | 15 | 1 | Standing computation only |
| 8 | A sentence is an arrow | 26 | 13 | 1 | Standing computation only |
| 9 | Similarity is geometry | 28 | 14 | 2 | Standing computations only |
| 10 | Retrieval: the open-book exam | 26 | 13 | 0 | Answers not yet written |
| 11 | Can a model take a test? | 28 | 14 | 0 | Answers not yet written |
| 12 | Is that score real? | 26 | 13 | 3 | Standing computations only |
| 13 | Measure your measurement | 25 | 13 | 2 | Standing computations only |
| 14 | Bias in the benchmark, and who pays | 30 | 15 | 0 | Answers not yet written |
| 15 | Capstone | 24 | 12 | 0 | Answers not yet written |
| | **Total** | **404** | **203** | **10** | |
:::

"Standing computation" means the calculation the course is built on, the one that appears in
the chapter's worked example, again in its practice set, and again on the concept check. Those
were written here first because they are the ones worth being able to reproduce. Keying them to
the problem numbers they answer, and writing the remaining odd-numbered solutions, is the work
left on this page.

---

(answers-ch01)=
## Chapter 1. Where is this running, and what did it cost?

These problems drill the two measuring sticks of the course: turning a parameter count into bytes and gigabytes, turning tokens and seconds and watts into rates and joules, and scoring an output by counting claims instead of reacting to prose.

### Warm-up: can you do the arithmetic?

**1.** *Asked:* how many bytes does a 1,543,714,304-parameter model take when each parameter is stored at FP16?

This is [Formula 1.2](../ch/ch01.md#ch01-files), size in bytes equals $N \times (\text{bytes per weight})$, where $N$ is the parameter count. Multiplication is written four ways and they all mean the same thing; see [Toolkit 3](math-toolkit.md#toolkit-multiplication).

Step 1, write down the parameter count.

$N = 1{,}543{,}714{,}304$

Step 2, work out the bytes per weight. FP16 means 16 bits for each parameter. There are 8 bits in one byte, so divide.

$16 \div 8 = 2$ bytes per parameter

Step 3, multiply. Splitting the number into two easy pieces keeps it on a phone calculator.

$1{,}543{,}714{,}304 = 1{,}500{,}000{,}000 + 43{,}714{,}304$

$1{,}500{,}000{,}000 \times 2 = 3{,}000{,}000{,}000$

$43{,}714{,}304 \times 2 = 87{,}428{,}608$

$3{,}000{,}000{,}000 + 87{,}428{,}608 = \mathbf{3{,}087{,}428{,}608}$ bytes

**Answer: 3,087,428,608 bytes.**

**Check it.** This is the same number the chapter gets for the 1.5B model in Worked Example 1.2, and it is `size_fp16_gb` in `lab/out/lab4_size_ladder.json`, recorded there as 3.087428608 gigabytes.

**Where this goes wrong.** The tempting answer is 1,543,714,304 bytes, which is about 1.54 GB. It is tempting because "1.5B parameters" and "1.5 GB" share a number, and because it feels natural that one number takes one slot. One parameter is not one byte. At FP16 it is two. The other common slip is dividing by 2 instead of multiplying, which gives 771,857,152 and a file smaller than the parameter count, which cannot happen at any format this course uses.

---

**3.** *Asked:* add four file sizes, one line at a time. **Made up for practice.**

This is [Formula 1.1](../ch/ch01.md#ch01-files), $B_{\text{total}} = \sum_{i=1}^{k} b_i$, where $b_i$ is the size of file number $i$ and $k$ is how many files there are. Here $k = 4$. The symbol $\sum$ means "add up everything that comes after me"; see [Toolkit 10](math-toolkit.md#toolkit-sigma).

Add them left to right, smallest first, so every line can be checked on its own.

$512 + 2{,}048 = 2{,}560$

$2{,}560 + 65{,}536 = 68{,}096$

$68{,}096 + 990{,}000{,}000 = \mathbf{990{,}068{,}096}$

**Answer: 990,068,096 bytes.**

**Check it.** The chapter's sanity check for a total: it must be bigger than the largest single file and smaller than the number of files multiplied by the largest file. The largest file is 990,000,000 bytes and there are 4 files, so the total must land between 990,000,000 and $4 \times 990{,}000{,}000 = 3{,}960{,}000{,}000$. Our total sits inside that range.

**Where this goes wrong.** The tempting answer is 990,000,000, from deciding that three files of 512, 2,048 and 65,536 bytes are too small to matter next to a file of 990 million. They are small, and that is the honest reading of the result, but dropping them is a different act from measuring them and then reporting that they are small. In this course you add them and then say they came to 68,096 bytes out of 990,068,096. The second common slip is a column misalignment: 65,536 written one column across becomes 655,360, and the total comes out as 990,657,920. Nothing in the sanity check catches that, which is why adding one line at a time is worth the extra writing.

---

**5.** *Asked:* a model produces 64 tokens in 4.0 seconds. What is its rate? **Made up for practice.**

This is [Formula 1.7](../ch/ch01.md#ch01-time), $r = n_{\text{tokens}} \div t$, where $n_{\text{tokens}}$ is how many tokens came out and $t$ is how many seconds it took.

Step 1, write down the two numbers.

$n_{\text{tokens}} = 64$ and $t = 4.0$ seconds

Step 2, divide.

$64 \div 4.0 = \mathbf{16.0}$

**Answer: 16.0 tokens per second.**

**Check it.** Multiply back. $16.0 \times 4.0 = 64$, which is the token count you started with, so the division is right.

**Where this goes wrong.** The tempting answer is $4.0 \div 64 = 0.0625$. That number is real and it has a name: **seconds per token**. It is not wrong arithmetic, it is a different quantity. The sign that you flipped the fraction is that you expected a number in the tens and got a number near zero. Tokens go on top when you want a rate in tokens per second.

---

**7.** *Asked:* a card draws a mean of 25.0 watts for 8.0 seconds and produces 100 tokens. What did one token cost in energy? **Made up for practice.**

This is [Formula 1.8](../ch/ch01.md#ch01-energy), $E_{\text{token}} = (\bar{P} \times t) \div n_{\text{tokens}}$. Here $\bar{P}$, said "P bar", is the mean power in watts over the window the model was generating, $t$ is the seconds, and $n_{\text{tokens}}$ is the token count. A watt is one joule every second, so watts multiplied by seconds leaves joules.

Step 1, multiply power by time to get the total energy.

$25.0 \times 8.0 = 200.0$ joules

Step 2, divide by the token count.

$200.0 \div 100 = \mathbf{2.0}$

**Answer: 2.0 joules per token.**

**Check it.** The chapter's sanity check is that energy per token should be roughly power divided by speed. The speed here is $100 \div 8.0 = 12.5$ tokens per second, and $25.0 \div 12.5 = 2.0$. The two routes agree.

**Where this goes wrong.** The tempting answer is $25.0 \div 100 = 0.25$ joules per token, from dividing power by tokens and never multiplying by the time. It is tempting because the two numbers you were handed are the two that look most like the question. Watts are not joules. You have to spend a watt for some number of seconds before any energy exists. The other classic slip, named in the chapter's Common mistakes list, is a sensor that reports milliwatts: forget to divide by 1,000 and you would report 2,000 joules per token.

---

**9.** *Asked:* 5 checkable claims, 3 survive. What is the score? **Made up for practice.**

This is [Formula 1.6](../ch/ch01.md#ch01-works), $\hat{p} = x \div n$. The symbol $\hat{p}$ is said "p hat". The letter $p$ is for **proportion**, which means "how many out of how many"; see [Toolkit 12](math-toolkit.md#toolkit-proportions). The little hat marks a number you measured rather than one you know for certain. $x$ is how many claims survived and $n$ is how many you checked.

Step 1, write down the counts.

$x = 3$ and $n = 5$

Step 2, divide.

$\hat{p} = 3 \div 5 = 0.6$

Step 3, multiply by 100 to turn the decimal into a percentage. [Toolkit 11](math-toolkit.md#toolkit-percentages) builds that step from scratch.

$0.6 \times 100 = \mathbf{60\%}$

**Answer: $\hat{p} = 0.6$, which is 60%.**

**Check it.** A proportion has to land between 0 and 1, which is between 0% and 100%. It does.

**Where this goes wrong.** Two tempting wrong answers. The first is $5 \div 3 = 1.667$, from dividing upside down; the sign is a score above 1, which no proportion can be. The second is $2 \div 5 = 0.4$, or 40%, from counting the claims that failed instead of the ones that survived. Both fractions are meaningful, but only one of them is the score the chapter defines. Write down which count goes on top before you divide.

### Practice: can you apply it?

**11.** *Asked:* express `safetensors_header_bytes` as a percentage of the `model.safetensors` file, and say in one sentence what that percentage tells you about whether the header is worth worrying about.

This is [Formula 1.5](../ch/ch01.md#ch01-local), a ratio, followed by the multiply-by-100 step from [Toolkit 11](math-toolkit.md#toolkit-percentages).

Step 1, read both numbers out of `lab/out/ch01_first_run.json`.

header $= 32{,}288$ bytes, and `model.safetensors` $= 988{,}097{,}824$ bytes

Step 2, divide the header by the file.

$32{,}288 \div 988{,}097{,}824 = 0.0000326769\ldots$

Step 3, round to three significant figures.

$0.0000327$

Step 4, multiply by 100.

$0.0000327 \times 100 = \mathbf{0.00327\%}$

**Answer: the header is 0.00327% of the weight file**, which is about three thousandths of one per cent. A number with that many leading zeros is easier to read as $3.27 \times 10^{-5}$ before the percentage step; [Toolkit 17](math-toolkit.md#toolkit-scientific-notation) explains that shorthand.

**The one sentence the problem asks for.** The header costs about three thousandths of one per cent of the file, so it is never worth worrying about as storage; the reason to know the number at all is that it explains the 32,288-byte gap between the size Formula 1.2 predicts and the size the disk reports, and an unexplained gap is worth chasing even when it is tiny.

**Check it.** A rough version in your head: 32 thousand out of 988 million is about 32 out of a million, and 32 per million is 0.0032%. Our answer is 0.00327%. Another way to feel the size: the file is $988{,}097{,}824 \div 32{,}288 = 30{,}602.6\ldots$ times the header, so about thirty thousand times.

**Where this goes wrong.** The tempting wrong answers are 0.0327% and 3.27%, both off by a factor of ten or a thousand. They come from multiplying by 100 twice, or from losing a zero when reading a decimal with five of them in a row. The fix is the rough check above: if you cannot get near your answer with round numbers in your head, the decimal point moved.

---

**13.** *Asked:* how many times more energy per token does the 1.5B cost than the 0.5B, and the 3B than the 1.5B? Then: which step up the ladder is the more expensive one, per unit of model?

This is [Formula 1.5](../ch/ch01.md#ch01-local), $R = A \div B$, applied twice. The numbers come from the table in [the thread that runs to Week 15](../ch/ch01.md#ch01-theme-s): 0.767, 1.133 and 1.941 joules per token, all from `lab/out/theme_s_energy.json`.

Step 1, the first rung. Bigger on top.

$1.133 \div 0.767 = 1.4771838\ldots$

Rounded to two decimal places, $\mathbf{1.48}$.

Step 2, the second rung.

$1.941 \div 1.133 = 1.7131509\ldots$

Rounded to two decimal places, $\mathbf{1.71}$.

**Answer to the first two parts: the 1.5B costs about 1.48 times the 0.5B per token, and the 3B costs about 1.71 times the 1.5B per token.** Both are bare numbers with no unit, because joules divided by joules leaves a comparison rather than a quantity.

**Check it.** Two rungs multiplied should give the whole ladder. $1.4772 \times 1.7132 = 2.5307$, and the direct ratio is $1.941 \div 0.767 = 2.5306$. They agree to three decimal places, and the small difference is the rounding you did on the way.

:::{warning} The third part of this problem is ambiguous, and here is the ambiguity
The phrase **"per unit of model"** is not defined anywhere in Chapter 1. The chapter gives no unit of model, and no formula in the chapter divides energy by parameters. So the third part has more than one defensible reading, and your answer should say which one you used.

The reading that fits what the chapter does give you is this: compare each energy multiplier with the parameter multiplier that bought it.
:::

Step 3, the parameter multipliers, from the same table.

$1{,}543{,}714{,}304 \div 494{,}032{,}768 = 3.1247204\ldots$, which rounds to $3.12$

$3{,}085{,}938{,}688 \div 1{,}543{,}714{,}304 = 1.9990348\ldots$, which rounds to $2.00$

Step 4, read the two rungs side by side.

| Step | Parameters multiplied by | Energy per token multiplied by |
|---|---:|---:|
| 0.5B to 1.5B | 3.12 | 1.48 |
| 1.5B to 3B | 2.00 | 1.71 |

**Answer to the third part: the 1.5B to 3B step is the more expensive one.** It is more expensive on the plain reading, because 1.71 is bigger than 1.48. It is also more expensive on the per-parameter reading, because the first step tripled the model for 1.48 times the energy while the second step only doubled it and still cost 1.71 times the energy. Both readings point the same way, which is why the ambiguity does not change the answer here. It could change the answer on a different ladder, which is why you name your reading.

**Where this goes wrong.** The tempting move is to subtract instead of divide: $1.133 - 0.767 = 0.366$ joules and $1.941 - 1.133 = 0.808$ joules. Those differences are real quantities, in joules per token, and they answer the question "how much more". The question asked "how many times more", and that phrase means division. Here the two methods happen to rank the steps the same way, so the slip hides. It stops hiding in Chapter 12, where a percentage and a percentage point are different things; see [the Toolkit on percentage points](math-toolkit.md#toolkit-percentage-points).

---

**15.** *Asked:* how many joules does a card drawing 13.834 watts use in one minute of doing nothing, and what does the comparison with the Bakersfield answer's 20.71 joules suggest?

The idea is the one that separates power from energy in [Section 1.5](../ch/ch01.md#ch01-energy). Power is a rate, in watts. Energy is an amount, in joules. Multiply the rate by the seconds and you get the amount, because one watt is one joule every second.

Step 1, turn the minute into seconds, because a watt is defined per second.

1 minute $= 60$ seconds

Step 2, multiply. Splitting it keeps the arithmetic easy to follow.

$13.834 \times 6 = 83.004$

$83.004 \times 10 = \mathbf{830.04}$ joules

**Answer: 830.04 joules.**

Step 3, compare with the 20.71 joules that the 27-token Bakersfield answer cost, using [Formula 1.5](../ch/ch01.md#ch01-local). Bigger on top.

$830.04 \div 20.71 = 40.0791887\ldots$

Rounded to two decimal places, $\mathbf{40.08}$.

The other direction says the same thing as a percentage.

$20.71 \div 830.04 = 0.0249506\ldots$

$0.0249506 \times 100 = \mathbf{2.50\%}$

**What the comparison suggests.** One minute of a graphics card sitting idle costs about 40 times what the whole Bakersfield answer cost. Put the other way, that answer was about 2.50% of a minute of doing nothing. On a lightly used laptop, almost all of the graphics card's energy goes to the card being powered on, not to any model. This is the same fact as the 65% figure in Section 1.5, seen from further away, and it is why the chapter insists that you name which column your energy figure comes from.

**Check it.** There is a second route to the 40. Worked Example 1.1 shows that the Bakersfield answer was worth 1.50 seconds of idle card, and $60 \div 1.50 = 40$. Two routes, one answer.

**Where this goes wrong.** The tempting answer is 13.834 joules, from multiplying by 1 because the question said "one minute". A watt is a joule per second, not a joule per minute, so the unit you multiply by has to be seconds. The sign that this happened: your answer for a whole idle minute came out smaller than the 20.71 joules that one short answer cost, which cannot be true when that answer took under a second to write.

---

**17.** *Asked:* score the sentence "The Kern River flows through Bakersfield and is the longest river in California", stating your splitting rule first. **Made up for practice.**

This is [Formula 1.6](../ch/ch01.md#ch01-works), $\hat{p} = x \div n$, wrapped in the discipline from Section 1.3: state the procedure, then count, then divide.

**Step 1, the splitting rule, written before any scoring.** One claim for each assertion that could be true or false on its own. Where a sentence joins two assertions with "and", split at the "and" if each half could stand alone as a sentence and be checked by itself.

**Step 2, apply the rule.**

| # | Claim | Checks out? |
|---|---|---|
| 1 | The Kern River flows through Bakersfield. | Yes. The Kern River runs through the city. |
| 2 | The Kern River is the longest river in California. | No. The Sacramento River is California's longest river, at about 400 miles; the Kern River is about 165 miles. |

**Step 3, count.** Two claims checked, so $n = 2$. One survived, so $x = 1$.

**Step 4, divide.**

$\hat{p} = 1 \div 2 = 0.5$

**Step 5, multiply by 100.**

$0.5 \times 100 = \mathbf{50\%}$

**Answer: $\hat{p} = 0.5$, which is 50%, under the splitting rule stated in Step 1.**

Notice the shape. This is the same score as the Bakersfield sentence in Section 1.3, and for the same reason: a true local fact welded to a false headline claim, in one fluent sentence, with nothing in the grammar marking where the true half stops.

**A note on what this problem needs.** Claim 2 cannot be checked from anything in Chapter 1. You have to look it up, and that is the point of the exercise rather than a gap in it. Checking is the habit the whole course is built on.

**Where this goes wrong.** Two tempting answers. The first is 0%, from treating the sentence as one claim, finding a false part, and marking the whole thing false. That is defensible if and only if you stated that rule first, which is exactly what the problem asks you to do. The second is 100%, from passing claim 2 because it sounds authoritative and the rest of the sentence is right. A superlative such as "longest", "largest" or "first" is a specific ranking claim, and a specific ranking claim always needs a specific source.

---

**19.** *Asked:* a student writes "The model is 0.5 billion parameters, so the file is 0.5 GB." Name the error, give the correct FP16 size, and name the missing information.

This is [Formula 1.2](../ch/ch01.md#ch01-files) followed by [Formula 1.3](../ch/ch01.md#ch01-files).

**The error.** The student treated a count of parameters as a count of bytes. Those are two different things. A parameter is one of the numbers inside the model. A byte is a unit of storage, eight bits, enough to hold one ordinary English character. How many bytes one parameter takes is a separate fact, and the student's sentence never states it.

**The correct size at FP16.**

Step 1, the real parameter count, from `lab/out/ch01_first_run.json`.

$N = 494{,}032{,}768$

Step 2, the bytes per weight. FP16 is 16 bits per parameter, and there are 8 bits in a byte.

$16 \div 8 = 2$ bytes per parameter

Step 3, multiply, which is Formula 1.2.

$494{,}032{,}768 \times 2 = 988{,}065{,}536$ bytes

Step 4, divide by a billion, which is Formula 1.3.

$988{,}065{,}536 \div 1{,}000{,}000{,}000 = 0.988065536$ GB

**Answer: about 0.99 GB at FP16, not 0.5 GB.** The student's figure is short by roughly a factor of two.

**The missing information: how many bytes each parameter is stored in, which is the storage format.** Without it, a parameter count fixes no file size at all. The same 494,032,768 parameters are 1.98 GB at FP32, 0.99 GB at FP16, and 0.49 GB at INT8.

**Where this goes wrong, and why it is so tempting.** At 1 byte per parameter, which is INT8, the file really would be $494{,}032{,}768 \div 1{,}000{,}000{,}000 = 0.494$ GB, or about 0.5 GB. So the student's number is the right answer to a question about a different format, which is the hardest kind of wrong answer to catch. The second reason it is tempting is that "0.5 billion" and "0.5 GB" contain the same digit, and a number that appears twice feels like a confirmation. It is a coincidence of labels. Worth adding: 494,032,768 is not exactly 0.5 billion either. "0.5B" is a rounded name, not a measurement.

### Stretch: can you reason with it?

**21.** *Asked:* explain, in your own words and without formulas, why the model that spends the larger share of its energy on the card merely being switched on is the 0.5B at 65% rather than the 3B at 46%.

This is a written argument, so there is no single right paragraph. Here is what a strong response contains, and then one worked example of such a response.

**What a strong response contains.**

1. The idea that idle power is a flat background charge, paid for every second the card is on, whatever the card is doing. On this laptop it is 13.834 watts.
2. The observation that the share is the background draw measured against the average draw during the run, and nothing else. The chapter's Try it 1.4 shows the seconds and the token count cancelling out.
3. The two mean power figures, which are what actually separate the models: the 0.5B ran at a mean of 21.254 watts, so only $21.254 - 13.834 = 7.420$ watts of that was the model's own work. The 3B ran at 30.203 watts, so $30.203 - 13.834 = 16.369$ watts was its own work.
4. A correction of the causal story the question invites. Speed is not the cause. Per token, the fast small model pays **less** background energy than the big one, not more.
5. No formulas, as the problem asks.

**One worked example of a strong response.**

> The graphics card charges a flat background fee for every second it is switched on, whether or not anything is running. On this laptop that fee is 13.834 watts. The small model barely lifts the card above it. While the small model was writing, the card averaged 21.254 watts, so only about 7.4 watts of the draw was the model's own work. The big model pushes the card to an average of 30.2 watts, so about 16.4 watts of that is its own work. The share of the bill charged to the background fee is that fee measured against the average draw, and the big model has a much larger average to measure it against. So the small model's share is larger because it works the card so lightly, not because it works quickly. Being quick pushes the other way: the small model finishes a token in about 0.036 seconds and the big one takes about 0.064 seconds, so per token the small model pays about 0.4993 joules of background energy and the big one pays about 0.8888 joules. The small model pays less background energy per token and still hands a bigger fraction of its bill to it, because its own work costs so little that there is almost nothing else in the bill.

**Where this goes wrong.** The tempting paragraph runs: "the small model is faster, so it spends less time doing arithmetic, so a bigger share of its energy is idle." It sounds right, it uses the word the question put in front of you, and it is backwards. Finishing sooner buys you fewer idle seconds per token, which lowers the idle energy per token. The two per-token figures in the worked response show that directly: 0.4993 joules against 0.8888. The cause is how hard the card is being worked, not how long.

**A note on the problem's wording.** The word *faster* points at a true fact about the two models and at a false explanation of the result. Say so in your answer rather than working around it. Spotting that a correct observation is not the cause is the skill this problem is really testing.

---

**23.** *Asked:* if you measured the whole laptop at the wall instead of the graphics card, would joules per token go up, go down, or stay the same? And could the two figures fairly sit in the same table?

**The answer to the first part is: it goes up.**

**What a strong response contains.**

1. The direction, up, with the reason stated as a boundary rather than as a guess. A wall-plug meter counts everything the graphics-card sensor counts, and then also counts the processor, the memory sticks, the screen, the fans, and the energy lost inside the charger turning wall current into laptop current. Every one of those was running while the model wrote.
2. The reason it cannot go down. The graphics card sits inside the wall boundary. You are adding more things to the top of the calculation while the token count on the bottom stays the same, and nothing you add draws negative power.
3. The reason it cannot stay the same. Staying the same would need every other part of the laptop to draw exactly zero watts, which no laptop does.
4. The chapter's own word for this, from Definition 1.5: every energy figure in this book is a **lower bound** on the energy of local inference, not a total.
5. An answer to the table question. The two figures should not share a column. They are not two measurements of one quantity; they are measurements of two different quantities that happen to carry the same unit. They can share a table if, and only if, the boundary is a named column, so a reader can see why they differ before comparing them.
6. No invented number. This course did not take a wall-plug measurement, so a response saying "it would be roughly double" is inventing a result.

**One worked example of a strong response.**

> Joules per token would go up. The graphics-card sensor sees one component. The wall meter sees that component plus the processor, the memory, the screen, the fans and the charger's own losses, all of which were drawing power during the same run. The token count is unchanged, so a larger energy divided by the same number of tokens gives a larger figure. It cannot go down, because the graphics card is inside the wall boundary, and it cannot stay equal unless everything else in the laptop drew nothing. This is what Definition 1.5 means when it calls the book's figure a lower bound. The two numbers should not go in the same column of a table, because they measure different boundaries. I would put them in one table with a column headed "what the meter covers", reading "GPU board only" on one row and "whole laptop at the wall" on the other, so nobody reads the difference as a difference between models. I am not giving a number for the wall figure, because we did not measure one.

**Where this goes wrong.** The tempting answer is "it stays the same, because the model did the same work and produced the same tokens". It is tempting because the model and the token count genuinely did not change. Joules per token is not a property of the model. It is a property of the model, the machine, and the boundary of the meter, and the question changed the third one. The second tempting answer is "it goes down, because the wall meter measures the whole laptop so the model's share gets smaller". That confuses a share with a total. The figure is a total divided by tokens, not a share of anything.

---

**25.** *Asked:* name the single variable the environmental argument and the access argument are both reading, then describe one situation in which the two arguments would point at different models, and say what would have to be true of the hardware or the task.

**The variable is the parameter count:** how many numbers the model holds. Everything in the [Week 15 thread table](../ch/ch01.md#ch01-theme-s) is that one variable seen twice.

- **Read as energy.** More parameters means more multiplying and adding for every token, so more joules per token: 0.767, then 1.133, then 1.941.
- **Read as bytes.** More parameters means more numbers to store and hold in memory, so more gigabytes: 0.99, then 3.09, then 6.17 at FP16.

**What a strong response contains.** The variable named as the parameter count, not as "size" and not as "energy", because those are two of its consequences rather than the thing itself. Then one concrete situation, with arithmetic where the chapter supplies the numbers and an honest gap where it does not. Then a sentence naming the condition on the hardware or the task that makes the two arguments come apart.

**Worked situation A: change the bytes per weight, and only the access side moves.**

Store the 3B model at 4 bits per parameter instead of 16. Bytes per weight becomes $4 \div 8 = 0.5$.

$3{,}085{,}938{,}688 \times 0.5 = 1{,}542{,}969{,}344$ bytes

A card advertised as 4 GB holds 4 gibibytes, which is Formula 1.4 country.

$4 \times 1{,}073{,}741{,}824 = 4{,}294{,}967{,}296$ bytes

$1{,}542{,}969{,}344 \div 4{,}294{,}967{,}296 = 0.3592505\ldots$, and $0.3593 \times 100 = \mathbf{35.9\%}$ of the card

At FP16 the same model needed 143.7% of that card and did not fit. At 4 bits it uses about a third of it. The access argument has moved all the way from "you must rent this model" to "this runs on a student laptop".

The energy argument has not moved with it, and this is where the response has to be honest. The amount of arithmetic per token did not change; only the number of bits each number is written in changed. This book has no measured energy figure for a quantized model, so the correct statement is: **the access argument moved, and we have no measurement saying the energy argument moved with it.** The only measured energy figure for the 3B is still 1.941 joules per token, which is 2.53 times the 0.5B.

Two honest footnotes. The 0.5 bytes per weight above is the ideal case. Real quantizers store a small scale for each block of weights, which Chapter 7 covers, and at 0.5625 bytes per weight the same model is $3{,}085{,}938{,}688 \times 0.5625 = 1{,}735{,}840{,}512$ bytes, which is $1{,}735{,}840{,}512 \div 4{,}294{,}967{,}296 = 0.4042$, or 40.4% of the card. It still fits. And this arithmetic is weights only; running a model also needs working memory, as Worked Example 1.2 says.

**What would have to be true for this to happen:** the binding limit on the hardware is memory rather than power, and the change you made moves bytes per parameter without moving the arithmetic per token.

**Worked situation B: a task that needs retries.**

Suppose the task has a checkable right answer, the 0.5B gets it right about one time in five, and the 3B gets it first time. Each answer is 27 tokens. **Made up for practice**, because this chapter measures neither model's hit rate on any task.

The 0.5B, at five attempts:

$5 \times 27 = 135$ tokens

$135 \times 0.767 = 103.545$ joules

The 3B, at one attempt:

$1 \times 27 = 27$ tokens

$27 \times 1.941 = 52.407$ joules

$103.545 \div 52.407 = 1.9757856\ldots$, which rounds to $\mathbf{1.98}$

Per **useful answer**, the big model is about twice as cheap, while the access argument still points at the small one, because the 3B needs 143.7% of a 4 GB card at FP16 and cannot run there at all. **What would have to be true:** the task has a right answer you can check, and the small model's hit rate is low enough that its retries cost more than its per-token saving.

**Where this goes wrong.** The tempting answer to the first part is "energy" or "size" or "how big the model is". Those are readings of the variable, not the variable, and a response that names one of them has not said the thing the question is after: that one number, the parameter count, sits upstream of both columns. The tempting answer to the second part is to describe a situation where one argument is merely stronger than the other. The question asks for the two to point at **different models**, which needs something that moves one column without moving the other. Changing the bytes per weight does that. Changing how many attempts a task needs does that. Buying a faster graphics card does not, because it moves both columns the same way.

---

(answers-ch02)=
## Chapter 2. Numbers all the way down: tokens

These problems drill four things: dividing one count by another to get characters per token,
multiplying rows by columns to price a vocabulary table, multiplying a token count by a measured
energy rate, and rebuilding a written number from its digits and their powers of ten.

Unless a solution says otherwise it uses the chapter's standing values: $V = 151{,}936$,
$d = 896$, $N_{\text{total}} = 494{,}032{,}768$ and $p = 0.767$ joules per token, all
**measured** for `Qwen2.5-0.5B-Instruct` on the course lab machine and stored in
`lab/out/we1_tokens.json`, `lab/out/we3_params_quant.json`, `lab/out/ch03_parameter_anatomy.json`
and `lab/out/theme_s_energy.json`.

### Warm-up

**1.** **What is being asked.** Work out how many characters each token of `Bakersfield` carried,
to four decimal places.

**What it tests.** Formula 2.4, characters per token, $r = \dfrac{c}{n}$, from
[Section 2.3 of Chapter 2](../ch/ch02.md). The fraction bar means divide the top number by the
bottom number; [toolkit section 4](math-toolkit.md#toolkit-fraction-bar) starts from the
beginning.

**The work.**

Step 1, write down the two counts. The problem gives both. $c = 11$ characters and $n = 3$
tokens.

Step 2, divide the characters by the tokens.

$$r = 11 \div 3 = 3.666666\ldots$$

The 6s never stop. Your calculator will show something like 3.666666667.

Step 3, round to four decimal places. Look at the fifth decimal place, which is a 6. Six is 5 or
more, so the fourth decimal place goes up from 6 to 7.

$$r = 3.6667$$

**Answer.** 3.6667 characters per token.

**Check it.** Multiply back. $3.6667 \times 3 = 11.0001$. That is 11, with a leftover of 0.0001
that comes from the rounding in step 3 and from nowhere else.

**Where this goes wrong.** The tempting error is dividing the other way round, $3 \div 11 =
0.2727$. It is tempting because the problem says "3 tokens" and the 3 is the smaller, friendlier
number to put first. Two things catch it. The name of the quantity is characters **per** token,
and the word before "per" goes on top. And for this tokenizer no token is shorter than one
character, so $r$ can never drop below 1. An answer of 0.2727 fails that test on sight.

---

**3.** **What is being asked.** Count how many individual numbers sit in a vocabulary table with
50,000 rows and 768 columns.

**What it tests.** Formula 2.2, $N_{\text{table}} = V \times d$, from
[Section 2.2 of Chapter 2](../ch/ch02.md), and the same formula in the
[formula summary](formulas.md), section 2.2. The symbol $\times$ means multiply the number on its
left by the number on its right; [toolkit section
3](math-toolkit.md#toolkit-multiplication) shows the four ways this book writes multiplication.

**The work.**

Step 1, name the two numbers. $V = 50{,}000$ rows. $d = 768$ columns in every row.

Step 2, write down the multiplication.

$$N_{\text{table}} = 50{,}000 \times 768$$

Step 3, split it into a small multiplication and some zeros, because 50,000 is 5 followed by
four zeros.

$$5 \times 768 = 3{,}840$$

Step 4, put the four zeros back on the end of 3,840.

$$3{,}840 \rightarrow 38{,}400{,}000$$

**Answer.** $N_{\text{table}} = 38{,}400{,}000$ numbers.

**Check it.** Two checks. Divide back: $38{,}400{,}000 \div 768 = 50{,}000$, which is the row
count you started with. And rough it out first: 50,000 times 800 is 40,000,000, so an answer
near 38 million is the right size.

**Where this goes wrong.** Two slips, both common. Adding instead of multiplying gives
$50{,}000 + 768 = 50{,}768$, which is tempting because the two numbers sit side by side and
addition is the reflex. The answer must be far larger than either number you started with, and
50,768 is barely larger than one of them. The second slip is losing a zero and writing
3,840,000. Counting the zeros out loud before you write them down is worth the two seconds.

**Labelled honestly.** The 50,000 and the 768 are **made up for practice**, as the problem set's
preamble says. Our model's real values are $V = 151{,}936$ and $d = 896$.

---

**5.** **What is being asked.** Find the energy a model spends writing 250 tokens.

**What it tests.** Formula 2.6, $E = n \times p$, from
[Section 2.5 of Chapter 2](../ch/ch02.md), and the [formula summary](formulas.md), section 7.1.

**The work.**

Step 1, name the two numbers. $n = 250$ tokens. $p = 0.767$ joules per token (**measured**, from
`lab/out/theme_s_energy.json`).

Step 2, write down the multiplication.

$$E = 250 \times 0.767$$

Step 3, break 0.767 into three easy pieces: 0.7, then 0.06, then 0.007.

$$250 \times 0.7 = 175$$

$$250 \times 0.06 = 15$$

$$250 \times 0.007 = 1.75$$

Step 4, add the three pieces, two at a time.

$$175 + 15 = 190$$

$$190 + 1.75 = 191.75$$

**Answer.** $E = 191.75$ joules.

**Check it.** Three checks, and the third is the good one. The answer must be much larger than
0.767, because 250 tokens cost more than one token does. Rough it out: 0.767 is close to 0.75,
and $250 \times 0.75 = 187.5$, so an answer near 191 is the right size. And an independent one:
the lab recorded **0.213 watt-hours per 1,000 tokens** for this model. 250 tokens is a quarter of
1,000, so the cost should be a quarter of 0.213, which is $0.213 \div 4 = 0.05325$ watt-hours.
Convert your own answer by dividing by 3,600, since one watt-hour is 3,600 joules:
$191.75 \div 3600 = 0.053264$ watt-hours, rounded to six decimal places. Two separate
measurements agreeing to four decimal places is a strong sign the arithmetic is right.

**Where this goes wrong.** The tempting error is dividing, $250 \div 0.767 = 325.9$. It is
tempting because the rate has the word "per" in it, and "per" often signals division. Hold on to
the units instead. The rate is joules **per token**, so tokens times joules per token leaves
joules, and joules is the unit the question wants. The second slip is writing the answer as a
bare "191.75". A number without a unit is most of an error waiting to happen. Write it
as **191.75 joules**.

**One limit to carry with it.** The 0.767 figure is GPU board power only. No processor, no
memory, no power-supply losses, no screen, no cooling. It is a **lower bound** on the energy of
a local run, not a total.

---

**7.** **What is being asked.** Write five powers of ten as ordinary numbers.

**What it tests.** Exponent notation, used in Formula 2.5 in
[Section 2.4 of Chapter 2](../ch/ch02.md). The small raised number says how many times to
multiply 10 by itself; [toolkit section 5](math-toolkit.md#toolkit-exponents) builds it up from
nothing.

**The work, one line at a time.**

$10^{0} = 1$. Anything raised to the power zero is 1. There are no 10s to multiply, and the
answer is 1 rather than 0.

$10^{1} = 10$. One 10, on its own.

$10^{2} = 10 \times 10 = 100$

$10^{3} = 10 \times 10 \times 10 = 1{,}000$

$10^{4} = 10 \times 10 \times 10 \times 10 = 10{,}000$

**Answer.**

| Power | Ordinary number |
|---|---|
| $10^{0}$ | 1 |
| $10^{1}$ | 10 |
| $10^{2}$ | 100 |
| $10^{3}$ | 1,000 |
| $10^{4}$ | 10,000 |

**Check it.** The exponent is the number of zeros written after the 1. $10^{4}$ has four zeros.
$10^{0}$ has none, which leaves the bare 1. Each line is ten times the line above it, and it is.

**Where this goes wrong.** Almost everybody who gets one of these wrong gets $10^{0}$ wrong, and
writes 0. It looks right, because a zero is sitting there in the exponent. Here is why it is 1.
Going down the list, each step removes one 10 and therefore divides by 10. From $10^{2} = 100$ to
$10^{1} = 10$ is a division by 10. Take the next step down, from $10^{1} = 10$, and you divide by
10 again, which gives 1. The pattern has no choice in the matter. The second slip is writing
$10^{1} = 1$ by reading the exponent as the answer.

---

### Practice

**9.** **What is being asked.** Find characters per token for the string `'  spaces'`, which has
two spaces in front of the word, then say why the six letters `spaces` can cost one token or two.

**What it tests.** Formula 2.4 again, $r = \dfrac{c}{n}$, together with Definition 2.1, which
says a token can be a space followed by a word.

**The work.**

Step 1, write down the two counts, which the problem gives. $c = 8$ characters: two spaces plus
the six letters s-p-a-c-e-s. $n = 2$ tokens, the pieces `' '` and `' spaces'` (**measured**, from
`lab/out/we1_tokens.json`, ids 220 and 12621).

Step 2, divide.

$$r = 8 \div 2 = 4$$

Step 3, write it to four decimal places, as the chapter does.

$$r = 4.0000$$

**Answer.** 4.0000 characters per token.

**The one sentence the problem asks for.** The six letters `spaces` cost one token when a single
space sits in front of them, because `' spaces'` with its space attached is one row of the
vocabulary, and they cost two when a second space sits in front, because the leftover space has
no word to attach itself to and needs a row of its own.

**Check it.** Multiply back: $4.0000 \times 2 = 8$, which is the character count. This division
comes out exactly, so there is no rounding crumb this time.

**Where this goes wrong.** The tempting error is counting the string as 6 characters and getting
$6 \div 2 = 3.0000$. It is tempting because spaces are invisible and the eye counts letters.
Spaces are characters. `len()` in Python counts them, the tokenizer sees them, and a service
billing you by the token is charging you for them. Count every character between the quotation
marks, including the ones you cannot see.

---

**11.** **What is being asked.** Find characters per token for a 28-letter word and for a
seven-digit string, then say why the longer one is cheaper per character.

**What it tests.** Formula 2.4, $r = \dfrac{c}{n}$, and the point of
[Section 2.3 of Chapter 2](../ch/ch02.md) that length is not what decides the cost.

**The work, one string at a time.**

String one, `antidisestablishmentarianism`. Here $c = 28$ and $n = 6$.

$$r = 28 \div 6 = 4.666666\ldots$$

The 6s never stop. Round to four decimal places: the fifth decimal is 6, which is 5 or more, so
the fourth goes up from 6 to 7.

$$r = 4.6667$$

String two, `1234567`. Here $c = 7$ and $n = 7$.

$$r = 7 \div 7 = 1$$

Written to four decimal places, $r = 1.0000$. This one comes out exactly.

**Answer.** `antidisestablishmentarianism` is 4.6667 characters per token. `1234567` is 1.0000
characters per token.

**The one sentence the problem asks for.** The long word is cheaper per character because its six
pieces are `'ant'`, `'idis'`, `'establish'`, `'ment'`, `'arian'` and `'ism'` (**measured**, from
`lab/out/we1_tokens.json`), chunks the counting procedure met often enough to give each one a
row, and each of those rows carries three to nine letters at once, while a bare digit only ever
earned a single-character row, so seven digits have to buy seven rows.

**Check it.** Multiply back. $4.6667 \times 6 = 28.0002$, which is 28 plus a rounding crumb.
$1.0000 \times 7 = 7$ exactly. And 1.0000 is the smallest value $r$ can take for this tokenizer,
since no token is shorter than one character, so `1234567` is the worst possible result rather
than merely a bad one.

**Where this goes wrong.** The tempting conclusion is that longer text costs more per character.
These two rows say the opposite: 28 characters came to 4.6667 per token and 7 characters came to
1.0000 per token. What decides the cost is how often each chunk turned up in the pile of text the
vocabulary was counted from, and nothing else. The arithmetic slip to watch for is rounding
4.666666 to 4.67 and then multiplying by 6, which gives 28.02 rather than 28.

---

**13.** **What is being asked.** Count the vocabulary rows the tokenizer never produces, then
count how many numbers those rows take up.

**What it tests.** The three vocabulary counts from
[Section 2.2 of Chapter 2](../ch/ch02.md) and Cell 4, then Formula 2.2,
$N_{\text{table}} = V \times d$, applied to the unused rows only. The sign $-$ means take the
number on the right away from the number on the left.

**The work.**

Step 1, subtract the larger tokenizer count from the model's row count.

$$151{,}936 - 151{,}665 = 271$$

Step 2, every row is $d = 896$ numbers wide, so multiply.

$$271 \times 896$$

Step 3, break it up, because 896 is 900 minus 4.

$$271 \times 900 = 243{,}900$$

$$271 \times 4 = 1{,}084$$

Step 4, subtract the second from the first.

$$243{,}900 - 1{,}084 = 242{,}816$$

**Answer.** **271 rows** are never emitted, and they occupy **242,816 numbers**.

**Check it.** Rough out step 3: 271 times 900 is 243,900, so an answer near 243 thousand is the
right size. Then put it in proportion with Formula 2.3, to see whether it is worth worrying
about: $242{,}816 \div 494{,}032{,}768 = 0.000491$, rounded to six decimal places, and
$0.000491 \times 100 = 0.0491$, so the waste is about **0.05% of the model**. Real, measurable,
and small.

**Where this goes wrong.** The tempting error is subtracting 151,643 instead of 151,665, which
gives $151{,}936 - 151{,}643 = 293$ rows and $293 \times 896 = 262{,}528$ numbers. It is tempting
because 151,643 is the number `tokenizer.vocab_size` prints, and that looks like the official
one. It is the count of ordinary tokens only. The question asks about ids the tokenizer can ever
produce, and it can also produce 22 special markers, so the count to use is `len(tokenizer)`,
which is 151,665. This is common mistake 4 from the chapter, and it is the mistake that turns
27.56% into 27.51% elsewhere.

---

**15.** **What is being asked.** Use place value to rebuild the number that the digit string
`50607` spells out, and say what the two zeros do.

**What it tests.** Formula 2.5, $N = \sum_{k=0}^{m} d_k \times 10^{k}$, from
[Section 2.4 of Chapter 2](../ch/ch02.md). The symbol $\sum$ is the capital Greek letter sigma
and means "add up everything that follows"; [toolkit section 10](math-toolkit.md#toolkit-sigma)
builds it up slowly.

**Step 0, state $m$.** The string has five digits, and $m$ is one less than the number of digits,
so $m = 4$.

**Step 1, number the digits from the right.** Position 0 is the rightmost digit, and the position
numbers grow as you move left. The digit written first has the largest position number.

$d_4 = 5$, $d_3 = 0$, $d_2 = 6$, $d_1 = 0$, $d_0 = 7$

**Step 2, write out each power of ten.**

$10^{4} = 10{,}000$

$10^{3} = 1{,}000$

$10^{2} = 100$

$10^{1} = 10$

$10^{0} = 1$

**Step 3, multiply each digit by its power of ten.**

$5 \times 10{,}000 = 50{,}000$

$0 \times 1{,}000 = 0$

$6 \times 100 = 600$

$0 \times 10 = 0$

$7 \times 1 = 7$

**Step 4, add them, one at a time, from the top down.**

$50{,}000 + 0 = 50{,}000$

$50{,}000 + 600 = 50{,}600$

$50{,}600 + 0 = 50{,}600$

$50{,}600 + 7 = 50{,}607$

**Answer.** $N = 50{,}607$.

**What the two zeros contribute.** Nothing to the total and everything to the positions. Each
zero term added 0 to the sum, so you could delete both of those lines and the total would not
move. What you cannot delete is the **places** they hold. Take the zeros out of the string and
you are left with `567`, which is a different number by a factor of about ninety. The zeros are
placeholders: their job is to keep the 5 in the ten-thousands position and the 6 in the hundreds
position.

**Check it.** The digits of the answer read 5, 0, 6, 0, 7, in that order, matching the string you
started with. And the first term on its own, 50,000, must be larger than everything else added
together, because each position is worth ten times the one to its right. Everything else comes to
$0 + 600 + 0 + 7 = 607$, and 50,000 is larger.

**Where this goes wrong.** Two tempting errors. The first is skipping the zero terms because they
contribute nothing, then renumbering the remaining positions, which turns `50607` into `567`.
Write the zero lines out even though they are boring; they are what keeps the numbering honest.
The second is counting positions from the **left**, which gives
$5 \times 1 + 0 \times 10 + 6 \times 100 + 0 \times 1{,}000 + 7 \times 10{,}000 = 70{,}605$. That
is the digits read backwards. Formula 2.5 counts positions from the right-hand end, starting at
zero, every time.

---

**17.** **What is being asked.** Compute characters per token for `Bakersfield` under two
different tokenizers, then explain why the bigger vocabulary gave the longer token list.

**What it tests.** Formula 2.4, $r = \dfrac{c}{n}$, together with the argument in
[Section 2.2 of Chapter 2](../ch/ch02.md) that a vocabulary size is a decision rather than a
measure of quality.

**The work.**

`Bakersfield` is 11 characters either way, so $c = 11$ on both lines.

Tokenizer one, our model, $V = 151{,}936$. The pieces are `'B'`, `'akers'` and `'field'`, so
$n = 3$ (**measured**, from `lab/out/we1_tokens.json`).

$$r = 11 \div 3 = 3.666666\ldots$$

Rounded to four decimal places, $r = 3.6667$.

Tokenizer two, `all-MiniLM-L6-v2`, $V = 30{,}522$. The pieces are `'baker'` and `'##sfield'`, so
$n = 2$ (**measured**, same file).

$$r = 11 \div 2 = 5.5$$

Written to four decimal places, $r = 5.5000$.

**Answer.** Our model gets 3.6667 characters per token on this word. `all-MiniLM-L6-v2` gets
5.5000 characters per token on the same word, from a vocabulary about a fifth the size:
$151{,}936 \div 30{,}522 = 4.9779$, rounded to four decimal places.

**The two sentences the problem asks for.** A vocabulary size says **how many** chunks earned a
row; it says nothing about **which** chunks earned one, and only the which decides how any
particular word gets cut. MiniLM's 30,522 rows happen to include `baker`, and our 151,936 rows
include no chunk that covers `Bakers`, so on this one word the smaller table wins, which it could
not do if size alone decided the answer.

**Check it.** Multiply back. $5.5000 \times 2 = 11$ exactly, and $3.6667 \times 3 = 11.0001$,
which is 11 plus a rounding crumb. Both land on the 11 characters you started with.

**Where this goes wrong.** The tempting conclusion is that MiniLM is the better tokenizer, or
that a smaller vocabulary is better in general. One word is one word. The honest statement is
that two working systems disagree about this word, which is what makes the vocabulary size a
design choice rather than a fact about English. There is also a detail worth naming rather than
hiding: MiniLM lowercases the text before cutting it, which is why its first piece is `baker` and
not `Baker`. The two tokenizers are not doing quite the same job, and part of how MiniLM got away
with two pieces is that it never needed a separate row for a capital letter.

---

### Stretch

**19.** **What is being asked.** Add the four measured shares of this model, then say how you
would tell a rounding gap from a forgotten part, and which of the two should worry you more.

**What it tests.** Formula 2.3, the share of a model held by one part, from
[Section 2.2 of Chapter 2](../ch/ch02.md), and the rule that a complete list of parts has to come
to 100%. All four shares are **measured**, from `lab/out/ch03_parameter_anatomy.json`.

**Part one, the addition.** Add them two at a time, as printed.

$$27.56 + 63.51 = 91.07$$

$$91.07 + 8.92 = 99.99$$

$$99.99 + 0.0089 = 99.9989$$

**Answer.** The four printed shares come to **99.9989%**, which is **100.00%** once you round to
the two decimal places the first three shares already carry.

**A note on the wording, because the problem can be read two ways.** Add the four figures exactly
as printed and you get 99.9989%. Round the small one to two decimal places first, as the chapter
does, and you get $99.99 + 0.01 = 100.00\%$ exactly. Both routes are defensible and both land on
100.00% at two decimal places, so say which route you took. The full-precision shares in the lab
file are 27.555794841527597, 63.51529459681508, 8.920023701747654 and 0.00888685990966494, and
those four add to exactly 100.0. The 0.0011 missing from 99.9989 is rounding, and it is nothing
else.

**Part two, the two sentences.** A strong answer contains three things: a way to turn the gap into
a count of parameters, a bound on how large a rounding gap can possibly be, and a clear statement
of which failure is worse. One worked version:

> Turn the gap into parameters before arguing about it: 0.01% of 494,032,768 is
> $0.0001 \times 494{,}032{,}768 = 49{,}403$ numbers, so I would look for a named part of the
> model about that size, and the layer norms at 43,904 numbers are exactly that. Then bound the
> rounding: three numbers each rounded to two decimal places can each be off by at most 0.005, so
> rounding alone can never move the total by more than $3 \times 0.005 = 0.015$ percentage
> points, which means a gap of 0.01 could be rounding while a gap of 0.1 could not.

**Which one should worry you more.** The forgotten part, and it is not close. A rounding gap is
bounded, harmless, and goes away the moment you keep more decimal places. A missing part means
your list of components is wrong, which means you do not know what the model is made of, and
every share you computed was divided by a total you cannot account for. The gap is small either
way. What differs is what the gap is telling you about your own bookkeeping.

**Where this goes wrong.** The tempting move is to write "99.99, close enough to 100" and stop.
That habit is what would have hidden the layer norms. Chase every gap to a named cause. The
opposite move is tempting too: assuming any gap must be a missing part. Compute the rounding
bound first, since it costs one multiplication and it settles the question.

---

**21.** **What is being asked.** Turn "the model is bad at maths because it does not really
understand numbers" into a claim about the input that Cell 7 could check, then say what result
would prove your version wrong.

**What it tests.** The distinction in [Section 2.4 of Chapter 2](../ch/ch02.md) between a
measurement and a hypothesis. This is a written answer, so there is no single right wording. What
follows is what a strong response contains, then one example of such a response.

**What a strong response contains.** Four things.

1. It talks about the **input**, not about the model's mind. Words like "understand" and "really"
   cannot be measured and have to go.
2. It names a **count** somebody could produce, on a named tokenizer, with a named string.
3. It needs no model weights. Cell 7 loads a tokenizer, which is a few megabytes, and prints a
   number.
4. Its falsifier is a **measurement**, not a counter-argument.

**One worked example of such a response.**

> **Rewritten claim.** When the tokenizer of `Qwen2.5-0.5B-Instruct` is given the string
> `1234567`, it returns seven token ids, one per digit, and no id in that list carries the
> position of its digit inside the number.
>
> **What would show it wrong.** Run Cell 7 and get fewer than seven tokens: one id standing for
> the whole of `1234567`, or three ids standing for `123`, `456` and `7`. Then multi-digit chunks
> have rows of their own, the grouping is in the input, and my claim is false for that tokenizer.
> A second result would also kill it. If the id standing for `'3'` inside `1234567` differed from
> the id standing for `'3'` inside `37`, then position would be riding along in the input after
> all. It does not. `'3'` is id 18 in both, and the digits `'0'` through `'9'` occupy the
> consecutive ids 15 through 24 whatever sits around them (**measured**, from
> `lab/out/we1_tokens.json`).

**What the rewrite gives up, and why that is the point.** The rewritten claim says nothing about
whether the model adds well. It cannot, because this course has not measured that. "Digits arrive
one token each" is a measurement you can reproduce in ten seconds. "Therefore the model is bad at
maths" is a separate claim that needs a question bank, a scoring procedure and a confidence
interval, which is Chapter 12. Giving up the bigger claim is what makes the smaller one worth
something.

**Where this goes wrong.** The tempting rewrite keeps the conclusion and changes only the tone,
for example "the model has no internal representation of quantity". That is the original claim in
a lab coat. It names nothing you can count, and Cell 7 cannot touch it. Ask two questions of your
own sentence: what number would I print, and what value of that number would make me withdraw the
sentence? If you cannot answer both, rewrite again.

---

**23.** **What is being asked.** List three things you would have to measure before anyone could
claim "Spanish speakers pay more to use AI", and say which one you would do first and why.

**What it tests.** Common mistake 6 from [Chapter 2](../ch/ch02.md): characters per token belongs
to one tokenizer and one text, not to a language. This is a written answer, so there is no single
right list.

**What the evidence actually is right now.** One Spanish string, `¿Cómo estás?`, measured 12
characters in 5 tokens, so $r = 12 \div 5 = 2.40$ characters per token (**measured**, from
`lab/out/we1_tokens.json`). One string. A sample of one is not a study of a language.

**What a strong response contains.** Three measurements that are each genuinely measurable, a
recognition that the tokenizer is part of the claim and not a neutral instrument, and a
recognition that "pay more" is about money for a delivered message, not about a ratio.

**One worked example of such a response.**

> **Measurement 1. Many matched pairs, not one string.** Take a few hundred documents that exist
> in both English and Spanish, the same content in each, and run every pair through the same
> tokenizer. Report the mean token count for each language with a confidence interval, the way
> Chapter 12 does. One pair is an anecdote; a few hundred pairs with an interval is a
> measurement.
>
> **Measurement 2. Tokens per message, not characters per token.** Characters per token is the
> wrong quantity for a claim about money. A Spanish sentence with the same meaning is usually
> longer in characters than its English version, so a language could score well on characters per
> token and still cost more per message. Bills are per token, so measure the token count of the
> whole message.
>
> **Measurement 3. The tokenizers people are actually billed by.** The 2.40 figure belongs to
> `Qwen2.5-0.5B-Instruct`. A person paying for a commercial service meets a different table, and
> Section 2.2 already shows two tokenizers disagreeing about a single word. Repeat measurements 1
> and 2 on the tokenizers of the services the claim is about.

**Which one first, and why.** Measurement 1. Two reasons, and the second is the better one. It is
the cheapest: a tokenizer is a few megabytes, no model weights are loaded, and a few hundred pairs
run in seconds on a laptop. And it is the one most likely to **kill** the claim early. If the
difference does not survive a few hundred matched pairs on the one tokenizer already sitting on
the lab machine, nobody needs to go and price three commercial services. Run the measurement that
can end the argument fastest, and run it before you pay for the expensive ones.

**Where this goes wrong.** The tempting move is to accept the direction of the claim and argue
only about its size, for instance "yes, but it is probably a small difference". That still treats
one string as evidence. The honest position is that the current evidence does not support the
claim in either direction. The second tempting move is to set 2.40 against 3.6667 as though two
languages were being weighed. They are not. One is a Spanish greeting and the other is a
California place name, and a place name is an unusual word in any language.

---

(answers-ch03)=
## Chapter 3. What is a parameter?

These problems drill five moves: counting the numbers in a rectangle, turning a part into a
share, turning a count of numbers into a count of bytes, describing a pile of weights with a
middle and a spread, and writing very large and very small numbers in scientific notation.

### Warm-up

**1.** **What is asked.** How many numbers are in a weight matrix whose shape is `(896, 4864)`.

**What it is testing.** [Formula 3.1](../ch/ch03.md#ch03-parameter), the count of numbers in a
matrix: $N_{\text{matrix}} = (\text{rows}) \times (\text{columns})$. The $\times$ sign is
multiplication, from [Math Toolkit Section 3](math-toolkit.md#toolkit-multiplication). The same
formula is stated in the [formula summary](formulas.md), section 2.2.

**The work.** The shape is written `(rows, columns)`, so rows $= 896$ and columns $= 4{,}864$.
The problem asks you to split 896 into $900 - 4$, because multiplying by 900 is easy and
multiplying by 896 is not.

Step 1, multiply by 900. First multiply by 9, then put the two zeros back on.

$4{,}864 \times 9 = 43{,}776$

$4{,}864 \times 900 = 4{,}377{,}600$

Step 2, multiply by 4.

$4{,}864 \times 4 = 19{,}456$

Step 3, subtract, because you used 900 where you wanted 896.

$4{,}377{,}600 - 19{,}456 = 4{,}358{,}144$

**The answer.** $N_{\text{matrix}} = 4{,}358{,}144$ parameters.

**Check it.** The answer must be a whole number, and it must be far bigger than either side of
the rectangle. It is. A second check: this is the same rectangle as `mlp.gate_proj` in
[Worked example 3.2](../ch/ch03.md#ch03-anatomy), which has shape `(4864, 896)`, the same
rectangle turned on its side. Turning a rectangle on its side does not change how many numbers
are inside it, and Worked example 3.2 also gets 4,358,144. One more: there are 24 layers, and
$4{,}358{,}144 \times 24 = 104{,}595{,}456$, which is exactly the `mlp.gate_proj` row printed by
Cell 3.

**Where this goes wrong.** The tempting wrong answer is $896 + 4{,}864 = 5{,}760$. It is
tempting because the shape hands you two numbers and addition is the first thing people do with
two numbers. Spot it by size: an answer of 5,760 is about the same size as one side of the
rectangle, and the count of numbers in a rectangle has to be very much bigger than either side.
This is Common mistake 6 in the chapter.

---

**3.** **What is asked.** Work out $104{,}595{,}456 \div 494{,}032{,}768$ and give it as a
percentage to four decimal places.

**What it is testing.** [Formula 3.2](../ch/ch03.md#ch03-anatomy), the share of the parameters
held by one part: $\text{share} = N_{\text{component}} / N_{\text{total}}$, and then turning a
decimal into a percentage, from
[Math Toolkit Section 11](math-toolkit.md#toolkit-percentages).

**The work.** The part on top is 104,595,456, which is one of the three MLP matrices counted
across all 24 layers. The whole underneath is 494,032,768, the parameter count of the model.

Step 1, divide. Type it into a calculator in the order it is written.

$104{,}595{,}456 \div 494{,}032{,}768 = 0.2117176$

Your calculator will keep going, 0.21171764865 and onwards.

Step 2, multiply by 100 to turn the decimal into a percentage. Multiplying by 100 moves the
decimal point two places to the right.

$0.21171764 \times 100 = 21.171764$

Step 3, round to four decimal places. Keep four digits after the point, 21.1717, then look at
the next digit. It is a 6, which is 5 or more, so round the last kept digit up.

$21.171764 \rightarrow 21.1718$

**The answer.** $21.1718\%$ of the model.

**Check it.** A share has to land between 0 and 1 before you convert it, and between 0% and 100%
after. This one does. A second check: 21.1718% is exactly the `mlp.gate_proj` share printed by
Cell 3, and there are three matrices that size, so $21.1718 \times 3 = 63.5154$, next to the
measured 63.5153% for all three MLP matrices together. The gap of 0.0001 percentage points is
rounding, not a mistake, and the chapter's warning box on rounded shares says why.

**Where this goes wrong.** The tempting wrong answer is
$494{,}032{,}768 \div 104{,}595{,}456 = 4.7233$, which becomes 472.33% if you carry on and
multiply by 100. It is tempting because the bigger number feels like it belongs on top. A share
above 100% is always this mistake, and the fix is to swap the two numbers. This is Common
mistake 4 in the chapter. The other slip is stopping at 0.2118 and writing a percent sign after
it. That is the share, not the percentage; it still needs the $\times 100$.

---

**5.** **What is asked.** The size of a 494,032,768-parameter model in bytes when each parameter
takes four bytes, and then that size in gigabytes.

**What it is testing.** [Formula 3.5](../ch/ch03.md#ch03-bytes),
$\text{size in bytes} = N \times (\text{bytes per weight})$, and the unit rule from Definition
3.7: **GB means $10^{9}$ bytes**, which is one thousand million bytes.

**The work.**

Step 1, write down the two pieces. $N = 494{,}032{,}768$, and bytes per weight $= 4$. Four bytes
per number is FP32, because FP32 gives each number 32 bits and $32 \div 8 = 4$.

Step 2, multiply by 4. Multiplying by 4 is doubling twice, which you can do on paper.

$494{,}032{,}768 \times 2 = 988{,}065{,}536$

$988{,}065{,}536 \times 2 = 1{,}976{,}131{,}072$

Step 3, turn bytes into gigabytes by dividing by one thousand million.

$1{,}976{,}131{,}072 \div 1{,}000{,}000{,}000 = 1.976131072$

Step 4, round to three decimal places. The fourth decimal digit is 1, which is under 5, so the
third decimal stays as it is.

$1.976131072 \rightarrow 1.976$

**The answer.** 1,976,131,072 bytes, which is **1.976 GB**.

**Check it.** Halving the bytes per weight has to halve the file exactly, so FP16 at two bytes
should come out at half of this: $1.976131072 \div 2 = 0.988065536$, and 0.988 GB is the FP16
figure printed by Cell 9 and recorded in `lab/out/ch03_parameter_anatomy.json`. A rough check
also works: about half a billion numbers at four bytes each is about two thousand million bytes,
which is about 2 GB.

**Where this goes wrong.** The tempting wrong answer is 1,976.131 GB, from dividing by
1,000,000 instead of by 1,000,000,000. It is tempting because both divisions feel like "move the
decimal point a lot" and the two look alike on a calculator screen. That answer is the size in
**megabytes**, not gigabytes. MB is $10^{6}$ bytes and GB is $10^{9}$ bytes, three zeros apart.
The other slip is reading FP32 as 32 **bytes** and multiplying by 32, which gives a file eight
times too large. This is Common mistake 8 in the chapter.

---

**7.** **What is asked.** Write 151,936, the vocabulary size, in scientific notation, keeping
every digit.

**What it is testing.** [Formula 3.6](../ch/ch03.md#ch03-scientific),
$x = a \times 10^{b}$ with $1 \le a < 10$. The full treatment, from nothing, is in
[Math Toolkit Section 17](math-toolkit.md#toolkit-scientific-notation).

**The work.**

Step 1, put the decimal point after the first digit. The first digit of 151,936 is 1, so the
mantissa is $1.51936$.

Step 2, count how many places the point moved. In 151,936 the decimal point sits at the far
right, after the 6. To reach $1.51936$ it moved left past five digits: the 6, the 3, the 9, the
1 and the 5.

Step 3, moving the point to the left gives a **positive** exponent, and the exponent is the
number of places it moved.

$$151{,}936 = 1.51936 \times 10^{5}$$

**The answer.** $1.51936 \times 10^{5}$ tokens. No digit was dropped, because the problem asked
for every digit. Had it asked for three significant figures, the answer would be
$1.52 \times 10^{5}$.

**Check it.** Move the point back the way you came, five places to the right: 1.51936 becomes
15.1936, then 151.936, then 1519.36, then 15193.6, then 151936. You land on the number you
started with. A second check: Cell 11 prints this number as `1.51936e+05`, and `e+05` on a
screen means "times ten to the power of 5".

**Where this goes wrong.** Two tempting wrong answers. The first is $15.1936 \times 10^{4}$.
That is arithmetically equal to 151,936, and it is still not scientific notation, because the
mantissa has to be at least 1 and less than 10. The second is $1.51936 \times 10^{-5}$, from
getting the sign of the exponent backwards. That value is 0.0000151936, which is not a count of
tokens. A number bigger than 10 always has a positive exponent.

---

**9.** **What is asked.** The mean of five numbers, 2, 4, 4, 6 and 9, showing the running total
and the division.

**What it is testing.** [Formula 3.3](../ch/ch03.md#ch03-one-matrix), the mean:
$\bar{w} = \frac{1}{N}\sum_{i=1}^{N} w_i$. The $\sum$ sign means "add these up", from
[Math Toolkit Section 10](math-toolkit.md#toolkit-sigma).

**The work.** These five numbers are small and made up for practice. The steps are the same ones
the code runs over 802,816 real weights.

Step 1, add them one at a time, writing down the running total each time.

$2$

$2 + 4 = 6$

$6 + 4 = 10$

$10 + 6 = 16$

$16 + 9 = 25$

The total is 25.

Step 2, count how many numbers there were. $N = 5$.

Step 3, divide the total by the count.

$25 \div 5 = 5$

$$\bar{w} = 5$$

**The answer.** The mean is **5**.

**Check it.** A mean always lands between the smallest number in the list and the largest. The
smallest here is 2 and the largest is 9, and 5 sits between them. If your answer is bigger than
every number in the list, you forgot to divide by 5.

**Where this goes wrong.** The tempting wrong answer is 4. The list arrives already sorted, 2,
4, 4, 6, 9, and the middle one is 4. That makes 4 the **median**, not the mean. It is tempting
because 4 appears twice and sits in the middle, and because the two words get used as if they
meant the same thing. They do not.
[Section 3.4](../ch/ch03.md#ch03-spread) is built on the fact that the mean and the median of
the same list can be different numbers, and here they are: the mean is 5 and the median is 4.

### Practice

**11.** **What is asked.** The FP32 size, in gigabytes, of a model with 1,543,714,304
parameters.

**What it is testing.** [Formula 3.5](../ch/ch03.md#ch03-bytes) again, on a larger count. The
parameter count of `Qwen2.5-1.5B-Instruct` is measured and recorded in
`lab/out/theme_s_energy.json`.

**The work.**

Step 1, bytes per weight. FP32 gives each number 32 bits, and a byte is 8 bits, so
$32 \div 8 = 4$ bytes per weight.

Step 2, multiply, by doubling twice.

$1{,}543{,}714{,}304 \times 2 = 3{,}087{,}428{,}608$

$3{,}087{,}428{,}608 \times 2 = 6{,}174{,}857{,}216 \text{ bytes}$

Step 3, divide by one thousand million to get gigabytes.

$6{,}174{,}857{,}216 \div 1{,}000{,}000{,}000 = 6.174857216$

Step 4, round to three decimal places. The fourth decimal digit is 8, which is 5 or more, so the
third decimal rounds up from 4 to 5.

$6.174857216 \rightarrow 6.175$

**The answer.** 6,174,857,216 bytes, which is **6.175 GB**.

**Check it.** The number at the end of step 2's first line, 3,087,428,608 bytes, is the FP16
size, and 3.087 GB is exactly what [Try it 3.3](../ch/ch03.md#ch03-bytes) worked out. FP32 has
to be exactly double FP16, and $3.087428608 \times 2 = 6.174857216$. It is. A second check: this
model holds $1{,}543{,}714{,}304 \div 494{,}032{,}768 = 3.1247$ times the parameters of the small
one, and the small one came to 1.976131072 GB at FP32, so this one should come to about
$1.976131072 \times 3.1247 = 6.1748$ GB. It does, and the last digit differs only because 3.1247
is itself a rounded figure.

**Where this goes wrong.** The tempting wrong answer is 3.087 GB. It is tempting because that
figure is already worked out in Try it 3.3 and is sitting on the page. Try it 3.3 asked for
FP16, two bytes per number. This problem asks for FP32, four bytes. Read the format the question
names before you pick the multiplier.

---

**13.** **What is asked.** What share of the 494,032,768-parameter model is held by the
`self_attn.q_proj` matrices across all 24 layers, which hold 19,289,088 parameters, as a
percentage to four decimal places.

**What it is testing.** [Formula 3.2](../ch/ch03.md#ch03-anatomy),
$\text{share} = N_{\text{component}} / N_{\text{total}}$.

**The work.**

Step 1, the part goes on top and the whole goes underneath. Divide.

$19{,}289{,}088 \div 494{,}032{,}768 = 0.0390441$

The calculator carries on, 0.039044146966 and onwards.

Step 2, multiply by 100, which moves the decimal point two places to the right.

$0.03904414 \times 100 = 3.904414$

Step 3, round to four decimal places. Keep 3.9044, then look at the next digit. It is a 1, which
is under 5, so 3.9044 stays.

**The answer.** $3.9044\%$ of the model.

**Check it.** It matches the `self_attn.q_proj` row printed by Cell 3 and stored in
`lab/out/ch03_parameter_anatomy.json`. You can also rebuild the count from the shapes. `q_proj`
is an 896 by 896 matrix, so $896 \times 896 = 802{,}816$ numbers, plus a bias holding one number
for each of the 896 outputs:

$802{,}816 + 896 = 803{,}712$ per layer

$803{,}712 \times 24 = 19{,}289{,}088$ across all 24 layers

which is the count the problem gave you.

**Where this goes wrong.** Two tempting wrong answers. The first is 0.0390%, from leaving out
the $\times 100$ and writing a percent sign on the decimal anyway. The second is 3.9001%, which
is the share of `self_attn.o_proj`. The two look like the same matrix, both 896 by 896, and they
hold different counts: `q_proj` carries a bias and `o_proj` does not, so `q_proj` holds 21,504
more parameters across the 24 layers. If your answer comes out at 3.9001%, check which row of
Cell 3 you read.

---

**15.** **What is asked.** How many times larger the vocabulary table, at 136,134,656
parameters, is than all of attention, at 44,067,840 parameters, to four decimal places.

**What it is testing.** The comparison used at the end of
[Section 3.2](../ch/ch03.md#ch03-anatomy): to ask how many times larger one count is than
another, divide the larger by the smaller. The fraction bar and $\div$ give the same
instruction, from [Math Toolkit Section 4](math-toolkit.md#toolkit-fraction-bar).

**The work.**

Step 1, put the larger count on top and the smaller underneath.

$136{,}134{,}656 \div 44{,}067{,}840 = 3.0892064$

The calculator carries on, 3.08920645986 and onwards.

Step 2, round to four decimal places. Written out further, the answer is 3.08920645986. The four
decimals you are keeping are 0, 8, 9 and 2, giving 3.0892. The next digit along is a 0, which is
under 5, so 3.0892 stays as it is.

**The answer.** The vocabulary table is **3.0892 times** the size of all of attention. The
answer carries no units, because a count divided by a count leaves nothing behind.

**Check it.** Multiply back. $3.0892 \times 44{,}067{,}840 = 136{,}134{,}371$, which is 285
short of 136,134,656. That small gap is there because 3.0892 has been rounded to four decimal
places, and multiplying a rounded number back will not land exactly. A rough check is cleaner:
44 million times 3 is 132 million, and the vocabulary table is 136 million, so the answer should
be a little over 3. It is.

**Where this goes wrong.** The tempting wrong answer is 0.3237, from
$44{,}067{,}840 \div 136{,}134{,}656$. It is tempting because the two counts are handed to you
in the order "vocabulary table, then attention" and it feels natural to divide in the order you
read them. An answer below 1 means you divided the smaller by the larger, and "how many times
larger" can never come out below 1. If you did get 0.3237, it is a true statement standing on
its head: all of attention is 0.3237 times the size of the vocabulary table.

---

**17.** **What is asked.** The FP32 size, in megabytes, of a model with 22,713,216 parameters.

**What it is testing.** [Formula 3.5](../ch/ch03.md#ch03-bytes) with a different unit at the
end. Definition 3.7 sets the unit: **MB means $10^{6}$ bytes**, which is one million bytes. The
parameter count of `all-MiniLM-L6-v2` is measured and recorded in
`_research/00-lab-verified-findings.md`, section 6.

**The work.**

Step 1, bytes per weight. FP32 is 32 bits, and $32 \div 8 = 4$ bytes.

Step 2, multiply by 4 by doubling twice.

$22{,}713{,}216 \times 2 = 45{,}426{,}432$

$45{,}426{,}432 \times 2 = 90{,}852{,}864 \text{ bytes}$

Step 3, divide by one million to get megabytes.

$90{,}852{,}864 \div 1{,}000{,}000 = 90.852864$

Step 4, round to three decimal places. The digit after 90.852 is an 8, which is 5 or more, so
the last kept digit rounds up.

$90.852864 \rightarrow 90.853$

**The answer.** 90,852,864 bytes, which is **90.853 MB**.

**Check it.** Compare it with something already worked out. The chapter's model holds
$494{,}032{,}768 \div 22{,}713{,}216 = 21.75$ times as many parameters, and at the same four
bytes each it came to 1,976,131,072 bytes, which is 1,976.131 MB. So this model should be about
21.75 times smaller, and $1{,}976.131 \div 21.75 = 90.857$ MB. That sits next to 90.853 MB, and
the small gap is there because 21.75 is a rounded figure. Another way to state the same answer:
90,852,864 bytes is 0.090852864 GB, under a tenth of a gigabyte.

**Where this goes wrong.** The tempting wrong answer is 90.853 **GB**, or its mirror image
0.0909 MB. Both come from dividing by the wrong power of ten. MB is $10^{6}$, which is
1,000,000, and GB is $10^{9}$, which is 1,000,000,000. Spot it by asking whether the answer is
believable: a 22.7 million parameter model taking up 90 gigabytes would be larger than every
model in this course put together.

---

**19.** **What is asked.** How many standard deviations above the mean the largest weight sits,
given a largest weight of 1.1719, a mean of $-0.000017$ and a standard deviation of 0.066741, to
two decimal places.

**What it is testing.** The distance-in-standard-deviations formula from
[Section 3.4](../ch/ch03.md#ch03-spread):
$\text{distance in standard deviations} = \dfrac{w - \bar{w}}{s}$. All three measured values are
in `lab/out/ch03_parameter_anatomy.json`.

**The work.** The brackets in the code line `(weight_max - weight_mean) / weight_sd` are there
to force the subtraction to happen before the division. Do the top of the fraction first.

Step 1, subtract the mean from the weight. The mean is a **negative** number, and subtracting a
negative number is the same as adding the positive version of it.

$1.1719 - (-0.000017) = 1.1719 + 0.000017 = 1.171917$

Step 2, divide that by the standard deviation.

$1.171917 \div 0.066741 = 17.559177$

Step 3, round to two decimal places. The digit after 17.55 is a 9, which is 5 or more, so the
second decimal rounds up from 5 to 6.

$17.559177 \rightarrow 17.56$

**The answer.** The largest weight sits **17.56 standard deviations** above the mean. The answer
carries no units. It is a count of rulers, and the ruler is the standard deviation, 0.066741.

**Check it.** It matches the second line printed by Cell 7. Two tests on the formula itself: a
weight sitting exactly at the mean gives 0, because the top of the fraction is 0, and a weight
sitting one standard deviation above the mean gives exactly 1. So an ordinary member of this
pile should come out near 1, and 17.56 says this one is nothing like ordinary.

**Where this goes wrong.** The risky slip is the minus sign in step 1. Write
$1.1719 - 0.000017 = 1.171883$ instead and you get
$1.171883 \div 0.066741 = 17.558667$, which still rounds to 17.56 at two decimal places. The
wrong method hides behind the rounding here, and it will not hide when the mean is bigger. Build
the habit now: subtracting a negative adds.

The other tempting wrong answer is 68,936.29, from dividing by the mean, 0.000017, instead of by
the standard deviation, 0.066741. It is tempting because both numbers are small and sit beside
each other in the printout. Spot it by size: an answer in the tens of thousands of standard
deviations is not a description of a weight, it is a division by the wrong number.

### Stretch

**21.** **What is asked.** Explain, in three or four sentences, why none of the bars in the
Section 3.2 simulation move when the storage slider goes from FP32 to 4-bit, even though the
model's size falls from 1.976 GB to 0.247 GB.

**What it is testing.** The difference between a count of numbers and a count of bytes, which is
Common mistake 5 in the chapter, and [Formula 3.5](../ch/ch03.md#ch03-bytes).

**What a strong answer contains.** This one asks for a written argument, so the wording is
yours. A strong answer has these four pieces, and the first two are the heart of it.

1. The bars measure **how many parameters** each part holds. That is a count of numbers.
2. The storage format decides **how many bytes each number gets**. That is a separate decision,
   made after the counting, and it changes nothing about the counting.
3. Nothing is added and nothing is thrown away when the format changes. The model still holds
   494,032,768 parameters at every rung of the ladder.
4. The strongest answers go one step further. Even if the bars were redrawn in bytes instead of
   in parameters, the **shape** of the chart would still not change, because every part would
   shrink by the same factor. Four bytes down to half a byte is a factor of
   $4 \div 0.5 = 8$, and the whole model falls by that same factor:
   $1.976131072 \div 8 = 0.247016384$. Every bar shrinking by 8 leaves the picture identical.

**One worked example of such an answer.**

> The bars in that chart are counts of parameters, and the slider does not change any count. It
> changes how many bytes each parameter is written down in, which is a different measurement of
> the same object. The model holds 494,032,768 numbers at FP32 and the same 494,032,768 numbers
> at 4 bits, so the vocabulary table is still 136,134,656 of them and all of attention is still
> 44,067,840 of them. What changes is the room each number gets, from four bytes down to half a
> byte, a factor of 8, which is why 1.976 GB becomes 0.247 GB while the picture stays where it
> is.

**Where this goes wrong.** The tempting wrong answer says the bars do not move because the
change is too small to see. The change is not small: the file drops to an eighth of its size.
The bars do not move because they are not measuring the thing that changed.

---

**23.** **What is asked.** Two sentences a careful reader should say back to the claim
"7 billion parameters, fourteen times the size of the small one". One sentence about what the
count does and does not tell you, and one that uses something you measured in this chapter.

**What a strong answer contains.** This is a written argument and there is no single right
wording. A strong answer has these pieces.

- It says that a parameter count is a count of numbers in a file. It is not a measure of how
  good the answers are, and it is not a file size until somebody says how many bytes each number
  gets.
- It notices that "fourteen times" is a claim you can check. Divide:
  $7{,}000{,}000{,}000 \div 494{,}032{,}768 = 14.1691$. As a ratio of counts, "fourteen times"
  is about right, and a careful reader says which quantity is fourteen times what.
- It uses a measured number from this chapter. Any of these works: the inventory at 27.56%
  vocabulary table, 63.51% MLP blocks and 8.92% attention; or the file size, since
  $7{,}000{,}000{,}000 \times 2 = 14{,}000{,}000{,}000$ bytes at FP16, which is 14 GB, against
  the 0.988 GB of the model in this chapter.
- It stops short of claiming the larger model is better. Nothing measured in this chapter says
  that.

**One worked example of such an answer.**

> A parameter count tells you how many numbers are in the file and nothing about how good the
> replies are, and it is not a file size at all until you say how many bytes each number gets:
> at two bytes each, 7 billion parameters is 14,000,000,000 bytes, which is 14 GB, against the
> 0.988 GB of the model I have been counting. In that small model I measured 27.56% of the
> parameters sitting in a lookup table for tokens and 8.92% sitting in all of attention, so
> fourteen times as many numbers does not mean fourteen times as much of the part people write
> papers about.

**Where this goes wrong.** The tempting wrong reply is "so it must be fourteen times better".
Nothing in a count supports that. The other slip is agreeing that 7 billion parameters is
"fourteen times the size" without asking size of what. Fourteen times the count of numbers and
fourteen times the bytes on disk are two different claims, and they match only when both models
use the same storage format.

---

**25.** **What is asked.** Explain why "attention is 8.92% of the parameters, so attention does
8.92% of the work" does not follow, without claiming to know how much of the work attention
does.

**What a strong answer contains.** This is a written argument. A strong answer has these pieces.

- It names the two different things being measured. The 8.92% is a share of **stored numbers**,
  measured once, from the file on disk. "The work" is something that happens **while the model
  runs**, and this chapter measured nothing about that.
- It gives at least one reason the two can come apart. The clearest: a share of the file says
  nothing about how many times a number is **used**. A weight read once per token and a weight
  read many times take up the same room in the file.
- The strongest answers reach for a second reason. What attention costs depends on how long your
  text is, because attention looks back at earlier tokens, while the parameter count does not
  change with the length of the text at all. So the two quantities are not even measured against
  the same thing, and one of them moves when you change the prompt.
- It refuses to supply a replacement number. The honest ending is "this chapter did not measure
  that", and a measurement of run-time cost would be a different experiment.

**One worked example of such an answer.**

> The 8.92% is a share of the numbers stored in the file, counted once and fixed. Work happens
> when the model runs, and this chapter never measured that, so no number in the inventory can
> be carried across to it. The two can come apart because a parameter's share of the file says
> nothing about how often that parameter gets used, and because what attention costs grows with
> how long your text is while the parameter count stays at 494,032,768 no matter what you type.
> I do not know what share of the work attention does, and neither does anyone reading it off
> the inventory.

**Where this goes wrong.** The tempting move is to answer a different question and say
"attention actually does more of the work than 8.92%". That may well be true, and this chapter
gives you no way to know it, so saying it repeats the classmate's mistake in the other
direction. The problem asks you to reject the inference, not to replace the number.

---

**27.** **What is asked.** Explain what the 32,288 bytes are for, given that `model.safetensors`
is 988,097,824 bytes while the weights alone come to 988,065,536 bytes, and why Cell 5 could not
have reached `layers[0].self_attn.q_proj.weight` without them.

**What it is testing.** Reading the file census in
[Section 3.5](../ch/ch03.md#ch03-bytes). The byte counts are measured by
`lab/ch03_parameter_anatomy.py` and stored in `lab/out/ch03_parameter_anatomy.json`, where the
32,288 figure has its own entry, `safetensors_index_overhead_bytes`.

**The work.** Start by confirming the two numbers the problem hands you.

Step 1, the weights alone, at two bytes each, because the published file is half precision.

$494{,}032{,}768 \times 2 = 988{,}065{,}536 \text{ bytes}$

Step 2, subtract that from the size of the file.

$988{,}097{,}824 - 988{,}065{,}536 = 32{,}288 \text{ bytes}$

Step 3, see how small that is as a share of the file, using
[Formula 3.2](../ch/ch03.md#ch03-anatomy).

$32{,}288 \div 988{,}097{,}824 = 0.0000326769$

$0.0000326769 \times 100 = 0.0032677\%$

**The answer.** Those 32,288 bytes are the file's **index**: a list written at the front of the
file, naming every block of numbers in the model, saying what shape each block is, and saying
where in the file its bytes start and stop. It is 0.0033% of the file, about three thousandths
of one per cent.

Cell 5 asked for one block by name. Without the index, the file is 988,065,536 bytes in a row
with no marks on it. There is nothing in the numbers themselves that says where one matrix ends
and the next begins, or which of them is `layers[0].self_attn.q_proj.weight`, or that it is 896
rows by 896 columns rather than 802,816 numbers in a line. The index is what turns that run of
bytes into named, findable objects. With it, the loader looks the name up, reads the start and
stop positions, and goes straight there, which is why Cell 5 came back in a moment instead of
reading 988 megabytes to find one matrix.

**Check it.** The 32,288 bytes cannot be parameters, because
$988{,}065{,}536 = 494{,}032{,}768 \times 2$ **exactly**, with nothing left over. Every parameter
is accounted for before those bytes are counted. That exact division is also the proof that the
published file gives each number two bytes, not four.

**Where this goes wrong.** The tempting wrong answer is that the 32,288 bytes are 16,144 extra
weights, from dividing 32,288 by the two bytes each weight gets. It is tempting because the rest
of the file is nothing but weights. The count is fixed at 494,032,768 and it is already matched
exactly by 988,065,536 bytes, so there is no room for extra weights. The second tempting answer
is to mix these 32,288 bytes up with the 1,338 bytes from the folder census earlier in the same
section. Those are different bytes doing a different job: the 32,288 sit **inside**
`model.safetensors` and belong to the model file, while the 1,338 are bookkeeping files the
download tool wrote **beside** the seven model files, and no chapter uses them.

---

(answers-ch04)=
## Chapter 4. The probability of the next word

These problems drill one thing from three directions: turning a list of raw scores into a list of probabilities with softmax, checking that the result is legal, and reading what the shape of that result says about the model.

Two housekeeping notes before the solutions.

**Rounding.** Every solution keeps six decimal places through the middle of the work and rounds once at the end, which is what [Toolkit 16](math-toolkit.md#toolkit-rounding) asks for. When six-place numbers are added back up, the total sometimes prints as 1.000001 or 0.999999 instead of 1.000000. That is the rounding, not an error, and each solution says so where it happens.

**Where the numbers come from.** Problems marked **real** are checked against `lab/out/we2_softmax.json` and `lab/out/ch04_softmax_chapter.json`. Problems marked **made up for practice** use invented scores, and their answers are also recorded in `lab/out/ch04_softmax_chapter.json` under `by_hand_made_up_scores`, so you can open the file and compare.

### Warm-up: can you do the arithmetic?

**1.** *Asked:* work out $e^{3}$ to six decimal places.

*Idea being tested:* Formula 4.2, raising $e$ to a power. If the `e^x` key is new, [Toolkit 7](math-toolkit.md#toolkit-e) says where to find it on a phone, on Windows Calculator, and in Google.

One press. Find the `e^x` key, enter 3.

$$e^{3} = 20.085537$$

If you want to see where that comes from rather than trust a key, $e^{3}$ means $e$ multiplied by itself three times. Do it in two steps.

$2.718282 \times 2.718282 = 7.389057$

$7.389057 \times 2.718282 = 20.085541$

That second route gives 20.085541, and the calculator gives 20.085537. The two disagree in the fifth decimal place because $e$ was rounded to 2.718282 before being multiplied three times, and each multiplication carries that rounding forward. The calculator answer is the one to report.

**Answer.** $e^{3} = 20.085537$. It is a plain number with no units.

*Where students go wrong.* The tempting wrong answer is $2.718282 \times 3 = 8.154846$. It is tempting because "e to the three" gets read at speed as "e times three". It is mistake 2 in the chapter's Common mistakes list. Test your key before you trust it: $e^{1}$ must print 2.718282 and $e^{0}$ must print exactly 1.

**3.** *Asked:* write down $e^{0}$ with no calculator, and say in one sentence why it has that value.

*Idea being tested:* exponents, from [Toolkit 5](math-toolkit.md#toolkit-exponents), and the same fact the chapter uses in Worked Example 4.1.

**Answer.** $e^{0} = 1$.

**The sentence.** An exponent counts how many times you multiply, so an exponent of zero asks for no multiplications at all, and what is left is 1, the number every multiplication starts from.

If you would rather see it forced than asserted, Formula 4.6b does it in three lines. That rule says $e^{a} \div e^{b} = e^{a-b}$. Put $a = 1$ and $b = 1$.

Left-hand side: $2.718282 \div 2.718282 = 1.000000$, because any number divided by itself is 1.

Right-hand side: $1 - 1 = 0$, so the right-hand side is $e^{0}$.

The two sides are the same number, so $e^{0} = 1$.

*Where students go wrong.* The tempting wrong answer is 0. "To the power zero" sounds like "nothing there", and nothing sounds like zero. It is not. Zero is what you get from $e \times 0$, which is a different operation. This one is worth checking on your calculator once, because it turns up in almost every softmax you will do by hand.

**5.** *Asked:* **made up for practice.** Three tokens have scores 1, 0 and 0. Find all three probabilities and check that they add to 1.

*Idea being tested:* Formula 4.4, softmax, in full. Two of the three scores are equal, which is the part worth noticing.

**Step 1, raise $e$ to each score.**

$e^{1} = 2.718282$

$e^{0} = 1.000000$

$e^{0} = 1.000000$

**Step 2, add the three results.** Add two at a time, left to right, so every line can be checked.

$2.718282 + 1.000000 = 3.718282$

$3.718282 + 1.000000 = 4.718282$

The total is $S = 4.718282$.

**Step 3, divide each result by that total.**

$p_1 = 2.718282 \div 4.718282 = 0.576117$

$p_2 = 1.000000 \div 4.718282 = 0.211942$

$p_3 = 1.000000 \div 4.718282 = 0.211942$

**Check it.**

$0.576117 + 0.211942 = 0.788059$

$0.788059 + 0.211942 = 1.000001$

That prints 1.000001, not 1.000000. Nothing is wrong. Each of the three was rounded to six decimal places before being added, and three rounded numbers do not have to add to a round total. Kept unrounded, the three come to exactly 1.

**As percentages**, using [Toolkit 11](math-toolkit.md#toolkit-percentages): multiply each by 100.

$0.576117 \times 100 = 57.6117\%$

$0.211942 \times 100 = 21.1942\%$

$0.211942 \times 100 = 21.1942\%$

**Answer.** $p = (0.576117,\; 0.211942,\; 0.211942)$, which is 57.6117 per cent, 21.1942 per cent and 21.1942 per cent.

*A second check worth doing.* Formula 4.6 says the ratio of two probabilities is $e$ raised to the gap between their scores. The gap between token 1 and token 2 is $1 - 0 = 1$, so the ratio should be $e^{1} = 2.718282$. Divide: $0.576117 \div 0.211942 = 2.718277$. That agrees to four decimal places, and the fifth differs only because the two probabilities were rounded first.

*Where students go wrong.* The commonest slip is giving tokens 2 and 3 different probabilities, usually by dividing the first one properly and then "spreading the rest" by hand. Equal scores must give equal probabilities, because $e^{0} = e^{0}$ and both get divided by the same $S$. If your two zeros came out different, you did not divide the second one; you subtracted.

**7.** *Asked:* does the list $(0.5,\; 0.4,\; 0.2)$ pass both tests in Formula 4.1? If not, which test does it fail, and by how much?

*Idea being tested:* Formula 4.1, the two conditions a list must meet before anyone may call it a probability distribution. It is also in the [formula summary](formulas.md), section 3.1.

**Test one: is any of them below zero?** $0.5$ is above zero. $0.4$ is above zero. $0.2$ is above zero. **Passed.**

**Test two: do they add to exactly 1?**

$0.5 + 0.4 = 0.9$

$0.9 + 0.2 = 1.1$

The total is $1.1$, not $1$. **Failed.**

**By how much.** Subtract.

$1.1 - 1.0 = 0.1$

Turn that into percentage points by multiplying by 100.

$0.1 \times 100 = 10$

**Answer.** The list passes test one and fails test two. It is not a probability distribution. The total is 0.1 too big, which is 10 percentage points: the list is claiming 110 per cent of the certainty.

*Where students go wrong.* The tempting answer is "1.1 is close to 1, so it is near enough". It is not, and the size of the gap is how you tell. Section 4.3 of [Chapter 4](../ch/ch04.md) shows a real machine printing a total of 1.000062 instead of 1. That miss is 0.000062, which lives in the fifth decimal place, and it comes from 32-bit storage. A miss of 0.1 lives in the first decimal place and comes from a mistake. An error you can see without looking hard is yours.

**9.** *Asked:* write the probability $0.665241$ as a percentage.

*Idea being tested:* converting a decimal to a percentage, from [Toolkit 11](math-toolkit.md#toolkit-percentages). One multiplication.

The sign $\%$ means "out of a hundred", so a decimal becomes a percentage when you multiply it by 100.

$0.665241 \times 100 = 66.5241$

**Answer.** $66.5241$ per cent.

*Where students go wrong.* Two tempting wrong answers, and they are opposite mistakes. The first is $0.665241\%$, which leaves the number alone and adds a per cent sign to it; that would be a probability of about 1 in 150, not about two thirds. The second is $0.00665241\%$, which divides by 100 instead of multiplying, moving the decimal point the wrong way. The sanity check that catches both: a probability between $0.5$ and $1$ has to land between 50 per cent and 100 per cent. $66.5241$ does. The other two do not.

### Practice: can you apply it?

**11.** *Asked:* **made up for practice.** Run softmax on the scores 3, 2 and 1, compare with the scores 2, 1 and 0 from Worked Example 4.3, and say in one sentence why the answers came out the way they did.

*Idea being tested:* Formula 4.4, softmax, and then Formula 4.7, the rule that adding the same number to every score changes nothing.

**Step 1, raise $e$ to each score.**

$e^{3} = 20.085537$

$e^{2} = 7.389056$

$e^{1} = 2.718282$

**Step 2, add them, two at a time.**

$20.085537 + 7.389056 = 27.474593$

$27.474593 + 2.718282 = 30.192875$

The total is $S = 30.192875$.

**Step 3, divide each by that total.**

$p_1 = 20.085537 \div 30.192875 = 0.665241$

$p_2 = 7.389056 \div 30.192875 = 0.244728$

$p_3 = 2.718282 \div 30.192875 = 0.090031$

**Check it.**

$0.665241 + 0.244728 = 0.909969$

$0.909969 + 0.090031 = 1.000000$

**Answer.** $p = (0.665241,\; 0.244728,\; 0.090031)$, which is 66.5241 per cent, 24.4728 per cent and 9.0031 per cent. These are identical, to all six decimal places, to the answers for the scores 2, 1 and 0 in Worked Example 4.3. The same three values are recorded in `lab/out/ch04_softmax_chapter.json` under `by_hand_made_up_scores.3_2_1`, next to the ones for `2_1_0`.

**The one sentence.** The list 3, 2, 1 is the list 2, 1, 0 with 1 added to every entry, and Formula 4.7 says adding the same number to every score leaves every probability exactly as it was.

*Where students go wrong.* The tempting expectation is that bigger scores give bigger probabilities. Every exponential did get bigger. So did the total, and by the same factor. Divide the two totals and you can watch it happen:

$30.192875 \div 11.107338 = 2.718282$

The new total is $e^{1} = 2.718282$ times the old one, which is exactly the factor every top grew by, so every fraction is unchanged. A logit on its own carries no information about how likely a word is. Only the gaps do.

**13.** *Asked:* **made up for practice.** Run softmax on the scores 4, 2 and 0, showing every step.

*Idea being tested:* Formula 4.4 again, with wider gaps between the scores. You have met these three scores before: they are the ones in Try it 4.3.

**Step 1, raise $e$ to each score.**

$e^{4} = 54.598150$

$e^{2} = 7.389056$

$e^{0} = 1.000000$

**Step 2, add them, two at a time.**

$54.598150 + 7.389056 = 61.987206$

$61.987206 + 1.000000 = 62.987206$

The total is $S = 62.987206$.

**Step 3, divide each by that total.**

$p_1 = 54.598150 \div 62.987206 = 0.866813$

$p_2 = 7.389056 \div 62.987206 = 0.117310$

$p_3 = 1.000000 \div 62.987206 = 0.015876$

**Check it.**

$0.866813 + 0.117310 = 0.984123$

$0.984123 + 0.015876 = 0.999999$

That prints 0.999999 rather than 1.000000 because all three were rounded to six places before being added. Kept unrounded they come to exactly 1.

**Step 4, as percentages.**

$0.866813 \times 100 = 86.6813\%$

$0.117310 \times 100 = 11.7310\%$

$0.015876 \times 100 = 1.5876\%$

**Answer.** $p = (0.866813,\; 0.117310,\; 0.015876)$, which is 86.6813 per cent, 11.7310 per cent and 1.5876 per cent. Recorded in `lab/out/ch04_softmax_chapter.json` under `by_hand_made_up_scores.4_2_0`.

*A second check worth doing.* Formula 4.6 says the ratio of the top two probabilities is $e$ raised to their score gap. The gap is $4 - 2 = 2$, so the ratio should be $e^{2} = 7.389056$. Divide: $0.866813 \div 0.117310 = 7.389080$. That agrees to four decimal places; the rest is six-place rounding.

*Where students go wrong.* Two slips. The first is reading $e^{4}$ as $e \times 4 = 10.873128$ instead of 54.598150. The second is being surprised that the leader took 86.6813 per cent here when it took only 66.5241 per cent on the scores 2, 1 and 0. The scores 4, 2, 0 have gaps of 2 where 2, 1, 0 had gaps of 1, and raising $e$ to a power stretches the top of a list away from the bottom. Doubling the gaps does not double the lead; it multiplies the ratios.

**15.** *Asked:* **made up for practice.** Four tokens all have the score 10. Find all four probabilities.

*Idea being tested:* symmetry, plus Formula 4.6, the ratio form. This one can be answered without exponentiating anything.

**The short route, with no exponentials.** All four scores are the same number. Formula 4.6 says the ratio of any two probabilities is $e$ raised to the gap between their two scores, and here every gap is $10 - 10 = 0$, and $e^{0} = 1$. A ratio of 1 means the two are equal. So all four probabilities are equal. Formula 4.1 says they must add to 1, and four equal numbers add to 1 only if each one is a quarter of 1.

$1 \div 4 = 0.25$

**The long route, as a check.** Raise $e$ to each score. All four are the same.

$e^{10} = 22026.465795$

Add the four. Adding the same number four times is multiplying it by 4.

$22026.465795 \times 4 = 88105.863180$

Divide any one of them by that total.

$22026.465795 \div 88105.863180 = 0.250000$

**Check it.** $0.25 \times 4 = 1.00$.

**Answer.** All four probabilities are $0.25$, which is 25 per cent each.

*Where students go wrong.* The tempting move is to treat 10 as a "high" score and expect high probabilities. Scores have no fixed zero, which is the whole of Section 4.5 and Formula 4.7. Give the four tokens scores of 10, or 0, or $-3$, or 1000, and as long as all four are the same number the answer is 25 per cent each. The other slip is forgetting the divide and reporting 22026.465795 as a probability. A probability is never above 1.

**17.** *Asked:* **real.** The top eight tokens hold 72.056 per cent of the probability. How much is left, and across how many tokens is it spread? Then one sentence on what that means for reading a "top 5" display.

*Idea being tested:* Definition 4.9, probability mass, and Formula 4.1, which says the whole list adds to 1 and therefore to 100 per cent.

**How much is left.** The whole distribution is 100 per cent, so subtract.

$100 - 72.056 = 27.944$

**Across how many tokens.** The vocabulary is 151,936 tokens and eight of them are in the table, so subtract.

$151{,}936 - 8 = 151{,}928$

**Answer.** 27.944 per cent of the probability is left, spread across 151,928 tokens. Both are real, from `lab/out/ch04_softmax_chapter.json`, where the leftover is the field `tail_mass` and the vocabulary size is `vocab_size`.

**How thin is that, per token?** Divide.

$27.944 \div 151{,}928 = 0.000184$

An average token out of that tail carries about 0.000184 per cent, which is about one chance in 540,000.

**The one sentence.** A "top 5" display shows you the five tallest bars and says nothing at all about more than a quarter of the model's belief, so the honest reading of that display is "the model gives ` Paris` 30.219 per cent", not "the model is choosing between these five".

*Where students go wrong.* The tempting description of the leftover 27.944 per cent is "noise" or "rounding". It is neither. Compare it with the model's own second choice, ` ______`, at 12.315 per cent:

$27.944 \div 12.315 = 2.2691$

The part of the distribution no display ever shows you holds more than twice as much probability as the model's second-favourite token. It is thin per token and large in total, and those two facts are not in conflict.

**19.** *Asked:* a classmate raises one token's score by 1 and leaves every other score in the vocabulary alone. Does that token's probability go up, go down, or stay the same? One sentence, and name the formula that settles it.

*Idea being tested:* Formula 4.6, the ratio form, and the difference between changing one score and changing all of them.

**Answer.** It goes up.

**The one sentence.** Formula 4.6 says $\frac{p_i}{p_j} = e^{\,z_i - z_j}$, so raising $z_i$ by 1 while every other score stays put raises every one of those gaps by 1 and multiplies every one of those ratios by $e^{1} = 2.718282$; a token that has become 2.718282 times more likely than each of the other 151,935 tokens, in a list that still has to add to 1, must have gained probability.

**A worked check, with numbers made up for practice.** Take the scores 2, 1 and 0 from Worked Example 4.3, where the probabilities were $0.665241$, $0.244728$ and $0.090031$. Raise the middle score by 1, so the scores become 2, 2 and 0, and leave the other two alone.

Step 1, raise $e$ to each new score.

$e^{2} = 7.389056$

$e^{2} = 7.389056$

$e^{0} = 1.000000$

Step 2, add them.

$7.389056 + 7.389056 = 14.778112$

$14.778112 + 1.000000 = 15.778112$

Step 3, divide each by that total.

$p_1 = 7.389056 \div 15.778112 = 0.468311$

$p_2 = 7.389056 \div 15.778112 = 0.468311$

$p_3 = 1.000000 \div 15.778112 = 0.063379$

Check: $0.468311 + 0.468311 = 0.936622$, and $0.936622 + 0.063379 = 1.000001$, which is 1 to within six-place rounding.

Token 2 went from $0.244728$ to $0.468311$. Up, and by a lot. The other two went down, from $0.665241$ to $0.468311$ and from $0.090031$ to $0.063379$, because the one unit of certainty has to come from somewhere.

*A note on the wording.* The problem asks you to "name the formula that settles it". Formula 4.6 is the chapter's own tool for comparing two tokens, and it is the answer being looked for. Formula 4.4, softmax itself, also settles it: the token's own top grew by a factor of $e$ while the tops of all the others did not, so its share of the total had to rise. Either name, with the reasoning attached, is a complete answer.

*Where students go wrong.* The tempting wrong answer is "it stays the same, by Formula 4.7". Formula 4.7 is about adding the same number $c$ to **every** score in the vocabulary. Here one score moved and 151,935 did not. That is not a shift, and Formula 4.7 has nothing to say about it. The two situations look similar on the page and behave completely differently, which is why the chapter states Formula 4.7 with "every" in bold.

### Stretch: can you reason with it?

**21.** *Asked:* use Formula 4.6a, in the form $e^{z + c} = e^{z} \times e^{c}$, to show that adding the same number $c$ to every score leaves every softmax probability unchanged. Write it out for a vocabulary of three tokens, with every step visible.

*Idea being tested:* Formula 4.7, proved rather than asserted, out of Formula 4.6a. The letter $c$ stands for any fixed number you like, and it is the same number for all three tokens.

**Setup.** Three tokens with scores $z_1$, $z_2$, $z_3$. Their probabilities before any shift are

$$p_1 = \frac{e^{z_1}}{S}, \qquad p_2 = \frac{e^{z_2}}{S}, \qquad p_3 = \frac{e^{z_3}}{S}, \qquad \text{where } S = e^{z_1} + e^{z_2} + e^{z_3}$$

Now add $c$ to every score, giving $z_1 + c$, $z_2 + c$ and $z_3 + c$.

**Step 1, write each new top using Formula 4.6a.** That rule, read from right to left, turns an added exponent into a multiplication.

$e^{z_1 + c} = e^{z_1} \times e^{c}$

$e^{z_2 + c} = e^{z_2} \times e^{c}$

$e^{z_3 + c} = e^{z_3} \times e^{c}$

**Step 2, build the new total.** Add the three new tops.

$$S_{\text{new}} = (e^{z_1} \times e^{c}) + (e^{z_2} \times e^{c}) + (e^{z_3} \times e^{c})$$

**Step 3, take the shared factor out.** The same number $e^{c}$ multiplies all three terms, so it can be written once outside a bracket.

$$S_{\text{new}} = e^{c} \times (e^{z_1} + e^{z_2} + e^{z_3}) = e^{c} \times S$$

**Step 4, write the new probability of token 1.**

$$p_{1,\text{new}} = \frac{e^{z_1} \times e^{c}}{e^{c} \times S}$$

**Step 5, cancel.** There is a factor of $e^{c}$ on the top and the same factor of $e^{c}$ on the bottom. Formula 4.6b with $a = b = c$ says $e^{c} \div e^{c} = e^{c-c} = e^{0} = 1$, so that factor contributes a 1 and disappears.

$$p_{1,\text{new}} = \frac{e^{z_1}}{S} = p_1$$

**Step 6, repeat for the other two.** Nothing in Steps 1 to 5 used anything special about token 1, so the same five lines give $p_{2,\text{new}} = p_2$ and $p_{3,\text{new}} = p_3$. All three probabilities are unchanged, which is Formula 4.7 for $V = 3$.

**The same thing in numbers, made up for practice.** Take the scores 2, 1, 0 and put $c = 5$, so the shifted scores are 7, 6 and 5.

$e^{7} = 1096.633158$

$e^{6} = 403.428793$

$e^{5} = 148.413159$

Add them.

$1096.633158 + 403.428793 = 1500.061951$

$1500.061951 + 148.413159 = 1648.475110$

Divide each by that total.

$p_1 = 1096.633158 \div 1648.475110 = 0.665241$

$p_2 = 403.428793 \div 1648.475110 = 0.244728$

$p_3 = 148.413159 \div 1648.475110 = 0.090031$

Identical to Worked Example 4.3, to all six decimal places.

You can see Step 3 in the numbers too. The old total was 11.107338 and $e^{5} = 148.413159$, so Step 3 predicts the new total is

$11.107338 \times 148.413159 = 1648.475121$

against the 1648.475110 that came from adding the three shifted exponentials. They agree to five decimal places, and the sixth differs only because every input was rounded to six places first.

*Where students go wrong.* The tempting conclusion is that scores this much larger must give probabilities this much larger. Every top grew by a factor of 148.413159 and so did the bottom, and a factor that appears on both sides of a fraction bar does nothing. The second trap is mixing this rule up with temperature. Formula 4.7 is about **adding** the same number to every score, which changes nothing. Temperature **divides** every score by the same number, which changes the probabilities a great deal. [Chapter 5](../ch/ch05.md) is about the second one.

**23.** *Asked:* **real.** The top eight tokens are 0.005265 per cent of the vocabulary and they hold 72.056 per cent of the probability mass. Two sentences on what that says about how confident this model is, and two more on what it does not say.

This problem asks for a written argument, so there is no single right answer. What follows is what a strong response contains, then one worked example of such a response.

**What a strong response contains.**

1. A number for the concentration, not only the word "concentrated".
2. A clear statement of what the two figures compare: a share of the dictionary against a share of the belief.
3. Two sentences on what it does not say that name something specific, not "it might be wrong".
4. At least one number used in the second half as well as the first.

**The arithmetic you need, worked.** Start by checking the 0.005265 per cent yourself. Eight tokens out of 151,936 becomes a fraction of one by dividing, and a percentage by then multiplying by 100.

$8 \div 151{,}936 = 0.00005265$

$0.00005265 \times 100 = 0.005265\%$

Now compare the two shares. How many times its even share does that group hold?

$72.056 \div 0.005265 = 13{,}686$

If instead every one of the 151,936 tokens were equally likely, each would hold

$1 \div 151{,}936 = 0.00000658$

which is 0.000658 per cent. ` Paris`, at 0.302188, holds

$0.302188 \div 0.00000658 = 45{,}913$

times that even share.

**A worked example of a strong response.**

> The model is not spreading its belief evenly, and the numbers say how far from even it is. Eight tokens are 0.005265 per cent of the dictionary and they hold 72.056 per cent of the probability, which is about 13,700 times the share those eight would get if every token were equally likely; ` Paris` alone holds about 45,900 times an even share. That is real, measurable structure, and it is the reason a short list of candidates is worth printing at all.
>
> It does not say the model is confident about the answer. The top token gets 30.219 per cent, which is under a third, so the model's single best guess is one it would be wrong about most of the time. It also says nothing about whether the model is right. Five of those eight tokens are worksheet punctuation rather than geography, so the concentration is a fact about what the training text looked like, not evidence that the model has understood a question about France.

*Where students go wrong.* The commonest weak answer collapses concentration into confidence and stops. A distribution can be extremely concentrated compared with an even spread and still be genuinely undecided, and this one is both at once: about 13,700 times an even share, and only 30.219 per cent on the leader. The second common slip is arguing from the 72.056 per cent alone. The 15 tokens holding more than 1 per cent each, and the 149,355 holding less than one in a million each (both real, from `lab/out/ch04_softmax_chapter.json`), are the numbers that show the shape rather than only its peak.

**25.** *Asked:* **real.** The computer printed the sum of all 151,936 probabilities as 1.000062, while Formula 4.5 proves the sum is exactly 1. Which one is wrong, and what does the size of the gap, 0.0062 per cent, tell you about where the error came from?

*Idea being tested:* Formula 4.5, and the difference between a mathematical statement and a machine's arithmetic. This one opens the door to [Chapter 6](../ch/ch06.md).

**Which one is wrong.** Neither statement is wrong, and the honest answer says why. Formula 4.5 is exact, and its proof does not depend on any machine: every one of the 151,936 fractions has the same bottom $S$, so adding them means adding only their tops, the tops added together are $S$ by the definition in Formula 4.3, and $S \div S = 1$. The computer is not carrying out that arithmetic exactly. It stores each probability in 32 bits, which holds about seven reliable digits, and it then adds 151,936 slightly imprecise numbers. **The mathematics is right; the machine's answer is an approximation of it.** The number 1.000062 is real output, from `lab/out/ch04_softmax_chapter.json`, field `float32_sum`.

**The size of the gap.** Work it out rather than quoting it.

$1.000062 - 1 = 0.000062$

$0.000062 \times 100 = 0.0062\%$

Read that as a fraction of the answer by dividing into 1:

$1 \div 0.000062 = 16{,}129$

The total is off by about one part in 16,000.

**What the size tells you.** It tells you this is storage, not method, and there are two ways to see that.

*First, where the gap sits.* The first wrong digit in 1.000062 is in the fifth decimal place. Compare that with an actual mistake in method. Running softmax over only the eight logits in the top-eight table, instead of all 151,936, gives ` Paris` at 41.9379 per cent instead of 30.219 per cent (real, both recorded in `lab/out/ch04_softmax_chapter.json` under `mistake_softmax_over_top_8_only`). The gap there is

$41.9379 - 30.219 = 11.7189$

percentage points, in the first decimal place. Method errors are loud. Storage errors are quiet.

*Second, the size 32-bit storage predicts.* One number stored in 32 bits carries a relative error of up to about 0.00000012. If all 151,936 of those small errors leaned the same way, the total could be off by

$151{,}936 \times 0.00000012 = 0.018232$

which is about 1.8 per cent. The observed error is 0.000062, and using the more exact figure 0.00000011920929 for the 32-bit error, the worst case is 0.018112, so

$0.018112 \div 0.000062 = 292$

The real error is roughly 290 times smaller than that worst case, which is what happens when the small errors point in both directions and mostly cancel. The observed 0.0062 per cent sits comfortably inside what 32-bit storage explains, and nowhere near what a dropped term or a wrong denominator would produce.

**Answer in one line.** Formula 4.5 is right and exact; the computer's 1.000062 is the same answer rounded by 32-bit storage 151,936 times over, and the gap of 0.0062 per cent is small enough, and quiet enough, to be storage rather than a mistake in the mathematics.

*Where students go wrong.* The tempting answer is "the computer is more reliable than the formula, so the sum must not really be 1". Computers are fast, not exact, and this chapter is one of the places where the difference shows on the page. The opposite slip is to round 1.000062 to 1 and say nothing. Rounding it for a report is fine. Not knowing why it was not 1 is not, because in [Chapter 7](../ch/ch07.md) the same effect gets large enough to change an answer.

**27.** *Asked:* **real.** Add the probabilities of the model's second through sixth choices, ` ______`, `':\n'`, `':\n\n'`, ` __` and ` ____`, at 12.315, 6.597, 5.826, 4.846 and 4.458 per cent. Then argue either that this model has misunderstood the question, or that it has understood a different question perfectly well, using at least two numbers from the chapter.

*Idea being tested:* Definition 4.9, probability mass, plus the reading of the distribution that Sections 4.1 and 4.3 set up. The second half is a written argument, so there is no single right answer.

**The arithmetic.** Add two at a time, left to right.

$12.315 + 6.597 = 18.912$

$18.912 + 5.826 = 24.738$

$24.738 + 4.846 = 29.584$

$29.584 + 4.458 = 34.042$

**Answer.** Those five tokens hold **34.042 per cent** of the probability.

**One honest note on that total.** Each of the five percentages was rounded to three decimal places before you added them. Taken from the unrounded probabilities in `lab/out/ch04_softmax_chapter.json`, the same five come to 34.0415 per cent, which rounds to 34.041. Adding five already-rounded numbers moved the last digit by 0.001 of a percentage point. That is the rounding, not a disagreement.

**The comparison the argument turns on.** ` Paris` holds 30.219 per cent. Compare.

$34.042 - 30.219 = 3.823$

$34.042 \div 30.219 = 1.1265$

The five worksheet-formatting tokens together hold 3.823 percentage points more than ` Paris`, which is about 1.13 times as much.

**What a strong written response contains.**

1. A clear position, stated in the first sentence.
2. At least two numbers from the chapter, used correctly and with units.
3. A statement of what the model was actually handed, as opposed to what you had in mind when you typed it.
4. Something the response can be checked against, such as a prediction about what would change if the prompt changed.

**A worked example of such a response**, taking the second side:

> This model has understood a different question, and it has understood it well. It was not handed a question. It was handed five words, `The capital of France is`, with no question mark, no instruction, and nothing saying that an answer was wanted rather than a line to write one on. On the open web that exact string appears on worksheets and quiz sheets at least as often as it appears mid-sentence in prose, and the model's output says so directly: the geography reading, ` Paris`, gets 30.219 per cent, while the worksheet reading, spread across five formatting tokens, gets 34.042 per cent between them, about 1.13 times as much. A model that had misunderstood would have put its belief somewhere its training text does not support. This one put its belief exactly where its training text put it, and it split that belief in roughly the proportion the text was split. It also declined to be certain: 30.219 per cent on the top token is under a third, which is the model saying it does not know which of the two readings you meant. The prediction that follows is testable. Give it a prompt that can only be prose, and the worksheet cluster should collapse.

The other side is defensible too. A response arguing that the model has misunderstood would point out that the five words are a grammatical English sentence fragment whose only completion in English is a noun, that underscores are not a word, and that a system whose most likely single output is blank formatting has not answered anything. That response needs the same discipline: a position, the numbers, and something it could be checked against.

*Where students go wrong.* Two things. The first is describing the five as "about a third" without adding them, which loses the fact that they beat ` Paris`. The second is overstating the win. The gap is 3.823 percentage points, which is real and small; it does not support "the model mostly thinks this is a worksheet". Both readings are live, and the numbers say they are close.

---

(answers-ch05)=
## Chapter 5. Temperature, and what it does not do

These problems drill one division and its three consequences: dividing every score by $T$
before the exponential, and then measuring what that division did to the whole distribution
using the top token's probability, the entropy in bits, and the nine-tenths count.

:::{note} Which numbers are measured and which are made up
Every solution below says which kind of number it is using. **Measured** values come from
`lab/out/we2_softmax.json`, the full-vocabulary run of `Qwen2.5-0.5B-Instruct` on the prompt
`The capital of France is`, and they also appear in the problem set's own table. Values marked
**made up for practice** are small invented scores such as 2, 1 and 0. They are there so you
can check the arithmetic on a phone calculator. They are not claims about what the model did.
:::

### Warm-up: can you do the arithmetic

**1.** *You are asked to carry out Step 1 of the temperature formula on three scores.*

This tests the first step of [Formula 5.1](../ch/ch05.md), softmax with a temperature, which is
also §3.3 of the [formula summary](formulas.md). Step 1 says: divide every score by the same
number $T$. Nothing is exponentiated yet. The slash and the fraction bar both mean divide, and
[Toolkit 4](math-toolkit.md#toolkit-fraction-bar) works division from the beginning.

Here $T = 3$, and the three scores are 6, 3 and 0. They are **made up for practice**.

$6 \div 3 = 2$

$3 \div 3 = 1$

$0 \div 3 = 0$

**Answer.** The three scaled logits are $2$, $1$ and $0$. Scaled logits carry no unit. They are
scores, not probabilities, and they are not percentages of anything yet.

Two of the three answers are worth a second look. Zero divided by any number is zero, not
three, and not "no answer". Zero shared between three people gives each person nothing. The
other slip is multiplying instead of dividing, which gives 18, 9 and 0. If your first answer is
bigger than 6, you multiplied.

Notice where you landed: 2, 1 and 0 are the chapter's standing made-up scores. Raising $T$ to 3
turned the gaps 6-to-3-to-0 into the gaps 2-to-1-to-0, which is the whole idea of flattening.

---

**3.** *You are asked to press the `exp` key three times and record six decimal places.*

This tests the number $e$ and what $e^x$ means, taught from zero in
[Toolkit 7](math-toolkit.md#toolkit-e), with exponents themselves in
[Toolkit 5](math-toolkit.md#toolkit-exponents). It is Step 2 of Formula 5.1.

On most calculators the key is marked `exp` or $e^x$. Type the number, then press the key. On
some calculators you press the key first. Both orders are common, and the check below tells you
which one your calculator wants.

$e^{2} = 7.389056$

$e^{1} = 2.718282$

$e^{0} = 1.000000$

**Answer.** $7.389056$, $2.718282$ and $1.000000$. These are plain numbers with no unit.

**How to check your calculator.** The middle answer is $e$ itself, because anything raised to
the power 1 is itself. If your middle answer is not 2.718282, you pressed the wrong key. The
last answer is 1, because anything raised to the power 0 is 1. If your last answer is 0, you
multiplied $e$ by 0 instead of raising $e$ to the power 0.

The tempting wrong answer for the first one is $2 \times 2.718282 = 5.436564$. That is $e$
doubled, not $e$ squared. Squared means $2.718282 \times 2.718282 = 7.389056$.

---

**5.** *You are asked to run all four steps of the temperature formula on two scores, at
$T = 0.5$.*

This tests [Formula 5.1](../ch/ch05.md) end to end. The four steps are: divide by $T$,
exponentiate, add, divide by the total. The two scores, 1 and 0, are **made up for practice**.

**Step 1, divide every score by $T = 0.5$.** Dividing by a number smaller than 1 makes things
bigger. Dividing by 0.5 is the same as multiplying by 2, because there are two halves in every
whole.

$1 \div 0.5 = 2$

$0 \div 0.5 = 0$

**Step 2, raise $e$ to each of those.**

$e^{2} = 7.389056$

$e^{0} = 1.000000$

**Step 3, add the two results.**

$7.389056 + 1.000000 = 8.389056$

**Step 4, divide each result by that total.**

$p_1 = 7.389056 \div 8.389056 = 0.880797$

$p_2 = 1.000000 \div 8.389056 = 0.119203$

**Answer.** $p_1 = 0.880797$ and $p_2 = 0.119203$. As percentages, 88.0797% and 11.9203%.

**Check 1, they must add to 1.**

$0.880797 + 0.119203 = 1.000000$

**Check 2, use Formula 5.2 as a second route.** The gap between the two scores is
$1 - 0 = 1$. Divide that gap by the temperature: $1 \div 0.5 = 2$. Raise $e$ to it:
$e^{2} = 7.389056$. So the first token should be 7.389056 times as likely as the second. Divide
your two answers to see:

$0.880797 \div 0.119203 = 7.389051$

Those agree to five decimal places. The difference in the sixth comes from the two
probabilities having been cut to six decimal places before you divided them.

The wrong answer people reach here is the untouched $T = 1$ answer, which is what you get if
you skip Step 1 entirely. The other slip is assuming that dividing by 0.5 shrinks the score. It
does the opposite. A score of 1 divided by 0.5 is 2, so the gap between the two scores widens
from 1 to 2, and the distribution comes out sharper, not flatter. If your $p_1$ at $T = 0.5$ is
smaller than your $p_1$ at $T = 1$, you have the direction backwards.

---

**7.** *You are asked for four logarithms base 2 without a calculator.*

This tests the one idea behind a logarithm: **the log tells you the exponent.** The question
$\log_2(x)$ asks "two raised to what power gives $x$?" Full treatment in
[Toolkit 8](math-toolkit.md#toolkit-logarithms), with powers of two in
[Toolkit 18](math-toolkit.md#toolkit-powers-of-two) and negative exponents in
[Toolkit 6](math-toolkit.md#toolkit-negative-exponents).

**$\log_2(16)$.** Climb the doubling ladder and count the steps.

$2^{1} = 2$, $2^{2} = 4$, $2^{3} = 8$, $2^{4} = 16$

Four steps, so $\log_2(16) = 4$.

**$\log_2(1)$.** Anything raised to the power 0 is 1, so $2^{0} = 1$ and $\log_2(1) = 0$.

**$\log_2(0.5)$.** A negative exponent means one divided by the positive version.
$2^{-1} = 1 \div 2 = 0.5$, so $\log_2(0.5) = -1$.

**$\log_2(0.125)$.** First, $0.125$ is one eighth, because $1 \div 8 = 0.125$. And $2^{3} = 8$,
so $2^{-3} = 1 \div 8 = 0.125$. Therefore $\log_2(0.125) = -3$.

**Answer.** $4$, $0$, $-1$ and $-3$. A logarithm is an exponent, so it carries no unit.

The two tempting wrong answers are both about signs. Writing $\log_2(0.125) = 3$ drops the
minus sign, and every logarithm of a number below 1 is negative. Writing $\log_2(1) = 1$
confuses "the number 1" with "the exponent 1". Ask the question out loud each time: two raised
to what power gives this number?

---

**9.** *You are asked for the entropy of two equally likely outcomes.*

This tests [Formula 5.5](../ch/ch05.md), the entropy formula, which is §3.5 of the
[formula summary](formulas.md). The formula is
$H = -\sum_i p_i \log_2(p_i)$, and its four steps are: take the log base 2 of each probability,
multiply each probability by its own log, add the products, flip the sign.
[Toolkit 10](math-toolkit.md#toolkit-sigma) covers the $\sum$ sign.

The two probabilities are $0.5$ and $0.5$. They are **made up for practice**, and they were
chosen because the logarithm comes out whole.

**Step 1, take the log base 2 of each.** $2^{-1} = 0.5$, so the exponent is $-1$.

$\log_2(0.5) = -1$

$\log_2(0.5) = -1$

**Step 2, multiply each probability by its own logarithm.** A positive number times a negative
number gives a negative answer.

$0.5 \times (-1) = -0.5$

$0.5 \times (-1) = -0.5$

**Step 3, add the two products.** Adding a negative is the same as subtracting the positive.

$-0.5 + (-0.5) = -1.00$

**Step 4, flip the sign, because of the minus at the front of the formula.**

$H = -(-1.00) = 1.00$

**Answer.** $H = 1.00$ **bit**. The unit matters. A bit is one yes-or-no question's worth of
uncertainty, and this is the fair-coin case: one question settles it.

**Check.** Entropy is never negative, and this is positive. The ceiling for two choices is
$\log_2(2) = 1$ bit, and 1.00 sits exactly on that ceiling, which is right, because two equally
likely outcomes are as undecided as two outcomes can be.

The wrong answer here is $-1$ bit, from forgetting Step 4. If your entropy is negative, you
dropped the minus sign on the front of the formula. That is Common mistake 4 in the chapter.

---

**11.** *You are asked for the nine-tenths count on two short sorted lists.*

This tests [Formula 5.6](../ch/ch05.md), the nine-tenths count $k_{0.9}$, which is §3.6 of the
[formula summary](formulas.md). The procedure is: add the probabilities from the top of the
sorted list, keep a running total, and stop the instant the total reaches 0.9. Then count how
many you used. The sign $\ge$ means "is greater than or equal to", covered in
[Toolkit 19](math-toolkit.md#toolkit-inequalities). Both lists are **made up for practice**.

**First list: 0.95, 0.03, 0.02.**

Take the top one. Running total $= 0.95$. Is $0.95 \ge 0.9$? **Yes.**

Stop and count. You used one.

$k_{0.9} = 1$

**Second list: 0.5, 0.45, 0.05.**

Take the top one. Running total $= 0.50$. Is $0.50 \ge 0.9$? No.

Add the second. $0.50 + 0.45 = 0.95$. Is $0.95 \ge 0.9$? **Yes.**

Stop and count. You used two.

$k_{0.9} = 2$

**Answer.** $k_{0.9} = 1$ token for the first list and $k_{0.9} = 2$ tokens for the second. The
unit is tokens, and it is always a whole number.

**Check.** Both lists add to 1.00, so both are valid distributions. Both answers are whole
numbers between 1 and 3. And the second list is flatter than the first, so its count is larger,
which is the direction the count is supposed to move.

The tempting wrong answer is 3 for both lists, from carrying on until the running total reaches
1.00. The target is 0.9, not 1. The other slip is sorting smallest first, which would give you
3 and 3 as well, and both lists are given to you already sorted largest first so that this does
not happen.

---

### Practice: can you apply it

**13.** *You are asked to describe the same fall in two different units, then choose one for a
report.*

This tests the difference between a **percentage point** and a **ratio**, which is
[Toolkit 11 on percentages](math-toolkit.md#toolkit-percentages) and its section on
[percentage points](math-toolkit.md#toolkit-percentage-points). Both numbers below are computed from
**measured** values in the problem set's table, which come from `lab/out/we2_softmax.json`.

The two measured values are 96.799% at $T = 0.25$ and 2.447% at $T = 2.0$.

**First, the fall in percentage points.** Subtract.

$96.799 - 2.447 = 94.352$

That is a fall of **94.352 percentage points**.

**Second, how many times smaller.** Divide the big one by the small one.

$96.799 \div 2.447 = 39.558$

So the probability at $T = 2.0$ is about **39.56 times smaller** than at $T = 0.25$.

**A note on the last digit.** The table is rounded to three decimal places. The full-precision
measured values are $0.9679881930351257$ and $0.024472510442137718$, and dividing those gives
$39.554$. The gap between 39.558 and 39.554 is rounding carried forward, not a mistake.

**Answer.** A fall of 94.352 percentage points, which is the same as the probability becoming
39.55 times smaller.

**Which number goes in the report.** This part is a judgement, and a strong response does three
things: it names both numbers, it picks one, and it gives a reason tied to what the reader will
do with it. Here is one strong version.

> Report the ratio, 39.6 times smaller, and give the two percentages beside it. The ratio
> survives being applied to a different starting point, so a reader can carry it to another
> prompt. The 94.352-percentage-point fall is tied to this one starting value and stops meaning
> anything if the top token starts at 40% instead of 96.8%. Give both percentages so the reader
> can compute either.

**The wrong answer that sounds right.** Writing "P(`' Paris'`) fell by 94.352%" is wrong. A
fall of 94.352 percentage points out of a starting 96.799 is a fall of
$94.352 \div 96.799 = 0.974721$, which is $97.472\%$ of its original value, not 94.352%.
Percentage points and percent are different units, and swapping them here moves the claim by
three points.

---

**15.** *You are asked how many times larger one nine-tenths count is than another, and to say
it in plain English.*

This tests reading the nine-tenths count as a ratio rather than a difference. Both counts are
**measured**, from `_research/00-lab-verified-findings.md` section 2.

The two counts are 4,612 tokens at $T = 1.5$ and 41,274 tokens at $T = 2.0$.

Divide the larger by the smaller.

$41{,}274 \div 4{,}612 = 8.949$

**Answer.** The count at $T = 2.0$ is **8.949 times larger**, call it nearly nine times larger.

**One sentence a reader with no mathematics could understand.** Here is one version:

> Turning the dial from 1.5 to 2.0 takes the model from spreading nine tenths of its confidence
> across about 4,600 possible next words to spreading it across more than 41,000, which is
> nearly nine times as many.

Two things make that sentence work. It says what the count counts, which is possible next
words. And it gives the multiplier, not the raw gap.

**The tempting wrong answer** is $41{,}274 - 4{,}612 = 36{,}662$. That number is correct
arithmetic, and it answers a different question: how many **more** tokens, not how many
**times** as many. "Times larger" always means divide.

---

**17.** *You are asked to get the $T = 0.5$ probabilities from the $T = 1$ probabilities alone,
using the power form.*

This tests [Formula 5.3](../ch/ch05.md), temperature written as a power, which is §3.4 of the
[formula summary](formulas.md). The formula raises each ordinary probability to the power
$1/T$, then renormalises. The three starting probabilities came from the scores 2, 1 and 0,
which are **made up for practice**.

**Step 0, work out the power.** Here $T = 0.5$, so

$1 \div 0.5 = 2$

A power of 2 means square it, which means multiply the number by itself. See
[Toolkit 5](math-toolkit.md#toolkit-exponents).

**Step 1, square each probability.**

$0.665241 \times 0.665241 = 0.442546$

$0.244728 \times 0.244728 = 0.059892$

$0.090031 \times 0.090031 = 0.008106$

**Step 2, add the three squares, two at a time.**

$0.442546 + 0.059892 = 0.502438$

$0.502438 + 0.008106 = 0.510544$

**Step 3, divide each square by that total. This is the renormalising.**

$0.442546 \div 0.510544 = 0.866813$

$0.059892 \div 0.510544 = 0.117310$

$0.008106 \div 0.510544 = 0.015877$

**Answer.** $0.866813$, $0.117310$ and $0.015877$.

**Check against Formula 5.1.** The chapter's Formula 5.1 answer at $T = 0.5$ is $0.866813$,
$0.117310$ and $0.015876$. The first two match exactly. The third differs by one in the sixth
decimal place. Nobody made a mistake. Carried at full precision both routes give
$0.015876240$. You rounded to six decimal places three separate times, at the squaring, at the
adding and at the dividing, and that cut travelled to the end. This book prints the difference
rather than quietly showing whichever number looks tidier.

**Second check, the answers add to 1.**

$0.866813 + 0.117310 = 0.984123$

$0.984123 + 0.015877 = 1.000000$

**The tempting wrong answer.** Taking the square root instead of squaring gives $0.815623$,
$0.494700$ and $0.300052$, and after renormalising that is the $T = 2$ answer, not the
$T = 0.5$ answer. The power is $1/T$, not $T$. At $T = 0.5$, $1/T = 2$, so you square. At
$T = 2$, $1/T = 0.5$, so you take the square root. Write the power down before you start.

---

**19.** *You are asked how many of 100 sampled tokens you would expect to be `' Paris'`, and
whether hitting that number exactly would be surprising.*

This tests the link between a probability and a long-run count, and it is the sampling step of
[Formula 5.8](../ch/ch05.md). Read the problem the way the chapter's Cell 8 reads it: 100
independent draws from this one fixed distribution, not 100 tokens of generated text, because
generated text changes the distribution after every token.

The measured value is P(`' Paris'`) $= 30.219\%$ at $T = 1.0$, from `lab/out/we2_softmax.json`.

**Step 1, turn the percentage into a proportion.** Divide by 100, because "per cent" means "out
of a hundred". See [Toolkit 11](math-toolkit.md#toolkit-percentages).

$30.219 \div 100 = 0.30219$

**Step 2, multiply the proportion by the number of draws.**

$100 \times 0.30219 = 30.219$

**Answer.** You would expect about **30 tokens out of 100** to be `' Paris'`.

**Would exactly that many be surprising? No, and here is the sharper answer: exactly 30 is not
even the usual outcome.** Two numbers say why.

First, the chance of landing on exactly 30 is about **8.67%**, which is roughly 1 run in 12. So
you should expect to miss 30 about eleven times out of twelve.

Second, the spread. The [formula summary](formulas.md) §6.2 gives the standard error of a
**proportion**, $\sqrt{p(1-p)/n}$. Multiply that by $n$ and you get the standard deviation of
the **count**, which is $\sqrt{n \times p \times (1-p)}$. That is Chapter 12's territory and it
is worth seeing early. Work it through, using the full-precision measured probability
$p = 0.302188$ and $n = 100$ draws.

$1 - 0.302188 = 0.697812$

$0.302188 \times 0.697812 = 0.210870$

$0.210870 \times 100 = 21.087$

$\sqrt{21.087} = 4.592$

So a typical run lands within about 4.6 of 30. Two standard deviations either side gives
$30.219 - 9.184 = 21.0$ and $30.219 + 9.184 = 39.4$, and about 96% of runs land in that range.
The chapter's own simulated run at $T = 1.0$ drew `' Paris'` 310 times in 1000, against an
expectation of 302.2, which sits comfortably inside the same kind of wobble.

**The tempting wrong answer** is "30, and anything else means something is broken". Nothing is
broken. A probability describes the long run, not any single run of 100. Chapter 12 puts a
proper interval around this and shows how wide it really is.

---

**21.** *You are asked, in two sentences, why the temperature formula has no answer at
$T = 0$ and what the software must be doing instead.*

This tests the structure of [Formula 5.1](../ch/ch05.md) and Definition 5.6, greedy decoding.
It is also Common mistake 7 in the chapter.

Look at where $T$ sits in the formula:

$$
p_i(T) = \frac{e^{\,z_i / T}}{\displaystyle\sum_{j=1}^{V} e^{\,z_j / T}}
$$

Every score is divided by $T$. Division by zero has no answer, in this formula or anywhere
else. Asking $17.217289 \div 0$ is asking "how many zeros do you add together to reach
17.217289", and no count of zeros ever reaches it. So $T = 0$ is outside the formula. It is not
a hard case or a special case. There is nothing there.

**A two-sentence answer.** Here is one version that meets the problem's length limit.

> Formula 5.1 divides every score by $T$, and dividing by zero has no answer, so $T = 0$ is not
> a setting the formula can accept. Software that offers $T = 0$ is switching to greedy
> decoding instead, which takes the highest-scoring token every time with no randomness.

**Why greedy is the honest name for it.** Push $T$ down toward zero without reaching it and the
top token's probability climbs toward 1 while everything else falls toward 0. Problem 27 works
that out with numbers. Greedy decoding is what that limit behaves like, so a tool that lists
"temperature 0" and "greedy" as two separate options is describing one thing twice.

**The tempting wrong answer** is that $T = 0$ gives maximum randomness, because zero sounds
like "no dial". It is the other way round. Small $T$ sharpens, so $T$ near zero is the least
random setting there is.

---

### Stretch: can you reason with it

**23.** *You are asked to prove, in five sentences or fewer, that no positive temperature can
change which token ranks first, and to name the formula you used.*

This tests [Formula 5.2](../ch/ch05.md), the ratio form, which is §3.2 of the
[formula summary](formulas.md), or [Formula 5.3](../ch/ch05.md), the power form, which is §3.4.
Either one settles it. There is no arithmetic to run here, so the grading is on the argument.

**What a strong response contains.** Four things, and the fourth is the one most answers miss.

1. It names which formula it is using, as the problem asks.
2. It says that the score gap $z_i - z_j$ does not depend on $T$, because temperature divides
   the scores and never rewrites them.
3. It says why the result is always positive: $e$ raised to any power is always bigger than
   zero, and $e$ raised to a **positive** power is always bigger than one.
4. It says the conclusion holds for **every** positive $T$, not for the five that were
   measured. A table of five temperatures is evidence. It is not a proof.

**One worked example of such a response, using Formula 5.2.**

> Formula 5.2 says the ratio of two tokens' probabilities is $e^{(z_i - z_j)/T}$, and the whole
> vocabulary has cancelled out of it. Suppose token $i$ outscores token $j$, so the gap
> $z_i - z_j$ is a positive number, and note that this gap never changes, because temperature
> divides the scores rather than editing them. A positive gap divided by a positive temperature
> is still positive, and $e$ raised to a positive power is always bigger than 1. So the ratio
> $p_i(T) / p_j(T)$ is bigger than 1 for every positive $T$, which says token $i$ is ahead at
> every setting. Raising $T$ pushes that ratio down toward 1, which means "nearly tied", and it
> never reaches 1 and never crosses below it.

**One worked example using Formula 5.3 instead**, which is shorter:

> Formula 5.3 gets the temperature-adjusted probabilities by raising each ordinary probability
> to the power $1/T$ and then dividing everything by the new total. Raising every number to the
> same positive power keeps them in the same order, because a bigger number stays bigger when
> you square it and stays bigger when you take its square root. Dividing every number by one
> shared total keeps them in the same order too. Formula 5.3 has no third step, so there is
> nowhere for a reordering to happen.

**Where responses go wrong.** The common weak answer is "the lab measured five temperatures and
`' Paris'` won every time, so the order never changes." That is an observation about five
numbers, not a proof about all of them. The other weak answer says the order cannot change
"because the model already decided". That is close, but it does not say which step of the
arithmetic preserves the order, and the problem is asking for that step.

---

**25.** *You are asked to reproduce the simulation's 41.938% from the measured numbers, then
say which of the two figures answers a stated question.*

This tests **renormalising** over a subset, which is Worked example 5.2 in the chapter and
[Toolkit 11](math-toolkit.md#toolkit-percentages) for the conversion at the end. All three
inputs are **measured**, from `lab/out/we2_softmax.json`.

The inputs: `' Paris'` holds 30.219% of the full 151,936-token distribution at $T = 1.0$, and
the top eight tokens together hold 72.056%.

**Step 1, divide the part by the total of the group you are looking at.** The group is the
eight visible tokens, so the total is 72.056, not 100.

$30.219 \div 72.056 = 0.419382$

**Step 2, turn that proportion into a percentage by multiplying by 100.**

$0.419382 \times 100 = 41.938\%$

**Answer.** 41.938%, which is the simulation's readout, reproduced in two steps.

**Check at full precision.** Adding the eight measured probabilities in
`lab/out/we2_softmax.json` without rounding gives a group total of 0.7205608, and
$0.3021884 \div 0.7205608 = 0.4193795$, which is 41.938% to three decimal places. The rounded
route and the full-precision route agree here.

**Which number answers "how sure is the model that the next word is Paris".** The **30.219%**.
The model's distribution runs over all 151,936 tokens. Asking how sure it is means asking what
share of everything it could say goes to `' Paris'`, and that share is 30.219%.

The 41.938% answers a narrower question: out of these eight candidates only, what share goes to
`' Paris'`. Getting to that number required throwing away 151,928 tokens that hold

$100 - 72.056 = 27.944\%$

of the probability between them. Throwing away more than a quarter of the probability and then
rescaling makes the model look more certain than it is.

**The mistake this problem is built to catch.** Seeing two different percentages for the same
token and deciding one of them must be wrong. Both are correct. They are answers to different
questions, and the honest habit is to say out loud which set you are taking a percentage of.
This is Common mistake 6 in the chapter, and it gets worse as the temperature rises, because a
flat distribution keeps most of its probability in the tail that a top-eight chart cannot show.

---

**27.** *You are asked what happens to the probabilities, the entropy and the nine-tenths count
as the temperature falls toward zero, and how that connects to greedy decoding.*

This tests all three summaries at once: [Formula 5.1](../ch/ch05.md),
[Formula 5.5](../ch/ch05.md) and [Formula 5.6](../ch/ch05.md), plus Definition 5.6.

**The three answers first, then the arithmetic that shows them.**

1. **The probabilities approach 1 for the top-scoring token and 0 for every other token.** The
   distribution collapses onto a single spike.
2. **The entropy approaches 0 bits.** There is no uncertainty left to measure.
3. **The nine-tenths count approaches 1 token**, and it reaches exactly 1 well before $T$ gets
   near zero.

**Why, from Formula 5.2.** The ratio between the top token and any other is
$e^{(z_i - z_j)/T}$. The gap on top is a fixed positive number. Shrinking $T$ makes that
fraction enormous, and $e$ raised to an enormous power is enormous. On the real measured gap of
0.897654 between `' Paris'` and `' ______'`, the ratio goes $2.454$ at $T = 1.0$, then $6.021$,
then $36.26$ at $T = 0.25$, then about $7{,}915$ at $T = 0.1$, then about $6.3 \times 10^{7}$
at $T = 0.05$. The runner-up is being crushed, and every other token is crushed harder, because
every other gap is wider.

**Worked in full on the made-up scores 2, 1 and 0, at $T = 0.1$.**

Step 1, divide every score by 0.1, which is the same as multiplying by 10.

$2 \div 0.1 = 20$

$1 \div 0.1 = 10$

$0 \div 0.1 = 0$

Step 2, raise $e$ to each.

$e^{20} = 485{,}165{,}195.409790$

$e^{10} = 22{,}026.465795$

$e^{0} = 1.000000$

Step 3, add them, two at a time.

$485{,}165{,}195.409790 + 22{,}026.465795 = 485{,}187{,}221.875585$

$485{,}187{,}221.875585 + 1.000000 = 485{,}187{,}222.875585$

Step 4, divide each by that total.

$p_1 = 485{,}165{,}195.409790 \div 485{,}187{,}222.875585 = 0.999955$

$p_2 = 22{,}026.465795 \div 485{,}187{,}222.875585 = 0.000045$

$p_3 = 1.000000 \div 485{,}187{,}222.875585 = 0.000000002$

**The whole descent, in one table.** Every row is the same three **made-up** scores, 2, 1 and
0, at a lower temperature. The $T = 1.0$ and $T = 0.5$ rows match the chapter's own figures.

| $T$ | $p_1$ | $p_2$ | $p_3$ | entropy $H$ | $k_{0.9}$ |
|---|---|---|---|---|---|
| 1.00 | 0.665241 | 0.244728 | 0.090031 | 1.200893 bits | 2 |
| 0.50 | 0.866813 | 0.117310 | 0.015876 | 0.636311 bits | 2 |
| 0.25 | 0.981690 | 0.017980 | 0.000329 | 0.134221 bits | 1 |
| 0.10 | 0.999955 | 0.000045 | 0.000000 | 0.000721 bits | 1 |

Read the columns. The first probability climbs toward 1. The other two fall toward 0. The
entropy falls toward 0 bits. The nine-tenths count drops to 1 and stays there, because once the
top token holds more than 0.9 on its own you stop after one.

**The connection to greedy decoding.** Greedy decoding takes the top-ranked token every time,
with no randomness. As $T$ falls toward zero, sampling from the distribution becomes the same
thing in practice, because there is almost nothing left to draw except the top token. At
$T = 0.1$ above, a sampler draws the top token about 99,995 times in 100,000. So greedy
decoding is what the temperature formula behaves like in the limit, which is exactly why
software that offers $T = 0$ switches to greedy, as Problem 21 says. The formula itself never
reaches $T = 0$, because of the division.

**One honest fine point.** All of this assumes one token holds the top score on its own. If two
tokens were tied for first, lowering the temperature would split the probability evenly between
those two, the entropy would approach 1 bit rather than 0, and the nine-tenths count would
settle at 2. Exact ties do not occur in the measured run, where `' Paris'` leads by 0.897654,
but the claim is about the shape of the argument and it is worth stating precisely.

**The tempting wrong answer** is that the entropy approaches the ceiling $\log_2(151{,}936) =
17.213$ bits. That is the **high**-temperature limit, not the low one. Low temperature means
more certain, and more certain means fewer bits.

---

**29.** *You are asked whether it is fair to say a model at $T = 2.0$ is "considering" 41,274
words, to argue both sides, and to say which version of the claim is measurable.*

This is a question about language, not arithmetic, so there is no single right answer. What
follows is the arithmetic you need, then what a strong response contains, then one worked
example of such a response.

**The arithmetic, first.** The count 41,274 tokens and the vocabulary size 151,936 are both
**measured**, from `_research/00-lab-verified-findings.md` section 2.

$41{,}274 \div 151{,}936 = 0.271654$

$0.271654 \times 100 = 27.17\%$

So the tokens holding 90% of the probability are 27.17% of the whole vocabulary, and the
remaining $151{,}936 - 41{,}274 = 110{,}662$ tokens share 10% or less between them.

**What a strong response contains.** Five things.

1. Both sides argued in good faith, not one side set up to lose.
2. A statement of what the number 41,274 actually is: the smallest count of top-ranked tokens
   whose probabilities add to at least 0.9. That is a property of a sorted list, and it is
   fully defined.
3. A statement of what "considering" is not: it is a word about deliberation, and nothing in
   the model's arithmetic deliberates. The model produced 151,936 scores in one pass. It scored
   every token, not 41,274 of them.
4. The distinction named plainly: the count is measurable, the word "considering" is not.
5. A replacement sentence that says the same thing without the unmeasurable word.

**One worked example of such a response.**

> **For.** The count is doing honest work. At $T = 2.0$ no small group of tokens carries the
> outcome. A sampler drawing from this distribution really will reach into tens of thousands of
> different tokens across repeated draws, and "the model is choosing between about 41,000
> options" gives a non-technical reader a true picture of how unconstrained that draw is. It is
> far better than the alternative most people reach for, which is "the model got creative".
>
> **Against.** "Considering" describes deliberation, and there is none. The model ran once and
> produced 151,936 scores. It scored every token in the vocabulary, not 41,274 of them, so if
> "considering" meant "assigned a score to", the honest number would be 151,936 at every
> temperature. And 41,274 is not a property of the model alone. It is a property of the model
> **and** the 90% threshold somebody chose. Move the threshold to 95% and the count moves with
> it, while nothing about the model changed.
>
> **Which version is measurable.** "41,274 tokens are needed to reach 90% of the probability at
> $T = 2.0$" is measurable. It names the threshold, it names the temperature, and anyone can
> reproduce it from `lab/out/we2_softmax.json`. "The model is considering 41,274 words" is not
> measurable, because no experiment distinguishes a model that considers 41,274 words from one
> that scores all 151,936 and ends up spread thinly. The first sentence can be checked. The
> second can only be agreed with.

**The line worth keeping.** At $T = 2.0$ this model is spreading nine tenths of its confidence
across 27.17% of everything it can say. That is not a model being imaginative. That is a model
close to useless, and the count is how you show it rather than assert it.

---

(answers-ch06)=
## Chapter 6. Bits, precision, and rounding

These problems drill two pieces of arithmetic: the multiplication that turns a parameter count
into a file size, and the division that turns a range and a bit width into the gap between the
values a format is able to store.

### Warm-up

**1.** *How many different values fit in 3 bits, in 6 bits, and in 12 bits?*

This is Formula 6.1, $L = 2^{b}$, where $b$ is the bit width and $L$ is the number of levels.
The raised $b$ says how many copies of the 2 to multiply together, which is
[Toolkit 5](math-toolkit.md#toolkit-exponents), and the doubling pattern itself is
[Toolkit 18](math-toolkit.md#toolkit-powers-of-two).

**At 3 bits.** $2^{3} = 2 \times 2 \times 2$. Multiply one pair at a time, left to right.

$2 \times 2 = 4$

$4 \times 2 = 8$

So $2^{3} = 8$.

**At 6 bits.** Carry on doubling from 8. Each extra bit is one more doubling.

$2^{4} = 8 \times 2 = 16$

$2^{5} = 16 \times 2 = 32$

$2^{6} = 32 \times 2 = 64$

So $2^{6} = 64$.

**At 12 bits.** Keep going, six more doublings.

$2^{7} = 64 \times 2 = 128$

$2^{8} = 128 \times 2 = 256$

$2^{9} = 256 \times 2 = 512$

$2^{10} = 512 \times 2 = 1{,}024$

$2^{11} = 1{,}024 \times 2 = 2{,}048$

$2^{12} = 2{,}048 \times 2 = 4{,}096$

**Answer.** 3 bits hold **8** different values, 6 bits hold **64**, and 12 bits hold **4,096**.

**Check it.** Read the chain and confirm every entry is twice the one before: 8, 16, 32, 64, 128,
256, 512, 1,024, 2,048, 4,096. Nothing in the list is odd, which is correct, because everything
after the first step is a doubling.

**Where this goes wrong.** Two slips are common. The first is answering 6 for 3 bits, by
multiplying 2 by 3 instead of doubling three times. The raised number counts copies of the 2; it
is not a multiplier. The second is noticing that 12 is double 6 and answering $64 \times 2 = 128$
for 12 bits. Doubling the bit width does not double the levels, it squares them:
$64 \times 64 = 4{,}096$, which is the answer above. Bits add; levels multiply.

---

**3.** *A format spends 16 bits per number. How many bytes per number is that?*

This is Formula 6.2, bytes per number $= \dfrac{b}{8}$. There are 8 bits in one byte, so turning
bits into bytes is a division by 8. The fraction bar and the $\div$ sign are the same
instruction, set out in [Toolkit 4](math-toolkit.md#toolkit-fraction-bar).

One division.

$$16 \div 8 = 2$$

**Answer.** **2 bytes per number.** That is the format called FP16, half precision, and it is
what every model in this course is shipped in.

**Check it.** Multiply back: $2 \times 8 = 16$, which is the bit width you started with.

**Where this goes wrong.** The tempting wrong answer is $16 \times 8 = 128$ bytes. It is tempting
because "eight bits in a byte" sounds like something you multiply by. The check that catches it
every time: bytes per number can never be larger than the bit width, because a byte is bigger
than a bit. If your answer for bytes is larger than your answer for bits, you multiplied when you
should have divided.

---

**5.** *Convert 2,500,000,000 bytes to gigabytes.*

This is Formula 6.4, $G = \dfrac{S}{1{,}000{,}000{,}000}$, where $S$ is the size in bytes and $G$
is the size in gigabytes. Definition 6.5 fixes one gigabyte at $1{,}000{,}000{,}000$ bytes,
which is the convention download pages use and the convention this book uses throughout.

One division.

$$2{,}500{,}000{,}000 \div 1{,}000{,}000{,}000 = 2.5$$

**Answer.** **2.5 GB.**

**Check it.** Dividing by a thousand million moves the decimal point nine places to the left.
Write the number as 2,500,000,000 and count nine digits back from the right end: you pass
0, 0, 0, 0, 0, 0, 0, 0, 5 and stop between the 2 and the 5, giving 2.5. If your answer came out
as 2,500, you divided by a million and stopped three places short.

**Where this goes wrong.** Your operating system may show the same file as **2.328**, and that is
not an error on anyone's part. Some software counts a gigabyte as
$2^{30} = 1{,}073{,}741{,}824$ bytes, and the proper name for that unit is a gibibyte, GiB, even
where the screen still prints "GB". Under that divisor,
$2{,}500{,}000{,}000 \div 1{,}073{,}741{,}824 = 2.328$, to three decimal places. So the same file
is 2.5 GB and 2.328 GiB. The bytes did not change; the divisor did. State which convention you
used whenever you report a size.

---

**7.** *At 4 bits, how many whole steps fit on each side of zero?*

This is the bottom of Formula 6.5, the quantity $2^{\,b-1} - 1$. One of the $b$ bits records
whether the number is positive or negative, which leaves $b - 1$ bits for the size. One of the
sizes those bits can express has to be zero itself, because a format that cannot write down zero
is useless, so one gets subtracted at the end.

Step 1, take one bit away for the sign.

$$4 - 1 = 3$$

Step 2, raise 2 to that power.

$$2^{3} = 2 \times 2 \times 2 = 8$$

Step 3, subtract one for the level that has to be zero.

$$8 - 1 = 7$$

**Answer.** **7 whole steps on each side of zero.**

**Check it.** Count the ticks: 7 on the left, zero in the middle, 7 on the right, which is 15
ticks. The budget at 4 bits is $2^{4} = 16$ labels, so 15 get used and one is spare. That is
exactly what Section 6.3 said would happen.

**Where this goes wrong.** Two wrong answers, both tempting. Answering **16** means you used
$2^{b}$ and forgot that one bit pays for the sign. Answering **8** means you took the sign bit
into account but forgot the minus one. This is Common mistake 4, and the way to catch it is to
draw the ticks and count them: if your count of ticks is even, you have no tick at zero, and that
cannot be right.

---

**9.** *A ruler has to reach $M = 8$ and you have 3 bits. What is the gap?* These numbers are
made up for practice.

This is Formula 6.5, $g = \dfrac{M}{2^{\,b-1} - 1}$, where $M$ is the largest magnitude the ruler
has to reach and $g$ is the distance from one tick to the next.

Step 1, take one bit away for the sign.

$$3 - 1 = 2$$

Step 2, raise 2 to that power.

$$2^{2} = 2 \times 2 = 4$$

Step 3, subtract one.

$$4 - 1 = 3 \text{ steps on each side of zero}$$

Step 4, divide the range by the steps.

$$g = 8 \div 3 = 2.6667$$

That division never finishes. The 6s repeat forever, so 2.6667 is the answer rounded to four
decimal places, following [Toolkit 16](math-toolkit.md#toolkit-rounding).

**Answer.** The gap is **2.6667**, rounded to four decimal places. The whole list of values this
format can write down is

$$-8, \quad -5.3333, \quad -2.6667, \quad 0, \quad 2.6667, \quad 5.3333, \quad 8$$

**Check it.** Three steps of one gap each must land you on $M$. Multiply:
$3 \times 2.6667 = 8.0001$. That is 8 to three decimal places, and the leftover 0.0001 is the
rounding you did in Step 4 coming back out. Carry $8 \div 3$ at full precision and the check
lands on 8 exactly.

**Where this goes wrong.** The tempting wrong answer is $8 \div 8 = 1$, from dividing by
$2^{b} = 8$ instead of by $2^{\,b-1} - 1 = 3$. It gives a gap that is too small by a factor of
almost three, which makes the format look far better than it is. The other tempting wrong answer
is $8 \div 4 = 2$, from remembering the sign bit but forgetting the minus one.

---

### Practice

**11.** *`Qwen2.5-0.5B-Instruct` has 494,032,768 parameters. Work out its size in bytes and in
gigabytes at FP32, at FP16 and at INT8.*

The parameter count is **real**, and it is `total_params` in `lab/out/we3_params_quant.json`.
Three formulas do the work, in order. Formula 6.2 turns a bit width into bytes per parameter.
Formula 6.3, $S = N \times \dfrac{b}{8}$, multiplies that by the parameter count $N$ to get the
size in bytes $S$. Formula 6.4 turns bytes into gigabytes. The same three formulas are stated in
Section 2.2 of [the formula appendix](formulas.md).

**At FP32, which spends 32 bits.**

Step 1, bytes per parameter: $32 \div 8 = 4$.

Step 2, multiply. Doing it as two doublings keeps the arithmetic on a phone screen.

$$494{,}032{,}768 \times 2 = 988{,}065{,}536$$

$$988{,}065{,}536 \times 2 = 1{,}976{,}131{,}072 \text{ bytes}$$

Step 3, convert: $1{,}976{,}131{,}072 \div 1{,}000{,}000{,}000 = 1.976131072$.

**At FP16, which spends 16 bits.**

Step 1, bytes per parameter: $16 \div 8 = 2$.

Step 2, multiply: $494{,}032{,}768 \times 2 = 988{,}065{,}536$ bytes.

Step 3, convert: $988{,}065{,}536 \div 1{,}000{,}000{,}000 = 0.988065536$.

**At INT8, which spends 8 bits.**

Step 1, bytes per parameter: $8 \div 8 = 1$.

Step 2, multiply: $494{,}032{,}768 \times 1 = 494{,}032{,}768$ bytes.

Step 3, convert: $494{,}032{,}768 \div 1{,}000{,}000{,}000 = 0.494032768$.

**Answer.** **1.976 GB at FP32, 0.988 GB at FP16, and 0.494 GB at INT8**, each rounded to three
decimal places. In bytes: 1,976,131,072 then 988,065,536 then 494,032,768.

**Check it.** Two checks. First, each bit width is half the one above it, so each file must be
half the one above it: 1.976, then 0.988, then 0.494. Each is half its predecessor. Second, the
FP16 figure has an independent witness. `lab/out/lab4_size_ladder.json` records `size_fp16_gb` for
this model as `0.988065536`, which matches the hand arithmetic digit for digit. That value was
written by a script that loaded the real model and counted, not by anybody typing it in.

**Where this goes wrong.** The most common slip is using 32, 16 and 8 as bytes per parameter and
reporting a 15.8 GB model. FP32 is 32 **bits**, which is 4 bytes. The second slip is dividing by
$1{,}073{,}741{,}824$ at the last step, which gives 1.840, 0.920 and 0.460 and is the gibibyte
convention rather than the gigabyte one. Neither set of numbers is wrong; they answer different
questions, and you have to say which one you answered.

---

**13.** *A model file is 1.5 GB and the model has 1,500,000,000 parameters. How many bytes per
parameter, and therefore how many bits, is it stored at?* These numbers are made up for practice.

This is Formula 6.3 run backwards. Forwards it says size $=$ parameters $\times$ bytes per
parameter. So bytes per parameter $=$ size $\div$ parameters, once both are in the same units.
Getting them into the same units is the whole problem.

Step 1, turn the file size into bytes, using Formula 6.4 in reverse. Multiply by a thousand
million instead of dividing by it.

$$1.5 \times 1{,}000{,}000{,}000 = 1{,}500{,}000{,}000 \text{ bytes}$$

Step 2, divide the bytes by the parameters.

$$1{,}500{,}000{,}000 \div 1{,}500{,}000{,}000 = 1 \text{ byte per parameter}$$

Step 3, turn bytes back into bits, using Formula 6.2 in reverse. Multiply by 8 instead of
dividing by it.

$$1 \times 8 = 8 \text{ bits}$$

**Answer.** **1 byte per parameter, which is 8 bits.** That is the format called INT8.

**Check it.** Run it forwards and see if you land back on the file size.
$1{,}500{,}000{,}000 \times 1 = 1{,}500{,}000{,}000$ bytes, and
$1{,}500{,}000{,}000 \div 1{,}000{,}000{,}000 = 1.5$ GB. It closes.

**Where this goes wrong.** Skipping Step 1 and dividing 1.5 by 1,500,000,000 gives
0.000000001, which is a number with no meaning here, because it divides gigabytes by parameters.
Put both quantities into bytes before you divide. There is a second, subtler trap. If the 1.5 GB
had come off an operating system using the binary convention, the true byte count would be
$1.5 \times 1{,}073{,}741{,}824 = 1{,}610{,}612{,}736$, and the arithmetic would give
$1{,}610{,}612{,}736 \div 1{,}500{,}000{,}000 = 1.073741824$ bytes per parameter, which is
$1.073741824 \times 8 = 8.589934592$ bits. Nobody stores a weight in 8.59 bits. An answer that is
not a whole number of bits is a sign that the file size and the parameter count came from two
different conventions.

---

**15.** *Store the value $v = 0.9$ on the 4-bit ruler for the real matrix, where
$g = 0.17522321$. Find $k$, find $\hat{v}$, and find the error. Confirm the error is under half a
gap.*

The gap is **real**, and it is the 4-bit `scale` in `lab/out/we3_params_quant.json`. The value
$0.9$ was chosen for practice; it sits inside the matrix's real range, which runs from
$-1.2265625$ to $+1.171875$.

This is Formula 6.6, $k = \operatorname{round}\!\left(\dfrac{v}{g}\right)$ and
$\hat{v} = k \times g$, followed by Formula 6.7, $E_{\max} = \dfrac{g}{2}$. Here $v$ is the value
you want to store, $k$ is which tick you land on counting out from zero, and $\hat{v}$ is what
you get back when you read the number later.

Step 1, divide the value by the gap to find out how many gaps out from zero it sits.

$$0.9 \div 0.17522321 = 5.13631$$

That is rounded to five decimal places for display. The rounding does not change which whole
number is nearest.

Step 2, round to the nearest whole number. The value 5.13631 sits between 5 and 6, and the part
after the point, 0.13631, is well under 0.5, so 5 is nearer.

$$k = 5$$

Step 3, multiply back out to get the stored value.

$$\hat{v} = 5 \times 0.17522321 = 0.87611605$$

Step 4, find how far the value moved. The upright bars throw away the minus sign, so what comes
out is a size, which is [Toolkit 15](math-toolkit.md#toolkit-absolute-value).

$$\lvert 0.9 - 0.87611605 \rvert = 0.02388395$$

Step 5, work out half a gap and compare.

$$0.17522321 \div 2 = 0.087611605$$

$$0.02388395 \text{ is smaller than } 0.087611605$$

**Answer.** $k = \mathbf{5}$, the stored value is $\hat{v} = \mathbf{0.87611605}$, and the
rounding error is **0.02388395**. That error is under half a gap of 0.087611605, so the guarantee
in Formula 6.7 held.

**Check it.** The tick number must be a whole number, and 5 is. The stored value must have the
same sign as the original, and both are positive. And the error must be no larger than half a
gap, which it is not.

**Where this goes wrong.** The tempting slip is rounding 5.13631 up to 6, because 13631 is a long
string of digits and looks large. What matters is the single value 0.13631, and it is under a
half. If you take $k = 6$ you get $\hat{v} = 6 \times 0.17522321 = 1.05133926$ and an error of
$\lvert 0.9 - 1.05133926 \rvert = 0.15133926$. That error is larger than half a gap, and that is
your signal that you rounded the wrong way. An error above half a gap is always an arithmetic
slip, never a property of the format.

---

**17.** *The typical weight in the real matrix is $-0.02697754$. Show, with arithmetic, that it
survives at 6 bits and is erased at 5 bits.*

The weight is **real**. It is the median magnitude of the 802,816 numbers in
`model.layers[0].self_attn.q_proj.weight`, carrying a minus sign, and it is recorded in
`_research/00-lab-verified-findings.md`, section 5. The largest magnitude in that matrix is
$M = 1.2265625$, which is **real**, from `W_stats` in `lab/out/we3_params_quant.json`.

The test for survival is Formula 6.7 read as a rule: a value whose magnitude is smaller than half
a gap has zero as its nearest tick, so it stores as exactly 0 and is gone. Everything else stores
as something nonzero. So the work is Formula 6.5 twice, then a comparison twice.

**At 6 bits.**

Step 1, $6 - 1 = 5$.

Step 2, $2^{5} = 2 \times 2 \times 2 \times 2 \times 2$, which doubling up is 2, 4, 8, 16, 32, so
$2^{5} = 32$.

Step 3, $32 - 1 = 31$ steps on each side of zero.

Step 4, $g = 1.2265625 \div 31 = 0.03956653$, to eight decimal places.

Step 5, half a gap: $0.03956653 \div 2 = 0.01978327$, to eight decimal places.

Step 6, compare. The weight's magnitude is 0.02697754. Is it larger than 0.01978327? Yes, by
$0.02697754 - 0.01978327 = 0.00719427$. So the nearest tick is not zero, and the weight survives.

Step 7, confirm with Formula 6.6. $-0.02697754 \div 0.03956653 = -0.68183$, to five decimal
places. That sits between $-1$ and $0$ and is nearer to $-1$, so $k = -1$ and
$\hat{v} = -1 \times 0.03956653 = -0.03956653$. The error is
$\lvert -0.02697754 - (-0.03956653) \rvert = 0.01258899$.

**At 5 bits.**

Step 1, $5 - 1 = 4$.

Step 2, $2^{4} = 2 \times 2 \times 2 \times 2 = 16$.

Step 3, $16 - 1 = 15$ steps on each side of zero.

Step 4, $g = 1.2265625 \div 15 = 0.08177083$, to eight decimal places.

Step 5, half a gap: $0.08177083 \div 2 = 0.04088542$, to eight decimal places.

Step 6, compare. Is 0.02697754 larger than 0.04088542? No. It is smaller, by
$0.04088542 - 0.02697754 = 0.01390788$. So zero is the nearest tick.

Step 7, confirm with Formula 6.6. $-0.02697754 \div 0.08177083 = -0.32992$, to five decimal
places. That sits between $-1$ and $0$ and is far nearer to 0, so $k = 0$ and
$\hat{v} = 0 \times 0.08177083 = 0$. The error is the whole weight, 0.02697754.

**Answer.** At 6 bits the weight **survives**, stored as $-0.03956653$ with an error of
0.01258899. At 5 bits it is **erased**, stored as exactly 0.0, with an error equal to the whole
weight, 0.02697754.

**Check it.** The 6-bit gap has an independent witness. The lab recorded the 6-bit scale for this
matrix as `0.039566532258064516` in `lab/out/we3_params_quant.json`, and rounding that to eight
decimal places gives 0.03956653. The 5-bit gap has no such witness, because the lab never ran a
5-bit setting; it is computed here with Formula 6.5 from the same real $M$, exactly as Worked
example 6.4 does it.

**Where this goes wrong.** The dividing line is **half** a gap, not a whole gap, and using the
whole gap gives the wrong verdict here. At 6 bits the gap is 0.03956653 and the weight, 0.02697754,
is smaller than that, so the wrong test says "erased" when the right test says "survives". The
wrong test happens to give the right verdict at 5 bits, which is what makes it dangerous: it agrees
with you half the time. Compare against half the gap, every time.

---

**19.** *A group of weights has $M = 0.5$ and you have 5 bits. Compute the gap, then the largest
possible error, then say whether a weight of size 0.01 survives.* These numbers are made up for
practice.

Formula 6.5 for the gap, Formula 6.7 for the largest possible error, then the survival test from
problem 17.

Step 1, $5 - 1 = 4$.

Step 2, $2^{4} = 2 \times 2 \times 2 \times 2 = 16$.

Step 3, $16 - 1 = 15$ steps on each side of zero.

Step 4, the gap.

$$g = 0.5 \div 15 = 0.03333333$$

That division never finishes; the 3s repeat forever, so 0.03333333 is the answer to eight decimal
places.

Step 5, the largest possible error, which is half the gap.

$$E_{\max} = 0.03333333 \div 2 = 0.01666667$$

Step 6, the survival test. Is 0.01 larger than 0.01666667? No. It is smaller, by
$0.01666667 - 0.01 = 0.00666667$. So zero is the nearest tick and the weight is erased.

Step 7, confirm with Formula 6.6. $0.01 \div 0.03333333 = 0.30000$. That rounds to $k = 0$, so
$\hat{v} = 0 \times 0.03333333 = 0$, and the error is the whole 0.01.

**Answer.** The gap is **0.03333333**, the largest possible rounding error is **0.01666667**, and
a weight of size 0.01 **does not survive**. It stores as exactly 0.

**Check it.** Fifteen steps of one gap each must land on $M$:
$15 \times 0.03333333 = 0.49999995$, which is 0.5 to six decimal places, the small shortfall being
the rounding in Step 4.

**Where this goes wrong.** Two things. First, "0.01 is bigger than zero, so it must store as
something small" is the mistake Common mistake 5 names. The stored value is not small; it is
exactly 0, and the error is the whole weight. Say that in words rather than reporting a number
and moving on. Second, it is worth setting this ruler beside the real one. At the same 5 bits on
the real matrix, $M = 1.2265625$ and the gap is 0.08177083. Here $M = 0.5$ and the gap is
0.03333333. Divide the gaps: $0.08177083 \div 0.03333333 = 2.4531$. Divide the ranges:
$1.2265625 \div 0.5 = 2.453125$. The two ratios are the same number, because the gap is directly
proportional to $M$. Shrinking the range shrank the gap by exactly the same factor, with the bit
width untouched.

---

### Stretch

**21.** *Explain in your own words, in no more than five sentences and with no formulas, why two
different 4-bit schemes can have errors that differ by a factor of more than a hundred.*

This is a written answer, so there is no single correct wording. What a strong response contains:

- The point that bits fix **how many** ticks you get, and nothing about where they sit.
- The second input, which is how far the ruler has to stretch.
- Why a wide ruler is wasteful: it spends its ticks across a span where almost no weight actually
  lives.
- At least one number from the chapter, so the claim is measured rather than asserted.
- The conclusion: "4-bit" names a storage budget, never an error.

A response that only says "one scheme is more accurate than the other" has restated the question.
A response that says "one rounds up and the other rounds down" has named the wrong cause;
rounding direction is not the issue, tick spacing is.

**One worked example of such a response.**

> Four bits buy sixteen ticks, and sixteen ticks is all they buy. Where those ticks sit is decided
> by how far the ruler has to stretch, not by the bits. A scheme that has to reach the biggest
> weight in the whole matrix, 1.2265625, spreads its sixteen ticks across a span about 45 times
> wider than a typical weight, so a typical weight of 0.02697754 ends up nearer to zero than to any
> other tick and is stored as nothing at all. A scheme whose group of weights only has to reach
> 0.03125 puts those same sixteen ticks close together, and stores that same weight to within
> 0.00019183 of the truth. The two errors differ by a factor of about 141 with the bit width
> identical in both, which is why "four-bit" names a storage budget and never an error.

**Where the numbers in that response come from.** The largest magnitude 1.2265625 and the typical
magnitude 0.02697754 are **real**, from `W_stats` in `lab/out/we3_params_quant.json` and from the
lab findings. The ratio between them is $1.2265625 \div 0.02697754 = 45.47$, to two decimal
places. The narrow range of 0.03125 is **made up for practice**, chosen to sit near where the
typical weights live. The two errors are the two rows of the table in Section 6.5, and the factor
between them is $0.02697754 \div 0.00019183 = 140.6$, to one decimal place.

---

**23.** *At 2 bits the measured worst error and half a gap are identical, at 0.61328125. Explain
why the 2-bit case hits the ceiling exactly when the others do not.*

The measured figure is **real**, from `max_abs_err` at 2 bits in
`lab/out/we3_params_quant.json`. The half-a-gap figure is Formula 6.7 applied to the same real
$M = 1.2265625$. The problem's hint is the key, so start there.

**Step 1, write out the three values a 2-bit format can store on this matrix.** Steps on each side
of zero, from Formula 6.5, are $2^{2-1} - 1 = 2 - 1 = 1$. One step each side. The gap is
$1.2265625 \div 1 = 1.2265625$. So the complete list is

$$-1.2265625, \quad 0, \quad +1.2265625$$

Three ticks, out of a four-label budget, with one label spare.

**Step 2, find the worst place a weight could sit.** Half a gap is
$1.2265625 \div 2 = 0.61328125$. A weight of exactly that size is the same distance from 0 as it
is from 1.2265625. It is as badly served as this format can serve anything.

**Step 3, store it.** Using Formula 6.6,
$0.61328125 \div 1.2265625 = 0.5$, which is an exact tie, and a tie rounds to $k = 0$. So
$\hat{v} = 0 \times 1.2265625 = 0$.

**Step 4, find the error.**

$$\lvert 0.61328125 - 0 \rvert = 0.61328125$$

There is no rounding anywhere in that line. The stored value is exactly zero, and the error is
exactly the weight.

**Now the contrast, which is the real question.** At 8, 6, 4 and 3 bits the nearest tick to the
worst weight is **not** zero. It is some whole number $k$ of steps out, so the stored value is
$k \times g$, and $g$ is a decimal that never stops. At 8 bits, for instance, the gap is
$1.2265625 \div 127 = 0.009657972440944882\ldots$ and the worst weight lands at $k = 64$, so the
stored value is $64 \times 0.009657972440944882\ldots$. A computer keeps only so many digits of
that product. The few billionths it has to drop show up in the eighth or ninth decimal place of
the error, which is exactly where the chapter's two columns part company.

**Answer.** The 2-bit case lands on the ceiling exactly because the worst weight rounds all the
way to zero. Multiplying by zero is the one multiplication no arithmetic format gets slightly
wrong, so the stored value is exactly 0 and the error is exactly the weight, 0.61328125. Every
other bit width has to compute a nonzero level as a whole number times a never-ending decimal, and
the computer's rounding of that product is what moves the measured figure a few billionths off the
ceiling.

**Worth noticing, and you can check this with whole numbers only.** The worst weight is the same
weight at every bit width: 0.61328125, which is exactly half of $M = 1.2265625$. Here is why it is
always the worst one. A gap is $M$ divided by the step count, so asking how many gaps half of $M$
sits out from zero is asking for half the step count. The step counts at 8, 6, 4, 3 and 2 bits are
127, 31, 7, 3 and 1, so halve each of them.

$$127 \div 2 = 63.5, \qquad 31 \div 2 = 15.5, \qquad 7 \div 2 = 3.5, \qquad 3 \div 2 = 1.5, \qquad 1 \div 2 = 0.5$$

Every one ends in a half, so every one is an exact tie between two ticks, which is the worst a
value can do. That works because all five step counts are odd numbers, and halving an odd number
always leaves a half. And the matrix really does contain weights of that exact size: eleven of
them, recorded as `weights_at_exactly_half_a_gap` in `lab/out/ch06_answers_checks.json`. That is
why the ceiling gets reached and not merely approached.

**Where this goes wrong.** Two readings to avoid. The first is "2 bits is so coarse that the error
must be larger than the ceiling." It cannot be. Formula 6.7 is a guarantee at every bit width, and
no weight at any width in this chapter exceeded it. The second is "the disagreement at the other
widths means Formula 6.7 is slightly wrong." It does not. Work the 8-bit case in exact fractions
and the error comes out at half a gap precisely. The disagreement is in the computer's arithmetic,
not in the formula, and this book prints it rather than rounding it away.

---

**25.** *A colleague proposes storing every weight at 2 bits, arguing that 2 bits still gives four
levels and four is "plenty for a number between minus one and one". Write a short reply, with at
least one number and where it came from.*

This is a written answer, so there is no single correct wording. What a strong reply contains:

- A correction of the premise about the range. This matrix does not run from $-1$ to $1$.
- The point that a 2-bit format does not get four usable values. It gets three.
- The actual list of values it can store, which makes the argument concrete.
- What happens to a typical weight, worked through.
- At least one measured number, with the file it came from.
- An honest acknowledgement that the saving is real, followed by the better way to get it.

A reply that says "2 bits is too few" without a number has not used the chapter. A reply that
attacks the colleague rather than the arithmetic is worse than useless.

**The arithmetic behind the reply.**

First, the range. The real matrix runs from $-1.2265625$ to $+1.171875$, both **real**, from
`W_stats` in `lab/out/we3_params_quant.json`. Throw away the minus signs and the larger of the two
is 1.2265625, so the ruler has to reach $M = 1.2265625$, not 1.

Second, the level count. Formula 6.1 gives $2^{2} = 4$ labels, and the colleague is right about
that. But one bit pays for the sign and one value has to be zero, so Formula 6.5 gives
$2^{2-1} - 1 = 1$ step on each side. The storable values are $-1.2265625$, $0$ and $+1.2265625$.
Three values, with one label spare.

Third, the typical weight. Using Formula 6.6,
$0.02697754 \div 1.2265625 = 0.021994$, to six decimal places, which rounds to $k = 0$. The
typical weight stores as exactly 0.

Fourth, the measurement. Quantizing all 802,816 weights of that matrix this way sends **802,328
of them to exactly zero**, leaving 488 alive. That count is **real**, from
`weights_rounded_to_zero` in `lab/out/ch06_answers_checks.json`. As a share:
$802{,}328 \div 802{,}816 = 0.99939$, and $0.99939 \times 100 = 99.939$, so **99.94%** of the
matrix is erased.

Fifth, the saving, which is real and should be stated. At 2 bits, $2 \div 8 = 0.25$ bytes per
weight, so $494{,}032{,}768 \times 0.25 = 123{,}508{,}192$ bytes, and
$123{,}508{,}192 \div 1{,}000{,}000{,}000 = 0.123508192$, that is **0.1235 GB** against 0.988 GB
at FP16. The file shrinks by a factor of $0.988065536 \div 0.123508192 = 8$, exactly.

**One worked example of such a reply.**

> The four levels are real, but only three of them are usable, because one bit pays for the sign
> and one value has to be zero. On this matrix those three values are $-1.2265625$, $0$ and
> $+1.2265625$, so the range is not minus one to one either; the largest magnitude is 1.2265625,
> and it is what the ruler has to reach. A typical weight is 0.02697754, and dividing it by the
> gap gives 0.021994, which rounds to zero, so a typical weight is stored as nothing. When the lab
> ran this on all 802,816 weights of one real matrix, 802,328 of them, 99.94%, came back as
> exactly zero, and only 488 survived (`weights_rounded_to_zero` in
> `lab/out/ch06_answers_checks.json`). The mean error works out at 62.7% of how much the weights
> vary in the first place (`err_over_sd` at 2 bits in `lab/out/we3b_quant.json`). The saving is
> genuine, 0.1235 GB against 0.988 GB, a factor of eight. But we would be shipping a file that has
> deleted almost everything it was supposed to store. If the goal is a small file, keep 4 bits and
> shrink the range instead: blocks of 32 weights cost 12.5% extra on the file and cut the mean
> 4-bit error by a factor of 6.44, from 0.03109840 to 0.00483112 (`lab/out/we3b_quant.json`).

**Where this goes wrong.** The colleague's error is not in the level count. $2^{2} = 4$ is
correct. The error is assuming the four levels get placed where the weights are. They get placed
at the ends of a ruler that has to reach the largest weight in the matrix, and almost nothing in
the matrix lives out there. That is the same error as Common mistake 3, wearing different clothes:
a bit width names a budget, and only a measurement names an error.

---

(answers-ch07)=
## Chapter 7. Quantization: what you lose, what it buys

These problems drill one chain of arithmetic: count the marks a bit budget buys, divide the
largest weight by that count to get the scale, round a weight onto the scale, and then read the
same shrinking twice, once as bytes on disk and once as joules per token.

Every measured number below traces to `lab/out/we3b_quant.json`, `lab/out/theme_s_energy.json`,
`lab/out/lab4_size_ladder.json` or `lab/out/we7_paired.json`. Every arithmetic step was run
before it was printed.

### Warm-up

**1.** *How many non-zero levels sit on each side of zero when a weight is stored in 6 bits?*

This is Formula 1 from Section 7.1, $\text{steps} = 2^{\,b-1} - 1$, where $b$ is how many bits
you spend on one stored weight. If the raised small number stops you, the toolkit builds
exponents from nothing in [Section 5](#toolkit-exponents).

**Step 1, work out $b - 1$.** One bit is spent saying whether the weight is positive or negative,
so take one away from the budget.

$6 - 1 = 5$

**Step 2, raise 2 to that power.** $2^{5}$ means $2 \times 2 \times 2 \times 2 \times 2$. Do it
one multiplication at a time.

$2 \times 2 = 4$

$4 \times 2 = 8$

$8 \times 2 = 16$

$16 \times 2 = 32$

So $2^{5} = 32$.

**Step 3, subtract 1.** One of those 32 sizes has to be zero, because zero is a size a weight is
allowed to have.

$32 - 1 = 31$

**Answer. 31 whole steps on each side of zero.** The allowed level numbers run from $-31$ through
$0$ up to $+31$, which is 63 values, out of the 64 patterns six bits can name.

**Where this goes wrong.** The tempting wrong answer is $2^{6} - 1 = 63$, because six bits can
name 64 things and 63 feels like the right neighbour. It doubles every answer that follows. The
check is the one from the chapter: the answer must be one less than a power of two **and** one
bit must have been paid for the sign. If you subtracted the 1 before raising to the power you get
$2^{5} = 32$ by a different route and the same wrong habit.

---

**3.** *What is the per-tensor scale at 6 bits for the real weight matrix?*

This is Formula 2 from Section 7.2, $s = \max_i \lvert w_i \rvert \div (2^{\,b-1} - 1)$. The
scale $s$ is the gap between two neighbouring allowed values. The two upright bars mean "throw
away the minus sign", which the toolkit covers in
[Section 15](#toolkit-absolute-value).

**Step 1, get the number of steps.** Problem 1 did this. At $b = 6$ there are 31 steps on each
side of zero.

**Step 2, divide the largest weight size by that count.** The largest weight size in
`model.layers[0].self_attn.q_proj.weight` is $1.2265625$, printed by Cell 2 of the chapter.

$1.2265625 \div 31 = 0.03956653$

**Answer. $s = 0.03956653$.** This is the 6-bit row of Cell 3's output.

**Checking by multiplying back.** $31 \times 0.03956653 = 1.22656243$. The target was
$1.2265625$, so the check is off by $0.00000007$. That is not a mistake. The scale was rounded to
eight decimal places before you multiplied, and the rounding travelled. Keep one more digit,
$0.039566532$, and $31 \times 0.039566532 = 1.22656249$, which is closer still.

The cleaner check divides instead of multiplying:
$1.2265625 \div 0.03956653 = 31.0000018$, which is the 31 from Step 1.

One more check worth doing. The 4-bit scale in the chapter is $0.17522321$ and this 6-bit scale
is $0.03956653$. More bits gave a **smaller** scale, which is what must happen: more marks
spread over the same length sit closer together.

**Where this goes wrong.** Using $2^{b} - 1 = 63$ instead of 31 gives
$1.2265625 \div 63 = 0.01946925$. It looks plausible, and the divide-back check catches it at
once: $1.2265625 \div 0.01946925 = 63$, not 31.

---

**5.** *Quantize and dequantize the weight $w = -0.02697754$ at 6 bits, using the whole-matrix
scale.*

This is Formula 3 from Section 7.3: $q = \operatorname{round}(w \div s)$, then
$\hat{w} = q \times s$. The hat on $\hat{w}$ marks it as the stand-in for the real weight, not
the real weight. Rounding to the nearest whole number is in the toolkit at
[Section 16](#toolkit-rounding).

**Step 1, write down the scale.** From problem 3, $s = 0.03956653$.

**Step 2, divide the weight by the scale.**

$-0.02697754 \div 0.03956653 = -0.681827$

**Step 3, round to the nearest whole number.** The value $-0.681827$ sits between $-1$ and $0$.
Work out both distances rather than guessing.

From $-1$: $1 - 0.681827 = 0.318173$ away.

From $0$: $0.681827$ away.

It is nearer to $-1$, so $q = -1$.

**Step 4, multiply back by the scale to dequantize.**

$\hat{w} = -1 \times 0.03956653 = -0.03956653$

**Step 5, work out the rounding error.** Take the two sizes and subtract.

$0.03956653 - 0.02697754 = 0.01258899$

**Answer.** $w \div s = -0.681827$; the stored whole number is $q = -1$; the value that comes back
is $\hat{w} = -0.03956653$; the rounding error is $0.01258899$. These are the four entries in the
6-bit row of Cell 4.

**Something worth noticing.** The weight got **bigger** in size, from $0.02697754$ to
$0.03956653$. Rounding does not always shrink a number. It moves it to the nearest mark, in
whichever direction that mark lies.

**Check it.** The error can never be larger than half the scale. Half of $0.03956653$ is
$0.01978327$, and $0.01258899$ is under it, so the arithmetic is consistent.

**Where this goes wrong.** Two traps. The first is reading $-0.681827$ and writing
$q = -0.68$; $q$ has to be a whole number, because it is a mark number. The second is rounding
$-0.681827$ to $0$ on the grounds that "0.68 is less than 1". The nearest whole number to
$-0.681827$ is $-1$, and the two distances in Step 3 are how you prove it to yourself.

---

**7.** *How many times larger is the biggest weight in the real matrix than a typical one?*

This is Formula 4 from Section 7.4, the outlier ratio
$R = \max_i \lvert w_i \rvert \div \operatorname{median}_i \lvert w_i \rvert$. The **median** is
the middle value once every size is lined up from smallest to largest. It is not the mean.

**Step 1, write down the largest size.** $1.2265625$.

**Step 2, write down the median size.** $0.02697754$. Half the weights in this matrix are smaller
than this in size and half are larger, which is what makes it the typical one.

**Step 3, divide.**

$1.2265625 \div 0.02697754 = 45.466062$

**Step 4, round to two decimal places.** The third decimal is a 6, so the second rounds up.

$45.466062 \rightarrow 45.47$

**Answer. $R = 45.47$.** It has no units, because a size was divided by a size.

**Checking without a calculator.** Multiply the median by whole numbers until you bracket the
maximum.

$45 \times 0.02697754 = 1.21398930$

$46 \times 0.02697754 = 1.24096684$

The true maximum $1.2265625$ sits between those two, so $R$ is between 45 and 46.

**What the number means.** One shared ruler has to reach $1.2265625$. Stretch 7 marks across that
distance at 4 bits and the first mark lands at $0.17522321$, which is more than six times the
typical weight. That is why more than half of this matrix rounds to zero at 4 bits per-tensor.
The bits were not the problem. This ratio was.

**Where this goes wrong.** Turning the fraction upside down gives
$0.02697754 \div 1.2265625 = 0.021994$. A ratio of a maximum to a median can never be below 1,
because the largest value in a list cannot be smaller than the middle value of the same list. If
your answer is under 1, you divided the wrong way round.

---

**9.** *Turn two bits-per-weight figures into bytes per weight.*

This is the last step of Formula 7 from Section 7.6. There are 8 bits in a byte, so you divide by
8. Dividing is the fraction bar, covered in the toolkit at
[Section 4](#toolkit-fraction-bar).

**Part one, 4.5 bits per weight.**

$4.5 \div 8 = 0.5625$ bytes per weight

Check by multiplying back: $0.5625 \times 8 = 4.5$.

**Part two, 6 bits per weight.**

$6 \div 8 = 0.75$ bytes per weight

Check: $0.75 \times 8 = 6$.

**Answer. 0.5625 bytes per weight, and 0.75 bytes per weight.** The first is the honest cost of
the chapter's 4-bit blockwise scheme, four bits for the weight plus a 16-bit scale shared by 32
weights. The second is what you would pay for 6-bit weights with the scales left out.

**Where this goes wrong.** Multiplying by 8 instead of dividing gives 36 and 48. A byte holds
eight bits, so the number of bytes is always the **smaller** number. If your bytes figure is
bigger than your bits figure, the division went the wrong way. A second sanity anchor: 32-bit
storage must come to $32 \div 8 = 4$ bytes, which is what FP32 means, and 16-bit storage must
come to 2 bytes, which is what FP16 means.

---

**11.** *How much energy does the 1.5B model spend writing 250 tokens?*

This uses the measured energy per token from Section 7.7. The figure $1.133$ joules per token is
in `lab/out/theme_s_energy.json`. A **joule** is a unit of energy, so joules per token multiplied
by a number of tokens gives joules.

**Step 1, multiply.** Break the multiplication in two if it helps.

$1.133 \times 200 = 226.60$

$1.133 \times 50 = 56.65$

$226.60 + 56.65 = 283.25$

**Answer. 283.25 joules, at the graphics card.**

**Putting it in a unit you can picture.** A 60 watt bulb uses 60 joules every second, so
$283.25 \div 60 = 4.72$ seconds of that bulb. Or, in electricity-bill units,
$283.25 \div 3600 = 0.0787$ watt-hours.

**The words that have to travel with the number.** This is GPU board power only. It leaves out
the processor, the system memory, losses in the power supply, the display, the cooling fans and
the room's air conditioning. Treat it as a lower bound on the energy of local inference, not a
total cost.

**Where this goes wrong.** Dividing instead of multiplying gives $250 \div 1.133 = 220.65$, which
is a token count, not an energy. The units tell you which way to go: joules per token, times
tokens, leaves joules.

---

**13.** *How many joules did the 3B run use in total?*

This is the top half of Formula 9 from Section 7.7, $\bar{P} \times t$. A **watt** is a rate, one
joule every second. A watt multiplied by a number of seconds gives an amount of energy in joules.

**Step 1, multiply the mean power by the time.** Break it into pieces you can check.

$30.203 \times 5 = 151.01500$

$30.203 \times 0.6 = 18.12180$

$30.203 \times 0.05 = 1.51015$

$30.203 \times 0.0039 = 0.11779$

Now add them, one addition at a time.

$151.01500 + 18.12180 = 169.13680$

$169.13680 + 1.51015 = 170.64695$

$170.64695 + 0.11779 = 170.76474$

**Answer. About 170.7647 joules in total.**

**Check it against the file.** `lab/out/theme_s_energy.json` records `total_j` as $170.7663$ for
this run. The gap of $0.0016$ joules comes from the two inputs being printed to four decimal
places before you multiplied them. Rounding travels, and here it moved the third decimal.

**Carrying on to Formula 9.** The run produced 88 tokens, so
$170.7647 \div 88 = 1.9405$ joules per token, which is the 3B figure the chapter quotes.

**Where this goes wrong.** Reporting "30.203 watts" as the energy. A watt is a rate and a joule
is an amount, in the same way that miles per hour is a rate and miles is an amount. If your
energy figure has no time in it anywhere, you have reported a rate.

---

### Practice

**15.** *At 4 bits per-tensor, how small can a weight be and still not be erased, and do three
given weights survive?*

This is Formula 3 from Section 7.3 read backwards, and it is the arithmetic behind the 46.6%
figure. A weight rounds to zero whenever zero is the nearest mark, which happens whenever the
weight sits closer to zero than to the first mark at $s$. The halfway point between them is
$s \div 2$.

**Step 1, compute the threshold.** The 4-bit per-tensor scale is $s = 0.17522321$.

$0.17522321 \div 2 = 0.08761161$

**Answer to the first part. Any weight whose size is below $0.08761161$ rounds to exactly zero.**

**Step 2, test $0.05$.** Compare $0.05$ with $0.08761161$. It is smaller, so it rounds to zero.
Confirm with Formula 3: $0.05 \div 0.17522321 = 0.285350$, and the nearest whole number to
$0.285350$ is $0$. It comes back as $0$, and the error is the whole weight, $0.05$.

**Step 3, test $0.09$.** Compare $0.09$ with $0.08761161$. It is larger, by $0.00238839$, so it
does not round to zero. Confirm: $0.09 \div 0.17522321 = 0.513631$, which rounds to $1$, and
$1 \times 0.17522321 = 0.17522321$. Error: $0.17522321 - 0.09 = 0.08522321$.

**Step 4, test $0.20$.** Compare $0.20$ with $0.08761161$. It is larger, so it does not round to
zero. Confirm: $0.20 \div 0.17522321 = 1.141401$, which rounds to $1$, and it comes back as
$0.17522321$. Error: $0.20 - 0.17522321 = 0.02477679$.

**Answer to the second part. $0.05$ does not survive. $0.09$ and $0.20$ do.**

**One thing the word "survive" hides.** "Survive" here means "does not become exactly zero". It
does not mean "comes back accurately". The weight $0.09$ survives and comes back as $0.17522321$,
which is nearly twice its true size: the error $0.08522321$ is 94.7% of the original weight.
Surviving this ruler is not the same as being stored well.

**Where this goes wrong.** Comparing each weight against the full scale $0.17522321$ instead of
half of it. That would wrongly erase $0.09$ and $0.12$ and everything else below the first mark.
The mark is at $s$; the tipping point is halfway to it.

---

**17.** *Quantize four weights at 4 bits with one block scale, and compare against the
whole-matrix scale.*

This is Formula 6 from Section 7.5. The only thing that changes from Formula 3 is which maximum
sets the ruler: the largest weight **in this block**, not the largest weight in the matrix. The
four weights are $0.12$, $-0.07$, $0.04$ and $-0.02$, made up for practice.

**Step 1, find the largest size inside the block.** The four sizes are $0.12$, $0.07$, $0.04$ and
$0.02$. The largest is $0.12$.

**Step 2, get the number of steps.** At $b = 4$: $4 - 1 = 3$, then $2^{3} = 8$, then
$8 - 1 = 7$ steps.

**Step 3, divide to get the block scale.**

$s^{(k)} = 0.12 \div 7 = 0.01714285714\ldots$

The 285714 repeats forever. Written to eight decimal places it is $0.01714286$, and every line
below carries that rounding in its last digit.

**Step 4, quantize and dequantize each weight.**

| $w_i$ | $w_i \div s^{(k)}$ | rounds to $q_i$ | $\hat{w}_i = q_i \times s^{(k)}$ | error |
|---|---|---|---|---|
| $+0.12000000$ | $+7.000000$ | $+7$ | $+0.12000000$ | $0.00000000$ |
| $-0.07000000$ | $-4.083333$ | $-4$ | $-0.06857143$ | $0.00142857$ |
| $+0.04000000$ | $+2.333333$ | $+2$ | $+0.03428571$ | $0.00571429$ |
| $-0.02000000$ | $-1.166667$ | $-1$ | $-0.01714286$ | $0.00285714$ |

Take the second row slowly. $-0.07 \div 0.01714286 = -4.083333$. That sits between $-5$ and
$-4$. From $-5$ it is $0.916667$ away; from $-4$ it is $0.083333$ away. Nearer to $-4$, so
$q = -4$. Then $-4 \times 0.01714286 = -0.06857143$, and the error is
$0.07000000 - 0.06857143 = 0.00142857$.

**Step 5, average the four errors**, one addition at a time.

$0.00000000 + 0.00142857 = 0.00142857$

$0.00142857 + 0.00571429 = 0.00714286$

$0.00714286 + 0.00285714 = 0.01000000$

$0.01000000 \div 4 = 0.00250000$

**Answer to the first parts. The block scale is $0.01714286$. The four values that come back are
$0.12000000$, $-0.06857143$, $0.03428571$ and $-0.01714286$. The mean absolute error is
$0.00250000$.**

**The comparison, which needs the per-tensor answer.** The last sentence of this problem asks how
many times better the blockwise result is, and the thing it is better *than* is problem 16, which
is even-numbered. Here is problem 16's mean error, so you can finish problem 17. The same four
weights at 4 bits with the whole-matrix scale $s = 0.17522321$:

| $w_i$ | $w_i \div s$ | rounds to $q_i$ | $\hat{w}_i$ | error |
|---|---|---|---|---|
| $+0.12000000$ | $+0.684841$ | $+1$ | $+0.17522321$ | $0.05522321$ |
| $-0.07000000$ | $-0.399490$ | $0$ | $0$ | $0.07000000$ |
| $+0.04000000$ | $+0.228280$ | $0$ | $0$ | $0.04000000$ |
| $-0.02000000$ | $-0.114140$ | $0$ | $0$ | $0.02000000$ |

Add those four errors.

$0.05522321 + 0.07000000 = 0.12522321$

$0.12522321 + 0.04000000 = 0.16522321$

$0.16522321 + 0.02000000 = 0.18522321$

$0.18522321 \div 4 = 0.04630580$

Now divide one mean error by the other.

$0.04630580 \div 0.00250000 = 18.52$

**Answer to the last part. The blockwise result is about 18.5 times better**, on the same four
weights, at the same four bits, under the same rounding rule.

**Check it.** Three checks, all of which pass. The largest weight in the block, $0.12$, came back
exactly, which it must, because it sits on the top mark by construction. The block scale
$0.01714286$ is smaller than the whole-matrix scale $0.17522321$, which it must be, because the
largest weight in one block cannot exceed the largest weight in the matrix. And no single error
exceeds half the block scale: half of $0.01714286$ is $0.00857143$, and the biggest error is
$0.00571429$.

**Where this goes wrong.** Using $s = 0.17522321$ for the blockwise part. That is problem 16, and
it is the whole point of the contrast: three of the four weights are erased by the long ruler and
none of them is erased by the short one. The bits did not change. The maximum did.

---

**19.** *Cost out a 2-bit scheme with one 16-bit scale per 16 weights, and say why the smaller
block costs more.*

This is Formula 7 from Section 7.6,
$\text{bytes per weight} = \bigl(b + b_{\text{scale}} \div B\bigr) \div 8$, followed by Formula 8,
$\text{size} = N \times \text{bytes per weight}$. Here $b = 2$, $b_{\text{scale}} = 16$ and
$B = 16$.

**Step 1, work out each weight's share of its block's scale.** One 16-bit scale is shared by 16
weights.

$16 \div 16 = 1$ bit per weight

**Step 2, add the weight's own bits.**

$2 + 1 = 3$ bits per weight

**Step 3, turn bits into bytes.**

$3 \div 8 = 0.375$ bytes per weight

Check: $0.375 \times 8 = 3$.

**Step 4, multiply by the parameter count.** The 0.5B model has $N = 494{,}032{,}768$
parameters. Multiplying by $0.375$ is the same as multiplying by 3 and dividing by 8.

$494{,}032{,}768 \times 3 = 1{,}482{,}098{,}304$

$1{,}482{,}098{,}304 \div 8 = 185{,}262{,}288$ bytes

**Step 5, turn bytes into gigabytes.** Throughout this book GB means $10^{9}$ bytes, a 1 followed
by nine zeros. [Scientific notation is in the toolkit](#toolkit-scientific-notation).

$185{,}262{,}288 \div 1{,}000{,}000{,}000 = 0.185$ GB

**Answer. 3 bits per weight, 0.375 bytes per weight, and 0.185 GB for the whole 0.5B model.**

**Why a smaller block makes the overhead worse.** The scale costs 16 bits no matter what, and
those 16 bits are split between however many weights share them. With $B = 32$ each weight
carries $16 \div 32 = 0.5$ bits of bookkeeping. With $B = 16$ each weight carries
$16 \div 16 = 1$ bit, twice as much. Now compare that share with the payload it is riding on.
Here it is 1 bit on top of 2, so the file is $3 \div 2 = 1.5$ times the size of a scale-free
2-bit file, an overhead of **50%**. The chapter's 4-bit scheme with $B = 32$ is 0.5 bits on top
of 4, so $4.5 \div 4 = 1.125$, an overhead of **12.5%**. The overhead grows when the block
shrinks, and it grows again when the weight's own bit count shrinks, because the same fixed
16 bits are being compared against less and less.

**One thing the arithmetic does not say.** This scheme would be small and bad. At 2 bits, the
measured blockwise error with $B = 32$ was still 44.7% of the weights' spread
(`lab/out/we3b_quant.json`). Halving the block would improve that, and 2 bits stays a poor place
to be. Blocks help at every bit width and they do not rescue every bit width.

**Where this goes wrong.** Writing $2 + 16 = 18$ bits per weight, by adding the whole scale to
every weight instead of its share. The scale is stored once per block, not once per weight. If
your bits-per-weight figure is larger than 16, that is the slip.

---

**21.** *How much of the 1.5B model's energy per token was the model working, rather than the
card being switched on?*

This is Formula 11 from Section 7.7,
$E_{\text{above idle}} = \bigl(\bar{P} - P_{\text{idle}}\bigr) \times t \div n_{\text{tokens}}$.
The round brackets say to do the subtraction **first**. The inputs are measurements in
`lab/out/theme_s_energy.json`: $\bar{P} = 27.409$ W, $P_{\text{idle}} = 13.834$ W,
$t = 4.9619$ s, $n_{\text{tokens}} = 120$.

**Step 1, do the subtraction inside the brackets.**

$27.409 - 13.834 = 13.575$ watts

**Step 2, multiply by the time.** In pieces, so you can check each one.

$13.575 \times 4 = 54.30000$

$13.575 \times 0.9 = 12.21750$

$13.575 \times 0.06 = 0.81450$

$13.575 \times 0.0019 = 0.02579$

Add them, one addition at a time.

$54.30000 + 12.21750 = 66.51750$

$66.51750 + 0.81450 = 67.33200$

$67.33200 + 0.02579 = 67.35779$ joules

**Step 3, divide by the token count.**

$67.35779 \div 120 = 0.561315$

**Answer. 0.5613 joules per token above idle.** The file records
`j_per_token_above_idle` as $0.5613149$ for this model, so the hand arithmetic lands on the
measurement.

**Step 4, work out what share that is of the full figure.** The 1.5B model's full cost is
$1.133$ joules per token.

$0.561315 \div 1.133 = 0.495424$

$0.495424 \times 100 = 49.5\%$

**Answer to the second part. About 49.5% of the energy per token was the model doing arithmetic.
The other 50.5% was the card being powered on at all.**

**Which figure to quote.** Both, and say which one your conclusion rests on. The full $1.133$ is
right if the machine was switched on for this job. The marginal $0.5613$ is right if the machine
was going to be on anyway and you are deciding which model to point at it. A student with one
laptop is in the second situation.

**Check it.** The above-idle figure must always be smaller than the full figure, because you
subtracted something positive before dividing. $0.5613$ is smaller than $1.133$.

**Where this goes wrong.** Multiplying before subtracting:
$27.409 \times 4.9619 = 136.0007$, then $136.0007 - 13.834 = 122.1667$, then
$122.1667 \div 120 = 1.0181$ joules per token. That answer subtracts 13.834 **joules** from a
total, when 13.834 is a rate in watts. The brackets are in Formula 11 to stop exactly this. A
second way to catch it: the wrong answer is 90% of the full figure, which would say the card
draws almost nothing when idle, and the file says it draws 13.834 W.

---

**23.** *Which step up the size ladder buys more accuracy for the energy it costs?*

This is Formula 12 from Section 7.8,
$G = \bigl(A_{\text{big}} - A_{\text{small}}\bigr) \div \bigl(E_{\text{big}} \div E_{\text{small}}\bigr)$.
The top is a difference in percentage points. The bottom is a **ratio**, a number of times, with
no units. Percentage points and percent are not the same thing, and
[the toolkit keeps them apart](#toolkit-percentage-points).

Accuracies come from `lab/out/lab4_size_ladder.json` under the rotation-debiased procedure.
Energies come from `lab/out/theme_s_energy.json`.

**The first step, 0.5B to 1.5B.**

Step 1, the accuracy gained. $70.0 - 15.0 = 55.0$ percentage points.

Step 2, the energy multiple. $1.133344619 \div 0.767069464 = 1.4775$.

Step 3, divide. $55.0 \div 1.4775 = 37.2$ accuracy points per multiple of energy.

**The second step, 1.5B to 3B.**

Step 1, the accuracy gained. $95.0 - 70.0 = 25.0$ percentage points.

Step 2, the energy multiple. $1.940526248 \div 1.133344619 = 1.7122$.

Step 3, divide. $25.0 \div 1.7122 = 14.6$ accuracy points per multiple of energy.

**Compare the two.**

$37.2 \div 14.6 = 2.55$

**Answer. The first step scores $G = 37.2$ and the second scores $G = 14.6$, so the first step is
the better bargain by a factor of about 2.55.** The second helping of model costs more per token
and delivers less accuracy. That is diminishing returns, measured rather than asserted.

**If you used the printed three-decimal figures instead.** $1.133 \div 0.767 = 1.4772$ gives
$55.0 \div 1.4772 = 37.2$, and $1.941 \div 1.133 = 1.7132$ gives $25.0 \div 1.7132 = 14.6$. Same
answers to one decimal place. Rounding travels here and it does not change the conclusion.

**How far to trust this.** Not very far, and the chapter says so. Each accuracy came from
**twenty questions**. Chapter 13 compares the 1.5B and the 3B question by question and gets the
same 25.0-point gap with a 95% interval running from **5.5 points to 44.5 points**, and McNemar's
exact test on those twenty questions gives $p = 0.0625$, which does not clear 0.05
(`lab/out/we7_paired.json`). The 0.5B-to-1.5B step has no question-by-question comparison in this
course at all, so its 55 points carries no interval yet. Read the answer as "the first step is
much the better bargain", not as "37.2 against 14.6".

**Where this goes wrong.** Dividing by the energy **difference** instead of the energy
**ratio**. That gives $1.133 - 0.767 = 0.366$, then $55.0 \div 0.366 = 150.3$, a number with the
units "accuracy points per joule per token" rather than "accuracy points per multiple of energy".
Formula 12 has a fraction on the bottom on purpose: a ratio has no units, so $G$ is comparable
between the two steps. A difference in joules is not.

---

### Stretch

**25.** *What would blockwise quantization cost with blocks of 8 instead of 32, and is the smaller
block worth it?*

The arithmetic is Formula 7 and Formula 8 again, with $b = 4$, $b_{\text{scale}} = 16$ and
$B = 8$. The argument afterwards is the open part, and there is no single right answer to it.

**Step 1, work out each weight's share of its block's scale.**

$16 \div 8 = 2$ bits per weight

**Step 2, add the weight's own bits.**

$4 + 2 = 6$ bits per weight

**Step 3, turn bits into bytes.**

$6 \div 8 = 0.75$ bytes per weight

Check: $0.75 \times 8 = 6$.

**Step 4, size the whole 0.5B model.** Multiplying by $0.75$ is the same as multiplying by 3 and
dividing by 4.

$494{,}032{,}768 \times 3 = 1{,}482{,}098{,}304$

$1{,}482{,}098{,}304 \div 4 = 370{,}524{,}576$ bytes

$370{,}524{,}576 \div 1{,}000{,}000{,}000 = 0.371$ GB

**Answer to the computed parts. 6 bits per weight, 0.75 bytes per weight, and 0.371 GB for the
0.5B model**, against $4.5$ bits, $0.5625$ bytes and $0.278$ GB at $B = 32$. The file is
$0.371 \div 0.278 = 1.33$ times larger, a third more storage. The number of scales for the one
802,816-weight matrix goes from $802{,}816 \div 32 = 25{,}088$ to
$802{,}816 \div 8 = 100{,}352$.

**Arguing both sides.** A strong answer names a real benefit, a real cost, and the reason the
chapter's own table cannot settle it.

*For the smaller block.* The ruler is set by the largest weight sharing it, so a shorter block
means an outlier can spoil 7 neighbours instead of 31. The chapter measured that direction of
travel already: going from one ruler for 802,816 weights to one ruler per 32 dropped the 4-bit
error from 46.6% of the weights' spread to 7.2%. Going from 32 to 8 pushes the same lever again.

*Against the smaller block.* Six bits per weight is a large budget to be spending on 4-bit
weights. For $6 + 16 \div 32 = 6.5$ bits per weight, which is $6.5 \div 8 = 0.8125$ bytes and
$0.401$ GB, you could instead store **6-bit** weights with a 16-bit scale per 32, and the chapter
measured that scheme's error at **1.6%** of the spread. That is about 8% larger than the
$0.371$ GB scheme, and 1.6% is far better than the 7.2% that 4-bit blockwise gives at $B = 32$.
So the same storage budget spent on more **levels** may beat spending it on more **scales**. The
chapter's table does not tell you which wins, because it never measured 4 bits at $B = 8$.

*A cost the arithmetic hides.* Four times as many scales means four times as many extra numbers
to read while the model runs. The chapter measured storage and weight error. It did not measure
speed, and a scheme that is smaller on disk and slower to run may be a worse choice.

**What measurement would settle it.** Two, in order. First, run the chapter's Cell 8 with
`block_size = 8` and read the 4-bit mean error, then compare it against the 6-bit $B = 32$ row at
a matched bits-per-weight budget. That is a one-line change to code you already have, and it
turns the argument into a number. Second, and more important, measure **answer quality** on a
question bank rather than weight error, because everything in this chapter is about how far the
model's numbers moved and not about whether its answers changed. In this course that second
measurement is currently **[to be measured]**.

**Where this goes wrong.** Reporting $0.5$ bytes per weight for any "4-bit" scheme. That is the
cost with the scales left out, and a file with no scales cannot be decoded. It is also the slip
that makes smaller blocks look free: the whole difference between $B = 32$ and $B = 8$ lives in
the term people drop.

---

**27.** *Explain the difference between weight error and answer quality, then design an
experiment that would measure answer quality after quantization.*

This one asks for a written argument, so there is no single correct answer. What follows is what
a strong response contains, then one worked example of such a response.

**What a strong response contains.**

1. A clean statement of the two quantities. Weight error is measured on the model's insides: how
   far its stored numbers moved when they were rounded. Answer quality is measured on the model's
   outputs: how often it is right on a named test.
2. The reason they are not the same. Formula 5 averages over all 802,816 weights and treats every
   one of them as equally important. Nothing in this chapter established how much any particular
   weight matters to any particular answer. A weight error of 7.2% of the spread might change
   nothing a reader would notice, or it might change a great deal, and the chapter did not find
   out.
3. A concrete design: the same model, the same questions, the same scoring procedure, run twice,
   once at FP16 and once after 4-bit blockwise quantization, with the results paired question by
   question.
4. A number of questions, with a reason attached.
5. The analysis named in advance, and the fact that the two runs answer the same questions, which
   makes this a paired design.
6. A statement of what must be reported alongside the number: the scheme, the test, the number of
   questions and the scoring procedure.

**One worked example of such a response.**

> Quantization is measured in this chapter by how far the weights moved. At 4 bits with one scale
> per 32 weights, the mean move was 7.2% of the weights' standard deviation, from
> `lab/out/we3b_quant.json`. That is a fact about the model's numbers. It is not a fact about the
> model's answers. The two are connected, and this course has not measured the connection. A
> reader who sees "7.2% error" and concludes "the model is 92.8% as good" has invented a
> relationship that nobody has checked.
>
> Here is what I would run. Take one model. Score it on a fixed bank of multiple-choice
> questions, twice: once with the weights at FP16, once with the weights quantized to 4 bits
> blockwise. Use the same questions, in the same order, with the same scoring procedure both
> times. Record, for every question, whether each version got it right. That gives a paired
> table, which is the design Chapter 13 uses, and the analysis is McNemar's exact test on the
> questions where the two versions disagree.
>
> I would use at least 1,000 questions. Twenty is not enough, and this course shows why twice.
> Chapter 12 works out that a score of 25% on twenty questions carries a 95% confidence interval
> running from about 6% to 44%, and that the worst-case half-width at twenty questions is about
> 21.9 percentage points against about 3.1 points at a thousand. Chapter 13 shows that a
> 25-point gap on twenty questions gives McNemar's exact $p = 0.0625$, which does not reach
> significance. Miller (arXiv:2411.00640) recommends at least 1,000 questions for an evaluation
> to signal reliably, and that recommendation is this same arithmetic. If quantization costs a
> few points of accuracy, a twenty-question bank cannot see it at all.
>
> Whatever the result, I would report four things with it: the quantization scheme, not the bit
> count alone, because 4 bits gave 46.6% weight error one way and 7.2% the other; the name of the
> question bank; the number of questions; and the scoring procedure. Chapter 13 gets 15%, 25% and
> 35% out of one model on one twenty-question bank by changing only the scoring procedure, so a
> quality figure without a named procedure is not yet a number.

**Where this goes wrong.** The tempting move is to convert weight error into a quality claim, for
example "7.2% error means it keeps 92.8% of its ability". Nothing in this chapter licenses that
sentence. The honest position is that weight error is a good reason to go and measure quality,
and it is not a substitute for measuring it.

---

**29.** *Describe a situation in which the energy argument and the access argument would point at
different models.*

This is a written argument and there is more than one good answer. What follows is what a strong
response contains, then one worked example.

**What a strong response contains.**

1. A statement of why the two arguments agree on this course's measurements. Energy per token
   rises with model size, and memory needed rises with model size, so both rank the three models
   in the same order. The only question either one answers is where to cut the list, and on this
   hardware both cuts fall in the same place, at the 1.5B.
2. The recognition that the agreement is a **finding about these three models on this machine**,
   not a law. Two quantities that happen to rank the same way can be separated by changing what
   sets either ranking.
3. One specific situation, with the hardware or the measurement named, not a vague "it depends".
4. What you would do about it.

Four situations that all qualify, any one of which is enough:

- **Quantization moves one line and not the other.** The memory an argument is about is the
  memory of the stored weights, and quantization changes that directly. The energy per token was
  measured at FP16 and was not re-measured after quantizing.
- **Plenty of memory, tight power.** A machine with a large card and a hard power cap, or a
  device on a battery. Access says the largest model fits; energy says use the smallest model
  that does the job.
- **A bigger model that runs faster per token.** Energy per token is power divided by speed. A
  larger model that is better optimised for the hardware could produce tokens fast enough that
  its joules per token fall while its memory rises.
- **Different hardware from the lab machine.** Every energy figure in this chapter came from one
  laptop card with a 55 W cap and a 13.834 W idle draw. On hardware with a much larger idle draw,
  the per-token energies of the three models compress toward each other, and the energy argument
  stops separating them while the memory argument still does.

**One worked example of such a response.**

> The two arguments agree in this chapter because both of them are really about parameter count.
> More parameters means more bytes to hold and more arithmetic per token, so both the memory
> column and the joules-per-token column rise together, and a 4 GB card happens to cut the list
> at the same place the diminishing-returns arithmetic does.
>
> Quantization breaks that. The chapter's own Worked example 7.2 says the 3B model needs 6.172 GB
> at FP16 and $3{,}085{,}938{,}688 \times 0.5625 = 1{,}735{,}840{,}512$ bytes, which is 1.736 GB,
> at 4 bits with block scales. So on the same 4 GB card the access argument flips: the 3B now
> fits, with room to spare, and the student is no longer choosing between models, she is choosing
> which quantization to download. The energy argument does not flip with it. Formula 12 still
> says the 1.5B step bought 37.2 accuracy points per multiple of energy and the 3B step bought
> 14.6, and nothing in this chapter measured whether quantizing changes the joules per token at
> all. So access now says "the 3B is available" while energy still says "the step to the 3B was
> the worse bargain". They point at different models.
>
> What I would do is say which factor my decision rests on, out loud, and then measure the other
> one instead of borrowing a number. If the decision is about one student's laptop, access is the
> binding constraint and the energy difference over a semester is under seven watt-hours, which
> Worked example 7.3 computes. If the decision is about a service answering many requests, energy
> per token is what scales and access is not the question at all. And before quoting either, I
> would re-measure joules per token **on the quantized model**, because this chapter measured
> FP16 and quantization changes both how many bytes move and how the arithmetic is done.

**Where this goes wrong.** Answering "they would differ if the bigger model were more accurate",
which is not a difference between the two arguments at all; accuracy is the numerator of Formula
12 and it is already in the energy argument. The two arguments come apart when something changes
**memory without changing energy**, or **energy without changing memory**. Quantization, a power
cap, and a change of hardware each do one of those. A change in accuracy does not.

---

(answers-ch08)=
## Chapter 8. A sentence is an arrow

These problems drill two formulas and one habit: the length of a vector by Pythagoras, the dot
product of two vectors, and the habit of checking the sign and the size of a dot product before
you read any meaning into it.

### Warm-up

**1.** *Asked:* name the point that sits 7 to the right of the origin and 2 below it.

This tests the ordered pair, Definition 8.3 in [Chapter 8](../ch/ch08.md), and the rule that the
first number is the across move and the second is the up move. If naming a spot with two numbers
is still new, [Toolkit 14](math-toolkit.md#toolkit-vectors) builds it from nothing.

Step 1, handle the first number. The first number says how far across. Right is the positive
direction, and the point is 7 to the right, so the first number is $7$.

Step 2, handle the second number. The second number says how far up. Down is the negative
direction, and the point is 2 below, so the second number is $-2$.

Step 3, write them inside brackets, across first.

$$(7,\; -2)$$

**Answer.** $(7, -2)$. The two numbers are grid steps, and they carry no other unit.

**Where this goes wrong.** Two wrong answers are tempting. $(7, 2)$ drops the minus sign and
names a point above the origin instead of below it. $(-2, 7)$ writes the numbers in the wrong
order and names a completely different spot, 2 to the left and 7 up. The order in the pair is
information, not decoration.

---

**3.** *Asked:* compute $\lVert \mathbf{u} \rVert$ for $\mathbf{u} = (6, 8)$, showing the
squaring, the addition and the square root as three separate lines.

This is Formula 8.2, the length of a two-dimensional vector, also stated in
[the formula summary](formulas.md). Square each number, add the squares, take the square root.

Step 1, square the first number.
$$6^{2} = 6 \times 6 = 36$$

Step 2, square the second number.
$$8^{2} = 8 \times 8 = 64$$

Step 3, add the two squares.
$$36 + 64 = 100$$

Step 4, take the square root of the total.
$$\sqrt{100} = 10 \quad \text{because} \quad 10 \times 10 = 100$$

**Answer.** $\lVert \mathbf{u} \rVert = 10$. It is a plain number of grid steps, with no other
unit attached.

**Check it.** A length must be at least as big as the biggest coordinate. Here 10 is bigger than
8, so the answer survives that test.

**Where this goes wrong.** The tempting wrong answer is $6 + 8 = 14$. That is the length of the
walk, 6 blocks across and then 8 blocks up. The arrow is the straight line back to the start, and
a straight line is always shorter than a route with a corner in it. If your answer equals the sum
of the coordinates, you added where you should have squared.

---

**5.** *Asked:* compute $\lVert \mathbf{u} \rVert$ for $\mathbf{u} = (-3, -4)$, and say what the
two minus signs do to the answer.

Formula 8.2 again. The new part is a negative number inside a square.
[Toolkit 5](math-toolkit.md#toolkit-exponents) covers what the raised 2 means.

Step 1, square the first number. A negative times a negative is a positive.
$$(-3)^{2} = (-3) \times (-3) = 9$$

Step 2, square the second number, the same way.
$$(-4)^{2} = (-4) \times (-4) = 16$$

Step 3, add the two squares.
$$9 + 16 = 25$$

Step 4, take the square root.
$$\sqrt{25} = 5 \quad \text{because} \quad 5 \times 5 = 25$$

**Answer.** $\lVert \mathbf{u} \rVert = 5$, a plain number of grid steps.

**What the two minus signs do.** Nothing at all to the length. They change where the arrow
points. $(-3, -4)$ points down and to the left, while $(3, 4)$ points up and to the right, and the
two arrows reach exactly as far from the origin as each other. Squaring removes every minus sign,
so direction is thrown away at step 1 and only size survives.

**Where this goes wrong.** The common slip is writing $(-3)^2 = -9$ and $(-4)^2 = -16$. Then the
sum is $-9 + (-16) = -25$, and you are asked for the square root of a negative number, which has
no answer here. That failure is useful. A sum of squares can never come out negative, so a
negative total tells you a minus sign was kept that should have cancelled.

---

**7.** *Asked:* compute $\mathbf{p} \cdot \mathbf{q}$ for $\mathbf{p} = (1, 0)$ and
$\mathbf{q} = (0, 1)$, then say in one sentence what the answer means about the two arrows.

This is Formula 8.4, the dot product in two dimensions. Multiply matching coordinates, add the
results.

Step 1, write down the matching pairs, so nothing gets crossed over.
$p_1 = 1$ pairs with $q_1 = 0$.
$p_2 = 0$ pairs with $q_2 = 1$.

Step 2, multiply the first pair.
$$p_1 q_1 = 1 \times 0 = 0$$

Step 3, multiply the second pair.
$$p_2 q_2 = 0 \times 1 = 0$$

Step 4, add the two products.
$$0 + 0 = 0$$

**Answer.** $\mathbf{p} \cdot \mathbf{q} = 0$. A dot product is a scalar, one plain number, with
no unit.

**What it means.** A dot product of exactly 0 says the two arrows meet at a right angle, so they
share no direction at all. That is Definition 8.9 in [Chapter 8](../ch/ch08.md): perpendicular,
also called orthogonal. You can see it here without any arithmetic. $\mathbf{p} = (1,0)$ points
straight along the x-axis and $\mathbf{q} = (0,1)$ points straight up the y-axis, and the two axes
cross at a square corner by construction.

**Where this goes wrong.** The tempting wrong answer is 2, which comes from adding all four
numbers, $1 + 0 + 0 + 1$. The dot product multiplies first and adds second. A zero in one vector
deletes whatever the other vector held at that position, which is why both products here came out
as nothing.

---

**9.** *Asked:* compute $\mathbf{v} \cdot \mathbf{v}$ for $\mathbf{v} = (2, 3)$, then compute
$\lVert \mathbf{v} \rVert$ and square it, and confirm that Formula 8.6 holds.

Formula 8.6 says $\mathbf{a} \cdot \mathbf{a} = \lVert \mathbf{a} \rVert^{2}$. The two sides are
computed separately below, by two different recipes, so you can watch them meet.

**The left-hand side, by the dot product recipe, with $\mathbf{v}$ in both slots.**

Step 1, multiply the first pair. $v_1 \times v_1 = 2 \times 2 = 4$.

Step 2, multiply the second pair. $v_2 \times v_2 = 3 \times 3 = 9$.

Step 3, add the two products. $4 + 9 = 13$.

So $\mathbf{v} \cdot \mathbf{v} = 13$.

**The right-hand side, by the length recipe followed by a squaring.**

Step 1, square each number. $2^{2} = 4$ and $3^{2} = 9$.

Step 2, add the squares. $4 + 9 = 13$.

Step 3, take the square root. $\sqrt{13} = 3.605551$ to six decimal places. This one does not land
on a whole number, and that is fine.

Step 4, square that length. $3.605551 \times 3.605551 = 12.999998$.

**Answer.** $\mathbf{v} \cdot \mathbf{v} = 13$ and $\lVert \mathbf{v} \rVert^{2} = 13$. Both sides
are 13, so Formula 8.6 holds. Both are plain numbers with no unit.

**About that 12.999998.** The two sides are equal exactly. The 12.999998 appeared because
$\sqrt{13}$ was rounded to six decimal places before it was squared, and a rounded number squared
gives a rounded answer. Taking a square root and then squaring undoes itself, so $(\sqrt{13})^{2}$
is 13 with nothing left over. Keep every digit your calculator holds instead of typing 3.605551
back in, and you will watch it land on 13.

**Where this goes wrong.** Rounding too early and rounding too hard. A student who writes
$\sqrt{13} \approx 3.6$ and then squares gets $3.6 \times 3.6 = 12.96$, which is far enough from
13 to look like a real disagreement. Round once, at the end. The other slip is reporting
$\sqrt{13}$ as the answer to $\mathbf{v} \cdot \mathbf{v}$. A vector dotted with itself gives the
length **squared**, which is 13, not the length, which is 3.605551.

---

### Practice

**11.** *Asked:* normalise $\mathbf{u} = (0, 5)$ using Formula 8.7, then verify that the length of
your answer is exactly 1.

Formula 8.7 says: divide every number in the list by the length of the whole list. The result is
a **unit vector**, a vector whose length is exactly 1, pointing the same way. The fraction bar
means divide, which is [Toolkit 4](math-toolkit.md#toolkit-fraction-bar).

Step 1, find the length of $\mathbf{u}$ first, with Formula 8.2. You cannot divide by a length you
have not computed.
$$0^{2} = 0 \times 0 = 0$$
$$5^{2} = 5 \times 5 = 25$$
$$0 + 25 = 25$$
$$\sqrt{25} = 5$$
So $\lVert \mathbf{u} \rVert = 5$.

Step 2, divide the first number by that length.
$$\frac{0}{5} = 0$$

Step 3, divide the second number by the same length.
$$\frac{5}{5} = 1$$

Step 4, write the answer.
$$\hat{\mathbf{u}} = (0,\; 1)$$

**Verify the length is 1.**

Step 1, square the first number. $0^{2} = 0 \times 0 = 0$.

Step 2, square the second number. $1^{2} = 1 \times 1 = 1$.

Step 3, add them. $0 + 1 = 1$.

Step 4, take the square root. $\sqrt{1} = 1$.

**Answer.** $\hat{\mathbf{u}} = (0, 1)$, and its length is exactly 1. Coordinates and lengths here
are plain numbers with no unit.

**Reading it.** $(0,5)$ was already pointing straight up. Normalising did not turn it. It
shortened the reach to 1 and left the direction alone, which is the whole job of normalising.

**Where this goes wrong.** Dividing by the sum of squares, 25, instead of by its square root, 5.
That gives $(0 \div 25,\; 5 \div 25) = (0,\; 0.2)$, whose length is 0.2 rather than 1. The
verification step is what catches it. If the length of your answer is not 1, you divided by the
wrong number, and the usual culprit is the sum of squares.

---

**13.** *Asked:* find a vector perpendicular to $(7, -2)$, prove it with a dot product, then find
a second, different perpendicular vector.

The recipe from section 8.5 is: swap the two coordinates, then flip the sign of one of them. That
turns the arrow by a quarter turn. The proof is Definition 8.9 in [Chapter 8](../ch/ch08.md): two
vectors are perpendicular exactly when their dot product is 0.

**The first answer.**

Step 1, swap the two coordinates of $(7, -2)$. Swapping gives $(-2,\; 7)$.

Step 2, flip the sign of the first of those. $-2$ becomes $2$, so the candidate is $(2,\; 7)$.

Step 3, prove it. Multiply the first pair.
$$7 \times 2 = 14$$

Step 4, multiply the second pair.
$$(-2) \times 7 = -14$$

Step 5, add the two products.
$$14 + (-14) = 14 - 14 = 0$$

The dot product is 0, so $(2, 7)$ is perpendicular to $(7, -2)$.

**The second answer.** Go back to the swapped pair $(-2,\; 7)$ and flip the other sign instead.
Flipping the 7 gives $(-2,\; -7)$.

Step 1, multiply the first pair. $7 \times (-2) = -14$.

Step 2, multiply the second pair. $(-2) \times (-7) = 14$. A negative times a negative is a
positive.

Step 3, add the two products. $-14 + 14 = 0$.

The dot product is 0, so $(-2, -7)$ is perpendicular as well.

**Answer.** $(2, 7)$ and $(-2, -7)$ are both perpendicular to $(7, -2)$. They are the two quarter
turns, one anticlockwise and one clockwise, and they point opposite ways to each other.

**Where this goes wrong.** Two traps. Flipping **both** signs after the swap gives $(2, -7)$, and
$7 \times 2 + (-2) \times (-7) = 14 + 14 = 28$, which is not 0. Flipping one sign is a quarter
turn. Flipping both adds a half turn on top, and a half turn destroys the right angle. The second
trap is flipping both signs of the original without swapping at all, which gives $(-7, 2)$. Then
$7 \times (-7) + (-2) \times 2 = -49 + (-4) = -53$, a large negative number. $(-7, 2)$ is the same
arrow reversed, pointing 180 degrees away, not 90. Always finish with the dot product. It settles
the question in three lines.

---

**15.** *Asked:* a vector $\mathbf{g}$ has $\lVert \mathbf{g} \rVert = 5$. Every number in
$\mathbf{g}$ is multiplied by 3, giving a new vector $\mathbf{h}$. State $\lVert \mathbf{h} \rVert$
without knowing $\mathbf{g}$'s numbers, and explain how you know.

This asks you to reason through Formula 8.3 rather than to plug numbers into it. It is also the
point section 8.5 keeps circling: a vector's length and its direction are two separate things, and
stretching an arrow changes only one of them.

Step 1, what happens to one number. If a number is multiplied by 3, its square is multiplied by
$3 \times 3 = 9$. For instance $4 \times 4 = 16$, and $12 \times 12 = 144$, and
$144 \div 16 = 9$.

Step 2, what happens to the sum of squares. Every square grew by the same factor of 9, so the
total grew by 9 too. Call the old sum of squares $S$. The new one is $9 \times S$.

Step 3, find $S$. The old length was $\sqrt{S} = 5$, so $S = 5 \times 5 = 25$.

Step 4, take the new square root.
$$\sqrt{9 \times 25} = \sqrt{225} = 15 \quad \text{because} \quad 15 \times 15 = 225$$

Step 5, state it as a rule you can reuse.
$\sqrt{9 \times S} = \sqrt{9} \times \sqrt{S} = 3 \times \sqrt{S}$. Multiplying every number in a
vector by 3 multiplies its length by 3, and $3 \times 5 = 15$.

**Answer.** $\lVert \mathbf{h} \rVert = 15$, a plain number with no unit.

**Check it on a case you can see.** Take $\mathbf{g} = (3, 4)$, whose length is
$\sqrt{9 + 16} = \sqrt{25} = 5$. Tripling gives $\mathbf{h} = (9, 12)$. Then $9^2 = 81$,
$12^2 = 144$, $81 + 144 = 225$, and $\sqrt{225} = 15$. It works for longer lists too. The
four-number vector $(1, 2, 2, 4)$ from section 8.3 has length 5, and tripling it to
$(3, 6, 6, 12)$ gives length 15. The answer does not depend on which vector of length 5 you
started from, which is why the problem can be answered without the numbers.

**Where this goes wrong.** The tempting wrong answer is $5 + 3 = 8$, from reading "multiplied by
3" as "3 more". The other wrong answer is $5 \times 9 = 45$, from applying the factor 9 to the
length instead of to the sum of squares. The 9 lives under the square root, and the square root
turns it back into a 3 before it ever reaches the length.

---

**17.** *Asked:* open `lab/out/we5_embeddings.json`, read the similarity matrix value at row 0,
column 3 and at row 3, column 0, and explain why they are the same.

Row 0 is "The cat sat on the mat." Row 3 is "Kern County's largest city is Bakersfield." The
sentence list sits in the same file under the key `sentences`, in the order the chapter prints
them. Count rows from 0, because that is how the file is indexed.

**The two values.**

Row 0, column 3: **0.071562**.

Row 3, column 0: **0.071562**.

The file stores more digits than that. The exact stored number is 0.07156167924404144 in both
cells, and this book prints six decimal places throughout, so it shows as 0.071562. The two cells
match digit for digit, all the way down.

**Why they are the same.** Both cells hold the same dot product, computed from the same two rows
of 384 numbers. The chapter states this as the second check under Formula 8.4: swapping the two
vectors can never change a dot product. Here is the reason in one line. At every position $i$ the
sum picks up $a_i b_i$ one way round and $b_i a_i$ the other way round, and ordinary
multiplication gives the same product either way. $3 \times 4$ and $4 \times 3$ are both 12. All
384 contributions match, so the two totals match.

**Answer.** Both cells read 0.071562. They are equal because the dot product does not depend on
which vector you write first, which makes the whole 6 by 6 grid a mirror image of itself across
its diagonal.

**Where this goes wrong.** It feels as though "how much does the cat sentence resemble the
Bakersfield sentence?" and "how much does the Bakersfield sentence resemble the cat sentence?"
could have different answers, because the word "resembles" behaves that way in conversation. This
measure has no such asymmetry. If you read two different numbers out of those two cells, you
looked at the wrong cell, and the usual cause is counting rows from 1 instead of from 0.

---

**19.** *Asked:* state how many multiplications and how many additions one dot product needs when
$D = 384$, then when $D = 2$, and say what stayed the same.

This is Formula 8.5 read as a count of operations rather than as a number. $D$ is the dimension,
which is how many numbers each list holds. The sigma symbol is
[Toolkit 10](math-toolkit.md#toolkit-sigma).

**With $D = 384$.**

Step 1, count the multiplications. There is one multiplication at each position, and there are 384
positions. That is **384 multiplications**.

Step 2, count the additions. You now hold 384 products and you need one total. The first product
starts the running total and is not added to anything. Every product after the first costs one
addition. $384 - 1 = 383$. That is **383 additions**.

**With $D = 2$.**

Step 1, count the multiplications. One per position, and there are 2 positions. That is
**2 multiplications**.

Step 2, count the additions. $2 - 1 = 1$. That is **1 addition**.

**Answer.** $D = 384$ needs 384 multiplications and 383 additions. $D = 2$ needs 2 multiplications
and 1 addition. These are counts of operations, so the units are "multiplications" and
"additions".

**What stayed the same.** The recipe and the rule. In both cases you multiply the two numbers you
find at each position, then add every product into one running total. In both cases the counts are
$D$ multiplications and $D - 1$ additions. Formula 8.5 is written with $D$ left open for exactly
this reason. Nothing about the method changed between the graph paper case and the sentence case.
Only the amount of it changed, which is why one is homework and the other is a computer's job.

**Where this goes wrong.** Answering 384 additions. That counts an addition for the first product
as well, as though a zero were sitting there waiting to be added to. There is one, in the Python
code, because the running total starts at 0. On paper you write the first product down and start
adding from the second, so the count is 383. When the question asks for a count in general, the
answer to give is $D - 1$.

---

### Stretch

**21.** *Asked:* invent two two-dimensional vectors whose dot product is negative, with neither
vector containing a zero. Draw them roughly. Then say in one sentence what a negative dot product
would mean if these were two sentences.

This has many correct answers, so there is no single pair to match against. Here is what a strong
response contains, and then one worked example of such a response.

**What a strong response contains.**

1. Two vectors, each with two numbers, and no zero anywhere in either of them.
2. The two products written out separately, then the addition, with the values shown.
3. A final answer that is genuinely negative.
4. A rough sketch with both arrows drawn from the origin, opening wider than a square corner.
5. One sentence about meaning that does not overclaim. A negative score says the two arrows lean
   apart. It does not say the two sentences contradict each other.

**A worked example of such a response.**

Take $\mathbf{a} = (3, 2)$ and $\mathbf{b} = (-4, 1)$. Neither one has a zero in it.

Step 1, multiply the first pair. $3 \times (-4) = -12$. A positive times a negative is a negative.

Step 2, multiply the second pair. $2 \times 1 = 2$.

Step 3, add the two products. $-12 + 2 = -10$.

So $\mathbf{a} \cdot \mathbf{b} = -10$, which is negative.

**The sketch.** $\mathbf{a} = (3,2)$ goes 3 right and 2 up, so it points right and a little above
the horizontal. $\mathbf{b} = (-4,1)$ goes 4 left and 1 up, so it points left and a little above
the horizontal. The two arrows open away from each other, wider than a square corner. Their
lengths, if you want them, are $\sqrt{9+4} = \sqrt{13} = 3.605551$ and
$\sqrt{16+1} = \sqrt{17} = 4.123106$.

**Why it came out negative.** The first coordinates disagreed strongly, one going right and one
going left, and they contributed $-12$. The second coordinates agreed, both going up, and they
contributed only $+2$. The disagreement was the larger of the two, so the total landed below zero.
That is the way to build one on purpose: make the first coordinates disagree by a lot and the
second coordinates agree by a little.

**The sentence about meaning.** If these were two sentences, a negative score would say the model
found no shared direction between them and a small amount of active opposition, which in practice
reads as "these two texts have nothing to do with each other".

**Where this goes wrong.** Inventing a pair and not checking it. $\mathbf{a} = (3,2)$ with
$\mathbf{b} = (-1, 4)$ looks as though it should be negative, because $\mathbf{b}$ carries a minus
sign and points left. But $3 \times (-1) = -3$ and $2 \times 4 = 8$, and $-3 + 8 = 5$, which is
positive. One minus sign is not enough. The negative contribution has to outweigh the positive
one. Do the arithmetic before you commit to the answer.

---

**23.** *Asked:* a classmate says "384 dimensions means the model has worked out 384 different
facts about each sentence." Write a reply of three or four sentences saying what is wrong with
that claim and what would be more accurate.

This is a written argument, so there is no single right paragraph. Here is what a strong reply
contains, and then one worked example of such a reply.

**What a strong reply contains.**

1. The correct meaning of the word. "Dimension" counts how many numbers are in the list, and
   nothing more. That is Definition 8.5 in [Chapter 8](../ch/ch08.md).
2. The point that no individual number carries a meaning on its own. There is no column for "is
   about cats" and no column for "mentions a county", and reading number 57 by itself tells you
   nothing.
3. Why that is so. The 384 numbers came out of a training process, and nobody hand-designed a list
   of 384 features for the model to fill in.
4. What is accurate instead. The meaning lives in the whole pattern, so the only useful question
   is a comparison between two whole patterns, and the dot product is what performs that
   comparison.
5. A fair note on where the classmate's instinct is not silly. Four numbers really can describe a
   day in Kern County, one each for temperature, humidity, wind and air quality, and that is a
   genuine case of one number per fact. The mistake is assuming an embedding was built that way.

**A worked example of such a reply.**

> "Dimension" only counts how many numbers are in the list, so 384 dimensions means 384 numbers
> per sentence and nothing more than that. None of those numbers has a job of its own. There is no
> slot for "is about cats", and reading number 57 on its own teaches you nothing, because the
> model was never handed a list of features to fill in. A more accurate way to say it is that the
> sentence is stored as one pattern of 384 numbers, and the pattern becomes useful only when you
> compare it against another pattern, which is what the dot product does.

**Where this goes wrong.** Two failures, in opposite directions. The first is agreeing with the
classmate, because "384 facts" sounds impressive and specific. The second is overcorrecting into
"the numbers are meaningless", which is also false. The numbers carry a great deal of meaning
together, which is how "The cat sat on the mat." and "A kitten rested on the rug." scored 0.612421
while sharing no content words at all (`lab/out/we5_embeddings.json`, similarity matrix, row 0,
column 1). Meaning is present. It is spread across the whole list rather than parcelled out one
fact per number.

---

**25.** *Asked:* the embedding model in this chapter holds 22,713,216 parameters
(`lab/out/appendix_python_reference_checks.json`, key `embed`) and `bge-small-en-v1.5` holds
33,360,000 (`_research/00-lab-verified-findings.md`, section 11). Compute the ratio of the larger
to the smaller, to two decimal places. Then say in two sentences why a course about access and
resource cost cares about a ratio like that.

A **ratio** is one number divided by another. It has no units, because the units cancel:
parameters divided by parameters leaves a plain number.
[Toolkit 16](math-toolkit.md#toolkit-rounding) covers rounding to two decimal places.

Step 1, decide which number is larger. $33{,}360{,}000$ is larger than $22{,}713{,}216$, so it
goes on top.

Step 2, subtract first, as a rough check on the division to come.
$$33{,}360{,}000 - 22{,}713{,}216 = 10{,}646{,}784$$
The extra piece is a little under half the size of the smaller model, so the ratio should land
somewhere near 1.5. An answer far from that means a typing slip.

Step 3, do the division.
$$33{,}360{,}000 \div 22{,}713{,}216 = 1.468748\ldots$$

Step 4, round to two decimal places. The digit in the third decimal place is 8, which is 5 or
more, so the second decimal place rounds up from 6 to 7.
$$1.468748 \rightarrow 1.47$$

**Answer.** The ratio is **1.47**, a plain number with no units. `bge-small-en-v1.5` holds 1.47
times as many parameters as `all-MiniLM-L6-v2`.

**Cross-check.** Section 11 of `_research/00-lab-verified-findings.md` records the same figure,
"a factor of 1.47", for the same two models.

**Two sentences on why the course cares.** A model 1.47 times larger is a small price in memory
and download size, and in the Chapter 10 retrieval work that small step took the system from
getting 3 of 6 questions right to getting 6 of 6 right, on the same machine, with the same chunks
and the same questions. Access is what makes that matter: a fix costing 1.47 times is within reach
of a student on a five-year-old laptop, while a fix costing 21.75 times, which is what
`Qwen2.5-0.5B-Instruct` costs against this embedding model
($494{,}032{,}768 \div 22{,}713{,}216 = 21.75$), starts to be available only to people who can pay
for hardware.

**Where this goes wrong.** Dividing the other way round gives
$22{,}713{,}216 \div 33{,}360{,}000 = 0.68$, which is a correct number answering a different
question. The problem asked for larger over smaller, so the answer has to be bigger than 1. The
second slip is in the words rather than the arithmetic. A ratio of 1.47 means bge is **47 per cent
larger**, not 147 per cent larger. A ratio of 1.47 and an increase of 47 per cent are the same
statement, and "147 per cent bigger" more than triples the claim.

---

(answers-ch09)=
## Chapter 9. Similarity is geometry

These problems drill one habit: build a similarity out of three separate pieces, the dot
product, the two lengths, and the division that removes length from the answer, and then read
the result on a fixed scale from $-1$ to $1$ without reading more into it than it can carry.

Chapter 9 has 28 practice problems. The 14 odd-numbered ones are solved below.

### Warm-up

**1.** *Asked:* the dot product of $(1, 2)$ and $(3, 4)$.

This tests [Formula 9.1, the dot product](../ch/ch09.md#worked-9-1). The rule is: multiply the
matching coordinates, then add the products. Two symbols written next to each other mean
multiply; see [Math Toolkit section 3](math-toolkit.md#toolkit-multiplication).

Step 1, line the two lists up. The first number of one sits above the first number of the other.

$a_1 = 1$ sits above $b_1 = 3$. $a_2 = 2$ sits above $b_2 = 4$.

Step 2, multiply the first pair.

$$1 \times 3 = 3$$

Step 3, multiply the second pair.

$$2 \times 4 = 8$$

Step 4, add the two products.

$$3 + 8 = 11$$

**Answer.** $\mathbf{a} \cdot \mathbf{b} = 11$. A dot product is a plain number with no units.

**Where this goes wrong.** The tempting wrong answer is **10**, from pairing 1 with 4 and 2 with
3. That happens when you read the two vectors across the page instead of stacking them, so the
first number of one meets the *last* number of the other. Position has to meet the same
position. The other wrong answer is the list $(3, 8)$, which means you did the multiplications
and stopped before the addition. A dot product is always one number, never a list.

---

**3.** *Asked:* the length of $(6, 8)$.

This tests [Formula 9.2, the length of a vector](../ch/ch09.md#worked-9-2). Square each
coordinate, add the squares, take the square root. The raised 2 is
[Math Toolkit section 5](math-toolkit.md#toolkit-exponents) and the root sign is
[Math Toolkit section 9](math-toolkit.md#toolkit-square-roots).

Step 1, square each coordinate.

$$6^2 = 6 \times 6 = 36$$
$$8^2 = 8 \times 8 = 64$$

Step 2, add the squares.

$$36 + 64 = 100$$

Step 3, take the square root.

$$\sqrt{100} = 10$$

**Answer.** $\lVert \mathbf{d} \rVert = 10$ units of length. This value is recorded as `len_d`
in `lab/out/appendix_formulas_checks.json`, so you can check it against the file.

**Where this goes wrong.** The tempting wrong answer is **100**, from stopping after Step 2.
That is Common Mistake 1 in the chapter, and it is tempting because 100 is a satisfying round
number and the last step feels optional. Catch it by picturing the arrow. It goes 6 units across
and 8 units up. Nothing that short can be 100 units long. A second wrong answer is **14**, from
adding $6 + 8$ and never squaring anything at all.

---

**5.** *Asked:* the length of $(0, 5)$.

Same formula as problem 3, [Formula 9.2](../ch/ch09.md#worked-9-2), with a zero in it.

Step 1, square each coordinate.

$$0^2 = 0 \times 0 = 0$$
$$5^2 = 5 \times 5 = 25$$

Step 2, add the squares.

$$0 + 25 = 25$$

Step 3, take the square root.

$$\sqrt{25} = 5$$

**Answer.** $\lVert \mathbf{v} \rVert = 5$ units of length. That fits the picture: the arrow
goes 0 units across and 5 units up, so it points straight up and it is 5 units long.

**Where this goes wrong.** Some people expect the zero to wipe out the answer and write **0**.
That is multiplication thinking applied to an addition. Zero multiplied into something destroys
it; zero *added* to something changes nothing. Here the zero is added, at Step 2, so it changes
nothing. The other wrong answer is **25**, the missing square root again.

---

**7.** *Asked:* the cosine similarity of $(1, 0)$ and $(0, 1)$.

This tests [Formula 9.3, cosine similarity](../ch/ch09.md#worked-9-4), which is the dot product
divided by both lengths. Five steps, and the chapter numbers them the same way.

Step 1, the dot product, by Formula 9.1.

$$1 \times 0 = 0$$
$$0 \times 1 = 0$$
$$0 + 0 = 0$$

$$\mathbf{u} \cdot \mathbf{v} = 0$$

Step 2, the length of $\mathbf{u} = (1, 0)$, by Formula 9.2.

$$1^2 = 1, \qquad 0^2 = 0, \qquad 1 + 0 = 1, \qquad \sqrt{1} = 1$$

Step 3, the length of $\mathbf{v} = (0, 1)$.

$$0^2 = 0, \qquad 1^2 = 1, \qquad 0 + 1 = 1, \qquad \sqrt{1} = 1$$

Step 4, multiply the two lengths.

$$1 \times 1 = 1$$

Step 5, divide the dot product by that product.

$$0 \div 1 = 0$$

**Answer.** $\cos(\mathbf{u}, \mathbf{v}) = 0.0000$. The two arrows are **orthogonal**, which is
Definition 9.5 in the chapter, and the everyday word is perpendicular. Turn it into an angle
with [Formula 9.5](../ch/ch09.md#worked-9-6) and you get $\arccos(0) = 90.00$ degrees, a square
corner. That matches the picture: one arrow points along the across-direction and the other
points straight up.

**Where this goes wrong.** Two traps here. The first is expecting a positive answer because both
vectors contain a 1. The two 1s never meet, because they sit in different positions, and the dot
product only multiplies matching positions. The second is reading 0 as "a little bit similar" or
"no information". Zero is not a small amount of similarity. It is the fence between leaning the
same way and leaning opposite ways, and the chapter says so in Worked Example 9.4.

---

**9.** *Asked:* the cosine similarity of $(1, 2)$ and $(2, 4)$.

Look at the two vectors before computing anything. $2 = 2 \times 1$ and $4 = 2 \times 2$, so
$(2, 4)$ is $(1, 2)$ doubled. [Formula 9.4](../ch/ch09.md#worked-9-5) says that scaling by a
positive number gives a cosine of exactly 1, so the answer should be 1.0000. Here is the
arithmetic that confirms it.

Step 1, the dot product.

$$1 \times 2 = 2$$
$$2 \times 4 = 8$$
$$2 + 8 = 10$$

Step 2, the length of $(1, 2)$.

$$1^2 = 1, \qquad 2^2 = 4, \qquad 1 + 4 = 5, \qquad \sqrt{5} = 2.236068$$

That square root does not stop, so it is written to six decimal places here. See
[Math Toolkit section 16](math-toolkit.md#toolkit-rounding).

Step 3, the length of $(2, 4)$.

$$2^2 = 4, \qquad 4^2 = 16, \qquad 4 + 16 = 20, \qquad \sqrt{20} = 4.472136$$

Step 4, multiply the two lengths.

$$2.236068 \times 4.472136 = 10.000000$$

to six decimal places. The exact value is 10, because $\sqrt{5} \times \sqrt{20} = \sqrt{100}$.

Step 5, divide.

$$10 \div 10.000000 = 1.000000$$

**Answer.** $\cos = 1.0000$. The two arrows point in exactly the same direction. The angle is
$\arccos(1) = 0.00$ degrees.

**Where this goes wrong.** The tempting wrong answer is **10**, which is the dot product reported
as if it were the similarity. The dot product is Step 1 of five, not the answer. A second slip is
writing "about 1" or 0.9999 because the square roots were rounded. The exact answer is 1, not
nearly 1, and the reason is that the top and the bottom of the fraction are the same number. Any
wobble in your last digits came from rounding $\sqrt{5}$ and $\sqrt{20}$, not from the formula.

---

### Practice

**11.** *Asked:* the cosine similarity of $(2, 1)$ and $(1, 2)$, with all five steps shown.

This is [Formula 9.3](../ch/ch09.md#worked-9-3) with a pair that has a useful feature: the same
two numbers appear in both vectors, in the opposite order, so the two lengths must come out
equal.

Step 1, the dot product.

$$2 \times 1 = 2$$
$$1 \times 2 = 2$$
$$2 + 2 = 4$$

$$\mathbf{a} \cdot \mathbf{b} = 4$$

Step 2, the length of $(2, 1)$.

$$2^2 = 4, \qquad 1^2 = 1, \qquad 4 + 1 = 5, \qquad \sqrt{5} = 2.236068$$

Step 3, the length of $(1, 2)$.

$$1^2 = 1, \qquad 2^2 = 4, \qquad 1 + 4 = 5, \qquad \sqrt{5} = 2.236068$$

The two lengths match, as predicted.

Step 4, multiply the two lengths.

$$2.236068 \times 2.236068 = 5.000000$$

to six decimal places. The exact value is 5, because a square root multiplied by itself gives
back what was under the root.

Step 5, divide.

$$4 \div 5 = 0.8$$

**Answer.** $\cos(\mathbf{a}, \mathbf{b}) = 0.8000$. The angle, by
[Formula 9.5](../ch/ch09.md#worked-9-6), is $\arccos(0.8) = 36.87$ degrees.

**Check.** The answer sits between $-1$ and $1$, so the shape is right. It is well above 0 and
below 1, which fits two arrows that lean the same general way without lining up.

**Where this goes wrong.** The tempting wrong answer is **1.7889**, from
$4 \div 2.236068$, dividing by one length instead of both. That is Common Mistake 2, and it is
tempting because the fraction bar in $\frac{\mathbf{a} \cdot \mathbf{b}}{\lVert \mathbf{a} \rVert \, \lVert \mathbf{b} \rVert}$
has two things underneath it and it is easy to use one. Catch it with the range check: 1.7889 is
bigger than 1, and no cosine similarity is ever bigger than 1.

---

**13.** *Asked:* scale $(2, 5)$ by $k = 4$; give the new vector, its length, and its cosine
similarity with the original; predict all three first.

This tests [Formula 9.4, scaling](../ch/ch09.md#worked-9-5), and Definition 9.6 in the chapter.

**The three predictions, before any arithmetic.**

1. The new vector is every coordinate multiplied by 4.
2. The new length is 4 times the old length, because Formula 9.4 says
   $\lVert k\mathbf{a} \rVert = k \, \lVert \mathbf{a} \rVert$.
3. The cosine is exactly 1.0000, because $k = 4$ is positive and a positive scaling does not turn
   the arrow at all.

**Now the arithmetic.**

Step 1, build the scaled vector.

$$4 \times 2 = 8$$
$$4 \times 5 = 20$$

$$4\mathbf{a} = (8,\; 20)$$

Step 2, the length of the original $(2, 5)$.

$$2^2 = 4, \qquad 5^2 = 25, \qquad 4 + 25 = 29, \qquad \sqrt{29} = 5.385165$$

to six decimal places.

Step 3, the length of $(8, 20)$, computed directly.

$$8^2 = 64, \qquad 20^2 = 400, \qquad 64 + 400 = 464, \qquad \sqrt{464} = 21.540659$$

to six decimal places. Prediction 2 said the answer should be $4 \times 5.385165 = 21.540660$.
The direct route gives 21.540659. Those differ by one in the sixth decimal place, and that
difference is the rounding of $\sqrt{29}$ coming back out. It is not an error in either route.

Step 4, the dot product of $(2, 5)$ with $(8, 20)$.

$$2 \times 8 = 16$$
$$5 \times 20 = 100$$
$$16 + 100 = 116$$

Step 5, multiply the two lengths.

$$5.385165 \times 21.540659 = 116.000003$$

to six decimal places. The exact value is 116.

Step 6, divide.

$$116 \div 116.000003 = 0.99999997$$

which is **1.0000** to four decimal places.

**Answer.** The new vector is $(8, 20)$, its length is 21.540659 to six decimal places, and its
cosine similarity with $(2, 5)$ is 1.0000. All three predictions held.

**Where this goes wrong.** The tempting wrong answer for the cosine is something below 1, on the
reasoning that the numbers got much bigger so the vectors must be less alike. Bigger numbers are
exactly what the division removes. The top of the fraction grew by a factor of 4 and so did the
bottom, so the ratio did not move. The second tempting slip is a length of $4 \times 29 = 116$,
from scaling the sum of squares instead of the length. The length is the square root of that sum,
and the scaling applies to the root.

---

**15.** *Asked:* turn the measured cosine 0.8333 into an angle in degrees.

This tests [Formula 9.5](../ch/ch09.md#worked-9-6). The measurement itself is real: 0.8333 is
the cosine similarity of "Bakersfield is in Kern County, California." and "Kern County's largest
city is Bakersfield.", stored in `lab/out/we5_embeddings.json` as 0.8333029747009277.

Step 1, put your calculator into degree mode. Every scientific calculator has a switch between
degrees and radians, and the wrong setting is the commonest cause of a wrong answer on this
problem.

Step 2, type the cosine value.

$$0.8333$$

Step 3, press the inverse cosine key, usually marked $\cos^{-1}$ and usually reached through a
shift or second-function key.

$$\arccos(0.8333) = 33.5608 \text{ degrees}$$

**Answer.** $\theta = 33.56$ degrees, to the two decimal places this chapter reports angles in.

**The precision check, because this problem hands you a rounded input.** Feeding in the full
0.8333029747009277 gives 33.5605 degrees, which is also 33.56 to two decimal places. The two
routes agree, so rounding the input cost nothing here. Common Mistake 7 warns that it does not
always cost nothing, which is why the check is worth running rather than assuming.

**Where this goes wrong.** Two tempting wrong answers, and they look very different.

The first is **0.5857**, which is what a calculator left in radian mode returns. It is a
believable-looking small number, and nothing on the screen says "radians". Catch it with the
endpoints: a cosine of 0 must give 90, and a cosine of $-1$ must give 180. If your calculator
gives 1.5708 and 3.1416 for those, it is in radians.

The second is **1.2000**, from computing $1 \div 0.8333$. That comes from reading the raised
$-1$ in $\cos^{-1}$ as "one divided by", which is what a raised $-1$ means everywhere else in
this book. It does not mean that here. The chapter flags this trap and writes $\arccos$ in every
formula for exactly this reason.

---

**17.** *Asked:* normalise $(5, 12)$ by hand, give both coordinates to four decimal places, then
check that the result has length 1.

This tests [Formula 9.6, normalising](../ch/ch09.md#worked-9-7), and Definition 9.9 in the
chapter. Normalising means dividing every coordinate by the vector's own length.

Step 1, find the length, by Formula 9.2.

$$5^2 = 25$$
$$12^2 = 144$$
$$25 + 144 = 169$$
$$\sqrt{169} = 13$$

This one comes out whole, which is why the chapter chose it.

Step 2, divide each coordinate by 13.

$$5 \div 13 = 0.384615\ldots = 0.3846 \text{ to four decimal places}$$
$$12 \div 13 = 0.923077\ldots = 0.9231 \text{ to four decimal places}$$

$$\hat{\mathbf{a}} = (0.3846,\; 0.9231)$$

Step 3, check the length of the result.

$$0.3846^2 = 0.3846 \times 0.3846 = 0.14791716$$
$$0.9231^2 = 0.9231 \times 0.9231 = 0.85211361$$
$$0.14791716 + 0.85211361 = 1.00003077$$
$$\sqrt{1.00003077} = 1.0000154$$

which is **1.0000** to four decimal places.

**Answer.** $\hat{\mathbf{a}} = (0.3846, \; 0.9231)$, and its length is 1.0000.

**Why the check did not land on exactly 1.** Because Step 2 rounded before Step 3 computed. Keep
the coordinates as the exact fractions $\tfrac{5}{13}$ and $\tfrac{12}{13}$ and the squares are
$\tfrac{25}{169}$ and $\tfrac{144}{169}$, which add to $\tfrac{169}{169} = 1$ exactly. The
0.00003077 is the rounding you did, and nothing else. This is Common Mistake 7 met in a small,
harmless form, and it is worth meeting once where it is harmless.

**Where this goes wrong.** The tempting wrong answer is $(0.0296, 0.0710)$, from dividing by 169
instead of 13. It is tempting because 169 is the number sitting in front of you at the end of
Step 1, and the square root is one more keystroke. Catch it with the check in Step 3: that pair
has length 0.076923, not 1. Anything whose length is not 1 has not been normalised.

---

**19.** *Asked:* from the similarity matrix in Section 9.5, list the three lowest off-diagonal
values and say which sentence pairs they belong to.

"Off-diagonal" means every cell except the six on the diagonal, where a sentence meets itself
and the value is 1.000 by construction. Definition 9.11 in the chapter defines the diagonal.

**Read the matrix, skipping the diagonal.** The table printed in Section 9.5 is symmetric, so
each off-diagonal value appears twice, once above the diagonal and once below. That means there
are $36 - 6 = 30$ off-diagonal cells but only $30 \div 2 = 15$ different values. Sort those 15
and take the bottom three.

| Rank | Value | Cells | The two sentences |
|---|---|---|---|
| Lowest | $-0.017$ | row 4, column 5 and row 5, column 4 | "The stock market fell sharply on Tuesday." and "Photosynthesis converts light into chemical energy." |
| Second lowest | $0.010$ | row 0, column 5 and row 5, column 0 | "The cat sat on the mat." and "Photosynthesis converts light into chemical energy." |
| Third lowest | $0.011$ | row 1, column 5 and row 5, column 1 | "A kitten rested on the rug." and "Photosynthesis converts light into chemical energy." |

**Answer.** $-0.017$ for sentences 4 and 5, $0.010$ for sentences 0 and 5, and $0.011$ for
sentences 1 and 5.

**Is the third place settled?** Yes. The next value up is 0.015, for sentences 1 and 3, so
nothing is competing for third. At full precision, as the values sit in
`lab/out/we5_embeddings.json`, the three are $-0.016585901379585266$, $0.009899353608489037$ and
$0.011263178661465645$, and the fourth is $0.015253423713147640$.

**What the three have in common.** Every one of them involves sentence 5, the photosynthesis
sentence. It is the only sentence in the set about a natural process, and the model placed it
furthest from everything else.

**Where this goes wrong.** Three traps.

First, including the diagonal. The 1.000 entries are not results; they are the check that the
vectors were normalised.

Second, listing six answers instead of three. The mirror cells are the same measurement written
twice, because the matrix is symmetric. Reporting both halves counts each pair twice.

Third, using the coloured figure rather than the printed table. The figure prints two decimal
places, where 0.010 and 0.011 both read 0.01 and the tie cannot be broken. The code output in
Section 9.5 prints three decimal places, which separates them, and the JSON file separates them
further. Use the table.

---

**21.** *Asked:* a student wants to compare two embedding models on the same six sentences.
Name three variables to hold fixed and one to change.

This is a design question, not an arithmetic one, so there is no single right list. It tests
Definitions 9.12 to 9.15 in [Section 9.6](../ch/ch09.md).

**What a strong response contains.**

1. It names the one variable under test, and it is the model.
2. It names at least three other variables held fixed, and for each one it says what wrong
   conclusion that variable could otherwise produce. A list without reasons is half an answer.
3. It says how the design would be checked before the results are trusted, which is the
   **manipulation check** of Definition 9.15.

**One worked example of such a response.**

*The variable to change.* Which embedding model turns the sentences into vectors. That is the
only thing the comparison is about, so it is the only thing allowed to move.

*The three variables to hold fixed.*

**The six sentences, character for character.** Same words, same punctuation, same order. If the
wording is edited between runs, a change in the scores could be the wording rather than the
model, and nothing in the numbers would separate the two.

**The similarity measure and how it is applied.** Cosine similarity by Formula 9.3 for both
models, with both vectors normalised to length 1 in both runs. Scoring one model with a cosine
and the other with a raw dot product would confound the measure with the model, and Section 9.1
shows how large that difference can be.

**Which pairs are compared and how they are reported.** The same 15 off-diagonal pairs, reported
to the same number of decimal places. Comparing 15 pairs for one model and a hand-picked 3 for
the other is a change in the test, not in the model.

*The manipulation check.* Before scoring anything, print the model name and the vector dimension
for each run. That confirms two things: the model really did change, and the sentences really
did not. An experiment can be described correctly in prose and still be wired up wrongly in the
code, and this is the sum that catches the gap.

**One caution worth adding.** Both models put their scores on the same $-1$ to $1$ scale, and
that does not make the scores calibrated against each other. Section 9.6 makes the same point
about Chapter 10's retrieval gaps: a diagnostic is meaningful **within** one system and does not
transfer **across** systems. Report what each model ranked highest and lowest, rather than
claiming a 0.05 difference between the models means what a 0.05 difference within one model
means.

---

### Stretch

**23.** *Asked:* show that $\cos(\mathbf{a}, -\mathbf{a}) = -1$ for any non-zero $\mathbf{a}$,
using letters rather than particular numbers.

This is the mirror of the argument in [Section 9.3](../ch/ch09.md), which showed that
$\cos(\mathbf{a}, k\mathbf{a}) = 1$ for positive $k$. Here $k = -1$.

Write $\mathbf{a} = (a_1, a_2)$, where $a_1$ and $a_2$ stand for any two numbers that are not
both zero. Then $-\mathbf{a} = (-a_1, -a_2)$, every coordinate with its sign flipped. The letters
are doing the work described in
[Math Toolkit section 1](math-toolkit.md#toolkit-letters): one argument covers every choice of
numbers at once.

**Step 1. The top of the fraction.**

$$\mathbf{a} \cdot (-\mathbf{a}) = a_1(-a_1) + a_2(-a_2) = -a_1^2 - a_2^2 = -(a_1^2 + a_2^2)$$

Read that in three hops. The first hop is Formula 9.1 applied to $\mathbf{a}$ and
$-\mathbf{a}$. The second hop uses the rule that a positive times a negative is negative, so
$a_1 \times (-a_1)$ is $-a_1^2$. The third hop takes the shared minus sign out in front, which is
the same move as taking a shared multiplier outside a bracket.

**Step 2. The length of $-\mathbf{a}$.**

$$\lVert -\mathbf{a} \rVert = \sqrt{(-a_1)^2 + (-a_2)^2} = \sqrt{a_1^2 + a_2^2} = \lVert \mathbf{a} \rVert$$

The middle step is the one that matters. A negative number multiplied by itself gives a positive
answer, so squaring destroys the minus signs. Flipping an arrow round does not change how long it
is, and this line is that fact written in symbols.

**Step 3. The bottom of the fraction.**

$$\lVert \mathbf{a} \rVert \, \lVert -\mathbf{a} \rVert = \sqrt{a_1^2 + a_2^2} \; \cdot \; \sqrt{a_1^2 + a_2^2} = a_1^2 + a_2^2$$

A square root multiplied by itself gives back what was under the root, because that is what a
square root is.

**Step 4. Divide.**

$$\cos(\mathbf{a}, -\mathbf{a}) = \frac{-(a_1^2 + a_2^2)}{a_1^2 + a_2^2} = -1$$

The top and the bottom are the same quantity apart from the minus sign, so the fraction is $-1$.

**Why "non-zero" is in the problem.** If $\mathbf{a}$ were $(0, 0)$, then $a_1^2 + a_2^2$ would
be 0, and Step 4 would ask you to divide by zero. That is not allowed, and the cosine similarity
of the zero vector with anything is undefined rather than equal to some number.

**Two numerical checks.** With $\mathbf{a} = (3, 4)$ and $-\mathbf{a} = (-3, -4)$: the dot
product is $3 \times (-3) + 4 \times (-4) = -9 + (-16) = -25$, both lengths are 5, the bottom is
$5 \times 5 = 25$, and $-25 \div 25 = -1$. With $\mathbf{a} = (2, 5)$: the dot product is
$2 \times (-2) + 5 \times (-5) = -4 + (-25) = -29$, both lengths are $\sqrt{29}$, the bottom is
$\sqrt{29} \times \sqrt{29} = 29$, and $-29 \div 29 = -1$. The letters said it would hold for
every vector, and two different vectors agree.

**Where this goes wrong.** The tempting mistake is writing
$\lVert -\mathbf{a} \rVert = -\lVert \mathbf{a} \rVert$ in Step 2, on the reasoning that the
minus sign has to go somewhere. A length is never negative, by Definition 9.3. If you make that
slip, the bottom of the fraction becomes $-(a_1^2 + a_2^2)$, the two minus signs cancel, and you
get $+1$ instead of $-1$. The answer then says two opposite arrows are identical, which is the
signal that something went wrong.

---

**25.** *Asked:* a search system ranks passages by raw dot product with the question, using
un-normalised embeddings. Describe the bias, name which passages benefit, and give the single
change that fixes it.

This is a written argument, so there is no single right wording. It tests the warning box in
[Section 9.1](../ch/ch09.md) and Definition 9.14, confounded.

**What a strong response contains.**

1. It says what the raw dot product is actually measuring: direction and length stirred together
   into one number, so the two cannot be separated afterwards.
2. It says who wins: passages whose vectors are long, whatever the reason for their length.
3. It says why nobody notices: a returned passage looks like an answer whether or not it was the
   best one, so the bias never announces itself.
4. It names the fix in one line, and the fix is to normalise both vectors to length 1 before
   scoring, which turns the raw dot product into cosine similarity (Formula 9.6).
5. Ideally it carries a number, because a number makes the bias undeniable.

**One worked example of such a response.**

The raw dot product grows when two vectors point the same way **and** when either one gets
longer. Those two effects arrive in the same number and cannot be pulled apart. A score of 48 may
mean a passage is well aligned with the question, or it may mean the passage has a long vector.
That is the definition of confounded.

Here is the failure with numbers. All of these are made up for practice and small enough to check
on a phone.

Let the question's vector be $\mathbf{q} = (3, 4)$.

Passage P has the vector $(3, 4)$, pointing in exactly the same direction as the question. It is
a perfect match.

Passage Q has the vector $(8, 6)$, which is $2 \times (4, 3)$. It leans a little away from the
question and it is twice as long.

Rank them by raw dot product.

$$\mathbf{q} \cdot \mathbf{P} = 3 \times 3 + 4 \times 4 = 9 + 16 = 25$$
$$\mathbf{q} \cdot \mathbf{Q} = 3 \times 8 + 4 \times 6 = 24 + 24 = 48$$

Passage Q scores 48 and passage P scores 25, so the system returns Q and the perfect match never
appears. Now score the same two with cosine similarity.

$$\lVert \mathbf{q} \rVert = \sqrt{9 + 16} = \sqrt{25} = 5$$
$$\lVert \mathbf{P} \rVert = \sqrt{9 + 16} = \sqrt{25} = 5$$
$$\lVert \mathbf{Q} \rVert = \sqrt{64 + 36} = \sqrt{100} = 10$$

$$\cos(\mathbf{q}, \mathbf{P}) = 25 \div (5 \times 5) = 25 \div 25 = 1.0000$$
$$\cos(\mathbf{q}, \mathbf{Q}) = 48 \div (5 \times 10) = 48 \div 50 = 0.9600$$

The order reverses. P wins, which is correct, because P is the perfect match.

**Which passages benefit.** Whichever ones the model happened to give a long vector to. In
practice that often means longer passages, since more text can push the numbers up, but the
honest statement is broader: the length can depend on the passage length, on quirks of the model,
or on nothing you can name. The system is partly ranking by vector length and calling it
relevance.

**Why nobody catches it.** The user sees one passage and has no way to know what was in second
place. A wrong answer that reads fluently looks the same as a right one.

**The single change.** Normalise both the question vector and every passage vector to length 1
before scoring. Then every length is 1, the bottom of the cosine fraction is $1 \times 1 = 1$,
and the dot product **is** the cosine similarity. In code that is one keyword,
`normalize_embeddings=True`, as Cell 8 of the chapter shows.

---

**27.** *Asked:* cosine similarity cannot tell $(3, 4)$ apart from $(30, 40)$ or $(300, 400)$.
Give one situation where throwing the length away is exactly right, and one where it loses
information you needed, saying what the length would have meant.

**First, confirm the claim.** All three vectors lie along the same line, because $(30, 40)$ is
$(3, 4)$ scaled by 10 and $(300, 400)$ is $(3, 4)$ scaled by 100.

Against $(30, 40)$:

$$3 \times 30 = 90, \qquad 4 \times 40 = 160, \qquad 90 + 160 = 250$$
$$\lVert (30, 40) \rVert = \sqrt{900 + 1600} = \sqrt{2500} = 50$$
$$\cos = 250 \div (5 \times 50) = 250 \div 250 = 1.0000$$

Against $(300, 400)$:

$$3 \times 300 = 900, \qquad 4 \times 400 = 1600, \qquad 900 + 1600 = 2500$$
$$\lVert (300, 400) \rVert = \sqrt{90{,}000 + 160{,}000} = \sqrt{250{,}000} = 500$$
$$\cos = 2500 \div (5 \times 500) = 2500 \div 2500 = 1.0000$$

Both come out at 1.0000. The measure genuinely cannot separate them.

This is a written argument, so there is no single right answer. Here is what a strong response
contains, and then one example of such a response.

**What a strong response contains.**

1. A situation where the length is an accident of how the data was produced, not a fact about
   what is being compared, so removing it is the repair described in Section 9.1.
2. A situation where the length **is** the quantity of interest, named specifically.
3. A plain sentence saying what the length stood for in the second situation. "It loses
   information" without saying which information is not a complete answer.
4. Ideally, what to report alongside the cosine when the length matters.

**One worked example of such a response.**

*Where throwing the length away is exactly right.* Comparing the meaning of two pieces of text of
different lengths. "Bakersfield is in Kern County, California." is eight words. A three-paragraph
page from a county website saying the same thing is several hundred words. An embedding model can
hand back a longer vector for the longer text. That extra length is a fact about how much was
written, not about what was said, so letting it raise the similarity score would rank the page
above the sentence for no good reason. Cosine similarity deletes it and compares direction alone,
which is the part that carries the meaning. This is the whole argument of Section 9.1, and it is
why every retrieval system divides by the lengths.

*Where throwing the length away loses what you needed.* Suppose the two coordinates are not
meaning at all, but amounts. Let a vector record a household's water use in two months: $(3, 4)$
means 3 hundred cubic feet in month one and 4 hundred cubic feet in month two. A second household
records $(300, 400)$. These numbers are made up for practice.

The cosine similarity of those two households is 1.0000, and that number is telling the truth
about one thing: both households used their water in the same proportion across the two months,
a quarter less in the first month than the second. It says nothing whatsoever about the fact that
the second household used 100 times as much water as the first.

*What the length meant there.* Total volume of water used across the two months. The length of
$(3, 4)$ is 5 and the length of $(300, 400)$ is 500, and that hundredfold difference is the
entire finding. If you are budgeting water in Kern County, the 100 is the point and the cosine
threw it away.

*What to report instead.* Report the cosine **and** the length together, or the ratio of the two
lengths, which is [Formula 9.7](../ch/ch09.md), the manipulation ratio: $500 \div 5 = 100$. The
cosine answers "same shape?" and the ratio answers "same size?". They are two different questions
and one number cannot answer both. That is the same lesson as the warning box at the end of
Section 9.6: a number is a property of the procedure that produced it, so name the procedure
rather than reporting whichever number you prefer.

---

(answers-ch10)=
## Chapter 10. Retrieval: the open-book exam

These problems drill three things: the by-hand arithmetic of cosine similarity and normalising,
the reading of a ranking through its gaps rather than its top score, and the habit of asking which
procedure produced a number before comparing it to another one.

### Warm-up

**1.** *What is asked.* Find the dot product of two lists of two numbers each.

*What it tests.* The dot product, which is the top half of Formula 10.1, cosine similarity. For
what a list of numbers is doing here, see
[Toolkit Section 14](math-toolkit.md#toolkit-vectors). For the ways multiplication gets written,
see [Toolkit Section 3](math-toolkit.md#toolkit-multiplication). The formula is also stated in the
[formula summary](formulas.md).

*The rule.* Multiply the first number of one list by the first number of the other. Multiply the
second by the second. Add the two products.

Step 1, the numbers in position 1. The query's is 2, the passage's is 3.
$2 \times 3 = 6$

Step 2, the numbers in position 2. The query's is 6, the passage's is 1.
$6 \times 1 = 6$

Step 3, add the two products.
$6 + 6 = 12$

*The answer.* $\mathbf{q} \cdot \mathbf{d} = 12$. A dot product carries no unit. It is a plain
number, and on its own it says nothing about similarity until you divide by the two lengths, which
is problem 2.

*Where this goes wrong.* The tempting slip is to multiply inside each list instead of across them:
$2 \times 6 = 12$ and $3 \times 1 = 3$, then $12 + 3 = 15$. The answer 15 is what you get when you
pair a number with its own neighbour rather than with the matching number in the other list. The
dot product always pairs position 1 with position 1 and position 2 with position 2. A second slip
is adding before multiplying: $(2 + 6) \times (3 + 1) = 8 \times 4 = 32$. Multiply first, add
second.

---

**3.** *What is asked.* Shrink $\mathbf{a} = (6, 8)$ until its length is exactly 1, then check the
result by dotting it with itself.

*What it tests.* Normalising, which is the condition Formula 10.2 needs before a dot product is
allowed to stand in for a cosine similarity. Square roots are
[Toolkit Section 9](math-toolkit.md#toolkit-square-roots). The double-bar notation for length is
[Toolkit Section 15](math-toolkit.md#toolkit-absolute-value).

Step 1, find the length. Square each number, add the squares, take the square root.
$6 \times 6 = 36$
$8 \times 8 = 64$
$36 + 64 = 100$
$\sqrt{100} = 10$, because $10 \times 10 = 100$.
So $\lVert \mathbf{a} \rVert = 10$.

Step 2, divide every number in the list by that length.
$6 \div 10 = 0.6$
$8 \div 10 = 0.8$

Step 3, the check the problem asks for. Dot the result with itself.
$0.6 \times 0.6 = 0.36$
$0.8 \times 0.8 = 0.64$
$0.36 + 0.64 = 1.00$

*The answer.* The unit vector is $(0.6,\; 0.8)$, and its dot product with itself is $1.000$. The 1
has no unit attached; "length 1" means one unit of arrow, not one metre.

*Where this goes wrong.* The most common wrong answer is $(0.428571,\; 0.571429)$, which comes
from dividing by $6 + 8 = 14$ instead of by the length 10. Adding the numbers is not finding the
length. The chapter names this slip under Formula 10.2, and the check catches it straight away:
$0.428571 \times 0.428571 = 0.183673$, $0.571429 \times 0.571429 = 0.326531$, and
$0.183673 + 0.326531 = 0.510204$, which is not 1. Any time a normalised list fails to dot with
itself to 1, you divided by the wrong thing.

---

**5.** *What is asked.* For four sorted scores, compute the drop at every possible cut, then say
where you would cut and give the number that justifies it.

*What it tests.* Formula 10.5, the drop at the cut, $g_k = s_{(k)} - s_{(k+1)}$. The brackets
round the subscript mark a **rank**, not a passage's storage position, which is Definition 10.3.

The four scores, already sorted: $s_{(1)} = 0.744$, $s_{(2)} = 0.701$, $s_{(3)} = 0.340$,
$s_{(4)} = 0.298$.

Step 1, cut after 1 passage.
$g_1 = 0.744 - 0.701 = 0.043$

Step 2, cut after 2 passages.
$g_2 = 0.701 - 0.340 = 0.361$

Step 3, cut after 3 passages.
$g_3 = 0.340 - 0.298 = 0.042$

Step 4, there is no cut after 4, because there is no rank 5 to drop.

Step 5, compare the three drops. $0.043$, $0.361$, $0.042$. The largest is $g_2 = 0.361$.

Step 6, say how much larger, so the choice rests on a number rather than on a glance.
$0.361 \div 0.043 = 8.395\ldots$, which rounds to $8.4$
$0.361 \div 0.042 = 8.595\ldots$, which rounds to $8.6$

*The answer.* $g_1 = 0.043$, $g_2 = 0.361$, $g_3 = 0.042$. Cut after two passages, so $k = 2$. The
number that justifies it is $g_2 = 0.361$, which is more than eight times either of the other two
drops. All three are differences of cosine similarities, so they carry no unit.

*Where this goes wrong.* Two slips. First, choosing the cut from the largest **score** rather than
the largest **drop**. The top score, 0.744, belongs to rank 1 and says nothing about where the
list breaks. Second, expecting the drops to shrink steadily as you go down the list. They do not.
Here $g_3 = 0.042$ is almost the same size as $g_1 = 0.043$, and the big one sits in the middle.
That shape, two scores well clear and then a cliff, is the same shape as the measured
six-sentence run in Section 10.2, where the cliff was 0.630 and it also fell between rank 2 and
rank 3.

---

**7.** *What is asked.* A run answers 9 questions and puts the correct section first on 4 of them.
Report hits@1 as a decimal and as a percentage.

*What it tests.* Formula 10.7, $\text{hits@1} = h / n$. It is a **sample proportion**, the same
shape as every accuracy in this book; see
[Toolkit Section 12](math-toolkit.md#toolkit-proportions). Turning a decimal into a percentage is
[Toolkit Section 11](math-toolkit.md#toolkit-percentages).

Step 1, write down the two counts.
$h = 4$, the number of questions whose correct section came back at rank 1.
$n = 9$, the number of questions asked.

Step 2, divide the top by the bottom.
$4 \div 9 = 0.444444\ldots$

The three dots say the digits carry on. Keep them until the last line.

Step 3, round to three decimal places.
$\text{hits@1} = 0.444$

Step 4, turn the full-precision value into a percentage by multiplying by 100.
$0.444444\ldots \times 100 = 44.4444\ldots$

Step 5, round to one decimal place.
$44.4\%$

*The answer.* hits@1 is $0.444$ as a decimal and $44.4\%$ as a percentage. The decimal has no unit;
it is a share of 1. The percent sign means "out of a hundred", so the two are two spellings of one
number.

*Where this goes wrong.* The first slip is dividing the wrong way: $9 \div 4 = 2.25$. That cannot
be a proportion, because a proportion never goes above 1, so the check catches it. The second is
rounding to 0.444 and then multiplying, which happens to agree here but is the habit that will
cost you elsewhere. Round once, at the end. One more thing worth noticing: this score is fragile
for the same reason "3 of 6" is. One more correct question makes it $5 \div 9 = 0.5555\ldots$,
which is $55.6\%$, a move of $55.6 - 44.4 = 11.2$ percentage points from a single question.

---

**9.** *What is asked.* Three passages of 48, 60 and 52 words go into a prompt. The 60-word one is
off-topic. What share of the words you sent is off-topic?

*What it tests.* The cost side of choosing $k$, which Section 10.3 counts in words. Turning a part
over a whole into a percentage is [Toolkit Section 11](math-toolkit.md#toolkit-percentages).

Step 1, add up all the words you sent, two at a time.
$48 + 60 = 108$
$108 + 52 = 160$

Step 2, count the off-topic words. One passage is off-topic and it has 60 words, so the off-topic
count is 60.

Step 3, divide the part by the whole.
$60 \div 160 = 0.375$

Step 4, multiply by 100 to move from a decimal to a percentage.
$0.375 \times 100 = 37.5$

*The answer.* $37.5\%$ of the words you sent are off-topic. The unit is percent, meaning "out of a
hundred words sent".

*Where this goes wrong.* The tempting answer is $33.3\%$, because one passage out of three is
off-topic and $1 \div 3 = 0.3333$. That counts passages, not words, and the off-topic passage
happens to be the longest of the three, so counting passages understates the cost. The question
asks for a share of words. Whenever a share is asked for, check what is being counted before you
divide. The chapter's table in Section 10.3 counts words for exactly this reason: at $k = 6$ in the
six-sentence run, 25 of the 37 words sent are off-topic, which is $67.6\%$, and counting sentences
instead would have said $66.7\%$ and hidden that the irrelevant sentences were the longer ones.

### Practice

**11.** *What is asked.* Score one query against three passages, name the nearest neighbour,
compute the confidence gap, and say what a cosine of $-1$ means.

*What it tests.* Formula 10.1 for each score, Formula 10.3 for the nearest neighbour, and
Formula 10.4 for the gap. The minus-sign rules are the ones the chapter sets out before its worked
example of Formula 10.3: a positive times a negative is negative, and a negative times itself is
positive.

The query is $\mathbf{q} = (1, 0)$. Its length is needed three times, so compute it once.
$1 \times 1 = 1$
$0 \times 0 = 0$
$1 + 0 = 1$
$\sqrt{1} = 1$
So $\lVert \mathbf{q} \rVert = 1$.

Step 1, score $\mathbf{d}_1 = (2, 0)$.
Dot product: $1 \times 2 = 2$, then $0 \times 0 = 0$, then $2 + 0 = 2$.
Length of $\mathbf{d}_1$: $2 \times 2 = 4$, then $0 \times 0 = 0$, then $4 + 0 = 4$, then
$\sqrt{4} = 2$.
Multiply the lengths: $1 \times 2 = 2$.
Divide: $2 \div 2 = 1.0000$.

Step 2, score $\mathbf{d}_2 = (0, 5)$.
Dot product: $1 \times 0 = 0$, then $0 \times 5 = 0$, then $0 + 0 = 0$.
Length of $\mathbf{d}_2$: $0 \times 0 = 0$, then $5 \times 5 = 25$, then $0 + 25 = 25$, then
$\sqrt{25} = 5$.
Multiply the lengths: $1 \times 5 = 5$.
Divide: $0 \div 5 = 0.0000$.

Step 3, score $\mathbf{d}_3 = (-3, 0)$.
Dot product: $1 \times (-3) = -3$, then $0 \times 0 = 0$, then $-3 + 0 = -3$.
Length of $\mathbf{d}_3$: $(-3) \times (-3) = 9$, then $0 \times 0 = 0$, then $9 + 0 = 9$, then
$\sqrt{9} = 3$. The minus sign has gone, which is the point of the second rule above.
Multiply the lengths: $1 \times 3 = 3$.
Divide: $-3 \div 3 = -1.0000$.

Step 4, apply Formula 10.3. The three scores are $1.0000$, $0.0000$ and $-1.0000$. The biggest is
$1.0000$, and it belongs to $\mathbf{d}_1$.

$$\text{best passage} = \mathbf{d}_1$$

Step 5, apply Formula 10.4. Sorted largest first, $s_{(1)} = 1.0000$ and $s_{(2)} = 0.0000$.
$g = 1.0000 - 0.0000 = 1.0000$

*The answer.* The three cosine similarities are $1.000$, $0.000$ and $-1.000$. The nearest
neighbour is $\mathbf{d}_1$. The confidence gap is $g = 1.000$. A cosine of $-1$ means
$\mathbf{d}_3$ points in exactly the opposite direction from the query: the same line, reversed.
None of these numbers carries a unit.

*Where this goes wrong.* Three slips. First, answering "1.0000" to "name the nearest neighbour".
$\arg\max$ hands back a passage, not a score, which is the check attached to Formula 10.3; the
answer is $\mathbf{d}_1$. Second, thinking $\mathbf{d}_1$ must score below a perfect match because
its numbers are bigger than the query's. $\mathbf{d}_1$ is the query doubled, so it points the same
way, and cosine similarity was built to ignore length. Third, letting the minus sign into a length.
$(-3) \times (-3) = 9$, which is positive, so the length is 3. A length is never negative.

---

**13.** *What is asked.* Explain to a classmate, in four sentences and with no symbols, why the
Python in Section 10.2 never divides by a length.

*What it tests.* Formula 10.2 said in words, and whether you can state a piece of mathematics
without notation. This is a written answer, so there is no single right wording.

*What a strong response contains.* Three things. It names normalising, the step where
`normalize_embeddings=True` shrank every list, as the place where the dividing happened. It says
that dividing by one leaves a number unchanged, which is why the step can be skipped later. And it
avoids claiming that cosine similarity has no division in it, because it does.

*One worked example of such a response.*

> The code asks the model to shrink every list of numbers until it is exactly one unit long, at
> the moment the lists are made. When two lists are already one unit long, the dividing step of
> cosine similarity divides by one. Dividing by one leaves a number exactly as it was, so that
> step can be skipped without changing the answer. The division was not dropped; it was done
> early, once, when the lists were shrunk.

*Where this goes wrong.* The weak version is "cosine similarity does not need division". It does.
What happened is that the division was moved earlier and folded into the making of the lists. A
student who believes the division has gone will one day turn the shrinking off, keep the rest of
the code, and print scores far above 1. Those numbers are dot products, not cosine similarities,
and nothing in the output says so.

---

**15.** *What is asked.* For five close scores, compute the gap, all four drops and the spread,
then say whether you would paste the rank-1 passage into a prompt.

*What it tests.* Formula 10.4 for the gap, Formula 10.5 for the drops, and the judgement from
Try it 10.2: a ranking with no separation in it is not a search result.

The five scores, already sorted: $0.612$, $0.609$, $0.607$, $0.601$, $0.598$.

Step 1, the confidence gap.
$g = s_{(1)} - s_{(2)} = 0.612 - 0.609 = 0.003$

Step 2, the four drops.
$g_1 = 0.612 - 0.609 = 0.003$
$g_2 = 0.609 - 0.607 = 0.002$
$g_3 = 0.607 - 0.601 = 0.006$
$g_4 = 0.601 - 0.598 = 0.003$

Step 3, the spread from the highest score to the lowest.
$0.612 - 0.598 = 0.014$

Step 4, check the two against each other. The four drops must add to the spread, because each drop
is one step down the same ladder.
$0.003 + 0.002 = 0.005$
$0.005 + 0.006 = 0.011$
$0.011 + 0.003 = 0.014$
That matches the spread, so the drops are right.

Step 5, size the gap against the spread.
$0.003 \div 0.014 = 0.214$, so the winner's lead is about a fifth of the whole list's range.

*The answer.* $g = 0.003$. The drops are $0.003$, $0.002$, $0.006$ and $0.003$. The spread is
$0.014$. No, do not paste the rank-1 passage into a prompt and treat the result as a search
result. Five passages sitting inside a band $0.014$ wide have not been told apart, and the winner
led by $0.003$.

For scale, the measured six-sentence run in Section 10.2 had a drop of $0.630$ between the last
relevant sentence and the first irrelevant one (**real**, from `lab/out/we5_embeddings.json`).
That single drop is 45 times this entire list's spread: $0.630 \div 0.014 = 45.0$. Every drop here
is also smaller than pass one's mean gap of $0.038$ (**real**, from `lab/out/lab2_rag.json`), and
pass one is the run the chapter describes as floundering.

*Where this goes wrong.* The tempting answer is yes, because 0.612 sounds like a respectable
score. A top score on its own tells you nothing, which is Common Mistake 1 in the chapter. The
second trap is treating $g_3 = 0.006$ as a natural cut, since it is the largest of the four. It is
larger by $0.003$, which is noise at this scale, and reading a boundary into it is the same error
as believing pass one's rank 1. The move Try it 10.2 recommends is the right one: ask whether the
answer is in the corpus at all, and change the system rather than the value of $k$.

---

**17.** *What is asked.* List what changed between pass one and pass two, and between pass two and
pass three, then say which comparison can support a claim of the form "X caused Y".

*What it tests.* The controlled experiment, which Section 10.6 applies to a software system and
Try it 10.4 rehearses. This is a written answer, so what follows is the content a strong response
covers, then the judgement.

**Pass one to pass two: at least four things moved.**

1. **The corpus.** Pass one searched the GE Compendium **and** the Cal-GETC Guiding Notes, 248
   chunks in total. Pass two searched the Compendium alone, 77 chunks (**real**, from
   `lab/out/lab2_rag.json` and `lab/out/lab2_rag_v2.json`).
2. **The chunking rule.** Fixed 120-word windows with a 30-word overlap became: split at the
   document's own headings, then cut each section into pieces of at most 160 words, with no
   overlap.
3. **The heading prefix.** Every pass-two chunk carries its section heading at the front of its
   text. Pass-one chunks carried nothing.
4. **One question's wording.** "Must a course satisfying only General Education requirements end
   in a particular digit?" became "Must a General Education course number end in a particular
   digit?" The other five questions are the same.

What stayed the same: the embedding model, `all-MiniLM-L6-v2` with 22,713,216 parameters
(**real**, from `lab/out/lab2_rag_v3.json`), cosine similarity, and the rank-1-minus-rank-2 gap.

**Pass two to pass three: one thing moved.**

1. **The embedding model.** `all-MiniLM-L6-v2` was replaced by `bge-small-en-v1.5`, 33,360,000
   parameters (**real**, from `lab/out/lab2_rag_v3.json`).

What stayed the same: the same Python list of 77 heading-aware chunks, reused rather than rebuilt;
the same six questions in the same order; the same answer key, written down before the run; the
same cosine similarity, the same ranking, and the same scoring rule. Both models produce 384
numbers per text, so nothing downstream changed shape.

**Which comparison can support "X caused Y".** Pass two against pass three. One variable moved, so
the rise from 3 of 6 to 6 of 6 can be attributed to the change of embedding model. Pass one
against pass two moves at least four things at once, so the rise in mean gap from $0.038$ to
$0.058$ cannot be assigned to any one of them. It might be the headings. It might be that 77
chunks give the winner fewer near-neighbours to fight than 248 do. It might be the reworded
question, which produced pass two's largest single gap, $0.161$.

**One complication a strong answer names.** `bge-small-en-v1.5` is used with the phrase
`"Represent this sentence for searching relevant passages: "` on the front of the query, and MiniLM
is used with nothing. Strictly, that is a second difference. The chapter treats it as part of the
model, because that prefix is how the model was trained, so leaving it off is using the model
wrongly rather than holding a variable still. Saying this out loud is better than passing over it.

*Where this goes wrong.* Two tempting conclusions. The first is to credit the headings with the
$0.020$ rise in mean gap, which is Try it 10.4 exactly, and it is wrong because three other things
moved with them. The second is to read pass three as proof that bigger embedding models are
better. It shows that one model beat another model on six questions over one corpus.
$33{,}360{,}000 \div 22{,}713{,}216 = 1.4687\ldots$, which rounds to $1.47$, so the step in size is
small, and nothing here says a third model with more parameters again would do better still.

---

**19.** *What is asked.* Pass two put the correct section first for the Theme S question with a gap
of $0.004$. If the rank-2 chunk had scored $0.005$ higher, what is the new gap, which chunk is at
rank 1, and would the question still be scored a hit?

*A note before the arithmetic.* The last part of this problem cannot be answered from the chapter
alone. The chapter prints the gap and the **winning** chunk's heading. It never prints the
**rank-2** chunk's heading, and the scoring rule looks at the winner's heading, so the hit-or-miss
answer depends on a fact the chapter does not give you. The reading most students will take is
"it becomes a miss". Re-running pass two's own code shows that reading is wrong here, and the
reason is the most useful part of the problem. Both halves are worked below.

*What it tests.* Formula 10.4, and the difference between a number and what the number is about.

Step 1, write down the old gap.
$s_{(1)} - s_{(2)} = 0.004$

Step 2, write down the rise. The rank-2 score goes up by $0.005$ and the rank-1 score does not
move.

Step 3, the rise is bigger than the gap, so the two scores swap places, and the new gap is the
amount by which the riser overshot.
$0.005 - 0.004 = 0.001$

Step 4, check that against the full precision, because this is a subtraction of small numbers and
the warning in Section 10.3 applies. The stored gap is $0.003783881664276123$ (**real**, from the
`gap_1_2` field of the Theme S record in `lab/out/lab2_rag_v2.json`).
$0.005 - 0.003783881664276123 = 0.001216118\ldots$, which rounds to $0.001$.
The rounded inputs and the full ones agree this time.

*The answer so far.* The new gap is $0.001$, in the same cosine-similarity units as every other
score here. The chunk that was at rank 2 moves to rank 1, and the old winner drops to rank 2.

*Would it still be a hit?* Yes. This is measured, not assumed. Running the pass-two code from
Section 10.5 and printing the top two headings for the Theme S question gives:

```text
rank 1  sim=0.679338  [THEME S: Sustainability and Justice]
rank 2  sim=0.675554  [THEME S: Sustainability and Justice]
```

Both of the top two chunks come from the same section. The Theme S section was long enough to be
cut into more than one piece of at most 160 words, and two of its pieces finished first and
second. The scoring rule checks whether the phrase "THEME S" appears in the winning chunk's
heading, so either of them winning is scored a hit. Swapping them changes the gap and leaves the
score at 3 of 6.

*How much would you rely on a result with a gap that size?* Not at all, as a statement about which
**chunk** is best. A nudge smaller than the gap itself reorders the top two. But this case carries
the other half of the lesson. A tiny gap describes the two chunks, not the answer. Here the tiny
gap came from two pieces of the **correct** section competing with each other, which is the best
possible reason for a small gap. In pass one the small gaps came from unrelated chunks competing,
which is the worst. The number on its own cannot tell you which situation you are in. Opening the
chunks tells you, and it takes about a minute.

*Where this goes wrong.* Two slips, one arithmetic and one bigger. The arithmetic slip is
computing the new gap as $0.004 + 0.005 = 0.009$. A rise in the runner-up's score does not add to
the gap; it eats the gap and then overshoots by whatever is left. The bigger slip is answering
"no, it becomes a miss" on the assumption that the rank-2 chunk must belong to a different
section. Nothing said it did. This problem is the chapter's own advice turned back on the reader:
do not judge retrieval from the numbers alone, open the chunk and read it.

### Stretch

**21.** *What is asked.* Propose two different fixes for the mislabelled *Capstone Course
Requirements* chunk. For each, say what it costs in effort and what new way it could go wrong.

*What it tests.* Worked example 10.3, Definition 10.8 on semantic attractors, and the habit of
naming the cost of a fix rather than only its benefit. This is open-ended, so what follows is the
shape of a strong response and one worked example of one.

*The fault, restated in one paragraph.* The heading list in the pass-two code has no pattern for
*AIMS Course Pre- and Co-requisites*, which is the heading over the appendix of prerequisite
tables. A section runs from one recognised heading to the next recognised heading, so the appendix
fell inside the section before it and inherited that section's name. That previous section is
*Capstone Course Requirements*. The real capstone rules run for 135 words; the section the code
built runs for 631 words. Subtract to find what does not belong.

$631 - 135 = 496$

So 496 words of prerequisite tables are wearing a label that says capstone. Those two counts are
not in any file in `lab/out/`. They come from running the pass-two code and calling
`len(section_body.split())` on the section it labelled *Capstone Course Requirements*, which is
what the chapter says, and re-running that code returns 631.

*What a strong response contains.* Two fixes that differ from each other, not two versions of one.
For each fix: an honest estimate of effort, and one new failure it introduces. A proposed fix with
no stated downside is not an engineering proposal.

*One worked example of such a response.*

**Fix one: add the missing heading to the pattern.** Put *AIMS Course Pre- and Co-requisites* into
the list of headings the code recognises, so the appendix starts a section of its own.

- *Cost.* Minutes. One extra line in the pattern, then re-run the embedding step.
- *New way it could go wrong.* The heading list is now a hand-written list of the headings in one
  edition of one document. Nothing in the code complains when a pattern matches nothing. If CSUB
  renames a heading next year, or adds a section, the same failure comes back with no warning, and
  the only sign will be a chunk whose label does not fit its text. You would find it the way it was
  found this time: by opening the winner of a question the system got wrong.

**Fix two: refuse to build a section far longer than the others.** Count the words in every
labelled section, and make the code print a warning when one section is several times the length of
the typical one, on the grounds that a section that long has probably swallowed something.

- *Cost.* More than fix one. You have to pick a threshold, and picking it is a judgement rather
  than a calculation. You also have to decide what happens when the warning fires.
- *New way it could go wrong.* A threshold fires on sections that are long and correct, and a
  warning you see often is a warning you stop reading. It also fixes nothing by itself; it tells
  you to look. And if the swallowed text had been short, 40 words instead of 496, the check would
  never have fired and the mislabelling would still be sitting there.

*A third fix worth naming, because people reach for it.* "Drop the appendix from the corpus." It is
one line and it removes the attractor. It also removes real content: the prerequisite tables answer
real questions about prerequisites, and a student asking one would now get a confident rank 1 from
some other section with no way to tell it was wrong. Deleting text that a method handles badly
makes the method look better and the system worse.

*Where this goes wrong.* The most common weak answer is "use a better embedding model". Pass three
did that, and it is a different fix to a different problem. Pass three reuses the same 77 chunks,
so the chunk is still mislabelled in pass three; it answered the questions anyway. A wrong label
stays wrong when the model changes. The chapter's Common Mistake 6 puts it in one line: check the
chunking first, because it is cheaper to fix and it is wrong more often.

---

**23.** *What is asked.* How many questions would you need before one question changing its answer
moves hits@1 by less than one percentage point?

*What it tests.* Formula 10.7, and reading an inequality. The signs $<$ and $>$ are unpacked in
[Toolkit Section 19](math-toolkit.md#toolkit-inequalities). Percentage points against percent is
[Toolkit Section 11](math-toolkit.md#toolkit-percentage-points).

*Set it up.* With $n$ questions, one question going from wrong to right raises $h$ by 1, so it
raises $h \div n$ by $1 \div n$. That is a share of 1. One percentage point is one hundredth, which
as a share of 1 is $0.01$. So the condition is:

$$\frac{1}{n} < 0.01$$

Out loud: "one over n is less than nought point nought one." The narrow end of the sign points at
the smaller number, so the line says the move is smaller than one percentage point.

*Solve it.* Making $n$ bigger makes $1 \div n$ smaller, so there is a first whole number where the
division lands under $0.01$. Turn the inequality over. Flipping both sides of an inequality between
two positive numbers flips the sign with them:

$$n > \frac{1}{0.01} = 100$$

So $n$ has to be **greater than** 100, and the smallest whole number greater than 100 is 101.

*The check the problem asks for.*

Step 1, the answer itself.
$1 \div 101 = 0.009901$ to six decimal places
$0.009901 \times 100 = 0.9901$ percentage points
$0.9901$ is less than $1$, so $n = 101$ works.

Step 2, the number below it, to show 101 is the first one that works.
$1 \div 100 = 0.01$
$0.01 \times 100 = 1.0$ percentage points exactly
$1.0$ is not **less than** $1$, so $n = 100$ does not work.

*The answer.* $n = 101$ questions.

*Where this goes wrong.* The tempting answer is 100, from solving $1 \div n = 0.01$ and stopping
there. The problem said "less than", not "equal to", and at exactly 100 questions one question
still moves the score a full percentage point. A second slip is comparing $1 \div n$ against 1
rather than against $0.01$, which gives $n > 1$; that compares a share of 1 with a count of
percentage points, two different spellings of the same idea. Pick one spelling and stay in it. The
third thing to take away is the size of the answer. With the chapter's six questions, one question
moves the score $1 \div 6 = 0.167$, which is 16.7 percentage points. Getting that under one point
takes a hundred and one questions. That is what "3 of 6 is a direction of travel, not a
measurement" actually costs to fix.

---

**25.** *What is asked.* Give at least three reasons why multiplying 0.767 joules per token by the
extra words would not be a sound way to cost out sending four passages of 160 words instead of one.

*What it tests.* Whether a measured number survives being carried into a different setting. It is
the chapter's own lesson, a number is a property of the procedure that produced it, applied to an
energy figure instead of to a gap. This is a written answer, so what follows is the content a
strong response covers.

*The calculation being proposed, so there is something concrete to argue with.*
$4 \times 160 = 640$ words in the four-passage prompt
$1 \times 160 = 160$ words in the one-passage prompt
$640 - 160 = 480$ extra words
$480 \times 0.767 = 368.16$ joules

That figure, 368.16 joules, is what the classmate would report. Here is why it should not be
reported.

**Reason one, what the 0.767 was measured on.** `lab/out/theme_s_energy.json` records $0.767$
joules per token for `Qwen2.5-0.5B-Instruct` **generating** tokens, on one machine: an NVIDIA RTX
3500 Ada laptop GPU held at a 55 W power limit, board power sampled at about 50 Hz, greedy
decoding. Reading a prompt and writing an answer are different operations. A prompt is processed
with all of its tokens at once; an answer comes out one token at a time, each token waiting for the
one before it. Using a per-generated-token figure for prompt tokens assumes the two cost the same,
and nothing in that file says they do.

**Reason two, words are not tokens.** The 0.767 is joules per **token**. The classmate's 480 is a
count of **words**. A tokenizer cuts text into pieces that are often smaller than whole words, so
480 words of a policy document is not 480 tokens. It is not a fixed multiple of 480 either, because
the count depends on which words. Until you run the tokenizer over the actual passages, the number
that goes into the multiplication does not exist. That is Chapter 1's point arriving late.

**Reason three, two defensible readings differ by nearly a factor of three.** The same file records
$0.767$ joules per token counting the whole board's draw, and $0.268$ joules per token above idle,
with idle measured at 13.8 W. The second is the extra energy the work itself cost; the first
includes power the machine was drawing anyway.
$480 \times 0.767 = 368.16$ joules
$480 \times 0.268 = 128.64$ joules
$368.16 \div 128.64 = 2.86$
Two honest readings of one measurement differ by a factor of 2.86. Reporting 368.16 joules to two
decimal places claims a precision that the choice between those two numbers has already destroyed.

**Reason four, the retrieval is missing from the sum.** Embedding the query and scoring it against
every chunk costs energy too, and none of it is inside 0.767, which was measured on a language
model writing text, not on an embedding model searching.

**Reason five, it is one run.** One machine, one power limit, one prompt, one generation.
Chapter 12 puts an interval around numbers like this one, and a single figure written as 368.16
joules claims five figures of confidence that one run cannot support.

*The answer.* Any three of reasons one to four. Reason one and reason two are the two the problem
asks for by name. The honest version of the calculation is: tokenize the actual passages, measure
prompt processing separately from generation, state whether the figure is above idle or not, and
report a range rather than a single number.

*Where this goes wrong.* The slip here is not arithmetic. $480 \times 0.767 = 368.16$ is correct
arithmetic, and that is what makes the answer dangerous. The failure sits upstream of the
multiplication, in taking a number produced by one procedure and using it under another, and the
result looks entirely respectable when it comes out. It is the same shape as the chapter's sting:
pass three's mean gap of $0.055$ and pass two's $0.058$ are both correct numbers, and putting them
side by side is still a category error.

---

(answers-ch11)=
## Chapter 11. Can a model take a test?

These problems drill one habit in three forms: turning counts into proportions, decimals and
percentages; measuring every score against the chance level the test allows; and saying what a
measured accuracy does and does not let you claim.

Every measured number below sits in `lab/out/lab4_size_ladder.json`, `lab/out/we6_eval.json`,
`lab/out/we6b_eval_debiased.json` or `lab/out/theme_s_energy.json`, and each solution names the
file it came from.

### Warm-up

**1.** **What is asked.** Write one score three ways: as a fraction, as a decimal, and as a
percentage.

**What it tests.** Formula 11.1, accuracy as a sample proportion, and Formula 11.2, a proportion
written as a percentage, both in [Chapter 11](../ch/ch11.md). For what "out of" means, see
[Toolkit 12](math-toolkit.md#toolkit-proportions). For moving between the three forms, see
[Toolkit 11](math-toolkit.md#toolkit-percentages).

**Work it through.**

Step 1. Write down the two counts. $x$ is how many the model got right, and $n$ is how many you
asked.

$$x = 7 \qquad n = 20$$

Step 2. As a **fraction**, that is the raw record of what happened.

$$\frac{7}{20}$$

Step 3. As a **decimal**, carry out the division the fraction bar is asking for. On a phone
calculator: 7, then the divide key, then 20, then equals.

$$\hat{p} = 7 \div 20 = 0.35$$

Step 4. As a **percentage**, multiply by 100, which moves the decimal point two places to the
right.

$$P = 0.35 \times 100 = 35.0$$

**Answer.** $\frac{7}{20}$, or 0.35, or 35.0% correct on a bank of 20 questions.

**Check.** Multiply back: $20 \times 0.35 = 7$ questions, which is the count you started with.

**Where this goes wrong.** Two wrong answers are tempting. The first is $20 \div 7 = 2.857$, from
dividing the wrong way round. An accuracy above 1 is impossible, because no model answers more
questions than you asked it. The second is writing "0.35%", which is the decimal with a percent
sign stuck on the end of it. Say it out loud: "zero point three five percent" is far too small
for a model that answered seven of twenty.

---

**3.** **What is asked.** The chance level for four different option counts, each as a proportion
and as a percentage.

**What it tests.** Formula 11.3, $c = 1/k$, where $k$ is how many options one question offers.
Then Formula 11.2 to convert each answer. Definition 11.6 says what a chance level is.

**Work it through.** Divide 1 by the number of options, then multiply by 100.

(a) Four options. $c = 1 \div 4 = 0.25$, and $0.25 \times 100 = 25.0\%$.

(b) Two options. $c = 1 \div 2 = 0.5$, and $0.5 \times 100 = 50.0\%$.

(c) Five options. $c = 1 \div 5 = 0.2$, and $0.2 \times 100 = 20.0\%$.

(d) Eight options. $c = 1 \div 8 = 0.125$, and $0.125 \times 100 = 12.5\%$.

**Answer.** 0.25 and 25.0%; 0.5 and 50.0%; 0.2 and 20.0%; 0.125 and 12.5%.

**Check.** Every proportion landed between 0 and 1. The floor drops as the options rise: 50.0%,
then 25.0%, then 20.0%, then 12.5%. More wrong answers to land on means guessing pays less.

**Where this goes wrong.** Part (d) is the one that catches people. $1 \div 8 = 0.125$, and that
is 12.5%, not 1.25% and not 0.125%. One eighth of a hundred is twelve and a half, and that check
takes a second. The other tempting error is dividing $k \div 1$, which hands back 4, 2, 5 and 8.
A chance level of 4 would say a guesser gets four times as many questions right as you asked.

---

**5.** **What is asked.** Two accuracies as percentages, then the gap between them, in the right
unit.

**What it tests.** Formulas 11.1 and 11.2, used twice, then Formula 11.7, the difference between
two accuracies. The unit is the whole point of the problem. See
[Toolkit 11a](math-toolkit.md#toolkit-percentage-points).

**Work it through.**

Step 1. The first model. $x = 12$ and $n = 20$.

$$\hat{p}_1 = 12 \div 20 = 0.6 \qquad P_1 = 0.6 \times 100 = 60.0$$

Step 2. The second model. $x = 15$ and $n = 20$.

$$\hat{p}_2 = 15 \div 20 = 0.75 \qquad P_2 = 0.75 \times 100 = 75.0$$

Step 3. Formula 11.7. Subtract inside the brackets first, then multiply by 100.

$$0.75 - 0.6 = 0.15$$

$$d = 0.15 \times 100 = 15.0$$

**Answer.** 60.0% and 75.0%, and the second model is 15.0 **percentage points** above the first.

**Check.** Do it a second way, from the counts. The two models differ by $15 - 12 = 3$ questions,
and $3 \div 20 = 0.15$, which is 15.0 percentage points. Two routes, one answer.

**Where this goes wrong.** The tempting wrong sentence is "the second model is 15% better". That
is a different quantity. Formula 11.2a gives it: $75.0 \div 60.0 = 1.25$, then
$1.25 \times 100 = 125$, then $125 - 100 = 25.0$. So the second model scored **25.0% more** in
relative terms, and **15.0 percentage points** more in absolute terms. Both statements are true.
They are different numbers with different units, and only one of them belongs in any given
sentence.

---

**7.** **What is asked.** Which of four negative numbers is the largest, and then the argmax of
the list, given as a position.

**What it tests.** Definition 11.10, argmax, and reading negative numbers on a number line. The
signs $>$ and $<$ are in [Toolkit 19](math-toolkit.md#toolkit-inequalities).

**Work it through.** Take the comparisons one pair at a time. With negative numbers, the larger
one is the one **closer to zero**.

Step 1. $-2.4$ against $-3.9$. The distance from zero is 2.4 against 3.9, so $-2.4$ is closer to
zero and is therefore the larger. $-2.4 > -3.9$.

Step 2. $-2.4$ against $-7.1$. Distance 2.4 against 7.1, so $-2.4$ stays in front.

Step 3. $-2.4$ against $-2.9$. Distance 2.4 against 2.9, so $-2.4$ stays in front again. This is
the close comparison, and it is the one worth slowing down for.

Step 4. The largest value is $-2.4$. Now find where it sits. In the list
$[-3.9,\ -2.4,\ -7.1,\ -2.9]$, the number $-3.9$ is first and $-2.4$ is second.

$$\hat{a} = 2$$

**Answer.** The largest number is $-2.4$. The argmax is **position 2**, not $-2.4$. If those four
numbers were the log-probabilities of options A, B, C and D, the model's answer is **B**.

**Check.** An argmax on a four-option question has to be one of 1, 2, 3 or 4. If your answer has
a minus sign in it, you computed the max and not the argmax.

**One thing to state when you answer.** This book numbers positions from 1, so the first entry is
position 1 and the answer here is 2. Python numbers positions from 0 and would print 1 for the
same list. Neither is wrong. Say which convention you are using, because this is the difference
that turns into the wrong letter three steps later.

**Where this goes wrong.** Two wrong answers. Answering $-2.4$ ignores the word "position" in the
question. Answering $-7.1$ comes from sorting as though the minus signs were not there, and that
is a real bug that appears in working code, because the output looks perfectly reasonable.

---

**9.** **What is asked.** How many times bigger the second parameter count is than the first, to
four decimal places.

**What it tests.** Formula 11.6, the size ratio $r = N_2 / N_1$. Both counts are **real**, from
`lab/out/lab4_size_ladder.json`.

**Work it through.**

Step 1. Label them. $N_1 = 494{,}032{,}768$ for `Qwen2.5-0.5B-Instruct`, and
$N_2 = 3{,}085{,}938{,}688$ for `Qwen2.5-3B-Instruct`. The commas break the digits into groups of
three and change nothing; see [Toolkit 17](math-toolkit.md#toolkit-scientific-notation).

Step 2. Divide.

$$r = 3{,}085{,}938{,}688 \div 494{,}032{,}768 = 6.2464$$

to four decimal places.

To watch the division happen rather than trust the calculator, do it in two pieces.
$494{,}032{,}768 \times 6 = 2{,}964{,}196{,}608$. Take that off the top:
$3{,}085{,}938{,}688 - 2{,}964{,}196{,}608 = 121{,}742{,}080$. Then divide what is left over:
$121{,}742{,}080 \div 494{,}032{,}768 = 0.2464$. Add the two pieces: $6 + 0.2464 = 6.2464$.

**Answer.** 6.2464 times, a bare number with no units, because parameters were divided by
parameters.

**Check.** Multiply back: $494{,}032{,}768 \times 6.2464 = 3{,}085{,}926{,}282$. Compare that with
the real count, 3,085,938,688. They agree to five significant figures, and the gap of about
twelve thousand is rounding dust from stopping the ratio at four decimal places.

**Where this goes wrong.** Upside-down division gives
$494{,}032{,}768 \div 3{,}085{,}938{,}688 = 0.1601$, which would say the larger model is about a
sixth of the size of the smaller. A ratio of a bigger thing to a smaller thing must land above 1.
The other trap is the names: "0.5B" and "3B" suggest a ratio of exactly 6. The measured counts
give 6.2464. The names are rounded labels, and the file holds the counts.

### Practice

**11.** **What is asked.** Turn 25.0% into a count of questions, compare it with what a guesser
gets, and say in one sentence what the comparison shows.

**What it tests.** Formula 11.1 run backwards, Formula 11.4 for the guesser's count, and
Definition 11.6 for chance level. The measured score is **real**, from `lab/out/we6_eval.json`.

**Work it through.**

Step 1. Percentage back to a proportion. Divide by 100, which moves the point two places left.

$$25.0 \div 100 = 0.25$$

Step 2. Proportion back to a count. Formula 11.1 says $\hat{p} = x / n$, so
$x = \hat{p} \times n$.

$$x = 0.25 \times 20 = 5 \text{ questions}$$

That matches the file exactly: `lab/out/we6_eval.json` stores `"correct": 5` and `"n": 20`.

Step 3. What a guesser gets. Formula 11.3 first, with $k = 4$ options: $c = 1 \div 4 = 0.25$.
Then Formula 11.4.

$$E = 20 \times 0.25 = 5 \text{ questions}$$

Step 4. The gap, by Formula 11.7, with chance as the first value.

$$d = (0.25 - 0.25) \times 100 = 0 \times 100 = 0.0$$

**Answer.** 25.0% of 20 questions is 5 questions. A guesser gets 5 as well, so the model landed
exactly 0.0 percentage points above chance.

**The sentence.** This comparison tells you that the naive letter-ranking procedure found nothing
that separates this model from a guesser. It does not tell you that the model knows no
statistics. Those are two different claims, and only the first one was measured. The same model
on the same twenty questions scored 35.0% under one repaired procedure and 15.0% under another
(**real**, from `lab/out/we6b_eval_debiased.json`).

**Where this goes wrong.** The arithmetic slip is feeding the percentage into Formula 11.4:
$20 \times 25 = 500$ questions right out of 20. Percentages become proportions before they enter
a formula, every time. The bigger error is a sentence rather than a number: "the model was
guessing." Nobody measured that. What was measured is that this procedure cannot tell.

---

**13.** **What is asked.** Three consistency counts as proportions and percentages, and then how
many questions changed verdict for the smallest model.

**What it tests.** Formula 11.1 applied to a count that is not a count of correct answers, and
Definition 11.16, consistency under rotation. All three counts are **real**, from the
`consistent` field in `lab/out/lab4_size_ladder.json`.

**Work it through.** The formula does not change. A proportion is a count divided by a total, and
it does not care what is being counted.

`Qwen2.5-0.5B-Instruct`, 1 of 20:

$$1 \div 20 = 0.05 \qquad 0.05 \times 100 = 5.0\%$$

`Qwen2.5-1.5B-Instruct`, 13 of 20:

$$13 \div 20 = 0.65 \qquad 0.65 \times 100 = 65.0\%$$

`Qwen2.5-3B-Instruct`, 18 of 20:

$$18 \div 20 = 0.90 \qquad 0.90 \times 100 = 90.0\%$$

For the last part, the questions whose verdict changed are the ones that were not consistent.

$$20 - 1 = 19 \text{ questions}$$

**Answer.** 0.05 and 5.0%; 0.65 and 65.0%; 0.90 and 90.0%. For the smallest model, shuffling the
options changed whether it was right on **19 of the 20 questions**.

**Check.** Turn each proportion back into a count: $0.05 \times 20 = 1$, $0.65 \times 20 = 13$,
$0.90 \times 20 = 18$. Three whole numbers, all three matching the file.

**Where this goes wrong.** The first trap is reading consistency as a second accuracy. For the
smallest model, accuracy is 15.0% and consistency is 5.0%. Both came out of the same runs, and
they measure different things: one is how often the model was right, the other is how often
moving the options left its verdict alone. The second trap is answering the last part backwards,
saying "19 were consistent". One was consistent. Nineteen flipped.

---

**15.** **What is asked.** The four things that have to be attached to "92% accurate" before the
sentence means anything, and for each one, what a bad answer sounds like.

**What it tests.** Definition 11.4, which says accuracy belongs to the model *and* the benchmark
*and* the scoring procedure, plus Definition 11.6 for chance level. This is the chapter's opening
question asked again with a different number in it. There is no single right answer, so what
follows is what a strong response contains, then one example of such a response.

**What a strong response contains.** Four items, each written as a question you would ask, each
with a bad answer that shows the claim cannot be checked.

1. **How many questions?** This is $n$, the denominator. A bad answer is "thousands of queries",
   with no number in it. There is arithmetic you can do on the spot here. If the bank held 20
   questions, then $0.92 \times 20 = 18.4$ questions, and no model answers four tenths of a
   question, so the bank was not 20. It could have been 25, because $0.92 \times 25 = 23$, or 50,
   because $0.92 \times 50 = 46$. A vendor who will not give you $n$ is reporting a number nobody
   can reproduce.

2. **Which questions?** A bad answer is "real customer questions", with no bank you can look at.
   A score belongs to its questions. If the questions stay hidden, the 92% could have come from a
   set nobody would ever ask.

3. **What counted as a right answer, and who decided?** A bad answer is "our internal grading".
   The same model on the same twenty questions in this course scored 25.0%, 35.0% and 15.0% under
   three defensible procedures (**real**, from `lab/out/we6b_eval_debiased.json`). A score with no
   procedure attached is a range pretending to be a number.

4. **What would a machine that knows nothing have scored?** A bad answer is "accuracy is
   accuracy". If the questions are yes or no, chance is $1 \div 2 = 0.5$, which is 50.0%, and 92%
   sits $92.0 - 50.0 = 42.0$ percentage points above the floor. If the questions are open-ended
   with no options to pick from, chance is near zero and the same 92% is a far larger
   achievement.

A strong response may add a fifth: **the margin of error**. Twenty questions is not enough to pin
a score down. In this chapter a 95.0% on twenty questions carried a margin of $\pm 9.6$ points
(**real**, from `rotation_se` in `lab/out/lab4_size_ladder.json`, multiplied by 100 and then by
1.96, which is [Chapter 12](../ch/ch12.md)).

**One worked example of such a response.**

> Before I believe "92% accurate" I need four things attached to it. How many questions: 92% of
> 20 is 18.4, which is not a whole number, so the bank was not twenty, and they have not said
> what it was. Which questions: I want to see the bank, because a score belongs to the questions
> that produced it. What counted as right, and who decided: the same model on one bank can score
> 25.0% or 35.0% depending on how the answer is pulled out of it. And what a machine that knows
> nothing would have scored: on four options that is 25.0%, on two options it is 50.0%, and until
> I know which, I cannot tell whether 92% is impressive or ordinary. Without those four, "92%" is
> a number with no test underneath it.

---

**17.** **What is asked.** An accuracy, a chance level, and the distance between them, on a
five-option test.

**What it tests.** Formula 11.1, Formula 11.2, Formula 11.3 with $k = 5$, and Formula 11.7.
**Made up for practice**; no model in this course sat a five-option test.

**Work it through.**

Step 1. Accuracy. $x = 18$ and $n = 40$.

$$\hat{p} = 18 \div 40 = 0.45 \qquad P = 0.45 \times 100 = 45.0\%$$

Step 2. Chance level, with five options.

$$c = 1 \div 5 = 0.2 \qquad 0.2 \times 100 = 20.0\%$$

Step 3. The distance above chance, by Formula 11.7.

$$0.45 - 0.2 = 0.25 \qquad d = 0.25 \times 100 = 25.0$$

**Answer.** 45.0% accuracy, a chance level of 20.0%, and 25.0 percentage points above chance.

**Check.** Turn the accuracy back into a count: $40 \times 0.45 = 18$ questions. Correct. A second
check worth doing: the room on this test runs from the 20.0% floor up to 100%, which is 80
percentage points wide, and $25 \div 80 = 0.3125$, so this model is about 31.3% of the way up
from the floor.

**Where this goes wrong.** The tempting slip is using 25.0% as the chance level, because most of
this chapter works with four options and that number is already in your hand. This test has five
options, so the floor is 20.0%. The second trap is treating this 45.0% as the same achievement as
a 45.0% on a four-option test. There the floor is 25.0%, and the score would be only
$45.0 - 25.0 = 20.0$ points above it, not 25.0.

---

**19.** **What is asked.** The step from 70.0% to 95.0% measured two ways, then one sentence using
each number correctly.

**What it tests.** Formula 11.7 for the gap in percentage points, and Formula 11.2a for the
relative increase. Both scores are **real**, from the `rotation_accuracy` field in
`lab/out/lab4_size_ladder.json`.

**Work it through.**

**(a) The gain in percentage points.** Formula 11.7 works in proportions, so use 0.70 and 0.95.

Step 1. $\hat{p}_1 = 0.70$ and $\hat{p}_2 = 0.95$.

Step 2. Subtract inside the brackets. $0.95 - 0.70 = 0.25$.

Step 3. Multiply by 100. $d = 0.25 \times 100 = 25.0$.

The step is worth **25.0 percentage points**.

**(b) The gain as a relative percentage.** Formula 11.2a works in percentages, so use 70.0 and
95.0.

Step 1. $P_1 = 70.0$ and $P_2 = 95.0$.

Step 2. Divide, inside the brackets. $95.0 \div 70.0 = 1.3571$ to four decimal places. The digits
carry on past that, so keep four places and round at the end; see
[Toolkit 16](math-toolkit.md#toolkit-rounding).

Step 3. Still inside the brackets, multiply by 100. $1.3571 \times 100 = 135.71$.

Step 4. Leave the brackets and take off the hundred percent you started with.
$135.71 - 100 = 35.71$, which to one decimal place is **35.7%**.

**The two sentences.**

> The 3B model scored 25.0 percentage points higher than the 1.5B model on this bank.

> In relative terms, the 3B model's score is 35.7% higher than the 1.5B model's.

**Check.** Add the gain back onto the starting score: $70.0 + 25.0 = 95.0$. Correct. For part (b),
multiply back: $70.0 \times 1.3571 = 94.997$, which is 95.0 to one decimal place.

**Where this goes wrong.** Dropping Step 4 gives 135.7% instead of 35.7%. Say that wrong answer
out loud and it collapses: if the 3B had scored 135.7% *more* than the 1.5B, it would have scored
70.0 plus 135.7% of 70.0, which is 164.997%, and no accuracy can pass 100%. The other error is
swapping the units and writing "25% higher" for part (a). That would mean
$70.0 \times 1.25 = 87.5\%$, which is not what happened.

### Stretch

**21.** **What is asked.** Two different explanations for a below-chance score, and for each, a
measurement that would tell you whether that explanation is the right one.

**What it tests.** Definition 11.6, chance level; Definition 11.8, answer extraction as a choice
somebody made; and the warning in Section 11.2 that scoring at or below chance is a statement
about your measurement first. There is no single right answer, so what follows is what a strong
response contains, then two explanations worked out.

**What a strong response contains.** Two mechanisms that would really produce a score below the
floor, not two ways of saying "the model is bad". For each mechanism, a measurement whose result
could come out either way. A measurement that can only agree with you is not a measurement.

**Explanation 1: the extraction procedure is reading a fixed preference, not knowledge.**

If the model leans hard on one letter and the answer key rarely uses that letter, the score falls
below chance by construction. The model is not picking evenly, and its uneven picking is aimed at
the wrong place.

*The measurement.* Count which letter the model picked on each question, and compare that with
where the right answers actually sit. This costs nothing extra, because the picks are already
recorded.

*What it showed here* (**real**). `lab/out/lab4_size_ladder.json` stores `first_pick_spread` for
`Qwen2.5-0.5B-Instruct` as A 16, B 2, D 2, and C never. A model picking evenly would put about
$20 \times 0.25 = 5$ picks on each letter. This one put $16 \div 20 = 0.8$, which is 80.0%, of
its picks on one letter. Now the key: counting the `correct_answer` field over the twenty records
in `lab/out/we6_eval.json` gives B 8, C 8, D 2, A 2. The right answer is A on
$2 \div 20 = 0.1$, which is 10.0%, of the questions. A model that nearly always says A, on a bank
where A is nearly never right, scores below chance every time.

*A second measurement inside the same explanation.* Move the options and see whether the verdict
moves with them. The lab did this, and the same model was consistent on 1 of 20 questions
(**real**, same file), which is $1 \div 20 = 0.05$, or 5.0%.

**Explanation 2: the bank or the answer key is broken.**

If the recorded right answer is wrong on several items, or if two options are both defensible,
then a model that reads the options carefully is marked wrong for being right. That produces a
below-chance score with no defect in the model at all.

*The measurement.* Have two people answer the bank from scratch, without seeing the key, and
compare. Every item where the two people agree with each other and the key disagrees with both is
a candidate key error.

*A cheaper version of the same measurement.* Put a model already known to be strong through the
same bank under the same procedure. A broken key hurts a strong model too.

*What it showed here* (**real**). `Qwen2.5-3B-Instruct` scored 19 of 20 on this exact bank under
the debiased procedure, which is $19 \div 20 = 0.95$, or 95.0%. That is evidence against a broken
key.

**A third explanation worth having.** A bug in the code or the prompt: the wrong tokens compared,
or the options printed in one order and scored in another. The measurement is to print the exact
text sent to the model, and the exact token ids read back, before trusting any score. Section
11.3 does that, and it is where the system line nobody wrote turns up inside the prompt.

**What a strong response also says.** One below-chance score on twenty questions could be
ordinary bad luck. The 15.0% in this chapter carries a margin of $\pm 15.6$ points (**real**),
which is wide enough to reach the 25.0% chance level. The reason to suspect the measurement
rather than luck is not the score on its own. It is the score **together with** a consistency
count of 1 of 20.

---

**23.** **What is asked.** A hypothesis linking two patterns, and the extra measurement you would
want before believing it.

**What it tests.** Definition 11.16, consistency under rotation, and the habit of stating a claim
so that a measurement could contradict it. The problem says you are not expected to be right, you
are expected to be checkable. Both patterns are **real**, from `lab/out/lab4_size_ladder.json`.

**The two patterns, laid out first.**

| Model | Naive | Debiased | Gap | Consistent, of 20 |
|---|---|---|---|---|
| `Qwen2.5-0.5B-Instruct` | 25.0% | 15.0% | $25.0 - 15.0 = 10.0$ points | 1 |
| `Qwen2.5-1.5B-Instruct` | 80.0% | 70.0% | $80.0 - 70.0 = 10.0$ points | 13 |
| `Qwen2.5-3B-Instruct` | 95.0% | 95.0% | $95.0 - 95.0 = 0.0$ points | 18 |

**What a strong response contains.** A hypothesis with a mechanism in plain English, a prediction
that could fail, an honest note on where the three data points do not support it, and a named
next measurement.

**One worked example of such a response.**

> **Hypothesis.** The gap between the two scoring columns measures how much of the naive score
> came from a fixed preference for a letter rather than from reading the options. A model that
> reads the options gives the same verdict wherever the right answer is printed, so rotating the
> options changes little, its consistency count is high, and the two procedures agree, which
> makes the gap small. A model leaning on a letter gives a different verdict when the options
> move, so its consistency count is low and the two procedures disagree.
>
> **The prediction.** High consistency should come with a small gap. The top of the ladder fits:
> 18 of 20 consistent, and a gap of 0.0 points.
>
> **Where the three points do not support it.** The bottom two rows have the same gap, 10.0
> points each, while their consistency counts are 1 and 13, which are nothing like each other. So
> the data support "high consistency goes with a small gap" and do not support "the gap falls
> smoothly as consistency rises". Three points cannot tell those two claims apart.

**The additional measurement.** The letter spread each model produced, which is already in the
file as `first_pick_spread` and is **real**: A 16, B 2, D 2 for the 0.5B; C 7, B 7, A 4, D 2 for
the 1.5B; B 8, C 7, A 3, D 2 for the 3B. Each row adds to 20. The hypothesis predicts that a
model whose picks are spread evenly over the four letters has a small gap. The 1.5B's picks are
already fairly even and its gap is still 10.0 points, so the prediction is under strain, and that
is why it is worth measuring on more models and on far more questions. Twenty questions carries a
margin of about $\pm 15.6$ points on the smallest model's score (**real**), which is wider than
any of the gaps being compared.

---

**25.** **What is asked.** Why "is it worth it" cannot be answered from three numbers, and what
else you would need.

**What it tests.** Definition 11.4, that an accuracy belongs to a bank and a procedure; the
warning in Section 11.5 about what this experiment does not license; and the habit of putting a
benefit and a cost into the same currency before comparing them. All three numbers are **real**:
6.2464 and the 80.0 percentage points from `lab/out/lab4_size_ladder.json`, and 2.53 from
`lab/out/theme_s_energy.json`.

**Why the question cannot be answered from those three numbers.** "Worth it" compares a benefit
with a cost in one shared currency. None of the three numbers carries a currency.

- **80.0 percentage points** is a benefit measured on twenty introductory statistics questions,
  under one scoring procedure. The two scores it came from carry margins of $\pm 15.6$ points and
  $\pm 9.6$ points (**real**, from `rotation_se` in `lab/out/lab4_size_ladder.json`, each
  multiplied by 100 and then by 1.96). A gap built from two numbers that wide is not a precise
  80.0.
- **2.53 times the energy per token** is a ratio, measured on one prompt on one laptop GPU
  (**real**: 1.940526 joules per token for the largest model and 0.767069 for the smallest, so
  $1.940526 \div 0.767069 = 2.53$ to two decimal places). A ratio says nothing about how much
  energy that is in total.
- **6.2464 times the parameters** is a size, not a cost. It turns into a cost only when it meets
  a machine: 0.988 GB against 6.172 GB at FP16 (**real**, same file).

**What else you would need.**

1. **The task, and whether the bank resembles it.** Twenty statistics questions say nothing about
   Kern County water law, or about answering a tow yard's phone at eleven at night.
2. **The volume.** Energy per token is a rate, and a rate becomes a quantity when you multiply it
   by how many tokens you will really generate. Over one million tokens:
   $0.767069 \times 1{,}000{,}000 = 767{,}069$ joules for the small model, and
   $1.940526 \times 1{,}000{,}000 = 1{,}940{,}526$ joules for the large one. A watt-hour is 3,600
   joules, so $767{,}069 \div 3{,}600 = 213.1$ watt-hours and
   $1{,}940{,}526 \div 3{,}600 = 539.0$ watt-hours. The difference is
   $539.0 - 213.1 = 325.9$ watt-hours per million tokens. Carrying the unrounded figures through
   instead gives 326.0, and the difference between the two is rounding dust.
3. **What an error costs.** Twenty percentage points of accuracy matter differently when the
   wrong answer is a missed tow and when it is a missed medication.
4. **The hardware you have, and the wait you will accept.** The measured time per forward pass was
   0.0638 seconds for the smallest model and 0.2062 seconds for the largest (**real**, from
   `infer_s` divided by the 100 forward passes each model ran), so the large model is
   $0.2062 \div 0.0638 = 3.23$ times slower per question.
5. **Who pays.** The person buying the machine, the person paying the power bill, and the person
   who lives with a wrong answer are often three different people.
6. **Whether the accuracy gain survives a bigger bank.** Twenty questions cannot settle it. That
   is [Chapter 12](../ch/ch12.md).

**One worked example of such a response.**

> These three numbers give a benefit in percentage points, a cost in energy per token, and a size
> in parameters. None of them is in the same units as the others, so no arithmetic turns them
> into one answer. The 80.0 percentage points came from twenty questions and carries margins of
> $\pm 15.6$ and $\pm 9.6$ points, so the benefit itself is not pinned down. The 2.53 is a ratio,
> and it becomes a real cost only when multiplied by a volume: at a million tokens it is the
> difference between 213.1 and 539.0 watt-hours. Whether 326 watt-hours per million tokens is
> worth up to 80 percentage points on a statistics quiz depends on what the model is being asked
> to do, what a wrong answer costs, what hardware is available, and who is paying the bill. Those
> four things are not in the three numbers, so the question is not yet one that anybody can
> answer.

---

**27.** **What is asked.** Design an experiment to test the claim "consistency under option
rotation keeps rising as models get bigger", and say what result would show the claim to be
false.

**What it tests.** Definition 11.12, the controlled experiment; Definition 11.13, the confound;
Definition 11.16, consistency; and Formula 11.8 for what the design costs in forward passes.
There is no single right design, so what follows is what a strong response contains, then one
design written out.

**What a strong response contains.** Five parts, and the fifth is the one most answers leave out.
Which models, and why. How many questions, and why that number. What is held constant. What is
measured. And the result, stated in advance, that would make you give the claim up.

**One worked example of such a design.**

> **The models.** Five members of one family: `Qwen2.5-Instruct` at 0.5B, 1.5B, 3B, 7B and 14B.
> One family, because a model from another company would move the training data, the recipe and
> the tokenizer at the same time as the size, and then no result could be attributed to size
> alone. That is Definition 11.13, the confound.
>
> **The questions.** 200, not 20. Twenty questions gave a margin of $\pm 15.6$ points on one of
> the scores in this chapter, which is wider than most of the differences anyone wants to argue
> about. [Chapter 12](../ch/ch12.md)'s standard error for a proportion, at $n = 200$ and a score
> near 90%, is $\sqrt{0.9 \times 0.1 \div 200}$. Work it out one step at a time:
> $0.9 \times 0.1 = 0.09$, then $0.09 \div 200 = 0.00045$, and the square root of 0.00045 is
> 0.0212. Multiply by 100 for percentage points: 2.1. Multiply by 1.96 for the usual 95% margin:
> $2.1 \times 1.96 = 4.2$ percentage points. The same arithmetic at $n = 20$ gives 13.1 points.
> So ten times the questions narrowed the margin about three times over, not ten times, because
> the number of questions sits under a square root. See
> [Toolkit 9](math-toolkit.md#toolkit-square-roots).
>
> **Held constant.** The prompt text and the chat template, the answer key, the wording of every
> option, the set of rotations used (all four), the extraction rule (rank A, B, C and D, take the
> argmax), the machine, the storage precision, and the order the questions are asked in.
>
> **What is measured.** The consistency count out of 200, from Definition 11.16: a question
> counts as consistent when the model's verdict is the same on all four rotations.
>
> **What it costs.** Formula 11.8 with $n = 200$ and $r = 5$ gives
> $F = 200 \times 5 = 1{,}000$ forward passes per model, so
> $5 \times 1{,}000 = 5{,}000$ passes in total. At the 3B model's measured 0.2062 seconds per
> pass, that is $5{,}000 \times 0.2062 = 1{,}031$ seconds, and $1{,}031 \div 60 = 17.2$ minutes.
> The 7B and the 14B are slower per pass than the 3B, so treat 17.2 minutes as a floor rather
> than an estimate.
>
> **What would show the claim false.** A larger model in the family with a **lower** consistency
> count than a smaller one, by more than the margin. Write the rule down before running anything:
> at 200 questions and a score near 90%, a drop of more than 4.2 percentage points counts, and
> 4.2% of 200 questions is $0.042 \times 200 = 8.4$, so call it a drop of 9 questions or more. A
> drop of two or three questions does not count, because the measurement cannot see a difference
> that small.
>
> **What would not show it false.** One model tying with the model below it. A tie fits "keeps
> rising" flattening out near the top, which is what the ladder in this chapter already hints at.

**Why the last part is the part that matters.** A claim that no possible result could contradict
is not a scientific claim. Deciding the falsifying result **before** the run is what stops you
from looking at the numbers and then deciding what you expected, and that is
[Chapter 14](../ch/ch14.md).

---

(answers-ch12)=
## Chapter 12. Is that score real?

These problems drill one habit: never report a benchmark score on its own, and always ask how
many questions it rests on, how wide the honest interval around it is, and whether the formula
you reached for was built for a count that small.

Every solution below uses $z^{\star} = 1.96$, the 95 percent critical value, because that is the
only critical value this book uses. The named formulas are the chapter's own: Formula 12.1 for
the sample proportion, 12.2 for the standard error, 12.3 for the Wald interval, 12.4 for Wilson,
12.5 for plus four, 12.6 for the bootstrap percentile interval, 12.8 for the possible scores, and
12.9 for how many questions a benchmark needs. All of them are restated in the
[formula summary](formulas.md), section 6.

### Warm-up

**1.** **What is asked.** Write one accuracy, 12 right out of 20, three different ways.

**What it tests.** Formula 12.1, the sample proportion, $\hat{p} = x \div n$, and the three ways
of writing the same share. Fractions, decimals and percentages are taught from zero in
[Toolkit 11](math-toolkit.md#toolkit-percentages) and
[Toolkit 12](math-toolkit.md#toolkit-proportions).

**Step 1, write down the two counts.** $x = 12$ questions right, $n = 20$ questions asked.

**Step 2, the fraction.** The fraction is the two counts stacked, $\dfrac{12}{20}$. You can
reduce it by dividing top and bottom by 4: $12 \div 4 = 3$ and $20 \div 4 = 5$, so
$\dfrac{12}{20} = \dfrac{3}{5}$. Both are correct. $\dfrac{12}{20}$ is the better one to report,
because it keeps the number of questions visible.

**Step 3, the decimal.** Divide the top by the bottom.

$12 \div 20 = 0.6$

**Step 4, the percentage.** Multiply the decimal by 100.

$0.6 \times 100 = 60.0$ percent

**The answer.** $\dfrac{12}{20}$, or $\dfrac{3}{5}$; $\hat{p} = 0.6$; 60.0 percent.

**Where this goes wrong.** The tempting slip is dividing the wrong way round,
$20 \div 12 = 1.6667$. That is a proportion above 1, which Formula 12.1's sanity check rules out:
a model cannot get more questions right than it was asked. Put the smaller count on top. The
second slip is writing the decimal with a percent sign after it, "0.6 percent". That is
six-tenths of one percent, a hundred times smaller than the answer.

**3.** **What is asked.** Work out $\hat{p}\,(1 - \hat{p})$ at $\hat{p} = 0.4$ and at
$\hat{p} = 0.6$, then say what you notice and why.

**What it tests.** The inside of Formula 12.2, the standard error. $\hat{p}$ is the share the
model got right and $1 - \hat{p}$ is the share it got wrong.

**At $\hat{p} = 0.4$.**

Step 1, the share wrong. $1 - 0.4 = 0.6$

Step 2, multiply. $0.4 \times 0.6 = 0.24$

**At $\hat{p} = 0.6$.**

Step 1, the share wrong. $1 - 0.6 = 0.4$

Step 2, multiply. $0.6 \times 0.4 = 0.24$

**What you notice.** The two answers are the same number, 0.24.

**Why.** Look at what you multiplied. The first time it was 0.4 times 0.6. The second time it was
0.6 times 0.4. It is the same pair of numbers in the other order, and multiplying two numbers
gives the same answer whichever one you write first. The pair swaps because 0.4 and 0.6 sit the
same distance from 0.5, one-tenth below and one-tenth above. Whatever the share right is, the
share wrong is its partner.

**What it means for a benchmark.** The standard error at 40 percent and the standard error at 60
percent are identical. On a 20-question test both come out as

$0.24 \div 20 = 0.012$, and $\sqrt{0.012} = 0.109545$, so $SE = 0.1095$, which is 10.95
percentage points.

A model scoring 40 percent is measured exactly as precisely as a model scoring 60 percent. The
precision depends on how far the score sits from 0.5, not on which side of 0.5 it sits.

**Where this goes wrong.** The common slip is squaring $\hat{p}$ instead of multiplying it by the
share wrong: $0.4 \times 0.4 = 0.16$. That drops the $1 -$ from the formula. Check yourself by
asking whether your two shares add to 1. Here $0.4 + 0.6 = 1$, so they do.

**5.** **What is asked.** A model scores 10 out of 20. Compute the standard error, showing all
five steps.

**What it tests.** Formula 12.2, $SE = \sqrt{\dfrac{\hat{p}\,(1 - \hat{p})}{n}}$. The square root
key is [Toolkit 9](math-toolkit.md#toolkit-square-roots).

**Step 1, the accuracy.**

$\hat{p} = 10 \div 20 = 0.5$

**Step 2, the share wrong.**

$1 - 0.5 = 0.5$

**Step 3, multiply the two shares.**

$0.5 \times 0.5 = 0.25$

**Step 4, divide by the number of questions.**

$0.25 \div 20 = 0.0125$

**Step 5, take the square root.**

$\sqrt{0.0125} = 0.111803$

**The answer.** $SE = 0.1118$, which is 11.18 percentage points. A score measured on twenty
questions, with the model sitting at a coin flip, typically misses the truth by about 11.18
percentage points.

**A fact worth keeping.** 0.1118 is the largest standard error any 20-question test can produce.
Every other value of $\hat{p}$ gives a smaller one, because $\hat{p}(1-\hat{p})$ is largest at
0.5. Compare it with the chapter's real run at 5 of 20, where $SE = 0.0968$.

**Where this goes wrong.** Two slips. Stopping at step 4 and reporting 0.0125 leaves out the
square root, and 0.0125 is not a typical distance from anything. The second is distrusting step
5: the square root made the number larger, from 0.0125 up to 0.1118. That is correct. The square
root of any number between 0 and 1 is bigger than the number itself. Check it on a number you
know, $\sqrt{0.25} = 0.5$.

**7.** **What is asked.** A model measures 90 percent accuracy with a margin of error of 0.1315.
Write the two ends of the Wald interval, as decimals and as percentages.

**What it tests.** Formula 12.3, $\hat{p} \pm z^{\star} \times SE$. The margin of error has
already been worked out for you, so this is the last steps only. Interval notation is
[Toolkit 19](math-toolkit.md#toolkit-inequalities).

**Step 1, turn the percentage into a decimal.**

$90 \div 100 = 0.9$, so $\hat{p} = 0.9$

**Step 2, subtract the margin to get the low end.**

$0.9 - 0.1315 = 0.7685$

**Step 3, add the margin to get the high end.**

$0.9 + 0.1315 = 1.0315$

**Step 4, convert both to percentages.**

$0.7685 \times 100 = 76.85$ percent

$1.0315 \times 100 = 103.15$ percent

**The answer.** $(0.7685, \; 1.0315)$, which is $(76.85\%, \; 103.15\%)$.

**What is wrong with it.** The high end is above 1. An accuracy of 103.15 percent would mean the
model answered more questions correctly than it was asked. Every step above is arithmetically
correct, and the answer is still impossible. That is Formula 12.3 being used outside its
conditions: this margin comes from 18 right and 2 wrong out of 20, and the bell-curve
approximation behind the Wald interval needs a decent number of each, with ten of each as the
usual rule of thumb.

**Where this goes wrong.** The tempting repair is to chop the high end back to 1.0000 and report
$(0.7685, 1.0000)$. That is common mistake 4 in the chapter. Wilson, worked in Try it 12.3 for
this same 18 out of 20, gives $(0.6990, 0.9721)$, which is lower at **both** ends. Trimming the
top leaves the bottom wrong.

**9.** **What is asked.** Three conversions between decimals, percentages and fractions.

**What it tests.** [Toolkit 11](math-toolkit.md#toolkit-percentages). One rule does all three: to
go from a decimal to a percentage multiply by 100, and to go back divide by 100.

**Convert 0.0603 to a percentage.**

$0.0603 \times 100 = 6.03$ percent

The chapter reports this same number as 6.0 percent, because it rounds every final percentage to
one decimal place. 6.03 and 6.0 are the same value reported to different precision.

**Convert 44.0 percent to a decimal.**

$44.0 \div 100 = 0.44$

**Convert $5/20$ to a percentage.** Two steps, and doing both matters more than the order.

$5 \div 20 = 0.25$

$0.25 \times 100 = 25.0$ percent

**The answers.** 6.03 percent; 0.44; 25.0 percent.

**Where this goes wrong.** Moving the decimal point the wrong way is the whole risk here. Writing
0.0603 as "0.0603 percent" keeps the digits and loses a factor of 100. A quick check: a
percentage is always 100 times bigger than the decimal that means the same thing, so the
percentage should look larger. 6.03 is larger than 0.0603, so that one is right. The second check
runs the other way: 0.44 is smaller than 44.0, as it must be.

### Practice

**11.** **What is asked.** A model answers 15 of 20 correctly. Compute the accuracy, the standard
error, the margin of error, and the 95 percent Wald interval.

**What it tests.** Formulas 12.1, 12.2 and 12.3 in sequence, which is the chapter's main chain.

**Step 1, the accuracy (Formula 12.1).**

$\hat{p} = 15 \div 20 = 0.75$

**Step 2, the share wrong.**

$1 - 0.75 = 0.25$

**Step 3, multiply the two shares.**

$0.75 \times 0.25 = 0.1875$

**Step 4, divide by the number of questions.**

$0.1875 \div 20 = 0.009375$

**Step 5, take the square root (Formula 12.2).**

$\sqrt{0.009375} = 0.096825$, so $SE = 0.0968$, which is 9.68 percentage points

**Step 6, the margin of error (Formula 12.3).**

$1.96 \times 0.0968 = 0.189728$, so the margin is $0.1897$

**Step 7, the low end.**

$0.75 - 0.1897 = 0.5603$

**Step 8, the high end.**

$0.75 + 0.1897 = 0.9397$

**Step 9, convert both ends to percentages.**

$0.5603 \times 100 = 56.03$, which rounds to $56.0$ percent

$0.9397 \times 100 = 93.97$, which rounds to $94.0$ percent

**The answer.** $\hat{p} = 0.75$, $SE = 0.0968$, a margin of error of $0.1897$, and a 95 percent
Wald interval of $(0.5603, \; 0.9397)$, which is $(56.0\%, \; 94.0\%)$.

**Three checks.** The measurement sits exactly in the middle: $75.0 - 56.03 = 18.97$ and
$93.97 - 75.0 = 18.97$. The width is twice the margin: $2 \times 0.1897 = 0.3794$, which is 37.94
percentage points, or 38.0 points after rounding. And the standard error, 0.0968, is identical to
the one the chapter got for 5 right out of 20. That is problem 3 showing up again:
$0.75 \times 0.25$ and $0.25 \times 0.75$ are the same multiplication, so 15 of 20 and 5 of 20
are measured with exactly the same precision.

**If you carried full precision.** A computer keeps $SE = 0.09682458$ and gets a margin of
$0.18977618$, then ends of $0.560224$ and $0.939776$. Those still round to 56.0 percent and 94.0
percent, so the two routes agree at the precision this answer is reported to.

**Where this goes wrong.** The most common slip is reporting $\hat{p}$ plus or minus the standard
error, $(0.6532, 0.8468)$, leaving out the 1.96. That is roughly a 68 percent interval, not a 95
percent one, and it makes a 20-question test look about twice as precise as it is.

**13.** **What is asked.** Compute the plus four interval for 8 out of 10, then compare it with
the Wilson interval $(0.4902, 0.9433)$.

**What it tests.** Formula 12.5. Pretend you asked four more questions and the model got two of
them right and two wrong, then run the Wald formula on the pretend numbers.

**Step 1, add two to the number right.**

$8 + 2 = 10$

**Step 2, add four to the number of questions.**

$10 + 4 = 14$

**Step 3, the pretend accuracy.**

$\tilde{p} = 10 \div 14 = 0.714286$

**Step 4, the pretend share wrong.**

$1 - 0.714286 = 0.285714$

**Step 5, multiply the two shares.**

$0.714286 \times 0.285714 = 0.204082$

**Step 6, divide by the pretend number of questions.**

$0.204082 \div 14 = 0.014577$

**Step 7, take the square root.**

$\sqrt{0.0145773} = 0.120736$

**Step 8, multiply by the critical value.**

$1.96 \times 0.120736 = 0.236643$

**Step 9, subtract and add.**

$0.714286 - 0.236643 = 0.477643$, which rounds to $\mathbf{0.4776}$

$0.714286 + 0.236643 = 0.950929$, which rounds to $\mathbf{0.9509}$

**The answer.** $(0.4776, \; 0.9509)$, which is $(47.76\%, \; 95.09\%)$.

**How close the shortcut got.** Compare each end with Wilson.

$0.4902 - 0.4776 = 0.0126$, which is 1.26 percentage points at the low end

$0.9509 - 0.9433 = 0.0076$, which is 0.76 percentage points at the high end

The plus four interval is 47.33 percentage points wide and Wilson is 45.31 points wide, so the
shortcut comes out about 2 points wider overall. On an interval already more than 45 points wide,
being 1 point out at one end changes no decision anybody would make. For a quick check with no
computer, plus four is close enough. For a published result, use Wilson. What both of them share
is that neither one escapes past 1, where Wald gave 1.0479 on this same data.

**Where this goes wrong.** Step 6 is the trap. It is easy to add four to the number of questions
in step 2, then divide by the original 10 in step 6. That gives
$0.204082 \div 10 = 0.020408$, then $\sqrt{0.020408} = 0.142857$, then a margin of
$1.96 \times 0.142857 = 0.28$, and an interval of $(0.4343, 0.9943)$. That high end is within a
hundredth of escaping past 1 again, which is the thing the shortcut exists to prevent. Once you
have added the four pretend questions, they stay added everywhere.

**15.** **What is asked.** From the frequency table in section 12.6, what share of the 10,000
resamples came out at 20 percent or below?

**What it tests.** Reading a frequency table, together with the fact from Formula 12.8 that a
20-question test has only 21 possible scores, so "20 percent or below" means five specific rows
and no others.

**Step 1, find the rows that qualify.** The scores at or below 20 percent are 0.0 percent, 5.0
percent, 10.0 percent, 15.0 percent and 20.0 percent. Their counts are 25, 231, 719, 1,353 and
1,899.

**Step 2, add them up, one addition at a time.**

$25 + 231 = 256$

$256 + 719 = 975$

$975 + 1{,}353 = 2{,}328$

$2{,}328 + 1{,}899 = 4{,}227$

**Step 3, divide by the number of resamples.**

$4{,}227 \div 10{,}000 = 0.4227$

**Step 4, convert to a percentage.**

$0.4227 \times 100 = 42.27$ percent

**The answer.** 4,227 of the 10,000 resamples, which is 42.27 percent.

**Check it a second way.** Add the share column instead of the count column:
$0.25 + 2.31 + 7.19 + 13.53 + 18.99 = 42.27$ percent. Two routes, same number.

**What it means.** The real measurement was 25.0 percent. More than four in ten imitation tests,
built out of that same measurement, landed at 20 percent or lower. That is not the bootstrap
being pessimistic. That is what 20 questions can do.

**Where this goes wrong.** "Or below" includes 20 percent itself. Leaving that row out gives
2,328, which is 23.28 percent, and that is the answer to a different question, "below 20
percent". The other slip is forgetting the 25 resamples that scored 0 percent, because a small
row at the top of a table is easy to skip.

**17.** **What is asked.** A colleague asks which of the two halves of the real run, 20 percent or
30 percent, is the model's accuracy. Write a three-sentence reply.

**This one has no single right answer**, so here is what a strong reply contains, and then one
reply that contains it.

A strong reply does four things. It refuses the question as asked, because neither half is the
model's accuracy. It gives the reason in one clause: a score belongs to the model and the
particular questions together, and the two halves asked different questions. It puts a size on
the wobble, using a number rather than the word "varies". And it says what to report instead.

**One reply that does all four.**

> Neither, because a score belongs to the model and the questions together, and those two halves
> asked different questions of the same model on the same day. A ten-question half has a standard
> error of about 12.65 percentage points at 20 percent and about 14.49 percentage points at 30
> percent, so a 10-point gap between the halves is smaller than the wobble you should expect from
> cutting a small test in two. The number to report is the whole run: 5 right out of 20, which is
> 25.0 percent, with a 95 percent interval from 6.0 percent to 44.0 percent on 20 questions.

**Where those two standard errors come from.** Formula 12.2 with $n = 10$.

At $\hat{p} = 0.2$: $0.2 \times 0.8 = 0.16$, then $0.16 \div 10 = 0.016$, then
$\sqrt{0.016} = 0.126491$, which is 12.65 percentage points.

At $\hat{p} = 0.3$: $0.3 \times 0.7 = 0.21$, then $0.21 \div 10 = 0.021$, then
$\sqrt{0.021} = 0.144914$, which is 14.49 percentage points.

**Where this goes wrong.** The tempting reply is "average them, so 25 percent". The average lands
on the right number here, because the two halves are the whole test, but the reasoning is wrong
and it will mislead you the next time. Averaging two disagreeing measurements is not a repair for
variability; it hides the finding, which is common mistake 9. The other weak reply is "it
depends" with no number attached. A colleague cannot act on "it depends". They can act on "plus
or minus about 12 points on ten questions".

**19.** **What is asked.** From the two Berkeley result files in section 12.7, verify both of
Qwen-2.5-7B's scores from the raw points, compute the gap in percentage points, and compute what
share of the 58 rows changed.

**What it tests.** Formula 12.1 again, with one change: the top and the bottom are **points**, not
questions, because that exam awards partial credit. The two files are
`scores_20260427_194044.csv` and `scores_20260427_195142.csv` in `ds-modules/Small_Models_SP26`,
folder `8-Evals/updated_data100_eval/results/`. They are not our measurements.

**Step 0, check the row count first.** The exam has 29 questions and two models sat it, so each
file should hold $2 \times 29 = 58$ rows. It does. When that multiplication does not match the
row count, stop and find out why before computing anything else.

**Step 1, the run at 19:40:44.** Qwen-2.5-7B earned 32.00 points out of 47 available.

$32.00 \div 47 = 0.680851$, which rounds to $0.6809$

$0.6809 \times 100 = 68.09$ percent

**Step 2, the run at 19:51:42.** The same model earned 33.83 points out of the same 47.

$33.83 \div 47 = 0.719787$, which rounds to $0.7198$

$0.7198 \times 100 = 71.98$ percent

**Step 3, the gap.**

$0.7198 - 0.6809 = 0.0389$

$0.0389 \times 100 = 3.89$, which rounds to $\mathbf{3.9}$ percentage points

Carrying full precision instead gives $0.719787 - 0.680851 = 0.038936$, which is 3.8936
percentage points and rounds to the same 3.9.

**Step 4, the share of rows that changed.** Three rows out of 58 differ between the two files.

$3 \div 58 = 0.051724$

$0.051724 \times 100 = 5.1724$, which is about $\mathbf{5.2}$ percent of the rows

**The answer.** 68.09 percent and 71.98 percent, a gap of 3.9 percentage points, produced by 5.2
percent of the rows changing.

**The control, which is what makes this mean something.** The other model in the same two files,
Llama-3.2-3B, earned 27.83 points in both runs. $27.83 \div 47 = 0.592128$, which rounds to
0.5921 both times. One model moved and the other did not, so the finding is about that model's
answers and not about the service having a bad evening.

**Where this goes wrong.** Two places. First, writing the gap as "3.9 percent" instead of "3.9
percentage points". Those mean different things, and the percent version is false here; see
[Toolkit 11](math-toolkit.md#toolkit-percentage-points). Second, and more serious, putting a Wald
interval around 0.6809. Formula 12.2 assumes every item is scored right or wrong and every item
counts the same. This exam gives partial credit, and one of the three changed rows moved from 0.0
to 0.33 points. The formula would still return a number, and that number would not mean what the
formula says it means. Section 12.7 refuses to compute it, and so should you.

### Stretch

**21.** **What is asked.** Compute the Wilson interval for 0 right out of 20, compare it with the
Wald interval, and explain what Wilson did differently.

**What it tests.** Formula 12.4, at the hardest place for the Wald formula to survive: an
accuracy sitting exactly on the boundary.

**First, the Wald interval, so the comparison stands on its own.** Formula 12.2 with $x = 0$:

$\hat{p} = 0 \div 20 = 0$, then $1 - 0 = 1$, then $0 \times 1 = 0$, then $0 \div 20 = 0$, then
$\sqrt{0} = 0$

So $SE = 0$, the margin is $1.96 \times 0 = 0$, and the Wald interval is $(0.0000, \; 0.0000)$.

**Now Wilson, in the chapter's nine steps.**

**Step 1, square the critical value.** $1.96 \times 1.96 = 3.8416$

**Step 2, build the bottom.** $20 + 3.8416 = 23.8416$

**Step 3, the top of the centre.** Half of 3.8416 is $3.8416 \div 2 = 1.9208$, so
$0 + 1.9208 = 1.9208$

**Step 4, the centre.** $1.9208 \div 23.8416 = 0.080565$

**Step 5, under the root.** $\hat{p}(1 - \hat{p}) = 0 \times 1 = 0$; then $0 \times 20 = 0$; then
a quarter of 3.8416 is $3.8416 \div 4 = 0.9604$, and $0 + 0.9604 = 0.9604$

**Step 6, the root.** $\sqrt{0.9604} = 0.98$, exactly, because $0.98 \times 0.98 = 0.9604$

**Step 7, the multiplier.** $1.96 \div 23.8416 = 0.082209$

**Step 8, the half-width.** $0.082209 \times 0.98 = 0.080565$

**Step 9, the two ends.**

$0.080565 - 0.080565 = 0.0000$

$0.080565 + 0.080565 = 0.161130$, which rounds to $\mathbf{0.1611}$

**The answer.** $(0.0000, \; 0.1611)$, which is $(0.00\%, \; 16.11\%)$.

**Why the low end is exactly 0 and not below it.** The half-width came out equal to the centre, to
every decimal place. That is not luck. The half-width is $(1.96 \times 0.98) \div 23.8416$, and
$1.96 \times 0.98 = 1.9208$, which is the same top the centre had. Both pieces are
$1.9208 \div 23.8416$. So the low end is $0.080565 - 0.080565$, which is 0. Formula 12.4 lands on
the boundary without crossing it, which is the property it was built to have.

**What Wilson did differently, in plain terms.** The Wald interval builds its width out of the
score you measured. Measure zero right answers and the width is built out of zero, so it
collapses to a single point. That report, "the model's accuracy is 0 percent, with no uncertainty
at all", is the strongest claim anywhere in the chapter, and it rests on 20 questions. It is too
strong: a model whose true accuracy is 10 percent would get 0 out of 20 fairly often.

Wilson does not centre on the score you measured. It adds about 1.92 pretend right answers and
about 3.84 pretend questions, which pulls the centre away from the edge, up to 0.0806. And the
term $z^{\star 2} \div 4$ under the root, 0.9604, stays there even when $\hat{p}(1 - \hat{p})$ is
zero, so the half-width never collapses.

**Why it is the better report.** "Somewhere between 0 percent and 16.11 percent" is a statement
you could defend. "Exactly 0 percent, full stop" is not, and a reader would have no way to see
that it came from 20 questions rather than 20,000.

**Where this goes wrong.** Reporting the Wald answer as a real interval is the trap in this
problem, and it is tempting because nothing in the arithmetic complains. There is no value above
1 to catch your eye, as there was at 8 out of 10. This is the failure mode section 12.7 warns
about: a formula used outside its conditions can return something that looks perfectly fine.

**23.** **What is asked.** The Wald interval on the real run was $(6.0\%, 44.0\%)$ and the
bootstrap interval was $(5.0\%, 45.0\%)$. Explain why a percentile interval on a 20-question test
tends to land on rounder, wider values than the formula does.

**What it tests.** Formula 12.8, granularity, joined to Formula 12.6, the percentile interval.
This asks for a written argument, so here is what a strong answer contains and then a worked
version of it.

A strong answer names three things: the list of scores that can exist on a 20-question test, the
fact that percentile ends are chosen out of that list rather than computed, and the reason the
choice has to step outward rather than inward.

**The worked version.**

**Step 1, list what can exist.** By Formula 12.8, a test of $n = 20$ can produce only
$0 \div 20$, $1 \div 20$, and so on up to $20 \div 20$. That is $20 + 1 = 21$ scores, spaced
$1 \div 20 = 0.05$ apart, which is 5 percentage points. Every resample is itself a 20-question
test, so every one of the 10,000 resampled scores is one of those 21 values.

**Step 2, find which two get reported.** Formula 12.6 says the ends are the values at ranks
$0.025 \times 10{,}000 = 250$ and $0.975 \times 10{,}000 = 9{,}750$ in the sorted list.

**Step 3, walk the frequency table to those ranks.** Add the counts from the bottom.

$25$ resamples at 0 percent

$25 + 231 = 256$ at 5 percent or below

$256 + 719 = 975$ at 10 percent or below

$975 + 1{,}353 = 2{,}328$ at 15 percent or below

$2{,}328 + 1{,}899 = 4{,}227$ at 20 percent or below

$4{,}227 + 2{,}014 = 6{,}241$ at 25 percent or below

$6{,}241 + 1{,}650 = 7{,}891$ at 30 percent or below

$7{,}891 + 1{,}103 = 8{,}994$ at 35 percent or below

$8{,}994 + 597 = 9{,}591$ at 40 percent or below

$9{,}591 + 270 = 9{,}861$ at 45 percent or below

The 250th value: 25 is below 250 and 256 is not, so the 250th smallest score is **5.0 percent**.
The 9,750th value: 9,591 is below 9,750 and 9,861 is not, so the 9,750th smallest is **45.0
percent**.

**Step 4, say why that is wider.** The Wald ends, 6.0 percent and 44.0 percent, are not on the
list of 21 possible scores. The percentile method cannot report them, because it does not compute
a number, it points at one of the values it already has. The nearest available values are 5
percent, below 6 percent, and 45 percent, above 44 percent. It has to step **outward** rather
than inward, because stepping inward would leave more than 2.5 percent of the resamples outside
each end, and the interval would no longer be a 95 percent interval. With a grid 5 percentage
points apart, that outward step can cost up to 5 points at each end. Here it cost 1 point at each
end, so the bootstrap interval is 40.0 points wide against Wald's 38.0.

**The thing to take away.** The formula's 6.0 percent and 44.0 percent look more precise, and they
are not. They are decimals the test could never produce. The bootstrap is showing you the
coarseness. The formula is smoothing over it.

**Where this goes wrong.** The tempting conclusion is that running more resamples would sharpen
the ends. It would not. A million resamples still land on multiples of 5 percentage points,
because those are the only scores a 20-question test can give. More resamples smooth the
simulation's own noise and add no questions, which is common mistake 6. The only thing that
narrows this interval is a longer test.

**25.** **What is asked.** Two parts. Compute the worst-case half-width that 1,000 questions buys,
then compute how many questions would be needed to halve that half-width again, and comment on
whether that is reasonable.

**What it tests.** Formula 12.9 forwards and backwards, and the square-root relationship between
precision and cost. "Worst case" means $\hat{p} = 0.5$, because Formula 12.2 is largest there.

**Part 1, the half-width at 1,000 questions.**

Step 1, the worst-case share product. $0.5 \times 0.5 = 0.25$

Step 2, divide by the number of questions. $0.25 \div 1000 = 0.00025$

Step 3, take the square root. $\sqrt{0.00025} = 0.015811$

Step 4, multiply by the critical value. $1.96 \times 0.015811 = 0.030990$

Step 5, convert to percentage points. $0.030990 \times 100 = 3.0990$, which rounds to
$\mathbf{3.1}$ percentage points.

That matches the price list in section 12.8.

**Part 2, halving it.**

Step 1, name the target. Half of 0.030990 is $0.030990 \div 2 = 0.015495$, which is about 1.5
percentage points.

Step 2, use the shape of Formula 12.9 rather than the decimal. The formula contains
$\left(\dfrac{z^{\star}}{h}\right)^{2}$, so $n$ depends on $h$ **squared**. Halving $h$ doubles
$z^{\star} \div h$, and doubling something before you square it multiplies the square by
$2 \times 2 = 4$. So $n$ goes up by a factor of 4.

$1{,}000 \times 4 = \mathbf{4{,}000}$ questions

Step 3, check it forwards with Formulas 12.2 and 12.3 at $n = 4{,}000$.

$0.25 \div 4000 = 0.0000625$

$\sqrt{0.0000625} = 0.0079057$

$1.96 \times 0.0079057 = 0.0154952$, which is 1.5495 percentage points

That is exactly half of 3.0990, so 4,000 is right.

:::{warning} A rounding trap in this problem, worth naming
If you put the rounded 0.015495 straight back into Formula 12.9 you get
$1.96 \div 0.015495 = 126.4924$, then $126.4924 \times 126.4924 = 16{,}000.33$, then
$16{,}000.33 \times 0.25 = 4{,}000.08$, and step 6 of Formula 12.9 says round **up**, which gives
4,001.

That extra question is rounding, not statistics. Rounding up is right when the target $h$ is a
number you chose. Here the target was itself computed and then rounded, so the round-up turns a
difference in the sixth decimal place into a whole question. Carry more digits, or use the factor
of four, and the answer is 4,000. This is the rule from
[Toolkit 16](math-toolkit.md#toolkit-rounding), round once at the end, arriving with teeth.
:::

**The answer.** 1,000 questions buys a worst-case half-width of about 3.1 percentage points.
Halving that to about 1.5 percentage points takes 4,000 questions.

**Is that reasonable to ask of a benchmark?** There is no single right answer, so judge it against
a cost and a purpose. The cost is real: 4,000 questions is four times the writing, four times the
expert review, four times the work of keeping the questions out of every model's training data,
and four times the compute every time any model is evaluated. What it buys is 1.5 points instead
of 3.1.

Whether that is worth paying depends on how large a difference you need to detect. Two models 10
percentage points apart are already separated at 1,000 questions. Two models 2 percentage points
apart are not separated even at 4,000, because each interval still reaches about 1.5 points
either way. So the honest way to choose a benchmark length is to start from the size of the gap
you need to see, not from a round number. Miller's floor of at least 1,000 questions is where a
benchmark starts being able to signal anything at all, and section 12.8 shows it sits close to
the 1,068 questions a 3-point interval needs.

One more caution, which problem 26 and [Chapter 13](../ch/ch13.md) take further. Comparing two
models by checking whether their separate intervals overlap is the wrong analysis when both
models sat the **same** questions. A method that uses the pairing detects smaller differences
from the same number of questions, so the answer to "how many questions" also depends on which
test you plan to run.

---

(answers-ch13)=
## Chapter 13. Measure your measurement

These problems drill one habit: before you believe a benchmark number, work out which procedure
made it, what a guesser would average under that same procedure, and how many questions the
comparison actually rested on.

Every formula named below is stated in full, with every symbol defined, in
[Chapter 13](../ch/ch13.md) and again in the [formula summary](formulas.md), sections 6.1 and 6.6
to 6.8. Where a solution says a number is measured, the file in `lab/out/` that holds it is named
beside it. Where a solution uses invented numbers, it says so.

### Warm-up: can you do the arithmetic?

**1.** *Write "9 of 20 right" as a decimal and as a percentage.*

This is Formula 13.1 with the counting already done for you. Nine of the twenty $g(M, q_i)$
values are 1 and eleven are 0, so the sum on top is 9. See
[the toolkit on proportions](../appendix/math-toolkit.md#toolkit-proportions) and
[the toolkit on percentages](../appendix/math-toolkit.md#toolkit-percentages).

Step 1, divide the number right by the number asked.

$$9 \div 20 = 0.45$$

Step 2, multiply by 100 to turn that share into a percentage. A percentage is a share written out
of a hundred instead of out of one, so multiplying by 100 is the whole of the conversion.

$$0.45 \times 100 = 45$$

**Answer.** 0.45 as a decimal, **45.0%** as a percentage.

**Check it.** Multiply back: $0.45 \times 20 = 9$, a whole number of questions. If multiplying
back gives you something like 7.4, one of the two numbers is wrong.

**Where this goes wrong.** The tempting slip is $20 \div 9 = 2.222$. Twenty is the bigger number,
and people reach for "the big one divided by the small one" without noticing. A proportion can
never be above 1, so 2.222 fails the first check in Formula 13.1 before you do anything else with
it.

---

**3.** *A 40-question bank has four options per question. How many questions would a random
guesser be expected to get right?*

This is Formula 13.2 followed by Formula 13.3. Neither is a measurement. Both are arithmetic
about the test, and no model is run to produce either number.

Step 1, the chance level, from Formula 13.2. There are $k = 4$ options and one is correct.

$$c = \frac{1}{k} = 1 \div 4 = 0.25$$

Step 2, the expected count, from Formula 13.3, with $n = 40$ questions.

$$E = c \times n = 0.25 \times 40 = 10$$

Step 3, the short route, to check yourself.

$$E = \frac{n}{k} = 40 \div 4 = 10$$

**Answer.** A guesser would average **10 questions of 40**, which is 25.0%.

**Check it.** $E$ can never exceed $n$, and 10 is below 40. Both routes must agree, and they do.

**Where this goes wrong.** Two slips. The first is $40 \times 4 = 160$, multiplying by the option
count instead of dividing by it. The 160 is impossible on a 40-question bank, which is why the
"$E$ cannot exceed $n$" check is worth running every time. The second is subtler: students see the
count go from 5 on a 20-question bank to 10 on a 40-question bank and conclude that guessing got
easier. It did not. The expected **count** doubled because the bank doubled. The expected
**share** is 25.0% either way.

One caution, the same one Formula 13.3 gives. "Expected 10" means the long-run average over many
attempts. A guesser on one sitting could get 6, or 15.

---

**5.** *Turn each of these into the other form: 0.45 into a percentage; 62% into a decimal; 17 out
of 25 into a percentage.*

Three conversions, all of them Formula 13.1 read in one direction or the other. See
[the toolkit on percentages](../appendix/math-toolkit.md#toolkit-percentages).

**0.45 into a percentage.** Multiply by 100.

$$0.45 \times 100 = 45, \text{ so } 45.0\%$$

**62% into a decimal.** Divide by 100.

$$62 \div 100 = 0.62$$

**17 out of 25 into a percentage.** Two steps. Divide first, then multiply.

$$17 \div 25 = 0.68$$

$$0.68 \times 100 = 68, \text{ so } 68.0\%$$

**Answer.** 45.0%, 0.62, and 68.0%.

**Check it.** A share of a test lives between 0 and 1 as a decimal, and between 0% and 100% as a
percentage. If a decimal comes out above 1, the $\times 100$ went the wrong way.

**Where this goes wrong.** The common wrong answer to the middle one is "62.0", leaving the
percentage sign off and calling it a decimal. It is tempting because the digits do not change and
nothing looks broken. A decimal of 62.0 would mean the model got 6,200% of the questions right.
On the third one, the wrong answer is $17 \div 100 = 0.17$, dividing by a hundred out of habit
because a percentage was mentioned. The bottom of the fraction is the number of questions, 25,
not 100.

---

**7.** *A model scored 60% naive and 45% debiased on the same bank. What is the debiasing gap in
percentage points?*

This is Formula 13.8, $\Delta = \hat{p}^{(\text{naive})} - \hat{p}^{(\text{rot})}$. The symbol
$\Delta$ is a capital Greek D, said "delta", and this book uses it for a difference. See
[the toolkit on Greek letters](../appendix/math-toolkit.md#toolkit-greek).

Working in decimals first.

$$\Delta = 0.60 - 0.45 = 0.15$$

$$0.15 \times 100 = 15.0$$

Working in percentages directly gives the same thing.

$$60 - 45 = 15$$

**Answer.** The debiasing gap is **15.0 percentage points**.

**Check it.** A gap of 15 points on a bank of $n$ questions must correspond to a whole number of
questions. On 20 questions that would be 3 questions, on 40 questions 6 questions. If your gap
does not translate into a whole number of questions, one of the two scores was rounded from
something else.

**Where this goes wrong.** The most common wrong answer is "a drop of 25%". That number is not
nonsense; it is the drop measured **relative to the starting score**, because
$15 \div 60 = 0.25$ and $0.25 \times 100 = 25$. It answers a different question. A drop from 60%
to 45% is 15 percentage **points**, and it is a drop of 25 per **cent** of the original value.
Reporting the wrong one of those inflates or deflates your result. See
[the toolkit on percentage points](../appendix/math-toolkit.md#toolkit-percentage-points).

The second slip is subtracting the wrong way and reporting $-15$. Formula 13.8 fixes the order:
naive first, debiased second.

### Practice: can you apply it?

**9.** *A 25-question bank has four options. A procedure chose A eleven times, B six, C five, D
three. Compute the over-choice ratio for every option, and check that the four ratios average
to 1.*

This is Formula 13.4, $R_j = m_j / E$, where $m_j$ is how many times option $j$ was chosen and
$E = n/k$ is how often a procedure with no position preference would land on each option.
**These counts are made up for practice. No model produced them.**

Step 1, the tally check, before any division. Every question got exactly one answer, so the four
counts must add to the number of questions.

$$11 + 6 + 5 + 3 = 25 \quad ✅$$

Step 2, the expected count. Here $n = 25$ and $k = 4$.

$$E = \frac{n}{k} = 25 \div 4 = 6.25$$

Step 3, one division per option.

$$R_A = \frac{11}{6.25} = 11 \div 6.25 = 1.76$$

$$R_B = \frac{6}{6.25} = 6 \div 6.25 = 0.96$$

$$R_C = \frac{5}{6.25} = 5 \div 6.25 = 0.80$$

$$R_D = \frac{3}{6.25} = 3 \div 6.25 = 0.48$$

Step 4, the average of the four ratios.

$$1.76 + 0.96 + 0.80 + 0.48 = 4.00$$

$$4.00 \div 4 = 1.00 \quad ✅$$

**Answer.** $R_A = 1.76$, $R_B = 0.96$, $R_C = 0.80$, $R_D = 0.48$, and the four average to 1.00.

**Reading it.** Option A was taken about three quarters more often than an unbiased procedure
would take it. Option D was taken under half as often. That is a real lean towards A, and it is
mild next to the 0.5B model's measured $R_A = 3.2$ in section 13.3 of
[Chapter 13](../ch/ch13.md).

**Where this goes wrong.** The tempting wrong answer is $R_A = 11 \div 5 = 2.2$, carrying the
$E = 5$ from the chapter's worked example across to a different bank. It is tempting because the
chapter used 5 four times in a row and the number sticks. $E$ belongs to the bank in front of you:
25 questions, not 20. The check in step 4 catches it. With $E = 5$ the four ratios would sum to
$25 \div 5 = 5.0$ and average 1.25, which is not 1, and that tells you the expected count was
wrong before you draw any conclusion from it.

The second slip is refusing to accept 6.25 as an expected count. Twenty-five does not divide by
four evenly, and it does not have to. $E$ is an average, not a count of anything that happened.

---

**11.** *A four-option question has its correct answer in position 2, which is option C. Work out
where the correct answer sits after each of the four cyclic rotations, and check that all four
positions are visited exactly once.*

This is Formula 13.6, $g_r = (g - r) \bmod k$, with $g = 2$ and $k = 4$. Positions are counted
from 0, so position 0 is option A, position 1 is B, position 2 is C and position 3 is D. The
symbol $\bmod$ means "the remainder after dividing", and when the number underneath goes negative
you add $k$ until it is not.

Rotation $r = 0$, no slide.

$$g_0 = (2 - 0) \bmod 4 = 2 \bmod 4 = 2 \rightarrow \text{option C}$$

Rotation $r = 1$.

$$g_1 = (2 - 1) \bmod 4 = 1 \bmod 4 = 1 \rightarrow \text{option B}$$

Rotation $r = 2$.

$$g_2 = (2 - 2) \bmod 4 = 0 \bmod 4 = 0 \rightarrow \text{option A}$$

Rotation $r = 3$. The subtraction goes below zero here, so add 4.

$$g_3 = (2 - 3) \bmod 4 = (-1) \bmod 4 = 3 \rightarrow \text{option D}$$

because $-1 + 4 = 3$.

**Answer.** The correct answer sits at **C, then B, then A, then D**.

**Check it.** Across the four rotations every letter must appear exactly once. The list reads C,
B, A, D. Four letters, each once. ✅

**Where this goes wrong.** Two slips, and both land on the last line.

The first is stopping at $2 - 3 = -1$ and writing "position $-1$", or wrapping it to position 1.
Position $-1$ does not exist on a four-option question, and wrapping to 1 would put the answer at
B for a second time, which the check catches at once: B twice and D never.

The second is counting positions from 1 instead of from 0. Then "position 2" means option B, and
every line of the answer shifts by one letter. Formula 13.6 counts from 0, and the symbol table
says so. When a problem hands you both a number and a letter, as this one does with "position 2,
which is option C", use the letter to confirm which counting the question is using before you
start.

---

**13.** *Model A scores 0.55 and model B scores 0.80, each on 40 questions. Compute the unpaired
standard error, and give the 95% interval for the difference in percentage points.*

This is Formula 13.9. **These two accuracies are made up for practice. No model produced them.**
Everything sits under one square root:

$$
SE_{\text{unpaired}} = \sqrt{\frac{\hat{p}_A(1 - \hat{p}_A)}{n} + \frac{\hat{p}_B(1 - \hat{p}_B)}{n}}
$$

Step 0, a sanity check on the inputs. $0.55 \times 40 = 22$ and $0.80 \times 40 = 32$. Both whole
numbers, so both scores are possible on a 40-question bank.

Step 1, model A's piece, with $\hat{p}_A = 0.55$.

$1 - 0.55 = 0.45$

$0.55 \times 0.45 = 0.2475$

$0.2475 \div 40 = 0.0061875$

Step 2, model B's piece, with $\hat{p}_B = 0.80$.

$1 - 0.80 = 0.20$

$0.80 \times 0.20 = 0.16$

$0.16 \div 40 = 0.004$

Step 3, add the two pieces, inside the square root.

$0.0061875 + 0.004 = 0.0101875$

Step 4, take the square root of that total.

$\sqrt{0.0101875} = 0.100933$

Step 5, the measured gap.

$0.80 - 0.55 = 0.25$

Step 6, build the 95% interval. The multiplier 1.96 is the one [Chapter 12](../ch/ch12.md)
introduced for 95%.

$1.96 \times 0.100933 = 0.197829$

$0.25 - 0.197829 = 0.052171$

$0.25 + 0.197829 = 0.447829$

Step 7, turn each end into percentage points by multiplying by 100.

$0.052171 \times 100 = 5.2171$, which rounds to $5.2$

$0.447829 \times 100 = 44.7829$, which rounds to $44.8$

**Answer.** $SE_{\text{unpaired}} = 0.100933$, and the 95% interval for the difference is
$(+5.2, +44.8)$ **percentage points**. It excludes zero.

**Where this goes wrong.** The headline slip, and the one the chapter warns about in Common
mistake 7, is taking a square root of each piece and then adding:

$\sqrt{0.0061875} = 0.078661$

$\sqrt{0.004} = 0.063246$

$0.078661 + 0.063246 = 0.141906$

That answer is wrong by about 40%, and it is tempting because the two fractions are written on
either side of a plus sign and look like separate objects. The square root sign covers the whole
sum. On a bank of a few dozen questions, a standard error above about 0.15 is a sign this happened.

The second thing to watch is the word "unpaired". If these two models sat the **same** 40
questions, this is the wrong tool and Formula 13.10 is the right one. The problem does not say
they sat the same questions, so Formula 13.9 is what it asks for. When the design is paired, the
unpaired interval is wider than it needs to be, by a factor this chapter measured at 1.14 on the
lab's own comparison.

---

**15.** *For the table in problem 14, run McNemar's exact test.*

The table from problem 14, restated so you do not have to look it up. Two models answered the same
25 questions. Both were right on 15, both wrong on 3, only model B right on 6, and only model A
right on 1. **These counts are made up for practice. No model produced them.**

| | B correct | B wrong |
|---|---|---|
| **A correct** | 15 | 1 |
| **A wrong** | 6 | 3 |

This is Formula 13.11, with model A as the first system and model B as the second.

$$
p = 2 \sum_{j=0}^{\min(b,\,c)} \binom{b+c}{j} \left(\frac{1}{2}\right)^{b+c}
$$

Step 1, check the table adds to the number of questions.

$$15 + 3 + 6 + 1 = 25 \quad ✅$$

Step 2, read off the two disagreement counts. $b$ is the count only the second system got right,
$c$ is the count only the first got right.

$$b = 6 \quad \text{(only B right)}, \qquad c = 1 \quad \text{(only A right)}$$

Step 3, add them to get the number of coin tosses.

$$b + c = 6 + 1 = 7$$

The other 18 questions leave the test. Both models did the same thing on them, so they say nothing
about which model is better.

Step 4, find where the sum stops.

$$\min(b, c) = \min(6, 1) = 1$$

So the sum has two terms, $j = 0$ and $j = 1$.

Step 5, the coin-toss part, a half multiplied by itself seven times. Halving from 1:

$1 \div 2 = 0.5$, then $0.25$, then $0.125$, then $0.0625$, then $0.03125$, then $0.015625$, then
$0.0078125$.

$$\left(\tfrac{1}{2}\right)^{7} = 0.0078125$$

Step 6, the term for $j = 0$. This is the outcome where all seven disagreements go model B's way.

$$\binom{7}{0} \times 0.0078125 = 1 \times 0.0078125 = 0.0078125$$

Step 7, the term for $j = 1$. This is the outcome that actually happened, six to one.

$$\binom{7}{1} \times 0.0078125 = 7 \times 0.0078125 = 0.0546875$$

Step 8, add the two terms for the one-sided total.

$$0.0078125 + 0.0546875 = 0.0625$$

Step 9, double it, because the test is two-sided.

$$p = 2 \times 0.0625 = \mathbf{0.125}$$

**Answer.** The two-sided exact p-value is **0.125**, which is $\tfrac{1}{8}$. It does not clear
0.05, so this comparison is not statistically significant.

**Check it.** A p-value lands between 0 and 1, and 0.125 does. The "choose" numbers for seven are
$1, 7, 21, 35, 35, 21, 7, 1$, and they add to 128, which is $2^{7}$. If your "choose" numbers do
not add to $2^{b+c}$, one of them is wrong.

**For context.** Model A was right on $15 + 1 = 16$ of 25, which is $16 \div 25 = 0.64$, or 64.0%.
Model B was right on $15 + 6 = 21$ of 25, which is $21 \div 25 = 0.84$, or 84.0%. The gap is
$84.0 - 64.0 = 20.0$ percentage points, and it cannot be called significant.

**Where this goes wrong.** Three ways, in order of how often they happen.

Reporting 0.0625 and stopping. That is the one-sided answer, and it clears 0.05, which makes it
the attractive place to stop. Unless you decided before seeing the data that only one model could
possibly be better, double it.

Using only the $j = 0$ term, giving $2 \times 0.0078125 = 0.015625$. This one is worse than the
first, because it looks like a complete calculation and lands well under 0.05. The sum runs from
$j = 0$ up to $\min(b, c)$, and it has to include the outcome you actually saw, not only the
outcomes more extreme than it.

Running the test on all 25 questions instead of the 7 disagreements. Then
$\left(\tfrac{1}{2}\right)^{25}$ is a vanishingly small number, and the test says something
spectacular and false.

One last observation worth sitting with. Formula 13.12 says the smallest p-value seven
disagreements can produce is $2 \times \left(\tfrac{1}{2}\right)^{7} = 0.015625$. So this design
**could** have reached significance. It did not, because the split was six to one rather than
seven to nothing. Compare that with the chapter's own comparison, where five disagreements made
significance impossible before the models were loaded.

---

**17.** *A colleague reports: "Our model beat theirs, 78% to 71%, on our 100-question internal
benchmark." Write five questions you would ask before believing it. For each one, say what a bad
answer would look like.*

This problem asks for a written argument, so there is no single right answer. Here is what a
strong response contains, and then one worked example of such a response.

**What a strong response contains.** Five questions that each attack a different link in the
chain, not five versions of "is the sample big enough". Between them they should cover: the
scoring procedure, whether the comparison was paired, how many questions the models disagreed on,
where the bank came from and whether either model was tuned on it, and what interval sits around
the 7-point gap. Each question needs a **bad answer** attached, because naming the bad answer is
what turns a question into a test. A response that lists five reasonable questions without saying
what would worry you has done half the work.

Start from the arithmetic, since it is small. $78 - 71 = 7$ percentage points, which on a
100-question bank is **7 questions**.

**A worked example of a strong response.**

**Question 1. What exactly was the scoring procedure, from prompt to verdict?**
A good answer names how the prompt was built, how the model's output was turned into a choice,
and how ties were broken. A bad answer is "we used standard accuracy". That is Definition 13.2
being skipped: a model outputs probabilities over tokens, never a circled letter, so somebody
wrote an extraction rule and that rule is half the measurement. The chapter's own model scored
25.0%, 35.0% and 15.0% on one question bank under three defensible rules.

**Question 2. What was the choice spread, against the answer key spread?**
A good answer is a table of how often each option was chosen next to how often each option was
correct. A bad answer is "we did not look". That is exactly the number that showed the 0.5B model
answering A on 16 of 20 questions while the key rewarded A twice. A procedure that never selects
an option has a ceiling, and nobody mentions ceilings.

**Question 3. Did both models answer the same 100 questions, and what is the contingency table?**
A good answer gives four numbers that add to 100. A bad answer is "they both scored on our
benchmark", which leaves open whether the results were paired. If they were paired and the
analysis was not, the interval is wider than it needs to be, and more importantly the right test
was never run.

**Question 4. On how many questions did the two models disagree, and how did those split?**
This is the question the whole chapter builds to. A good answer is a number like "they disagreed
on 15, splitting 11 for ours and 4 for theirs". A bad answer is "the gap was 7 points", which
answers a different question. Two illustrations, both **made up for practice**, show why it
matters. If the models disagreed on 15 questions splitting 11 to 4, McNemar's exact test gives
$p = 0.118469$, which does not clear 0.05. If they disagreed on only 7 and the split was 7 to 0,
the test gives $p = 2 \times \left(\tfrac{1}{2}\right)^{7} = 0.015625$, which does. **Same
7-point gap, opposite verdicts.** The gap alone cannot tell you which situation you are in.

**Question 5. Who wrote the bank, and was it used to choose or tune either model?**
A good answer names the author, says when the questions were written, and says whether any model
decisions were made while looking at these questions. A bad answer is "it is our internal
benchmark, we have used it for years". A bank you have optimised against stops being a test of
the model and becomes a record of your own tuning, and the other team's model never got that
advantage.

**A sixth thing worth saying out loud, though it is not a question.** Even a clean answer to all
five leaves you with a 7-point gap and no interval around it. Ask for the interval. If it is not
there, say so before the number goes into a purchasing decision.

### Stretch: can you reason with it?

**19.** *The naive procedure chose option C zero times out of twenty, and C was correct on eight
questions. Work out the highest score that procedure could possibly have reached on this bank, and
explain why every reported benchmark score has a ceiling set by its procedure.*

The two counts here are measured. The letter counts A 16, B 2, C 0, D 2 are in
`lab/out/we6b_eval_debiased.json` under `naive_letter_counts`. The answer key spread A 2, B 8,
C 8, D 2 is in
[the datasets appendix](../appendix/datasets.md), section 3.2.

**The arithmetic.**

Step 1, count the questions the procedure can never get right. The correct answer is C on 8
questions, and this procedure selected C zero times, so all 8 of those are marked wrong no matter
what the model knows.

Step 2, count what is left.

$$20 - 8 = 12 \text{ questions}$$

Step 3, turn that into a share and a percentage.

$$\frac{12}{20} = 12 \div 20 = 0.60, \qquad 0.60 \times 100 = 60.0\%$$

**Answer.** The ceiling is **60.0%**, which is 12 of 20 questions. The measured score was 25.0%,
so the ceiling was not the thing holding this run down. The ceiling is still worth knowing,
because it was there before any model was loaded.

**Why every reported score has a ceiling, in plain words.** A score is not produced by the model
alone. It is produced by the model **and** a rule that turns the model's output into a right or a
wrong. That rule can only ever report the answers it is capable of selecting. If the rule cannot
select option C, then option C being correct is the same as the model being wrong, and there is no
amount of knowledge that changes it. The ceiling is the share of the bank the rule can still get
right after you remove everything it cannot reach.

Ceilings are almost never printed, and they are easy to compute. Take the answer key spread, take
the procedure's choice spread, and look for options the procedure never picks. Anything the
procedure cannot reach is a subtraction from 100% that happened before the model spoke.

**Where this goes wrong.** The tempting wrong answer is 40%, from $8 \div 20 = 0.40$. That number
is real; it is the share of the bank the procedure **throws away**. The ceiling is what is left
after throwing it away, which is $100 - 40 = 60$. The two numbers add to 100, and picking the
wrong one of the pair is the whole slip.

A second, deeper wrong answer is "a better model would fix it". It would not. The ceiling belongs
to the extraction rule, not to the model. The fix is a different procedure, and section 13.4 and
section 13.5 of [Chapter 13](../ch/ch13.md) are two of them.

---

**21.** *The 1.5B model has a debiasing gap of 10 points but a letter spread of C 7, B 7, D 2, A 4,
which does not lean towards any one position. Propose two different explanations for a non-zero
debiasing gap that is not driven by a simple position preference, and for each one describe a
measurement that would tell the two explanations apart.*

This problem asks you to reason, so there is no single right answer. Here is what a strong
response contains, and one worked example of such a response.

**What a strong response contains.** Two explanations that are genuinely different in mechanism,
not two wordings of the same idea. Each one has to predict something you could go and look at, and
the measurements have to be able to come out **differently** under the two explanations. A
response that proposes two explanations and one measurement that would look the same under both
has not finished. A strong response also says how much data it is reasoning from, because the
answer here is very little.

**The measured numbers this rests on.** All from `lab/out/lab4_size_ladder.json`, the
`Qwen/Qwen2.5-1.5B-Instruct` entry. Naive accuracy 0.80, which is $0.80 \times 20 = 16$ of 20.
Rotation accuracy 0.70, which is $0.70 \times 20 = 14$ of 20. The gap is $16 - 14 = 2$ questions,
which is $(0.80 - 0.70) \times 100 = 10.0$ percentage points. Consistent questions: 13 of 20, so
$20 - 13 = 7$ questions were **inconsistent** under rotation.

**A worked example of a strong response.**

**Explanation 1: instability, not preference.** On the questions this model does not know, the
four letter scores sit close together, and the top one is decided by a small difference. Moving
the options changes the prompt, which changes those small differences, which flips the answer. A
model like that has no favourite slot, so the first-pick tally looks healthy. It still loses under
a majority-of-four rule, because that rule needs three hits out of four, and an unstable question
scatters its hits. Under this explanation the 10-point gap is the price of the majority rule, not
evidence of a position habit at all.

**Explanation 2: a conditional position effect.** The preference exists but it is not "always A".
It shows up only in certain arrangements. A model might lean towards the last option when the last
option is short, or towards whichever option follows the one it half-believes. A first-pick tally
cannot see any of this, because it records one arrangement out of four. The spread C 7, B 7, D 2,
A 4 is the tally from the unrotated order alone.

**The measurement that separates them.** Both explanations need the same thing: the per-question
rotation votes, meaning which option the model picked on each of the four askings of each
question. Those votes are computed inside `lab/lab4_size_ladder.py`, in the `votes` list, and they
are **not** written to `lab/out/lab4_size_ladder.json`. So step one is adding a line to the script
that saves them. Then two tallies separate the explanations.

*Tally one, the chosen slot across rotations.* For each of the 7 inconsistent questions, write
down which slot the model picked at $r = 0, 1, 2, 3$. Explanation 2 predicts the same slot coming
up repeatedly, because the preference is about the slot. Explanation 1 predicts the slot moving
around with no pattern.

*Tally two, which rotations produced the hits.* For each inconsistent question, write down which
rotations the model got right. Under Explanation 2 the hits should line up with the rotations that
happened to park the correct answer in the favoured slot, which Formula 13.6 lets you compute in
advance. Under Explanation 1 the hits fall wherever.

**The honest limit, and it belongs in your answer.** Seven inconsistent questions is not a sample
you can conclude from. Whatever pattern turns up, the interval around it is enormous, and
[Chapter 12](../ch/ch12.md) is where you learned how to say so. The right shape for the finding is
"here is a hypothesis and here is the bank size that would test it", not "we found that".

---

**23.** *McNemar's test and the paired Wald interval gave opposite verdicts on the same data in
this chapter. Explain why they disagree and why this book believes McNemar. Then name one
situation in which you would trust the Wald interval more.*

This is a written argument, so there is no single right answer. Here is what a strong response
contains, and one worked example of such a response.

**What a strong response contains.** Four things. That both analyses use the same data, so the
disagreement is not about the numbers. That one of them approximates and the other counts. That
the approximation is at its worst in exactly this situation. And that a p-value and an interval
answer different questions, so "they disagree" is less paradoxical than it first sounds. Naming a
case where the Wald interval is the better tool is part of the problem, and a response that treats
Wald as plain error has missed it.

**The two results, from `lab/out/we7_paired.json`.** The paired Wald 95% interval for the gap is
$(+5.5, +44.5)$ percentage points, which excludes zero, so on that analysis you would report a
real difference. McNemar's exact two-sided test gives $p = 0.0625$, which is above 0.05, so on
that analysis you would not.

**A worked example of a strong response.**

The Wald interval takes the twenty per-question differences, works out their average and their
spread, and then assumes that if you re-ran the whole study many times, the averages would pile up
in a bell shape. That assumption is what the 1.96 multiplier is for. Now look at what the twenty
differences actually are: fifteen of them are exactly 0 and five of them are exactly $+1$. There
is nothing bell-shaped about that. The standard deviation is being estimated from the same five
questions that carry all the information, and the bell curve is being fitted to a lumpy count with
five moving parts. The interval that comes out is arithmetically correct and rests on an
assumption that does not hold here.

McNemar makes no such assumption. It throws away the fifteen questions the models agreed on,
because a question both models got right says nothing about which is better. That leaves five
disagreements. If the two models were equally good, each disagreement is a coin toss, so there are
$2^{5} = 32$ equally likely ways the five could have landed. All five going one way is one of
those 32, so its probability is $1 \div 32 = 0.03125$, and doubling for the other direction gives
$p = 0.0625$. Every step of that is counting. There is no curve being fitted to anything.

This book believes McNemar for two reasons. It uses the design instead of throwing it away, and it
needs no approximation to do it. And there is a third fact that settles it: with five
disagreements, 0.0625 is the **smallest** p-value available, from Formula 13.12. A design whose
best possible result is 0.0625 could not have produced a significant answer whatever the models
did. An interval that reports a significant difference from that design is reporting more
certainty than the design can hold.

**When you would trust the Wald interval more.** When the question is "how big is the difference"
rather than "could this be a coin toss", and the study is large. McNemar returns a p-value and a
p-value has no units; it never tells you whether the gap is 2 points or 40. The interval does.
With a bank of a thousand questions and dozens of disagreements falling on both sides, the bell
shape is a good fit, and the interval is the more useful of the two outputs because it carries the
size of the effect. The two tools are not rivals in that setting. You report the interval, and the
exact test is the one you reach for when the counts are small.

**One thing to be careful about saying.** An interval that excludes zero and a test that fails to
reject are not a logical contradiction. They are two procedures with different assumptions,
applied to the same data, and this chapter is about exactly that: a number belongs to the
procedure that made it.

---

**25.** *Worked example 13.2 found that a guesser scores about 5.1% under a majority-of-four rule
on four-option questions. Change the rule to "majority of three rotations, meaning at least two
hits out of three" and work out the chance level for that. Then say which of the two rules you
would rather report a score under.*

**The arithmetic.**

Step 1, the chance of one asking. Four options, one correct.

$$1 \div 4 = 0.25$$

And the chance of missing one asking.

$$1 - 0.25 = 0.75$$

Step 2, list the outcomes that count as correct. The rule needs 2 or 3 hits out of 3. So there are
two outcomes to add up.

Step 3, exactly 3 hits. All three askings land. Multiply 0.25 by itself three times.

$$0.25 \times 0.25 = 0.0625$$

$$0.0625 \times 0.25 = 0.015625$$

Step 4, exactly 2 hits. Two askings land and one misses, which is
$0.25 \times 0.25 \times 0.75$.

$$0.25 \times 0.25 = 0.0625$$

$$0.0625 \times 0.75 = 0.046875$$

The miss could be any one of the three askings, so there are three ways this can happen, and
$\binom{3}{2} = 3$ is that count.

$$3 \times 0.046875 = 0.140625$$

Step 5, add the two outcomes.

$$0.140625 + 0.015625 = 0.15625$$

Step 6, as a percentage.

$$0.15625 \times 100 = 15.625\%, \text{ which rounds to } 15.6\%$$

**Answer.** A guesser averages **15.6%** under a majority-of-two-out-of-three rule on four-option
questions.

**Check it.** Two checks. The answer has to sit below the single-asking chance level of 25.0%,
because asking for 2 hits is harder than asking for 1, and 15.6% is below 25.0%. It also has to
sit **above** the majority-of-four chance level of 5.1%, because 2 hits out of 3 is an easier bar
than 3 hits out of 4. It does. Written as fractions, the two outcomes are
$\tfrac{1}{64} + \tfrac{9}{64} = \tfrac{10}{64} = \tfrac{5}{32}$, and $32 = 2^{5}$, so the
arithmetic is exact rather than rounded.

**Which rule would you report under.** The four-rotation rule, and the reason is not the chance
level.

With four options, four rotations give every option a turn in every position. A model reaching for
one slot is right exactly once in four, which is below the three-out-of-four bar, so the position
habit earns nothing at all. Three rotations do not balance the design. The correct answer visits
only three of the four positions, and which three depends on where it started. A model that always
picks position A gets 1 hit out of 3 when the correct answer starts in position 0, 1 or 2, and 0
hits out of 3 when it starts in position 3. Either way it is below the two-out-of-three bar, so
the rule is not useless. But the coverage is uneven, and a subtler preference can survive uneven
coverage.

**Why "the one with the lower chance level" is not a good enough reason on its own.** The chance
level tells you how a guesser does. It says nothing about how a knower does. You can drive the
chance level as low as you like by demanding more hits: a rule requiring 4 hits out of 4 has a
chance level of $0.25 \times 0.25 \times 0.25 \times 0.25 = 0.00390625$, which is 0.4%, and that
rule also fails every question a real model wobbles on even slightly. Making guessing harder and
making the measurement better are two different goals, and past a point they pull against each
other. What you want from a scoring procedure is that it removes the thing you are not trying to
measure, which here is position, while leaving the thing you are.

There is a second reason the chance level cannot settle it. A score under one rule is not
comparable with a score under another. The 15.0% the 0.5B scored under majority-of-four and a
score under majority-of-three would be two different measurements of two different things, and the
number by itself does not carry which. That is the whole chapter, arriving one last time.

---

(answers-ch14)=
## Chapter 14. Bias in the benchmark, and who pays

These problems drill one habit in two halves: read a subgroup accuracy and its group size
together before you believe it, then turn a measured energy figure and a measured memory figure
into a statement about who can afford to run a model.

Every number below was computed rather than remembered. Measured values come from
`lab/out/we6_eval.json`, `lab/out/theme_s_energy.json` and `lab/out/lab4_size_ladder.json`. The
formulas are numbered as [Chapter 14](../ch/ch14.md) numbers them, and each one also appears in
the [formula summary](formulas.md).

### Warm-up: can you do the arithmetic

**1.** *A subgroup holds 5 questions and the model got 3 right. Compute its accuracy as a
decimal and as a percentage.*

**What is asked.** One subgroup's score, written twice: once as a decimal and once as a
percentage.

**What it tests.** Formula 1 from Section 14.1, $\hat{p}_g = \dfrac{x_g}{n_g}$. Here $x_g$ is
how many questions in the subgroup the model got right and $n_g$ is how many it was asked. If
the fraction bar is unfamiliar, the Math Toolkit has
[the fraction bar as division](math-toolkit.md#toolkit-fraction-bar), and converting a decimal
to a percentage is in
[percentages, decimals and fractions](math-toolkit.md#toolkit-percentages).

**The arithmetic.** Here $x_g = 3$ and $n_g = 5$.

Step 1, divide the top by the bottom.

$$3 \div 5 = 0.6$$

Step 2, turn that decimal into a percentage by multiplying by 100.

$$0.6 \times 100 = 60$$

**Answer.** The subgroup accuracy is **0.6** as a decimal, which is **60 percent** of the
questions in that subgroup.

**Where this goes wrong.** The tempting slip is to divide the other way round, $5 \div 3 =
1.6667$. That is a real division and it is the wrong one. The check is that an accuracy can
never be above 1, because a model cannot get more questions right than it was asked. If your
answer is above 1, you put $n_g$ on top.

---

**3.** *How many percentage points is one answer worth inside a subgroup of 5 questions? Of 10
questions? Of 25 questions?*

**What is asked.** How far one answer moves the score, at three different group sizes.

**What it tests.** Formula 4 from Section 14.2, $W_g = \dfrac{1}{n_g}$. $W_g$ is what a single
answer is worth inside subgroup $g$, as a share. A
[percentage point](math-toolkit.md#toolkit-percentage-points) is the unit for the difference
between two percentages.

**The arithmetic.** Do the same two steps three times.

The 5-question subgroup. $n_g = 5$.

$$1 \div 5 = 0.2 \qquad\text{then}\qquad 0.2 \times 100 = 20$$

The 10-question subgroup. $n_g = 10$.

$$1 \div 10 = 0.1 \qquad\text{then}\qquad 0.1 \times 100 = 10$$

The 25-question subgroup. $n_g = 25$.

$$1 \div 25 = 0.04 \qquad\text{then}\qquad 0.04 \times 100 = 4$$

**Answer.** One answer is worth **20 percentage points** in the 5-question subgroup,
**10 percentage points** in the 10-question subgroup, and **4 percentage points** in the
25-question subgroup.

**Where this goes wrong.** Two slips. The first is expecting the value to grow with the group,
because bigger sounds more important. It falls. A bigger group means each single answer matters
less, which is the whole reason bigger groups are worth having. The second is stopping at the
decimal and writing "0.2 percentage points" instead of 20. A quick check on both: $W_g$ times
$n_g$ must equal exactly 1, because $n_g$ answers make up the whole subgroup. Here
$0.2 \times 5 = 1$, $0.1 \times 10 = 1$ and $0.04 \times 25 = 1$.

---

**5.** *Compute the Wald standard error for a subgroup that scored 3 out of 5. Show all four
steps.*

**What is asked.** The standard error of a subgroup accuracy of 3 out of 5.

**What it tests.** Formula 6 from Section 14.3,
$SE_g = \sqrt{\dfrac{\hat{p}_g\,(1 - \hat{p}_g)}{n_g}}$. The standard error says how far this
score would typically move if you ran the test again on a fresh batch of questions of the same
kind. The square root sign is built up from nothing in the Math Toolkit under
[square roots](math-toolkit.md#toolkit-square-roots).

**The arithmetic.** First get the accuracy itself: $3 \div 5 = 0.6$. So $\hat{p}_g = 0.6$ and
$n_g = 5$. Now work from the inside of the formula outwards.

Step 1, find $1 - \hat{p}_g$. This is the share the model got wrong.

$$1 - 0.6 = 0.4$$

Step 2, multiply the two.

$$0.6 \times 0.4 = 0.24$$

Step 3, divide by $n_g$.

$$0.24 \div 5 = 0.048$$

Step 4, take the square root.

$$\sqrt{0.048} = 0.21908902300206645$$

Rounded to four decimal places, $SE = 0.2191$.

**Answer.** The Wald standard error is **0.2191**, in the same units as the accuracy, which is
a share of the questions in the subgroup.

**Check it.** Multiply your square root back by itself. $0.2191 \times 0.2191 = 0.0480048$,
which is the 0.048 from step 3 apart from the rounding. That multiplying-back is how you check
any square root.

**Where this goes wrong.** The most common wrong answer is **0.048**, which is stopping at
step 3 and forgetting the square root. It is tempting because step 3 produces a small tidy
number that looks like an answer. The second slip is dividing by $n_g - 1 = 4$ instead of by
$n_g = 5$; that is the formula for a sample standard deviation, not for the standard error of a
proportion, and it belongs to a different problem. Keep the full 0.21908902300206645 if you go
on to problem 6, because rounding to 0.2191 first moves the fourth decimal place of the
interval.

---

**7.** *A subgroup of 6 questions scored 0 right. Compute the rule-of-three upper limit as a
percentage.*

**What is asked.** The honest upper limit on the true accuracy of a group that got nothing
right.

**What it tests.** Formula 7 from Section 14.3, $u = \dfrac{3}{n}$. This is the tool you reach
for when a group scored zero, because the Wald formula from problem 5 returns a standard error
of exactly 0 in that case and an interval of zero width.

**The arithmetic.** Here $n = 6$.

Step 1, divide.

$$3 \div 6 = 0.5$$

Step 2, turn that into a percentage.

$$0.5 \times 100 = 50$$

**Answer.** The upper limit is **50 percent**. The honest sentence is: on these 6 questions the
model got none right, and its true accuracy on questions of this kind is somewhere between
0 percent and 50 percent.

**Where this goes wrong.** The tempting wrong answer is **0 percent**, reported as though it
were the model's accuracy. It is the measured accuracy, and it is not an upper limit on
anything. Six questions cannot rule out a true accuracy of 40 percent; a model with a true
40 percent rate misses all six a fair share of the time.

**A note on how rough this shortcut is.** The 3 on top of the formula comes from a logarithm,
and the shortcut is built for larger groups. At $n = 6$ the exact 95 percent upper limit is
$1 - 0.05^{1/6} = 0.39303776899708276$, which is 39.3 percent. So the shortcut's 50 percent is
the more cautious of the two, which is the safe direction to be wrong in. Report 50 percent and
say you used the rule of three.

---

**9.** *A model generates 250,000 tokens at 1.133345 joules per token. Compute the total energy
in joules, then in kilowatt-hours.*

**What is asked.** The energy of a workload, first in joules and then in the unit an electricity
bill uses.

**What it tests.** Formula 9 from Section 14.5, $E = e \times m$, where $e$ is the energy one
token costs in joules and $m$ is how many tokens were generated. Then the first stage of
Formula 10, which divides joules by 3,600,000 to get kilowatt-hours. The figure 1.133345 joules
per token is the measured value for `Qwen2.5-1.5B-Instruct`, stored as `j_per_token` in
`lab/out/theme_s_energy.json`.

**The arithmetic.**

Step 1, multiply energy per token by the number of tokens.

$$1.133345 \times 250{,}000 = 283{,}336.25$$

So $E = 283{,}336.25$ joules.

Step 2, divide by how many joules are in one kilowatt-hour. One kilowatt is 1,000 watts and one
hour is 3,600 seconds, so one kilowatt-hour is $1000 \times 3600 = 3{,}600{,}000$ joules.

$$283{,}336.25 \div 3{,}600{,}000 = 0.07870451388888888$$

Rounded to four decimal places, 0.0787.

**Answer.** **283,336.25 joules**, which is **0.0787 kilowatt-hours**.

**Check it.** The units have to cancel. Joules per token, times tokens, leaves joules. And the
kilowatt-hour figure has to be small, because a kilowatt-hour is a lot of energy: 0.0787
kilowatt-hours is a 60 watt bulb burning for about 1.3 hours.

**Where this goes wrong.** The tempting wrong answer is **78.7**, which comes from dividing by
3,600 instead of 3,600,000. That gives watt-hours, not kilowatt-hours, and it is a thousand
times too big. The word "kilo" is the missing factor of 1,000. If your kilowatt-hour figure is
larger than about 1 for a workload this size, check that divisor first.

---

**11.** *A model has 1,543,714,304 parameters stored at 2 bytes each. Compute the memory it
needs in bytes, then in gigabytes.*

**What is asked.** How much memory this model takes up, in two units.

**What it tests.** Formula 12 from Section 14.6, $M = N \times b$, where $N$ is the parameter
count and $b$ is how many bytes each parameter takes. Two bytes per parameter is **half
precision**, also written FP16, which stores each number in 16 bits. The parameter count
1,543,714,304 is the measured count for `Qwen2.5-1.5B-Instruct` in
`lab/out/lab4_size_ladder.json`.

**The arithmetic.**

Step 1, multiply.

$$1{,}543{,}714{,}304 \times 2 = 3{,}087{,}428{,}608 \text{ bytes}$$

Step 2, turn bytes into gigabytes. One gigabyte here means 1,000,000,000 bytes, which is the
convention `lab4_size_ladder.py` used when it wrote the file.

$$3{,}087{,}428{,}608 \div 1{,}000{,}000{,}000 = 3.087428608$$

**Answer.** **3,087,428,608 bytes**, which is **3.087 gigabytes**. That matches the
`size_fp16_gb` field for this model in `lab/out/lab4_size_ladder.json` exactly.

**Where this goes wrong.** The tempting wrong answer is **2.875**, which comes from dividing by
1,073,741,824 instead of by 1,000,000,000. That second number is $2^{30}$, and it is the
gibibyte, a different unit that some software also labels "GB". Both divisions are defensible in
general. Only one of them matches the file, and this book uses 1,000,000,000 throughout. When a
memory figure disagrees with somebody else's by about 7 percent, this is usually why.

---

### Practice: can you apply it

**13.** *Using Formula 2 and the `by_topic` block, recompute the overall accuracy by hand.
Show the nine products, their sum, and the division.*

**What is asked.** Rebuild the 25 percent headline score out of the nine topic scores, to show
it was a weighted average of them all along.

**What it tests.** Formula 2 from Section 14.1,
$\hat{p} = \dfrac{\sum_{g=1}^{G} n_g \hat{p}_g}{\sum_{g=1}^{G} n_g}$. The $\sum$ sign means
"add these up", and the Math Toolkit builds it from nothing under
[sigma notation](math-toolkit.md#toolkit-sigma). The counts below are the `by_topic` block of
`lab/out/we6_eval.json`.

**The arithmetic.** Multiply each subgroup's size by its accuracy.

| Subgroup $g$ | $n_g$ | $\hat{p}_g$ | $n_g \times \hat{p}_g$ |
|---|---|---|---|
| design | 2 | 1.00 | $2 \times 1.00 = 2$ |
| center | 4 | 0.50 | $4 \times 0.50 = 2$ |
| assoc | 2 | 0.50 | $2 \times 0.50 = 1$ |
| spread | 3 | 0.00 | $3 \times 0.00 = 0$ |
| prob | 3 | 0.00 | $3 \times 0.00 = 0$ |
| graphs | 2 | 0.00 | $2 \times 0.00 = 0$ |
| infer | 2 | 0.00 | $2 \times 0.00 = 0$ |
| types | 1 | 0.00 | $1 \times 0.00 = 0$ |
| shape | 1 | 0.00 | $1 \times 0.00 = 0$ |

Step 1, add the last column. That is the top of the fraction.

$$2 + 2 + 1 + 0 + 0 + 0 + 0 + 0 + 0 = 5$$

Step 2, add the $n_g$ column. That is the bottom of the fraction.

$$2 + 4 + 2 + 3 + 3 + 2 + 2 + 1 + 1 = 20$$

Step 3, divide.

$$5 \div 20 = 0.25$$

**Answer.** **0.25**, which is **25.0 percent**. That is the `accuracy` field in
`lab/out/we6_eval.json`, computed there a different way: count the right answers across all
twenty questions and divide by twenty.

**Check it.** The bottom of the fraction must equal the total number of questions on the test.
If your $n_g$ column does not add to 20, you missed a subgroup or double-counted a question.

**Where this goes wrong.** The tempting wrong answer is **22.2 percent**. It comes from
averaging the nine accuracies without weighting them:
$(1.00 + 0.50 + 0.50 + 0 + 0 + 0 + 0 + 0 + 0) \div 9 = 2.00 \div 9 = 0.2222$. That treats the
one-question shape subgroup as counting for as much as the four-question centre subgroup. It
does not. Each subgroup is heard in the average in proportion to how many questions it holds,
and the whole lesson of Section 14.1 sits in that difference.

---

**15.** *Compute the binomial probability that the centre subgroup, with 4 questions, scores
exactly 2 right at a true accuracy of 0.25. Compare your answer with the code output in
Section 14.4.*

**What is asked.** If the model had no topic-specific skill at all, and answered every question
with a one-in-four chance, how often would the centre row read 2 out of 4?

**What it tests.** Formula 8 from Section 14.4,
$P(X = x) = \dfrac{n!}{x!\,(n-x)!}\; p^{x}\;(1-p)^{\,n-x}$. The exclamation mark is a
**factorial**: multiply every whole number from that one down to 1. Exponents are in the Math
Toolkit under [exponents](math-toolkit.md#toolkit-exponents).

**The arithmetic.** Here $n = 4$, $x = 2$ and $p = 0.25$.

Step 1, the factorials.

$$n! = 4! = 4 \times 3 \times 2 \times 1 = 24$$
$$x! = 2! = 2 \times 1 = 2$$
$$(n - x)! = (4 - 2)! = 2! = 2$$

Step 2, the counting fraction. Do the bottom first, because it is inside.

$$2 \times 2 = 4$$
$$24 \div 4 = 6$$

There are 6 different ways to get exactly 2 of 4 questions right.

Step 3, $p$ to the power $x$.

$$0.25^{2} = 0.25 \times 0.25 = 0.0625$$

Step 4, $(1 - p)$ to the power $n - x$. Here $1 - 0.25 = 0.75$ and $n - x = 4 - 2 = 2$.

$$0.75^{2} = 0.75 \times 0.75 = 0.5625$$

Step 5, multiply the three pieces, two at a time.

$$6 \times 0.0625 = 0.375$$
$$0.375 \times 0.5625 = 0.2109375$$

**Answer.** $P = 0.2109375$, which is about **21.1 percent**. The code in Section 14.4 printed
`0.2109` for the centre row, which is the same number rounded to four decimal places.

**What the number means.** A guesser with no knowledge of measures of centre scores exactly 2
out of 4 on that topic about one run in five. The 50 percent in the centre row does not need an
explanation involving what the model knows.

**Where this goes wrong.** The tempting wrong answer is **0.0352**, from
$0.0625 \times 0.5625 = 0.03515625$, which leaves out the counting fraction. That answer is the
chance of one particular pattern, such as right, right, wrong, wrong, in that exact order. The
question asks for 2 right in any order, and there are 6 orders. Check the counting fraction on
its own: it must come out a whole number, because it counts arrangements.

---

**17.** *The design subgroup's Wald interval came out as $(1.0000, 1.0000)$. Explain in three
sentences why, naming the step in Formula 6 where the collapse happens.*

**What is asked.** A short written explanation, not a number, of why the standard formula
reported perfect certainty from two questions.

**What it tests.** Formula 6 from Section 14.3, and the idea that a formula carries conditions
for use. A strong response does three things: it names the step where the zero enters, it
follows the zero through to the interval, and it says that this is the formula being used
outside its conditions rather than the model being certain.

**The arithmetic behind the explanation.** The design subgroup scored 2 out of 2, so
$\hat{p}_g = 1$ and $n_g = 2$.

Step 1: $1 - \hat{p}_g = 1 - 1 = 0$.

Step 2: $\hat{p}_g \times (1 - \hat{p}_g) = 1 \times 0 = 0$.

Step 3: $0 \div 2 = 0$.

Step 4: $\sqrt{0} = 0$, so $SE = 0$.

Margin: $1.96 \times 0 = 0$. Lower end $1 - 0 = 1$. Upper end $1 + 0 = 1$.

**One worked example of a three-sentence answer.**

> The collapse starts at Step 1 of Formula 6, where $1 - \hat{p}_g$ becomes $1 - 1 = 0$ because
> the subgroup had no wrong answers, and that zero then wipes out the multiplication in Step 2,
> so the standard error is $\sqrt{0 \div 2} = 0$. A standard error of zero means the margin is
> $1.96 \times 0 = 0$, so both ends of the interval land on the accuracy itself and the interval
> is $(1.0000, 1.0000)$. That is not the model being certain; it is the Wald formula being used
> on a group with zero failures, which is outside the conditions it was built for, and the
> honest move is to report the rule of three or the Wilson interval from Chapter 12 instead.

**Where this goes wrong.** Two tempting answers. The first is "the model is perfect at study
design", which is what the interval literally says and is exactly the trap. Two questions
cannot support that. The second is calling it a bug in the arithmetic. Every step above is
correct arithmetic. Naming Step 2 rather than Step 1 is also defensible, since Step 2 is where
the zero enters the product; a strong answer mentions both, because the zero is created in Step
1 and does its damage in Step 2.

---

**19.** *Compute the energy multiplier $k$ for the step from the 0.5B to the 3B model, skipping
the 1.5B. Then compute $B$ for that single combined step, using the rotation accuracies of
15.0 percent and 95.0 percent. Compare it with the two separate steps and say which framing is
more informative.*

**What is asked.** Price the whole climb up the size ladder as one step, then say whether that
single number tells you more or less than the two smaller steps did.

**What it tests.** Formula 11 from Section 14.6, $B = \dfrac{\Delta a}{k}$. Here $\Delta a$ is
the accuracy points gained and $k$ is the energy multiplier, meaning the bigger model's joules
per token divided by the smaller model's. $\Delta$ is the Greek capital letter delta and means
"the change in"; the Greek letters this book uses are listed in the
[Math Toolkit](math-toolkit.md#toolkit-greek). The joules per token come from
`lab/out/theme_s_energy.json` and the rotation accuracies from `lab/out/lab4_size_ladder.json`.

**The arithmetic.**

Step 1, the energy multiplier. The 0.5B model costs 0.767069 joules per token and the 3B model
costs 1.940526 joules per token.

$$1.940526 \div 0.767069 = 2.529793278049302$$

Rounded, $k = 2.5298$, which the chapter also reports as 2.53.

Step 2, the accuracy gained.

$$95.0 - 15.0 = 80.0 \text{ percentage points}$$

Step 3, divide.

$$80.0 \div 2.529793278049302 = 31.623137231863936$$

So $B = 31.62$ for the combined step.

**Answer.** $k = \mathbf{2.53}$ and $B = \mathbf{31.62}$ accuracy points per unit of energy
multiplier.

**Comparing the three figures.** The chapter computed 37.23 for the 0.5B to 1.5B step and 14.60
for the 1.5B to 3B step. The combined figure, 31.62, sits between them and closer to the first
one. There is a check hiding in that: the two separate multipliers multiply to the combined
multiplier, $1.4775 \times 1.7122 = 2.5298$, because each step multiplies the energy again.

**Which framing is more informative: the two separate steps.** The single combined number,
31.62, says the whole climb is a reasonable bargain on average. It hides the fact that almost
all of the bargain is in the first half. The second step buys 14.60 points per unit of energy
against the first step's 37.23, which is $37.23 \div 14.60 = 2.55$ times less. A person deciding
which model to run does not buy the ladder. They buy one rung, and the two-step framing is the
one that tells them which rung is worth it.

**Where this goes wrong.** The tempting slip is adding the multipliers instead of multiplying
them, $1.4775 + 1.7122 = 3.1897$, which would give $80 \div 3.1897 = 25.08$ and is not the
energy multiplier of anything. Multipliers multiply. A second tempting slip is averaging the two
$B$ values, $(37.23 + 14.60) \div 2 = 25.92$, which does not equal 31.62 either, because the two
steps cover different amounts of accuracy and different amounts of energy.

---

**21.** *Chapter 7 reported that 4-bit blockwise quantization stores a weight in 0.5625 bytes
including the block scales. Recompute the 3B model's memory at that rate using Formula 12 with
$b = 0.5625$, and say whether it now fits a 4 gigabyte card.*

**What is asked.** How much memory the 3B model needs once each weight is stored in 4 bits with
block scales, and whether that clears the access line.

**What it tests.** Formula 12 from Section 14.6, $M = N \times b$, with a smaller $b$. The
parameter count 3,085,938,688 is from `lab/out/lab4_size_ladder.json`. The 0.5625 bytes per
weight is the measured storage cost of 4-bit blockwise quantization with a 16-bit scale per
block of 32, recorded in `_research/00-lab-verified-findings.md` section 5.

**The arithmetic.**

Step 1, multiply.

$$3{,}085{,}938{,}688 \times 0.5625 = 1{,}735{,}840{,}512 \text{ bytes}$$

Step 2, divide by one billion to get gigabytes.

$$1{,}735{,}840{,}512 \div 1{,}000{,}000{,}000 = 1.735840512$$

Step 3, compare with the card. The card holds 4 gigabytes.

$$1.735840512 \text{ is less than } 4$$

Step 4, the headroom.

$$4 - 1.735840512 = 2.264159488 \text{ gigabytes}$$

**Answer.** The 3B model needs **1.736 gigabytes** at 4-bit blockwise quantization. That
**does fit** a 4 gigabyte card, with **2.264 gigabytes** to spare. At half precision it needed
6.172 gigabytes and did not fit at all.

**Check it.** The two sizes should be in the same ratio as the two byte counts.
$2 \div 0.5625 = 3.5556$, and $6.171877376 \div 1.735840512 = 3.5556$. They match, so the
arithmetic holds.

**What the answer does and does not establish.** It establishes that the weights fit. It does
not establish that the answers stay good. Chapter 7 measured the weight error of 4-bit blockwise
quantization at about 7.2 percent, and this course has not re-run the 20-question bank on a
quantized 3B model, so the accuracy after quantization is `[to be measured]`. The figure also
counts the weights only. Running a model also needs room for the activations and the key-value
cache, which this formula does not include.

**Where this goes wrong.** The tempting wrong answer is **1.543 gigabytes**, from using
$b = 0.5$ because 4 bits is half a byte. Four bits is half a byte, and the scheme also stores a
16-bit scale for every block of 32 weights, which adds $16 \div 32 = 0.5$ bits per weight. That
brings the real cost to 4.5 bits, which is 0.5625 bytes. Leaving out the block scales
understates the model by about 193 megabytes here, and the block scales are the reason 4-bit
quantization works at all.

---

### Stretch: can you reason with it

**23.** *The chapter argues that the subgroup pattern is explained by the letter A rather than
by statistical knowledge. State one piece of evidence that supports this explanation and one
observation in the data that it does not fully explain. (Look at the assoc subgroup.)*

**What is asked.** One count that supports the letter-A explanation, and one count it fails to
cover.

**What it tests.** Whether you can hold an explanation and its limits at the same time. A strong
response names a specific count from `lab/out/we6_eval.json` for each side, and does not treat
"mostly explains" as "fully explains".

**The counts, from the `records` block of `lab/out/we6_eval.json`.**

| Topic | Questions | Right | A's in the answer key |
|---|---|---|---|
| design | 2 | 2 | 1 |
| center | 4 | 2 | 1 |
| assoc | 2 | 1 | 0 |
| spread | 3 | 0 | 0 |
| prob | 3 | 0 | 0 |
| graphs | 2 | 0 | 0 |
| infer | 2 | 0 | 0 |
| types | 1 | 0 | 0 |
| shape | 1 | 0 | 0 |

The model answered **A on 16 of the 20 questions**, and the answer key holds **only 2 A's**
across the whole bank.

**One worked example of a strong response.**

> **Evidence that supports the explanation.** Every one of the six topics whose answer key
> contains no A scored a flat 0 percent: spread, prob, graphs, infer, types and shape. The only
> two topics whose key contains an A, design and center, are two of the three topics that scored
> above zero. A model that says A almost every time will be right exactly where the key says A,
> and that is what the table shows. The shape of the subgroup table follows the position of the
> letter A in the answer key, and nobody chose where those A's went with any model in mind.
>
> **An observation it does not fully explain.** The assoc subgroup scored 1 out of 2 and its
> answer key holds no A at all. On question 10, "Correlation measures:", the model answered B
> and the key was B. The letter-A story predicts a zero there and got a 50 percent.
>
> The same gap is larger than the assoc row alone. Of the model's five correct answers, only two
> came from saying A when the key said A: question 12 and question 17. The other three came from
> the four questions where the model broke its habit: question 8 and question 10, where it said
> B and B was right, and question 15, where it said D and D was right. So design's perfect 2 out
> of 2 is one A-match and one lucky B, and center's 2 out of 4 is one A-match and one lucky D.
>
> **What that leaves.** The letter-A explanation accounts for which topics sit at zero, which is
> the striking feature of the table. It accounts for only two of the five correct answers. The
> honest summary is that letter preference explains the shape of the table better than any claim
> about statistical knowledge does, and that it does not explain every cell.

**Where this goes wrong.** The tempting move is to conclude that the model has some real
knowledge because three of its five right answers were not A's. Three answers out of twenty
cannot support that. The binomial arithmetic in Section 14.4 already showed that every row on
this table is an ordinary outcome for a guesser, so "the letter A did not explain everything"
does not promote the leftover to a finding.

---

**25.** *The chapter reports that seven or more extreme subgroup rows occur about 27 percent of
the time under pure guessing. Explain what that number does and does not license you to
conclude. In particular, say whether it proves the model has equal skill across topics.*

**What is asked.** A written argument about what a probability of 0.2678 entitles you to say.

**What it tests.** The difference between "this result is consistent with equal skill" and
"equal skill is true". A strong response states what the 0.2678 is the probability of, names the
assumptions it was computed under, gives a clear no to the proof question, and explains why the
absence of a signal is not a signal.

**The number, and where it came from.** Section 14.4 assumed the model has the same true
accuracy of 0.25 on every one of the nine topics, with every question an independent try. Under
that assumption it built the full distribution of how many topics land on a headline 0 percent
or 100 percent. The expected count was 5.6953 topics. The chance of seeing 7 or more was
**0.2678**, which is about 27 percent, or roughly one run in four.

**One worked example of a strong response.**

> **What it licenses.** It licenses you to refuse the table as evidence of topic differences.
> Seven extreme rows out of nine looks dramatic, and a model with identical skill on every topic
> produces seven or more about one run in four. An outcome that common cannot be used to argue
> that something unusual happened. If a colleague points at the 100 percentage point gap and
> says the model has a weakness in probability, this number is the reply: the table you are
> reading is an ordinary draw.
>
> **What it does not license.** It does not prove the model has equal skill across topics, and
> it is not close to proving it. The calculation asked one question: would equal skill produce a
> table like this? The answer was yes, often. That does not rule out unequal skill, because a
> model with very unequal skill would also produce a table like this. With one to four questions
> per topic the procedure cannot tell the two apart. Section 14.3 said the same thing in another
> form: the rule of three at $n = 3$ gives an upper limit of $3 \div 3 = 1$, which is 100
> percent, so those rows constrain the true accuracy not at all.
>
> **The assumptions it rests on.** The 0.2678 was computed with $p$ fixed at 0.25 for every
> topic and every question treated as independent. Section 14.4 then showed that the model
> answered A on 16 of 20 questions, so its answers are not independent draws in any useful
> sense; they are one habit applied twenty times. A number computed under assumptions the data
> breaks is a guide, not a verdict.
>
> **The sentence you are entitled to.** "The subgroup pattern is consistent with the model
> having the same skill on every topic, and these twenty questions cannot distinguish that from
> the model having different skills on different topics."

**Where this goes wrong.** The tempting wrong conclusion is "27 percent is not significant,
therefore the topics are equal". Failing to find a difference and finding no difference are
different results. This test had almost no power, meaning almost no ability to detect a real
difference if one existed, so its failure to find one is close to uninformative. The fix is more
questions per topic, not a different test on the same nine rows.

---

**27.** *Section 14.6 shows the environmental factor and the access factor selecting the same
model on a 4 gigabyte card, and Try it 14.4 shows them diverging on an 8 gigabyte card.
Construct a third case, with a stated card size and stated model sizes, where the two factors
select different models, and explain what would have to be true about the accuracy curve for
that to happen.*

**What is asked.** Build a new case, with numbers stated up front, where the environmental
factor and the access factor point at different models, then say what property of the accuracy
curve makes that happen.

**What it tests.** Formula 12 for the access comparison, Formula 11 for the environmental
comparison, and the chapter's closing claim that the two factors agreeing on a 4 gigabyte card
is a fact about that card rather than a law.

**One worked example of a strong response.**

> **The case, stated.** A 2 gigabyte graphics card. The three models are the course's own, at
> half precision: 0.5B at 0.988065536 gigabytes, 1.5B at 3.087428608 gigabytes and 3B at
> 6.171877376 gigabytes, all from `lab/out/lab4_size_ladder.json`.
>
> **What the access factor selects.** Compare each model against 2 gigabytes.
>
> 0.5B: $0.988065536$ is less than $2$, so it fits, with $2 - 0.988065536 = 1.011934464$
> gigabytes to spare.
>
> 1.5B: $3.087428608$ is greater than $2$. Shortfall $3.087428608 - 2 = 1.087428608$ gigabytes.
> It will not load.
>
> 3B: $6.171877376$ is greater than $2$. Shortfall $6.171877376 - 2 = 4.171877376$ gigabytes. It
> will not load.
>
> The access factor selects the **0.5B**, because it is the only model that runs at all.
>
> **What the environmental factor selects.** Nothing about the card changes Formula 11, so the
> two bargain figures are the chapter's: the step from 0.5B to 1.5B buys $55.0 \div 1.4775 =
> 37.23$ accuracy points per unit of energy multiplier, and the step from 1.5B to 3B buys
> $25.0 \div 1.7122 = 14.60$. The best value is the first step, which ends at the **1.5B**.
>
> **The two factors now disagree.** Access says 0.5B. Environment says 1.5B. On a 2 gigabyte
> card the student cannot buy the model the energy arithmetic recommends, and the chapter's neat
> agreement is gone.
>
> **What has to be true about the accuracy curve.** The two factors disagree whenever the step
> that buys the most accuracy per unit of energy ends on the far side of the access line from
> the largest model that fits. That happens in two directions. Here the best step ends at the
> 1.5B and the 1.5B does not fit, so access is the stricter of the two. On the 8 gigabyte card
> in Try it 14.4 the reverse happens: every model fits, so access stops ruling anything out and
> the environmental factor is the stricter one.
>
> If the accuracy curve had been flat over the first step, with $\Delta a$ near 0, then $B$ for
> that step would be near 0 and the environmental factor would stop at the 0.5B. The two factors
> would agree again on the 2 gigabyte card. The agreement in Section 14.6 needs the best-value
> step to end exactly at the largest model that fits, and that is a coincidence of where the
> line falls, not a rule.

**A number worth adding.** On the 8 gigabyte card the two factors cannot be made to agree with
these three models. For the second step to match the first step's bargain, it would need
$\Delta a = 37.23 \times 1.7122 = 63.75$ accuracy points, which would put the 3B at
$70 + 63.75 = 133.75$ percent. No accuracy can be above 100 percent. So on an 8 gigabyte card,
with these measured energies, the environmental factor will always prefer a smaller model than
the access factor permits.

**Where this goes wrong.** The tempting move is to pick a card size where all three models fit
and call that a disagreement of the same kind. It is a different kind. When everything fits, the
access factor does not select a different model; it stops selecting at all. A response that
notices that difference is stronger than one that does not.

---

**29.** *Chapter 13 found that a 25 percentage point gap between two models could not be
declared significant on 20 questions, with McNemar's exact test returning $p = 0.0625$. This
chapter found subgroup gaps of 100 percentage points on 1 to 4 questions. Write one paragraph
explaining, to somebody who has taken no statistics, why the larger gap is the weaker evidence.*

**What is asked.** One paragraph, in plain words, on why a bigger gap can be worse evidence than
a smaller one.

**What it tests.** The idea that the size of a difference and the strength of the evidence for
it are two separate quantities, and that group size is what connects them. A strong response
names how many questions sit behind each gap, says what one answer is worth in each, and avoids
statistical vocabulary the reader has not met.

**The figures behind the paragraph.** The 100 percentage point gap comes from subgroups of 1 to
4 questions, where one answer is worth between $1 \div 4 = 25$ and $1 \div 1 = 100$ percentage
points. The 25 percentage point gap comes from 20 questions put to both models, where one answer
is worth $1 \div 20 = 5$ percentage points.

**One worked example of a paragraph.**

> The two numbers are not the same kind of number. The 100 point gap is the distance between a
> topic that holds one question and a topic that holds two. In a one-question topic a single
> answer moves the score by 100 percentage points, so one lucky or unlucky guess produces the
> entire gap on its own; the topic is not able to report anything except 0 percent or 100
> percent, whatever the model does. The 25 point gap is the distance between two models measured
> on the same 20 questions, where one answer moves a score by 5 percentage points, so it took
> five separate answers to open that gap. How big a gap is tells you how far apart two numbers
> landed. How many questions are behind it tells you how far those numbers would move if you ran
> the test again tomorrow, and that second thing is what evidence is made of. Chapter 14 computed
> that seven or more topics land at 0 percent or 100 percent about 27 percent of the time even
> when the model has exactly the same skill on every topic, so the 100 point gap is close to what
> you should expect from nothing at all. The 25 point gap was checked the careful way, question
> by question, and even then the test returned 0.0625, which was not small enough to call the
> difference real. So the smaller gap is the better evidence, because it rests on more answers,
> and the larger gap is mostly a report on how few questions each topic held.

**Where this goes wrong.** The tempting instinct is that a bigger difference must be stronger
proof, which is true when the two numbers are measured with the same care and is false here. A
second slip is writing "the 100 point gap is wrong". It is not wrong. The arithmetic is correct
and the run is reproducible. It is correct and uninformative, and those two words sit together
more often than people expect.

---

(answers-ch15)=
## Chapter 15. Capstone

These problems drill the five pieces of arithmetic your capstone report has to contain: the
headline proportion, the interval around it, the paired comparison when two systems answer the
same questions, the energy and memory your run consumed, and the weighted sum that turns the
rubric into a grade.

Where a problem names a file in `lab/out/`, the number in the solution is a measured one and you
can open the file and check it. Every other number below is made up for practice, exactly as the
chapter's preamble says.

### Warm-up: can you do the arithmetic?

**1.** **What is asked.** Turn a raw count of correct answers into the headline number, twice: as
a decimal and as a percentage.

**What it tests.** [Formula 1, the sample proportion](../ch/ch15.md), which is the same object
the Math Toolkit calls a proportion in
[Section 12](math-toolkit.md#toolkit-proportions). It also appears in the
[formula summary](formulas.md) as section 6.1.

**Step 1. Name the two numbers.** In $\hat{p} = x \div n$, the letter $x$ is how many the model
got right and $n$ is how many you asked.

$x = 27$, $n = 45$.

**Step 2. Divide.**

$27 \div 45 = 0.6$

**Step 3. Turn the decimal into a percentage.** A percentage is a number out of a hundred, so
multiply by 100. The [Math Toolkit converts these both ways](math-toolkit.md#toolkit-percentages).

$0.6 \times 100 = 60.0$

**The answer.** $\hat{p} = 0.6$, which is **60.0 per cent**. There are no units on $\hat{p}$
itself; it is a fraction of the questions asked.

**Where this goes wrong.** The tempting slip is to divide the other way, $45 \div 27$, which
gives 1.666667. That is a real number and it is not a proportion, because a proportion can never
be larger than 1. If your answer comes out above 1, you put the bank size on top. The sanity
check takes two seconds: 27 out of 45 is a bit more than half, and 0.6 is a bit more than half,
so the two agree.

**3.** **What is asked.** Take the square root you built in problem 2 and finish
[Formula 2](../ch/ch15.md): multiply by 1.96, then write the interval as two percentages.

**What it tests.** The margin of error for a proportion, and the habit of rounding once at the
end. The square root is built from zero in
[Math Toolkit Section 9](math-toolkit.md#toolkit-square-roots).

**Step 1. Rebuild problem 2, so this solution stands on its own.** With $\hat{p} = 0.6$ and
$n = 45$:

$1 - 0.6 = 0.4$

$0.6 \times 0.4 = 0.24$

$0.24 \div 45 = 0.0053333$, with the 3s repeating forever.

$\sqrt{0.0053333\ldots} = 0.073030$

That repeating tail matters less than it looks. If you type 0.005333 into the calculator and stop
there, the square root comes to 0.073027 instead, and the final percentages below are unchanged.
Keep the digits your calculator is holding and round at the end.

**Step 2. Multiply by 1.96.** This is the fixed multiplier that makes the interval a 95 per cent
one.

$1.96 \times 0.073030 = 0.143139$

**Step 3. Subtract, to get the low end.**

$0.6 - 0.143139 = 0.456861$

**Step 4. Add, to get the high end.**

$0.6 + 0.143139 = 0.743139$

**Step 5. Turn both ends into percentages.**

$0.456861 \times 100 = 45.6861$, which rounds to 45.7

$0.743139 \times 100 = 74.3139$, which rounds to 74.3

**The answer.** The margin of error is $0.1431$, which is **14.3 percentage points**. The 95 per
cent Wald interval is $(0.4569,\, 0.7431)$, which is **45.7 per cent to 74.3 per cent**.

**Where this goes wrong.** Two places. First, calling the margin "14.3 per cent" instead of
"14.3 percentage points". A difference between two percentages is always in percentage points,
and the [Math Toolkit has a section on that
distinction](math-toolkit.md#toolkit-percentage-points) because it is graded. Second, multiplying
by 100 too early and then subtracting: $60 - 14.3$ is fine, but $0.6 - 14.3 = -13.7$ is not, and
a negative accuracy is the sign that the scales got mixed. Check that your interval sits either
side of your estimate: $0.6 - 0.4569 = 0.1431$ and $0.7431 - 0.6 = 0.1431$, and a Wald interval
is always symmetric like that.

**5.** **What is asked.** Turn a power reading and a stopwatch reading into total energy, then
into energy per token.

**What it tests.** [Formula 5, energy per token](../ch/ch15.md), also in the
[formula summary](formulas.md) at section 7.1. The 24.5 watts, 6.2 seconds and 140 tokens are
made up for practice.

**Step 1. Name the three quantities.** In $E_{\text{token}} = (\bar{P} \times t) \div m$, the
symbol $\bar{P}$ is the average power in watts, $t$ is the seconds the run took, and $m$ is the
tokens that came out.

$\bar{P} = 24.5$ watts, $t = 6.2$ seconds, $m = 140$ tokens.

**Step 2. Multiply power by time.** A watt is one joule per second, so watts times seconds gives
joules and nothing else needs converting.

$24.5 \times 6.2 = 151.9$ joules

**Step 3. Divide by the token count.**

$151.9 \div 140 = 1.085$ joules per token

**The answer.** The run spent **151.9 joules** in total, which is **1.085 joules per token**.

**Where this goes wrong.** The slip is stopping after step 2 and writing "151.9 joules per token".
That is the energy of the whole run, not of one token, and it is 140 times too big. Check the
answer against something measured: `lab/out/theme_s_energy.json` records 0.767069 joules per
token for Qwen2.5-0.5B and 1.133345 for Qwen2.5-1.5B on a 55 watt laptop GPU. Your 1.085 sits
between those two, which is where a 24.5 watt run should land.

**7.** **What is asked.** Turn a parameter count into a memory footprint, in bytes and in
gigabytes.

**What it tests.** [Formula 7](../ch/ch15.md), the same bytes-per-weight arithmetic worked in
[Chapter 7's answers](#answers-ch07). Big numbers written this way are in
[Math Toolkit Section 17](math-toolkit.md#toolkit-scientific-notation).

**Step 1. Name the two numbers.** In $B = (N \times b) \div 8$, the letter $N$ is the parameter
count and $b$ is how many bits each parameter is stored in.

$N = 1{,}543{,}714{,}304$ and $b = 16$.

The commas are spacers that group the digits in threes. They are not decimal points and they do
not change the value.

**Step 2. Multiply to get bits.**

$1{,}543{,}714{,}304 \times 16 = 24{,}699{,}428{,}864$ bits

**Step 3. Divide by 8, because there are 8 bits in a byte.**

$24{,}699{,}428{,}864 \div 8 = 3{,}087{,}428{,}608$ bytes

**Step 4. Divide by one billion to get gigabytes.**

$3{,}087{,}428{,}608 \div 1{,}000{,}000{,}000 = 3.087428608$

**The answer.** **3,087,428,608 bytes**, which is **3.087 gigabytes** at half precision.

**Check it against the file.** `lab/out/lab4_size_ladder.json` records `size_fp16_gb` for
Qwen2.5-1.5B-Instruct as 3.087428608, so your arithmetic reproduces the lab's to every digit.

**Where this goes wrong.** Forgetting step 3 gives 24.699 gigabytes, which is eight times too big
and would mean a 1.5B model needed a datacenter card. The fast check is that 16 bits is exactly 2
bytes, so the byte count must be double the parameter count: $1{,}543{,}714{,}304 \times 2 =
3{,}087{,}428{,}608$, and it is. Using 8 bits instead of 16 gives 1.544 gigabytes, which is the
right answer to a different question.

### Practice: can you apply it?

**9.** **What is asked.** Report one result the way the rubric wants it: a headline number, an
interval, and a conclusion that does not claim more than the interval supports.

**What it tests.** [Formula 1 and Formula 2 together](../ch/ch15.md), plus rubric items H1, H2
and H3 from Section 6.3 of the chapter. The 71 out of 100 is made up for practice, so name
whichever model you actually ran; the example sentence below uses Qwen2.5-1.5B-Instruct as a
stand-in.

**Step 1. The estimate.**

$\hat{p} = 71 \div 100 = 0.71$

$0.71 \times 100 = 71.0$ per cent

**Step 2. One minus the estimate.**

$1 - 0.71 = 0.29$

**Step 3. Multiply the two.**

$0.71 \times 0.29 = 0.2059$

**Step 4. Divide by $n$.**

$0.2059 \div 100 = 0.002059$

**Step 5. Take the square root, which gives the standard error.**

$\sqrt{0.002059} = 0.045376$

**Step 6. Multiply by 1.96, which gives the margin of error.**

$1.96 \times 0.045376 = 0.088937$

**Step 7. Subtract and add.**

$0.71 - 0.088937 = 0.621063$

$0.71 + 0.088937 = 0.798937$

**Step 8. Turn both ends into percentages.**

$0.621063 \times 100 = 62.1063$, which rounds to 62.1

$0.798937 \times 100 = 79.8937$, which rounds to 79.9

**The answer, written the way the rubric reads it.**

> Qwen2.5-1.5B-Instruct answered 71 of 100 questions correctly, which is 71.0 per cent, with a 95
> per cent Wald interval of 62.1 per cent to 79.9 per cent. On this bank I cannot separate this
> model from one whose true accuracy is 63 per cent, or from one at 79 per cent, so I report the
> range rather than the point.

That paragraph earns H1 because the interval is there, H2 because the word "Wald" names the
method, and H3 because the conclusion stays inside the interval.

**Where this goes wrong.** The tempting last sentence is "so the model has a solid grasp of the
material". That sentence scores zero on H3, which is 10 points, because the interval reaches down
to 62.1 per cent and "solid grasp" is not a quantity the data produced. The other slip is
rounding the standard error to 0.05 before multiplying: $1.96 \times 0.05 = 0.098$ against the
correct 0.088937, which moves each end of the interval by about 0.9 of a percentage point for no
reason at all.

**11.** **What is asked.** Cross-tabulate two models that answered the same 12 questions, and
count the questions that carry information.

**What it tests.** [Definition 7, the paired design, and Definition 8, the discordant
pair](../ch/ch15.md). The scores are made up for practice.

**Step 1. Write both score vectors out, question by question.** A 1 means correct, a 0 means
wrong. Model A is right on 1, 3, 4, 6, 7, 9 and 11. Model B is right on 1, 2, 3, 4, 6, 7, 9, 10
and 11.

| question | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| A | 1 | 0 | 1 | 1 | 0 | 1 | 1 | 0 | 1 | 0 | 1 | 0 |
| B | 1 | 1 | 1 | 1 | 0 | 1 | 1 | 0 | 1 | 1 | 1 | 0 |

**Step 2. Sort every question into one of four boxes.**

Both correct: questions 1, 3, 4, 6, 7, 9, 11. That is **7**.

Both wrong: questions 5, 8, 12. That is **3**.

Only B correct: questions 2 and 10. That is **2**.

Only A correct: none. That is **0**.

**Step 3. Check the four boxes add to the number of questions.**

$7 + 3 + 2 + 0 = 12$, and there are 12 questions, so nothing was dropped or double-counted.

**Step 4. Draw the table.**

| | B correct | B wrong |
|---|---|---|
| **A correct** | 7 | 0 |
| **A wrong** | 2 | 3 |

**The answer.** There are **2 discordant pairs**, questions 2 and 10, and both favour Model B.
The other 10 questions are agreements and say nothing about which model is better.

**Where this goes wrong.** The tempting move is to skip the table and subtract the totals: A got
7 of 12 and B got 9 of 12, so $9 - 7 = 2$, and the answer looks the same. It is the same here
only because no question went A's way. Subtracting the totals gives the gap between the two
disagreement boxes, not the number of disagreements. Had A won three questions and B won five,
the totals would still differ by 2 while there would be 8 discordant pairs, and McNemar's test in
problem 13 needs the 8, not the 2.

**13.** **What is asked.** Compute McNemar's exact two-sided p-value on the discordant pairs from
problem 11, and say what it means.

**What it tests.** The exact test worked in [Section 3.2 of the chapter](../ch/ch15.md) and in the
[formula summary](formulas.md) at section 6.8. The same test is worked on the real 20-question
data in [Chapter 13's answers](#answers-ch13).

**Step 1. Count the discordant pairs and which way they went.** From problem 11 there are 2
discordant pairs, questions 2 and 10, and both favour Model B. Every agreeing question is set
aside, because the test never looks at them.

**Step 2. Say what "the two models are equal" would predict.** If the two models were truly
equally good, then on a question where exactly one of them is right, which one is right is a coin
toss. Two discordant pairs are two coin tosses.

**Step 3. Compute the chance of both tosses landing the same way.** The raised 2 means multiply
one half by itself twice.

$(1/2)^2 = 1/2 \times 1/2 = 1 \div 4 = 0.25$

**Step 4. Double it, because the test is two-sided.** "Both the same way" can happen two ways:
both favouring B, or both favouring A. The p-value counts results at least this lopsided in
either direction.

$2 \times 0.25 = 0.5$

**The answer.** McNemar's exact two-sided p-value is **0.5**. The convention is to call a
difference statistically significant when the p-value is below 0.05, and 0.5 is ten times that
threshold. **Nothing has been shown.** Two disagreements cannot distinguish these two models. The
honest sentence for a report is: "Model B answered 2 more of the 12 questions correctly than
Model A, on 2 discordant pairs, McNemar exact $p = 0.5$. Twelve questions cannot separate these
models."

If you also worked problem 12, check that its 95 per cent interval contains zero. It does, and
the two analyses agreeing is what you want to see.

**Where this goes wrong.** Two slips. Forgetting to double gives 0.25, which is the one-sided
value and is not what the chapter asks for. And using all 12 questions instead of the 2 discordant
ones gives $(1/2)^{12}$, a number near 0.0002, which would announce a huge effect from a result
with almost no evidence in it. The test looks only at disagreements, and that is the whole idea
behind it.

**15.** **What is asked.** Price the same 35,000-token project again, this time at the measured
above-idle rate, and say what the gap between the two figures means.

**What it tests.** [Formula 6](../ch/ch15.md), and the difference between total draw and marginal
cost that the chapter's energy warning box insists your report label. The rate 1.051711 joules per
token is measured: it is `j_per_token_above_idle` for Qwen2.5-3B-Instruct in
`lab/out/theme_s_energy.json`. The 35,000 tokens is made up for practice.

**Step 1. Multiply the rate by the tokens, to get joules.**

$1.051711 \times 35{,}000 = 36{,}809.885$ joules

**Step 2. Divide by 3,600, because there are 3,600 seconds in an hour and a watt-hour is one watt
kept running for an hour.**

$36{,}809.885 \div 3600 = 10.224968$ watt-hours

**The answer.** **36,809.885 joules**, which is **10.225 watt-hours**, labelled in your table as
an estimate computed from a measured rate rather than as a direct measurement.

**Step 3. What the gap between the two rates represents.** The file records two rates for the same
model on the same run: 1.940526 joules per token for the whole board, and 1.051711 joules per
token above idle. Subtract them and carry the difference through the same two steps.

$1.940526 - 1.051711 = 0.888815$ joules per token

$0.888815 \times 35{,}000 = 31{,}108.525$ joules

$31{,}108.525 \div 3600 = 8.641257$ watt-hours

**The sentence.** The difference, about **8.641 watt-hours**, is the electricity the graphics card
would have drawn anyway with nothing running on it, spread across the tokens your job produced;
the full rate answers "what did the board consume while I worked" and the above-idle rate answers
"what did my work add".

**Where this goes wrong.** Dividing by 60 instead of 3,600 gives 613.5, which would be
watt-minutes and is not a unit anybody reports. The other error is reporting only the above-idle
figure and calling it the project's energy. The chapter's Try it 3 solution is explicit on this:
report both, and say which is which, because a number without its definition has left out the
thing that separates 10.225 from the smaller figure beside it.

**17.** **What is asked.** Turn four rubric fractions into a score out of 150, using
[Formula 9](../ch/ch15.md).

**What it tests.** A weighted sum, which is all that sigma notation is doing here. The
[Math Toolkit builds $\sum$ from "add these up"](math-toolkit.md#toolkit-sigma). The weights are
the published ones from Section 6.1 of the chapter: 60, 45, 30 and 15.

**Step 1. Multiply each criterion's points by the fraction earned.**

| $i$ | Criterion | $w_i$ | $s_i$ | $w_i s_i$ |
|---|---|---|---|---|
| 1 | correct method | 60 | 0.85 | $60 \times 0.85 = 51.0$ |
| 2 | honest interpretation | 45 | 0.20 | $45 \times 0.20 = 9.0$ |
| 3 | resource accounting | 30 | 0.90 | $30 \times 0.90 = 27.0$ |
| 4 | communication | 15 | 1.00 | $15 \times 1.00 = 15.0$ |

**Step 2. Add the last column, one step at a time.**

$51.0 + 9.0 = 60.0$

$60.0 + 27.0 = 87.0$

$87.0 + 15.0 = 102.0$

**Step 3. Turn it into a percentage of the final submission.**

$102.0 \div 150 = 0.68$

$0.68 \times 100 = 68.0$

**The answer.** **102.0 points out of 150**, which is **68.0 per cent** of the final submission.

**Check it.** Every product must sit between 0 and the points available, and each one does. The
total must be at most 150, and 102.0 is. And the story the table tells should match the numbers: a
draft with perfect writing, near-perfect method and near-perfect cost accounting is sitting at
68.0 per cent, and the single reason is the 9.0 out of 45 on interpretation.

**Where this goes wrong.** The tempting shortcut is to average the four fractions:
$(0.85 + 0.20 + 0.90 + 1.00) \div 4 = 2.95 \div 4 = 0.7375$, then $0.7375 \times 150 = 110.625$
points. That is 8.6 points too generous, because averaging treats the 15-point communication row
as though it weighed the same as the 60-point method row. The weights exist to say that it does
not. Multiply first, then add.

### Stretch: can you reason with it?

**19.** **What is asked.** A written argument in three sentences, not a calculation. There is no
single right answer here, so what follows is the content a strong reply contains, then one reply
that contains it.

**What a strong response contains.** Four things.

1. **The width of an interval is a fact about $n$, not about the care you took.** At $n = 60$ and
   $\hat{p} = 0.5$, Formula 2 gives 12.7 percentage points no matter how well the run was done,
   and the chapter's warning box works that arithmetic in full. A strong reply says this plainly.
2. **The rubric items, by number and by points.** H1 is 20 points for the interval being present,
   H2 is 10 for naming a method that fits the design, H3 is 10 for a conclusion that stays inside
   the interval, H4 is 5 for naming the sample size as a limitation. A wide interval, honestly
   reported and honestly interpreted, can earn all 45.
3. **What a narrower-looking interval usually costs.** The ways to make one look narrower are
   dropping it, reporting the best of five runs, or rounding until it looks tidier than it is.
   Each of those scores zero on H1 and H2, which is 30 points, and the last two also break the
   honesty policy printed in the chapter's callout.
4. **The offer of the real fix.** Precision costs questions at four times the rate you expect,
   from Formula 3, so more questions is the only honest way to narrow an interval.

**One reply that contains all four.**

> A wide interval is a statement about your sample size, not about your work: at 60 questions and
> an accuracy near 50 per cent the margin of error is 12.7 percentage points however carefully you
> run the model. The rubric pays 20 points on H1 for the interval being there, 10 on H2 for naming
> the method that produced it, 10 on H3 for a conclusion that stays inside it and 5 on H4 for
> naming the bank size as a limitation, so an honest wide interval can earn all 45 interpretation
> points. A narrower interval produced by dropping it, by reporting the best of five runs or by
> rounding it smaller scores zero on H1 and H2, and Formula 3 says the only real way to halve your
> uncertainty is four times the questions.

**Where this goes wrong.** The weak reply reassures the classmate without naming a number or a
rubric item: "don't worry, wide intervals are fine". That is the right conclusion with none of the
reasoning, and on a rubric that pays for evidence it earns very little. Name the points.

**21.** **What is asked.** Write the paragraph, under 120 words, that reports two disagreeing
analyses honestly. Again there is no single right answer, so what follows is the content and then
one paragraph.

**What it tests.** The tension the chapter calls the moment the course earns its keep. Every
number here is measured, from `lab/out/we7_paired.json`: 20 questions, 14 both correct, 1 both
wrong, 5 where only the 3B was right, 0 where only the 1.5B was right, paired interval
$(+5.5,\, +44.5)$ percentage points, McNemar exact two-sided $p = 0.0625$.

**What a strong response contains.** Five things.

1. **Both numbers, stated plainly**, with no hedging about which one you prefer.
2. **Why the design is paired**: both models answered the same 20 questions.
3. **What McNemar actually uses**: only the 5 discordant questions, not all 20.
4. **The refusal to pick.** The sentence that earns the H3 points is the one that declines to
   resolve the disagreement by choosing the friendlier analysis.
5. **The fix named as more questions**, not as a stronger claim.

**One paragraph, 116 words, which is inside the 120-word limit with room to spare.**

> Qwen2.5-3B-Instruct answered 19 of 20 and Qwen2.5-1.5B-Instruct answered 14 of 20 on the same
> bank, a gap of 25.0 percentage points. Both models saw the same questions, so the design is
> paired and I report the paired interval: +5.5 to +44.5 percentage points, which excludes zero.
> McNemar's exact test is built for this design and uses only the 5 questions where the models
> disagreed. It gives a two-sided p of 0.0625, which does not clear the usual 0.05. Two
> defensible analyses of the same 20 questions point in opposite directions, and I do not resolve
> that by picking the one I prefer. Five discordant questions cannot settle a 25 point gap; the
> fix is more questions.

**Where this goes wrong.** Two failures, opposite in shape and equal in cost. The first reports
only the interval, says "the difference is significant", and never mentions the p-value; that is
choosing the analysis after seeing it, which the chapter names as the single most common way an
honest student produces a dishonest report. The second reports only the p-value, says "there is no
difference", and hides a measured 25 percentage point gap; a p-value above 0.05 means the evidence
is thin, not that the two models are the same. Report both, name the design, and stop.

**23.** **What is asked.** Write your own capstone question, show it passes the four checks a
grader applies under rubric item M1, and compute the margin of error it would carry.

**What it tests.** [Section 2 of the chapter](../ch/ch15.md) for the question, Section 6.3 for the
M1 checks, and Formula 2 for the arithmetic. Your question will be different from the one below,
and that is correct; check yours against the four items, not against this example.

**What a strong response contains.** Three things.

1. **One sentence, not a paragraph.** If it needs two sentences, one of the two is a method note
   and belongs in the method section.
2. **Four nameable parts**, matching the four things M1 checks: a model named in full including
   its size, a measurable quantity you could state units for, a fixed scoring procedure, and a
   bank size.
3. **A margin of error computed before any code runs**, using $\hat{p} = 0.5$, because 0.5 is the
   value that makes the margin as large as it can be and therefore gives the safest planning
   number.

**One worked example of such a response.**

**The question.** "On a 90-question bank of introductory statistics items written for this course,
45 of them phrased in a Kern County context and 45 with no local context, how often does
Qwen2.5-1.5B-Instruct answer correctly under four-way rotation majority scoring?"

**The four M1 checks, one at a time.**

| M1 asks for | Where the question supplies it |
|---|---|
| a model, named in full including the size | "Qwen2.5-1.5B-Instruct" |
| a measurable quantity | "how often it answers correctly", which is a proportion: correct answers out of 90 |
| a fixed scoring procedure | "four-way rotation majority scoring" |
| a sample size | "90-question bank", split 45 and 45 |

**The margin of error, using Formula 2 at $\hat{p} = 0.5$ and $n = 90$.**

Step 1. $1 - 0.5 = 0.5$

Step 2. $0.5 \times 0.5 = 0.25$

Step 3. $0.25 \div 90 = 0.0027778$, with the digits repeating

Step 4. $\sqrt{0.0027778} = 0.052705$

Step 5. $1.96 \times 0.052705 = 0.103302$

Step 6. $0.103302 \times 100 = 10.3302$, which rounds to **10.3 percentage points**

**The sentence that goes in the Milestone 1 submission.** "At 90 questions and an assumed accuracy
of 50 per cent, the headline number will carry a margin of error of about 10.3 percentage points."

**The honest extra line, and it is worth writing.** The question above also asks about two halves
of 45 questions each, and each half is its own small bank. Redo the arithmetic at $n = 45$:
$0.25 \div 45 = 0.0055556$, then $\sqrt{0.0055556} = 0.074536$, then
$1.96 \times 0.074536 = 0.146090$, then $0.146090 \times 100 = 14.6090$, which rounds to **14.6
percentage points**. A difference between two numbers that each carry 14.6 points of uncertainty
carries more uncertainty still. Saying that at Milestone 1, before running anything, is what M1's
10 points are for.

**Where this goes wrong.** The two common failures are a question with a word like "better",
"good" or "creative" in it, which names no quantity and cannot be run, and a question that names
everything except the sample size, which cannot be planned because Formula 2 has no $n$ to put in.
The third and quieter failure is computing the margin at your hoped-for accuracy instead of at
0.5. Hoping the model scores 0.9 and planning at 0.9 gives
$0.9 \times 0.1 = 0.09$, then $0.09 \div 90 = 0.001$, then $\sqrt{0.001} = 0.031623$, then
$1.96 \times 0.031623 = 0.061981$, or 6.2 percentage points. If the model then scores 0.5, your
real margin is 10.3 points and your plan was built on the wrong number. Plan at 0.5 and be
pleasantly surprised.
