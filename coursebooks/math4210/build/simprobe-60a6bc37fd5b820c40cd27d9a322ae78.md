---
title: "Sim mechanism probe"
---

# Probe

## A. Native iframe directive, relative src

```{iframe} ./sims/probe.html
:width: 100%
Caption A.
```

## B. Raw HTML iframe in markdown body

<iframe src="./sims/probe.html" width="100%" height="300" title="B"></iframe>

## C. raw html block

```{raw} html
<iframe src="./sims/probe.html" width="100%" height="300" title="C"></iframe>
```

## D. div with class hook

:::{div}
:class: sim-embed
<iframe src="./sims/probe.html" title="D"></iframe>
:::
