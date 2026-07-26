function ProgressBar({ value, label }) {
    const safeValue = Math.min(Math.max(value, 0), 100);
  
    return (
      <div className="progress">
        <div className="progress-header">
          {label && <span>{label}</span>}
          <span>{safeValue}%</span>
        </div>
  
        <div
          className="progress-track"
          role="progressbar"
          aria-label={label || "Förlopp"}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={safeValue}
        >
          <div
            className="progress-fill"
            style={{ width: `${safeValue}%` }}
          />
        </div>
      </div>
    );
  }
  
  export default ProgressBar;