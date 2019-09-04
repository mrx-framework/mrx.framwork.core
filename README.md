# MRX.FRAMEWORK

MRX.FRAMEWORK is a "framework" you can use to build something awesome. It is not just a CMS, because you can individually add functionality to its core. It comes with an integrated PageBuilder where you can generate your Pages with no code. Also it comes with an integrated Blog where you can publish your some Posts.

## Installation

### Step #1
Clone this repo: ``git clone https://github.com/mrx-framework/mrx.framwork.core``

### Step #2
Install dependencies using: ``yarn``

### Step #3
Modify the ``config.js`` in the root folder. Be sure, that you use ``en`` or ``de`` as locale. If you want to add your own locale, be sure to copy a locale file in ``./src/locales/[locale].json`` and translate it to your language.

If you use an locale, which not exists in the above path, the migration will fail.

## Facts
* All the client stuff lifes in ``./src``.
* All the server stuff lifes in ``./srv``.
* This code isn't well documented yet.
* I wish, I used typescript since the beginning.
* The Apollo cache is only good for User, Groups & Permissions. The other stuff is a bit cracky.
* Page Builder Treeview is not performant.
* SEO is prepared, but not included.
* Google Audit performance is terrible cause treeshaking & dynamic import is not working.
* Some things are hard coded right now and not dynamic.
* No Tests.


## Usage
Starting development server:

```bash
yarn watch
```

## Social
* [Follow Facebook](https://www.facebook.com/mrx.framework "Follow Facebook")
* [Discord](https://discord.gg/CBUpfqj "Discord")

## Includes
* [Vue.js](https://github.com/vuejs/vue "Vue.js")
* [Vuex](https://github.com/vuejs/vuex "Vuex")
* [Vue-Router](https://github.com/vuejs/vue-router "Vue Router")
* [Vue Apollo by Akryum](https://github.com/Akryum/vue-apollo "Vue Apollo by Akryum")
* [Vuetify by John Leider](https://github.com/vuetifyjs/vuetify "Vuetify")

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Author
* [domsen123](https://github.com/domsen123 "domsen123") :P

## License
[GNU v3](https://github.com/mrx-framework/mrx.framwork.core/blob/master/README.md)
