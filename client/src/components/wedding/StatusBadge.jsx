function StatusBadge({ status }) {
    const statusConfig = {
      attending: {
        label: "Kommer",
        variant: "success",
      },
      declined: {
        label: "Kommer inte",
        variant: "danger",
      },
      waiting: {
        label: "Väntar",
        variant: "warning",
      },
    };
  
    const currentStatus = statusConfig[status] ?? {
      label: "Okänd",
      variant: "neutral",
    };
  
    return (
      <span className={`status-badge status-badge--${currentStatus.variant}`}>
        {currentStatus.label}
      </span>
    );
  }
  
  export default StatusBadge;