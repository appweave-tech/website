import loadable from "@loadable/component"
import React from "react";
import { IconBaseProps, IconType } from "react-icons/lib"

interface typesPropsIcon {
  nameIcon: string;
  propsIcon?: IconBaseProps
}

export function ReactIcon({ nameIcon, propsIcon }: typesPropsIcon): JSX.Element {
  const lib = nameIcon.replace(/([a-z0-9])([A-Z])/g, '$1 $2').split(" ")[0].toLocaleLowerCase();


  console.log('iconImport', `react-icons/${lib}/index.js`);
  // @ts-expect-error
  const ElementIcon: IconType = loadable(() => import(`react-icons/${lib}/index.js`), {
    resolveComponent: (el: JSX.Element) => el[nameIcon as keyof JSX.Element]
  });

  return <ElementIcon {...propsIcon} />
}