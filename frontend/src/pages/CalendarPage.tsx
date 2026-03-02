import { useState, useRef, useEffect } from "react";
import { IconSearch, IconCalendar } from "../components/header/HeaderIcons";
import { ScheduleListModal } from "../components/ScheduleListModal";

const ArrowDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 7.5L8 11L11.5 7.5" stroke="var(--color-icon)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.5 5.5L8 12L14.5 18.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.5 5.5L16 12L9.5 18.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronsLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5 5.5L5 12L11.5 18.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17.5 5.5L11 12L17.5 18.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronsRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 5.5L19 12L12.5 18.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 5.5L13 12L6.5 18.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconViewRows = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M5.78194 6.5H12.2181C12.6638 6.5 12.8255 6.54641 12.9884 6.63357C13.1514 6.72072 13.2793 6.84861 13.3664 7.01158C13.4536 7.17454 13.5 7.33618 13.5 7.78194V9.21806C13.5 9.66382 13.4536 9.82546 13.3664 9.98842C13.2793 10.1514 13.1514 10.2793 12.9884 10.3664C12.8255 10.4536 12.6638 10.5 12.2181 10.5H5.78194C5.33618 10.5 5.17454 10.4536 5.01158 10.3664C4.84861 10.2793 4.72072 10.1514 4.63357 9.98842C4.54641 9.82546 4.5 9.66382 4.5 9.21806V7.78194C4.5 7.33618 4.54641 7.17454 4.63357 7.01158C4.72072 6.84861 4.84861 6.72072 5.01158 6.63357C5.17454 6.54641 5.33618 6.5 5.78194 6.5Z" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path fillRule="evenodd" clipRule="evenodd" d="M5.78194 13.5H18.2181C18.6638 13.5 18.8255 13.5464 18.9884 13.6336C19.1514 13.7207 19.2793 13.8486 19.3664 14.0116C19.4536 14.1745 19.5 14.3362 19.5 14.7819V16.2181C19.5 16.6638 19.4536 16.8255 19.3664 16.9884C19.2793 17.1514 19.1514 17.2793 18.9884 17.3664C18.8255 17.4536 18.6638 17.5 18.2181 17.5H5.78194C5.33618 17.5 5.17454 17.4536 5.01158 17.3664C4.84861 17.2793 4.72072 17.1514 4.63357 16.9884C4.54641 16.8255 4.5 16.6638 4.5 16.2181V14.7819C4.5 14.3362 4.54641 14.1745 4.63357 14.0116C4.72072 13.8486 4.84861 13.7207 5.01158 13.6336C5.17454 13.5464 5.33618 13.5 5.78194 13.5Z" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconViewColumns = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M7.78194 4.5H9.21806C9.66382 4.5 9.82546 4.54641 9.98842 4.63357C10.1514 4.72072 10.2793 4.84861 10.3664 5.01158C10.4536 5.17454 10.5 5.33618 10.5 5.78194V18.2181C10.5 18.6638 10.4536 18.8255 10.3664 18.9884C10.2793 19.1514 10.1514 19.2793 9.98842 19.3664C9.82546 19.4536 9.66382 19.5 9.21806 19.5H7.78194C7.33618 19.5 7.17454 19.4536 7.01158 19.3664C6.84861 19.2793 6.72072 19.1514 6.63357 18.9884C6.54641 18.8255 6.5 18.6638 6.5 18.2181V5.78194C6.5 5.33618 6.54641 5.17454 6.63357 5.01158C6.72072 4.84861 6.84861 4.72072 7.01158 4.63357C7.17454 4.54641 7.33618 4.5 7.78194 4.5Z" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path fillRule="evenodd" clipRule="evenodd" d="M14.7819 4.5H16.2181C16.6638 4.5 16.8255 4.54641 16.9884 4.63357C17.1514 4.72072 17.2793 4.84861 17.3664 5.01158C17.4536 5.17454 17.5 5.33618 17.5 5.78194V12.2181C17.5 12.6638 17.4536 12.8255 17.3664 12.9884C17.2793 13.1514 17.1514 13.2793 16.9884 13.3664C16.8255 13.4536 16.6638 13.5 16.2181 13.5H14.7819C14.3362 13.5 14.1745 13.4536 14.0116 13.3664C13.8486 13.2793 13.7207 13.1514 13.6336 12.9884C13.5464 12.8255 13.5 12.6638 13.5 12.2181V5.78194C13.5 5.33618 13.5464 5.17454 13.6336 5.01158C13.7207 4.84861 13.8486 4.72072 14.0116 4.63357C14.1745 4.54641 14.3362 4.5 14.7819 4.5Z" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconPalette = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.3884 8C15.9337 5.99601 14.1415 4.5 11.9999 4.5C9.85835 4.5 8.06618 5.99601 7.61145 8" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 19.0322C9.39752 19.3316 8.71842 19.5 8 19.5C5.51472 19.5 3.5 17.4853 3.5 15C3.5 12.5147 5.51472 10.5 8 10.5C8.71842 10.5 9.39752 10.6684 10 10.9678" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 19.5C18.4853 19.5 20.5 17.4853 20.5 15C20.5 12.5147 18.4853 10.5 16 10.5C13.5147 10.5 11.5 12.5147 11.5 15C11.5 17.4853 13.5147 19.5 16 19.5Z" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconDropup = () => (
  <svg width="8" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M1.39378 0H8.60622C9.3014 0 9.86495 0.612378 9.86495 1.36778C9.86495 1.68776 9.76171 1.99761 9.5732 2.24342L5.96698 6.94579C5.52194 7.52611 4.72823 7.60452 4.19417 7.12092C4.13569 7.06796 4.08175 7.00934 4.03301 6.94579L0.426789 2.24342C-0.0182539 1.6631 0.0539014 0.800623 0.587953 0.317024C0.814167 0.112181 1.09931 0 1.39378 0Z" fill="var(--color-icon)" />
  </svg>
);

