---
title: "[Walkthrough] How to Create a WhatsApp Assistant Bot Using N8N, Twilio, and WhatsApp's API"
---

*I recently built a WhatsApp chatbot using N8N, Twilio, and Anthropic. See below for step-by-step walkthrough!*

A few days ago, I built a WhatsApp assisstant in order to try a new way of managing my Google calendar. It turned out to be a lot more approachable than I expected, so I wanted to draft up a blog post to walk through how to build one yourself!

In this post, I'll cover all the accounts you need, the API credits you'll need to pay for, and how to have your assistant working so you can actually start to text it and use it!

![A demo WhatsApp conversation showing the bot greeting a user, listing its capabilities, and looking up a calendar event](/img/blog/whatsapp-assistant-bot/demo-conversation.png)

*A test conversation with our WhatsApp bot in action.*

## What We're Building

The architecture has three main pieces:

- **N8N** is the orchestrator. It's an open-source workflow automation platform that connects everything together. Think of it as the tool that manages the flow of information. It takes an input, it does a set of tasks, and it provides the output.
- **Twilio** is the bridge to WhatsApp.  Twilio is a service that helps users or companies manage texting over phone numbers (think customer support, communications, marketing, etc). One of it's offerings is to handle phone numbers to receive and send Whatsapp messages in convenient fashion.
- **Anthropic's API** is the AI brain. It handles the conversation with the user, and has the intelligence for tool use, which allows you to connect to tools such as Google or Outlook to complete your request.

The flow looks like this:

<div style="display: flex; align-items: center; justify-content: center; gap: 0.4rem; margin: 1.5rem 0;">
  <span style="font-weight: bold; display: flex; align-items: center; height: 28px;">User</span>
  <span style="display: flex; align-items: center; height: 28px;">→</span>
  <img src="/img/blog/whatsapp-assistant-bot/whatsapp-logo.png" alt="WhatsApp" style="height: 36px; width: 36px; object-fit: contain; display: block; position: relative; top: 11px;">
  <span style="display: flex; align-items: center; height: 28px;">→</span>
  <img src="/img/blog/whatsapp-assistant-bot/twilio-logo.png" alt="Twilio" style="height: 36px; width: auto; object-fit: contain; display: block; position: relative; top: 11px;">
  <span style="display: flex; align-items: center; height: 28px;">→</span>
  <img src="/img/blog/whatsapp-assistant-bot/n8n-logo.png" alt="N8N" style="height: 36px; width: auto; object-fit: contain; display: block; position: relative; top: 11px;">
  <span style="display: flex; align-items: center; height: 28px;">→</span>
  <img src="/img/blog/whatsapp-assistant-bot/twilio-logo.png" alt="Twilio" style="height: 36px; width: auto; object-fit: contain; display: block; position: relative; top: 11px;">
  <span style="display: flex; align-items: center; height: 28px;">→</span>
  <img src="/img/blog/whatsapp-assistant-bot/whatsapp-logo.png" alt="WhatsApp" style="height: 36px; width: 36px; object-fit: contain; display: block; position: relative; top: 11px;">
  <span style="display: flex; align-items: center; height: 28px;">→</span>
  <span style="font-weight: bold; display: flex; align-items: center; height: 28px;">User</span>
</div>


A customer sends a message on WhatsApp, Twilio forwards it to our N8N workflow, N8N lverages it's AI Agent node (in this case powered by Anthropic), it generates a response (potentially utilizes tools to complete your task eg. looking at your Google Calendar), and then N8N sends that response back through Twilio to the customer's WhatsApp.

## Step 1: Setting Up N8N

N8N is an open-source workflow automation tool, and it's actually available for free if you self-host it (but this requires a little bit of set up). Alternatively, you can also use their [cloud version](https://n8n.io/) because it's the fastest way to get started (they offer a free trial with 1,500 workflow executions which is plenty for testing).

Once you're in the dashboard, click **"Create a workflow"** to get started. We'll pause and come back later after we've set up the other services.

## Step 2: Setting Up Twilio as the WhatsApp Gateway

Twilio is what lets us programmatically send and receive WhatsApp messages. Create a Twilio account if you don't have one, and once you're in the dashboard, grab your **Account SID** and **Auth Token**. You'll need both of these later when connecting Twilio to N8N.

Next, you'll want to buy a phone number. Go to "Phone Numbers", "Manage", then "Buy a Number" in the dropdown menu. Make sure all the capability checkboxes are checked, search for a number, and purchase it. This should cost about $1.15/month (and your free trial should work for this).

![Twilio Buy a Number page showing available phone numbers with capabilities and pricing](/img/blog/whatsapp-assistant-bot/buy-a-number.png)

Next, we will set up **WhatsApp Senders**. Navigate to the WhatsApp Senders page (under Messaging, Senders). Hit create a new sender. Select the phone number you just purchased and click **"Continue with Facebook"**. Because WhatsApp Business is a Meta application, the verification flow goes through Facebook.

You'll go through a few steps: getting started with Meta, choosing (or creating) your business, and setting up a WhatsApp Business profile with a name and category. Then you'll need to verify your Twilio number by receiving an OTP and entering it. If your sender status shows "offline" or "pending" after you're done, try repeating the connection step. This sometimes takes a few attempts and also waiting 10-15 minutes can help. You want to make sure you see the status as **"online"** before moving forward.

## Step 3: Creating the Anthropic API Key

