---
title: "Appendix H: Answers to Odd-Numbered Practice Problems"
subtitle: "MATH 4210 -- short final answers, chapter by chapter"
---

(appendix-h)=
# Appendix H: Answers to Odd-Numbered Practice Problems

## How to use these answers

Each chapter ends with 25 to 30 practice problems in three bands: (A) concepts, (B) theory (derivations and proofs), and (C) data analysis with R and/or Python. This appendix gives the short final answer to every odd-numbered problem, chapter by chapter. Numbering is positional: "Chapter 3, problem 7" means the seventh problem in Chapter 3's own practice-problem list, not a book-wide running count.

These are compact answers, not full derivations: enough to check your work, not a substitute for doing the problem. A (B) entry gives the key algebraic step and the final result, not every line; a (C) entry gives the headline number, not the full code. Even-numbered problems and complete worked solutions to every problem are kept in the instructor materials, not in this student-facing book.

## Numbering convention

Within a chapter, problems are numbered straight through its three bands (Band A first, then B, then C), so odd numbers land in every band depending on how many problems precede them. Each entry below is tagged with its band letter so you can see at a glance what kind of problem it was.

## Chapter 1 -- Regression as a Way of Thinking

**1. (A)** Regression studies how a response depends on one or more predictors, fitting a rule for the expected response at each predictor setting while treating the leftover scatter as noise rather than pretending the relationship is exact.

**3. (A)** (a) description (a slope summarizing an existing pattern); (b) causal reasoning (an intervention on price); (c) prediction (a future outcome from a fitted rule).

**5. (A)** Y = f(X) + epsilon: f(X) is the systematic signal (the mean response the predictor explains), epsilon is the random noise (everything else pushing an observation off that mean).

**7. (A)** Cases picked for being extreme on one imperfectly correlated measurement tend to be less extreme on a second, since part of the extreme was luck that does not repeat; e.g., a rave first review followed by a merely good second visit.

**9. (A)** A raw gap blends sex with every other variable differing between the groups; rank is a confounder because higher ranks pay more and the sexes may have different rank mixes, so part of the gap reflects rank, not equal-work pay.

**11. (A)** Observational data is watched without intervening (predictors and confounders tangled); experimental data is created by intervening, and random assignment balances all confounders on average, letting a response difference be attributed to the treatment.

**13. (A)** Example: fire-truck count correlates with fire damage, but the lurking variable is fire severity, which drives both; sending fewer trucks would not reduce damage.

**15. (A)** A neural network's final step is an ordinary linear or logistic regression on learned features, the same b0 + b1 x1 + ... taught in Chapter 2, so regression sits literally inside the machine.

**17. (A)** What is the response and predictors? Observational or experimental? What assumptions must hold and do they? Is the prediction inside the data range or an extrapolation? Was it validated on held-out data? (any four).

**19. (A)** ASK (question and data), EXPLORE (plots and summaries), FIT (estimate the model), CHECK (diagnostics and assumptions), USE (interpret, predict, decide, communicate).

**21. (A)** The confidence interval estimates the average response at a given X and is narrow; the prediction interval must also cover a single new case's own error epsilon and so is wider. In the Toluca figure the inner band is the confidence band, the outer the prediction band.

**23. (A)** R is the primary/required language and every example uses it, while Python is what much of industry uses after graduation; and seeing the same analysis twice makes the concept, not the syntax, the memorable part.

**25. (C)** The fitted slope is 0.637, below 1, so a mid-parent inch above average predicts a child only about two-thirds of an inch above average: regression to the mean.

**27. (C)** All four sets share mean_x = 9, var_x = 11, mean_y = 7.5, r = 0.82, and the line y = 3 + 0.5x, yet set 1 is a genuine line, set 2 a curve, set 3 a line tilted by one outlier, and set 4 has its slope set by a single far-off point.

## Chapter 2 -- Simple Linear Regression

**1. (A)** Y_i = beta_0 + beta_1 X_i + epsilon_i; errors have mean 0 (right on average), constant variance sigma^2 (equal spread), and are uncorrelated (independent luck).

**3. (A)** About 3.57 more work hours per additional unit of lot size, over the observed range; predicting at 500 units is extrapolation far outside the data (20 to 120), so it is unjustified.

**5. (A)** A lot size of zero is far below the smallest observed lot (20), so the intercept is an extrapolation, not a real setup time; an intercept is interpretable only when X = 0 is inside or near the data.

**7. (A)** No: the second normal equation forces sum X_i e_i = 0 for the least-squares line, so a value of 120 means the coefficients are not the least-squares estimates.

**9. (B)** Setting the two partial derivatives to zero gives the normal equations sum(Y_i - b_0 - b_1 X_i) = 0 and sum X_i(Y_i - b_0 - b_1 X_i) = 0, solved by b_1 = S_xy/S_xx and b_0 = Ybar - b_1 Xbar.

**11. (B)** At X = Xbar the line gives b_0 + b_1 Xbar = Ybar, so it passes through (Xbar, Ybar); and sum hat Y_i = sum Y_i - sum e_i = sum Y_i since sum e_i = 0.

**13. (B)** Writing b_0 = sum m_i Y_i with m_i = 1/n - Xbar k_i gives Var{b_0} = sigma^2 sum m_i^2 = sigma^2 (1/n + Xbar^2 / S_xx).

**15. (B)** Using SSE = S_yy - b_1^2 S_xx and taking expectations, E{SSE} = (n-1)sigma^2 + beta_1^2 S_xx - (sigma^2 + beta_1^2 S_xx) = (n-2)sigma^2.

