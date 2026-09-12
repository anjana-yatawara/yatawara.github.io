# R Quick Reference

A complete reference of all R functions used in this textbook.

*This reference will be populated as chapters are completed.*

---

## Getting Started

```r
# Install R: https://www.r-project.org
# Install RStudio: https://posit.co/downloads/

# Basic arithmetic
2 + 3        # addition
10 - 4       # subtraction
5 * 6        # multiplication
15 / 4       # division
2^10         # exponentiation
sqrt(25)     # square root
abs(-7)      # absolute value
```

## Vectors and Basic Statistics (Chapter 1)

```r
# Creating vectors
x <- c(4.2, 5.1, 3.8, 6.0, 4.7)

# Descriptive statistics
mean(x)      # sample mean
median(x)    # sample median
var(x)       # sample variance (divides by n-1)
sd(x)        # sample standard deviation
sum(x)       # sum of all elements
length(x)    # number of elements
range(x)     # min and max
sort(x)      # sorted values
summary(x)   # five-number summary + mean
```

## Histograms and Plots (Chapter 1)

```r
# Basic histogram
hist(x)

# Relative frequency histogram
hist(x, freq = FALSE, main = "Title", xlab = "X", col = "steelblue")

# Adding a theoretical curve
curve(dnorm(x, mean = 50, sd = 10), add = TRUE, col = "red", lwd = 2)

# Multiple plots
par(mfrow = c(1, 3))   # 1 row, 3 columns
```

## Combinatorics (Chapter 2)

```r
factorial(n)       # n!
choose(n, r)       # C(n,r) = n choose r
```

## Probability Distributions (Chapters 4–5)

*Distribution functions follow the pattern: `d` = PMF/PDF, `p` = CDF, `q` = quantile, `r` = random generation.*

```r
# Binomial: X ~ Bin(n, p)
dbinom(x, size = n, prob = p)    # P(X = x)
pbinom(x, size = n, prob = p)    # P(X ≤ x)
rbinom(nsim, size = n, prob = p) # random generation

# Poisson: X ~ Pois(λ)
dpois(x, lambda)
ppois(x, lambda)
rpois(nsim, lambda)

# Normal: X ~ N(μ, σ²)
dnorm(x, mean, sd)
pnorm(x, mean, sd)
qnorm(p, mean, sd)    # inverse CDF
rnorm(nsim, mean, sd)

# Exponential: X ~ Exp(λ)
dexp(x, rate)
pexp(x, rate)
rexp(nsim, rate)

# Gamma: X ~ Gamma(α, β)
dgamma(x, shape = alpha, rate = 1/beta)
pgamma(x, shape = alpha, rate = 1/beta)
rgamma(nsim, shape = alpha, rate = 1/beta)

# Beta: X ~ Beta(α, β)
dbeta(x, shape1 = alpha, shape2 = beta)
rbeta(nsim, shape1 = alpha, shape2 = beta)

# Uniform: X ~ Unif(a, b)
dunif(x, min = a, max = b)
runif(nsim, min = a, max = b)

# Geometric: X ~ Geom(p)
dgeom(x, prob = p)     # P(X = x), where X = # failures before 1st success
rgeom(nsim, prob = p)

# Hypergeometric: X ~ Hyper(N, K, n)
dhyper(x, m = K, n = N-K, k = n)
rhyper(nsim, m = K, n = N-K, k = n)

# Negative Binomial: X ~ NegBin(r, p)
dnbinom(x, size = r, prob = p)  # X = # failures before r-th success
rnbinom(nsim, size = r, prob = p)
```

## Simulation (All Chapters)

```r
set.seed(42)           # for reproducibility
replicate(10000, expr) # repeat an expression 10,000 times
sample(x, size, replace = TRUE)  # sample with replacement
```
