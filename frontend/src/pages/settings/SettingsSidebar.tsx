import { Fragment } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { SETTINGS_GROUPS } from "./settingsConfig";

type SettingsSidebarProps = {
  ariaHidden?: boolean;
  onItemSelect?: () => void;
};

export const SettingsSidebar = ({ ariaHidden, onItemSelect }: SettingsSidebarProps) => {
  const { pathname } = useLocation();

  return (
    <div className="sidebar-menu sidebar-pages scrolls pb-4 settings-page-bg settings-sidebar-hide-extra" aria-hidden={ariaHidden}>
      <ul>
        {SETTINGS_GROUPS.map((group) => (
          <Fragment key={group.title}>
            <li
              className={`sub-title${group.title === "SYSTEM SETTINGS" || group.title === "Email & Sms Templates" ? " pt-4" : ""}`}
              title={group.title}
              data-settings-group={group.title}
            >
              {group.title}
            </li>
            {group.items.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.path} data-settings-path={item.path}>
                  <NavLink
                    to={item.path}
                    className={`items${isActive ? " active" : ""}`}
                    title={item.title ?? item.label}
                    onClick={onItemSelect}
                  >
                    <span>{item.icon}</span>
                    <span className="txt-ellipsis" title={item.label}>
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </Fragment>
        ))}
      </ul>
    </div>
  );
};