**17. (B)** E{SSE/n} = (n-2)sigma^2/n, so the bias is -2 sigma^2 / n (negative: the MLE understates sigma^2); it vanishes as n grows.

**19. (B)** E{Ybar/Xbar} = beta_1 + beta_0/Xbar, biased unless beta_0 = 0; the estimator wrongly imposes a line through the origin.

**21. (C)** sum e_i = 0, sum X_i e_i = 0, and sum hat Y_i = 7807 = sum Y_i (Python prints -0.0 for the first two).

**23. (C)** Predictions 205.2 (X = 40), 348.0 (X = 80), 490.8 (X = 120) hours; 40 and 80 are interpolation, 120 is the upper boundary of the data.

**25. (C)** The 2000 simulated intercepts average near beta_0 = 62.37 (unbiased) with standard deviation about 26.5, matching the formula s{b_0} = 26.18.

**27. (C)** Reverse slope S_xy/S_yy = 0.230, not the reciprocal 1/3.5702 = 0.280; the two regressions minimize different (vertical vs horizontal) gaps and their slopes multiply to r^2, so they are reciprocals only when the fit is perfect.

## Chapter 3 -- Inference for Simple Linear Regression

**1. (A)** A confidence interval is for the mean response E{Y_h} (an average over many cases); a prediction interval is for a single new observation and is wider because it also covers that case's own error sigma^2.

**3. (A)** The mean-response variance carries a (X_h - Xbar)^2/Sxx term that is zero at Xbar and grows with distance, so the interval is narrowest at Xbar and widens on both sides.

**5. (A)** A high R^2 can accompany a curved or misspecified model (only residual plots reveal it), and R^2 says nothing about assumptions or causation; so R^2 = 0.82 does not prove the model correct.

**7. (A)** F* = (t*)^2, so the two tests give identical p-values; report the t test because it keeps the sign (direction) of the slope.

**9. (B)** b_1 is a linear combination of independent normals, so Z = (b_1 - beta_1)/(sigma/sqrt(Sxx)) ~ N(0,1); SSE/sigma^2 ~ chi^2_{n-2} independent of b_1 (Chapter 7); their ratio is by definition t_{n-2}.

**11. (B)** Prediction error Y_new - hat Y_h has variance Var{eps_new} + Var{hat Y_h} = sigma^2(1 + 1/n + (X_h-Xbar)^2/Sxx); the leading 1 is the new run's own scatter, and eps_new is independent of the past-data fit.

**13. (B)** SSR = b_1^2 Sxx so F* = b_1^2 Sxx/MSE; and (t*)^2 = b_1^2/(MSE/Sxx) = b_1^2 Sxx/MSE; the two are identical.

**15. (B)** Both the rejection condition and the interval-excludes-zero condition reduce to |b_1| > t s{b_1}, so the 95% CI excludes 0 exactly when the two-sided test rejects at 5%.

**17. (B)** A whole-line band must hold for all X_h at once, a stronger claim, so W = sqrt(2 F(1-alpha;2,n-2)) > t; the extra width buys simultaneous 95% coverage of the entire line.

**19. (C)** Fitting hours ~ lotsize reproduces slope t = 10.29, p = 4.45e-10, and 95% CI (2.852, 4.288).

**21. (C)** At X_h = 50, mean CI (216.09, 265.66) width 49.6, prediction PI (136.88, 344.87) width 208.0; the width ratio is about 4.2, equal to s{pred}/s{hat Y_h} = 50.27/11.98.

**23. (C)** sales ~ TV has slope 0.0475 (t = 17.67, tiny p); at TV = 200 the 95% prediction interval for a new market is about (10.09, 22.99) thousand units, centered at 16.54.

**25. (C)** W = 2.6162, t = 2.0687; at X_h = 120 the pointwise half-width is 41.18 and the Working-Hotelling half-width is 52.08, a ratio of 1.265 = W/t.

**27. (B)** The big F (105.9) says the slope is far from zero; prediction accuracy is set by s = 48.8 and the prediction interval (about +/- 105 hours at 100 units), a different quantity, so a large F does not imply precise individual forecasts.

## Chapter 4 -- Correlation

**1. (A)** The sign gives the direction of association (positive = same way, negative = opposite); the magnitude gives how tightly points hug a line (near 1 tight, near 0 shapeless). r is unitless because dividing the covariance by both standard deviations cancels the units.

**3. (A)** Negative and moderate: countries with more young dependents tend to save less, but the scatter is wide; r^2 = 0.21, so youth share accounts for about 21 percent of the variation in savings rates.

**5. (A)** Did I plot it (nonlinearity)? Could one or two points be driving it (outliers)? Over what range of X (restriction of range)? Individuals or group averages (ecological correlation)?

**7. (A)** Cases that are extreme on one imperfectly correlated measurement tend to be less extreme on a second, drifting toward the mean because part of the extreme was luck; e.g., a sophomore slump after a standout debut.

**9. (B)** From 0 <= sum(u_i +/- v_i)^2 = 2(n-1)(1 -/+ r) for standardized u, v, get -1 <= r <= 1; equality holds iff v_i = +/- u_i for all i, meaning the points lie exactly on a straight line (r = +/-1).

**11. (B)** SSR = b1^2 Sxx = Sxy^2/Sxx, so R^2 = SSR/SSTO = Sxy^2/(Sxx Syy) = r^2.

**13. (B)** Substituting SSE = Syy(1 - r^2) and b1 sqrt(Sxx) = r sqrt(Syy) into b1/s{b1} cancels Syy and gives t* = r sqrt(n-2)/sqrt(1 - r^2), the slope t statistic.

