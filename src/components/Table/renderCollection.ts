export const renderCollection = <T>(
    collection: T[] | undefined,
    loading: boolean,
    renderItem: (item: T, index: number, collection: T[] | undefined) => any,
    renderEmpty?: () => any,
    renderLoading?: () => any
) => {
    if (loading) {
        return renderLoading ? renderLoading() : null
    }

    if (collection === undefined || collection.length === 0) {
        return !!renderEmpty ? renderEmpty() : null
    }

    return collection.map(renderItem)
}
