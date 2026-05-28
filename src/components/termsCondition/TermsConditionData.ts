import { ToSSection } from "@/types/termsCondition/TermsCondition.types";

export const tosMetadata = {
  title: "Terms of Service",
  subtitle: "VRChat Commissions",
  lastUpdated: "Last updated: May 2026",
  agreementNote: "By commissioning ZH3, you automatically agree to all terms described in this document. Please read them in full before proceeding."
};

export const tosSections: ToSSection[] = [
  {
    id: "general-information",
    title: "1. General Information",
    paragraphs: [
      "These terms apply to all avatar and asset/prop commissions for VRChat made by Zilla-ZH3 (hereafter 'the artist'). The client is any person who contracts the services described herein.",
      "The artist reserves the right to decline any commission without providing a reason."
    ]
  },
  {
    id: "available-commission-types",
    title: "2. Available Commission Types",
    listGroups: [
      {
        title: "Avatars",
        type: "bullet",
        items: [
          "PC/Quest-compatible full avatars for VRChat (edited from an agreed-upon base)",
          "Optimization of existing avatars",
          "Recolors, modifications, and avatar edits"
        ]
      },
      {
        title: "Assets & Props",
        type: "bullet",
        items: [
          "Clothing, props, and accessories for avatars",
          "Custom textures and materials"
        ]
      }
    ]
  },
  {
    id: "commission-process",
    title: "3. Commission Process",
    listGroups: [
      {
        type: "numbered",
        items: [
          "Step 1: The client contacts the artist with a detailed description of the request (visual references, colors, style, intended use).",
          "Step 2: The artist confirms availability, reviews the request, and sends a quote.",
          "Step 3: The client approves the quote and makes the initial payment (minimum 50% of the total).",
          "Step 4: The artist begins work and shares WIPs for approval.",
          "Step 5: Once the final result is approved, the client pays the remaining balance and receives the files (files will only be shared if the client has purchased the base used)."
        ]
      }
    ]
  },
  {
    id: "payments",
    title: "4. Payments",
    paragraphs: [
      "Commissions are paid in USD. The exchange rate used will be the one in effect at the time the commission is agreed upon."
    ],
    listGroups: [
      {
        title: "Accepted payment methods",
        type: "bullet",
        items: [
          "PayPal (USD)",
          "Wise (USD)"
        ]
      }
    ],
    paragraphsAfter: [
      "A minimum deposit of 50% is required before any work begins. The remaining 50% is due upon delivery of the approved final result.",
      "No work will begin until the deposit has been confirmed and received by the artist."
    ]
  },
  {
    id: "revisions",
    title: "5. Revisions",
    paragraphs: [
      "Each commission includes a limited number of revisions at no additional cost:"
    ],
    listGroups: [
      {
        type: "bullet",
        items: [
          "2 major revisions (significant design changes)",
          "Unlimited minor revisions during WIP stages (colors, small details)"
        ]
      }
    ],
    paragraphsAfter: [
      "Additional revisions beyond this limit will incur an extra charge, agreed upon with the client before proceeding.",
      "Changes requested after final design approval will be treated as a new commission or charged separately."
    ]
  },
  {
    id: "refund-policy",
    title: "6. Refund Policy",
    paragraphs: [
      "Refunds are partial and depend on the progress of the work at the time of cancellation:"
    ],
    tableData: {
      headers: ["Cancellation Stage", "Refund"],
      rows: [
        ["Before work has started", "100% of deposit paid"],
        ["Early WIP (less than 30%)", "50% of deposit paid"],
        ["Work in progress (30%–70%)", "25% of deposit paid"],
        ["More than 70% completed", "No refund"]
      ]
    },
    paragraphsAfter: [
      "If the artist cancels (illness, emergency), 100% of all payments made will be refunded without exception."
    ]
  },
  {
    id: "delivery-times",
    title: "7. Delivery Times",
    paragraphs: [
      "Delivery times are estimates and may vary depending on the complexity of the work and the artist's current workload."
    ],
    listGroups: [
      {
        type: "bullet",
        items: [
          "Simple avatars: 1–3 weeks",
          "Complex avatars: 3–6 weeks",
          "Clothing adaptations, props, and accessories: 3–10 business days"
        ]
      }
    ],
    paragraphsAfter: [
      "The artist will notify the client in advance of any delays. Estimated times do not include days lost waiting for the client to respond to revisions or provide missing information."
    ]
  },
  {
    id: "usage-rights",
    title: "8. Usage Rights",
    listGroups: [
      {
        title: "The client MAY:",
        type: "checked",
        items: [
          "Use the avatar or asset in VRChat for personal use",
          "Display the work on social media with credit to the artist",
          "Modify the work for personal use after delivery"
        ]
      },
      {
        title: "The client MAY NOT:",
        type: "crossed",
        items: [
          "Resell, redistribute, or share the source files",
          "Claim authorship of the work",
          "Use the work for commercial purposes without a prior written agreement",
          "Upload the avatar as public on VRChat without the artist's authorization"
        ]
      }
    ],
    paragraphsAfter: [
      "The artist retains copyright over the work. Zilla-ZH3 reserves the right to display the work in their portfolio and on social media."
    ]
  },
  {
    id: "client-conduct",
    title: "9. Client Conduct",
    paragraphs: [
      "The artist reserves the right to cancel any commission and retain payments received if the client:"
    ],
    listGroups: [
      {
        type: "bullet",
        items: [
          "Harasses, threatens, or disrespects the artist",
          "Files chargebacks or payment disputes without prior communication",
          "Provides false or misleading information when commissioning",
          "Violates VRChat's terms of service"
        ]
      }
    ]
  },
  {
    id: "content-not-accepted",
    title: "10. Content Not Accepted",
    paragraphs: [
      "The artist will not complete commissions containing:"
    ],
    listGroups: [
      {
        type: "bullet",
        items: [
          "Content that is illegal under any jurisdiction",
          "Explicit sexual content without a prior agreement",
          "Content promoting hate, discrimination, or violence",
          "Characters or designs that infringe on third-party copyrights"
        ]
      }
    ]
  },
  {
    id: "liability",
    title: "11. Liability",
    paragraphs: [
      "The artist is not responsible for how the client uses the delivered work after the transaction is complete. The client assumes full responsibility for the use of the work on third-party platforms (VRChat, Steam, etc.)."
    ]
  },
  {
    id: "changes-to-these-terms",
    title: "12. Changes to These Terms",
    paragraphs: [
      "Zilla-ZH3 reserves the right to update these Terms of Service at any time. Changes apply to new commissions only, not ones already in progress. It is recommended to review this document before each commission."
    ]
  }
];
