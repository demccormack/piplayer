import { expect } from 'vitest';
import '@testing-library/jest-dom';
import matchers from '@testing-library/jest-dom/matchers';
import { server } from './tests/mocks';

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// Mock Service Worker
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
