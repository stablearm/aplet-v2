# Didegan Platform — Web API Gateway Documentation

## Overview

The Web API Gateway is the main HTTP entry point for the Didegan/MembersFactory platform. It is a **NestJS** application that serves as a BFF (Backend for Frontend) for the web dashboard, integrating with TON blockchain, Telegram Bot API, and internal microservices.

**Base URL:** `http://localhost:3001/api/v1`

**Swagger UI:** `http://localhost:3001/api/docs`

---

## Table of Contents

1. [Authentication](#authentication)
2. [Auth Module](#auth-module)
3. [Advertiser - Wallet](#advertiser---wallet)
4. [Advertiser - Campaigns](#advertiser---campaigns)
5. [Publisher - Platforms](#publisher---platforms)
6. [Publisher - Earnings](#publisher---earnings)
7. [Publisher - Custom Campaigns](#publisher---custom-campaigns)
8. [Content Bots](#content-bots)
9. [Subscriptions](#subscriptions)
10. [Merchant - Wallet](#merchant---wallet)
11. [Marketplace](#marketplace)
12. [Error Handling](#error-handling)
13. [Environment Variables](#environment-variables)

---

## Authentication

The API uses **JWT (JSON Web Token)** based authentication with access/refresh token pairs.

### Token Flow

1. **Register/Login** — POST `/auth/register` or `/auth/login` returns `accessToken` + `refreshToken`
2. **Use Access Token** — Include `Authorization: Bearer <accessToken>` header on protected endpoints
3. **Refresh** — When the access token expires, POST `/auth/refresh` with the `refreshToken` to get new tokens
4. **Logout** — POST `/auth/logout` to revoke the refresh token

### Token Lifetimes

| Token | Default Lifetime |
|-------|-----------------|
| Access Token | 900 seconds (15 minutes) |
| Refresh Token | 604800 seconds (7 days) |

### Roles

- `advertiser` — Default role for all new users. Can create campaigns, manage wallet, purchase subscriptions.
- `publisher` — Can manage advertising platforms, track earnings, withdraw funds.

---

## Auth Module

Base: `/auth`

### POST `/auth/register`

Register a new user with email and password. Creates a TON wallet automatically.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",       // min 8 chars
  "firstName": "John",              // optional
  "lastName": "Doe"                 // optional
}
```

**Response (201):**
```json
{
  "user": {
    "id": "664f...",
    "email": "user@example.com",
    "firstName": "John",
    "roles": ["advertiser"]
  },
  "accessToken": "eyJhbGciOi...",
  "refreshToken": "eyJhbGciOi...",
  "accessTokenExpires": "2024-...",
  "refreshTokenExpires": "2024-..."
}
```

**Errors:** 409 Conflict (email already registered)

---

### POST `/auth/login`

Login with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):** Same structure as register.

**Errors:** 401 Unauthorized (invalid credentials, social login account, blocked account)

---

### POST `/auth/telegram-mini-app`

Authenticate via Telegram Mini App. Validates the `initData` string from `Telegram.WebApp.initData`, extracts user info, and issues JWT tokens. Creates a new user if the Telegram ID is not yet registered.

**Request Body:**
```json
{
  "initData": "user=%7B%22id%22%3A123456789%7D&auth_date=1234567890&hash=abc123..."
}
```

**Response (200):**
```json
{
  "user": {
    "id": "664f...",
    "telegramId": "123456789",
    "email": null,
    "firstName": "John",
    "lastName": "Doe",
    "roles": ["advertiser"],
    "walletAddress": "EQ...",
    "tomanBalance": 0
  },
  "accessToken": "...",
  "refreshToken": "...",
  "accessTokenExpires": "...",
  "refreshTokenExpires": "..."
}
```

**Errors:** 401 Unauthorized (invalid initData, expired auth_date)

---

### POST `/auth/refresh`

Exchange a refresh token for a new access/refresh token pair. The old refresh token is consumed (rotation).

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOi..."
}
```

**Response (200):**
```json
{
  "token": "...",
  "newRefreshToken": "...",
  "accessTokenExpires": "...",
  "refreshTokenExpires": "..."
}
```

---

### POST `/auth/logout`

Revoke a refresh token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOi..."
}
```

**Response (200):** `{ "success": true }`

---

### GET `/auth/me`

**🔒 Auth Required**

Get the current authenticated user's profile.

**Response (200):**
```json
{
  "id": "664f...",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+989121234567",
  "telegramId": "123456789",
  "profileCompleted": true,
  "roles": ["advertiser"],
  "walletAddress": "EQ...",
  "tomanBalance": 500000
}
```

---

### PATCH `/auth/me`

**🔒 Auth Required**

Update profile fields. Linking a Telegram ID is required before using campaigns, platforms, or content bots.

**Request Body (all optional):**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "telegramId": "123456789",
  "telegramUsername": "johndoe",
  "phoneNumber": "+989121234567"
}
```

**Response (200):** `{ "success": true, "message": "Profile updated" }`

**Errors:** 409 Conflict (Telegram ID already linked to another account)

---

### PATCH `/auth/me/link-telegram`

**🔒 Auth Required**

Link a Telegram identity to the platform account using Telegram Mini App init data.

**Request Body:**
```json
{
  "initData": "telegram_mini_app_init_data_string"
}
```

**Response (200):** `{ "success": true, "message": "Telegram account linked" }`

---

## Advertiser - Wallet

Base: `/wallet`

### GET `/wallet`

**🔒 Auth Required**

Get wallet information including TON address and balances.

**Response (200):**
```json
{
  "walletAddress": "EQ...",
  "tonBalance": 0.5,
  "tomanBalance": 500000,
  "usdBalance": 0
}
```

---

### GET `/wallet/deposit-address`

**🔒 Auth Required**

Get the TON deposit address for this user's wallet.

**Response (200):** `{ "walletAddress": "EQ..." }`

---

### GET `/wallet/balance`

**🔒 Auth Required**

Alias for GET `/wallet` — returns current balances.

---

### POST `/wallet/check-deposit`

**🔒 Auth Required**

Triggers a blockchain balance check. If the TON balance is ≥ 0.1 TON, automatically sweeps funds to the platform wallet and converts to Toman using real-time TON/USD (CoinGecko) and USDT/IRR (Nobitex) prices.

**Response (200):**
```json
{
  "tonBalance": 0,
  "tomanBalance": 550000,
  "usdBalance": 0,
  "swept": true,
  "depositedToman": 50000
}
```

If balance < 0.1 TON:
```json
{
  "tonBalance": 0.05,
  "tomanBalance": 500000,
  "usdBalance": 0,
  "swept": false
}
```

---

### GET `/wallet/transactions`

**🔒 Auth Required**

List transaction history with pagination.

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 20 | Items per page |

**Response (200):**
```json
{
  "transactions": [...],
  "total": 100,
  "page": 1,
  "limit": 20
}
```

---

## Advertiser - Campaigns

Base: `/campaigns`

### GET `/campaigns/pricing`

**🔒 Auth Required**

Get current per-member pricing.

**Response (200):**
```json
{
  "memberCost": 400,
  "commissionPerMember": 100,
  "totalPerMember": 500
}
```

Pricing is in Toman per member. Total cost = `targetSubscriberCount × totalPerMember`.

---

### POST `/campaigns`

**🔒 Auth Required**

Create a new campaign or retry an existing pending campaign.

**Mode 1 — Create New:**
```json
{
  "name": "Summer promotion",
  "channelUsername": "mychannel",
  "targetSubscriberCount": 5000
}
```

**Mode 2 — Retry Existing:**
```json
{
  "campaignId": "CAMPAIGN_ID"
}
```

**Channel Input:** Provide either `channelUsername` or `publicLink` (e.g., `https://t.me/mychannel`).

**Target Subscriber Count:** Min 1,000, Max 100,000.

**Activation Flow:**
1. Verifies `@safevalidatorbot` is admin in the channel
2. Checks for duplicate active campaigns on the same channel
3. Checks user's Toman balance ≥ totalCost
4. Deducts balance and activates the campaign

**Response (200):**
```json
{
  "id": "CAMPAIGN_ID",
  "orderId": "WADS-1719000000000-123456",
  "status": "active",
  "channelTitle": "My Channel",
  "channelId": -1001234567890,
  "totalCost": 2500000,
  "targetSubscriberCount": 5000,
  "expiresAt": "2024-08-01T00:00:00.000Z"
}
```

If channel not verified or insufficient balance, returns `status: "pending_payment"` with a message explaining what to do.

---

### GET `/campaigns`

**🔒 Auth Required**

List all campaigns for the current user.

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| status | string | Filter: `active`, `paused`, `completed`, `cancelled`, `pending_payment` |

**Response (200):**
```json
[
  {
    "id": "...",
    "orderId": "WADS-...",
    "name": "Summer promotion",
    "targetChannelUsername": "@mychannel",
    "status": "active",
    "targetSubscriberCount": 5000,
    "currentSubscriberCount": 1200,
    "totalCost": 2500000,
    "channelTitle": "My Channel",
    "createdAt": "...",
    "expiresAt": "...",
    "progress": 24
  }
]
```

---

### GET `/campaigns/:id`

**🔒 Auth Required**

Get detailed information about a specific campaign.

**Response (200):**
```json
{
  "id": "...",
  "orderId": "WADS-...",
  "name": "Summer promotion",
  "targetChannelUsername": "@mychannel",
  "publicLink": "https://t.me/mychannel",
  "status": "active",
  "type": "grade_one",
  "targetSubscriberCount": 5000,
  "currentSubscriberCount": 1200,
  "costPer1000": 500000,
  "totalCost": 2500000,
  "channelId": -1001234567890,
  "channelTitle": "My Channel",
  "inviteLink": "https://t.me/+...",
  "createdAt": "...",
  "expiresAt": "...",
  "progress": 24
}
```

---

### POST `/campaigns/:id/pause`

**🔒 Auth Required**

Pause an active campaign.

**Response (200):** `{ "success": true, "status": "paused" }`

**Errors:** 400 (not active), 404 (not found)

---

### POST `/campaigns/:id/resume`

**🔒 Auth Required**

Resume a paused campaign.

**Response (200):** `{ "success": true, "status": "active" }`

---

### POST `/campaigns/:id/cancel`

**🔒 Auth Required**

Cancel a campaign.

**Response (200):** `{ "success": true, "status": "cancelled" }`

**Errors:** 400 (already completed/cancelled)

---

## Publisher - Platforms

Base: `/platforms`

### POST `/platforms`

**🔒 Auth Required**

Create a new advertising platform. Validates the bot token with Telegram, sets up the webhook.

**Request Body:**
```json
{
  "channelUsername": "mychannel",      // optional, or publicLink
  "publicLink": "https://t.me/mychannel", // optional
  "botToken": "1234567890:ABCDef...",
  "followQuota": 3                      // 1-5
}
```

**Response (200):**
```json
{
  "id": "PLATFORM_ID",
  "webhookStatus": "set"
}
```

---

### GET `/platforms`

**🔒 Auth Required**

List all platforms owned by the current user.

**Response (200):**
```json
[
  {
    "id": "...",
    "channelUsername": "mychannel",
    "publicLink": "https://t.me/mychannel",
    "botUsername": "my_bot",
    "botId": "1234567890",
    "followQuota": 3,
    "webhookStatus": "set",
    "totalUsersAddedByPlatform": 150,
    "createdAt": "..."
  }
]
```

---

### GET `/platforms/:id`

**🔒 Auth Required**

Get platform details including admin list.

**Response (200):**
```json
{
  "id": "...",
  "channelUsername": "mychannel",
  "botUsername": "my_bot",
  "botId": "1234567890",
  "followQuota": 3,
  "webhookStatus": "set",
  "totalUsersAddedByPlatform": 150,
  "admins": [
    { "id": "...", "telegramId": "987654321", "username": "admin1" }
  ],
  "createdAt": "..."
}
```

---

### PATCH `/platforms/:id`

**🔒 Auth Required**

Update platform settings (currently only followQuota).

**Request Body:**
```json
{
  "followQuota": 5
}
```

---

### DELETE `/platforms/:id`

**🔒 Auth Required**

Delete a platform. Removes the Telegram webhook and marks as deleted.

---

### POST `/platforms/:id/admins`

**🔒 Auth Required**

Add a bot admin to a platform.

**Request Body:**
```json
{
  "adminTelegramId": "123456789",
  "adminUsername": "username"   // optional
}
```

**Errors:** 400 (admin limit reached)

---

### DELETE `/platforms/:id/admins/:adminId`

**🔒 Auth Required**

Remove a bot admin from a platform.

---

## Publisher - Earnings

Base: `/earnings`

### GET `/earnings`

**🔒 Auth Required**

Get earnings summary.

**Response (200):**
```json
{
  "sentUsers": 100,
  "tomanEarnings": 40000,
  "availableBalanceTon": 0,
  "availableBalanceToman": 100000,
  "totalEarnings": 500000,
  "earningsEnabled": true
}
```

Earnings are calculated at 400 Toman per member added.

---

### GET `/earnings/transactions`

**🔒 Auth Required**

List withdrawal history.

**Response (200):**
```json
[
  {
    "id": "...",
    "type": "ton_coin",
    "amount": "5 TON",
    "status": "pending",
    "address": "EQ...",
    "createdAt": "..."
  }
]
```

---

### POST `/earnings/withdraw`

**🔒 Auth Required**

Request a withdrawal. Minimum 1,000,000 Toman for Rial (card) withdrawals.

**Request Body:**
```json
{
  "type": "ton_coin",         // or "rial"
  "address": "EQ..."          // TON address or card number
}
```

**Response (200):**
```json
{
  "id": "WITHDRAWAL_ID",
  "status": "pending"
}
```

**Errors:** 400 (no earnings, minimum not met, earnings not enabled)

---

### GET `/earnings/stats`

**🔒 Auth Required**

Get earnings statistics.

**Response (200):**
```json
{
  "platformCount": 3,
  "totalUsersAdded": 500,
  "currentUsersAddedNotWithdrawn": 100,
  "totalEarnings": 200000
}
```

---

## Publisher - Custom Campaigns

Base: `/custom-campaigns`

### GET `/custom-campaigns`

**🔒 Auth Required**

List custom campaigns registered by the current publisher.

**Response (200):**
```json
[
  {
    "index": 0,
    "channelUsername": "mychannel",
    "channelId": -1001234567890,
    "channelTitle": "My Channel",
    "memberCount": 5000,
    "createdAt": "..."
  }
]
```

---

### POST `/custom-campaigns`

**🔒 Auth Required**

Register a custom campaign channel. Maximum 3 custom campaigns per publisher.

**Request Body:**
```json
{
  "channelUsername": "mychannel"  // or publicLink
}
```

---

### DELETE `/custom-campaigns/:index`

**🔒 Auth Required**

Remove a custom campaign by index (0-based).

---

## Content Bots

Base: `/content-bots`

### POST `/content-bots`

**🔒 Auth Required**

Create an AI-powered auto-posting content bot. This is the full creation flow that validates bot admin status, checks/charges subscription, creates a member campaign, and sets up RSS feed sources.

**Request Body:**
```json
{
  "channelUsername": "mychannel",
  "botToken": "1234567890:ABCDef...",
  "selectedTopics": ["politics", "cryptocurrency"],
  "postSignature": "Powered by AI | @mychannel",
  "subscriptionType": "one_month"
}
```

**Available Topics:** `politics`, `international`, `economics`, `cryptocurrency`, `technology`, `science`, `social`

**Subscription Types:** `one_month`, `three_months`, `six_months`, `one_year`

**Pricing:**

| Package | Admin Price | Member Count | Total Price |
|---------|------------|--------------|-------------|
| 1 Month | 180,000 | 1,000 | 480,000 |
| 3 Months | 450,000 | 2,000 | 1,050,000 |
| 6 Months | 900,000 | 4,000 | 2,100,000 |
| 12 Months | 1,800,000 | 6,000 | 3,600,000 |

(Prices in Toman. Member price = memberCount / 1000 × 300,000)

**Trial:** First bot for a new user gets a 1-day free trial with 0 member allocation.

**Response (200):**
```json
{
  "id": "BOT_ID",
  "channelUsername": "mychannel",
  "botUsername": "my_bot",
  "status": "active",
  "subscriptionType": "one_month",
  "subscriptionExpiresAt": "...",
  "isTrial": false,
  "allocatedMemberCount": 1000,
  "selectedTopics": ["politics", "cryptocurrency"],
  "postSignature": "Powered by AI | @mychannel",
  "feedSourcesCount": 10
}
```

---

### GET `/content-bots`

**🔒 Auth Required**

List all content bots owned by the current user.

**Response (200):**
```json
[
  {
    "id": "...",
    "channelUsername": "mychannel",
    "channelId": -1001234567890,
    "botUsername": "my_bot",
    "status": "active",
    "selectedTopics": ["politics"],
    "postSignature": "Powered by AI",
    "subscriptionType": "one_month",
    "subscriptionExpiresAt": "...",
    "totalPosts": 50,
    "successfulPosts": 48,
    "failedPosts": 2,
    "lastPostTime": "...",
    "createdAt": "..."
  }
]
```

---

### GET `/content-bots/:id`

**🔒 Auth Required**

Get detailed content bot information including content settings, rate limits, and feed sources.

**Response (200):**
```json
{
  "id": "...",
  "channelUsername": "mychannel",
  "channelId": -1001234567890,
  "botUsername": "my_bot",
  "status": "active",
  "selectedTopics": ["politics"],
  "postSignature": "Powered by AI",
  "contentSettings": {
    "feedCheckInterval": 10,
    "postInterval": 60,
    "maxPostsPerDay": 24,
    "enableDuplicateCheck": true,
    "minPostLength": 100,
    "maxPostLength": 4000,
    "includeHashtags": true,
    "includeEmojis": true
  },
  "postRateLimits": { "slot1": 5, "slot2": 5, "slot3": 5, "slot4": 5 },
  "subscriptionType": "one_month",
  "subscriptionExpiresAt": "...",
  "isTrial": false,
  "allocatedMemberCount": 1000,
  "feedSources": [...],
  "totalPosts": 50,
  "successfulPosts": 48,
  "failedPosts": 2,
  "lastPostTime": "...",
  "createdAt": "..."
}
```

---

### PATCH `/content-bots/:id/topics`

**🔒 Auth Required**

Update the selected content topics for a bot.

**Request Body:**
```json
{
  "topics": ["politics", "cryptocurrency"]
}
```

---

### PATCH `/content-bots/:id/signature`

**🔒 Auth Required**

Update the post signature text.

**Request Body:**
```json
{
  "signature": "Powered by AI"
}
```

---

### PATCH `/content-bots/:id/post-limits`

**🔒 Auth Required**

Update post rate limits per 6-hour slot (4 slots per day).

**Request Body (all optional):**
```json
{
  "slot1": 5,   // 0-20, morning slot
  "slot2": 5,   // 0-20, afternoon slot
  "slot3": 5,   // 0-20, evening slot
  "slot4": 5    // 0-20, night slot
}
```

---

### POST `/content-bots/:id/toggle-status`

**🔒 Auth Required**

Toggle between active and paused status.

**Response (200):**
```json
{
  "success": true,
  "status": "paused"  // or "active"
}
```

---

### DELETE `/content-bots/:id`

**🔒 Auth Required**

Deactivate a content bot (sets status to `inactive`).

---

## Subscriptions

Base: `/subscriptions`

### GET `/subscriptions/packages`

**🔒 Auth Required**

List available subscription packages with pricing.

**Response (200):**
```json
[
  {
    "type": "one_month",
    "duration": "1 Month",
    "adminPrice": 180000,
    "memberCount": 1000,
    "months": 1,
    "memberPrice": 300000,
    "totalPrice": 480000
  },
  {
    "type": "three_months",
    "duration": "3 Months",
    "adminPrice": 450000,
    "memberCount": 2000,
    "months": 3,
    "memberPrice": 600000,
    "totalPrice": 1050000
  },
  {
    "type": "six_months",
    "duration": "6 Months",
    "adminPrice": 900000,
    "memberCount": 4000,
    "months": 6,
    "memberPrice": 1200000,
    "totalPrice": 2100000
  },
  {
    "type": "one_year",
    "duration": "12 Months",
    "adminPrice": 1800000,
    "memberCount": 6000,
    "months": 12,
    "memberPrice": 1800000,
    "totalPrice": 3600000
  }
]
```

---

### POST `/subscriptions/activate`

**🔒 Auth Required**

Activate or renew a subscription for a content bot. Deducts from the user's Toman balance.

**Request Body:**
```json
{
  "contentBotId": "BOT_ID",
  "packageType": "one_month"
}
```

**Response (200):**
```json
{
  "success": true,
  "expiresAt": "2024-08-01T00:00:00.000Z",
  "packageType": "one_month"
}
```

---

### GET `/subscriptions/:contentBotId`

**🔒 Auth Required**

Get subscription status for a specific content bot.

**Response (200):**
```json
{
  "subscriptionType": "one_month",
  "subscriptionExpiresAt": "2024-08-01T00:00:00.000Z",
  "isTrial": false,
  "allocatedMemberCount": 1000,
  "isExpired": false
}
```

---

## Merchant - Wallet

Base: `/merchant/wallet`

These endpoints are functionally identical to the Advertiser Wallet endpoints but use the user's Telegram ID for lookup instead of the internal user ID.

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/merchant/wallet` | GET | Get wallet info |
| `/merchant/wallet/deposit-address` | GET | Get TON deposit address |
| `/merchant/wallet/balance` | GET | Get current balances |
| `/merchant/wallet/check-deposit` | POST | Trigger deposit check + sweep |
| `/merchant/wallet/transactions` | GET | List transactions (paginated) |

All endpoints require `Authorization: Bearer <accessToken>`.

---

## Marketplace

Base: `/marketplace`

### GET `/marketplace/channels`

**🔒 Auth Required**

List channels available for sale.

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 20 | Items per page |

**Response (200):**
```json
[
  {
    "id": "...",
    "username": "mychannel",
    "publicLink": "https://t.me/mychannel",
    "type": "channel",
    "memberCount": 5000,
    "averageViewCount": 2500,
    "creationYear": 2024,
    "price": 5000000,
    "description": "High engagement crypto channel",
    "category": "cryptocurrency"
  }
]
```

---

### GET `/marketplace/groups`

**🔒 Auth Required**

List groups available for sale. Same structure as channels endpoint.

---

### GET `/marketplace/listings/:id`

**🔒 Auth Required**

Get detailed information about a specific listing.

**Response (200):** Same as above plus `status` field.

---

### POST `/marketplace/listings`

**🔒 Auth Required**

Submit a channel or group for sale.

**Request Body:**
```json
{
  "type": "channel",          // "channel" or "group"
  "username": "mychannel",    // optional
  "publicLink": "https://t.me/mychannel", // optional
  "memberCount": 5000,
  "averageViewCount": 2500,   // optional
  "creationYear": 2024,
  "description": "High engagement crypto channel"  // optional
}
```

**Response (200):**
```json
{
  "id": "LISTING_ID",
  "status": "inactive"   // requires admin approval
}
```

---

### DELETE `/marketplace/listings/:id`

**🔒 Auth Required**

Withdraw a listing from the marketplace.

---

### POST `/marketplace/purchase/:id`

**🔒 Auth Required**

Purchase a listing. Creates a pending purchase order.

**Response (200):**
```json
{
  "orderId": "ORDER_ID",
  "orderNumber": "MKT-1719000000000-abc123",
  "status": "pending",
  "price": 5000000
}
```

**Errors:** 404 (not found), 400 (listing not available)

---

## Error Handling

All errors follow a consistent format:

```json
{
  "statusCode": 400,
  "message": "Error description",
  "error": "Bad Request"
}
```

### Common Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request — validation error or business rule violation |
| 401 | Unauthorized — invalid/missing/expired token |
| 404 | Not Found — resource does not exist or user has no access |
| 409 | Conflict — duplicate resource (email, Telegram ID) |
| 500 | Internal Server Error |

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `MONGODB_URI` | Yes | — | MongoDB connection string |
| `REDIS_HOST` | Yes | — | Redis host |
| `REDIS_PORT` | Yes | — | Redis port |
| `REDIS_URI` | Yes | — | Redis connection URI |
| `JWT_SECRET` | Yes | — | JWT access token secret |
| `JWT_EXPIRATION` | No | 900 | Access token TTL in seconds |
| `JWT_REFRESH_TOKEN_SECRET` | Yes | — | JWT refresh token secret |
| `JWT_REFRESH_TOKEN_EXPIRATION` | No | 604800 | Refresh token TTL in seconds |
| `HTTP_PORT` | No | 3001 | Server port |
| `CLIENT_ORIGIN` | No | — | Allowed CORS origin |
| `TON_NETWORK` | No | testnet | `mainnet` or `testnet` |
| `TON_MAINNET_API_URL` | No | — | TON Center mainnet API URL |
| `TON_TESTNET_API_URL` | No | — | TON Center testnet API URL |
| `TONCENTER_API_KEY_MAINNET` | No | — | TON Center mainnet API key |
| `TONCENTER_API_KEY_TESTNET` | No | — | TON Center testnet API key |
| `TON_PLATFORM_WALLET_ADDRESS` | No | — | Platform wallet for fund sweeps |
| `TELEGRAM_BOT_TOKEN` | No | — | Bot token for Telegram Mini App auth |
| `SAFEVALIDATOR_BOT_TOKEN` | No | — | @safevalidatorbot token |
| `SERVER_WEBHOOK_URL` | No | — | Webhook base URL for platform bots |

---

## API Summary Table

| # | Method | Endpoint | Auth | Description |
|---|--------|----------|------|-------------|
| 1 | POST | `/auth/register` | No | Register with email/password |
| 2 | POST | `/auth/login` | No | Login with email/password |
| 3 | POST | `/auth/telegram-mini-app` | No | Telegram Mini App authentication |
| 4 | POST | `/auth/refresh` | No | Refresh access token |
| 5 | POST | `/auth/logout` | No | Revoke refresh token |
| 6 | GET | `/auth/me` | Yes | Get current user profile |
| 7 | PATCH | `/auth/me` | Yes | Update profile |
| 8 | PATCH | `/auth/me/link-telegram` | Yes | Link Telegram identity |
| 9 | GET | `/wallet` | Yes | Get wallet info |
| 10 | GET | `/wallet/deposit-address` | Yes | Get TON deposit address |
| 11 | GET | `/wallet/balance` | Yes | Get current balances |
| 12 | POST | `/wallet/check-deposit` | Yes | Trigger deposit check |
| 13 | GET | `/wallet/transactions` | Yes | List transactions |
| 14 | GET | `/campaigns/pricing` | Yes | Get per-member pricing |
| 15 | POST | `/campaigns` | Yes | Create/retry campaign |
| 16 | GET | `/campaigns` | Yes | List campaigns |
| 17 | GET | `/campaigns/:id` | Yes | Get campaign details |
| 18 | POST | `/campaigns/:id/pause` | Yes | Pause campaign |
| 19 | POST | `/campaigns/:id/resume` | Yes | Resume campaign |
| 20 | POST | `/campaigns/:id/cancel` | Yes | Cancel campaign |
| 21 | POST | `/platforms` | Yes | Create platform |
| 22 | GET | `/platforms` | Yes | List platforms |
| 23 | GET | `/platforms/:id` | Yes | Get platform details |
| 24 | PATCH | `/platforms/:id` | Yes | Update platform |
| 25 | DELETE | `/platforms/:id` | Yes | Delete platform |
| 26 | POST | `/platforms/:id/admins` | Yes | Add admin |
| 27 | DELETE | `/platforms/:id/admins/:adminId` | Yes | Remove admin |
| 28 | GET | `/earnings` | Yes | Get earnings summary |
| 29 | GET | `/earnings/transactions` | Yes | List withdrawals |
| 30 | POST | `/earnings/withdraw` | Yes | Request withdrawal |
| 31 | GET | `/earnings/stats` | Yes | Get earnings stats |
| 32 | GET | `/custom-campaigns` | Yes | List custom campaigns |
| 33 | POST | `/custom-campaigns` | Yes | Register custom campaign |
| 34 | DELETE | `/custom-campaigns/:index` | Yes | Remove custom campaign |
| 35 | POST | `/content-bots` | Yes | Create content bot |
| 36 | GET | `/content-bots` | Yes | List content bots |
| 37 | GET | `/content-bots/:id` | Yes | Get bot details |
| 38 | PATCH | `/content-bots/:id/topics` | Yes | Update topics |
| 39 | PATCH | `/content-bots/:id/signature` | Yes | Update signature |
| 40 | PATCH | `/content-bots/:id/post-limits` | Yes | Update rate limits |
| 41 | POST | `/content-bots/:id/toggle-status` | Yes | Pause/Resume bot |
| 42 | DELETE | `/content-bots/:id` | Yes | Deactivate bot |
| 43 | GET | `/subscriptions/packages` | Yes | List packages |
| 44 | POST | `/subscriptions/activate` | Yes | Activate subscription |
| 45 | GET | `/subscriptions/:contentBotId` | Yes | Get subscription status |
| 46 | GET | `/merchant/wallet` | Yes | Get merchant wallet |
| 47 | GET | `/merchant/wallet/deposit-address` | Yes | Get merchant deposit address |
| 48 | GET | `/merchant/wallet/balance` | Yes | Get merchant balance |
| 49 | POST | `/merchant/wallet/check-deposit` | Yes | Check merchant deposit |
| 50 | GET | `/merchant/wallet/transactions` | Yes | Merchant transactions |
| 51 | GET | `/marketplace/channels` | Yes | List channels for sale |
| 52 | GET | `/marketplace/groups` | Yes | List groups for sale |
| 53 | GET | `/marketplace/listings/:id` | Yes | Get listing details |
| 54 | POST | `/marketplace/listings` | Yes | Submit listing |
| 55 | DELETE | `/marketplace/listings/:id` | Yes | Withdraw listing |
| 56 | POST | `/marketplace/purchase/:id` | Yes | Purchase listing |
