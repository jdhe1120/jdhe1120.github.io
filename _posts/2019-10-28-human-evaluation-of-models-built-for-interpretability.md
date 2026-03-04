---
title: "[HCOMP Paper] Human Evaluation of Models Built for Interpretability"
---

*This blog post summarizes the contents of a research paper I co-authored while at Harvard, published at <a target="_blank" href="https://doi.org/10.1609/hcomp.v7i1.5280">HCOMP '19</a> (AAAI Conference).*

There's a lot of excitement around interpretable machine learning right now. Researchers keep proposing new methods to build models that humans can actually understand. But here's the thing: we don't really know *which* properties of a model make it interpretable. Most work just optimizes for structural simplicity, meaning fewer rules and smaller models, and assumes that simpler equals more interpretable. The problem is that if you over-regularize for simplicity, you sacrifice predictive accuracy. So we need to figure out which specific types of complexity actually hurt human understanding the most.

To answer that, we ran controlled experiments on Amazon Mechanical Turk. We tested how three types of decision-set complexity affect people's ability to understand a model: the number of rules (basically model size), the number of cognitive chunks per rule, and the number of repeated terms across rules. Participants worked across two domains and three core interpretability tasks: verification (is this prediction correct?), simulation (what would the model predict?), and counterfactual reasoning (what needs to change to flip the prediction?). The results showed a clear, consistent ranking. Cognitive chunks per rule matter the most, followed by the number of rules, with repeated terms having the least impact. In other words, packing intermediate concepts into a single rule hurts people's understanding more than simply adding more rules, which in turn matters more than repeating feature references.

The takeaway is practical. Different regularization strategies target different types of complexity, and our results suggest you should prioritize regularizers that penalize cognitive chunk count over ones that just minimize model size. What's encouraging is that this ranking held up across all tasks and domains. It suggests that general design principles for human-simulatable ML systems do exist!

Read the full paper on the <a target="_blank" href="https://doi.org/10.1609/hcomp.v7i1.5280">AAAI Digital Library &rarr;</a>
