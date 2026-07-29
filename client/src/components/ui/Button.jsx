function Button({
    children,
    variant = "primary",
    type = "button",
    className = "",
    ...props 
}) {
    const buttonClassName = `button button--${variant} ${className}`.trim();

    return (
        <button
        type={type}
        className={buttonClassName}
        {...props}
        >
        {children}    
        </button>
    );
}