export interface SEOPageData {
  h1: string;
  title: string;
  description: string;
  intro: string;
  faqs: { q: string; a: string }[];
}

// Helper to generate unique descriptions for countries
const getCountryDriveDescription = (country: string) => ({
  h1: `Can I drive in the UK with a ${country} licence?`,
  title: `Can I drive in UK with ${country} licence? | ClearLicence UK 2026`,
  description: `Check if your ${country} driving licence is valid in the UK. Rules for residents and visitors from ${country} in 2026.`,
  intro: `If you have recently arrived in the United Kingdom from ${country}, you might be wondering about the legal status of your driving privileges. For visitors, the rules are relatively straightforward, allowing you to use your valid ${country} licence for up to 12 months. However, if you become a UK resident, the clock starts ticking. Depending on whether ${country} is a designated country, you may need to exchange your licence or even take a full UK driving test from scratch. Failure to comply can lead to a £1,000 fine and points on your record before you even get a UK licence.`,
  faqs: [
    { q: `How long is my ${country} licence valid for?`, a: `It is valid for 12 months from your date of entry or becoming a resident.` },
    { q: `Do I need an International Driving Permit for ${country}?`, a: `While helpful for translation, an IDP does not extend the 12-month validity period.` },
    { q: `Can I exchange a ${country} licence for a UK one?`, a: `This depends on if ${country} is a designated country. Check our Route A checker for instant confirmation.` },
    { q: `What happens after 12 months?`, a: `You must hold a UK provisional licence and be supervised if ${country} is not a designated exchange territory.` }
  ]
});

const countries = [
  'Afghanistan', 'Albania', 'Algeria', 'Angola', 'Argentina', 'Australia', 'Bangladesh', 'Brazil', 'Canada', 'China', 'Colombia', 'DR Congo', 'Ecuador', 'Egypt', 'Ethiopia', 'France', 'Germany', 'Ghana', 'India', 'Indonesia', 'Iran', 'Iraq', 'Italy', 'Japan', 'Kenya', 'Malaysia', 'Mexico', 'Morocco', 'Myanmar', 'Nepal', 'New Zealand', 'Nigeria', 'Pakistan', 'Peru', 'Philippines', 'Poland', 'Romania', 'Russia', 'Saudi Arabia', 'Senegal', 'Singapore', 'Somalia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'Sudan', 'Tanzania', 'Thailand', 'Turkey', 'Uganda', 'Ukraine', 'United States', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Yemen', 'Zimbabwe'
];

export const SEO_DATA_STORE: Record<string, SEOPageData> = {};

countries.forEach(country => {
  const slug = `can-i-drive-in-uk-with-${country.toLowerCase().replace(/\s+/g, '-')}-licence`;
  SEO_DATA_STORE[slug] = getCountryDriveDescription(country);
  
  const convSlug = `uk-driving-licence-conversion-from-${country.toLowerCase().replace(/\s+/g, '-')}`;
  SEO_DATA_STORE[convSlug] = {
    h1: `UK driving licence conversion from ${country}`,
    title: `UK driving licence conversion from ${country} | ClearLicence UK 2026`,
    description: `Step-by-step guide to converting a ${country} licence to a UK DVLA licence. Fees, forms, and timelines.`,
    intro: `Converting your ${country} licence is a critical administrative step for anyone settling in the UK. The process involves submitting original documents to the DVLA. If ${country} is a designated country, you can avoid retaking your tests. If not, you'll need to understand the provisional licence requirements. Most conversions take 3-6 weeks and require a specific fee paid via postal order or cheque. Our specialized reports break down every document you need for a ${country} specific application.`,
    faqs: [
      { q: `What forms do I need for ${country}?`, a: `You usually need the D1 form available from most Post Offices.` },
      { q: `How much does it cost?`, a: `The standard exchange fee is £43.` },
      { q: `Do I lose my ${country} licence?`, a: `Yes, the DVLA typically retains your foreign licence and sends it back to the issuing authority.` },
      { q: `How long is the wait?`, a: `Expect 3 weeks for standard processing, though it can take longer during peak times.` }
    ]
  };
});

