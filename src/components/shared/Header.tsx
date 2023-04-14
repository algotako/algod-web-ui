import { FontAwesomeIcon } from "solid-fontawesome";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
  Menu,
  MenuItem,
} from 'solid-headless';


function Separator() {
  return (
    <div class="flex items-center" aria-hidden="true">
      <div class="w-full border-t border-gray-200" />
    </div>
  );
}

const Header = () => {
  return (
    <div class='bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 h-16 px-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700'>
      <div>
        <span class='cursor-pointer'>
          <FontAwesomeIcon icon='fa-solid fa-bars' />
        </span>
      </div>
      
      <div class='relative'>
        <span class='text-gray-300 absolute top-1/2 -translate-y-1/2 left-3'>
          <FontAwesomeIcon icon='fa-solid fa-magnifying-glass' />
        </span>
        <input 
          type='text' 
          placeholder="Search..." 
          class='text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-sm pl-11 pr-4' 
        />
      </div>
      <div class='flex items-center gap-2 mr-2'>
        <div>
          <FontAwesomeIcon icon='fa-solid fa-circle-half-stroke' />
        </div>
        <Popover defaultOpen={false} class="relative" id="header-messages">
          {({ isOpen }) => (
            <>
              <PopoverButton
                class={`${isOpen() && 'bg-gray-300 dark:bg-gray-900'} p-1.5 rounded-sm inline-flex items-center hover:text-opacity-100 focus:outline-none active:bg-gray-100 dark:active:bg-gray-900`}
              >
                <div>
                  <FontAwesomeIcon icon='fa-solid fa-bell' />
                </div>
              </PopoverButton>
              <Transition
                show={isOpen()}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <PopoverPanel class="bg-white dark:bg-gray-600 text-black dark:text-white absolute right-0 z-10 mt-2.5 w-80">
                  <div class='bg-white dark:bg-gray-700 rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5'>
                    <strong class='text-gray-600 font-medium'>Notifications</strong>
                    <div class='mt-2 py-1 text-sm'>
                      This is a message.
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
        <Popover defaultOpen={false} class="relative">
          {({ isOpen }) => (
            <>
              <PopoverButton 
                class={`${isOpen() && 'bg-gray-300 dark:bg-gray-900'} p-1 rounded-sm inline-flex items-center hover:text-opacity-100 focus:outline-none active:bg-gray-100 dark:active:bg-gray-900`}>
                <FontAwesomeIcon icon='fa-solid fa-user' />
              </PopoverButton>
              <Transition
                show={isOpen()}
                enter="transition duration-200"
                enterFrom="opacity-0 -translate-y-1 scale-50"
                enterTo="opacity-100 translate-y-0 scale-100"
                leave="transition duration-150"
                leaveFrom="opacity-100 translate-y-0 scale-100"
                leaveTo="opacity-0 -translate-y-1 scale-50"
              >
                <PopoverPanel unmount={false} class="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 origin-top-right absolute right-0 z-10 mt-2 w-48 rounded-sm shadow-md p-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu class="overflow-hidden">
                    <MenuItem class='hover:bg-gray-100 hover:text-gray-800 cursor-pointer rounded-sm px-4 py-2'>
                      Profile
                    </MenuItem>
                    <MenuItem class="hover:bg-gray-100 hover:text-gray-800 cursor-pointer rounded-sm px-4 py-2">
                      Settings
                    </MenuItem>
                    <MenuItem class="hover:bg-gray-100 hover:text-gray-800 cursor-pointer rounded-sm px-4 py-2">
                      Exit
                    </MenuItem>
                  </Menu>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
};

export default Header;
