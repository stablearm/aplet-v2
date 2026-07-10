# 11-frontend-architecture.md

Version: 1.0

---

# Purpose

This document defines the frontend architecture of Aplet.

Every implementation must follow this architecture.

No feature may bypass these rules.

---

# Tech Stack

Framework

Next.js

Language

TypeScript

Styling

Tailwind CSS

UI

shadcn/ui

Icons

Lucide

Forms

React Hook Form

Validation

Zod

Data Fetching

TanStack Query

State

Zustand (Application State Only)

Charts

Recharts

Tables

TanStack Table

---

# Project Structure

src/

app/

components/

features/

hooks/

lib/

services/

store/

types/

schemas/

styles/

assets/

config/

---

# App Layer

Responsible for

Routing

Layouts

Metadata

Providers

Page composition

Never place business logic here.

---

# Feature Layer

Every business module owns one feature.

Example

features/

campaigns/

wallet/

platforms/

bots/

analytics/

marketplace/

subscription/

dashboard/

settings/

---

Each feature contains

components/

hooks/

services/

types/

schemas/

constants/

utils/

---

# Shared Components

Only reusable UI.

Never business-specific.

Examples

Button

Dialog

Card

Table

Input

Tabs

Badge

Avatar

Chart

---

# Business Components

Remain inside their feature.

Example

features/campaigns/components

CampaignCard

CampaignBudget

CampaignTimeline

CampaignMembers

Never move them into shared.

---

# Hooks

Shared Hooks

useDebounce

useLocalStorage

useMediaQuery

Feature Hooks

useCampaign()

useWallet()

usePlatform()

useRevenue()

---

# Services

Every feature owns its own service.

CampaignService

WalletService

PlatformService

AnalyticsService

Never merge services.

---

# Types

Global Types

User

ApiResponse

Pagination

Shared UI Types

Business Types

Campaign

Wallet

Platform

Bot

Revenue

Subscription

---

# Schemas

Validation belongs here.

Never validate inside components.

---

# Constants

Contains

Routes

Permissions

Limits

Status values

Never hardcode.

---

# Utils

Pure functions only.

No API.

No UI.

No side effects.

---

# Store

Application State only.

Examples

User

Workspace

Theme

Language

Permissions

Sidebar

Never store server data here.

---

# Styling

Tailwind only.

No inline styles.

No CSS modules.

No styled-components.

---

# Assets

Contains

Illustrations

Icons

Images

Logos

Fonts

Never mix with components.

---

# Config

Contains

Environment

Navigation

Feature Flags

Application constants

---

# Naming

Folders

kebab-case

Components

PascalCase

Hooks

camelCase

Types

PascalCase

Constants

UPPER_SNAKE_CASE

---

# Import Rules

Shared

↓

Feature

↓

Page

Never reverse.

Shared must never import from features.

---

# Dependency Rules

Features cannot depend on each other.

Communication happens through

Shared

or

Services.

---

# Scalability

Every new module should be added without modifying existing modules.

Open for extension.

Closed for modification.

---

# Final Principle

The codebase should grow horizontally.

Never vertically.

Adding a new business module should feel identical to adding every previous module.
