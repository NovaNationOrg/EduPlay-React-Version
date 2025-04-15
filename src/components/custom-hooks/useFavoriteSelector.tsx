import { JSX, useState } from "react"
import { toast } from "sonner"
import { combineElements } from "../element-merger"
import { setUpDeviceMapping } from "../devicemapping"
import { useDevices } from "@yudiel/react-qr-scanner"

export function useDeviceHandler(){
    const devices = setUpDeviceMapping(useDevices())
    
    const [deviceNum,setDeviceNum] = useState(Number)
    const[deviceId,setDeviceId] = useState(localStorage.getItem("favorite_device_id")? localStorage.getItem("favorite_device_id"): "" )
    let favoriteDevice = localStorage.getItem("favorite_device")? Number(localStorage.getItem("favorite_device")):1

    function setFavoriteDevice(){
            localStorage.setItem("favorite_device",deviceNum.toString());
            localStorage.setItem("favorite_device_id",deviceId!);

            toast.success("Favorite device has been set",{id:"favorite-device-id"})
    }

    function setDeviceInfo(id:string,index:number){
        setDeviceId(id)
        setDeviceNum(index+1)
    }

    let selectedDevice: JSX.Element[] = []
    let unselectedDevices: JSX.Element[] = []
    let deviceListing: JSX.Element[] = []

    
    if(devices!=undefined &&  devices!.length !=0 && deviceNum ==0 && devices[0].deviceId!=""){
        const validID = devices[favoriteDevice] ? true : false
        if(!validID){
            localStorage.setItem("favorite_device","1")
            favoriteDevice = 1
        }
        setDeviceInfo(devices[favoriteDevice-1].deviceId,favoriteDevice-1)
    }
        
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

    return {deviceListing, setFavoriteDevice, setDeviceInfo, deviceId, deviceNum}
         
}