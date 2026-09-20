---
title: "The Shelf"
short_title: The Shelf
subtitle: "MATH 3219: every model, every dataset, every result file, and how to get the same numbers again"
description: "The reference shelf for the course. Each model with its exact repository name, its parameter count, its size in bytes, its licence and the chapters that use it; the twenty-question bank in full, with an honest account of why twenty is too few; every JSON result file with the script that wrote it; and the reproducibility contract that says what will come back the same and what will not."
---

Every number in this book came out of a program that ran on a real machine. This page is where
you find that machine, those programs, and the files they wrote. If a number in a chapter
surprises you, or you think it is wrong, you should be able to get from the number to the file
that holds it in one step. That is what this page is for.

There are three things on the shelf.

1. **Models.** Six of them. A model is a large list of numbers plus a small program that knows
   what to do with them. You will meet all six.
2. **Data.** One bank of twenty exam questions, and one collection of real documents from CSU
   Bakersfield.
3. **Result files.** Fourteen files, each holding the output of one experiment.

:::{important} The rule this whole page exists to serve
**We never publish a number we did not compute.**

Every measured number below comes from a file in `lab/out/`, or from the lab notebook at
`_research/00-lab-verified-findings.md`. Where this page does arithmetic on those numbers,
the arithmetic is written out step by step so you can check it with a calculator. Where a
number does not exist yet, this page says `[to be measured]` instead of guessing.
:::

:::{tip} How the formulas on this page are laid out
Every formula in this book arrives in the same six parts, in the same order: a plain sentence
with no symbols in it, then the formula, then a table defining every symbol, then how to say
the whole thing out loud, then a worked example with every step of arithmetic shown, then a
check you can apply to catch your own mistakes.

If a symbol on this page is unfamiliar, the Math Toolkit at
[`appendix/math-toolkit.md`](math-toolkit.md) teaches it from zero.
:::

---

## 1. Words this page uses

These are defined here because the rest of the page leans on them. Each one is defined again in
the chapter where it does real work.

**Model.** A long list of numbers, saved in a file, together with a small program that reads the
list and uses it to turn text into more text. The numbers are the model. The program is a few
hundred lines and is the same for every model in the Qwen family.

**Parameter.** One number in that list. A parameter is a plain number such as `-0.02698`. It was
set during training and it does not change while you use the model. When someone says a model
"has half a billion parameters", they mean the list is about five hundred million numbers long.

**Repository id.** The address of a model on Hugging Face, which is a website that hosts model
files the way GitHub hosts code. A repository id has the form `owner/model-name`, for example
`Qwen/Qwen2.5-0.5B-Instruct`. You paste that exact string into your code and the library
downloads the files for you.

**Instruct.** A model whose name ends in `-Instruct` has had extra training to make it answer
questions rather than continue a sentence. Every generative model in this course is an
`-Instruct` model, so that they can all be compared fairly.

**FP16.** Short for "floating point, 16 bits". A way of storing one number using 16 bits, which
is 2 bytes. **FP32** uses 32 bits, which is 4 bytes. A **bit** is a single 0 or 1, and a **byte**
is 8 bits. Chapter 6 takes this apart properly.

**Embedding model.** A model that does not write text at all. You hand it a sentence and it
hands back a fixed list of numbers, always the same length, that stands for the meaning of that
sentence. Chapters 8, 9 and 10 use these.

**Greedy decoding.** The model always picks its single highest-scoring next word, with no
randomness anywhere. This makes a run repeatable. It is how almost everything in this book was
generated.

**Token.** A piece of text the model treats as one unit. `Bakersfield` is three tokens for these
models: `'B'`, `'akers'` and `'field'`. Chapter 2 is about this.

---

## 2. The models

### 2.1 Why these six and not others

Four of the six models are from the same family, Qwen2.5, at four different sizes. That is on
purpose. If you compare a small model from one company against a large model from another, and
the two scores differ, you cannot tell whether size caused the difference or whether the two
companies trained differently. When every model in the comparison comes from one family,
trained by one team on one recipe, **size is the only thing that moves.** That is what a
controlled experiment means, and Chapter 9 says more about why it matters.

The other two models are embedding models. They do a different job, so they are compared against
each other rather than against the Qwen models.

### 2.2 The size of a model in bytes

Before the table of models, here is how to work out the number in the "size" column, because you
will want to check it.

**In words.** A model is a list of numbers. To find out how much room it takes on a disk, count
the numbers and multiply by how many bytes it takes to store one of them.

**The formula.**

$$S = N \times \frac{b}{8}$$

**The symbols.**

| Symbol | How to say it out loud | What it means |
|---|---|---|
| $S$ | "ess" | the size of the model, in **bytes** |
| $=$ | "equals" | the thing on the left is the same number as the thing on the right |
| $N$ | "en" | how many parameters the model has. A whole number, usually in the hundreds of millions |
| $\times$ | "times" | multiply |
| the fraction bar | "divided by" | divide the number on top by the number underneath |
| $b$ | "bee" | how many **bits** are used to store one parameter. 16 for FP16, 32 for FP32 |
| $8$ | "eight" | the number of bits in one byte. It is always 8 |

**Out loud.** "The size in bytes is the number of parameters, multiplied by the bits per
parameter divided by eight."

**Worked, for the smallest model in the course, stored at FP16.**

The parameter count is $N = 494{,}032{,}768$, and this was measured, not estimated. It is in
`lab/out/we2_softmax.json` under `n_params` and again in `lab/out/lab4_size_ladder.json` under
`params`. The bit width is $b = 16$.

Step 1, turn bits into bytes.
$16 \div 8 = 2$

So one parameter takes 2 bytes.

Step 2, multiply.
$494{,}032{,}768 \times 2 = 988{,}065{,}536$ bytes

Step 3, turn bytes into gigabytes. One gigabyte is 1,000,000,000 bytes.
$988{,}065{,}536 \div 1{,}000{,}000{,}000 = 0.988065536$ GB

Step 4, round to two decimal places for the table.
$0.988065536 \approx 0.99$ GB

That 0.988065536 is not a number this page invented. It is the value of `size_fp16_gb` in
`lab/out/lab4_size_ladder.json`, and the four steps above reproduce it exactly.

