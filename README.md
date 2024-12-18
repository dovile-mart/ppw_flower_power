## Harjoitustyö

Harjoitustyössä käyttäjä voi lisätä kasveja ja määrittää niiden kasteluvälit, selata omaa kasvilistaansa sekä hakea kasveja eri kasvisperheistä hyödyntäen avointa dataa. Sovelluksessa käytetään Firebase-autentikaatiota, Firestore-tietokantaa, MUI-kirjastoa sekä Trefle.io-palvelun tarjoamaa avointa dataa. Firebaseen on luotu kaksi esimerkkikäyttäjää, joilla on omat "Plant"-kokoelmat. Näissä kokoelmissa jokaisella käyttäjällä on omat yksilölliset kasvilistansa.

[Linkki harjoitustyön sivulle](https://dovile-mart.github.io/tehtavat/harjoitustyo/index.html), käyttäjät: test@test.fi (testing), test2@test.fi (testing2)

[Linkki projektin repositorioon](https://github.com/dovile-mart/ppw_flower_power)

## Kuvakaappaukset
![sign-in](https://github.com/user-attachments/assets/bf50092b-00bd-43dc-84e6-f581ddee0b20)

![add-plant & plantlist](https://github.com/user-attachments/assets/e881648f-2c3e-47f7-b0ce-dda40072c98e)

![plant-data-from-trefle](https://github.com/user-attachments/assets/95b25128-09ad-43af-a2f0-1b66ded93fcc)


## Responsiivisuus
Sivusto toimii erinomaisesti eri kokoisilla näytöillä (desktop, tablet, mobiili). Toimivuus on testattu sekä Google Chromen kehittäjätyökalulla että fyysisillä laitteilla. Mobiililaitteilla kaikki toimii suunnitellusti sekä vaaka- että pystysuunnassa.

[//]: ![Firefox_desktop](image.png)
[//]:![Chrome_desktop](image-4.png)
[//]:![Edge_desktop](image-2.png)

[//]:![Chrome_iPadAir](image-3.png)
[//]:![Chrome_mobiili](image-1.png)


## Toimivuus Uusimmilla Selaimilla
Sivusto on testattu uusimmilla selaimilla ja toimii kaikissa suunnittelusti:

- Google Chrome (Versio 131.0.6778.140).
- Mozilla Firefox (Versio 115.18.0esr).
- Microsoft Edge (Versio 131.0.2903.99).


## Sivujen Latautumisaika
Sivuston latautumisajat on testattu PageSpeed Insights -työkalulla. Ennen MUI-kirjaston lisäämistä latausajat olivat hieman nopeampia, mutta ero ei ollut merkittävä. MUI-kirjaston integrointi on kuitenkin parantanut käyttöliittymän toiminnallisuuksia ja visuaalista ilmettä.  Nopeudet ovat erinomaiset niin [tietokoneella](https://pagespeed.web.dev/analysis/https-dovile-mart-github-io-tehtavat-harjoitustyo-index-html/j07imv9mru?form_factor=desktop) kuin [mobiililaitteilla](https://pagespeed.web.dev/analysis/https-dovile-mart-github-io-tehtavat-harjoitustyo-index-html/j07imv9mru?form_factor=mobile). Testitulokset osoittavat, että sivusto latautuu nopeasti, mikä parantaa käyttökokemusta ja vähentää käyttäjien odotusaikoja.

#### Desktop
- First Contentful Paint (FCP): 0.5 s
- Largest Contentful Paint (LCP): 0.5 s
- Total Blocking Time (TBT): 80 ms
- Cumulative Layout Shift (CLS): 0
- Speed Index: 0.5 s

![Tietokone_tehokkuus](https://github.com/user-attachments/assets/912d29a8-d320-469c-a604-fb51590a20e8)


#### Mobiili 

- First Contentful Paint (FCP): 2.4 s
- Largest Contentful Paint (LCP): 2.4 s
- Total Blocking Time (TBT): 70 ms
- Cumulative Layout Shift (CLS): 0
- Speed Index: 2.4s

![Mobiili_tehokkuus](https://github.com/user-attachments/assets/3bfe0427-0aed-4adc-9be5-546d2f08ff66)

<!-- # React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
-->
