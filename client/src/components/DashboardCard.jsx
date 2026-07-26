function DashboardCard({ icon, title, heading, description, children}){
    return (
        <article className="card">
            <span className="card-icon">{icon}</span>
            <p>{title}</p>
            <h3>{heading}</h3>

        {description && <span>{description}</span>}

        {children}
        </article>
    );
}
export default DashboardCard;