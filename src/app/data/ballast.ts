/* ---------------------------------------------------------------------------
   Ballast: GLP-1 tracker for iPhone and Apple Watch.
   Overview, support, privacy policy, terms of use and consumer health data
   privacy policy. Kept in its own file because the legal documents are long.

   Keep the Terms here in sync with Steady/Legal/Terms.md in the app repo.
   --------------------------------------------------------------------------- */

import type { AppInfo } from './apps';

const EMAIL = 'tinyforge.apps@gmail.com';
const mail = `<a href="mailto:${EMAIL}">${EMAIL}</a>`;

/** Who the agreement is with. */
const LEGAL_NAME = 'Christopher Hagler, doing business as Tinyforge';
const EFFECTIVE = 'October 14, 2026';

const TRADEMARKS =
  'Ozempic®, Wegovy® and Rybelsus® are registered trademarks of Novo Nordisk A/S. Mounjaro® and Zepbound® are registered trademarks of Eli Lilly and Company. Ballast is not affiliated with, sponsored by or endorsed by these companies.';

export const BALLAST: AppInfo = {
  slug: 'ballast',
  name: 'Ballast',
  tagline: 'A calm, private companion for life on a GLP-1, and for staying steady after your goal.',
  platform: 'iPhone & Apple Watch',
  status: 'coming-soon',
  icon: '/apps/ballast/icon.png',
  about: [
    'Ballast is a tracker for people taking GLP-1 medications such as semaglutide or tirzepatide. Log a dose in seconds, rotate injection sites, keep an eye on protein and water, and see how side effects follow your dose cycle.',
    'Most trackers stop at weight loss. Ballast is built for the long run too: set a target range, see how long you’ve stayed inside it, and see how your weight responds when your dose changes.',
    'Your logs are stored on your device. Ballast has no accounts, no ads and no tracking, and we never receive your data. Ballast is a personal log, not medical advice.',
  ],
  features: [
    { title: 'Dose day, at a glance', text: 'A dose-cycle ring, reminders and injection-site rotation on a body map.' },
    { title: 'Your patterns', text: 'See which days after a dose you tend to log nausea, fatigue or other side effects.' },
    { title: 'Maintenance mode', text: 'A target range instead of a number to chase, with time-in-range and dose changes on one chart.' },
    { title: 'Fuel', text: 'One-tap protein and water tracking toward your daily goals.' },
    { title: 'Apple Watch', text: 'Log doses, protein, water, weight and symptoms from your wrist. Stays in sync with your iPhone.' },
    { title: 'For your prescriber', text: 'A clean summary of your logs to bring to appointments.' },
  ],
  tags: ['iOS', 'watchOS', 'Health & Fitness', 'SwiftUI'],
  contactEmail: EMAIL,
  faqs: [
    {
      q: 'Does Ballast tell me what dose to take?',
      a: 'No. Ballast never recommends, calculates or adjusts doses, and it doesn’t advise on missed doses. Always follow your prescriber’s instructions and your medication’s labeling.',
    },
    {
      q: 'I missed a dose. What should I do?',
      a: 'Follow your prescriber’s missed-dose instructions or the guidance that came with your medication. Ballast is a log and can’t advise you. In an emergency, call 911.',
    },
    {
      q: 'My reminders aren’t showing up.',
      a: 'Check iOS Settings &rsaquo; Notifications &rsaquo; Ballast, and make sure notifications are allowed and no Focus mode is silencing them. Reminders can fail for reasons outside the app, so please don’t rely on them as your only reminder.',
    },
    {
      q: 'How do I use Ballast on Apple Watch?',
      a: 'Install Ballast on your iPhone, finish setup, and the Watch app installs on your paired Apple Watch (or add it from the Watch app on iPhone). Logs from either device sync to the other directly. If your iPhone is out of range, the watch saves your logs and sends them when it’s back in range.',
    },
    {
      q: 'Where is my data stored? Can I move it to a new phone?',
      a: 'Your logs are stored on your device, and on your paired Apple Watch if you use one. They’re included in your own iCloud or computer device backups, so restoring a backup to a new iPhone brings them with it. We have no servers and never receive your logs.',
    },
    {
      q: 'How do I share my logs with my doctor?',
      a: 'Go to Progress &rsaquo; Share with your prescriber, choose a date range, then send or print the PDF.',
    },
    {
      q: 'How do I delete my data?',
      a: 'Settings &rsaquo; Erase all data permanently deletes everything on that device. Deleting the app does the same.',
    },
    {
      q: 'How do I cancel or restore a subscription?',
      a: 'Subscriptions are billed by Apple. To cancel, go to iOS Settings &rsaquo; [your name] &rsaquo; Subscriptions, or use Manage Subscription in Ballast’s Settings. To restore a purchase on a new device, tap Restore Purchases in Ballast’s Settings. Apple handles refunds at <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener">reportaproblem.apple.com</a>.',
    },
    {
      q: 'Can I track a compounded medication?',
      a: 'Yes, so your records are complete. Compounded drugs are not FDA-approved, and listing them isn’t an endorsement. Ballast doesn’t sell, prescribe or refer anyone to medications, pharmacies or telehealth services.',
    },
  ],
  privacy: {
    effective: EFFECTIVE,
    sections: [
      {
        heading: 'The short version',
        paragraphs: [
          'Ballast does not collect, sell or share your personal information. Your logs are stored on your device. We don’t run servers that receive them, and the app contains no ads, no analytics, no tracking and no third-party code that collects data.',
        ],
      },
      {
        heading: 'What you log, and where it lives',
        bullets: [
          'You may log medication names and doses, injection sites, body weight, side effects and their severity, protein and water intake, notes, reminder times and your goals.',
          'This information is stored on your iPhone, and on your paired Apple Watch if you use the Watch app, in Ballast’s own storage. Home Screen and Lock Screen widgets read it on your device.',
          'It is included in your own iCloud or computer device backups if you use them. Those backups are controlled by you and covered by Apple’s privacy policy. We never receive them.',
          'Settings &rsaquo; Erase all data, or deleting the app, permanently removes it from that device.',
        ],
      },
      {
        heading: 'Apple Watch',
        paragraphs: [
          'If you use the Watch app, your iPhone and Apple Watch exchange your logs directly, using Apple’s device-to-device connection. Nothing passes through our servers.',
        ],
      },
      {
        heading: 'Apple Health',
        paragraphs: [
          'If you choose to connect Apple Health, Ballast can read your body weight and write the weight, protein and water entries you log. This happens on your device, only with your permission, and you can change it at any time in iOS Settings &rsaquo; Health &rsaquo; Data Access & Devices. Data read from Apple Health is not stored in iCloud by Ballast and is never used for advertising or shared with anyone. Ballast works fully without Apple Health.',
        ],
      },
      {
        heading: 'Reminders, Siri and on-device intelligence',
        bullets: [
          'Dose reminders are scheduled locally on your device. By default they don’t show your medication or dose on the Lock Screen. You can turn that on in Settings.',
          'If you use Siri or Shortcuts to log entries, Apple processes your request under its own privacy policy, and Ballast saves the entry on your device.',
          'Any AI-generated summaries are produced on your device using Apple’s on-device models. Your logs are not sent to us or to any third-party AI service.',
        ],
      },
      {
        heading: 'Reports you share',
        paragraphs: [
          'When you create a summary for your prescriber, Ballast opens the standard iOS share sheet and you choose where it goes. Ballast doesn’t see or keep anything you share.',
        ],
      },
      {
        heading: 'Purchases',
        paragraphs: [
          'Subscriptions and purchases are handled by Apple. We don’t receive your name, payment details or Apple ID. Apple gives us aggregated, anonymous sales reports.',
        ],
      },
      {
        heading: 'If you email us',
        paragraphs: [
          'If you contact support, we receive your email address and whatever you choose to send. We use it only to reply, and we delete support emails within 12 months unless you ask us to keep them or the law requires otherwise. Please don’t include health details you’d rather not share.',
        ],
      },
      {
        heading: 'This website',
        paragraphs: [
          'This website does not use cookies, analytics, advertising pixels or trackers. It is hosted by GitHub Pages, which may log basic technical information such as IP addresses for security, under GitHub’s privacy statement.',
        ],
      },
      {
        heading: 'Consumer health data',
        paragraphs: [
          'Residents of Washington, Nevada, Connecticut and other states with consumer health data laws: see our <a href="/apps/ballast/health-data">Consumer Health Data Privacy Policy</a>.',
        ],
      },
      {
        heading: 'Children',
        paragraphs: ['Ballast is intended for adults 18 and over and is not directed to children.'],
      },
      {
        heading: 'Changes and contact',
        paragraphs: [
          `If this policy changes, the new version will be posted here with a new effective date, and material changes will be shown in the app. Questions: ${mail}`,
        ],
      },
    ],
  },
  healthData: {
    effective: EFFECTIVE,
    sections: [
      {
        heading: 'About this policy',
        paragraphs: [
          'This Consumer Health Data Privacy Policy explains how Ballast handles “consumer health data,” as defined by the Washington My Health My Data Act, Nevada SB 370, the Connecticut Data Privacy Act and similar laws. It supplements our <a href="/apps/ballast/privacy">Privacy Policy</a>.',
        ],
      },
      {
        heading: 'Categories of consumer health data',
        bullets: [
          'Medications, doses, dose dates and injection sites you log',
          'Body weight, weight goals and target ranges',
          'Symptoms or side effects and their severity',
          'Protein and water intake',
          'Notes you write',
          'Patterns and summaries the app derives from the above, on your device',
          'Body weight read from Apple Health, if you allow it',
        ],
      },
      {
        heading: 'How it is collected and used',
        paragraphs: [
          'You enter this information yourself, or allow Ballast to read it from Apple Health. Ballast processes it only on your device, and on your paired Apple Watch, for one purpose: to provide the app’s features to you (logging, reminders, charts, patterns, widgets and reports you choose to create). We do not receive, collect to our servers, or have access to this data.',
          'If you email support and include health information, we use it only to answer your request.',
        ],
      },
      {
        heading: 'Sharing and sale',
        bullets: [
          'We do not share consumer health data with any third party or affiliate.',
          'We do not sell consumer health data.',
          'We do not use it for advertising, and we do not geofence health care locations.',
          'Data leaves your device only when you choose to share it yourself (for example, a report you send to your prescriber), or through Apple services you control (device backups, Apple Health).',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'You have the right to confirm whether we collect your consumer health data, to access it, to delete it, and to withdraw consent. Because Ballast stores your data on your device, you can exercise these rights directly in the app: view everything in History, export a report, and permanently delete everything with Settings &rsaquo; Erase all data. Turning off Apple Health access in iOS Settings withdraws consent for that data.',
          `For any request, including about health information in support emails, contact ${mail}. We respond within 45 days. If we decline your request, you may appeal by replying with “Appeal” in the subject line. We will respond to an appeal within 45 days. If you’re unhappy with the result, you may contact your state Attorney General.`,
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [`${LEGAL_NAME}, ${mail}`],
      },
    ],
  },
  terms: {
    effective: EFFECTIVE,
    sections: [
      {
        heading: 'Agreement',
        paragraphs: [
          `These Terms of Use (the “<b>Terms</b>”) are a binding agreement between you and ${LEGAL_NAME} (“<b>we</b>,” “<b>us</b>”), the developer of the Ballast app for iPhone and Apple Watch, including its widgets and related features (the “<b>App</b>”).`,
          '<b>PLEASE READ CAREFULLY. SECTION 15 REQUIRES MOST DISPUTES TO BE RESOLVED BY BINDING INDIVIDUAL ARBITRATION AND WAIVES CLASS ACTIONS AND JURY TRIALS. YOU MAY OPT OUT AS DESCRIBED THERE. SECTIONS 12 AND 13 LIMIT OUR LIABILITY.</b>',
          'By checking the box to agree, tapping “I Agree,” or downloading, installing or using the App, you agree to these Terms and to our <a href="/apps/ballast/privacy">Privacy Policy</a> and <a href="/apps/ballast/health-data">Consumer Health Data Privacy Policy</a>. If you do not agree, do not use the App.',
        ],
      },
      {
        heading: '1. Eligibility',
        paragraphs: [
          'You must be at least 18 years old and an adult where you live. By using the App you represent that you meet this requirement and can enter into these Terms.',
        ],
      },
      {
        heading: '2. The App is not medical advice',
        bullets: [
          '<b>Personal log only.</b> The App is a record-keeping tool. It displays information you choose to enter, such as doses, injection sites, weight, symptoms and intake. It does not provide medical advice, diagnosis or treatment, and it is not a substitute for professional care.',
          '<b>No medical relationship.</b> Using the App creates no doctor–patient, pharmacist–patient or other healthcare relationship. We are not healthcare providers.',
          '<b>No dosing recommendations.</b> The App never recommends, calculates, adjusts or verifies doses, schedules, titration, tapering or missed-dose actions. Dose values shown are ones you entered, or shortcuts for entering data. <b>Always take medication exactly as prescribed, and follow your prescriber, your pharmacist and the official labeling.</b>',
          '<b>Not a medical device.</b> The App is not intended to diagnose, treat, cure, mitigate or prevent any disease. It has not been reviewed, cleared or approved by the FDA or any regulator.',
          '<b>Your decisions are your own.</b> You are solely responsible for decisions about your health, medications and treatment. Never disregard or delay professional advice because of the App.',
          '<b>Emergencies.</b> The App is not for emergencies. For severe abdominal pain, persistent vomiting, signs of an allergic reaction or any urgent symptom, <b>call 911 or contact your prescriber immediately.</b>',
        ],
      },
      {
        heading: '3. Reminders are not guaranteed',
        paragraphs: [
          'We do not guarantee that any reminder or notification will be delivered at all, or delivered on time. Reminders can fail because of device settings, permissions, Focus modes, battery settings, operating-system behavior, time-zone changes, Apple Watch connectivity, software errors or other causes. <b>Do not rely on the App as your only way to remember your medication.</b> You remain fully responsible for taking it on schedule.',
        ],
      },
      {
        heading: '4. Insights, reports and AI features',
        bullets: [
          'Charts, statistics, patterns and summaries only describe data you logged. They do not show cause and effect, are not medical interpretations, and may be incomplete or inaccurate.',
          'AI-generated summaries may be wrong, incomplete or misleading, and are provided for convenience only.',
          'You are responsible for reviewing any report before you share it, and for choosing whom you share it with. We have no control over a report once it is shared.',
        ],
      },
      {
        heading: '5. Medications',
        bullets: [
          `<b>Trademarks.</b> Medication names are used for identification only. ${TRADEMARKS}`,
          '<b>Compounded medications.</b> You can log compounded medications so your records are complete. Compounded drugs are not FDA-approved. Listing them is not an endorsement or a statement about their safety, quality or equivalence to any approved drug.',
          '<b>No sales or referrals.</b> We do not sell, prescribe or dispense any medication, and we do not refer anyone to pharmacies, telehealth services or prescribers.',
        ],
      },
      {
        heading: '6. Your data',
        bullets: [
          'Your logs are stored on your device, and on your paired Apple Watch if you use one. We don’t operate servers that receive them. Our privacy policies are part of these Terms.',
          '<b>You are responsible for securing your devices and backing up your data.</b> Data can be permanently lost if you delete the App, use Erase all data, or lose, damage or reset your device, or if an error occurs. <b>We are not responsible for any loss of data.</b>',
          'Apple Health is provided by Apple under Apple’s terms. Data exchanged with it follows the permissions you grant.',
          'You are responsible for the accuracy of what you enter.',
        ],
      },
      {
        heading: '7. Subscriptions and payments',
        bullets: [
          'Some features require a paid subscription or purchase (“Premium”). We may change which features are free. We will not remove your ability to view or erase data you have already logged.',
          'Purchases are processed by Apple through your Apple Account under Apple’s terms. We don’t receive your payment information.',
          '<b>Subscriptions renew automatically at the then-current price unless you cancel at least 24 hours before the end of the current period.</b> Your account is charged within 24 hours before the period ends. Price, period and any trial length are shown before you buy.',
          '<b>Free trials convert to a paid subscription automatically unless you cancel at least 24 hours before the trial ends.</b>',
          'Cancel at any time in iOS Settings &rsaquo; [your name] &rsaquo; Subscriptions, or via Manage Subscription in the App. Cancellation takes effect at the end of the current period.',
          'Refunds are handled only by Apple, at <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener">reportaproblem.apple.com</a>.',
          'Apple will notify you of any price change as its policies and the law require.',
        ],
      },
      {
        heading: '8. License and acceptable use',
        bullets: [
          'We grant you a limited, personal, non-exclusive, non-transferable, revocable license to use the App for personal, non-commercial purposes on Apple devices you own or control, as Apple’s Usage Rules permit.',
          'You may not:<ul><li>copy, modify or create derivative works of the App;</li><li>reverse engineer, decompile or disassemble it, except where the law expressly allows;</li><li>rent, sell, sublicense or distribute it;</li><li>use it unlawfully, or to provide medical services to others;</li><li>remove proprietary notices;</li><li>circumvent security or licensing features.</li></ul>',
          'The App and its content and trademarks belong to us or our licensors. All rights not expressly granted are reserved.',
          'If you send feedback, we may use it without restriction or compensation.',
        ],
      },
      {
        heading: '9. Changes to the App',
        paragraphs: [
          'We may modify, suspend or discontinue the App or any feature at any time. We have no obligation to provide updates, maintenance or support.',
        ],
      },
      {
        heading: '10. Changes to these Terms',
        paragraphs: [
          'We may update these Terms. We will tell you about material changes in the App, and may ask you to accept them before you continue. Updated Terms take effect when posted, or on the date stated in them, and they do not apply to disputes that arose earlier. If you disagree, stop using the App. Changes to Section 15 follow Section 15.8.',
        ],
      },
      {
        heading: '11. Termination',
        paragraphs: [
          'You may stop using the App and delete it at any time. Your license ends automatically if you breach these Terms. Sections 2–6, 8 (ownership and feedback) and 12–18 survive termination.',
        ],
      },
      {
        heading: '12. Disclaimer of warranties',
        paragraphs: [
          '<b>TO THE FULLEST EXTENT PERMITTED BY LAW:</b><ul><li><b>THE APP AND ALL ITS CONTENT AND FEATURES ARE PROVIDED “AS IS” AND “AS AVAILABLE,” WITHOUT WARRANTIES OF ANY KIND, EXPRESS, IMPLIED OR STATUTORY.</b></li><li><b>WE DISCLAIM ALL WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, ACCURACY AND QUIET ENJOYMENT.</b></li><li><b>WE DO NOT WARRANT THAT THE APP WILL BE UNINTERRUPTED, TIMELY, SECURE OR ERROR-FREE.</b></li><li><b>WE DO NOT WARRANT THAT REMINDERS WILL BE DELIVERED.</b></li><li><b>WE DO NOT WARRANT THAT INSIGHTS, CHARTS, REPORTS OR AI CONTENT WILL BE ACCURATE OR COMPLETE.</b></li><li><b>WE DO NOT WARRANT THAT YOUR DATA WILL NOT BE LOST.</b></li><li><b>YOU USE THE APP AT YOUR OWN RISK.</b></li></ul>',
          'Some jurisdictions do not allow certain warranty exclusions, so some of these may not apply to you.',
        ],
      },
      {
        heading: '13. Limitation of liability',
        paragraphs: [
          '<b>TO THE FULLEST EXTENT PERMITTED BY LAW:</b>',
          '<b>(a) Excluded damages.</b><ul><li><b>WE AND OUR AFFILIATES, LICENSORS AND SERVICE PROVIDERS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY OR PUNITIVE DAMAGES.</b></li><li><b>THIS INCLUDES DAMAGES FOR PERSONAL INJURY, ILLNESS, MISSED OR INCORRECT MEDICATION DOSES, LOSS OF DATA, LOSS OF PROFITS AND EMOTIONAL DISTRESS.</b></li><li><b>IT APPLIES TO DAMAGES ARISING FROM THE APP OR THESE TERMS, FROM YOUR USE OF OR INABILITY TO USE THE APP, AND FROM RELIANCE ON THE APP, ITS REMINDERS OR ITS CONTENT.</b></li><li><b>IT APPLIES UNDER ANY THEORY OF LIABILITY, INCLUDING NEGLIGENCE, EVEN IF WE WERE ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</b></li></ul>',
          '<b>(b) Cap.</b><ul><li><b>OUR TOTAL LIABILITY FOR ALL CLAIMS WILL NOT EXCEED THE GREATER OF THE AMOUNT YOU PAID US FOR THE APP IN THE 12 MONTHS BEFORE THE CLAIM AROSE, OR US $50.</b></li><li><b>THESE LIMITS ARE AN ESSENTIAL PART OF OUR BARGAIN, AND THEY APPLY EVEN IF A REMEDY FAILS OF ITS ESSENTIAL PURPOSE.</b></li></ul>',
          '<b>(c) What this does not limit.</b><ul><li><b>NOTHING IN THESE TERMS LIMITS LIABILITY THAT CANNOT BE LIMITED UNDER APPLICABLE LAW, SUCH AS LIABILITY FOR FRAUD OR, WHERE THE LAW REQUIRES, GROSS NEGLIGENCE OR WILLFUL MISCONDUCT.</b></li><li><b>IN THOSE CASES, LIABILITY IS LIMITED TO THE FULLEST EXTENT PERMITTED.</b></li></ul>',
        ],
      },
      {
        heading: '14. Indemnification',
        paragraphs: [
          'To the extent permitted by law, you will defend, indemnify and hold harmless us and our affiliates, licensors and service providers from claims, liabilities, damages, losses and expenses, including reasonable attorneys’ fees. This covers anything arising from:<ul><li>your use or misuse of the App;</li><li>your breach of these Terms;</li><li>your violation of any law or anyone’s rights;</li><li>any information you enter, export or share.</li></ul>',
        ],
      },
      {
        heading: '15. Dispute resolution: binding arbitration and class action waiver',
        bullets: [
          `<b>15.1 Informal resolution first.</b> Before filing anything, you and we will try to resolve the dispute informally for at least 60 days, after one side sends the other a written notice describing the dispute and the relief it wants. Notices to us go to ${mail}.`,
          '<b>15.2 Agreement to arbitrate.</b> Except as stated in 15.4, <b>any dispute arising out of or relating to these Terms or the App will be resolved by binding individual arbitration, not in court.</b> This includes disputes about the scope or enforceability of this agreement. There is no judge or jury, and court review is limited.',
          '<b>15.3 Rules.</b> The American Arbitration Association (AAA) will administer the arbitration under its Consumer Arbitration Rules (<a href="https://www.adr.org" target="_blank" rel="noopener">adr.org</a>), as modified here. The arbitration will be held in your county of residence, or by video or written submissions, at your choice. Fees follow the AAA Consumer Rules. The Federal Arbitration Act governs this Section.',
          '<b>15.4 Exceptions.</b> Either party may bring a qualifying individual claim in small-claims court, or seek injunctive relief in court for intellectual-property infringement.',
          '<b>15.5 CLASS ACTION AND JURY WAIVER.</b><ul><li><b>CLAIMS MAY BE BROUGHT ONLY IN AN INDIVIDUAL CAPACITY, NOT AS A PLAINTIFF OR MEMBER OF ANY CLASS, COLLECTIVE, CONSOLIDATED OR REPRESENTATIVE PROCEEDING.</b></li><li><b>THE ARBITRATOR MAY NOT CONSOLIDATE MORE THAN ONE PERSON’S CLAIMS, AND MAY AWARD RELIEF ONLY TO THE INDIVIDUAL PARTY, AND ONLY AS NEEDED FOR THAT PARTY’S CLAIM.</b></li><li><b>IF A DISPUTE PROCEEDS IN COURT, BOTH PARTIES WAIVE A JURY TRIAL.</b></li><li>If this waiver is found unenforceable for a claim, that claim alone will be severed and heard in court, and stayed until the individual arbitration is finished.</li></ul>',
          '<b>15.6 Mass filings.</b> If 25 or more similar demands are filed by or with the same or coordinated counsel, the AAA Mass Arbitration Supplementary Rules apply, to the extent permitted.',
          `<b>15.7 30-day opt-out.</b> <b>You may opt out of arbitration by emailing ${mail} within 30 days after you first accept these Terms.</b> Use the subject line “Arbitration Opt-Out”, and include your name and a clear statement that you opt out. Opting out doesn’t affect the rest of these Terms.`,
          '<b>15.8 Changes.</b> A material change to this Section does not apply to a dispute you notified us about before the change. You may reject such a change by emailing us within 30 days after it takes effect.',
          '<b>15.9 Time limit.</b> To the extent permitted by law, any claim must be brought within one year after it arises, or it is permanently barred.',
        ],
      },
      {
        heading: '16. Governing law',
        paragraphs: [
          'These Terms are governed by the laws of the U.S. state where you live, without regard to conflict-of-law rules, except that the Federal Arbitration Act governs Section 15. Disputes not subject to arbitration will be heard in the state or federal courts for the county where you live. Nothing here takes away mandatory consumer protections that apply where you live.',
        ],
      },
      {
        heading: '17. Apple terms',
        bullets: [
          'These Terms are between you and us only, not Apple Inc. (“Apple”). We, not Apple, are solely responsible for the App and its content.',
          'Your license is limited to Apple-branded products you own or control, as permitted by the Usage Rules in the Apple Media Services Terms and Conditions. Accounts associated with you through Family Sharing or volume purchasing may also use the App, as those rules allow.',
          'We are solely responsible for maintenance and support, to the extent stated here or required by law. Apple has no obligation to provide any.',
          'If the App fails to conform to an applicable warranty, you may notify Apple, and Apple will refund the purchase price, if any. To the maximum extent permitted by law, Apple has no other warranty obligation. Any other claims, losses, liabilities, damages, costs or expenses caused by a failure to conform to a warranty are our responsibility, to the extent not disclaimed here.',
          'We, not Apple, are responsible for any claims by you or a third party relating to the App, including:<ul><li>product liability claims;</li><li>claims that the App fails to meet a legal or regulatory requirement;</li><li>claims under consumer protection, privacy or similar laws, including in connection with HealthKit.</li></ul>',
          'If a third party claims the App or your use of it infringes their intellectual property, we, not Apple, are solely responsible for investigating, defending, settling and discharging that claim.',
          'You represent that you are not in a country subject to a U.S. Government embargo or designated as a “terrorist supporting” country, and that you are not on any U.S. Government list of prohibited or restricted parties.',
          `Questions, complaints or claims about the App go to us: ${mail}.`,
          'You must comply with applicable third-party terms when using the App.',
          'Apple and its subsidiaries are third-party beneficiaries of these Terms. When you accept them, Apple has the right, and is deemed to have accepted the right, to enforce them against you.',
        ],
      },
      {
        heading: '18. General',
        paragraphs: [
          'These Terms and our privacy policies are the entire agreement between you and us about the App.',
          'If a provision is unenforceable, it will be enforced to the maximum extent permitted and the rest of these Terms remain in effect. Section 15.5 has its own rule for this.',
          'If we don’t enforce a provision, that is not a waiver of it.',
          'You may not assign these Terms. We may assign them, including to a business entity we form or in a merger, acquisition or sale of assets.',
          'We are not liable for delays or failures caused by events beyond our reasonable control.',
          'Headings are for convenience only.',
          'Electronic acceptance of these Terms has the same effect as a handwritten signature.',
        ],
      },
      {
        heading: '19. Contact',
        paragraphs: [`${LEGAL_NAME}, ${mail}`],
      },
    ],
  },
};