**Check it.** FP16 uses half as many bits as FP32, so an FP16 file must be exactly half the size
of the same model at FP32. The same model at FP32 is 1.976131072 GB, and
$1.976131072 \div 2 = 0.988065536$. The halves match, so the arithmetic is right. If your answer
for FP16 is not exactly half of your answer for FP32, you multiplied where you should have
divided.

### 2.3 The four generative models

These four write text. All four are listed at FP16 because that is how this course loads them.

| Repository id | Parameters | Size at FP16 | Licence | Where it is used |
|---|---|---|---|---|
| `Qwen/Qwen2.5-0.5B-Instruct` | 494,032,768 | 0.99 GB | Apache 2.0 | Chapters 1 to 7, and 11 to 14 |
| `Qwen/Qwen2.5-1.5B-Instruct` | 1,543,714,304 | 3.09 GB | Apache 2.0 | Chapters 7, 11, 13, 14 |
| `Qwen/Qwen2.5-3B-Instruct` | 3,085,938,688 | 6.17 GB | `qwen-research` (see §2.6) | Chapters 7, 11, 13, 14 |
| `qwen2.5:7b` via Ollama | 7.62 billion | 4.7 GB at Q4_K_M | Apache 2.0 | Chapters 1, 4, 5 |

The parameter counts for the first three were counted by the lab scripts, not read off a web
page. The 7B figure and its download size come from the model's page on `ollama.com`, checked
19 September 2026, because that model was never loaded through `transformers` on this machine
and so was never counted here.

Notice that the 7B download is 4.7 GB while the 3B download is 6.17 GB. The larger model is the
smaller file. That is not a mistake. The Ollama copy is stored at about 4 bits per parameter
instead of 16, using a scheme called Q4_K_M. Chapter 7 is about exactly that trade, and this row
is the first place in the book where you meet it.

---

#### `Qwen/Qwen2.5-0.5B-Instruct`

This is the model the course spends the most time inside, and it is the model that fails most
often. Both of those are on purpose. A model that gets everything right teaches you nothing
about how it works.

| Fact | Value | Where it was measured |
|---|---|---|
| Parameters | 494,032,768 | `we2_softmax.json`, `lab4_size_ladder.json` |
| Size at FP16 | 0.988065536 GB | `lab4_size_ladder.json` |
| Size at FP32 | 1.976131072 GB | `appendix_formulas_checks.json` |
| Vocabulary size | 151,936 tokens | `we2_softmax.json` |
| Hidden size | 896 | `config.json` in the local model cache |
| Layers | 24 | `config.json` in the local model cache |
| Share of parameters in the vocabulary table | 27.56% | lab findings §4 |
| Share in the MLP blocks | 63.51% | lab findings §4 |
| Share in all of attention | 8.92% | lab findings §4 |
| Load time onto the GPU | 3.93 seconds | `lab4_size_ladder.json` |
| Speed | 27.7 tokens per second | `theme_s_energy.json` |
| Energy | 0.767 joules per token | `theme_s_energy.json` |
| Score on the course question bank, naive scoring | 25.0% | `we6_eval.json`, `we6b_eval_debiased.json` |
| Same bank, option-text scoring | 35.0% | `we6b_eval_debiased.json` |
| Same bank, rotation-majority scoring | 15.0% | `we6b_eval_debiased.json` |

Two facts about this model do most of the teaching work in the book.

The first is where its parameters live. Over a quarter of this model, 27.56% of it, is a plain
lookup table with one row for each of the 151,936 tokens it knows. Attention, the mechanism this
kind of model is famous for, holds 8.92%. The famous part is under a tenth of the machine.

That 27.56% is worth working out by hand, because it is the number that most surprises people.

**In words.** The model keeps one row of numbers for every token it knows, and every row is the
same length. To find what fraction of the whole model that table takes up, count the numbers in
the table and divide by the count of numbers in the whole model.

**The formula.**

$$\text{share} = \frac{V \times h}{N}$$

**The symbols.**

| Symbol | How to say it out loud | What it means |
|---|---|---|
| share | "share" | the fraction of the model held by the vocabulary table. A number between 0 and 1 |
| $=$ | "equals" | the two sides are the same number |
| the fraction bar | "divided by" | divide the number on top by the number underneath |
| $V$ | "vee" | the **vocabulary size**: how many different tokens the model knows. Here, 151,936 |
| $\times$ | "times" | multiply |
| $h$ | "aitch" | the **hidden size**: how many numbers sit in each row of the table. Here, 896 |
| $N$ | "en" | the total number of parameters in the whole model. Here, 494,032,768 |

**Out loud.** "The share is the vocabulary size times the hidden size, divided by the total number
of parameters."

**Worked, for this model.**

Step 1, count the numbers in the table. There are 151,936 rows, and 896 numbers in each row.
$151{,}936 \times 896 = 136{,}134{,}656$

Step 2, divide by the size of the whole model.
$136{,}134{,}656 \div 494{,}032{,}768 = 0.275557948$

Step 3, turn that into a percentage.
$0.275557948 \times 100 = 27.5557948$

Step 4, round to two decimal places.
$27.56\%$

That value is recorded in `lab/out/appendix_formulas_checks.json` under `embedding_share`, where
it is stored as $0.275557948415276$, and it agrees with lab findings §4.

**Check it.** Before step 3 your answer must be between 0 and 1, because a part of a thing cannot
be larger than the thing. If you get a number above 1, you divided the whole model by the table
instead of the table by the whole model. A second check runs the arithmetic backwards:
$0.2755579 \times 494{,}032{,}768 = 136{,}134{,}632$, which is 136,134,656 to within the rounding
you did in step 3.

The second fact is one real weight matrix from inside it, `layers[0].self_attn.q_proj.weight`. It has
shape 896 by 896, which is 802,816 numbers. Those numbers have mean $-0.000017$, standard
deviation $0.066741$, smallest value $-1.2266$ and largest value $1.1719$. Half of them are
smaller in size than $0.02698$. Chapter 7 shows what happens when you try to round all 802,816 of
them onto a grid whose spacing is set by that one largest value.

---

#### `Qwen/Qwen2.5-1.5B-Instruct`

The workhorse. It is the largest of the three that fits comfortably on a 4 GB student laptop
graphics card, and the course's sustainability argument lands on it.

