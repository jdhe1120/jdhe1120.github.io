---
title: "[MSFT] Advancing Anomaly Detection with AIOps — Introducing AiDice"
---

*This blog post was originally published on the [Microsoft Azure Blog](https://azure.microsoft.com/en-us/blog/advancing-anomaly-detection-with-aiops-introducing-aidice/), which I co-authored with Azure CTO Mark Russinovich.*

At Azure, we use AIOps to continuously monitor health metrics across our cloud infrastructure. A key challenge my team worked on was detecting anomalies in large-scale, multi-dimensional time series data — where each component logs data across dozens of attributes like hardware type, OS version, and datacenter region, creating an exponential number of individual time series to monitor.

Before AiDice, we could only run anomaly detection on a manually selected subset of dimensions. Engineers then had to drill down into pivot tables to diagnose issues — a process that was slow and limited in scope. Microsoft Research and Azure combined forces to develop **AiDice** to solve both problems: it automatically localizes anomalous pivots across dozens of dimensions simultaneously by encoding the problem as a combinatorial optimization, searching the space far more efficiently than traditional approaches.

In one real-world case, we applied AiDice to monitor low memory events across more than a dozen dimensions. AiDice caught a memory leak hidden in a specific combination of build version, RAM type, and event type — an issue completely invisible in the aggregate trend but obvious once isolated to the right pivot. The responsible engineer was able to quickly diagnose and mitigate the issue from the alert context AiDice provided.

The full technical details are in the [ESEC/FSE 2020 paper](https://dl.acm.org/doi/10.1145/3368089.3417060). To read the full blog post, [see the Azure Blog &rarr;](https://azure.microsoft.com/en-us/blog/advancing-anomaly-detection-with-aiops-introducing-aidice/)
