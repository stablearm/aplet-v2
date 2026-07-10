# Aplet Domain Model

Version: 1.0

---

# Purpose

This document defines every business entity inside Aplet.

Every page, component, API integration and database relation must be based on these entities.

Do not invent additional business objects.

---

# User

Represents every authenticated account.

Properties

- id
- fullName
- mobile
- email
- avatar
- role
- status
- createdAt

Relations

- owns Publishers
- owns Campaigns
- owns Wallet
- owns Subscription

---

# Publisher

A business profile that participates in sponsorship campaigns.

Properties

- id
- title
- slug
- description
- status
- verificationStatus
- totalRevenue
- totalJoins

Relations

- owns Platforms
- owns Content Bots
- receives Earnings

---

# Platform

Represents a Telegram channel or community.

Properties

- id
- telegramId
- title
- username
- inviteLink
- memberCount
- category
- language
- status

Relations

- belongs to Publisher
- participates in Campaigns
- generates Earnings

---

# Content Bot

Telegram bot connected by the publisher.

Properties

- id
- botToken
- username
- status
- lockMode
- createdAt

Relations

- belongs to Publisher
- owns Locked Content
- connected to Campaigns

---

# Locked Content

Premium content protected by sponsorship.

Properties

- id
- title
- type
- fileSize
- downloadCount
- status

Relations

- belongs to Content Bot
- unlocks after Campaign completion

---

# Campaign

Advertising campaign.

Properties

- id
- title
- budget
- targetMembers
- currentMembers
- remainingBudget
- status
- startDate
- endDate

Relations

- belongs to Advertiser
- connected to Platforms
- connected to Content Bots

---

# Advertiser

Business purchasing Telegram members.

Properties

- id
- companyName
- walletBalance
- status

Relations

- owns Campaigns
- owns Wallet

---

# Wallet

Financial account.

Properties

- id
- balance
- pendingBalance
- currency
- status

Relations

- belongs to User
- contains Transactions

---

# Transaction

Financial record.

Properties

- id
- amount
- type
- status
- reference
- createdAt

Types

- Deposit
- Withdrawal
- Campaign Payment
- Revenue
- Refund

Relations

- belongs to Wallet

---

# Earnings

Publisher revenue.

Properties

- id
- amount
- source
- joinCount
- campaignId
- status

Relations

- belongs to Publisher
- belongs to Campaign

---

# Subscription

Platform subscription.

Properties

- id
- plan
- status
- renewDate
- limits

Relations

- belongs to User

---

# Analytics

Calculated business metrics.

Contains

- Revenue
- Growth
- CTR
- Conversion
- Campaign Performance
- Platform Performance

Analytics is read-only.

Never modify analytics directly.

---

# Notification

System notification.

Properties

- id
- title
- body
- type
- read
- createdAt

Relations

- belongs to User

---

# Settings

User preferences.

Contains

- Profile
- Security
- Notifications
- Telegram Accounts
- API Keys

---

# Entity Relationships

User

↓

Publisher

↓

Platform

↓

Content Bot

↓

Locked Content

↓

Sponsor Campaign

↓

Telegram User

↓

Verified Join

↓

Revenue

↓

Wallet

↓

Withdrawal

---

# Rules

Every page must be centered around one primary entity.

Never mix unrelated entities in the same screen.

Components should display entity data only.

Business logic belongs to services, not UI.

The Domain Model is the foundation of routing, API integration, state management and UI architecture.
