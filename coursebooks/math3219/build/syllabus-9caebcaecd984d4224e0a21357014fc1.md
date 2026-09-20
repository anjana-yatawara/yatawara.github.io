---
title: Syllabus
description: "MATH 3219, Inside the Machine. What this course is, what you will do each week, how you are graded, and what you need to bring. Written for students, not for committees."
---

# MATH 3219. Inside the Machine

### The Mathematics of Small Language Models

**3 units · Upper-Division General Education (Area 5: Science) · Theme S: Sustainability and Justice**
**Instructor:** Anjana Yatawara, Department of Mathematics
**Office:** [to be confirmed] · **Email:** ayatawara@csub.edu
**Meetings:** 150 minutes per week
**Prerequisite:** Completion of Area 5, Area 2, and Area 1B

---

## What this course is

You have used a chatbot. This course is about what is happening inside one.

Not as a metaphor, and not as a slideshow. You will download a real language model onto a real
computer, run it, and then take it apart with arithmetic you can do on a phone calculator. By
the end of the semester you will be able to say, with numbers you produced yourself, what a
language model is doing when it picks the next word, why a smaller one is cheaper to run, and
how much you should trust any claim about how well one performs.

There is a second question running underneath the first one, every single week: **what did that
cost?** Not in dollars. In energy, in memory, and in who can afford to run it at all. Those two
questions, *does it work* and *what did it cost*, are the spine of the course.

## What this course is not

It is not a course about using AI tools well. It is not a course about whether AI is good or
bad. It is not a programming course.

It is a mathematics course. The models are the reason the mathematics is interesting.

---

## Three things you might be worried about

**"I am not a math person."**
This course assumes you have forgotten algebra. Not that you never learned it. That you have
forgotten it, which is the normal condition of an adult who last saw it years ago. Every
formula in this course is introduced with a plain-English sentence first, then a table defining
every single symbol including the ones you think you should already know, then a worked example
with every step written out. There is a Math Toolkit appendix that starts from "what does it
mean when a letter stands for a number" and builds from there. Nothing is skipped and nothing
is assumed.

**"I have never written code."**
Good. The code in this course is deliberately plain. No clever tricks, no shortcuts, every line
commented. You will copy code, change one number, and see what happens. That is the whole
skill. Most weeks you will change fewer than five characters.

**"I do not have a powerful computer."**
Every lab in this course runs on an ordinary laptop, and if your laptop cannot manage it, it
runs on a department machine or the campus JupyterHub. The smallest model we use is under a
gigabyte. There is nothing to buy: no textbook, no software licence, no subscription, no
per-question charges. The coursebook is free and open, online, forever.

---

## What you will actually do

Each week has the same shape. **Run something real, watch what happens, work out why, then
count the cost.**

A few concrete examples of what "run something real" means here:

- You will type the words *The capital of France is* into a model and look at the raw scores it
  assigns to all 151,936 words it knows. The top answer is *Paris*. The **second** answer is a
  fill-in-the-blank line, because the model has seen that sentence on worksheets. You will be
  able to explain why.
- You will take one number out of a model file, round it to fewer digits, and measure exactly
  how much you broke. Then you will find out why the obvious way of doing that is wrong, and
  fix it.
- You will give a model a twenty-question statistics quiz, score it three different but equally
  defensible ways, and get three different answers: 25%, 35%, and 15%. Then you will work out
  which one, if any, you should believe.
- You will measure how much electricity a sentence costs.

---

## The fifteen weeks

| Wk | What we do | What you learn | Due |
|---|---|---|---|
| 1 | Run a model for the first time | Where it runs, what a model file is, the two measuring sticks | Lab 0 assigned |
| 2 | Turn words into numbers | Tokens. Why *Bakersfield* becomes three pieces and every digit is its own token | Concept Check 1 · Lab 0 |
| 3 | Open the model file | What a parameter is. Where half a billion numbers actually live | Concept Check 2 |
| 4 | **Watch it choose a word** ★ | Softmax: turning scores into percentages that add to 100 | Concept Check 3 |
| 5 | **Turn the temperature knob** ★ | What temperature really does, and the popular claim about it that is false | Concept Check 4 |
| 6 | Count the bits | Rounding, precision, and why a one-gigabyte model is one gigabyte | Concept Check 5 · Lab 1 assigned |
| 7 | **Shrink a model** ★ | Quantization. The obvious method fails; here is why, and what fixes it. Then: energy and access | Concept Check 6 · Theme S essay assigned |
| 8 | Turn a sentence into an arrow | Vectors, lengths, dot products | Concept Check 7 · Lab 1 |
| 9 | **Measure meaning** ★ | Cosine similarity, and why we divide by both lengths | Concept Check 8 |
| 10 | Give the model an open book | Retrieval. Also: three attempts, two of which failed | Concept Check 9 · Lab 2 assigned |
| 11 | Give the model a test | Accuracy as a proportion. Does a bigger model do better? | Concept Check 10 · Lab 2 · Lab 3 assigned · Theme S essay |
| 12 | **Ask whether the score is real** ★ | Sampling variability, the bootstrap, and a formula that gives an impossible answer | Concept Check 11 · Lab 3 |
| 13 | **Measure your measurement** ★★ | Three ways to score one quiz, three answers. The most important week | Concept Check 12 · Lab 4 assigned |
| 14 | Look underneath the average | Subgroup performance, noise, and who pays for compute | Concept Check 13 |
| 15 | Capstone | Your own honest evaluation, presented | Concept Check 14 · Lab 4 · Capstone |