| Fact | Value | Where it was measured |
|---|---|---|
| Parameters | 1,543,714,304 | `lab4_size_ladder.json` |
| Size at FP16 | 3.087428608 GB | `lab4_size_ladder.json` |
| Hidden size | 1,536 | `config.json` in the local model cache |
| Layers | 28 | `config.json` in the local model cache |
| Load time onto the GPU | 6.08 seconds | `lab4_size_ladder.json` |
| Speed | 24.2 tokens per second | `theme_s_energy.json` |
| Energy | 1.133 joules per token | `theme_s_energy.json` |
| Question bank, naive scoring | 80.0% | `lab4_size_ladder.json` |
| Question bank, rotation scoring | 70.0% | `lab4_size_ladder.json`, `we7_paired.json` |
| Questions answered consistently under rotation | 13 out of 20 | `lab4_size_ladder.json` |

Going from the 0.5B model to this one raises the rotation-scored accuracy from 15.0% to 70.0%,
a gain of 55 percentage points, and costs 1.48 times as much energy for every token produced.
That pair of numbers is the whole of Chapter 7's closing argument, and it is why this is the
model the course recommends.

---

#### `Qwen/Qwen2.5-3B-Instruct`

The one that works. It is also the one that does not fit on a modest student machine, which is
the point.

| Fact | Value | Where it was measured |
|---|---|---|
| Parameters | 3,085,938,688 | `lab4_size_ladder.json` |
| Size at FP16 | 6.171877376 GB | `lab4_size_ladder.json` |
| Hidden size | 2,048 | `config.json` in the local model cache |
| Layers | 36 | `config.json` in the local model cache |
| Load time onto the GPU | 18.79 seconds | `lab4_size_ladder.json` |
| Speed | 15.6 tokens per second | `theme_s_energy.json` |
| Energy | 1.941 joules per token | `theme_s_energy.json` |
| Question bank, naive scoring | 95.0% | `lab4_size_ladder.json` |
| Question bank, rotation scoring | 95.0% | `lab4_size_ladder.json`, `we7_paired.json` |
| Questions answered consistently under rotation | 18 out of 20 | `lab4_size_ladder.json` |

This model has 6.25 times the parameters of the 0.5B model and costs 2.53 times the energy per
token. Under rotation scoring it reaches 95.0% where the 0.5B model reaches 15.0%. Chapter 13 then asks whether its
25 percentage point lead over the 1.5B model can be called real on twenty questions, and the
answer is no. Section 3.6 of this page shows why, with the arithmetic.

---

#### `qwen2.5:7b` via Ollama

This is the no-install path. Ollama is a program you download like any other application. It
manages model files for you and does not need a working CUDA and PyTorch setup. If your machine
will not run the `transformers` code, run this instead.

| Fact | Value | Source |
|---|---|---|
| Tag | `qwen2.5:7b` | `ollama.com`, checked 19 September 2026 |
| Parameters | 7.62 billion | `ollama.com`, checked 19 September 2026 |
| Download size | 4.7 GB | `ollama.com`, checked 19 September 2026 |
| Storage format | Q4_K_M, about 4 bits per parameter | `ollama.com`, checked 19 September 2026 |
| Ollama version used | 0.24.0 | lab findings, header |
| Probability of `' Paris'` after `The capital of France is` | 54.25% | lab findings §1 |
| Probability held by its top 8 tokens | 80.13% | lab findings §1 |

On the same prompt, the 0.5B model gives `' Paris'` a probability of 30.219% and this model
gives it 54.25%. Fourteen times the parameters, and far more commitment to the right answer.

:::{warning} The one setting that will ruin your Ollama run
When you call Ollama's `/api/generate` endpoint, you must send `"raw": true`.

Without it, Ollama wraps your prompt in the model's chat template. Your prompt
`The capital of France is` stops being a sentence to continue and becomes a message to reply to.
The "next token" is then the first token of a reply, which came back as `'The'` with probability
99.9993%. A student looking at that screen would conclude the model has no uncertainty at all,
which is the opposite of what this course is teaching.

Two more details from the same run. The `logprobs` setting is a true-or-false switch, so
`"logprobs": true` paired with `"top_logprobs": 5`. Writing `"logprobs": 5` fails with a type
error. And the OpenAI-compatible route at `/v1/completions` returned nothing useful in this
version, so use the native `/api/generate` route.
:::

:::{note} No JSON file for this one
The two Ollama probabilities above were read off the screen during the tooling test written up
in lab findings §1. No script wrote them to `lab/out/`. They are the only model numbers in this
appendix without a JSON file behind them, and that is a gap, not a style choice. A script that
records them belongs in `lab/`.
:::

### 2.4 The two embedding models

These two do not write text. Hand one of them a sentence and it returns a list of 384 numbers
that stands for the meaning of that sentence. Chapter 9 explains how comparing two such lists
tells you whether two sentences mean the same thing.

| Repository id | Parameters | Size at FP16 | Output length | Licence | Where it is used |
|---|---|---|---|---|---|
| `sentence-transformers/all-MiniLM-L6-v2` | 22,713,216 | 0.045 GB | 384 numbers | Apache 2.0 | Chapters 8, 9, 10 |
| `BAAI/bge-small-en-v1.5` | 33,360,000 | 0.067 GB | 384 numbers | MIT | Chapter 10 |

The FP16 sizes in that table are arithmetic, not measurements. Formula 2.2 applied to 22,713,216
parameters gives $22{,}713{,}216 \times 2 = 45{,}426{,}432$ bytes, which is 0.045426432 GB. The
copies actually on this machine are stored at FP32 and take twice that. The parameter counts
themselves were counted by `lab/lab2_rag_v3.py` and are in `lab/out/lab2_rag_v3.json`.

---

#### `sentence-transformers/all-MiniLM-L6-v2`

Small, fast, and the default for Chapters 8 and 9. It is 22,713,216 parameters, which is about
one twenty-second of the smallest Qwen model.

Its measured behaviour, from `lab/out/we5_embeddings.json`:

| Sentence pair | Similarity |
|---|---|
| "Bakersfield is in Kern County, California." and "Kern County's largest city is Bakersfield." | 0.8333 |
| "The cat sat on the mat." and "A kitten rested on the rug." | 0.6124 |
| The cat sentence and the Bakersfield sentence | 0.0844 |
| "The stock market fell sharply on Tuesday." and "Photosynthesis converts light into chemical energy." | $-0.0166$ |

