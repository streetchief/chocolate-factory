const process = require('process');
try {
    const processor = require('./dist/process-orders.cjs')();
    processor.processOrders();
} catch (e) {
    console.log(`Error parsing orders`);
    console.log(`Message: ${e.message}`);
    process.exit(1);
}
