import usePwa from "../hooks/usePwa"

export default function InstallButton() {
    const { isInstallable, installPwa } = usePwa();
    if (!isInstallable) {
        return  null;
    }

    return (
        <button className="install-button" onClick={installPwa}>Install application</button>
    )
}
