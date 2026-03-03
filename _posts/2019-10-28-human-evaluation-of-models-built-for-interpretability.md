---
title: "[HCOMP Paper] Human Evaluation of Models Built for Interpretability"
---

*This blog post summarizes the contents of a research paper I co-authored while at Harvard, published at <a target="_blank" href="https://doi.org/10.1609/hcomp.v7i1.5280">HCOMP '19</a> (AAAI Conference).*

Interpretable machine learning has seen an explosion of interest, with researchers proposing increasingly sophisticated methods to learn models that humans can understand. But there's a fundamental gap: we don't actually know which properties of a model make it truly interpretable to people. Most work optimizes for structural simplicity — fewer rules, smaller models — under the assumption that simpler means more interpretable. The problem is that over-regularizing for simplicity sacrifices predictive accuracy, so we need to understand which specific types of complexity hurt human understanding the most.

We ran controlled human-subjects experiments on Amazon Mechanical Turk to directly measure how three types of decision-set complexity affect people's ability to understand a model: the number of rules (model size), the number of cognitive chunks per rule, and the number of repeated terms across rules. Participants worked across two domains and three core interpretability tasks — verification (is this prediction correct?), simulation (what would the model predict?), and counterfactual reasoning (what needs to change to flip the prediction?). The results revealed a clear, consistent ranking: cognitive chunks per rule matter most, followed by the number of rules, with repeated terms having the least impact. In other words, introducing intermediate concepts within a rule hurts simulatability more than simply adding more rules, which in turn matters more than repeating feature references.

These findings have direct implications for how we build interpretable models. Different regularization strategies target different types of complexity, and our results suggest that regularizers penalizing cognitive chunk count should be prioritized over those that simply minimize model size. The consistency of the ranking across tasks and domains is encouraging — it suggests that general design principles for human-simulatable ML systems exist, rather than everything being context-dependent.

Read the full paper on the <a target="_blank" href="https://doi.org/10.1609/hcomp.v7i1.5280">AAAI Digital Library &rarr;</a>
