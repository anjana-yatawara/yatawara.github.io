// Course-source activities; answer key: MATH 2200 Comprehensive Practice Quiz.
export const QUESTIONS = [
  {
    "id": "MC01",
    "world": "sample-sprinkle",
    "type": "mcq",
    "prompt": "A random sample is taken from a population. Which statement correctly describes statistical inference?",
    "choices": [
      {
        "id": "A",
        "text": "A population parameter is used to estimate a sample statistic."
      },
      {
        "id": "B",
        "text": "A sample statistic is used to estimate a population parameter."
      },
      {
        "id": "C",
        "text": "A sample parameter is used to estimate a population statistic."
      },
      {
        "id": "D",
        "text": "A population statistic is used to estimate a sample parameter."
      }
    ],
    "answer": "B",
    "explanation": "A statistic is computed from a sample and is used to learn about an unknown population parameter.",
    "masteryKey": "mc.01"
  },
  {
    "id": "MC02",
    "world": "sample-sprinkle",
    "type": "mcq",
    "prompt": "Which variable is best classified as numerical discrete?",
    "choices": [
      {
        "id": "A",
        "text": "Student major"
      },
      {
        "id": "B",
        "text": "Number of absences this semester"
      },
      {
        "id": "C",
        "text": "Hours of sleep last night"
      },
      {
        "id": "D",
        "text": "Employment status"
      }
    ],
    "answer": "B",
    "explanation": "Number of absences is a count and therefore takes countable integer values.",
    "masteryKey": "mc.02"
  },
  {
    "id": "MC03",
    "world": "sample-sprinkle",
    "type": "mcq",
    "prompt": "A distribution is strongly right-skewed and contains several unusually large observations. Which measures are generally most appropriate for describing center and spread?",
    "choices": [
      {
        "id": "A",
        "text": "Mean and standard deviation"
      },
      {
        "id": "B",
        "text": "Median and IQR"
      },
      {
        "id": "C",
        "text": "Mean and range"
      },
      {
        "id": "D",
        "text": "Mode and variance"
      }
    ],
    "answer": "B",
    "explanation": "The median and IQR are resistant to skewness and extreme values.",
    "masteryKey": "mc.03"
  },
  {
    "id": "MC04",
    "world": "sample-sprinkle",
    "type": "mcq",
    "prompt": "Which quantity is NOT part of the information needed to construct a standard boxplot?",
    "choices": [
      {
        "id": "A",
        "text": "First quartile"
      },
      {
        "id": "B",
        "text": "Median"
      },
      {
        "id": "C",
        "text": "Variance"
      },
      {
        "id": "D",
        "text": "Third quartile"
      }
    ],
    "answer": "C",
    "explanation": "A boxplot is based on the quartiles and the extremes/outlier rule; variance is not required.",
    "masteryKey": "mc.04"
  },
  {
    "id": "MC05",
    "world": "sample-sprinkle",
    "type": "mcq",
    "prompt": "A dataset contains one row for each student. Which phrase best describes a single student represented by one row?",
    "choices": [
      {
        "id": "A",
        "text": "Population parameter"
      },
      {
        "id": "B",
        "text": "Observational unit"
      },
      {
        "id": "C",
        "text": "Treatment combination"
      },
      {
        "id": "D",
        "text": "Sampling distribution"
      }
    ],
    "answer": "B",
    "explanation": "The observational unit is the individual or object represented by one row of the dataset.",
    "masteryKey": "mc.05"
  },
  {
    "id": "MC06",
    "world": "sample-sprinkle",
    "type": "mcq",
    "prompt": "A scatterplot of GPA versus weekly study hours has points clustered closely around an upward-sloping straight line. The association is best described as",
    "choices": [
      {
        "id": "A",
        "text": "strong, positive, linear"
      },
      {
        "id": "B",
        "text": "strong, negative, linear"
      },
      {
        "id": "C",
        "text": "weak, positive, nonlinear"
      },
      {
        "id": "D",
        "text": "causal"
      }
    ],
    "answer": "A",
    "explanation": "Upward direction is positive, closeness to a line indicates strong linear association, and a scatterplot alone does not establish causation.",
    "masteryKey": "mc.06"
  },
  {
    "id": "MC07",
    "world": "design-dessert",
    "type": "mcq",
    "prompt": "Researchers divide all freshmen by college and randomly select students from every college. Which sampling method is being used?",
    "choices": [
      {
        "id": "A",
        "text": "Cluster sampling"
      },
      {
        "id": "B",
        "text": "Stratified sampling"
      },
      {
        "id": "C",
        "text": "Convenience sampling"
      },
      {
        "id": "D",
        "text": "Voluntary response sampling"
      }
    ],
    "answer": "B",
    "explanation": "The population is divided into strata and a sample is taken from every stratum.",
    "masteryKey": "mc.07"
  },
  {
    "id": "MC08",
    "world": "design-dessert",
    "type": "mcq",
    "prompt": "Researchers randomly select five entire discussion sections and survey every student in the selected sections. Which sampling method is being used?",
    "choices": [
      {
        "id": "A",
        "text": "Simple random sampling"
      },
      {
        "id": "B",
        "text": "Stratified sampling"
      },
      {
        "id": "C",
        "text": "Cluster sampling"
      },
      {
        "id": "D",
        "text": "Systematic sampling"
      }
    ],
    "answer": "C",
    "explanation": "Whole groups are randomly selected and all individuals in those selected groups are surveyed.",
    "masteryKey": "mc.08"
  },
  {
    "id": "MC09",
    "world": "design-dessert",
    "type": "mcq",
    "prompt": "An experiment studies Temperature (Low, Medium, High) and Material Type (A, B, C). Which is a treatment combination?",
    "choices": [
      {
        "id": "A",
        "text": "Temperature"
      },
      {
        "id": "B",
        "text": "High temperature with Material B"
      },
      {
        "id": "C",
        "text": "Battery life"
      },
      {
        "id": "D",
        "text": "Laboratory"
      }
    ],
    "answer": "B",
    "explanation": "A treatment combination specifies one level from each factor.",
    "masteryKey": "mc.09"
  },
  {
    "id": "MC10",
    "world": "design-dessert",
    "type": "mcq",
    "prompt": "In the same battery experiment, laboratories differ slightly in background conditions. Researchers group experimental units by laboratory before comparing treatments. This is an example of",
    "choices": [
      {
        "id": "A",
        "text": "replication"
      },
      {
        "id": "B",
        "text": "randomization"
      },
      {
        "id": "C",
        "text": "blocking"
      },
      {
        "id": "D",
        "text": "cluster sampling"
      }
    ],
    "answer": "C",
    "explanation": "Blocking is used to reduce variation due to a known nuisance variable such as laboratory.",
    "masteryKey": "mc.10"
  },
  {
    "id": "MC11",
    "world": "probability-pop",
    "type": "mcq",
    "prompt": "One card is drawn from a standard 52-card deck. Which pair of events is mutually exclusive?",
    "choices": [
      {
        "id": "A",
        "text": "drawing a King and drawing a heart"
      },
      {
        "id": "B",
        "text": "drawing a King and drawing an Ace"
      },
      {
        "id": "C",
        "text": "drawing a red card and drawing a heart"
      },
      {
        "id": "D",
        "text": "drawing an Ace and drawing a heart"
      }
    ],
    "answer": "B",
    "explanation": "A single card cannot be both a King and an Ace.",
    "masteryKey": "mc.11"
  },
  {
    "id": "MC12",
    "world": "probability-pop",
    "type": "mcq",
    "prompt": "In a class, 36 students passed an exam and 24 of those students are women. What is P(Woman|Passed)?",
    "choices": [
      {
        "id": "A",
        "text": "24/50"
      },
      {
        "id": "B",
        "text": "24/36"
      },
      {
        "id": "C",
        "text": "36/50"
      },
      {
        "id": "D",
        "text": "12/36"
      }
    ],
    "answer": "B",
    "explanation": "Conditional probability restricts the denominator to the students who passed, so P(Woman|Passed)=24/36.",
    "masteryKey": "mc.12"
  },
  {
    "id": "MC13",
    "world": "probability-pop",
    "type": "mcq",
    "prompt": "Which formula is the general addition rule for two events A and B?",
    "choices": [
      {
        "id": "A",
        "text": "P(A union B)=P(A)+P(B)"
      },
      {
        "id": "B",
        "text": "P(A union B)=P(A)P(B)"
      },
      {
        "id": "C",
        "text": "P(A union B)=P(A)+P(B)-P(A intersect B)"
      },
      {
        "id": "D",
        "text": "P(A union B)=P(A intersect B)/P(B)"
      }
    ],
    "answer": "C",
    "explanation": "The intersection is subtracted once because it is counted twice in P(A)+P(B).",
    "masteryKey": "mc.13"
  },
  {
    "id": "MC14",
    "world": "normal-cloud",
    "type": "mcq",
    "prompt": "For Z~ N(0,1), which expression gives P(Z>1.35)?",
    "choices": [
      {
        "id": "A",
        "text": "pnorm(1.35)"
      },
      {
        "id": "B",
        "text": "1-pnorm(1.35)"
      },
      {
        "id": "C",
        "text": "qnorm(1.35)"
      },
      {
        "id": "D",
        "text": "2*pnorm(1.35)"
      }
    ],
    "answer": "B",
    "explanation": "pnorm gives cumulative area to the left, so a right-tail probability is 1-pnorm(1.35).",
    "masteryKey": "mc.14"
  },
  {
    "id": "MC15",
    "world": "normal-cloud",
    "type": "mcq",
    "prompt": "A student's score has z=-1.5. Which interpretation is correct?",
    "choices": [
      {
        "id": "A",
        "text": "The score is 1.5 raw-score units below the mean."
      },
      {
        "id": "B",
        "text": "The score is 1.5 standard deviations below the mean."
      },
      {
        "id": "C",
        "text": "The score is 1.5 standard deviations above the mean."
      },
      {
        "id": "D",
        "text": "The score is in the lowest 1.5 percent."
      }
    ],
    "answer": "B",
    "explanation": "A z-score measures signed distance from the mean in standard-deviation units.",
    "masteryKey": "mc.15"
  },
  {
    "id": "MC16",
    "world": "normal-cloud",
    "type": "mcq",
    "prompt": "Which R command finds the z-value k satisfying P(Z<k)=0.92 for Z~ N(0,1)?",
    "choices": [
      {
        "id": "A",
        "text": "pnorm(0.92)"
      },
      {
        "id": "B",
        "text": "qnorm(0.92)"
      },
      {
        "id": "C",
        "text": "1-pnorm(0.92)"
      },
      {
        "id": "D",
        "text": "prop.test(0.92)"
      }
    ],
    "answer": "B",
    "explanation": "qnorm takes a cumulative probability and returns the corresponding Normal quantile.",
    "masteryKey": "mc.16"
  },
  {
    "id": "MC17",
    "world": "hypothesis-space",
    "type": "mcq",
    "prompt": "A researcher wants to test whether the true population proportion differs from 0.40. Which hypotheses are correct?",
    "choices": [
      {
        "id": "A",
        "text": "H0: p=0.40, Ha: p!=0.40"
      },
      {
        "id": "B",
        "text": "H0: p-hat=0.40, Ha: p-hat!=0.40"
      },
      {
        "id": "C",
        "text": "H0: p=0.40, Ha: p>0.40"
      },
      {
        "id": "D",
        "text": "H0: p!=0.40, Ha: p=0.40"
      }
    ],
    "answer": "A",
    "explanation": "Hypotheses are written about the population parameter p, and 'differs' indicates a two-sided alternative.",
    "masteryKey": "mc.17"
  },
  {
    "id": "MC18",
    "world": "hypothesis-space",
    "type": "mcq",
    "prompt": "If Ha: p<0.55, the hypothesis test is",
    "choices": [
      {
        "id": "A",
        "text": "right-tailed"
      },
      {
        "id": "B",
        "text": "left-tailed"
      },
      {
        "id": "C",
        "text": "two-tailed"
      },
      {
        "id": "D",
        "text": "not a valid hypothesis test"
      }
    ],
    "answer": "B",
    "explanation": "The less-than alternative places evidence against H0 in the left tail.",
    "masteryKey": "mc.18"
  },
  {
    "id": "MC19",
    "world": "proportion-potion",
    "type": "mcq",
    "prompt": "For a one-proportion z test of H0: p=p0, which standard error is used in the z statistic?",
    "choices": [
      {
        "id": "A",
        "text": "sqrt(p-hat(1-p-hat)/n)"
      },
      {
        "id": "B",
        "text": "sqrt(p0(1-p0)/n)"
      },
      {
        "id": "C",
        "text": "sqrt(alpha(1-alpha)/n)"
      },
      {
        "id": "D",
        "text": "sqrt(p-value(1-p-value)/n)"
      }
    ],
    "answer": "B",
    "explanation": "The hypothesis-test standard error is calculated under H0 and therefore uses p0.",
    "masteryKey": "mc.19"
  },
  {
    "id": "MC20",
    "world": "hypothesis-space",
    "type": "mcq",
    "prompt": "A hypothesis test gives p-value = 0.028 with alpha = 0.05. What is the correct statistical decision?",
    "choices": [
      {
        "id": "A",
        "text": "Reject H0"
      },
      {
        "id": "B",
        "text": "Fail to reject H0"
      },
      {
        "id": "C",
        "text": "Accept H0"
      },
      {
        "id": "D",
        "text": "Increase alpha"
      }
    ],
    "answer": "A",
    "explanation": "Because 0.028 < 0.05, the result is statistically significant and H0 is rejected.",
    "masteryKey": "mc.20"
  },
  {
    "id": "TF01",
    "world": "sample-sprinkle",
    "type": "trueFalse",
    "prompt": "Different random samples from the same population can produce different sample statistics.",
    "choices": [
      {
        "id": "True",
        "text": "True"
      },
      {
        "id": "False",
        "text": "False"
      }
    ],
    "answer": "True",
    "explanation": "This is sampling variability.",
    "masteryKey": "tf.01"
  },
  {
    "id": "TF02",
    "world": "design-dessert",
    "type": "trueFalse",
    "prompt": "If an observational study finds a strong association between two variables, that association alone proves that one variable causes the other.",
    "choices": [
      {
        "id": "True",
        "text": "True"
      },
      {
        "id": "False",
        "text": "False"
      }
    ],
    "answer": "False",
    "explanation": "Observational association alone does not establish causation because confounding and other explanations may exist.",
    "masteryKey": "tf.02"
  },
  {
    "id": "TF03",
    "world": "design-dessert",
    "type": "trueFalse",
    "prompt": "Random assignment is used in an experiment to help balance uncontrolled variables across treatment groups.",
    "choices": [
      {
        "id": "True",
        "text": "True"
      },
      {
        "id": "False",
        "text": "False"
      }
    ],
    "answer": "True",
    "explanation": "Randomization helps make treatment groups comparable.",
    "masteryKey": "tf.03"
  },
  {
    "id": "TF04",
    "world": "design-dessert",
    "type": "trueFalse",
    "prompt": "Replication means applying the same treatment condition to multiple experimental units.",
    "choices": [
      {
        "id": "True",
        "text": "True"
      },
      {
        "id": "False",
        "text": "False"
      }
    ],
    "answer": "True",
    "explanation": "Replication provides repeated observations under the same treatment condition.",
    "masteryKey": "tf.04"
  },
  {
    "id": "TF05",
    "world": "design-dessert",
    "type": "trueFalse",
    "prompt": "A factor is an explanatory variable controlled or compared in an experiment, while a level is one setting or category of that factor.",
    "choices": [
      {
        "id": "True",
        "text": "True"
      },
      {
        "id": "False",
        "text": "False"
      }
    ],
    "answer": "True",
    "explanation": "This matches the factor/treatment-level terminology used in experimental design.",
    "masteryKey": "tf.05"
  },
  {
    "id": "TF06",
    "world": "probability-pop",
    "type": "trueFalse",
    "prompt": "Two events with positive probabilities can be both mutually exclusive and independent.",
    "choices": [
      {
        "id": "True",
        "text": "True"
      },
      {
        "id": "False",
        "text": "False"
      }
    ],
    "answer": "False",
    "explanation": "Mutually exclusive events have P(A intersect B)=0; independence with positive probabilities requires P(A intersect B)=P(A)P(B)>0.",
    "masteryKey": "tf.06"
  },
  {
    "id": "TF07",
    "world": "probability-pop",
    "type": "trueFalse",
    "prompt": "If P(B)>0, then P(A | B)=P(A intersect B)/P(B).",
    "choices": [
      {
        "id": "True",
        "text": "True"
      },
      {
        "id": "False",
        "text": "False"
      }
    ],
    "answer": "True",
    "explanation": "This is the conditional-probability rule.",
    "masteryKey": "tf.07"
  },
  {
    "id": "TF08",
    "world": "normal-cloud",
    "type": "trueFalse",
    "prompt": "For a Normal distribution, approximately 95% of observations lie within two standard deviations of the mean.",
    "choices": [
      {
        "id": "True",
        "text": "True"
      },
      {
        "id": "False",
        "text": "False"
      }
    ],
    "answer": "True",
    "explanation": "This is the 95% part of the 68-95-99.7 rule.",
    "masteryKey": "tf.08"
  },
  {
    "id": "TF09",
    "world": "normal-cloud",
    "type": "trueFalse",
    "prompt": "The command pnorm(q, mean, sd) returns the cumulative probability to the left of q for a Normal distribution.",
    "choices": [
      {
        "id": "True",
        "text": "True"
      },
      {
        "id": "False",
        "text": "False"
      }
    ],
    "answer": "True",
    "explanation": "pnorm is the Normal cumulative distribution function.",
    "masteryKey": "tf.09"
  },
  {
    "id": "TF10",
    "world": "normal-cloud",
    "type": "trueFalse",
    "prompt": "The command qnorm(p, mean, sd) returns a cutoff value whose cumulative probability is p.",
    "choices": [
      {
        "id": "True",
        "text": "True"
      },
      {
        "id": "False",
        "text": "False"
      }
    ],
    "answer": "True",
    "explanation": "qnorm reverses the Normal CDF: probability in, quantile out.",
    "masteryKey": "tf.10"
  },
  {
    "id": "TF11",
    "world": "normal-cloud",
    "type": "trueFalse",
    "prompt": "A negative z-score means the observation lies below the mean.",
    "choices": [
      {
        "id": "True",
        "text": "True"
      },
      {
        "id": "False",
        "text": "False"
      }
    ],
    "answer": "True",
    "explanation": "The sign of z indicates whether the observation is below or above the mean.",
    "masteryKey": "tf.11"
  },
  {
    "id": "TF12",
    "world": "hypothesis-space",
    "type": "trueFalse",
    "prompt": "The null hypothesis is written using a population parameter such as p or mu and contains an equality.",
    "choices": [
      {
        "id": "True",
        "text": "True"
      },
      {
        "id": "False",
        "text": "False"
      }
    ],
    "answer": "True",
    "explanation": "Hypotheses concern population parameters, not sample statistics.",
    "masteryKey": "tf.12"
  },
  {
    "id": "TF13",
    "world": "hypothesis-space",
    "type": "trueFalse",
    "prompt": "A smaller p-value provides stronger evidence against H0.",
    "choices": [
      {
        "id": "True",
        "text": "True"
      },
      {
        "id": "False",
        "text": "False"
      }
    ],
    "answer": "True",
    "explanation": "A small p-value indicates the observed result is less compatible with H0.",
    "masteryKey": "tf.13"
  },
  {
    "id": "TF14",
    "world": "hypothesis-space",
    "type": "trueFalse",
    "prompt": "If p-value > alpha, the correct decision is to reject H0.",
    "choices": [
      {
        "id": "True",
        "text": "True"
      },
      {
        "id": "False",
        "text": "False"
      }
    ],
    "answer": "False",
    "explanation": "When p-value > alpha, we fail to reject H0.",
    "masteryKey": "tf.14"
  },
  {
    "id": "TF15",
    "world": "hypothesis-space",
    "type": "trueFalse",
    "prompt": "Failing to reject H0 proves that H0 is true.",
    "choices": [
      {
        "id": "True",
        "text": "True"
      },
      {
        "id": "False",
        "text": "False"
      }
    ],
    "answer": "False",
    "explanation": "It only means the sample does not provide sufficient evidence against H0 at the chosen alpha.",
    "masteryKey": "tf.15"
  },
  {
    "id": "TF16",
    "world": "hypothesis-space",
    "type": "trueFalse",
    "prompt": "A Type I error occurs when H0 is rejected even though H0 is true.",
    "choices": [
      {
        "id": "True",
        "text": "True"
      },
      {
        "id": "False",
        "text": "False"
      }
    ],
    "answer": "True",
    "explanation": "A Type I error is a false positive.",
    "masteryKey": "tf.16"
  },
  {
    "id": "TF17",
    "world": "hypothesis-space",
    "type": "trueFalse",
    "prompt": "A Type II error occurs when we fail to reject H0 even though the alternative is true.",
    "choices": [
      {
        "id": "True",
        "text": "True"
      },
      {
        "id": "False",
        "text": "False"
      }
    ],
    "answer": "True",
    "explanation": "A Type II error is a false negative.",
    "masteryKey": "tf.17"
  },
  {
    "id": "TF18",
    "world": "proportion-potion",
    "type": "trueFalse",
    "prompt": "For a one-proportion z test, the success/failure check uses np0 and n(1-p0).",
    "choices": [
      {
        "id": "True",
        "text": "True"
      },
      {
        "id": "False",
        "text": "False"
      }
    ],
    "answer": "True",
    "explanation": "The test is evaluated under the null proportion p0.",
    "masteryKey": "tf.18"
  },
  {
    "id": "TF19",
    "world": "proportion-potion",
    "type": "trueFalse",
    "prompt": "For a one-proportion confidence interval, the standard error uses p-hat rather than p0.",
    "choices": [
      {
        "id": "True",
        "text": "True"
      },
      {
        "id": "False",
        "text": "False"
      }
    ],
    "answer": "True",
    "explanation": "A textbook/Wald CI uses sqrt(p-hat(1-p-hat)/n).",
    "masteryKey": "tf.19"
  },
  {
    "id": "TF20",
    "world": "hypothesis-space",
    "type": "trueFalse",
    "prompt": "A p-value is the probability that H0 is true.",
    "choices": [
      {
        "id": "True",
        "text": "True"
      },
      {
        "id": "False",
        "text": "False"
      }
    ],
    "answer": "False",
    "explanation": "A p-value is calculated assuming H0 is true; it is not a probability that H0 is true.",
    "masteryKey": "tf.20"
  }
];
// Each activity is an independently mastered source requirement.
const add = (id, world, prompt, correct, distractors, explanation = correct) => QUESTIONS.push({id,world,type:'mcq',prompt,choices:[correct,...distractors].map((text,i)=>({id:String.fromCharCode(65+i),text})),answer:'A',explanation,masteryKey:id.toLowerCase()});
const num = (id, world, prompt, answer, tolerance, explanation) => QUESTIONS.push({id,world,type:'numeric',prompt,answer,tolerance,explanation,masteryKey:id.toLowerCase()});
const S='sample-sprinkle', D='design-dessert', P='probability-pop', N='normal-cloud', H='hypothesis-space', Z='proportion-potion';
const csub='A random sample of 180 CSUB undergraduates contains 72 who work at least 20 hours per week. ';
add('OE01-individual',S,csub+'What is the individual?','One CSUB undergraduate student',['All CSUB undergraduates','The proportion 0.40','The 180 students as one unit']);
add('OE01-variable',S,csub+'What is the variable?','Whether the student works at least 20 hours per week, categorical',['The total number of universities, discrete','The student’s exact wage, continuous','The sample size, categorical']);
add('OE01-population',S,csub+'What is the population?','All CSUB undergraduate students',['Only the 180 sampled students','Only the 72 students who work','All university employees']);
add('OE01-parameter',S,csub+'What is the parameter?','The true proportion of all CSUB undergraduates who work at least 20 hours per week',['72/180','The 180 sampled students','The number of work hours for one student']);
add('OE01-sample',S,csub+'What is the sample?','The 180 selected CSUB undergraduates',['All CSUB undergraduates','The 72 workers only','The true population proportion']);
num('OE01-statistic',S,csub+'Calculate the sample proportion.',0.4,0.001,'p̂ = 72/180 = 0.40.');
add('OE02a',S,'StudentLife has one row per student. What is the observational unit?','One college student',['The whole dataset','A single variable','The college']);
add('OE02b',S,'Classify GPA, StudyHoursWeek, Employment, SleepHoursNight, in that order.','Continuous, continuous, categorical, continuous',['Categorical, discrete, continuous, categorical','Discrete, categorical, continuous, discrete','All categorical']);
add('OE02c',S,'Which mosaic command gives GPA summaries from StudentLife?','favstats(~GPA, data=StudentLife)',['favstats(GPA ~ StudentLife)','histogram(~GPA, data=StudentLife)','mean(~GPA, data=StudentLife)']);
add('OE02di',S,'Which command plots a histogram of SleepHoursNight?','histogram(~SleepHoursNight, data=StudentLife)',['bargraph(~SleepHoursNight, data=StudentLife)','histogram(StudentLife ~ SleepHoursNight)','bwplot(~SleepHoursNight, data=StudentLife)']);
add('OE02dii',S,'Which command makes a GPA boxplot?','bwplot(~GPA, data=StudentLife)',['histogram(~GPA, data=StudentLife)','xyplot(~GPA, data=StudentLife)','bargraph(~GPA, data=StudentLife)']);
add('OE02diii',S,'Which command puts StudyHoursWeek on x and GPA on y?','xyplot(GPA ~ StudyHoursWeek, data=StudentLife)',['xyplot(StudyHoursWeek ~ GPA, data=StudentLife)','histogram(~GPA, data=StudentLife)','xyplot(GPA + StudyHoursWeek, data=StudentLife)']);
add('OE02div-count',S,'Which command counts Employment categories?','tally(~Employment, data=StudentLife)',['favstats(~Employment, data=StudentLife)','tally(Employment ~ StudentLife)','bwplot(~Employment, data=StudentLife)']);
add('OE02div-prop',S,'Which command reports Employment proportions?','tally(~Employment, data=StudentLife, format="proportion")',['tally(~Employment, data=StudentLife, format="count")','prop.test(~Employment)','histogram(~Employment, data=StudentLife)']);
add('OE02dv',S,'Which command makes a bar graph of Employment?','bargraph(~Employment, data=StudentLife)',['histogram(~Employment, data=StudentLife)','bwplot(~Employment, data=StudentLife)','xyplot(~Employment, data=StudentLife)']);
num('OE03a',S,'Weekly exercise: Q1 = 4.5 and Q3 = 8.0 hours. Find IQR in hours.',3.5,0.01,'IQR = Q3 − Q1 = 8.0 − 4.5 = 3.5 hours.');
add('OE03b',S,'Study the exercise histogram and summary (mean 6.7, median 6.0). What is its shape?','Right-skewed',['Left-skewed','Symmetric','Uniform']);
add('OE03c',S,'Which center is more appropriate for this skewed exercise distribution?','Median, because it resists unusually large observations',['Mean, because it is pulled upward','Range, because it is a center','Standard deviation']);
add('OE04a',D,'What distinguishes an experiment from an observational study?','An experiment assigns treatments; an observational study observes without assigning them.',['Both randomly assign treatments','Neither can have confounding','Observational association proves causation']);
add('OE04b-factors',D,'In the battery study, temperature and material type are…','Factors',['Responses','Blocks','Samples']);
add('OE04b-level',D,'Which is an example of a factor level?','High temperature',['Battery life','Laboratory','All batteries']);
add('OE04b-combination',D,'Which is a treatment combination?','High temperature and Material B',['Material B alone','Battery life','A laboratory']);
add('OE04b-response',D,'The battery experiment measures what response variable?','Battery life',['Material type','Temperature','Laboratory']);
add('OE04b-replication',D,'What is replication in the battery experiment?','Testing multiple batteries at the same temperature–material combination',['Choosing one battery total','Grouping by laboratory','Randomly selecting laboratories']);
add('OE04b-randomization',D,'What is randomization in the battery experiment?','Randomly assigning treatments to batteries',['Grouping by laboratory','Repeating one measurement','Choosing only high temperature']);
add('OE04b-blocking',D,'What is blocking in the battery experiment?','Grouping by laboratory to reduce nuisance variation',['Selecting one battery per treatment','Ignoring laboratory differences','Changing the response variable']);
add('OE04c-srs',D,'Which describes simple random sampling?','Randomly select individuals from the full population',['Sample from every stratum','Randomly select whole groups','Survey volunteers']);
add('OE04c-strata',D,'Which describes stratified sampling?','Divide into groups and randomly sample from every group',['Select whole groups only','Take volunteers','Assign treatments']);
add('OE04c-cluster',D,'Which describes cluster sampling?','Randomly select groups, then survey all or many units within those groups',['Sample from every group','Select every tenth individual only','Assign treatment randomly']);
num('OE05a',P,'In a class, 24 women and 12 men passed. Find P(Woman | Passed).',2/3,0.005,'Condition on the 36 who passed: 24/36 = 0.6667.');
num('OE05b-A',P,'Of 50 students, 30 are women. Find P(A), where A = Woman.',0.6,0.001,'P(A) = 30/50 = 0.60.');
num('OE05b-B',P,'Of 50 students, 36 passed. Find P(B), where B = Passed.',0.72,0.001,'P(B) = 36/50 = 0.72.');
num('OE05b-intersection',P,'Of 50 students, 24 are women who passed. Find P(A ∩ B).',0.48,0.001,'P(A ∩ B) = 24/50 = 0.48.');
add('OE05c',P,'P(A)=0.60, P(B)=0.72, P(A ∩ B)=0.48. Are A and B independent?','No: 0.60 × 0.72 = 0.432, not 0.48',['Yes: 0.60 + 0.72 = 1.32','Yes: 0.48 = 0.72','No: all events are dependent']);
add('OE05d-rule',P,'Select the general addition rule.','P(A ∪ B) = P(A) + P(B) − P(A ∩ B)',['P(A ∪ B) = P(A)P(B)','P(A ∪ B) = P(A ∩ B)/P(B)','P(A ∪ B) = P(A) − P(B)']);
add('OE05d-exclusive',P,'If events are mutually exclusive, what is P(A ∩ B)?','0',['1','P(A)P(B) always','P(A)+P(B)']);
const standard='For Z ~ N(0,1), ';
num('OE06a-value',N,standard+'find P(Z < -1.10).',0.1357,0.001,'pnorm(-1.10) is approximately 0.1357.');
add('OE06a-code',N,standard+'choose the R command for P(Z < -1.10).','pnorm(-1.10)',['1-pnorm(-1.10)','qnorm(-1.10)','pnorm(1.10)']);
num('OE06b-value',N,standard+'find P(Z > 1.35).',0.0885,0.001,'1-pnorm(1.35) is approximately 0.0885.');
add('OE06b-code',N,standard+'choose the R command for P(Z > 1.35).','1-pnorm(1.35)',['pnorm(1.35)','qnorm(1.35)','pnorm(-1.35)-1']);
num('OE06c-value',N,standard+'find P(-0.60 < Z < 1.25).',0.6201,0.002,'Subtract the cumulative probabilities: 0.8944 - 0.2743 = 0.6201.');
add('OE06c-code',N,standard+'choose R code for P(-0.60 < Z < 1.25).','pnorm(1.25)-pnorm(-0.60)',['pnorm(1.25)+pnorm(-0.60)','qnorm(1.25)-qnorm(-0.60)','1-pnorm(1.25)']);
num('OE06d-value',N,standard+'find k such that P(Z < k) = 0.92.',1.4051,0.01,'qnorm(0.92) = 1.4051, about 1.41.');
add('OE06d-code',N,standard+'choose the command for the 92nd percentile.','qnorm(0.92)',['pnorm(0.92)','1-pnorm(0.92)','qnorm(0.08)']);
const norm='Exam scores are Normally distributed with mean 72 and standard deviation 6. ';
num('OE07a-z',N,norm+'Find the z-score for 66.',-1,0.01,'z = (66-72)/6 = -1.');
num('OE07a-p',N,norm+'Find P(X < 66).',0.1587,0.001,'P(Z < -1) is about 0.1587.');
add('OE07a-code',N,norm+'Choose R code for P(X < 66).','pnorm(66, mean=72, sd=6)',['qnorm(66, mean=72, sd=6)','1-pnorm(66, mean=72, sd=6)','pnorm(72, mean=66, sd=6)']);
add('OE07b-z',N,norm+'What are the z-scores for 69 and 81?','-0.50 and 1.50',['0.50 and -1.50','-3 and 9','-1 and 1']);
num('OE07b-p',N,norm+'Find P(69 < X < 81).',0.6247,0.002,'pnorm(81,72,6)-pnorm(69,72,6) is approximately 0.6247.');
add('OE07b-code',N,norm+'Select the direct R calculation for P(69 < X < 81).','pnorm(81,72,6)-pnorm(69,72,6)',['pnorm(69,72,6)-pnorm(81,72,6)','pnorm(81,72,6)+pnorm(69,72,6)','qnorm(81,72,6)']);
num('OE07c-z',N,norm+'Find the z-score for the 90th percentile.',1.2816,0.01,'qnorm(0.90) is about 1.2816.');
num('OE07c-score',N,norm+'Find the 90th percentile score.',79.69,0.1,'72 + 1.2816(6) = 79.69.');
add('OE07c-code',N,norm+'Which R command finds the 90th percentile score?','qnorm(0.90, mean=72, sd=6)',['pnorm(0.90, mean=72, sd=6)','qnorm(0.10, mean=72, sd=6)','qnorm(90, mean=72, sd=6)']);
num('OE07d-z',N,norm+'Find the z-score of 84.',2,0.01,'(84-72)/6 = 2.');
add('OE07d-interpret',N,norm+'Interpret a score of 84.','2 standard deviations above the mean',['2 points below the mean','2 standard deviations below the mean','84 standard deviations above the mean']);
add('OE07d-code',N,norm+'Choose R arithmetic for the z-score of 84.','(84-72)/6',['(72-84)/6','(84-72)*6','84/72-6']);
num('OE08a-math',N,'MATH score 88, mean 90, SD 1.5. Find the z-score.',-1.333,0.02,'(88-90)/1.5 = -1.333.');
num('OE08a-bio',N,'BIO score 62, mean 58, SD 1.2. Find the z-score.',3.333,0.02,'(62-58)/1.2 = 3.333.');
add('OE08b',N,'MATH z = -1.33 and BIO z = 3.33. Where was relative performance stronger?','BIO, because its z-score is higher',['MATH, because 88 is greater than 62','MATH, because its z-score is negative','Both were equal']);
add('OE09a',H,'What is a p-value?','Assuming H0 is true, the probability of a result at least as extreme in the direction(s) of Ha',['The probability H0 is true','The probability Ha is true','The significance level'], 'A p-value assumes H0 is true and measures extremeness under H0; it is not the probability H0 is true.');
add('OE09b-I',H,'What is a Type I error?','Reject a true H0',['Fail to reject a false H0','Reject a false H0','Fail to reject a true H0']);
add('OE09b-II',H,'What is a Type II error?','Fail to reject H0 when the alternative is true',['Reject a true H0','Reject a false H0','Fail to reject a true H0']);
add('OE09c',H,'Which decision rule is correct?','Reject H0 if p-value <= alpha; otherwise fail to reject',['Reject if p-value > alpha','Accept H0 if p-value > alpha','Reject whenever p-value > 0']);
add('OE09d',H,'Why say fail to reject rather than accept H0?','Insufficient evidence against H0 does not prove it true',['It proves H0 true','It proves Ha true','It means alpha equals zero']);
add('OE09e-different',H,'Which alternative and tail match “different from 0.60”?','Ha: p != 0.60, two-tailed',['Ha: p > 0.60, right-tailed','Ha: p < 0.60, left-tailed','H0: p != 0.60']);
add('OE09e-greater',H,'Which alternative and tail match “greater than 0.60”?','Ha: p > 0.60, right-tailed',['Ha: p != 0.60, two-tailed','Ha: p < 0.60, left-tailed','H0: p > 0.60']);
add('OE09e-less',H,'Which alternative and tail match “less than 0.60”?','Ha: p < 0.60, left-tailed',['Ha: p != 0.60, two-tailed','Ha: p > 0.60, right-tailed','H0: p < 0.60']);
const grad='A school claims at least 80% graduate on time. A sample of 200 has 150 on-time graduates; p-value is 0.015 at alpha 0.05. ';
add('OE10a',H,grad+'Define p.','The true proportion of all school students who graduate on time',['The sample proportion 150/200','The 200 students','The p-value']);
add('OE10b',H,grad+'The committee suspects a lower proportion. Choose hypotheses and tail.','H0: p = 0.80; Ha: p < 0.80; left-tailed',['H0: p = 0.80; Ha: p > 0.80; right-tailed','H0: p-hat = 0.80; Ha: p-hat < 0.80','H0: p = 0.80; Ha: p != 0.80; two-tailed']);
num('OE10c',H,grad+'Find the observed sample proportion.',0.75,0.001,'The point estimator is p-hat = X/n; observed p-hat = 150/200 = 0.75.');
add('OE10d',H,grad+'Choose the conclusion.','Reject H0; there is significant evidence the true on-time graduation proportion is below 80%.',['Fail to reject H0; this proves 80%.','Reject H0; the sample proportion is above 80%.','Accept H0.']);
const small='For H0: p = 0.38, Ha: p > 0.38, n = 150 and x = 66, ';
add('OE11a',Z,small+'check test conditions.','np0 = 57 and n(1-p0) = 93; both at least 10',['66 and 84','38 and 62','57 and 93; both below 10']);
num('OE11b',Z,small+'find p-hat.',0.44,0.001,'66/150 = 0.44.');
num('OE11c',Z,small+'calculate z.',1.514,0.03,'SE0 = sqrt(0.38*0.62/150) = 0.03963; z = (0.44-0.38)/SE0 = 1.514.');
add('OE11d',Z,small+'select R for the right-tail p-value after calculating z.','1-pnorm(z)',['pnorm(z)','2*pnorm(z)','qnorm(z)']);
add('OE11e',Z,small+'choose the complete R test.','prop.test(x=66, n=150, p=0.38, alternative="greater", correct=FALSE)',['prop.test(x=66, n=150, p=0.38, alternative="less", correct=FALSE)','prop.test(x=66, n=150, p=0.38, alternative="greater", correct=TRUE)','prop.test(x=66, n=150, p=0.44, alternative="greater", correct=FALSE)']);
const boss='A university historically reports 45% use support services. In a random sample of 200, 106 used services. ';
add('OE12-01-parameter',Z,boss+'Define p.','The true proportion of all university students using academic-support services',['The 106 sampled users','The sample proportion 0.53','The significance level']);
add('OE12-02-hypotheses',Z,boss+'Choose hypotheses to test whether the proportion differs from 45%.','H0: p = 0.45; Ha: p != 0.45',['H0: p = 0.45; Ha: p > 0.45','H0: p-hat = 0.45; Ha: p-hat != 0.45','H0: p != 0.45; Ha: p = 0.45']);
add('OE12-03-tail',Z,boss+'Which tail is appropriate?','Two-tailed',['Left-tailed','Right-tailed','No tails']);
add('OE12-04-condition',Z,boss+'Check test success/failure counts under H0.','90 and 110; both at least 10',['106 and 94','45 and 55','90 and 110; both below 10']);
num('OE12-05-phat',Z,boss+'Calculate p-hat.',0.53,0.001,'106/200 = 0.53.');
num('OE12-06-null-se',Z,boss+'Calculate the null standard error.',0.03518,0.001,'sqrt(0.45*0.55/200) = 0.03518.');
num('OE12-07-z',Z,boss+'Calculate the test z statistic.',2.274,0.04,'(0.53-0.45)/0.03518 = 2.274.');
num('OE12-08-pvalue',Z,boss+'Calculate the two-sided p-value.',0.023,0.003,'2*(1-pnorm(2.274)) is about 0.0230.');
add('OE12-09-decision',Z,boss+'With p-value 0.023 and alpha 0.05, what is the decision?','Reject H0',['Fail to reject H0','Accept H0','Increase alpha']);
add('OE12-10-conclusion',Z,boss+'Choose the contextual conclusion.','There is statistically significant evidence that the true proportion using support differs from 45%.',['The population proportion is proven to be 53%.','There is no evidence of a difference.','The sample proves all students use support.']);
add('OE12-11-proptest',Z,boss+'Choose the requested R test.','prop.test(x=106, n=200, p=0.45, alternative="two.sided", correct=FALSE)',['prop.test(x=106, n=200, p=0.53, alternative="two.sided", correct=FALSE)','prop.test(x=106, n=200, p=0.45, alternative="greater", correct=FALSE)','prop.test(x=106, n=200, p=0.45, alternative="two.sided", correct=TRUE)']);
add('OE12-12-ci-condition',Z,boss+'For the confidence interval, check the counts using p-hat.','106 and 94; both at least 10',['90 and 110','45 and 55','106 and 94; both below 10']);
add('OE12-13-alpha',Z,boss+'For an 87% confidence interval, find alpha and alpha/2.','0.13 and 0.065',['0.05 and 0.025','0.87 and 0.435','0.13 and 0.13']);
num('OE12-14-zstar',Z,boss+'For 87% confidence, find z*.',1.5141,0.01,'qnorm(0.935) is approximately 1.5141.');
num('OE12-15-ci-se',Z,boss+'Find the Wald interval standard error.',0.03529,0.001,'sqrt(0.53*0.47/200) = 0.03529.');
num('OE12-16-margin',Z,boss+'Find the 87% Wald margin of error.',0.05344,0.002,'1.5141*0.03529 = 0.05344.');
add('OE12-17-interval',Z,boss+'Choose the 87% Wald interval.','(0.4766, 0.5834)',['(0.4266, 0.5334)','(0.53, 0.87)','(0.0353, 0.0534)']);
add('OE12-18-interpret',Z,boss+'Interpret the 87% interval (0.4766, 0.5834).','We are 87% confident that the true proportion of all university students using support lies in this interval.',['87% of the sampled students are in the interval.','There is an 87% probability that this fixed parameter moves between these endpoints.','87% of individual students use support.']);
add('OE12-19-null',Z,boss+'Is 0.45 inside (0.4766, 0.5834)?','No',['Yes','Only if rounded to 0.5','Cannot compare a proportion to an interval']);
add('OE12-20-direct-test',Z,boss+'Choose direct R code for the two-sided test p-value given z.','2*(1-pnorm(abs(z)))',['pnorm(z)','1-pnorm(z)','qnorm(abs(z))']);
add('OE12-21-direct-ci',Z,boss+'Choose direct R code for the Wald interval.','0.53 + c(-1,1)*qnorm(0.935)*sqrt(0.53*0.47/200)',['0.53 + c(-1,1)*pnorm(0.935)*sqrt(0.45*0.55/200)','0.45 + c(-1,1)*qnorm(0.87)*sqrt(0.45*0.55/200)','qnorm(0.935) + c(-1,1)*0.53']);
add('OE13a',S,'Study the stream scatterplot. Describe its direction, form, and strength.','Strong, negative, approximately linear association',['Weak, positive, nonlinear association','Strong, positive, linear association','No association']);
add('OE13b',S,'In the stream plot, what tends to happen as nitrate increases?','Dissolved oxygen tends to decrease',['Dissolved oxygen must increase','Nitrate causes oxygen to decrease','Dissolved oxygen stays fixed']);
add('OE13c',D,'Can the observational stream relationship alone establish that nitrate causes lower oxygen?','No; confounding and other explanations may exist',['Yes, because the association is strong','Yes, because both are numerical','No, because negative associations never occur']);
add('OE13d',S,'Which mosaic command plots dissolved oxygen against nitrate for streams?','xyplot(DissolvedOxygen ~ Nitrate, data=streams)',['xyplot(Nitrate ~ DissolvedOxygen, data=streams)','histogram(~Nitrate, data=streams)','bargraph(~DissolvedOxygen, data=streams)']);
add('OE14-parameter',S,'What is a population parameter?','A numerical characteristic of the population',['A numerical summary computed from a sample','The random sampling procedure','The observed p-value']);
add('OE14-statistic',S,'What is a sample statistic?','A numerical summary calculated from sample data',['A fixed unknown population characteristic','The confidence level','The null hypothesis']);
add('OE14-estimator',S,'What is a point estimator?','A rule or statistic used to estimate a population parameter',['The population itself','A guarantee that a result is exact','A confidence level']);
add('OE14-se',S,'What is a standard error?','The standard deviation of a statistic’s sampling distribution, often estimated',['The range of the raw data','The probability H0 is true','The significance level']);
add('OE14-alpha',H,'What is a significance level?','The chosen threshold for rejecting H0, representing the long-run Type I error rate under H0',['The probability H0 is true','The sample proportion','The confidence interval center']);
add('OE14-pvalue',H,'What is a p-value?','Assuming H0 is true, the probability of a result at least as extreme as observed in the relevant direction(s)',['The probability that H0 is true','The chance the sample was random','The probability that the parameter changes']);
add('OE14-confidence',Z,'What does a confidence level describe?','The long-run proportion of intervals from the method that contain the true parameter',['The probability that H0 is true','The proportion of sample observations inside one interval','The observed p-value']);
const curve = (id,prompt,answer,curveCutoffs,explanation) => QUESTIONS.push({id,world:N,type:'curve',prompt,answer,curveCutoffs,explanation,masteryKey:id.toLowerCase()});
curve('OE06a-shade','For P(Z < -1.10), select the area under the standard Normal curve.','left',[-1.10],'Shade the area left of -1.10.');
curve('OE06b-shade','For P(Z > 1.35), select the area under the standard Normal curve.','right',[1.35],'Shade the area right of 1.35.');
curve('OE06c-shade','For P(-0.60 < Z < 1.25), select the area under the standard Normal curve.','between',[-0.60,1.25],'Shade between -0.60 and 1.25.');
add('OE10c-estimator',H,grad+'Which is the point estimator of p?','p-hat = X/n',['p = 0.80','alpha = 0.05','p-value = 0.015']);
add('OE12-20-phat-code',Z,boss+'Which R command directly calculates p-hat?','phat <- 106/200',['phat <- 200/106','phat <- 0.45','phat <- 106/0.45']);
add('OE12-20-z-code',Z,boss+'After setting phat <- 106/200, which R expression calculates z under H0?','(phat-0.45)/sqrt(0.45*0.55/200)',['(phat-0.45)/sqrt(phat*(1-phat)/200)','(phat-0.45)*sqrt(0.45*0.55/200)','(0.45-phat)/sqrt(0.45*0.55/200)']);
curve('OE06d-shade','The 92nd percentile is approximately 1.405. Select the area that represents P(Z < 1.405).','left',[1.405],'The cumulative 92% lies left of the cutoff 1.405.');
QUESTIONS.push({id:'OE06d-marker',world:N,type:'curve-marker',prompt:'Move the cutoff to the 92nd percentile of the standard Normal distribution.',answer:1.4051,tolerance:0.05,curveCutoffs:[0],explanation:'qnorm(0.92) is approximately 1.4051.',masteryKey:'oe06d-marker'});
QUESTIONS.push({id:'OE10c-estimator-order',world:S,type:'order',prompt:'Build the point estimator for a population proportion in order.',choices:[{id:'n',text:'n'},{id:'eq',text:'p-hat ='},{id:'divide',text:'/'},{id:'x',text:'X'}],answer:['eq','x','divide','n'],explanation:'The point estimator is p-hat = X/n.',masteryKey:'oe10c-estimator-order'});
QUESTIONS.push({id:'OE12-test-order',world:Z,type:'order',prompt:'Put these hypothesis-test steps in order.',choices:[{id:'conclude',text:'State a contextual conclusion'},{id:'hypotheses',text:'Define the parameter and hypotheses'},{id:'statistic',text:'Check conditions and calculate the test statistic'},{id:'decision',text:'Calculate the p-value and compare it with alpha'}],answer:['hypotheses','statistic','decision','conclude'],explanation:'Define hypotheses, check conditions and calculate the statistic, compare the p-value with alpha, then conclude in context.',masteryKey:'oe12-test-order'});
QUESTIONS.push({id:'OE04b-terms-match',world:D,type:'match',prompt:'Match each battery-experiment term to its role.',items:['Factor','Response variable','Blocking'],choices:[{id:'factor',text:'Temperature or material type'},{id:'response',text:'Measured battery life'},{id:'block',text:'Grouping batteries by laboratory'}],answer:['factor','response','block'],explanation:'Temperature and material type are factors, battery life is the response, and laboratory can be used as a block.',masteryKey:'oe04b-terms-match'});
QUESTIONS.push({id:'OE02b-variable-sort',world:S,type:'sort',prompt:'Classify these StudentLife variables.',items:['GPA','StudyHoursWeek','Employment','SleepHoursNight'],choices:[{id:'continuous',text:'Numerical continuous'},{id:'categorical',text:'Categorical'},{id:'discrete',text:'Numerical discrete'}],answer:['continuous','continuous','categorical','continuous'],explanation:'GPA, study hours and sleep hours are numerical continuous variables; employment is categorical.',masteryKey:'oe02b-variable-sort'});
QUESTIONS.push({id:'OE12-r-code-builder',world:Z,type:'code',prompt:'Build the R command for the two-sided proportion test with 106 successes, n = 200 and p0 = 0.45. Tap the fragments in order.',choices:[{id:'start',text:'prop.test('},{id:'counts',text:'x=106, n=200,'},{id:'null',text:'p=0.45,'},{id:'alt',text:'alternative="two.sided",'},{id:'end',text:'correct=FALSE)'}],answer:['start','counts','null','alt','end'],explanation:'Use prop.test(x=106, n=200, p=0.45, alternative="two.sided", correct=FALSE).',masteryKey:'oe12-r-code-builder'});
