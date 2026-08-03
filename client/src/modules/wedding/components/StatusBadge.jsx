const badges = {
  attending: {
    label: "Kommer",
    className: "success",
  },

  declined: {
    label: "Kommer inte",
    className: "danger",
  },

  pending: {
    label: "Inväntar svar",
    className: "warning",
  },
};

function StatusBadge({ status }) {
  const badge = badges[status] ?? {
    label: "Okänd",
    className: "neutral",
  };

  return (
    <span className={`status-badge status-badge--${badge.className}`}>
      {badge.label}
    </span>
  );
}

export default StatusBadge;