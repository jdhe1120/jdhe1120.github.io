---
title: "The Rise of Agentic AI"
---

*This post is based on a Technical Learning Session I gave for the AI Club in February 2025 on the Rise of Agentic AI.*

The term "agentic" has gotten a lot of hype recently, and I think a lot of people have wanted to better undersatnd what it really means. In reinforcement learning, the word "agent" has been around for a while, but it's now been repurposed in this LLM wave to mean something new. The goal of this the talk I presented to the HBS AI Club wasn't to explain everything, but rather to give enough context so that students can keep learning on their own!

## What Makes AI "Agentic"?

In general, people seem to agree that agentic AI systems are designed to make decisions as autonomously as possible, acting with limited human supervision. But I think it's important to note that something being "agentic" isn't just a binary yes or no. There's very much a spectrum from less agentic to more agentic. Overall, there are five key design patterns that build up a system to be more agentic. Huge shoutout to Andrew Ng and his team who provide a very helpful course on Agentic AI on  DeepLearning.ai where I learned many of these concepts from!

**1. Self-Reflection.** First, it turns out that when an agent reflects on its own task,it is able to perform much better and act more 'agentically'. As an example, normally an AI might just write some code. But an agent might write the code, write unit tests, run the tests, reflect on why some failed, then fix the code. That's a key design pattern: to make something more agentic, you often need to have it look back at itself and think more about what it's been doing. There's a paper called [Reflexion](https://arxiv.org/abs/2303.11366) which illustrates exactly this concept.

![Reflexion self-reflection diagram](/img/blog/the-rise-of-agentic-ai/reflexion-diagram.png)

**2. Autonomous Action.** When you think about something on the more agentic side, you want something that's able to work independently without too much intervention or a predefined plan. Think about a stock recommendation chatbot versus an autonomous trading agent that's constantly analyzing market conditions, adjusting its strategy, executing trades, and generating daily reports for you.

**3. Tool Use.** If you ask an LLM to solve a math problem, a normal LLM is simply predicting the next most probably set of words (tokens) to guess the solution. But if you give it access to code execution, you can achieve a lot more with the same model. Instead of predicting text, it predicts the code needed to solve the problem. Anything that gives agents capabilities with tools (search, email, image generation, code execution) makes it more agentic.

![Tool use example](/img/blog/the-rise-of-agentic-ai/tool-use.png)

**4. Planning & Reasoning.** This is really the fundamental building block of agentic AI. There's a great example in the [HuggingGPT](https://arxiv.org/abs/2303.17580) paper where they asked the model to generate an image of a girl reading a book with the same pose as a boy in a reference image. Without planning, you can't just predict what that should look like. But with reasoning capabilities, the LLM extracts the rough positioning of the boy, then uses that positioning to generate the new image. The model plans out intermediate steps to get to the result.

![Advanced reasoning example](/img/blog/the-rise-of-agentic-ai/advanced-reasoning.png)

**5. Multi-Agent Collaboration.** Instead of using just one LLM, there's this paper called [ChatDev](https://arxiv.org/abs/2307.07924) where the authors basically set up a mini company to write code. They had a CEO agent and a CTO agent coming up with the high-level plan, then a CTO working with a programmer to code it out, then a reviewer and a tester. All of these can use the same base model, but having specialized roles with narrow-focused feedback actually improves performance.

## Why does this matter? Agentic AI Improves Performance

Here's what is ultimately the incredible finding. If you look at the performance of GPT-3.5 in a zero-shot setting, it scores about 48% on the HumanEval coding benchmark, while GPT-4 gets around 65%. But if you apply these agentic design patterns (reflection, tool usage, planning, multi-agent collaboration), GPT-3.5 can actually outperform GPT-4's zero-shot score. That's huge, because it means people can get more out of the same model, whether for cost savings purposes, or whether it's just to get better performance essentially for free without having to wait for a more advanced model to release.

![Coding benchmark (HumanEval) showing agentic AI performance improvements](/img/blog/the-rise-of-agentic-ai/agentic-ai-implications.png)

