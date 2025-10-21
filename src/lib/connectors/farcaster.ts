"use client";

import { injected } from 'wagmi/connectors';

/**
 * Custom Farcaster connector untuk Wagmi
 * Menggunakan injected connector untuk Farcaster environment
 */
export function farcaster() {
  return injected({
    shimDisconnect: true,
  });
}