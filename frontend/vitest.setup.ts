import '@testing-library/jest-dom/vitest';
import { server } from './tests/mocks';

// Mock Service Worker
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
