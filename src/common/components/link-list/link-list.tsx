import React from 'react'
import { usePageUrl } from 'src/common/hooks/page-url'

type LinkItem = {
    pathname: string
    value: string
}

type LinkListProps<T extends LinkItem> = {
    items: Array<T>
    renderItem: (item: T, isActive: boolean) => JSX.Element
}

export const LinkList = <T extends LinkItem>({
    items,
    renderItem
}: LinkListProps<T>) => {
    return <LinkListItems items={items} renderItem={renderItem} />
}

const LinkListItems = <T extends LinkItem>({
    items,
    renderItem
}: LinkListProps<T>) => {
    const { pathname } = usePageUrl()

    return (
        <>
            {items.map((item, index) => {
                const isActive = pathname === item.pathname
                return (
                    <React.Fragment key={index}>
                        {renderItem(item, isActive)}
                    </React.Fragment>
                )
            })}
        </>
    )
}
