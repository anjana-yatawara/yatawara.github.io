---
title: "The Python Reference"
short_title: Python Reference
subtitle: "MATH 3219: everything this course asks you to type, for someone who has never programmed"
description: "A from-zero reference for every piece of Python in Inside the Machine, organised by
  what you are trying to do rather than by language feature. Installing the tools, loading a
  model, tokenizing text, reading logits, softmax, temperature, top k, sentence embeddings,
  normalising a vector, a cosine similarity matrix, scoring a multiple-choice question by
  log-probability, the bootstrap, and charts in the Okabe-Ito palette. Every snippet was run on
  the course machine and its printed output is the real output."
---

## Read this first: you do not need a graphics card

Every lab in this course runs on an ordinary laptop with no special hardware. A graphics card
makes the labs faster. It does not make them possible, and nothing in this course is graded on
speed.

Here is the evidence. The output block below was produced by the code in
[section 4 of this page](#pyref-load), on the course machine, with the model running on the
**central processing unit** (the ordinary chip in every computer, usually shortened to **CPU**)
and the graphics card sitting idle:

```text
The capital of France is Paris. It was founded in 789 AD by
seconds taken: 1.54
```

That is twelve pieces of output in 1.54 seconds, with no graphics card involved. The course
calls those pieces **tokens**, and [section 5](#pyref-tokenize) explains what they are. This is
the floor.

If your laptop is slower than the course machine, a lab that takes 1.5 seconds here might take
10 seconds on yours. Ten seconds is fine.

:::{important} The course's own thesis says so
This course argues that a model small enough to be cheap to run is a model cheap enough to be
available to everybody. A course making that argument cannot then require you to buy a graphics
card. **Nobody in MATH 3219 is required to buy hardware.** If your machine cannot run something,
tell your instructor, and you will be given the measured output to work from.
:::

One honest note about that output, because this book does not tidy its results. Paris was not
founded in 789 AD; the settlement is roughly a thousand years older than that. The model said it
anyway, confidently, in its second sentence. That is a 494,032,768-parameter model behaving
exactly as a 494,032,768-parameter model behaves, and you will meet a great deal more of it from
[Chapter 11](../ch/ch11.md) onward.

---

(pyref-what)=
## What this page is, and how to find things on it

This page is organised by **what you want to do**, not by what part of the Python language it
uses. If you want to turn a list of scores into percentages, you look up "turning logits into
probabilities". You do not need to know first that the answer involves a function call and a
keyword argument.

Every code block on this page was run on the course machine, in the order it appears, before
this page was written. The output printed under each block is the output that block actually
produced. The script that ran them all is `lab/appendix_python_reference_checks.py`, and it
wrote its results to `lab/out/appendix_python_reference_checks.json`, which you can open.

### The index

| # | You want to | Section | Anchor |
|---|---|---|---|
| 1 | know what the words mean | [The words this page uses](#pyref-words) | `pyref-words` |
| 2 | install the tools | [Installing the tools](#pyref-install) | `pyref-install` |
| 3 | start a session | [The first cell, every time](#pyref-imports) | `pyref-imports` |
| 4 | load a model | [Loading a model](#pyref-load) | `pyref-load` |
| 5 | turn text into numbers | [Tokenizing text and reading the ids back](#pyref-tokenize) | `pyref-tokenize` |
| 6 | see the model's raw scores | [Getting the logits for the next token](#pyref-logits) | `pyref-logits` |
| 7 | turn scores into percentages | [Turning logits into probabilities](#pyref-softmax) | `pyref-softmax` |
| 8 | sharpen or flatten those percentages | [Applying a temperature](#pyref-temperature) | `pyref-temperature` |
| 9 | list the best few candidates | [Taking the top k](#pyref-topk) | `pyref-topk` |
| 10 | turn a sentence into a vector | [Embedding sentences](#pyref-embed) | `pyref-embed` |
| 11 | make a vector have length 1 | [Normalising a vector](#pyref-normalise) | `pyref-normalise` |
| 12 | compare many sentences at once | [Computing a cosine similarity matrix](#pyref-cosine) | `pyref-cosine` |
| 13 | make a model take a test | [Scoring a multiple-choice question](#pyref-mcq) | `pyref-mcq` |
| 14 | put error bars on a score | [Resampling for a bootstrap](#pyref-bootstrap) | `pyref-bootstrap` |
| 15 | draw a chart | [Bar chart, histogram, heatmap](#pyref-charts) | `pyref-charts` |
| 16 | understand an error message | [The first five error messages](#pyref-errors) | `pyref-errors` |
| 17 | revise from one table | [Everything on one page](#pyref-summary) | `pyref-summary` |

:::{tip} For chapter authors
Link to a section like this, in Markdown:

```
see [the Python reference on softmax](../appendix/python-reference.md#pyref-softmax)
```

The anchor names in the table above are fixed and will not change.
:::

### How each section is built

Every section on this page has the same four parts, in the same order:

1. **What you are trying to do**, in plain English, with no code and no symbols.
2. **The mathematics**, where the section has any, laid out in the six parts this book always
   uses. If you have not met the [formula protocol](math-toolkit.md#toolkit-formula-protocol)
   yet, it gives you a plain sentence, the formula, a table defining every symbol, the formula
   read aloud as English, a worked arithmetic example with every step, and a sanity check.
3. **The code**, with a comment on every line that does something new.
4. **The output**, exactly as it was printed, with the interesting parts explained.

---

(pyref-words)=
## 1. The words this page uses

These words appear throughout this page. Every one of them is defined here, before it is used.
If you have programmed before, skim this table. If you have not, read it once, and come back
whenever a word stops making sense.

| Word | What it means |
|---|---|
| **program** | A list of written instructions for a computer, carried out in order, from the top of the file to the bottom. |
| **Python** | The language those instructions are written in. This course uses Python and no other language. |
| **script** | One file full of Python instructions, with a name ending in `.py`. |
| **notebook** | A document that mixes writing and Python, split into boxes called cells. You run one cell at a time. Files end in `.ipynb`. |
| **cell** | One box in a notebook holding a few lines of Python. You press Shift and Enter together to run it. |
| **run** | To make the computer carry out the instructions you wrote. |
| **output** | Whatever the computer printed back at you after running something. |
| **variable** | A name you give to a value, so you can use the value later. `model_name` is a variable. |
| **assignment** | Giving a variable its value, written with a single equals sign. `parameter_count = 0` means "from now on, `parameter_count` holds 0". |
| **value** | The thing a variable holds: a number, a piece of text, a list, or a whole model. |
| **string** | A piece of text, written inside quotation marks. `"Bakersfield"` is a string. |
| **integer** | A whole number, with no decimal point. `20` is an integer. |
| **float** | A number with a decimal point. `0.25` is a float. The name is short for *floating-point number*, which [Chapter 6](../ch/ch06.md) takes apart. |
| **list** | Several values in order, written inside square brackets and separated by commas. `[33, 8312, 2566]` is a list of three integers. |
| **index** | The position of one item in a list. **Python counts from 0**, so in the list `[33, 8312, 2566]` the item at index 0 is 33 and the item at index 2 is 2566. |
| **function** | A named instruction that does a job for you. You use it by writing its name followed by round brackets. |
| **argument** | A value you hand to a function, inside its round brackets. In `round(0.302188, 3)` the arguments are `0.302188` and `3`. |
| **keyword argument** | An argument given by name, written `name=value`. In `tokenizer(sentence, return_tensors="pt")` the keyword argument is `return_tensors="pt"`. |
| **method** | A function that belongs to a particular thing, written after a dot. In `bootstrap_accuracies.mean()` the method is `.mean()`. |
| **attribute** | A value that belongs to a particular thing, also written after a dot, but with no round brackets. In `sentence_vectors.shape` the attribute is `.shape`. |
| **library** | A large collection of ready-made functions somebody else wrote and published. `torch` is a library. |
| **import** | The instruction that makes a library available in your program. |
| **loop** | An instruction that repeats. A `for` loop repeats once for each item in a list. |
| **indentation** | The blank space at the start of a line. In Python it is not decoration. The indented lines under a `for` loop are the lines that repeat. Get the indentation wrong and the program does the wrong thing. |
| **comment** | A note to a human, starting with `#`. Python ignores everything after the `#` on that line. |
| **array** | A list of numbers that `numpy` can do fast arithmetic on. It looks like a list and behaves like a row of numbers. |
| **tensor** | The same idea in `torch`. A tensor is a grid of numbers with any number of sides: one side makes a row, two sides make a rectangle, three sides make a stack of rectangles. |
| **shape** | How big a tensor or array is along each side. A shape of `(6, 384)` means 6 rows and 384 columns. |
| **error** | What the computer prints when it cannot carry out an instruction. It stops there and tells you why. |
| **traceback** | The block of text printed with an error, listing the lines that led to it. **The useful part is the last line.** |

:::{note} Python counts from zero
This one catches everybody once. The first item of a list is at index 0, not index 1. So
`sentence_list[0]` is the first sentence and `sentence_list[5]` is the sixth. Written out, the
six sentences on this page sit at indexes 0, 1, 2, 3, 4 and 5.

A negative index counts backwards from the end. `[-1]` means the last item, `[-2]` the second
from last. You will see `[0, -1]` in [section 6](#pyref-logits), which means "the first row, and
the last position in that row".
:::

---

(pyref-install)=
## 2. Installing the tools

### What you are trying to do

You are putting four things on your computer: the Python language itself, a private folder for
this course's libraries, the libraries, and a folder where downloaded models will live. Then you
are running a five-line check to prove all four worked.

Set aside an hour. Most of that hour is downloading, and you can do something else while it runs.

### What gets installed, and how big it is

These sizes were measured on the course machine after everything was installed, by
`lab/appendix_python_reference_checks.py`, which walks the folders and adds up the file sizes.

| Thing | Bytes on disk | In gigabytes | What it is for |
|---|---|---|---|
| The libraries (in a folder called `.venv`) | 5,399,147,057 | 5.40 GB | Python's side of everything you will run |
| `Qwen2.5-0.5B-Instruct` | 999,587,685 | 1.00 GB | the small model used in almost every chapter |
| `all-MiniLM-L6-v2` | 91,578,455 | 0.09 GB | the sentence embedding model, Chapters 8 to 10 |
| `Qwen2.5-1.5B-Instruct` | 3,098,957,008 | 3.10 GB | optional, used in the size comparisons |
| `Qwen2.5-3B-Instruct` | 6,183,452,899 | 6.18 GB | optional, used in the size comparisons |

The first three rows are the required minimum, and they come to **6.49 GB**. Adding the two
optional models takes it to **15.77 GB**.

:::{note} Why these are slightly larger than the sizes the chapters quote
The chapters quote the size of the **weights**: 0.99 GB for the 0.5B, 3.09 GB for the 1.5B and
6.17 GB for the 3B, each one the parameter count times two bytes at FP16. The table above
measures the whole **folder** on disk, which also holds the tokenizer, the configuration files
and the download bookkeeping. That is why the 1.5B reads 3.10 GB here and 3.09 GB in
[Chapter 7](../ch/ch07.md). Both numbers are correct; they are answers to two different
questions. When you are asking whether a model fits in graphics memory, the weight figure is
the one you want. When you are asking whether it fits on your hard drive, this one is.
:::

A **gigabyte**, written GB, is 1,000,000,000 bytes. A **byte** is the amount of storage one
letter of ordinary text takes. Computer storage is also sometimes quoted in **gibibytes**, GiB,
which are 1,073,741,824 bytes each, and the two units get confused constantly;
[error 1](#pyref-errors) meets the difference again.

The 5.40 GB for the libraries is large because the course machine installed the version of
`torch` built for NVIDIA graphics cards. The plain version, which is the one most students will
install, is a good deal smaller.

### Step 1: install Python

Go to `python.org`, choose Downloads, and install **Python 3.12**. The course machine runs
Python 3.12.10.

On Windows, tick the box that says **Add python.exe to PATH** during the install. If you miss it,
the commands below will not be found and you will have to run the installer again.

### Step 2: make a folder and a virtual environment

A **virtual environment** is a private folder holding this course's libraries. It exists so that
installing something for MATH 3219 cannot break some other program on your computer. It is a box
with a lid.

On **Windows**, open PowerShell and type these four lines, one at a time, pressing Enter after
each:

```text
mkdir C:\math3219
cd C:\math3219
py -3.12 -m venv .venv
.venv\Scripts\Activate.ps1
```

On **macOS or Linux**, open Terminal and type these four instead:

```text
mkdir ~/math3219
cd ~/math3219
python3.12 -m venv .venv
source .venv/bin/activate
```

You will know it worked when your command line grows a `(.venv)` at the front. That prefix is how
you tell the box is open. It disappears when you close the window, so you run the last line
again at the start of every session.

:::{caution} On Windows, the activation line can be blocked
If `.venv\Scripts\Activate.ps1` prints a message about **execution policy**, Windows is refusing
to run the script. Run this once, answer `Y`, and then try activating again:

```text
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

This changes a setting for your own account only. It does not affect anybody else's.
:::

### Step 3: install the libraries

With `(.venv)` showing, type these three lines. The second and third will take a while and will
print a long scroll of names as they download.

```text
python -m pip install --upgrade pip
python -m pip install torch
python -m pip install transformers numpy matplotlib sentence-transformers
```

`pip` is Python's installer. `python -m pip` means "run pip through this virtual environment",
which matters, because plain `pip` can install into the wrong place.

These are the versions on the course machine, recorded in
`lab/out/appendix_python_reference_checks.json`:

| Library | Version here | What it does |
|---|---|---|
| Python | 3.12.10 | the language |
| `torch` | 2.6.0+cu124 | arithmetic on grids of numbers; the models are built on it |
| `transformers` | 5.17.0 | loads language models and their tokenizers |
| `numpy` | 2.5.3 | fast arithmetic on rows of numbers |
| `matplotlib` | 3.11.2 | every chart in this book |
| `sentence-transformers` | 6.0.1 | turns a sentence into a single vector |

The `+cu124` on the end of the `torch` version means that build talks to an NVIDIA graphics card.
Yours will probably not have it, and everything on this page will still run.

:::{tip} You want a slightly different version? That is fine.
Newer versions of these libraries will usually run this page's code unchanged. If one does not,
the error message will name the line, and your instructor would like to know, because it means
this page needs updating.
:::

### Step 4: choose where models are kept, with `HF_HOME`

Models are downloaded once and then kept. The folder they are kept in is set by an
**environment variable**, which is a setting your computer hands to every program it starts. The
one that matters here is called `HF_HOME`.

If you never set it, the models go into a hidden folder in your home directory. That works, until
the day you cannot find them, or your home drive fills up, or you want them on an external disk.
Set it once and you always know where they are.

There are two ways to set it, and the choice matters.

**Way one, in the terminal, before you start Python.** On Windows PowerShell:

```text
$env:HF_HOME = "C:\math3219\models"
```

On macOS or Linux:

```text
export HF_HOME="$HOME/math3219/models"
```

**Way two, inside Python, as the very first thing you do.** This is the way used throughout this
page, because it travels with the notebook:

```python
import os                                    # lets Python read and change settings on your computer
os.environ["HF_HOME"] = r"C:\math3219\models"   # where downloaded models are kept
```

:::{warning} The order of those two lines is not negotiable
`HF_HOME` is read **once**, at the moment the model library is imported. If you write
`from transformers import AutoTokenizer` first and set `HF_HOME` afterwards, the setting arrives
too late and is ignored. Nothing warns you. The models quietly download to the wrong place.

**Set `HF_HOME` before any line that mentions `transformers` or `sentence_transformers`.** That
is the whole rule, and it is why the import cell in the next section has those two lines at the
very top, above the other imports.
:::

The `r` in front of the Windows path, as in `r"C:\math3219\models"`, marks it as a **raw string**.
Without the `r`, Python treats a backslash as the start of a special code. The letter `r` turns
that off, so the backslashes stay backslashes. On macOS and Linux the paths use forward slashes
and the `r` is not needed.

### Step 5: prove it all worked

Make a file called `check.py` in your course folder, with exactly this in it, and run it with
`python check.py`. Set your own path on the second line.

```python
import os                                    # lets Python read and change settings on your computer
os.environ["HF_HOME"] = r"C:\math3219\models"   # must come before the transformers import

import torch                                 # the arithmetic library the models are built on
from transformers import AutoTokenizer       # turns text into token ids

print("torch version:", torch.__version__)
print("graphics card available:", torch.cuda.is_available())

tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen2.5-0.5B-Instruct")
print("Bakersfield becomes:", tokenizer("Bakersfield").input_ids)
```

On the course machine this printed:

```text
torch version: 2.6.0+cu124
graphics card available: True
Bakersfield becomes: [33, 8312, 2566]
```

On a laptop with no graphics card, the second line will say `False` and the third line will be
identical. **The third line is the one that matters.** If you see three token ids for
Bakersfield, your install is complete and every lab in this course will run.

The first time you run this it will pause while it downloads the tokenizer. After that it is
instant, because the file is now in your `HF_HOME` folder.

---

(pyref-imports)=
## 3. The first cell, every time

### What you are trying to do

You are telling Python which libraries you are going to use, before you use any of them. This
happens once, at the top, and then not again.

This course follows a house rule about imports, borrowed from UC Berkeley's Data Science Modules
and their **`Small_Models_SP26`** curriculum: **every import goes in the first cell, one per
line, each with a comment saying what it is for.** No import ever appears further down a file.
The point is that you can read one cell and know everything the program depends on.

### The code

```python
# Cell 1. Run this once at the top of every session, before anything else.

import os                                        # lets Python read and change settings on your computer
os.environ["HF_HOME"] = r"C:\math3219\models"    # where models are kept; MUST come before the two transformers lines

import json                                      # reads and writes .json files, which is how the labs save numbers
import math                                      # square roots, logarithms, and the number e
import time                                      # measures how long something took, in seconds
import torch                                     # the arithmetic library the language models are built on
import numpy                                     # fast arithmetic over long lists of numbers
import matplotlib.pyplot as pyplot               # draws every chart in this book
from transformers import AutoTokenizer           # turns text into token ids, and ids back into text
from transformers import AutoModelForCausalLM    # loads a model that predicts the next token
from sentence_transformers import SentenceTransformer   # turns a whole sentence into one list of numbers
```

Two shapes of import appear there, and they mean different things.

`import torch` brings in the whole library under its own name, so afterwards you write
`torch.softmax(...)`. `from transformers import AutoTokenizer` reaches into a library and pulls
out one named piece, so afterwards you write `AutoTokenizer.from_pretrained(...)` with no
`transformers.` in front.

`import matplotlib.pyplot as pyplot` does the first thing and renames it. The part of matplotlib
that draws charts is buried at `matplotlib.pyplot`, and typing that in full every time is
tedious, so `as pyplot` gives it a shorter name. You will see other people write `as plt`. This
book uses `pyplot` because this book does not use short names.

### Checking the versions

Put this in a second cell, with a sentence of your own between the two, and run it.

```python
print("torch version:", torch.__version__)
print("graphics card available:", torch.cuda.is_available())
```

On the course machine:

```text
torch version: 2.6.0+cu124
graphics card available: True
```

`torch.cuda.is_available()` asks whether an NVIDIA graphics card is present and usable. `True`
means yes. `False` means no, and everything still works, more slowly. Nothing else on this page
changes based on that answer.

:::{note} If you are writing a script rather than a notebook
A `.py` script that draws charts should add two lines above the `pyplot` import:

```python
import matplotlib                             # the charting library
matplotlib.use("Agg")                         # draw to a file instead of opening a window
import matplotlib.pyplot as pyplot            # draws every chart in this book
```

`"Agg"` tells matplotlib to write pictures to files and never try to open a window. In a notebook
you do not need it. In a script run from a terminal, without it the program can hang waiting for
a window you cannot see.
:::

---

(pyref-load)=
## 4. Loading a model

### What you are trying to do

You are bringing a language model onto your computer and into your program, so you can ask it
questions. Two separate things arrive: a **tokenizer**, which converts between text and numbers,
and the **model** itself, which is a very large pile of numbers that takes numbers in and gives
scores out. They come as a pair and they must match.

### The code

```python
model_name = "Qwen/Qwen2.5-0.5B-Instruct"
tokenizer = AutoTokenizer.from_pretrained(model_name)
language_model = AutoModelForCausalLM.from_pretrained(model_name, dtype=torch.float32)
language_model.eval()
```

Line by line.

`model_name` is a string holding the model's address. The part before the slash,
`Qwen`, is the organisation that published it. The part after, `Qwen2.5-0.5B-Instruct`, is the
model. The `0.5B` means about half a billion numbers inside. The `Instruct` means it was trained
to follow instructions rather than only continue text.

`from_pretrained` is the function that fetches the model. The word *pretrained* means somebody
else already did the training, which took a very large amount of electricity, and you are
collecting the finished result. The first time you run this it downloads 999,587,685 bytes, which
is 1.00 GB.
Every time after that it reads from your `HF_HOME` folder in a second or two.

`dtype=torch.float32` says to keep every number in the model at **32-bit precision**, which is
four bytes per number. This is the setting the course uses, because it is exact enough that your
numbers will match the book's numbers. [Chapter 6](../ch/ch06.md) is about what that choice
costs and what the alternatives are.

`language_model.eval()` switches the model into evaluation mode. Some parts of a model behave
differently while it is being trained. You are not training it, so you tell it so. Leaving this
line out can give you slightly different numbers, for no benefit.

### Counting what you loaded

Put a sentence between the cells and then count the numbers inside the model. The loop below
walks through the model's parts, asks each one how many numbers it holds, and adds them up.

```python
parameter_count = 0
for one_parameter_block in language_model.parameters():
    parameter_count = parameter_count + one_parameter_block.numel()

print("model name      :", model_name)
print("parameters      :", parameter_count)
print("vocabulary size :", language_model.config.vocab_size)
```

Output:

```text
model name      : Qwen/Qwen2.5-0.5B-Instruct
parameters      : 494032768
vocabulary size : 151936
```

Read that loop slowly, because this page uses the same shape a dozen more times.

`parameter_count = 0` sets up an empty running total. `for one_parameter_block in
language_model.parameters():` says "go through the model's parts one at a time, and each time
round, call the current part `one_parameter_block`". The indented line underneath is what
repeats: `.numel()` means *number of elements*, and `parameter_count = parameter_count +
one_parameter_block.numel()` adds that count onto the running total. When the list runs out, the
loop stops and the total is finished.

**494,032,768** is the number of learned numbers in this model. **151,936** is the size of its
vocabulary, which is how many distinct token ids it can choose between. Both figures appear
throughout the book and both agree with `lab/out/we3_params_quant.json` and
`lab/out/we2_softmax.json`.

### Making it say something

This is the check that the model itself, and not only the tokenizer, is working.

```python
generation_prompt_ids = tokenizer("The capital of France is", return_tensors="pt").input_ids
generation_started_at = time.time()
with torch.no_grad():
    generated_ids = language_model.generate(generation_prompt_ids, max_new_tokens=12, do_sample=False)
generation_seconds = time.time() - generation_started_at

print(tokenizer.decode(generated_ids[0]))
print("seconds taken:", round(generation_seconds, 2))
```

Output, on the CPU, with no graphics card in use:

```text
The capital of France is Paris. It was founded in 789 AD by
seconds taken: 1.54
```

The first line should come out word for word the same on your machine, because `do_sample=False`
takes the model's single best guess every time. The second line will not. It is a stopwatch
reading on one processor, and yours will print a different number.

Three pieces of that deserve naming.

`with torch.no_grad():` and the indented block under it tell `torch` not to keep the extra
bookkeeping it would need in order to train the model. You are not training it. This makes the
run faster and use less memory, and it changes no answer. **Every time this course asks a model
a question, it goes inside a `with torch.no_grad():` block.**

`max_new_tokens=12` stops it after twelve tokens. Without a limit it keeps going.

`do_sample=False` makes the model take its single most likely token every time, with no
randomness. This is called **greedy decoding**. It is why you will get this exact sentence and
not a different one. [Chapter 5](../ch/ch05.md) is about the alternative.

And the content is wrong. Paris is far older than 789 AD. This book prints that anyway, because
the book's rule is that a claim about what a model produced has to be what the model produced.

---

(pyref-tokenize)=
## 5. Tokenizing text and reading the ids back

### What you are trying to do

A language model cannot read letters. It works only with whole numbers. **Tokenizing** is cutting
a piece of text into chunks and looking each chunk up in a fixed table to get its row number.
Those row numbers are all the model ever sees.

A **token** is one chunk. A **token id** is its row number in the table. The table is the
**vocabulary**, and for this model it has 151,936 rows.

### The code

```python
sentence = "Bakersfield"
token_ids = tokenizer(sentence).input_ids
print(token_ids)
```

Output:

```text
[33, 8312, 2566]
```

Bakersfield is one word to you. It is three tokens to this model. `tokenizer(sentence)` hands
back a small bundle of results, and `.input_ids` is the piece of that bundle holding the numbers.

### Reading the ids back

Numbers on their own do not teach you much. Turn each one back into the text it stands for.

```python
token_pieces = []
for one_id in token_ids:
    token_pieces.append(tokenizer.decode([one_id]))

print(token_pieces)
print(tokenizer.decode(token_ids))
```

Output:

```text
['B', 'akers', 'field']
Bakersfield
```

`token_pieces = []` makes an empty list. `.append(...)` adds one item to the end of a list. So
the loop starts with nothing, and adds one decoded piece each time round, in order.

Notice the square brackets inside `tokenizer.decode([one_id])`. `decode` expects a **list** of
ids, not a single id. Wrapping one id in square brackets makes a list of length one. Leave the
brackets out and you get an error.

The last line decodes all three ids together and gets `Bakersfield` back, spelled correctly. The
pieces are not words, but they glue back into the word exactly.

### Every digit is its own token

Run the same two steps on a number.

```python
number_ids = tokenizer("1234567").input_ids
number_pieces = []
for one_id in number_ids:
    number_pieces.append(tokenizer.decode([one_id]))

print(number_ids)
print(number_pieces)
```

Output:

```text
[16, 17, 18, 19, 20, 21, 22]
['1', '2', '3', '4', '5', '6', '7']
```

Seven digits, seven separate tokens. The model never sees "one million two hundred and thirty-four
thousand five hundred and sixty-seven". It sees seven unrelated symbols in a row. This is the
honest, mechanical reason these models are unreliable at arithmetic, and
[Chapter 2](../ch/ch02.md) builds on it. Both results agree with the tokenization table in
`_research/00-lab-verified-findings.md`.

### Two vocabulary counts that disagree, and why

```python
print("rows the tokenizer knows :", len(tokenizer))
print("rows the model reserves  :", language_model.config.vocab_size)
```

Output:

```text
rows the tokenizer knows : 151665
rows the model reserves  : 151936
```

Those two numbers are different and that is correct. The tokenizer holds 151,665 real entries.
The model's lookup table has 151,936 rows, so 271 rows sit empty. Models are often given a
vocabulary table rounded up to a convenient size, because certain sizes are faster for the
hardware to work with. The spare rows are never used.

You will see 151,936 quoted throughout this book, because that is the length of the score list
the model produces, which is the number that matters for [Chapter 4](../ch/ch04.md).

---

(pyref-logits)=
## 6. Getting the logits for the next token

### What you are trying to do

You are asking the model, for one specific piece of text, how much it likes each of the 151,936
possible next tokens. The answer is a list of 151,936 numbers. Each number is a raw score. A
bigger score means the model likes that token more.

Those raw scores have a name.

:::{important} Definition: logit
A **logit** is one raw score the model gives to one token, before anything is done to turn it
into a probability. Logits can be negative. They do not add up to anything in particular. You
say it "LOW-jit".
:::

### The code

```python
prompt = "The capital of France is"
prompt_ids = tokenizer(prompt, return_tensors="pt").input_ids
print(prompt_ids)

with torch.no_grad():
    model_output = language_model(prompt_ids)

next_token_logits = model_output.logits[0, -1]
print("shape of the whole output:", model_output.logits.shape)
print("scores in the last row   :", next_token_logits.shape[0])
print("smallest score           :", round(float(next_token_logits.min()), 3))
print("largest score            :", round(float(next_token_logits.max()), 3))
```

Output:

```text
tensor([[ 785, 6722,  315, 9625,  374]])
shape of the whole output: torch.Size([1, 5, 151936])
scores in the last row   : 151936
smallest score           : -14.495
largest score            : 17.217
```

### What each part is doing

`return_tensors="pt"` is new. In [section 5](#pyref-tokenize) the tokenizer gave back a plain
Python list. A model will not accept a plain list. `return_tensors="pt"` asks for a **tensor**
instead, which is the kind of object `torch` works with. The `pt` stands for PyTorch, which is
the full name of the `torch` library. Forget this keyword argument and you get an error, and that
error is [number 3 in the error section](#pyref-errors).

`print(prompt_ids)` shows `tensor([[ 785, 6722,  315, 9625,  374]])`. Five ids for five tokens,
and those five ids match `lab/out/we2_softmax.json` exactly. The double square brackets are there
because the tensor has two sides: the outer one is a list of prompts, of which you gave one.

`language_model(prompt_ids)` runs the model. `model_output.logits` is the scores it produced, and
its shape is `torch.Size([1, 5, 151936])`. Read that as **1 prompt, 5 positions, 151,936 scores
at each position.** The model does not only score what comes after the whole prompt. It scores
what comes after each position on the way, all at once.

`[0, -1]` picks one row out of that. The `0` means the first prompt, because you only gave one.
The `-1` means the last position, counting backwards from the end. So `next_token_logits` holds
the 151,936 scores for what comes after "is", which is the question you asked.

`.min()` and `.max()` are methods that find the smallest and largest numbers. `float(...)` turns
a one-number tensor into an ordinary Python number so it prints cleanly. `round(..., 3)` cuts it
to three decimal places.

The scores run from **-14.495 to 17.217**. Negative scores are ordinary. Nothing about this list
looks like a probability yet, and that is the point of the next section.

---

(pyref-softmax)=
## 7. Turning logits into probabilities

### What you are trying to do

You have 151,936 raw scores. You want 151,936 percentages that add up to 100 percent, keep the
same ranking as the scores, and are never negative. The procedure that does this is called
**softmax**.

### The mathematics

**1. In words.** Softmax takes a list of scores, where a bigger score means the model likes that
token more, and turns them into percentages that add up to 100 percent.

**2. The formula.**

$$
p_i = \frac{e^{z_i}}{e^{z_1} + e^{z_2} + \dots + e^{z_V}}
$$

**3. The symbols.**

| Symbol | How to say it out loud | What it means |
|---|---|---|
| $z$ | "zee" | a score the model gave to a token. A **logit**. Can be negative. |
| $i$ | "eye" | a counter standing for "which token". $i = 1$ is the first token in the vocabulary, $i = 2$ the second. |
| $z_i$ | "z sub i" | the score for token number $i$. See [subscripts](math-toolkit.md#toolkit-subscripts). |
| $e$ | "e" | a fixed number, $2.718282\ldots$, in the same way that $\pi$ is a fixed number. See [the number e](math-toolkit.md#toolkit-e). |
| $e^{z_i}$ | "e to the z sub i" | $e$ raised to the power $z_i$. Your calculator has this as the `exp` key. |
| $V$ | "vee" | how many tokens are in the vocabulary. Here, $V = 151{,}936$. |
| $p_i$ | "p sub i" | the probability of token $i$, a number between 0 and 1. |
| the fraction bar | "divided by" | divide whatever is on top by whatever is underneath. |
| $+$ | "plus" | add. |
| $\dots$ | "and so on" | the pattern continues; every remaining term is written the same way. |
| $=$ | "equals" | the left side and the right side are the same number. |

**4. Out loud.** "The probability of a token is e raised to that token's score, divided by the
sum of e raised to every token's score."

**5. Worked, with three made-up scores: 2, 1 and 0.** These three numbers are invented so you can
check the arithmetic on a phone. They are not measurements.

Step 1, raise $e$ to each score.

$e^{2} = 7.389056$

$e^{1} = 2.718282$

$e^{0} = 1.000000$

Step 2, add those three results together.

$7.389056 + 2.718282 + 1.000000 = 11.107338$

Step 3, divide each result by that total.

$p_1 = 7.389056 \div 11.107338 = 0.665241$

$p_2 = 2.718282 \div 11.107338 = 0.244728$

$p_3 = 1.000000 \div 11.107338 = 0.090031$

**6. Check it.** $0.665241 + 0.244728 + 0.090031 = 1.000000$. They add to 1, so the arithmetic is
right. If yours does not add to 1, you divided by the wrong total. If any of yours came out
negative, you subtracted somewhere you should have divided, because $e$ raised to any power at
all is positive.

### The code

```python
next_token_probabilities = torch.softmax(next_token_logits, dim=-1)
print("how many probabilities:", next_token_probabilities.shape[0])
print("they add up to        :", round(float(next_token_probabilities.sum()), 6))
print("smallest one          :", float(next_token_probabilities.min()))
```

Output:

```text
how many probabilities: 151936
they add up to        : 1.000062
smallest one          : 5.1051670994729705e-15
```

`torch.softmax` carries out all three steps of the arithmetic above, across all 151,936 scores at
once. `dim=-1` says which side of the tensor to work along, and `-1` means the last one. Since
`next_token_logits` has only one side, `-1` means that side. Writing `dim=-1` is a habit worth
keeping, because it stays correct when the tensor gains more sides.

Two things in the output are worth stopping on.

**They add up to 1.000062, not exactly 1.** That is not a mistake in the formula. It is what
happens when 151,936 numbers, each stored to about seven digits of accuracy, are added together:
the tiny rounding errors accumulate. The total is 1 to within six parts in a hundred thousand.
[Chapter 6](../ch/ch06.md) is about exactly this. If your total came out as 1.4, that would be an
error. 1.000062 is arithmetic working normally.

**The smallest probability is 5.1051670994729705e-15.** That notation means $5.105 \times
10^{-15}$, which is 0.000000000000005105. See
[scientific notation](math-toolkit.md#toolkit-scientific-notation). The model considers that
token essentially impossible here, but it does not say zero. Softmax never produces a zero,
because $e$ raised to any power is greater than zero.

### Asking about one specific token

```python
paris_id = tokenizer(" Paris", add_special_tokens=False).input_ids[0]
paris_probability = float(next_token_probabilities[paris_id])
print("token id for ' Paris':", paris_id)
print("probability          :", round(paris_probability * 100, 3), "percent")
```

Output:

```text
token id for ' Paris': 12095
probability          : 30.219 percent
```

The space in `" Paris"` is deliberate and it matters. In this model's vocabulary, `' Paris'` with
a leading space and `'Paris'` without one are two different tokens with different ids. The text
so far ends in "is", so the token that comes next has to carry its own space.

`add_special_tokens=False` stops the tokenizer from adding any extra markers around your text.
You want the id for that one piece and nothing else. `.input_ids[0]` then takes the first item
out of the list, since `' Paris'` is a single token.

**30.219 percent** matches `lab/out/we2_softmax.json`. Notice how low it is. The model's best
answer to "The capital of France is" carries under a third of the available probability. The rest
is spread over the other 151,935 tokens. [Chapter 4](../ch/ch04.md) is about why.

---

(pyref-temperature)=
## 8. Applying a temperature

### What you are trying to do

You want to make the model's probabilities more concentrated on its favourite, or more spread out
over many options, without changing which one is the favourite. The one dial that does this is
called **temperature**.

:::{warning} The sentence this course does not allow
"Temperature makes the model more creative" is the most misleading thing commonly said about
language models, and you will not write it in this course. Temperature divides the logits before
the exponentiation. That flattens or sharpens the probabilities. It **cannot change the order**
of the candidates. The model's favourite token at temperature 0.25 is the same token as at
temperature 2.0. [Chapter 5](../ch/ch05.md) proves this.
:::

### The mathematics

**1. In words.** Divide every score by the same positive number before running softmax. Dividing
by a number smaller than 1 pushes the scores apart, which makes the winner stand out more.
Dividing by a number larger than 1 squeezes the scores together, which makes the outcome more
even.

**2. The formula.**

$$
p_i = \frac{e^{z_i / T}}{e^{z_1 / T} + e^{z_2 / T} + \dots + e^{z_V / T}}
$$

**3. The symbols.** Every symbol, including the ones that were also in the
[softmax table](#pyref-softmax). The two new ones are at the top.

| Symbol | How to say it out loud | What it means |
|---|---|---|
| $T$ | "tee" | the **temperature**. A positive number you choose. $T = 1$ leaves the scores alone. |
| $z_i / T$ | "z sub i over T" | the score for token $i$, divided by the temperature. See [the fraction bar](math-toolkit.md#toolkit-fraction-bar). |
| $z$ | "zee" | a score the model gave to a token. A **logit**. Can be negative. |
| $i$ | "eye" | a counter standing for "which token". |
| $z_i$ | "z sub i" | the score for token number $i$. |
| $e$ | "e" | a fixed number, $2.718282\ldots$ |
| $e^{z_i / T}$ | "e to the z sub i over T" | $e$ raised to the power $z_i / T$. |
| $V$ | "vee" | how many tokens are in the vocabulary. Here, $V = 151{,}936$. |
| $p_i$ | "p sub i" | the probability of token $i$, a number between 0 and 1. |
| the fraction bar | "divided by" | divide whatever is on top by whatever is underneath. |
| $+$ | "plus" | add. |
| $\dots$ | "and so on" | the pattern continues; every remaining term is written the same way. |
| $=$ | "equals" | the left side and the right side are the same number. |

**4. Out loud.** "The probability of a token is e raised to that token's score divided by the
temperature, all over the sum of e raised to every token's score divided by the temperature."

**5. Worked, with the same three made-up scores 2, 1 and 0, at $T = 0.5$.**

Step 1, divide each score by $T = 0.5$. Dividing by 0.5 is the same as multiplying by 2.

$2 \div 0.5 = 4$

$1 \div 0.5 = 2$

$0 \div 0.5 = 0$

Step 2, raise $e$ to each of those.

$e^{4} = 54.598150$

$e^{2} = 7.389056$

$e^{0} = 1.000000$

Step 3, add them.

$54.598150 + 7.389056 + 1.000000 = 62.987206$

Step 4, divide each by the total.

$p_1 = 54.598150 \div 62.987206 = 0.866813$

$p_2 = 7.389056 \div 62.987206 = 0.117310$

$p_3 = 1.000000 \div 62.987206 = 0.015876$

**6. Check it.** $0.866813 + 0.117310 + 0.015876 = 0.999999$, which is 1 up to rounding in the
last digit. Compare with the $T = 1$ answer from [section 7](#pyref-softmax): the winner went
from 0.665241 to 0.866813, so it got sharper. And the ranking is unchanged: first is still
first, second still second, third still third. If your ranking changed, you divided by $T$ after
exponentiating instead of before.

### The code

```python
temperature_list = [0.25, 0.5, 1.0, 1.5, 2.0]
for one_temperature in temperature_list:
    scaled_logits = next_token_logits / one_temperature
    probabilities_at_this_temperature = torch.softmax(scaled_logits, dim=-1)
    paris_percent = float(probabilities_at_this_temperature[paris_id]) * 100
    print("T =", one_temperature, "  P(' Paris') =", round(paris_percent, 3), "percent")
```

Output:

```text
T = 0.25   P(' Paris') = 96.799 percent
T = 0.5   P(' Paris') = 73.43 percent
T = 1.0   P(' Paris') = 30.219 percent
T = 1.5   P(' Paris') = 9.949 percent
T = 2.0   P(' Paris') = 2.447 percent
```

All five numbers match `lab/out/we2_softmax.json`.

`next_token_logits / one_temperature` divides all 151,936 scores by the same number in one go.
That is a thing tensors do that plain Python lists do not: an arithmetic operation on a tensor
happens to every number in it.

The order of the two lines is the whole lesson. **Divide first, then softmax.** Divide after the
softmax and you get something that is not a probability distribution at all, because the results
will no longer add to 1.

The second row prints as `73.43` rather than `73.430`. Python's `round` drops a trailing zero. The
value is 73.430 percent to three decimal places.

At $T = 0.25$ the model gives `' Paris'` 96.799 percent. At $T = 2.0$ it gives it 2.447 percent.
Same model, same prompt, same logits, one dial. `' Paris'` is the top-ranked token at every one
of those five temperatures.

---

(pyref-topk)=
## 9. Taking the top k

### What you are trying to do

You have 151,936 scores and you want the best handful. **Top k** means "give me the k largest
values, and tell me which positions they came from". The letter $k$ is a stand-in for however
many you want.

You need both halves of that answer. The values tell you how strong the candidates are. The
positions are the token ids, which is how you find out what the candidates say.

### The code

```python
top_k_result = torch.topk(next_token_logits, 5)
for rank_position in range(5):
    one_id = int(top_k_result.indices[rank_position])
    one_piece = tokenizer.decode([one_id])
    one_logit = float(top_k_result.values[rank_position])
    one_percent = float(next_token_probabilities[one_id]) * 100
    print(rank_position + 1, repr(one_piece), " id", one_id, " logit", round(one_logit, 4),
          " probability", round(one_percent, 3), "percent")
```

Output:

```text
1 ' Paris'  id 12095  logit 17.2173  probability 30.219 percent
2 ' ______'  id 32671  logit 16.3196  probability 12.315 percent
3 ':\n'  id 510  logit 15.6955  probability 6.597 percent
4 ':\n\n'  id 1447  logit 15.5711  probability 5.826 percent
5 ' __'  id 1304  logit 15.3869  probability 4.846 percent
```

Every logit here matches `lab/out/we2_softmax.json`.

`torch.topk(next_token_logits, 5)` returns a bundle with two parts. `.values` holds the five
largest scores, biggest first. `.indices` holds the positions those scores came from, which are
the token ids.

`range(5)` produces 0, 1, 2, 3, 4. That is why the print statement says `rank_position + 1`, so
the display starts at 1 instead of 0.

`repr(one_piece)` is worth having. `repr` is short for *representation*, and it shows a string
with its quotation marks and its invisible characters made visible. Without it, `':\n'` would
print as a colon followed by a line break, and you would not be able to see what the token was.
`\n` is how a line break is written inside a string.

### What the output is telling you

The model's top answer is `' Paris'`, which is right, at 30.219 percent.

Its second answer is `' ______'`, a row of underscores, at 12.315 percent. That is a
fill-in-the-blank line. Ranks three, four and five are a colon and a line break, a colon and two
line breaks, and a shorter row of underscores.

Four of the model's top five guesses are worksheet punctuation. The model has read a great many
documents in which the words "The capital of France is" are followed by a blank for a student to
fill in. That is not a bug. It is a fact about what the model was trained on, and you can see it
directly in the numbers. [Chapter 4](../ch/ch04.md) opens on this result.

---

(pyref-embed)=
## 10. Embedding sentences

### What you are trying to do

You want to compare the meanings of two sentences with arithmetic. To do that you first turn each
sentence into a list of numbers. Sentences that mean similar things should get similar lists.

:::{important} Definition: embedding
An **embedding** is a list of numbers that stands for a piece of text. The list has a fixed
length, no matter how long the text is. The model used here produces a list of 384 numbers for
any sentence you give it.

A list of numbers like that is also called a **vector**. See
[coordinates and vectors](math-toolkit.md#toolkit-vectors). A vector of 2 numbers is a point on a
page and you can draw it. A vector of 384 numbers works the same way arithmetically; you cannot
picture it, and you do not need to.
:::

This is a different model from the one in [section 4](#pyref-load). That one predicts next
tokens. This one summarises whole sentences. Loading the second does not disturb the first.

### The code

```python
embedding_model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
sentence_list = [
    "The cat sat on the mat.",
    "A kitten rested on the rug.",
    "Bakersfield is in Kern County, California.",
    "Kern County's largest city is Bakersfield.",
    "The stock market fell sharply on Tuesday.",
    "Photosynthesis converts light into chemical energy.",
]
sentence_vectors = embedding_model.encode(sentence_list)
print("shape:", sentence_vectors.shape)
print("first six numbers of sentence 0:", sentence_vectors[0][:6])
```

Output:

```text
shape: (6, 384)
first six numbers of sentence 0: [ 0.13023718 -0.01577282 -0.03671669  0.05798642 -0.05979175  0.0330537 ]
```

`all-MiniLM-L6-v2` is a small embedding model, 22,713,216 parameters, 0.09 GB on disk.
That is roughly one twenty-second the size of the language model, which is one reason the course
uses it: it downloads quickly and runs comfortably on any machine.

`.encode(sentence_list)` takes the whole list of six sentences at once and hands back all six
vectors together. Handing over a list rather than looping one sentence at a time is faster, and
the result is identical.

`.shape` says `(6, 384)`: six rows, one per sentence, and 384 columns, because this model's
vectors always have 384 numbers. That fixed width is the useful part. "The cat sat on the mat."
has six words and "Photosynthesis converts light into chemical energy." has six words too, but a
sentence of thirty words would also come back as 384 numbers.

`sentence_vectors[0][:6]` reads as "row 0, then the first six columns of it". The colon inside
square brackets is a **slice**, and `[:6]` means "from the start up to but not including position
6". You print six of the 384 so the line fits on a page.

The individual numbers mean nothing on their own. There is no column for "is about cats". The
meaning lives in the whole pattern, and the only sensible question to ask is how one pattern
compares with another. That question is [section 12](#pyref-cosine).

---

(pyref-normalise)=
## 11. Normalising a vector

### What you are trying to do

You want to keep a vector's direction and throw away its length, so that two vectors can be
compared on direction alone.

That matters because for an embedding, **direction carries the meaning and length does not**.
Two vectors pointing the same way describe the same content, whether one of them happens to be
three times longer.

### The mathematics, part one: the length of a vector

**1. In words.** The length of a vector is how far its point sits from the origin, measured in a
straight line. You get it by squaring every coordinate, adding the squares, and taking the square
root of the total.

**2. The formula.**

$$
\|\mathbf{u}\| = \sqrt{u_1^2 + u_2^2 + \dots + u_D^2}
$$

**3. The symbols.**

| Symbol | How to say it out loud | What it means |
|---|---|---|
| $\mathbf{u}$ | "you", or "vector u" | a vector, that is, an ordered list of numbers. Written in bold. |
| $u_1$ | "u sub one" | the first number in that list. |
| $u_D$ | "u sub D" | the last number in that list. |
| $D$ | "dee" | how many numbers the vector has. $D = 2$ on paper, $D = 384$ for the embeddings here. |
| $\|\mathbf{u}\|$ | "the norm of u", or "the length of u" | the length. The two vertical bars on each side are the notation for it. |
| $u_1^2$ | "u sub one squared" | that number multiplied by itself. See [exponents](math-toolkit.md#toolkit-exponents). |
| $\sqrt{\;\;}$ | "the square root of" | the number which, multiplied by itself, gives what is under the sign. See [square roots](math-toolkit.md#toolkit-square-roots). |

**4. Out loud.** "The length of a vector is the square root of the sum of the squares of its
numbers."

**5. Worked, on the made-up vector $\mathbf{u} = (3, 4)$.** Two numbers, chosen so the arithmetic
comes out whole.

Step 1, square each number.

$3^2 = 3 \times 3 = 9$

$4^2 = 4 \times 4 = 16$

Step 2, add the squares.

$9 + 16 = 25$

Step 3, take the square root.

$\sqrt{25} = 5$

So $\|\mathbf{u}\| = 5$.

**6. Check it.** A length is never negative, because squares are never negative and a square root
is taken as the positive one. If you get a negative length you have made a sign error. A second
check: the length must be at least as large as the biggest single number in the vector. Here the
biggest number is 4 and the length is 5, so that holds.

### The mathematics, part two: normalising

**1. In words.** Divide every number in the vector by the vector's own length. The result points
in exactly the same direction and has length 1.

**2. The formula.**

$$
\hat{\mathbf{u}} = \frac{\mathbf{u}}{\|\mathbf{u}\|}
$$

**3. The symbols.**

| Symbol | How to say it out loud | What it means |
|---|---|---|
| $\hat{\mathbf{u}}$ | "u hat" | the normalised version of $\mathbf{u}$. The little mark on top is called a **hat**. |
| $\mathbf{u}$ | "vector u" | the original vector. |
| $\|\mathbf{u}\|$ | "the length of u" | its length, from part one. |
| the fraction bar | "divided by" | divide every number in the vector on top by the single number underneath. |

A vector of length 1 is called a **unit vector**. Normalising is the act of making one.

**4. Out loud.** "U hat is the vector u divided by the length of u."

**5. Worked, continuing with $\mathbf{u} = (3, 4)$, whose length is 5.**

Step 1, divide the first number by 5.

$3 \div 5 = 0.6$

Step 2, divide the second number by 5.

$4 \div 5 = 0.8$

So $\hat{\mathbf{u}} = (0.6, 0.8)$.

**6. Check it.** Measure the new vector's length with the part-one formula.

$0.6^2 = 0.36$

$0.8^2 = 0.64$

$0.36 + 0.64 = 1.00$

$\sqrt{1.00} = 1$

The length is 1, so it worked. **This check is always available and you should always take it.**
If your normalised vector does not have length 1, you divided by the wrong number, most often by
one of the coordinates instead of by the length.

### The code: measuring a length

```python
first_vector = sentence_vectors[0]
sum_of_squares = 0.0
for one_number in first_vector:
    sum_of_squares = sum_of_squares + float(one_number) * float(one_number)

vector_length = math.sqrt(sum_of_squares)
print("sum of squares:", round(sum_of_squares, 6))
print("length        :", round(vector_length, 6))
```

Output:

```text
sum of squares: 1.0
length        : 1.0
```

That loop is the formula from part one, written out. It starts a running total at `0.0`, adds
each number multiplied by itself, and then takes the square root with `math.sqrt`. Working
through all 384 numbers by hand would take you an afternoon; the loop does the same arithmetic.

### The honest finding: this model already normalised for you

The length came out as **1.0**, before you did anything. That is not luck.

```python
module_names = []
for one_module in embedding_model:
    module_names.append(type(one_module).__name__)

print(module_names)
```

Output:

```text
['Transformer', 'Pooling', 'Normalize']
```

This model is built as three stages, and the last stage is named `Normalize`. It normalises every
vector on the way out. Its output is measured at length 1.0 whether or not you ask for it, and
`embedding_model.encode(sentence_list, normalize_embeddings=True)` returns exactly the same
numbers. The same is true of `bge-small-en-v1.5`, the other embedding model this course uses in
[Chapter 10](../ch/ch10.md). Both were checked.

:::{tip} Measure, do not assume
That fact is true of these two models and is not a law of nature. Plenty of embedding models
return vectors of assorted lengths. The habit worth keeping is the one in the code above: measure
the length, print it, and see what you have. It costs two lines.
:::

### The code: normalising a vector that genuinely needs it

To watch normalising actually do something, stretch a real embedding first. Multiplying every
number in a vector by 3 leaves its direction untouched and makes it three times as long.

```python
stretched_vector = sentence_vectors[0] * 3.0
stretched_sum_of_squares = 0.0
for one_number in stretched_vector:
    stretched_sum_of_squares = stretched_sum_of_squares + float(one_number) * float(one_number)

stretched_length = math.sqrt(stretched_sum_of_squares)
print("length after multiplying by 3:", round(stretched_length, 4))

normalised_vector = stretched_vector / stretched_length
check_sum_of_squares = 0.0
for one_number in normalised_vector:
    check_sum_of_squares = check_sum_of_squares + float(one_number) * float(one_number)

print("length after normalising     :", round(math.sqrt(check_sum_of_squares), 6))
print("first three, stretched       :", stretched_vector[:3])
print("first three, normalised      :", normalised_vector[:3])
```

Output:

```text
length after multiplying by 3: 3.0
length after normalising     : 1.0
first three, stretched       : [ 0.39071155 -0.04731847 -0.11015007]
first three, normalised      : [ 0.13023718 -0.01577282 -0.03671669]
```

The length goes 1.0, then 3.0, then back to 1.0. The three numbers printed at the end are
identical to the six printed in [section 10](#pyref-embed). Stretching and normalising returned
the vector to precisely where it started.

`stretched_vector / stretched_length` divides all 384 numbers by one number in a single line,
which is the same convenience that made `next_token_logits / one_temperature` work in
[section 8](#pyref-temperature).

### Why this matters: length is not meaning

```python
second_vector = sentence_vectors[1]
cosine_before = 0.0
cosine_after = 0.0
for coordinate_position in range(384):
    cosine_before = cosine_before + float(sentence_vectors[0][coordinate_position]) * float(second_vector[coordinate_position])
    cosine_after = cosine_after + float(normalised_vector[coordinate_position]) * float(second_vector[coordinate_position])

print("cosine before stretching:", round(cosine_before, 4))
print("cosine after  stretching:", round(cosine_after, 4))
```

Output:

```text
cosine before stretching: 0.6124
cosine after  stretching: 0.6124
```

The similarity between sentence 0 and sentence 1 is 0.6124 before the stretch and 0.6124 after
it. Tripling one vector's length changed the similarity by nothing at all, because the
normalising threw the length away again. That is the property the next section is built on.

---

(pyref-cosine)=
## 12. Computing a cosine similarity matrix

### What you are trying to do

You have six sentences and you want a table showing how close each one is to each other one. The
measure used is **cosine similarity**, and the table is called a **similarity matrix**. A
**matrix** is a rectangle of numbers, in rows and columns.

### The mathematics, part one: the dot product

**1. In words.** Multiply the two vectors' first numbers together, then their second numbers,
then their third, and so on, and add up all those products. You get a single number.

**2. The formula.**

$$
\mathbf{u} \cdot \mathbf{v} = u_1 v_1 + u_2 v_2 + \dots + u_D v_D
$$

**3. The symbols.**

| Symbol | How to say it out loud | What it means |
|---|---|---|
| $\mathbf{u}$, $\mathbf{v}$ | "vector u", "vector v" | the two vectors being compared. |
| $\cdot$ | "dot" | the dot product operator. It sits between two vectors and gives back a single number. |
| $u_1 v_1$ | "u sub one v sub one" | two symbols written next to each other means multiply them. See [multiplication](math-toolkit.md#toolkit-multiplication). |
| $D$ | "dee" | how many numbers each vector has. Both must have the same $D$. |
| $+$ | "plus" | add. |

**4. Out loud.** "The dot product of u and v is u-one times v-one, plus u-two times v-two, and so
on for every position, all added together."

**5. Worked, on the made-up vectors $\mathbf{u} = (3, 4)$ and $\mathbf{v} = (4, 3)$.**

Step 1, multiply the first numbers.

$3 \times 4 = 12$

Step 2, multiply the second numbers.

$4 \times 3 = 12$

Step 3, add the products.

$12 + 12 = 24$

So $\mathbf{u} \cdot \mathbf{v} = 24$.

**6. Check it.** The dot product of a vector with itself has to equal the square of its length.
Try it: $\mathbf{u} \cdot \mathbf{u} = 3 \times 3 + 4 \times 4 = 9 + 16 = 25$, and
$\|\mathbf{u}\| = 5$, and $5^2 = 25$. That check will catch almost every slip.

### The mathematics, part two: cosine similarity

**1. In words.** Take the dot product of the two vectors and divide it by both of their lengths.
The answer only depends on the angle between them, which is the point.

**2. The formula.**

$$
\cos(\theta) = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\| \, \|\mathbf{v}\|}
$$

**3. The symbols.**

| Symbol | How to say it out loud | What it means |
|---|---|---|
| $\theta$ | "THAY-ta" | a Greek letter standing for the angle between the two vectors. See [Greek letters](math-toolkit.md#toolkit-greek). |
| $\cos(\theta)$ | "cosine of theta" | a number between $-1$ and $1$ that describes that angle. $1$ means the vectors point the same way, $0$ means they are at a right angle, $-1$ means they point opposite ways. |
| $\mathbf{u} \cdot \mathbf{v}$ | "u dot v" | the dot product, from part one. |
| $\|\mathbf{u}\|$, $\|\mathbf{v}\|$ | "the length of u", "the length of v" | the two lengths. |
| the two lengths written together | "times" | they are multiplied. The small gap between them means multiplication. |
| the fraction bar | "divided by" | divide the top by the bottom. |

**4. Out loud.** "The cosine of the angle between two vectors is their dot product, divided by the
length of the first times the length of the second."

**5. Worked, on the made-up vectors $\mathbf{a} = (3, 4)$ and $\mathbf{d} = (6, 8)$.** These are
chosen because $\mathbf{d}$ is exactly $\mathbf{a}$ doubled.

Step 1, the dot product.

$3 \times 6 = 18$

$4 \times 8 = 32$

$18 + 32 = 50$

Step 2, the length of $\mathbf{a}$.

$3^2 + 4^2 = 9 + 16 = 25$, and $\sqrt{25} = 5$

Step 3, the length of $\mathbf{d}$.

$6^2 + 8^2 = 36 + 64 = 100$, and $\sqrt{100} = 10$

Step 4, multiply the two lengths.

$5 \times 10 = 50$

Step 5, divide.

$50 \div 50 = 1.0000$

**6. Check it.** The answer is exactly 1, which means the angle is 0 degrees, which is right,
because $\mathbf{d}$ points in precisely the same direction as $\mathbf{a}$. It is twice as long
and the cosine does not care. **That is why the division by both lengths is in the formula at
all.** If you had used the dot product alone you would have got 50 for this pair and 25 for
$\mathbf{a}$ with itself, which would have said a vector is less similar to itself than to
something else. That is nonsense, and dividing by the lengths is the fix.

A second check: cosine can never come out above 1 or below $-1$. If yours did, you divided by one
length instead of both.

All three worked pairs on this page, $(3,4)$ with $(4,3)$ giving 0.9600, $(3,4)$ with $(-4,3)$
giving 0.0000, and $(3,4)$ with $(6,8)$ giving 1.0000, are recorded in
`lab/out/we5_embeddings.json`.

### The shortcut the code uses

Here is the step that saves all the work. If both vectors have already been normalised to length
1, then $\|\mathbf{u}\| = 1$ and $\|\mathbf{v}\| = 1$, so the bottom of the fraction is
$1 \times 1 = 1$, and dividing by 1 changes nothing.

**For unit vectors, the cosine similarity is the dot product.** Nothing else needed.

### The code

```python
unit_vectors = embedding_model.encode(sentence_list, normalize_embeddings=True)
similarity_matrix = unit_vectors @ unit_vectors.T
print("shape of the matrix:", similarity_matrix.shape)

for row_position in range(6):
    one_row_text = ""
    for column_position in range(6):
        one_value = float(similarity_matrix[row_position][column_position])
        one_row_text = one_row_text + f"{one_value:7.3f}"
    print(row_position, one_row_text)
```

Output:

```text
shape of the matrix: (6, 6)
0   1.000  0.612  0.084  0.072  0.060  0.010
1   0.612  1.000  0.036  0.015  0.029  0.011
2   0.084  0.036  1.000  0.833  0.022  0.047
3   0.072  0.015  0.833  1.000  0.081  0.019
4   0.060  0.029  0.022  0.081  1.000 -0.017
5   0.010  0.011  0.047  0.019 -0.017  1.000
```

Every number in that table matches `lab/out/we5_embeddings.json`.

`normalize_embeddings=True` asks for unit vectors. As [section 11](#pyref-normalise) showed, this
particular model would have given them to you regardless. Write it anyway. It states your
intention, and it protects the code if you later switch to a model that does not normalise.

`@` is Python's symbol for matrix multiplication. `.T` means **transpose**, which flips a matrix
so its rows become its columns. So `unit_vectors @ unit_vectors.T` computes the dot product of
every row against every other row, all 36 combinations, in one instruction. That single line is
the cosine formula applied 36 times.

The nested loop prints it. The outer loop picks a row, the inner loop walks along that row
building up one line of text, and the print happens once per row. `f"{one_value:7.3f}"` is a
**formatted string**: the `f` before the quotation mark turns on substitution, and `:7.3f` means
"as a decimal number, 3 places after the point, padded to 7 characters wide". The padding is what
keeps the columns lined up.

### Reading the matrix

| Pair | Cosine | What it means |
|---|---|---|
| Row 2 with row 3 | **0.833** | "Bakersfield is in Kern County, California." and "Kern County's largest city is Bakersfield." |
| Row 0 with row 1 | **0.612** | "The cat sat on the mat." and "A kitten rested on the rug." |
| Row 0 with row 2 | 0.084 | the cat sentence and the Bakersfield sentence |
| Row 4 with row 5 | **-0.017** | the stock market sentence and the photosynthesis sentence |

Three facts are visible there.

**The diagonal is all 1.000.** Every sentence is perfectly similar to itself. If your diagonal is
not 1, your vectors were not normalised.

**Rows 0 and 1 score 0.612 while sharing no content words.** Cat and kitten are different words.
Sat and rested are different words. Mat and rug are different words. The only words in common are
"the", "on" and "a". A method based on matching words would score this pair near zero. The
embedding scores it 0.612, because the model is comparing meaning rather than spelling. That one
number is the argument for this whole approach.

**Rows 4 and 5 score -0.017, which is below zero.** Cosine similarity can go negative. Two
sentences with nothing to do with each other can land slightly past a right angle.

### Retrieval falls out of this for free

```python
query_text = "Which California county is Bakersfield in?"
query_vector = embedding_model.encode([query_text], normalize_embeddings=True)[0]
query_similarities = unit_vectors @ query_vector
ranked_order = numpy.argsort(-query_similarities)

for rank_position in range(6):
    sentence_position = int(ranked_order[rank_position])
    one_similarity = float(query_similarities[sentence_position])
    print(rank_position + 1, round(one_similarity, 3), sentence_list[sentence_position])
```

Output:

```text
1 0.91 Bakersfield is in Kern County, California.
2 0.719 Kern County's largest city is Bakersfield.
3 0.089 The cat sat on the mat.
4 0.062 A kitten rested on the rug.
5 0.056 Photosynthesis converts light into chemical energy.
6 0.012 The stock market fell sharply on Tuesday.
```

These match `lab/out/we5_embeddings.json`.

Three points of syntax. `encode([query_text], ...)` puts the single question inside square
brackets, because `encode` wants a list; the `[0]` on the end then takes the one vector back out
of the list of one. `numpy.argsort` sorts and returns **positions** rather than values, smallest
first. The minus sign in `-query_similarities` flips every number's sign, which turns
smallest-first into largest-first. That minus sign is the standard way to sort descending.

Now read the numbers. The two relevant sentences score 0.910 and 0.719. The first irrelevant one
scores 0.089. **The gap between rank 2 and rank 3 is 0.630, which is about eight times the
largest gap anywhere below it.** That gap is the whole idea of retrieval: it is what lets a
program decide where the useful answers stop. [Chapter 10](../ch/ch10.md) builds a real retrieval
system on that gap, and then shows a measured case where trusting the gap across two different
systems leads you to the wrong conclusion.

---

(pyref-mcq)=
## 13. Scoring a multiple-choice question by log-probability

### What you are trying to do

You want to give a model a multiple-choice question and find out which option it picks, in a way
that gives the same answer every time you run it.

You could ask it to write out an answer and then read what it wrote. That is fragile: the model
might write "B", or "B.", or "The answer is B", or a paragraph. Instead you ask a cleaner
question. **Of the four letter tokens A, B, C and D, which one does the model think is most
likely to come next?** That has one unambiguous answer and no randomness in it at all.

### The mathematics: the log-probability

**1. In words.** Probabilities for a whole sentence get extremely small, small enough that a
computer loses track of them. Taking the logarithm turns those tiny numbers into moderate
negative ones that are easy to work with, and it keeps the ranking identical.

**2. The formula.**

$$
\ell_i = \ln(p_i)
$$

**3. The symbols.**

| Symbol | How to say it out loud | What it means |
|---|---|---|
| $p_i$ | "p sub i" | the probability of option $i$, between 0 and 1. |
| $\ln$ | "L N", or "natural log" | the **natural logarithm**. It answers the question "what power do I raise $e$ to, to get this number?" See [logarithms](math-toolkit.md#toolkit-logarithms). |
| $\ell_i$ | "ell sub i" | the log-probability of option $i$. Always negative for a probability below 1. |
| the round brackets | "of" | they hold whatever the logarithm is being applied to. |

**4. Out loud.** "Ell sub i is the natural log of p sub i."

**5. Worked, on a made-up probability of 0.21 percent.** That is 0.0021 as a decimal. See
[percentages and decimals](math-toolkit.md#toolkit-percentages).

Step 1, write the percentage as a decimal by dividing by 100.

$0.21 \div 100 = 0.0021$

Step 2, take the natural log. On a calculator this is the `ln` key.

$\ln(0.0021) = -6.165$

To go back the other way, raise $e$ to that power, which is the `exp` key.

$e^{-6.165} = 0.0021$

Step 3, back to a percentage by multiplying by 100.

$0.0021 \times 100 = 0.21$ percent

**6. Check it.** A log-probability is always negative, because every probability is below 1 and
the log of a number below 1 is negative. A log-probability of $0$ would mean a probability of
exactly 1, which is total certainty. A **positive** log-probability is impossible, so if you see
one, you took the log of something that was not a probability. And the more negative the number,
the less likely the option: $-6.163$ is more likely than $-8.891$.

### The code, step one: write the question out

```python
question_text = "The mean of 2, 4, 4, 6 is:"
option_list = ["3", "4", "5", "6"]
letter_list = ["A", "B", "C", "D"]

question_body = "Question: " + question_text + "\n"
for option_position in range(4):
    question_body = question_body + letter_list[option_position] + ". " + option_list[option_position] + "\n"

question_body = question_body + "Answer:"
print(question_body)
```

Output:

```text
Question: The mean of 2, 4, 4, 6 is:
A. 3
B. 4
C. 5
D. 6
Answer:
```

The `+` sign between two strings glues them together, which is called **concatenation**. `"\n"`
is a line break. The loop adds one option line per turn, so the text is built up piece by piece.

Ending the text with `Answer:` and nothing after it is the whole trick. The very next thing the
model produces has to be its answer.

### The code, step two: wrap it in the chat template

```python
chat_turn = [{"role": "user", "content": question_body}]
prompt_text = tokenizer.apply_chat_template(chat_turn, tokenize=False, add_generation_prompt=True)
print(prompt_text)
```

Output:

```text
<|im_start|>system
You are Qwen, created by Alibaba Cloud. You are a helpful assistant.<|im_end|>
<|im_start|>user
Question: The mean of 2, 4, 4, 6 is:
A. 3
B. 4
C. 5
D. 6
Answer:<|im_end|>
<|im_start|>assistant

```

This model is an **Instruct** model, which means it was trained to see conversations laid out in a
particular format. The markers `<|im_start|>` and `<|im_end|>` are how it recognises where each
speaker's turn begins and ends. Give it a bare question with no markers and it will behave less
predictably, because the text does not look like what it was trained on.

`apply_chat_template` adds the markers for you. `chat_turn` is a list holding one **dictionary**,
which is a bundle of labelled values written in curly brackets; here the labels are `role` and
`content`. `tokenize=False` asks for the assembled text rather than the ids, so you can look at
it. `add_generation_prompt=True` adds the opening marker for the reply, so the model knows it is
its turn.

Look at what the template added at the top: a system instruction saying "You are Qwen, created by
Alibaba Cloud." You did not write that. It came with the model. **This is why you print the
template before you trust it**, and it is closely related to
[error 5 in the next section](#pyref-errors).

### The code, step three: score the four letters

```python
question_ids = tokenizer(prompt_text, return_tensors="pt").input_ids
with torch.no_grad():
    question_output = language_model(question_ids)

final_position_logits = question_output.logits[0, -1]
log_probabilities = torch.log_softmax(final_position_logits, dim=-1)

letter_log_probabilities = []
for option_position in range(4):
    one_letter = letter_list[option_position]
    one_letter_id = tokenizer(one_letter, add_special_tokens=False).input_ids[0]
    one_log_probability = float(log_probabilities[one_letter_id])
    letter_log_probabilities.append(one_log_probability)
    one_probability = math.exp(one_log_probability)
    print(one_letter, " id", one_letter_id, " log-probability", round(one_log_probability, 4),
          " probability", round(one_probability * 100, 2), "percent")
```

Output:

```text
A  id 32  log-probability -6.163  probability 0.21 percent
B  id 33  log-probability -7.647  probability 0.05 percent
C  id 34  log-probability -8.4651  probability 0.02 percent
D  id 35  log-probability -8.8911  probability 0.01 percent
```

`torch.log_softmax` does softmax and then takes the natural log, in one step. Doing it in one step
is more accurate than doing it in two, because the very small numbers in the middle never have to
be stored.

`math.exp(one_log_probability)` reverses the log, turning the log-probability back into a
probability so the last column is readable.

Every one of those four probabilities is tiny. That is expected. The model's probability is
spread across all 151,936 tokens, and the four letters are competing with everything else it
might say, including a space, a word, or a line break. **What matters is the ranking, not the
size.**

### The code, step four: pick the winner

```python
best_position = 0
for option_position in range(4):
    if letter_log_probabilities[option_position] > letter_log_probabilities[best_position]:
        best_position = option_position

print("the model chose:", letter_list[best_position])
print("the right answer is: B")
```

Output:

```text
the model chose: A
the right answer is: B
```

That loop finds the largest of four numbers by hand. It starts by assuming position 0 is the
winner, then checks each position in turn, and moves the title whenever it finds something
larger. `>` means "is greater than". The indented line under the `if` runs only when the
comparison is true.

The mean of 2, 4, 4, 6 is $(2 + 4 + 4 + 6) \div 4 = 16 \div 4 = 4$, which is option B. The model
chose A.

:::{warning} This procedure has a bug in it, and finding that bug is Chapter 13
Scoring by the letter alone is the first method most people reach for, and it is used in
published research. On the
full twenty-question bank it gave this model **25.0 percent**, which is exactly what guessing
would give on four options.

The reason is in `lab/out/we6b_eval_debiased.json`. The model answered **A on 16 of the 20
questions**, while the correct answers were spread across B eight times, C eight times, D twice
and A twice. The scorer was measuring how much the model likes the letter A, not how much it
knows about statistics.

Two standard repairs exist, and on the same model and the same twenty questions they give
**35.0 percent** and **15.0 percent**. Three defensible procedures, one model, three answers
between 15 and 35 percent. [Chapter 13](../ch/ch13.md) is about that, and it is the most original
thing in this course.
:::

---

(pyref-bootstrap)=
## 14. Resampling with replacement for a bootstrap

### What you are trying to do

A model scored 5 out of 20 on a quiz. You want to know how much that score would have moved if
the quiz had contained a different twenty questions. You cannot write another quiz, so instead
you reuse the one you have, in a procedure called the **bootstrap**.

The bootstrap builds a pretend new quiz by drawing twenty questions from your twenty, **with
replacement**, which means a question can be drawn more than once and some are not drawn at all.
Score the pretend quiz. Do that ten thousand times. The spread of those ten thousand scores tells
you how much your one real score could have wobbled.

### The mathematics, part one: the sample proportion

**1. In words.** Accuracy is the number of questions the model got right divided by the number of
questions asked.

**2. The formula.**

$$
\hat{p} = \frac{x}{n}
$$

**3. The symbols.**

| Symbol | How to say it out loud | What it means |
|---|---|---|
| $x$ | "ex" | how many questions were answered correctly. A whole number. |
| $n$ | "en" | how many questions were asked in total. |
| $\hat{p}$ | "p hat" | the measured accuracy, between 0 and 1. The hat marks it as something you measured rather than something you know. |
| the fraction bar | "divided by" | divide the top by the bottom. |

**4. Out loud.** "P hat is x divided by n."

**5. Worked, on the real result from `lab/out/we6_eval.json`.** This one is a measurement, not a
made-up example.

Step 1, write down the two counts. $x = 5$ and $n = 20$.

Step 2, divide.

$5 \div 20 = 0.25$

Step 3, turn it into a percentage by multiplying by 100.

$0.25 \times 100 = 25.0$ percent

**6. Check it.** A proportion has to land between 0 and 1. If yours is above 1 you divided the
wrong way round. Sanity check the value too: four options per question means blind guessing
averages 25 percent, and this model scored 25.0 percent. A score sitting exactly on chance is a
reason to be suspicious of the measurement, which is the door into
[Chapter 13](../ch/ch13.md).

### The mathematics, part two: the percentile interval

**1. In words.** Line up all ten thousand pretend scores from smallest to largest. Chop off the
lowest 2.5 percent and the highest 2.5 percent. What is left in the middle is your 95 percent
interval.

**2. The formula.**

$$
\text{95\% interval} = \left( Q_{2.5}, \; Q_{97.5} \right)
$$

**3. The symbols.**

| Symbol | How to say it out loud | What it means |
|---|---|---|
| $Q_{2.5}$ | "Q two point five" | the **2.5th percentile**: the value with 2.5 percent of the resampled scores below it. |
| $Q_{97.5}$ | "Q ninety-seven point five" | the **97.5th percentile**: the value with 97.5 percent below it. |
| the round brackets | "from, to" | an **interval**, meaning every value between the two ends. See [interval notation](math-toolkit.md#toolkit-inequalities). |
| the comma | "to" | it separates the low end from the high end. |

**4. Out loud.** "The ninety-five percent interval runs from the two-point-five-th percentile to
the ninety-seven-point-five-th percentile of the resampled scores."

**5. Worked, on a made-up set of nine resampled scores.** Nine is small enough to do by eye, and
these nine numbers are invented for that purpose.

Suppose your nine pretend scores, sorted, are:

$10, 15, 20, 20, 25, 25, 30, 35, 40$ percent

Step 1, count them. There are 9.

Step 2, find the middle 95 percent. With only 9 values, chopping 2.5 percent off each end removes
less than one value from each side, so the interval runs from the smallest to the largest.

$(10, 40)$ percent

Step 3, notice that this is a useless interval, and that the reason is the number 9. With ten
thousand values instead of nine, the 2.5 percent at each end is 250 values, and the ends of the
interval become meaningful.

**6. Check it.** The low end must be below the high end, and your observed score should normally
sit somewhere between them. **97.5 minus 2.5 is 95, which is where the "95 percent" comes from.**
If you chopped 5 percent off each end you would have a 90 percent interval instead.

### The code, step one: the twenty results

```python
question_results = numpy.array([0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0], dtype=float)
observed_accuracy = question_results.mean()
print("questions:", len(question_results))
print("correct  :", int(question_results.sum()))
print("accuracy :", round(observed_accuracy * 100, 1), "percent")
```

Output:

```text
questions: 20
correct  : 5
accuracy : 25.0 percent
```

Those twenty zeros and ones are the real per-question results from `lab/out/we6_eval.json`. A `1`
means the model got that question right and a `0` means it did not. They are in the order the
questions were asked.

`numpy.array(...)` makes a numpy array out of a plain list, which is what lets `.mean()` and
`.sum()` work. `dtype=float` stores them as decimals rather than whole numbers, so the average
comes out as 0.25 rather than being rounded to 0.

The average of a list of zeros and ones **is** the proportion of ones. Five ones and fifteen
zeros average to $5 \div 20 = 0.25$.

### The code, step two: ten thousand resamples

```python
random_generator = numpy.random.default_rng(20260912)
bootstrap_accuracies = []
for one_resample in range(10000):
    resampled_results = random_generator.choice(question_results, size=20, replace=True)
    bootstrap_accuracies.append(resampled_results.mean())

bootstrap_accuracies = numpy.array(bootstrap_accuracies)
print("first three resampled accuracies:", bootstrap_accuracies[:3])
print("average of all 10,000           :", round(float(bootstrap_accuracies.mean()) * 100, 1), "percent")
print("how much they wobble (sd)       :", round(float(bootstrap_accuracies.std()) * 100, 2), "points")
```

Output:

```text
first three resampled accuracies: [0.25 0.15 0.35]
average of all 10,000           : 24.8 percent
how much they wobble (sd)       : 9.74 points
```

These match `lab/out/we6_eval.json`.

`numpy.random.default_rng(20260912)` makes a random number generator and fixes its **seed** at
20260912. A seed is a starting point. Give the same seed and you get the same sequence of random
draws, every time, on any machine. That is why your three numbers will be 0.25, 0.15 and 0.35 as
well. **Every random procedure in this course is seeded**, and this course's seed is 20260912.

`replace=True` is the phrase "with replacement". It means each of the twenty draws comes from the
full set of twenty, so a question can be picked twice. Set it to `False` and you would draw all
twenty questions exactly once every time, and every resample would score 25 percent, which would
tell you nothing.

`.std()` is the **standard deviation**, one number saying how spread out a set of values is. See
[square roots](math-toolkit.md#toolkit-square-roots) for where its square root comes from.

The three sample resamples show the point of the whole exercise. The same model, the same twenty
questions, and the scores come out 25 percent, then 15 percent, then 35 percent. Nothing changed
except which questions happened to be drawn.

### The code, step three: the interval

```python
lower_edge = numpy.percentile(bootstrap_accuracies, 2.5)
upper_edge = numpy.percentile(bootstrap_accuracies, 97.5)
print("95 percent bootstrap interval:", round(float(lower_edge) * 100, 1), "to", round(float(upper_edge) * 100, 1), "percent")
print("distinct accuracies possible :", len(numpy.unique(bootstrap_accuracies)))
```

Output:

```text
95 percent bootstrap interval: 5.0 to 45.0 percent
distinct accuracies possible : 14
```

Both match `lab/out/we6_eval.json`.

`numpy.percentile(values, 2.5)` finds the value below which 2.5 percent of the numbers sit.
`numpy.unique` returns each distinct value once, so `len(numpy.unique(...))` counts how many
different scores appeared across all ten thousand resamples.

Two things to take from those two lines.

**The honest report is not "25 percent".** It is "somewhere between 5 and 45 percent". That
interval is 40 percentage points wide. A twenty-question quiz cannot pin down a model's ability
any tighter than that, and quoting 25 percent as though it were a fact is the mistake
[Chapter 12](../ch/ch12.md) exists to prevent.

**Only 14 distinct accuracies appeared in ten thousand tries.** A twenty-question quiz can only
produce scores in steps of 5 percentage points, so there are 21 possible results at most, and 14
of them turned up. The measurement is coarse as well as uncertain.

:::{note} The classroom formula agrees
The textbook formula for a confidence interval around a proportion, called the **Wald interval**,
gives 6.0 to 44.0 percent for this same result. The bootstrap gives 5.0 to 45.0 percent. The two
methods agree to within about one percentage point at each end, by two completely different
routes. Both are in `lab/out/we6_eval.json`, and the Wald formula is set out in full in the
[formula sheet](formulas.md).
:::

---

(pyref-charts)=
## 15. Making a bar chart, a histogram and a heatmap

### What you are trying to do

You want a picture that shows your result honestly and can be read by everybody, including
readers who cannot distinguish red from green.

Some of your readers cannot tell red from green. A chart that carries its meaning in colour alone
is unreadable to them. This course uses the **Okabe-Ito palette**, eight colours chosen by
Masataka Okabe and Kei Ito to stay distinguishable across the common forms of colour vision
deficiency. The course specification names those eight colours and allows no others.

:::{important} The house rule on colour
Colour is never the only signal in a chart in this book. Every distinction carried by colour is
also carried by position, by shape, or by a printed label. Colour is the second way of telling
two things apart, never the first.
:::

### The palette, and the chart settings

```python
okabe_ito_blue = "#0072B2"
okabe_ito_orange = "#E69F00"
okabe_ito_green = "#009E73"
okabe_ito_vermillion = "#D55E00"
okabe_ito_sky_blue = "#56B4E9"
okabe_ito_yellow = "#F0E442"
okabe_ito_purple = "#CC79A7"
okabe_ito_grey = "#999999"

pyplot.rcParams.update({
    "figure.dpi": 140,
    "savefig.dpi": 140,
    "font.size": 11,
    "axes.spines.top": False,
    "axes.spines.right": False,
    "axes.grid": True,
    "grid.alpha": 0.25,
    "figure.facecolor": "white",
    "savefig.facecolor": "white",
    "savefig.bbox": "tight",
})
```

Each colour is written as a **hex code**, a `#` followed by six characters giving the amounts of
red, green and blue. `#0072B2` is the Okabe-Ito blue. Copy these eight lines into every notebook
you make for this course.

`pyplot.rcParams` holds matplotlib's default settings, and `.update({...})` changes several at
once. `dpi` is dots per inch, so 140 gives a sharp picture. The two `spines` lines remove the top
and right-hand borders of the plotting box, which are decoration. `grid.alpha` at 0.25 makes the
gridlines faint enough to read through. `savefig.bbox` set to `"tight"` trims empty margins when
the file is written.

### A bar chart

A bar chart compares a small number of named things. Use it when the categories have names rather
than an order.

```python
bar_labels = []
bar_heights = []
for rank_position in range(5):
    one_id = int(top_k_result.indices[rank_position])
    bar_labels.append(repr(tokenizer.decode([one_id])))
    bar_heights.append(float(next_token_probabilities[one_id]) * 100)

figure_one, axes_one = pyplot.subplots(figsize=(8, 4.4))
axes_one.bar(bar_labels, bar_heights, color=okabe_ito_blue)
axes_one.set_ylabel("probability (%)")
axes_one.set_xlabel("candidate next token")
axes_one.set_title("What the model thinks comes after 'The capital of France is'", loc="left")
figure_one.savefig("bar-chart.png")
```

The loop collects two matching lists: the five token strings and their five probabilities, taken
from the top-k result in [section 9](#pyref-topk).

`pyplot.subplots(...)` hands back two things at once, which is why there are two names on the left
of the equals sign. `figure_one` is the whole picture, the thing you save. `axes_one` is the
plotting area inside it, the thing you draw on. Every drawing instruction goes to the axes; only
saving goes to the figure.

`figsize=(8, 4.4)` sets the size in inches, width first.

`.set_ylabel`, `.set_xlabel` and `.set_title` label the chart. **Label every axis, every time.**
An axis without a label does not say what it is measuring, and a reader has no way to find out.
`loc="left"` puts the title on the left, which is this book's house style, because a
left-aligned title lines up with the y-axis label underneath it.

`figure_one.savefig("bar-chart.png")` writes the file. In a notebook the chart also appears on the
screen.

The file this produced shows one tall blue bar at 30.2 percent for `' Paris'`, then a bar at 12.3
percent for `' ______'`, then three shorter bars at 6.6, 5.8 and 4.8 percent. The same recipe made
`we2-softmax-temperature-bars.png` in [Chapter 4](../ch/ch04.md).

### A histogram

A histogram shows the shape of one set of numbers. It sorts the values into bins and draws how
many landed in each. Use it when the values are measurements rather than named categories.

```python
figure_two, axes_two = pyplot.subplots(figsize=(8, 4.4))
axes_two.hist(bootstrap_accuracies * 100, bins=numpy.arange(-2.5, 105, 5),
              color=okabe_ito_sky_blue, edgecolor="white")
axes_two.axvline(observed_accuracy * 100, color=okabe_ito_vermillion, linewidth=2.5)
axes_two.set_xlabel("accuracy on a resampled 20-question quiz (%)")
axes_two.set_ylabel("how many resamples")
axes_two.set_title("10,000 resamples of the same twenty questions", loc="left")
figure_two.savefig("histogram.png")
```

`.hist(...)` draws the histogram. `bootstrap_accuracies * 100` converts the proportions from
[section 14](#pyref-bootstrap) into percentages, all ten thousand of them in one go.

`bins=numpy.arange(-2.5, 105, 5)` sets the bin edges by hand. `numpy.arange(start, stop, step)`
makes a list of numbers counting up by `step`, so this gives the edges -2.5, 2.5, 7.5, and so on
up to 102.5. Those edges put each possible score in the middle of its own bin rather than on a
boundary. **Choose your bins deliberately.** Letting the software pick them can put two genuine
values in one bar and hide the structure.

`edgecolor="white"` draws a thin white line between the bars so they can be told apart.

`.axvline(...)` draws a vertical line, here in vermillion at the observed 25.0 percent, so the
reader can see where the real result sits inside the spread. The same recipe made
`we6-bootstrap-accuracy.png` in [Chapter 12](../ch/ch12.md).

### A heatmap

A heatmap shows a rectangle of numbers as a rectangle of colours. Use it for a table where you
want the pattern first and the exact values second.

```python
figure_three, axes_three = pyplot.subplots(figsize=(6.4, 5.4))
heatmap_image = axes_three.imshow(similarity_matrix, cmap="RdYlBu_r", vmin=-0.2, vmax=1.0)
axes_three.set_xticks(range(6))
axes_three.set_yticks(range(6))
axes_three.grid(False)
for row_position in range(6):
    for column_position in range(6):
        one_value = float(similarity_matrix[row_position][column_position])
        axes_three.text(column_position, row_position, round(one_value, 2),
                        ha="center", va="center", fontsize=9)

figure_three.colorbar(heatmap_image, ax=axes_three, shrink=0.8, label="cosine similarity")
axes_three.set_title("Cosine similarity between six sentences", loc="left")
figure_three.savefig("heatmap.png")
```

`.imshow(...)` draws the matrix as coloured squares. `cmap="RdYlBu_r"` names the colour scheme, a
red-yellow-blue scale running backwards, so high values are red and low ones are blue.

`vmin=-0.2` and `vmax=1.0` fix the two ends of the colour scale by hand. **Fix them.** If you let
matplotlib choose, two heatmaps of the same kind of data will use different scales, and a reader
comparing them will reach the wrong conclusion. This is the same failure the
[Chapter 10](../ch/ch10.md) retrieval lab meets with a different diagnostic.

`.grid(False)` turns off the gridlines, which were switched on for the other two charts and would
sit on top of the squares here.

The nested loop writes the number into each square. This is the line that satisfies the house rule
on colour: **the value is printed as text in every cell, so the chart does not need its colours to
be readable.** `ha` and `va` are horizontal and vertical alignment, both set to centre.

`.colorbar(...)` adds the key down the side showing which colour means which value, and its
`label` says what is being measured. `shrink=0.8` makes it slightly shorter than the plot.

The result is a six-by-six grid with a dark red diagonal of 1.0, a red pair at 0.83 where the two
Kern County sentences meet, an orange pair at 0.61 for the two animal sentences, and blue almost
everywhere else. The same recipe made `we5-cosine-similarity-matrix.png` in
[Chapter 9](../ch/ch09.md).

### Alt text is part of the chart

Every figure in this book carries **alt text**, a written description read aloud by a screen
reader. Write it as one or two sentences saying what the chart shows, not that a chart exists.

Not useful: "Bar chart of token probabilities."

Useful: "Bar chart of the five most likely next tokens after 'The capital of France is'. The
token ' Paris' is far ahead at 30.2 percent, followed by a fill-in-the-blank line at 12.3
percent, then three punctuation tokens between 4.8 and 6.6 percent."

Every figure you submit in this course needs alt text. It is on the lab rubrics.

---

(pyref-errors)=
## 16. The first five error messages you will see, and what they mean

An error message is not a telling-off. It is the computer saying which instruction it could not
carry out, and usually why. The messages below are the five that come up most often in this
course.

**Read the last line first.** A Python error prints a block of text called a traceback, which
lists the lines that led to the problem. The last line names the problem. Everything above it is
the route taken to get there.

Every message quoted below was produced on purpose on the course machine, by
`lab/appendix_python_reference_checks.py`, and stored in
`lab/out/appendix_python_reference_checks.json`. They are not from memory.

---

### Error 1: CUDA out of memory

```text
OutOfMemoryError: CUDA out of memory. Tried to allocate 335.28 GiB. GPU 0 has a total capacity
of 11.99 GiB of which 10.74 GiB is free. Of the allocated memory 94.78 MiB is allocated by
PyTorch, and 9.22 MiB is reserved by PyTorch but unallocated. If reserved but unallocated memory
is large try setting PYTORCH_CUDA_ALLOC_CONF=expandable_segments:True to avoid fragmentation.
```

**What it means.** CUDA is the software that lets programs use an NVIDIA graphics card. The card
has its own memory, separate from your computer's main memory, and it is much smaller. You asked
for more of it than exists. The message tells you both numbers: it wanted 335.28 GiB and the card
holds 11.99 GiB.

**What causes it here.** Loading a model too large for your card. A 3B model at 32-bit precision
needs about 12 gigabytes on its own, which will not fit alongside anything else on a 12 gigabyte
card. Or running a lab several times in a notebook without restarting: each run can leave the
previous model in the card's memory.

**How to fix it**, in the order to try:

1. **Restart the notebook** and run the cells once, from the top. This clears everything the card
   was holding.
2. **Use a smaller model.** `Qwen2.5-0.5B-Instruct` instead of `Qwen2.5-3B-Instruct`.
3. **Load at half precision** with `dtype=torch.float16`, which halves the memory needed. Your
   numbers will then differ from this book's in the later decimal places.
4. **Run on the CPU instead.** Do not send the model to the card at all. It will be slower and it
   will work. This is the fallback that always works.

**GiB and MiB.** A GiB is a gibibyte, 1,073,741,824 bytes. It is slightly larger than a gigabyte,
which is 1,000,000,000 bytes. Graphics cards are usually described in GiB.

---

### Error 2: the model will not download

```text
OSError: Qwen/Qwen2.5-0.5B-Instrukt is not a local folder and is not a valid model identifier
listed on 'https://huggingface.co/models'
If this is a private repository, make sure to pass a token having permission to this repo either
by logging in with `hf auth login` or by passing `token=<your_token>`
```

**What it means.** The library looked for a model by that name in two places, your own folders and
the online model library, and did not find it in either.

**What causes it.** In the example above, a typing mistake: `Instrukt` with a k, instead of
`Instruct` with a c. Model names are exact. `Qwen/qwen2.5-0.5b-instruct` and
`Qwen/Qwen2.5-0.5B-Instruct` might or might not both work, depending on the service, and you
should type the one the course gives you.

**How to fix it.**

1. **Compare your name against this book's, character by character.** The name has a slash, a
   dot, capital letters and hyphens, and every one of them matters.
2. **Check you are online**, if this is the first time you are fetching that model.
3. If the name is right and you are online, the model may be **private or removed**. Tell your
   instructor, because the course's model list needs updating. Every model this course uses is
   public and needs no account.

---

### Error 3: a tokenizer or dtype mismatch

Three different messages belong to this one family. All three mean the same thing: **two pieces
that have to match do not match.**

**3a. The wrong tokenizer for the model.**

```text
IndexError: index out of range in self
```

That message is short and it is not friendly. Here is what produced it. The text
`"France is ______ in Europe"` was turned into ids by the Qwen tokenizer, giving
`[49000, 374, 32671, 304, 4505]`, and those ids were handed to `all-MiniLM-L6-v2`, whose lookup
table has 30,522 rows. Row 49,000 does not exist. "Index out of range" means you asked for a row
past the end of the table.

**The fix is a rule: a tokenizer and a model are a matched pair, and you load both from the same
name.** Never mix a tokenizer from one model with the weights of another.

**3b. Two number formats in one calculation.**

```text
RuntimeError: dot : expected both vectors to have same dtype, but found Half and Float
```

`dtype` is short for *data type*, the format a number is stored in. `Float` here means 32-bit and
`Half` means 16-bit. Two numbers stored differently cannot be multiplied together directly.

**The fix.** Convert one of them: `one_vector.float()` makes a 16-bit tensor 32-bit, and
`one_vector.half()` goes the other way. Better still, load everything at one precision at the
start and do not mix. That is why every model on this page is loaded with `dtype=torch.float32`.

**3c. A list where a tensor was expected.**

```text
TypeError: embedding(): argument 'indices' (position 2) must be Tensor, not list
```

This is the most common of the three and the easiest to fix. You wrote
`tokenizer("some text").input_ids` and handed the result to the model. The tokenizer gave you a
plain Python list. The model needs a tensor.

**The fix.** Add the keyword argument: `tokenizer("some text", return_tensors="pt").input_ids`.
See [section 6](#pyref-logits).

---

### Error 4: forgetting `HF_HOME`

```text
OSError: We couldn't connect to 'https://huggingface.co' to load the files, and couldn't find
them in the cached files.
Check your internet connection or see how to run the library in offline mode at
'https://huggingface.co/docs/transformers/installation#offline-mode'.
```

**What it means.** The library looked in the folder `HF_HOME` points at, found nothing, tried to
download instead, and could not reach the internet either.

**What causes it.** Usually the model is on your disk and the program is looking in the wrong
place. Three ways that happens:

1. **`HF_HOME` was set after the import.** This is the big one. The variable is read once, when
   `transformers` is imported. Set it afterwards and the setting is ignored, silently. There is
   no warning. See [section 2, step 4](#pyref-install).
2. **`HF_HOME` was set in a different terminal window**, or in a window you have since closed.
   Variables set that way last only as long as the window.
3. **A typing mistake in the path**, or a path that no longer exists.

**How to fix it.** Print what the program actually thinks the value is:

```python
print(os.environ.get("HF_HOME"))
```

On a machine set up the way section 2 describes, that prints the folder you chose:

```text
C:\math3219\models
```

If it prints `None`, the variable is not set at all. If it prints a path, open that folder and
look for a subfolder called `hub`. If `hub` is missing or empty, the models are somewhere else.

Then fix the order. Move the two `HF_HOME` lines to the very top of your first cell, above every
other import, and **restart the notebook**. Restarting is required, because the import already
happened and cannot be undone by editing the cell.

---

### Error 5: the Ollama chat-template trap

This one is different from the other four. **It prints no error at all.** It returns a clean,
confident, entirely wrong answer, which makes it the most dangerous item on this page.

**What happens.** Ollama is a simpler way to run models locally, and this course offers it as the
no-install path. Version 0.24.0 will give you next-token probabilities if you ask, with
`"logprobs": true` and `"top_logprobs": 5`.

Send it the prompt `The capital of France is` without the setting `"raw": true`, and Ollama
wraps your text in the model's chat template first, the same kind of wrapper you printed in
[section 13](#pyref-mcq). Your sentence stops being a sentence to continue and becomes a message
in a conversation. The "next token" is then the first token of a **reply**.

**The measured result**, from `_research/00-lab-verified-findings.md`, taken on 12 September 2026
with Ollama 0.24.0:

| What you read off | Without `"raw": true` | Correct setup |
|---|---|---|
| Top token | `'The'` | `' Paris'` |
| Its probability | **99.9993 percent** | 54.25 percent for Qwen2.5-7B, 30.219 percent for Qwen2.5-0.5B |

A model that puts 99.9993 percent on one token looks like a machine with no uncertainty
whatsoever. Every lesson in [Chapter 4](../ch/ch04.md) and [Chapter 5](../ch/ch05.md) would
collapse, because there would
be no distribution left to look at. And the token is `'The'`, which is how a chatty reply begins,
not the capital of France.

**How to avoid it.**

1. **Always send `"raw": true`** when you want a continuation rather than a conversation.
2. **Use the native route `/api/generate`.** The OpenAI-compatible route `/v1/completions` gave
   back `logprobs: null` in this version, which means no probabilities at all.
3. **The `logprobs` setting is true or false, not a number.** Sending `"logprobs": 5`, which is
   the spelling other services use, fails with
   `json: cannot unmarshal number into Go struct field GenerateRequest.logprobs of type bool`.
   Send `"logprobs": true` and `"top_logprobs": 5` as two separate settings.
4. **Apply the sniff test.** If a small model claims 99.99 percent certainty about anything, stop
   and check your setup. The 0.5B model gives its best answer to the France question 30.219
   percent. Near-certainty from a small model is a sign that you are measuring your own prompt
   wrapper rather than the model.

:::{important} The general lesson, which outlives Ollama
Four of the five errors on this page announce themselves. This one does not. It returns a number
that looks excellent.

**A result that looks too clean deserves the same scrutiny as a result that looks wrong.** The
25.0 percent quiz score in [section 13](#pyref-mcq) was suspicious because it sat exactly on
chance; the 99.9993 percent here is suspicious because it sits almost exactly on certainty. Both
suspicions turned out to be right, and in both cases the fault was in the measuring procedure
rather than in the model. That is [Chapter 13](../ch/ch13.md) in one sentence.
:::

---

(pyref-summary)=
## 17. Everything on one page

One row per job. Use this to revise, or to find the section you want.

| You want to | The line that does it | Section |
|---|---|---|
| Set where models are kept | `os.environ["HF_HOME"] = r"C:\math3219\models"` | [2](#pyref-install) |
| Check for a graphics card | `torch.cuda.is_available()` | [3](#pyref-imports) |
| Load a tokenizer | `tokenizer = AutoTokenizer.from_pretrained(model_name)` | [4](#pyref-load) |
| Load a language model | `language_model = AutoModelForCausalLM.from_pretrained(model_name, dtype=torch.float32)` | [4](#pyref-load) |
| Count a model's parameters | a `for` loop adding `one_parameter_block.numel()` | [4](#pyref-load) |
| Generate text with no randomness | `language_model.generate(ids, max_new_tokens=12, do_sample=False)` | [4](#pyref-load) |
| Turn text into ids | `tokenizer(sentence).input_ids` | [5](#pyref-tokenize) |
| Turn ids into text | `tokenizer.decode(token_ids)` | [5](#pyref-tokenize) |
| Turn one id into text | `tokenizer.decode([one_id])` | [5](#pyref-tokenize) |
| Get ids the model will accept | `tokenizer(prompt, return_tensors="pt").input_ids` | [6](#pyref-logits) |
| Run the model without training it | `with torch.no_grad():` | [6](#pyref-logits) |
| Get the next-token scores | `model_output.logits[0, -1]` | [6](#pyref-logits) |
| Turn scores into probabilities | `torch.softmax(next_token_logits, dim=-1)` | [7](#pyref-softmax) |
| Find one token's id | `tokenizer(" Paris", add_special_tokens=False).input_ids[0]` | [7](#pyref-softmax) |
| Apply a temperature | `torch.softmax(next_token_logits / one_temperature, dim=-1)` | [8](#pyref-temperature) |
| Get the best five candidates | `torch.topk(next_token_logits, 5)` | [9](#pyref-topk) |
| Show a string's hidden characters | `repr(one_piece)` | [9](#pyref-topk) |
| Load an embedding model | `embedding_model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")` | [10](#pyref-embed) |
| Embed several sentences | `embedding_model.encode(sentence_list)` | [10](#pyref-embed) |
| Embed and normalise | `embedding_model.encode(sentence_list, normalize_embeddings=True)` | [11](#pyref-normalise) |
| Measure a vector's length | a `for` loop summing squares, then `math.sqrt(...)` | [11](#pyref-normalise) |
| Normalise a vector | `one_vector / vector_length` | [11](#pyref-normalise) |
| Compare every pair at once | `unit_vectors @ unit_vectors.T` | [12](#pyref-cosine) |
| Rank by similarity, best first | `numpy.argsort(-query_similarities)` | [12](#pyref-cosine) |
| Format the chat markers | `tokenizer.apply_chat_template(chat_turn, tokenize=False, add_generation_prompt=True)` | [13](#pyref-mcq) |
| Get log-probabilities | `torch.log_softmax(final_position_logits, dim=-1)` | [13](#pyref-mcq) |
| Undo a logarithm | `math.exp(one_log_probability)` | [13](#pyref-mcq) |
| Fix the randomness | `numpy.random.default_rng(20260912)` | [14](#pyref-bootstrap) |
| Resample with replacement | `random_generator.choice(question_results, size=20, replace=True)` | [14](#pyref-bootstrap) |
| Find a percentile | `numpy.percentile(bootstrap_accuracies, 2.5)` | [14](#pyref-bootstrap) |
| Count distinct values | `len(numpy.unique(bootstrap_accuracies))` | [14](#pyref-bootstrap) |
| Start a chart | `figure_one, axes_one = pyplot.subplots(figsize=(8, 4.4))` | [15](#pyref-charts) |
| Draw bars | `axes_one.bar(bar_labels, bar_heights, color=okabe_ito_blue)` | [15](#pyref-charts) |
| Draw a histogram | `axes_two.hist(values, bins=numpy.arange(-2.5, 105, 5))` | [15](#pyref-charts) |
| Draw a heatmap | `axes_three.imshow(similarity_matrix, cmap="RdYlBu_r", vmin=-0.2, vmax=1.0)` | [15](#pyref-charts) |
| Save a chart to a file | `figure_one.savefig("bar-chart.png")` | [15](#pyref-charts) |

### The eight Okabe-Ito colours

| Name | Hex code | Where this book uses it |
|---|---|---|
| blue | `#0072B2` | the main series in most charts |
| orange | `#E69F00` | the second series; shaded intervals |
| green | `#009E73` | the improved method in a before-and-after pair |
| vermillion | `#D55E00` | the observed value; the naive method; warnings |
| sky blue | `#56B4E9` | histogram bars |
| yellow | `#F0E442` | a fifth series, sparingly |
| purple | `#CC79A7` | a third method in a three-way comparison |
| grey | `#999999` | reference lines and anything deliberately unemphasised |

### The five habits this course grades

1. **Every import in the first cell, one per line, each with a comment.**
2. **Descriptive names.** `token_probabilities`, never `x`, `temp` or `df`.
3. **An explicit `for` loop**, written out, every time. This course does not use list
   comprehensions or lambdas, and repeating a few lines is preferred to hiding them in a helper
   function, because you can read a repeated line.
4. **Prose between every pair of code cells.** Two code cells in a row with nothing between them
   is a defect in a lab report.
5. **Every random procedure seeded**, with 20260912, and said out loud in the report.

---

:::{note} Where the numbers on this page come from
Every code block on this page was run on the course machine on 19 September 2026, in the order
printed, by `lab/appendix_python_reference_checks.py`, which wrote every result to
`lab/out/appendix_python_reference_checks.json`. The output blocks are copied from that run.

That script also re-checks its own results against the numbers already recorded elsewhere in the
course, and every check passes:

| Number on this page | Checked against |
|---|---|
| 494,032,768 parameters; vocabulary 151,936 | `we3_params_quant.json`, `we2_softmax.json` |
| Prompt ids `[785, 6722, 315, 9625, 374]`; logit 17.2173; 30.219 percent | `we2_softmax.json` |
| The five temperature rows, 96.799 down to 2.447 percent | `we2_softmax.json` |
| `['B', 'akers', 'field']`; seven digits, seven tokens | `_research/00-lab-verified-findings.md` |
| Cosine 0.833, 0.612, 0.084, -0.017; retrieval 0.910 and 0.719 | `we5_embeddings.json` |
| 5 correct out of 20; interval 5.0 to 45.0 percent; Wald 6.0 to 44.0 percent | `we6_eval.json` |
| The letter-bias diagnosis, and 25.0, 35.0, 15.0 percent | `we6b_eval_debiased.json` |
| Ollama returning `'The'` at 99.9993 percent | `_research/00-lab-verified-findings.md`, section 1 |
| Disk sizes: 953 MB, 87 MB, 5,149 MB | measured by `appendix_python_reference_checks.py` |
| All five error messages | induced deliberately by `appendix_python_reference_checks.py` |

Some worked arithmetic on this page uses **made-up inputs**, because small numbers are easier to
check by hand, and each one says so where it appears. They are: the three scores 2, 1 and 0 in
[sections 7 and 8](#pyref-softmax); the two-number vectors $(3,4)$, $(4,3)$, $(-4,3)$ and $(6,8)$
in [sections 11 and 12](#pyref-normalise), whose results are nonetheless recorded in
`we5_embeddings.json`; the probability 0.21 percent in [section 13](#pyref-mcq), which is a real
measured value used as a worked instance; and the nine resampled scores in
[section 14](#pyref-bootstrap). Every other number on this page is a measurement.

The Ollama figure was measured once, on 12 September 2026, and was not re-run for this page. The
page says so at the point of use.

**We never publish a number we did not compute.**
:::

:::{seealso} Related pages
[Math Toolkit](math-toolkit.md) teaches the notation itself, from a letter standing for a number
up to sigma. [Formula sheet](formulas.md) holds every formula in the course, with every symbol
defined. [Glossary](glossary.md) defines the terms in words. [The Shelf](datasets.md) documents
every model and every result file, with the exact repository names. [Cost model](cost-model.md)
holds the resource accounting and its limits. Worked solutions to the practice problems are in
[Answers](answers.md).
:::
