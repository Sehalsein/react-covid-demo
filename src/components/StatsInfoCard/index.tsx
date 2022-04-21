interface StatsInfoCard {
    className?: string
    title: string
    statValue: number
    description?: string
}
const StatsInfoCard: React.FC<StatsInfoCard> = ({
    className,
    statValue,
    title,
    description,
}) => {
    return (
        <div
            className={`flex flex-col rounded-md  py-4 px-4 text-left  ${className} `}
        >
            <span className="text-xs font-bold">{title}</span>
            <span className="text-xl font-bold">
                {statValue.toLocaleString()}
            </span>
            {description && <p className="text-sm">{description}</p>}
        </div>
    )
}

export default StatsInfoCard
