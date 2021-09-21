/** @jsxImportSource theme-ui **/
import { ApiData } from "../../../api/models/types";

import { Flex, Themed } from "theme-ui";

import styles from "./styles";

type Tab = {
  label: string;
  count?: number;
  data: ApiData[];
};

type ContentNav = {
  setActiveTab: (tab: string) => void;
  activeTab: string;
  tabs: Tab[];
};

const ContentNav = ({ setActiveTab, activeTab, tabs }: ContentNav) => {
  return (
    <Flex className="tabs" sx={styles.tabs}>
      {tabs.map((tab) => {
        const id = tab.label.toLowerCase();
        return (
          <Themed.h6
            key={tab.label}
            className={"tab " + id + " " + (activeTab === id ? "active" : "")}
            onClick={() => setActiveTab(id)}
          >
            <span className="label">{tab.label}</span>
            <span className="count">{tab.count}</span>
          </Themed.h6>
        );
      })}
    </Flex>
  );
};

export default ContentNav;
