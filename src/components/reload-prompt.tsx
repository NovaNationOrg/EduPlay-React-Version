import { toast } from 'sonner'

import { useRegisterSW } from 'virtual:pwa-register/react'

function ReloadPrompt() {
    const reloadSW = '__RELOAD_SW__'
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegisteredSW(swUrl, r) {
        console.log(`Service Worker at: ${swUrl}`)
        // @ts-expect-error just ignore
        if (reloadSW === 'true') {
            r && setInterval(() => {
            console.log('Checking for sw update')
            r.update()
            }, 1800000 /* 20s for testing purposes */)
        } 
        else {
            // eslint-disable-next-line prefer-template
            console.log('SW Registered: ' + r)
        }
        },
        onRegisterError(error) {
        console.log('SW registration error', error)
        },
    })
    const close = () => {
        setOfflineReady(false)
        setNeedRefresh(false)
        }
    
    if(offlineReady)
        toast.info("App ready to work offline",{id:"offline-ready-toast"})
    if(needRefresh)
        toast.info("New content available, click on reload button to update", {
            id:"reload-prompt-toast", duration:Infinity, dismissible:false,
            action : {label:"Reload",key:"no-button",onClick: () =>{updateServiceWorker(true)}},
            cancel : {label:"Close",key:"yes-button",onClick: () =>{close()}}
        }) 

    return(<></>)
}



export default ReloadPrompt