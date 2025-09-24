# Chain Components

Komponen untuk menampilkan dan mengelola informasi blockchain chain menggunakan RainbowKit.

## ChainButton

Komponen button yang menampilkan informasi chain saat ini dengan logo, nama, dan status.

### Features

- **Logo Chain**: Menampilkan logo chain dari konfigurasi
- **Nama Chain**: Menampilkan nama chain yang user-friendly
- **Status Indicator**: 
  - 🟢 Hijau: Chain aktif
  - 🟡 Kuning: Coming Soon
  - 🔴 Merah: Disabled
- **Coming Soon Badge**: Menampilkan badge "Soon" untuk chain yang coming soon
- **RainbowKit Integration**: Terintegrasi dengan RainbowKit chain modal

### Props

```typescript
interface ChainButtonProps {
  className?: string;     // CSS classes tambahan
  showStatus?: boolean;   // Tampilkan status indicator (default: true)
}
```

### Usage

```tsx
import { ChainButton } from '@/components/chain';

// Basic usage
<ChainButton />

// With custom styling
<ChainButton className="self-start sm:self-auto" />

// Without status indicator
<ChainButton showStatus={false} />
```

### Styling

Button menggunakan styling yang konsisten dengan tema aplikasi:
- Background: `bg-orange-50`
- Text: `text-green-600`
- Border: `border-orange-200`
- Hover: `hover:bg-orange-100`

### Chain Configuration

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

### Status Logic

- **Active**: `disabled: false` dan `comingSoon: false`
- **Coming Soon**: `comingSoon: true`
- **Disabled**: `disabled: true`

### Integration

Komponen terintegrasi dengan:
- **RainbowKit**: `useChainModal()` untuk membuka chain selector
- **Wagmi**: `useAccount()` untuk mendapatkan chain info
- **Chain Config**: Membaca konfigurasi dari `chainAddress.ts`



