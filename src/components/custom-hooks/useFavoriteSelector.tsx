import { JSX, useEffect, useState } from "react"
import { toast } from "sonner"
import { combineElements } from "../element-merger"
import { setUpDeviceMapping } from "../devicemapping"
import { useDevices } from "@yudiel/react-qr-scanner"

export function useDeviceHandler(){
    const devices = setUpDeviceMapping(useDevices())
    
    const [deviceNum,setDeviceNum] = useState(Number)
    const[deviceId,setDeviceId] = useState("")
    const favoriteDevice = localStorage.getItem("favorite_device")? Number(localStorage.getItem("favorite_device")):1
    const [isFavorite,updateFavoriteStatus] = useState(false)

    function setFavoriteDevice(){
            localStorage.setItem("favorite_device",deviceNum.toString())
            toast.success("Favorite device has been set",{id:"favorite-device-id"})
    }

    function setDeviceInfo(id:string,index:number){
        setDeviceId(id)
        setDeviceNum(index+1)
    }

        let selectedDevice: JSX.Element[] = []
        let unselectedDevices: JSX.Element[] = []
        let deviceListing: JSX.Element[] = []

        useEffect(()=>{
            const condition = (deviceNum == favoriteDevice)
            updateFavoriteStatus(condition)
        },[deviceNum])
    
    if(devices!=undefined &&  devices!.length !=0 && deviceNum ==0)
        setDeviceInfo(devices[favoriteDevice-1].deviceId,favoriteDevice-1)
        
    if(devices?.length !=0 && devices != undefined){
        selectedDevice = devices.filter((device,index)=>{
        if(index == favoriteDevice-1){
            return device
            }
        }).
        map((device) => (
            <option key={device.deviceNumber} value={device.deviceId} selected >
                {device.label}
            </option>
        ))

        unselectedDevices = devices.filter((device,index)=>{
            if(index != favoriteDevice-1)
                return device
        }).
        map((device) => (
            <option key={device.deviceNumber} value={device.deviceId} >
                {device.label}
            </option>
        ))
    }

    deviceListing = combineElements(selectedDevice,unselectedDevices)


    return {deviceListing, setFavoriteDevice, setDeviceInfo, isFavorite, deviceId}
         
}