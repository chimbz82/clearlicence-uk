import { CheckerResult } from '../../types';

export const DESIGNATED_COUNTRIES = [
  'Andorra', 'Australia', 'Barbados', 'British Virgin Islands', 'Canada',
  'Cayman Islands', 'Falkland Islands', 'Faroe Islands', 'Gibraltar',
  'Hong Kong', 'Japan', 'Monaco', 'New Zealand', 'Republic of Korea',
  'Republic of North Macedonia', 'Singapore', 'South Africa', 'Switzerland',
  'Taiwan', 'Ukraine', 'United Arab Emirates', 'Zimbabwe'
];

export const calculateRouteA = (data: {
  country: string;
  isResident: boolean;
  residencyMonths: number;
  hasVisa: boolean;
  licenceHeldYears: number;
}): CheckerResult => {
  const isDesignated = DESIGNATED_COUNTRIES.includes(data.country);
  const blockers: string[] = [];

  if (!data.hasVisa) blockers.push('Valid UK visa is required for conversion');
  if (data.licenceHeldYears < 1) blockers.push('Licence must be held for at least 1 year');
  if (data.residencyMonths > 12) blockers.push('Exchange must be done within 12 months of becoming resident');

  if (!isDesignated) {
    return {
      status: 'Not Eligible',
      summary: `${data.country} is not a designated country for direct exchange.`,
      blockers: [...blockers, 'You must take a full UK theory and practical test'],
      nextSteps: ['Apply for a provisional licence', 'Book your theory test']
    };
  }

  if (blockers.length > 0) {
    return {
      status: 'Borderline',
      summary: `Your ${data.country} licence is from a designated country, but you have missed requirements.`,
      blockers,
      nextSteps: ['Consult a legal specialist', 'Contact DVLA for specific exemption']
    };
  }

  return {
    status: 'Eligible',
    summary: 'You are eligible to exchange your foreign licence for a UK version.',
    blockers: [],
    nextSteps: ['Download and fill form D1', 'Send origin licence + ID to DVLA', 'Pay £43 exchange fee']
  };
};
