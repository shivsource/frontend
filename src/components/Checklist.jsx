import { useState } from "react";

const Checklist = () => {
  const initialData = [
    {
      id: 1,
      label: "Parent1",
      checked: false,
      children: [
        { id: 3, label: "Child1", checked: false },
        { id: 4, label: "Child2", checked: false },
      ],
    },
    { id: 2, label: "Parent2", checked: false },
    { id: 5, label: "Parent3", checked: false },
    {
      id: 6,
      label: "Parent4",
      checked: false,
      children: [
        { id: 10, label: "Child1", checked: false },
        { id: 7, label: "Child2", checked: false },
        {
          id: 8,
          label: "Child3",
          checked: false,
          children: [
            { id: 9, label: "Child1", checked: false },
            { id: 11, label: "Child2", checked: false },
          ],
        },
      ],
    },
  ];

  const [data, setData] = useState(initialData);

  const handleInputChange = (targetNode) => {
    const toggleDescendants = (node, value) => ({
      ...node,
      checked: value,
      children: node.children
        ? node.children.map((child) => toggleDescendants(child, value))
        : undefined,
    });

    const computeParentState = (node) => {
      if (!node.children) return node;

      const updatedChildren = node.children.map(computeParentState);
      const allChecked = updatedChildren.every((c) => c.checked);

      return {
        ...node,
        checked: allChecked,
        children: updatedChildren,
      };
    };

    const updateTree = (nodes) => {
      return nodes.map((node) => {
        if (node.id === targetNode.id) {
          const newChecked = !node.checked;
          return toggleDescendants(node, newChecked);
        }

        if (node.children) {
          const updatedChildren = updateTree(node.children);
          const updatedNode = { ...node, children: updatedChildren };
          return computeParentState(updatedNode);
        }

        return node;
      });
    };

    setData((prev) => updateTree(prev));
  };

  const renderChecklist = (nodes) => {
    return (
      nodes.length > 0 &&
      nodes.map((node) => (
        <Checkbox
          key={node.id}
          node={node}
          handleInputChange={handleInputChange}
          renderChecklist={renderChecklist}
        />
      ))
    );
  };

  return (
    <div
      style={{
        border: "1px solid black",
        width: "200px",
        minHeight: "20px",
        padding: "10px",
      }}
    >
      {renderChecklist(data)}
    </div>
  );
};

const Checkbox = ({ node, handleInputChange, renderChecklist }) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={node.checked}
        onChange={() => handleInputChange(node)}
      />
      <span>{node.label}</span>
      {node.children && node.children.length > 0 && (
        <div style={{ marginLeft: "20px" }}>
          {renderChecklist(node.children)}
        </div>
      )}
    </div>
  );
};

export default Checklist;
