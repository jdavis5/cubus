import React from 'react'
import { ClientOnly } from 'src/common/components/client-only'

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
    return (
        <ClientOnly>
            <LinkListItems items={items} renderItem={renderItem} />
        </ClientOnly>
    )
}

const LinkListItems = <T extends LinkItem>({
    items,
    renderItem
}: LinkListProps<T>) => {
    return (
        <>
            {items.map((item, index) => {
                const isActive = window.location.pathname === item.pathname
                return (
                    <React.Fragment key={index}>
                        {renderItem(item, isActive)}
                    </React.Fragment>
                )
            })}
        </>
    )
}
