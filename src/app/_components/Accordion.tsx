"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";

interface Item {
    title: string;
    content: string;
}


interface AccordionProps {
    items: Item[];
}

export function AccordionComponent({items}: AccordionProps) {
    return (
        <Accordion>
            {items.map((item, index) => (
                <AccordionItem key={index} title={item.title}>
                    {item.content}
                </AccordionItem>
            ))}
        </Accordion>
    );
}