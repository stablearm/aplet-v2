# 06-navigation.md

Version: 1.0

---

# Purpose

This document defines the navigation system of Aplet.

Navigation is the operating system of the product.

It must remain stable.

Users should build muscle memory.

Do not redesign navigation frequently.

---

# Navigation Layers

Aplet has only four navigation layers.

Global Navigation

↓

Secondary Navigation

↓

Page Navigation

↓

Context Actions

Nothing deeper.

---

# Global Navigation

Visible on every authenticated page.

Items

- Dashboard
- Campaigns
- Platforms
- Content Bots
- Marketplace
- Wallet
- Revenue
- Analytics
- Subscription
- Settings

Never change the order.

Never hide menu items based on temporary states.

---

# Sidebar

Sidebar is the primary navigation.

Always visible on desktop.

Collapsed only by explicit user action.

Never auto-collapse.

---

# Sidebar Structure

Top

Logo

Workspace

Global Search

---

Center

Navigation

---

Bottom

Subscription

Help

Settings

Profile

---

# Sidebar Rules

Icons first.

Label second.

Badge optional.

Description never.

Counters only when meaningful.

Do not show more than one badge per item.

---

# Active State

Only one primary navigation item can be active.

Never highlight multiple sections.

The active state must be obvious.

Not decorative.

---

# Secondary Navigation

Displayed inside modules.

Example

Campaigns

Overview

Members

Analytics

Budget

Activity

Only one level.

---

# Breadcrumbs

Only for nested pages.

Correct

Campaigns

>

Campaign Details

Correct

Platforms

>

Revenue

Wrong

Dashboard

>

Revenue

Dashboard is never part of breadcrumbs.

---

# Header

Header is not navigation.

Header provides tools.

Contains

Search

Notifications

Profile

Workspace Switcher

Quick Create

Nothing else.

---

# Global Search

Searches

Campaigns

Platforms

Bots

Publishers

Transactions

Files

Never search settings.

Search should be accessible from every page.

---

# Quick Create

Accessible from every page.

Contains

New Campaign

New Platform

Connect Bot

Deposit Wallet

Quick Create never opens complex forms.

Only launches workflows.

---

# Notifications

Global.

Never page-specific.

Grouped by

Financial

Campaigns

Platform

System

Security

Unread count only.

No notification center page.

---

# User Menu

Contains

Profile

Workspace

Subscription

Settings

Logout

Never place business actions here.

---

# Mobile Navigation

Bottom Navigation

Dashboard

Campaigns

Wallet

Notifications

Profile

Everything else inside

More

---

# Tablet Navigation

Collapsed sidebar by default.

Expandable.

Never use bottom navigation on tablet.

---

# Navigation Labels

Use business language.

Correct

Campaigns

Incorrect

Ads

Correct

Platforms

Incorrect

Channels

Correct

Wallet

Incorrect

Money

---

# Navigation Principles

Navigation represents business domains.

Not UI screens.

Every menu item must correspond to one core entity.

Every entity must have one navigation home.

---

# Future Expansion

New modules are appended before Settings.

Never insert modules randomly.

Keep navigation predictable.

---

# Final Rule

A user should always know:

Where they are.

Where they can go.

What the current section is responsible for.

Navigation exists to reduce thinking.

Never increase it.
