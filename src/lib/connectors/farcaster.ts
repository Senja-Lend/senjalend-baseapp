"use client";

import { injected } from 'wagmi/connectors';

export function farcaster() {
  return injected({
    shimDisconnect: true,
  });
}