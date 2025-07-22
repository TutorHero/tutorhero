// composables/usePayNow.ts

/**
 * Pads a string on the left.
 */
const padLeft = (baseStr: string | number, n: number, str?: string): string => {
  const s = String(baseStr);
  if (n <= s.length) {
    return s;
  } else {
    return Array(n - s.length + 1).join(str || "0") + s;
  }
};

/**
 * Calculates CRC-16/CCITT-FALSE checksum. This pure JS version is correct.
 */
const crc16 = (s: string): string => {
  const crcTable = [0x0000, 0x1021, 0x2042, 0x3063, 0x4084, 0x50a5, 0x60c6, 0x70e7, 0x8108, 0x9129, 0xa14a, 0xb16b, 0xc18c, 0xd1ad, 0xe1ce, 0xf1ef, 0x1231, 0x0210, 0x3273, 0x2252, 0x52b5, 0x4294, 0x72f7, 0x62d6, 0x9339, 0x8318, 0xb37b, 0xa35a, 0xd3bd, 0xc39c, 0xf3ff, 0xe3de, 0x2462, 0x3443, 0x0420, 0x1401, 0x64e6, 0x74c7, 0x44a4, 0x5485, 0xa56a, 0xb54b, 0x8528, 0x9509, 0xe5ee, 0xf5cf, 0xc5ac, 0xd58d, 0x3653, 0x2672, 0x1611, 0x0630, 0x76d7, 0x66f6, 0x5695, 0x46b4, 0xb75b, 0xa77a, 0x9719, 0x8738, 0xf7df, 0xe7fe, 0xd79d, 0xc7bc, 0x48c4, 0x58e5, 0x6886, 0x78a7, 0x0840, 0x1861, 0x2802, 0x3823, 0xc9cc, 0xd9ed, 0xe98e, 0xf9af, 0x8948, 0x9969, 0xa90a, 0xb92b, 0x5af5, 0x4ad4, 0x7ab7, 0x6a96, 0x1a71, 0x0a50, 0x3a33, 0x2a12, 0xdbfd, 0xcbdc, 0xfbbf, 0xeb9e, 0x9b79, 0x8b58, 0xbb3b, 0xab1a, 0x6ca6, 0x7c87, 0x4ce4, 0x5cc5, 0x2c22, 0x3c03, 0x0c60, 0x1c41, 0xedae, 0xfd8f, 0xcdec, 0xddcd, 0xad2a, 0xbd0b, 0x8d68, 0x9d49, 0x7e97, 0x6eb6, 0x5ed5, 0x4ef4, 0x3e13, 0x2e32, 0x1e51, 0x0e70, 0xff9f, 0xefbe, 0xdfdd, 0xcffc, 0xbf1b, 0xaf3a, 0x9f59, 0x8f78, 0x9188, 0x81a9, 0xb1ca, 0xa1eb, 0xd10c, 0xc12d, 0xf14e, 0xe16f, 0x1080, 0x00a1, 0x30c2, 0x20e3, 0x5004, 0x4025, 0x7046, 0x6067, 0x83b9, 0x9398, 0xa3fb, 0xb3da, 0xc33d, 0xd31c, 0xe37f, 0xf35e, 0x02b1, 0x1290, 0x22f3, 0x32d2, 0x4235, 0x5214, 0x6277, 0x7256, 0xb5ea, 0xa5cb, 0x95a8, 0x8589, 0xf56e, 0xe54f, 0xd52c, 0xc50d, 0x34e2, 0x24c3, 0x14a0, 0x0481, 0x7466, 0x6447, 0x5424, 0x4405, 0xa7db, 0xb7fa, 0x8799, 0x97b8, 0xe75f, 0xf77e, 0xc71d, 0xd73c, 0x26d3, 0x36f2, 0x0691, 0x16b0, 0x6657, 0x7676, 0x4615, 0x5634, 0xd94c, 0xc96d, 0xf90e, 0xe92f, 0x99c8, 0x89e9, 0xb98a, 0xa9ab, 0x5844, 0x4865, 0x7806, 0x6827, 0x18c0, 0x08e1, 0x3882, 0x28a3, 0xcb7d, 0xdb5c, 0xeb3f, 0xfb1e, 0x8bf9, 0x9bd8, 0xabbb, 0xbb9a, 0x4a75, 0x5a54, 0x6a37, 0x7a16, 0x0af1, 0x1ad0, 0x2ab3, 0x3a92, 0xfd2e, 0xed0f, 0xdd6c, 0xcd4d, 0xbdaa, 0xad8b, 0x9de8, 0x8dc9, 0x7c26, 0x6c07, 0x5c64, 0x4c45, 0x3ca2, 0x2c83, 0x1ce0, 0x0cc1, 0xef1f, 0xff3e, 0xcf5d, 0xdf7c, 0xaf9b, 0xbfba, 0x8fd9, 0x9ff8, 0x6e17, 0x7e36, 0x4e55, 0x5e74, 0x2e93, 0x3eb2, 0x0ed1, 0x1ef0];
  let crc = 0xFFFF;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    if (c > 255) { throw new RangeError("Invalid character in string for CRC calculation"); }
    const j = (c ^ (crc >> 8)) & 0xFF;
    crc = crcTable[j] ^ (crc << 8);
  }
  return padLeft(((crc ^ 0) & 0xFFFF).toString(16).toUpperCase(), 4);
};

