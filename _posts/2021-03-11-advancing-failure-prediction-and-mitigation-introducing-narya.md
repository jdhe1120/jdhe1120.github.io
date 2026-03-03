---
title: "[MSFT] Advancing Failure Prediction and Mitigation — Introducing Narya"
---

*This blog post was originally published on the [Microsoft Azure Blog](https://azure.microsoft.com/en-us/blog/advancing-failure-prediction-and-mitigation-introducing-narya/), which I co-authored with Azure CTO Mark Russinovich.*

In Azure's cloud infrastructure, hardware failures are inevitable at scale — the challenge is predicting them before they impact customers. Before Narya, my team's failure prediction systems used static mitigation responses: when a failure was predicted, the same action was always taken regardless of the situation. This one-size-fits-all approach left significant room for improvement.

**Narya** is an end-to-end failure prediction and mitigation framework that closes the loop between prediction and action. It predicts imminent host failures using domain-expert rules and machine learning models over fleet telemetry, then dynamically selects the best mitigation action — such as live migration, kernel soft reboot, or deprioritizing allocations — using A/B testing and reinforcement learning. Crucially, it measures the actual customer impact of each decision and feeds that signal back to continuously improve both its predictions and its action selection.

Since running in production, Narya has reduced virtual machine interruptions by 26% on average compared to the previous static approach — a meaningful improvement for the millions of VMs running on Azure.

The full technical details are in the [OSDI 2020 paper](https://www.usenix.org/conference/osdi20/presentation/levy). To read the full blog post, [see the Azure Blog &rarr;](https://azure.microsoft.com/en-us/blog/advancing-failure-prediction-and-mitigation-introducing-narya/)
