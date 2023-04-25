import { createSignal, onMount, For } from "solid-js";
import { FontAwesomeIcon } from "solid-fontawesome";
import { A, useLocation } from "solid-start";
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '~/lib/const/navigation'

const linkClasses = 'flex items-center justify-flex-end gap-3 text-lg font-light px-3 py-2 hover:bg-neutral-600 hover:text-neutral-200 hover:no-underline active:bg-neutral-600 rounded-sm text-base';
const activeLinkBg= 'bg-neutral-500';
const activeLinkText = 'text-white';

const Sidebar = () => {
  const [open, setOpen] = createSignal(true);
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
        class={`${!open() && 'justify-center'} ${linkClasses}`}>
          <span class={`${!open() && 'justify-center'} flex w-[1.2rem]`}>
            {item.icon}
          </span>
          <span class={`${!open() && 'hidden'}`}>{item.label}</span>
      </A>
    )
  }

  const sideBarResize = (e: any) => {
    setOpen(!open());
    window.dispatchEvent(new Event('resize'));
  }

  return (
    <aside class={`${open() ? 'w-60' : 'w-20'} duration-300 flex flex-col bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 p-3 border-r border-gray-200 dark:border-gray-700`}>
      <div class={`${!open() && 'justify-center'} flex items-center gap-5 px-3 py-3 text-gray-600 dark:text-white`}>
        <span class={`cursor-pointer text-xl`} onClick={(e) => sideBarResize(e)}>
          <FontAwesomeIcon icon='fa-solid fa-bars' />
        </span>
        <span class={`${!open() && 'hidden'} text-neutral-600 dark:text-white text-xl`}>Algod Web UI</span>
      </div>
      <div class={`flex-1 py-8 flex flex-col gap-1`}>
        <For each={DASHBOARD_SIDEBAR_LINKS}>
          {(item) =>
            <SidebarLink item={item} />
          }
        </For>
      </div>
      <div class='flex flex-col gap-0.5 pt-2 border-t border-gray-700'>
        <For each={DASHBOARD_SIDEBAR_BOTTOM_LINKS} fallback={<div>Loading...</div>}>
          {(item) =>
            <SidebarLink item={item} />
          }
        </For>
        <div onClick={(e) => console.log(e)}>
          <div class={`${!open() && 'justify-center'} ${linkClasses}`}>
            <FontAwesomeIcon icon="fa-arrow-right-from-bracket" />
            <span class={`${!open() && 'hidden'}`}>Exit</span>
          </div>
        </div>
      </div>
    </aside>
  )
};

export default Sidebar;