## Real-World Examples

Now, let's walk through a few examples to make this more concrete.

**Perplexity** is a search engine doing search in a smarter fashion, with a lot of intermediate steps to give you citations. If you look at their chain of thought, you can see them doing self-reflection. At the end, it'll say something like "let me double-check the dates and facts to avoid errors." They have access to web search tools, they're using reasoning models (I believe they default to R1), and they have multiple specialized LLMs working together. One handles the query, another writes a plan, an execution LLM carries out the plan with access to tools, and then another LLM formulates the final answer and double-checks that it really answers your question.

![Perplexity agentic design patterns](/img/blog/the-rise-of-agentic-ai/perplexity.png)

**Browser and computer agents** like OpenAI's Operator and Anthropic's Computer Use let AI navigate the browser and use your computer. With Operator, the AI is using the same screen you see, typing and clicking to control the browser. Right now you probably need a virtual machine so it can't do too much damage if something goes wrong. The interesting question isn't really about Instacart grocery ordering. It's about what use cases will actually sustain once these agents have access to a browser, and eventually your laptop.

**AI coding tools** are another great example. You can ask them to refactor an entire codebase, like changing all API calls from OpenAI to Anthropic, and the agent goes through each file, highlights what it added and removed, explains why, and packages everything into a pull request. You could even have another coding agent review that PR and push it through. There are tons of coding tools right now: Cursor, Windsurf, GitHub Copilot, Replit Agent, v0 by Vercel, Bolt.new by StackBlitz.

**Deep Research** tools from OpenAI and others produce impressive results. People in our group who have used it said the quality is what they'd expect from a junior analyst or junior consultant: a 12-to-15,000-word report with citations in about 12 to 15 minutes. That has significant implications for B2B.

## What's Driving This Wave of Agentic AI?

I think it boils down to two reasons.

**Better foundational models, and they're getting much cheaper.** When we started school in August 2024, there were no reasoning models. Then in September, OpenAI released the o1 preview, and in December we got the official release. Then DeepSeek R1 came out, a chain-of-thought model roughly on par with o1, but almost 10-20x cheaper, while exposing the full chain of thought (which o1 had previously hidden). Suddenly companies like Perplexity can use very cheap reasoning models. If multi-agent collaboration requires constantly calling models back and forth, and that's very expensive, companies won't do it. If it's incredibly cheap, companies have tons of freedom to be creative and innovate.

**Better tooling across the entire stack.** New tools and companies are being built throughout every layer of the agentic AI stack. It's a new and evolving space. The big picture is that these technologies are appearing and improving rapidly because models have become extremely advanced and cheap at the same time.

## The Agentic AI Stack

Next, let's cover teh Agentic AI STack. There's a lot to digest here, so let me break it down layer by layer:

![AI Agents Stack](/img/blog/the-rise-of-agentic-ai/agentic-ai-stack.png)

Shoutout to Letta for the great diagram!

- **Vertical Agents:** finalized products for end users in specialized verticals. Decagon for customer support, Harvey for legal, Devin for software engineering, Perplexity for search.
- **Hosting & Deployment:** this area isn't really formalized yet, but companies are trying to standardize how you host and interact with agents. Will there be a standardized agent API protocol? Maybe, maybe not.
- **Observability:** as you deploy agents, how do you monitor them? With multiple agents collaborating, you have tons of inputs and outputs, intermediate steps, chain-of-thought logs, and performance metrics. You want to make sure nothing's going wrong or breaking.
- **Frameworks:** orchestration libraries like AutoGen (Microsoft), LangChain, and CrewAI that help you set up and manage agents. With AutoGen, for example, all you need to do at a basic level is give each agent a system message like "you are a critic, review the writer's work" and then string together interactions. You can have a writer, a critic, an SEO reviewer, a legal reviewer, and a meta-reviewer that synthesizes all the feedback. The research shows that having these narrower-focused feedback mechanisms is more effective than just doing one run.
- **Memory & Storage:** models are stateless, meaning they don't hold any information about you between calls. Every time you send a query to ChatGPT, it's actually getting your entire chat history. For simple chats that's fine, but with agentic systems having multiple agents communicating across LLMs with tons of intermediate steps, memory management becomes a real challenge. Companies like MemGPT (now Letta) are working on managing this. Vector databases help store high-dimensional data in ways specialized for LLMs.
- **Agent Tools:** companies like Exa are building search engines designed specifically for AI systems, not humans. Agents are currently using the internet, which was designed for humans. Is that the best way for agents to get information? Is there a world where there's a separate set of protocols?
- **Foundational Models:** the base reasoning engines (GPT-4, Claude, Gemini, Llama, DeepSeek)

