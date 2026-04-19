import { CheckerResult } from '../../types';
import { DESIGNATED_COUNTRIES } from './routeA';

export const calculateRouteD = (data: {
  country: string;
  category: 'A' | 'B' | 'C' | 'D';
  isEU: boolean;
  isValid: boolean;
}): CheckerResult => {
  const isDesignated = DESIGNATED_COUNTRIES.includes(data.country);

  if (isDesignated) {
    return {
      status: 'Exempt',
      summary: `${data.country} is a designated territory.`,
      blockers: [],
      nextSteps: ['Simply exchange your licence', 'No tests required']
    };
  }

  if (data.isEU) {
    if (data.isValid) {
      return {
        status: 'Exempt',
        summary: 'Valid EU/EEA licences do not require testing for conversion.',
        blockers: [],
        nextSteps: ['Exchange D1 form', 'Optional unless points are added']
      };
    } else {
      return {
        status: 'Full Test Required',
        summary: 'Your EU licence has expired.',
        blockers: ['Expired licences cannot be exchanged without a test'],
        nextSteps: ['Apply for provisional', 'Book theory', 'Book practical']
      };
    }
  }

  return {
    status: 'Full Test Required',
    summary: 'Standard non-designated country requirements apply.',
    blockers: ['Theory and Practical tests are mandatory'],
    nextSteps: ['Book Theory Test', 'Hire a driving instructor', 'Take Practical Test']
  };
};