Head to the [Anthropic console](https://console.anthropic.com/settings/keys) and create an API key. Copy the secret and save it somewhere safe, as you will need it for N8N.

## Step 4: Wiring Up the N8N Workflow

Now let's go back to N8N and wire everything together. The main workflow pipeline has three nodes, plus several sub-nodes attached to the AI Agent (a chat model, memory, and tools):

**1. Twilio Trigger Node.** This listens for incoming WhatsApp messages. Add a Twilio Trigger node, configure it with your Account SID and Auth Token, and set it to trigger on new messages. When someone sends a WhatsApp message to your Twilio number, this node fires and gives you the message body, the sender's number, and other metadata.

**2. AI Agent Node.** Add an **AI Agent** node. This is N8N's built-in agent that can use tools and maintain conversations. For the chat model, select **Anthropic** and connect it with your Anthropic API key. Choose your preferred Claude model (I used Claude Sonnet 4). In the agent's system prompt, define how it should behave. Here's a simple example:

{% raw %}
```
Today's date is: {{ new Date() }}. Respond in a friendly way. Complete the tasks using any tools you have access to that the user requests. The message is below:


<message>

{{ $json.data.body }}

</message>
```
{% endraw %}

For the user message, you can get that syntax by dragging in the `body` field from the Twilio trigger, which represents the actual text the customer sent. I also added the current date and time as additional context in the prompt, which helps the assistant give more relevant answers. For memory, attach a Simple Memory sub-node to the agent. This keeps track of recent messages so the assistant maintains conversation continuity across messages from the same user. You can set the Key to $json.data.from, which is the phone number of the user texting. Finally, attach **Google Calendar tools** to the agent. Specifically add **Get Events**, **Update Event**, and **Create Event** (see diagram below). These give the agent the ability to look up, modify, and create calendar entries on your behalf. You'll need to authenticate each tool with your Google account via OAuth.

**3. Twilio Send SMS Node.** This sends the assistant's response back to the customer. Add a Twilio Send SMS node, configure it with the same Twilio credentials, and set the message body to the output from the AI Agent node.

One important detail: because we're sending via WhatsApp (not regular SMS), you need to prefix phone numbers with `whatsapp:`. The "from" number is your Twilio WhatsApp number, and the "to" number is the customer's number (pulled from the trigger's "from" field). Make sure to format these correctly. Check the N8N Twilio node documentation for the exact syntax.

![The complete N8N workflow showing Twilio Trigger, AI Agent with Anthropic Chat Model, Simple Memory, and three Google Calendar tool nodes, connected to a Send SMS node](/img/blog/whatsapp-assistant-bot/n8n-workflow.png)

*The complete N8N workflow: Twilio Trigger → AI Agent (with Anthropic model, memory, and Google Calendar tools) → Send SMS.*

## Testing It All Together

At this point, you can actually test the basic flow! Send a message to your Twilio WhatsApp number and you should get a response from the assistant. If it works, congratulations!! You have a working AI chatbot on WhatsApp. Specifically, you can test three scenarios:

**Scenario 1: Basic greeting.** Send "Hi" to the WhatsApp number. 

![A demo WhatsApp conversation showing the bot greeting a user](/img/blog/whatsapp-assistant-bot/demo-conversation-1.png)

**Scenario 2: New Calendar Entry.** 

![WhatsApp conversation showing the bot scheduling an entry](/img/blog/whatsapp-assistant-bot/demo-conversation-schedule.png)


**Scenario 3: Edit Existing Calendar Entry.** Ask the bot to find an existing event and change its title. 

![WhatsApp conversation showing the bot finding a Feb 2 calendar event and renaming it from "get prescription" to "happy birthday"](/img/blog/whatsapp-assistant-bot/test-edit-event.png)

If all three scenarios work, you've got a fully functional AI assistant running on WhatsApp!

## Wrapping Up

What's fun about this project is seeing how simple it is for someone to deploy something practical for a small business. A year or two ago, building something like this would have required significantly more infrastructure and custom code. There's plenty of room to extend this further. You could add more tools, connect to more apps, and with N8N being open-source, you can self-host and customize it however you need. See my blog post (coming soon) on using N8N to build a SWE and PM AI Agent, called AorB! Ultimately, the best way to learn is to try something yourself, so I hope this blog post helped you!

## Security Considerations

Before you go live with this, there's something important to keep in mind. Right now, anyone who knows your Twilio phone number can text the bot and interact with your Google Calendar. That means a stranger could read your events, create new ones, or modify existing ones just by sending a WhatsApp message.

The easiest fix is to add a phone number check at the very start of your N8N workflow. Before the message reaches the AI Agent, compare the sender's number (from the Twilio trigger) against a whitelist of allowed numbers. If the sender isn't on the list, reject the message or send back a generic "not authorized" reply. This way, only you (or people you trust) can actually use the bot.

More broadly, any N8N workflow with a publicly accessible trigger (Twilio webhooks, HTTP endpoints, etc.) is an attack surface. Be thoughtful about what tools and permissions you give the agent behind those endpoints. Connecting your Google Calendar is fine for personal testing, but you probably wouldn't want to expose something like full email access or file deletion without proper safeguards.

This project is really meant for testing and learning. If you wanted to turn it into something production-grade, you'd want proper authentication, rate limiting, logging, and access controls. But for experimenting with agentic workflows and getting a feel for what's possible, it's a great place to start!