**15. (B)** The conditional mean is mu_Y + rho (sigma_Y/sigma_X)(x - mu_X), so the population slope is rho sigma_Y/sigma_X; the conditional variance sigma_Y^2 (1 - rho^2) leaves the fraction 1 - rho^2 of Y's variance.

**17. (B)** z = arctanh(0.6) = 0.6931, se = 1/sqrt(16) = 0.25, z-interval (0.2031, 1.1831); back-transformed 95% CI for rho is (0.200, 0.828).

**19. (C)** Strongest positive r(pop75, dpi) = 0.79 (older countries are richer); strongest negative r(pop15, pop75) = -0.91 (a large young share leaves a small old share); r(sr, pop15) = -0.46 is the strongest with sr.

**21. (C)** For sr on dpi: r = 0.220, b1 = 0.000996 = r s_y/s_x, and r^2 = R^2 = 0.0486; income explains under 5 percent of the variation in savings rate.

**23. (C)** All four Anscombe sets share mean_x = 9, mean_y = 7.5, r = 0.816, and the line y = 3 + 0.5x, but the plots differ: a genuine line, a smooth curve, an outlier-tilted line, and a single leverage point creating the slope.

**25. (C)** The standardized slope equals r = 0.32; a child whose midparent height is 3 SD above the mean is predicted only 0.32 x 3 = 0.96 SD above, pulled toward the mean (regression to the mean).

**27. (C)** Individual-level r = 0.32 but family-average r = 0.40; aggregation cancels within-family scatter and raises the correlation, so reading the family number as individual prediction is the ecological fallacy.

## Chapter 5 -- Randomization and Bootstrap Inference for Regression

**1. (A)** A permutation test asks whether there is any association (a p-value); a bootstrap asks how precise the estimate is (a standard error or interval). The bootstrap resamples with replacement.

**3. (A)** H0: X and Y are unrelated, beta_1 = 0; Ha: X and Y are related, beta_1 != 0 (two-sided).

**5. (A)** p = (0+1)/(4999+1) = 1/5000 = 0.0002, which is also the smallest p-value this run could give.

**7. (A)** Basic interval = (2*2.2 - 2.9, 2*2.2 - 1.1) = (1.5, 3.3).

**9. (A)** The slope depends only on how X and Y values are paired, not on which column is reordered, so shuffling Y, shuffling X, or shuffling both give the same set of random pairings and the same permutation distribution.

**11. (B)** From P(q_lo <= b1* <= q_hi) = 1-alpha, subtract b1, swap b1*-b1 for b1-beta1 (bootstrap principle), then solve for beta1 (subtract b1, negate, which swaps endpoints) to get (2b1 - q_hi, 2b1 - q_lo).

**13. (B)** The observed arrangement gives b1^pi = b1, satisfying |b1^pi| >= |b1| with equality, so it is always counted; hence the numerator is at least 1 and p_exact >= 1/n!.

**15. (B)** Monte Carlo error scales like 1/sqrt(B), so halving it (doubling accuracy) requires B to quadruple; tail endpoints are quantiles from the sparse tail and follow the same rule.

**17. (C)** M = 4 (R) or 5 (Python) of 5000; p_perm about 0.0010 (R) or 0.0012 (Python), close to the classical t p-value 0.00127.

**19. (C)** The largest reshuffled slope in size is about 2.77, below the observed 3.5702, so M = 0 and p_perm = 1/5001 ~ 0.0002; it cannot go lower because 1/(B+1) is the floor.

**21. (C)** Percentile (0.416, 1.388), basic (0.416, 1.388), classical t (0.440, 1.364); all overlap and exclude zero, with the bootstrap intervals slightly wider.

**23. (C)** Case-bootstrap SE about 0.377 vs classical 0.347, roughly 8.6 percent larger; the two agree within about ten percent.

**25. (C)** At B = 50000 the p-value is about 0.0011, essentially unchanged from the B = 5000 value; ten times the work only slightly reduces Monte Carlo noise (which shrinks like 1/sqrt(B)).

**27. (C)** b1 +/- 1.96*s_boot = 0.902 +/- 1.96(0.2485) = (0.415, 1.389), very close to the percentile interval; they diverge when the bootstrap distribution is skewed or heavy-tailed.

## Chapter 6 -- Matrix Algebra for Regression

**1. (A)** X is 21x3 (design matrix), X' is 3x21 (transpose), X'X is 3x3 (cross-product matrix), X'Y is 3x1 (cross-product vector), b is 3x1 (coefficients), H is 21x21 (hat/projection matrix).

**3. (A)** Multiplication needs the left matrix's columns to equal the right matrix's rows. XX is 21x3 times 21x3 (inner 3 vs 21) so undefined; X'X is 3x21 times 21x3 (inner 21=21) so defined, giving a 3x3 matrix.

**5. (A)** Idempotent means PP = P; symmetric means A' = A. The hat matrix H has both properties, so it is a projection matrix.

**7. (A)** Linearly dependent columns mean one predictor column is an exact linear combination of the others; then X'X is singular (no inverse) and there is no unique least-squares fit.

**9. (B)** (X'X)' = X'(X')' = X'X by the order-reversing transpose rule, so X'X equals its own transpose and is symmetric.

**11. (B)** Left-multiply both sides by (X'X)^{-1}: b = (X'X)^{-1}X'Y. The step requires X to have full column rank so that (X'X)^{-1} exists.