const IconKebab = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="1.5" fill="var(--color-icon)" />
    <circle cx="12" cy="6" r="1.5" fill="var(--color-icon)" />
    <circle cx="12" cy="18" r="1.5" fill="var(--color-icon)" />
  </svg>
);

const IconRoute = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.5 6.5H15.0011C16.3812 6.5 17.5 7.61881 17.5 8.99894C17.5 10.3791 16.3812 11.4979 15.0011 11.4979H7.00106C5.61976 11.4979 4.5 12.6176 4.5 13.9989C4.5 15.3802 5.61976 16.5 7.00106 16.5H17.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 8.5C7.60457 8.5 8.5 7.60457 8.5 6.5C8.5 5.39543 7.60457 4.5 6.5 4.5C5.39543 4.5 4.5 5.39543 4.5 6.5C4.5 7.60457 5.39543 8.5 6.5 8.5Z" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.5 18.4962L18.4962 16.4962L16.5 14.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconBatchMove = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.5 17.5H16.5C17.6046 17.5 18.5 16.6046 18.5 15.5V8.5C18.5 7.39543 17.6046 6.5 16.5 6.5H15.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.5 5.5H13.5C14.6046 5.5 15.5 6.39543 15.5 7.5V16.5C15.5 17.6046 14.6046 18.5 13.5 18.5H7.5C6.39543 18.5 5.5 17.6046 5.5 16.5V7.5C5.5 6.39543 6.39543 5.5 7.5 5.5Z" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 10.5C9.82843 10.5 10.5 9.82843 10.5 9C10.5 8.17157 9.82843 7.5 9 7.5C8.17157 7.5 7.5 8.17157 7.5 9C7.5 9.82843 8.17157 10.5 9 10.5Z" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.5 13.5H13.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.5 15.5H11.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconWorkPool = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5001 3.84961C12.9571 3.84961 13.3326 3.84923 13.6388 3.87012C13.9506 3.8914 14.2378 3.9375 14.5138 4.05176C15.1631 4.32073 15.6794 4.83703 15.9483 5.48633C16.0626 5.76236 16.1087 6.0495 16.13 6.36133C16.14 6.50778 16.144 6.67011 16.1466 6.84961C16.3201 6.85004 16.4492 6.85223 16.5704 6.86231C17.9564 6.97756 19.1565 7.87065 19.6651 9.16504C19.7229 9.31202 19.771 9.47581 19.8468 9.72852L20.4972 11.8945C20.6431 12.3811 20.5097 12.9093 20.1505 13.2686C20.137 13.2822 20.1286 13.3002 20.1271 13.3193L19.9747 15.3086C19.9223 15.9903 19.8806 16.5354 19.8155 16.9756C19.7495 17.4221 19.6536 17.807 19.4708 18.1641C19.0782 18.9302 18.4269 19.5334 17.6329 19.8662C17.2627 20.0213 16.8706 20.0876 16.42 20.1191C15.9762 20.1502 15.4298 20.1504 14.7462 20.1504H9.25401C8.57045 20.1504 8.02402 20.1502 7.58018 20.1191C7.12958 20.0876 6.73748 20.0213 6.36729 19.8662C5.57329 19.5334 4.92201 18.9303 4.5294 18.1641C4.34655 17.807 4.25066 17.4222 4.18467 16.9756C4.11963 16.5354 4.07793 15.9904 4.02549 15.3086L3.87315 13.3193C3.87165 13.3003 3.86315 13.2822 3.84971 13.2686C3.49045 12.9093 3.35704 12.3812 3.50303 11.8945L4.15342 9.72852C4.22923 9.47581 4.27731 9.31202 4.33506 9.16504C4.84373 7.87064 6.0438 6.97752 7.42979 6.86231C7.55057 6.85227 7.67913 6.85005 7.85166 6.84961C7.85429 6.67009 7.86022 6.50779 7.87022 6.36133C7.8915 6.04949 7.93758 5.76236 8.05186 5.48633C8.32082 4.83702 8.83712 4.32071 9.48643 4.05176C9.76244 3.93751 10.0496 3.8914 10.3614 3.87012C10.6676 3.84923 11.0431 3.84961 11.5001 3.84961H12.5001ZM18.7452 14.3301C17.4297 15.1219 15.9335 15.5761 14.3907 15.6416L14.0499 15.6484C13.7747 16.5189 12.9614 17.1504 12.0001 17.1504C11.0387 17.1504 10.2244 16.519 9.94932 15.6484L9.60948 15.6416C8.06646 15.5761 6.56974 15.1221 5.25401 14.3301L5.32237 15.209C5.37619 15.9087 5.41397 16.4004 5.4708 16.7852C5.52663 17.163 5.59475 17.3919 5.68662 17.5713C5.93945 18.0647 6.35891 18.4528 6.87022 18.667C7.0562 18.7449 7.28977 18.7956 7.671 18.8223C8.05893 18.8494 8.55232 18.8496 9.25401 18.8496H14.7462C15.4479 18.8496 15.9413 18.8494 16.3292 18.8223C16.7104 18.7956 16.944 18.7449 17.13 18.667C17.6413 18.4527 18.0608 18.0647 18.3136 17.5713C18.4054 17.3919 18.4736 17.163 18.5294 16.7852C18.5862 16.4004 18.624 15.9087 18.6778 15.209L18.7452 14.3301ZM12.0001 14.1504C11.5307 14.1504 11.1505 14.5306 11.1505 15C11.1505 15.4694 11.5307 15.8496 12.0001 15.8496C12.4695 15.8496 12.8497 15.4694 12.8497 15C12.8497 14.5306 12.4695 14.1504 12.0001 14.1504ZM8.02158 8.15039C7.73396 8.15039 7.62778 8.15068 7.53721 8.1582C6.64496 8.23249 5.87247 8.8073 5.54502 9.64063C5.51179 9.7252 5.48114 9.82623 5.39854 10.1016L4.74815 12.2686C4.73959 12.2971 4.74757 12.3285 4.76865 12.3496C4.80736 12.3883 4.8425 12.43 4.87608 12.4727L4.90635 12.4922L5.06358 12.6182C6.37713 13.669 7.98932 14.2715 9.66416 14.3428L9.9503 14.3477C10.2266 13.479 11.0401 12.8496 12.0001 12.8496C12.96 12.8497 13.7726 13.4792 14.0489 14.3477L14.336 14.3428C16.0109 14.2715 17.6231 13.669 18.9366 12.6182L19.0939 12.4922L19.1231 12.4727C19.1568 12.4299 19.1927 12.3885 19.2315 12.3496C19.2526 12.3285 19.2606 12.2971 19.2521 12.2686L18.6017 10.1016C18.5191 9.82624 18.4884 9.7252 18.4552 9.64063C18.1278 8.80731 17.3552 8.23253 16.463 8.1582C16.3724 8.15068 16.2663 8.15039 15.9786 8.15039H8.02158ZM11.5001 5.15039C11.0255 5.15039 10.7019 5.15082 10.4503 5.16797C10.2045 5.18474 10.0749 5.2151 9.9835 5.25293C9.65276 5.38994 9.39005 5.65266 9.25303 5.9834C9.21518 6.07477 9.18484 6.20438 9.16807 6.4502C9.1602 6.56564 9.1568 6.69624 9.1544 6.84961H14.8458C14.8434 6.69624 14.84 6.56564 14.8321 6.4502C14.8154 6.20441 14.785 6.07477 14.7472 5.9834C14.6102 5.65267 14.3474 5.38996 14.0167 5.25293C13.9253 5.21509 13.7957 5.18474 13.5499 5.16797C13.2983 5.15082 12.9747 5.15039 12.5001 5.15039H11.5001Z" fill="currentColor" />
  </svg>
);

