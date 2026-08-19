---
title: "R Help — A Gentle Guide for MATH 1209"
short_title: "Welcome"
---

# R Help — A Gentle Guide for MATH 1209

*A companion to **Statistics in the Modern World** at CSU Bakersfield.*

:::{admonition} Getting started — nothing to install
:class: tip
Use the **CSUB JupyterHub** at **<https://csub.jupyter.cal-icor.org/>** — log in with
your CSUB account and R is ready in your browser, with `mosaic` and `BSDA` already
installed. See [Lesson 2](./L02.md) for details.
:::

## Who this book is for

You have never written a line of code. That is completely normal, and this book
assumes exactly that. Maybe you are a business major, a nursing major, a kinesiology
major, or you just needed a GE math course that fit your schedule — the statistics is
the point of MATH 1209, not the software. This little book exists because your
instructor wants to show you the same statistics you're learning by hand and by
calculator, running in a free, real tool that people use in jobs after college.

:::{admonition} You can pass MATH 1209 with a calculator alone
:class: important
Nothing in this book is required to pass the course. Every method you learn is taught
first with the TI-83/84 calculator. R shows up as a **bonus**: a way to *see the same
answer* come out of a different tool, and a small head start on a skill that shows up
in a lot of careers — data, health records, business analytics, research, government.
If your instructor assigns an R activity, this book is where you look things up.
:::

## How to use this book

The 12 lessons build on each other, so read them roughly in order the first time —
after that, treat it like a reference and jump straight to the lesson you need.

| # | Lesson | What you'll be able to do |
|---|---|---|
| 1 | [What is R, and why use it?](./L01.md) | Explain what R is and why this course uses it |
| 2 | [Installing R & RStudio, and CSUB JupyterHub](./L02.md) | Get R running on your own computer, or skip installing anything |
| 3 | [Running R: notebooks, the console, scripts](./L03.md) | Pick the right way to run a line of R for the situation you're in |
| 4 | [R basics: objects, vectors, functions, help](./L04.md) | Store values, build a list of numbers, call a function, read an error |
| 5 | [Packages: install & library; our toolkit](./L05.md) | Turn on the `mosaic` and `BSDA` tools this course uses |
| 6 | [Importing data](./L06.md) | Load a built-in dataset, a CSV file, or data from the internet |
| 7 | [Exploring data (EDA) in R](./L07.md) | Summarize and visualize data with `favstats()`, `tally()`, and `gf_` plots |
| 8 | [Probability & the Normal model](./L08.md) | Find Normal and binomial probabilities and simulate chance in R |
| 9 | [Confidence intervals & tests](./L09.md) | Run and read the output of `prop.test()`, `t.test()`, and the summary tests |
| 10 | [Making good graphs](./L10.md) | Build clear, colorblind-safe, accessible graphs and write good alt text |
| 11 | [Reproducibility & good habits](./L11.md) | Write scripts that run start-to-finish and reproduce with `set.seed()` |
| 12 | [Fixing common errors](./L12.md) | Recognize and fix the most common R error messages |

Each lesson follows the same shape: a plain-language idea, small examples you can
copy and run yourself, and real R output — every result printed in this book was
actually run in R, not typed in by hand, so what you see here is what you'll see on
your own screen.

## What you need

- **Nothing, to start.** You can do every example in this book using the **CSUB
  JupyterHub** in a browser — no installation (see [Lesson 2](./L02.md)).
- If you'd rather work on your own laptop, Lesson 2 also walks through installing
  R and RStudio on Windows or Mac, free.
- This book uses only two R packages all semester: **`mosaic`** and **`BSDA`**
  (Lesson 5). You never need anything beyond those two for MATH 1209.

## The voice of this book

Short sentences. Every new word explained the moment it shows up. Lots of tiny
examples instead of one long one. If a line of code in this book produces output,
that output is shown right underneath it, exactly as R printed it.

:::{admonition} Accessibility
:class: note
This book is built to **WCAG 2.1 AA**. Headings are structured for screen readers,
color is never the only way information is shown, and code and its output are in
real text (not screenshots) so you can copy, paste, resize, and read it with any
assistive tool. Need another format? Ask your instructor.
:::

*This is a free, openly licensed book (CC BY-SA 4.0 for the text; MIT for the code
examples). You never have to buy anything to use it.*
