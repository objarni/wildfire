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

export function step(heat: number, neighbourHeats: number[]) {
    const isBurning = (heat: number) => heat > 5
    const burningNeighbours = neighbourHeats.filter(isBurning).length
    if (isBurning(heat))
        heat = heat + 1
    let newHeat = heat + burningNeighbours
    if (newHeat > 9)
        return 0
    return newHeat
}

export function pickNeighboursAround(x: number, y: number, field: number[][]) {
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