const IconTasks = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4.84961C13.1561 4.84961 14.0639 4.84921 14.792 4.91113C15.5281 4.97375 16.1404 5.10435 16.6924 5.39941L16.9893 5.57227C17.6655 6.00085 18.2213 6.59816 18.6006 7.30762L18.7041 7.51758C18.9276 8.01462 19.0341 8.56382 19.0889 9.20801C19.1508 9.93603 19.1504 10.844 19.1504 12C19.1504 13.1561 19.1508 14.064 19.0889 14.792C19.0341 15.4362 18.9276 15.9854 18.7041 16.4824L18.6006 16.6924C18.1671 17.5031 17.5031 18.1671 16.6924 18.6006C16.1404 18.8956 15.5281 19.0263 14.792 19.0889C14.0639 19.1508 13.1561 19.1504 12 19.1504C10.8439 19.1504 9.93605 19.1508 9.20801 19.0889C8.5638 19.0341 8.01463 18.9276 7.51758 18.7041L7.30762 18.6006C6.59817 18.2213 6.00085 17.6655 5.57227 16.9893L5.39941 16.6924C5.10436 16.1404 4.97375 15.5281 4.91113 14.792C4.84921 14.064 4.84961 13.1561 4.84961 12C4.84961 10.844 4.84922 9.93603 4.91113 9.20801C4.97374 8.47192 5.10438 7.85962 5.39941 7.30762L5.57227 7.01074C6.00084 6.3345 6.59817 5.77873 7.30762 5.39941L7.51758 5.2959C8.01464 5.0724 8.56378 4.96593 9.20801 4.91113C9.93605 4.84921 10.8439 4.84961 12 4.84961ZM12 6.15039C10.8216 6.15039 9.97851 6.15089 9.31836 6.20703C8.74802 6.25554 8.35998 6.34271 8.0498 6.48242L7.9209 6.5459C7.40953 6.81926 6.97875 7.21957 6.66992 7.70703L6.5459 7.9209C6.36868 8.25249 6.26249 8.66632 6.20703 9.31836C6.1509 9.97849 6.15039 10.8217 6.15039 12C6.15039 13.1783 6.15089 14.0215 6.20703 14.6816C6.2625 15.3337 6.36866 15.7475 6.5459 16.0791L6.66992 16.293C6.97875 16.7804 7.40954 17.1808 7.9209 17.4541L8.0498 17.5176C8.35997 17.6573 8.74804 17.7445 9.31836 17.793C9.97851 17.8491 10.8216 17.8496 12 17.8496C13.1784 17.8496 14.0215 17.8491 14.6816 17.793C15.3337 17.7375 15.7475 17.6313 16.0791 17.4541C16.6633 17.1418 17.1418 16.6633 17.4541 16.0791L17.5176 15.9502C17.6573 15.64 17.7445 15.2519 17.793 14.6816C17.8491 14.0215 17.8496 13.1783 17.8496 12C17.8496 10.8217 17.8491 9.97849 17.793 9.31836C17.7445 8.74807 17.6573 8.35996 17.5176 8.0498L17.4541 7.9209C17.1807 7.40953 16.7804 6.97875 16.293 6.66992L16.0791 6.5459C15.7475 6.36865 15.3337 6.2625 14.6816 6.20703C14.0215 6.15089 13.1784 6.15039 12 6.15039ZM14.04 10.04C14.2939 9.7862 14.7061 9.7862 14.96 10.04C15.2137 10.2939 15.2138 10.7061 14.96 10.96L11.96 13.96C11.7061 14.2137 11.2939 14.2137 11.04 13.96L9.54004 12.46L9.45703 12.3574C9.2906 12.1052 9.31804 11.7621 9.54004 11.54C9.76209 11.318 10.1051 11.2906 10.3574 11.457L10.46 11.54L11.5 12.5801L14.04 10.04Z" fill="currentColor" />
  </svg>
);

