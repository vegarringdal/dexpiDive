import { Datasource, GridInterface } from "@simple-html/grid";
import { defaultGridConfig } from "../parser/defaultGridConfig";
import { parser } from "../parser/Parser";
import { guiState } from "./guiState";

const dataSource = new Datasource();
const gridInterFace = new GridInterface(defaultGridConfig, dataSource);

dataSource.addEventListener({
    handleEvent: (e) => {
        console.log(e.type);
        if (e.type === "currentEntity") {
            const node = dataSource.currentEntity?.node as Element;

            if (!node) {
                guiState.getState().setSelected(null);
            } else {
                const data: any = {
                    elementTagName: node.tagName,
                    attributes: {},
                    genericAttributes: {}
                };

                const attributes = node.getAttributeNames();
                if (attributes) {
                    // do I need to use xpath ?
                    attributes.forEach((attributeName) => {
                        data.attributes[attributeName] = node.getAttribute(attributeName) || "";
                    });
                }
                console.log(node);

                const genericAttributes = parser.queryXPaths(["./GenericAttributes"], node as any);
                genericAttributes.forEach((e, i) => {
                    const setName = `${i + 1}: ${(e.node as Element).getAttribute("Set") || ""}`;

                    data.genericAttributes[setName] = {};
                    const genericAttributeList = parser.queryXPaths(
                        ["./GenericAttribute"],
                        e.node as any
                    );
                    genericAttributeList.forEach((e2) => {
                        const name = (e2.node as Element).getAttribute("Name") || "missing";
                        const value = (e2.node as Element).getAttribute("Value");
                        data.genericAttributes[setName][name] = value;
                    });
                });

                console.log(data);
                guiState.getState().setSelected(data);
            }
        }
        return true; // stay connected, grid always want to disconnect
    }
});

export const dataController = {
    gridInterFace,
    dataSource
};