**13. (B)** HX = X(X'X)^{-1}X'X = X. The columns of X already lie in the column space of X, so projecting them onto that space leaves them unchanged.

**15. (B)** Cov{AW} = E{A(W-mu)(W-mu)'A'} = A E{(W-mu)(W-mu)'} A' = A Cov{W} A', since A is constant and passes outside the expectation.

**17. (B)** SSE = Y'(I-H)Y = Y'(I-H)'(I-H)Y = e'e = sum of e_i^2, a sum of squares, hence nonnegative.

**19. (B)** Cov{Yhat} = H(sigma^2 I)H' = sigma^2 H; Cov{e} = (I-H)(sigma^2 I)(I-H)' = sigma^2 (I-H), using symmetry and idempotency of H and I-H.

**21. (C)** b = (-68.86, 1.4546, 9.3655), identical to lm and statsmodels; (X'X)^{-1}(X'X) returns the 3x3 identity.

**23. (C)** X'e = (0, 0, 0) to within floating-point error, and sum e_i = 0, because the residuals are orthogonal to every column of X including the ones column.

**25. (C)** Standard errors 60.02, 0.2118, 4.064 (matching the software summary); the estimated covariance between the two slope estimates is -0.6724.

**27. (C)** The augmented X is rank deficient, so R's solve() reports a computationally singular system (or numpy returns a huge, unstable inverse) and the determinant is essentially zero: no unique least-squares solution exists.

**29. (C)** Simulating 5000 refits gives column means near beta (about -68.26, 1.457, 9.324) and a sample covariance near sigma^2 (X'X)^{-1}, confirming b is unbiased and multivariate normal; this normal law, with sigma^2 replaced by MSE, is what turns each coefficient into a t ratio for Chapter 7's intervals and tests.

## Chapter 7 -- The General Linear Model

**1. (A)** Y is 21x1, X is 21x3, beta is 3x1, epsilon is 21x1; the first column of X is all ones for the intercept.

**3. (A)** Errors average to zero; the diagonal sigma^2 says each error has the same variance, the zero off-diagonal says distinct errors are uncorrelated.

**5. (A)** H is symmetric (a projection), idempotent (projecting twice = once), and has trace p (dimension of the column space).

**7. (A)** Wrong: Gauss-Markov needs only E{eps}=0, constant variance, and uncorrelated errors, no normality; b is BLUE with or without normality.

**9. (B)** Gradient -2X'Y + 2X'Xb = 0 gives X'Xb = X'Y, so b = (X'X)^-1 X'Y; the Hessian 2X'X is positive definite, so it is a minimum.

**11. (B)** H' = X(X'X)^-1 X' = H; HH = H by cancelling X'X with its inverse; I - H inherits both properties by direct expansion.

**13. (B)** HX = X(X'X)^-1 X'X = X, so (I - H)X = X - X = 0; the columns of X already lie in the column space, so projecting leaves them fixed.

**15. (B)** E{Y'AY} = tr(A Sigma) + mu'A mu; with A = I - H, mu = X beta, Sigma = sigma^2 I gives E{SSE} = (n - p) sigma^2 since (I-H)X = 0.

**17. (B)** det(X'X) = n Sxx; inverting the 2x2 and multiplying by X'Y yields b1 = Sxy/Sxx and b0 = Ybar - b1 Xbar.

**19. (B)** Cov{e, Yhat} = (I-H) sigma^2 I H' = sigma^2 (I-H)H = 0; residuals are uncorrelated with fitted values, so residual-vs-fitted plots show no built-in trend.

**21. (C)** b = (-68.857, 1.4546, 9.3655), matching lm and smf.ols to all printed digits.

**23. (C)** H is symmetric, idempotent, trace 3; the largest h_ii belong to the high-leverage cities with the most extreme predictor combinations.

**25. (C)** Standard errors 60.02, 0.2118, 4.064; the two slope estimates have correlation about -0.78 from the off-diagonal of the covariance matrix.

**27. (C)** Simulated coefficient means land on (-68.86, 1.4546, 9.3655); the target-population slope has simulated SD about 0.21, matching Cov{b}.

## Chapter 8 -- Multiple Regression in Practice

**1. (A)** Holding income fixed, 1,000 more young residents (one unit of targtpop) predicts about $1.4546k more annual sales.

**3. (A)** The extra variation in Y explained by adding X2 to a model already containing X1, SSE(X1) - SSE(X1,X2); never negative because a larger column space cannot increase SSE.

**5. (A)** R^2 = 1 - SSE/SSTO; adding a predictor cannot raise SSE and SSTO is fixed, so R^2 cannot fall.

**7. (A)** Horizontal axis: the target predictor with the other predictors removed; vertical axis: Y with the other predictors removed. Raw variables would re-mix the confounding the plot exists to strip out.

**9. (A)** Correlated predictors form a tilted cloud, so a point can lie within each predictor's range yet outside the joint region where they occur together.

**11. (B)** Least squares projects Y onto the column space; the reduced space is a subspace of the full space, so the full projection is at least as close, giving SSE(full) <= SSE(reduced).

**13. (B)** SSE(R) = SSE(F) + ||Yhat_F - Yhat_R||^2 by Pythagoras, since the full residual is orthogonal to the extra-fit vector (which lies in the full column space).

**15. (B)** Writing e_Y = b_k e_X + e with e orthogonal to e_X, the slope of e_Y on e_X is b_k (Frisch-Waugh).

**17. (B)** b_k* = b_k (s_Xk / s_Y).

**19. (B)** For the intercept-only reduced model SSE(R) = SSTO, so the numerator SS is SSR with q = p-1 and F* = MSR/MSE; Dwaine F = 99.1.

**21. (C)** SSR(thigh|triceps) = 33.17 but SSR(thigh) = 381.97; they differ because triceps and thigh are strongly correlated, so once triceps is in, thigh adds little.

**23. (C)** Dropping ddpi gives extra SS 63.05 and F* = 4.36, equal to t^2 = 2.088^2 = 4.36.

**25. (C)** R^2 rises from 0.338 to 0.398 on three noise columns (it always rises); adjusted R^2 stays near 0.28-0.30, so adjusted R^2 is the sensible measure.

**27. (C)** Predict 190.08 at (75,16) and 181.90 at the sample means; trust the means prediction, distrust (75,16) as a hidden extrapolation outside the joint cloud.

**29. (B)** SSR(X2|X1) >= 0 guarantees only that in-sample SSE and R^2 do not worsen; adjusted R^2 and out-of-sample prediction can still get worse from overfitting.

## Chapter 9 -- Model Diagnostics

**1. (A)** Leverage value = unusualness of predictors; outlier = large residual; influential point = removal changes the fit. A large leverage value combined with a large residual makes influence.

**3. (A)** Because Var{e_i} = sigma^2(1 - h_ii): a high-leverage point shrinks its raw residual's variance, so the point sits close to its own fitted value.

**5. (A)** s_(i) is computed without case i, so an outlier cannot inflate the denominator and mask itself; this also makes t_i an exact t(n - p - 1) ratio.

**7. (A)** It discards real data (biasing estimates and understating uncertainty) and |t_i|>2 flags about 5% of clean points by chance, causing a deletion cascade.

**9. (A)** Dropping Libya moves the ddpi slope by about one standard error (upward): a single country's worth of instability in that estimate.

**11. (B)** h_ii = (S_xx + n(X_i - Xbar)^2)/(n S_xx) = 1/n + (X_i - Xbar)^2/S_xx.

**13. (B)** Multiplying (A - uu') by the stated inverse and collecting the uu'A^{-1} terms with coefficient 1/(1-gamma) - 1 - gamma/(1-gamma) = 0 leaves I.

**15. (B)** d_i = e_i + h_ii e_i/(1-h_ii) = e_i/(1-h_ii); since the deleted prediction omits Y_i, Var{d_i} = sigma^2/(1-h_ii).

**17. (B)** MSPE uses only replicate spread, so E{MSPE}=sigma^2 always; MSLF picks up (mu_j - line)^2 when the means are nonlinear. Full model: cell means; reduced model: the line.

**19. (B)** rho-hat = 1 - D/2 = 1 - 0.335 = 0.665; strong positive autocorrelation, so errors persist in runs and ordinary standard errors are too small.

**21. (C)** United States h ~ 0.33 with a small residual (all four scales stay small); Japan h ~ 0.22 with studentized values growing relative to semistudentized. Studentizing matters most at high-leverage points.

**23. (C)** Isabela's Cook's distance is 68.076, matching (r_i^2/p) h_ii/(1-h_ii); it dominates the index plot.

**25. (C)** Savings plots (residual-vs-fitted formless, near-linear QQ, flat scale-location) plus BP p=0.29 and Shapiro p=0.85 show the assumptions are acceptable.

**27. (C)** SSPE = 37580.83, SSLF = 17244.63, F* = 0.7138 on 9 and 14 df, p = 0.6893: no lack of fit, matching anova().

**29. (B)** With e_i = 0, r_i = t_i = 0, so D_i = 0 and DFFITS = 0: a high-leverage point exactly on the line has no influence; its leverage value is only potential.

## Chapter 10 -- Remedial Measures and Transformations

**1. (A)** (i) transform X; (ii) transform Y; (iii) Huber robust regression; (iv) change the model to Poisson (Chapter 14), not the scale.

**3. (A)** A 1% increase in X raises Y by about 1.3%; since the elasticity exceeds 1, Y grows more than proportionally.

**5. (A)** lambda = 1 no transform, 0.5 square root, 0 log, -1 reciprocal; the -1 and division by lambda make the family continuous at lambda = 0, where it becomes log Y.

**7. (A)** Weight each squared residual by w_i; a small-variance (precise) point gets a large weight w_i = sigma^2/Var and should count more.

**9. (A)** A vertical outlier has an extreme residual; a high-leverage point has extreme predictor values. Huber protects against vertical outliers, not high-leverage points.

**11. (B)** (cX)^beta1 / X^beta1 = c^beta1 exactly; for small log c, c^beta1 approx 1 + beta1 log c, so a 1% rise in X gives about beta1 percent in Y.

**13. (B)** Profile out beta (least squares, giving RSS(lambda)) and sigma^2 (= RSS/n) to get ell_p(lambda) = -(n/2) log(RSS(lambda)/n) + (lambda-1) sum log Y_i; the Jacobian term is free of beta and sigma^2.

**15. (B)** Whiten with W^{1/2}: the starred errors have variance sigma^2 I, so OLS on them is BLUE, giving b_W = (X'WX)^{-1} X'WY with Var = sigma^2 (X'WX)^{-1}.

**17. (B)** With weighted means Xbar_w, Ybar_w, b_{W,1} = sum w_i (X_i - Xbar_w)(Y_i - Ybar_w) / sum w_i (X_i - Xbar_w)^2.

**19. (B)** w(u) = min(1, c/|u|) depends only on the residual; a high-leverage point has a small residual (weight 1) so it is not downweighted, while a low-leverage large-residual point is.

**21. (C)** b0 = 2.135, b1 = 0.752, R^2 = 0.921; a 25% larger body multiplies brain weight by 1.25^0.752 = 1.183, an 18.26% increase.

**23. (C)** OLS slope 619.7, WLS slope 530.8, intercept 148.5; intercept SE falls from 10.08 to 8.08, and the sqrt(w)-scaled no-intercept regression reproduces 148.473 and 530.835 exactly.

**25. (C)** R^2 rises 0.766 to 0.783 and the funnel eases, but Isabela's leverage value is 0.969 in both fits because the leverage value depends on X (the hat matrix), which transforming Y does not change.

**27. (C)** Smallest Huber weights Zambia 0.472, Chile 0.585, Philippines 0.689, Peru 0.709 (all low-leverage points); Libya, with leverage value 0.531 (highest), keeps weight 1.00: a high-leverage point Huber misses.

## Chapter 11 -- Categorical Predictors and Interactions

**1. (A)** It forces every one-step move to be equal in size, so it assumes the Assistant-to-Associate salary gap (about 13,100) equals the Associate-to-Full gap (about 32,900), which the data reject.

**3. (A)** Reference-cell coding uses k-1 = 4 indicators for a 5-level factor and the factor contributes 4 degrees of freedom, one per indicator.

**5. (A)** Wrong: the discipline coefficient is only the gap at zero years of service; the significant interaction means the discipline slopes differ and the gap grows with service (about 28.7k at 40 years).

**7. (A)** Centering only shifts the origin, so least squares fits the identical parabola and the same fitted values; the linear coefficient changes because it now measures the slope at the mean instead of at zero.

**9. (B)** The k indicators sum to the intercept column (X1+...+Xk = 1), a linear dependence, so X is not full rank, X'X is singular, and the coefficients are not unique (add c to the intercept and subtract c from every level effect: same fit).

**11. (B)** For D=0 the line is beta0 + beta1 X; for D=1 it is (beta0+beta2) + beta1 X; their difference is beta2 at every X because the equal slopes cancel, so the lines are parallel.

**13. (B)** The models differ by one parameter, so the F has 1 numerator df and equals the square of the coefficient's t; t = 3.2202 gives t^2 = 10.37 = F.

**15. (B)** The raw and centered fits are the same quadratic in shifted coordinates, so they have identical fitted values and residuals, hence identical SSE and R^2.

**17. (B)** The cell-means intercept does not exist (no intercept); the three coefficients become the group means b0, b0+b1, b0+b2, and the fitted values are unchanged.

**19. (C)** Intercept 108,548.4 = mean of discipline A; slope disciplineB = 9,480.3 = mean B minus mean A; means A = 108,548, B = 118,029.

**21. (C)** Interaction coefficient yrs.service:sexMale = -931.74, p = 0.0825; general linear test F = 3.03 on 1 and 393 df, p = 0.0825; the slopes do not differ significantly at 0.05.

**23. (C)** Raw: correlation 0.9795, linear SE 2.034; centered: correlation -0.0955, linear SE 0.412; centering breaks the collinearity and cuts the standard error about fivefold.

**25. (C)** A: 98,038 / 105,940 / 113,843 at 0/15/30 yrs; B: 98,895 / 117,225 / 135,555; the A-vs-B gap grows from 857 to 11,285 to 21,712 because the applied slope is steeper by the interaction coefficient 695/yr.

**27. (C)** Both the model summary F and the anova() F equal 128.22 on 2 and 394 df; the one-way ANOVA F for rank is exactly the regression overall F.

## Chapter 12 -- Multicollinearity, Variable Selection, and Validation

**1. (A)** No bias; variance inflated by VIF_k = 1/(1 - R_k^2); predictions inside the data range essentially unharmed. Remedies (any two): do nothing for in-range prediction, drop redundant predictors, combine into an index, or shrink with ridge.

**3. (A)** R-squared never decreases with added predictors, so it always picks the larger model; adjusted R-squared divides by degrees of freedom and can fall for a useless predictor.

**5. (A)** BIC's penalty p*ln(n) exceeds AIC's 2p for n > 7, so BIC charges more per parameter and selects smaller models.

**7. (A)** Post-selection inference: predictors kept for small p-values are guaranteed to look significant, so the reported p-values are invalid.

**9. (A)** The gap signals overfitting; the CV RMSE (4.6) estimates new-data performance, the training RMSE (3.5) is optimistic.

**11. (B)** Var{b_k} = sigma^2 / sum(X_tilde^2) = sigma^2 / (S_kk (1 - R_k^2)); the VIF = 1/(1 - R_k^2) is the last factor.

**13. (B)** Gamma_p = E{SSE_p}/sigma^2 - (n - 2p) using sum Var = p*sigma^2 and E{SSE_p} = B + (n-p)sigma^2; estimating gives Cp, and B = 0 yields Cp approx p.

**15. (B)** For the full model SSE/sigma_hat^2 = n - p_full, so Cp = (n - p_full) - (n - 2 p_full) = p_full.

**17. (B)** Training error tracks fit (always improves); test error is bias^2 + variance, and the variance term rises as the model grows, so it can exceed a smaller model's.

**19. (B)** beta_hat = sum(x_i Y_i) / (sum(x_i^2) + lambda); numerator is signal, denominator is spread plus penalty lambda.

**21. (C)** Cp/adjusted R-squared pick the 8-predictor model (age, weight, neck, abdom, hip, thigh, forearm, wrist); BIC picks 4 (weight, abdom, forearm, wrist).

**23. (C)** Shortcut PRESS = 4139.68 equals brute-force leave-one-out PRESS = 4139.68 for the candidate.

**25. (C)** The candidate predicts the test set as well or better than the full model, reversing the training-set order (overfitting).

**27. (C)** The lasso keeps a small subset always including abdomen (and usually wrist, forearm, weight), overlapping the eight-predictor Cp model but leaner.

**29. (C)** Points lift off the 45-degree line at high-leverage cases, whose 1/(1 - h_ii) factor is largest.

## Chapter 13 -- Logistic Regression

**1. (A)** OLS predicts probabilities outside [0,1]; the variance pi(1-pi) is not constant; a 0/1 response cannot have normal errors.

**3. (A)** Odds ratio e^(-0.2162) = 0.806: each degree warmer multiplies the damage odds by about 0.81 (a ~19% drop per degree).

**5. (A)** 1.04 is an odds ratio, not a probability change; correct to 'each unit multiplies the odds of a positive test by about 1.04.'

**7. (A)** AUC 0.5 means the model ranks positives above negatives only half the time, i.e., no better than chance.

**9. (A)** Yes; the 95% interval (1.39, 4.53) lies entirely above 1, excluding the no-effect value.

**11. (B)** Substitute log pi = eta - log(1+e^eta) and log(1-pi) = -log(1+e^eta) to get l = sum[Y eta - m log(1+e^eta)] + C.

**13. (B)** Second derivative is -sum m pi(1-pi) X_ij X_ik, so Hessian = -X'WX (negative definite), making l concave.

**15. (B)** The intercept score equation gives sum Y_i = sum m_i pi-hat_i; for binary data the mean fitted probability equals the observed proportion of ones.

**17. (B)** OR = (pi1/pi0)((1-pi0)/(1-pi1)); for small probabilities the second factor is near 1, so OR approximates the relative risk pi1/pi0.

**19. (B)** For a near-separating predictor the Wald SE inflates and shrinks its z (Hauck-Donner); the likelihood-ratio test uses the deviance drop and is more reliable.

**21. (C)** b0 = 11.663, b1 = -0.2162; predicted damage probability about 0.70 at 50 F and 0.01 at 75 F.

**23. (C)** Glucose OR 1.0415 alone, 1.0388 with BMI; it shrinks because glucose and BMI are correlated and BMI now carries part of the effect.

**25. (C)** With 'under 30' as reference, '30 to 45' OR about 3.24 and 'over 45' OR about 2.59, holding glucose and BMI fixed.

**27. (C)** Held-out AUC about 0.840 versus in-sample 0.843; the small gap is in-sample optimism, and cross-validation would estimate it more stably.

## Chapter 14 -- Poisson Regression and the GLM Idea

**1. (A)** Counts are nonnegative (violates unbounded response), whole numbers (violates continuity), and more variable as the mean grows (violates constant variance).

**3. (A)** Rate ratio e^{0.5} = 1.649: a one-unit rise multiplies the expected count by about 1.65 (a 65% increase), holding other predictors fixed.

**5. (A)** The coefficients solve score equations that do not involve the variance, so they are unchanged; only the standard errors, computed from the variance, are rescaled.

**7. (A)** Linear: Normal, identity link. Logistic: Binomial, logit link. Poisson: Poisson, log link.

**9. (A)** Because mu_i = exp(x_i' beta) and the exponential is always positive, so the fitted mean can never be zero or negative.

**11. (B)** The intercept score component is sum (y_i - mu-hat_i) = 0, hence sum mu-hat_i = sum y_i: the fitted means reproduce the total count.

**13. (B)** From mu_i = lambda_i t_i, taking logs gives log mu_i = x_i' beta + log t_i; the coefficient of log t_i is fixed at 1 because doubling exposure doubles the mean by identity.

**15. (B)** Replacing Var = mu by Var = phi*mu multiplies the coefficient covariance matrix by phi, hence each standard error by sqrt(phi); the score equations that give the estimates never mention the variance, so estimates are unchanged.

**17. (B)** The rate ratio lambda_B/lambda_A = e^{beta} because the offsets log t_A and log t_B cancel in the difference of log means, giving a fair per-exposure comparison.

**19. (C)** Area coefficient -5.799e-4; rate ratio for +100 km^2 is e^{-0.05799} = 0.944 (about a 5.6% drop in expected count).

**21. (C)** Nearest and Scruz lose significance under quasi-Poisson because every SE is inflated by sqrt(31.7) ~ 5.6, dropping their statistics below the threshold; Area, Elevation, Adjacent stay significant.

**23. (C)** typeB flips from -0.543 (with offset) to +1.796 (without), because without the offset the model explains raw counts and type B has the most service time; the offset is needed so coefficients describe the rate, not the exposure.

**25. (C)** Both give b0 = 62.37, b1 = 3.5702; ordinary least squares is the GLM with a Normal response and identity link, so glm reproduces lm exactly.

**27. (C)** Negative binomial theta-hat = 1.675 (confirming heavy overdispersion); its Elevation coefficient 0.003855 is close to the Poisson/quasi-Poisson value 0.003541, since overdispersion mainly affects standard errors, not estimates.

**29. (A)** Transforming a count fails on log-of-zero (arbitrary add-0.5 patch), leaves the mean-variance link unrepaired (no single power makes the scatter constant), can predict negatives, and back-transforms to a median not a mean; the Poisson model handles zeros, keeps the mean positive, and builds variance-equals-mean in, because the response is a count, not a mis-scaled measurement.

## Chapter 15 -- Regression with Time: Autocorrelation and Forecasting

**1. (A)** Trend (linear term beta_1 t), seasonality (eleven month dummies gamma_m D_mt), and growing swings (handled by the log scale).

**3. (A)** beta_1 = 0.0101 in log units per month is about (e^0.0101 - 1)*100 = 1.0% growth per month; exponentiating converts a log difference into a percentage change.

**5. (A)** A random split lets the model train on future months and test on past ones, which is impossible at forecast time; the correct split is by time, train earlier, test later.

**7. (A)** Wrong: 'July has 0.30 more passengers than January.' Right: on the log scale, holding the trend fixed, July is a factor e^0.30 = 1.35 times January, about 35% higher.

**9. (B)** Expanding the numerator and dividing by sum e_t^2 gives two truncated sums each approximately the full residual sum of squares (ratio ~1 for large n) and a cross term equal to r_1, so D = 1 + 1 - 2 r_1 = 2(1 - r_1).

**11. (B)** Subtracting rho times the lagged regression from the current one gives Y_t - rho Y_{t-1} = (x_t - rho x_{t-1})' beta + (epsilon_t - rho epsilon_{t-1}), and the AR(1) definition makes epsilon_t - rho epsilon_{t-1} = u_t, an independent innovation.

**13. (B)** gamma_k = Cov(epsilon_t, epsilon_{t-k}) = rho Cov(epsilon_{t-1}, epsilon_{t-k}) = rho gamma_{k-1}, so gamma_k = rho^k gamma_0 and the correlation is rho^k, decaying geometrically.

**15. (B)** Unbiasedness of b_1 is not the issue; the interval also uses s{b_1}, which the ordinary formula understates under positive autocorrelation, so the wrong quantity is the standard error, making the interval too narrow.

**17. (C)** The fit reproduces trend slope 0.0101, R^2 = 0.9835, residual SE = 0.0593, matching Example 15.1.

**19. (C)** The residual-versus-time plot shows long same-sign runs and the lag plot shows an upward tilt near 0.79; both indicate strong positive autocorrelation.

**21. (C)** The no-log model has residual SE 26.33, R^2 = 0.9559, DW = 0.4502 (autocorrelation still severe), and its residual spread fans out with the level; the log model removes the fanning and fits slightly better.

**23. (C)** Test-set coverage is 0.194 (7 of 36), far below 0.95, while training coverage is about 0.972; an interval well calibrated in-sample can be badly miscalibrated out of sample.

**25. (C)** The t^2 coefficient is about -2.15e-5 with p = 1.4e-13 (curvature needed); DW rises from 0.43 to 0.65 and R^2 to 0.9892; a negative t^2 means the growth rate is decelerating.

**27. (C)** Training on 1949-1955 and testing on 1956-1960 gives MAPE 10.06%, lower than the 1958 split's 14.23%, because the test set now includes easy near-term months (1956-57) that pull the average error down.

**29. (C)** The ordinary interval is too narrow because (1) autocorrelated errors compound instead of cancelling, (2) the extrapolated trend's slope error grows with the horizon, and (3) forecast uncertainty should widen with the horizon but the ordinary interval does not; ARIMA, exponential smoothing, and state-space time-series models fix this.

## Chapter 16 -- Path Analysis and a Look Ahead

**1. (A)** Exogenous: no incoming arrow (education). Endogenous: at least one incoming arrow (income, prestige). Disturbance: the stub arrow for all unmeasured influences on an endogenous variable.

**3. (A)** Direct effect is one arrow straight from cause to effect (education to prestige, 0.52); indirect effect travels through a mediator (education to income to prestige, 0.72 x 0.46 = 0.34).

**5. (A)** Recursive means the arrows form no loop, so variables order with every arrow pointing forward; each equation can then be fit alone by least squares because a variable's causes are upstream and uncorrelated with its disturbance.

**7. (A)** Correct direction, no omitted common causes, correct functional form, no feedback. Data can check the last two (form, recursiveness) but not the first two (direction, hidden confounders).

**9. (A)** ASK, EXPLORE, FIT, CHECK, USE. Path analysis is a USE tool (interpret and communicate a causal story) that loops back to ASK because choosing the arrows is choosing the question.

**11. (B)** Subtract the fitted mean to drop the intercept, divide by s_Y, and multiply/divide each term by s_{X_k}; the coefficient on the standardized predictor is p_k = b_k s_{X_k}/s_Y.

**13. (B)** Substituting the income equation gives prestige* = (p_PE + p_PI p_IE) education* + (p_PI d_I + d_P), so the total effect of education is p_PE + p_PI p_IE.

**15. (B)** r(income,prestige) = p_PI + p_IE p_PE = 0.4643 + 0.3735 = 0.8378; p_PI is the real direct effect and p_IE p_PE is spurious (via education).

**17. (B)** A single correlation is symmetric, so X to Y and Y to X both set their path to r_XY and fit identically; only outside information (temporal order, theory, experiment) can choose.

**19. (B)** Standardizing only Y leaves b_k/s_Y, still per raw X_k-unit, so differently scaled predictors are not comparable; multiplying by s_{X_k} removes X_k's units and fixes this.

**21. (C)** direct 0.5155, indirect 0.7245 x 0.4643 = 0.3364, total 0.8519, matching the education-prestige correlation 0.8519 to four decimals.

**23. (C)** cor(education,prestige) = 0.8519, standardized simple slope = 0.8519, and total effect = 0.8519 all agree because education is exogenous.

**25. (C)** Full: education 0.5458, income 0.5987. Dropping the minister (Cook's D ~0.57) and conductor (~0.22) gives education 0.3322, income 0.8674; two of 45 cases shift the coefficients substantially.

**27. (C)** Model-implied r(income,prestige) = p_PI + p_IE p_PE = 0.4643 + 0.3735 = 0.8378, matching the observed 0.838 exactly (just-identified recursive model).

**29. (A)** Causal inference (DAGs, instrumental variables, matching, diff-in-diff, regression discontinuity), mixed/hierarchical models (random effects for non-independent grouped data), and statistical learning (ridge/lasso, trees, boosting, neural nets for prediction). Honest lesson: causal conclusions come from causal assumptions, so the work is defending the assumptions, not running the regression.
