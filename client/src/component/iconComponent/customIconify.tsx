import React, { useEffect, useState } from "react";
import { loadIcon, iconExists, Icon } from "@iconify/react";

export default function CustomIconify({ icon, defaultIcon }) {
  const [currentIcon, setCurrentIcon] = useState(defaultIcon);
  // console.log(icon, defaultIcon, "icon,defaultIcon");

  // const loadIconifyIcon = async (icon, defaultIcon) => {
  //     try {
  //         const response = await loadIcon(icon);
  //         console.log(response);
  //         return <Icon icon={response} />
  //     } catch (err) {
  //         <Icon icon={defaultIcon} />;
  //     }
  //     return <Icon icon={defaultIcon} />
  // }
  // useEffect(() => {
  //     const loadIcon = async () => {
  //         const response = await loadIcon(icon);
  //         if(response){
  //             console.log(response);
  //             setCurrentIcon(icon)
  //         }else{
  //             console.log('Icon', icon, "Doesn't exist");
  //             setCurrentIcon(icon);
  //             console.log(icon)
  //         }
  //     };
  //     loadIcon();
  // }, [currentIcon]);
  // if (!icon) return <Icon icon={currentIcon} />;
  // return loadIconifyIcon(icon, defaultIcon);
  return <Icon icon={icon} />;
}