The second row is the one to look at twice. Those two sentences share no important words at all.
There is no "cat" in the second and no "kitten" in the first. They still score 0.6124, because
the model has learned that a kitten on a rug and a cat on a mat are close in meaning. The last
row goes below zero, which is the model saying that two sentences are not merely unrelated but
pointing in opposite directions.

Given the question "Which California county is Bakersfield in?", the same model ranked the six
sentences with similarities 0.9101, 0.7191, then 0.0893 and below. The gap between second place
and third place is the whole idea behind retrieval.

---

#### `BAAI/bge-small-en-v1.5`

This model is in the course because the MiniLM model was not good enough for Lab 2, and the
course prints the failure rather than hiding it.

| Fact | Value | Where it was measured |
|---|---|---|
| Parameters | 33,360,000 | `lab2_rag_v3.json` |
| Output length | 384 numbers | `lab2_rag_v3.json` |
| Layers | 12 | `config.json` in the local model cache |
| Correct section retrieved first, out of 6 questions | 6 | `lab2_rag_v3.json` |
| Mean gap between first and second result | 0.05504 | `lab2_rag_v3.json` |

It has 1.47 times as many parameters as MiniLM, and it is trained to expect a short instruction
in front of every query. The exact string the lab used is
`Represent this sentence for searching relevant passages: `, prepended to the question and to
nothing else. Leave that prefix off and you are not using the model the way it was trained.

:::{important} The result that catches people out
The bge model retrieved the correct section first on all 6 questions. The MiniLM model managed
3 of 6 on exactly the same chunks. So bge is the better model on this task.

And yet bge's mean first-to-second gap is **0.05504**, while MiniLM's is **0.0577**. The worse
system has the larger gap.

The gap between the top result and the runner-up is a useful confidence signal **inside one
system**. It does not carry across to a different system. A student who learned "a big gap means
good retrieval" from the MiniLM run would read these two numbers and pick the wrong model.

This is the same lesson as Chapter 13 in different clothing: a number is a property of the
procedure that produced it, and comparing numbers across procedures is where people go wrong.
:::

### 2.5 Which chapter uses which model

| Chapter | Topic | Model used |
|---|---|---|
| 1 | First run, first cost | `Qwen2.5-0.5B-Instruct`, or `qwen2.5:7b` via Ollama |
| 2 | Tokens | the `Qwen2.5-0.5B-Instruct` tokenizer |
| 3 | Parameters | `Qwen2.5-0.5B-Instruct` |
| 4 | Softmax | `Qwen2.5-0.5B-Instruct`, compared against `qwen2.5:7b` |
| 5 | Temperature | `Qwen2.5-0.5B-Instruct` |
| 6 | Bits and precision | `Qwen2.5-0.5B-Instruct` weights |
| 7 | Quantization, energy, access | all three Qwen sizes |
| 8 | Vectors | `all-MiniLM-L6-v2` |
| 9 | Cosine similarity | `all-MiniLM-L6-v2` |
| 10 | Retrieval | `all-MiniLM-L6-v2`, then `bge-small-en-v1.5` |
| 11 | Taking a test | all three Qwen sizes |
| 12 | Confidence intervals | `Qwen2.5-0.5B-Instruct` |
| 13 | Measuring the measurement | `Qwen2.5-0.5B-Instruct`, then 1.5B against 3B |
| 14 | Bias in the benchmark | all three Qwen sizes |
| 15 | Capstone | your choice from this list |

### 2.6 Licences

A licence is the document that says what you are allowed to do with a file somebody else made.
It matters here for a specific reason: a public university course that asks students to download
model weights, and that may want to hand out a copy on a USB stick in a computer lab, needs to
know whether that is permitted.

| Model | Licence identifier | How it was checked |
|---|---|---|
| `Qwen/Qwen2.5-0.5B-Instruct` | `apache-2.0` | model card on huggingface.co, read 19 September 2026 |
| `Qwen/Qwen2.5-1.5B-Instruct` | `apache-2.0` | model card on huggingface.co, read 19 September 2026 |
| `Qwen/Qwen2.5-3B-Instruct` | `qwen-research` | model card on huggingface.co, read 19 September 2026 |
| `qwen2.5:7b` via Ollama | `Apache License Version 2.0` | model page on ollama.com, read 19 September 2026 |
| `sentence-transformers/all-MiniLM-L6-v2` | `apache-2.0` | model card `README.md` in the local cache |
| `BAAI/bge-small-en-v1.5` | `mit` | model card `README.md` in the local cache |

**Apache 2.0 and MIT** are both permissive licences. They allow you to use, copy, change and
redistribute the files, including commercially, as long as the licence text and the attribution
travel with the copy. Redistributing these five models in a course pack is within what those
licences describe.

The bge model card states its terms in one sentence, quoted here exactly:

> FlagEmbedding is licensed under the MIT License. The released models can be used for
> commercial purposes free of charge.

**The 3B model is the exception, and it is the one to be careful with.** Its licence identifier
is `qwen-research`. That is not Apache 2.0 and it is not MIT. It is a custom licence written by
the model's publisher, and the name alone suggests a restriction that the permissive licences do
not have. The identifier above was read off the model card. The licence text itself was not.

`[VERIFY: licence terms for classroom redistribution]` for `Qwen/Qwen2.5-3B-Instruct`. Someone
must read the `qwen-research` licence text in full and record here whether a CSU course may
redistribute those weights to enrolled students, before that model is put on a lab machine or a
USB stick.

:::{note} What this section is and is not
This is a record of which licence identifier each model card carries and where that was read.
It is not legal advice, and the instructor is not a lawyer. Anything that involves copying
weights onto university equipment goes past the department first.
:::

---

## 3. The question bank

### 3.1 What it is, stated plainly

The course uses **twenty multiple-choice questions about general-education statistics. They were
written for this course, by hand, by the instructor.** They are not a published benchmark. They
have no standing outside this book. Nobody else uses them. The correct answers were checked by
hand.

Each question has four options, labelled A, B, C and D, and exactly one of them is correct.

The reason for saying all of that first is that the rest of this section is about how little
twenty questions can tell you, and that argument only works if you know exactly what you are
holding.

### 3.2 The twenty questions

