import { createSignal, createEffect, onMount } from 'solid-js'

enum Theme {
  KeyName = 'theme',
  Light = 'light',
  Dark = 'dark',
}

export default function ThemeToggle() {
  const [theme, setTheme] = createSignal(localStorage.getItem(Theme.KeyName) ?? Theme.Light)
  const [mounted, setMounted] = createSignal(false)

  const handleClick = () => {
    setTheme(theme() === Theme.Light ? Theme.Dark : Theme.Light)
  }

  createEffect(() => {
    if (document.documentElement.getAttribute('data-theme') === theme()) return
    document.documentElement.setAttribute('style', `color-scheme: ${theme()};`)
    document.documentElement.setAttribute('data-theme', theme())
    localStorage.setItem(Theme.KeyName, theme())
  })

  onMount(() => setMounted(true))

  return (
    <>
      {mounted() ? (
        <button
          class='flex h-9 w-9 items-center justify-center rounded-lg bg-gray-200 ring-gray-300 transition-colors hover:ring-2 dark:bg-gray-600'
          onClick={handleClick}
        >
          {theme() === Theme.Light ? <Sun /> : <Moon />}
        </button>
      ) : null}
    </>
  )
}

function Sun() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      class='h-5 w-5 text-gray-800 dark:text-gray-200'
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2'
        d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
      />
    </svg>
  )
}

function Moon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      class='h-5 w-5 text-gray-800 dark:text-gray-200'
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2'
        d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
      />
    </svg>
  )
}
