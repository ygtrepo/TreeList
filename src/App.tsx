import React, { useRef } from "react";
import { TreeList, } from "./components/TreeList/index.tsx";
import { ITreeListHandes } from "./components/TreeList/externals";
import "./style.css"

const data = [
	{ key1: "-1", show1: "Türkiye", parent1: "-2" },
	{ key1: "6", show1: "Ankara", parent1: "-1", },
	{ key1: "34", show1: "İstanbul", parent1: "-1", },
	{ key1: "34-1", show1: "üsküdar", parent1: "34", },
	{ key1: "34-2", show1: "beşiktaş", parent1: "34", },
	{ key1: "34-3", show1: "kadıköy", parent1: "34", },
	{ key1: "34-4", show1: "ataşehir", parent1: "34", },
	{ key1: "34-5", show1: "şile", parent1: "34", },
	{ key1: "34-6", show1: "sarıyer", parent1: "34", },
	{ key1: "35", show1: "İzmir", parent1: "-1", },
	{ key1: "35-1", show1: "çeşme", parent1: "35", },
	{ key1: "35-2", show1: "urla", parent1: "35", },
	{ key1: "35-3", show1: "karşıyaka", parent1: "35", },
];



function App() {

	const treeList = useRef<ITreeListHandes>(null);

	return (
		<div>
			<div className='demo-buttom'>
				<input type="button" value="set datasource" onClick={() => {
					treeList.current!.keyField = "key1";
					treeList.current!.parentField = "parent1";
					treeList.current!.showField = "show1";
					treeList.current!.dataSource = data;
				}} />

				<input type="button" value="disabled" onClick={() => { treeList.current!.enabled = false; }} />
				<input type="button" value="enabled" onClick={() => { treeList.current!.enabled = true; }} />
				<input type="button" value="selectAll" onClick={() => { treeList.current!.selectAll(true) }} />
				<input type="button" value="deSelectAll" onClick={() => { treeList.current!.selectAll(false) }} />
				<input type="button" value="select-Ankara" onClick={() => treeList.current!.selectRow("6", true)} />
				<input type="button" value="deSelect-Ankara" onClick={() => treeList.current!.selectRow("6", false)} />
				<input type="button" value="select-İstanbul" onClick={() => treeList.current!.selectRow("34", true)} />
				<input type="button" value="deSelect-İstanbul" onClick={() => treeList.current!.selectRow("34", false)} />
				<input type="button" value="select-İzmir" onClick={() => treeList.current!.selectRow("35", true)} />
				<input type="button" value="deSelect-İzmir" onClick={() => treeList.current!.selectRow("35", false)} />
				<input type="button" value="select-Beşiktaş" onClick={() => treeList.current!.selectRow("34-2", true)} />
				<input type="button" value="deSelect-Beşiktaş" onClick={() => treeList.current!.selectRow("34-2", false)} />
			</div>


			<TreeList ref={treeList} />
		</div>
	);
}

export default App;
