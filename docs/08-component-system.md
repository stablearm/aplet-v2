# 08-component-system.md

Version: 1.0

---

# Purpose

This document defines every UI component category used across Aplet.

Components are reusable business building blocks.

Never create page-specific components unless absolutely necessary.

---

# Component Hierarchy

Foundation

↓

Primitives

↓

Compositions

↓

Business Components

↓

Page Sections

↓

Pages

---

# Foundation

Contains no business logic.

Includes

- Colors
- Typography
- Radius
- Shadows
- Spacing
- Grid
- Motion
- Icons

---

# Primitives

The smallest reusable UI pieces.

Components

Button

Input

Textarea

Select

Checkbox

Radio

Switch

Avatar

Badge

Chip

Tooltip

Divider

Skeleton

Spinner

Icon

Surface

Card

Dialog

Drawer

Tabs

Accordion

Progress

---

# Layout Components

AppShell

Sidebar

Header

Footer

Container

Section

Grid

Stack

SplitLayout

PageHeader

Breadcrumb

EmptyState

ErrorState

LoadingState

---

# Navigation Components

Sidebar Navigation

Sidebar Item

Bottom Navigation

Top Navigation

Breadcrumb

Workspace Switcher

Search

Notification Center

User Menu

Quick Create

---

# Feedback Components

Toast

Alert

Banner

Confirmation Dialog

Inline Validation

Progress Indicator

Success State

Error State

---

# Data Display Components

Stat Card

Metric

KPI

Chart Card

Table

List

Timeline

Activity Feed

Status Badge

Progress Ring

Progress Bar

Mini Chart

Trend Indicator

Info Row

Key Value Pair

---

# Business Components

## Dashboard

Revenue Widget

Wallet Widget

Campaign Widget

Platform Widget

Task Widget

Activity Widget

Health Widget

---

## Campaign

Campaign Card

Campaign Status

Budget Summary

Performance Summary

Campaign Timeline

Campaign Members

Campaign Filters

Campaign Actions

---

## Platform

Platform Card

Platform Health

Platform Revenue

Platform Members

Platform Growth

Platform Campaigns

---

## Content Bot

Bot Card

Bot Status

Bot Overview

Locked File Card

Download Statistics

Connected Campaigns

---

## Marketplace

Publisher Card

Publisher Rating

Category Card

Search Filters

Marketplace Result

Marketplace Grid

---

## Wallet

Wallet Summary

Balance Card

Transaction Item

Deposit Card

Withdraw Card

Settlement Card

---

## Revenue

Revenue Card

Revenue Breakdown

Revenue Trend

Revenue Source

Revenue Timeline

---

## Analytics

Growth Card

CTR Card

Conversion Card

Audience Card

Retention Card

Chart Widget

Insight Card

---

## Subscription

Plan Card

Usage Card

Limit Card

Billing Card

Invoice Card

Upgrade Card

---

## Settings

Profile Card

Security Card

Notification Settings

Telegram Account Card

API Key Card

Session Card

---

# Component Rules

Each component owns one responsibility.

Each component owns one data source.

Each component owns one primary action.

Never mix business domains.

---

# States

Every business component supports

Loading

Empty

Error

Success

Disabled

Responsive

RTL

---

# Composition Rules

Pages compose sections.

Sections compose business components.

Business components compose primitives.

Primitives compose foundation.

Never skip layers.

---

# Naming Rules

Use business language.

Correct

CampaignCard

PlatformCard

RevenueWidget

WalletSummary

Incorrect

BlueCard

Card2

DashboardBox

Widget3

---

# Reuse Rules

Before creating a component ask

Can an existing component solve this?

If yes,

reuse it.

If not,

extend it.

Only create a new component when the business model introduces a new entity.

---

# Final Principle

Components represent business concepts.

Not visual ideas.

If a business entity does not exist,

its component should not exist.
