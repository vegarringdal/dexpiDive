import React, { useEffect } from "react";
import "./App.css";
import { ActivateGridDarkTheme } from "./components/ActivateGridDarkTheme";
import { ListView } from "./components/ListView";
import { Selected } from "./components/Selected";
import { parser } from "./parser/Parser";
import { dataController } from "./state/dataController";
import { guiState } from "./state/guiState";

declare const APP_VERSION: string;

// keep react happy for now...
export function App() {
    const gui = guiState();

    useEffect(() => {}, []);

    return (
        <div className="p-2 flex flex-col h-full bg-slate-800 text-gray-200">
            <ActivateGridDarkTheme />
            <div>
                <input
                    className=""
                    type="file"
                    onChange={(e) => {
                        const reader = new FileReader();
                        reader.onload = () => {
                            parser.parseFile(reader.result as string);
                            const data = parser.generateListMainElements();
                            dataController.dataSource.setData(data);
                            dataController.gridInterFace.autoResizeColumns();
                        };

                        reader.onloadend = () => {
                            gui.setLoading(true);
                        };

                        reader.onerror = () => {
                            // todo
                        };

                        if (e?.target.files) {
                            gui.setLoading(true);
                            reader.readAsText(e.target.files[0]);
                        }
                    }}
                />
                <div className="">Version: {APP_VERSION}</div>
            </div>
            <div className="flex h-full" style={{ minHeight: "0px" }}>
              
                    <div className="flex flex-1">
                        <ListView />
                    </div>

                    <div className="flex flex-1 ">
                        <Selected />
                    </div>
             
            </div>
        </div>
    );
}
export default App;
