import { createSignal, onMount, For } from "solid-js";
import { FontAwesomeIcon } from "solid-fontawesome";
import { A, useLocation } from "solid-start";
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '~/lib/const/navigation'

const linkClasses = 'flex items-center justify-flex-end gap-3 font-light px-3 py-2 hover:bg-neutral-600 hover:text-neutral-200 hover:no-underline active:bg-neutral-600 rounded-sm text-base';
const activeLinkBg= 'bg-neutral-500';
const activeLinkText = 'text-white';

const Sidebar = () => {
  const [currentPath, setCurrentPath] = createSignal(useLocation().pathname);
  const location = useLocation();

  const highLight = (e: any, id: string) => {
    const element = document.getElementById(id);
    const prevElement = document.getElementById(currentPath());
    prevElement?.classList.toggle(activeLinkBg);
    prevElement?.classList.toggle(activeLinkText);
    element?.classList.toggle(activeLinkBg);
    element?.classList.toggle(activeLinkText);
    setCurrentPath(id);
  }

  onMount(() => {
    // Set the Dashboard as the active link
    const element = document.getElementById(currentPath());
    element?.classList.toggle(activeLinkBg);
    element?.classList.toggle(activeLinkText);
  })
 
  const SidebarLink = ( { item }) => {
    return (
      <A 
        onClick={(e) => highLight(e, location.pathname)} 
        href={item.path} 
        id={item.path}
        class={linkClasses}>
          <span class='w-[1.2rem]'>
            {item.icon}
          </span>
          <span>{item.label}</span>
      </A>
    )
  }

  return (
    <div class='flex flex-col bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200  p-3 w-60'>
      <div class='flex items-center gap-2 px-1 py-3 text-gray-600 dark:text-white'>
        <FontAwesomeIcon icon="fa-solid fa-hard-drive" />
        <span class='text-neutral-600 dark:text-white text-lg'>Algod Web UI</span>
      </div>
      <div class='flex-1 py-8 flex flex-col gap-0.5'>
        <For each={DASHBOARD_SIDEBAR_LINKS}>
          {(item) =>
            <SidebarLink item={item} />
          }
        </For>
      </div>
      <div class='flex flex-col gap-0.5 pt-2 border-t border-neutral-700'>
        <For each={DASHBOARD_SIDEBAR_BOTTOM_LINKS} fallback={<div>Loading...</div>}>
          {(item) =>
            <SidebarLink item={item} />
          }
        </For>
        <div onClick={(e) => console.log(e)}>
          <div class={`${linkClasses} text-red-400`}>
            <FontAwesomeIcon icon="fa-arrow-right-from-bracket" />
            <span>Exit</span>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Sidebar;