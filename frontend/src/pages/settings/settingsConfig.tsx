import type { ReactNode } from "react";

export const SETTINGS_BASE = "/app/settings";

export interface SettingsItem {
  path: string;
  label: string;
  title?: string;
  icon: ReactNode;
}

export interface SettingsGroup {
  title: string;
  items: SettingsItem[];
}

const IconAccount = () => (
  <span className="material-symbols-outlined" style={{ fontSize: 24 }}>account_box</span>
);

const IconPlans = () => (
  <span className="material-symbols-outlined" style={{ fontSize: 24 }}>credit_card</span>
);
const IconInvoices = () => (
  <span className="material-symbols-outlined" style={{ fontSize: 24 }}>receipt_long</span>
);
const IconCompany = () => (
  <span className="material-symbols-outlined" style={{ fontSize: 24 }}>business</span>
);
const IconUsers = () => (
  <span className="material-symbols-outlined" style={{ fontSize: 24 }}>group</span>
);
const IconSchedules = () => (
  <span className="material-symbols-outlined" style={{ fontSize: 24 }}>schedule</span>
);
const IconItems = () => (
  <span className="material-symbols-outlined" style={{ fontSize: 24 }}>list_alt</span>
);
const IconPaperwork = () => (
  <span className="material-symbols-outlined" style={{ fontSize: 24 }}>description</span>
);
const IconPayment = () => (
  <span className="material-symbols-outlined" style={{ fontSize: 24 }}>payment</span>
);
const IconService = () => (
  <span className="material-symbols-outlined" style={{ fontSize: 24 }}>build</span>
);
const IconSources = () => (
  <span className="material-symbols-outlined" style={{ fontSize: 24 }}>source</span>
);
const IconTags = () => (
  <span className="material-symbols-outlined" style={{ fontSize: 24 }}>label</span>
);
const IconTiles = () => (
  <span className="material-symbols-outlined" style={{ fontSize: 24 }}>grid_view</span>
);
const IconTemplates = () => (
  <span className="material-symbols-outlined" style={{ fontSize: 24 }}>dynamic_form</span>
);
const IconEmails = () => (
  <span className="material-symbols-outlined" style={{ fontSize: 24 }}>mail</span>
);
const IconCustom = () => (
  <span className="material-symbols-outlined" style={{ fontSize: 24 }}>tune</span>
);
const IconBroadcast = () => (
  <span className="material-symbols-outlined" style={{ fontSize: 24 }}>campaign</span>
);
const IconEmailInbox = () => (
  <span className="material-symbols-outlined" style={{ fontSize: 24 }}>inbox</span>
);

export const SETTINGS_GROUPS: SettingsGroup[] = [
  {
    title: "Your Account",
    items: [
      { path: `${SETTINGS_BASE}/account`, label: "Account", title: "Account", icon: <IconAccount /> },
      { path: `${SETTINGS_BASE}/plans`, label: "Plans", title: "Plans", icon: <IconPlans /> },
      { path: `${SETTINGS_BASE}/invoices`, label: "Invoices", title: "Invoices", icon: <IconInvoices /> },
    ],
  },
  {
    title: "SYSTEM SETTINGS",
    items: [
      { path: `${SETTINGS_BASE}/company`, label: "Company", title: "Company", icon: <IconCompany /> },
      { path: `${SETTINGS_BASE}/users`, label: "Users", title: "Users", icon: <IconUsers /> },
      { path: `${SETTINGS_BASE}/schedules`, label: "Schedules", title: "Schedules", icon: <IconSchedules /> },
      { path: `${SETTINGS_BASE}/items`, label: "Line Items", title: "Line Items", icon: <IconItems /> },
      { path: `${SETTINGS_BASE}/paperwork`, label: "Paperwork", title: "Paperwork", icon: <IconPaperwork /> },
      { path: `${SETTINGS_BASE}/paymentmethods`, label: "Payment Methods", title: "Payment Methods", icon: <IconPayment /> },
      { path: `${SETTINGS_BASE}/service`, label: "Service Templates", title: "Service Templates", icon: <IconService /> },
      { path: `${SETTINGS_BASE}/sources`, label: "Sources", title: "Sources", icon: <IconSources /> },
      { path: `${SETTINGS_BASE}/tags`, label: "Tags", title: "Tags", icon: <IconTags /> },
      { path: `${SETTINGS_BASE}/tiles`, label: "Tiles", title: "Tiles", icon: <IconTiles /> },
      { path: `${SETTINGS_BASE}/templates`, label: "Templates", title: "Templates", icon: <IconTemplates /> },
    ],
  },
  {
    title: "Email & Sms Templates",
    items: [
      { path: `${SETTINGS_BASE}/emails`, label: "System", title: "System", icon: <IconEmails /> },
      { path: `${SETTINGS_BASE}/customs`, label: "Custom", title: "Custom", icon: <IconCustom /> },
      { path: `${SETTINGS_BASE}/broadcast`, label: "Broadcast", title: "Broadcast", icon: <IconBroadcast /> },
      { path: `${SETTINGS_BASE}/emailinbox`, label: "Email Inbox", title: "Email Inbox", icon: <IconEmailInbox /> },
    ],
  },
];

export function getSettingsItemByPath(pathname: string): SettingsItem | undefined {
  for (const group of SETTINGS_GROUPS) {
    const found = group.items.find((item) => pathname === item.path || pathname.startsWith(item.path + "/"));
    if (found) return found;
  }
  return undefined;
}

export function getAllSettingsItems(): SettingsItem[] {
  return SETTINGS_GROUPS.flatMap((g) => g.items);
}
