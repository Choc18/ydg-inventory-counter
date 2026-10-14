export const REGULAR_BASES = [
  { name: 'SHIZU MIDORI', grams: 4 }, { name: 'YABUKITA', grams: 4 },
  { name: 'OKUMIDORI', grams: 4 }, { name: 'SUISEN', grams: 4 },
  { name: 'BYAKUREN', grams: 4 }, { name: 'WAKATAKE', grams: 4 },
  { name: 'AORASHI', grams: 4 }, { name: 'HOJICHA A', grams: 5 },
  { name: 'HOJICHA B', grams: 5 }, { name: 'GENMAICHA', grams: 6.5 },
];
export const LARGE_BASES = [
  { name: 'SHIZU MIDORI', grams: 5.5 }, { name: 'YABUKITA', grams: 5.5 },
  { name: 'OKUMIDORI', grams: 5.5 }, { name: 'SUISEN', grams: 5.5 },
  { name: 'BYAKUREN', grams: 5.5 }, { name: 'WAKATAKE', grams: 5.5 },
  { name: 'AORASHI', grams: 5.5 }, { name: 'HOJICHA A', grams: 6.5 },
  { name: 'HOJICHA B', grams: 6.5 }, { name: 'GENMAICHA', grams: 8.5 },
];
export const REGULAR_CODES = ['L','C','SS','M','B','SC','SM','T','TF','CF','YL','U'];
export const LARGE_CODES = ['L','C','SS','M','B','SC','SM','T','TF','CF','YZ'];
export const COFFEES = ['ESPRESSO','DOPPIO','AMERICANO','LONG BLACK','LATTE','CAPPUCCINO','FLAT WHITE','HONEYCOMB LATTE','SEASALT CREAM','BLACK SESAME CREAM','TIRAMISU LATTE','COCOA CREAM',"BARISTA'S DRINK"];
export const PASTRIES = ['CLASSIC BURNT BASQUE CHEESECAKE','CHOCOLATE CHIP COOKIE'];
export const CREATIONS: Record<string,{name:string;price:number}[]> = {
  Matcha: [{name:'Seasalt Cream',price:20},{name:'Matcha Cream',price:20},{name:'Tokyo Fog',price:30},{name:'Mango Cream',price:30},{name:'Strawberry Cream',price:30},{name:'Banana Cream',price:30},{name:'Coconut Fog',price:30},{name:'Tiramisu Cream',price:60},{name:'Yuzu Lemonade',price:20},{name:'Strawberry Milk',price:20}],
  Hojicha: [{name:'Hojicha Cream',price:20},{name:'Seasalt Cream',price:20},{name:'Mango Cream',price:30},{name:'Banana Cream',price:30},{name:'Strawberry Cream',price:30},{name:'Strawberry Milk',price:20},{name:'Tiramisu Cream',price:60},{name:'Coconut Fog',price:30}],
  Genmaicha: [{name:'Genmaicha Cream',price:20},{name:'Seasalt Cream',price:20},{name:'Banana Cream',price:30},{name:'Mango Cream',price:30},{name:'Strawberry Milk',price:20},{name:'Strawberry Cream',price:30}]
};
export const MILKS = [{name:'Full Cream Milk',price:0},{name:'Low Fat Milk',price:0},{name:'Oat Milk',price:0},{name:'Soy Milk',price:40},{name:'Almond Milk',price:40},{name:'Coconut Milk',price:40}];
export type CounterData = { regular: Record<string,number[]>; large: Record<string,number[]>; coffee: Record<string,number>; calibration:number; pastry:Record<string,number>; addons:Record<string,number> };
export const emptyData = (): CounterData => ({regular:Object.fromEntries(REGULAR_BASES.map(x=>[x.name,Array(12).fill(0)])),large:Object.fromEntries(LARGE_BASES.map(x=>[x.name,Array(11).fill(0)])),coffee:Object.fromEntries(COFFEES.map(x=>[x,0])),calibration:0,pastry:Object.fromEntries(PASTRIES.map(x=>[x,0])),addons:{}});
export function calculate(data:CounterData) {
  const regOrders = Object.values(data.regular).reduce((s,arr)=>s+arr.reduce((a,b)=>a+b,0),0);
  const regGrams = REGULAR_BASES.reduce((s,b)=>s+((data.regular[b.name]||[]).slice(0,11).reduce((a,n)=>a+n,0)*b.grams)+((data.regular[b.name]||[])[11]||0)*3,0);
  const largeOrders = Object.values(data.large).reduce((s,arr)=>s+arr.reduce((a,b)=>a+b,0),0);
  const largeGrams = LARGE_BASES.reduce((s,b)=>s+((data.large[b.name]||[]).reduce((a,n)=>a+n,0)*b.grams),0);
  const coffeeOrders = Object.values(data.coffee).reduce((a,b)=>a+b,0);
  const coffeeGrams = (coffeeOrders+data.calibration)*18;
  const pastryCount = Object.values(data.pastry).reduce((a,b)=>a+b,0);
  const matchaRegularOrders = REGULAR_BASES.slice(0,7).reduce((s,b)=>s+(data.regular[b.name]||[]).reduce((a,n)=>a+n,0),0);
  const matchaRegularGrams = REGULAR_BASES.slice(0,7).reduce((s,b)=>s+((data.regular[b.name]||[]).slice(0,11).reduce((a,n)=>a+n,0)*b.grams)+((data.regular[b.name]||[])[11]||0)*3,0);
  const greenRegularOrders = REGULAR_BASES.slice(7).reduce((s,b)=>s+(data.regular[b.name]||[]).reduce((a,n)=>a+n,0),0);
  const greenRegularGrams = REGULAR_BASES.slice(7).reduce((s,b)=>s+((data.regular[b.name]||[]).slice(0,11).reduce((a,n)=>a+n,0)*b.grams)+((data.regular[b.name]||[])[11]||0)*3,0);
  const matchaLargeOrders = LARGE_BASES.slice(0,7).reduce((s,b)=>s+(data.large[b.name]||[]).reduce((a,n)=>a+n,0),0);
  const matchaLargeGrams = LARGE_BASES.slice(0,7).reduce((s,b)=>s+(data.large[b.name]||[]).reduce((a,n)=>a+n,0)*b.grams,0);
  const greenLargeOrders = LARGE_BASES.slice(7).reduce((s,b)=>s+(data.large[b.name]||[]).reduce((a,n)=>a+n,0),0);
  const greenLargeGrams = LARGE_BASES.slice(7).reduce((s,b)=>s+(data.large[b.name]||[]).reduce((a,n)=>a+n,0)*b.grams,0);
  const usucha = REGULAR_BASES.reduce((s,b)=>s+((data.regular[b.name]||[])[11]||0),0);
  return {regOrders,regGrams,largeOrders,largeGrams,coffeeOrders,coffeeGrams,pastryCount,matchaRegularOrders,matchaRegularGrams,greenRegularOrders,greenRegularGrams,matchaLargeOrders,matchaLargeGrams,greenLargeOrders,greenLargeGrams,usucha,usuchaGrams:usucha*3,totalTeaGrams:regGrams+largeGrams,totalTeaCoffeeGrams:regGrams+largeGrams+coffeeGrams};
}
