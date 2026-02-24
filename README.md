
# Tehnična naloga – Prikaz artiklov

Demo (Vercel): https://bilumina-product-task.vercel.app

## Uporabljena tehnologija

- React 18
- TypeScript
- Vite
- TailwindCSS
- Native Fetch API

---

## API vir podatkov

Podatki se pridobivajo iz:

https://egi.bilumina.com/mw/api/v1/items/get?key=bf84d5ef-7fe2-4609-8b75-49279dd3271e

---

## Pristop k rešitvi

### 1. Ločitev logike od prikaza

Projekt je strukturiran tako, da:

- `fetchItems.ts` skrbi izključno za pridobivanje podatkov
- `transformItems.ts` skrbi za transformacijo API strukture v UI-prijazno obliko
- `ProductCard.tsx` skrbi za prikaz posameznega artikla
- `App.tsx` skrbi za orkestracijo stanja (loading, error, sortiranje)

Logika ni pomešana z izpisom HTML, temveč je jasno ločena po odgovornostih.

---

### 2. Izbira skupine

Namesto indeksnega dostopa (`groups[5]`) se skupina izbere po `groupId` (30284 – Košare), kar je bolj robustno in odporno na spremembe vrstnega reda v API-ju.

---

### 3. Transformacija podatkov

API vrača artikle kot objekt (`Record<string, Item>`), zato se podatki:

- pretvorijo v tabelo (`Object.values`)
- reducirajo na minimalni UI model (`UiProduct`)
- povežejo s pravilno CDN potjo za slike (`cdnUrl.itemSmall`)

S tem UI ni neposredno vezan na celotno API strukturo.

---

### 4. Formatiranje cene

Cene so formatirane z:

```ts
toLocaleString("sl-SI", {
  style: "currency",
  currency: "EUR"
});
```

---

### 5. Sortiranje

Implementirano je sortiranje po ceni:

- privzeto (API vrstni red)
- naraščajoče
- padajoče

Sortiranje se izvaja nad kopijo podatkov, s čimer se prepreči mutacija originalnega stanja.

---

### 6. Robni primeri (edge cases)

Upoštevana so naslednja stanja:

- prikaz nalaganja podatkov (loading state)
- obravnava napake pri pridobivanju podatkov (error state)
- primer, ko skupina nima artiklov (empty state)
- označevanje izdelkov brez zaloge (`stock === 0`)

---

