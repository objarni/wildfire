// sum.sim-test.ts
import {describe, expect, it} from 'vitest'
import {pickNeighboursAround, step} from "../src/simulation";
import {gridFromField} from "../src/App";


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

        it('outside field it is all ashes (north east)', () => {
            const neighbourHeats = pickNeighboursAround(1, 1,
                [
                    [8, 8],
                    [8, 8],
                ])
            expect(neighbourHeats.sort()).toStrictEqual([0, 0, 0, 0, 0, 8, 8, 8].sort())
        })

        it('outside field it is all ashes (south west)', () => {
            const neighbourHeats = pickNeighboursAround(1, 1,
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
            ].map(row => row.map(c => {
                return {color: c}
            })))
        })
    })

    describe('a width=3 height=4 field simulation', () => {

        function simulate(initialField: number[][]) {
            let newField: number[][] = [];
            for (let y = 0; y < initialField.length; y++) {
                let row: number[] = [];
                for (let x = 0; x < initialField[0].length; x++) {
                    row.push(step(initialField[y][x], pickNeighboursAround(x, y, initialField)))
                }
                newField.push(row)
            }
            return newField
        }

        const initialField = [
            [1, 1, 1],
            [1, 6, 1],
            [1, 5, 1],
            [1, 1, 1],
            [1, 1, 1],
        ]

        it('takes the expected first step', () => {
            const oneStep = simulate(initialField)
            expect(oneStep).toStrictEqual([
                [2, 2, 2],
                [2, 7, 2],
                [2, 6, 2],
                [1, 1, 1],
                [1, 1, 1],
            ])
        })

        it('takes the expected second step', () => {
            const afterTwoSteps = simulate(simulate(initialField))
            expect(afterTwoSteps).toStrictEqual([
                [3, 3, 3],
                [4, 9, 4],
                [4, 8, 4],
                [2, 2, 2],
                [1, 1, 1],
            ])
        })
    })
})
