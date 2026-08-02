import Card from "../../shared/components/Card/Card";

function DashboardCard({ icon, title, heading, description, children}){
    return (
        <Card as="article">
            <span className="card-icon">{icon}</span>
            
            <p>{title}</p>
            
            <h3>{heading}</h3>

        {description && <span>{description}</span>}

        {children}
        </Card>
    );
}
export default DashboardCard;