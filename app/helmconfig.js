import favicon from './static/favicon.ico';

const config = {
  link: [
    { rel: 'icon', href: favicon },
    // { rel: 'icon', sizes: '192x192', href: chromecon },
    // { rel: 'apple-touch-icon', sizes: '152x152', applecon },
    // { rel: 'stylesheet', href: '/assets/styles/main.css' }
    // SEO: If your mobile URL is different from the desktop URL,
    // add a canonical link to the desktop page https://developers.google.com/webmasters/smartphone-sites/feature-phones
    // { 'rel': 'canonical', 'href': 'http://www.example.com/' }
  ],
  
  meta: [
    { charset: 'utf-8' },
    // Setting IE=edge tells Internet Explorer to use the latest engine to render the page and execute Javascript
    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    { name: 'description', content: 'bus.train.ru' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
    // Add to homescreen for Chrome on Android
    { name: 'mobile-web-app-capable', content: 'yes' },
    // Add to homescreen for Safari on IOS
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    { name: 'apple-mobile-web-app-title', content: 'bus.train.ru'},
    // Tile icon for Win8 (144x144 + tile color)
    // { name: 'msapplication-TileImage', content: mscon },
    { name: 'msapplication-TileColor', content: '#3372DF' }
  ]
};

export default config;
