---
title: "Appendix G: Glossary"
subtitle: "MATH 4210 -- every key term, alphabetically, with the chapter that defines it"
---

Every boldfaced term from Chapters 1 through 16, collected in one place. Each
entry names the chapter where the term is defined; a few terms are used again,
with a refined sense, in a later chapter, noted in parentheses. A handful of
terms trip people up on pronunciation alone, so those get a rough phonetic
guide in brackets.

## A

**Added-variable plot**: A partial-regression plot of Y residualized on the other predictors against a target predictor residualized on the other predictors; its slope equals the multiple regression coefficient. (Ch. 8).

**Adjusted R-squared**: R-squared penalized for model size, 1 - (n-1)/(n-p)(1-R^2); it can decrease when a predictor does not earn its degree of freedom. (Ch. 8). Revisited in Ch. 12.

**AIC**: Akaike information criterion, goodness of fit plus a 2p size penalty; smaller is better. (Ch. 12).

**Analysis of covariance (ANCOVA)**: A model with one categorical and one continuous predictor and no interaction, giving each category its own intercept but a shared slope (parallel lines). (Ch. 11).

**Analysis of variance (ANOVA)**: The accounting that splits the total variation SSTO into an explained part SSR and a residual part SSE, displayed in the ANOVA table. (Ch. 3).

**Anscombe's quartet** [ANN-skohm]: Four small datasets with identical means, variances, correlation, and fitted line but completely different shapes; the classic argument for always plotting the data. (Ch. 1).

**Area under the curve (AUC)**: The area under the ROC curve; the probability the model scores a random positive above a random negative. (Ch. 13).

**Association**: A tendency for two variables to move together; it does not by itself imply that changing one changes the other. (Ch. 1).

**Autocorrelation**: Correlation of a series (or of the regression errors) with its own past values; positive autocorrelation means consecutive values tend to share sign. (Ch. 15). Previewed in Ch. 9.

**Autocorrelation parameter (rho)**: The correlation between an error and the one immediately before it in an AR(1) process; controls how strongly errors persist. (Ch. 15).

**Auxiliary regression**: The regression of one predictor on all the other predictors, used to compute R_k^2 and hence the VIF. (Ch. 12).

## B

**Back-transformation bias**: The systematic error from undoing a nonlinear response transformation on a prediction, since the mean of a transformed variable is not the transform of the mean. (Ch. 10).

**Basic bootstrap interval**: A bootstrap confidence interval formed by reflecting the percentile endpoints through twice the observed estimate, (2b1 - q_upper, 2b1 - q_lower); equals the percentile interval when the bootstrap distribution is symmetric. (Ch. 5).

**Best linear unbiased estimator (BLUE)**: An estimator that is linear in Y, unbiased, and has the smallest variance among all such estimators; the Gauss-Markov theorem shows b is BLUE. (Ch. 7). Previewed in Ch. 2.

**Bias-variance trade-off**: The decomposition of prediction error into squared bias plus variance (plus noise); more complex models have less bias but more variance. (Ch. 12).

**BIC**: Bayesian information criterion, goodness of fit plus a p*ln(n) size penalty; heavier than AIC, so it prefers smaller models. (Ch. 12).

**Bivariate normal model**: A joint distribution of two variables whose density contours are ellipses, parameterized by two means, two standard deviations, and the correlation rho; rho = 0 makes the variables independent. (Ch. 4).

**Bootstrap**: A method that imitates repeated sampling from the population by resampling the observed data with replacement, used to estimate the sampling variability of a statistic. (Ch. 5).

**Bootstrap standard error**: The standard deviation of a statistic across the bootstrap resamples, an estimate of its true sampling standard deviation. (Ch. 5).

**Box-Cox transformation**: A family of power transformations of a positive response, indexed by lambda, that includes the square root, log, and reciprocal as special cases and is chosen by maximum likelihood. (Ch. 10).

**Breusch-Pagan test** [BROYSH PAY-gun]: A test for nonconstant error variance that regresses the squared residuals on the predictors. (Ch. 9).

**Brown-Forsythe test** [FOR-sythe, rhymes with "scythe"]: A test for nonconstant variance comparing the spread of residuals across groups using medians, so it resists outliers. (Ch. 9).

## C

**Case resampling**: A bootstrap that draws whole rows (X_i, Y_i) with replacement, so the set of predictor values varies from resample to resample; suited to data where the subjects were randomly sampled. (Ch. 5).

**Categorical predictor (factor)**: A predictor whose values are named categories (rank, discipline, sex) rather than measured quantities; entered into a regression through indicator variables, not as a single number. (Ch. 11).

