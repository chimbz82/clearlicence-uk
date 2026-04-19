import { CheckerResult } from '../../types';

export const calculateRouteB = (data: {
  points: number;
  monthsSincePassing: number;
}): CheckerResult => {
  const isNewDriver = data.monthsSincePassing <= 24;
  const blockers: string[] = [];

  if (data.points >= 12) {
    return {
      status: 'Already Banned',
      summary: 'You have reached the 12-point limit for totting up.',
      blockers: ['Automatic minimum 6-month disqualification applies'],
      nextSteps: ['Hand in licence to court', 'Seek legal advice', 'Apply for licence return after ban period']
    };
  }

  if (isNewDriver && data.points >= 6) {
    return {
      status: 'Already Banned',
      summary: 'Licence revoked under New Driver Act.',
      blockers: ['6 points within 2 years of passing means your licence is gone'],
      nextSteps: ['Re-apply for provisional', 'Retake theory test', 'Retake practical test']
    };
  }

  if (data.points >= 9 || (isNewDriver && data.points >= 4)) {
    return {
      status: 'Ban Imminent',
      summary: 'You are in the extreme risk zone.',
      blockers: [`${isNewDriver ? '2' : '3'} more points will result in a total ban`],
      nextSteps: ['Drive with extreme caution', 'Check for pending NIPs', 'Consider speed awareness course if offered']
    };
  }

  if (data.points >= 3) {
    return {
      status: 'Warning',
      summary: 'Points recorded. You are being monitored.',
      blockers: ['Multiple small offences can lead to totting up quickly'],
      nextSteps: ['Monitor points expiry (usually 3 years)', 'Keep address updated with DVLA']
    };
  }

  return {
    status: 'Safe',
    summary: 'No immediate ban risk identified.',
    blockers: [],
    nextSteps: ['Maintain safe driving', 'Keep aware of local speed limits']
  };
};