Some companies operate across many layers. LangChain shows up in multiple parts of the stack, and OpenAI has their Assistants API spanning several layers. Different companies have different strategies: some bet on one layer, some try to cover the whole stack, some just offer the final product. A lot of people agree the foundational model layer is getting commoditized, but there's much less clarity about whether the layers in the middle will become commoditized or end up being really valuable.

## Business & Ethical Implications

When I first read the phrase "Service as a Software" (as opposed to Software as a Service), I actually thought it was a typo. and didn't think much of it. A few weeks later, as I was learning more about different startup's pricing models, I suddenly remembered the phrase from before and realized it wasn't a typo at all.

We've been in a world where software is a service: think Microsoft Office, your Netflix subscriptions, your Spotify subscriptions. But in this agentic paradigm, you can sometimes offer a service delivered as software. You're saying "let me just get everything done for you." There's even a new phrase, "a-commerce" instead of e-commerce, like agentic commerce, where you always ask agents to do things for you.

Personally, my view on the B2C side is I'm not so sure how the pricing model will work. But the B2B opportunities seem significant, because when you think about a service being replaced by software and you can eliminate a headcount, suddenly a company is saving hundreds of thousands in salary, insurance, and overhead. That's a much easier sell. This does lead to the implication that right now, entry-level jobs and workflows may be quite at risk. A software engineer just graduating this year has a much harder time than a senior engineer who's doing architecture design and can use agents to complement their work. There's this concept going around that jobs are essentially buckets of workflows. Even if a job doesn't go away entirely, specific workflows within it might.

There are a lot of difficult ethical questions here. Companies often pitch "we're going to augment your workforce," but the reality is it often only makes financial sense if you augment, then lay off people after, and then finally save money. So are is it actually augmenting or replacing?

There are also questions about how agents choose their tools. If I send an agent to look up financial data, one model might use Yahoo Finance while another uses Bing. How does the model decide this? Who do you advertise to now, is it to people or to AI agents? Do we need to specify our preferences? The more I learn, the more questions I ended up having and with less answers.

I think a useful framework is to consider complexity of workflow on one axis and cost of error on the other. Right now, most companies are in the quadrant of less complexity and low cost of error, like customer support refunds for a $10 subscription. That's very different from a bad medical decision. As more companies enter the space, we'll likely see them start targeting more complex workflows with higher stakes.

## Looking Ahead

The takeaway I keep coming back to is that nobody knows what's going to happen.

We're still in the very early stages. We haven't seen massive-scale agentic AI rolled out yet. We haven't seen mission-critical workloads being trusted to agentic systems. The examples so far are relatively lower stakes compared to healthcare or finance.

But the field is moving incredibly fast. When we started school, there were no reasoning models. Since then, we've had o1, DeepSeek R1, and a whole new landscape. By the time we graduate in May 2026, I genuinely don't know where things will be.

And this is just the text world. The physical world with robotics and embodied agents is even earlier. There's this concept of generalized physical intelligence, where robots use the same kind of reasoning to figure out how to pick up an egg, do laundry, or clean dishes. The same design patterns apply whether the agent is writing code or navigating a warehouse.

The field is evolving so fast it's genuinely hard to keep up. New paradigms come out every month, models improve every month. I think the best thing any of us can do is keep learning and share what we find, because it's impossible for any one person to stay on top of all of it.
