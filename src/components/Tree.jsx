import { useState } from "react";
import { VscChevronDown, VscChevronRight } from "react-icons/vsc";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

const Tree = () => {
  const initialData = [
    { id: 1, is_folder: true, open: false },
    { id: 2, is_folder: false },
    {
      id: 3,
      is_folder: true,
      open: true,
      children: [
        { id: 4, is_folder: false },
        {
          id: 5,
          is_folder: true,
          open: true,
          children: [{ id: 6, is_folder: false }],
        },
      ],
    },
  ];

  const [data, setData] = useState(initialData);

  const handleAddNode = (node) => {
    const node_type = prompt("What do you want to create, file or folder?");

    const handleRecurNodes = (nodes) => {
      return nodes.map((elem) => {
        if (elem.id === node.id) {
          return {
            ...elem,
            children: [
              ...(elem?.children ?? []),
              {
                id: Math.floor(Date.now() / 1000),
                is_folder: node_type === "folder",
              },
            ],
          };
        }

        if (elem.children) {
          return {
            ...elem,
            children: handleRecurNodes(elem.children),
          };
        }
        return elem;
      });
    };

    const updatedTree = handleRecurNodes(data);
    setData(updatedTree);
  };

  const handleRemoveNode = (nodeId, nodeType) => {
    if (
      !confirm(
        `Are you sure want to remove this ${nodeType ? "Folder" : "File"}`
      )
    )
      return;

    const handleRecurNodeRemove = (nodes) => {
      return nodes
        .filter((elem) => elem.id !== nodeId)
        .map((elem) => {
          if (elem.children) {
            return {
              ...elem,
              children: handleRecurNodeRemove(elem.children),
            };
          }
          return elem;
        });
    };

    const updatedTree = handleRecurNodeRemove(data);
    setData(updatedTree);
  };

  const toggleArrow = (node) => {
    const handletoggleArrow = (nodes) => {
      return nodes.map((elem) => {
        if (elem.id === node.id) {
          return {
            ...elem,
            open: !node?.open,
          };
        }

        if (elem.children) {
          return {
            ...elem,
            children: handletoggleArrow(elem.children),
          };
        }
        return elem;
      });
    };

    const updatedTree = handletoggleArrow(data);
    setData(updatedTree);
  };

  const rendertree = (nodes) =>
    nodes.length > 0 &&
    nodes.map((elem) => (
      <SingleNode
        key={elem.id}
        elem={elem}
        toggleArrow={toggleArrow}
        handleAddNode={handleAddNode}
        handleRemoveNode={handleRemoveNode}
        rendertree={rendertree}
      />
    ));

  return (
    <>
      <div
        style={{
          border: "1px solid black",
          maxWidth: "350px",
          minHeight: "400px",
        }}
      >
        {data.length ? rendertree(data) : <p style={{textAlign:"center"}}>"No Records found"</p>}
      </div>
    </>
  );
};

const SingleNode = ({
  elem,
  toggleArrow,
  handleAddNode,
  handleRemoveNode,
  rendertree,
}) => {
  return (
    <div style={{ marginLeft: "5px" }}>
      {elem.is_folder && (
        <span style={{ cursor: "pointer" }} onClick={() => toggleArrow(elem)}>
          {elem?.open ? (
            <VscChevronDown size={16} />
          ) : (
            <VscChevronRight size={16} />
          )}
        </span>
      )}
      <span>{`${elem?.is_folder ? "Folder" : "File"}-${elem.id}`}</span>
      &nbsp;&nbsp;
      {elem?.is_folder && (
        <span style={{ cursor: "pointer" }} onClick={() => handleAddNode(elem)}>
          <CiCirclePlus size={16} />
        </span>
      )}
      &nbsp;&nbsp;
      <span
        style={{ cursor: "pointer" }}
        onClick={() => handleRemoveNode(elem.id, elem?.is_folder)}
      >
        <CiCircleMinus size={16} />
      </span>
      {elem?.children && elem?.children.length && elem?.open && (
        <div style={{ marginLeft: "20px" }}>{rendertree(elem.children)}</div>
      )}
    </div>
  );
};

export default Tree;