The full text of every question, with its options, lives in the Python scripts that use it. It is
copied verbatim into four of them: `lab/we6_eval_bootstrap.py`, `lab/we6b_eval_debiased.py`,
`lab/lab4_size_ladder.py` and `lab/we7_paired_comparison.py`. Every item and every model answer
is also written out in `lab/out/we6_eval.json` under `records`.

| # | Question | Topic | Correct |
|---|---|---|---|
| 1 | The mean of 2, 4, 4, 6 is: | centre | B |
| 2 | Which is a categorical variable? | types | B |
| 3 | The median of 1, 3, 5, 7, 9 is: | centre | C |
| 4 | If every value in a dataset increases by 10, the standard deviation: | spread | C |
| 5 | A probability can never be: | probability | D |
| 6 | In a fair coin toss, P(heads) equals: | probability | C |
| 7 | The range of 4, 9, 12, 20 is: | spread | C |
| 8 | A sample is: | design | B |
| 9 | Which graph is best for one categorical variable? | graphs | B |
| 10 | Correlation measures: | association | B |
| 11 | A correlation of $-0.9$ indicates: | association | C |
| 12 | The mode of 2, 2, 3, 7 is: | centre | A |
| 13 | Increasing sample size generally makes a confidence interval: | inference | B |
| 14 | A p-value is: | inference | B |
| 15 | Which is NOT a measure of centre? | centre | D |
| 16 | In a right-skewed distribution, the mean is usually: | shape | C |
| 17 | Random assignment in an experiment allows: | design | A |
| 18 | The standard deviation can never be: | spread | C |
| 19 | A histogram displays: | graphs | B |
| 20 | If P(A) = 0.3, then P(not A) is: | probability | C |

The twenty questions cover nine topics, and the counts are uneven: centre has 4 questions, spread
3, probability 3, design 2, graphs 2, association 2, inference 2, types 1 and shape 1. Those
counts are in `lab/out/we6_eval.json` under `by_topic`. Chapter 14 uses them to show that an
overall score of 25% can hide a topic where the model scored 100% and a topic where it scored 0%.

The correct answers are spread A: 2, B: 8, C: 8, D: 2. Keep that spread in mind for §3.5, because
it is what makes one of the course's sharpest results visible.

### 3.3 Accuracy

**In words.** Accuracy is the share of questions the model got right.

**The formula.**

$$\hat{p} = \frac{x}{n}$$

**The symbols.**

| Symbol | How to say it out loud | What it means |
|---|---|---|
| $\hat{p}$ | "p hat" | the accuracy you measured. A number between 0 and 1 |
| the hat, $\hat{\phantom{p}}$ | "hat" | a mark meaning "this is something we measured, not something we know for certain" |
| $=$ | "equals" | the two sides are the same number |
| the fraction bar | "divided by" | divide the top by the bottom |
| $x$ | "ex" | how many questions the model got right. A whole number |
| $n$ | "en" | how many questions there were in total. Here, 20 |

**Out loud.** "P hat equals x divided by n", which is to say, the accuracy is the number right
divided by the number asked.

**Worked, for the 0.5B model's first run.** It got 5 of the 20 right. So $x = 5$ and $n = 20$.

Step 1, divide.
$5 \div 20 = 0.25$

Step 2, turn that into a percentage by multiplying by 100.
$0.25 \times 100 = 25$

So the accuracy is $0.25$, which is 25.0%. That matches `accuracy` in `lab/out/we6_eval.json`
exactly.

**Check it.** Accuracy is always between 0 and 1 before you convert it, and between 0% and 100%
after. If you get a number above 1, you divided the wrong way round. If you get a number above
100%, you multiplied by 100 twice.

### 3.4 Chance level

**In words.** If you guess at random on a multiple-choice question, you will be right some of
the time by luck alone. How often depends only on how many options there are.

**The formula.**

$$c = \frac{1}{k}$$

**The symbols.**

| Symbol | How to say it out loud | What it means |
|---|---|---|
| $c$ | "see" | the chance level: the accuracy you would expect from pure guessing |
| $=$ | "equals" | the two sides are the same number |
| $1$ | "one" | the one option that is correct |
| the fraction bar | "divided by" | divide the top by the bottom |
| $k$ | "kay" | how many options each question offers. Here, 4 |

**Out loud.** "The chance level is one divided by the number of options."

**Worked, for this bank.** Every question has four options, so $k = 4$.

Step 1, divide.
$1 \div 4 = 0.25$

Step 2, turn it into a percentage.
$0.25 \times 100 = 25$

The chance level is 25.0%.

**Check it.** With $k = 1$ the formula gives 1, meaning you cannot get it wrong, which is right.
As $k$ grows, $c$ shrinks: 2 options gives 50.0%, 5 options gives 20.0%, 10 options gives 10.0%.
The chance level can never be negative and can never be above 1. If yours is, you divided $k$ by
1 instead of 1 by $k$.

### 3.5 Put the two numbers side by side

Under the naive letter procedure the 0.5B model scored 25.0% on the bank. The chance level on
the bank is 25.0%.

Those are the same number. A model that had answered by flipping a coin twice would have been
expected to land in the same place. That coincidence is what made the instructor look harder,
and what he found is written up in Chapter 13.

Here is the finding in one table, from `lab/out/we6b_eval_debiased.json`:

| | A | B | C | D |
|---|---|---|---|---|
| Letters the model chose | 16 | 2 | 0 | 2 |
| Letters that were correct | 2 | 8 | 8 | 2 |

The model picked A on 16 of the 20 questions. The correct answer was A twice. The scoring
procedure was reading the model's preference for the letter A, not its knowledge of statistics.

Change the scoring procedure and the same model on the same twenty questions gives:

| Scoring procedure | Accuracy |
|---|---|
| Naive: score the model's probability on the letter A, B, C or D | 25.0% |
| Score the model's probability on the text of each option, adjusted for length | 35.0% |
| Ask each question four times with the options rotated, take the majority answer | 15.0% |
| Chance | 25.0% |

Three defensible procedures, three publishable-looking numbers, spanning 15.0% to 35.0%. Under
the rotation procedure, **1 of the 20 questions** produced the same answer all four times. The
honest conclusion is not that this model scores 25%, or 35%, or 15%. It is that this model does
not know this material and no single number should have been reported.

