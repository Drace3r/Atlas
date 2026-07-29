function Card ({
children,
className="",
as: Component = "div",
}) {
    return (
        <Component className={`card ${className}`.trim()}>
            {children}
        </Component>
    );
}

export default Card;