import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react"

export default () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [installPromptEvent, setInstallPromptEvent] = useState(null);

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
  
  return {
    isInstallable,
    installPwa,
  }
}
