# Address Utilities

This module provides utility functions for handling Ethereum addresses in a consistent way.

## Functions

### `normalizeAddress(address)`

Normalizes an Ethereum address to lowercase for consistent comparison.

**Parameters:**
- `address` (string | null | undefined): The address to normalize

**Returns:**
- `string | null`: Normalized lowercase address or null if invalid

**Example:**
```typescript
import { normalizeAddress } from '@/utils/address';

// All of these will return the same normalized address
normalizeAddress("0x735886f4EE69FFe3c7a156e8584B46748eDdB388"); // "0x735886f4ee69ffe3c7a156e8584b46748eddb388"
normalizeAddress("0x735886f4ee69ffe3c7a156e8584b46748eddb388"); // "0x735886f4ee69ffe3c7a156e8584b46748eddb388"
normalizeAddress("  0x735886f4EE69FFe3c7a156e8584B46748eDdB388  "); // "0x735886f4ee69ffe3c7a156e8584b46748eddb388"
```

### `isAddressEqual(address1, address2)`

Checks if two addresses are equal (case-insensitive).

**Parameters:**
- `address1` (string | null | undefined): First address to compare
- `address2` (string | null | undefined): Second address to compare

**Returns:**
- `boolean`: True if addresses are equal (case-insensitive)

**Example:**
```typescript
import { isAddressEqual } from '@/utils/address';

isAddressEqual("0x735886f4EE69FFe3c7a156e8584B46748eDdB388", "0x735886f4ee69ffe3c7a156e8584b46748eddb388"); // true
isAddressEqual("0x735886f4EE69FFe3c7a156e8584B46748eDdB388", "0x35487f37efb8F27f70e3A8Db62d04C1edfB69aE1"); // false
```

### `isValidAddress(address)`

Validates if an address is a valid Ethereum address format.

**Parameters:**
- `address` (string | null | undefined): The address to validate

**Returns:**
- `boolean`: True if the address is valid

**Example:**
```typescript
import { isValidAddress } from '@/utils/address';

isValidAddress("0x735886f4EE69FFe3c7a156e8584B46748eDdB388"); // true
isValidAddress("0x735886f4EE69FFe3c7a156e8584B46748eDdB38"); // false (too short)
isValidAddress("invalid"); // false
```

## Usage in Token Management

Now you can add tokens to `tokenAddress.ts` in any case format:

```typescript
// All of these formats will work correctly
addresses: {
  8453: "0x735886f4EE69FFe3c7a156e8584B46748eDdB388", // Mixed case
  8453: "0x735886f4ee69ffe3c7a156e8584b46748eddb388", // Lowercase
  8453: "0x735886F4EE69FFE3C7A156E8584B46748EDDB388", // Uppercase
}
```

The `normalizeAddress` function will handle the comparison automatically, making your token management more flexible and error-resistant.
