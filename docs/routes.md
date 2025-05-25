# Routes

This document outlines the routes used in the application.

## Auth

### Login

- Path: `/login`
- Method: `POST`
- Body: `username` and `password`

### Signup

- Path: `/signup`
- Method: `POST`
- Body: `name`, `email`, `password`, `confirm_password`

### Logout

- Path: `/logout`
- Method: `POST`

## Dashboard

### Home

- Path: `/`
- Method: `GET`

### Assets

- Path: `/assets`
- Method: `GET`

### Debts

- Path: `/debts`
- Method: `GET`

### Transactions

- Path: `/transactions`
- Method: `GET`

### Wallets

- Path: `/wallets`
- Method: `GET`

## API

### Assets

- Path: `/api/assets`
- Method: `GET`
- Response: `Asset[]`

### Debts

- Path: `/api/debts`
- Method: `GET`
- Response: `Debt[]`

### Transactions

- Path: `/api/transactions`
- Method: `GET`
- Response: `Transaction[]`

### Wallets

- Path: `/api/wallets`
- Method: `GET`
- Response: `Wallet[]`

## Errors

### 404

- Path: `/*`
- Method: `GET`
- Response: `404 - Not Found`
