import { useEffect } from "react";

const SetTabTitle = (newtitle) => {
  useEffect(() => {
    document.title = newtitle + " | MotoHub";
  }, [newtitle]);
};

export default SetTabTitle;
