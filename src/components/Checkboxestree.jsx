import { checkboxData } from "../api/data.json";

const CheckboxesTree = ({ data, checked, setChecked }) => {
  const handleInputChange = (isChecked, node) => {
    setChecked((prev) => {
      const newState = { ...prev, [node?.id]: isChecked };
      // update children to new state when checkbox input is changed

      const updateChildren = (node) => {
        node?.children &&
          node.children.forEach((child) => {
            newState[child.id] = isChecked;
            child?.children && updateChildren(child);
          });
      };
      updateChildren(node);

      // handle parent check mark (if all children are checked)
      const verifyChecked = (node) => {
        if (!node?.children) return newState[node.id] || false;
        const allChildrenChecked = node.children.every((child) =>
          verifyChecked(child)
        );
        newState[node.id] = allChildrenChecked;
        return allChildrenChecked;
      };

      checkboxData.forEach((node) => verifyChecked(node));
      return newState;
    });
  };

  return (
    <div>
      {data.length &&
        data.map((node) => {
          return (
            <div key={node.id} style={{ marginLeft: "20px" }}>
              <input
                type="checkbox"
                onChange={(e) => handleInputChange(e.target.checked, node)}
                checked={checked?.[node.id] || false}
              />
              <span>{node.name}</span>
              {node?.children && (
                <CheckboxesTree
                  data={node.children}
                  checked={checked}
                  setChecked={setChecked}
                />
              )}
            </div>
          );
        })}
    </div>
  );
};

export default CheckboxesTree;
