import { api } from "./client";

export const getWallet = () => api.get("/wallets/me").then((r) => r.data);
export const getWalletTransactions = (page = 1) =>
  api.get("/wallets/me/transactions", { params: { page } }).then((r) => r.data);
export const withdraw = (amount: number, bank_account_id: string) =>
  api.post("/wallets/me/withdraw", { amount, bank_account_id }).then((r) => r.data);
export const deposit = (amount: number) => api.post("/wallets/me/deposit", { amount }).then((r) => r.data);
