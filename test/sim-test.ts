// sum.sim-test.ts
import {describe, expect, it} from 'vitest'


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
    const isBurning = (heat: number) => heat > 5
    const burningNeighbours = neighbourHeats.filter(isBurning).length
    if (isBurning(heat))
        heat = heat + 1
    let newHeat = heat + burningNeighbours
    if (newHeat > 9)
        return 0
    return newHeat
}

function pickNeighboursAround(x: number, y: number, field: number[][]) {
    const safePick = (x: number, y: number): number => {
        if (y < 0 || y > field.length)
            return 0
        if (x < 0 || x > field[0].length)
            return 0
        return field[y][x]
    }
    return [safePick(x - 1, y - 1), safePick(x, y - 1), safePick(x + 1, y - 1),
        safePick(x - 1, y), safePick(x + 1, y),
        safePick(x - 1, y + 1), safePick(x, y + 1), safePick(x + 1, y + 1)]
}

function gridFromField(field: number[][]) {
    const heatMap = {
        0: 'black',
        1: 'green',
        2: 'green',
        3: 'green',
        4: 'green',
        5: 'green',
        6: 'yellow',
        7: 'red',
        8: 'yellow',
        9: 'red',
    }
    return field.map(row => row.map(heat => heatMap[heat]))
}

describe('simulation', () => {
    describe('cell behaviour', () => {

        it('a grass heats up if a neighbour burns', () => {
            const newHeat = step(1, [1, 1, 1, 1, 1, 1, 1, 9])
            expect(newHeat).toStrictEqual(2)
        })

        it('a grass that has 2 burning neighbours heats quicker', () => {
            const newHeat = step(3, [1, 1, 1, 1, 1, 6, 1, 9])
            expect(newHeat).toStrictEqual(5)
        })

        it('a grass stays the same heat if no neighbour burns', () => {
            const newHeat = step(2, [1, 1, 1, 1, 1, 1, 1, 1])
            expect(newHeat).toStrictEqual(2)
        })

        it('a fire increases by 1 even if no neighbour burns', () => {
            const newHeat = step(7, [1, 1, 1, 1, 1, 1, 1, 1])
            expect(newHeat).toStrictEqual(8)
        })

        it('a fire reaching heat 10 becomes ashes', () => {
            const newHeat = step(9, [1, 1, 1, 1, 1, 1, 1, 1])
            expect(newHeat).toStrictEqual(0)
        })
    })

    describe('neighourhood picker', () => {
        it('picks the right neighbours in a simple case', () => {
            const neighbourHeats = pickNeighboursAround(1, 1,
                [
                    [8, 8, 8, 1],
                    [8, 0, 8, 1],
                    [8, 8, 8, 1],
                    [1, 1, 1, 1],
                ])
            expect(neighbourHeats).toStrictEqual([8, 8, 8, 8, 8, 8, 8, 8])
        })

        it('picks the right neighbours in a little trickier case', () => {
            const neighbourHeats = pickNeighboursAround(2, 1,
                [
                    [8, 8, 8, 1],
                    [8, 0, 8, 1],
                    [8, 8, 8, 1],
                    [1, 1, 1, 1],
                ])
            expect(neighbourHeats.sort()).toStrictEqual([8, 8, 1, 0, 1, 8, 8, 1].sort())
        })

        it('outside field it is all ashes', () => {
            const neighbourHeats = pickNeighboursAround(0, 0,
                [
                    [8, 8],
                    [8, 8],
                ])
            expect(neighbourHeats.sort()).toStrictEqual([0, 0, 0, 0, 0, 8, 8, 8].sort())
        })
    })

    describe('field to grid conversion', () => {

        it('converts a simple 2x2 field to same dimension grid', () => {
            const grid = gridFromField([[1, 6], [7, 1]])
            expect(grid).toStrictEqual([
                ['green', 'yellow'],
                ['red', 'green']
            ])
        })
    })
})
