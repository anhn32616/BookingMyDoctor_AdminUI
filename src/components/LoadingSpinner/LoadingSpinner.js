import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className="loading-overlay">
      <FontAwesomeIcon icon={faSpinner} className="loading-icon" />
    </div>
  );
}

export default LoadingSpinner;