**Causal reasoning (use of regression)**: Using a model to ask what would happen to the response if a predictor were changed by intervention; the hardest use, since a fit measures association, not cause. (Ch. 1).

**Causation**: A relationship in which intervening on one variable actually changes another; supported by regression only with extra assumptions or experimental data. (Ch. 1).

**Cell-means coding**: A coding with all k indicators and no intercept, so each coefficient is a group mean outright; gives the same fitted values as reference-cell coding. (Ch. 11).

**Centering**: Subtracting the mean of a predictor before forming its powers; leaves the fit unchanged but reduces the correlation between a predictor and its square and makes coefficients interpretable. (Ch. 11).

**Classification table**: A cross-tabulation of predicted versus actual outcomes at a chosen probability threshold. (Ch. 13).

**Cochrane-Orcutt procedure** [KOK-rayn OR-kut]: An iterative method that removes AR(1) autocorrelation by estimating rho from the residuals and quasi-differencing the response and predictors, restoring valid least-squares inference. (Ch. 15).

**Coefficient of determination (R-squared)**: The proportion of the total variation in Y explained by the regression, R^2 = SSR/SSTO; equals r^2 in simple linear regression. (Ch. 3). Revisited in Ch. 4.

**Column space**: The set of all fitted vectors Xb, a p-dimensional flat subspace of n-dimensional space onto which least squares projects Y. (Ch. 7).

**Conditional distribution**: The distribution of Y for a fixed value of X; in the bivariate normal it is again normal with mean mu_Y + rho (sigma_Y/sigma_X)(x - mu_X) and variance sigma_Y^2 (1 - rho^2). (Ch. 4).

**Confidence interval for a mean response**: An interval for the average response E{Y_h} = beta_0 + beta_1 X_h at a given predictor value, narrowest at Xbar. (Ch. 3).

**Confidence interval for the slope**: A range b_1 +/- t s{b_1} of plausible values for the true slope beta_1, covering it in a stated percentage of repeated samples. (Ch. 3).

**Conformable**: Two matrices are conformable for multiplication when the number of columns of the left equals the number of rows of the right. (Ch. 6).

**Confounder (lurking variable)**: A variable that influences both the predictor and the response, creating an association between them that is not causal. (Ch. 1). Revisited in Ch. 8, Ch. 16.

**Cook's distance**: A summary of a case's influence, D_i = (r_i^2/p) h_ii/(1 - h_ii), measuring how far all fitted values move when the case is deleted. (Ch. 9).

**Correlation coefficient (Pearson r)**: A unitless number in [-1, 1] measuring the strength and direction of a straight-line relationship between two variables; the covariance standardized by both standard deviations. (Ch. 4).

**Correlation is not causation**: The principle that an association between X and Y is consistent with X causing Y, Y causing X, a common third cause, or coincidence, and by itself supports none of them. (Ch. 4).

**Correlation test for normality**: A normality test using the correlation between the ordered residuals and their normal scores; small values reject normality. (Ch. 9).

**Count response**: A response that is a nonnegative whole number of events (species, incidents, arrivals), whose variability typically grows with its mean. (Ch. 14).

**Covariance**: The average product of paired deviations from the means, s_xy = S_xy/(n-1); positive when the variables tend to sit on the same side of their means. (Ch. 4).

**Covariance matrix**: The symmetric matrix holding the variances of a random vector on its diagonal and the pairwise covariances off the diagonal. (Ch. 6).

## D

**Degrees of freedom**: The divisor n - 2 for MSE in simple regression, reflecting the two parameters b_0 and b_1 estimated before residuals are measured; it sets the t and F reference distributions. (Ch. 3).

**Deleted residual**: The leave-one-out prediction error for case i, equal to e_i/(1 - h_ii). (Ch. 12).

**Description (use of regression)**: Using a fitted model to summarize an existing relationship, for example reporting a slope, without predicting new cases or claiming cause. (Ch. 1).

**Design matrix**: The n by p matrix X whose first column is all ones (for the intercept) and whose remaining columns hold the predictor values, one row per observation. (Ch. 6). Revisited in Ch. 7.

**Determinant**: A single number computed from a square matrix that is nonzero exactly when the matrix has full rank and is therefore invertible. (Ch. 6).

**Deviance**: Twice the log-likelihood gap between a fitted model and the saturated model; the GLM analog of the residual sum of squares. (Ch. 13).

**DFBETAS**: A scaled measure of how much a single coefficient changes when a case is deleted, in units of that coefficient's standard error. (Ch. 9).

