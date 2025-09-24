# Chain Components

Komponen untuk menampilkan dan mengelola informasi blockchain chain menggunakan OnchainKit.

## Chain Configuration

Komponen membaca konfigurasi chain dari `/src/lib/addresses/chainAddress.ts`:

```typescript
{
  id: 8453,
  name: "Base",
  logo: "/chain/base.png",
  disabled: false,
  comingSoon: false,
  // ...
}
```

### Integration

Komponen terintegrasi dengan:
- **OnchainKit**: Untuk wallet connection dan chain management
- **Wagmi**: `useAccount()` untuk mendapatkan chain info
- **Chain Config**: Membaca konfigurasi dari `chainAddress.ts`





