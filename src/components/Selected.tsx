import React from "react";
import { guiState } from "../state/guiState";

export function Selected() {
    const gui = guiState();

    const viewTree: {
        type:
            | "element"
            | "attribute-header"
            | "attribute"
            | "genericAttribute"
            | "genericAttributes";
        name: string;
        value: string;
    }[] = [];

    function parse(component: any) {
        let currentComp = component;
        let haveParent = true;
        while (haveParent) {
            if (currentComp.elementTagName) {
                viewTree.push({
                    type: "element",
                    name: "element",
                    value: currentComp.elementTagName
                });
            }

            if (currentComp.attributes) {
                viewTree.push({
                    type: "attribute-header",
                    name: "Attributes",
                    value: ""
                });
                const setkeys = Object.keys(currentComp.attributes);
                setkeys.forEach((setkey) => {
                    viewTree.push({
                        type: "attribute",
                        name: setkey,
                        value: currentComp.attributes[setkey]
                    });
                });
            }

            if (currentComp.genericAttributes) {
                const setkeys = Object.keys(currentComp.genericAttributes);
                setkeys.forEach((setkey) => {
                    viewTree.push({
                        type: "genericAttributes",
                        name: "GenericAttribute Set",
                        value: setkey
                    });
                    const propKeys = Object.keys(currentComp.genericAttributes[setkey]);
                    propKeys.forEach((propKey) => {
                        viewTree.push({
                            type: "genericAttribute",
                            name: propKey,
                            value: currentComp.genericAttributes[setkey][propKey]
                        });
                    });
                });
            }

            if (currentComp.parent) {
                currentComp = currentComp.parent;
            } else {
                haveParent = false;
            }
        }
    }

    if (!gui.selected) {
        return (
            <div className="border-gray-600 detailView flex flex-col text-xs w-full m-2">
                <span className="pl-1 border-b bg-gray-700 border-b-gray-600 text-lg font-bold">
                    Selected Element
                </span>
                nothing selected
            </div>
        );
    }

    console.log(gui.selected);

    parse(gui.selected);

    return (
        <div className="border-gray-600 detailView flex flex-col text-xs m-2 flex-1 ">
            <span className="pl-1 border-b  border-b-gray-600 text-lg font-bold ">
                Selected Element :
            </span>
            <div className="flex flex-col overflow-auto scrollbar">
                {viewTree.map((item, i) => {
                    const key = i + ":" + item.type + "-" + item.name + "-" + item.value;

                    if (item.type === "element") {
                        return (
                            <span
                                key={key}
                                className=" border-b bg-gray-800 border-b-gray-700 flex pt-2 pb-1 sticky top-0"
                            >
                                <span className="pl-1 font-semibold flex-1">{item.value}</span>
                            </span>
                        );
                    }

                    if (item.type === "attribute-header") {
                        return (
                            <span
                                key={key}
                                className=" border-b bg-gray-700 border-b-gray-400 flex pt-2 pb-1 sticky top-6"
                            >
                                <span className="pl-3 font-semibold flex-1flex-1">{item.name}</span>
                                <span className="ml-2 flex-1 ">{item.value}</span>
                            </span>
                        );
                    }

                    if (item.type === "genericAttributes") {
                        return (
                            <span
                                key={key}
                                className=" border-b bg-gray-700 border-b-gray-400 flex pt-2 pb-1 sticky top-6"
                            >
                                <span className="pl-3 font-semibold flex-1">
                                    {item.name} - {item.value}
                                </span>
                            </span>
                        );
                    }
                    return (
                        <span className="pl-2 border-b border-b-gray-600 flex pr-2" key={key}>
                            <span className="pl-4 font-semibold flex-1">{item.name}:</span>
                            <span className="ml-2 flex-1">{item.value}</span>
                        </span>
                    );
                })}
            </div>
        </div>
    );
}