**DFFITS**: A scaled measure of how much a single fitted value changes when its own case is deleted, t_i sqrt(h_ii/(1 - h_ii)). (Ch. 9).

**Direct effect**: The influence of one variable on another carried by a single arrow between them, equal to that path coefficient. (Ch. 16).

**Disturbance**: The path-diagram error term: the stub arrow into an endogenous variable standing for every unmeasured influence on it, assumed uncorrelated with that equation's predictors. (Ch. 16).

**Durbin-Watson test**: A test for first-order autocorrelation in regression residuals, based on the statistic D that runs from 0 (strong positive) through 2 (none) to 4 (negative). (Ch. 15). Previewed in Ch. 9.

## E

**Ecological correlation**: A correlation computed on group averages rather than individuals; it usually overstates the individual-level correlation, and inferring individual behavior from it is the ecological fallacy. (Ch. 4).

**Effects coding**: A sum-to-zero coding using -1/0/+1 columns in which the intercept is the grand mean and each coefficient is a level's departure from the grand mean; gives the same fit as reference-cell coding. (Ch. 11).

**Elasticity**: The percent change in the response per one-percent change in the predictor; the slope of a log-log model. (Ch. 10).

**Endogenous variable** [en-DOJ-eh-nus]: A variable with at least one incoming arrow; the model accounts for part of its variation. (Ch. 16).

**Equivalent models**: Distinct path models, often differing only in an arrow's direction, that reproduce the same correlations equally well, so the data cannot choose between them. (Ch. 16).

**Error degrees of freedom**: The quantity n - p, equal to the trace of I - H, used as the divisor in the unbiased variance estimator MSE. (Ch. 7).

**Error sum of squares (SSE)**: The total squared residual, SSE = sum e_i^2, the variation left unexplained by the fitted line. (Ch. 2).

**Estimate**: A number computed from a sample as a best guess of a parameter, such as the least-squares slope b_1. (Ch. 1).

**Exchangeability**: The condition, holding under the no-association null, that every ordering of the response values against the predictors is equally likely, which justifies the permutation test. (Ch. 5).

**Exogenous variable** [ex-ODJ-eh-nus]: A variable with no arrow pointing into it; the model takes it as given rather than explaining it. (Ch. 16).

**Experimental data**: Data collected by intervening, especially by randomly assigning the predictor's value so that groups balance on all confounders on average. (Ch. 1).

**Exposure**: The amount of opportunity for events behind a count (months of service, person-years, area surveyed), denoted t_i and entering the model through log t_i. (Ch. 14).

**Extrapolation**: Using a fitted model to predict outside the range of the data it was fit to, where the relationship has not been tested (as in the 31-degree Challenger launch). (Ch. 1).

**Extra sum of squares**: The reduction in SSE from adding a predictor to a model that already contains the others; SSR(X2|X1) = SSE(X1) - SSE(X1,X2). (Ch. 8).

## F

**First-order autoregressive error model (AR(1))**: The error model epsilon_t = rho epsilon_{t-1} + u_t, in which each error is a fraction rho of the previous error plus an independent innovation u_t. (Ch. 15).

**Fisher z transformation**: The map z = arctanh(r), which makes the sampling distribution of the correlation approximately normal with variance 1/(n-3), used to build confidence intervals for rho. (Ch. 4).

**Fitted value**: The height of the fitted line at X_i, hat Y_i = b_0 + b_1 X_i, the estimated mean response there. (Ch. 2).

**F test**: The test of H0: beta_1 = 0 using F* = MSR/MSE, distributed F(1, n-2) under the null; in simple regression F* = (t*)^2. (Ch. 3).

**Full column rank**: The condition that no column of X is a linear combination of the others, which makes X'X invertible and the least-squares solution unique. (Ch. 7).

**Full model / reduced model**: The larger model and the smaller model obtained by forcing one or more of its coefficients to zero, compared by the general linear test. (Ch. 8).

## G

**Gauss-Markov theorem**: The result that, under linear mean, constant variance, and uncorrelated errors, the least-squares estimators have the smallest variance among all linear unbiased estimators (they are BLUE). (Ch. 2).

**Generalized linear model (GLM)**: A model specified by a response distribution (family) and a link function connecting its mean to a linear predictor; contains linear, logistic, and Poisson regression. (Ch. 14). Previewed in Ch. 1.

**General linear model**: The model Y = X beta + epsilon writing any linear regression, with any number of predictors, in matrix form. (Ch. 7).

**General linear test**: An F test comparing a full model to a reduced model (some coefficients set to zero), scoring the extra explained variation per dropped coefficient against the noise level. (Ch. 8).

## H