### 3.6 Twenty questions is far too few, and the book says so

Twenty questions cannot rank two models. The course knows this, states it, and then uses the
smallness as the teaching device.

The reference is Evan Miller, *Adding Error Bars to Evals: A Statistical Approach to Language
Model Evaluations*, arXiv:2411.00640. The relevant sentence is quoted here exactly:

> Although these parameters are fictional, they are reasonable, and suggest that new evals should
> contain at least 1,000 questions in order to have good signaling ability.

**Twenty is one fiftieth of that.** Everything this book computes from the bank is computed
correctly, and everything it computes is also nearly useless for ranking, and both of those are
true at once. Learning to hold both at once is the point of Module E.

Miller's recommendation comes out of a formula, and the formula is worth working through, because
it turns "twenty is too few" from an opinion into arithmetic.

**In words.** Before you run a test, work out how many questions you need so that a difference
you care about will show up, instead of hiding inside the noise.

**The formula.**

$$n = \frac{\left(z_{\alpha/2} + z_{\beta}\right)^{2}\,\omega^{2}}{\delta^{2}}$$

**The symbols.**

| Symbol | How to say it out loud | What it means |
|---|---|---|
| $n$ | "en" | how many questions the test needs. This is the answer |
| $=$ | "equals" | the two sides are the same number |
| the fraction bar | "divided by" | divide everything on top by everything underneath |
| $(\ \ )$ | "brackets" | do what is inside first, before anything outside |
| $z_{\alpha/2}$ | "z sub alpha over two" | a fixed multiplier set by how often you are willing to see a difference that is not there. For the usual 5%, it is 1.959964 |
| $\alpha$ | "alpha", a Greek letter | the false-alarm rate you accept. 0.05 means 5% |
| $z_{\beta}$ | "z sub beta" | a fixed multiplier set by how often you are willing to miss a difference that is there. For 80% power, it is 0.841621 |
| $\beta$ | "beta", a Greek letter | the miss rate you accept. 0.20 means you miss 20% of real differences |
| $+$ | "plus" | add |
| the raised $2$ | "squared" | multiply the thing by itself |
| $\omega^{2}$ | "omega squared" | how much the question-by-question difference between the two models bounces around. Omega is a Greek letter |
| $\delta$ | "delta", a Greek letter | the smallest difference you want to be able to detect, written as a decimal. 0.03 means 3 percentage points |

**Out loud.** "The number of questions is the two multipliers added together, squared, times the
variance, all divided by the square of the smallest difference you want to catch."

**Worked, with Miller's own example numbers.** He sets $\delta = 0.03$, $\omega^{2} = 1/9$,
$\alpha = 0.05$ and $\beta = 0.20$.

Step 1, add the two multipliers.
$1.959964 + 0.841621 = 2.801585$

Step 2, square that.
$2.801585 \times 2.801585 = 7.848880$

Step 3, work out the variance as a decimal.
$1 \div 9 = 0.111111$

Step 4, multiply the top of the fraction out.
$7.848880 \times 0.111111 = 0.872098$

Step 5, square the difference you want to detect.
$0.03 \times 0.03 = 0.0009$

Step 6, divide.
$0.872098 \div 0.0009 = 968.998$

Step 7, round up, because you cannot ask a fraction of a question.
$n = 969$

Miller writes this as "approximately 969" and then rounds it to the recommendation of at least
1,000.

**Check it.** The difference you want to detect is squared on the bottom of the fraction, so
halving it should multiply $n$ by four. Try $\delta = 0.015$ instead of 0.03:
$0.015 \times 0.015 = 0.000225$, and $0.872098 \div 0.000225 = 3876.0$. That is
$969 \times 4$, so the formula behaved as it must. If your $n$ went **down** when you asked to
detect a **smaller** difference, you divided by $\delta$ instead of by $\delta^{2}$.

:::{note} Where $\omega^{2} = 1/9$ comes from
Miller's full formula has three variance terms: $\omega^{2}$, which is how much the paired
difference between the two models bounces from question to question, plus one term for each
model covering the wobble you get from asking the same model the same question more than once.
In his worked example the two extra terms are set to zero, which is exactly our situation:
this course scores deterministically, so asking twice gives the same answer twice. What is left
is the version printed above. He calls the parameters fictional and reasonable, and so they are.
:::

### 3.7 What our own twenty questions could and could not detect

Miller's formula can be turned around. Instead of asking how many questions you need, fix the
number of questions and ask how large a difference you could have caught.

**In words.** With the test you actually ran, work out the smallest difference between two
models that would reliably have shown up. Anything smaller than that was never going to be
visible, however carefully you measured.

**The formula.**

$$\delta = \left(z_{\alpha/2} + z_{\beta}\right)\sqrt{\frac{\omega^{2}}{n}}$$

**The symbols.** All of them mean what they meant in §3.6, with one addition.

| Symbol | How to say it out loud | What it means |
|---|---|---|
| $\delta$ | "delta" | now the answer rather than an input: the smallest difference this test could catch |
| $\sqrt{\phantom{x}}$ | "the square root of" | the number which, multiplied by itself, gives what is underneath. Your calculator has this as $\sqrt{\ }$ |
| $\omega^{2}$ | "omega squared" | the variance of the question-by-question difference, measured from the run |
| $n$ | "en" | how many questions were on the test. Here, 20 |

**Out loud.** "The smallest detectable difference is the two multipliers added together, times
the square root of the variance divided by the number of questions."

**Worked, on the 1.5B against 3B comparison in `lab/out/we7_paired.json`.**

That file records `sd`, the standard deviation of the twenty question-by-question differences, as
$0.4442616583$. Variance is the standard deviation squared.

Step 1, square the standard deviation to get $\omega^{2}$.
$0.4442616583 \times 0.4442616583 = 0.19736842$

Step 2, divide by the number of questions.
$0.19736842 \div 20 = 0.00986842$

Step 3, take the square root.
$\sqrt{0.00986842} = 0.09933993$

Step 4, multiply by the two multipliers added together, from §3.6.
$2.801585 \times 0.09933993 = 0.278309$

Step 5, turn it into percentage points.
$0.278309 \times 100 = 27.8$

