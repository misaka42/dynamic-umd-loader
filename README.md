# dynamic-umd-loader

see type definitions [here](https://unpkg.com/dynamic-umd-loader@latest/dist/index.d.ts)

## Usage

```
npm i dynamic-umd-loader
```

## Example

load `dayjs` from jsdelivr

```javascript
import loader from 'dynamic-umd-loader';

loader('https://cdn.jsdelivr.net/npm/dayjs@1.10.7/dayjs.min.js', 'dayjs').then(
  (dayjs) => {
    console.log(dayjs().from());
  }
);
```