**Hat matrix**: The projection matrix H = X(X'X)^{-1}X' that maps the response Y to the fitted values Y-hat = H Y. (Ch. 6). Revisited in Ch. 7.

**Hidden extrapolation**: Prediction at a combination of predictor values inside each predictor's range but outside the joint region where the predictors are observed together. (Ch. 8).

**Hierarchy principle**: The rule that a model including a higher-order term should keep all lower-order terms beneath it: keep X whenever X^2 is present, and keep both main effects whenever their interaction is present. (Ch. 11).

**High-leverage point**: A case whose predictor values are unusual, so its leverage value is large (a common flag is h_ii > 2p/n). (Ch. 9).

**Homoscedasticity** [HOH-moh-skeh-dass-TISS-ih-tee; the opposite is heteroscedasticity, het-ur-oh-skeh-dass-TISS-ih-tee]: The assumption that the error variance sigma^2 is the same at every value of the predictor (constant spread). (Ch. 2).

**Huber loss**: A loss that is quadratic for small residuals and linear beyond a threshold c, giving efficiency near the normal model and resistance to vertical outliers. (Ch. 10).

**Hypothesis test for the slope**: A decision rule that rejects H0: beta_1 = 0 when the statistic t* = b_1/s{b_1} is far from zero, equivalently when the p-value is below alpha. (Ch. 3).

## I

**Idempotent matrix** [eye-dem-POH-tent]: A square matrix P with PP = P; applying it twice is the same as applying it once, as for a projection. (Ch. 6). Revisited in Ch. 7.

**Identity matrix**: The square matrix I with ones on the diagonal and zeros elsewhere; multiplying by it leaves a matrix unchanged. (Ch. 6).

**Indicator (dummy) variable**: A 0-or-1 column that is 1 when a case belongs to a given category and 0 otherwise. (Ch. 11).

**Indirect effect**: The influence of one variable on another that travels through a mediator, equal to the product of the path coefficients along the route. (Ch. 16).

**Influential observation**: A case whose removal noticeably changes the fitted model; influence combines a high leverage value with a large residual. (Ch. 9).

**Innovation**: The genuinely new, independent, constant-variance shock u_t in an AR(1) process, the part of the current error not predictable from the past. (Ch. 15).

**Interaction**: A product term that lets the effect of one predictor depend on another; a category-by-continuous interaction gives each category its own slope. (Ch. 11).

**Inverse**: For a full-rank square matrix A, the matrix A^{-1} satisfying A^{-1}A = A A^{-1} = I; the matrix analogue of a reciprocal. (Ch. 6).

**Iteratively reweighted least squares (IRLS)**: The algorithm that fits a GLM by repeating a weighted least squares step, updating weights and working response each pass. (Ch. 13). Previewed in Ch. 10.

## J

**Jacobian term**: The (lambda - 1) sum of log Y_i correction in the Box-Cox likelihood that arises from changing variables from the transformed response back to the original data, making different lambda comparable. (Ch. 10).

## K

**K-fold cross-validation**: Splitting the data into k folds and rotating each as the test set, averaging the k prediction errors so every case is tested once. (Ch. 12).

**Knot**: A chosen value of the predictor at which a piecewise regression is allowed to change slope. (Ch. 11).

## L

**Lack-of-fit F test**: A test of whether the mean function has the right form, comparing the model's misses to the pure-error spread of replicated observations. (Ch. 9).

**Lag plot**: A scatterplot of each residual against the previous residual; an upward tilt indicates positive autocorrelation. (Ch. 15).

**Lasso**: Least squares with an L1 penalty (sum of absolute coefficients); shrinks and can set coefficients exactly to zero, doing variable selection. (Ch. 12).

**Least squares**: The method that estimates the line by choosing the intercept and slope that minimize the sum of squared vertical distances from the points to the line. (Ch. 2).

**Leverage value**: The diagonal entry h_ii of the hat matrix; a weighted squared distance of case i's predictors from the center of the predictor space, measuring the case's potential to influence the fit. Lies between 0 and 1 and averages p/n. (Ch. 9).

**Likelihood-ratio test**: A test comparing nested models by the drop in deviance, referred to a chi-square distribution. (Ch. 13).

**Linear independence**: A set of columns is linearly independent when the only linear combination of them equal to the zero vector has all-zero weights (no column is a combination of the others). (Ch. 6).

**Linear predictor**: The quantity eta = beta0 + beta1 X1 + ... that the link function connects to the mean. (Ch. 13). Revisited in Ch. 14.

**Link function**: The function (logit here) mapping the mean response onto the linear-predictor scale in a generalized linear model. (Ch. 13). Revisited in Ch. 14.

**Logistic regression**: A regression model for a binary or binomial response that makes the log-odds of a positive outcome a linear function of the predictors. (Ch. 13).

**Log-linear model**: A regression of log Y on X; its slope is a semi-elasticity, the approximate percent change in Y per one-unit change in X. (Ch. 10).

**Log-log model**: A regression of log Y on log X; its slope is an elasticity, the approximate percent change in Y per percent change in X. (Ch. 10).

**Log-odds (logit)**: The natural log of the odds, log[pi/(1-pi)]; the scale on which logistic regression is linear. (Ch. 13).

## M

**Main effect**: A predictor's own coefficient; in a model containing an interaction, a main-effect coefficient is the effect only where the interacting variable equals zero. (Ch. 11).

**Mallows Cp**: A selection criterion estimating standardized total prediction error; unbiased models have Cp approximately equal to their number of parameters p. (Ch. 12).

**Matrix**: A rectangular array of numbers arranged in rows and columns, with dimension written as (rows) by (columns). (Ch. 6).

**Matrix multiplication**: The operation whose (i,j) product entry is row i of the left matrix dotted with column j of the right matrix; defined only when the inner dimensions match. (Ch. 6).

**Maximum likelihood**: Estimation by choosing the parameter values that make the observed data most probable; under normal errors it reproduces the least-squares estimates of the coefficients. (Ch. 2). Revisited in Ch. 13.

**Mean absolute percentage error (MAPE)**: The average of the absolute forecast errors expressed as a percentage of the actual values; a unit-free measure of forecast accuracy. (Ch. 15).

**Mean square**: A sum of squares divided by its degrees of freedom; MSR = SSR/1 and MSE = SSE/(n-2). (Ch. 3).

**Mean square error (MSE)**: SSE divided by its degrees of freedom n - 2; the unbiased estimator s^2 of the error variance sigma^2. (Ch. 2).

**M-estimation**: A method used in robust regression that minimizes a sum of a chosen loss rho of the standardized residuals; its estimating equations are weighted normal equations solved by iterated reweighting. (Ch. 10).

**Modeling workflow**: The five-stage loop the course follows: ASK, EXPLORE, FIT, CHECK, USE; defined in Chapter 2. (Ch. 1).

**Multicollinearity** [MUL-tee-koh-lin-ee-AIR-ih-tee]: Correlation among the predictors of a regression, which inflates the variance of individual coefficients without biasing them. (Ch. 12). Previewed in Ch. 8.

**Multivariate normal**: The joint distribution N(mu, Sigma) generalizing the bell curve to a vector; any linear map of a multivariate normal vector is again multivariate normal. (Ch. 6).

## N

**Negative binomial**: A count model with an extra parameter theta and variance mu + mu^2/theta, a full-likelihood alternative to quasi-Poisson for overdispersed counts. (Ch. 14).

**Normal equations**: The two linear equations, obtained by setting the partial derivatives of the sum of squared errors to zero, whose solution gives b_0 and b_1. (Ch. 2). Revisited in Ch. 6, Ch. 7.

## O

**Observational data**: Data collected by watching the world without intervening, so predictors and confounders come tangled together. (Ch. 1).

**Odds**: The probability an event happens divided by the probability it does not, pi/(1-pi); ranges from 0 to infinity. (Ch. 13).

**Odds ratio**: The factor exp(beta) by which the odds of a positive outcome multiply per one-unit increase in a predictor. (Ch. 13).

**Offset**: A term added to the linear predictor with coefficient fixed at one, equal to the log of the exposure, used to model a rate rather than a raw count. (Ch. 14).

**One-way analysis of variance (ANOVA)**: The F test for whether several group means are equal; identical to the regression of the response on the group factor coded with indicators. (Ch. 11).

**Outlier**: A case the model fits poorly, that is one with a large (studentized) residual. (Ch. 9).

**Out-of-time split**: A train/test split that respects time order, training on earlier observations and testing on later ones, so the evaluation mimics real forecasting. (Ch. 15).

**Overdispersion**: The condition in which count data vary more than the Poisson model allows, Var{Y} > mu, causing Poisson standard errors to be too small. (Ch. 14).

**Overfitting**: Fitting the noise in the training sample, producing a model that fits the data at hand but predicts new data poorly. (Ch. 12).

## P

**Parameter**: A fixed but unknown number describing the true relationship in the whole population, such as the slope beta_1. (Ch. 1).

**Partial slope**: A multiple regression coefficient: the change in the mean response per one-unit rise in a predictor, holding the other predictors fixed. (Ch. 8).

**Path analysis**: A method that states a causal hypothesis as a diagram and estimates each arrow with ordinary regression, then combines the arrows into direct, indirect, and total effects. (Ch. 16).

**Path coefficient**: The standardized regression coefficient on an arrow of a path diagram; the standard-deviation change in the effect per one-standard-deviation change in the cause, holding other direct causes fixed. (Ch. 16).

**Path diagram**: A graph in which boxes are measured variables, single-headed arrows are hypothesized direct causes, curved double-headed arrows are unanalyzed correlations, and a stub arrow marks each disturbance. (Ch. 16).

**Pearson dispersion**: The statistic phi-hat = X^2/(n-p), the average squared Pearson residual; near 1 under a correct Poisson model, well above 1 under overdispersion. (Ch. 14).

**Percentile interval**: A bootstrap confidence interval read directly as the middle 100(1-alpha) percent of the resampled statistics, from the alpha/2 and 1-alpha/2 percentiles. (Ch. 5).

**Permutation distribution**: The distribution of a statistic over all n! equally likely pairings of the response values with the predictor values under the no-association null; it requires no assumption about the error distribution. (Ch. 5).

**Permutation p-value**: The fraction of reshuffles whose statistic is at least as extreme as the observed one, with the plus-one correction (M+1)/(B+1) that counts the observed data itself. (Ch. 5).

**Permutation test**: A test that builds the null distribution of a statistic by repeatedly shuffling the response against the fixed predictor (without replacement), breaking any association, and comparing the observed statistic to the shuffled ones. (Ch. 5).

**Piecewise linear regression**: A model made of straight segments joined at knots, built by adding hinge predictors (X - c)_+; the simplest kind of spline. (Ch. 11).

**Plus-one correction**: Adding one to both the count of extreme reshuffles and the total, so the permutation p-value counts the observed arrangement and can never be exactly zero (its floor is 1/(B+1)). (Ch. 5).

**Poisson distribution**: The distribution of a count with mean mu, having pmf e^{-mu} mu^y / y! and the property that its variance equals its mean. (Ch. 14).

**Poisson log-linear model**: A generalized linear model for counts in which log(mu_i) is a linear function of the predictors, so the mean is exp of the linear predictor. (Ch. 14).

**Polynomial regression**: A regression that adds powers of a predictor (X^2, X^3, ...) as extra columns to fit curvature while staying linear in the coefficients. (Ch. 11).

**Positive definite**: A symmetric matrix A for which u'Au > 0 for every nonzero u (positive semidefinite if the value is only required to be nonnegative). (Ch. 6).

**Post-selection inference**: Inference (p-values, confidence intervals) reported for a model chosen from the same data, which is invalid because the model was not fixed in advance. (Ch. 12).

**Prediction interval**: An interval for a single new observation Y at X_h, wider than the mean-response interval because it adds the new case's own error variance sigma^2. (Ch. 3).

**Prediction-interval coverage**: The fraction of held-out observations that actually fall inside a stated prediction interval; should match the nominal level (e.g. 0.95) if the interval is calibrated. (Ch. 15).

**Prediction (use of regression)**: Using a fitted model to guess the response for a new, unseen value of the predictors, ideally with a margin of error. (Ch. 1).

**Predictor**: A variable used to explain or predict the response, written X (Ch. 2 notes the synonyms other books use). (Ch. 1).

**PRESS**: Prediction sum of squares: the sum of squared leave-one-out prediction errors, computable in one fit via e_i/(1 - h_ii). (Ch. 12).

**Profile likelihood**: A likelihood in one parameter of interest obtained by maximizing over (profiling out) the remaining parameters; Box-Cox profiles out beta and sigma-squared to leave a function of lambda alone. (Ch. 10).

**Projection matrix**: A symmetric idempotent matrix; H projects onto the column space of X and I - H onto the residual space. (Ch. 6).

**Pure error**: Variation of observations around their own group mean at repeated predictor values; a model-free estimate of the error variance. (Ch. 9).

## Q

**Quadratic form**: A scalar u'Au for a symmetric matrix A; SSE, SSR, and SSTO are quadratic forms in Y. (Ch. 6).

**Quasi-differencing**: Replacing each observation by itself minus rho times the previous observation, which cancels the correlated part of an AR(1) error and leaves independent innovations. (Ch. 15).

**Quasi-Poisson**: An overdispersion fix that keeps the Poisson coefficient estimates and multiplies every standard error by the square root of the estimated dispersion. (Ch. 14).

## R

**Random part (error)**: The part of the response a model does not explain, the noise term epsilon, representing real variation the predictors do not capture. (Ch. 1).

**Random vector**: A vector whose entries are random variables, described by a mean vector and a covariance matrix. (Ch. 6).

**Rank**: The number of linearly independent columns of a matrix; X has full column rank when its rank equals its number of columns p. (Ch. 6).

**Rate ratio**: The factor e^{beta_j} by which the expected count is multiplied for a one-unit increase in predictor X_j, the count-data analogue of the odds ratio. (Ch. 14).

**Raw residual**: The plain residual e_i = Y_i - hat Y_i; misleading for comparison because its variance sigma^2(1 - h_ii) shrinks at high-leverage points. (Ch. 9).

**Recursive model**: A path model whose arrows form no loop, so the variables can be ordered with every arrow pointing forward and each equation fit separately by least squares. (Ch. 16).

**Reference-cell coding**: The default categorical coding (also called treatment coding): one level is the reference, k-1 indicators are used, the intercept is the reference-group mean, and each coefficient is a difference of a group's mean from the reference. (Ch. 11).

**Regression**: A method for studying how a response variable depends on one or more predictors by estimating a systematic rule for the mean response while describing the leftover noise. (Ch. 1).

**Regression function**: The line E{Y} = beta_0 + beta_1 X giving the mean response at each value of the predictor. (Ch. 2).

**Regression sum of squares (SSR)**: The variation the fitted line explains, SSR = sum (hat Y_i - Ybar)^2 = b_1^2 Sxx, with 1 degree of freedom in simple regression. (Ch. 3).

**Regression to the mean**: The tendency of cases selected for being extreme on one imperfectly correlated measurement to be less extreme on a second, because part of the extreme was luck that does not repeat. (Ch. 1). Revisited in Ch. 4.

**Remedial measure**: An action taken after a diagnostic fails (transform a variable, weight the observations, use a resistant loss, or change the model) to make a regression assumption hold. (Ch. 10).

**Residual**: The signed vertical distance e_i = Y_i - hat Y_i from an observed point to the fitted line; the visible stand-in for the unobservable error epsilon_i. (Ch. 2).

**Residual resampling**: A bootstrap that holds the predictors and fitted line fixed and rebuilds the response as fitted value plus a residual drawn with replacement; suited to data where the predictor values are fixed by design. (Ch. 5).

**Response**: The variable a regression tries to explain or predict, written Y (also called the dependent or outcome variable). (Ch. 1).

**Restriction of range**: The shrinking of a correlation toward zero that happens when the range of X sampled is narrowed, even though the underlying relationship is unchanged. (Ch. 4).

**Ridge regression**: Least squares with an L2 penalty (sum of squared coefficients); shrinks all coefficients but rarely to exactly zero. (Ch. 12).

**Robust regression**: Estimation that replaces the squared-error loss with one growing more slowly in the tails, so that a few outliers cannot dominate the fit. (Ch. 10).

**ROC curve**: A plot of sensitivity against one-minus-specificity across all thresholds. (Ch. 13).

## S

**Sampling distribution**: The distribution of an estimator such as b_1 across all the samples that could have been drawn; under normal errors b_0 and b_1 are exactly normal. (Ch. 3).

**Saturated model**: The model that fits every observation exactly (fitted mean equals observed), used as the reference for deviance. (Ch. 13).

**Score equations**: The equations setting the log-likelihood's first derivatives to zero; for logistic regression X'(Y - mu) = 0. (Ch. 13). Revisited in Ch. 14.

**Seasonality**: A pattern that repeats over a fixed period (here twelve months), modeled by indicator variables for each season relative to a baseline. (Ch. 15).

**Semi-elasticity**: The percent change in the response per one-unit change in the predictor; the slope of a log-linear model, equal to 100(e^beta - 1) exactly. (Ch. 10).

**Semistudentized residual** [SEM-ee-STOO-dent-ized]: The raw residual divided by s = sqrt(MSE); a crude scaling that ignores differing residual variances. (Ch. 9).

**Sensitivity**: The fraction of true positives the classifier correctly flags. (Ch. 13).

**Sequential (Type I) ANOVA**: A table whose rows are the extra sums of squares of the predictors in the order listed, adding to the model's total SSR. (Ch. 8).

**Shapiro-Wilk test**: A test of whether the residuals are normally distributed, comparing the ordered residuals to normal order statistics. (Ch. 9).

**Shrinkage**: Pulling coefficients toward zero by a penalty, trading a little bias for a large drop in variance. (Ch. 12).

**Simple linear regression model**: The model Y_i = beta_0 + beta_1 X_i + epsilon_i, in which the mean of the response is a straight-line function of one predictor plus a mean-zero, constant-variance, uncorrelated error. (Ch. 2).

**Spearman rank correlation**: The Pearson correlation computed on the ranks of the two variables; it measures monotone association and resists outliers and nonlinear-but-monotone curves. (Ch. 4).

**Specificity**: The fraction of true negatives the classifier correctly clears. (Ch. 13).

**Spurious correlation**: The part of a correlation between two variables produced by a shared common cause rather than by any direct effect between them. (Ch. 16).

**Standardized coefficient**: The coefficient from a regression on variables rescaled to unit standard deviation, b_k(s_Xk/s_Y), comparable across predictors of different units. (Ch. 8). Revisited in Ch. 16.

**Standardized residual**: The internally studentized residual r_i = e_i/(s sqrt(1 - h_ii)), dividing by the estimated standard deviation of e_i. (Ch. 9).

**Statistical model**: A description of data as a systematic part plus a random part, Y = f(X) + epsilon. (Ch. 1).

**Stepwise selection**: An automatic search that adds or drops predictors by their p-values; prone to overfitting and to invalid post-selection inference. (Ch. 12).

**Studentized deleted residual** [STOO-dent-ized]: The externally studentized residual t_i = e_i/(s_(i) sqrt(1 - h_ii)), using the error standard deviation from the fit without case i; follows a t(n - p - 1) distribution and is used for the outlier test. (Ch. 9).

**Supervised machine learning**: The branch of machine learning that learns to predict an output from inputs; regression with the systematic part allowed to be more flexible than a straight line. (Ch. 1).

**Symmetric matrix**: A square matrix equal to its own transpose, A' = A; X'X is always symmetric. (Ch. 6).

**Systematic part (signal)**: The part of the response a model explains, f(X), the mean response as a function of the predictors. (Ch. 1).

## T

**Time-ordered data**: Observations indexed and collected in time sequence, where neighboring observations are typically related, so the uncorrelated-errors assumption usually fails. (Ch. 15).

**Total effect**: The sum of the direct effect and all indirect effects of one variable on another; for an exogenous cause it equals the plain correlation. (Ch. 16).

**Total sum of squares (SSTO)**: The total variation of the response about its mean, SSTO = sum (Y_i - Ybar)^2, with n - 1 degrees of freedom. (Ch. 3).

**Trace**: The sum of the diagonal entries of a square matrix; the hat matrix has trace equal to p. (Ch. 6).

**Training and test sets**: A one-time split of the data into a part used to fit the model and a held-back part used only to measure its prediction error. (Ch. 12).

**Transpose**: The matrix A' formed by swapping the rows and columns of A; the (i,j) entry of A' is the (j,i) entry of A. (Ch. 6).

**Trend**: The systematic long-run rise or fall of a series over time, modeled here by a linear term beta_1 t in the time index. (Ch. 15).

**Tuning parameter (lambda)**: The penalty strength in ridge or lasso, chosen by cross-validation; lambda=0 is least squares, large lambda crushes coefficients to zero. (Ch. 12).

## U

**Unbiased estimator**: An estimator whose expected value equals the parameter it estimates, as b_0, b_1, and MSE are for beta_0, beta_1, and sigma^2. (Ch. 2).

## V

**Variance inflation factor (VIF)**: The factor 1/(1 - R_k^2) by which collinearity multiplies the variance of coefficient b_k, where R_k^2 comes from regressing predictor k on the others. (Ch. 12).

**Vector**: A matrix with a single column (column vector) or single row (row vector); an ordered list of numbers. (Ch. 6).

## W

**Wald test**: A large-sample test of a single coefficient using z = b/se(b) against the standard normal. (Ch. 13).

**Weight**: The multiplier w_i on observation i in WLS, inversely proportional to its error variance; a precise point gets a large weight. (Ch. 10).

**Weighted least squares (WLS)**: The estimator that minimizes the weighted sum of squared residuals sum w_i (Y_i - x_i'beta)^2, giving precise observations more influence; equal to OLS after whitening. (Ch. 10).

**Whitening**: Multiplying the model through by the square root of the weight matrix to turn unequal-variance errors into constant-variance ones, so ordinary least squares applies. (Ch. 10).

**Working-Hotelling confidence band**: A band hat Y_h +/- W s{hat Y_h} with W = sqrt(2 F(1-alpha; 2, n-2)) that covers the entire true regression line simultaneously at the stated confidence level. (Ch. 3).

**Working response**: The linearized response z_i = eta_i + (Y_i - mu_i)/w_i regressed on X at each IRLS step. (Ch. 13).
