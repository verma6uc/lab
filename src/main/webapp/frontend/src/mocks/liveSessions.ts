import { faker } from '@faker-js/faker';

export interface Session {
  id: string;
  browser: string;
  version: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  location: {
    city: string;
    country: string;
    coordinates: [number, number]; // [latitude, longitude]
  };
  ipAddress: string;
  status: 'Active' | 'Idle' | 'Disconnected';
  lastActivity: string;
  userAgent: string;
  duration: number; // in minutes
  pages: string[];
}

const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge'];
const versions = {
  Chrome: ['120.0', '119.0', '118.0'],
  Firefox: ['122.0', '121.0', '120.0'],
  Safari: ['17.0', '16.0', '15.0'],
  Edge: ['120.0', '119.0', '118.0'],
};

// Generate 100 mock sessions
export const mockSessions: Session[] = Array.from({ length: 100 }, () => {
  const browser = faker.helpers.arrayElement(browsers);
  const deviceType = faker.helpers.arrayElement(['desktop', 'mobile', 'tablet']) as Session['deviceType'];
  
  return {
    id: faker.string.uuid(),
    browser,
    version: faker.helpers.arrayElement(versions[browser]),
    deviceType,
    location: {
      city: faker.location.city(),
      country: faker.location.country(),
      coordinates: [
        parseFloat(faker.location.latitude()),
        parseFloat(faker.location.longitude()),
      ],
    },
    ipAddress: faker.internet.ip(),
    status: faker.helpers.arrayElement(['Active', 'Idle', 'Disconnected']),
    lastActivity: faker.date.recent({ days: 1 }).toISOString(),
    userAgent: faker.internet.userAgent(),
    duration: faker.number.int({ min: 1, max: 120 }),
    pages: Array.from(
      { length: faker.number.int({ min: 1, max: 5 }) },
      () => faker.helpers.arrayElement([
        '/dashboard',
        '/settings',
        '/profile',
        '/companies',
        '/users',
      ])
    ),
  };
});

// Statistics functions
export const getSessionStats = (sessions: Session[]) => {
  return {
    totalSessions: sessions.length,
    byStatus: {
      Active: sessions.filter(s => s.status === 'Active').length,
      Idle: sessions.filter(s => s.status === 'Idle').length,
      Disconnected: sessions.filter(s => s.status === 'Disconnected').length,
    },
    byDevice: {
      desktop: sessions.filter(s => s.deviceType === 'desktop').length,
      mobile: sessions.filter(s => s.deviceType === 'mobile').length,
      tablet: sessions.filter(s => s.deviceType === 'tablet').length,
    },
    byBrowser: browsers.reduce((acc, browser) => ({
      ...acc,
      [browser]: sessions.filter(s => s.browser === browser).length,
    }), {}),
    averageDuration: Math.round(
      sessions.reduce((acc, session) => acc + session.duration, 0) / sessions.length
    ),
  };
}; 