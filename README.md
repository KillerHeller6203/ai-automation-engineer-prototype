# Intelligent Automation System – AI Workflow Prototype

## Overview
This repository contains a prototype **AI-powered automation system** built using **n8n** as the core orchestration engine.  
It simulates a scalable, industry-agnostic workflow that handles **user engagement, qualification, automation, escalation, tracking, and continuous optimization**.

The project is designed to demonstrate **system thinking**, **workflow automation expertise**, and **AI-driven adaptability** under free-tier constraints, aligning directly with the **AI Automation Engineer** role requirements.

---

## Objectives (Task Alignment)
This prototype was built to satisfy the pre-hiring task objectives:

- Basic chatbot for user engagement  
- Workflow automation for processing, routing, and outputs  
- AI features for decision-making and self-optimization  
- Tracking and escalation logic  
- “Living system” behavior through feedback loops  
- Deployable as reusable n8n workflow templates  

---

## High-Level Architecture

![System Architecture](docs/architecture.png)

### Architecture Summary
- User interactions are handled through an AI-powered chatbot.
- Inputs are qualified using a combination of rule-based logic and AI scoring.
- Qualified requests trigger automated workflows across integrated services.
- Edge cases are escalated to humans for review.
- Metrics are logged and analyzed continuously.
- A self-optimization engine refines prompts and logic over time.
- The system supports dynamic workflow generation for scalable automation.

---

## Executable Workflows (Live Prototype)

These workflows are **fully runnable in n8n Cloud (free tier)** and form the working prototype.

### 1. Chatbot Hub – Lead Qualification & Automation
**File:** `workflows/n8n-01-chatbot-mock-ai.json`

**Flow:**
Chat Trigger
→ Mock AI Lead Scorer (JS Logic)
→ Mock AI Response Generator
→ Qualification Check
→ CRM Logging (Mock)
→ Email Nurture (Mock)
→ Slack Escalation (Mock)
→ Respond to Chat


**Demonstrates:**
- Public-facing chatbot using n8n Chat Trigger  
- Lead qualification and scoring logic  
- Automated routing and escalation  
- End-to-end working automation flow  
- Primary live demo workflow  

---

### 2. AI Council – Multi-Agent Decision System
**File:** `workflows/n8n-02-ai-council-mock.json`

**Flow:**
Webhook
→ Research Agent (Mock)
→ Strategy Agent (Mock)
→ Moderator
→ Decision Output


**Demonstrates:**
- Multi-agent AI council pattern  
- Separation of research, strategy, and synthesis  
- Reusable decision-making abstraction  

---

### 3. Self-Optimization Scheduler
**File:** `workflows/n8n-03-self-optimization-cron.json`

**Flow:**
Cron (Scheduled)
→ Mock Metrics Analysis
→ Optimization Decision
→ Logged Adjustment


**Demonstrates:**
- Continuous optimization  
- Feedback loop design  
- “Living system” behavior  

---

### 4. Dynamic Workflow Generator
**File:** `workflows/n8n-04-dynamic-workflow-gen.json`

**Flow:**
Webhook
→ Parse Request
→ Mock AI Workflow Generator
→ Output Workflow JSON Template


**Demonstrates:**
- Meta-automation  
- Dynamic workflow generation  
- Template-based scalability  

---

## Conceptual (Production-Intent) Workflows
The following workflows represent real-world implementations using actual APIs (OpenAI, CRM, analytics).  
They are included to demonstrate **production intent and system design**, but are not executed in the free-tier prototype.

- `01-chatbot-lead-qualification.json`
- `02-ai-council-multi-agent.json`
- `03-self-optimization-scheduler.json`
- `04-dynamic-workflow-generator.json`
- `05-metrics-dashboard-growth.json`

---

## Supporting Code & Configuration

### `src/utils.js`
- JavaScript utilities for scoring, formatting, and decision handling  
- Demonstrates how custom logic integrates into automation workflows  

### `src/config.json`
- Configuration abstraction for environment-based scaling  
- Represents template readiness and system portability  

> These files are architectural artifacts and not runtime dependencies for n8n.

---

## Assumptions & Constraints
- Free-tier tools only  
- No paid APIs required  
- AI behavior simulated using code nodes  
- Focus on orchestration, adaptability, and system design  
- Mirrors early-stage SaaS prototyping constraints  

---

## Live Prototype Access
Due to n8n Cloud free-tier sharing limitations, the live prototype is provided as **importable n8n workflow JSON templates**.

**Primary demo workflow:**
- `n8n-01-chatbot-mock-ai.json`

All executable workflows can be imported and run directly in **n8n Cloud**.

