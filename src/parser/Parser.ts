class Parser {
    xml!: Document;

    parseFile(xmlString: string) {
        this.xml = new window.DOMParser().parseFromString(xmlString, "text/xml");
    }

    queryXPaths(xpaths: string[], fromNode?: Document) {
        if (!this.xml) {
            console.error("can not use function without parsing first");
            return [];
        }

        const nodes: { xpath: string; node: Node }[] = [];
        xpaths.forEach((xpath) => {
            const result = this.xml.evaluate(
                xpath,
                fromNode || this.xml,
                null,
                XPathResult.ANY_TYPE,
                null
            );
            let node = result.iterateNext();

            while (node) {
                nodes.push({ xpath, node });
                node = result.iterateNext();
            }
        });
        return nodes;
    }

    generateListMainElements() {
        if (!this.xml) {
            console.error("can not use function without parsing first");
            return [];
        }

        const actuatingSystems = "//PlantModel/ActuatingSystem";
        const instrumentationLoopFunction = "//PlantModel/InstrumentationLoopFunction";
        const metaData = "//PlantModel/MetaData";
        const pipingNetworkSystems = "//PlantModel/PipingNetworkSystem";
        const plantStructureItems = "//PlantModel/PlantStructureItem";
        const processInstrumentationFunctions = "//PlantModel/ProcessInstrumentationFunction";
        const processSignalGeneratingSystems = "//PlantModel/ProcessSignalGeneratingSystem";
        const taggedPlantItems = "//PlantModel/TaggedPlantItem";

        const result = this.queryXPaths([
            actuatingSystems,
            instrumentationLoopFunction,
            metaData,
            pipingNetworkSystems,
            plantStructureItems,
            processInstrumentationFunctions,
            processSignalGeneratingSystems,
            taggedPlantItems
        ]);

        const list: {
            id: string | null;
            elementName: string;
            tagName: string | null;
            xpath: string | null;
            node: Node;
        }[] = [];

        result.forEach((item) => {
            list.push({
                id: (item.node as Element)?.getAttribute("ID"),
                elementName: item.node?.nodeName,
                tagName: (item.node as Element)?.getAttribute("TagName"),
                xpath: item.xpath,
                node: item.node
            });
        });

        return list;
    }
}

export const parser = new Parser();