const IconJobList = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3.84961C13.1561 3.84961 14.064 3.84921 14.792 3.91113C15.5281 3.97375 16.1404 4.10435 16.6924 4.39941L16.9893 4.57227C17.6655 5.00085 18.2213 5.59816 18.6006 6.30762L18.7041 6.51758C18.9276 7.01462 19.0341 7.56382 19.0889 8.20801C19.1416 8.82768 19.1464 9.57761 19.1475 10.5H19.1504C19.1504 10.6202 19.1506 10.7195 19.1494 10.8066C19.1494 10.8703 19.1504 10.9348 19.1504 11V12.2402C19.1503 12.8134 19.0572 13.383 18.876 13.9268C18.0166 16.5046 16.066 18.5738 13.543 19.583L13.165 19.7344C12.4784 20.009 11.7454 20.1504 11.0059 20.1504H10.543C10.2965 20.1504 10.0756 20.147 9.87501 20.1455L9.81056 20.1484C9.72244 20.1497 9.62204 20.1504 9.50001 20.1504V20.1426C9.20817 20.1348 8.96284 20.1193 8.74024 20.0859L8.5547 20.0527C6.85481 19.6996 5.50311 18.4323 5.03028 16.7812L4.94727 16.4453C4.84675 15.9611 4.84962 15.3935 4.84962 14.457V11C4.84962 9.84395 4.84923 8.93603 4.91114 8.20801C4.97375 7.47192 5.10439 6.85962 5.39942 6.30762L5.57227 6.01074C6.00085 5.3345 6.59817 4.77873 7.30763 4.39941L7.51759 4.2959C8.01465 4.0724 8.56379 3.96593 9.20802 3.91113C9.93606 3.84921 10.8439 3.84961 12 3.84961ZM12 5.15039C10.8216 5.15039 9.97852 5.15089 9.31837 5.20703C8.74802 5.25554 8.35999 5.34271 8.04981 5.48242L7.92091 5.5459C7.40954 5.81926 6.97875 6.21957 6.66993 6.70703L6.54591 6.9209C6.36869 7.25249 6.2625 7.66632 6.20704 8.31836C6.15091 8.97849 6.1504 9.82166 6.1504 11V14.457C6.1504 15.4588 6.15314 15.8611 6.21974 16.1816L6.27931 16.4229C6.61985 17.6124 7.5937 18.5258 8.81837 18.7803L9.08204 18.8193C9.24783 18.8357 9.45106 18.8422 9.73048 18.8457L9.94825 18.8428C10.795 18.7776 11.5356 18.2616 11.8936 17.501L11.96 17.3457L12.0957 16.9189L12.3897 15.9404C12.5322 15.4654 12.6367 15.1008 12.8076 14.791L12.8848 14.6611C13.0361 14.4286 13.2229 14.2219 13.4375 14.0479L13.6611 13.8848C13.9142 13.7202 14.2017 13.6157 14.5586 13.5049L14.9404 13.3896L15.919 13.0957L16.3457 12.96C17.1908 12.6339 17.7732 11.8514 17.8428 10.9482C17.8482 10.8773 17.8474 10.7964 17.8477 10.6123C17.8469 9.63298 17.8428 8.90375 17.793 8.31836C17.7445 7.74807 17.6573 7.35996 17.5176 7.0498L17.4541 6.9209C17.1808 6.40953 16.7804 5.97875 16.293 5.66992L16.0791 5.5459C15.7475 5.36865 15.3337 5.2625 14.6816 5.20703C14.0215 5.15089 13.1784 5.15039 12 5.15039ZM17.542 13.79C17.3168 13.9421 17.0738 14.0724 16.8135 14.1729L16.5899 14.251C16.5057 14.2776 16.409 14.3057 16.292 14.3408L15.3145 14.6348L14.6641 14.8389C14.5235 14.889 14.4421 14.9278 14.3701 14.9746L14.2559 15.0576C14.1466 15.1462 14.0516 15.2517 13.9746 15.3701L13.9082 15.4912C13.8428 15.6321 13.7739 15.8507 13.6348 16.3145L13.3408 17.292L13.251 17.5898C13.2245 17.6738 13.1991 17.7454 13.1729 17.8135L13.0703 18.0547C13.0038 18.196 12.9275 18.331 12.8447 18.4609L13.0606 18.376L13.4609 18.2031C15.3462 17.3261 16.8111 15.7407 17.542 13.79ZM10.5264 13.418C10.821 13.1777 11.2557 13.1951 11.5303 13.4697C11.8048 13.7443 11.8223 14.1791 11.582 14.4736L11.5303 14.5303L9.53028 16.5303C9.25569 16.8048 8.82093 16.8223 8.52638 16.582L8.46973 16.5303L7.46973 15.5303L7.41798 15.4736C7.17769 15.1791 7.1952 14.7443 7.46973 14.4697C7.74434 14.1951 8.17906 14.1777 8.47364 14.418L8.53028 14.4697L9.00001 14.9395L10.4697 13.4697L10.5264 13.418ZM10.5264 7.41797C10.821 7.17766 11.2557 7.19513 11.5303 7.46973C11.8048 7.74433 11.8223 8.17907 11.582 8.47363L11.5303 8.53027L9.53028 10.5303C9.25569 10.8048 8.82093 10.8223 8.52638 10.582L8.46973 10.5303L7.46973 9.53027L7.41798 9.47363C7.17769 9.17908 7.1952 8.74434 7.46973 8.46973C7.74434 8.19512 8.17906 8.17766 8.47364 8.41797L8.53028 8.46973L9.00001 8.93945L10.4697 7.46973L10.5264 7.41797ZM16.0772 8.75391C16.4551 8.79253 16.75 9.11183 16.75 9.5C16.7499 9.88811 16.4551 10.2075 16.0772 10.2461L16 10.25H13.5C13.0858 10.25 12.7501 9.91415 12.75 9.5C12.75 9.08579 13.0858 8.75001 13.5 8.75H16L16.0772 8.75391Z" fill="currentColor" />
  </svg>
);

