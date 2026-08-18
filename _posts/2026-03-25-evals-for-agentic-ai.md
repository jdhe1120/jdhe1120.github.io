---
title: "Evals for Improving Agentic AI Workflows"
tags: [Tutorial]
---

*This post is based on a Technical Learning Session I gave for the HBS AI Club in March 2026. Shoutout to DeepLearning.AI where I learned many of these concepts from!*

Last year we covered [the rise of agentic AI](/blog/2025/02/18/the-rise-of-agentic-ai/): what makes AI "agentic," the design patterns, and the stack. This time I wanted to go one level deeper into something I think is really underappreciated: how do you actually *measure* whether your agent is working, and how do you systematically improve it?

## The Agent Building Loop

Right now, most people building agents are stuck on step zero: just building and tweaking. What you want instead, however, is a loop!

![The agent building loop: build, measure, analyze, fix](/img/blog/evals-for-agentic-ai/agent-building-loop.png)

## Why Measurement Matters

Traditional software is like a vending machine: you press a button, you get a product. If something breaks, you can trace through it step by step and fix it.

GenAI is more like a weighted dice. You've weighted it so the high numbers come up most of the time, but every once in a while you still roll low. Your agent might work 99% of the time and still fail in ways you can't predict.

![Why measurement matters: GenAI failures are hard to predict](/img/blog/evals-for-agentic-ai/why-measurement-matters.png)

**End-to-end evals** let you measure these failures systematically. Take a shopping assistant that keeps name-dropping competitors: does the output contain any competitor names? Say 7% do. Now you've got a number to drive to zero. Or a PDF extractor that reads "09/05/2025" as September 5th in the US and May 9th in the UK: does the extracted date match the correct one? 5% mismatch. Now you know where you stand.

Here's the thing though. Without measurement you don't just miss errors, you risk *reintroducing* them. You fix the competitor problem, tweak the prompt a few weeks later to sound friendlier, and suddenly competitors are back.

A lot of folks think they need to spend weeks designing the perfect eval system before building anything. It's actually the opposite!

![Getting started: build first, measure second](/img/blog/evals-for-agentic-ai/getting-started.png)

You'll learn a lot more from 20 real examples than from weeks of theoretical planning.

## Choosing the Right Eval

There are two main evaluation methods, and they're good at different things.

![Objective versus subjective evaluation methods](/img/blog/evals-for-agentic-ai/objective-vs-subjective.png)

One really important point here: avoid rating scales for subjective evals. If you get a 5 out of 10 on friendliness, what do you actually *do* with that? It's not clear how a 5 differs from a 6. Plus, LLM judges are biased and tend to favor longer responses regardless of quality. Use binary pass/fail or counting-based metrics instead. Both are way more actionable.

The second dimension to think about is whether **per-example ground truth** exists.

![2x2 framework: eval method versus per-example ground truth](/img/blog/evals-for-agentic-ai/2x2-framework.png)

The distinction matters. For PDF dates, you need a human to supply the correct answer for *each* document, almost like labeled data in supervised learning. For competitor mentions, one list of names applies to every output. Think of it as one-to-one versus one-to-many.

Two quick notes. You can layer both eval types on the same output, and since the objective check is basically free, you probably should. You can also check how good your LLM judge is by having a human score a sample and comparing. Grading is a much simpler task than generation, so judges are often surprisingly accurate with a clear rubric, which gives you confidence to scale across thousands of examples.

## Using Traces to Debug

A metric tells you *that* something is wrong. It doesn't tell you *where* or *why*. That's where **traces** come in: a log of every intermediate step, like an X-ray for your agent.

![A trace showing every intermediate step of a research agent](/img/blog/evals-for-agentic-ai/traces-xray.png)

In our research agent, the search terms were fine, but the web search returned poor results because all the quality sources blocked scraping. The LLM then faithfully synthesized those bad sources into a bad answer.

![Root cause traced to the web search step, not the LLM](/img/blog/evals-for-agentic-ai/root-cause-web-search.png)

So the root cause wasn't the LLM at all, it was the search API. The fix was swapping to a paid API with better sources, and no prompt changes were needed anywhere.

Once you're looking at failures, here's the process I'd follow:

![Error analysis in five steps](/img/blog/evals-for-agentic-ai/error-analysis-steps.png)

This feels manual at first, and honestly it's a bit of an art. But even a rough tally across 10 to 20 failures gives you a clear picture. In DeepLearning.AI's essay writer example, 45% of failures traced back to search results and only 5% to search term generation. That tells you exactly where to spend your time.

## Component-Level Evals

Once you know which step is the problem, you can test just that step in isolation.

![Component eval testing a single step in isolation](/img/blog/evals-for-agentic-ai/component-eval.png)

Why bother isolating? Less noise, faster and cheaper runs, and it directly measures the thing you're trying to fix. Same logic as a controlled experiment.

How you fix it depends on what kind of component it is:

![Common ways to fix a component](/img/blog/evals-for-agentic-ai/fixing-components.png)

After any change, re-run both the component eval and the end-to-end eval to make sure you didn't accidentally break something else. That's the whole point of having the measurement infrastructure in the first place.

## The Industry Landscape

Here's the reality: most teams aren't doing evals yet. LangChain's State of AI Agents survey (1,300+ respondents, December 2025) found that 89% of teams with agents in production have observability, but only 54% run offline evals, and 23% aren't evaluating at all.

![LangChain survey results on what teams evaluate agents on](/img/blog/evals-for-agentic-ai/langchain-survey.png)

Teams generally fall into three buckets: no evals and vibe-checking outputs manually, DIY Python scripts with no CI/CD integration, or mature platforms like Braintrust, DeepEval, and LangSmith with LLM-as-judge plus CI/CD gating.

I think evals are roughly where software testing was fifteen years ago. Engineers never loved testing either, but once tools like Selenium made it easy, adoption followed. As Anthropic put it: "Evals also shape how quickly you can adopt new models. When more powerful models come out, teams without evals face weeks of testing while competitors with evals can quickly determine the model's strengths, tune their prompts, and upgrade in days."

The startup space is crowded and consolidating fast.

![The eval startup landscape](/img/blog/evals-for-agentic-ai/eval-startup-landscape.png)

Startups are winning deals over big tech tooling for three reasons: they're model-agnostic, open source, and CI/CD-native.

Each big player has a different strategy. OpenAI wants to own the eval layer as a lock-in feature, which raises a fair question: do you trust an eval framework owned by a model provider to be objective? Anthropic is taking more of an educate-rather-than-sell approach, betting that teaching you to eval well builds trust. Google, Microsoft, and AWS are embedding evals into their cloud consoles.

One interesting question that came up in the session: if you're building on a harness like Claude Code, can you even eval what's happening inside? At the time, mostly no. How much access platform providers will grant is still unsettled, and that ties directly into who ends up controlling the eval layer.

## Looking Ahead

If you take one thing away from this post, I hope it's the **Build, Measure, Analyze, Fix** loop. Start with 20 examples. Use the 2x2 framework to pick your eval type. When things break, inspect traces to find where, then build component evals to fix the root cause and re-measure.

We're still very early here, and I think there's a huge opportunity both in the space itself and in getting ahead by building solid evals for whatever you're working on. Good evals dramatically speed up development, days instead of weeks, and they let you measure what the business actually cares about: not just quality, but latency, cost, and user satisfaction.

Thanks for reading, and hope you found this useful!
