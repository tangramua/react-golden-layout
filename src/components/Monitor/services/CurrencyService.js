const currencies  = require('./currencies.json');

export class CurrencyService {
    
    getSupportedCurrencies() {
        return currencies;
    }
}