interface PayNowOptions {
  uen?: string;
  mobile?: string;
  editable: boolean;
  amount: number;
  entity: string;
  refNumber?: string;
}

const generatePayNowPayload = (opts: PayNowOptions): string => {
  // --- This helper builds a single Tag-Length-Value part ---
  const tlv = (id: string, val: string): string => {
    const len = val.length.toString().padStart(2, '0');
    return id + len + val;
  };

  // --- We build the payload as a flat list of strings ---
  const payloadParts: string[] = [];

  // ID 00: Payload Format Indicator
  payloadParts.push(tlv('00', '01'));
  // ID 01: Point of Initiation Method (12 = dynamic)
  payloadParts.push(tlv('01', '12'));

  // ID 26: Merchant Account Information (This is a nested value)
  const merchantAccountValue: string[] = [];
  merchantAccountValue.push(tlv('00', 'SG.PAYNOW')); // Globally Unique Identifier

  if (opts.mobile) {
    merchantAccountValue.push(tlv('01', '0')); // Type 0 for Mobile
    // CRITICAL: Mobile number MUST be prefixed with +65
    merchantAccountValue.push(tlv('02', `+65${opts.mobile}`));
    // CRITICAL: Editable flag MUST be present and '0' for mobile
    merchantAccountValue.push(tlv('03', '0'));
  } else if (opts.uen) {
    merchantAccountValue.push(tlv('01', '2')); // Type 2 for UEN
    merchantAccountValue.push(tlv('02', opts.uen));
    merchantAccountValue.push(tlv('03', opts.editable ? '1' : '0'));
  } else {
    throw new Error("A mobile number or UEN must be provided.");
  }
  payloadParts.push(tlv('26', merchantAccountValue.join('')));

  // ID 52: Merchant Category Code
  payloadParts.push(tlv('52', '0000'));
  // ID 53: Transaction Currency
  payloadParts.push(tlv('53', '702'));
  // ID 54: Transaction Amount
  payloadParts.push(tlv('54', opts.amount.toFixed(2)));
  // ID 58: Country Code
  payloadParts.push(tlv('58', 'SG'));
  // ID 59: Merchant Name (Entity Name)
  payloadParts.push(tlv('59', opts.entity.trim() || 'PayNow User'));
  // ID 60: Merchant City
  payloadParts.push(tlv('60', 'Singapore'));

  // ID 62: Additional Data (Reference Number). IMPORTANT: Only add if it exists.
  if (opts.refNumber && opts.refNumber.trim() !== "") {
    // The value of ID 62 is *also* a nested TLV string
    payloadParts.push(tlv('62', tlv('01', opts.refNumber.trim())));
  }

  // --- Calculate Checksum ---
  // Join all parts and add the checksum placeholder
  const payloadWithoutChecksum = payloadParts.join('') + '6304';
  
  // Calculate the checksum using our pure JS function
  const checksumHex = crc16(payloadWithoutChecksum);

  return payloadWithoutChecksum + checksumHex;
};

/**
 * The Nuxt Composable.
 * This is what your application will import and use.
 */
export const generatePayNow = () => {
  return {
    generatePayNowPayload,
  };
};