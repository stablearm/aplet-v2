# 12-development-rules.md

Version: 1.0

---

# Purpose

This document defines mandatory engineering rules for every implementation.

These rules override personal preferences.

Every contributor must follow them.

---

# General Principles

Build products.

Not pages.

Build systems.

Not screens.

Build reusable solutions.

Not one-time implementations.

---

# Before Writing Code

Understand the business entity.

Understand the API.

Understand the user goal.

Only then implement.

Never code from assumptions.

---

# Component Rules

One component.

One responsibility.

One business purpose.

Never create "God Components".

If a component becomes difficult to understand,

split it.

---

# Page Rules

Every page must answer

Where am I?

What can I do?

What should I do next?

If any answer is unclear,

the page is wrong.

---

# Business Logic

Business logic belongs only to

Services

Hooks

Utilities

Never inside

JSX

Components

Pages

---

# Styling Rules

Use design tokens.

Never hardcode

colors

spacing

radius

shadow

typography

animation

---

# Layout Rules

Whitespace creates hierarchy.

Not borders.

Not colors.

Not shadows.

Remove before adding.

---

# Typography Rules

One headline.

One supporting paragraph.

Everything else is interface.

Avoid long text.

Avoid marketing language.

Avoid repeated explanations.

---

# Data Rules

Every value shown must answer

Why does the user need this?

If there is no answer,

remove it.

---

# Widget Rules

Every widget contains

Primary Metric

↓

Context

↓

Action

Nothing else.

---

# CTA Rules

One primary action.

Optional secondary action.

Never more than two actions.

---

# Form Rules

Minimum inputs.

Progressive disclosure.

Inline validation.

Keyboard friendly.

Auto focus.

Logical tab order.

---

# Tables

Default view

Search

Filter

Sort

Pagination

Bulk actions only if necessary.

---

# Charts

Charts explain trends.

Numbers explain values.

Never force users to estimate.

---

# Empty States

Explain

Why empty.

How to continue.

Provide action.

---

# Loading

Skeleton first.

Instant feedback.

Never freeze UI.

---

# Errors

Explain

What happened.

How to recover.

Never blame the user.

Never expose backend terminology.

---

# Performance

Lazy load heavy modules.

Optimize images.

Minimize rerenders.

Memoize only when measurable.

Never optimize blindly.

---

# Accessibility

Keyboard support.

Screen reader support.

Focus visibility.

Touch targets.

Contrast AA minimum.

---

# Responsive Rules

Design mobile first.

Not desktop reduced.

Every breakpoint is intentionally designed.

---

# SEO Rules

Semantic HTML.

Metadata.

Structured Data.

Canonical URLs.

Internal Linking.

Readable URLs.

Fast loading.

---

# Code Quality

Readable over clever.

Simple over complex.

Explicit over implicit.

Consistency over preference.

---

# Naming

Business names only.

Never visual names.

Correct

CampaignCard

Incorrect

BlueCard

Correct

WalletSummary

Incorrect

MoneyWidget

---

# Comments

Explain

Why.

Never

What.

Good code explains itself.

---

# Reviews

Before considering any task complete ask:

Can this be simpler?

Can anything be removed?

Is this solving a real business problem?

Does this match the domain model?

Does this follow the design system?

If any answer is "No",

the implementation is not complete.

---

# Definition of Done

A feature is complete only if:

✓ Business goal achieved

✓ API integrated correctly

✓ Responsive

✓ RTL verified

✓ Accessible

✓ Loading state implemented

✓ Empty state implemented

✓ Error state implemented

✓ Design System compliant

✓ No duplicated logic

✓ No hardcoded business data

✓ Build passes

Only then is the task considered finished.
