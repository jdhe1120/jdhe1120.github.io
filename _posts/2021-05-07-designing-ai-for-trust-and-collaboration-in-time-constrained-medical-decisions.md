---
title: "[CHI Paper] Designing AI for Trust and Collaboration in Time-Constrained Medical Decisions"
---

*This blog post summarizes the contents of the research paper I co-authored while at Harvard, published at [CHI '21](https://dl.acm.org/doi/10.1145/3411764.3445383) (ACM Conference on Human Factors in Computing Systems).*

Major depressive disorder affects 264 million people worldwide, and antidepressant selection remains largely trial-and-error — roughly one-third of patients fail to achieve remission even after four medication trials. Machine learning models can predict treatment response, but they consistently fail to gain traction in clinical practice. The problem isn't model accuracy; it's that these tools are designed in isolation from the clinical workflows, time constraints, and decision-making processes they're supposed to support.

We took a sociotechnical approach: iterative co-design sessions with 14 primary care providers to understand how a clinical decision support tool (DST) for antidepressant selection would actually fit into practice. Four key factors emerged — patient preferences, clinical workflow processes, system resource constraints, and clinicians' existing domain knowledge — that fundamentally shape whether an AI tool gets used or ignored. The most surprising finding challenged a core assumption in explainable AI: clinicians didn't want per-prediction feature-importance explanations. In a time-constrained appointment, parsing why the model weighted one feature over another was seen as unusable. Instead, they wanted one-time validation evidence (like RCT results showing the model works) to decide whether to trust the tool at all, and on-demand contrastive explanations only when the AI's recommendation diverged from clinical guidelines.

This reframes how we should design AI decision support: not as single-user prediction tools, but as multi-user collaborative systems that support shared decision-making between patients and providers. The paper argues that the mainstream XAI focus on per-prediction transparency may be misaligned with what clinicians actually need to trust and use these tools effectively.

Read the full paper on the [ACM Digital Library &rarr;](https://dl.acm.org/doi/10.1145/3411764.3445383)
