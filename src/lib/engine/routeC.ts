import { CheckerResult } from '../../types';

export const calculateRouteC = (data: {
  origin: 'EU/EEA' | 'Non-EU';
  residencyMonths: number;
  hasIDP: boolean;
  isExpired: boolean;
}): CheckerResult => {
  if (data.isExpired) {
    return {
      status: 'Expired',
      summary: 'Your foreign licence is no longer valid.',
      blockers: ['Driving on an expired licence is a criminal offence'],
      nextSteps: ['Stop driving immediately', 'Renew in origin country OR take UK test']
    };
  }

  if (data.origin === 'EU/EEA') {
    return {
      status: 'Valid',
      summary: 'EU/EEA licences are valid indefinitely in the UK.',
      blockers: [],
      nextSteps: ['Exchange for UK licence (optional)', 'Register for UK endorsement record if required']
    };
  }

  // Non-EU logic
  if (data.residencyMonths < 12) {
    const daysLeft = Math.max(0, 365 - (data.residencyMonths * 30));
    return {
      status: 'Time-Limited',
      summary: `Your licence is valid for 12 months from your UK entry date.`,
      blockers: [`You have approximately ${Math.round(daysLeft)} days of validity remaining`],
      nextSteps: ['Apply for UK licence now', 'Do not wait until final month']
    };
  }

  return {
    status: 'Invalid',
    summary: 'The 12-month grace period for non-EU licences has passed.',
    blockers: ['Your foreign licence is now legally invalid for driving in the UK'],
    nextSteps: ['Stop driving immediately', 'Apply for a UK provisional licence']
  };
};
