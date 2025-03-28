import {PropsWithChildren} from "react";

import S from "./style.module.css"

export const FieldBackground = (props: PropsWithChildren<{}>) => {
  return <div className={`${S.container} ${S.colored}`}>{props.children}</div>
}
