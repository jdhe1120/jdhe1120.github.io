---
title: "[CHI Paper] Designing AI for Trust and Collaboration in Time-Constrained Medical Decisions"
---

*This blog post summarizes the contents of the research paper I co-authored while at Harvard, published at <a target="_blank" href="https://dl.acm.org/doi/10.1145/3411764.3445385">CHI '21</a> (ACM Conference on Human Factors in Computing Systems).*

Depression affects 264 million people worldwide, and the way antidepressants are selected is still largely trial-and-error. Roughly one-third of patients fail to achieve remission even after four medication trials. There are machine learning models that can predict treatment response, but they consistently fail to gain traction in clinical practice. The problem isn't model accuracy, but rather that these tools are designed in isolation from the clinical workflows.

For this project, we took a sociotechnical approach where we ran iterative co-design sessions with 14 primary care providers to understand how a clinical decision support tool for antidepressant selection would actually fit into practice. We found four key factors that fundamentally shape whether an AI tool gets used or ignored: patient preferences, clinical workflow processes, system resource constraints, and clinicians' existing domain knowledge. The most surprising finding challenged a core assumption in explainable AI: clinicians didn't want per-prediction feature-importance explanations. In a time-constrained appointment, parsing why the model weighted one feature over another was seen as unusable and unnecessary. Instead, they wanted one-time validation evidence (like RCT results showing the model works) to decide whether to trust the tool at all, and on-demand contrastive explanations only when the AI's recommendation diverged from clinical guidelines.

I think this reframes how we should design AI decision support. The mainstream focus in explainable AI on showing why each individual prediction was made may not actually be what clinicians need to trust and use these tools. Rather, instead of just trying to serve one user, perhaps these tools should be co-designed with clinicians to support the shared decision-making that happens between patients and providers!

Read the full paper on the <a target="_blank" href="https://dl.acm.org/doi/10.1145/3411764.3445385">ACM Digital Library &rarr;</a>
