// sum.sim-test.ts
import {describe, it, expect} from 'vitest';

export function sum(a: number, b: number): number {
    return a + b;
}

describe('sum function', () => {
    it('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });
});

/**
 * Modell för gräsbrand
 * Ett rutnät av heltal som representerar:
 * 0 = aska
 * 1-5 = gräs
 * 6-9 = eld (jämn röd, udda gul)
 *
 * Ett gräs ökar med 1 i värme om en granne brinner        #####
 * Grannar: 1,1,1,1, 1,1,1,9
 * Gräset: 1
 * Resultat: 2
 *
 * Ett gräs ökar med 2 i värme om två grannar brinner      #####
 * Grannar: 1,1,1,1, 1,6,1,9
 * Gräset: 1
 * Resultat: 3
 *
 * Ett gräs ökar inte i värme om ingen granne brinner      #####
 * Grannar: 1,1,1,1, 1,1,1,1
 * Gräset: 1
 * Resultat: 1
 *
 * En brand utan brinnande grannar ökar med ett i värme    #####
 * Grannar: 1,1,1,1, 1,1,1,1
 * Värme: 6
 * Resultat: 7
 *
 * En brand som når över 9 blir till aska
 * Grannar: 1,1,1,1, 1,1,1,1
 * Värme: 9
 * Resultat: 0
 */

function step(heat: number, neighbourHeats: number[]) {
    const isBurning = heat => heat > 5
    const burningNeighbours = neighbourHeats.filter(isBurning).length
    if (isBurning(heat))
        heat = heat + 1
    let newHeat = heat + burningNeighbours
    if (newHeat > 9)
        return 0
    return newHeat
}

describe('simulation', () => {
    it('a grass heats up if a neighbour burns', () => {
        const newHeat = step(1, [1, 1, 1, 1, 1, 1, 1, 9])
        expect(newHeat).toBe(2)
    });

    it('a grass that has 2 burning neighbours heats quicker', () => {
        const newHeat = step(3, [1, 1, 1, 1, 1, 6, 1, 9])
        expect(newHeat).toBe(5)
    })

    it('a grass stays the same heat if no neighbour burns', () => {
        const newHeat = step(2, [1, 1, 1, 1, 1, 1, 1, 1])
        expect(newHeat).toBe(2)
    })

    it('a fire increases by 1 even if no neighbour burns', () => {
        const newHeat = step(7, [1, 1, 1, 1, 1, 1, 1, 1])
        expect(newHeat).toBe(8)
    })

    it('a fire reaching heat 10 becomes ashes', () => {
        const newHeat = step(9, [1, 1, 1, 1, 1, 1, 1, 1])
        expect(newHeat).toBe(0)
    })
});
