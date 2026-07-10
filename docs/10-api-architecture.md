# 10-api-architecture.md

Version: 1.0

---

# Purpose

This document defines how the frontend communicates with backend services.

All API communication must follow these rules.

Business logic belongs to the API layer.

Never inside components.

---

# Architecture

UI

↓

Hooks

↓

Services

↓

HTTP Client

↓

Backend API

Components never call APIs directly.

---

# Folder Structure

src/

lib/

api/

client.ts

auth.ts

campaigns.ts

platforms.ts

bots.ts

wallet.ts

revenue.ts

analytics.ts

marketplace.ts

subscription.ts

settings.ts

types/

schemas/

hooks/

---

# HTTP Client

There is only one HTTP client.

Responsibilities

- Base URL
- Authentication
- Refresh Token
- Headers
- Retry
- Error normalization
- Timeouts

Never create multiple API clients.

---

# Services

Each business entity owns one service.

Campaign

↓

campaigns.ts

Wallet

↓

wallet.ts

Platform

↓

platforms.ts

Revenue

↓

revenue.ts

Never mix entities.

---

# Hooks

Hooks expose business data.

Examples

useCampaigns()

useCampaign()

useWallet()

useRevenue()

usePlatform()

Hooks never transform business logic.

They expose data only.

---

# API Responses

All responses must be normalized.

Components should never care about backend response shape.

Service Layer converts backend responses into frontend models.

---

# Authentication

Authentication is automatic.

Every authenticated request includes

Authorization Bearer Token

Refresh handled automatically.

Logout on refresh failure.

---

# Request Lifecycle

Idle

↓

Loading

↓

Success

↓

Error

↓

Retry

Every request follows this lifecycle.

---

# Error Handling

Convert backend errors into user-friendly errors.

Never display raw API messages.

Map

401

Unauthorized

403

Forbidden

404

Not Found

422

Validation Error

500

Unexpected Error

---

# Validation

Validate data before reaching components.

Use schemas.

Reject invalid responses.

---

# File Upload

Uploads belong to services.

Never upload directly from UI.

Expose upload progress.

Support cancellation.

---

# Pagination

Backend controls

Page

Limit

Cursor

Frontend never calculates pagination.

---

# Search

Server-side only.

Debounced.

Cancelable.

---

# Filters

Server-driven.

Represented in URL when applicable.

Shareable.

---

# Sorting

Server-side.

Stable.

Never sort large datasets locally.

---

# Caching

Cache server responses.

Invalidate only affected entities.

Never clear entire cache after small updates.

---

# Optimistic Updates

Allowed

Read Notification

Favorites

Preferences

Not Allowed

Wallet

Revenue

Payments

Withdrawals

Campaign Budget

---

# Retry Strategy

Safe GET requests

Retry automatically.

Mutations

Never retry automatically.

Require user confirmation.

---

# Logging

Log

Network Errors

API Errors

Unexpected Responses

Do not log

Tokens

Passwords

Sensitive Data

---

# Security

Never expose secrets.

Never hardcode endpoints.

Never trust frontend validation.

Always assume backend is the source of truth.

---

# API Design Principles

One service.

One entity.

One responsibility.

Predictable naming.

Strong typing.

Normalized responses.

No duplicated logic.

---

# Final Principle

The frontend should behave as if the backend could change tomorrow.

Only the API layer should absorb those changes.

Everything above it remains stable.
