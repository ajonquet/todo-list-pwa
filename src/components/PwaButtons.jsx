import usePwa from "../hooks/usePwa"

export default function PwaButtons() {
    const { isInstallable, hasUpdate, installPwa, updatePwa } = usePwa();

    return (
        <div className="pwa-buttons">
            {hasUpdate && <button className="pwa-button" onClick={updatePwa}>Update application</button>}
            {isInstallable && <button className="pwa-button" onClick={installPwa}>Install application</button>}
        </div>
    );
}
