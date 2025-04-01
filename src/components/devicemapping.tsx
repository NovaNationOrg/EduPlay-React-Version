export interface deviceMapping{
    deviceId:string,
    label:string,
    deviceNumber:number
}

export function setUpDeviceMapping(devices:MediaDeviceInfo[]):deviceMapping[] | undefined {

    if(devices == undefined)
        return undefined
    let deviceListing:deviceMapping[] = []
    
    devices.forEach((device,index) =>{
        deviceListing.push({deviceId:"",label:'',deviceNumber:-1})
        deviceListing[index].deviceId = device.deviceId
        deviceListing[index].label = "Camera " + (index + 1)
        deviceListing[index].deviceNumber = index + 1
    })

    return deviceListing
}