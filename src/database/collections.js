import dbMyWallet from "./myWalletDB.js";

export const colTransactions = dbMyWallet.collection("transactions")
export const colUsers = dbMyWallet.collection("users")
export const colSessions = dbMyWallet.collection("sessions")