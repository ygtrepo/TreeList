import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { ITreeListHandes, ITreeListProps, ITreeListState } from "./externals";
import "./style.css";

const TreeListComponent: React.RefForwardingComponent<ITreeListHandes, ITreeListProps> = (props, ref) => {

  const bodyDiv = useRef<HTMLDivElement>(null);

  const [state] = useState<ITreeListState>({
    keyField: "",
    parentField: "",
    showField: "",
    dataSource: [],
    enabled: true,
    path: {},
    allParent: {},
    checkBoxArr: [],
  });

  useImperativeHandle(ref, () => {
    return {
      set keyField(key: string) {
        state.keyField = key;
      },
      get keyField() {
        return state.keyField
      },
      set parentField(parent: string) {
        state.parentField = parent;
      },
      get parentField() {
        return state.parentField
      },
      set showField(show: string) {
        state.showField = show;
      },
      get showField() {
        return state.showField
      },
      set dataSource(arr: any[]) {
        state.dataSource = arr;
        generateRows();
      },
      get dataSource() {
        return state.dataSource;
      },
      selectRow: selectRow,
      selectAll: selectAll,
      getSelectedRows: getSelectedRows,
      set enabled(value: boolean) {
        state.enabled = value;
        for (let i = 0; i < state.checkBoxArr.length; i++) {
          state.checkBoxArr[i].disabled = !state.enabled;
        }
      },
      get enabled() {
        return state.enabled;
      },
    }
  });

  function selectRow(key: string, select: boolean) {
    let index = -1;
    for (let i = 0; i < state.dataSource.length; i++) {
      if (state.dataSource[i][state.keyField] === key) {
        index = i;
        break;
      }
    }
    if (index === -1) return;
    state.checkBoxArr[index].indeterminate = false;
    state.checkBoxArr[index].checked = select;
    checkBoxChanged(select, key);
  }

  function selectAll(select: boolean) {
    for (let i = 0; i < state.dataSource.length; i++) {
      state.checkBoxArr[i].indeterminate = false;
      state.checkBoxArr[i].checked = select;
    }
    return;
  }

  function getSelectedRows() {
    const rows: any[] = [];
    for (let i = 0; i < state.dataSource.length; i++) {
      if (state.checkBoxArr[i].checked) rows.push({ ...state.dataSource[i] });
    }
    return rows;
  }

  function generateRows() {
    while (bodyDiv.current!.firstChild) bodyDiv.current!.removeChild(bodyDiv.current!.lastChild!);
    state.path = {};
    state.allParent = {};
    state.checkBoxArr = [];

    for (let i = 0; i < state.dataSource.length; i++) {
      state.path[state.dataSource[i][state.keyField]] = state.dataSource[i][state.parentField];
      state.allParent[state.dataSource[i][state.parentField]] = true;
    }

    function getPath(key: string) {
      let res: string[] = [];
      while (true) {
        res.unshift(key);
        key = state.path[key];
        if (!Object.prototype.hasOwnProperty.call(state.path, key)) break;
      }
      return res;
    }

    for (let i = 0; i < state.dataSource.length; i++) {
      state.dataSource[i].path = getPath(state.dataSource[i][state.keyField]);
      state.dataSource[i].leaf = state.allParent[state.dataSource[i][state.keyField]] === true ? false : true
    }


    for (let i = 0; i < state.dataSource.length; i++) {
      const row = document.createElement("div");
      row.setAttribute("key", state.dataSource[i][state.keyField]);
      const rowClassName = `row level-${state.dataSource[i].path.length - 1}${state.dataSource[i].leaf ? " leaf" : ""}`;
      row.setAttribute("class", rowClassName);

      const relativeContainer = document.createElement("div");
      relativeContainer.setAttribute("class", "relativeContainer");

      const iconDiv = document.createElement("div");
      iconDiv.setAttribute("class", "icon expanded");

      const checkBox = document.createElement("input");
      checkBox.setAttribute("type", "checkbox");
      checkBox.disabled = !state.enabled;

      checkBox.addEventListener("change", function () { checkBoxChanged(checkBox.checked, state.dataSource[i][state.keyField]); })

      relativeContainer.appendChild(iconDiv);
      relativeContainer.appendChild(checkBox);

      const valueDiv = document.createElement("div");
      valueDiv.setAttribute("class", "value");
      valueDiv.innerHTML = state.dataSource[i][state.showField];

      row.appendChild(relativeContainer);
      row.appendChild(valueDiv);

      state.checkBoxArr.push(checkBox);

      bodyDiv.current!.appendChild(row);
    }

  }




  function checkBoxChanged(checked: boolean, key: string) {
    // check-uncheck All Children
    for (let i = 0; i < state.dataSource.length; i++) {
      if (state.dataSource[i].path.includes(key)) {
        state.checkBoxArr[i].indeterminate = false;
        state.checkBoxArr[i].checked = checked;
      }
    }

    // determinate All parent -check-uncheck-indeterminate
    while (true) {
      const parent = state.path[key];
      if (!state.path.hasOwnProperty(parent)) break;

      let childrenCount = 0;
      let checkedChildrenCount = 0;
      for (let i = 0; i < state.dataSource.length; i++) {
        if (state.dataSource[i][state.parentField] === parent) {
          childrenCount++;
          if (state.checkBoxArr[i].checked) checkedChildrenCount++
        }
      }

      let index = -1;
      for (let i = 0; i < state.dataSource.length; i++) {
        if (state.dataSource[i][state.keyField] === parent) {
          index = i;
          break;
        }
      }

      state.checkBoxArr[index].checked = childrenCount === checkedChildrenCount;
      state.checkBoxArr[index].indeterminate = checkedChildrenCount > 0 && childrenCount > checkedChildrenCount;
      key = parent;
    }
  }

  return <div className="treelist-body" ref={bodyDiv}>
  </div>
}

export const TreeList = forwardRef(TreeListComponent);