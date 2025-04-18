import { IScannerComponents,outline } from '@yudiel/react-qr-scanner';;

export const qrComponents: IScannerComponents = {
    audio: false,
    finder: true,
    zoom:true,
    torch:false,
    tracker:outline
}