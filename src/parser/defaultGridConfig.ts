import { GridConfig } from "@simple-html/grid";

export const defaultGridConfig: GridConfig = {
    cellHeight: 20,
    panelHeight: 25,
    footerHeight: 40,
    readonly: true,
    selectionMode: "single",
    groupingSet: [
        {
            title: "Element",
            attribute: "elementName"
        }
    ],
    groups: [
        {
            width: 200,
            rows: [
                {
                    header: "Element",
                    attribute: "elementName",
                    filterable: {},
                    allowGrouping: true,
                    sortable: {}
                }
            ]
        },
        {
            width: 200,
            rows: [
                {
                    header: "ID",
                    attribute: "id",
                    filterable: {},
                    allowGrouping: true,
                    sortable: {}
                }
            ]
        },
        {
            width: 200,
            rows: [
                {
                    header: "TagName",
                    attribute: "tagName",
                    filterable: {},
                    allowGrouping: true,
                    sortable: {}
                }
            ]
        }
    ]
};