const IconMessaging = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M4.68093 11.0771C5.5472 10.5769 6.41346 10.0768 7.27972 9.57667C9.09657 8.52771 10.5111 6.72568 11.5234 4.17058C11.7268 3.65711 12.308 3.40577 12.8214 3.6092C13.031 3.69223 13.2064 3.84366 13.3191 4.0389L18.0953 12.3114C18.3714 12.7897 18.2076 13.4013 17.7293 13.6774C17.534 13.7902 17.3064 13.8336 17.0834 13.8007C14.3645 13.3998 12.0966 13.7239 10.2797 14.7728C9.41346 15.273 8.5472 15.7731 7.68093 16.2732C6.72435 16.8255 5.50117 16.4978 4.94888 15.5412L3.94888 13.8091C3.3966 12.8525 3.72435 11.6294 4.68093 11.0771Z" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.27979 9.57665L10.2798 14.7728" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconPrint = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 16.5H6.5C5.39543 16.5 4.5 15.6046 4.5 14.5V12V11.5C4.5 10.3954 5.39543 9.5 6.5 9.5H17.5C18.6046 9.5 19.5 10.3954 19.5 11.5V14.5C19.5 15.6046 18.6046 16.5 17.5 16.5H16.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path fillRule="evenodd" clipRule="evenodd" d="M8.5 13.5H15.5C16.0523 13.5 16.5 13.9477 16.5 14.5V16.5C16.5 17.6046 15.6046 18.5 14.5 18.5H9.5C8.39543 18.5 7.5 17.6046 7.5 16.5V14.5C7.5 13.9477 7.94772 13.5 8.5 13.5Z" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path fillRule="evenodd" clipRule="evenodd" d="M9.5 5.5H14.5C15.6046 5.5 16.5 6.39543 16.5 7.5V9.5H7.5V7.5C7.5 6.39543 8.39543 5.5 9.5 5.5Z" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconChevronRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.5 5.5L16 12L9.5 18.5" stroke="var(--color-icon)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const formatMonthTitle = (d: Date) =>
  d.toLocaleDateString("en-US", { month: "long", year: "numeric" });

