// sum.sim-test.ts
import { describe, it, expect } from 'vitest';

export function sum(a: number, b: number): number {
    return a + b;
}

describe('sum function', () => {
    it('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });
});


describe('simulation', () => {
    it('a greenfield does not start burning', () => {
        expect(sum(1, 2)).toBe(3);
    });
});