**So the smallest gap those twenty questions could reliably detect is about 27.8 percentage
points. The gap we observed was 25.0 percentage points.** The test was not big enough to catch
the difference it was asked to catch. That is why McNemar's exact test returned $p = 0.0625$ and
did not clear the usual 0.05, and it is Chapter 13's whole argument in one line: you cannot fix a
design problem with a bigger claim, you fix it with more questions.

**Check it.** Step 3 should have produced the number that `lab/out/we7_paired.json` already
records as the paired standard error, and it did: the file says `0.09933992677987828` and step 3
gives $0.09933993$. Two routes to the same number is a good sign. If they had disagreed, one of
the two would be wrong.

:::{note} This one is arithmetic, not a measurement
Sections 3.6 and 3.7 do arithmetic on the standard deviation stored in
`lab/out/we7_paired.json`. Every step is written out above so you can repeat it. No new
experiment was run to produce 27.8 percentage points. A script that computes it and writes it to
`lab/out/` should be added, so that the number regenerates itself when the data changes.
:::

### 3.8 What the bank is for

The bank is not there to rank models. It is there to make four things visible on a scale a
student can hold in their head:

1. A score is a **sample proportion**, so it moves when the sample moves. Twenty items makes that
   movement large enough to see. Chapter 12.
2. A score depends on the **scoring procedure**, not only on the model. Fifteen, twenty-five and
   thirty-five per cent from one model on one bank. Chapter 13.
3. An overall score **hides its subgroups**. Chapter 14.
4. A test can be too small to answer the question you asked it. Chapter 13, and §3.7 above.

The capstone in Chapter 15 asks you to build something better.

---

## 4. The retrieval corpus

Chapter 10 and Lab 2 need a set of real documents to search. The course uses CSU Bakersfield's
own General Education documents.

| Document | File |
|---|---|
| The GE Compendium, Cal-GETC aligned, revised 30 April 2026 | `_corpus/text/GECCo/Compendium/GE_Compendium_CalGETC_aligned.pdf.txt` |
| Guiding Notes for Course Review, 2025 to 2026, final 3 October 2025 | `_corpus/text/GECCo/2025-2026 Guiding Notes for Course Review_Final 10-3-2025_1.pdf.txt` |

They were chosen for one reason. **You can check the answer yourself.** When the system retrieves
a passage claiming that Theme assignments must make up at least 40% of the grade, you can open
the Compendium, find that sentence, and confirm it. A retrieval demonstration over invented
documents cannot teach you whether retrieval worked, because there is nothing to check it
against.

Six questions were written against these documents, each with a known correct section. One of
them is "Does an Area 2 course have to be lower division?", whose answer lives in the section
headed *Area 2 Course Requirements*.

The corpus was cut into pieces three different ways across three runs, and the results say more
than any one of them would:

| Run | How the text was cut | Embedding model | Correct section ranked first | Mean first-to-second gap |
|---|---|---|---|---|
| v1 | fixed windows of 120 words, 30 words of overlap, 248 pieces | `all-MiniLM-L6-v2` | essentially none | 0.038 |
| v2 | split at headings, heading prepended, 77 pieces from 31 sections | `all-MiniLM-L6-v2` | 3 of 6 | 0.0577 |
| v3 | the same 77 heading-aware pieces | `bge-small-en-v1.5` | 6 of 6 | 0.05504 |

Teach all three in that order. The first attempt failed, and the failure is diagnosable: a window
that starts in the middle of a section does not know which section it is in, and every
requirements list in the Compendium reads alike, so a question about Area 2 came back with Area 6
text. Fixing the cutting raised it to 3 of 6 and was not enough, because the section headed
*Capstone Course Requirements* pulled in three questions it had no business winning. Changing one
more thing, the embedding model, got 6 of 6.

Do not open Chapter 10 with the version that works.

---

## 5. The result files

Every JSON file in `lab/out/`, as the directory stands today. This is the list you use to trace a
number in one step: find the number's file in a chapter, find the file here, and the third column
names the program that wrote it.

| File | Size on disk | Written by | What it holds |
|---|---|---|---|
| `appendix_formulas_checks.json` | 10.5 KB | `lab/appendix_formulas_checks.py` | every worked instance printed in the formula sheet, recomputed and checked against the recorded values |
| `lab2_corpus_chunks.json` | 224 KB | `lab/lab2_rag_corpus.py` | the 248 fixed-window pieces of the GE corpus, with their source and starting word |
| `lab2_rag.json` | 18.3 KB | `lab/lab2_rag_corpus.py` | first retrieval run: corpus settings and the ranked results for all six questions |
| `lab2_rag_v2.json` | 4.1 KB | `lab/lab2_rag_v2.py` | second run with heading-aware chunks: 77 chunks, 3 hits of 6, per-question gaps and retrieved text |
| `lab2_rag_v3.json` | 281 B | `lab/lab2_rag_v3.py` | third run: MiniLM against bge on the same chunks, with parameter counts, hits and mean gaps |
| `lab4_size_ladder.json` | 1.3 KB | `lab/lab4_size_ladder.py` | 0.5B, 1.5B and 3B: parameters, FP16 size, load and inference times, naive and rotation accuracy, consistency, first-pick letter spread |
| `theme_s_energy.json` | 1.7 KB | `lab/theme_s_energy.py` | per model: tokens produced, seconds, tokens per second, mean and peak watts, joules per token, joules per token above idle, watt-hours per 1,000 tokens, plus a `_meta` block naming the GPU and what the meter excludes |
| `we2_softmax.json` | 2.5 KB | `lab/we2_softmax.py` | the prompt and its token ids, vocabulary size, parameter count, the top 8 tokens with their raw logits, and the softmax probabilities at five temperatures |
| `we3_params_quant.json` | 1.1 KB | `lab/we3_params_quant.py` | total parameter count, per-tensor quantization scale and error at 8, 6, 4, 3 and 2 bits, and the shape, mean, standard deviation, minimum and maximum of one real weight matrix |
| `we3b_quant.json` | 1.5 KB | `lab/we3b_quant_honest.py` | per-tensor against blocks of 32, at each bit width: mean error, maximum error, and error as a fraction of the weights' standard deviation |
| `we5_embeddings.json` | 1.7 KB | `lab/we5_embeddings.py` | the six sentences, the full 6 by 6 similarity matrix, the retrieval query and its similarity to each sentence |
| `we6_eval.json` | 4.8 KB | `lab/we6_eval_bootstrap.py` | the 20-question run: score, Wald interval, bootstrap interval and standard deviation, a record per question, and a breakdown by topic |
| `we6b_eval_debiased.json` | 363 B | `lab/we6b_eval_debiased.py` | the three scoring procedures with their accuracies, the letter counts under each, and how many questions were consistent under rotation |
| `we7_paired.json` | 1.3 KB | `lab/we7_paired_comparison.py` | 1.5B against 3B: each model's per-question correctness, the 2 by 2 contingency table, paired and unpaired standard errors and intervals, the width ratio, and McNemar's exact p-value |

