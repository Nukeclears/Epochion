import './global.css'

import App from './App.svelte'

const app = new App({
    target: document.body,
    props: {
        name: 'tiny tiny',
    },
})

export default app

const body = document.getElementById('body')

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    body.classList.add('dark')
} else {
    body.classList.remove('dark')
}

localStorage.theme = 'light'
localStorage.theme = 'dark'
localStorage.removeItem('theme')

document.getElementById('darktoggle').addEventListener('click', function () {
    if (body.classList.contains('dark')) {
        body.classList.remove('dark')
    } else {
        body.classList.add('dark')
    }
})
