import { IdGeneratorTranslations } from "../../../types/pages/tools/id-generator";

export const idGeneratorEn: IdGeneratorTranslations = {
  title: "ID/UUID Generator",
  description:
    "Generate UUID, ULID, and GUID easily. Supports multiple versions with customizable uppercase, lowercase, and hyphen settings",
  keywords: [
    "ID generation",
    "UUID",
    "ULID",
    "GUID",
    "identifier",
    "random",
    "unique",
  ],

  generateSection: {
    title: "ID Generation Settings",
    description:
      "Choose the type and settings for the IDs you want to generate",
  },

  types: {
    label: "ID Type",
    uuid: {
      label: "UUID",
      description: "Universally Unique Identifier",
    },
    ulid: {
      label: "ULID",
      description: "Universally Unique Lexicographically Sortable Identifier",
    },
    guid: {
      label: "GUID",
      description: "Globally Unique Identifier (Microsoft format)",
    },
  },

  settings: {
    label: "Generation Settings",
    formatLabel: "Display Format",
    version: {
      label: "UUID Version",
      v1: "Version 1 (Timestamp + MAC)",
      v4: "Version 4 (Random)",
      v6: "Version 6 (Improved Timestamp)",
      v7: "Version 7 (Unix Time-based)",
    },
    count: {
      label: "Count",
      placeholder: "1-100",
    },
    uppercase: {
      label: "Uppercase",
      description: "Display generated IDs in uppercase",
    },
    hyphens: {
      label: "With Hyphens",
      description: "Include hyphens (-) in the display",
    },
  },

  buttons: {
    generate: "Generate",
    copy: "Copy",
    copyAll: "Copy All",
    clear: "Clear",
    regenerate: "Regenerate",
  },

  messages: {
    invalidRange: "Count must be between 1 and 100",
    generateSuccess: "{count} IDs generated",
    copySuccess: "ID copied to clipboard",
    copyAllSuccess: "{count} IDs copied to clipboard",
    copyError: "Copy failed",
  },

  result: {
    title: "Generated Results",
    generated: "IDs generated",
    empty: "No IDs generated yet",
    emptyDescription:
      "Configure settings in the left panel and click the 'Generate' button to create IDs.",
    copySuccess: "ID copied to clipboard",
    copyAllSuccess: "All IDs copied to clipboard",
  },

  howToUse: {
    title: "How to Use",
    steps: [
      "Choose ID type based on your use case: UUID v4 for general use, ULID for database primary keys, GUID for Microsoft environments",
      "For UUID, select version: v4 (random), v7 (time-sortable), v1 (timestamp+MAC), v6 (improved timestamp)",
      "Enter the number of IDs to generate (up to 100 IDs at once)",
      "Configure display format: toggle uppercase/lowercase, include/exclude hyphens",
      "Click the 'Generate' button to create IDs",
      "Copy generated IDs individually or select all to copy in bulk",
      "Each ID shows generation timestamp and is identified by type and version badges",
    ],
  },

  features: {
    title: "Key Features",
    items: [
      "Supports UUID v1/v4/v6/v7 generation (choose optimal version for your use case)",
      "ULID generation (chronologically sortable, ideal for databases)",
      "GUID generation (Microsoft format with {curly braces})",
      "Generate up to 100 IDs in bulk",
      "Toggle between uppercase and lowercase (adjust for readability)",
      "Choose whether to include hyphens (customize for system requirements)",
      "One-click copy functionality (individual and bulk selection)",
      "Generation timestamp display (track ID creation history)",
      "Statistical uniqueness guarantee (extremely low collision probability)",
    ],
  },

  formats: {
    title: "ID Format Information",
    uuid: {
      title: "UUID (Universally Unique Identifier)",
      description:
        "128-bit universal unique identifier. Multiple versions available for different use cases.",
      example: "Example: 550e8400-e29b-41d4-a716-446655440000",
      versions: {
        v1: "Timestamp and MAC address based (high uniqueness)",
        v4: "Completely random generation (most common)",
        v6: "Improved version of v1 (chronologically sortable)",
        v7: "Unix time-based (new standard, chronologically sortable)",
      },
    },
    ulid: {
      title: "ULID (Universally Unique Lexicographically Sortable Identifier)",
      description:
        "Chronologically sortable unique identifier. Ideal for database indexes.",
      example:
        "Example: 01ARZ3NDEKTSV4RRFFQ69G5FAV (standard), 01ARZ3ND-EKTS-V4RR-FFQ6-9G5FAV (with hyphens)",
      features: [
        "48-bit timestamp (millisecond precision)",
        "80-bit random component",
        "26-character Base32 encoding",
        "Lexicographically sortable in chronological order",
        "Case-insensitive",
      ],
    },
    guid: {
      title: "GUID (Globally Unique Identifier)",
      description:
        "Microsoft's implementation of UUID. Essentially the same structure as UUID v4.",
      example: "Example: {550E8400-E29B-41D4-A716-446655440000}",
    },
  },

  faqList: [
    {
      q: "Which UUID version should I choose?",
      a: "For general purposes, v4 (random) is recommended. For database primary keys where chronological order matters, choose v7 or ULID.",
    },
    {
      q: "What's the difference between ULID and UUID?",
      a: "ULID is chronologically sortable and has better database index performance. UUID is completely random and more commonly used.",
    },
    {
      q: "Is uniqueness guaranteed for generated IDs?",
      a: "UUID and ULID have statistically guaranteed uniqueness with extremely low probability of collision. However, 100% uniqueness is not guaranteed.",
    },
    {
      q: "Are they secure?",
      a: "UUID v4 and ULID use random values making them difficult to guess. However, for high-security applications like authentication tokens, use dedicated security libraries.",
    },
    {
      q: "Where are generated IDs stored?",
      a: "Generated IDs are stored only in browser memory and are never sent to servers. They are cleared when the page is reloaded.",
    },
  ],
};

export default idGeneratorEn;
