// utilities/currencyUtils.js

// Definir configuraciones de moneda
const currencyConfig = {
    USD: {
      symbol: '$',
      code: 'USD',
      name: 'US Dollar',
      position: 'before', // símbolo delante del número
      decimals: 2,
      thousandsSeparator: ',',
      decimalSeparator: '.'
    },
    EUR: {
      symbol: '€',
      code: 'EUR',
      name: 'Euro',
      position: 'after', // símbolo después del número
      decimals: 2,
      thousandsSeparator: '.',
      decimalSeparator: ','
    },
    GBP: {
      symbol: '£',
      code: 'GBP',
      name: 'British Pound',
      position: 'before',
      decimals: 2,
      thousandsSeparator: ',',
      decimalSeparator: '.'
    }
  };
  
  // Función composable para formatear monedas
  export const useCurrency = () => {
    // Obtener la moneda actual del localStorage
    const getCurrentCurrency = () => {
      if (process.client) {
        return localStorage.getItem('userCurrency') || 'USD';
      }
      return 'USD';
    };
  
    // Formatear un número como moneda
    const formatCurrency = (amount, currencyCode = null) => {
      const code = currencyCode || getCurrentCurrency();
      const config = currencyConfig[code] || currencyConfig.USD;
      
      // Formatear el número
      let formattedNumber = parseFloat(amount).toFixed(config.decimals);
      
      // Reemplazar el separador decimal
      formattedNumber = formattedNumber.replace('.', config.decimalSeparator);
      
      // Añadir separadores de miles
      if (config.thousandsSeparator) {
        const parts = formattedNumber.split(config.decimalSeparator);
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, config.thousandsSeparator);
        formattedNumber = parts.join(config.decimalSeparator);
      }
      
      // Añadir el símbolo en la posición correcta
      if (config.position === 'before') {
        return `${config.symbol}${formattedNumber}`;
      } else {
        return `${formattedNumber} ${config.symbol}`;
      }
    };
  
    // Convertir un valor de una moneda a otra (simplificado)
    const convertCurrency = (amount, fromCurrency, toCurrency) => {
      // Tasas de cambio ficticias (en una aplicación real, deberías usar una API)
      const exchangeRates = {
        USD: { EUR: 0.85, GBP: 0.75, USD: 1 },
        EUR: { USD: 1.18, GBP: 0.88, EUR: 1 },
        GBP: { USD: 1.33, EUR: 1.14, GBP: 1 }
      };
      
      // Convertir al valor en la nueva moneda
      const rate = exchangeRates[fromCurrency][toCurrency] || 1;
      return amount * rate;
    };
  
    // Listener para cambios de moneda
    const setupCurrencyListener = (callback) => {
      if (process.client) {
        window.addEventListener('currency-changed', (event) => {
          if (typeof callback === 'function') {
            callback(event.detail);
          }
        });
      }
    };
  
    return {
      formatCurrency,
      convertCurrency,
      currencyConfig,
      getCurrentCurrency,
      setupCurrencyListener
    };
  };