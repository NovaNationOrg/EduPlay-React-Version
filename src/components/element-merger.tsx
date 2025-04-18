import { JSX } from "react"

export function combineElements(elementA:JSX.Element[],elementB:JSX.Element[]):JSX.Element[] {
    let x =0,y = 0
    let finalElement: JSX.Element[] = []
    let inRange = x <= elementA.length && y <= elementB.length
    while(inRange){

        if(x==elementA.length && y == elementB.length)
            break
        let keya,keyb
        if(x < elementA.length)
            keya = Number(elementA[x].key!)

        if(y < elementB.length)
            keyb = Number(elementB[y].key!)
        if(( x < elementA.length && y < elementB.length) && keya! < keyb!){
            finalElement.push(elementA[x])
            x++
        }
        else if(( x < elementA.length && y < elementB.length) && keya! > keyb!){
            finalElement.push(elementB[y])
            y++
        }
        else if(x >= elementA.length && y < elementB.length){
            finalElement.push(elementB[y])
            y++
        }
        else if(y >= elementB.length && x < elementA.length){
            finalElement.push(elementA[x])
            x++
        }
        inRange = x <= elementA.length && y <= elementB.length
    }

    return finalElement
}