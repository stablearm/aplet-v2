# 03-information-architecture.md

Version: 1.0

---

# Purpose

This document defines the complete information architecture of Aplet.

It is the single source of truth for:

- Navigation
- Routing
- Page hierarchy
- Product structure

Do not create pages outside this document.

---

# Product Structure

Aplet consists of two independent applications.

1.

Public Website

2.

Authenticated Workspace

Never mix these experiences.

---

# Public Website

Purpose

Convert visitors into registered users.

Pages

Home

Features

How It Works

Publishers

Advertisers

Pricing

Blog

FAQ

About

Contact

Login

Register

---

# Authenticated Workspace

Purpose

Manage Telegram business operations.

---

# Workspace Navigation

Dashboard

Campaigns

Platforms

Content Bots

Marketplace

Wallet

Revenue

Analytics

Subscription

Settings

---

# Dashboard

Purpose

Business overview.

Contains

- Business summary
- Revenue overview
- Campaign overview
- Platform overview
- Wallet overview
- Recent activity
- Action queue

Dashboard never becomes an analytics page.

---

# Campaigns

Purpose

Manage advertising campaigns.

Children

Campaign List

Campaign Details

Create Campaign

Edit Campaign

Campaign Analytics

Campaign Members

---

# Platforms

Purpose

Manage Telegram channels.

Children

Platform List

Platform Details

Performance

Audience

Connected Campaigns

Revenue

---

# Content Bots

Purpose

Manage Telegram bots.

Children

Bot List

Bot Details

Locked Content

Connected Campaigns

Downloads

Statistics

---

# Marketplace

Purpose

Discover publishers.

Children

Explore

Categories

Publisher Profile

Orders

Favorites

Search Results

---

# Wallet

Purpose

Financial management.

Children

Balance

Transactions

Deposits

Withdrawals

Settlement

Payment History

---

# Revenue

Purpose

Publisher earnings.

Children

Overview

Daily

Weekly

Monthly

Campaign Revenue

Platform Revenue

---

# Analytics

Purpose

Business intelligence.

Children

Growth

Campaign Performance

Platform Performance

Revenue

Audience

Conversion

CTR

Retention

---

# Subscription

Purpose

Manage subscription.

Children

Current Plan

Usage

Limits

Billing

Upgrade

Invoices

---

# Settings

Purpose

Application configuration.

Children

Profile

Account

Security

Notifications

Telegram Accounts

API

Team

Sessions

---

# Navigation Rules

Navigation depth

Maximum two levels.

Never create deep navigation.

---

Every primary page owns its own secondary navigation.

Example

Campaigns

↓

List

Details

Analytics

Not

Dashboard

↓

Campaign

↓

Analytics

---

# Breadcrumb Rules

Dashboard never appears inside breadcrumbs.

Example

Campaigns

>

Campaign Details

Correct.

---

# Global Elements

Always available.

Header

Sidebar

Notifications

User Menu

Command Search

Never duplicate them.

---

# Search

Global search must search

Campaigns

Platforms

Bots

Transactions

Publishers

Never search settings.

---

# Notifications

Notifications are global.

Never attach notifications to individual pages.

---

# Mobile Navigation

Bottom Navigation

Dashboard

Campaigns

Wallet

Notifications

Profile

Everything else is inside More.

---

# Future Modules

New modules must be added only as primary workspace modules.

Never insert new pages randomly.

---

# Information Architecture Principles

One page.

One responsibility.

One primary entity.

One primary action.

Everything else is secondary.