// Points Pages
const pointsScenarios = ['speeding', 'mobile-phone', 'drink-driving', 'drug-driving', 'careless-driving', 'dangerous-driving', 'red-light', 'no-insurance', 'failure-to-stop', 'failing-to-give-information', 'new-driver', 'lorry-driver', 'bus-driver', 'taxi-driver', 'totting-up', 'rehabilitation-course', 'short-ban', 'long-ban', 'repeat-offender', 'first-offence'];

pointsScenarios.forEach(scenario => {
  const slug = `how-many-points-before-driving-ban-uk-${scenario}`;
  SEO_DATA_STORE[slug] = {
    h1: `UK driving ban points for ${scenario.replace(/-/g, ' ')}`,
    title: `${scenario.toUpperCase()} Driving Ban Points UK 2026 | ClearLicence`,
    description: `Everything you need to know about ${scenario} points and how they lead to a driving ban in the UK.`,
    intro: `${scenario.replace(/-/g, ' ')} is one of the most common ways drivers find themselves accumulating points on their UK driving record. Under the totting-up system, once you reach 12 points, a ban is almost certain unless "Exceptional Hardship" can be proven. For new drivers, the limit is even lower at just 6 points. Understanding the specific thresholds for ${scenario} can save your licence.`,
    faqs: [
      { q: `Is ${scenario} a mandatory ban?`, a: `Certain offences carry mandatory bans while others add 3-11 points to your record.` },
      { q: `How long do ${scenario} points stay on my licence?`, a: `Most points stay for 4 years, though some serious offences remain for 11 years.` },
      { q: `Can I go to court for ${scenario}?`, a: `Yes, if you wish to challenge the points or present a hardship case.` },
      { q: `What is the fine for ${scenario}?`, a: `Fines are usually based on a percentage of your weekly income, capped at £1,000 or £2,500.` }
    ]
  };
});

// Scenario Pages
const scenarios = ['foreign-licence-expired', 'eu-licence-after-brexit', 'international-driving-permit', 'licence-not-recognised', 'exchange-deadline-missed', 'points-check-online', 'endorsement-check', 'medical-conditions', 'hgv-licence-check', 'provisional-licence-rules', 'licence-categories-explained', 'address-change-dvla', 'lost-licence-replacement', 'photocard-expiry', 'paper-licence-valid', 'tachograph-card', 'fleet-driver-check', 'company-car-driver', 'uber-driver-licence', 'motorcycle-licence-uk'];

scenarios.forEach(scenario => {
  const slug = `dvla-licence-check-${scenario}`;
  SEO_DATA_STORE[slug] = {
    h1: `DVLA rules for ${scenario.replace(/-/g, ' ')}`,
    title: `DVLA ${scenario.toUpperCase()} Rules 2026 | ClearLicence UK`,
    description: `Official 2026 guidance on ${scenario.replace(/-/g, ' ')} for UK and foreign licence holders.`,
    intro: `Navigating the DVLA rules for ${scenario.replace(/-/g, ' ')} can be complicated, especially if your licence was issued outside the European Union. In 2026, rules have been tighten regarding the validity of digital vs physical records. This guide covers everything from photocard renewals to check-codes and international permit requirements. Knowing where you stand with ${scenario} is essential to avoid legal trouble on UK roads.`,
    faqs: [
      { q: `What is the latest rule on ${scenario}?`, a: `As of 2026, the primary requirement is a digital check-code for verification.` },
      { q: `Where can I find more on ${scenario}?`, a: `You can use our free checker for a specialized assessment of your specific situation.` },
      { q: `Is it expensive to fix ${scenario}?`, a: `Most DVLA administrative changes are free or low-cost (approx £14-£20).` },
      { q: `Can I drive while ${scenario} is being processed?`, a: `Under Section 88 of the Road Traffic Act, you can often drive if your application is with pure DVLA.` }
    ]
  };
});
