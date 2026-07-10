# 09-state-management.md

Version: 1.0

---

# Purpose

This document defines how application state is managed across Aplet.

Business logic must never live inside UI components.

UI components only render state.

---

# State Layers

Application State

↓

Server State

↓

Form State

↓

UI State

↓

Local Component State

Never mix these layers.

---

# Application State

Contains global application information.

Includes

- Authenticated User
- Workspace
- Permissions
- Theme
- Language
- Feature Flags

Persistent.

Available everywhere.

---

# Server State

Fetched from APIs.

Includes

- Campaigns
- Platforms
- Bots
- Wallet
- Revenue
- Analytics
- Marketplace
- Subscription

Always synchronized with backend.

Never duplicate server state.

---

# Form State

Temporary.

Examples

Create Campaign

Edit Profile

Withdraw Request

Bot Connection

Never store forms globally.

Destroy after completion.

---

# UI State

Visual only.

Examples

Sidebar collapsed

Dialog open

Drawer open

Selected tab

Sorting

Filters

Search query

Never send UI state to APIs.

---

# Local State

Private to one component.

Examples

Hovered row

Expanded accordion

Current slide

Tooltip visibility

Never promote local state unnecessarily.

---

# Source of Truth

Each business entity has one source of truth.

Campaign

↓

Campaign Service

Wallet

↓

Wallet Service

Platform

↓

Platform Service

Never create duplicate stores.

---

# Data Ownership

Every page owns exactly one primary entity.

Dashboard

Owns

Dashboard Summary

Campaign Details

Owns

Campaign

Wallet

Owns

Wallet

Revenue

Owns

Revenue

Never merge entity ownership.

---

# Data Fetching Rules

Pages request data.

Components receive data.

Components never fetch business data directly.

---

# Caching

Server state may be cached.

Forms are never cached.

Authentication is persistent.

Analytics may be refreshed automatically.

---

# Optimistic Updates

Allowed only for

Favorites

Read Notifications

Small preference changes

Not allowed for

Payments

Withdrawals

Revenue

Campaign Budget

Business-critical actions always wait for server confirmation.

---

# Loading Rules

Every async operation supports

Loading

Success

Empty

Error

Retry

No exceptions.

---

# Error Handling

Errors belong to services.

UI displays friendly messages.

Never expose backend errors directly.

---

# Pagination

Handled by server.

Never paginate manually on frontend.

---

# Filtering

Always server-driven when data can grow.

Client-side filtering only for small datasets.

---

# Searching

Debounced.

Server-side.

Never search large datasets locally.

---

# Real-time Updates

Reserved for

Notifications

Campaign Progress

Wallet Balance

Revenue

Everything else refreshes on demand.

---

# State Principles

Single Source of Truth.

Predictable Updates.

No Duplicate Data.

No Hidden State.

No Business Logic Inside Components.

UI reflects state.

State drives UI.

Never the opposite.