Three more scripts in `lab/` write pictures rather than JSON: `make_figures.py`, `fig_ladder.py`
and `fig_theme_s.py`. They read the files above and write the PNG images in `book/figures/`. No
number originates in a figure script.

:::{note} Two notes on this list
The build plan at `_planning/01-BUILD-PLAN.md` lists seven of these files. The directory holds
fourteen. The list above was read from the directory on 19 September 2026, not copied from the
plan, and the plan should be brought up to date.

The plan also expects a copy of these files at `book/data/`. That folder does not exist yet.
Until it does, every path in this book points at `lab/out/`.
:::

---

## 6. The reproducibility contract

This is the promise the book makes about what happens when you run it again.

### 6.1 The machine everything was measured on

| Item | Value |
|---|---|
| Graphics card | NVIDIA RTX 3500 Ada Generation Laptop GPU |
| Graphics memory | 12.88 GB |
| Enforced board power limit | 55 W |
| Idle board power | 13.8 W, the median of 246 samples over 5 seconds |
| Processor | Intel i9-13950HX, 24 cores, 32 threads |
| System memory | 68 GB |
| CUDA | 13.2 |
| Python | 3.12.10 |
| PyTorch | 2.6.0+cu124 |
| Transformers | 5.17.0 |
| Ollama | 0.24.0 |
| Bootstrap seed | 20260912 |

### 6.2 What will come back the same

**Almost everything, because almost nothing in this book is random.**

Text generation in this course is **greedy**, which means the model always emits its single
highest-scoring next token. There is no dice roll. Scoring on the question bank is
**log-probability based**, which means the model is never asked to write an answer at all. It is
asked how likely it considers each option, and the highest one wins. Again, no dice roll.

Question order is fixed. Option rotations are fixed. Prompts are fixed strings written into the
scripts. So a rerun on the same machine with the same software gives the same logits, the same
probabilities, the same accuracies, the same intervals.

### 6.3 The one place randomness enters, and how it is pinned down

The bootstrap in Chapter 12 is random by design. It resamples the twenty questions with
replacement 10,000 times, and "resample" means drawing at random. Run it twice with different
random numbers and you get slightly different endpoints.

So it is **seeded with 20260912**. A seed is a starting number for the random number generator.
Give it the same seed and it produces the same sequence of "random" numbers every time. The line
in `lab/we6_eval_bootstrap.py` is:

```python
rng = np.random.default_rng(20260912)
```

With that seed, the bootstrap returns a mean of 24.8%, a standard deviation of 9.74 percentage
points, and a 95% interval from 5.0% to 45.0%, every time. Those are the numbers in
`lab/out/we6_eval.json`.

Change the seed and those endpoints move a little. The interval is still about the same width,
because the width is a fact about having twenty questions, not a fact about the seed.

### 6.4 What will not come back the same, and we say so

**Floating-point arithmetic on a GPU is not fully deterministic.** A graphics card does thousands
of additions at the same time across thousands of small processors, and the order in which their
results are added together is not guaranteed to be identical from run to run. Addition on a
computer is not perfectly associative: adding the same three numbers in a different order can
change the last digit or two of the answer, because each intermediate result gets rounded to fit
in its 16 or 32 bits.

What this means in practice:

- A logit recorded as $17.217288970947266$ might come back as $17.217289$ with different digits
  after the sixth decimal place.
- A probability recorded as $0.3021884262561798$ might differ in its last few digits.
- A different graphics card, a different CUDA version or a different PyTorch version can shift
  those last digits further.

What it does **not** mean:

- The ranking of tokens does not flip. `' Paris'` stays first.
- An accuracy of 5 out of 20 does not become 6 out of 20. Those are counts of whole questions,
  and a change in the twelfth decimal place of a probability does not move a count.
- The conclusions in this book do not depend on any digit that GPU non-determinism can reach.

The honest statement, which appears wherever it matters: **numbers in this book are printed to
the precision the file recorded, and a rerun can differ in the last digits.** The book prints
them that way rather than rounding them into looking cleaner than they are. Rounding a result
until it looks tidier than the measurement would be the same offence as inventing it.

### 6.5 What one run is, and is not

The energy figures in this book come from **one greedy run per model, on one prompt, on one
laptop.** That is a measurement. It is not a benchmark.

The meter reads board power for the graphics card only. It does not see the processor, the system
memory, losses in the power supply, the display, or the cooling. In a data centre there would be
further overhead on top of all of that. So every energy number in this book is a **lower bound on
the energy of local inference**, not a total cost of ownership, and that sentence travels with
the numbers wherever they go. The full account is in
[the cost model appendix](cost-model.md).

---

## 7. What is not on this shelf

Honesty about what is missing is part of the same policy as honesty about what is here.

| Gap | Status |
|---|---|
| Licence text for `Qwen/Qwen2.5-3B-Instruct` | `[VERIFY: licence terms for classroom redistribution]`. The identifier `qwen-research` is confirmed from the model card. The terms have not been read. |
| Ollama 7B probabilities | Recorded in lab findings §1 but never written to a JSON file. A script belongs in `lab/`. |
| Ollama 7B on the question bank | `[to be measured]`. The size ladder stops at 3B. |
| Quantized models measured end to end | `[to be measured]`. The course measures error in the weights, not the quality of what a quantized model writes. That needs `llama-cpp-python`, which is not installed. |
| A question bank of 1,000 items | Does not exist. Chapter 15 asks you to start building one. |
| Energy for the embedding models | `[to be measured]`. Only the three Qwen models were metered. |
| `book/data/` | Does not exist yet. Paths in this book point at `lab/out/`. |

If you find a number anywhere in this book that you cannot trace to a file on this page, that is
a bug. Tell your instructor.
