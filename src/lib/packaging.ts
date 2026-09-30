export type Food = { name: string; category: string; aw: number; fat: number; ph: number; respiration: number; shelfDays: number; description: string };
export const foods: Food[] = [
  { name: 'Alphonso Mangoes', category: 'Fresh produce', aw: .98, fat: .4, ph: 4.0, respiration: 45, shelfDays: 14, description: 'Respiring, moisture-rich fruit' },
  { name: 'Roasted Makhana', category: 'Dry snacks', aw: .32, fat: 1, ph: 6.8, respiration: 0, shelfDays: 180, description: 'Crisp and moisture-sensitive' },
  { name: 'Chilli Pickle', category: 'Preserves', aw: .82, fat: 24, ph: 3.8, respiration: 0, shelfDays: 240, description: 'Oily and oxidation-sensitive' },
  { name: 'Turmeric Powder', category: 'Spices', aw: .46, fat: 3.3, ph: 6.3, respiration: 0, shelfDays: 300, description: 'Light-sensitive dried spice' },
  { name: 'Paneer', category: 'Dairy', aw: .97, fat: 20, ph: 5.7, respiration: 0, shelfDays: 12, description: 'Perishable high-moisture dairy' },
  { name: 'Groundnut Chikki', category: 'Confectionery', aw: .42, fat: 27, ph: 6.2, respiration: 0, shelfDays: 120, description: 'High-lipid sweet snack' },
];
export type Inputs = { food: Food; temperature: number; humidity: number; transit: 'Local' | 'Regional' | 'Long distance' };
export function recommend({ food, temperature, humidity, transit }: Inputs) {
  const produce = food.respiration > 0;
  const lipid = Math.min(55, Math.round(food.fat * 1.5 + (produce ? 4 : 12)));
  const moisture = Math.min(55, Math.round((1 - food.aw) * 36 + humidity * .28));
  const thermal = Math.max(8, Math.round((temperature - 10) * .8 + (transit === 'Long distance' ? 14 : transit === 'Regional' ? 7 : 0)));
  const total = lipid + moisture + thermal;
  const weights = [
    { label: 'Lipid oxidation risk', value: Math.round(lipid / total * 100) },
    { label: 'Moisture sensitivity', value: Math.round(moisture / total * 100) },
    { label: 'Temperature & transit', value: 0 },
  ];
  weights[2].value = 100 - weights[0].value - weights[1].value;
  const score = Math.max(71, Math.min(97, Math.round(97 - Math.max(0, temperature - 25) * .45 - Math.max(0, humidity - 60) * .12 - (transit === 'Long distance' ? 4 : 0)));
  const shelfDays = Math.max(3, Math.round(food.shelfDays * (1 + (produce ? .22 : .32)) * (1 - Math.max(0, temperature - 25) * .022)));
  const cost = produce ? 1420 : food.fat > 15 ? 1850 : 1650;
  return {
    score, shelfDays, weights,
    structure: produce ? '20µ BOPP / 40µ PE (microperforated)' : food.fat > 15 ? '12µ PET / 9µ Al Foil / 50µ LDPE' : '12µ PET / 12µ MetPET / 50µ LDPE',
    ecoStructure: produce ? '30µ Cellulose / 40µ Bio-PE (microperforated)' : '25µ PLA / 30µ Coated Cellulose / 40µ Bio-PE',
    otr: produce ? 'Controlled exchange' : '< 1 cc/m²/day',
    wvtr: produce ? '2–5 g/m²/day' : '< 1 g/m²/day',
    thickness: produce ? '60–80 µm' : '70–100 µm',
    seal: 'Heat sealable', cost,
    ecoCost: Math.round(cost * 1.24),
    ecoShelfDays: Math.max(2, Math.round(shelfDays * .88)),
    carbonSaving: produce ? 28 : 35,
    tags: produce ? ['Breathable film', 'Moisture balance', 'Heat sealable'] : ['High O₂ barrier', 'Light barrier', 'Heat sealable'],
  };
}
