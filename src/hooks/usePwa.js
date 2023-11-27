import { useCallback, useState, useEffect } from "react"
import { useRegisterSW } from 'virtual:pwa-register/react'
import {Workbox} from 'workbox-window'

export default () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [installPromptEvent, setInstallPromptEvent] = useState(null);
  const {needRefresh, updateServiceWorker} = useRegisterSW();

  useEffect(() => {
    const beforeinstallpromptHandler = (e) => {
      e.preventDefault();
      setInstallPromptEvent(e);
      setIsInstallable(true);
      //showInstallPromotion();
    };
    const appinstalledHandler = () => {
      setInstallPromptEvent(null);
      setIsInstallable(false);
    };
    
    window.addEventListener('beforeinstallprompt', beforeinstallpromptHandler);
    window.addEventListener('appinstalled', appinstalledHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeinstallpromptHandler);
      window.removeEventListener('appinstalled', appinstalledHandler);
    }
  }, []);

  const installPwa = useCallback(async () => {
    if (!isInstallable) {
      return false
    }
    setIsInstallable(false);
    installPromptEvent.prompt();
    const { outcome } = await installPromptEvent.userChoice;
    setInstallPromptEvent(null);
    return outcome;
  }, [isInstallable, installPromptEvent])
  
  const updatePwa = () => {
    updateServiceWorker();
    const wb = new Workbox('/sw.js');
    wb.addEventListener('waiting', () => {
      wb.addEventListener('controlling', () => {
        window.location.reload();
      });
      wb.messageSkipWaiting();
    });
    wb.register();
  }

  return {
    isInstallable,
    installPwa,
    hasUpdate: needRefresh[0],
    updatePwa,
  }
}