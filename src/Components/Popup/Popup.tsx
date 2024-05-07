import styles from './popup.module.css';
import { createPortal } from "react-dom";

export function Popup() {
  const root_popup = document.getElementById('root_popup')
  if (!root_popup) {
    return <>no poput</>
  }
  return createPortal(
    <div className={styles.popupBlock}>
    popup
    </div>,root_popup
  );
}
