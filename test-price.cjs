const { format } = require('util');

const min = 20;
const max = 1000;

const calculatePercentage = (lakhs) => {
  if (lakhs <= min) return 0;
  if (lakhs >= max) return 100;
  return (Math.log(lakhs / min) / Math.log(max / min)) * 100;
};

const calculatePriceLakhs = (pct) => {
  if (pct === 0) return min;
  if (pct === 100) return max;
  return min * Math.pow(max / min, pct / 100);
};

const formatPrice = (lakhs, isMax) => {
  if (isMax) return '₹10 Cr+';
  if (lakhs < 100) {
    return `₹${Math.round(lakhs)} Lakh`;
  } else {
    const cr = lakhs / 100;
    const formatted = Number(cr.toFixed(2)).toString();
    return `₹${formatted} Cr`;
  }
};

const computeDefaultPrice = (propStr) => {
  if (!propStr) return '₹50 Lakh onwards';
  const lower = propStr.toLowerCase();
  
  const isVilla = lower.includes('villa') || lower.includes('independent') || lower.includes('penthouse') || lower.includes('farmhouse');
  const isCommercial = lower.includes('plot') || lower.includes('land') || lower.includes('commercial') || lower.includes('office') || lower.includes('shop') || lower.includes('retail');
  
  if (isCommercial) {
    return '₹1.2 Cr onwards';
  }

  let baseLakhs = 50;
  if (lower.includes('studio') || lower.includes('1 bhk')) {
    baseLakhs = 40;
  } else if (lower.includes('2 bhk')) {
    baseLakhs = 80;
  } else if (lower.includes('3 bhk')) {
    baseLakhs = 150;
  } else if (lower.includes('4 bhk')) {
    baseLakhs = 250;
  } else if (lower.includes('5+ bhk')) {
    baseLakhs = 450;
  }

  if (isVilla) {
    baseLakhs = Math.floor(baseLakhs * 1.6);
  }

  if (baseLakhs < 100) {
    return `₹${Math.round(baseLakhs)} Lakh onwards`;
  } else {
    return `₹${Number((baseLakhs / 100).toFixed(2)).toString()} Cr onwards`;
  }
};

// Simulate PriceSlider handling incoming value
const testPriceUpdate = (propStr) => {
  const value = computeDefaultPrice(propStr);
  console.log(`\nInput prop: "${propStr}"`);
  console.log(`Computed parent price: "${value}"`);
  
  let lakhs = 50;
  const crMatch = value.match(/₹([\d.]+)\s*Cr/);
  const lMatch = value.match(/₹([\d.]+)\s*Lakh/);
  
  if (crMatch) {
    lakhs = parseFloat(crMatch[1]) * 100;
  } else if (lMatch) {
    lakhs = parseFloat(lMatch[1]);
  }
  
  console.log(`Parsed lakhs: ${lakhs}`);
  
  const sliderValue = calculatePercentage(lakhs);
  console.log(`Slider percentage (raw): ${sliderValue}`);
  
  // input type="range" rounds to integer natively!
  const coercedSliderValue = Math.round(sliderValue);
  console.log(`Slider percentage (coerced by DOM step=1): ${coercedSliderValue}`);
  
  const currentLakhs = calculatePriceLakhs(coercedSliderValue);
  const formattedString = formatPrice(currentLakhs, coercedSliderValue === 100);
  const finalOutput = `${formattedString} onwards`;
  console.log(`Slider final output: "${finalOutput}"`);
  
  if (finalOutput !== value) {
    console.log(`ERROR: Mismatch! Parent sent "${value}", Slider rounded to "${finalOutput}"`);
  } else {
    console.log(`SUCCESS: Slider matches parent perfectly!`);
  }
};

testPriceUpdate("1 BHK Apartment");
testPriceUpdate("3 BHK Villa");
testPriceUpdate("5+ BHK Penthouse");
testPriceUpdate("Plot/Land");

