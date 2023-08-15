const invalidProductName = 'ma';
const invalidProductPrice = 12;

const validProductName = "konoha headband"
const validProductPrice = "10 ryō"

const validProductBody = {
    name: validProductName,
    price: validProductPrice,
    orderId: 9,
};

const invalidNameProductBody = {
    name: invalidProductName,
    price: validProductPrice,
    orderId: 5,
};

const invalidPriceProductBody = {
    name: invalidProductName,
    price: invalidProductPrice,
    orderId: 6,
};

const simulatedProductCreated = {
    id: 6,
    name: 'konoha headband',
    price: '10 ryō'

};

const invalidProductReturn = { status: 'UNPROCESSABLE_CONTENT', data: {message: '"name" length must be at least 3 characters long' } };

export default {
    validProductBody,
    invalidNameProductBody,
    invalidPriceProductBody,
    simulatedProductCreated,
    invalidProductReturn,
}