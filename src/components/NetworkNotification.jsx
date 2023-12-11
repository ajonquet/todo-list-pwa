import PropTypes from "prop-types";
import WarningIcon from '@mui/icons-material/Warning';

export default function NetworkNotification(props) {
    const { networkError, checkNetwork } = props

    if (!networkError) {
        return null
    }

    return (
        <div className="network-notification">
            <WarningIcon />You are currently offline!
            <button onClick={checkNetwork}>Try to pass online...</button>
        </div>
    )
}

NetworkNotification.propTypes = {
    networkError: PropTypes.bool.isRequired,
    checkNetwork: PropTypes.func.isRequired,
  };
  