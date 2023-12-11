import PropTypes from "prop-types";
import WarningIcon from '@mui/icons-material/Warning';

export default function NetworkNotification(props) {
    const { networkError } = props

    if (!networkError) {
        return null
    }

    return (
        <div className="network-notification">
            <WarningIcon />You are currently offline!
        </div>
    )
}

NetworkNotification.propTypes = {
    networkError: PropTypes.bool.isRequired,
  };
  