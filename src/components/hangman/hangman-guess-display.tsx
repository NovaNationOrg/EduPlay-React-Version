import { cloneElement, JSX } from "react"

interface HMGuessDisplayProps{
    category:string
    guesses:string[]
    currentWord:string
    incorrect:number
    parentTrigger:React.Dispatch<React.SetStateAction<boolean>>
    completed:boolean
}

function generateHiddenWord(word:string,guesses:string[],completed:boolean){
    let hiddenWord:string[] = []


    for(let i=0;i < word.length;i++){
        const w= word[i] == " "? " ":"_"
        hiddenWord.push(w)
    }

    if(completed){
        for(let i=0;i < word.length;i++)
            hiddenWord[i] = word[i].toUpperCase()     
    }
   
    const upperWord = word.toUpperCase()
    for(const g of guesses){
        for(let i=0;i < upperWord.length;i++){
            if(g==upperWord[i]){
                hiddenWord[i] = g
            }
        }
    }
    let formattedWord:string = ""
    hiddenWord.forEach((word) => formattedWord+=word + " ")

    if(!hiddenWord.includes("_") && localStorage.getItem("_hm_result_decided") == "pending"){
        sessionStorage.setItem("answer-found","true")
        formattedWord+="*"
    }

    return formattedWord
    
}

function getBodyLine(x1:string,y1:string,x2:string,y2:string,transform:string){
    return <line key={"body-line" + transform} x1={x1} y1={y1} x2={x2} y2={y2} transform= {transform}  fill="none" stroke="#dbd6d6" strokeWidth="3" visibility={"hidden"}/>
}
function prepareBodyGroup(incorrect:number){
    let bodyGroupList:JSX.Element[] = []
    bodyGroupList.push(<ellipse visibility = "hidden" id="head" rx="21.867612" ry="22.458629" transform="translate(141.43026 59.692672)" fill="none" stroke="#dbd6d6" strokeWidth="3"/>)
    bodyGroupList.push(getBodyLine("0","-28.81235","0","28.812356","translate(141.43026 110.963657)"))
    bodyGroupList.push(getBodyLine("17.367792" ,"-9.519493" ,"-17.367792" ,"9.519494" ,"translate(124.062468 108.146729)"))
    bodyGroupList.push(getBodyLine("-17.768893","-9.519493","17.768893","9.519494","translate(159.199154 108.146729)"))
    bodyGroupList.push(getBodyLine("10.933806" ,"-17.503585" ,"-10.933806" ,"17.503584" ,"translate(130.496454 157.279599)" ))
    bodyGroupList.push(getBodyLine("-10.933806","-17.503585" ,"10.933806" ,"17.503584","translate(152.364067 157.279599)"))

    let finalList:JSX.Element[] = []
    let i=0

    while(i < incorrect){
        finalList.push(cloneElement(bodyGroupList[i],{visibility : "visible",key:("incorrect-" + i)}))
        i++
    }
    while(i < bodyGroupList.length){
        finalList.push(bodyGroupList[i])
        i++
    }
        
    return(<>
            {finalList}
    </>)
}

function prepareHangmanSVG(incorrect:number){
    let bodyGroup:JSX.Element = prepareBodyGroup(incorrect)
    return(<>
    <svg  xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 280" shapeRendering="geometricPrecision" textRendering="geometricPrecision">
        <g id = "hanging-post">
            <line x1="0" y1="23.62345" x2="0" y2="-23.623449" transform="translate(150 56.766485)" fill="none" stroke="#3f5787" strokeWidth="3"/>
            <line x1="52.890993" y1="0" x2="-52.890993" y2="0" transform="translate(96.707904 33.143036)" fill="none" stroke="#3f5787" strokeWidth="3"/>
            <line x1="0" y1="-97.082669" x2="0" y2="97.082669" transform="translate(43.816911 130.225705)" fill="none" stroke="#3f5787" strokeWidth="3"/>
            <line x1="9.708267" y1="-9.061048" x2="-9.708266" y2="9.061048" transform="translate(53.525178 42.204085)" fill="none" stroke="#3f5787" strokeWidth="3"/>
        </g>
        <g id = "body" transform="translate(8.168637 43.991383)">
        {bodyGroup}
        </g>
    </svg>
    </>)
}

export default function HMGuessDisplay({guesses,currentWord,category,incorrect,parentTrigger,completed}:HMGuessDisplayProps){
    
    if(currentWord=="" || category == "")
        return
    let hiddenWord:string = generateHiddenWord(currentWord,guesses,completed)
    
    if(currentWord == "" || category == "")
        return
    if(hiddenWord.indexOf("*")>0){
        hiddenWord = hiddenWord.substring(0,hiddenWord.indexOf("*"))
        parentTrigger(true)
    }

    console.log(hiddenWord)
    return(<>
        <div className="hangman-category-title">{category}</div>
        {prepareHangmanSVG(incorrect)}
        <div className="hangman-guessed-area">
           <div className = "hangman-guess-word-area" > {hiddenWord}</div>
        </div>
    </>)
}