★ marks a keystone week. ★★ marks the week the whole course is built around.

---

## How you are graded

There is **no final exam.** The course is graded on what you make and how honestly you
interpret it. Interpretation is worth as much as computation.

| What | Points | % |
|---|---|---|
| Weekly concept checks (14 × 10) | 140 | 14% |
| Lab 0, first run and cost baseline | 60 | 6% |
| Lab 1, quantization: size, speed, quality, energy | 140 | 14% |
| Lab 2, retrieval on a Kern County corpus | 100 | 10% |
| Lab 3, benchmark a model, report accuracy with an interval | 120 | 12% |
| Lab 4, subgroup bias and distributional cost of compute | 140 | 14% |
| Theme S essay | 100 | 10% |
| Capstone project and presentation | 200 | 20% |
| **Total** | **1000** | **100%** |

**Grade scale.** A 900 and above, B 800 to 899, C 700 to 799, D 600 to 699, F below 600. Plus and minus grades
are assigned at the standard thirds within each band.

### The one rule that surprises people

**A result reported without its uncertainty loses points.** Every time. If you tell me a model
scored 80%, I will ask you 80% plus or minus what, and if you cannot answer, the number is not
finished. This is not pedantry. It is the single most useful habit this course can give you,
and by Week 12 you will know exactly how to produce that second number.

---

## What you need

**Required: nothing you have to buy.**

- The coursebook is free and online: [yatawara.com/coursebooks/math3219](https://www.yatawara.com/coursebooks/math3219/).
  Licensed CC-BY-SA-4.0, code MIT. It is yours to keep after the course ends.
- All software is free and open source.
- All model files are free to download.

**Helpful but not required:** a laptop you can install software on. If you do not have one, say
so in Week 1 and you will be set up on a department machine. This is a normal request and it
will not be treated as a problem.

---

## Artificial intelligence policy

You are studying language models. It would be strange to forbid you from using them.

**You may use AI tools** to help you understand a concept, debug code, or improve your writing.

**You must disclose it.** Every lab and the capstone has a short disclosure box: which tool,
what you asked it, what you did with the answer. Filling it in honestly costs you nothing.

**What is never acceptable** is reporting a number you did not compute. If a model tells you an
accuracy, a joule count, or a confidence interval and you put it in a lab report without running
the code yourself, that is fabricated data, and it is treated as academic dishonesty rather than
as a citation problem.

This is the same rule the coursebook holds itself to. Every number printed in it was computed by
a script you can open and re-run. **We never publish a number we did not compute.** You are held
to the standard the book is held to.

---

## Coming to class

Attendance carries no points. It is still the difference between passing and not.

The measurement sessions in Weeks 1, 7, 9, and 13 are done together, in class, on real machines,
and they are genuinely hard to reconstruct alone from notes. If you have to miss one, email me
and we will find another time.

**If you fall behind, tell me early.** The most common way to fail this course is to miss Week 4
or 5, decide you are lost, and stop coming. Softmax is the hinge of the whole course and it takes
most people two passes. That is normal. Come to office hours and we will do it again.

---

## Support

- **Office hours:** [to be confirmed], and by appointment. Appointments are easy to get.
- **Accessibility:** Students with disabilities needing accommodation should contact Services
  for Students with Disabilities, Student Services Building, and bring me the letter. I will
  implement whatever it says, without discussion and without you having to explain anything.
- **Academic integrity:** CSUB's policy applies. The specific application in this course is the
  fabricated-data rule above.
- **Basic needs:** If you are hungry, without stable housing, or in financial difficulty, the
  CSUB Food Pantry and the Dean of Students office can help. Tell me and I will help you find
  them. It will not affect how your work is assessed.

---

## Where the course came from

The hands-on structure of this course is adapted from **Eric Van Dusen's `Small_Models_SP26`**
teaching materials (UC Berkeley Data Science Modules, BSD 3-Clause, © 2026), presented at the
2026 NAIRR Annual Meeting. The mathematical and statistical spine, the module structure, the
worked examples, the assessment design, and the sustainability framing are original to this
course.

One of his rules for writing teaching materials became one of ours, and it is worth stating
where students can see it:

> "Explain as if the reader has never seen a concept before. Define every technical term the
> first time it appears. Never assume context. Never say 'as you know' or 'recall that.'"

If you ever find a place in the coursebook where we broke that rule, tell me. It is a bug, and
I will fix it.
