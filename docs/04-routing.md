# 04-routing.md

Version: 1.0

---

# Purpose

This document defines the routing architecture of Aplet.

All routes must follow this structure.

Do not invent new routes.

Do not change route names.

---

# Public Routes

/

Homepage

/features

Platform overview

/how-it-works

Business model

/publishers

Publisher solution

/advertisers

Advertiser solution

/pricing

Subscription plans

/blog

Articles

/blog/[slug]

Single article

/faq

Frequently asked questions

/about

About Aplet

/contact

Contact

/login

Authentication

/register

Registration

/forgot-password

Password recovery

/reset-password

Reset password

/terms

Terms

/privacy

Privacy Policy

---

# Workspace Root

/workspace

All authenticated routes live inside this namespace.

Never create authenticated pages outside it.

---

# Dashboard

/workspace/dashboard

Business overview.

---

# Campaigns

/workspace/campaigns

Campaign list

/workspace/campaigns/new

Create campaign

/workspace/campaigns/[id]

Campaign details

/workspace/campaigns/[id]/analytics

Campaign analytics

/workspace/campaigns/[id]/members

Campaign members

/workspace/campaigns/[id]/edit

Edit campaign

---

# Platforms

/workspace/platforms

Platform list

/workspace/platforms/[id]

Platform details

/workspace/platforms/[id]/analytics

Platform analytics

/workspace/platforms/[id]/campaigns

Connected campaigns

/workspace/platforms/[id]/revenue

Platform revenue

---

# Content Bots

/workspace/bots

Bot list

/workspace/bots/new

Connect bot

/workspace/bots/[id]

Bot overview

/workspace/bots/[id]/content

Locked content

/workspace/bots/[id]/campaigns

Connected campaigns

/workspace/bots/[id]/downloads

Download statistics

---

# Marketplace

/workspace/marketplace

Marketplace

/workspace/marketplace/search

Search

/workspace/marketplace/categories

Categories

/workspace/marketplace/publishers/[id]

Publisher profile

/workspace/marketplace/orders

Orders

/workspace/marketplace/favorites

Favorites

---

# Wallet

/workspace/wallet

Wallet overview

/workspace/wallet/deposit

Deposit

/workspace/wallet/withdraw

Withdraw

/workspace/wallet/transactions

Transactions

/workspace/wallet/history

Settlement history

---

# Revenue

/workspace/revenue

Revenue overview

/workspace/revenue/daily

Daily revenue

/workspace/revenue/monthly

Monthly revenue

/workspace/revenue/campaigns

Campaign revenue

/workspace/revenue/platforms

Platform revenue

---

# Analytics

/workspace/analytics

Overview

/workspace/analytics/growth

Growth

/workspace/analytics/campaigns

Campaign analytics

/workspace/analytics/platforms

Platform analytics

/workspace/analytics/audience

Audience

/workspace/analytics/revenue

Revenue analytics

---

# Subscription

/workspace/subscription

Current subscription

/workspace/subscription/plans

Plans

/workspace/subscription/billing

Billing

/workspace/subscription/invoices

Invoices

---

# Settings

/workspace/settings

Profile

/workspace/settings/security

Security

/workspace/settings/notifications

Notifications

/workspace/settings/team

Team

/workspace/settings/telegram

Telegram accounts

/workspace/settings/api

API

/workspace/settings/sessions

Sessions

---

# Error Routes

/401

Unauthorized

/403

Forbidden

/404

Not Found

/500

Server Error

---

# Routing Rules

All authenticated pages must begin with:

/workspace

Never expose internal IDs in navigation.

Always use nested routing for child resources.

Avoid routes deeper than three levels.

Never place business logic inside routes.

Routes only represent navigation.

---

# Naming Rules

Use lowercase.

Use kebab-case.

Never use camelCase.

Never use underscores.

Route names must describe business entities.

Never describe UI.

Correct

/workspace/campaigns

Incorrect

/workspace/cards

Correct

/workspace/platforms

Incorrect

/workspace/channels

(The business entity is Platform.)

---

# Future Expansion

Future modules must follow the same routing convention.

Never break existing route hierarchy.

Routing stability is a product requirement.
