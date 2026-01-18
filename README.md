Intelligent Automation System – AI Workflow Prototype

Overview:

This project is a prototype AI-powered automation system built using n8n as the core orchestration engine.
It simulates a scalable, industry-agnostic growth workflow that handles user engagement, qualification, automation, escalation, tracking, and continuous optimization.

The system is designed to demonstrate system thinking, workflow automation expertise, and AI-driven adaptability under free-tier constraints, aligning directly with the AI Automation Engineer role requirements.

Objectives (Task Alignment):

This prototype was built to satisfy the pre-hiring task objectives:
• Basic chatbot for user engagement
• Workflow automation for processing, routing, and outputs
• AI features for decision-making and self-optimization
• Tracking and escalation logic
• “Living system” behavior through feedback loops
• Deployable as n8n workflow templates

High-Level Architecture:

USER → CHATBOT → QUALIFICATION → AUTOMATION
                     ↓
              TRACKING & ESCALATION
                     ↓
            SELF-OPTIMIZATION (CRON)
                     ↓
          DYNAMIC WORKFLOW GENERATION


The system is modular and split into independent workflows, allowing it to scale across industries and use cases.

Executable Workflows (Live Prototype)
These workflows are fully runnable in n8n Cloud (free tier) and form the working prototype.

1. Chatbot Hub – Lead Qualification & Automation:
File: workflows/n8n-01-chatbot-mock-ai.json
Flow:
Chat Trigger
→ Mock AI Lead Scorer (JS logic)
→ Mock AI Response Generator
→ Qualification Check
→ CRM Logging (Mock)
→ Email Nurture (Mock)
→ Slack Escalation (Mock)
→ Respond to Chat

What this demonstrates:
• Public-facing chatbot using n8n Chat Trigger
• Lead qualification and scoring logic
• Automated routing and escalation
• End-to-end working flow (Chat → Output)
• This is the primary live demo workflow.

2. AI Council – Multi-Agent Decision System:
File: workflows/n8n-02-ai-council-mock.json
Flow:
Webhook
→ Research Agent (Mock)
→ Strategy Agent (Mock)
→ Moderator
→ Decision Output


What this demonstrates:
• Multi-agent AI council pattern
• Separation of research, strategy, and synthesis
• Decision-making abstraction usable across domains

3. Self-Optimization Scheduler:
File: workflows/n8n-03-self-optimization-cron.json
Flow:
Cron (6-hour interval)
→ Mock Metrics Analysis
→ Optimization Decision
→ Logged Adjustment

What this demonstrates:
• Continuous optimization
• Feedback loop design
• “Living system” behavior

4. Dynamic Workflow Generator:
File: workflows/n8n-04-dynamic-workflow-gen.json
Flow:
Webhook
→ Parse Request
→ Mock AI Workflow Generator
→ Output Workflow JSON Snippet

What this demonstrates:
• Meta-automation
• Dynamic workflow generation
• Template-based scalability
• Conceptual (Production-Intent) Workflows

The following workflows represent real-world implementations using actual APIs (OpenAI, CRM, analytics, etc.).
They are included to demonstrate production intent and system design, but are not executed in the free-tier prototype.

01-chatbot-lead-qualification.json
02-ai-council-multi-agent.json
03-self-optimization-scheduler.json
04-dynamic-workflow-generator.json
05-metrics-dashboard-growth.json

Supporting Code & Configuration:
• src/utils.js
• Demonstrates JavaScript logic for scoring, formatting, and decision handling
• Represents how custom logic would be embedded in automation systems

src/config.json
• Configuration abstraction
• Represents environment-based scaling and template readiness
• These files are architectural artifacts, not runtime dependencies for n8n.

Assumptions & Constraints:
• Free-tier tools only
• No paid APIs required
• AI behavior simulated using code nodes
• Focus on architecture, orchestration, and adaptability, not production accuracy
• This mirrors early-stage SaaS prototyping constraints.

Live Prototype Access:
• Due to n8n Cloud free-tier sharing limitations, the live prototype is provided as importable n8n workflow JSON templates.
• Primary demo workflow:
• n8n-01-chatbot-mock-ai.json
• All executable workflows can be imported and run directly in n8n Cloud.