export const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); // Feb 2026
  const [mapVisible, setMapVisible] = useState(true);
  const [viewRange, setViewRange] = useState<"Month" | "Week" | "Day">("Month");
  const [viewMode, setViewMode] = useState<"rows" | "columns">("columns");
  const [workpoolTab, setWorkpoolTab] = useState<"pool" | "missed">("pool");
  const [sidebarTab, setSidebarTab] = useState<"workpool" | "tasks" | "joblist">("workpool");
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);
  const [scheduleListOpen, setScheduleListOpen] = useState(false);
  const schedulePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scheduleListOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setScheduleListOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (schedulePickerRef.current && !schedulePickerRef.current.contains(e.target as Node)) {
        setScheduleListOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [scheduleListOpen]);

  const goPrev = () =>
    setCurrentDate((d) => {
      const n = new Date(d);
      n.setMonth(n.getMonth() - 1);
      return n;
    });
  const goNext = () =>
    setCurrentDate((d) => {
      const n = new Date(d);
      n.setMonth(n.getMonth() + 1);
      return n;
    });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;
  const weeks = totalCells / 7;

  const getDayInfo = (cellIndex: number) => {
    const dayNum = cellIndex - startOffset + 1;
    if (dayNum < 1 || dayNum > daysInMonth) return { empty: true as const, dayNum: 0 };
    return { empty: false as const, dayNum };
  };

  return (
    <div className="container-wrap calendar" id="main_page_full_calendar">
      <div className="calendar-layout container">
        <div className="calendar-layout__main">
          {/* First vertical div: header */}
          <div className="calendar-layout__header-wrap">
            <header className="calendar-layout__header calendar-header">
              <div className="left-menu flexcenter">
                <button
                  type="button"
                  id="btn-map-toggle"
                  className={`v2-btn-default btn-mapbox cursor ${mapVisible ? "active" : ""}`}
                  onClick={() => setMapVisible((v) => !v)}
                  title="Map"
                >
                  Map
                  <span className="switch-icon ml-1 has-toggle">
                    <span className="switch-icon__dots" />
                  </span>
                </button>
                <div className="v2-dropdown list-agenda">
                  <button type="button" className="dropbtn btn-agenda v2-btn-default --icon-r mr-0" title="View range">
                    <p className="txt-ellipsis">{viewRange}</p>
                    <span className="arrow"><ArrowDown /></span>
                  </button>
                </div>
                <div className="is-divider --h24 hide-mobile" />
                <div className="btn-viewtask tooltip">
                  <button
                    type="button"
                    className={`v2-btn-default --icon-lg icons-viewrows ${viewMode === "rows" ? "active" : ""}`}
                    onClick={() => setViewMode("rows")}
                    title="View Horizontal"
                  >
                    <IconViewRows />
                  </button>
                  <button
                    type="button"
                    className={`v2-btn-default --icon-lg icons-viewcolumns ${viewMode === "columns" ? "active" : ""}`}
                    onClick={() => setViewMode("columns")}
                    title="View Vertical"
                  >
                    <IconViewColumns />
                  </button>
                </div>
                <div className="v2-dropdown list-calendarcolor">
                  <button type="button" className="dropbtn v2-btn-default tooltip" title="Color Codes">
                    <span className="mr-1"><IconPalette /></span>
                    <span className="arrow"><ArrowDown /></span>
                  </button>
                </div>
                <div className="wrap-schedule-picker" ref={schedulePickerRef}>
                  <div
                    className="wrap-schedule-picker__btn cursor-pointer"
                    title="Schedule"
                    role="button"
                    tabIndex={0}
                    onClick={() => setScheduleListOpen((o) => !o)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setScheduleListOpen((o) => !o);
                      }
                    }}
                  >
                    <div className="avt-img tooltip">
                      <img src="https://d10lkxv225q7z2.cloudfront.net/avatars%2Fstatic%2Favatar_1.jpg" width={24} height={24} alt="" />
                    </div>
                    <span className="svg-dropup"><IconDropup /></span>
                  </div>
                  {scheduleListOpen && (
                    <ScheduleListModal onClose={() => setScheduleListOpen(false)} />
                  )}
                </div>
              </div>

              <div className="center-menu relative">
                <div className="action">
                  <button type="button" className="btn-action tooltip" onClick={goPrev} title="Jump Back">
                    <ChevronsLeft />
                  </button>
                  <button type="button" className="btn-action tooltip" onClick={goPrev} title="Previous">
                    <ChevronLeft />
                  </button>
                  <button type="button" className="action__items v2-btn-default btn-today mr-0" onClick={() => setCurrentDate(new Date())}>
                    Today
                  </button>
                  <span id="title-calendar-time" className="action__items time text-capitalize" title={formatMonthTitle(currentDate)}>
                    {formatMonthTitle(currentDate)}
                  </span>
                  <button type="button" className="btn-action tooltip" onClick={goNext} title="Next">
                    <ChevronRight />
                  </button>
                  <button type="button" className="btn-action tooltip" onClick={goNext} title="Jump Next">
                    <ChevronsRight />
                  </button>
                </div>
              </div>

              <div className="right-menu relative flexcenter">
                <div className="wrap-action relative">
                  <button
                    type="button"
                    className="wrap-action__btn v2-btn-default --icon-lg"
                    onClick={() => setActionsMenuOpen((o) => !o)}
                    aria-expanded={actionsMenuOpen}
                    title="More options"
                  >
                    <IconKebab />
                  </button>
                  {actionsMenuOpen && (
                    <div
                      className="v2-dropdown__menu v2-dropdown__menu--actions"
                      style={{ display: "block", top: "100%", right: 0, left: "auto", marginTop: "0.25rem" }}
                    >
                      <button type="button" className="v2-btn-default list-items">
                        <IconRoute />
                        <p>Route Optimizer</p>
                      </button>
                      <div className="v2-dropdown">
                        <button type="button" className="dropbtn v2-btn-default list-items">
                          <IconBatchMove />
                          <p className="flex-1">Batch Move</p>
                          <span className="arrow"><IconChevronRight /></span>
                        </button>
                      </div>
                      <div className="v2-dropdown">
                        <button type="button" className="dropbtn v2-btn-default list-items">
                          <IconMessaging />
                          <p className="flex-1">Messaging</p>
                          <span className="arrow"><IconChevronRight /></span>
                        </button>
                        <div className="v2-dropdown__menu content-full">
                          <ul>
                            <li><div className="items btn-modal">Send Reminders</div></li>
                            <li><div className="items btn-modal">Send Confirmations</div></li>
                            <li><div className="items btn-modal">Send a Broadcast</div></li>
                          </ul>
                        </div>
                      </div>
                      <button type="button" className="v2-btn-default list-items">
                        <IconPrint />
                        <p>Print Schedule</p>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </header>
          </div>

          {/* Second vertical div: map (toggle) + calendar */}
          <div className="calendar-layout__content">
            {/* MAP */}
            {mapVisible && (
              <div className="calendar-layout__map map">
                <div className="map-placeholder">MAP</div>
              </div>
            )}

            {/* CALENDAR */}
            <div className="calendar-layout__calendar calendar">
          <div className="calendar-grid">
            {DAY_NAMES.map((name) => (
              <div key={name} className="day-name">
                {name}
              </div>
            ))}
            {/* Row 1 */}
            {Array.from({ length: 7 }, (_, i) => {
              const { empty, dayNum } = getDayInfo(i);
              if (empty)
                return (
                  <div key={`r1-${i}`} className="day">
                    <div className="day-date-wrap" />
                    <div className="day-cards" />
                    <div className="day-footer" />
                  </div>
                );
              if (dayNum === 2)
                return (
                  <div key={`r1-${i}`} className="day event">
                    <div className="day-date-wrap">
                      <span className="date">2</span>
                    </div>
                    <div className="day-cards">
                      <div className="card red">ZELLER BILL</div>
                    </div>
                    <div className="day-footer" />
                  </div>
                );
              return (
                <div key={`r1-${i}`} className="day">
                  <div className="day-date-wrap">
                    <span className="date">{dayNum}</span>
                  </div>
                  <div className="day-cards" />
                  <div className="day-footer" />
                </div>
              );
            })}
            {/* Row 2 */}
            {Array.from({ length: 7 }, (_, i) => {
              const { empty, dayNum } = getDayInfo(7 + i);
              if (empty)
                return (
                  <div key={`r2-${i}`} className="day">
                    <div className="day-date-wrap" />
                    <div className="day-cards" />
                    <div className="day-footer" />
                  </div>
                );
              if (dayNum === 9)
                return (
                  <div key={`r2-${i}`} className="day">
                    <div className="day-date-wrap">
                      <span className="date">9</span>
                    </div>
                    <div className="day-cards">
                      <div className="card">EDGEWOOD SUBDI</div>
                      <div className="card">GAMBILL BARBARA</div>
                    </div>
                    <div className="day-footer" />
                  </div>
                );
              if (dayNum === 14)
                return (
                  <div key={`r2-${i}`} className="day holiday">
                    <div className="day-date-wrap">
                      <span className="date">14</span>
                    </div>
                    <div className="day-cards">
                      <div className="holiday-label">Valentine&apos;s Day</div>
                    </div>
                    <div className="day-footer" />
                  </div>
                );
              return (
                <div key={`r2-${i}`} className="day">
                  <div className="day-date-wrap">
                    <span className="date">{dayNum}</span>
                  </div>
                  <div className="day-cards" />
                  <div className="day-footer" />
                </div>
              );
            })}
            {/* Row 3 */}
            {Array.from({ length: 7 }, (_, i) => {
              const { empty, dayNum } = getDayInfo(14 + i);
              if (empty)
                return (
                  <div key={`r3-${i}`} className="day">
                    <div className="day-date-wrap" />
                    <div className="day-cards" />
                    <div className="day-footer" />
                  </div>
                );
              if (dayNum === 16)
                return (
                  <div key={`r3-${i}`} className="day holiday">
                    <div className="day-date-wrap">
                      <span className="date">16</span>
                    </div>
                    <div className="day-cards">
                      <div className="holiday-label">Presidents Day</div>
                      <div className="card">ACOSTA MIKE</div>
                      <div className="card">TILLMAN BRETT</div>
                    </div>
                    <div className="day-footer" />
                  </div>
                );
              if (dayNum === 17)
                return (
                  <div key={`r3-${i}`} className="day">
                    <div className="day-date-wrap">
                      <span className="date">17</span>
                    </div>
                    <div className="day-cards">
                      <div className="card">LAKLY ANDREA</div>
                      <div className="card">Dan Fielder</div>
                    </div>
                    <div className="day-footer" />
                  </div>
                );
              return (
                <div key={`r3-${i}`} className="day">
                  <div className="day-date-wrap">
                    <span className="date">{dayNum}</span>
                  </div>
                  <div className="day-cards" />
                  <div className="day-footer" />
                </div>
              );
            })}
            {/* Extra rows to fill remaining weeks */}
            {Array.from({ length: (weeks - 3) * 7 }, (_, idx) => {
              const i = 21 + idx;
              const { empty, dayNum } = getDayInfo(i);
              if (empty)
                return (
                  <div key={`ex-${i}`} className="day">
                    <div className="day-date-wrap" />
                    <div className="day-cards" />
                    <div className="day-footer" />
                  </div>
                );
              return (
                <div key={`ex-${i}`} className="day">
                  <div className="day-date-wrap">
                    <span className="date">{dayNum}</span>
                  </div>
                  <div className="day-cards" />
                  <div className="day-footer" />
                </div>
              );
            })}
          </div>
          </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <aside className="calendar-layout__sidebar sidebar">
          <div className="tab-selectors header-action">
            <div className="header-action__content w-100">
              <div
                className={`tab-items svg-noeffect tooltip${sidebarTab === "workpool" ? " active-tab-selector" : ""}`}
                role="button"
                tabIndex={0}
                onClick={() => setSidebarTab("workpool")}
                onKeyDown={(e) => e.key === "Enter" && setSidebarTab("workpool")}
                title="Work Pool"
              >
                <IconWorkPool />
                {sidebarTab === "workpool" && (
                  <>
                    <p className="tab-items__label txt-ellipsis">Work Pool</p>
                    <span id="sidebar_content_workpool_number_pool" className="count" style={{ display: "none" }} />
                  </>
                )}
              </div>
              <div
                className={`tab-items svg-noeffect tooltip${sidebarTab === "tasks" ? " active-tab-selector" : ""}`}
                role="button"
                tabIndex={0}
                onClick={() => setSidebarTab("tasks")}
                onKeyDown={(e) => e.key === "Enter" && setSidebarTab("tasks")}
                title="Tasks"
              >
                <IconTasks />
                {sidebarTab === "tasks" && <p className="tab-items__label txt-ellipsis">Tasks</p>}
              </div>
              <div
                className={`tab-items svg-noeffect tooltip${sidebarTab === "joblist" ? " active-tab-selector" : ""}`}
                role="button"
                tabIndex={0}
                onClick={() => setSidebarTab("joblist")}
                onKeyDown={(e) => e.key === "Enter" && setSidebarTab("joblist")}
                title="Job List"
              >
                <IconJobList />
                {sidebarTab === "joblist" && <p className="tab-items__label txt-ellipsis">Job List</p>}
              </div>
            </div>
          </div>

          <div className="workpool">
            <div className="work-header">
              <button
                type="button"
                className={workpoolTab === "pool" ? "active" : ""}
                onClick={() => setWorkpoolTab("pool")}
              >
                Pool
              </button>
              <button
                type="button"
                className={workpoolTab === "missed" ? "active" : ""}
                onClick={() => setWorkpoolTab("missed")}
              >
                Missed 99+
              </button>
            </div>

            <div className="workpool__search-wrap">
              <span className="svg-search-absolute">
                <IconSearch />
              </span>
              <input type="text" placeholder="Search" className="workpool__search" />
            </div>

            <div className="job-status">
              <span className="material-symbols-outlined">card_travel</span>
              Job Status
            </div>

            <div className="react-datepicker-wrapper select-list filter-date">
              <div className="react-datepicker__input-container">
                <div className="field-input field-date" role="button" tabIndex={0} onClick={() => {}} onKeyDown={() => {}}>
                  <IconCalendar />
                  <p className="field-date__select">Select Date Range...</p>
                </div>
              </div>
            </div>

            <div className="drop-zone">Drag a job to the work pool</div>
          </div>
        </aside>
      </div>

      </div>
  );
};
